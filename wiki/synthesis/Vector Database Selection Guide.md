---
title: Vector Database Selection Guide
type: synthesis
tags: [vector-database, rag, infrastructure, embeddings, retrieval]
sources: [2026-04-12-rag-driven-generative-ai, 2026-04-12-llm-engineers-handbook, 2026-04-29-rag-survey]
created: 2026-05-09
updated: 2026-05-09
---

# Vector Database Selection Guide

A vector database is plumbing — you don't pick it for excitement, you pick it for the next two years of your team's operational sanity. This synthesis compares the seven vector stores the wiki has entity pages for ([[Pinecone]], [[Chroma]], [[Weaviate]], [[Qdrant]], [[Faiss]], [[Deep Lake]], [[Meilisearch]]) plus Postgres+pgvector (the substrate this repo uses) along the axes that actually decide a deployment: hosting model, index algorithms, hybrid search support, multi-tenancy, and operational cost.

## The shortlist

| Store | License / Hosting | Core algorithm | Best for | Notable trade-off |
| --- | --- | --- | --- | --- |
| [[Pinecone]] | Managed only (proprietary) | Proprietary, HNSW-like | Enterprise SaaS; large-scale, low-ops | Vendor lock-in; per-query cost at scale |
| [[Weaviate]] | OSS (BSD) + managed | HNSW + flat | Hybrid search out of the box; schema-rich | Schema overhead; heavier than alternatives |
| [[Qdrant]] | OSS (Apache 2) + managed | HNSW (Rust) | Production OSS default; gRPC, payload filters | Newer ecosystem |
| [[Chroma]] | OSS (Apache 2) | HNSW (default), in-process | Local dev, single-process apps, dynamic collections | Not designed for high-concurrency multi-host |
| [[Faiss]] | OSS (MIT, library) | IVF, HNSW, PQ, OPQ, GPU | Library inside your own service | Not a database — no persistence/server |
| [[Deep Lake]] | OSS (MPL-2) + managed | Tensor storage + ANN | Multimodal datasets, RAG + lineage | Heavier setup; dataset-versioning angle |
| [[Meilisearch]] | OSS (MIT) + managed | Inverted index + vector | Keyword + vector hybrid; site search ergonomics | Newer to vector; lighter on ANN tuning |
| Postgres + pgvector | OSS (PG license) | IVF-Flat, HNSW (extension) | Apps already on Postgres; small/mid scale; JOIN-friendly | Slower than purpose-built at very large scale |

## Decision flow

```
Will this run on a managed-cloud vendor?
├── Yes, no operational appetite → Pinecone
├── Yes, want OSS-fallback path → Weaviate Cloud or Qdrant Cloud
└── No → next

Already have Postgres in the stack?
├── Yes, scale < ~50M vectors, latency budget > 50ms → pgvector
└── No → next

Single-process / local dev / desktop app?
└── Chroma

Need first-class hybrid (BM25 + vector) without extra infra?
├── Weaviate or Meilisearch

Need multimodal storage + dataset versioning?
└── Deep Lake

Already have your own service to host an ANN library inside?
└── Faiss

Default OSS production: Qdrant
```

## Key decision axes

### Index algorithm

- **HNSW** (Hierarchical Navigable Small World) — best recall/latency for in-memory; default everywhere
- **IVF** (Inverted File) — better for very large indices that don't fit in RAM; trade recall for memory
- **PQ / OPQ** (Product Quantization) — compress vectors; pair with IVF for billion-scale on a single host
- **Flat / brute-force** — exact; only viable up to ~100K vectors

For < 10M vectors, HNSW everywhere and don't think about it. For 100M+ vectors, the algorithm choice starts to matter a lot, and Faiss / Pinecone / Qdrant give the most knobs.

### Hybrid search (vector + keyword)

Pure vector search loses on exact-match queries (acronyms, IDs, names). Hybrid search combines BM25 (or similar) and vector similarity:

