---

tags: [concept, security, adversarial, robustness, deep-learning, cluster/ml-foundations, cluster/security-ethics]
sources: ["2026-09-12-gans-in-action"]
created: 2026-09-12
updated: 2026-09-12
---


# Adversarial Examples

Inputs deliberately crafted to cause machine learning models to produce incorrect outputs with high confidence. Small, often imperceptible perturbations to input data can cause confident failures that transfer between model families.

## Attack Methods

| Method | Description |
|---|---|
| **FGSM** | Fast Gradient Sign Method — single-step perturbation using gradient sign |
| **PGD** | Projected Gradient Descent — iterative FGSM with projection onto allowed perturbation set |
| **C&W** | Carlini & Wagner — optimization-based attacks minimizing perturbation magnitude |

## Key Properties

- **Transferability** — adversarial examples crafted for one model often fool other models
- **Imperceptibility** — perturbations are small enough to be invisible to humans
- **Confidence** — models produce wrong answers with high confidence
- **Universality** — some adversarial perturbations work across many inputs

## Defensive Approaches

- **Adversarial training** — include adversarial examples in training data
- **Input preprocessing** — compression, denoising, feature squeezing
- **Certified defenses** — provable robustness guarantees for bounded perturbations
- **Ensemble methods** — multiple models reduce transferability

## Related

- [[Generative Adversarial Network]] — adversarial training paradigm
- [[Deepfake Ethics]] — governance of generative models
- [[Model Robustness]] — broader model reliability
- [[Hallucination]] — model failure mode
