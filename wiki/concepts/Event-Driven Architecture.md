---
title: Event-Driven Architecture
type: concept
tags: [distributed-systems, messaging, architecture]
sources: [2026-04-16-system-design-on-aws]
created: 2026-04-16
updated: 2026-04-16
---

# Event-Driven Architecture

## Definition

Architecture style where services publish and consume events to coordinate behavior asynchronously.

## Why It Matters

- Decouples producers and consumers for better independent scaling.
- Improves responsiveness for systems with bursty or streaming workloads.

## Related Concepts

- [[Choreography]]
- [[Orchestration]]
- [[Message Ordering]]
