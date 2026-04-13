---
title: Memory-Augmented RAG
type: concept
tags: [rag, memory, conversational]
sources: [2026-04-12-14-types-of-rag]
created: 2026-04-13
updated: 2026-04-13
---

# Memory-Augmented RAG

## Definition

Conversation-oriented RAG systems that maintain a working memory of prior exchanges, intermediate notes, or structured state. Instead of re-retrieving from scratch each turn, the agent stores distilled context (summaries, decisions, unresolved questions) and injects it alongside fresh documents.

## Memory Types

- **Short-term scratchpads** capturing the current task plan.
- **Session memories** summarizing earlier conversation segments.
- **Long-term stores** (vector DBs, knowledge graphs) writing back new facts discovered during the dialogue.

## Benefits

- Reduces redundant retrievals and hallucinations caused by forgetting earlier constraints.
- Supports multi-session agents that keep commitments over time.
- Enables reasoning strategies like deliberate planning, self-reflection, and critiques.

## Related Concepts

- [[Agent Memory]]
- [[Branched RAG]]
- [[Adaptive RAG]]
