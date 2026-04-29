---
title: Blast Radius
type: concept
tags: [reliability, fault-isolation, operations]
sources: [2026-04-16-system-design-on-aws]
created: 2026-04-16
updated: 2026-04-16
---

# Blast Radius

## Definition

The maximum scope of impact when a component fails, degrades, or is misconfigured.

## Why It Matters

- Smaller failure domains reduce systemic outages and simplify recovery.
- Isolation boundaries (network, data, deployment) prevent cascading faults.

## Related Concepts

- [[High Availability]]
- [[Fault Tolerance]]
- [[Day N Architecture]]
