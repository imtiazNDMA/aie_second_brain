---

tags: [concept, evaluation, reasoning, llm-evaluation, cluster/evaluation]
sources: ["2026-09-12-practical-llm-evaluation-production-systems"]
created: 2026-09-12
updated: 2026-09-12
---


# Process Validity

Evaluation of whether intermediate reasoning steps in a language model's output are logically sound, independent of whether the final answer is correct. Distinguished from **outcome accuracy** (correct final answer) and **reasoning depth** (accuracy stratified by task difficulty/step-count).

## Why It Matters

A model can produce correct answers through flawed reasoning (lucky guesses, post-hoc rationalization) and incorrect answers through sound reasoning (correct process, wrong final step). Process validity captures reasoning quality that outcome accuracy misses.

## Evaluation Dimensions

| Dimension | What It Measures |
|---|---|
| **Final-answer correctness** | Is the output correct? |
| **Process validity** | Are intermediate steps logically sound? |
| **Reasoning depth** | Does accuracy hold as step-count increases? |
| **OOD generalization** | Does reasoning transfer to out-of-distribution problems? |
| **Repeated-trial stability** | Does the same reasoning emerge across multiple samples? |
| **Decoding policy comparison** | How do temperature/top-p changes affect reasoning quality? |
| **Judge calibration** | Does the LLM-as-judge agree with human assessment of reasoning steps? |

## Self-Correcting Reasoning Pipeline

Generate → execute → detect failure → repair → regenerate. This loop is the defining characteristic of modern reasoning evaluation. The pipeline must evaluate not just the final output but each repair cycle's contribution.

## Related

- [[LLM Evaluation Rubrics]] — broader evaluation framework
- [[LLM-as-Judge]] — calibration for reasoning step validation
- [[Chain-of-Thought]] — prompting strategy for explicit reasoning
- [[Reasoning Models]] — models trained for extended reasoning
- [[Budget Forcing]] — controlling reasoning depth at inference
