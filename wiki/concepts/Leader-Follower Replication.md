---
title: Leader-Follower Replication
type: concept
tags: [replication, coordination, distributed-systems]
sources: [2026-04-16-grokking-advanced-system-design-interview]
created: 2026-04-16
updated: 2026-04-16
---

# Leader-Follower Replication

## Definition

Replication model where one leader serializes writes and followers replicate leader state for durability and failover.

## Why It Matters

- Simplifies write ordering and conflict control.
- Supports failover by promoting an up-to-date follower.

## Related Concepts

- [[High-Water Mark]]
- [[Split Brain]]
