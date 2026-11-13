---
title: "Build a Reasoning Model (From Scratch) — Sebastian Raschka (Manning, 2026)"
type: source
authors: [Sebastian Raschka]
tags: [reasoning-models, inference-time-scaling, reinforcement-learning, rlvr, grpo, distillation, evaluation, book]
sources: ["Build a Reasoning Model (From Scratch).pdf"]
venue: Manning Publications, 2026 (ISBN 9781633434677)
created: 2026-11-13
updated: 2026-11-13
---

# Build a Reasoning Model (From Scratch)

**Source:** `raw/source/llm-engineering/Build a Reasoning Model (From Scratch).pdf`
**Author:** [[Sebastian Raschka]]
**Publisher:** Manning, 2026. ISBN 9781633434677. Code: github.com/rasbt/reasoning-from-scratch
**Date ingested:** 2026-11-13
**Type:** book. Chapters 1–8 and appendices A–G were all read; page numbers below are the book's own.

## Summary

The book is a sequel to *Build a Large Language Model (From Scratch)*. Instead of pretraining, it covers the methods that turn a conventional pretrained LLM into a reasoning model.

**Setup:**
- **Model.** Everything runs in pure PyTorch on [[Qwen3]] 0.6B. The **base** model is the starting point, and the official **reasoning** variant is the reference.
- **Benchmark.** Progress is measured on [[MATH-500]] with a deterministic SymPy-based verifier. Math is used because answers can be checked automatically.
- **Hardware.** Most results come from an NVIDIA DGX Spark, plus some runs on an H100 and an Apple M4.

**Structure.** The book follows a four-stage road map (Fig. 1.9):
1. Conventional LLM: loading weights, text generation, [[KV Cache]], `torch.compile` (chapter 2).
2. Evaluation: verifier pipeline and MATH-500 (chapter 3; Appendix F covers the other three evaluation methods).
3. Inference techniques, with no weight changes:
   - [[Chain-of-Thought]] prompting, [[Nucleus Sampling|temperature and top-p sampling]], and [[Self-Consistency]] (chapter 4);
   - [[Self-Refinement]] with heuristic and log-probability scorers (chapter 5).
4. Training techniques:
   - [[RLVR]] with [[GRPO]] (chapter 6);
   - GRPO stability: monitoring, clipped policy ratios, the KL term, format rewards (chapter 7);
   - [[Distillation]] from DeepSeek-R1 and Qwen3 235B-A22B teachers (chapter 8).

**Appendices:**
- A: annotated references.
- B: exercise solutions, with extra result tables.
- C: Qwen3 source code.
- D: larger Qwen3 models.
- E: batching.
- F: evaluation methods ([[MMLU]], verifiers, [[Elo Rating|leaderboards]], [[LLM-as-Judge]] via [[Ollama]]).
- G: a Chainlit chat UI.

## Key Claims

### Definitions and framing
- **Reasoning** means generating intermediate steps before the final answer, either visibly or inside `<think>` tags. The terms are used in an engineering sense; they do not imply human-like thinking. The steps are probabilistic, so they are not guaranteed to be logically sound (p2–4).
- **Three method families** (p8–9):
  - inference-time compute scaling, with no weight updates;
  - reinforcement learning, with broad or verifiable rewards;
  - distillation, which here means SFT on text a larger model generated. Traditional knowledge distillation also uses the teacher's logits.
- **Reasoning RL and RLHF** use the same RL; they differ only in where the reward comes from. Verifier rewards are "more objective but less aligned with human preferences" (p9).
- **o1-preview** (Sept 12, 2024) is "regarded as the first LLM-based reasoning model." **DeepSeek-R1** (Jan 2025) was the first open-source reasoning model with a comprehensive technical report (p305).
- **When reasoning models are the wrong tool** (p14–15). They are not needed for summarization, translation or knowledge QA. They cost more because longer outputs mean more forward passes and tasks often need several model calls, and they can be more error-prone because of overthinking.

