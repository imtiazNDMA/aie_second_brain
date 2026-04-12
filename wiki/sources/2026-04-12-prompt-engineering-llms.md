---
title: Prompt Engineering for LLMs
type: source
tags: [prompting, llm, applications]
sources: [prompt engineering for llms.pdf]
created: 2026-04-12
updated: 2026-04-12
---

# [[Prompt Engineering]] for LLMs

**Authors:** [[John Berryman]], [[Albert Ziegler]]  
**Publisher:** O’Reilly (2025)  
**Date ingested:** 2026-04-12  
**Type:** book

## Summary

Two GitHub Copilot veterans demystify how to interact with large language models across the full application lifecycle. After explaining transformers, RLHF, and the move from completion APIs to chat/tool interfaces, the book lays out a design methodology: understand the user’s problem, curate/contextualize inputs, assemble structured prompts, tame model behavior, and evaluate loops before/after launch. Later chapters focus on conversational agents, multi-step workflows, and rigorous evaluation (offline test suites, SOMA rubric, online metrics). The conclusion surveys future trends like multimodal prompts and evolving UX patterns.

## Key Claims

- LLMs remain probabilistic autocomplete engines; effective prompts mirror training distributions, stay concise, and respect token budgets.
- [[Prompt Engineering]] is more than clever wording—it’s system design involving context sourcing, feedforward loops, and evaluation checkpoints.
- RLHF enables conversational behavior but introduces an alignment tax; engineers must balance safety vs responsiveness.
- Tool-enabled agents demand structured schemas, reasoning styles (CoT, ReAct), and UX cues that manage user trust.
- Evaluation must be continuous: offline suites (SOMA) catch regressions, while online telemetry validates real-world performance.

## Structure

- **Chapter 1 — Introduction:** Frames [[Prompt Engineering]] as translating user intent into model-friendly instructions.
- **Chapter 2 — Understanding LLMs:** Explains [[Tokenization]], attention, decoding controls (temperature, nucleus sampling), and context limits.
- **Chapter 3 — Moving to chat:** Details RLHF pipelines, alignment trade-offs, chat vs completion APIs, and tool-calling protocols.
- **Chapter 4 — Designing LLM applications:** Introduces the [[LLM Application Loop]] and feedforward pass structure.
- **Chapter 5 — Prompt content:** Covers sourcing information, clarifying questions, few-shot examples, and retrieval inserts.
- **Chapter 6 — Assembling the prompt:** Provides templates, formatting strategies, and positional reasoning.
- **Chapter 7 — Taming the model:** Focuses on steering outputs with preambles, delimiters, logprobs, and classification prompts.
- **Chapter 8 — Conversational agency:** Teaches tool schemas, reasoning patterns, and UX cues for agents.
- **Chapter 9 — LLM workflows:** Discusses task decomposition, orchestration, delegation, and marketing workflows.
- **Chapter 10 — Evaluating applications:** Presents offline testing, SOMA rubric, sample mining, and online A/B setups.
- **Chapter 11 — The future:** Looks at multimodal inputs, evolving UX, and long-horizon autonomy.

## Entities Mentioned

- [[John Berryman]] — Author, Copilot engineer, Arcturus Labs founder.
- [[Albert Ziegler]] — Author, Copilot founding engineer.

## Concepts Covered

- [[Prompt Engineering]] — Expanded techniques and tooling.
- [[LLM Application Loop]] — Feedforward framework.
- [[SOMA Evaluation Framework]] — Structured rubric for prompts.
- [[RLHF]] — Chat alignment process (will update concept with alignment tax insights).
- [[Tool Use]], [[Reflection]], [[Agentic Systems]] — Conversational agency guidance.
