---
title: Saga Pattern
type: concept
tags: [distributed-transactions, microservices, reliability]
sources: [2026-04-16-system-design-on-aws]
created: 2026-04-16
updated: 2026-04-16
---

# Saga Pattern

## Definition

Pattern for implementing multi-service business transactions as a sequence of local steps with compensating actions on failure.

## Why It Matters

- Avoids global distributed locks while preserving business consistency.
- Provides explicit rollback semantics across asynchronous boundaries.

## Related Concepts

- [[Orchestration]]
- [[Choreography]]
- [[CQRS]]
