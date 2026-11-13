---

tags: [concept, diffusion, generation, robotics, action, cluster/generative-models]
sources: ["2026-09-12-vision-language-models-building-vlms", "2026-05-28-vision-language-models-2026"]
created: 2026-09-12
updated: 2026-09-12
---


# Flow Matching

Generative modeling technique that learns a continuous flow (vector field) from noise to data, enabling efficient sampling through ODE integration. Used in both image generation and robotics action prediction.

## Core Idea

Instead of learning a reverse diffusion process, flow matching learns a velocity field $v(x_t, t)$ that transports samples from noise distribution $p_0$ to data distribution $p_1$ along straight paths.

## vs. Diffusion Models

| Aspect | Diffusion | Flow Matching |
|---|---|---|
| **Training** | Score matching / denoising | Regression on velocity field |
| **Sampling** | Iterative denoising | ODE integration |
| **Paths** | Stochastic (SDE) | Deterministic (ODE) |
| **Speed** | Often 20-50 steps | Often 5-10 steps |

## Applications

- **Image generation** — Flux.1, Stable Diffusion 3
- **Robotics action prediction** — flow-matching action experts convert visual understanding into robot commands
- **Video generation** — temporal coherence in frame sequences

## Related

- [[Diffusion Models]] — related generative paradigm
- [[Generative Adversarial Network]] — alternative generation approach
- [[Vision Language Models]] — VLM architectures using flow matching
- [[Modality-as-Tokens]] — token-based generation framework
