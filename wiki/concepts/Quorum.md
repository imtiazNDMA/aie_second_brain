---
title: Quorum
type: concept
tags: [consistency, replication, distributed-systems]
sources: [2026-04-16-grokking-advanced-system-design-interview]
created: 2026-04-16
updated: 2026-04-16
---

# Quorum

## Definition

Read/write coordination rule where a minimum subset of replicas must acknowledge operations, often modeled with `R + W > N`.

## Why It Matters

- Controls consistency-vs-latency tradeoffs in replicated systems.
- Prevents stale reads when configured with sufficient read and write overlap.

## Related Concepts

- [[Leader-Follower Replication]]
- [[Hinted Handoff]]
