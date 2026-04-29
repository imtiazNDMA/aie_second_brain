---
title: Message Ordering
type: concept
tags: [chat-systems, ids, distributed-systems]
sources: [2026-04-16-system-design-interview-complete-guide]
created: 2026-04-16
updated: 2026-04-16
---

# Message Ordering

## Definition

Guaranteeing that chat or event messages are stored and presented in a deterministic order, usually by assigning monotonic IDs.

## Design Notes

- IDs should be unique and sortable by creation time.
- Ordering can be global (harder) or scoped to a channel/conversation (common in practice).
- Distributed generators (for example, [[Twitter Snowflake]]) are often used where database auto-increment is unavailable.

## Related Concepts

- [[Service Discovery]]
- [[High Availability]]
