---
title: Distributed Transaction
type: concept
tags: [distributed-systems, transactions, consistency, two-phase-commit]
sources: [2026-04-16-system-design-on-aws, 2026-04-16-grokking-advanced-system-design-interview]
created: 2026-05-10
updated: 2026-05-10
---

# Distributed Transaction

## Definition

A **distributed transaction** is a transaction whose operations span multiple nodes / services / databases and must either all commit or all abort atomically. Distributed transactions are notoriously difficult: network partitions, slow nodes, and partial failures all conspire against the simple "everyone commits together" semantic. The classic protocol is **Two-Phase Commit (2PC)**; the modern microservices alternative is the [[Saga Pattern]]. Choosing between them — and knowing when to avoid distributed transactions altogether — is central to scalable system design.

## Two-Phase Commit (2PC)

The textbook protocol, with a designated **coordinator** orchestrating $N$ **participants**:

### Phase 1: Prepare

1. Coordinator sends `Prepare` to all participants
2. Each participant: do all the work, write WAL, but **don't commit yet**; reply `YES` or `NO`

### Phase 2: Commit

1. If all replied `YES`, coordinator sends `Commit` to all
2. If any replied `NO` (or timeout), coordinator sends `Abort` to all
3. Participants apply or roll back, ack the coordinator

Atomicity property: a participant that voted `YES` is committed to the outcome — it cannot unilaterally abort.

## Why 2PC is fragile

- **Coordinator single point of failure** — if the coordinator crashes between Phase 1 and Phase 2, participants are stuck holding locks waiting for the decision (the **blocking problem**)
- **Network partitions** — partition can leave participants in indefinite uncertainty
- **Performance** — every transaction needs ≥2 round-trips and durable logging at every participant
- **Lock-holding time** — locks held across the network round-trips kill throughput
- **No support for long-running operations** — anything taking minutes/hours can't hold locks the whole time

These pathologies make 2PC unusable for most modern web-scale services. **Three-Phase Commit (3PC)** addresses some but not all of these issues; in practice it's rarely used.

## Modern alternatives

### [[Saga Pattern]]

Decompose the cross-service transaction into a sequence of local transactions, each with a **compensating action** that semantically undoes it. If step $k$ fails, run the compensations of steps $1$ through $k-1$ in reverse.

| Trade-off vs 2PC |
| --- |
| No locks held across network — much better throughput |
| Eventually consistent — participants see in-progress states |
| Compensations must be carefully designed (and may not always exist) |
| No isolation — concurrent sagas can interfere |
| Industry standard for microservices |

### Event sourcing + idempotent handlers

Each step emits an event; downstream handlers process events idempotently. Failure handling becomes "retry until success or compensate" rather than "lock and atomic-commit". Often paired with sagas.

### Single-database transactions where possible

The simplest fix: structure your services so transactions stay within one database. Often achievable by combining services, choosing a transactional database (Postgres, Spanner, CockroachDB), or accepting the constraint at design time.

### Distributed databases with built-in transactions

CockroachDB, Spanner, FoundationDB, TiDB provide ACID across a distributed cluster — using consensus ([[Raft]] / [[Paxos]]) underneath to coordinate. The transactional complexity is hidden, but read latency tends to be higher than single-region databases.

## Decision flow

```
Does the transaction span databases?
├── No → use a normal database transaction; you're done
└── Yes → next

Can you redesign to keep it in one database?
├── Yes → do that
└── No → next

Is the workload OK with eventual consistency?
├── Yes → Saga pattern (most common modern answer)
└── No → next

Is the workload OK with higher latency?
├── Yes → distributed database with built-in transactions (CockroachDB / Spanner)
└── No → 2PC, accept the operational risk and the throughput hit
```

## Idempotency: the cross-cutting fix

Whatever pattern you choose, make every operation idempotent. Idempotency lets you retry safely, recover from partial failures, and avoid duplicate effects — and it's the precondition that makes sagas work in practice.

## Related Concepts

- [[Saga Pattern]] — modern alternative
- [[CAP Theorem]], [[PACELC Theorem]] — theoretical context
- [[Linearizability]] — strong-consistency endpoint
- [[Eventual Consistency]] — saga endpoint
- [[Raft]], [[Paxos]] — consensus underneath distributed databases
- [[Retry with Backoff]] — idempotency-friendly recovery
- [[Reliability for LLM Systems]] — synthesis where saga also appears for agent workflows

## Sources

- [[2026-04-16-system-design-on-aws]] — practical patterns
- [[2026-04-16-grokking-advanced-system-design-interview]] — covers 2PC and sagas

## Open Questions

- When distributed databases (Spanner / CockroachDB) eat the saga ecosystem
- Saga choreography vs orchestration patterns at scale
- Practical limits of 2PC where it remains in use (financial, cross-database ETL)
