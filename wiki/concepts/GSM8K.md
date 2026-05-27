---
title: GSM8K
type: concept
tags: [evaluation, benchmark, math, reasoning, llm]
sources: [2026-04-12-build-llm-from-scratch, 2026-04-12-prompt-engineering-llms]
created: 2026-04-30
updated: 2026-04-30
---

# GSM8K

## Definition

**GSM8K** — *Grade School Math 8K* (Cobbe et al. 2021) — is a benchmark of 8,500 high-quality grade-school math word problems, designed by OpenAI to evaluate **multi-step arithmetic reasoning** in language models. Each problem requires 2–8 reasoning steps using basic arithmetic operations; the answer is a single integer or simple fraction.

GSM8K is the canonical benchmark for **math reasoning** in LLMs and one of the standard scores reported in every frontier model release.

## Why GSM8K matters

Pre-GSM8K, reasoning was tested by:
- **MATH benchmark** — competition-level problems; too hard for early LLMs (5% accuracy).
- **AddSub, MultiArith** — single-step arithmetic; too easy.
- **Logic puzzles** — narrow domain.

GSM8K hit the sweet spot: requires *real* multi-step reasoning, but solvable by humans within minutes per problem. This is the regime where [[Chain-of-Thought]] was discovered to help massively (Wei et al. 2022 reported ~17% accuracy without CoT → ~57% with CoT on PaLM-540B).

## Problem structure

Every problem follows a similar template:

```
Question: Janet's ducks lay 16 eggs per day. She eats three for breakfast 
every morning and bakes muffins for her friends every day with four. She 
sells the remainder at the farmers' market daily for $2 per fresh duck egg. 
How much in dollars does she make every day at the farmers' market?

Solution:
Janet sells 16 - 3 - 4 = 9 duck eggs a day.
She makes 9 * 2 = $18 every day at the farmers' market.

Answer: 18
```

The dataset includes:
- **Question** — natural language word problem.
- **Solution** — step-by-step reasoning chain (used for training, also published as ground-truth CoT).
- **Answer** — single integer or fraction in canonical form.

Splits: 7,473 train, 1,319 test.

## Why this is hard for LLMs

Three properties make GSM8K reveal reasoning ability:

### 1. Cannot be solved by surface heuristics
Many NLP benchmarks can be partially gamed by length cues, keyword matching, or template detection. GSM8K problems vary in surface form; the *only* reliable solver is correct arithmetic.

### 2. Requires intermediate computation
A 4-step problem cannot be solved in a single forward pass — even at temperature 0, the model needs to allocate compute to intermediate values. This is what CoT exploits.

### 3. Answer-correctness is unforgiving
Off-by-one or wrong-sign errors yield wrong final answers. Unlike narrative tasks where partial credit is possible, GSM8K is exact-match: $\hat{y} = y$ or wrong.

## Evaluation protocol

Standard reporting:

1. **Prompt** the model with the question and (optionally) few-shot CoT exemplars.
2. **Generate** at temperature 0, stopping at "Answer:" or end-of-sequence.
3. **Extract** the integer following "Answer:" (or the last number in the response).
4. **Compare** to ground truth — exact match.

Optional: **maj@K** (majority vote across $K$ samples at non-zero temperature) — see [[Self-Consistency]]. This typically adds 5–15 points.

The headline metric is **exact-match accuracy on the 1,319-item test set**.

## Reference scores

| Model | GSM8K (8-shot CoT) | maj@40 |
|---|---|---|
| Direct (no CoT), GPT-3 175B | 7% | — |
| GPT-3 175B + CoT | 56% | — |
| PaLM-540B + CoT | 56.5% | 74.4% |
| GPT-3.5 | 57.1% | 74.7% |
| Claude-2 | 71.2% | — |
| GPT-4 | 92.0% | 95.0% |
| Llama-2 70B | 56.8% | — |
| Llama-3 70B | 80.6% | — |
| Llama-3.1 405B | 96.8% | — |
| Claude 3 Opus | 95.0% | — |

