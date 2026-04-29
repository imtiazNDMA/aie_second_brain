---
title: Checksum
type: concept
tags: [data-integrity, hashing, distributed-systems]
sources: [2026-04-16-grokking-advanced-system-design-interview]
created: 2026-04-16
updated: 2026-04-16
---

# Checksum

## Definition

Compact integrity hash used to detect corruption by comparing stored and computed values over the same data block.

## Why It Matters

- Detects disk/network data corruption before serving clients.
- Supports replica validation and repair workflows.

## Related Concepts

- [[Merkle Trees]]
- [[Read Repair]]
