---
title: Vector Clocks
type: concept
tags: [causality, consistency, distributed-systems]
sources: [2026-04-16-grokking-advanced-system-design-interview]
created: 2026-04-16
updated: 2026-04-16
---

# Vector Clocks

## Definition

Causality-tracking version metadata that records per-node update counters to detect ancestry and conflicts across distributed writes.

## Why It Matters

- Distinguishes concurrent updates from strictly newer updates.
- Supports conflict-aware reconciliation in eventually consistent stores.

## Related Concepts

- [[Read Repair]]
- [[Hinted Handoff]]
