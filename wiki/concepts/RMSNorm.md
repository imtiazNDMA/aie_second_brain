---
title: RMSNorm
type: concept
tags: [normalization, transformer, architecture-primitive]
sources: [2026-05-28-raschka-llm-architecture-gallery]
created: 2026-05-28
updated: 2026-05-28
---

# RMSNorm

## Definition

**Root Mean Square Layer Normalization** (Zhang & Sennrich, NeurIPS 2019) is a simpler, faster variant of [[Batch Normalization|LayerNorm]] that normalizes activations by their root-mean-square magnitude (skipping the mean-subtraction step). Since 2022, RMSNorm has become the **default normalization layer in modern transformer LLMs** — Llama, Mistral, Qwen, Gemma, DeepSeek, Phi, OLMo all use it.

## The formula

For an input vector $x \in \mathbb{R}^d$ and learnable scale $g \in \mathbb{R}^d$:

$$\text{RMSNorm}(x) = \frac{x}{\sqrt{\frac{1}{d}\sum_{i=1}^{d} x_i^2 + \epsilon}} \odot g$$

Compare to LayerNorm:

$$\text{LayerNorm}(x) = \frac{x - \mu}{\sqrt{\sigma^2 + \epsilon}} \odot g + b$$

The differences:
1. **No mean subtraction** — RMSNorm just scales by RMS magnitude.
2. **No bias term** — only the learnable scale $g$, not an additive bias $b$.
3. **Same numerical stability** in practice; sometimes better.

```python
def rmsnorm(x, weight, eps=1e-6):
    # x: (..., d)
    rms = (x.pow(2).mean(-1, keepdim=True) + eps).sqrt()
    return weight * (x / rms)
```

## Why it replaced LayerNorm

- **Faster**: skips mean computation; ~7–64% wall-clock speedup at training and inference.
- **Fewer parameters**: no bias term per layer.
- **Empirically equivalent or better quality** at the same compute.
- **Easier to fuse in FlashAttention-style kernels** — no two-pass mean/variance reduction.

## Where it appears

Every "modern dense" LLM since 2022:

| Model | Year | Norm |
|---|---|---|
| GPT-2 | 2019 | LayerNorm |
| GPT-3 | 2020 | LayerNorm |
| **Llama 1** | 2023 | **RMSNorm** (popularized in LLMs) |
| Llama 2/3/3.2/4 | 2023–2025 | RMSNorm |
| Mistral 7B, Mixtral | 2023–2024 | RMSNorm |
| Qwen, Qwen2, Qwen3 | 2023–2025 | RMSNorm |
| Gemma 1/2/3/4 | 2024–2026 | RMSNorm |
| DeepSeek V2/V3/V4 | 2024–2026 | RMSNorm |
| Phi-3 / Phi-4 | 2024 | RMSNorm |
| OLMo 1/2/3 | 2024–2025 | RMSNorm |

## Pre-norm vs post-norm

Independent of LayerNorm vs RMSNorm is the **placement** decision:

```
Pre-norm:  x → Norm → Attn → +residual → Norm → FFN → +residual
Post-norm: x → Attn → +residual → Norm → FFN → +residual → Norm
```

**Pre-norm** is the modern default — better gradient flow, easier to train deep networks. Most 2022–2026 LLMs use pre-norm + RMSNorm.

**OLMo 2 / OLMo 3** revisit post-norm with RMSNorm for stability gains; this is a minority pattern but actively researched.

## Connections

- [[Batch Normalization]] — predecessor (LayerNorm subsection there)
- [[Transformer]] — the architecture RMSNorm sits inside
- [[LLM Architecture]] — hub
- [[QK-Norm]] — additional normalization inside attention
- [[Llama 3]], [[Qwen3]], [[DeepSeek-V3]], [[Gemma 3]] — all use RMSNorm
- [[2026-05-28-raschka-llm-architecture-gallery]] — source

## Open Questions

- Is there a normalization beyond RMSNorm worth the swap?
- Why does OLMo 2's post-norm + QK-Norm combination help training stability?
