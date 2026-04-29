---
title: Lease
type: concept
tags: [coordination, locking, distributed-systems]
sources: [2026-04-16-grokking-advanced-system-design-interview]
created: 2026-04-16
updated: 2026-04-16
---

# Lease

## Definition

Time-bounded lock/ownership grant that expires automatically unless renewed by the holder.

## Why It Matters

- Limits deadlock risk from crashed lock holders.
- Enables safer coordination and failover semantics.

## Related Concepts

- [[Fencing]]
- [[Split Brain]]
