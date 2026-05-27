---
title: QK-Norm
type: concept
tags: [attention, normalization, training-stability, architecture-primitive]
sources: [2026-05-28-raschka-llm-architecture-gallery]
created: 2026-05-28
updated: 2026-05-28
---

# QK-Norm

## Definition

**QK-Norm** (Query-Key Normalization) is a small architectural change that **applies normalization to the query and key projections before computing attention scores**. Originated in vision transformers (Henry et al. 2020, "Query-Key Normalization for Transformers"), it was popularized in LLMs by **OLMo 2** (Allen AI, late 2024) and is now adopted in Gemma 3/4, Qwen3, GLM-4.5/5, MiniMax-M2, Sarvam, and others.

The purpose: **training stability** at scale. Modern attention scores can blow up to huge magnitudes during pretraining, causing softmax saturation and loss spikes; QK-Norm prevents this.

## The mechanism

Standard attention:

$$\text{attn}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right) V$$

QK-Norm modifies $Q$ and $K$ before the dot product:

$$Q' = \text{Norm}(Q), \quad K' = \text{Norm}(K), \quad \text{attn} = \text{softmax}\left(\gamma \cdot \frac{Q' K'^T}{\sqrt{d_k}}\right) V$$

Where Norm is typically [[RMSNorm]] (or LayerNorm) applied per-head along the head-dimension. A learnable scalar $\gamma$ rescales the result.

```python
def qk_norm_attention(q, k, v, q_rms, k_rms):
    # q, k, v: (B, H, T, D)
    q = q_rms(q)   # RMSNorm along head dim
    k = k_rms(k)
    scores = (q @ k.transpose(-2, -1)) / math.sqrt(q.size(-1))
    return scores.softmax(-1) @ v
```

## Why this helps

Without normalization, $Q$ and $K$ values can grow during training, causing:
- **Softmax saturation** — one logit dominates; attention becomes one-hot.
- **Gradient vanishing** — saturated softmax has near-zero gradient.
- **Loss spikes** — training instability, especially at scale.

QK-Norm caps the magnitudes of $Q, K$ to fixed scale (defined by the norm), so softmax stays in a healthy regime. Empirically: smoother loss curves, larger learning rates feasible, fewer training restarts.

## Where it appears

| Model | Year | QK-Norm |
|---|---|---|
| GPT-2 / 3 / 4 | 2019–2023 | No |
| Llama 1 / 2 / 3 | 2023–2024 | No |
| **OLMo 2** | 2024-11 | **Yes** (popularized in open LLMs) |
| Gemma 3 / 4 | 2025–2026 | Yes |
| Qwen3 (all sizes) | 2025-04 | Yes |
| GLM-4.5 / GLM-5 | 2025–2026 | Yes |
| MiniMax-M2 / M2.5 | 2025–2026 | Yes |
| Sarvam-30B / 105B | 2026-03 | Yes |
| OLMo 3 | 2025-11 | Yes |
| **DeepSeek-V3 / V4** | 2024–2026 | No (relies on MLA + other techniques) |
| Mistral Small 3.1 | 2025-03 | No |

DeepSeek family is a notable hold-out — they get their training stability from other choices (MLA, careful initialization, FP8 with hand-tuned scaling).

## Variations

- **Q-only norm** — some models only normalize Q, not K.
- **Pre-RoPE vs post-RoPE** — apply norm before or after [[Rotary Position Embeddings|RoPE]] rotation. Post-RoPE is more common.
- **Learnable scale** — most implementations include a per-head learnable scalar $\gamma$.

## Connections

- [[Multi-Head Attention]] — what QK-Norm modifies
- [[RMSNorm]] — typical norm function used inside QK-Norm
- [[Attention Mechanism]] — broader topic
- [[OLMo 2]] — popularized QK-Norm in open LLMs
- [[Gemma 3]], [[Qwen3]] — modern users
- [[LLM Architecture]] — hub
- [[2026-05-28-raschka-llm-architecture-gallery]] — source

## Open Questions

- Why does DeepSeek not need QK-Norm? Is MLA's structure intrinsically more stable?
- Optimal placement: pre-RoPE vs post-RoPE.
- Does QK-Norm matter as much at <7B scale?
