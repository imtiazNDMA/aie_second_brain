---
title: Sharding
type: concept
tags: [distributed-systems, scalability, databases, partitioning]
sources: [2026-04-16-grokking-advanced-system-design-interview, 2026-04-16-system-design-interview-complete-guide]
created: 2026-04-30
updated: 2026-04-30
---

# Sharding

## Definition

**Sharding** is the practice of horizontally partitioning data across multiple nodes (shards) so that each shard owns a disjoint subset of the data. Read and write traffic is routed to the responsible shard, allowing the system to scale **storage capacity**, **write throughput**, and **read throughput** beyond what a single node can sustain.

Sharding is the dominant technique behind every internet-scale data system: Google Spanner, Amazon DynamoDB, Cassandra, MongoDB sharded clusters, ElasticSearch indices, vector DBs at scale ([[Pinecone]], [[Weaviate]]).

## Vertical vs horizontal partitioning

| | What | Scales | Limit |
|---|---|---|---|
| **Vertical partitioning** | Split by *column* — different columns of one row live on different machines | Functional separation | Bounded by per-row width |
| **Horizontal partitioning (sharding)** | Split by *row* — different rows on different machines | Storage, throughput | None (in principle) |

Sharding is horizontal partitioning where every shard runs the same schema and serves disjoint rows.

## The shard key

Every sharded system needs a **shard key** — the column (or function of columns) used to assign each row to a shard. Choosing the shard key is the most consequential design decision; it determines:

- **Skew** — do all writes flow to one shard? (hot key problem)
- **Cross-shard queries** — must a query touch multiple shards? (joins, range scans)
- **Resharding cost** — how hard is it to grow the cluster?

Bad shard keys are nearly impossible to fix in production. Good shard-key design front-loads pain.

## Sharding strategies

### 1. Range-based sharding

Partition by ordered ranges of the key:

```
Shard 0: keys "a" – "g"
Shard 1: keys "h" – "n"
Shard 2: keys "o" – "z"
```

**Pros:** Range scans are efficient (read sequential keys from one shard).
**Cons:** Hot ranges create hot shards. Time-based keys (e.g., timestamp) push all writes to the latest shard.

Used by: Google Bigtable, HBase, sorted-key stores.

### 2. Hash-based sharding

Apply a hash function to the key, modulo the number of shards:

```
shard_id = hash(key) % N
```

**Pros:** Excellent load distribution. No hot shards (assuming good hash function).
**Cons:** Range scans are expensive (touch every shard). Adding shards reshuffles every key.

Used by: many NoSQL systems, default sharding for relational DBs.

### 3. Consistent hashing

Maps both keys and shards onto a logical ring; each key goes to the nearest shard clockwise. Adding or removing a shard only moves $1/N$ of keys (vs $N-1/N$ for naive modulo).

**Pros:** Minimal data movement on rebalance.
**Cons:** Slight imbalance unless using virtual nodes.

Used by: [[Amazon Dynamo]], Cassandra, Riak. See [[Consistent Hashing]].

### 4. Directory-based sharding

A lookup table maps each key (or key range) to a shard:

```
metadata_table:
  user_id "alice@example.com"  →  shard 4
  user_id "bob@example.com"    →  shard 1
```

**Pros:** Maximum flexibility — can rebalance any subset of keys.
**Cons:** Lookup adds latency; metadata table is a single point of contention.

Used by: many sharded SaaS systems, multi-tenant platforms.

### 5. Geographic / locality sharding

Partition by user's location to keep data near them:

```
EU users   →  EU shards
US users   →  US shards
```

**Pros:** Latency, compliance (GDPR data residency).
**Cons:** Cross-region queries are expensive.

## Picking a shard key

Five questions for any candidate shard key:

| Question | Why it matters |
|---|---|
| **Cardinality** — how many distinct values? | Low cardinality = few shards. Avoid (e.g., gender as shard key). |
| **Frequency** — uniformly distributed? | Skew creates hot shards. |
| **Co-locality** — what queries scan together? | Good co-locality avoids fan-out. |
| **Stability** — does it change? | Mutable keys break sharding. |
| **Future evolution** — works at 10× scale? | Resharding is expensive. |

## The hot-shard problem

The classic failure mode: a shard key that *looked* uniform turns out to have a power-law distribution. One shard receives 50% of traffic; the rest sit idle.

Common causes:
- **Time-based key** ("created_at") with append-mostly load → newest shard hot.
- **Sequential ID** with modulo sharding seemed fine, but customers grew out of one bucket.
- **Tenant ID** in a multi-tenant SaaS where one tenant is 100× larger than the rest.

