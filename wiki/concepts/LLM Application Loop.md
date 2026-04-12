---
tags: [architecture, prompt, applications]
sources: [2026-04-12-prompt-engineering-llms]
created: 2026-04-12
updated: 2026-04-12
---

# LLM Application Loop

## Definition

Design pattern from *[[Prompt Engineering]] for LLMs* that frames each app as a loop: understand the user’s problem, translate it into the model domain, generate responses, and convert back to user-facing outputs with evaluation checkpoints.

## Components

- **Feedforward pass** – Structured prompt assembly, model invocation, and post-processing.
- **Context triage** – Selecting static instructions, examples, and retrieved snippets before packing the prompt.
- **Evaluation hooks** – Offline suites (SOMA) and online A/B metrics to validate loop quality.

## Related Concepts

- [[Prompt Engineering]]
- [[SOMA Evaluation Framework]]