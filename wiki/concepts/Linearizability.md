---
title: Linearizability
type: concept
tags: [distributed-systems, consistency, concurrency]
sources: [2026-04-16-grokking-advanced-system-design-interview]
created: 2026-04-30
updated: 2026-04-30
---

# Linearizability

## Definition

**Linearizability** (Herlihy & Wing 1990) is the strongest practical **consistency model** for concurrent systems. It guarantees that:

> Every operation appears to take effect **atomically at some point between its invocation and its response**, and operations appear in a single, real-time-consistent total order across all replicas.

Equivalently: from any observer's perspective, a linearizable system *appears to be a single sequential machine*. Once a write completes, every subsequent read (anywhere in the cluster) sees that write or a later one.

It is the correctness floor for any system that does locking, leader election, financial transactions, or compare-and-swap operations.

## Why this is hard

In a single-threaded program, "the latest write wins" is trivial. In a distributed system:

- Writes propagate over the network with delays.
- Replicas can crash, partition, or reorder messages.
- Clients can read from different replicas.
- Without coordination, two clients can each "see" different latest values.

Linearizability requires the system to **coordinate enough** that every observer agrees on the order of operations *and* respects real-time ordering.

## Visualizing linearizability

Suppose three clients $A$, $B$, $C$ make concurrent operations on a register:

```
A: ────write(x=1)───response────────────────────────
                                    (real time →)
B: ──────────read()───response (returns ?)──────────
                          
C: ─────────────────read()───response (returns ?)───
```

A linearizable execution must:

1. Find some point between each operation's invocation and response where it "took effect."
2. Such that the resulting sequential history is consistent with how a single machine would respond.
3. The sequential order must respect real-time: if $op_1$ ended before $op_2$ began, then $op_1 < op_2$ in the linearization.

In the example, if $A$'s write completes *before* $B$ starts reading, then $B$ must read 1 (or a value newer than 1). If $A$ and $B$ overlap, $B$ may see the old or new value, but whatever it sees must be consistent with $C$'s subsequent read.

## Comparison with weaker models

| Model | Guarantees |
|---|---|
| **Linearizability** | Total real-time order; all observers agree |
| **Sequential Consistency** | Total order, but not real-time-respecting; observers agree on order, but it can be stale |
| **Causal Consistency** | Causally related ops are ordered; concurrent ops may differ across observers |
| **Read-Your-Writes** | A client sees its own writes; others may not yet |
| **Monotonic Reads** | A client doesn't see *older* state after a newer state |
| **Eventual Consistency** | Replicas converge eventually; no real-time guarantee. See [[Eventual Consistency]] |

The hierarchy: linearizability → sequential → causal → eventual. Each weakening allows more parallelism / availability at the cost of weaker invariants.

## Intuition: the "register" view

If your system is linearizable, you can pretend it's a single thread-safe variable. Wrapping a counter, a mutex, a config object — all behave intuitively.

If it's only **sequential** (not real-time), your "atomic counter" might appear to go backwards in time from one observer to another, even though the order is consistent.

If it's only **eventual**, two clients can read different values for an arbitrary period, with no upper bound on convergence time.

## How systems achieve linearizability

### 1. Single leader (single-master replication)

All writes go to one designated leader; reads go to the leader (linearizable) or to followers (only sequentially consistent unless a quorum read is performed). Examples: PostgreSQL primary, Kafka leader-per-partition.

### 2. Consensus algorithm

A quorum of replicas agrees on each write before acknowledging. Examples:

- **Paxos** — Lamport 1989; canonical consensus algorithm.
- **Raft** — Ongaro & Ousterhout 2014; designed for understandability.
- **Multi-Paxos / Zab** — variants underlying Chubby, ZooKeeper, etcd.

These give linearizable writes within a single Raft group. See [[Raft]], [[Paxos]].

### 3. Quorum reads + writes

Read from a quorum of replicas; the most recent value (by version vector or timestamp) wins. Combined with quorum writes (W + R > N), can give linearizable reads. Used by [[Amazon Dynamo]] in linearizable-mode.

### 4. Synchronous replication

Every write is acknowledged only after replicating to all (or a quorum of) replicas. Strong but expensive: latency = slowest replica.

### 5. Strict serializable databases

Spanner, FaunaDB, CockroachDB: linearizability + serializable transactions. Use TrueTime (Spanner) or hybrid logical clocks for ordering.

## Cost of linearizability

The CAP theorem gives the headline: under network partitions, linearizable systems must sacrifice availability. PACELC sharpens it: even when the network is healthy, linearizable systems sacrifice latency.

| Operation | Latency cost |
|---|---|
| Write to single-leader | network round-trip to leader + leader's local write |
| Quorum write | round-trip to slowest of (W) replicas |
| Quorum read (linearizable) | round-trip to slowest of (R) replicas + read repair |
| Multi-region linearizable | cross-region round-trip = 50–200 ms minimum |

For geographically distributed systems, linearizability costs hundreds of milliseconds per operation. Many systems weaken to sequential or causal consistency to recover the latency.

## When you need linearizability

- **Distributed locks** — leader election must agree on one leader.
- **Compare-and-swap** semantics — increment counters, reservation systems.
- **Financial / regulatory invariants** — "no double-spend" requires linearizable reads of the balance.
- **Configuration management** — etcd, Consul, ZooKeeper coordinate cluster membership.
- **Database primary** in a single-leader setup.

## When you don't

- **Read-mostly user data** — eventual consistency is fine; users tolerate staleness.
- **Time-series ingest** — order within a partition matters; cross-partition order doesn't.
- **Caches and CDNs** — staleness is the whole point.
- **Recommendation systems** — exact ordering of writes is irrelevant.

## Test: is my system linearizable?

A practical test (Jepsen's Knossos):

1. Run concurrent operations against the system, recording each (client, op, invocation_ts, response_ts, response).
2. Search for a single sequential history that:
   - Orders each op between its invocation and response,
   - Respects real-time order across non-overlapping ops,
   - Yields the observed responses.
3. If no such history exists, the system is **not linearizable** — there's a real-time inconsistency.

This is what Jepsen tests demonstrate when they break a database's claimed linearizability under partition.

## Common mistakes

- **Assuming "single leader" means linearizable.** Reads from followers are *not* linearizable unless they go through the leader.
- **Synchronous replication ≠ linearizability.** If reads can hit unsynchronized replicas, they can go back in time.
- **Trusting wall-clock timestamps.** Clock skew breaks real-time ordering.
- **Mixing read paths.** Some queries hit the leader, some hit caches; the cache makes the system non-linearizable for any read it serves.

## Connections

- [[Eventual Consistency]] — opposite end of the spectrum
- [[CAP Theorem]] — linearizability is the C
- [[PACELC Theorem]] — linearizability has latency cost even without partitions
- [[Quorum]] — primitive used for linearizable reads/writes in quorum systems
- [[Leader-Follower Replication]] — substrate for linearizable writes via primary
- [[Raft]] / [[Paxos]] — consensus algorithms that produce linearizability
- [[Vector Clocks]] — track causal but not linearizable order
- [[High-Water Mark]] — replication state that gates linearizable reads
- [[Split Brain]] — failure to maintain linearizability under partition
- [[Fencing]] — mechanism to recover linearizability after leader change
- [[Distributed Transaction]] / [[Saga Pattern]] — patterns for cross-shard atomicity
