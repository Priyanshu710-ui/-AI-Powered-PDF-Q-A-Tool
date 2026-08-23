'use client';

import { useState } from 'react';

function buildRelevantContext(document, question) {
  const words = question.toLowerCase().split(/\W+/).filter(word => word.length > 2);
  const chunks = document.match(/.{1,1800}(?:\s|$)/g) || [];

  return chunks
    .map((chunk, index) => ({
      chunk,
      index,
      score: words.reduce(
        (score, word) => score + (chunk.toLowerCase().split(word).length - 1),
        0
      )
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, 10)
    .map(item => item.chunk)
    .join('\n\n---\n\n')
    .slice(0, 24000);
}

export default function Home() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [pages, setPages] = useState(0);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState('Upload a text-based PDF to get started.');
  const [loading, setLoading] = useState(false);

  async function extractPdf(selectedFile) {
    if (!selectedFile) return;
    if (selectedFile.type !== 'application/pdf') {
      setStatus('Please choose a valid PDF file.');
      return;
    }

    setFile(selectedFile);
    setText('');
    setPages(0);
    setAnswer('');
    setStatus(`Reading ${selectedFile.name}...`);

    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let extracted = '';

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        setStatus(`Reading ${selectedFile.name}... page ${pageNum} of ${pdf.numPages}`);
        const page = await pdf.getPage(pageNum);
        const content = await page.getTextContent();
        extracted += content.items.map(item => item.str).join(' ') + '\n';
      }

      if (!extracted.trim()) {
        setStatus('No readable text found. This PDF may be scanned or image-based.');
        return;
      }

      setText(extracted);
      setPages(pdf.numPages);
      setStatus(`${selectedFile.name} is ready — ${pdf.numPages} pages processed locally in your browser.`);
    } catch (error) {
      setText('');
      setPages(0);
      setStatus(`Could not read this PDF: ${error.message}`);
    }
  }

  async function askQuestion(e) {
    e.preventDefault();
    if (!text || !question.trim()) return;

    setLoading(true);
    setAnswer('');
    setStatus('Finding the most relevant parts and asking AI...');

    try {
      const relevantContext = buildRelevantContext(text, question);
      if (!relevantContext.trim()) throw new Error('Could not find readable text to send to the AI.');

      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, document: relevantContext })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Something went wrong');
      setAnswer(data.answer);
      setStatus('Done.');
    } catch (error) {
      setStatus(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <section className="hero">
        <div className="badge">RAG-inspired PDF intelligence</div>
        <h1>Ask your PDF <span>anything.</span></h1>
        <p>Upload a document, ask a question, and get an answer grounded in the document content.</p>
      </section>

      <section className="card">
        <label className="upload">
          <input type="file" accept="application/pdf" onChange={e => extractPdf(e.target.files?.[0])} />
          <strong>{file ? file.name : 'Choose a PDF'}</strong>
          <span>{file ? `${pages || 'Processing'} pages · ${(file.size / 1024 / 1024).toFixed(1)} MB` : 'Text-based PDFs work best · no app-side upload limit'}</span>
        </label>
        <p className="status">{status}</p>

        {text && (
          <form onSubmit={askQuestion} className="questionBox">
            <textarea
              value={question}
              onChange={e => setQuestion(e.target.value)}
              placeholder="What would you like to know about this document?"
              rows={4}
            />
            <button disabled={loading || !question.trim()}>
              {loading ? 'Analyzing...' : 'Ask AI →'}
            </button>
          </form>
        )}

        {answer && <article className="answer"><h2>Answer</h2><p>{answer}</p></article>}
      </section>

      <p className="footer">Powered by Groq · The PDF is processed in your browser and only relevant text is sent to answer your question.</p>
    </main>
  );
}
