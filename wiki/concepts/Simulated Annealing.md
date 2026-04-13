---
title: Simulated Annealing
type: concept
tags: [optimization, probabilistic, search]
sources: [2026-04-12-ml-algorithms-in-depth]
created: 2026-04-13
updated: 2026-04-13
---

# Simulated Annealing

## Definition

Probabilistic optimization algorithm inspired by metallurgical annealing. Iteratively perturbs a candidate solution and accepts worse moves with probability $\exp(-\Delta E / T)$ while gradually lowering temperature $T$, allowing escape from local minima.

## Algorithm Steps

1. Initialize solution $x_0$ and temperature $T_0$.
2. Sample neighbor $x'$ via problem-specific perturbation.
3. Compute $\Delta E = f(x') - f(x)$.
4. Accept $x'$ if $\Delta E \le 0$ else accept with probability $\exp(-\Delta E / T)$.
5. Update temperature (e.g., $T \leftarrow \alpha T$).
6. Repeat until convergence.

## Applications

- Feature selection, model hyperparameters, VRP routing, architecture search.
- Serves as a baseline in [[2026-04-12-ml-algorithms-in-depth]] for comparing global vs local search.

## Related Concepts

- [[Genetic Algorithms]]
- [[Bayesian Optimization]]
