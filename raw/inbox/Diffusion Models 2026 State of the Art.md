# Diffusion Models — 2026 State-of-the-Art Compilation

**Compiled:** 2026-05-28
**Type:** Multi-source web research compilation
**Topic:** Diffusion Models, DiT, Flow Matching
**Primary sources:**
- *From U-Nets to DiTs: The Architectural Evolution of Text-to-Image Diffusion Models (2021–2025)* — ICLR Blogposts 2026
- *Scaling Rectified Flow Transformers for High-Resolution Image Synthesis* — arXiv:2403.03206 (SD3 paper)
- *DyDiT++: Diffusion Transformers with Timestep and Spatial Dynamics for Efficient Visual Generation* — arXiv:2504.06803
- *Diffusion Transformer and Rectified Flow Transformer for Conditional Image Generation* — medium.com/digital-mind
- *Lecture 04 - Flow Matching and Diffusion Models* — MIT 6.S982 (2026)

---

## The Architectural Arc: U-Net → DiT → MMDiT

### Era 1: U-Net Diffusion (2020–2023)

- Backbone: U-Net (convolutions + cross-attention layers for text conditioning).
- Examples: DDPM, GLIDE, Stable Diffusion v1/v2/v2.1, Imagen, DALL·E 2, SDXL.
- Hit a scaling ceiling around SDXL's 2.6B parameters.

### Era 2: Diffusion Transformer (DiT) (2023–2024)

- Backbone: pure transformer on VAE latent patches.
- Peebles & Xie (ICCV 2023) — original DiT, replaced U-Net with ViT-style transformer.
- Conditioning via adaptive LayerNorm (adaLN-zero) or cross-attention.
- Examples: PixArt-α, Lumina-T2I, Hunyuan-DiT, CogView3-Plus.
- Scales much better than U-Net — smoother scaling laws at billion-parameter scale.

### Era 3: MMDiT / Rectified Flow (2024–2026)

- Multi-Modal DiT — separate weights for image and text streams, bidirectional attention.
- Examples: Stable Diffusion 3 (SD3), Flux.1, Qwen-Image (28.85B).
- Uses **Flow Matching / Rectified Flow** instead of DDPM noise schedules.

## DiT Design Choices

### Patching

VAE encodes 1024×1024 image → 128×128 latent → 32×32 grid of 4×4 latent patches → ~1024 patch tokens (depending on patch size).

Lumina introduces learnable `[nextline]` tokens for arbitrary aspect-ratio extrapolation.

### Conditioning

| Approach | Where used | Mechanism |
|---|---|---|
| **adaLN-zero** | PixArt-α, original DiT | Scale/shift parameters of LayerNorm conditioned on (text-pool, timestep). Efficient, weight-shared. |
| **Cross-attention** | SD3, Flux.1 cross-blocks | Image tokens attend to text tokens explicitly. |
| **Double-stream (MMDiT)** | SD3, Flux.1-Dev | Separate transformer weights for text and image streams; bidirectional attention across streams. |
| **Single-stream** | Flux.1-Dev (later blocks), Lumina-T2X | Concatenate text+image tokens, run shared transformer. |

Flux.1-Dev is **hybrid**: double-stream blocks early (text-image alignment), then single-stream blocks (efficiency).

### Text Encoders

- **CLIP-G/14 only** — early models (SD 1/2/SDXL)
- **CLIP-G/14 + T5-XXL** — SDXL refiner, PixArt, SD3, Flux.1 — long-prompt understanding
- **Gemma 2B** — recent open models for efficiency
- **GLM** — CogView4 for strong Chinese typography

## Flow Matching vs DDPM

DDPM defines a Markov chain with Gaussian noise schedule and learns the reverse. Flow Matching (Lipman et al. 2022, ICML) reframes generation as learning a **velocity field** that transports noise to data along straight-line paths.

| Aspect | DDPM | Flow Matching / Rectified Flow |
|---|---|---|
| Formulation | Markov chain; $q(x_t \mid x_{t-1}) = \mathcal{N}(\sqrt{1-\beta_t}x_{t-1}, \beta_t I)$ | ODE $\frac{dx_t}{dt} = v_\theta(x_t, t)$ along straight path from noise to data |
| Loss | MSE on predicted noise $\epsilon_\theta$ | MSE on predicted velocity $v_\theta$ vs target $x_1 - x_0$ |
| Sampling | Solve reverse SDE (Euler, DDIM, DPM-Solver, …) | Solve ODE (Euler, Heun, …) along straight path |
| Sampling steps | 50–1000 → 4–20 (with samplers) | 1–28 (Flux.1-schnell does 1–4 steps) |
| Training stability | Sensitive to noise schedule | More stable, less schedule-sensitive |
| Models | SD1/2/XL, Imagen, DALL·E 2/3 | SD3, Flux.1, Lumina-Next |

