'use client';

import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState('Upload a text-based PDF to get started.');
  const [loading, setLoading] = useState(false);

  async function extractPdf(selectedFile) {
    if (!selectedFile) return;
    if (selectedFile.size > 8 * 1024 * 1024) {
      setStatus('Please use a PDF smaller than 8 MB.');
      return;
    }
    setFile(selectedFile);
    setAnswer('');
    setStatus('Reading PDF...');
    try {
      const pdfjsLib = await import('pdfjs-dist');
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let extracted = '';
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const content = await page.getTextContent();
        extracted += content.items.map(item => item.str).join(' ') + '\n';
      }
      if (!extracted.trim()) {
        setStatus('No readable text found. This PDF may be scanned or image-based.');
        setText('');
        return;
      }
      setText(extracted);
      setStatus(`${selectedFile.name} is ready — ${pdf.numPages} pages indexed in your browser.`);
    } catch (error) {
      setStatus(`Could not read this PDF: ${error.message}`);
      setText('');
    }
  }

  async function askQuestion(e) {
    e.preventDefault();
    if (!text || !question.trim()) return;
    setLoading(true);
    setAnswer('');
    setStatus('Thinking...');
    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, document: text })
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
          <span>Text-based PDFs work best · up to 8 MB</span>
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

      <p className="footer">Powered by Groq · Your PDF text is processed only to answer your question.</p>
    </main>
  );
}
