---
title: Beam Search
type: concept
tags: [decoding, inference, generation, sequence-modeling]
sources: []
created: 2026-05-10
updated: 2026-05-10
---

# Beam Search

## Definition

**Beam search** is a heuristic decoding algorithm that maintains the top-$B$ partial sequences (the "beam") at each step rather than greedily picking the single most-probable next token. At every step, every beam is expanded by all vocabulary tokens; the resulting $B \cdot V$ candidates are scored by cumulative log-probability, and only the top $B$ survive. Beam search dominated machine translation and structured-generation tasks for years; in modern LLM chat / open-ended generation it has been largely displaced by **sampling-based decoding** (top-k, nucleus, temperature) — but it persists for tasks with a single best answer.

## How it works

For beam width $B$ and vocab size $V$, at each step:

1. For each of the $B$ current beams, expand by all $V$ next tokens → $B \cdot V$ candidates
2. Score each candidate by $\sum_{t} \log p(y_t \mid x, y_{<t})$
3. Keep top $B$ by score
4. Repeat until all beams emit EOS or hit max length

When a beam emits EOS, it's set aside as a finished hypothesis. Final answer is the highest-scoring finished hypothesis.

## Why beam search loses on chat

Beam search's optimality is for tasks where there's a *single best* answer (translation, code synthesis, structured outputs). For open-ended generation it has well-known pathologies:

- **Bland-output bias** — the highest-likelihood completion is the most generic one ("I don't know", "It depends"); beam search systematically picks these
- **Repetition** — likely tokens often repeat ("the the the"), and beam search amplifies this
- **Length bias** — longer beams accumulate more negative log-prob; raw scoring favors short beams; length-normalization helps but is fragile
- **Determinism** — same input → same output, which is bad UX for chat

For chat, **sampling** (top-k, top-p / nucleus, temperature) produces more diverse, more interesting, more human-like outputs, even though it's *less* likely under the model.

## Where beam search still wins

- **Machine translation** — there's typically one best translation
- **Code synthesis with a strong specification** — pair with [[HumanEval]]-style verification; sample many, beam-search each
- **Constrained / structured generation** — JSON-mode, regex-constrained generation; beam search respects the constraint while greedy sampling may violate
- **[[Speculative Decoding]] verification** — the verifier model uses an exact-decoding-equivalent process

## Variants

- **Length-normalized beam search** — divide cumulative log-prob by beam length to mitigate length bias
- **Diverse beam search** — penalize beams that share tokens with other beams to promote diversity
- **Sampled beam search** — sample expansions instead of taking top-V deterministically
- **Constrained beam search** — only allow expansions that satisfy a grammar / regex / JSON schema

## Beam search vs reasoning-model search

[[Tree-of-Thought]] generalizes beam-search-style multi-path exploration to *reasoning chains* — each "beam" is a partial thought process, scored by a value function (often [[Reward Modeling|reward model]] or [[LLM-as-Judge]] rather than likelihood). Modern [[Reasoning Models]] mostly do this internally via training rather than explicit search at inference.

## Related Concepts

- [[Self-Consistency]] — sampling-based alternative for reasoning tasks
- [[Tree-of-Thought]] — reasoning generalization of beam-search-style exploration
- [[Speculative Decoding]] — uses exact decoding internally
- [[Reasoning Models]] — what's largely displaced explicit search
- [[Sequence-to-Sequence Learning]] — beam search's original home
- [[Prompting Strategies Decision Guide]] — synthesis on inference-time strategies

## Open Questions

- Optimal beam width per task (typically 4–10; rarely above 50 helps)
- Constrained / grammar-aware beam search at scale
- Diverse beam search vs nucleus sampling for creative tasks
