---
title: RAG-Driven Generative AI
type: source
tags: [rag, vector-stores, pipelines]
sources: [RAG-driven generative ai.pdf]
created: 2026-04-12
updated: 2026-04-12
---

# RAG-Driven Generative AI

**Author:** [[Denis Rothman]]  
**Publisher:** Packt (2024)  
**Date ingested:** 2026-04-12  
**Type:** book

## Summary

Full-stack manual for building retrieval-augmented generation systems using [[LlamaIndex]], [[Deep Lake]], [[Pinecone]], [[Chroma]], and OpenAI/Hugging Face models. Begins with RAG fundamentals (retriever/generator/evaluator/trainer components) and walks through embedding pipelines, vector-store governance, and naïve vs modular implementations. Subsequent chapters tackle domain deployments (drone imagery, banks, Wikipedia, meetings, video production), [[Adaptive RAG]] with human feedback, knowledge-graph indices, dynamic collections, and [[Fine-Tuning]] GPT-4o-mini using RAG data. Evaluation, monitoring, and cost management are woven throughout.

## Key Claims

- Production RAG requires disciplined data ops (collection, chunking, embedding, verification) before any generation.
- Retriever, generator, evaluator, trainer, and human feedback loops must collaborate; ignoring evaluation leads to hallucinations.
- Managed vector stores ([[Pinecone]]) suit large, persistent corpora, while lightweight options ([[Chroma]]) enable dynamic, ephemeral contexts.
- Knowledge-graph indices and multimodal ingestion expand coverage beyond vanilla text embeddings.
- [[Fine-Tuning]] on curated RAG datasets (e.g., GPT-4o-mini) complements retrieval for latency-sensitive or offline scenarios.

## Structure

- **Chapter 1 — Why RAG?:** Defines RAG, compares naïve/advanced/modular setups, and introduces the retriever/generator/evaluator/trainer/HF ecosystem.
- **Chapter 2 — [[Deep Lake]] + OpenAI embeddings:** Builds pipelines from raw data to embeddings and vector stores.
- **Chapter 3 — Index-based RAG with [[LlamaIndex]]:** Creates domain search/agent systems with multiple query engines.
- **Chapter 4 — Multimodal RAG for drone tech:** Integrates vision datasets, bounding boxes, and multimodal evaluation.
- **Chapter 5 — [[Adaptive RAG]] with human feedback:** Implements evaluator dashboards and retriever/prompt adjustments based on expert ratings.
- **Chapter 6 — Scaling bank data with [[Pinecone]]:** Demonstrates Kaggle ingestion, clustering, and index governance for churn reduction.
- **Chapter 7 — Knowledge-graph RAG:** Uses Wikipedia API, [[Deep Lake]], and graph indices plus rerankers.
- **Chapter 8 — Dynamic RAG with [[Chroma]]:** Spins up short-lived collections for meetings using Hugging Face Llama backends.
- **Chapter 9 — [[Fine-Tuning]] GPT-4o-mini on RAG data:** Converts non-parametric corpora into tuned checkpoints with monitoring.
- **Chapter 10 — Video stock production:** Coordinates [[Pinecone]] indexes, OpenAI models, and multi-agent workflows for audiovisual content.

## Entities Mentioned

- [[Denis Rothman]] — Author, early embedding innovator.
- [[LlamaIndex]] — Orchestration layer for indices and agents.
- [[Deep Lake]] — Multimodal vector database.
- [[Pinecone]] — Managed vector store for scale.
- [[Chroma]] — Lightweight vector database for dynamic collections.

## Concepts Covered

- [[Retrieval-Augmented Generation]] — Extended with practical pipelines.
- [[Adaptive RAG]] — Human-feedback loops for retrievers/generators.
- [[Knowledge-Graph Indexing]] — Hybrid retrieval technique.
- [[Dynamic RAG Collections]] — Short-lived vector stores.
- [[Agent Memory]] — Persistent knowledge stores bridging RAG and agents.
