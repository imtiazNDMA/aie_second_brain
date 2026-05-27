---
title: B-Tree
type: concept
tags: [storage, indexing, databases, data-structures]
sources: [2026-04-16-system-design-interview-complete-guide]
created: 2026-05-10
updated: 2026-05-10
---

# B-Tree

## Definition

A **B-tree** is a self-balancing search tree designed for block-oriented storage where each node holds many keys and pointers (typically hundreds to thousands), keeping tree height very low even for billion-row tables. B-trees are the dominant index structure in classical (read-optimized) relational and document databases — Postgres, MySQL InnoDB, Oracle, SQL Server, MongoDB WiredTiger — and are the canonical alternative to [[LSM Tree]] in the read-optimized vs write-optimized storage trade-off.

## Why high-fanout matters

Each B-tree node corresponds to a single disk page (typically 4–16 KB). Each page holds many keys/pointers (~100–1000 depending on key size and page size). A point lookup descends $O(\log_B N)$ levels where $B$ is the branching factor — typically 3–5 page reads for a billion-row table.

```
       [root: keys k1...kM]
       /        |         \
    [child]  [child]   [child]
      /\        /\        /\
    ...        ...      ...
```

Each level holds $B$× more nodes than its parent; tree height grows logarithmically.

## B-tree vs B+-tree

The variant used in practice is the **B+-tree**:

| Feature | B-tree | B+-tree |
| --- | --- | --- |
| Data location | Keys + values throughout | Values only at leaves; internal nodes hold keys + pointers |
| Range scans | Slower | **Linked leaves** allow fast in-order range scans |
| Read amplification | Slightly worse | Better cache locality |

When people say "B-tree" in database contexts, they almost always mean B+-tree.

## Operations

| Operation | Complexity | Notes |
| --- | --- | --- |
| Point lookup | $O(\log N)$ | 3–5 page reads typical |
| Range scan | $O(\log N + k)$ | Linked leaves enable efficient sequential scan |
| Insert | $O(\log N)$ | May trigger node splits up the tree |
| Delete | $O(\log N)$ | May trigger node merges; in practice often deferred |

## B-tree vs LSM Tree

The fundamental storage-structure trade-off:

| Aspect | B-tree | [[LSM Tree]] |
| --- | --- | --- |
| Write path | In-place update; possible split | Append to memtable / log |
| Write amplification | 1× (in-place) | 5–30× (compaction) |
| Read amplification | 1× (single tree walk) | 1–5× (multiple SSTables, [[Bloom Filters]] help) |
| Space amplification | Low | Higher (multiple versions until compacted) |
| Latency profile | Predictable per-op | Variable due to compaction backpressure |
| Best for | Read-heavy, balanced | Write-heavy |

Postgres / MySQL chose B-trees; Cassandra / RocksDB chose LSM. The decision shapes the workload the database is good at.

## In-memory variants

For in-memory workloads, B-trees compete with hash tables and skip lists:

- **Hash table** — O(1) point lookup; no range scan; cache-unfriendly at scale
- **Skip list** — simpler than B-tree; similar properties; LevelDB's memtable
- **B-tree** — wins for range queries, sustained throughput, large datasets

## Where B-trees appear in production

- **Postgres** — default index type
- **MySQL InnoDB** — clustered index *is* a B+-tree (rows live in the leaves)
- **MongoDB WiredTiger** — B+-tree storage engine option
- **Oracle, SQL Server** — B+-tree indices
- **SQLite** — B-tree everywhere
- **Filesystems** — NTFS, HFS+, btrfs, ZFS (variants)

## Related Concepts

- [[LSM Tree]] — primary alternative storage structure
- [[Compaction]] — LSM equivalent of node-split maintenance
- [[Sharding]] — orthogonal scaling axis
- [[Write-Ahead Log]] — durability layer paired with B-tree writes
- [[Caching]] — buffer-pool caching is critical for B-tree performance

## Sources

- [[2026-04-16-system-design-interview-complete-guide]] — storage-engine fundamentals

## Open Questions

- B-tree concurrency primitives (latch-based vs lock-free) at very high throughput
- Hybrid B-tree + LSM designs (e.g., Bw-tree)
- B-tree relevance for vector indices (mostly displaced by [[HNSW]] / [[IVF]])
