---
title: Faiss
type: entity
tags: [vector-store, library, similarity-search]
sources: [2026-04-12-14-types-of-rag]
created: 2026-04-13
updated: 2026-04-13
---

# Faiss

## Summary

Facebook AI Similarity Search (Faiss) is a C++/Python library optimized for fast vector similarity search on CPUs and GPUs. It provides indexing structures (IVF, HNSW, PQ, OPQ), quantization schemes, and batched search APIs that underpin high-throughput [[Retrieval-Augmented Generation]] prototypes or on-prem deployments needing full control over data placement.

## Connections

- Frequently embedded inside custom retrievers built with [[LangChain]] or bespoke pipelines.
- Complements lightweight stores such as [[Chroma]] by enabling offline training of compressed indexes that later ship into production.
- Mentioned in [[2026-04-12-14-types-of-rag]] as part of the modular tooling stack alongside Weaviate and Haystack.

## Sources

- [[2026-04-12-14-types-of-rag]] — Cites Faiss in the recommended retrieval toolchain for advanced RAG variants.

## Timeline

- **2026-04-12** — Flagged in *14 Types of RAG* as a go-to library for building custom RAG infrastructure; added to the wiki for completeness.
