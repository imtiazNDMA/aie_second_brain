---
title: ML Monitoring
type: concept
tags: [ml, operations, observability]
sources: [2026-04-12-ai-engineering, 2026-04-29-hands-on-aiops-best-practices-guide-to-implementing-aiops]
created: 2026-04-12
updated: 2026-04-29
---

# ML Monitoring

Tracking model performance and system health in production.

## Definition

Monitoring: prediction latency, throughput, errors, data drift, model drift. Alerts when metrics deviate from expected ranges. Often separate from general infrastructure monitoring.

In production agent systems, monitoring should combine model signals (quality, hallucination rate, drift) with operations signals (alert precision, MTTR, recurrence) to support both [[LLMOps]] and [[AIOps]] control loops.

## Related Concepts

- [[MLOps]]
- [[Continuous Training]]
- [[Model Evaluation]]
- [[AIOps]]
- [[AIOps-LLMOps Convergence for Agent Operations]]

## Sources

- [[2026-04-12-ai-engineering]] — Chapter 14
- [[2026-04-29-hands-on-aiops-best-practices-guide-to-implementing-aiops]] — Incident-centric monitoring and event intelligence patterns
