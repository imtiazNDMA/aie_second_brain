---
title: HNSW
type: concept
tags: [vector-search, ann, indexing, retrieval]
sources: []
created: 2026-05-10
updated: 2026-05-10
---

# HNSW

## Definition

**HNSW** (Hierarchical Navigable Small World) is the dominant approximate nearest-neighbor (ANN) index algorithm for vector search in 2024–2026. Introduced by Malkov & Yashunin (2016), HNSW builds a multi-layer proximity graph where the top layer contains a sparse set of "highway" nodes and each successive layer adds detail; queries descend the layers, greedily following edges that get closer to the target vector. HNSW dominates because it gives the best recall-vs-latency Pareto curve for in-memory indices at the corpus sizes (1M–1B vectors) most production systems serve.

## How it works (sketch)

**Construction**: each vector is inserted into the graph with up to $M$ outgoing edges per layer. The vector's top layer is sampled from a geometric distribution — most vectors live only on layer 0 (the bottom, full graph), a few reach higher layers, very few reach the top.

**Query**: starts at an entry point on the top layer; greedily walks edges toward the query; descends to the next layer when no neighbor improves; on layer 0, runs best-first search with a beam of size `efSearch` to collect candidates.

The hierarchy is what makes HNSW work — the sparse top layers act as a routing structure that gets the search close to the target in $O(\log N)$ steps; layer 0 then refines locally.

## Hyperparameters

| Parameter | Effect | Typical |
| --- | --- | --- |
| $M$ | Max neighbors per node per layer | 16–32 |
| `efConstruction` | Beam width during insertion (build quality) | 100–400 |
| `efSearch` | Beam width during query (recall vs speed) | 50–200 |

Higher $M$ and `efConstruction` build a better graph at higher memory + build time; higher `efSearch` raises recall at higher query latency.

## Why HNSW dominates

- **Best Pareto for in-memory indices** — recall@10 of ~0.95–0.99 at sub-millisecond query latency on million-vector indices
- **Incremental** — insertions are cheap; no full rebuild needed
- **Predictable** — query latency variance is low compared to tree-based methods
- **Battle-tested** — production-proven in [[Pinecone]], [[Weaviate]], [[Qdrant]], pgvector, Milvus, Faiss, and most managed stores

## When HNSW loses

- **Vector count exceeds RAM** — HNSW is memory-resident; at billion-scale, [[IVF]] + product quantization wins
- **Bulk write workloads** — incremental inserts are cheap but bulk reindex is sometimes faster with [[IVF]]
- **Disk-heavy / cold-start** — HNSW cold-load is slow; on-disk variants exist but trade recall

## Related Concepts

- [[IVF]] — alternative ANN algorithm for very large indices
- [[Vector Database]] — substrate that hosts HNSW
- [[Embeddings]] — the data HNSW indexes
- [[Vector Database Selection Guide]] — synthesis on store choice
- [[Reranking]] — typical downstream layer that compensates for ANN approximation

## Open Questions

- HNSW with quantized vectors — quality cliff vs uncompressed
- Hybrid HNSW + IVF for billion-scale workloads
- On-disk HNSW (DiskANN, Vamana) practicality at production QPS
