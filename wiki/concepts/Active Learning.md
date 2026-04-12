---
tags: [supervised-learning, efficiency]
sources: [2026-04-12-ml-algorithms-in-depth]
created: 2026-04-12
updated: 2026-04-12
---

# Active Learning

## Definition

Strategy where a model queries an oracle (human annotator) for labels on the most informative samples, reducing annotation cost.

## Techniques

- Uncertainty sampling, query-by-committee, expected model change.
- Particularly useful for imbalanced datasets discussed in chapter 7.

## Related Concepts

- [[Bayesian Optimization]]
- [[Ensemble Methods]]
