---

title: Chain-of-Thought
type: concept
tags: [prompting, reasoning, agents, cluster/reasoning-prompting]
sources: [2026-04-12-prompt-engineering-llms, 2026-04-12-build-llm-from-scratch, 2026-04-29-self-rag, 2026-04-12-ai-agents-in-action, 2026-11-13-build-a-reasoning-model-from-scratch]
created: 2026-04-30
updated: 2026-11-13
---


# Chain-of-Thought

## Definition

**Chain-of-Thought (CoT)** is a prompting technique that elicits intermediate reasoning steps from an LLM *before* it commits to a final answer. Introduced by Wei et al. 2022, CoT exploits the fact that auto-regressive models do better on multi-step problems when they "think out loud" — each generated token then becomes context for the next, letting the model decompose hard problems into easier sub-problems.

CoT is the reasoning substrate underneath [[ReAct]], [[Tree-of-Thought]], [[Self-Consistency]], and [[Reflexion]].

## Variants

### 1. Few-shot CoT

Append worked examples to the prompt. Each example shows `Q → reasoning → A`. The model imitates the pattern.

```
Q: Roger has 5 balls. He buys 2 more cans of 3 balls each. How many?
A: Roger started with 5 balls. 2 cans × 3 balls = 6. 5 + 6 = 11. Answer: 11.

Q: A cafeteria has 23 apples. They use 20 to make lunch and buy 6 more. How many?
A: <model continues with reasoning + answer>
```

### 2. Zero-shot CoT

Just append `Let's think step by step.` before the answer (Kojima et al. 2022). Surprisingly effective on math/logic without any exemplars.

### 3. Plan-and-solve CoT

`First understand the problem and devise a plan. Then carry out the plan and solve the problem step by step.` Reduces missing-step errors.

### 4. Auto-CoT

Cluster training questions by embedding similarity, then generate one zero-shot CoT exemplar per cluster — all done automatically.

### 5. CoT with pause tokens

Insert `<pause>` tokens that don't decode but consume compute. Lets the model think for "extra steps" without externalizing reasoning ([[2026-04-12-build-llm-from-scratch]] discusses this as "Think Before You Speak").

## Why it works

CoT effectively widens the **computation budget** per query. Standard prompting uses a single forward pass to produce the answer; CoT uses many tokens of intermediate computation, where each intermediate token can attend over all prior reasoning. For tasks whose solution depth exceeds one forward pass (multi-step arithmetic, multi-hop QA, planning), this is decisive.

Empirically:
- GSM8K math word problems: ~18% accuracy without CoT → ~57% with few-shot CoT (PaLM 540B)
- Symbolic reasoning (last-letter concatenation, coin-flip): jumps from <10% to >90%
- Strong scaling: CoT gains emerge only at ~60B+ parameters; smaller models often regress with CoT prompts

## When CoT helps vs hurts

| Helps | Hurts |
|---|---|
| Multi-step arithmetic | Single-fact recall |
| Multi-hop retrieval | Yes/no classification |
| Planning under constraints | Free-form generation (creative writing) |
| Math word problems | Tasks already trivial for the model |
| Code generation with structure | Latency-sensitive endpoints |

For trivial tasks, CoT adds latency and can introduce confabulated reasoning that *increases* error rate.

## Mathematical view

If $p_\theta(y|x)$ is the model's distribution over answers given input $x$, naive prompting samples directly. CoT marginalizes over a latent reasoning chain $z$:

$$p_\theta(y|x) = \sum_{z} p_\theta(y|x, z) \, p_\theta(z|x)$$

In practice the model emits one $z$ greedily. **[[Self-Consistency]]** approximates the marginal: sample $K$ chains $z_1, ..., z_K$, take majority vote on the resulting $y_k$. This corresponds to a Monte-Carlo estimate of the marginal over reasoning paths.

## Operational tips

- **Stop sequence.** Stop generation at `Q:` or `Question:` so the model can't run away into a new question.
- **Output format.** Force a final marker (`Answer: …` or `\boxed{…}`) so a parser can extract the answer reliably.
- **Self-consistency.** Sample 5–40 chains at temperature 0.5–0.7 and majority-vote.
- **Structured CoT.** For programmatic downstream use, ask for JSON: `{ "reasoning": "...", "answer": "..." }`.

