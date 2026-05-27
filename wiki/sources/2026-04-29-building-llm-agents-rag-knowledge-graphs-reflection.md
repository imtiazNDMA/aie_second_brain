---
title: Building LLM Agents with RAG, Knowledge Graphs and Reflection
type: source
authors: [Mira S. Devlin]
tags: [agents, rag, knowledge-graph, reflection, multi-agent]
created: 2026-04-29
updated: 2026-04-29
---

# Building LLM Agents with RAG, Knowledge Graphs and Reflection

## Summary
Practical architecture-focused guide that frames agent design around iterative loops, retrieval grounding, graph-based reasoning, and role-based multi-agent coordination.

## Key Takeaways
- `R3A` (`Retrieval -> Reasoning -> Reflection -> Action`) is presented as the minimum loop for outcome-oriented agents.
- Core failure modes of standalone LLMs are memory limits, hallucination, and fragile multi-step reasoning; the book repeatedly uses RAG, memory systems, and reflection loops as compensating structure.
- Graph-aware systems are treated as a complement to vector retrieval: vector search finds relevant passages while graph traversal adds multi-hop relational context.
- Multi-agent design is operationalized via explicit role separation (planner, executor, evaluator/reviewer), message protocols, and shared memory.
- Build guidance emphasizes reliability: strict grounding prompts, citations, retrieval diagnostics, and revise-on-critique loops.

## Implementation Patterns
- Minimal QA agent: controller decision, tool/API call, grounded composer.
- Mini RAG bot: ingest -> chunk -> embed -> retrieve -> compose with sources.
- Graph-connected assistant: natural-language-to-Cypher/SPARQL translation and graph-augmented answer synthesis.
- Self-correcting assistant: draft -> critic JSON -> revision loop with capped retries.

## Connections
- [[Mira S. Devlin]] - author and AI systems designer
- [[Retrieval-Augmented Generation]] - grounding strategy used throughout
- [[Knowledge Graphs]] - structured reasoning layer for multi-hop context
- [[Reflection]] - self-evaluation and revision loop design
- [[Multi-Agent Systems]] - role-based collaboration patterns
- [[R3A Loop]] - canonical cycle introduced in this source
- [[Planner-Executor-Evaluator Pattern]] - recurring coordination template

## Related Concepts
- [[Agentic Systems]]
- [[Agent Memory]]
- [[Graph RAG]]
- [[LLMOps]]
