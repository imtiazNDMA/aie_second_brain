---
tags: [entity, tool, llm-serving, kv-cache, storage]
sources: ["2026-09-12-hands-on-llm-serving-optimization"]
created: 2026-09-12
updated: 2026-09-12
---

# LMCache

Tiered KV-cache storage system that extends KV-cache capacity beyond GPU memory into CPU, SSD, and distributed storage. Enables larger batch sizes and longer sequences by offloading less-active cache entries.

## Architecture

| Tier | Storage | Latency | Capacity |
|---|---|---|---|
| **GPU HBM** | On-device | Lowest | Limited (e.g., 80GB) |
| **CPU DRAM** | Host memory | Medium | Larger (e.g., 512GB) |
| **SSD** | NVMe storage | Higher | Much larger (e.g., 4TB) |
| **Distributed** | Network storage | Highest | Essentially unlimited |

## Key Features

- **Cache-aware routing** — directs requests to appropriate tier based on cache state
- **Prefix caching** — avoids repeated prefill for shared prefixes
- **Eviction policies** — LRU, frequency-based, or custom policies for tier migration
- **KV-cache compression** — quantization and pruning to reduce storage footprint

## Use Cases

- High-concurrency serving where GPU memory is exhausted
- Long-sequence workloads with large KV caches
- Multi-tenant serving with shared prefix caches
- Cost optimization by trading latency for capacity

## Related

- [[KV Cache]] — the data structure being managed
- [[Paged Attention]] — memory management within GPU
- [[Inference Optimization]] — broader serving context
- [[vLLM]] — serving engine with KV-cache management
- [[Prefill-Decode Disaggregation]] — complementary architecture
