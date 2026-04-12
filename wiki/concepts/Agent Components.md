---
tags: [agents, architecture, design]
sources: [2026-04-12-ai-agents-in-action]
created: 2026-04-12
updated: 2026-04-12
---

# Agent Components

## Definition

The five subsystems [[Micheal Lanham]] recommends treating explicitly when designing AI agents: profile/persona, actions/tools, knowledge+memory, reasoning/evaluation, and planning/feedback.

## Details

- **Profile/persona** – Defines tone, responsibilities, guardrails, and target audience for each agent.
- **Actions/tools** – Functions an agent may call (OpenAI functions, [[Semantic Kernel]] skills, command runners).
- **Knowledge + memory** – Documents, embeddings, Nexus memory stores, or external RAG pipelines that ground answers.
- **Reasoning + evaluation** – Chains of thought, critics, or rubric-based assessors verifying intermediate outputs.
- **Planning + feedback** – Behavior trees, crew task lists, or [[AutoGen]] group chats that keep work on track.

## Related Concepts

- [[AI Coding Agent]] — Applies the component stack to developer workflows.
- [[Agent Memory]] — Implements the knowledge+memory pillar.
- [[Agentic Behavior Trees]] — Provide planning loops and feedback pathways.
