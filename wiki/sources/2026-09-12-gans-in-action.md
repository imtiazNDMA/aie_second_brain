---
tags: [source, book, gans, generative-ml, deep-learning]
sources: ["GANs in Action.pdf"]
created: 2026-09-12
updated: 2026-09-12
---

# GANs in Action: Deep Learning with Generative Adversarial Networks

**Source:** `raw/source/ml-foundations/GANs in Action.pdf` — Jakub Langr, Vladimir Bok (Manning, 2019)
**Date ingested:** 2026-09-12
**Type:** book

## Summary

Practical tutorial book covering GAN fundamentals, training stability, architectural innovations (DCGAN, Progressive GAN, CycleGAN), semi-supervised learning, adversarial examples, and governance concerns. 12 chapters. Note: 2019 book with legacy code (Python 3.6, TensorFlow 1.x); preserve concepts, not code.

## Key Claims

- GAN training is a coupled game, not ordinary single-objective optimization; generator vs discriminator alternating updates
- Training stability and evaluation are the central engineering problems; mode collapse, vanishing gradients, IS/FID as imperfect proxies
- Architectural innovations progressively improve quality and control: DCGAN, Progressive GAN, Conditional GAN, CycleGAN
- GANs can improve downstream tasks: semi-supervised learning (SGAN ~89% MNIST accuracy from 100 labeled examples), synthetic data augmentation
- Generative power creates robustness and governance concerns: adversarial perturbations, deepfakes, privacy, fairness

## Entities Mentioned

- [[Jakub Langr]] — co-author
- [[Vladimir Bok]] — co-author
- [[Ian Goodfellow]] — GAN inventor (referenced)
- [[Martin Arjovsky]] — WGAN author (referenced)

## Concepts Covered

- [[Generative Adversarial Network]] — generator/discriminator coupled training, minimax objective
- [[Mode Collapse]] — generator producing limited variety of outputs
- [[Wasserstein GAN]] — WGAN-GP gradient penalty for training stability
- [[DCGAN]] — convolutional architecture with batch normalization
- [[Progressive GAN]] — gradual resolution growth, minibatch standard deviation
- [[CycleGAN]] — unpaired domain translation with cycle consistency loss
- [[Conditional GAN]] — label-controlled generation
- [[Inception Score]] — KL-divergence-based quality/diversity metric
- [[Fréchet Inception Distance]] — distribution distance metric
- [[Adversarial Examples]] — FGSM, PGD perturbations causing classifier failures
- [[Semi-Supervised Learning]] — GAN-based augmentation improving downstream accuracy
- [[Deepfake Ethics]] — synthetic media governance, privacy, fairness concerns
