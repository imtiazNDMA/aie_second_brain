---
title: Write-Ahead Log
type: concept
tags: [durability, storage, distributed-systems]
sources: [2026-04-16-grokking-advanced-system-design-interview]
created: 2026-04-16
updated: 2026-04-16
---

# Write-Ahead Log

## Definition

Durability pattern where mutations are appended to a persistent log before in-memory/indexed state is considered committed.

## Why It Matters

- Enables crash recovery through log replay.
- Separates fast append durability from later compaction/organization work.

## Related Concepts

- [[Read Repair]]
- [[Merkle Trees]]