The frontier is now near the human-grade-school ceiling. Further differentiation requires **GSM-Hard** or **MATH** (high school competition level).

## Variants

### GSM-Hard
Cobbe 2021 supplementary — replaces small numbers (e.g., 16) with larger ones (e.g., 91,567,234) to test arithmetic capability rather than memorization. Frontier models drop 10–20 points.

### GSM8K-CoT-Forge / Augmented
Synthetic-data variants that augment the training set for fine-tuning math models.

### MATH-500 / MATH benchmark
Hendrycks et al. — competition-level problems (AMC/AIME). The next-step-up benchmark when GSM8K saturates.

### TheoremQA
Theorem-based questions requiring symbolic manipulation. Tests deeper math knowledge.

## How CoT interacts with GSM8K

GSM8K is the canonical example of CoT's emergent capability:

| Method | GSM8K accuracy (PaLM-540B) |
|---|---|
| Direct prompting | 7% |
| **+ Chain-of-Thought** | **57%** |
| + CoT + [[Self-Consistency]] (maj@40) | 74% |
| + CoT + program-aided language models | 80%+ |

The 50-point lift from CoT alone established the technique. Newer reasoning techniques (e.g., **Process Reward Models**, **Step-DPO**) further improve over CoT.

## Pitfalls

- **Saturation.** Frontier models > 95%. Margins are noise; switch to MATH or GSM-Hard for differentiation.
- **Number leakage.** GSM8K is on GitHub, in many web crawls; check for memorization with GSM-Hard.
- **Calculator augmentation conflation.** A model with code-interpreter or symbolic-solver tooling effectively delegates arithmetic to a calculator. Report tool-augmented results separately from base-model results.
- **Few-shot exemplar drift.** Exemplar choice changes accuracy by 3–8 points. Use the standard 8-shot Cobbe exemplars for comparable scores.
- **Temperature variance.** maj@40 at temperature 0.7 has ±1 point noise across runs.

## When to use GSM8K

- **Pretraining math signal.** Does increased pretraining data improve math?
- **CoT regression check.** Does fine-tuning preserve CoT-elicitable reasoning?
- **Reasoning ablation.** Compare DPO/ORPO impact on reasoning vs chat.
- **Fast iteration.** 1,319 items × ~200 tokens each = quick to evaluate (<5 min on a 7B model).

## When it isn't

- **Frontier comparison.** GSM8K saturates above 95%.
- **Real-world math.** Grade-school problems are not adult math (no calculus, statistics, theory).
- **Tool-use evaluation.** GSM8K is closed-book — doesn't test calculator/Python use.
- **Multi-modal math.** Word problems only — no diagrams.

## Pseudocode

```python
import re

def score_gsm8k(model, k=8, cot_exemplars=None):
    test_items = load_gsm8k_test()  # 1319 items
    prompt_prefix = format_cot_exemplars(cot_exemplars or default_exemplars)
    
    correct = 0
    for item in test_items:
        prompt = prompt_prefix + f"\nQuestion: {item.question}\nAnswer:"
        out = model.generate(prompt, temperature=0, max_tokens=512,
                             stop=["\nQuestion:"])
        # Extract last integer in output
        nums = re.findall(r"-?\d+", out.replace(",", ""))
        pred = int(nums[-1]) if nums else None
        if pred == item.answer:
            correct += 1
    
    return correct / len(test_items)
```

## Connections

- [[Chain-of-Thought]] — GSM8K is the canonical CoT benchmark
- [[Self-Consistency]] — maj@K consistently lifts GSM8K
- [[Tree-of-Thought]] — orthogonal reasoning lift
- [[Reflexion]] — failure-aware retry on hard problems
- [[Model Evaluation]] — umbrella
- [[MT-Bench]] — chat counterpart
- [[MMLU]] — knowledge counterpart
- [[Process Reward Model]] — newer technique for math reasoning
- [[Reasoning Strategies]] — taxonomy
- [[LLM-as-Judge]] — *not* used here (exact-match scoring)
