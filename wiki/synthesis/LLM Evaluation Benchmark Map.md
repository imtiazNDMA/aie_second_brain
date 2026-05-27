---
title: LLM Evaluation Benchmark Map
type: synthesis
tags: [evaluation, benchmarks, metrics, llm-as-judge, rag-evaluation]
sources: [2026-04-12-prompt-engineering-llms, 2026-04-29-vera, 2026-05-09-deepseek-r1, 2026-05-09-s1-test-time-scaling]
created: 2026-05-09
updated: 2026-05-09
---

# LLM Evaluation Benchmark Map

"How good is this model?" is the wrong question. The right question is "good at *what*?" — and that splits into at least seven measurement disciplines, each with its own benchmarks and pitfalls. Frontier-model release notes namedrop [[MMLU]], [[GSM8K]], AIME, [[MT-Bench]], HumanEval and MMLU-Pro without explaining what each actually measures. This synthesis maps every evaluation primitive in the wiki to the capability it tests, the failure modes it exposes, and the production scenario where it's the relevant signal.

## The seven evaluation disciplines

| Discipline | What it measures | Canonical benchmarks | When |
| --- | --- | --- | --- |
| Knowledge breadth | Factual recall across domains | [[MMLU]], MMLU-Pro, ARC, NaturalQuestions | Frontier model selection |
| Reasoning | Multi-step inference (math, code, formal) | [[GSM8K]], MATH, AIME, HumanEval, Codeforces | Reasoning-model selection |
| Chat / instruction-following | Open-ended helpfulness | [[MT-Bench]], AlpacaEval, Chatbot Arena | Production chat assistant |
| Faithfulness / grounding | Output supported by evidence | [[FactScore]], [[RARR]] eval, attributable-to-source | Hallucination control |
| RAG-specific | Retrieval × generation joint quality | [[Context Relevance]], [[Response Adherence]], [[Response Relevance]], RAGAS | RAG production |
| Intrinsic LM quality | Token-level likelihood | [[Perplexity]], [[BLEU]], [[ROUGE]] | Pretraining + classical NLP only |
| Human-rubric | Subjective production quality | [[SOMA Evaluation Framework]], [[LLM Evaluation Rubrics]] | Internal product gating |

## Knowledge benchmarks (breadth)

| Benchmark | Format | What it tests | Why it's saturating |
| --- | --- | --- | --- |
| [[MMLU]] | 57-domain multiple-choice | Knowledge across subjects | Top models > 85%; ceiling effect |
| MMLU-Pro | Harder MMLU successor | Same, but discriminating | Frontier models still under 80% |
| ARC | Grade-school science | Common sense + reasoning | Saturating |
| NaturalQuestions | Real Google search queries | Open-domain factual QA | Useful for retrieval-augmented eval |

MMLU is reported in every model release because it's the most-recognized benchmark, not because it discriminates well anymore. For 2026, MMLU-Pro is the more useful number; for niche capability, switch to a domain benchmark.

## Reasoning benchmarks

| Benchmark | Format | Difficulty signal |
| --- | --- | --- |
| [[GSM8K]] | 8.5K grade-school math, 2–8 step | Substrate where [[Chain-of-Thought]]'s emergence was first quantified |
| MATH | Competition math (algebra, calculus, geometry) | Stronger than GSM8K |
| AIME 2024 / 2025 | American Invitational Mathematical Examination | The canonical reasoning-model benchmark; small N (15 problems) but high difficulty |
| HumanEval / HumanEval+ | Python function synthesis with hidden tests | Code reasoning |
| Codeforces | Live competitive-programming rating | Open-ended code reasoning; closer to real engineering |
| GPQA | Graduate-level physics/chemistry/biology | Hardest knowledge-reasoning blend |

[[DeepSeek-R1]] and [[2026-05-09-s1-test-time-scaling|s1]] both report on AIME / MATH / Codeforces / HumanEval+ — these are the *contract benchmarks* for reasoning capability now.

## Chat benchmarks (open-ended quality)

| Benchmark | Method | Use |
| --- | --- | --- |
| [[MT-Bench]] | 80 multi-turn questions × 8 categories, GPT-4-as-judge 1–10 | Quick capability check; well-correlated with Chatbot Arena |
| AlpacaEval / AlpacaEval 2.0 | Length-controlled win rate vs GPT-4 baseline, GPT-4 judge | Compare model variants |
| Chatbot Arena (LMSYS) | Crowd-sourced pairwise human votes, Elo | Most authoritative but slowest signal |
| Arena-Hard | Harder Arena subset, GPT-4-judge | Discriminates strong models |

These benchmarks all rely on [[LLM-as-Judge]]. Read the [[LLM-as-Judge]] page for the failure modes (length bias, position bias, judge preference for own family). Modern best practice: pair LLM-as-judge with a stronger judge model and length-controlled scoring.

## RAG-specific evaluation (the triad + extensions)

The wiki's [[RAG Evaluation Playbook]] formalizes these. Three core metrics:

| Metric | Question | Computed how |
| --- | --- | --- |
| [[Context Relevance]] | Did we retrieve the right context? | Per-chunk relevance score, often LLM-as-judge |
| [[Response Adherence]] | Is the answer grounded in retrieved context? | Atomic-claim → evidence check |
| [[Response Relevance]] | Does the answer address the query? | LLM-as-judge per response |

