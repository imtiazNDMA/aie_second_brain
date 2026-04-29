---
title: Service Discovery
type: concept
tags: [distributed-systems, infrastructure, networking]
sources: [2026-04-16-system-design-interview-complete-guide]
created: 2026-04-16
updated: 2026-04-16
---

# Service Discovery

## Definition

Mechanism that helps clients locate healthy service instances dynamically instead of relying on static server addresses.

## In Practice

- Tracks available servers and their health.
- Returns endpoints based on policies such as capacity or locality.
- Supports fault tolerance by rerouting traffic when instances fail.

## Related Concepts

- [[High Availability]]
- [[Load Balancing]]
- [[Apache ZooKeeper]]
