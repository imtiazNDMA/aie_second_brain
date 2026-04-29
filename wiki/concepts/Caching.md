---
title: Caching
type: concept
tags: [performance, distributed-systems, latency]
sources: [2026-04-16-system-design-interview-complete-guide, 2026-04-16-system-design-on-aws]
created: 2026-04-16
updated: 2026-04-16
---

# Caching

## Definition

Technique for storing frequently accessed data closer to consumers to reduce latency and backend load.

## Key Considerations

- Choose cache layers: client, CDN, service, and datastore-adjacent caches.
- Plan write behavior and consistency between cache and source of truth.
- Manage staleness and eviction (for example, LRU/LFU/FIFO policies).

## Related Concepts

- [[Load Balancing]]
- [[High Availability]]
