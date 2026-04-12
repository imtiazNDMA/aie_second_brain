---
tags: [evaluation, rubric, prompt-testing]
sources: [[2026-04-12-ai-agents-in-action], 2026-04-12-prompt-engineering-llms]
created: 2026-04-12
updated: 2026-04-12
---

# LLM Evaluation Rubrics

## Definition

Structured criteria (objective, scale, scoring descriptions) applied to LLM outputs to assess qualities such as subject alignment, tone, or factual grounding.

## Guidance

- Define objectives and measurable criteria before testing prompt changes.
- Use 1–5 scales with textual anchors so graders (human or LLM) interpret scores consistently.
- Embed rubric prompts inside [[Prompt Flow]] evaluation nodes or [[Semantic Kernel]] evaluators to automate scoring.
- Parse evaluator outputs into JSON to compare prompt profiles, run batch tests, and gate agent deployments.
- Apply specialized frameworks like [[SOMA Evaluation Framework]] (Subject, Objective, Medium, Audience) from *[[Prompt Engineering]] for LLMs* to keep prompts aligned with brand/style.

## Related Concepts

- [[Reasoning Strategies]] — Rubrics can evaluate reasoning depth and correctness.
- [[Prompt Flow]] — Hosts automated evaluation nodes.
