---
title: Raft
type: concept
tags: [distributed-systems, consensus, replication, leader-election]
sources: [2026-04-16-grokking-advanced-system-design-interview, 2026-04-16-system-design-on-aws]
created: 2026-05-10
updated: 2026-05-10
---

# Raft

## Definition

**Raft** is a distributed consensus algorithm designed by Diego Ongaro and John Ousterhout (2014, "In Search of an Understandable Consensus Algorithm") as an explicitly more-understandable alternative to [[Paxos]]. Raft solves the same problem — getting a cluster of nodes to agree on a sequence of values despite failures — but with a clearer separation of concerns: leader election, log replication, and safety. It's the consensus algorithm behind etcd (Kubernetes' control-plane store), CockroachDB, TiKV, Consul, Hashicorp Nomad, MongoDB replica sets, and many other production distributed systems.

## How it works (sketch)

Raft decomposes consensus into three sub-problems:

### 1. Leader election

- All nodes start as **followers**
- A follower that doesn't hear from a leader within an election timeout becomes a **candidate**, increments its term, and requests votes
- A candidate that gets a majority of votes becomes **leader**
- Only one leader exists per term; ties cause re-elections (with randomized timeouts to avoid live-lock)

### 2. Log replication

- Clients send commands to the leader
- The leader appends the command to its log and broadcasts `AppendEntries` RPCs to followers
- A log entry is **committed** once a majority of nodes have it
- Once committed, the leader applies it to its state machine and tells followers to apply

### 3. Safety

The election restriction guarantees that any committed entry is present in the log of any future leader: a candidate can't win unless its log is at least as up-to-date as a majority. This prevents committed entries from being lost during leader changes.

## Comparison to Paxos

| Aspect | Raft | Paxos |
| --- | --- | --- |
| Specification | Single algorithm with leader-based design | Family of algorithms; multi-Paxos in practice |
| Understandability | Explicit goal of the paper; usually delivered | Hard; "the engineer's algorithm" reputation |
| Leader role | Strong leader; leader handles all writes | Multi-Paxos has a stable leader; basic Paxos is leaderless |
| Membership changes | First-class (joint consensus) | Add-on |
| Practical implementations | etcd, Consul, TiKV, CockroachDB, MongoDB, Hashicorp Nomad | Google Chubby, Spanner internal, ZooKeeper (variant) |

In practice, Raft has become the **default choice** for new consensus implementations in 2020s open-source systems; Paxos persists where it was already deployed (Google's stack) or where its specific properties matter.

## Production characteristics

- **Quorum**: 3-node clusters tolerate 1 failure; 5-node tolerate 2; standard rule is $\lfloor (N-1)/2 \rfloor$
- **Latency**: a write needs one round-trip to a quorum — typically 1–2 ms in-region, 50–200 ms across regions
- **Throughput**: leader-bound — single-leader bottleneck for writes; reads can be served from followers (with linearizability caveats) or from the leader
- **Failure detection**: heartbeat-based; tunable trade-off between false positives (too short) and detection latency (too long)

## Linearizable reads

Reading from a Raft leader isn't automatically linearizable — a stale leader (deposed but not yet aware) might serve old data. Three approaches:

- **Linearizable reads via quorum** — leader confirms its leadership with a quorum read before responding (most common)
- **Read leases** — leader holds a time-bounded lease; reads are linearizable within the lease
- **Sequential consistency** — accept stale reads from followers when linearizability isn't required

## Related Concepts

- [[Paxos]] — historic alternative; same problem
- [[Linearizability]] — strong-consistency model Raft enables
- [[Quorum]] — majority requirement
- [[Leader-Follower Replication]] — non-consensus simpler pattern
- [[Lease]] — leadership lease for read optimization
- [[Fencing]] — mechanism to prevent stale-leader writes
- [[Split Brain]] — what consensus prevents
- [[Apache ZooKeeper]] — alternative coordination service

## Sources

- [[2026-04-16-grokking-advanced-system-design-interview]] — covers consensus comparisons
- [[2026-04-16-system-design-on-aws]] — practical AWS-shaped use

## Open Questions

- Multi-Raft / partitioned-Raft scaling for very high throughput (CockroachDB's approach)
- Raft + flexible quorums (read/write quorum decoupling)
- Geo-distributed Raft vs Paxos variants for latency-sensitive workloads
