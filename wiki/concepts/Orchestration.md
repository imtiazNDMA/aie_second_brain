---
title: Orchestration
type: concept
tags: [distributed-systems, workflow, architecture]
sources: [2026-04-16-system-design-on-aws]
created: 2026-04-16
updated: 2026-04-16
---

# Orchestration

## Definition

Coordination style where a central workflow component directs multi-step interactions among services.

## Why It Matters

- Simplifies visibility and control of long-running business workflows.
- Centralizes retry, timeout, and compensation behavior.

## Related Concepts

- [[Choreography]]
- [[Saga Pattern]]
- [[Circuit Breaker]]
