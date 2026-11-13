---

tags: [concept, gans, evaluation, metrics, cluster/evaluation]
sources: ["2026-09-12-gans-in-action"]
created: 2026-09-12
updated: 2026-09-12
---


# Fréchet Inception Distance (FID)

Distribution-based metric measuring the distance between generated and real image distributions using features from a pretrained Inception-v3 network. Lower FID indicates better quality and diversity.

## Formula

$$FID = \|\mu_r - \mu_g\|^2 + \text{Tr}(\Sigma_r + \Sigma_g - 2(\Sigma_r \Sigma_g)^{1/2})$$

Where $\mu_r, \Sigma_r$ are mean and covariance of real features, and $\mu_g, \Sigma_g$ are mean and covariance of generated features.

## Properties

- **Lower is better** — 0 means identical distributions
- **Captures both quality and diversity** — unlike IS which only measures generated samples
- **Sensitive to resolution** — compare at same resolution
- **Requires sufficient samples** — typically 10K+ for stable estimates

## Limitations

- **Imperfect proxy** — Inception features may not capture all perceptual qualities
- **Domain-specific** — Inception trained on ImageNet; may not generalize to other domains
- **Does not measure mode dropping** — a model producing one perfect image per mode would still have high FID

## Related

- [[Inception Score]] — alternative GAN evaluation metric
- [[Generative Adversarial Network]] — primary evaluation context
- [[Model Evaluation]] — broader evaluation framework
