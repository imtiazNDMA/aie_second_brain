---
title: MT-Bench
type: concept
tags: [evaluation, benchmark, llm]
sources: [2026-04-12-llm-engineers-handbook, 2026-04-12-ultimate-guide-fine-tuning]
created: 2026-04-30
updated: 2026-04-30
---

# MT-Bench

## Definition

**MT-Bench** (Multi-Turn Benchmark, Zheng et al. 2023) is a benchmark for evaluating LLM **chat capability** on multi-turn conversational tasks. It comprises 80 carefully-crafted questions across 8 categories — writing, roleplay, extraction, reasoning, math, coding, knowledge (STEM), and humanities — each with a follow-up question that tests memory, refinement, or shifted instruction.

Models are evaluated using [[LLM-as-Judge]] (typically GPT-4) on a 1–10 absolute scale. MT-Bench scores are reported as the average judge rating, often alongside category breakdowns.

## Why MT-Bench matters

Pre-MT-Bench, LLM evaluation was dominated by:
- **Static benchmarks** ([[MMLU]], HellaSwag) — cover knowledge but not chat usability.
- **Code benchmarks** ([[HumanEval]], MBPP) — narrow domain.
- **Crowdworker arenas** (Chatbot Arena) — high cost, slow turnaround.

MT-Bench occupies the gap: 80 questions is small enough to evaluate in minutes/cents but diverse enough to capture chat strengths and weaknesses, and the multi-turn structure tests something static benchmarks miss — *can the model maintain context, refine answers, and respond to nuanced follow-ups?*

## Question categories (10 questions each)

| Category | What's tested |
|---|---|
| Writing | Creative composition, tone, structure |
| Roleplay | Persona maintenance, dialogue consistency |
| Extraction | Pulling structured info from text |
| Reasoning | Multi-step logical deduction |
| Math | Arithmetic, algebra, word problems |
| Coding | Writing/debugging code |
| STEM Knowledge | Physics, biology, chemistry facts |
| Humanities | History, philosophy, social science |

Each turn 1 question has a related turn 2 question that:
- Asks for a refinement ("Now make it shorter")
- Pivots to a related task ("What if X were different?")
- Tests memory ("Earlier you mentioned Y, expand on it.")

## Judging protocol

1. **Generate** turn 1 response from each model under test.
2. **Generate** turn 2 response, conditioning on turn 1.
3. **Judge** with GPT-4 on a 1–10 scale, given:
   - The question (turn 1 or turn 2).
   - The model's response.
   - For turn 2: turn 1 question and response as context.
   - For math/coding: a reference answer (if available).
4. **Average** across the 80 items per turn, then average across turns.

The result: a single MT-Bench score in $[1, 10]$.

## Two judging modes

### Single-answer grading
Judge sees one response, rates 1–10. Used for the headline MT-Bench score.

### Pairwise grading
Judge sees two responses, picks better or "tie." Used for more reliable model-vs-model comparisons (Chatbot Arena leverages this).

Pairwise is more reliable; single-answer is faster.

## Score interpretation

| Score range | Capability |
|---|---|
| 1–4 | Below conversational coherence |
| 4–6 | Basic chat — answers questions but inconsistent |
| 6–7 | Solid chat — Llama-2-7B-chat range |
| 7–8 | Strong chat — Mistral-7B Instruct, Llama-2-13B-chat |
| 8–9 | Frontier — GPT-3.5, Claude 2 range |
| 9+ | Near-best (GPT-4: 8.99 in original paper) |

The 9 ceiling is largely structural — judges hesitate to give 10s. Models within 0.3 of each other are usually statistically indistinguishable on 80 items.

## Reference scores (original 2023)

| Model | MT-Bench |
|---|---|
| GPT-4 | 8.99 |
| Claude-v1 | 7.90 |
| GPT-3.5-turbo | 7.94 |
| Vicuna-13B | 6.39 |
| Llama-2-13B-chat | 6.65 |
| Vicuna-7B | 6.17 |
| Llama-2-7B-chat | 6.27 |
| Alpaca-13B | 4.53 |

(These have moved up; current frontiers exceed 9.0.)

## When MT-Bench is useful

- **Quick iteration** during fine-tuning — a 7B model can be MT-Bench'd in 5 minutes for ~$0.50 of GPT-4 calls.
- **Sanity check** post-alignment — does DPO/ORPO shift category scores in expected directions?
- **Comparison across model sizes** — scores correlate well with parameter count and training data quality.
- **Regression detection** — same model, new training run, score should not drop.

## Limitations

- **Saturation.** Frontier models are close to the judge's ceiling; differentiation requires Chatbot Arena or harder benchmarks.
- **English-only.** MT-Bench questions are English; multilingual evaluation requires translated variants.
- **Judge bias.** GPT-4-as-judge has a self-enhancement bias when GPT-4 outputs are evaluated. Use a different judge (e.g., Claude) when evaluating GPT-4 outputs.
- **Distribution narrow.** 80 items can miss long-tail capabilities. MT-Bench is a screening tool, not a final answer.
- **Position bias.** In pairwise mode, the order of responses biases the judge ~5–10%. Run both orders.
- **Reproducibility.** Even at temperature 0, model outputs vary slightly; expect ±0.1 score noise.

## MT-Bench-derived benchmarks

| Benchmark | Difference |
|---|---|
| **MT-Bench-101** | 101 multi-turn dialogues with finer rubrics across 13 task types |
| **MT-Bench Hard** | Subset of original 80 where frontier models still fail |
| **PandaLM** | Open judge models trained to replicate MT-Bench evaluation |
| **JudgeLM** | Smaller open judge alternative (~13B) |

Open-judge alternatives reduce the GPT-4 dependency at some cost in agreement.

## Pseudocode

```python
def mt_bench(model, judge="gpt-4-0613"):
    questions = load_mt_bench_80()
    scores = []
    for q in questions:
        # Turn 1
        r1 = model.generate(q.turn1)
        s1 = llm_judge(judge, q.turn1, r1, scale=10)
        # Turn 2 (with turn-1 context)
        r2 = model.generate([q.turn1, r1, q.turn2])
        s2 = llm_judge(judge, q.turn2, r2,
                       context=[q.turn1, r1], scale=10)
        scores.append((q.category, s1, s2))
    
    return {
        "overall": mean([s1 + s2 for _, s1, s2 in scores]) / 2,
        "by_category": groupby_mean(scores, key=lambda x: x[0]),
        "turn1_avg": mean([s1 for _, s1, _ in scores]),
        "turn2_avg": mean([s2 for _, _, s2 in scores]),
    }
```

## Connections

- [[LLM-as-Judge]] — the methodology MT-Bench uses
- [[Model Evaluation]] — broader umbrella
- [[AlpacaEval]] — alternative LLM-as-judge benchmark for instruction following
- [[MMLU]] — knowledge-focused complement (multiple-choice)
- [[GSM8K]] — math-focused complement
- [[HELM]] — broader holistic evaluation framework
- [[LLM Evaluation Rubrics]] — generalization of category-by-category scoring
- [[Direct Preference Optimization]] / [[ORPO]] / [[KTO]] — training methods commonly evaluated with MT-Bench
- [[Fine-Tuning]] — MT-Bench as a fine-tuning regression metric
