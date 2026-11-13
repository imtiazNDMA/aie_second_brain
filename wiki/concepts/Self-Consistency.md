---

title: Self-Consistency
type: concept
tags: [prompting, reasoning, sampling, cluster/reasoning-prompting]
sources: [2026-04-12-ai-agents-in-action, 2026-04-12-prompt-engineering-llms, 2026-11-13-build-a-reasoning-model-from-scratch]
created: 2026-04-30
updated: 2026-11-13
---


# Self-Consistency

## Definition

**Self-Consistency** is a decoding strategy for [[Chain-of-Thought]] introduced by Wang et al. 2022. Instead of generating one greedy reasoning chain, sample $K$ chains with non-zero temperature, then pick the answer that the **majority** of chains agree on. The intuition: there are many valid reasoning paths to a correct answer but each *wrong* answer tends to be wrong in its own way — so correct answers cluster, wrong answers scatter.

## Algorithm

```python
def self_consistency(prompt, model, K=40, temperature=0.7):
    samples = [model.generate(prompt + COT_TRIGGER,
                              temperature=temperature) for _ in range(K)]
    answers = [extract_final_answer(s) for s in samples]
    return collections.Counter(answers).most_common(1)[0][0]
```

The trigger is the same as zero-shot CoT (`Let's think step by step.`) or a few-shot CoT block.

## Why it works — Marginalization

Recall the marginal in [[Chain-of-Thought]]:

$$p_\theta(y \mid x) = \sum_{z} p_\theta(y \mid x, z) \, p_\theta(z \mid x)$$

Greedy CoT picks one $z$. Self-consistency is a Monte-Carlo estimate of this marginal:

$$\hat{p}(y \mid x) = \frac{1}{K} \sum_{k=1}^{K} \mathbb{1}[y_k = y]$$

Picking $\arg\max_y \hat{p}(y \mid x)$ approximates $\arg\max_y p_\theta(y \mid x)$ — the *posterior mode over answers* rather than the *mode of one chain*. When the model is well-calibrated on its reasoning, the posterior is sharper than any single chain.

## Empirical gains

| Task | Greedy CoT | Self-Consistency $K{=}40$ | Δ |
|---|---|---|---|
| GSM8K (PaLM 540B) | 56.5% | 74.4% | +17.9 |
| MultiArith | 92.6% | 99.3% | +6.7 |
| ARC-Challenge | 85.2% | 88.7% | +3.5 |
| StrategyQA | 75.3% | 81.6% | +6.3 |

Gains grow with problem difficulty and saturate around $K=20$–40.

## Variants

### 1. Weighted self-consistency
Weight each chain by its log-probability (sum of token logprobs of the answer span). Penalizes very low-probability chains that voted by chance.

### 2. Universal self-consistency (USC)
For tasks without a discrete answer, ask a *judge* model to pick the most consistent free-form response among the $K$ samples. Extends self-consistency to open-ended generation.

### 3. Iterative self-consistency
Treat the majority answer as a hint; re-prompt the model with that hint and sample again. Compounds gains on hard problems but can cement errors.

### 4. Adaptive sampling
Stop sampling once one answer has clear majority (e.g., 60% of $K_{\min}$). Saves compute on easy questions.

## When self-consistency helps

- **Discrete-answer tasks** — math, multiple choice, classification, code with a unique output.
- **Tasks where wrong answers are diverse** — the disagreement penalty kicks in.
- **High-stakes / low-throughput** queries where extra latency is acceptable.

## When it doesn't

- **Open-ended generation** — no obvious quantization step (use USC instead).
- **Tasks where the model is *confidently wrong*** — every sample agrees on the same wrong answer.
- **Tight latency budgets** — $K{=}40$ inflates cost 40×.

## Practical knobs

| Knob | Typical | Notes |
|---|---|---|
| $K$ (samples) | 5–40 | Diminishing returns past 20 |
| Temperature | 0.5–0.7 | Too low → samples collapse; too high → reasoning degrades |
| Top-$p$ | 0.9–1.0 | Truncates tail without forcing exploration |
| Stop sequence | `Q:` or task-specific | Prevents run-on |
| Answer extractor | Regex / structured tag | Critical: malformed extraction = silent failure |

## Failure mode: confidently wrong

If the model's *systematic* bias matches the wrong answer (e.g., a known math illusion), all $K$ samples agree on the wrong thing. Self-consistency cannot fix this — only [[Reflexion]] (or external verification) can.

## Compute trade-off

Self-consistency typically needs 10–40× the compute of greedy CoT for ~10–20 absolute-percentage gains on reasoning. For production RAG pipelines, use $K=3$–5 with temperature 0.5 as a cheap floor.

## Test-time compute framing

