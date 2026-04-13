---
title: Branched RAG
type: concept
tags: [rag, planning, branching]
sources: [2026-04-12-14-types-of-rag]
created: 2026-04-13
updated: 2026-04-13
---

# Branched RAG

## Definition

RAG agents that pursue multiple interpretation branches in parallel—each branch posing a different hypothesis, sub-question, or perspective—and then consolidate findings before responding. Inspired by tree-of-thought prompting, branched RAG mitigates the risk of a single narrow retrieval pass.

## Flow

1. Generate several candidate decompositions of the user query (e.g., different facets, personas, or time ranges).
2. Retrieve supporting context for each branch independently.
3. Run per-branch generators or analyzers.
4. Merge the summaries, reconcile disagreements, and craft the final answer.

## Advantages

- Captures diverse evidence for ambiguous or multi-topic prompts.
- Works well with evaluators/critics that rank branches by coverage or agreement.
- Provides natural hooks for agent orchestration frameworks (Coordinator-Worker-Delegator, behavior trees).

## Related Concepts

- [[Agentic Behavior Trees]]
- [[Speculative RAG]]
- [[Memory-Augmented RAG]]
