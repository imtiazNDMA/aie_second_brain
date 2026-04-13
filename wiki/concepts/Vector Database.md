---
title: Vector Database
type: concept
tags: [rag, storage, infrastructure]
sources: [2026-04-12-rag-driven-generative-ai, 2026-04-12-llm-engineers-handbook, 2026-04-12-14-types-of-rag]
created: 2026-04-13
updated: 2026-04-13
---

# Vector Database

## Definition

Purpose-built storage layer for dense embeddings and metadata. Vector databases power [[Retrieval-Augmented Generation]] by indexing semantic vectors (FAISS, [[Weaviate]], [[Qdrant]], [[Pinecone]], [[Chroma]]) and executing similarity search, filtering, and lifecycle management (ingest, update, delete).

## Core Capabilities

- **Index structures** — IVF, HNSW, product quantization for fast approximate nearest neighbor search.
- **Metadata filters** — Boolean/structured filters applied alongside cosine or dot-product similarity.
- **Replication & persistence** — Snapshots, WAL, cloud backups so RAG memory survives restarts.
- **Hybrid search** — Combine keyword/BM25 with dense vectors for higher precision (e.g., Weaviate, Meilisearch connectors).

## When to Use

- Any RAG workload where embeddings exceed simple in-memory arrays.
- Agent memory systems that need long-lived stores with governance (access controls, audit logs).
- Feature pipelines described in [[Feature-Training-Inference Architecture]] that share embeddings across services.

## Related Concepts

- [[Embeddings]]
- [[Reranking]]
- [[Dynamic RAG Collections]]
- [[Knowledge-Graph Indexing]]
