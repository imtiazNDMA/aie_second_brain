title: AI Agents in Action
type: source
tags: [ai, agents, platforms, autonomy]
sources: [AI Agents in Action.pdf]
created: 2026-04-12
updated: 2026-04-12
---

# AI Agents in Action

**Source:** AI Agents in Action.pdf
**Author:** [[Micheal Lanham]]
**Date ingested:** 2026-04-12
**Type:** book

## Summary

Comprehensive field guide to building and operating AI agents. The book starts by defining the agent landscape—from direct LLM usage to autonomous systems—and breaks agents into component systems (profiles, actions, knowledge+memory, reasoning, planning). It then covers the practical stack: mastering hosted and local LLMs (OpenAI API, [[LM Studio]]), crafting GPT Assistants with [[Custom Actions]] and uploaded knowledge, and orchestrating multi-agent teams with [[AutoGen]], CrewAI, and [[AgentOps]] telemetry. Later chapters dive into empowering agents with OpenAI function calling and [[Semantic Kernel]] plugins, using behavior trees plus the [[GPT Assistants Playground]] for autonomy, assembling a Nexus-based agent platform, implementing RAG-driven memory architectures, and institutionalizing prompt evaluation via [[Prompt Flow]], rubrics, and [[Reasoning Strategies]] such as chain-of-thought, self-consistency, and tree-of-thought search.

## Key Claims

- Agent effectiveness comes from treating persona, actions, memory, reasoning, and planning as purposeful subsystems that can be tuned independently.
- Tool selection must match deployment context: hosted APIs for speed, [[LM Studio]]/local servers for privacy and experimentation, and GPT Assistants for low-code packaging of personas plus actions.
- [[Multi-Agent Systems]] demand observability; platforms like [[AutoGen]], CrewAI, and [[AgentOps]] expose skills, critics, caches, and traces to keep crews productive and cost-aware.
- Function calling plus Semantic Kernel unlock deterministic tool execution, enabling hybrid semantic+native skills and behavior-tree-based supervision loops.
- Durable agents rely on explicit memory strategies—document chunking, embeddings, [[Chroma]] databases, Nexus memory stores, and compression pipelines—to avoid hallucinations and preserve relevance.
- [[Prompt Flow]], rubric-driven grading, and [[Reasoning Strategies]] (CoT, prompt chaining, self-consistency) provide a quantitative foundation for evaluating and improving agent prompts.

## Structure

- **Chapter 1 — Introduction to agents and their world:** Defines agents, components, and the emerging interface paradigm.
- **Chapter 2 — Harnessing the power of large language models:** Covers OpenAI APIs, [[LM Studio]], and model selection.
- **Chapter 3 — Engaging GPT assistants:** Builds GPTs with personas, files, store publishing, and [[Custom Actions]].
- **Chapter 4 — Exploring [[Multi-Agent Systems]]:** Dives into [[AutoGen]], CrewAI, and observability with [[AgentOps]].
- **Chapter 5 — Empowering agents with actions:** Details OpenAI function calling and [[Semantic Kernel]] plugins.
- **Chapter 6 — Building autonomous assistants:** Introduces behavior trees and the [[GPT Assistants Playground]].
- **Chapter 7 — Assembling and using an agent platform:** Presents the Nexus platform and Streamlit chat UIs.
- **Chapter 8 — Understanding [[Agent Memory]] and knowledge:** Explains RAG, [[Chroma]], and Nexus memory stores.
- **Chapter 9 — Mastering agent prompts with [[Prompt Flow]]:** Shows systematic profile creation and evaluation flows.
- **Chapter 10 — Agent reasoning and evaluation:** Catalogs [[Reasoning Strategies]] plus rubric-driven assessments.

## Entities Mentioned

- [[Micheal Lanham]] — Author and practitioner focusing on autonomous agents
- [[LM Studio]] — Desktop app for downloading, running, and serving open-source LLMs
- [[AutoGen]] — Framework for scripting multi-agent conversations with skills, critics, and caching
- [[CrewAI]] — Platform for defining agent crews with roles, goals, and sequential or hierarchical execution
- [[AgentOps]] — Observability layer capturing agent costs, tokens, and looping behavior
- [[Semantic Kernel]] — Microsoft orchestration library for semantic and native functions
- [[GPT Assistants Playground]] — Local UI mirroring OpenAI Assistants with custom tooling hooks
- [[Nexus Agent Platform]] — Streamlit-based agent platform bundling personas, tools, and memory

## Concepts Covered

- [[Agent Components]] — Profiles, actions, knowledge+memory, reasoning, planning
- [[Prompt Engineering]] — Personas, delimiters, exemplars, explicit step-by-step instructions
- [[GPT Assistants]] — Packaged personas with actions, files, and publishing workflows
- [[Custom Actions]] — FastAPI/ngrok-backed endpoints exposed to GPT Assistants
- [[Multi-Agent Systems]] — [[AutoGen]], CrewAI, group-chat vs sequential orchestration
- [[OpenAI Function Calling]] — JSON-described tool schema and deterministic execution loops
- [[Agentic Behavior Trees]] — Applying py_trees and assistant roles for autonomous workflows
- [[Agent Memory]] — Retrieval pipelines, semantic memory, and Nexus stores
- [[Retrieval-Augmented Generation]] — LangChain loaders, embeddings, and [[Chroma]] stores
- [[Prompt Flow]] — Profile authoring, deployment, and evaluation flows
- [[Reasoning Strategies]] — Chain-of-thought, self-consistency, and tree-of-thought evaluations
