---
title: HumanEval
type: concept
tags: [evaluation, benchmark, code-generation, llm]
sources: [2026-04-29-hands-on-llms, 2026-05-09-deepseek-r1]
created: 2026-05-10
updated: 2026-05-10
---

# HumanEval

## Definition

**HumanEval** is the canonical Python function-synthesis benchmark for code-generating LLMs, published by OpenAI in 2021 (Chen et al., *Evaluating Large Language Models Trained on Code*). It contains 164 hand-written programming problems with function signatures, docstrings, and hidden unit tests; a model's score is **pass@k**, the probability that at least one of $k$ generated samples passes all tests.

## How it works

For each problem:

1. The model receives a Python function signature + docstring as the prompt
2. The model generates $n$ completions
3. Each completion is concatenated with the prompt and run against the hidden test suite
4. **pass@k** is computed unbiasedly using:

$$\text{pass@}k = 1 - \binom{n - c}{k} / \binom{n}{k}$$

where $c$ is the number of correct completions out of $n$ (with $n \geq k$).

Standard reporting uses pass@1 (greedy or low-temperature single-sample) and pass@10 / pass@100 (higher-temperature sampling).

## Why it persists

- **Verifiable signal** — tests pass or fail; no LLM-as-judge needed
- **Cheap** — 164 problems × $n$ samples × test runs finishes in minutes
- **Industry-standard reporting** — every code-LLM model card includes it
- **Substrate for [[RLVR]]** — the verifiable signal pairs naturally with reinforcement learning

## Variants

| Variant | What's different |
| --- | --- |
| HumanEval | Original 164 Python problems |
| **HumanEval+** (EvalPlus) | 80× more hidden tests; harder to game; current standard |
| HumanEval-X | Multilingual extension (Python, JS, Java, Go, C++) |
| MBPP | Sister 974-problem benchmark; Python; slightly different style |
| LiveCodeBench | Contamination-resistant; problems published after model cutoff dates |

## Saturation

Top frontier models score >95% pass@1 on plain HumanEval — it no longer discriminates between strong models. **HumanEval+** (with stronger tests) is the modern default; **LiveCodeBench** is the contamination-resistant alternative.

## Failure modes

- **Training-set contamination** — public benchmarks are in pretraining corpora; models may have memorized solutions
- **Saturation at the top** — plain HumanEval can't discriminate Claude / GPT-5 / Gemini frontier
- **Single-function scope** — doesn't measure multi-file or codebase-level coding capability
- **Python-only** — broader real-world use needs multilingual eval

For *agent-mode* coding capability, **SWE-bench Verified** is the contract benchmark — see [[AI Coding Agents]].

## Related Concepts

- [[GSM8K]] — sister verifiable benchmark for math reasoning
- [[MMLU]], [[MT-Bench]] — broader knowledge / chat benchmarks
- [[LLM Evaluation Benchmark Map]] — synthesis placing HumanEval in the eval landscape
- [[AI Coding Agents]] — synthesis on agent-mode coding evaluation
- [[Reasoning Models]] — heavy users of HumanEval as RLVR signal
- [[RLVR]] — paradigm that consumes HumanEval-style verifiable rewards

## Sources

- [[2026-05-09-deepseek-r1]] — reports HumanEval+ in the headline benchmark suite
- [[2026-04-29-hands-on-llms]] — covers code-generation evaluation generally

## Open Questions

- Optimal mix of HumanEval variants for ongoing evaluation
- Practical contamination detection methods for new benchmark releases