| Store | Hybrid support |
| --- | --- |
| Weaviate | First-class — schema-driven |
| Qdrant | Sparse + dense vectors; manual fusion |
| Pinecone | Sparse-dense (with separate sparse encoder) |
| pgvector | Combine with `pg_trgm` / `tsvector` in app code (this repo's pattern) |
| Meilisearch | Both sides native; designed around hybrid |
| Chroma | Limited |
| Faiss | Library-only; you build it |
| Deep Lake | Limited |

For RAG over technical docs (where IDs, version numbers, code symbols matter), hybrid is non-negotiable. This is why the [[2026-04-29-rag-survey]] highlights it as a default.

### Hosting model

- **Managed only**: Pinecone — zero ops, predictable cost, vendor-locked
- **OSS + managed**: Weaviate, Qdrant, Chroma, Deep Lake — escape hatch to self-host
- **Library**: Faiss — runs inside your service, you own everything
- **Embedded in app database**: pgvector — single backup story, single ops surface

For free-of-cost / localhost-only requirements, the managed path is out. Self-host Qdrant or use pgvector — and for this repo specifically, **pgvector is already wired in via Alembic** (`CLAUDE.md` documents this). Don't add a vector DB you don't need.

### Multi-tenancy

If a single deployment hosts multiple users / vaults / corpora:

| Approach | Stores | Pros | Cons |
| --- | --- | --- | --- |
| Logical partitions / namespaces | Pinecone, Qdrant, Weaviate | Cheap, fast | Filter-based isolation; cross-tenant leakage risk if mis-configured |
| Per-tenant collections | Chroma, Qdrant | Strong isolation | Per-collection overhead; many collections cost more |
| Per-tenant database | pgvector | Strongest isolation | Highest ops cost |

This repo's design is **multi-vault from day one** — see `CLAUDE.md` — using `vault_id` as a column / filter dimension. That's logical-partition style; keeps it cheap.

### Filtering / metadata

Rich payload filters matter when queries are like "RAG papers from 2024 written by author X":

| Store | Filter expressivity |
| --- | --- |
| Qdrant | Rich (must / should / must_not, range, geo) |
| Weaviate | Rich (GraphQL-style) |
| Pinecone | Limited — flat metadata, equality / range |
| pgvector | Full SQL — strongest |
| Chroma | Limited |
| Meilisearch | Strong on text fields |
| Deep Lake | Tensor-shaped queries |

Postgres wins this category by a mile because it's actually a database. That's why "use pgvector if you can" is a defensible default for many RAG apps.

## Operational cost (rough order, 10M vectors, 1024-d)

| Store | Self-hosted RAM | Managed cost / mo | Notes |
| --- | --- | --- | --- |
| Pinecone | N/A | \$70–\$1,000+ | Tiered by pods / queries; predictable but not cheap |
| Qdrant Cloud | ~30GB / 6GB QPS-bound | \$50–\$500+ | Cheaper than Pinecone at scale |
| Weaviate Cloud | ~40GB | \$200–\$1,500+ | Schema overhead = more RAM |
| Chroma (self-hosted) | ~30GB | DIY | Single-host bound |
| pgvector (self-hosted) | ~25GB + DB overhead | DIY | Same Postgres you already run |
| Faiss (in-service) | ~25GB | DIY | No service cost; you pay in eng time |

These are rough — actual numbers depend on dimension, payload size, recall target, and QPS. Treat them as ballpark, not a quote.

## Where the wiki's source guidance lands

- [[2026-04-12-rag-driven-generative-ai]] (Rothman) recommends [[Deep Lake]] for multimodal RAG with dataset versioning, [[Pinecone]] for enterprise scale, and [[Chroma]] for short-lived dynamic collections (meeting-context use case).
- [[2026-04-12-llm-engineers-handbook]] (Iusztin/Labonne) uses [[Qdrant]] for the [[LLM Twin]] case study — production-OSS choice.
- [[2026-04-29-rag-survey]] (Gao et al.) emphasizes hybrid search and metadata filtering as table-stakes for production — pushes toward [[Weaviate]] or rich-filter stores.
- This repo's `CLAUDE.md` commits to Postgres + pgvector + HNSW + 1024-d for the local-first deployment.

## Common pitfalls

1. **Picking on benchmarks alone** — recall@10 on ANN-Benchmarks is a small slice of real cost. Operational fit (filters, multi-tenancy, hybrid, hosting) usually dominates.
2. **Over-buying** — Pinecone for a 100K-vector hobby project is expensive theatre; pgvector handles it on a $5/month VPS.
3. **Locking in too early** — write a thin abstraction over the store before adopting it. The wiki's `CLAUDE.md` embedding-provider plug pattern (`mock` / `ollama` / `anthropic` / `openai`) is the right shape; do the same for the vector store.
4. **Ignoring hybrid search** — pure-vector RAG fails on exact-match queries; hybrid is almost always the right answer for technical content.
5. **Skipping reranking** — the index choice matters less when [[Reranking]] sits on top; spend complexity budget there first.

## Related pages

- [[Pinecone]], [[Chroma]], [[Weaviate]], [[Qdrant]], [[Faiss]], [[Deep Lake]], [[Meilisearch]] — entity pages
- [[Vector Database]] — atomic concept
- [[Embeddings]] — the data model the store holds
- [[Reranking]] — the layer that often masks index-choice differences
- [[Pre-Retrieval Techniques for RAG]] — input-side improvements
- [[RAG Architecture Decision Guide]] — sibling synthesis
- `CLAUDE.md` — this repo's specific choice (pgvector + HNSW + 1024-d)
