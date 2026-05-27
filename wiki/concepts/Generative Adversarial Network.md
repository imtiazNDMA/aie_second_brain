---
title: Generative Adversarial Network
type: concept
tags: [generative-models, deep-learning, neural-networks]
sources: [2026-04-12-ml-algorithms-in-depth, 2026-04-16-deep-learning-with-pytorch-step-by-step]
created: 2026-04-30
updated: 2026-04-30
---

# Generative Adversarial Network

## Definition

**Generative Adversarial Networks (GANs)** — Goodfellow et al. 2014 — are a class of generative models trained via a **two-player zero-sum game** between two neural networks:

- The **Generator** $G(z)$ maps random noise $z$ to synthetic samples.
- The **Discriminator** $D(x)$ classifies inputs as real (from the training data) or fake (from $G$).

The two networks train simultaneously: $G$ tries to fool $D$; $D$ tries not to be fooled. At Nash equilibrium, $G$ produces samples indistinguishable from real data, and $D$ outputs $0.5$ everywhere.

GANs revolutionized image generation in 2014–2020 and seeded the broader generative-AI explosion. They were largely superseded by [[Diffusion Models]] for high-quality image generation but remain relevant in speech, super-resolution, anomaly detection, and as an instructive case study in adversarial training.

## The minimax game

The original GAN objective is:

$$\min_G \max_D V(D, G) = \mathbb{E}_{x \sim p_{\text{data}}}[\log D(x)] + \mathbb{E}_{z \sim p_z}[\log(1 - D(G(z)))]$$

Read as a game:
- $D$ wants to maximize $V$: assign high probability to real $x$, low probability to generated $G(z)$.
- $G$ wants to minimize $V$: produce $G(z)$ that $D$ assigns high probability to (i.e., $D(G(z)) \to 1$).

At the global optimum: $G$ matches the data distribution exactly ($p_g = p_{\text{data}}$), $D = 0.5$ everywhere, $V = -\log 4 \approx -1.39$.

## Why this objective?

The Goodfellow proof (2014): if $G$ and $D$ have unlimited capacity and the algorithm converges, the game's optimum gives:

$$D^*(x) = \frac{p_{\text{data}}(x)}{p_{\text{data}}(x) + p_g(x)}$$

Substituting back:

$$V(D^*, G) = -\log 4 + 2 \cdot \text{JSD}(p_{\text{data}} \| p_g)$$

where JSD is the Jensen-Shannon divergence. So **minimizing the GAN loss minimizes JSD between the data and generated distributions** — a principled distance measure between distributions, no explicit density model needed.

## Practical training

The non-saturating loss for $G$ is preferred in practice. Instead of $G$ minimizing $\log(1 - D(G(z)))$, it maximizes $\log D(G(z))$:

$$\mathcal{L}_G = -\mathbb{E}_{z \sim p_z}[\log D(G(z))]$$

The reason: when $G$ is bad, $D(G(z)) \approx 0$ and $\log(1 - D(G(z))) \approx 0$ — gradient vanishes. The non-saturating form gives strong gradients when $G$ is losing.

```python
def train_step(generator, discriminator, real_batch, optimizer_g, optimizer_d):
    # Discriminator step
    z = sample_noise(batch_size)
    fake_batch = generator(z).detach()  # detach so G's gradients don't flow
    d_real = discriminator(real_batch)
    d_fake = discriminator(fake_batch)
    loss_d = -(torch.log(d_real).mean() + torch.log(1 - d_fake).mean())
    optimizer_d.zero_grad()
    loss_d.backward()
    optimizer_d.step()
    
    # Generator step (non-saturating)
    z = sample_noise(batch_size)
    fake_batch = generator(z)
    d_fake = discriminator(fake_batch)
    loss_g = -torch.log(d_fake).mean()
    optimizer_g.zero_grad()
    loss_g.backward()
    optimizer_g.step()
```

## Failure modes

GAN training is famously unstable. Three classic failures:

### 1. Mode collapse
$G$ finds *one* sample that fools $D$ and produces variations of it. The generated distribution is sharp where the data is broad. Visible as: every face is the same face.

Mitigations: minibatch discrimination, unrolled GAN, mode-seeking GAN, **Wasserstein GAN**.

### 2. Vanishing gradients
$D$ is too good — $D(G(z)) \approx 0$ everywhere. Gradient flowing back to $G$ is zero; $G$ stops learning.

Mitigations: non-saturating loss, weaker $D$ (fewer params, lower learning rate), gradient penalty.

