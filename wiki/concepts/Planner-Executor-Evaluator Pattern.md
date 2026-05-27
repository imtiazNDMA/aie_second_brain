---
title: Planner-Executor-Evaluator Pattern
type: concept
tags: [multi-agent, orchestration, evaluation, quality]
sources: [2026-04-29-building-llm-agents-rag-knowledge-graphs-reflection]
created: 2026-04-29
updated: 2026-04-29
---

# Planner-Executor-Evaluator Pattern

## Definition
Role-separation pattern for agent systems where a planner decomposes goals, an executor performs tasks, and an evaluator validates outputs before acceptance or revision.

## Workflow
1. Planner defines sub-tasks, constraints, and acceptance criteria.
2. Executor runs tools or reasoning steps and returns artifacts.
3. Evaluator checks factual grounding, completeness, and format.
4. Feedback is routed back to planner/executor for revision loops.

## Strengths
- Reduces unchecked hallucination by introducing explicit review.
- Improves traceability with role-based logs.
- Enables scalable multi-agent collaboration through clear interfaces.

## Related Concepts
- [[Multi-Agent Systems]]
- [[R3A Loop]]
- [[Reflection]]
- [[Agentic Systems]]

## Sources
- [[2026-04-29-building-llm-agents-rag-knowledge-graphs-reflection]]
