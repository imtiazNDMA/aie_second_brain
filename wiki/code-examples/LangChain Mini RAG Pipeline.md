---
title: LangChain Mini RAG Pipeline
type: code-example
tags: [rag, langchain, vector-db]
sources: []
created: 2026-04-12
updated: 2026-04-12
---

# LangChain Mini RAG Pipeline

End-to-end runnable script that ingests a small markdown corpus, builds embeddings with OpenAI (or HuggingFace), stores them in Chroma, and exposes a simple retrieval chain. Mirrors the workflows discussed in [[RAG Evaluation Playbook]] and [[Adaptive RAG]].

## 1. Install Dependencies

```bash
pip install langchain langchain-openai chromadb tiktoken
```

## 2. Environment Setup

```python
import os
from langchain_community.document_loaders import DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA

os.environ["OPENAI_API_KEY"] = "sk-..."  # or use dotenv
```

## 3. Load & Chunk Documents

```python
loader = DirectoryLoader("./docs", glob="*.md")
docs = loader.load()

splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
chunks = splitter.split_documents(docs)
print(f"Loaded {len(docs)} docs -> {len(chunks)} chunks")
```

## 4. Build Vector Store

```python
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
vectordb = Chroma.from_documents(chunks, embedding=embeddings, persist_directory=".chroma")
retriever = vectordb.as_retriever(search_kwargs={"k": 3})
```

## 5. Retrieval-Augmented QA Chain

```python
llm = ChatOpenAI(model_name="gpt-4o-mini", temperature=0)
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=retriever,
    chain_type="stuff"
)

question = "What are the core components of our [[agent memory]] architecture?"
response = qa_chain.run(question)
print(response)
```

## 6. Inspect Retrieved Context

```python
docs = retriever.get_relevant_documents(question)
for i, doc in enumerate(docs, 1):
    print(f"Chunk {i} -> source={doc.metadata.get('source')}")
    print(doc.page_content[:200], "...\n")
```

Extend this template with rerankers, [[RAG Evaluation]] metrics, or LangSmith tracing for observability.
