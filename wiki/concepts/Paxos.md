---
title: Paxos
type: concept
tags: [distributed-systems, consensus, replication]
sources: [2026-04-16-grokking-advanced-system-design-interview]
created: 2026-05-10
updated: 2026-05-10
---

# Paxos

## Definition

**Paxos** is a family of distributed consensus algorithms originally formulated by Leslie Lamport (1989, published 1998 as "The Part-Time Parliament", and more accessibly in 2001 as "Paxos Made Simple"). Paxos solves the consensus problem — a cluster agreeing on a single value despite arbitrary message loss, delay, and node failures (excluding Byzantine faults) — and is the theoretical foundation for [[Raft]], Multi-Paxos (the practical variant), Google's Chubby and Spanner, and most distributed-coordination systems built before ~2014.

## The problem

Multiple proposers want to propose values; multiple acceptors must agree on exactly one of them; learners need to discover the chosen value. Network is asynchronous: messages can be lost, delayed, reordered, duplicated. Nodes can crash but not lie.

Paxos guarantees:

- **Agreement** — all learners learn the same value
- **Validity** — only a proposed value is chosen
- **Termination** — under sufficient liveness, a value is eventually chosen

## How basic Paxos works (very high level)

A round has two phases:

### Phase 1: Prepare

1. Proposer picks a unique increasing proposal number $n$
2. Sends `Prepare(n)` to a quorum of acceptors
3. Each acceptor: if $n$ is higher than any prepare it's seen, promises not to accept any proposal numbered less than $n$; replies with the highest-numbered value it has previously *accepted* (if any)

### Phase 2: Accept

1. If proposer received responses from a quorum, picks value $v$:
   - If any acceptor reported a previously-accepted value, $v$ = highest-numbered such value
   - Otherwise, $v$ = proposer's own choice
2. Proposer sends `Accept(n, v)` to a quorum
3. Acceptors: accept $(n, v)$ unless they've made a higher-numbered promise

If a quorum accepts, $v$ is **chosen**. Learners discover the chosen value via acceptors.

The complexity comes from concurrent proposers, message reordering, and recovery — basic Paxos guarantees safety but can live-lock under contention.

## Multi-Paxos (the production version)

Basic Paxos is for one decision; **Multi-Paxos** chains rounds to agree on a *sequence* of values (a replicated log). The optimization: elect a stable leader for an extended period; that leader skips Phase 1 for subsequent decisions. The result is similar in performance to [[Raft]] — single-leader, quorum write, periodic leader election on failure.

Most "Paxos in production" really means Multi-Paxos.

## Why Paxos is hard

- The original paper used a parable about a fictional Greek parliament; the algorithm itself is buried in metaphor
- Multi-Paxos isn't a single specification — every production system reinvents the details (membership change, log compaction, leader election)
- Subtleties around what counts as "chosen" vs "accepted" trip up implementers
- Lamport's "Paxos Made Simple" helped, but Paxos remains famously confusing

This is why [[Raft]] was designed — Ongaro & Ousterhout explicitly aimed to provide a more-understandable consensus algorithm covering the same problem.

## Where Paxos still matters

- **Google's stack** — Chubby, Spanner, Megastore — all built on Paxos before Raft existed
- **Apache ZooKeeper / ZAB** — derived from Paxos
- **Older systems** — many production systems built between 2000 and 2014 use Paxos or variants

For *new* consensus implementations in the 2020s, [[Raft]] is almost always the default. Paxos persists where it was already deployed or where specific variants (Flexible Paxos, EPaxos) matter.

## Variants

- **Multi-Paxos** — leader-based; the practical Paxos
- **Fast Paxos** — single-round-trip in optimal case; collisions revert to two rounds
- **EPaxos (Egalitarian Paxos)** — leaderless; better tail latency at cost of complexity
- **Flexible Paxos** — relaxes quorum requirements when reads and writes have different patterns
- **WPaxos / Mencius** — geo-distributed variants

## Related Concepts

- [[Raft]] — modern alternative for the same problem
- [[Linearizability]] — strong-consistency model Paxos enables
- [[Quorum]] — majority-based agreement
- [[Apache ZooKeeper]] — ZAB variant
- [[Leader-Follower Replication]] — simpler non-consensus pattern
- [[Distributed Transaction]] — orchestration on top of consensus
- [[Lease]], [[Fencing]] — leader-correctness mechanisms

## Sources

- [[2026-04-16-grokking-advanced-system-design-interview]] — covers Paxos and Raft comparison

## Open Questions

- Whether Paxos retains relevance for new systems vs. Raft as default
- EPaxos / Fast Paxos production deployment patterns
- Geo-distributed Paxos variant selection per latency profile
