---
title: Circuit Breaker
type: concept
tags: [resilience, fault-tolerance, distributed-systems]
sources: [2026-04-16-system-design-on-aws]
created: 2026-04-16
updated: 2026-04-16
---

# Circuit Breaker

## Definition

Resilience pattern that temporarily blocks calls to a failing dependency after threshold breaches, then probes recovery before reopening traffic.

## Why It Matters

- Prevents retry storms and cascading failures.
- Improves tail latency by failing fast when dependencies are unhealthy.

## Related Concepts

- [[High Availability]]
- [[Retry with Backoff]]
- [[Blast Radius]]
