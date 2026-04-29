---
title: Read Repair
type: concept
tags: [consistency, replication, distributed-systems]
sources: [2026-04-16-grokking-advanced-system-design-interview]
created: 2026-04-16
updated: 2026-04-16
---

# Read Repair

## Definition

Consistency maintenance mechanism where read operations detect replica divergence and push newer values to stale replicas.

## Why It Matters

- Improves eventual consistency without requiring synchronous full-replica writes.
- Gradually heals replicas after transient failures.

## Related Concepts

- [[Hinted Handoff]]
- [[Merkle Trees]]
