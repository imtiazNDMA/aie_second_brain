---
title: Sliding Window Attention
type: concept
tags: [attention, long-context, local-attention, architecture-primitive]
sources: [2026-05-28-raschka-llm-architecture-gallery]
created: 2026-05-28
updated: 2026-05-28
---

# Sliding Window Attention

## Definition

**Sliding Window Attention (SWA)** restricts the receptive field of each token to a fixed-size window of recent tokens, rather than the full sequence. A query at position $t$ attends only to keys in positions $[t - W + 1, t]$ for window size $W$ (typically 4096 or 8192). This reduces attention complexity from $O(L^2)$ to $O(L \cdot W)$, enabling efficient long-context inference.

SWA was popularized by **Longformer** (Beltagy et al. 2020) and **Mistral 7B** (2023), then became the local-attention block in **alternating local/global** schemes adopted by Gemma 3/4, OLMo 3, GPT-OSS, Tiny Aya, and many 2025–2026 frontier models.

## The mechanism

Standard self-attention mask is causal-lower-triangular (each token sees all previous). SWA adds a window cutoff:

```
Standard causal mask:    SWA mask (W=4):
                                          
1 0 0 0 0 0 0 0          1 0 0 0 0 0 0 0
1 1 0 0 0 0 0 0          1 1 0 0 0 0 0 0
1 1 1 0 0 0 0 0          1 1 1 0 0 0 0 0
1 1 1 1 0 0 0 0          1 1 1 1 0 0 0 0
1 1 1 1 1 0 0 0          0 1 1 1 1 0 0 0  ← position 4 only sees [1..4]
1 1 1 1 1 1 0 0          0 0 1 1 1 1 0 0  ← position 5 only sees [2..5]
1 1 1 1 1 1 1 0          0 0 0 1 1 1 1 0
1 1 1 1 1 1 1 1          0 0 0 0 1 1 1 1
```

Each row in the SWA mask has at most $W$ ones — bounded receptive field per layer.

## How global context still propagates

A token at position $t$ in layer $\ell$ only sees positions $[t - W + 1, t]$ in that layer. But across $\ell$ layers, information propagates through the residual stream — a token in layer $\ell$ can effectively reach positions $[t - \ell \cdot W + 1, t]$.

For $W = 4096$ and 32 layers, the effective receptive field is up to **131072 tokens** even with each layer attending only locally. This is the "stacking gives you global" intuition.

## Alternating local/global pattern

A pure-SWA model fails for some long-range reasoning tasks because information must traverse many layers. The modern solution: **alternate** SWA layers with full-attention layers.

| Model | Pattern (local : global) |
|---|---|
| Mistral 7B | 100% SWA (window 4096) |
| **Gemma 3** | **5 SWA : 1 global** |
| Gemma 4 | 5 SWA : 1 global |
| OLMo 3 | 3 SWA : 1 global |
| GPT-OSS 20B / 120B | alternating SWA / global |
| Tiny Aya 3.35B | 3 SWA : 1 global |
| Laguna XS.2 | 3 SWA : 1 global |
| Arcee Trinity Large | 3 SWA : 1 global |
| Xiaomi MiMo-V2.5 | 5 SWA : 1 global |

The intuition: most attention dependencies are local; a small fraction of layers being global is enough to capture cross-document or long-range structure.

## Window sizes in practice

- **Gemma 3** — 1024 token local window
- **Mistral 7B** — 4096 token window
- **GPT-OSS** — varies by layer
- **Xiaomi MiMo-V2** — 128-token window (very tight; pairs with high local density)

## SWA + KV cache

A major serving-time benefit: in an SWA layer, the KV cache can be **rotated** (drop tokens that fall outside the window) rather than growing without bound. Combined with full-attention layers (which still need full cache), this dramatically reduces total cache size.

Some implementations use **chunked attention**: process the sequence in chunks of size $W$, with each chunk attending to the previous chunk's KV. This is the **"sliding chunk"** pattern in Longformer and is friendly to GPU kernel implementation.

## Where SWA appears in the modern stack

```
Layer 1:   [SWA (window 1024)]
Layer 2:   [SWA (window 1024)]
Layer 3:   [SWA (window 1024)]
Layer 4:   [SWA (window 1024)]
Layer 5:   [SWA (window 1024)]
Layer 6:   [Global Attention]      ← 5:1 ratio (Gemma 3)
Layer 7:   [SWA (window 1024)]
...
```

Each Layer block is otherwise standard: `Pre-norm → Attention → +residual → Pre-norm → SwiGLU FFN → +residual`. Only the attention mask differs between SWA and global layers.

## Trade-offs

| Aspect | SWA | Full Attention |
|---|---|---|
| Attention compute | O(L × W) | O(L²) |
| KV cache | Rotatable | Grows with L |
| Long-range dependencies | Indirect (via layer stacking) | Direct |
| Quality at very long context | Slightly worse alone; matches full when alternated | Reference |
| Implementation | Slightly more complex masks | Standard |

## Connections

- [[Attention Mechanism]] — broader topic
- [[Multi-Head Attention]] — the attention being windowed
- [[KV Cache]] — what SWA shrinks via rotation
- [[FlashAttention]] — composes with SWA at kernel level
- [[Gemma 3]], [[Gemma 4]], [[OLMo 3]], [[GPT-OSS]] — modern SWA users
- [[LLM Architecture]] — hub
- [[2026-05-28-raschka-llm-architecture-gallery]] — source

## Open Questions

- Optimal SWA window size — small (128) with tight density vs large (8192) with sparse usage?
- Best local:global ratio at frontier scale — 5:1, 3:1, or something else?
- Does SWA generalize to streaming inference cleanly?
