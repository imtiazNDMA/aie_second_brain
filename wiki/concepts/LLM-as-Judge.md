---
title: LLM-as-Judge
type: concept
tags: [evaluation, llm, automation]
sources: [2026-04-12-prompt-engineering-llms, 2026-04-12-ultimate-guide-fine-tuning]
created: 2026-04-30
updated: 2026-04-30
---

# LLM-as-Judge

## Definition

**LLM-as-Judge** is the practice of using a strong large language model to *evaluate* the outputs of another (often smaller) LLM. The judge is given a rubric, the input, and one or more candidate outputs, and is prompted to score each output on each rubric dimension or pick a winner.

It is the dominant evaluation methodology for tasks where (a) ground truth is hard to enumerate (open-ended generation), (b) crowdsourced human evaluation is too expensive, and (c) automatic metrics like [[BLEU]]/[[ROUGE]] correlate poorly with human preference. Driving force behind benchmarks like [[MT-Bench]] and [[AlpacaEval]].

## Why it works

Strong LLMs (GPT-4 class, Claude Opus class) have learned a *world model of preferences* from RLHF training. When asked "which of these answers is better?" they can pattern-match across:

- Factual accuracy (did the response state correct facts?)
- Coherence and structure
- Adherence to instructions
- Tone, fluency, length
- Subjective dimensions (helpfulness, conciseness, safety)

For most criteria, frontier-LLM judgments correlate with average-human judgments at ~0.6–0.85 Spearman — comparable to inter-human agreement. The judge is fast (seconds), cheap (cents), and reproducible (deterministic with seed).

## The prompt patterns

### 1. Pointwise scoring

```
Rate the response on a scale of 1–10 for helpfulness.
Question: <input>
Response: <output>
Provide your score and a brief justification.
Score: <score>
Justification: <text>
```

Simple, but prone to score-distribution biases (judges over-use 7s and 8s).

### 2. Pairwise comparison

```
Question: <input>
Response A: <output_a>
Response B: <output_b>
Which response is better, A or B? Explain why.
Verdict: <A | B | Tie>
```

More reliable than pointwise — the judge anchors against the other response. Used by [[MT-Bench]], [[AlpacaEval]] 2.0, and most preference-data pipelines.

### 3. Reference-grounded comparison

```
Question: <input>
Reference: <gold_answer>
Candidate: <model_output>
Does the candidate match the reference's facts? Score 1–5.
```

Used when ground truth exists but exact-match is too rigid.

### 4. Rubric-based multi-dimensional

```
Score the response on:
- Faithfulness (1-5): does it match the source?
- Helpfulness (1-5): does it answer the question?
- Conciseness (1-5): is it appropriately brief?
- Safety (1-5): does it avoid harmful content?

Output JSON: {"faithfulness": ..., "helpfulness": ..., ...}
```

Used in [[RAG Evaluation]] systems like [[VERA]]. Each dimension is independently calibrated.

### 5. Chain-of-thought judging

Force the judge to reason out loud before committing to a score. Reduces sloppy judgments at the cost of latency.

## Known biases

LLM-as-judge has *systematic biases* that must be controlled:

| Bias | Effect | Mitigation |
|---|---|---|
| **Position bias** | Models prefer the first option (A) over the second (B) ~60–70% of the time when responses are similar | Run both orders and average; use "Tie" verdict more aggressively |
| **Verbosity bias** | Longer responses score higher even when shorter would be better | Add length-controlled scoring; AlpacaEval 2.0 normalizes by length |
| **Self-enhancement** | A model judges its own outputs as better than competitors' | Use a *different model* as judge (cross-model only) |
| **Style bias** | Responses matching the judge's preferred style score higher regardless of correctness | Use rubric with explicit non-style criteria; have human spot-checks |
| **Refusal bias** | Judges over-penalize partial refusals and over-reward confident-but-wrong | Calibrate rubric explicitly on safety dimensions |
| **Anchoring** | Judge's score on dimension N is influenced by score on dimension N-1 | Score dimensions independently (separate prompts) |

## Calibration

A bare judge prompt is unreliable. Calibration steps:

