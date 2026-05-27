---
title: Inference Optimization
type: concept
tags: [ml, deployment, performance]
sources: [2026-04-12-ai-engineering, 2026-05-09-s1-test-time-scaling]
created: 2026-04-12
updated: 2026-05-09
---

# Inference Optimization

Techniques to reduce model latency and resource usage at inference time.

## Mathematical Formulation

### Quantization

Reduce weight precision from float32 to lower bits:

$$\mathbf{W}_Q = \text{quantize}(\mathbf{W}_{32}, b)$$

For $b$-bit quantization with $b < 32$:

| Precision | Bits | Range | Values |
|-----------|------|-------|--------|
| FP32 | 32 | $\pm 3.4 \times 10^{38}$ | $2^{32}$ |
| FP16 | 16 | $\pm 65504$ | $2^{16}$ |
| INT8 | 8 | -128 to 127 | 256 |
| INT4 | 4 | -8 to 7 | 16 |

**Quantization error:**
$$\epsilon = \mathbf{W}_{32} - \text{dequantize}(\mathbf{W}_Q)$$

The mean squared quantization error:
$$MSE = \frac{1}{N} \|\epsilon\|_2^2$$

### Pruning

Remove weights with small magnitude:

$$\mathbf{W}_{pruned} = \mathbf{W} \odot \mathbf{M}$$

where $\mathbf{M}_{ij} = 1$ if $|W_{ij}| > \tau$ (threshold), else 0.

**Sparsity:**
$$s = \frac{\#\text{zero weights}}{\#\text{total weights}}$$

Structured pruning removes entire rows/columns/channels for GPU efficiency.

### Knowledge Distillation

Train smaller student $S$ to mimic larger teacher $T$:

$$\mathcal{L}_{KD} = \alpha \mathcal{L}_{CE}(S, y) + (1-\alpha) \mathcal{L}_{KL}(S, T)$$

where:
$$\mathcal{L}_{KL}(S, T) = \sum_i P_T(i) \log \frac{P_T(i)}{P_S(i)}$$
$$P_T(i) = \frac{\exp(z_T(i)/\tau)}{\sum_j \exp(z_T(j)/\tau)}$$

Temperature $\tau > 1$ softens the teacher logits.

### KV Cache Optimization

For autoregressive models, cache key-value pairs:

$$\mathbf{K}_{cache} = [\mathbf{k}_1, \mathbf{k}_2, ..., \mathbf{k}_{t-1}]$$
$$\mathbf{V}_{cache} = [\mathbf{v}_1, \mathbf{v}_2, ..., \mathbf{v}_{t-1}]$$

At step $t$, compute attention with cached values:
$$\mathbf{a}_t = \text{softmax}\left(\frac{\mathbf{q}_t \mathbf{K}_{cache}^\top}{\sqrt{d_k}}\right) \mathbf{V}_{cache}$$

This reduces computation from $O(t^2)$ to $O(t)$ per token.

### Batching

Process multiple requests simultaneously:

| Batching Type | Description | Latency Impact |
|---------------|-------------|----------------|
| Static | Fixed batch size | High throughput, variable latency |
| Dynamic | Vary batch per request | Better latency |
| Continuous | Add requests to running batch | Optimal for throughput |

**Throughput:**
$$\text{Throughput} = \frac{\text{total tokens}}{\text{total time}} = \frac{B \cdot T}{T_{total}}$$

## Methods

Methods: quantization (reduce precision), pruning (remove weights), knowledge distillation (train smaller student), caching, batching. Critical for deployment.

## The Other Direction: Test-Time Compute Scaling

Inference optimization classically aims to **reduce** compute per query. The 2024–2025 reasoning-model wave (s1, DeepSeek-R1, OpenAI o-series) introduces an opposite discipline: deliberately **increasing** test-time compute to raise accuracy on hard tasks.

- [[Test-Time Compute Scaling]] — empirical regularity: accuracy rises log-linearly with thinking-token budget for [[Reasoning Models]]
- [[Budget Forcing]] — the simplest control mechanism (force end / force continue with literal `Wait`)
- [[Cache-Augmented Generation]] — orthogonal: spends compute *once* (preload corpus into KV cache), reuses across queries

Production systems increasingly choose between these two regimes per query — fast classical inference for easy paths, deliberate compute spending for hard ones. See [[Compound AI Systems]].

## Related Concepts

- [[Batch Deployment]]
- [[Real-Time Deployment]]
- [[QLoRA]]
- [[Low-Rank Adaptation]]
- [[KV Cache]] — key memory structure
- [[Paged Attention]] — KV-cache management
- [[FlashAttention]] — IO-aware attention kernel
- [[Speculative Decoding]] — draft + verify acceleration
- [[Test-Time Compute Scaling]] — opposite-direction compute spending
- [[Cache-Augmented Generation]] — amortized prefill

## Sources

- [[2026-04-12-ai-engineering]] — Chapter 13
- [[2026-05-09-s1-test-time-scaling]] — Muennighoff et al., EMNLP 2025; the test-time-compute counterpoint