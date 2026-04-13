---
title: Qdrant
type: entity
tags: [vector-store, managed, rag]
sources: [2026-04-12-llm-engineers-handbook]
created: 2026-04-13
updated: 2026-04-13
---

# Qdrant

## Summary

Open-source vector database (Rust core, REST/gRPC APIs) with managed cloud offering. Used in the LLM Twin pipeline for storing embeddings and powering [[Adaptive RAG]] queries.

## Capabilities

- HNSW-based indexes with payload filters.
- Snapshot/replication for reliability.
- Integration SDKs for Python, JS, Go.

## Usage

- Connect via [[LangChain]] or [[LlamaIndex]] retrievers.
- Combine with [[ZenML]] pipelines to automate ingestion of personal corpora.

## Sources

- [[2026-04-12-llm-engineers-handbook]] — Recommends Qdrant in the Feature-Training-Inference Architecture.
