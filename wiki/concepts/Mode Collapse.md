---

tags: [concept, gans, failure-mode, training-stability, cluster/evaluation]
sources: ["2026-09-12-gans-in-action"]
created: 2026-09-12
updated: 2026-09-12
---


# Mode Collapse

Failure mode in GAN training where the generator produces a limited variety of outputs, failing to capture the full diversity of the training distribution. The generator finds a small number of outputs that reliably fool the discriminator and converges to producing only those.

## Symptoms

- Generated samples are near-duplicates of each other
- Limited diversity despite training on diverse data
- Generator "memorizes" a few successful patterns
- Discriminator cannot distinguish generated from real due to limited mode coverage

## Causes

- **Strong discriminator** — discriminator converges too quickly, providing no useful gradient for diversity
- **Generator capacity** — insufficient capacity to model full distribution
- **Training dynamics** — generator finds shortcut that satisfies discriminator without covering full distribution

## Mitigation

- **Minibatch discrimination** — discriminator sees batches, not individual samples
- **Unrolled GAN** — generator optimizes against future discriminator states
- **Wasserstein distance** — WGAN provides smoother gradients that encourage diversity
- **Progressive training** — grow resolution gradually to avoid early mode locking

## Related

- [[Generative Adversarial Network]] — the training paradigm where mode collapse occurs
- [[Wasserstein GAN]] — alternative objective with better diversity properties
- [[Training Stability]] — broader GAN training challenges
