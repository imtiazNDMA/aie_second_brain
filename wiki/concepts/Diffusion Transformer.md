---
title: Diffusion Transformer
type: concept
tags: [diffusion, transformer, dit, generative-models, image-generation]
sources: [2026-05-28-diffusion-models-2026]
created: 2026-05-28
updated: 2026-05-28
---

# Diffusion Transformer

## Definition

A **Diffusion Transformer (DiT)** is a [[Diffusion Models|diffusion]] model whose backbone is a [[Transformer]] (specifically a [[Vision Transformer|ViT]]-style architecture on latent patches) rather than the [[U-Net]] used by Stable Diffusion 1/2/SDXL. Introduced by Peebles & Xie at ICCV 2023 ("Scalable Diffusion Models with Transformers"), DiT became the standard backbone for frontier diffusion models in 2024–2026: PixArt-α, Stable Diffusion 3, Flux.1, Qwen-Image, Sora.

The transition is significant: U-Net was the canonical denoiser since DDPM (2020), and DiT replaced it within ~2 years.

## How DiT works

1. **Patchify**: encode the image (or latent from a VAE) into a sequence of patch tokens. For latent diffusion, a $128 \times 128$ latent with patch size 2 yields 4096 patches.
2. **Embed + position encode**: linear projection of each patch + 2D positional encoding.
3. **Stack of transformer blocks**: each block is `LayerNorm → MultiHeadAttention → MLP`, conditioned on (timestep, text).
4. **Final layer**: predict noise (or velocity, for [[Flow Matching]]) at each patch position.
5. **Unpatchify**: reshape patch predictions back to latent grid.

## Conditioning mechanisms

DiT introduced several conditioning approaches; the field has converged on a few:

| Approach | Where used | How |
|---|---|---|
| **adaLN-zero** | Original DiT, PixArt-α | LayerNorm scale/shift conditioned on (timestep, text-pool); zero-initialized for identity at init |
| **Cross-attention** | SD3, Flux.1 cross-blocks | Image tokens attend to text tokens explicitly |
| **In-context concat** | Lumina-T2X | Text tokens concatenated with image tokens; shared transformer attention |
| **Double-stream (MMDiT)** | SD3, Flux.1-Dev | Separate weights for text and image streams; bidirectional attention across streams |

**MMDiT (Multi-Modal Diffusion Transformer)** is the SD3/Flux.1 design and the current state of the art: each block has two parallel transformers (one over image tokens, one over text tokens) that exchange information through joint attention. Empirically: better text-image alignment, especially for typography and complex prompts.

## adaLN-zero in detail

The original DiT conditioning trick. For each block:

$$\text{adaLN}(x, c) = \gamma(c) \cdot \text{LayerNorm}(x) + \beta(c)$$

where $\gamma(c), \beta(c)$ are learned linear projections of the conditioning vector $c$ (typically `MLP([timestep_embedding, text_pool_embedding])`).

"Zero" means $\gamma, \beta$ are zero-initialized — so each block starts as identity, and the model learns conditioning gradually during training. Stabilizes training of deep models.

Additional gating: each attention output and MLP output is also gated by an adaLN scalar $\alpha(c)$ initialized to zero. Three gates per block: pre-attention LN, pre-MLP LN, residual gate.

## Why DiT scales better than U-Net

U-Net mixes convolutions (translation-equivariant, fixed receptive field) with attention (global, learned receptive field). At small scale this is efficient — convolutions provide useful inductive bias.

At billion-parameter scale, U-Net's convolutional layers become a bottleneck: they don't scale as gracefully as attention. DiT removes the conv bias and lets the model learn what symmetries it needs from data. The result: **smoother scaling laws**. ICLR 2026 blog (Su et al.): "as diffusion models scaled in data and compute, the active bottleneck shifted from local fidelity to global semantic alignment" — exactly what attention is good at.

## DiT variants

