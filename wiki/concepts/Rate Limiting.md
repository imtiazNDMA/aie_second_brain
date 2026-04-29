---
title: Rate Limiting
type: concept
tags: [api, distributed-systems, reliability]
sources: [2026-04-16-system-design-interview-complete-guide]
created: 2026-04-16
updated: 2026-04-16
---

# Rate Limiting

## Definition

Control mechanism that restricts how many requests a user, IP, or client can send to a service within a time window.

## Algorithms Mentioned

- Leaky bucket
- Fixed window
- Sliding log
- Sliding window (hybrid)

## Distributed-System Concerns

- Counter coordination across multiple nodes.
- Race conditions for read-increment-write patterns.
- Tradeoff between local fast checks and centralized correctness.

## Related Concepts

- [[High Availability]]
- [[Load Balancing]]
