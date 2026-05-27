---
title: Diffusion Models
type: concept
tags: [generative-models, deep-learning, score-based]
sources: [2026-04-12-ml-algorithms-in-depth, 2026-05-28-diffusion-models-2026]
created: 2026-04-30
updated: 2026-05-28
---

# Diffusion Models

## Definition

**Diffusion Models** are a class of generative models that learn to reverse a fixed noising process. Training: gradually add Gaussian noise to a real sample over $T$ steps until it becomes pure noise. Generation: start from pure noise and apply a learned denoising network step-by-step until a clean sample emerges. Foundational papers: Sohl-Dickstein 2015 (theoretical foundation), Ho et al. 2020 (DDPM, modern resurrection), Song & Ermon 2020 (score-based perspective).

Diffusion models power Stable Diffusion, DALL·E 2/3, Imagen, Sora, MusicLM, Stable Audio, and most modern text-to-image / text-to-video systems. They displaced [[Generative Adversarial Network|GANs]] as the dominant high-quality image generator in 2022.

## The forward process (noising)

Given a clean sample $x_0$ from the data distribution, define a Markov chain that adds Gaussian noise over $T$ steps:

$$q(x_t \mid x_{t-1}) = \mathcal{N}(x_t; \sqrt{1 - \beta_t} \cdot x_{t-1}, \beta_t \mathbf{I})$$

The schedule $\{\beta_t\}_{t=1}^{T}$ is a small, increasing sequence (e.g., linearly from 0.0001 to 0.02). After $T$ steps (typically 1000), $x_T$ is approximately $\mathcal{N}(0, \mathbf{I})$ — pure noise.

A neat algebraic property: $x_t$ at any step can be sampled directly from $x_0$:

$$q(x_t \mid x_0) = \mathcal{N}(x_t; \sqrt{\bar{\alpha}_t} \cdot x_0, (1 - \bar{\alpha}_t) \mathbf{I})$$

where $\alpha_t = 1 - \beta_t$ and $\bar{\alpha}_t = \prod_{s=1}^{t} \alpha_s$. This means we can train at any $t$ in parallel — no sequential simulation required.

## The reverse process (denoising)

We want to learn $p_\theta(x_{t-1} \mid x_t)$ — the reverse of the forward process. If $\beta_t$ is small, the reverse is also Gaussian:

$$p_\theta(x_{t-1} \mid x_t) = \mathcal{N}(x_{t-1}; \mu_\theta(x_t, t), \Sigma_\theta(x_t, t))$$

A neural network (typically a U-Net for images) parameterizes $\mu_\theta$. Generation: start with $x_T \sim \mathcal{N}(0, \mathbf{I})$, repeatedly sample $x_{t-1} \sim p_\theta(x_{t-1} \mid x_t)$ for $t = T, T-1, \ldots, 1$.

## The training objective

Ho 2020 showed the variational lower bound simplifies to a **noise-prediction** objective. Instead of predicting $\mu_\theta(x_t, t)$, predict the noise $\epsilon$ that was added:

$$\mathcal{L}_{\text{simple}} = \mathbb{E}_{t, x_0, \epsilon} \left[ \|\epsilon - \epsilon_\theta(x_t, t)\|^2 \right]$$

where $x_t = \sqrt{\bar{\alpha}_t} x_0 + \sqrt{1 - \bar{\alpha}_t} \epsilon$ and $\epsilon \sim \mathcal{N}(0, \mathbf{I})$.

This is **MSE between predicted noise and true noise**. Astonishingly simple — no adversarial dynamics, no likelihood ratio, just regression.

```python
def train_step(model, x0_batch, T=1000):
    batch_size = x0_batch.shape[0]
    t = torch.randint(0, T, (batch_size,))
    epsilon = torch.randn_like(x0_batch)
    
    alpha_bar_t = alpha_bar[t].view(-1, 1, 1, 1)
    x_t = torch.sqrt(alpha_bar_t) * x0_batch + \
          torch.sqrt(1 - alpha_bar_t) * epsilon
    
    epsilon_pred = model(x_t, t)
    loss = F.mse_loss(epsilon_pred, epsilon)
    return loss
```

## The score-based perspective