Plus:

- [[FactScore]] — atomic-claim factuality against an external knowledge source
- [[RARR]] — atomic-claim attribution to retrieved docs
- RAGAS — orchestrates the above + extras into a measurement library
- [[VERA]] — external validator system, see the source page

The triad is the *contract* for any production RAG; instrument it before you ship and you'll catch retrieval failures the user-facing eval misses.

## Intrinsic LM metrics (mostly pretraining-era)

| Metric | What it measures | Modern role |
| --- | --- | --- |
| [[Perplexity]] | Per-token surprisal on held-out text | Pretraining scaling; tokenizer-comparison; useless for chat |
| [[BLEU]] | N-gram overlap, precision-side | Machine translation; obsolete for general LLM eval |
| [[ROUGE]] | N-gram overlap, recall-side | Summarization; obsolete for general LLM eval |

These show up in older code and in academic comparisons. For modern LLM evaluation, ignore them unless you're specifically doing pretraining or NMT.

## Human-rubric and product-quality eval

For product gating you need rubric-based human (or LLM-judge) scoring:

- [[SOMA Evaluation Framework]] (Berryman & Ziegler) — from *Prompt Engineering for LLMs*; structured rubric for prompt quality
- [[LLM Evaluation Rubrics]] — concept hub for rubric design
- Custom rubrics — domain-specific (legal-correct? medically-safe? code-runs?)

These tend to have the strongest signal-to-noise ratio for actual production fitness, at the cost of being slow and expensive. Pair with public benchmarks: public benchmarks for direction, custom rubrics for ship/no-ship decisions.

## LLM-as-Judge — the cross-cutting tool

[[LLM-as-Judge]] is the substrate underneath MT-Bench, AlpacaEval, RAG triad, and most modern automated eval. Worth understanding the failure modes:

- **Length bias** — judges prefer longer answers; AlpacaEval 2.0 introduced length-controlled scoring to fix this
- **Position bias** — first option preferred; randomize / counterbalance
- **Self-preference** — judges prefer outputs from their own model family; use a different family for the judge
- **Style over substance** — judges score fluent-but-wrong over rough-but-correct
- **Calibration drift** — judge model behavior changes across versions; pin the judge

For local-only deployment, use the strongest local model as judge (Qwen 2.5 32B or Llama 3.3 70B Q4) — and validate against a human-labeled subset before trusting it.

## Decision flow: which eval do I run?

```
Pretraining a base model?
├── Perplexity, MMLU, MMLU-Pro, GSM8K — capability spread

Selecting a model for production chat?
├── MT-Bench (quick), AlpacaEval 2.0 LC (variant comparison), Chatbot Arena (slow truth)

Selecting / evaluating a reasoning model?
├── AIME, MATH, GPQA, HumanEval+, Codeforces — see Reasoning Models Landscape

Building a RAG system?
├── Context Relevance + Response Adherence + Response Relevance — RAG Evaluation Playbook
└── Plus FactScore / RARR for high-stakes attribution

Tuning a single prompt?
├── SOMA framework, custom rubric, human eval on a small N

Worried about hallucination?
├── FactScore + RARR + adversarial probes

Need a public benchmark for marketing?
├── MMLU + GSM8K + HumanEval + MT-Bench (the four-tuple in every model card)
```

## Pitfalls

1. **Benchmark contamination** — modern models train on data that includes benchmark questions. Treat any single-benchmark number with suspicion; look for held-out / private eval.
2. **Saturation** — MMLU is approaching ceiling for frontier; use MMLU-Pro or harder benchmarks to discriminate.
3. **Single-number tyranny** — averaged scores hide capability holes. Look at per-category breakdowns.
4. **Judge model contamination** — using GPT-4 as judge in a benchmark for GPT-4 family inflates scores.
5. **Benchmark-driven goodharting** — train-to-the-test. Hold out an internal eval the public never sees.
6. **No production-rubric eval** — public benchmarks correlate with production quality but don't equal it. Invest in custom rubrics.

## Where this wiki has unfilled gaps

The wiki has [[FactScore]] and [[2026-04-29-vera|VERA]] but not full pages for AlpacaEval, AIME, Codeforces, HumanEval, GPQA, MMLU-Pro, RAGAS, or Chatbot Arena. These would all be useful concept pages to add when the next ingestion pass touches them.

## Related pages

- [[MMLU]], [[GSM8K]], [[MT-Bench]], [[FactScore]], [[Perplexity]], [[BLEU]], [[ROUGE]] — atomic benchmarks/metrics
- [[Context Relevance]], [[Response Adherence]], [[Response Relevance]] — RAG triad
- [[LLM-as-Judge]] — substrate for automated eval
- [[LLM Evaluation Rubrics]], [[SOMA Evaluation Framework]] — rubric-based eval
- [[RAG Evaluation Playbook]] — sibling synthesis (RAG-specific)
- [[Prompt Evaluation Workflows]] — sibling synthesis (prompt-specific)
- [[Reasoning Models Landscape]] — context for reasoning benchmarks
- [[VERA]], [[RARR]] — high-stakes attribution
- [[Model Evaluation]], [[RAG Evaluation]] — broader hubs
