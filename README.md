# 📄 AI-Powered PDF Q&A Tool

An AI-powered PDF question-answering application that allows users to upload a PDF and ask questions about its content in natural language.

The application uses a **Retrieval-Augmented Generation (RAG)** pipeline to retrieve relevant information from the uploaded document and provide grounded answers using an LLM.

## 🚀 Live Demo

> Coming soon — the application is currently being prepared for deployment.

## ✨ Features

- 📄 Upload text-based PDF documents
- 🔍 Extract and process PDF content automatically
- ✂️ Split documents into overlapping text chunks
- 🧠 Generate local embeddings using Sentence Transformers
- ⚡ Perform fast semantic search using FAISS
- 🤖 Generate answers using the Groq API
- 📚 Retrieve relevant document context before answering
- 🔎 View the retrieved context used for an answer
- 💻 Simple and interactive Streamlit interface

## 🧠 RAG Architecture

The application follows this pipeline:

```text
                 PDF Upload
                     │
                     ▼
              PDF Text Extraction
                  (PyPDF2)
                     │
                     ▼
               Text Chunking
            800 chars + overlap
                     │
                     ▼
          Sentence Transformer
          (all-MiniLM-L6-v2)
                     │
                     ▼
               FAISS Index
                     │
                     │
             User Question
                     │
                     ▼
          Question Embedding
                     │
                     ▼
          Similarity Search
                     │
                     ▼
          Relevant PDF Chunks
                     │
                     ▼
               Groq LLM
          (Llama 3.1 8B Instant)
                     │
                     ▼
                Final Answer