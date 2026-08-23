import Groq from 'groq-sdk';

export const runtime = 'nodejs';

function selectRelevantText(document, question) {
  const words = question.toLowerCase().split(/\W+/).filter(w => w.length > 2);
  const chunks = document.match(/.{1,1800}(?:\s|$)/g) || [];
  const ranked = chunks
    .map(chunk => ({
      chunk,
      score: words.reduce((score, word) => score + (chunk.toLowerCase().split(word).length - 1), 0)
    }))
    .sort((a, b) => b.score - a.score);
  return ranked.slice(0, 8).map(x => x.chunk).join('\n\n---\n\n');
}

async function chooseAvailableModel(groq) {
  const models = await groq.models.list();
  const available = new Set((models.data || []).filter(model => model.active !== false).map(model => model.id));
  const preferred = [
    'llama-3.3-70b-versatile',
    'llama-3.1-8b-instant',
    'openai/gpt-oss-20b',
    'openai/gpt-oss-120b',
    'groq/compound-mini',
    'groq/compound'
  ];
  const selected = preferred.find(model => available.has(model));
  if (!selected) {
    throw new Error(`No supported chat model is available for this Groq API key. Available models: ${[...available].slice(0, 10).join(', ') || 'none'}`);
  }
  return selected;
}

export async function POST(request) {
  try {
    const { question, document } = await request.json();
    if (!question?.trim() || !document?.trim()) {
      return Response.json({ error: 'A question and PDF text are required.' }, { status: 400 });
    }
    if (!process.env.GROQ_API_KEY) {
      return Response.json({ error: 'Server is missing GROQ_API_KEY. Add it in Vercel Environment Variables.' }, { status: 500 });
    }

    const context = selectRelevantText(document.slice(0, 120000), question);
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const model = await chooseAvailableModel(groq);

    const completion = await groq.chat.completions.create({
      model,
      temperature: 0.2,
      max_tokens: 700,
      messages: [{
        role: 'system',
        content: 'Answer accurately and only from the supplied document context. If the answer is not present, clearly say that it could not be found in the document.'
      }, {
        role: 'user',
        content: `DOCUMENT CONTEXT:\n${context}\n\nQUESTION: ${question}`
      }]
    });

    return Response.json({ answer: completion.choices[0]?.message?.content || 'No answer was generated.', model });
  } catch (error) {
    const message = error?.message || 'Failed to generate an answer.';
    return Response.json({ error: message }, { status: error?.status || 500 });
  }
}
