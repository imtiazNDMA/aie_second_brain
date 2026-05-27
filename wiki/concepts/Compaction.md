---
title: Compaction
type: concept
tags: [storage, lsm-tree, distributed-systems, databases]
sources: [2026-04-16-system-design-interview-complete-guide, 2026-04-16-grokking-advanced-system-design-interview]
created: 2026-05-10
updated: 2026-05-10
---

# Compaction

## Definition

**Compaction** is the background process in [[LSM Tree]]-based storage engines that merges multiple immutable on-disk SSTable files into fewer, larger files — discarding superseded values and tombstones in the process. Compaction is what makes LSM-tree systems practical: writes are cheap because they go to a memtable + append-only log, but read amplification grows as SSTables accumulate, and disk space inflates with stale versions. Compaction reclaims both. Used by Cassandra, RocksDB, LevelDB, BigTable, and most write-optimized stores.

## Why it's necessary

LSM trees take writes by:

1. Inserting into an in-memory sorted structure (memtable)
2. When the memtable fills, flush to disk as an immutable SSTable
3. Repeat — accumulate many SSTables on disk

Without compaction:

- **Read amplification** — a point read may need to check N SSTables (each indexed by Bloom filter) until it finds the key
- **Space amplification** — a key written 10 times exists 10 times on disk; old versions are dead weight
- **Tombstone retention** — deletes are also writes; they need to be combined with the data they delete

Compaction fixes all three.

## Strategies

| Strategy | Mechanism | Trade-off |
| --- | --- | --- |
| **Size-tiered compaction** (Cassandra default) | Merge SSTables of similar size into bigger ones | Low write amplification; high space amplification |
| **Leveled compaction** (LevelDB, RocksDB default) | Maintain levels with size limits; merge a file with overlapping files in next level | Low space amplification; higher write amplification |
| **Time-windowed compaction** | Merge within time windows; never across | Time-series workloads with TTL |
| **Universal / tiered + leveled hybrids** | Mix of the above | Tunable per workload |

## Cost model

Compaction is **write-amplifying**: every byte written to the database is rewritten multiple times during merging. Typical amplification:

- Size-tiered: 5–10×
- Leveled: 10–30×

This is the fundamental write-vs-read trade-off of LSM trees: cheap-on-arrival writes pay later in compaction work.

## Operational concerns

- **Compaction backpressure** — when compaction can't keep up, SSTable count grows unboundedly; reads slow; eventually writes throttle. Common Cassandra failure mode.
- **CPU and IO contention** — compaction competes with serving reads and writes; must be rate-limited and scheduled
- **Disk space spikes** — mid-compaction, both old and new SSTables exist; need reservoir capacity
- **Tombstone garbage collection** — tombstones can only be discarded after they're past the GC grace period in all replicas

## Where it appears

- [[LSM Tree]] — parent storage structure
- Cassandra, RocksDB, LevelDB, BigTable, ScyllaDB — implementations
- Modern KV stores and time-series databases inherit this pattern
- *Note*: discussed in [[Compound AI Systems]] and [[ReAct]] in this wiki, but in those contexts the term is used metaphorically — the literal storage-engine concept is what this page covers.

## Related Concepts

- [[LSM Tree]] — parent structure
- [[Write-Ahead Log]] — durability log alongside the memtable
- [[Bloom Filters]] — used to skip SSTables that don't contain a key
- [[Sharding]] — orthogonal scaling axis
- [[High Availability]], [[Eventual Consistency]] — broader distributed-storage context

## Open Questions

- Optimal compaction strategy selection per workload
- ML-driven compaction scheduling (ongoing research at major DBs)
- Storage compaction for vector indices (HNSW / IVF) as embeddings drift
