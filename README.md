# 📄 AI-Powered PDF Q&A Tool

> Upload a document, ask a question, and get AI-assisted answers from your content.

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![AI](https://img.shields.io/badge/AI-Document%20Intelligence-7c3aed?style=for-the-badge)

## 🧠 Document Intelligence Pipeline
```mermaid
flowchart LR
    A[📄 PDF Upload] --> B[📖 Text Extraction]
    B --> C[🧩 Context Processing]
    C --> D[❓ User Question]
    D --> E[🧠 AI Reasoning]
    E --> F[💬 Grounded Answer]
```

## 🏗️ Architecture
```mermaid
flowchart TB
    U[👤 User] --> UI[Frontend]
    UI --> APP[Application Layer]
    APP --> PDF[Document Processing]
    APP --> AI[AI Q&A Engine]
    PDF --> AI
    AI --> UI
```

## 🔄 Question Flow
```mermaid
sequenceDiagram
    participant U as User
    participant A as App
    participant P as PDF Context
    participant AI as AI Engine
    U->>A: Upload PDF
    A->>P: Extract relevant content
    U->>A: Ask question
    A->>AI: Question + context
    AI-->>A: Answer
    A-->>U: Display response
```

## 🗺️ Feature Map
```mermaid
mindmap
  root((PDF Q&A))
    Upload
    Text Extraction
    Context
    AI Reasoning
    Answers
```

## 📂 Project Blueprint
```text
├── app.py
├── app/
├── requirements.txt
├── package.json
├── screenshots/
└── env.example
```

---

### 👨‍💻 Created by **Priyanshu**
