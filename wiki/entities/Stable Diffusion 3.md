---
title: Stable Diffusion 3
type: entity
tags: [model, diffusion, image-generation, mmdit, flow-matching, open-weights]
sources: [2026-05-28-diffusion-models-2026]
created: 2026-05-28
updated: 2026-05-28
---

# Stable Diffusion 3

## Identity

[[Stability AI]]'s 2024 flagship text-to-image model — a **Multi-Modal Diffusion Transformer (MMDiT)** trained with **Rectified Flow** ([[Flow Matching]]). The first major productized diffusion model to use both MMDiT and Flow Matching, establishing the recipe later refined by [[Flux.1]] and Qwen-Image.

Released as **SD3** (initial, mid-2024) and **SD 3.5** (late 2024, larger and with a distilled Turbo variant).

Paper: *Scaling Rectified Flow Transformers for High-Resolution Image Synthesis* — [arXiv:2403.03206](https://arxiv.org/html/2403.03206v1) (Esser et al.).

## Architecture

- **MMDiT** — double-stream transformer with separate weights for text and image tokens, bidirectional joint attention.
- **Dual text encoders**: **CLIP-G/14** (pooled embedding for guidance) + **T5-XXL** (sequence embedding for cross-attention). Some smaller variants drop T5.
- **VAE latent space** — encodes 1024×1024 → 128×128 latent → patched.
- **Rectified Flow** training — straight-line probability path, logit-normal time sampling.

## Variants

| Variant | Year | Params | Notes |
|---|---|---|---|
| Stable Diffusion 3 Medium | 2024 | 2B | Initial open-weight release |
| Stable Diffusion 3 Large | 2024 | 8B | Larger |
| **Stable Diffusion 3.5 Large** | 2024 | 8.1B | Refined; current open-weight flagship |
| **Stable Diffusion 3.5 Large Turbo** | 2024 | 8.1B | Adversarial-diffusion-distilled to 1–4 steps |
| **Stable Diffusion 3.5 Medium** | 2024 | ~2.5B | Faster, lower-VRAM |

## Significance

- **Pioneered MMDiT + Rectified Flow** at productized scale.
- **Established the dual-text-encoder pattern** (CLIP + T5) for prompt fidelity.
- **Adversarial Diffusion Distillation (ADD)** — SD 3.5 Turbo demonstrates 1–4 step quality preservation.
- Open-weight at scale (8.1B), keeping the SD lineage competitive after the founders departed to [[Black Forest Labs]].

## Related Pages

- [[Diffusion Transformer]] — MMDiT
- [[Flow Matching]] — training objective
- [[Diffusion Models]] — broader family
- [[Stability AI]] — origin
- [[CLIP]] / T5 — text encoders
- [[Flux.1]] — competing MMDiT
- [[Black Forest Labs]] — founded by SD3 lead authors

## Sources

- [[2026-05-28-diffusion-models-2026]]
- [arXiv:2403.03206](https://arxiv.org/html/2403.03206v1) — SD3 paper
