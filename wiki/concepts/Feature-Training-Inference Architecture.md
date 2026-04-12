---
tags: [architecture, mlops, llm]
sources: [2026-04-12-llm-engineers-handbook]
created: 2026-04-12
updated: 2026-04-12
---

# Feature-Training-Inference Architecture

## Definition

System blueprint that separates the LLM lifecycle into feature extraction, training/adaptation, and inference/deployment stages. Provides modularity and clear interfaces for data, modeling, and serving teams.

## Highlights

- Feature pipelines feed both supervised [[Fine-Tuning]] and retrieval workflows.
- Training stage spans SFT, preference alignment, and evaluation, with artifacts logged in registries (Hugging Face Hub, Comet, [[ZenML]]).
- Inference stage optimizes decoding, integrates RAG modules, and exposes APIs (FastAPI, SageMaker) with monitoring ([[Opik]], custom dashboards).

## Related Concepts

- [[LLM Twin]]
- [[Prompt Flow]]
