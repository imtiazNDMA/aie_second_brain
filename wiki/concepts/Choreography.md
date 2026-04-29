---
title: Choreography
type: concept
tags: [distributed-systems, event-driven, architecture]
sources: [2026-04-16-system-design-on-aws]
created: 2026-04-16
updated: 2026-04-16
---

# Choreography

## Definition

Distributed coordination style where services react to events independently without a single central controller.

## Why It Matters

- Improves decoupling and team autonomy for event-driven systems.
- Requires stronger observability and idempotency discipline to debug flows.

## Related Concepts

- [[Orchestration]]
- [[Event-Driven Architecture]]
- [[Saga Pattern]]
