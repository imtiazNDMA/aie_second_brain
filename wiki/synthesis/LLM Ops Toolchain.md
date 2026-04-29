---
title: LLM Ops Toolchain
type: synthesis
tags: [llmops, tooling, workflows]
sources: [2026-04-12-llm-engineers-handbook, 2026-04-12-prompt-engineering-llms, 2026-04-12-ai-agents-in-action]
created: 2026-04-12
updated: 2026-04-12
---

# LLM Ops Toolchain

Maps the full Feature → Training → Inference lifecycle to concrete tools highlighted throughout the wiki so teams can stand up reliable LLM pipelines fast.

## 1. Feature/Data Layer

| Task                            | Tooling                                                               | Notes                                                                                                                    |
| ------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Data ingestion + transformation | [[ZenML]] stacks (orchestrators, artifact stores)                     | Bridges raw scrapers (LinkedIn, Medium, GitHub) into structured corpora for the [[LLM Twin]].                            |
| Embedding/RAG prep              | [[LangChain]] loaders, chunkers, rerankers; Chroma/Pinecone/Deep Lake | Aligns with the workflows in [[LangChain Mini RAG Pipeline]] and [[RAG Evaluation Playbook]].                            |
| Experiment tracking             | [[Comet ML]]                                                          | Stores datasets, pipeline metadata, and evaluation metrics; referenced heavily in [[2026-04-12-llm-engineers-handbook]]. |

## 2. Training / Adaptation

| Stage | Tooling | Notes |
| --- | --- | --- |
| PEFT / fine-tuning orchestration | [[ZenML]] pipelines calling Hugging Face / DeepSpeed jobs | Handles Stage 4 of the [[Seven-Stage Fine-Tuning Pipeline]]. |
| Preference alignment | DPO scripts + Comet logging | Keeps adapter updates traceable; see [[Direct Preference Optimization]]. |
| Safety evals | Llama Guard / Shield Gemma workflows from *Ultimate Guide* | Gate models before deployment. |

## 3. Prompt & Agent Ops

| Need | Tooling | Notes |
| --- | --- | --- |
| Prompt design + DAGs | [[Prompt Flow]] | Acts as the profile IDE in [[2026-04-12-ai-agents-in-action]]; integrates with SOMA rubrics. |
| Offline evaluation | [[Prompt Flow SOMA Evaluation]], [[LLM Evaluation Rubrics]] | Automate SOMA/brand rubrics; feed failing examples back to training. |
| Online tracing | [[Opik]] (prompt traces), [[AgentOps]] (multi-agent runs) | Detect drift, looping, and latency spikes post-deployment. |

## 4. Deployment & Serving

| Need | Tooling | Notes |
| --- | --- | --- |
| Torch runtime | [[PyTorch TorchScript Export]] → C++/TorchServe | Produces portable artifacts beyond notebooks. |
| RAG inference | [[LangChain Mini RAG Pipeline]], [[Knowledge-Graph Indexing]] | Compose retrievers + rerankers for API endpoints. |
| Monitoring dashboards | Opik dashboards, AgentOps timelines, Comet inference logging | Mirror the “trust stack” recommendations in [[Agent Trust and Safety Controls]]. |

## Recommendations

1. Treat ZenML/Comet as the “source of truth” for every experiment and prompt revision—link Prompt Flow profile IDs back to those runs.
2. Wire Opik + AgentOps webhooks into incident response so prompt/agent regressions page the same on-call rotation as model drift.
3. Keep your RAG and PEFT pipelines under the same observability umbrella; [[RAG Evaluation Playbook]] metrics should sit next to training dashboards.
