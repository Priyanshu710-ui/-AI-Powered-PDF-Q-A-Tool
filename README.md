<div align="center">

# 📄 AI-Powered PDF Q&A Tool

### **Upload a PDF. Ask anything. Get answers grounded in your document.**

[![Live Demo](https://img.shields.io/badge/🚀_LIVE_DEMO-Open_App-6D5DFB?style=for-the-badge)](https://ai-pdf-qa-tool.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Groq](https://img.shields.io/badge/Powered_by-Groq-F55036?style=for-the-badge)](https://groq.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

**🔗 [Open the Live Application →](https://ai-pdf-qa-tool.vercel.app)**

</div>

---

## ✨ What is this?

**AI-Powered PDF Q&A Tool** lets you upload a PDF and interact with its content using natural language.

Want **important questions with answers**? A **summary**? An explanation of a difficult topic? Just upload your document and ask. The app extracts the PDF text in the browser and sends relevant document context to an AI model through the **Groq API**.

> 🎯 Built to make studying, reading long documents, and extracting useful information much faster.

---

## 🚀 Live Demo

<div align="center">

### 👉 **[CLICK HERE TO TRY THE APP](https://ai-pdf-qa-tool.vercel.app)**

</div>

---

## 🔥 Features

| Feature | Description |
|---|---|
| 📤 **PDF Upload** | Upload PDF documents directly from your device |
| 📖 **Browser-side Extraction** | PDF text is extracted in the browser using PDF.js |
| 🤖 **AI-Powered Answers** | Ask questions and receive answers based on your document |
| 🧠 **Automatic Model Selection** | The backend selects an available Groq model instead of relying on one hardcoded model |
| 📚 **Study Assistant** | Generate important questions, answers, summaries, explanations, and more |
| ⚡ **Fast Responses** | Uses Groq's fast inference API |
| 🔒 **Secure API Key Handling** | `GROQ_API_KEY` stays on the server as an environment variable |
| ☁️ **Production Deployment** | Deployed live on Vercel |

---

## 🧠 How It Works

```text

      ┌──────────────────┐
      │    Upload PDF    │
      └────────┬─────────┘
               │
               ▼
      ┌──────────────────┐
      │  PDF.js Extracts │
      │   Document Text  │
      └────────┬─────────┘
               │
               ▼
      ┌──────────────────┐
      │   User Question  │
      └────────┬─────────┘
               │
               ▼
      ┌──────────────────┐
      │ Relevant Context │
      │   + Prompt       │
      └────────┬─────────┘
               │
               ▼
      ┌──────────────────┐
      │    Next.js API   │
      │       Route      │
      └────────┬─────────┘
               │
               ▼
      ┌──────────────────┐
      │     Groq API     │
      │  Available Model │
      └────────┬─────────┘
               │
               ▼
      ┌──────────────────┐
      │   AI Response    │
      └──────────────────┘

```

---

## 🛠️ Tech Stack

<div align="center">

| Technology | Purpose |
|---|---|
| **Next.js 16** | Full-stack React framework |
| **React 19** | User interface |
| **PDF.js** | PDF parsing and text extraction |
| **Groq SDK** | AI inference |
| **Vercel** | Production deployment |

</div>

---

## 💡 Things You Can Ask

Try prompts like:

```text
Give me the most important questions with answers from this PDF.
```

```text
Summarize this chapter in simple words.
```

```text
Explain this topic like I'm a beginner.
```

```text
Create 10 MCQs from this document with answers.
```

```text
What are the most important topics for an exam?
```

---

## ⚙️ Run Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Priyanshu710-ui/-AI-Powered-PDF-Q-A-Tool.git
cd -AI-Powered-PDF-Q-A-Tool
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Add your Groq API key

Create a `.env.local` file:

```env
GROQ_API_KEY=your_groq_api_key_here
```

> ⚠️ Never commit your real API key to GitHub.

### 4️⃣ Start the app

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## ☁️ Deploy on Vercel

1. Import this repository into Vercel.
2. Add the environment variable:

```text
GROQ_API_KEY
```

3. Paste your Groq API key as the value.
4. Redeploy the project.

Your app is ready to go. 🚀

---

## 📁 Project Structure

```text
AI-Powered-PDF-Q-A-Tool/
│
├── app/                 # Next.js app and API routes
├── screenshots/         # Project screenshots
├── env.example          # Environment variable example
├── package.json         # Dependencies and scripts
├── app.py               # Earlier Python implementation
└── README.md
```

---

## 🎯 Why This Project?

This project demonstrates practical skills in:

- Building AI-powered applications
- Integrating third-party AI APIs
- Handling environment variables securely
- Processing PDFs in the browser
- Building full-stack applications with Next.js
- Debugging production deployment issues
- Deploying real applications on Vercel

---

<div align="center">

## ⭐ If you like this project, consider giving it a star!

### Built with ❤️ by [Priyanshu](https://github.com/Priyanshu710-ui)

**[🚀 Try the Live App](https://ai-pdf-qa-tool.vercel.app) · [📂 View Source Code](https://github.com/Priyanshu710-ui/-AI-Powered-PDF-Q-A-Tool)**

</div>
