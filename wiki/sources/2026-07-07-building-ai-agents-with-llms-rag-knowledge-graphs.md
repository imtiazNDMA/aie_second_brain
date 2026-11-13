---
title: Building AI Agents with LLMs, RAG, and Knowledge Graphs
type: source
authors: [Salvatore Raieli, Gabriele Iuculano]
tags: [agents, rag, graph-rag, llmops, deployment]
sources: [Building AI Agents with LLMs, RAG, and Knowledge Graphs.pdf]
created: 2026-07-07
updated: 2026-07-07
---

# Building AI Agents with LLMs, RAG, and Knowledge Graphs

**Source:** Building AI Agents with LLMs, RAG, and Knowledge Graphs.pdf  
**Date ingested:** 2026-07-07  
**Type:** book

## Summary

Packt's 2025 practical guide by [[Salvatore Raieli]] and [[Gabriele Iuculano]] presents [[Agentic Systems]] as a full engineering stack. It starts with text representation, transformers, and LLM behavior, then moves into agent architecture, [[Retrieval-Augmented Generation]], [[Advanced RAG]], [[Knowledge Graphs]], [[Graph RAG]], [[Reinforcement Learning]], [[Multi-Agent Systems]], and production deployment.

The book's main contribution to this wiki is the connective implementation layer: it shows how LLM agents are assembled from a user interface, a model "brain", perception modules, tools, prompts, memory, retrieval, graph structure, and deployment/runtime infrastructure such as [[Streamlit]], [[Docker]], and [[Kubernetes]].

## Key Claims

- LLM agents should be designed as systems with explicit interface, brain, perception, tool, prompt, memory, planning, and action modules, not as isolated prompts.
- [[Retrieval-Augmented Generation]] and [[Graph RAG]] reduce hallucination risk by moving knowledge out of the model's parametric memory and into retrievable external stores.
- [[Advanced RAG]] exists because naive chunk-and-vector-search pipelines fail on precision, recall, stale knowledge, long context, conflicting evidence, format constraints, and scalability.
- [[Knowledge Graphs]] make entity relationships explicit and can support graph traversal, graph reasoning, and graph-enhanced retrieval.
- [[Multi-Agent Systems]] can improve complex work through specialization, debate, monitoring, voting, and tool/model orchestration, but they add coordination and debugging costs.
- Production agent applications require the same discipline as other software products: evaluation, monitoring, inference optimization, error handling, security, async execution, containerization, and deployment planning.

## Entities Mentioned

- [[Salvatore Raieli]] - co-author; senior data scientist focused on AI for drug discovery and LLM applications.
- [[Gabriele Iuculano]] - co-author; embedded-systems and AI practitioner focused on test automation and predictive maintenance.
- [[LangChain]] - broad agent/RAG framework with chains, LangSmith monitoring, and LangServe API deployment.
- [[Haystack]] - pipeline-oriented RAG and Q&A framework.
- [[LlamaIndex]] - retrieval-oriented framework with data connectors, indexes, and knowledge-graph support.
- [[Semantic Kernel]] - Microsoft orchestration framework for composing LLM prompts with native plugins.
- [[AutoGen]] - multi-agent conversational programming framework.
- [[Streamlit]] - rapid Python web-app framework used for agent prototypes and internal tools.
- [[Docker]] - container packaging layer for reproducible agent application environments.
- [[Kubernetes]] - orchestration layer for deploying and scaling containerized agent applications.
- [[Toolformer]] - tool-use approach where an LLM learns when and how to call APIs.
- [[HuggingGPT]] - LLM controller pattern that plans tasks, selects expert models, executes them, and synthesizes the result.
- [[ChemCrow]] - chemistry-focused agent example using tools for scientific workflows.

## Concepts Covered

- [[Brain-Perception-Action Agent Model]] - practical decomposition of agent applications into model, input-processing, and action/tool layers.
- [[Agent Deployment]] - operational layer for moving agents from prototype to production.
- [[Agentic Systems]] - core agent architecture and autonomy framing.
- [[Retrieval-Augmented Generation]] - external knowledge grounding for LLM applications.
- [[Advanced RAG]] - hierarchical indexing, hypothetical questions, HyDE, context enrichment, query transformation, hybrid search, routing, reranking, and context compression.
- [[Knowledge Graphs]] - entity/relation representation, ontology design, NER, relation extraction, graph storage, and graph querying.
- [[Graph RAG]] - graph-guided retrieval and graph reasoning for LLM agents.
- [[Multi-Agent Systems]] - collaboration, competition, human-agent interaction, and model/tool orchestration.
- [[LLMOps]] - production lifecycle for large-language-model systems.

## Related Sources

- [[2026-04-12-rag-driven-generative-ai]] — RAG foundations
- [[2026-04-12-building-agentic-ai-systems]] — Agent systems
