---
title: Elo Rating
type: concept
tags: [evaluation, leaderboards, ranking, cluster/evaluation]
sources: [2026-11-13-build-a-reasoning-model-from-scratch]
created: 2026-11-13
updated: 2026-11-13
---

# Elo Rating

## Definition

The **Elo rating system** was originally developed for ranking chess players. LLM leaderboards use it to turn pairwise human preference votes into a single ranking. The best-known example is Arena (formerly Chatbot Arena; arXiv 2403.04132). On Arena, a user sees two models' responses to the same prompt and votes for the one they prefer (Raschka 2026, Appendix F, p384–388).

Elo-based leaderboards are a **judgment-based** evaluation method. The other judgment-based method is [[LLM-as-Judge]]. Benchmark-based methods include [[MMLU]] and verifier benchmarks such as [[MATH-500]].

## Update rule

Every model starts at the same rating (1,000 in the book's example). For each vote (winner, loser):

$$E_{w} = \frac{1}{1 + 10^{(R_{l} - R_{w})/400}}$$

$$R_w \leftarrow R_w + K(1 - E_w), \qquad R_l \leftarrow R_l - K(1 - E_w)$$

$E_w$ is the winner's expected chance of winning, in a setting without draws. The book uses $K = 32$, which gives:

| Match | $E_w$ | Rating change |
|---|---|---|
| Even match | 0.5 | ±16 |
| Favorite wins | ≈ 0.99 | ±0.32 |
| Underdog wins | ≈ 0.01 | ±31.68 |

## Caveats

- **Order matters.** Ratings update one vote at a time, so the same votes in a different order can give slightly different final scores. The effect is strongest when an upset happens early. To reduce it, shuffle the votes, run several times and average (p387–388).
- **Arena now uses Bradley–Terry.** It fits all ratings jointly to the whole dataset, so it has no order effect and gives confidence intervals. Its output is scaled to an Elo-like range, which is why people still say "Elo" (p388).
- **Bias and gaming** (p388):
  - Results depend on who the users are, which prompts they choose and how they vote.
  - Votes can reward style over correctness.
  - Leaderboards can be gamed.
  - They give no instant feedback on new variants during development.

  The book also points to "The Leaderboard Illusion" (arXiv 2504.20879) (p313).

## Related Concepts

- [[LLM-as-Judge]] — automated alternative; preference votes can also come from LLMs
- [[MT-Bench]] — judge-based chat benchmark
- [[Model Evaluation]] — umbrella
- [[RLHF]] — also turns pairwise preferences into scores, via a reward model

## Sources

- [[2026-11-13-build-a-reasoning-model-from-scratch]] — Raschka 2026, Appendix F.4
