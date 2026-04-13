---
title: Markov Chain Monte Carlo
type: concept
tags: [bayesian, sampling, inference]
sources: [2026-04-12-ml-algorithms-in-depth]
created: 2026-04-12
updated: 2026-04-13
---

# Markov Chain Monte Carlo

## Definition

Family of algorithms that draw samples from complex probability distributions by constructing a Markov chain whose stationary distribution matches the target posterior.

## Mathematical Formulation

### Goal

Given target distribution $p(\mathbf{z}) \propto \tilde{p}(\mathbf{z})$ where $\tilde{p}$ is known but normalization is intractable, generate samples:
$$\mathbf{z}^{(1)}, \mathbf{z}^{(2)}, ..., \mathbf{z}^{(T)} \sim p(\mathbf{z})$$

### Markov Chain Basics

A Markov chain is defined by transition kernel $T(\mathbf{z}' | \mathbf{z})$. For irreducible, aperiodic chains, the stationary distribution $\pi(\mathbf{z})$ satisfies:
$$\pi(\mathbf{z}') = \int T(\mathbf{z}' | \mathbf{z}) \pi(\mathbf{z}) d\mathbf{z}$$

Under mild conditions, the chain converges to $\pi(\mathbf{z}) = p(\mathbf{z})$.

### Metropolis-Hastings Algorithm

1. Propose $\mathbf{z}' \sim q(\mathbf{z}' | \mathbf{z})$
2. Compute acceptance ratio:
$$\alpha = \frac{\tilde{p}(\mathbf{z}') q(\mathbf{z} | \mathbf{z}')}{\tilde{p}(\mathbf{z}) q(\mathbf{z}' | \mathbf{z})}$$
3. Accept with probability $\min(1, \alpha)$:
$$\mathbf{z}^{(t+1)} = \begin{cases} \mathbf{z}' & \text{if } u < \alpha \\ \mathbf{z}^{(t)} & \text{otherwise} \end{cases}$$

where $u \sim \text{Uniform}(0, 1)$.

### Detailed Balance

Metropolis-Hastings satisfies detailed balance:
$$p(\mathbf{z}) q(\mathbf{z}' | \mathbf{z}) \alpha(\mathbf{z}, \mathbf{z}') = p(\mathbf{z}') q(\mathbf{z} | \mathbf{z}')\alpha(\mathbf{z}', \mathbf{z})$$

This ensures $p(\mathbf{z})$ is the stationary distribution.

### Gibbs Sampling

Special case where $q(\mathbf{z}' | \mathbf{z})$ samples from the conditional:
$$z_j^{(t+1)} \sim p(z_j | \mathbf{z}_{-j}^{(t)})$$

For Gaussian Mixture Models, Gibbs samples:
$$\gamma_{nk} \sim p(z_n=k | \boldsymbol{\mu}, \boldsymbol{\Sigma}, \boldsymbol{\pi})$$
$$\boldsymbol{\mu}_k \sim p(\boldsymbol{\mu}_k | \mathbf{X}, \boldsymbol{\Sigma}, \boldsymbol{\pi}, \boldsymbol{\gamma})$$

### Effective Sample Size

Since MCMC samples are correlated, effective sample size:
$$ESS = \frac{N}{1 + 2\sum_{t=1}^{T} \rho_t}$$

where $\rho_t$ is the autocorrelation at lag $t$.

### Convergence Diagnostics

| Method | What it measures |
|--------|------------------|
| Gelman-Rubin $\hat{R}$ | Between-chain variance |
| Effective sample size | Correlation between samples |
| Trace plots | Visual mixing quality |

## Related Concepts

- [[Variational Inference]]
- [[Bayesian Optimization]]
- [[Gaussian Mixture Model]]
