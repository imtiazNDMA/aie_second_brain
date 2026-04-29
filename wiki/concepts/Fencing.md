---
title: Fencing
type: concept
tags: [coordination, failover, distributed-systems]
sources: [2026-04-16-grokking-advanced-system-design-interview]
created: 2026-04-16
updated: 2026-04-16
---

# Fencing

## Definition

Failover safety mechanism that prevents an old or ambiguous leader from mutating shared resources after leadership changes.

## Why It Matters

- Stops stale leaders from corrupting state during network partitions.
- Enforces single-writer semantics during failover.

## Related Concepts

- [[Split Brain]]
- [[Lease]]
