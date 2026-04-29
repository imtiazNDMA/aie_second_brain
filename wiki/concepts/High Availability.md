---
title: High Availability
type: concept
tags: [distributed-systems, reliability, operations]
sources: [2026-04-16-system-design-interview-complete-guide, 2026-04-16-system-design-on-aws]
created: 2026-04-16
updated: 2026-04-16
---

# High Availability

## Definition

The ability of a system to remain operational for a high percentage of time despite failures in components such as servers, networks, or storage.

## Design Principles

- Remove single points of failure with replication and failover.
- Use health checks and automatic traffic rerouting.
- Separate stateless services from stateful data paths.
- Set service-level targets and measure uptime against them.

## Related Concepts

- [[Load Balancing]]
- [[Service Discovery]]
- [[Consistent Hashing]]
