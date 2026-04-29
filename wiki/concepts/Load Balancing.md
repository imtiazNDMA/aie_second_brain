---
title: Load Balancing
type: concept
tags: [distributed-systems, scalability, networking]
sources: [2026-04-16-system-design-interview-complete-guide, 2026-04-16-system-design-on-aws]
created: 2026-04-16
updated: 2026-04-16
---

# Load Balancing

## Definition

Distributing incoming traffic across multiple servers to avoid overload, reduce latency, and improve system availability.

## Practical Notes

- Horizontal scaling adds servers; load balancers route work among them.
- Routing can consider server health, capacity, and current assignment.
- Load balancing and caching often work together to improve perceived performance.

## Related Concepts

- [[High Availability]]
- [[Rate Limiting]]
- [[Service Discovery]]