1. **Human-judge agreement.** Sample $N=100$ items, have humans rate them, run the judge on the same items, compute Spearman or Cohen's kappa. Target ≥0.6.
2. **Self-agreement.** Run the same judge on the same items twice with different seeds. Disagreement above 10% means rubric is ambiguous.
3. **Cross-judge agreement.** Run a second judge model. Persistent disagreement signals dimension confusion or out-of-distribution items.
4. **Adversarial probes.** Construct items designed to trigger biases (very long bad answer, very short good answer). Verify judge handles them.

Without calibration, LLM-as-judge can drift from human preference and silently distort downstream training (DPO/KTO) or evaluation rankings.

## When LLM-as-judge wins

- **Open-ended generation** without single ground truth.
- **Multi-dimensional rubrics** that human annotators struggle to apply consistently.
- **Large-scale evaluation** — millions of items where humans are infeasible.
- **Rapid iteration cycles** — judge runs in seconds, humans take days.
- **Preference-data generation** for [[Direct Preference Optimization]], [[KTO]], [[ORPO]].

## When it fails

- **Domain expertise required** — judge lacks the specialty knowledge (advanced math proofs, novel research).
- **Fine-grained distinctions** — judge scores all responses 8/10; no signal.
- **Adversarial examples** — judge can be prompted-injected by content in the candidate response.
- **Subjective criteria with low inter-human agreement** — judge inherits the noise but presents it confidently.
- **Recently emerged content** — judge's training cutoff means it may rate stale claims as confidently correct.

## Comparison

| Method | Cost | Latency | Repeatability | Reliability for open-ended |
|---|---|---|---|---|
| Exact match | $0 | ms | 1.0 | Poor (closed-set only) |
| BLEU / ROUGE | $0 | ms | 1.0 | Poor (n-gram overlap) |
| Embedding similarity | low | ms | 1.0 | Mediocre (semantic but not factual) |
| **LLM-as-Judge (pairwise)** | $$ | seconds | 0.85+ | Good (best automatic option) |
| Human eval (single annotator) | $$$ | hours | ~0.7 | Good but noisy |
| Human eval (multi-annotator) | $$$$ | days | 0.85+ | Gold standard |

## Pseudocode

```python
def pairwise_judge(question, resp_a, resp_b, judge_llm,
                   rubric="overall helpfulness"):
    prompt = f"""You are evaluating two responses to a question.
    
    Question: {question}
    Response A: {resp_a}
    Response B: {resp_b}
    
    Compare them on {rubric}. Output JSON:
    {{"reasoning": "...", "verdict": "A" | "B" | "Tie"}}"""
    
    # Order 1: A first
    r1 = parse_json(judge_llm.generate(prompt))
    # Order 2: swap
    r2_prompt = prompt.replace("Response A:", "TMP_A:") \
                      .replace("Response B:", "Response A:") \
                      .replace("TMP_A:", "Response B:")
    r2 = parse_json(judge_llm.generate(r2_prompt))
    # Translate r2 verdict back to original labels
    r2.verdict = {"A": "B", "B": "A", "Tie": "Tie"}[r2.verdict]
    
    return aggregate(r1.verdict, r2.verdict)  # majority or tie if disagree
```

The double-order trick controls position bias.

## Connections

- [[Model Evaluation]] — broader umbrella
- [[RAG Evaluation]] — uses LLM-as-judge for faithfulness, relevance
- [[VERA]] — production RAG validation system using judge models
- [[LLM Evaluation Rubrics]] — what the judge follows
- [[SOMA Evaluation Framework]] — rubric design pattern
- [[MT-Bench]] — canonical benchmark using LLM-as-judge
- [[AlpacaEval]] — instruction-following benchmark with LLM-as-judge
- [[Direct Preference Optimization]] / [[KTO]] / [[ORPO]] — judges produce the preference data these consume
- [[Reflexion]] — judge-driven critique loop
- [[Self-Consistency]] — orthogonal: aggregating multiple samples instead of multiple judges
- [[BLEU]] / [[ROUGE]] / [[Perplexity]] — automatic metrics that LLM-as-judge typically beats on correlation with human preference
