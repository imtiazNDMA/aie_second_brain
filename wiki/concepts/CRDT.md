---
title: CRDT
type: concept
tags: [distributed-systems, consistency, replication, eventual-consistency]
sources: [2026-04-16-system-design-on-aws]
created: 2026-05-10
updated: 2026-05-10
---

# CRDT

## Definition

**CRDT** (Conflict-free Replicated Data Type) is a category of data structures designed so that multiple replicas can be updated independently and concurrently, then merged deterministically without coordination — and all replicas converge to the same value. CRDTs sidestep the [[CAP Theorem]] / [[PACELC Theorem]] trade-off for many use cases: they give availability and partition tolerance without sacrificing consistency *for the operations they support*. They power collaborative editors (Google Docs-style), offline-first apps (Notion, Linear, Figma), and distributed counters / sets.

## Two flavors

| Flavor | Mechanism |
| --- | --- |
| **State-based (CvRDT)** | Each replica holds the full state; replicas exchange states; merge is a commutative, associative, idempotent join |
| **Operation-based (CmRDT)** | Replicas exchange operations; operations must commute under the underlying delivery channel |

State-based CRDTs are robust to message loss/reordering at the cost of larger payloads. Op-based CRDTs are bandwidth-efficient but require a reliable causal-broadcast channel.

## Common examples

| CRDT | What it does | Common use |
| --- | --- | --- |
| **G-Counter** (grow-only counter) | Each replica increments its own slot; merge sums max per slot | Page-view counts |
| **PN-Counter** | Two G-Counters (increments + decrements) | General counter |
| **G-Set** (grow-only set) | Union; merge is union | Things that only get added |
| **OR-Set** (observed-remove set) | Adds tagged with unique IDs; removes only previously-observed adds | Add/remove sets |
| **LWW-Register** | Last-Writer-Wins; merge picks newer timestamp | Single-value registers |
| **MV-Register** | Multi-value; preserves concurrent values | When you need to detect conflicts |
| **RGA / Logoot / Yjs** | Sequence CRDTs for ordered text | Collaborative text editing |

## Why they work

The mathematical requirement is that the merge operation forms a **join semilattice** — commutative, associative, idempotent. As long as merge has these properties:

- Order of merges doesn't matter
- Duplicates don't matter
- All replicas eventually converge to the same state

This is what eliminates coordination — replicas can merge in any order they receive updates and reach the same answer.

## Where they're used

- **[[Apache Cassandra]], [[Riak]]** — counters and registers as built-in CRDT types
- **Yjs / Automerge** — JavaScript libraries for collaborative apps (Notion, Linear, Figma)
- **Redis CRDTs** (Redis Enterprise) — multi-region replication
- **CouchDB / PouchDB** — offline-first document sync
- **Soundcloud / Riak** — production deployments at scale

## Limitations

- **Operations must be commutative** — most operations on most data structures aren't, so CRDT-friendly operations are a *subset* of typical operations
- **State growth** — many CRDTs (OR-Set, G-Set) grow monotonically; need garbage collection (often via consensus or quorum-based pruning) to bound state size
- **Causal-broadcast requirement (op-based)** — ordering guarantees needed for op-based CRDTs are non-trivial to provide
- **Semantic limitations** — OR-Set can't model "remove an element if and only if X" — that needs coordination

For many applications, CRDTs are the right answer; for others (banking transactions, inventory with hard limits), they aren't.

## Related Concepts

- [[Eventual Consistency]] — the consistency model CRDTs implement
- [[CAP Theorem]], [[PACELC Theorem]] — what CRDTs sidestep for their supported ops
- [[Linearizability]] — the strong consistency CRDTs *don't* provide
- [[Vector Clocks]] — causality tracking related to op-based CRDTs
- [[Quorum]], [[Hinted Handoff]] — alternative availability mechanisms
- [[Apache Cassandra]], [[Riak]] — production users

## Sources

- [[2026-04-16-system-design-on-aws]] — covers eventual consistency and CRDT-friendly patterns

## Open Questions

- CRDT garbage collection in production at scale
- Hybrid CRDT + consensus designs for partial-coordination workloads
- CRDTs for AI / ML data structures (collaborative editing of vector indices, etc.)
