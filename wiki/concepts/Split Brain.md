---
title: Split Brain
type: concept
tags: [coordination, failure-modes, distributed-systems]
sources: [2026-04-16-grokking-advanced-system-design-interview]
created: 2026-04-16
updated: 2026-04-16
---

# Split Brain

## Definition

Failure mode where multiple nodes believe they are the active leader and can issue conflicting operations.

## Why It Matters

- Can cause divergent writes and metadata corruption.
- Requires fencing/epoch-based leader validation.

## Related Concepts

- [[Fencing]]
- [[Leader-Follower Replication]]