## Failure modes

1. **Confabulated reasoning** — the chain looks reasonable but reaches the wrong answer. The model is confident in nonsense.
2. **Skipped step** — the chain jumps from sub-problem 2 to the final answer without resolving sub-problem 3.
3. **Order sensitivity** — CoT performance depends on which exemplars you choose; bad exemplars degrade accuracy.
4. **Distraction by exemplars** — model copies an exemplar's *answer pattern* even when the question requires a different operation.

## Small-model evidence: *Build a Reasoning Model (From Scratch)*

Raschka (2026) appended **"Explain step by step."** to the [[MATH-500]] prompt for [[Qwen3]] 0.6B base. He found it worked better on that model than Kojima et al.'s "Let's think step by step." (p100, p308).

**Result:** accuracy rose from 15.2% to **40.6%**, at 84.5 min against 10.1 min for greedy decoding (Table 4.1, p133).

**Contradiction with "gains emerge only at ~60B+" (above).** That claim comes from the original PaLM-era results. A 0.6B base model gained 25 points here. Possible explanations:
- **Modern pretraining data.** The Qwen3 team put CoT data into pretraining (per the Qwen3 technical report). The base model already produces CoT-like output (p64).
- **A different benchmark and model generation.**

Treat the 60B threshold as specific to 2022-era models.

**Further findings from the book:**
- **Trained reasoning models don't benefit.** Models trained to reason "don't need or benefit from" CoT prompting (p102). Exercise B.3 shows CoT is mostly useful for base models (p137).
- **Why it helps** (p102). It gives the model more opportunities to correct itself, and it matches how worked solutions are written in training data. It "doesn't add knowledge"; it changes how existing knowledge is used.
- **Overthinking.** On simple problems the model can generate erroneous explanations that mislead it (p102).
- **Prompt sensitivity is large for base models.** Replacing "Question:" with "Problem:" lifted the base model from 15.3% to 31.2%. The reasoning model barely moved, from 48.2% to 50.0% (exercise 3.4, p320). The author suspects the base model had memorized prompt-formatted MATH-500 examples.
- **The engineering meaning of "reasoning."** In the book, reasoning means generating intermediate steps before the answer; it does not imply human-like thinking. Steps can sound convincing without being logically sound (p2–4).

## From prompted CoT to trained reasoning

CoT is *elicited* from base models by prompt construction. The 2024–2025 [[Reasoning Models]] paradigm trains models to natively emit long-form CoT — [[DeepSeek-R1]] via [[RLVR]] / [[GRPO]] on verifiable rewards, s1 via SFT distillation. This shifts CoT from a prompt-engineering trick to a *training objective*, with corresponding new control mechanisms ([[Budget Forcing]]) and a new scaling law ([[Test-Time Compute Scaling]]). CoT remains the substrate; what changed is whether the model has been *taught* to spend it productively.

## Connections

- [[ReAct]] — adds external actions to CoT
- [[Tree-of-Thought]] — explores multiple branches of a CoT instead of one
- [[Self-Consistency]] — votes across many CoT samples
- [[Reflexion]] — critiques and retries failed CoT trajectories
- [[Reasoning Models]] — models trained to natively emit long CoT (DeepSeek-R1, s1)
- [[Test-Time Compute Scaling]] — empirical regularity behind reasoning models
- [[Budget Forcing]] — control mechanism for trained-CoT length
- [[Reasoning Strategies]] — taxonomy
- [[Prompt Engineering]] — broader framing
- [[GSM8K]] — canonical benchmark for CoT
- [[LLM Application Loop]] — productized form of CoT pipelines
- [[Self-RAG]] — uses CoT inside reflection-token decisions
- [[MATH-500]] — benchmark for the small-model CoT results above
- [[Self-Refinement]] — iterative alternative

## Sources

- [[2026-04-12-prompt-engineering-llms]]
- [[2026-04-12-build-llm-from-scratch]]
- [[2026-04-29-self-rag]]
- [[2026-04-12-ai-agents-in-action]]
- [[2026-11-13-build-a-reasoning-model-from-scratch]] — Raschka 2026; CoT on Qwen3 0.6B (15.2% → 40.6% on MATH-500)