Song & Ermon's score-based generative models (2019, 2020) showed that diffusion's noise prediction is equivalent to learning the **score** of a noise-perturbed data distribution:

$$s_\theta(x, \sigma) \approx \nabla_x \log p_\sigma(x) = -\frac{\epsilon}{\sigma}$$

The reverse process can be written as a stochastic differential equation; sampling becomes integrating an SDE. This unification (Song et al. 2021) revealed:

- **DDPM** = Variance Preserving SDE
- **Score-based / NCSN** = Variance Exploding SDE
- **Sub-VP SDE** = a third variant with theoretically optimal properties

And it gave a recipe to **derive faster samplers** (DDIM, DPM-Solver, Euler, Heun, …) by choosing different SDE solvers.

## Sampling speed-ups

The original DDPM needs 1000 forward passes to generate a sample — slow. Modern samplers reduce this dramatically:

| Sampler | Steps | Quality |
|---|---|---|
| DDPM | 1000 | reference |
| DDIM (Song 2020) | 50 | similar |
| DPM-Solver (Lu 2022) | 10–20 | similar |
| **Consistency Models** (Song 2023) | 1–4 | small drop |
| **Latent Consistency Models** | 1–4 | similar |

Distillation methods (Progressive Distillation, Consistency Distillation) train a small fast model to mimic the trajectory of a larger slow model — reducing generation to a few steps without quality loss.

## Latent Diffusion Models (Stable Diffusion)

Rombach et al. 2022 — the architecture behind Stable Diffusion. Run diffusion in a *latent* space rather than pixel space:

1. Pretrain a [[Variational Inference|VAE]] to encode 512×512 images to 64×64 latents (8× compression).
2. Run diffusion in the 64×64 latent space (much faster).
3. Decode the final latent to a pixel image.

10× speedup vs pixel-space diffusion at minimal quality cost. All modern text-to-image systems use latent diffusion.

## Conditional generation

To condition on text, image, or class:

### Classifier guidance (Dhariwal & Nichol 2021)
Train a classifier $p(y \mid x_t)$ on noisy images; bias the score toward classifier-preferred regions:

$$\tilde{s}(x_t, y) = s_\theta(x_t) + w \cdot \nabla_{x_t} \log p(y \mid x_t)$$

### Classifier-free guidance (Ho & Salimans 2021)
Train two models: a conditional $\epsilon_\theta(x_t, y)$ and an unconditional $\epsilon_\theta(x_t, \emptyset)$ (achieved by training with random label dropout). Sample with:

$$\tilde{\epsilon} = \epsilon_\theta(x_t, \emptyset) + w \cdot (\epsilon_\theta(x_t, y) - \epsilon_\theta(x_t, \emptyset))$$

The guidance weight $w > 1$ amplifies conditioning; $w = 7.5$ is typical for Stable Diffusion. Classifier-free guidance is the de-facto standard.

## Notable architectures

| Model | Year | Contribution |
|---|---|---|
| **DDPM** | 2020 | Resurrected diffusion; noise-prediction training |
| **DDIM** | 2020 | Deterministic sampler; 20× speedup |
| **Score SDE** | 2021 | Unified perspective; arbitrary samplers |
| **Stable Diffusion / LDM** | 2022 | Latent space; open-source text-to-image |
| **DALL·E 2** | 2022 | CLIP-guided generation |
| **Imagen** | 2022 | Cascaded super-resolution; large-text-encoder |
| **DiT** | 2022 | Diffusion transformer (replaces U-Net) — see [[Diffusion Transformer]] |
| **Sora** | 2024 | Spatiotemporal DiT at scale, video |
| **Consistency Models** | 2023 | One-step or few-step generation |
| **Stable Diffusion 3** | 2024 | MMDiT + [[Flow Matching]] / Rectified Flow — see [[Stable Diffusion 3]] |
| **Flux.1** | 2024 | Hybrid MMDiT, 12B; open-weight flagship — see [[Flux.1]] |
| **SD 3.5 / SD 3.5 Turbo** | 2024 | 8.1B MMDiT + adversarial diffusion distillation → 1–4 step generation |
| **Qwen-Image** | 2025 | 28.85B densely scaled MMDiT |
| **HiDream-I1-Dev** | 2025 | 17B sparse DiT, 4K capable |
| **SANA 1.5** | 2025 | 4.8B linear-attention DiT |
| **DyDiT++** | 2025 | Dynamic DiT — compute varies by timestep + spatial dim |

