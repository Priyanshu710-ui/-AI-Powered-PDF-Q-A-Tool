"""
AI-Powered PDF Q&A Tool
------------------------
Upload a PDF, ask questions about it, get instant answers using
a Retrieval-Augmented Generation (RAG) pipeline.

Stack:
- Streamlit          -> UI
- PyPDF2             -> PDF text extraction
- sentence-transformers -> local, free embeddings
- FAISS              -> local vector similarity search
- Groq API           -> free-tier LLM for generating answers
"""

import os
import numpy as np
import streamlit as st
from PyPDF2 import PdfReader
from sentence_transformers import SentenceTransformer
import faiss
from groq import Groq

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------
st.set_page_config(page_title="PDF Q&A Tool", page_icon="📄", layout="wide")

CHUNK_SIZE = 800          # characters per chunk
CHUNK_OVERLAP = 150       # overlap between chunks to preserve context
TOP_K = 4                 # number of chunks retrieved per question
EMBED_MODEL_NAME = "all-MiniLM-L6-v2"
LLM_MODEL_NAME = "llama-3.1-8b-instant"   # fast + free on Groq


@st.cache_resource(show_spinner=False)
def load_embedder():
    return SentenceTransformer(EMBED_MODEL_NAME)


def extract_text(pdf_file) -> str:
    reader = PdfReader(pdf_file)
    text = ""
    for page in reader.pages:
        page_text = page.extract_text() or ""
        text += page_text + "\n"
    return text


def chunk_text(text: str, chunk_size: int = CHUNK_SIZE, overlap: int = CHUNK_OVERLAP):
    chunks = []
    start = 0
    text = " ".join(text.split())  # normalize whitespace
    while start < len(text):
        end = start + chunk_size
        chunks.append(text[start:end])
        start += chunk_size - overlap
    return [c for c in chunks if c.strip()]


def build_index(chunks, embedder):
    embeddings = embedder.encode(chunks, show_progress_bar=False)
    embeddings = np.array(embeddings).astype("float32")
    index = faiss.IndexFlatL2(embeddings.shape[1])
    index.add(embeddings)
    return index, embeddings


def retrieve(question, embedder, index, chunks, k=TOP_K):
    q_embedding = embedder.encode([question]).astype("float32")
    distances, indices = index.search(q_embedding, k)
    return [chunks[i] for i in indices[0] if i < len(chunks)]


def ask_llm(question, context_chunks, api_key):
    client = Groq(api_key=api_key)
    context = "\n\n---\n\n".join(context_chunks)

    prompt = f"""Answer the question using ONLY the context below.
If the answer isn't in the context, say "I couldn't find that in the document."

Context:
{context}

Question: {question}

Answer:"""

    response = client.chat.completions.create(
        model=LLM_MODEL_NAME,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2,
        max_tokens=500,
    )
    return response.choices[0].message.content


# ---------------------------------------------------------------------------
# UI
# ---------------------------------------------------------------------------
st.title("📄 AI-Powered PDF Q&A Tool")
st.caption("Upload a PDF and ask questions about it — answers come straight from your document.")

with st.sidebar:
    st.header("⚙️ Setup")
    api_key = st.text_input(
        "Groq API Key",
        type="password",
        help="Get a free key at https://console.groq.com/keys",
    )
    st.markdown("---")
    st.markdown(
        "**How it works**\n"
        "1. Your PDF is split into chunks\n"
        "2. Each chunk is embedded locally\n"
        "3. Your question retrieves the most relevant chunks\n"
        "4. An LLM answers using only those chunks"
    )

uploaded_file = st.file_uploader("Upload a PDF", type=["pdf"])

if "index" not in st.session_state:
    st.session_state.index = None
    st.session_state.chunks = None
    st.session_state.filename = None

if uploaded_file is not None and st.session_state.filename != uploaded_file.name:
    with st.spinner("Reading and indexing your PDF..."):
        embedder = load_embedder()
        raw_text = extract_text(uploaded_file)

        if not raw_text.strip():
            st.error("Couldn't extract text from this PDF. It may be a scanned image without OCR.")
        else:
            chunks = chunk_text(raw_text)
            index, _ = build_index(chunks, embedder)
            st.session_state.index = index
            st.session_state.chunks = chunks
            st.session_state.filename = uploaded_file.name
    st.success(f"Indexed {uploaded_file.name} ({len(st.session_state.chunks)} chunks)")

if st.session_state.index is not None:
    st.markdown("---")
    question = st.text_input("Ask a question about the document")

    if question:
        if not api_key:
            st.warning("Add your Groq API key in the sidebar to get answers.")
        else:
            with st.spinner("Thinking..."):
                embedder = load_embedder()
                relevant_chunks = retrieve(
                    question, embedder, st.session_state.index, st.session_state.chunks
                )
                try:
                    answer = ask_llm(question, relevant_chunks, api_key)
                    st.markdown("### Answer")
                    st.write(answer)

                    with st.expander("Show retrieved context"):
                        for i, chunk in enumerate(relevant_chunks, 1):
                            st.markdown(f"**Chunk {i}:** {chunk}")
                except Exception as e:
                    st.error(f"Something went wrong: {e}")
else:
    st.info("Upload a PDF to get started.")