### 3. Oscillation
$G$ and $D$ chase each other indefinitely without converging — like two boxers circling. Loss curves don't decrease; samples cycle through quality regimes.

Mitigations: TTUR (two timescale update rule), smaller learning rates, regularization (R1 / R2 penalty).

## Wasserstein GAN (WGAN)

The most important GAN variant. Replaces the JSD-based objective with the Wasserstein-1 (Earth Mover's) distance:

$$W(p_{\text{data}}, p_g) = \sup_{\|f\|_L \leq 1} \mathbb{E}_{x \sim p_{\text{data}}}[f(x)] - \mathbb{E}_{x \sim p_g}[f(x)]$$

The WGAN-GP variant enforces the Lipschitz constraint via a gradient penalty:

$$\mathcal{L}_D = \mathbb{E}_{x \sim p_g}[D(x)] - \mathbb{E}_{x \sim p_{\text{data}}}[D(x)] + \lambda \cdot \mathbb{E}_{\hat{x}}[(\|\nabla_{\hat{x}} D(\hat{x})\|_2 - 1)^2]$$

WGAN gives:
- Smoother loss landscape; loss correlates with sample quality.
- Less mode collapse (stronger gradient even when $D$ is winning).
- Less sensitivity to architecture choices.

It's the default starting point for new GAN projects.

## Conditional GANs

A conditional GAN takes auxiliary input $y$ (label, text, image):

$$G: (z, y) \to x \quad D: (x, y) \to \text{real/fake}$$

Lets you generate samples with controlled attributes. Examples:
- **cGAN** — class-conditional image generation.
- **Pix2Pix** — image-to-image translation (sketch → photo).
- **CycleGAN** — unpaired image translation (horses ↔ zebras).
- **StackGAN / AttnGAN** — text → image (predecessor to diffusion-based text-to-image).

## Notable architectures

| Architecture | Year | Contribution |
|---|---|---|
| **Vanilla GAN** | 2014 | Original min-max game |
| **DCGAN** | 2015 | Deep convolutional GAN; design rules for stable training |
| **InfoGAN** | 2016 | Disentangled latent codes via mutual information regularization |
| **WGAN / WGAN-GP** | 2017 | Wasserstein objective; gradient penalty |
| **Progressive GAN** | 2017 | Progressive resolution growing for high-res images |
| **StyleGAN** / **StyleGAN2** / **StyleGAN3** | 2018–2021 | Style-based generator; state-of-the-art face generation |
| **BigGAN** | 2018 | Large-scale class-conditional ImageNet generation |
| **CycleGAN** | 2017 | Unpaired image translation |

## Evaluation

GANs are notoriously hard to evaluate — there's no log-likelihood. Standard metrics:

| Metric | What |
|---|---|
| **Inception Score (IS)** | Higher is better; uses Inception classifier outputs |
| **Fréchet Inception Distance (FID)** | Lower is better; compares feature-space statistics of real vs generated |
| **Precision / Recall for distributions** | Disentangles fidelity and diversity |
| **Human evaluation** | Gold standard but expensive |

FID is the de-facto standard — it's the metric every GAN paper reports.

## When GANs are still relevant

- **Speech synthesis** (HiFi-GAN, MelGAN) — fast inference matters.
- **Super-resolution** (Real-ESRGAN, GFPGAN) — direct mapping; no need for diffusion's iterative cost.
- **Anomaly detection** — train $D$ on normals; high $D$ score on novel inputs flags anomalies.
- **Domain adaptation / image-to-image** — CycleGAN-style unpaired translation still competitive.
- **Real-time generation** — GAN inference is one forward pass; diffusion needs many.

## When [[Diffusion Models]] win

- **High-quality image synthesis** — diffusion has dominated since DALL·E 2 / Stable Diffusion.
- **Text-conditioned generation** — CLIP-guided diffusion is more controllable.
- **Diversity** — diffusion samples cover the data distribution more faithfully.
- **Training stability** — diffusion training is straightforward; no adversarial dynamics.

## Connections

- [[Diffusion Models]] — successor for high-quality generative modeling
- [[Variational Inference]] / VAE — alternative likelihood-based generative model
- [[Generative AI]] — umbrella concept
- [[Convolution]] / [[Recurrent Neural Network]] — common $G$/$D$ architectures
- [[Attention Mechanism]] — used in modern conditional GANs (Self-Attention GAN)
- [[Active Learning]] — orthogonal but related: $D$'s job is similar to a "is-this-novel?" classifier
- [[Inception]] — the architecture used inside Inception Score / FID
- [[Vision Transformer]] — recent GAN variants use ViT-style $D$