Mitigations:
- **Composite key** — `(tenant_id, hash(record_id))` so a single tenant spans shards.
- **Hash prefix** — prepend a hash of a high-cardinality field to bucket the hot range.
- **Salting** — explicitly add a small random prefix.
- **Workload-aware sharding** — observe traffic, rebalance hot keys to dedicated shards (Vitess "shard splits," DynamoDB adaptive capacity).

## Cross-shard operations

The core trade: sharding scales single-shard ops but penalizes anything touching multiple shards.

| Operation | Single-shard | Cross-shard |
|---|---|---|
| Point lookup by shard key | $O(1)$ shard, fast | $O(N)$ shards (broadcast) |
| Range scan within shard | Sequential, fast | $O(N)$ + merge cost |
| Join | Local | Distributed (often via co-located shards) |
| Transaction | Local ACID | Two-phase commit / [[Saga Pattern]] |
| Aggregation (count, sum) | Local | Map-reduce across shards |

Shard key design exists primarily to make 95% of queries single-shard.

## Distributed transactions across shards

When updates must span shards, options are limited:

1. **Two-phase commit (2PC)** — coordinator asks each shard to *prepare*, then *commit* or *abort*. Strong consistency, but blocks on coordinator failure.
2. **Saga Pattern** — sequence of local transactions with compensating actions on failure. Eventual consistency. See [[Saga Pattern]].
3. **Outbox + CDC** — write transactionally to local outbox table; downstream consumers replicate. Trades latency for simplicity.
4. **CRDTs** — conflict-free replicated data types let shards merge updates commutatively without coordination. See [[CRDT]].

There is no free lunch: cross-shard atomicity has a cost.

## Resharding

When the cluster fills up, you must add shards and migrate data. Strategies:

- **Pre-sharding** — start with $K$ logical shards on $N$ machines ($K \gg N$). Adding a machine moves entire logical shards rather than rebalancing keys. (Used by MongoDB, Vitess.)
- **Online resharding** — copy data to new shards in the background, switch routing once replicated. Tail latency spikes but no downtime.
- **Offline resharding** — read-only window; copy; switch. Simpler, requires maintenance window.

Plan for resharding from day 1. Most teams don't, and pay 10–100× later.

## Sharding for vector databases

Modern vector DBs ([[Pinecone]], [[Weaviate]], [[Qdrant]], [[Faiss]]) shard at large scale. Shard-key choices specific to vectors:

- **Random / hash-based** — load-balanced but every query touches every shard (full scatter).
- **Cluster-based** — k-means on training vectors; each shard owns one cluster. Queries route to the cluster(s) closest to the query vector. ~5× fewer shards touched.
- **Tenant-based** — multi-tenant deployments; each customer's vectors on dedicated shard.

Vector sharding interacts with [[HNSW]] / [[IVF]] index structure — shard boundaries shouldn't bisect frequently-co-retrieved clusters.

## Anti-patterns

- **No shard key chosen** — relying on auto-sharding by primary key with no thought for query patterns. Hot shards are inevitable.
- **Shard key = monotonic timestamp** — newest shard hot, oldest shard cold.
- **Cross-shard transactions in the hot path** — every write requires distributed coordination. Performance crashes.
- **Manual rebalance scripts** — works for small clusters, breaks operationally as the team grows.
- **Sharding too early** — premature distribution adds operational complexity. Vertical scale a single node first.

## When sharding wins

- **Storage > one node's disk.**
- **Write throughput > one node's IOPS.**
- **Read throughput > read replicas can handle.**
- **Multi-tenant isolation** required.
- **Geographic distribution** for latency or compliance.

## When sharding hurts

- **Single-node scale is enough.** Tens of TB and tens of thousands of QPS fit on one modern machine.
- **Workload is heavily relational** — joins across shards are expensive.
- **Strong cross-shard consistency** required — 2PC limits performance.
- **Operational maturity is low** — sharded clusters require runbooks, capacity planning, query routing, observability per shard.

## Connections

- [[Consistent Hashing]] — partitioning algorithm used in dynamic-membership systems
- [[Load Balancing]] — request distribution at the front door; sharding is its data-layer counterpart
- [[Leader-Follower Replication]] — orthogonal: replication for availability, sharding for scale
- [[Quorum]] — consistency primitive within a shard's replicas
- [[Saga Pattern]] — cross-shard transaction alternative
- [[CQRS]] — read model can re-shard independent of write model
- [[CAP Theorem]] / [[PACELC Theorem]] — consistency vs availability trade-offs intensify with sharding
- [[Vector Database]] — shard-key design is critical for vector search at scale
- [[Hinted Handoff]] — Dynamo-style availability technique compatible with sharded clusters
- [[Apache Cassandra]] / [[Amazon DynamoDB]] / [[Apache Kafka]] — production sharded systems
