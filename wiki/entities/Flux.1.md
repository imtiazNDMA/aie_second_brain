---
title: Flux.1
type: entity
tags: [model, diffusion, image-generation, mmdit, flow-matching, open-weights]
sources: [2026-05-28-diffusion-models-2026]
created: 2026-05-28
updated: 2026-05-28
---

# Flux.1

## Identity

The **2024 flagship text-to-image model** from [[Black Forest Labs]], a startup founded by lead authors of Stable Diffusion (including Robin Rombach). Flux.1 is a **12B-parameter hybrid MMDiT** trained with **Rectified Flow** ([[Flow Matching]]). Three variants:

- **Flux.1 [pro]** — closed, hosted API only.
- **Flux.1 [dev]** — open weights, non-commercial license.
- **Flux.1 [schnell]** — open weights, Apache-2, distilled to 1–4 steps.

Quickly became (in 2024–2025) **the open-weight text-to-image leader**, displacing Stable Diffusion XL and competing with closed models (Midjourney, DALL·E 3).

## Architecture

- **Hybrid MMDiT** — early blocks are double-stream (separate text and image weights with bidirectional attention), later blocks are single-stream (concatenated tokens, shared weights). Empirically: early double-stream improves text-image alignment; late single-stream improves efficiency.
- **Rectified Flow** objective — straight-line probability path noise → image.
- **Dual text encoder**: CLIP + T5-XXL (or smaller for schnell).
- **VAE-encoded latents** then patchified for the transformer.
- **12B parameters** — large for an open-weight image model.

## Variants in detail

| Variant | Steps | Use case | License |
|---|---|---|---|
| **Flux.1 [pro]** | 28 | Production quality, API only | Closed |
| **Flux.1 [dev]** | 28 | Personal use, research | FLUX.1-Dev Non-Commercial License |
| **Flux.1 [schnell]** | 1–4 | Real-time generation | Apache 2.0 |

## Significance

- **Open-weight T2I leader** in 2024–2025 — replaced SDXL as the community default.
- **Best-in-class typography** at release — finally readable text in generated images.
- **Validated MMDiT + Rectified Flow** at scale, alongside SD3.
- **Schnell variant** opened serious real-time / interactive image generation at open weights (1–4 step inference, ~0.5–1s per image on a single GPU).
- **Founding team's lineage** (original SD authors) lent credibility.

## Related Pages

- [[Diffusion Transformer]] — Flux.1 is a hybrid MMDiT
- [[Flow Matching]] — its training objective
- [[Black Forest Labs]] — origin
- [[Diffusion Models]] — broader family
- [[Stable Diffusion 3]] — contemporary MMDiT competitor
- [[Stability AI]] — main competitor org
- [[Modality-as-Tokens]] — synthesis

## Sources

- [[2026-05-28-diffusion-models-2026]]
