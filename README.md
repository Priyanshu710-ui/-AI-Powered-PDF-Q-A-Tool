# 📄 AI-Powered PDF Q&A Tool

<p align="center">
  <b>Chat with your PDFs using Retrieval-Augmented Generation.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/AI-RAG%20Pipeline-6E56CF" alt="RAG">
  <img src="https://img.shields.io/badge/UI-Streamlit-FF4B4B?logo=streamlit" alt="Streamlit">
  <img src="https://img.shields.io/badge/Search-FAISS-009688" alt="FAISS">
  <img src="https://img.shields.io/badge/LLM-Groq-orange" alt="Groq">
</p>

## 🌟 Overview

**AI-Powered PDF Q&A Tool** lets users upload a text-based PDF and ask questions about its contents in natural language. Instead of sending an entire document blindly to an LLM, the application uses a **Retrieval-Augmented Generation (RAG)** workflow to retrieve the most relevant context before generating an answer.

## ✨ Features

- 📤 Upload PDF documents
- 📖 Extract and process document text
- ✂️ Split content into overlapping chunks
- 🧠 Generate embeddings with Sentence Transformers
- 🔎 Perform semantic similarity search with FAISS
- 🤖 Generate answers using the Groq API
- 📚 Ground responses in retrieved PDF context
- 🔍 Inspect the context used to answer a question
- 💻 Interact through a simple Streamlit interface

## 🧠 RAG Pipeline

```text
PDF Upload
   ↓
Text Extraction ──► Chunking
                       ↓
              Sentence Transformers
                       ↓
                  FAISS Index
                       ↓
User Question ──► Question Embedding
                       ↓
                Similarity Search
                       ↓
                Relevant Context
                       ↓
                    Groq LLM
                       ↓
                  Final Answer
```

## 🛠️ Tech Stack

| Area | Technology |
|---|---|
| Interface | Streamlit |
| PDF Processing | PyPDF2 |
| Embeddings | Sentence Transformers |
| Vector Search | FAISS |
| LLM Inference | Groq API |
| Language | Python |

## ⚙️ Installation

```bash
git clone https://github.com/Priyanshu710-ui/-AI-Powered-PDF-Q-A-Tool.git
cd -AI-Powered-PDF-Q-A-Tool
```

Install the project dependencies:

```bash
pip install -r requirements.txt
```

Configure the required API credentials, then start the Streamlit application using the repository's app entry point.

## 🎯 Use Cases

- 📚 Study and research assistance
- 📑 Question answering over notes and reports
- 🔎 Fast document exploration
- 🧠 RAG and vector-search experimentation

## 🔮 Future Improvements

- Support multiple PDFs in one knowledge base
- Add chat history and document persistence
- Improve source citations
- Support scanned PDFs with OCR
- Add deployment and authentication

## 👨‍💻 Author

**Priyanshu Sharma**

[![GitHub](https://img.shields.io/badge/GitHub-Priyanshu710--ui-181717?logo=github)](https://github.com/Priyanshu710-ui)

---

<p align="center">Built to explore practical RAG systems and AI-powered document intelligence. ⭐</p>
