---
title: Haystack
type: entity
tags: [framework, rag, pipelines]
sources: [2026-04-12-14-types-of-rag]
created: 2026-04-13
updated: 2026-04-13
---

# Haystack

## Summary

Open-source Python framework from deepset for building question-answering and [[Retrieval-Augmented Generation]] pipelines. Provides node-based orchestration (retrievers, generators, rankers), connectors to vector stores (Weaviate, [[Pinecone]], [[Chroma]], Elasticsearch), and production services like document stores and REST APIs.

## Connections

- Works alongside [[LangChain]]/[[LangGraph]] in multi-agent stacks where Haystack manages ingestion, while orchestration frameworks handle conversations.
- Recommended in [[2026-04-12-14-types-of-rag]] as a toolkit for composing advanced RAG variants.
- Integrates with evaluation workflows such as [[RAG Evaluation Playbook]] when logging metrics from retriever/generator nodes.

## Sources

- [[2026-04-12-14-types-of-rag]] — Lists Haystack in the RAG tooling section for modular pipelines.

## Timeline

- **2026-04-12** — Recognized within *14 Types of RAG*; recorded here to keep the tooling catalog complete.
