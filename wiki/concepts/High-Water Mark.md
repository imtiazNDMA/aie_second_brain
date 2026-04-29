---
title: High-Water Mark
type: concept
tags: [replication, consistency, messaging]
sources: [2026-04-16-grokking-advanced-system-design-interview]
created: 2026-04-16
updated: 2026-04-16
---

# High-Water Mark

## Definition

Largest log offset known to be safely replicated to the required in-sync replica set and therefore safe to expose to consumers.

## Why It Matters

- Prevents non-repeatable reads after leader failover.
- Defines safe visibility boundary in replicated logs.

## Related Concepts

- [[Leader-Follower Replication]]
- [[Quorum]]
