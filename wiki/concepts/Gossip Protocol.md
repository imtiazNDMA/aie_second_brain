---
title: Gossip Protocol
type: concept
tags: [membership, failure-detection, distributed-systems]
sources: [2026-04-16-grokking-advanced-system-design-interview]
created: 2026-04-16
updated: 2026-04-16
---

# Gossip Protocol

## Definition

Peer-to-peer state dissemination approach where nodes periodically exchange cluster membership and health information with random peers.

## Why It Matters

- Avoids centralized membership bottlenecks.
- Scales failure detection and topology convergence across large clusters.

## Related Concepts

- [[Leader-Follower Replication]]
- [[Service Discovery]]
