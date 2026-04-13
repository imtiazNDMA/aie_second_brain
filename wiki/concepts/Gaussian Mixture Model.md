---
title: Gaussian Mixture Model
type: concept
tags: [clustering, probabilistic]
sources: [2026-04-12-ml-algorithms-in-depth]
created: 2026-04-12
updated: 2026-04-13
---

# Gaussian Mixture Model

## Definition

Probabilistic model expressing data as a weighted sum of Gaussian components, typically trained via Expectation-Maximization.

## Mathematical Formulation

### Likelihood

Given data $\mathbf{X} = \{\mathbf{x}_1, ..., \mathbf{x}_N\}$, the GMM likelihood:

$$p(\mathbf{x}_n | \boldsymbol{\theta}) = \sum_{k=1}^{K} \pi_k \mathcal{N}(\mathbf{x}_n | \boldsymbol{\mu}_k, \boldsymbol{\Sigma}_k)$$

where:
- $\pi_k$ — mixing coefficient (prior probability of cluster $k$)
- $\boldsymbol{\mu}_k$ — mean of component $k$
- $\boldsymbol{\Sigma}_k$ — covariance of component $k$
- $\boldsymbol{\theta} = \{\pi_k, \boldsymbol{\mu}_k, \boldsymbol{\Sigma}_k\}$

Complete likelihood for dataset:
$$p(\mathbf{X} | \boldsymbol{\theta}) = \prod_{n=1}^{N} \sum_{k=1}^{K} \pi_k \mathcal{N}(\mathbf{x}_n | \boldsymbol{\mu}_k, \boldsymbol{\Sigma}_k)$$

### E-Step: Responsibilities

The responsibility (posterior probability) of component $k$ for data point $n$:

$$\gamma_{nk} = p(z_n = k | \mathbf{x}_n) = \frac{\pi_k \mathcal{N}(\mathbf{x}_n | \boldsymbol{\mu}_k, \boldsymbol{\Sigma}_k)}{\sum_{j=1}^{K} \pi_j \mathcal{N}(\mathbf{x}_n | \boldsymbol{\mu}_j, \boldsymbol{\Sigma}_j)}$$

### M-Step: Parameter Updates

**Mixing coefficients:**
$$\pi_k = \frac{1}{N} \sum_{n=1}^{N} \gamma_{nk}$$

**Means:**
$$\boldsymbol{\mu}_k = \frac{\sum_{n=1}^{N} \gamma_{nk} \mathbf{x}_n}{\sum_{n=1}^{N} \gamma_{nk}}$$

**Covariances:**
$$\boldsymbol{\Sigma}_k = \frac{\sum_{n=1}^{N} \gamma_{nk} (\mathbf{x}_n - \boldsymbol{\mu}_k)(\mathbf{x}_n - \boldsymbol{\mu}_k)^\top}{\sum_{n=1}^{N} \gamma_{nk}}$$

### Convergence

EM monotonically increases the log-likelihood:
$$\mathcal{L}^{(t+1)} = \sum_{n=1}^{N} \log \sum_{k=1}^{K} \pi_k^{(t)} \mathcal{N}(\mathbf{x}_n | \boldsymbol{\mu}_k^{(t)}, \boldsymbol{\Sigma}_k^{(t)})$$

Convergence when $|\mathcal{L}^{(t+1)} - \mathcal{L}^{(t)}| < \epsilon$.

### Special Cases

| Constraint | Name | Covariance $\boldsymbol{\Sigma}_k$ |
|------------|------|-----------------------------------|
| Spherical | GMM-spherical | $\sigma_k^2 \mathbf{I}$ |
| Diagonal | GMM-diagonal | $\text{diag}(\sigma_{k1}^2, ..., \sigma_{kd}^2)$ |
| Full | GMM-full | Arbitrary positive definite |

## Related Concepts

- [[Dirichlet Process K-Means]]
- [[Variational Inference]]
- [[Embeddings]]
