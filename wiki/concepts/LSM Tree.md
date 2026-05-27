---
title: LSM Tree
type: concept
tags: [storage, databases, distributed-systems]
sources: [2026-04-16-grokking-advanced-system-design-interview]
created: 2026-04-30
updated: 2026-04-30
---

# LSM Tree

## Definition

**LSM Tree** — *Log-Structured Merge Tree* (O'Neil et al. 1996) — is a storage data structure optimized for **write-heavy workloads**. It buffers writes in memory, periodically flushes them to immutable on-disk segments, and merges segments in the background. Reads consult the most recent segments first; older data sits in deeper levels.

LSM is the storage engine behind Cassandra, RocksDB, LevelDB, HBase, BigTable, ScyllaDB, ClickHouse, SQLite (write-ahead-log mode), and increasingly modern OLTP systems (TiKV, CockroachDB).

## The problem it solves

The dominant alternative is the **B-tree**, used by PostgreSQL, MySQL/InnoDB, and most relational databases. B-trees are excellent for read-heavy workloads but suffer from **write amplification**: every insert may rewrite a multi-KB page even for a tiny key.

For workloads where writes are 10–100× reads (telemetry, time-series, audit logs, modern NoSQL), B-tree write amp dominates. LSM converts random-write to sequential-write — orders of magnitude faster on rotational disks and friendly to SSDs.

## Architecture

### MemTable (in memory)

- Sorted in-memory data structure (skip list or red-black tree).
- All writes go here first, plus a [[Write-Ahead Log]] for durability.
- Reads consult the MemTable first.
- Once the MemTable exceeds a threshold (typically 64 MB), it's flushed to disk as an immutable **SSTable** (Sorted String Table).

### SSTables (on disk)

- Immutable files of sorted key-value pairs.
- Once written, never modified.
- Each SSTable contains: data block (sorted), index block (sparse map of key → offset), Bloom filter (for fast "key not present" check), checksum.

### Levels (compaction tiers)

SSTables are organized into **levels** — typically Level 0 (newest) through Level N (oldest, largest).

- **Level 0**: SSTables flushed directly from MemTable. May have overlapping key ranges.
- **Level 1+**: SSTables within a level have *non-overlapping* key ranges. Each level is ~10× larger than the previous.

### Compaction

Background process that merges SSTables:

- **Tiered compaction** (Cassandra default): Combine multiple Level $L$ tables into one Level $L+1$ table. High write throughput, higher read amplification.
- **Leveled compaction** (RocksDB, LevelDB default): When Level $L$ exceeds size budget, pick one SSTable, find overlapping SSTables in Level $L+1$, merge them. Lower read amp, higher write amp.
- **Universal / size-tiered**: Variants on the above with different trade-offs.

## Read path

Reading a key:

1. Check the MemTable (fastest).
2. Check Level 0 SSTables (newest on disk, may overlap; check each).
3. For Level 1+: binary-search the index of the SSTable whose range contains the key.
4. Use the SSTable's Bloom filter to short-circuit "key not present."
5. If present, fetch the data block, return value.

Worst case: read touches MemTable + every Level 0 SSTable + one SSTable per level. Typical: ~5–10 disk reads for a deep, partially-cached LSM.

## Write path

Writing a key:

1. Append to the [[Write-Ahead Log]] (durability).
2. Insert into MemTable (in-memory sort).
3. Return success to client.

Throughput: limited by sequential write speed. **Sustained write rate = WAL throughput**, often hundreds of MB/s on modern SSDs.

## Compaction is the cost

LSM's write speed is bought with **background compaction**, which:

- Reads existing SSTables.
- Merges them with overlapping new SSTables.
- Writes new larger SSTables.
- Deletes the old ones.

This consumes IO bandwidth, CPU, and disk space (briefly 2× during merge). Compaction is the dominant operational cost of LSM:

- **Bursty CPU/IO** — heavy compaction can stall application traffic.
- **Disk pressure** — keep enough free space that compaction can run.
- **Tuning complexity** — RocksDB has 20+ compaction-related options.

## Read amplification, write amplification, space amplification

The three "amps" are LSM's defining metrics:

| Metric | Definition | Typical |
|---|---|---|
| **Write amplification (WA)** | Bytes written to disk per byte written by client | 10–30× (compaction rewrites data many times) |
| **Read amplification (RA)** | Disk reads per client read | 5–20× (multiple SSTables checked) |
| **Space amplification (SA)** | Bytes on disk per byte of live data | 1.1–2× (dead/duplicated entries pre-compaction) |

Compaction policies trade these off. Tiered: low WA, high RA. Leveled: medium WA, low RA. The "right" choice depends on workload.

## Bloom filters

Every SSTable carries a [[Bloom Filters|Bloom filter]] — a probabilistic data structure that says "key X is not in this SSTable" with 100% confidence, or "X may be in this SSTable" (false positives possible).

Effect: most non-existent reads short-circuit at the Bloom filter, never touching disk. Without Bloom filters, LSM read amp would be catastrophic.

Typical Bloom filter: ~10 bits/key, 1% false positive rate. Memory: ~10 MB per GB of keys.

## Tombstones

Deletes don't physically remove data — they write a **tombstone** (a marker that says "key X is deleted at timestamp T"). Reads that find a tombstone return "not found."

Tombstones are physically removed only during compaction, after enough time has passed that no client could see the pre-deletion value (usually 7–30 days for safety).

This causes two operational issues:

1. **Tombstone bloat** — heavy delete workloads accumulate tombstones, slowing reads.
2. **Resurrection** — if a tombstone is purged before all replicas have seen it, an unaware replica may "resurrect" the deleted value during anti-entropy. Mitigate with `gc_grace_seconds` >> max replica lag.

## Time complexity

| Operation | Cost |
|---|---|
| **Write** | $O(\log n)$ in MemTable + 1 sequential disk write to WAL |
| **Point read** (cache miss) | $O(L \cdot \log n)$ where $L$ is number of levels touched |
| **Range scan** | $O(L)$ SSTables to merge, $O(k)$ items returned |
| **Compaction** (background) | $O(n \log n)$ amortized over the LSM lifetime |

## LSM vs B-tree (the canonical comparison)

| Property | LSM Tree | B-Tree |
|---|---|---|
| Write throughput | Very high (sequential) | Moderate (random) |
| Read throughput | Moderate (multi-level lookup) | High (single tree walk) |
| Write amplification | High (10–30×) | Low (1–3×) |
| Space amplification | Moderate-high | Low |
| Range scan | Good with leveled compaction | Excellent |
| Update-in-place | No (append-only) | Yes |
| Concurrency | Optimistic (compaction is lock-free) | Locking-heavy |
| Best for | Writes >> reads, time-series, log-structured | Read-heavy OLTP, joins |

A modern hybrid: store hot data in B-tree, cold data in LSM. Or use LSM with aggressive caching of upper levels.

## Why LSM dominates modern NoSQL

1. **SSDs love sequential writes.** LSM's append-only style maximizes SSD endurance.
2. **High write throughput** matches modern workloads (telemetry, IoT, events).
3. **Predictable space layout** suits distributed sharded systems.
4. **Compaction = compression opportunity.** Sorted data compresses 5–10×.
5. **Snapshots are cheap** — immutable SSTables enable easy backups.

## When NOT to use LSM

- **Read-dominated OLTP** with strict latency SLAs — B-tree's lower read amp is decisive.
- **Tiny data** — overhead of compaction not amortized.
- **In-memory-only** workloads — LSM's disk-design advantages don't apply.
- **Strict update-in-place semantics** — LSM only ever appends; updates are logical, not physical.

## Connections

- [[B-Tree]] — the alternative storage structure
- [[Write-Ahead Log]] — durability layer used by LSM
- [[Bloom Filters]] — critical optimization for LSM reads
- [[Merkle Trees]] — used by LSM-backed databases for anti-entropy
- [[Apache Cassandra]] — LSM-backed wide-column store
- [[Google Bigtable]] / [[Hadoop Distributed File System]] — LSM heritage
- [[Apache Kafka]] — log-structured but not LSM (no compaction merging)
- [[Sharding]] — LSMs typically run per shard
- [[Caching]] — hot SSTables cached in OS page cache or app cache
- [[Vector Database]] — many vector indices use LSM-like immutable segment files (Lucene, FAISS sharded indices)
