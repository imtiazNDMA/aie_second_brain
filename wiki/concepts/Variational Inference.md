---
title: Variational Inference
type: concept
tags: [bayesian, optimization, inference]
sources: [2026-04-12-ml-algorithms-in-depth]
created: 2026-04-12
updated: 2026-04-13
---

# Variational Inference

## Definition

Optimization-based approximation of posterior distributions by selecting the closest candidate from a tractable family (e.g., mean-field) using KL divergence.

## Mathematical Formulation

### The Inference Problem

Given observed data $\mathbf{x}$ and latent variables $\mathbf{z}$, we want the posterior:
$$p(\mathbf{z} | \mathbf{x}) = \frac{p(\mathbf{x}, \mathbf{z})}{p(\mathbf{x})}$$

Computing $p(\mathbf{x}) = \int p(\mathbf{x}, \mathbf{z}) d\mathbf{z}$ is intractable for complex models.

### Variational Lower Bound (ELBO)

We approximate $p(\mathbf{z} | \mathbf{x})$ with $q_\phi(\mathbf{z})$ from a variational family. The ELBO:

$$\mathcal{L}(\phi) = \mathbb{E}_{q_\phi(\mathbf{z})}[\log p(\mathbf{x}, \mathbf{z})] - \mathbb{E}_{q_\phi(\mathbf{z})}[\log q_\phi(\mathbf{z})]$$

This is equivalent to minimizing $\text{KL}(q_\phi(\mathbf{z}) || p(\mathbf{z} | \mathbf{x}))$:

$$\text{KL}(q || p) = \mathbb{E}_{q}[\log q] - \mathbb{E}_{q}[\log p] = -\mathcal{L}(\phi) + \log p(\mathbf{x})$$

### Mean-Field Approximation

In mean-field VI, the variational family factorizes:
$$q(\mathbf{z}) = \prod_{j=1}^{K} q_j(z_j)$$

For exponential family distributions, this leads to coordinate ascent updates:
$$q_j^*(z_j) \propto \exp(\mathbb{E}_{-j}[\log p(\mathbf{x}, \mathbf{z})])$$

### Reparameterization Trick

For gradient-based optimization, we reparameterize $q_\phi(\mathbf{z})$:
$$\mathbf{z} = \mu + \sigma \cdot \epsilon, \quad \epsilon \sim \mathcal{N}(0, \mathbf{I})$$

This enables:
$$\nabla_\phi \mathbb{E}_{q_\phi(\mathbf{z})}[f(\mathbf{z})] = \mathbb{E}_{\epsilon}[\nabla_\phi f(\mu + \sigma \cdot \epsilon)]$$

## Variational Autoencoders

In VAEs, the encoder $q_\phi(\mathbf{z}|\mathbf{x})$ produces $\mu, \sigma$; the decoder $p_\theta(\mathbf{x}|\mathbf{z})$ reconstructs:

$$\mathcal{L}_{\text{VAE}} = \mathbb{E}_{q_\phi(\mathbf{z}|\mathbf{x})}[\log p_\theta(\mathbf{x}|\mathbf{z})] - \text{KL}(q_\phi(\mathbf{z}|\mathbf{x}) || p(\mathbf{z}))$$

## Related Concepts

- [[Markov Chain Monte Carlo]]
- [[Latent Dirichlet Allocation]]
- [[Embeddings]]
