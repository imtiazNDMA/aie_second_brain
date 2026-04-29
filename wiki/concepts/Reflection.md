---
title: Reflection
type: concept
tags: [agent-capabilities, self-improvement, meta-cognition]
sources: [2026-04-12-building-ai-coding-agents-terminal.md, 2026-04-12-prompt-engineering-llms.md, 2026-04-29-self-rag.md]
created: 2026-04-29
updated: 2026-04-29
---

# Reflection

The capability of AI systems to evaluate their own outputs, identify errors or improvements, and refine their responses accordingly.

## Definition

Reflection in AI systems refers to the process where models assess their own reasoning or outputs against criteria, then use that assessment to improve subsequent attempts. This meta-cognitive capability enables self-correction and iterative refinement.

## Key Concepts

- **Self-Evaluation**: Model grades its own output quality
- **Reflection Tokens**: Special tokens (like in Self-RAG) for self-assessment
- **Iterative Refinement**: Using reflection to produce improved responses
- **Critique and Revise**: Generate output, critique it, then revise
- **Confidence Estimation**: Model assesses its own uncertainty

## Related Concepts

- [[Self-RAG]] — Uses reflection tokens for retrieval and generation assessment
- [[Reasoning Strategies]] — Chain-of-thought, self-consistency build on reflection
- [[VERA]] — External validation system that complements self-reflection
- [[Agentic Systems]] — Reflection enables more sophisticated agent behavior

## Sources

- [[2026-04-12-building-ai-coding-agents-terminal.md]]: Reflection as key capability for AI coding agents
- [[2026-04-12-prompt-engineering-llms.md]]: Listed alongside tool use as key LLM capability
- [[2026-04-29-self-rag.md]]: Self-RAG's reflection tokens for critique

## Open Questions

- How reliable is LLM self-evaluation compared to external validation?
- Can reflection lead to overconfidence or circular reasoning?
