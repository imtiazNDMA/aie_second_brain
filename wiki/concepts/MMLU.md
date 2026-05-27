---
title: MMLU
type: concept
tags: [evaluation, benchmark, knowledge, llm]
sources: [2026-04-12-build-llm-from-scratch, 2026-04-12-llm-engineers-handbook]
created: 2026-04-30
updated: 2026-04-30
---

# MMLU

## Definition

**MMLU** — *Massive Multitask Language Understanding* (Hendrycks et al. 2020) — is a multiple-choice benchmark designed to measure knowledge breadth and reasoning across 57 academic and professional domains. It contains ~15,900 questions ranging from high-school level to expert-professional, with each question having four answer choices and one correct answer.

It became the de-facto standard for **knowledge benchmarking** of frontier LLMs and is universally reported alongside [[GSM8K]] (math), [[HumanEval]] (code), and [[MT-Bench]] (chat) in model release papers.

## Why MMLU matters

Pre-MMLU benchmarks were either:
- **Narrow** (SQuAD, GLUE — natural language understanding tasks).
- **Easy** (HellaSwag — common-sense completion, saturated by GPT-3 era).
- **Adversarial-only** (TruthfulQA — designed to expose LLM weaknesses, not measure breadth).

MMLU's contribution: a *breadth* metric. A model that scores 70% on MMLU has demonstrably absorbed academic content from disparate domains. A 50% scorer is at the random-baseline floor (4-choice → 25% chance) plus moderate knowledge.

## Subject categories

The 57 tasks group into four super-categories:

### Humanities (13 tasks)
World religions, philosophy, formal logic, prehistory, US history, world history, etc.

### Social Sciences (12 tasks)
Public relations, sociology, psychology, economics (high school + college), etc.

### STEM (18 tasks)
Math (elementary, high school, college, abstract), physics, chemistry, biology, computer science, electrical engineering, etc.

### Other / Professional (14 tasks)
Medical genetics, professional medicine, professional law, accounting, marketing, business ethics, etc.

This breadth is the point. A 60% on STEM but 30% on humanities reveals a model trained heavily on technical corpora and lightly on generalist content.

## Format

Each question is a multiple-choice item:

```
Question: In the United States, which amendment guarantees freedom of speech?
A. First Amendment
B. Fifth Amendment
C. Tenth Amendment
D. Fourteenth Amendment

Answer: A
```

Models are typically evaluated in one of three modes:

### 1. Zero-shot
Direct prompting with the question and choices. Model outputs a letter.

### 2. Few-shot (5-shot is standard)
5 example questions with answers prepended to the actual question. Improves performance ~5–15 absolute points.

### 3. Chain-of-thought
Model reasons through the answer before committing. Especially helpful on math/logic subjects.

The headline number is typically **5-shot accuracy**.

## Scoring

$$\text{MMLU} = \frac{1}{|S|} \sum_{s \in S} \frac{\text{correct}_s}{\text{total}_s}$$

where $S$ is the set of 57 tasks. Each task contributes equally, regardless of question count. This *macro-average* prevents large tasks from dominating.

Two reporting variants:
- **MMLU** — 5-shot, no CoT (most common in papers).
- **MMLU CoT** — 0-shot or 5-shot with chain-of-thought.

## Reference scores

| Model | MMLU (5-shot) |
|---|---|
| Random baseline | 25.0 |
| Llama-2 7B | 45.3 |
| Llama-2 13B | 54.8 |
| Llama-2 70B | 68.9 |
| GPT-3.5 | 70.0 |
| Claude-2 | 78.5 |
| GPT-4 | 86.4 |
| Gemini Ultra | 90.0 |
| Claude 3 Opus | 86.8 |
| Llama-3.1 405B | 88.6 |
| Human expert | ~89.8 |

The 90% ceiling is approached by frontier models; further gains require **MMLU Pro** or **MMLU-Redux** (harder versions described below).

## Variants

