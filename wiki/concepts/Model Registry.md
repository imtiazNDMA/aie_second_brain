---

title: Model Registry
type: concept
tags: [mlops, model-management, deployment, reproducibility, cluster/mlops-llmops]
sources: [2026-04-12-ai-engineering, 2026-04-29-llmops-managing-large-language-models-in-production]
created: 2026-07-10
updated: 2026-07-10
---


# Model Registry

## Definition

A Model Registry is the system of record for trained models and their deployment metadata. In [[MLOps]], it tracks which model versions exist, how they were produced, what data and code they depend on, what evaluations they passed, and which environments they are approved to serve.

## Why it matters

- Prevents confusion about which model is in production.
- Connects deployed artifacts to training runs, datasets, and metrics.
- Supports promotion workflows such as development -> staging -> production.
- Enables rollback when quality or operational regressions appear.

## Typical metadata stored

- model name and version
- training dataset or data snapshot
- code commit or pipeline run ID
- evaluation metrics
- artifact location
- approval status
- deployment environment history

## Operational workflow

1. Train a model and produce an artifact.
2. Register the artifact with lineage metadata.
3. Attach offline evaluation and validation results.
4. Promote the model to staging or production after review.
5. Track rollback, replacement, and retirement states over time.

## In the LLM era

The same idea extends to adapters, embedding models, rerankers, safety classifiers, and even composite application bundles. [[LLMOps]] broadens the registry scope, but the core MLOps registry pattern still applies.

## Related concepts

- [[MLOps]]
- [[ML Monitoring]]
- [[Continuous Training]]
- [[LLMOps]]
- [[Feature Store]]

## Sources

- [[2026-04-12-ai-engineering]]
- [[2026-04-29-llmops-managing-large-language-models-in-production]]
