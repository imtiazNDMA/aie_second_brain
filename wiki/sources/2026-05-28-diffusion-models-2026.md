---
title: "Diffusion Models — 2026 State of the Art (multi-source compilation)"
type: source
authors: [Esser et al. (SD3), Peebles & Xie (DiT), Lipman et al. (Flow Matching), Zhao et al. (DyDiT), ICLR 2026 blog editorial]
tags: [diffusion, generative-models, dit, flow-matching, rectified-flow]
sources: [Diffusion Models 2026 State of the Art.md]
venue: arXiv:2403.03206 (SD3) · arXiv:2504.06803 (DyDiT++) · ICLR Blogposts 2026 · web compilation
created: 2026-05-28
updated: 2026-05-28
---

# Diffusion Models — 2026 State of the Art

**Source artifact:** `raw/inbox/Diffusion Models 2026 State of the Art.md`
**Date ingested:** 2026-05-28
**Type:** Multi-source web research compilation
**Primary sources:**
- *From U-Nets to DiTs: The Architectural Evolution of Text-to-Image Diffusion Models* — [ICLR Blogposts 2026](https://iclr-blogposts.github.io/2026/blog/2026/diffusion-architecture-evolution/)
- *Scaling Rectified Flow Transformers for High-Resolution Image Synthesis* — [arXiv:2403.03206](https://arxiv.org/html/2403.03206v1) (SD3)
- *DyDiT++: Diffusion Transformers with Timestep and Spatial Dynamics* — [arXiv:2504.06803](https://arxiv.org/abs/2504.06803)
- *Lecture 04 - Flow Matching and Diffusion Models* — [MIT 6.S982 (2026)](https://diffusion.csail.mit.edu/2026/docs/20260128_Lecture_04_edited.pdf)

## Summary

A consolidated 2026 snapshot of the [[Diffusion Models]] field: the architectural arc from **U-Net → DiT → MMDiT**, the shift from **DDPM to Flow Matching / Rectified Flow** for training and sampling, and the current efficiency frontiers (linear-attention DiT, sparse DiT, dynamic DiT, adversarial distillation, consistency models).

## Key Claims

- The U-Net era (DDPM, Stable Diffusion 1/2, SDXL) hit a scaling ceiling at ~2.6B parameters; **DiT (Peebles & Xie, ICCV 2023) unlocked smoother scaling laws** at billion-parameter scale.
- **MMDiT** (Multi-Modal DiT, SD3 / Flux.1) uses **double-stream blocks** — separate weights for text and image streams with bidirectional cross-attention.
- **Flow Matching / Rectified Flow** replaces DDPM's Markov chain with an ODE along straight-line paths from noise to data; **more stable training, fewer sampling steps**.
- **Stable Diffusion 3.5 Large (8.1B)** ships with an adversarial-diffusion-distilled "Turbo" variant generating in 1–4 steps.
- **Qwen-Image (28.85B generator + 8.29B text encoder)** is the densest open MMDiT.
- **SANA 1.5** uses linear attention for O(n) complexity; **HiDream-I1-Dev** uses sparse DiT (subset of blocks active per timestep); **DyDiT++** varies compute by timestep + spatial dim.
- **Video diffusion** (Sora, CogVideoX, HunyuanVideo, Mochi 1, Veo 3) uses **spatiotemporal DiT** with 3D causal VAE for temporal compression.

## Entities Mentioned

- [[Stability AI]] — Stable Diffusion family, SD3 / SD3.5
- [[Black Forest Labs]] — Flux.1 (founded by SD lead authors)
- [[Alibaba]] / Qwen team — Qwen-Image
- [[Tencent]] — Hunyuan-DiT, HunyuanVideo
- [[OpenAI]] — Sora
- [[Google DeepMind]] — Imagen 3, Veo
- [[CompVis]] / LMU Munich — original latent diffusion paper
- [[MIT CSAIL]] — Flow Matching theory (Lipman et al.)

## Concepts Covered

- [[Diffusion Models]] — base concept (existing, updated)
- [[Diffusion Transformer]] — DiT, the new backbone (new)
- [[Flow Matching]] — alternative training objective (new)
- [[Rectified Flow]] — straight-line path variant (covered in Flow Matching)
- [[Vision Transformer]] — backbone of DiT
- [[Variational Inference]] / VAE — latent space for latent diffusion

## Why this matters for the wiki

The existing [[Diffusion Models]] page covers DDPM, classifier-free guidance, latent diffusion, and lists DiT as a single table row. The 2024–2026 architectural revolution (DiT, MMDiT, Flow Matching) deserves dedicated pages. This source seeds [[Diffusion Transformer]] and [[Flow Matching]] as their own hubs.

## Related Pages

- [[Diffusion Models]] (existing — updated to reference new pages)
- [[Diffusion Transformer]] (new concept)
- [[Flow Matching]] (new concept)
- [[Stable Diffusion 3]], [[Flux.1]], [[Black Forest Labs]] (new entities)
- [[Modality-as-Tokens]] (new synthesis — diffusion is the image side of the modality-token convergence)
