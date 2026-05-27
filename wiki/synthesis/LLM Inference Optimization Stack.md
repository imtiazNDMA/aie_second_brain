---
title: LLM Inference Optimization Stack
type: synthesis
tags: [inference, optimization, serving, deployment, kv-cache, attention]
sources: [2026-05-09-cache-augmented-generation, 2026-04-12-attention-is-all-you-need, 2026-04-12-deep-learning-with-pytorch]
created: 2026-05-09
updated: 2026-05-09
---

# LLM Inference Optimization Stack

Serving an LLM economically means attacking three bottlenecks in order: **memory bandwidth** (decode is bandwidth-bound, not compute-bound), **memory capacity** (KV cache dominates at long context), and **per-request latency** (token-by-token autoregression). This synthesis maps every optimization in the wiki to the bottleneck it relieves and stacks them into a deployment recipe — from kernel-level ([[FlashAttention]]) up through inference engines ([[vLLM]]) and architectural variants ([[Cache-Augmented Generation]]).

## The bottlenecks, ranked

| Bottleneck | Symptom | Typical share of cost | Primary fixes |
| --- | --- | --- | --- |
| KV-cache memory | OOM at long context, batch-size cap | 50–80% of GPU RAM at 128K context | [[Grouped-Query Attention]], [[Paged Attention]], KV quantization |
| Memory bandwidth (decode) | Tokens/sec saturates well below FLOPS | 60–90% of decode time | [[FlashAttention]], [[Speculative Decoding]], batching |
| Prefill compute | Long-prompt p99 | Dominant for RAG with many chunks | Prefix sharing, [[Cache-Augmented Generation]] |
| Cold start | Tail latency, autoscaling pain | Variable | Model preloading, weight streaming |

Decode is *memory-bandwidth-bound*: the compute per token is small (one row of the attention output, one MLP pass) and the bottleneck is reading the KV cache and weights from HBM. This is the single most important fact in LLM serving — every optimization below either reduces what's read, reads it faster, or amortizes a read across multiple tokens.

## Optimization stack (bottom-up)

### Layer 1 — Attention kernel

| Technique | What it does | When | Source |
| --- | --- | --- | --- |
| [[FlashAttention]] | Tiled IO-aware exact attention; never materializes the N×N matrix; uses online softmax in SRAM | Always — strictly better than naive attention | Dao et al. 2022 |
| [[Scaled Dot-Product Attention]] | The base operation FlashAttention reorders | Reference; foundation only | [[2026-04-12-attention-is-all-you-need]] |

FlashAttention is non-negotiable in any modern serving stack. It is exact (no approximation), 2–4× faster on long sequences, and reduces attention's HBM reads from O(N²) to O(N).

### Layer 2 — Architectural KV reductions

| Technique | KV memory savings | Quality cost | When |
| --- | --- | --- | --- |
| Multi-Head Attention (MHA) | Baseline | None | Default — small models |
| [[Grouped-Query Attention]] (GQA) | 4–8× (group size dependent) | ~1% on benchmarks | Default for production — Llama 2/3, Mistral, Gemma 2/3 |
| Multi-Query Attention (MQA) | H× (full heads) | Modest, larger on hard tasks | Latency-extreme deployments |

GQA is now the default in open-weights models because the KV-memory win pays for the marginal quality loss many times over at long context. If you control training, always train with GQA.

### Layer 3 — KV cache management

| Technique | Mechanism | Win | Notes |
| --- | --- | --- | --- |
| [[KV Cache]] | Reuse past K/V across decode steps | Quadratic → linear in prefix length | The baseline — every decoder uses this |
| [[Paged Attention]] | OS-paging-style fixed blocks + block table | Eliminates fragmentation, enables prefix sharing, ~2× throughput | vLLM's core innovation |
| KV quantization (8-bit, 4-bit) | Lower precision for K/V tensors | 2–4× memory | Small quality loss at 8-bit; tighter at 4-bit |
| Prefix sharing | Compute system prompt / few-shot KV once, reuse | Huge for chat / RAG | Substrate for [[Cache-Augmented Generation]] |
| Cache eviction (StreamingLLM, H2O) | Drop low-importance entries | Bounded cache at unbounded context | Quality varies by workload |

Memory math worth memorizing — for a model with $L$ layers, $H$ heads, head dim $d_h$, sequence length $T$, fp16:

$$\text{KV cache} = 2 \cdot L \cdot H \cdot d_h \cdot T \cdot 2 \text{ bytes}$$

Llama-3-70B at 128K context = ~320 GB of KV cache. That is why GQA + paged attention + quantization are non-optional at long context.

### Layer 4 — Decode-time tricks

| Technique | What it does | Speedup | When |
| --- | --- | --- | --- |
| [[Speculative Decoding]] | Small draft model proposes K tokens, large model verifies in one pass | 2–3× wall-clock | Always profitable when a good draft model exists |
| Continuous batching | Pack different requests in different decode steps into one batch | 5–20× throughput | Multi-request serving (vLLM, TGI, TensorRT-LLM) |
| Chunked prefill | Slice long prefills into chunks interleaved with decode | Lower TTFT under load | Production inference engines |