Self-consistency is the canonical **parallel** form of [[Test-Time Compute Scaling]] — spending K× more inference compute by sampling K reasoning chains in parallel. Compare to [[Budget Forcing]] (sequential extension of one chain) and [[Tree-of-Thought]] (search-based) — the three families of test-time compute spending. For [[Reasoning Models]] (DeepSeek-R1, s1), self-consistency composes with the model's native long-form thinking for additional gains.

## Small-model evidence: *Build a Reasoning Model (From Scratch)*

Raschka (2026) implements self-consistency from scratch on [[Qwen3]] 0.6B and scores it on all 500 [[MATH-500]] problems. The paper is Wang et al., arXiv 2203.11171; note the book misprints the ID on p128. Sampling uses temperature 0.9 and top-p 0.9 ([[Nucleus Sampling]]).

**Table 4.1 (p133):**

| Method | Model | Accuracy | Time |
|---|---|---|---|
| Greedy baseline | Base | 15.2% | 10.1 min |
| CoT ("Explain step by step.") | Base | 40.6% | 84.5 min |
| Top-p + SC n=3 | Base | 29.6% | 97.6 min |
| Top-p + SC n=10 | Base | 31.6% | 300.4 min |
| Top-p + CoT | Base | 33.4% | 129.2 min |
| SC n=3 + top-p + CoT | Base | 42.2% | 211.6 min |
| SC n=5 + top-p + CoT | Base | 48.0% | 452.9 min |
| SC n=10 + top-p + CoT | Base | 52.0% | 862.6 min |
| Greedy baseline | Reasoning | 48.2% | 182.1 min |
| SC n=3 + top-p + CoT | Reasoning | 55.2% | 544.4 min |

What the table shows (p134):
- **Without CoT, more samples barely helped:** n=10 gave 31.6% against 29.6% for n=3.
- **Sampling on its own hurt CoT:** 33.4% against 40.6% for greedy CoT. Voting recovered and exceeded that loss.
- **SC + CoT with n=10 beat the trained reasoning model's greedy score:** 52.0% against 48.2%, but at about 85× the baseline runtime.

**Contrast with the "saturates around K=20–40" claim above.** On this 0.6B model, gains without CoT were already flat between n=3 and n=10. The saturation point depends on model and task.

**Breaking ties and best-of-N** (Tables B.3 and B.4, base model + CoT, n=3):

| Selection rule | Accuracy |
|---|---|
| Majority vote, first answer wins ties | 43.2% |
| Majority vote + heuristic tie-break (see [[Self-Refinement]] for the scorers) | 43.4% |
| Majority vote + average-logprob tie-break | 44.8% |
| Best-of-N with heuristic score (no vote) | 40.6% |
| Best-of-N with average logprob (no vote) | 43.2% |

This agrees with the book's citation of Wang et al. 2025 (arXiv 2504.14047): "when applicable, majority voting often gives better results" than best-of-N (p309).

**Implementation details:**
- **Early stopping.** Stop as soon as one answer holds more than half of `num_samples` (exercise 4.4).
- **Parallel by construction.** Samples are independent, so they parallelize across GPUs without adding user latency (p103–104).
- **Settings to start from:** temperature about 0.5–0.9 and top-p about 0.7–0.9. If samples come out near-identical, raise them. If they come out nonsensical, lower the temperature first (p132).
- **The main limitation.** Voting needs a short, extractable final answer, so it is hard to apply to open-ended tasks. This motivates [[Self-Refinement]] (p134).
- **Production use.** The book cites Claude 4 as using parallel sampling (p98). It speculates that Gemini 3 Deep Think and DeepSeekMath-V2 use SC-like scaling (p137, p309).

## Connections

- [[Chain-of-Thought]] — the substrate
- [[Tree-of-Thought]] — replaces flat sampling with structured search
- [[Test-Time Compute Scaling]] — Self-Consistency is the parallel-sampling family member
- [[Reasoning Models]] — composes with native long-form reasoning
- [[Budget Forcing]] — sequential alternative for spending test-time compute
- [[ReAct]] — self-consistency layered over agent trajectories
- [[Reflexion]] — adds memory-guided retries on top
- [[Reasoning Strategies]] — taxonomy
- [[Beam Search]] — token-level analog
- [[Inference Optimization]] — compute considerations
- [[Self-Refinement]] — sequential alternative that works for open-ended answers
- [[Nucleus Sampling]] — temperature and top-p settings that produce diverse samples
- [[MATH-500]] — benchmark used in the Raschka experiments above

## Sources

- [[2026-04-12-ai-agents-in-action]]
- [[2026-04-12-prompt-engineering-llms]]
- [[2026-11-13-build-a-reasoning-model-from-scratch]] — Raschka 2026; from-scratch SC on Qwen3 0.6B, Tables 4.1, B.3, B.4