### Evaluation (chapter 3, Appendix F)
- **Four evaluation methods** in two groups: benchmark-based (multiple choice, verifiers) and judgment-based (leaderboards, LLM judges) (p58–59).
- **Verifiers** only work where answers can be checked easily, ideally deterministically (math, code). They add dependencies, but they are "a cornerstone of reasoning model evaluation" (p60, p384).
- **Answer extraction uses regex, not an LLM,** because that is cheap, reproducible and independent of another model (p71).
- **Prompt wording changes base-model scores a lot.** Changing "Question:" to "Problem:" lifted the base model from 15.3% to 31.2% while the reasoning model went from 48.2% to 50.0% (p320). The first 10 MATH-500 problems are not representative of all 500: the base model scores 30.0% on them and 15.3% on the full set (Table B.2, p319).
- **Table 3.1** (H100, PyTorch 2.8): base 15.3%, reasoning 50.8% on MATH-500 (p91). From chapter 4 on, the DGX Spark baselines are **15.2%** and **48.2%**.

### Inference-time scaling (chapters 4–5)
- **CoT prompting** ("Explain step by step.") lifts the base model from 15.2% to 40.6%. Trained reasoning models "don't need or benefit from" it (Table 4.1, p102, p133).
- **Temperature and top-p alone** are not inference scaling (17.8%). [[Self-Consistency]] with n=10 plus CoT reaches 52.0% but takes 862.6 min, against 10.1 min for greedy (p133–134).
- **Majority voting** "often gives better results" than best-of-N when it can be used. In Tables B.3 and B.4, n=3 voting with an average-logprob tie-break scored 44.8%, best-of-N with logprob scored 43.2%, and best-of-N with the heuristic scored 40.6%.
- **[[Self-Refinement]]** (Table 5.1, p176):
  - On the base model it helps most with no scorer (25.0%).
  - On the reasoning model with a heuristic scorer it reaches 57.8%, against 48.2% baseline.
  - Average log-probability as a scorer does worse because it picks "confident mistakes" (p166, p176–177).
- **Confidence is not correctness.** A sequence's probability is not a calibrated probability of being correct (p147, p155).

### Reinforcement learning (chapters 6–7)
- **RLVR replaces the learned reward model** with a deterministic verifier and collapses RLHF's two steps into one loop (p185). The reward is 1.0 only if the answer is correct and boxed (p200).
- **GRPO**, introduced in DeepSeekMath (arXiv 2402.03300), needs no value model. Advantages are $(r-\bar r)/(\sigma+10^{-4})$, and equal rewards give zero gradient (p187, p201–203).
- **50 GRPO steps** with 8 rollouts and 512 max tokens raise MATH-500 from 15.2% to **47.4%**, near the official reasoning model's 48.2% (Table 6.1, p222).
- **Basic GRPO is unstable over long runs.** Clipped policy ratios fix the collapse near step 400. DeepSeek-R1 used ε = 10; PPO-based RLHF uses about 0.1 (p246–249).
- **KL is often omitted.** It "is not strictly essential" (p191). The author's KL run (coefficient 0.02) collapsed to 0% accuracy through a failure mode of the sampled surrogate (p253–255). Dr. GRPO, Olmo 3 and DeepSeek-V3.2 omit or reduce KL for math (p256).
- **Format rewards can backfire.** A `<think>` format reward with weight 1.0 lowered accuracy. The fixes are weight 0.1 or making it conditional on correctness (p261–263, p331). Partial credit for a correct but unboxed answer reached 37.8%, against 47.4% for the strict reward (p329).
- **The book lists 15 published GRPO modifications** (DAPO, Dr. GRPO, verl, DeepSeek-V3.2, GDPO, GSPO, CISPO) (p265–266).

### Distillation (chapter 8)
- **Hard and soft distillation** (p269–270). Hard distillation trains on the teacher's text, which amounts to SFT on synthetic data and dominates for LLMs. Soft distillation matches the teacher's distribution through KL and needs logits and usually a shared tokenizer. Provider terms of service may restrict reusing outputs (p270).
- **The teacher dataset** came from DeepSeek-R1 via OpenRouter for about $50. Filtering to 2,048 tokens or fewer kept 6,695 of 12,000 examples (p272–283).
- **The loss** is answer-only cross-entropy, i.e. the negative mean log-probability. Validation loss is the signal to watch (p286–291).
- **Results** (Table 8.1): 30.6–33.6% with the R1 teacher and 44.2–45.0% with the Qwen3 235B-A22B teacher. The same-family teacher is likely better because tokenizer and style align. Teachers score 91.2% and 92.4% (p299–300).
- **Cost.** The distillation run took about 3 h and 15 GB, against about 12 h and 70 GB for the GRPO runs (p268, p297).

