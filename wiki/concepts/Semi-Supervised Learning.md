---

tags: [concept, machine-learning, training, gans, cluster/ml-foundations]
sources: ["2026-09-12-gans-in-action"]
created: 2026-09-12
updated: 2026-09-12
---


# Semi-Supervised Learning

Training paradigm that leverages both labeled and unlabeled data to improve model performance. In the GAN context, the discriminator is extended to output K+1 classes (K real classes + 1 fake), enabling it to learn from both labeled real data and unlabeled real/generated data.

## GAN-Based Semi-Supervised Learning (SGAN)

The discriminator learns to:
1. Distinguish real from generated (adversarial task)
2. Classify real data into correct classes (supervised task)
3. Reject generated data as "fake" (semi-supervised task)

## Reported Results

- SGAN achieved ~89% MNIST test accuracy from only 100 labeled examples
- Compared to ~70% for an equivalent supervised classifier
- Improvement comes from the discriminator learning better representations through the adversarial task

## Why It Works

- Adversarial training encourages the discriminator to learn meaningful features
- Generated examples provide additional training signal for feature learning
- unlabeled real data helps the discriminator learn decision boundaries

## Related

- [[Generative Adversarial Network]] — the training paradigm
- [[Active Learning]] — alternative approach to learning with limited labels
- [[Data Augmentation]] — synthetic data for training improvement
