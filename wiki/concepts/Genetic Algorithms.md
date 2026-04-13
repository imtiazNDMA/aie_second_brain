---
title: Genetic Algorithms
type: concept
tags: [optimization, evolutionary, search]
sources: [2026-04-12-ml-algorithms-in-depth]
created: 2026-04-13
updated: 2026-04-13
---

# Genetic Algorithms

## Definition

Evolutionary optimization techniques that maintain a population of candidate solutions, applying selection, crossover, and mutation to evolve toward better fitness.

## Workflow

1. Encode solutions as chromosomes (bit strings, vectors, trees).
2. Evaluate fitness for each individual.
3. Select parents via tournament/roulette selection.
4. Apply crossover to produce offspring; mutate randomly to maintain diversity.
5. Form new population (elitism or generational replacement) and repeat.

## Use Cases

- Hyperparameter search, neural architecture design, scheduling, symbolic regression.
- Acts as a contrasting approach to [[Simulated Annealing]] and [[Bayesian Optimization]] in *Machine Learning Algorithms in Depth*.

## Related Concepts

- [[Ensemble Methods]]
- [[Active Learning]]