## Evaluation

| Metric | What |
|---|---|
| **FID** | Frechet Inception Distance — same as GANs; lower is better |
| **CLIP Score** | Cosine similarity between CLIP embeddings of caption and image |
| **Inception Score** | Diversity/fidelity (less popular than FID) |
| **DrawBench / PartiPrompts / GenEval** | Curated text-to-image prompt benchmarks |
| **Human eval** | Gold standard for subjective quality |

## When diffusion wins

- **High-quality image synthesis** — current state-of-the-art.
- **Text-conditioned generation** — controllable, diverse, faithful.
- **Diversity** — covers the data distribution more faithfully than GANs.
- **Training stability** — straightforward MSE objective.
- **Composability** — guidance, ControlNet, LoRA adapters all stack.

## When it doesn't

- **Real-time inference budgets** — even 4-step models add latency vs single-pass GANs.
- **Tiny models** — diffusion benefits from scale; small diffusion is mediocre.
- **Discrete data** — diffusion's continuous noise is awkward for tokens (though discrete diffusion exists).
- **Likelihood-critical tasks** — diffusion's likelihood is bounded by the variational gap; flow-based models or autoregressive may be preferred.

## Pitfalls

- **Schedule sensitivity** — too-aggressive noise schedule destroys training signal; too-gentle schedule wastes steps.
- **Guidance weight too high** — over-saturated, "burnt-looking" samples.
- **Latent decoder bottleneck** — even perfect latent denoising is bounded by VAE quality.
- **Sampler inconsistency** — different samplers produce different aesthetics; compare apples to apples.
- **CFG cost** — classifier-free guidance doubles forward passes (conditional + unconditional).

## What's new since 2024 (2025–2026 update)

The diffusion field moved on three fronts since this page was first written:

1. **Backbone: U-Net → DiT → MMDiT.** Frontier models (SD3, Flux.1, Qwen-Image, Sora) now use [[Diffusion Transformer|Diffusion Transformers]] rather than U-Net. The MMDiT (Multi-Modal DiT) variant in SD3 and Flux.1 runs separate-weight transformer streams for text and image with bidirectional cross-attention.
2. **Objective: noise prediction → [[Flow Matching]].** SD3 and Flux.1 use Rectified Flow / Flow Matching instead of DDPM noise prediction. Result: straighter probability paths, 4–28 sampling steps, easier distillation.
3. **Distillation: 1–4 step generation.** Adversarial Diffusion Distillation (SD 3.5 Turbo), Consistency Distillation, and DMD2 routinely produce 1–4 step models with quality close to the slow teachers.

See [[Diffusion Transformer]] and [[Flow Matching]] for full treatments. See [[Modality-as-Tokens]] for how this fits the broader multimodal-architecture convergence.

## Connections

- [[Generative Adversarial Network]] — predecessor; succeeded for high-quality generation
- [[Variational Inference]] — VAE used in latent diffusion as the encoder/decoder
- [[U-Net]] — canonical denoising network architecture for diffusion (legacy backbone)
- [[Diffusion Transformer]] — modern transformer backbone (replaces U-Net)
- [[Flow Matching]] — alternative training objective (replaces noise prediction in SD3/Flux)
- [[Multimodal Tokenization]] — latent-patch tokenization is the input layer for diffusion transformers
- [[Vision Transformer]] — architectural ancestor of DiT
- [[Generative AI]] — umbrella concept
- [[Attention Mechanism]] — used in U-Net cross-attention for text conditioning
- [[CLIP]] — text encoder backing classifier-free guidance
- [[Markov Chain Monte Carlo]] — diffusion's continuous-time analog (Langevin dynamics)
- [[Score Matching]] — theoretical foundation
- [[Convolution]] — operator at the core of U-Net denoising
- [[Stable Diffusion 3]], [[Flux.1]], [[Black Forest Labs]], [[Stability AI]] — frontier models and orgs
- [[Modality-as-Tokens]] — synthesis on multimodal architectural convergence
- [[2026-05-28-diffusion-models-2026]] — 2026 state-of-the-art source summary
