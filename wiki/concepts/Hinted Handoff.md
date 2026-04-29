---
title: Hinted Handoff
type: concept
tags: [availability, replication, distributed-systems]
sources: [2026-04-16-grokking-advanced-system-design-interview]
created: 2026-04-16
updated: 2026-04-16
---

# Hinted Handoff

## Definition

Availability technique where healthy replicas temporarily accept writes intended for unavailable replicas and later forward them when targets recover.

## Why It Matters

- Keeps write paths available during short outages.
- Reduces immediate write failure rates in quorum-based systems.

## Related Concepts

- [[Quorum]]
- [[Read Repair]]
