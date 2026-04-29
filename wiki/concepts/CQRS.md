---
title: CQRS
type: concept
tags: [architecture, data-modeling, event-driven]
sources: [2026-04-16-system-design-on-aws]
created: 2026-04-16
updated: 2026-04-16
---

# CQRS

## Definition

Command Query Responsibility Segregation pattern that separates write models from read models to optimize each side independently.

## Why It Matters

- Enables tailored scaling and data structures for writes versus reads.
- Often pairs with event streams and projections in high-throughput systems.

## Related Concepts

- [[Saga Pattern]]
- [[Event-Driven Architecture]]
- [[Data Pipeline]]
