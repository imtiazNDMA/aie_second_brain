---
tags: [llm, prompting, engineering]
sources: [Building LLMs for Production.pdf, AI Agents in Action.pdf, 2026-04-12-prompt-engineering-llms]
created: 2026-04-12
updated: 2026-04-12
---

# Prompt Engineering

## Definition

The practice of crafting effective inputs (prompts) to get better and more reliable outputs from large language models. Includes techniques like few-shot learning, chain-of-thought reasoning, persona design, and structured prompt templates.

## Techniques

- **Detailed queries** — Specify context, desired depth, and constraints to reduce vague answers.
- **Personas + roles** — Capture tone and guardrails (“Calculus tutor”, “Culinary companion”) so assistants stay on-mission.
- **Delimiters** — Use XML, markdown fences, or explicit markers so models separate instructions from data files.
- **Explicit steps** — Ask for numbered plans or “think step by step” guidance to elicit reasoning.
- **Examples** — Provide few-shot references that demonstrate target style or format.
- **Output controls** — Cap word counts or request JSON/YAML to ensure downstream parsers succeed.
- **Context triage** — Gather clarifying questions, static instructions, examples, and retrieval snippets before assembling the final prompt.
- **Feedforward loops** — Translate user problems into model-friendly prompts, run inference, then map results back to the user domain with evaluation hooks (see [[LLM Application Loop]]).
- **Evaluation (SOMA)** — Apply Subject/Objective/Medium/Audience rubrics and telemetry to catch regressions.

## Related Concepts

- [[Retrieval-Augmented Generation]] — Combining prompting with external knowledge retrieval
- [[Fine-Tuning]] — Alternative approach to customize model behavior
- [[Inference Optimization]] — Complementary technique for production efficiency

## Sources

- [[2026-04-12-building-llms-for-production]] — Production prompts for shipping systems
- [[2026-04-12-ai-agents-in-action]] — Adds personas, delimiters, explicit steps, and assistant builder workflows
- [[2026-04-12-prompt-engineering-llms]] — Documents feedforward loops, SOMA evaluation, and conversational agency patterns

## Open Questions

- How do different models respond to different prompting techniques?
- What are the limits of prompt engineering vs [[Fine-Tuning]]?
