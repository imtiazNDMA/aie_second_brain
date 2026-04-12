---
title: LangChain
type: entity
tags: [framework, rag, orchestration]
sources: [2026-04-12-rag-driven-generative-ai]
created: 2026-04-12
updated: 2026-04-12
---

# LangChain

Open-source framework for composing LLM chains—retrievers, prompt templates, tool calls, and agents—used heavily in modern RAG pipelines.

## Summary

- Provides document loaders, chunkers, text splitters, rerankers, and vector-store integrations (Chroma, Pinecone, Deep Lake).
- Serves as the backbone for the [[LangChain Mini RAG Pipeline]] example and the workflows described in [[2026-04-12-rag-driven-generative-ai]].
- Works with orchestration overlays like [[LangGraph]] for deterministic state machines.

## Connections

- [[Adaptive RAG]] – Uses LangChain callbacks to capture evaluator scores.
- [[Knowledge-Graph Indexing]] – Implements graph indices for entity-aware retrieval.
