---

tags: [concept, inference, llm-serving, architecture, cluster/serving-inference]
sources: ["2026-09-12-hands-on-llm-serving-optimization"]
created: 2026-09-12
updated: 2026-09-12
---


# Prefill-Decode Disaggregation

Architectural pattern separating the prefill phase (parallel prompt processing, compute-bound) from the decode phase (sequential token generation, memory-bandwidth-bound) onto different hardware or configurations. Enables independent optimization of each phase.

## Why Disaggregate

| Phase | Bottleneck | Optimal Hardware |
|---|---|---|
| **Prefill** | Compute (matrix multiply) | High-FLOP GPUs (A100, H100) |
| **Decode** | Memory bandwidth (KV-cache read) | High-bandwidth GPUs (H100 HBM3) |

Running both on the same GPU means decode's memory-bandwidth bottleneck wastes prefill's compute potential, and prefill's compute spikes interfere with decode's latency requirements.

## Architecture Patterns

- **Separate GPUs** — prefill on compute-optimized, decode on bandwidth-optimized
- **KV-cache transfer** — prefill generates KV cache, transfers to decode workers
- **Overlapping** — transfer KV cache while decode processes previous tokens
- **Decision tree** — when to disaggregate vs. co-locate based on concurrency, sequence length, and interconnect

## Trade-offs

- **Benefits**: independent scaling, better hardware utilization, predictable decode latency
- **Costs**: KV-cache transfer overhead, additional GPU memory, network bandwidth requirements
- **When it helps**: high concurrency, long sequences, mixed prefill/decode traffic
- **When it hurts**: low concurrency where transfer overhead dominates

## Related

- [[KV Cache]] — the data structure being transferred
- [[Inference Optimization]] — broader optimization context
- [[Continuous Batching]] — complementary scheduling optimization
- [[Paged Attention]] — memory management for KV cache
- [[FlashAttention]] — attention computation optimization