[[Speculative Decoding]] preserves the target model's exact output distribution — there is no quality trade. The draft model needs to agree on token ~50%+ of the time to net out positive; for most workloads a 7B draft + 70B target hits that easily.

### Layer 5 — Architectural alternatives

| Technique | When it replaces standard inference | Source |
| --- | --- | --- |
| [[Cache-Augmented Generation]] | Bounded knowledge base fits in long context | [[2026-05-09-cache-augmented-generation]] |
| [[Long Context Models]] | Use one giant context instead of retrieval for tail queries | Same |

CAG flips the bottleneck inside-out: instead of paying for retrieval per query, you precompute the entire corpus's KV cache once and reuse it forever. Right answer when corpus is stable, fits in 1–2M tokens, and query volume is high enough to amortize prefill.

### Layer 6 — Engines and runtimes

| Engine | Stack | Best for | Notes |
| --- | --- | --- | --- |
| [[vLLM]] | PagedAttention + continuous batching + speculative + prefix sharing | High-throughput multi-request serving | OSS default; supports most open weights |
| TGI (Hugging Face Text Generation Inference) | Similar feature set, HF-native | HF ecosystem integration | Solid second |
| TensorRT-LLM (NVIDIA) | Compiled kernels + plugins | Latency-critical, NVIDIA-only | Hardest to deploy |
| llama.cpp | CPU + Metal + CUDA, GGUF format | Local / edge / Apple Silicon | Single-user; no batching |
| Ollama (over llama.cpp) | UX layer | Local dev, single-user | The target for this repo's local-first deploy |
| [[TorchServe]] | Generic PyTorch serving | Non-LLM models, multi-model | Less LLM-specialized |
| [[TorchScript]] | Graph-export format | Edge / non-Python deploys | Pre-LLM-era; mostly legacy for LLMs |

For the local A6000 Ada / 48GB target with free-of-cost / Ollama constraints, **Ollama (llama.cpp)** is the right choice for single-user latency. For shared / multi-request internal serving, vLLM with GQA + paged attention is the default.

## Recipe by deployment topology

### Local single-user (this repo's default)

- Engine: Ollama / llama.cpp
- Quantization: 4-bit GGUF (Q4\_K\_M)
- Attention: GQA models (Gemma, Llama 3, Mistral, Qwen) preferred
- KV: in-RAM, no paging needed (single concurrent stream)
- Skip: speculative decoding (overhead > benefit for one stream), continuous batching

### Internal multi-request server

- Engine: vLLM
- Architecture: GQA + FlashAttention
- KV: paged + 8-bit quantized
- Decode: continuous batching + speculative (small same-family draft)
- Prefix: enable prefix sharing for system-prompt / RAG-context reuse

### High-volume RAG with stable corpus

- All of the above, plus
- [[Cache-Augmented Generation]]: precompute corpus KV cache, persist
- Hybrid: CAG for core docs, fall back to RAG for tail topics

### Reasoning-model server

- All of "internal multi-request", plus
- Aggressive answer caching (reasoning is approximately deterministic)
- Long thinking-token budget — size KV cache for p99 reasoning length, not p50
- Routing in front: see [[Reasoning Models Landscape]] and [[Compound AI Systems]]

## Quantization (the cross-cutting axis)

| Format | Memory | Quality | When |
| --- | --- | --- | --- |
| fp16 / bf16 | Baseline | Reference | Training, high-end serving |
| int8 / fp8 | 0.5× | Near-lossless | Default for serving at scale |
| 4-bit (GPTQ, AWQ, GGUF Q4) | 0.25× | Small loss on hard tasks | Local / consumer GPU; prevailing OSS default |
| 2-bit / 1-bit | 0.125× | Notable degradation | Research; specific binarization recipes |

Pair quantization with the right inference engine: GPTQ/AWQ for vLLM/TGI, GGUF for llama.cpp/Ollama. Don't mix.

## Common pitfalls

1. **Profiling decode like it's compute-bound** — don't optimize FLOPs. Optimize bytes-read-per-token. `nsys` / `nvprof` will show >80% memory-stall on decode.
2. **Disabling KV cache "to save memory"** — that turns linear into quadratic; never the right move. Reduce KV size with GQA / quantization / paging instead.
3. **Naive batching on autoregressive workloads** — static batching wastes capacity. Always use continuous batching for multi-request servers.
4. **Treating long context as a memory-only problem** — long prefills are also a *prefill compute* problem. Chunked prefill or CAG addresses it.
5. **Mixing quantization formats with engines** — GGUF won't load in vLLM, GPTQ won't load in llama.cpp. Pick per the deployment.

## Related pages

- [[KV Cache]], [[Paged Attention]], [[FlashAttention]], [[Speculative Decoding]], [[Grouped-Query Attention]] — atomic primitives
- [[Cache-Augmented Generation]], [[Long Context Models]] — architectural alternatives
- [[vLLM]], [[TorchServe]], [[TorchScript]] — engine entities
- [[Reasoning Models Landscape]] — why test-time compute changes serving math
- [[RAG Architecture Decision Guide]] — where prefix-sharing / CAG decisions land in product
- [[Compound AI Systems]] — routing and tiering pattern
- [[Reliability for LLM Systems]] — latency-tier SLOs and cost circuit-breakers built on this stack
