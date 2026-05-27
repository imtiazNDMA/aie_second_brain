---
title: R3A Loop
type: concept
tags: [agents, architecture, reasoning, reflection]
sources: [2026-04-29-building-llm-agents-rag-knowledge-graphs-reflection]
created: 2026-04-29
updated: 2026-04-29
---

# R3A Loop

## Definition
Agent control loop composed of `Retrieval -> Reasoning -> Reflection -> Action`, used to keep outputs grounded, goal-directed, and iteratively improvable.

## Why It Matters
- Retrieval anchors answers to external evidence.
- Reasoning transforms retrieved evidence into task-specific decisions.
- Reflection checks quality and identifies needed revisions.
- Action executes tool/API/workflow steps and feeds outcomes back into the next loop.

## Related Concepts
- [[Reflection]]
- [[Retrieval-Augmented Generation]]
- [[Agentic Systems]]
- [[Planner-Executor-Evaluator Pattern]]

## Sources
- [[2026-04-29-building-llm-agents-rag-knowledge-graphs-reflection]]
