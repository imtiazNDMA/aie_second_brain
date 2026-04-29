---
title: PACELC Theorem
type: concept
tags: [distributed-systems, latency, consistency]
sources: [2026-04-16-grokking-advanced-system-design-interview]
created: 2026-04-16
updated: 2026-04-16
---

# PACELC Theorem

## Definition

Extension of CAP stating that systems trade consistency vs availability under partition (PA/PC) and trade latency vs consistency when no partition exists (EL/EC).

## Why It Matters

- Captures non-failure-state tradeoffs ignored by CAP alone.
- Helps evaluate performance expectations in normal operation.

## Related Concepts

- [[CAP Theorem]]
- [[Quorum]]
