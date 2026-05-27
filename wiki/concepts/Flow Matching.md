---
title: Flow Matching
type: concept
tags: [diffusion, flow-matching, rectified-flow, generative-models, ode]
sources: [2026-05-28-diffusion-models-2026]
created: 2026-05-28
updated: 2026-05-28
---

# Flow Matching

## Definition

**Flow Matching (FM)** is a training objective for continuous-time generative models that learns a **velocity field** $v_\theta(x_t, t)$ which transports a simple base distribution (Gaussian noise) to the data distribution along a continuous-time path. Introduced by Lipman et al. (ICLR 2023, "Flow Matching for Generative Modeling"), FM has replaced [[Diffusion Models|DDPM]]-style noise prediction in many frontier image and video generation models — most notably **Stable Diffusion 3** and **Flux.1**.

Crucially, FM is mathematically equivalent to a class of diffusion models with specific noise schedules — but its formulation is simpler, sampling is faster, and training is more stable.

## The objective

Define a **probability path** from noise to data: $x_t = (1-t) \cdot x_0 + t \cdot x_1$ for $t \in [0, 1]$, where $x_0 \sim \mathcal{N}(0, I)$ is noise and $x_1$ is a real data sample. This is a straight line in data space.

The instantaneous velocity along this path is constant:

$$\frac{dx_t}{dt} = x_1 - x_0$$

**Flow Matching loss**: train a neural network $v_\theta(x_t, t)$ to predict this velocity:

$$\mathcal{L}_{\text{FM}} = \mathbb{E}_{t \sim U(0,1),\, x_0 \sim p_{\text{noise}},\, x_1 \sim p_{\text{data}}} \left[ \| v_\theta(x_t, t) - (x_1 - x_0) \|^2 \right]$$

This is a single MSE — simpler than DDPM's variational lower bound derivation.

## Sampling

At inference, solve the ODE:

$$\frac{dx_t}{dt} = v_\theta(x_t, t), \quad x_0 \sim \mathcal{N}(0, I)$$

with any ODE solver (Euler, Heun, RK4, …). Integrate from $t=0$ to $t=1$. The number of solver steps determines sampling cost.

Because the target path is **straight**, a small number of solver steps (often 4–28) gives high-quality samples. Compare to DDPM's curved Markov chain, which needs many more steps to sample accurately.

```python
# Euler sampling for Flow Matching
def sample(v_theta, num_steps=28):
    x = torch.randn(shape)  # x_0 ~ N(0, I)
    dt = 1.0 / num_steps
    for step in range(num_steps):
        t = step * dt
        v = v_theta(x, t)
        x = x + v * dt
    return x
```

## Flow Matching vs DDPM

| Aspect | DDPM | Flow Matching |
|---|---|---|
| Probability path | Curved (variance-preserving SDE) | Straight (linear interpolation) |
| Training target | Noise $\epsilon$ | Velocity $v = x_1 - x_0$ |
| Loss | MSE on predicted noise | MSE on predicted velocity |
| Sampler | Reverse SDE (DDIM, DPM-Solver) | ODE (Euler, Heun) |
| Sampling steps (typical) | 20–50 (with DPM-Solver) | 4–28 |
| Training stability | Sensitive to noise schedule | Schedule-free formulation |
| Theoretical equivalence | Special case of variance-preserving SDE | Special case of CNF / continuous normalizing flow |

DDPM and FM are **equivalent under the right reparametrization** — the velocity at time $t$ can be expressed in terms of noise prediction at time $t$ in DDPM. The benefit of FM is the *training* simplification and the *straight path* that admits cheap sampling.

## Rectified Flow

**Rectified Flow** (Liu et al. ICLR 2023, "Flow Straight and Fast") is a refinement of FM. The "rectify" step:

1. Train an initial FM model on (noise, data) pairs along straight paths.
2. **Re-pair noise and data** using the learned flow: sample noise, run the FM model to get a data sample, then re-train on the (noise, generated-sample) pair.
3. The new pairs have *less curvy* trajectories (since the model already maps them straightly).
4. Iterate.

Result: a model that generates in 1–4 steps with quality matching multi-step inference. This is the foundation of **Stable Diffusion 3.5 Turbo** (1-step) and **Flux.1-schnell** (1–4 steps).

## Logit-normal time sampling

SD3 introduced **logit-normal time sampling**: during training, sample $t \sim \text{LogitNormal}(0, 1)$ instead of uniform. Equivalently, $t = \sigma(\xi)$ where $\xi \sim \mathcal{N}(0, 1)$.

This biases training toward intermediate $t$ values (where the model has the hardest job and the most learning signal), avoiding wasted compute on near-noise and near-data timesteps where the velocity is easier to predict.

## Why MMDiT pairs naturally with Flow Matching

[[Diffusion Transformer#MMDiT|MMDiT]] (Multi-Modal Diffusion Transformer, used in SD3 and Flux.1) ships together with Flow Matching for several reasons:

1. FM's straight-line paths reduce the number of timesteps the transformer sees → fewer training examples per epoch → cheaper to scale.
2. The velocity-prediction objective is easier to interpret than noise-prediction at high resolutions.
3. The text encoders in MMDiT (CLIP-G + T5-XXL in SD3) benefit from FM's stable convergence.

## When FM wins

- **Faster sampling** — 4–28 steps vs 50+ for noise-prediction DDPM.
- **Cleaner training** — single MSE, no variational gap, no noise schedule tuning.
- **Better rectification** — straight paths admit aggressive distillation to 1–4 step models.
- **Theoretically clean** — equivalent to continuous normalizing flows.

## When DDPM-style still wins

- **Established codebases** — Stable Diffusion 1/2/XL, Imagen, DALL·E 3 use noise prediction; retraining is expensive.
- **Some samplers** (DPM-Solver++) match FM step counts on noise-prediction models.
- **Likelihood-critical tasks** — noise-prediction has a more direct variational bound.

## Notable Flow Matching models

| Model | FM variant | Notes |
|---|---|---|
| **Stable Diffusion 3** | Rectified Flow + logit-normal time | First major SOTA model on FM |
| **Stable Diffusion 3.5** | Rectified Flow | + ADD-distilled Turbo at 1–4 steps |
| **Flux.1-Dev / Pro** | Rectified Flow | 12B; Black Forest Labs |
| **Flux.1-schnell** | Distilled Rectified Flow | 1–4 step generation |
| **Lumina-Next** | Flow Matching | DiT + FM |
| **AuraFlow** | Flow Matching | open community model |

## Connections

- [[Diffusion Models]] — the broader family FM unifies with
- [[Diffusion Transformer]] — the backbone FM is typically paired with
- [[Stable Diffusion 3]] — the flagship FM model
- [[Flux.1]] — open-weight FM flagship
- [[Black Forest Labs]] — Flux.1 origin
- [[Stability AI]] — SD3 / SD3.5 origin
- [[Score Matching]] — DDPM's score-based formulation; related theory
- [[Markov Chain Monte Carlo]] — what FM replaces by a deterministic ODE
- [[2026-05-28-diffusion-models-2026]] — source summary

## Open Questions

- Will FM completely replace noise-prediction diffusion, or coexist?
- Best ODE solver for FM at large step counts (Heun? RK4? adaptive?).
- Multi-step rectification limits — how many iterations of "rectify and retrain" before diminishing returns?
- FM for non-image modalities — audio, video, 3D, motion — what adaptations needed?
