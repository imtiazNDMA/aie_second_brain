---

tags: [concept, evaluation, testing, production-ml, cluster/evaluation]
sources: ["2026-09-12-practical-llm-evaluation-production-systems"]
created: 2026-09-12
updated: 2026-09-12
---


# Slice-Based Evaluation

Production evaluation strategy where test cases are tagged by intent, risk tier, locale, user segment, and input type. Release is gated by critical-slice performance, not aggregate metrics. Defeats the false confidence that aggregate numbers provide.

## The Problem with Aggregate Metrics

A model can achieve 95% overall accuracy while failing catastrophically on a critical slice. Example: 4.7% aggregate hallucination rate (against 3% threshold) masked a **12% hallucination rate on high-line-item documents**. The fix was threshold recalibration by slice, not retraining.

## Slice Dimensions

| Dimension | Example Tags |
|---|---|
| **Intent** | question-answering, summarization, extraction, generation |
| **Risk tier** | high (medical, legal), medium (business), low (casual) |
| **Locale** | en-US, en-GB, de-DE, ja-JP |
| **User segment** | enterprise, consumer, internal |
| **Input type** | short-form, long-form, structured, multimodal |

## Implementation

- **Threshold Card** — versioned document mapping every metric to its threshold, ownership, and action
- **Critical-slice gating** — release blocked if any critical slice fails its threshold
- **Offline → Online promotion ladder** — shadow eval → canary → full ramp with gates at each stage
- **Slice-tagged test suites** — structured test cases with slice metadata

## Related

- [[LLM Evaluation Rubrics]] — broader evaluation framework
- [[Evaluation]] — general evaluation concepts
- [[SLI SLO SLA]] — service level indicators and objectives
- [[Error Budget]] — allowable failure rate
