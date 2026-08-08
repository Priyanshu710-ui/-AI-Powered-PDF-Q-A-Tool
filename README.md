# 📄 AI-Powered PDF Q&A Tool

Upload any PDF and ask questions about it in plain English — get instant, accurate answers pulled directly from the document using a Retrieval-Augmented Generation (RAG) pipeline.

> Built to explore how RAG pipelines work end-to-end: chunking, embeddings, vector search, and grounded LLM generation — without relying on a paid API.

<!-- Add a demo GIF/screenshot here once deployed. Tools like ScreenToGif or Kap work well. -->
<!-- ![demo](assets/demo.gif) -->

## 🚀 Live Demo

[Add your deployed Streamlit link here once you deploy]

## ✨ Features

- Upload any text-based PDF (notes, research papers, resumes, reports)
- Ask natural language questions and get grounded answers (no hallucinated info outside the document)
- See exactly which chunks of the document were used to generate each answer
- Runs on free-tier infrastructure end-to-end — no paid API keys required

## 🧠 How It Works

1. **Extract** — PDF text is pulled out using PyPDF2
2. **Chunk** — Text is split into overlapping ~800-character chunks to preserve context
3. **Embed** — Each chunk is converted into a vector using a local `sentence-transformers` model (`all-MiniLM-L6-v2`)
4. **Index** — Vectors are stored in a FAISS index for fast similarity search
5. **Retrieve** — When you ask a question, it's embedded too, and the most relevant chunks are retrieved
6. **Generate** — Retrieved chunks + your question are sent to an LLM (via Groq's free API) which answers using only that context

## 🛠️ Tech Stack

| Layer | Tool |
|---|---|
| UI | Streamlit |
| PDF parsing | PyPDF2 |
| Embeddings | sentence-transformers (local, free) |
| Vector search | FAISS |
| LLM | Groq API (Llama 3.1 8B, free tier) |

## 📦 Setup & Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/<your-username>/pdf-qa-tool.git
cd pdf-qa-tool

# 2. Create a virtual environment (recommended)
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run the app
streamlit run app.py
```

Then, in the sidebar, paste a free Groq API key (get one at [console.groq.com/keys](https://console.groq.com/keys)) and upload a PDF.

## 📁 Project Structure

```
pdf-qa-tool/
├── app.py              # Main Streamlit app (UI + RAG pipeline)
├── requirements.txt    # Dependencies
├── .env.example         # Template for environment variables
└── README.md
```

## 🗺️ Roadmap / What I'd Improve Next

- [ ] Support multiple PDFs at once (multi-document Q&A)
- [ ] Add chat history / conversational memory
- [ ] Swap FAISS for a persistent vector DB (e.g. Chroma) so the index survives restarts
- [ ] Add OCR support for scanned PDFs (via Tesseract)
- [ ] Deploy with Docker for easier hosting

## 📄 License

MIT — feel free to use this as a learning reference or starting point.
