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
    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      temperature: 0.2,
      max_tokens: 700,
      messages: [{
        role: 'user',
        content: `Answer using only the document context below. If the answer is not present, say you could not find it in the document.\n\nDOCUMENT CONTEXT:\n${context}\n\nQUESTION: ${question}\n\nANSWER:`
      }]
    });

    return Response.json({ answer: completion.choices[0]?.message?.content || 'No answer was generated.' });
  } catch (error) {
    return Response.json({ error: error.message || 'Failed to generate an answer.' }, { status: 500 });
  }
}