### MMLU Pro
Hendrycks et al. 2024. Removes saturated questions, adds 10 answer choices instead of 4 (reducing random baseline to 10%), favors reasoning over memorization. Frontier models drop ~20 absolute points.

### MMLU-Redux
Cleaned version of original MMLU with mistranslations, ambiguous questions, and broken multiple-choice items removed. Used when the noise floor of original MMLU matters.

### CMMLU / TMMLU+
Chinese / Taiwanese counterparts measuring the same breadth in non-English contexts. Useful for multilingual model evaluation.

### CodeMMLU / DomainMMLU
Specialized variants restricted to code, medicine, law, etc.

## Known issues

- **Test set leakage.** MMLU is on the public web; many models have been trained on it directly or via paraphrases. Compare the same model on MMLU vs MMLU-Redux: gap suggests memorization.
- **Multiple-choice gameability.** Models can exploit format heuristics ("longest answer is correct," "answers with negations are wrong"). Some questions are answerable without reading the question.
- **Cultural bias.** Heavy weighting on US-centric topics (US history, US law).
- **Stale content.** Some questions reference outdated facts (post-2020 changes are missing).
- **Ambiguity / errors.** Original MMLU contains ~5% incorrect or ambiguous answer keys; this caps the practical ceiling around 95%.

## Best practices for using MMLU

1. **Report 5-shot by default**, with CoT optional.
2. **Use the standard prompt template** (Hendrycks 2020 Appendix). Custom templates inflate scores 5–10 points.
3. **Disclose data contamination checks.** A clean model on MMLU-Redux validates the original score.
4. **Don't over-interpret tiny gaps.** MMLU has ~0.3-point statistical noise. A 76.4 vs 76.6 difference is meaningless.
5. **Pair with at least one reasoning benchmark** ([[GSM8K]]) and one chat benchmark ([[MT-Bench]]) — knowledge alone doesn't equal usefulness.

## When MMLU is the right metric

- **Pretraining quality assessment** — scales with parameter count and data diversity.
- **Instruction-tuning regression** — does the chat fine-tune retain pretraining knowledge?
- **Cross-model comparison** — universally reported, easy to compare.

## When it isn't

- **Tool-use, agency, planning** — MMLU is closed-book; it doesn't test the agentic stack.
- **Long-context reasoning** — MMLU questions are short.
- **Open-ended generation** — multiple-choice can't capture quality of free-form output.
- **Domain-specific deployment** — MMLU is academic; your prod use case is medical billing or legal contracts. Use a domain benchmark.
- **Frontier discrimination** — at 90%+, MMLU saturates; switch to MMLU Pro or harder benchmarks.

## Pseudocode

```python
def mmlu_5shot(model):
    tasks = load_mmlu()
    task_scores = {}
    for task_name, items in tasks.items():
        # Hold out 5 items for few-shot, evaluate on the rest
        few_shot = items[:5]
        eval_items = items[5:]
        prefix = format_few_shot(few_shot)
        
        correct = 0
        for q in eval_items:
            prompt = prefix + format_question(q)
            answer = model.predict_letter(prompt)  # one of A/B/C/D
            if answer == q.gold:
                correct += 1
        
        task_scores[task_name] = correct / len(eval_items)
    
    return {
        "macro_avg": sum(task_scores.values()) / len(task_scores),
        "by_task": task_scores,
        "by_category": group_by_supercategory(task_scores),
    }
```

## Connections

- [[Model Evaluation]] — broader umbrella
- [[MT-Bench]] — chat counterpart
- [[GSM8K]] — math counterpart
- [[HELM]] — broader holistic evaluation framework that includes MMLU
- [[AlpacaEval]] — instruction-following counterpart
- [[Perplexity]] — pretraining metric; MMLU validates that lower perplexity translates to knowledge
- [[Pretraining]] — what MMLU primarily measures
- [[Fine-Tuning]] — MMLU is a regression check post-fine-tuning
- [[LLM-as-Judge]] — *not* used by MMLU (it's exact-match on letter); contrasts with chat benchmarks