| Variant | Innovation | Models |
|---|---|---|
| **Plain DiT** | ViT on patches + adaLN-zero | DiT, PixArt-α |
| **MMDiT** | Double-stream text+image, bidirectional attention | SD3, Flux.1 |
| **Hybrid DiT** | Early MMDiT blocks + late single-stream | Flux.1-Dev |
| **Linear DiT** | O(n) self-attention via linear/SANA-style | SANA, SANA 1.5 |
| **Sparse DiT** | Skip a subset of blocks per timestep | HiDream-I1-Dev |
| **Dynamic DiT** | Compute varies by timestep + spatial position | DyDiT, DyDiT++ |
| **Spatiotemporal DiT** | 3D patches over (T, H, W) | Sora, CogVideoX, HunyuanVideo |

## Spatiotemporal DiT (video)

For video, patchify across **both time and space**: an 8-second 720p video at 24fps + 3D VAE → ~250k spacetime tokens. The transformer attends across all of them.

Common pattern (Sora, CogVideoX, HunyuanVideo, Mochi 1):
- 3D causal VAE compresses (T, H, W, 3) → smaller (T/4, H/8, W/8, C) latent.
- DiT operates on 3D latent patches.
- Joint attention across temporal and spatial dimensions.
- Shared text encoder (T5, Gemma, GLM).

Token budgets are huge — frontier video DiTs use clever attention masking (block-diagonal, sliding-window) to keep training feasible.

## Notable DiT models

| Model | Year | Params | Notes |
|---|---|---|---|
| DiT-XL/2 | 2023 | 675M | Original DiT paper; ImageNet 256/512 |
| PixArt-α | 2023 | 600M | First text-to-image DiT; T5 encoder |
| PixArt-Σ | 2024 | 600M | 4K-capable; refined |
| Lumina-T2I | 2024 | 5B | Aspect-ratio-flexible via [nextline] tokens |
| Stable Diffusion 3 | 2024 | 2B–8B | MMDiT + Rectified Flow |
| Hunyuan-DiT | 2024 | 1.5B | Tencent; Chinese-first |
| Flux.1-Dev | 2024 | 12B | Hybrid MMDiT; Black Forest Labs |
| Stable Diffusion 3.5 | 2024 | 8.1B | MMDiT + Rectified Flow + ADD-distilled Turbo |
| Qwen-Image | 2025 | 28.85B (gen) + 8.29B (text) | Densely scaled MMDiT |
| HiDream-I1-Dev | 2025 | 17B | Sparse DiT, 4K capable |
| SANA 1.5 | 2025 | 4.8B | Linear-attention DiT |
| CogView4-6B | 2025 | 6B | GLM encoder; Chinese typography |
| Sora | 2024 | undisclosed | Spatiotemporal DiT, video |
| CogVideoX | 2024 | 5B / 11B | Open spatiotemporal DiT |

## Connections

- [[Diffusion Models]] — the model class DiT is a backbone for
- [[Flow Matching]] — the training objective increasingly paired with DiT
- [[Vision Transformer]] — the architectural ancestor
- [[Transformer]] — the underlying primitive
- [[Attention Mechanism]] — the operator that scales where convolution stops
- [[U-Net]] — the predecessor backbone DiT replaced
- [[Stable Diffusion 3]] — flagship MMDiT
- [[Flux.1]] — hybrid MMDiT
- [[Black Forest Labs]] — Flux.1 origin
- [[Stability AI]] — SD3 / SD3.5 origin
- [[2026-05-28-diffusion-models-2026]] — source summary

## Open Questions

- Will DiT eventually unify with autoregressive image generation (one model for both)?
- Optimal patch size at frontier resolution (4K, 8K) — too small explodes tokens, too large loses fidelity.
- Sparse vs dynamic vs linear-attention DiT — which efficiency frontier wins at scale?
- Spatiotemporal attention masking — what's the right inductive bias?
