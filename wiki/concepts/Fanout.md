---
title: Fanout
type: concept
tags: [social-systems, feed, scalability]
sources: [2026-04-16-system-design-interview-complete-guide]
created: 2026-04-16
updated: 2026-04-16
---

# Fanout

## Definition

Distribution strategy for activity feeds where updates are propagated either at write time (push) or read time (pull).

## Patterns

- **Fanout on write (push):** Precompute feed entries for followers; faster reads, more expensive writes.
- **Fanout on load (pull):** Fetch on demand; cheaper writes, slower reads.
- **Selective fanout:** Hybrid policy, often disabling push for very high-follower accounts.

## Related Concepts

- [[Load Balancing]]
- [[Rate Limiting]]
