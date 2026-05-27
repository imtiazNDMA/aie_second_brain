---
title: IVF
type: concept
tags: [vector-search, ann, indexing, retrieval]
sources: []
created: 2026-05-10
updated: 2026-05-10
---

# IVF

## Definition

**IVF** (Inverted File index) is an approximate nearest-neighbor algorithm that partitions the vector space into Voronoi cells via k-means clustering, then searches only the cells closest to the query at query time. IVF's strength is **billion-scale** corpora that don't fit comfortably in RAM — it pairs naturally with **product quantization (PQ)** to compress vectors and make the approach memory-efficient. IVF is the canonical alternative to [[HNSW]] when you need scale, lossy compression, or out-of-RAM serving.

## How it works (sketch)

**Indexing**:
1. Run k-means on a sample of vectors to learn $K$ cluster centroids ("inverted lists")
2. Assign each vector to the cluster of its nearest centroid
3. Store an inverted list per cluster: cluster_id → [vector_ids in this cluster]

**Query**:
1. Find the $n_\text{probe}$ centroids closest to the query (a small linear scan over $K$ centroids)
2. Search only the vectors in those $n_\text{probe}$ clusters
3. Return the top-K within those clusters

`nprobe` is the recall-vs-speed dial: higher = more recall, more comparisons.

## IVF + PQ (the production combo)

Plain IVF stores full vectors; at billion-scale this is too expensive. The standard combo is **IVF-PQ**:

1. IVF for coarse partitioning (which cells to look at)
2. **Product Quantization** for fine compression — each vector is split into $m$ sub-vectors, each quantized to one of $2^b$ codewords, producing an $m \cdot b$-bit fingerprint (typically 32–256 bits per vector, vs. 4 KB uncompressed)
3. Distance computation uses precomputed lookup tables; very fast

IVF-PQ at 100-byte vectors gives 40× compression vs. fp32 with modest recall loss, which is what makes billion-scale serving on commodity hardware affordable.

## Hyperparameters

| Parameter | Effect | Typical |
| --- | --- | --- |
| $K$ (number of clusters) | Granularity of partitioning | 1K–10K (rule of thumb: $K \approx \sqrt{N}$) |
| `nprobe` | Number of clusters searched per query | 1–100 |
| $m$ (PQ sub-vectors) | Compression granularity | 8–64 |
| $b$ (PQ bits per code) | Per-codebook resolution | typically 8 |

## When to use IVF over HNSW

| Scenario | IVF wins | HNSW wins |
| --- | --- | --- |
| Billion-scale corpus | ✓ | — |
| Memory-constrained serving | ✓ (with PQ) | — |
| Million-scale, RAM-resident | — | ✓ |
| Latency-critical, recall-sensitive | — | ✓ |
| Bulk loading / batch updates | ✓ | mixed |
| Streaming inserts | mixed | ✓ |

For corpus sizes under ~50M vectors with sufficient RAM, [[HNSW]] is almost always the better choice. IVF earns its keep at scale.

## Where IVF appears

- **[[Faiss]]** — reference implementation of IVF-Flat, IVF-PQ, IVF-OPQ
- **Milvus** — IVF variants alongside HNSW
- **[[Pinecone]]** — uses proprietary indexing; IVF-class techniques internally
- **[[Qdrant]]** — supports IVF-flat for specific use cases (HNSW is default)

## Related Concepts

- [[HNSW]] — primary alternative
- [[Vector Database]] — substrate
- [[Embeddings]] — the data being indexed
- [[Faiss]] — canonical library
- [[Vector Database Selection Guide]] — synthesis covering store choice
- [[Reranking]] — typical downstream compensation for approximation

## Open Questions

- IVF-PQ quality cliff vs uncompressed at 100M+ vectors
- Optimal product-quantization parameter selection per workload
- Hybrid IVF (coarse) + HNSW (fine) approaches
