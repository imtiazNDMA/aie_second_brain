---
title: KV Cache
type: concept
tags: [inference-optimization, attention, transformer, memory]
sources: [2026-05-09-cache-augmented-generation]
created: 2026-05-09
updated: 2026-05-09
---

# KV Cache

## Definition

The **KV Cache** is the persistent storage of key ($K$) and value ($V$) tensors produced by the [[Self-Attention]] layers of a [[Transformer]] during autoregressive generation. By reusing these tensors across decoding steps, the model avoids recomputing the entire prefix on every new token — turning quadratic-in-prefix cost into linear-in-prefix cost.

## Why it exists

Standard attention computes, for every query token at position $t$:

$$\text{Attention}(q_t, K_{1:t}, V_{1:t}) = \text{softmax}\left(\frac{q_t K_{1:t}^\top}{\sqrt{d_k}}\right) V_{1:t}$$

Without caching, generating token $t$ recomputes $K_{1:t}$ and $V_{1:t}$ from scratch — meaning the cost to generate $T$ tokens is $\Theta(T^2)$. With KV caching:

- $K_{1:t-1}$ and $V_{1:t-1}$ are already stored from prior steps
- Only $k_t$ and $v_t$ need to be computed per step
- Total cost drops to $\Theta(T)$

## Memory cost

For a model with $L$ layers, $H$ heads, head dimension $d_h$, sequence length $T$, and 2 bytes per element (fp16):

$$\text{KV cache size} = 2 \cdot L \cdot H \cdot d_h \cdot T \cdot 2 \text{ bytes}$$

For Llama-3-70B (80 layers, 64 heads, $d_h = 128$) at $T = 128{,}000$:

$$2 \cdot 80 \cdot 64 \cdot 128 \cdot 128{,}000 \cdot 2 \approx 320 \text{ GB}$$

KV-cache memory dominates inference cost at long context lengths — frequently exceeding model parameter memory. This pressure motivated [[Paged Attention]], [[Grouped-Query Attention]], and KV-cache quantization research.

## Architectural variants

- **Multi-Head Attention (MHA)** — full $H$ keys and values per token; highest memory.
- **Multi-Query Attention (MQA)** — $H$ queries share a single $K, V$ pair; $H \times$ memory savings, slight quality loss.
- **[[Grouped-Query Attention]] (GQA)** — $H$ queries split into $G$ groups, each with its own $K, V$; intermediate trade-off used by Llama 2/3, Mistral, etc.

## Operational uses

### Prefill vs decode phases

LLM inference is canonically split into two phases:

- **Prefill** — encode the entire prompt; produces the initial KV cache. Compute-bound; scales linearly with prompt length.
- **Decode** — generate one token at a time, appending one $(k, v)$ pair per layer per step. Memory-bandwidth-bound; scales linearly with output length.

### Prefix sharing

When many requests share a common prefix (system prompt, few-shot examples, document context), the prefix's KV cache can be computed once and reused across requests — substrate for [[Paged Attention]]'s prefix sharing in vLLM.

### [[Cache-Augmented Generation]]

CAG takes prefix sharing to the limit: the entire reference corpus's KV cache is precomputed once, persisted, and reused as the prefix for every query. The cache becomes the knowledge store.

## Quantization and compression

Active research area:
- **8-bit / 4-bit KV-cache quantization** — straightforward 2–4× memory reduction, small quality impact
- **KV-cache eviction** — drop low-importance entries (StreamingLLM, H2O)
- **Cross-layer / cross-head sharing** — exploit redundancy in cache content
- **Token merging** — combine similar adjacent tokens to shrink the cache

## Related Concepts

- [[Self-Attention]] — produces $K$ and $V$
- [[Multi-Head Attention]] — KV cache per head
- [[Grouped-Query Attention]] — KV cache reduction via grouping
- [[Paged Attention]] — OS-paging-inspired KV cache management
- [[Cache-Augmented Generation]] — uses KV cache as knowledge store
- [[Speculative Decoding]] — accelerates decode while preserving cache semantics
- [[Inference Optimization]] — broader hub
- [[FlashAttention]] — kernel that touches KV memory differently (no full materialization)

## Sources

- [[2026-05-09-cache-augmented-generation]] — uses KV cache as the substrate of CAG

## Open Questions

- Quality / memory Pareto frontier for KV-cache quantization at very long context.
- Differential / incremental KV-cache updates when a single document changes.
- Cross-request cache management policies (LRU? semantic similarity?) at scale.
