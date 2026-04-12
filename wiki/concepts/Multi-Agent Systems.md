---
tags: [multi-agent, orchestration, collaboration]
sources: [2026-04-12-ai-agents-in-action]
created: 2026-04-12
updated: 2026-04-12
---

# Multi-Agent Systems

## Definition

Collections of specialized agents that collaborate on tasks through structured conversations, task queues, or shared memory.

## Patterns

- **[[AutoGen]]-style** group chats: agents debate within a mediated conversation, optionally guided by critics and caches.
- **CrewAI** crews: roles plus task lists executed sequentially or hierarchically with reviewers.
- **Behavior-tree crews**: selector/sequence nodes route work between assistants like Hacker/Judge/Verifier.
- Observability (e.g., [[AgentOps]]) is essential for detecting loops, runaway costs, and coordination failures.

## Related Concepts

- [[Agent Components]] — Provide a checklist for each agent participating in a system.
- [[Agentic Behavior Trees]] — One orchestration pattern for multi-agent autonomy.
