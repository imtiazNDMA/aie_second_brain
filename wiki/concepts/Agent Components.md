---
title: Agent Components
type: concept
tags: [agents, architecture, components]
sources: [2026-04-12-ai-agents-in-action, 2026-04-12-building-agentic-ai-systems]
created: 2026-04-12
updated: 2026-04-12
---

# Agent Components

The five core pillars that define an AI agent's architecture and capabilities: Profiles, Actions, Knowledge, Reasoning, and Planning.

## Definition

Agent components represent the modular building blocks of autonomous AI systems. As described in *AI Agents in Action* and *Building Agentic AI Systems*, every agent should be designed around these five pillars:

## The Five Pillars

### 1. Profiles (Personas)
- **Purpose**: Define the agent's role, tone, expertise, and behavioral constraints
- **Implementation**: System prompts, character descriptions, domain expertise
- **Example**: "You are a helpful coding assistant specialized in Python"

### 2. Actions (Tools)
- **Purpose**: Enable agents to execute commands, call APIs, and interact with external systems
- **Implementation**: Function calling, tool registries, action schemas
- **Example**: Code execution, web search, database queries, file operations

### 3. Knowledge (Memory)
- **Purpose**: Provide agents with access to information beyond their training data
- **Implementation**: RAG pipelines, vector databases, semantic/episodic/procedural memory stores
- **Example**: Document retrieval, conversation history, learned procedures

### 4. Reasoning (Decision-Making)
- **Purpose**: Enable agents to think, evaluate options, and make decisions
- **Implementation**: Chain-of-thought, self-consistency, tree-of-thought, reflection
- **Example**: Breaking down complex tasks, evaluating intermediate results

### 5. Planning (Orchestration)
- **Purpose**: Coordinate multi-step workflows and long-term goal pursuit
- **Implementation**: Task decomposition, workflow graphs, hierarchical planning
- **Example**: Breaking a project into subtasks, coordinating multi-agent teams

## Architecture Patterns

- **Reactive Agents**: Minimal planning, fast stimulus-response cycles
- **Deliberative Agents**: Extensive planning, goal-based execution
- **Hybrid Agents**: Combine reactive and deliberative approaches
- **Multi-Agent Systems**: Multiple specialized agents collaborating via these components

## Related Concepts

- [[Agent Memory]] — Implements the knowledge+memory pillar
- [[Tool Use]] — Implements the actions pillar
- [[Reasoning Strategies]] — Implements the reasoning pillar
- [[Agentic Systems]] — Systems composed of agents with these components
- [[Coordinator-Worker-Delegator Model]] — Role-based collaboration pattern
- [[Multi-Agent Systems]] — Teams of agents with specialized components

## Sources

- [[2026-04-12-ai-agents-in-action]]: Introduces the five pillars framework
- [[2026-04-12-building-agentic-ai-systems]]: Extends components to agentic AI architecture
- [[2026-04-12-rag-driven-generative-ai]]: Integrates knowledge pillar with RAG
