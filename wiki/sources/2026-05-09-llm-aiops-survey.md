---
title: "A Survey of AIOps in the Era of Large Language Models"
type: source
authors: [Lingzhe Zhang, et al., Philip S. Yu]
tags: [aiops, llm4aiops, llmops, observability, survey, incident-management]
sources: [arxiv:2507.12472]
venue: ACM Computing Surveys (CSUR), accepted
created: 2026-05-09
updated: 2026-05-09
---

# A Survey of AIOps in the Era of Large Language Models

**arXiv:** [2507.12472](https://arxiv.org/abs/2507.12472)
**Date submitted:** July 16, 2025
**Venue:** **ACM Computing Surveys (CSUR)** — accepted (extended version of arXiv:2406.11213)
**Lead author:** Lingzhe Zhang. Senior author: **Philip S. Yu** (foundational data-mining and AI researcher)

## Summary

Comprehensive survey of **183 peer-reviewed papers (Jan 2020 – Dec 2024)** on the intersection of LLMs and IT operations (AIOps). Organized around four research questions: (RQ1) what data sources are now available; (RQ2) how have AIOps tasks evolved; (RQ3) what LLM techniques are being applied; (RQ4) how are LLM-integrated AIOps systems evaluated. Distinguishes **LLM4AIOps** as a discipline that uses LLMs to *do* AIOps work, separate from [[LLMOps]] which is the operations of the LLMs themselves.

## Key Takeaways

### LLM4AIOps vs LLMOps — terminology

- **LLM4AIOps**: applying LLMs (and agents) to *traditional* IT-operations tasks — incident triage, root-cause analysis, log summarization, runbook generation, anomaly diagnosis.
- **LLMOps**: the lifecycle operations of LLM systems themselves — prompt management, eval, deployment, drift, cost.
- **AIOps-LLMOps Convergence**: the operational practice when LLMs *both* run the operations *and* are themselves the systems being operated.

### RQ1 — Data sources LLMs unlock

- **Legacy unstructured data**: LLMs can now extract structure from runbooks, postmortems, ticket histories, Slack threads, internal wikis — sources previously unusable.
- **Cross-modal correlation**: link logs ↔ traces ↔ metrics ↔ topology ↔ natural-language ticket text in a single context.
- **Synthetic incident data**: LLMs generate plausible failure scenarios for training and tabletop exercises.

### RQ2 — Task evolution

Traditional AIOps tasks (anomaly detection, alert correlation, log clustering) are being reframed as **conversation tasks**:
- **Failure ticket triage** — classify, prioritize, route incidents from natural-language descriptions
- **Root-cause analysis** — multi-hop reasoning over telemetry + topology + history
- **Runbook generation / execution** — synthesize remediation steps from incident context
- **Log analysis** — anomaly detection via LLM perplexity; semantic deduplication
- **Code-fix suggestion** — agent-generated patches for known incident classes
- **Capacity planning narratives** — explain forecasts in natural language to non-experts

New tasks unlocked by LLMs: **interactive incident commander assistants**, **continuous runbook validation**, **postmortem auto-drafting**.

### RQ3 — LLM techniques deployed

- **In-context learning** — feed runbooks into prompts for one-shot incident handling
- **RAG over operational corpora** — retrieve from incident history, documentation
- **Fine-tuning on operational logs** — domain adaptation for log-format peculiarities
- **Agentic loops** — perceive → diagnose → propose → execute (with human approval)
- **Tool use** — LLM calls observability APIs, runs `kubectl describe`, queries metrics

### RQ4 — Evaluation gaps

- Traditional ML metrics (precision/recall on incident-class labels) **don't capture the value of natural-language explanations**.
- Need new benchmarks combining **task success + diagnosis quality + remediation safety**.
- Production systems must evaluate **drift in incident-class distribution** as the system itself changes.
- Human-in-the-loop evaluation remains the gold standard for actionability.

### Open research challenges

- **Hallucination in incident contexts** — LLM confidently citing nonexistent systems is operationally dangerous
- **Latency budgets** — incident response cannot wait for slow LLMs
- **Privacy / data residency** — operational logs contain PII, secrets, compliance scope
- **Skill atrophy** — automation of diagnostic reasoning may erode operator expertise
- **Agentic safety** — full autonomy on production systems requires robust guardrails

## Why this matters for the wiki

Your existing [[AIOps]] page covers traditional ML-driven operations and your [[AIOps-LLMOps Convergence for Agent Operations]] synthesis bridges the two — but neither captures the **task-level taxonomy** of how LLMs are reshaping AIOps. This survey provides exactly that classification, plus a list of evaluation pitfalls. Will create [[LLM4AIOps]] (concept) and add [[Philip S. Yu]] (entity, foundational researcher).

## Connections

- [[Lingzhe Zhang]] — lead author (new entity)
- [[Philip S. Yu]] — senior author, foundational researcher (new entity)
- [[LLM4AIOps]] — concept (new)
- [[AIOps]] (existing — to enrich with task taxonomy)
- [[AIOps-LLMOps Convergence for Agent Operations]] (existing — to cross-reference)

## Related Concepts

- [[LLM4AIOps]] (new — primary contribution category)
- [[AIOps]] (existing — to be enriched)
- [[LLMOps]] (existing — distinct discipline)
- [[AIOps-LLMOps Convergence for Agent Operations]] (existing — convergence synthesis)
- [[ML Monitoring]] (related — observability foundations)
- [[Agentic Systems]] (related — incident commander agents)
- [[Tool Use]] (related — agent calls to operational APIs)
- [[RAG Evaluation Playbook]] (related — retrieval over runbooks)
