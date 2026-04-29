---
title: Consistent Hashing
type: concept
tags: [distributed-systems, hashing, partitioning]
sources: [2026-04-16-system-design-interview-complete-guide, 2026-04-16-grokking-advanced-system-design-interview]
created: 2026-04-16
updated: 2026-04-16
---

# Consistent Hashing

## Definition

Partitioning technique that maps keys and servers onto a logical ring so that adding or removing servers relocates only a limited subset of keys.

## Why It Matters

- Reduces rehashing storms compared with `hash(key) mod N`.
- Stabilizes cache/distributed storage behavior during membership changes.
- Helps maintain throughput during scale-out and failure recovery events.

## Related Concepts

- [[High Availability]]
- [[Load Balancing]]
- [[Quorum]]
