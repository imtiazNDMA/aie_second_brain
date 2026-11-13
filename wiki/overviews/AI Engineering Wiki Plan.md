---
title: AI Engineering Wiki Plan
type: overview
tags: [ai-engineering, roadmap, production, evaluation, security, llmops]
sources: []
created: 2026-08-22
updated: 2026-08-22
---

# AI Engineering Wiki Plan

This plan turns the wiki from an AI research and architecture atlas into a full-stack AI engineering second brain. The central learning loop is:

```text
Concept -> Implementation -> Evaluation -> Deployment -> Monitoring -> Security -> Iteration
```

## Current diagnosis

- Architecture, RAG, agents, inference fundamentals, and research coverage are strong.
- Production evaluation and release gates are the highest-leverage missing bridge.
- Security engineering, durable agent runtimes, production inference APIs, and full-stack delivery need dedicated coverage.
- Training infrastructure and AI-specific distributed architectures follow after the production spine.
- Placeholder pages should be developed or removed from the index instead of counting as coverage.

## Build order

1. [[Production Evaluation and Release Gates]]
2. [[AI Security Engineering]]
3. [[AI Release Management]]
4. [[Durable Agent Execution]]
5. [[Production LLM Inference API]]
6. [[AI Application Full-Stack Architecture]]
7. [[LLM Training Lifecycle]]
8. [[AI System Reference Architectures]]
9. Placeholder cleanup and entity normalization

The linked pages are backlog targets. They should be created as substantive pages, not empty index entries, and should include implementation guidance, evaluation criteria, production tradeoffs, and related project artifacts.

## Definition of done for a branch

Each branch should have:

- one clear discipline hub
- five to ten atomic concepts
- at least one synthesis or decision guide
- explicit evaluation and reliability guidance
- one runnable example or project connection
- deployment, monitoring, and failure-analysis links

## Immediate work queue

### Production evaluation

- online evaluation on sampled production traffic
- versioned evaluation datasets
- CI regression tests and release gates
- statistical significance and experiment design
- human-label agreement and LLM-as-judge calibration
- agent trajectory, safety, red-team, and cost-quality-latency evaluation

### Release engineering

- CI/CD/CT for AI systems
- canary, shadow, rollback, routing, and fallback patterns
- joint versioning of prompts, models, adapters, indexes, and datasets
- artifact lineage and environment promotion

### Security engineering

- threat modeling, prompt injection, tool poisoning, excessive agency
- agent identity, scoped credentials, secrets, sandboxing, and tenant isolation
- PII governance, supply-chain security, incident response, and security testing

## Maintenance rule

Refresh this page and [[AI Engineer Gap Analysis]] after each major ingest or project milestone. When a planned page exists, replace backlog language in sibling overview pages with a link to the actual page and record whether it is substantive, runnable, evaluated, and production-oriented.

## Related pages

- [[AI Engineer Master Roadmap]]
- [[AI Operations Priorities]]
- [[Agent Operations]]
- [[RAG Evaluation Playbook]]
- [[LLM Ops Toolchain]]
- [[AI Engineer Project Tracker]]
