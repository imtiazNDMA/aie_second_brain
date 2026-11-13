---

tags: [concept, gans, evaluation, metrics, cluster/evaluation]
sources: ["2026-09-12-gans-in-action"]
created: 2026-09-12
updated: 2026-09-12
---


# Inception Score (IS)

Metric evaluating GAN quality by measuring both fidelity (generated images look real) and diversity (generated images cover the full range of classes). Uses a pretrained Inception-v3 network to compute KL divergence between conditional label predictions and their marginal distribution.

## Formula

$$IS = \exp\left(\mathbb{E}_{x \sim p_g} D_{KL}(p(y|x) \| p(y))\right)$$

Where $p(y|x)$ is the conditional label distribution for generated image $x$, and $p(y)$ is the marginal label distribution across all generated images.

## Properties

- **Higher is better** — 1.0 is minimum (no information about class)
- **Measures only generated samples** — does not compare to real data distribution
- **Sensitive to class balance** — biased toward models that generate balanced class distributions

## Limitations

- **Does not measure mode dropping** — a model generating one perfect image per class scores high
- **Inception-v3 bias** — features from ImageNet-trained classifier may not capture all relevant qualities
- **Standard IS uses KL between generated samples and their marginal** — NOT between real and generated distributions (common misconception)

## Related

- [[Fréchet Inception Distance]] — preferred alternative that compares distributions
- [[Generative Adversarial Network]] — primary evaluation context
- [[Model Evaluation]] — broader evaluation framework
