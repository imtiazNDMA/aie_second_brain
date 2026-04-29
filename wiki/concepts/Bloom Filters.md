---
title: Bloom Filters
type: concept
tags: [data-structures, retrieval, distributed-systems]
sources: [2026-04-16-grokking-advanced-system-design-interview]
created: 2026-04-16
updated: 2026-04-16
---

# Bloom Filters

## Definition

Probabilistic membership data structure that can prove an item is absent and can suggest an item may be present (with false-positive risk but no false negatives).

## Why It Matters

- Reduces expensive disk lookups in SSTable-based systems.
- Uses compact memory relative to indexed key spaces.

## Related Concepts

- [[Caching]]
- [[Read Repair]]