Rectified Flow (Liu et al. 2022) adds the "rectify" step: re-train the model on its own straight-line trajectories, further reducing required steps.

## 2025–2026 Frontier Models

| Model | Year | Params | Architecture | Notes |
|---|---|---|---|---|
| **Stable Diffusion 3.5 Large** | 2024 | 8.1B | MMDiT + Rectified Flow | Adversarial Diffusion Distillation → SD3.5 Turbo at 1–4 steps |
| **Flux.1-Dev** | 2024 | 12B | Hybrid MMDiT | Open-weight; Black Forest Labs |
| **Flux.1-Pro** | 2024 | 12B+ | Hybrid MMDiT | Closed; flagship quality |
| **Qwen-Image** | 2025 | 28.85B (gen) + 8.29B (text enc) | Densely scaled MMDiT | Alibaba; strongest open fidelity |
| **HiDream-I1-Dev** | 2025 | 17B | Sparse DiT | Skips blocks per step; 4K capable |
| **SANA 1.5** | 2025 | 4.8B | Linear-attention DiT | O(n) attention, inference scaling via VISA |
| **CogView4-6B** | 2025 | 6B | GLM-encoded DiT | Chinese text rendering |
| **DyDiT++** | 2025 | varies | Dynamic DiT | Compute varies by timestep + spatial dim |

## Efficiency Frontiers

### Distillation

- **Progressive Distillation** (Salimans & Ho 2022) — halve steps each round.
- **Consistency Models** (Song 2023) — 1–4 step generation.
- **Adversarial Diffusion Distillation (ADD)** — SD3.5 Turbo, used in SDXL Turbo.
- **DMD2** (Distribution Matching Distillation) — modern alternative.

### Architecture-level

- **Linear-attention DiT** (SANA) — O(n) self-attention replaces O(n²).
- **Sparse DiT** (HiDream) — only a subset of transformer blocks active per timestep.
- **Dynamic DiT** (DyDiT) — adjusts active compute by both timestep and spatial location.
- **MoE Diffusion** — early experiments routing patches to expert FFNs.

### Sampler-level

- **DPM-Solver++** — high-quality 10–20 step sampling.
- **Euler / Heun for FM** — natural choice for flow-matching models.
- **Flow-DPM-Solver** — recent hybrid.

## Video Diffusion

- **Sora** (OpenAI, 2024) — DiT on spacetime patches.
- **CogVideoX** — open-source video DiT.
- **HunyuanVideo** — Tencent, large open video model.
- **Mochi 1** — Genmo, MIT-licensed video diffusion.
- **Veo 3** (Google) — flagship closed model.

Common pattern: **spatiotemporal DiT** with shared text encoder, 3D causal VAE for temporal compression.

## Notable Entities

- **Stability AI** — Stable Diffusion family
- **Black Forest Labs** — Flux.1 (founded by Stable Diffusion lead authors)
- **Alibaba Qwen team** — Qwen-Image
- **Tencent** — Hunyuan-DiT, HunyuanVideo
- **OpenAI** — Sora
- **Google DeepMind** — Imagen 3, Veo
- **Genmo** — Mochi 1
- **CompVis / LMU Munich** — original Stable Diffusion (latent diffusion)
- **MIT CSAIL** — Flow Matching (Lipman et al.)

## URLs

- https://iclr-blogposts.github.io/2026/blog/2026/diffusion-architecture-evolution/
- https://arxiv.org/html/2403.03206v1 — SD3 paper
- https://arxiv.org/abs/2504.06803 — DyDiT++
- https://diffusion.csail.mit.edu/2026/docs/20260128_Lecture_04_edited.pdf
- https://medium.com/digital-mind/diffusion-transformer-and-rectified-flow-for-conditional-image-generation-997075c12e2f
- https://encord.com/blog/diffusion-models-with-transformers/
- https://www.emergentmind.com/topics/diffusion-transformer-models
- https://www.emergentmind.com/topics/rectified-flow-transformers-flowedit