### Architecture and systems (chapter 2, Appendices C–E)
- **Qwen3 vs GPT-2.** Qwen3 uses [[RMSNorm]], [[SwiGLU]], [[Rotary Position Embeddings|RoPE]], [[Grouped-Query Attention|GQA]] and [[QK-Norm]], where GPT-2 used LayerNorm, GELU MLP, learned positions and MHA.
- **GLU parameter count.** With 1,024 embedding and 3,072 hidden dims, the GLU FFN has 9,437,184 parameters, against 12,582,912 for a standard FFN of twice the width (p341).
- **[[KV Cache]] and `torch.compile` throughput:** M4 CPU 5 → 68 tok/s with both; H100 51 → 164 tok/s compiled (Table 2.1, p54).
- **Batching** is a throughput optimization, not a universal speedup. For example, MATH-500 evaluation on an H100 drops from 90 to 16 min at batch size 64 but uses 23.39 GB against 1.8 GB (Table E.1, p376).

### Outlook (p301–303)
- RLVR for flagship models and distillation for small ones.
- Adaptive reasoning budgets (GPT-5 "auto").
- Process and whole-answer rewards (DeepSeekMath-V2).
- Reasoning models as agent engines (Codex, Claude Code, OpenClaw), leading to multi-reward training.
- Recommended stack: distill, then RLVR, then inference-time scaling.

## Accuracy flags (do not propagate)

- **p23:** DeepSeek V3's final run is said to use "14.8 million GPU-hours". The DeepSeek-V3 report gives about 2.788M H800 GPU-hours; 14.8T is the token count. Likely a conflation.
- **p128:** the self-consistency arXiv ID is misprinted as "2203.1117"; it is **2203.11171** (correct on p309).
- **p205:** the book says length normalization is "not part of the original GRPO formulation". The DeepSeekMath objective as usually written averages per token ($1/|o_i|$). Treat this as the book's simplification. See [[GRPO]].
- **Validation losses:** the think-token runs report different values in Table 8.1 (e.g. 0.5436) and Table B.6 (0.5404). The accuracies agree.
- **p376:** "Qwen3 6-billion-parameter model" should read 0.6B, and "Table 8.1" there means Table E.1.
- **Fig. D.1:** per-size block counts were garbled in extraction and were not used. Only 0.6B = 28 blocks is confirmed (Listing C.7).

## Entities Mentioned

- [[Sebastian Raschka]] — author
- [[Qwen3]] — 0.6B base and reasoning models used throughout; 235B-A22B used as a distillation teacher
- [[DeepSeek-R1]] — RLVR and GRPO reference recipe; 671B distillation teacher
- [[DeepSeek-AI]] — publisher of DeepSeekMath (GRPO), R1, V3.2
- [[GPT-OSS]] — gpt-oss:20b used as a local judge
- [[Ollama]] — local inference server for the judge example

## Concepts Covered

- [[Reasoning Models]] — definition, method families, when not to use one
- [[Chain-of-Thought]] — "Explain step by step."; the overthinking caveat
- [[Nucleus Sampling]] — temperature, top-p, top-k
- [[Self-Consistency]] — majority voting; best-of-N comparison
- [[Self-Refinement]] — critique-and-refine loop; heuristic and logprob scorers
- [[Test-Time Compute Scaling]] — inference-time families and costs
- [[RLVR]], [[RLHF]], [[GRPO]], [[Process Reward Model]] — RL training
- [[Distillation]] — hard vs soft; reasoning-trace SFT
- [[MATH-500]], [[MMLU]], [[LLM-as-Judge]], [[Elo Rating]] — evaluation
- [[KV Cache]], [[RMSNorm]], [[SwiGLU]], [[Rotary Position Embeddings]], [[Grouped-Query Attention]], [[QK-Norm]] — architecture and inference

## Related Sources

- [[2026-04-12-build-llm-from-scratch]] — the prequel
- [[2026-05-09-deepseek-r1]] — the recipe this book reproduces at small scale
- [[2026-05-09-s1-test-time-scaling]] — related test-time scaling and distillation work
- [[2026-05-28-raschka-llm-architecture-gallery]] — same author; architecture reference
