---
title: Merkle Trees
type: concept
tags: [anti-entropy, hashing, distributed-systems]
sources: [2026-04-16-grokking-advanced-system-design-interview]
created: 2026-04-16
updated: 2026-04-16
---

# Merkle Trees

## Definition

Hash tree structure used to compare large replica datasets efficiently by recursively comparing subtree hashes.

## Why It Matters

- Minimizes network transfer for replica synchronization.
- Enables background anti-entropy and targeted repair.

## Related Concepts

- [[Read Repair]]
- [[Checksum]]
