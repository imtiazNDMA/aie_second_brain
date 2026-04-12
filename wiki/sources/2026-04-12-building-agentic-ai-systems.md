---
title: Building Agentic AI Systems
type: source
tags: [agents, generative-ai, architecture]
sources: [building agentic ai systems.pdf]
created: 2026-04-12
updated: 2026-04-12
---

# Building Agentic AI Systems

**Authors:** [[Anjanava Biswas]], [[Wrick Talukdar]]  
**Publisher:** Packt (2025)  
**Date ingested:** 2026-04-12  
**Type:** book

## Summary

Guide to designing generative, tool-using agents that can reason, plan, and collaborate safely. Part I grounds readers in generative models and agent principles (deliberative vs reactive vs hybrid). Part II dives into core capabilities—knowledge representation, learning, planning, reflection/introspection, [[Tool Use]], and the Coordinator-Worker-Delegator collaboration pattern—with hands-on workflows via CrewAI, [[AutoGen]], and [[LangGraph]]. Part III addresses trust, transparency, safety, ethics, and domain deployments (decision support, creative tools, conversational systems, robotics), framing governance as integral to agent adoption.

## Key Claims

- Treat agent architectures as a stack of personas, actions/tools, knowledge+memory, reasoning/evaluation, and planning/feedback; tune each pillar independently.
- Reflection and introspection loops improve reliability by forcing agents to critique outputs before executing risky actions.
- Tool calling, planning, and role specialization (Coordinator/Worker/Delegator) are mandatory for scaling beyond single-shot prompts.
- Trust, safety, and explainability must be built into agent workflows (auditable tool logs, uncertainty reporting, approval gates) before production deployment.
- Ethical guardrails plus governance (bias reviews, compliance workflows) determine whether enterprises can adopt autonomous agents.

## Structure

- **Chapter 1 — Fundamentals of Generative AI:** Surveys VAEs, GANs, transformers, and how generative models underpin agent reasoning.
- **Chapter 2 — Principles of [[Agentic Systems]]:** Defines agency/autonomy, compares deliberative/reactive/hybrid agents, and introduces [[Multi-Agent Systems]].
- **Chapter 3 — Essential Components of Intelligent Agents:** Covers knowledge representation, learning styles, planning utilities, memory, and reasoning.
- **Chapter 4 — Reflection and Introspection:** Builds meta-reasoning loops, self-assessment prompts, and critique pipelines for higher accuracy.
- **Chapter 5 — [[Tool Use]] and Planning:** Demonstrates function/tool calling, planners, and frameworks like [[AutoGen]], CrewAI, and [[LangGraph]].
- **Chapter 6 — Coordinator-Worker-Delegator Approach:** Formalizes role prompts, messaging protocols, and delegation strategies for agent crews.
- **Chapter 7 — Agentic System Design Techniques:** Provides [[Prompt Engineering]], environment modeling, and memory design patterns.
- **Chapter 8 — Building Trust:** Focuses on transparency, explainability, calibration, and reliable UX.
- **Chapter 9 — Safety and Ethics:** Addresses risk assessment, governance, compliance, and policy frameworks.
- **Chapter 10 — Use Cases:** Applies agent stacks to decision support, creative systems, conversational AI, robotics, and more.
- **Chapter 11 — Future Outlook:** Maps trends (multimodal perception, experiential RL, AGI prerequisites) and open research directions.

## Entities Mentioned

- [[Anjanava Biswas]] — AWS AI specialist, co-author.
- [[Wrick Talukdar]] — AI solutions leader bridging research and practice.
- [[AutoGen]] — Microsoft multi-agent framework for conversational orchestration.
- [[CrewAI]] — Role/task agent framework powering coding and evaluator crews.
- [[LangGraph]] — LangChain graph runtime for multi-agent state machines.
- [[AgentOps]] — Observability layer for monitoring agent loops.

## Concepts Covered

- [[Generative AI]] — Foundation for agent reasoning.
- [[Agentic Systems]] — Overall architecture patterns.
- [[Agent Components]] — Personas, tools, memory, reasoning, planning.
- [[Coordinator-Worker-Delegator Model]] — Collaboration structure.
- [[Agent Trust and Safety]] — Transparency and guardrails.
- [[Agentic Behavior Trees]] — Planning/execution scaffolding.
- [[Tool Use]] — Function calling and action gating.
- [[Reflection]] — Self-critique workflows.
- [[Agent Memory]] — Context management and persistence.
