---
title: Inference Optimization
type: concept
tags: [ml, deployment, performance]
sources: [2026-04-12-ai-engineering]
created: 2026-04-12
updated: 2026-04-13
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

## Related Concepts

- [[Batch Deployment]]
- [[Real-Time Deployment]]
- [[QLoRA]]
- [[Low-Rank Adaptation]]

## Sources

- [[2026-04-12-ai-engineering]] — Chapter 13