---
title: ORPO
type: concept
tags: [alignment, fine-tuning, preference-learning]
sources: [2026-04-12-ultimate-guide-fine-tuning, 2026-04-12-llm-engineers-handbook]
created: 2026-04-30
updated: 2026-04-30
---

# ORPO

## Definition

**ORPO** (Hong, Lee & Thorne 2024) — *Monolithic Preference Optimization without Reference Model* — is a single-stage alignment algorithm. It folds [[Supervised Fine-Tuning]] and preference learning into one loss function, eliminating the separate reference model that [[Direct Preference Optimization]] (DPO) requires. The combined loss is supervised cross-entropy on chosen responses, plus an *odds-ratio* penalty that discourages the model from generating rejected responses.

The pitch: get DPO-quality alignment without the two-pass workflow (SFT → DPO) and without keeping a frozen reference model in VRAM.

## Motivation

The standard alignment recipe is multi-stage:

1. **SFT** — train on a high-quality instruction dataset.
2. **Reward modeling** ([[RLHF]]) or reference snapshotting (DPO).
3. **Preference optimization** — PPO/DPO/KTO using preference pairs.

Each stage adds complexity:
- Two training runs.
- Two checkpoints in flight.
- DPO needs the SFT model frozen as $\pi_{\text{ref}}$ throughout — doubles VRAM during training.
- SFT can over-shrink the policy distribution; DPO then has trouble pushing it.

ORPO asks: can a single loss do both jobs?

## The loss

For prompt $x$ with chosen response $y_w$ (winner) and rejected response $y_l$ (loser):

$$\mathcal{L}_{\text{ORPO}} = \underbrace{-\log p_\theta(y_w \mid x)}_{\mathcal{L}_{\text{SFT}}} \; - \; \lambda \cdot \underbrace{\log \sigma\!\left(\log \frac{\text{odds}_\theta(y_w \mid x)}{\text{odds}_\theta(y_l \mid x)}\right)}_{\mathcal{L}_{\text{OR}}}$$

where the **odds** of generating a sequence under $\pi_\theta$ are:

$$\text{odds}_\theta(y \mid x) = \frac{p_\theta(y \mid x)}{1 - p_\theta(y \mid x)}$$

and $\sigma$ is the logistic function. The hyperparameter $\lambda$ (typically 0.1–1.0) trades supervised fitting against preference contrast.

The two-term structure is the whole story:
- **$\mathcal{L}_{\text{SFT}}$** pulls the policy toward $y_w$ (standard cross-entropy).
- **$\mathcal{L}_{\text{OR}}$** *increases the log-odds-ratio* of $y_w$ over $y_l$ — pushes $y_w$ up *while pushing $y_l$ down*.

## Why "odds" instead of probability?

DPO contrasts log-probabilities directly: $\log p_\theta(y_w) - \log p_\theta(y_l)$. ORPO contrasts log-odds:

$$\log \frac{p/(1-p)}{p'/(1-p')}$$

The odds are bounded below by 0 and unbounded above. As $p \to 1$, $\log\text{odds} \to \infty$ — strong preference signals don't saturate. This contrasts with DPO, where the gradient flattens as the chosen response's probability approaches 1.

In practice, the odds-ratio formulation:
- **Penalizes the rejected** more aggressively than DPO when $p_\theta(y_l)$ is high (i.e., when the model is likely to produce bad outputs).
- Gives a non-zero gradient on the SFT term for the duration of training (DPO sees diminishing SFT signal once the policy fits).
- Removes the need for a reference model: no $\pi_{\text{ref}}$ appears in the loss.

## Pseudocode

```python
def orpo_loss(model, batch, lambda_=0.1):
    chosen_logps = log_prob(model, batch.prompts, batch.chosen)
    rejected_logps = log_prob(model, batch.prompts, batch.rejected)
    
    # Odds: p / (1 - p), in log space:
    # log_odds = log_p - log(1 - exp(log_p))
    log_odds_chosen = chosen_logps - torch.log1p(-torch.exp(chosen_logps))
    log_odds_rejected = rejected_logps - torch.log1p(-torch.exp(rejected_logps))
    
    log_odds_ratio = log_odds_chosen - log_odds_rejected
    
    L_sft = -chosen_logps.mean()
    L_or = -F.logsigmoid(log_odds_ratio).mean()
    
    return L_sft + lambda_ * L_or
```

## Comparison

| Method | Stages | Reference model | Loss term |
|---|---|---|---|
| **SFT alone** | 1 | none | $-\log p(y_w)$ |
| **RLHF** (PPO) | 3 | frozen reference | reward $-$ KL penalty |
| **DPO** | 2 (SFT then DPO) | frozen $\pi_{\text{ref}}$ | $-\log\sigma(\beta(\log\frac{\pi}{\pi_\text{ref}}(y_w) - \log\frac{\pi}{\pi_\text{ref}}(y_l)))$ |
| **[[KTO]]** | 2 (SFT then KTO) | frozen $\pi_{\text{ref}}$ | prospect-theory loss |
| **ORPO** | **1** | **none** | $-\log p(y_w) - \lambda \log\sigma(\log\frac{\text{odds}(y_w)}{\text{odds}(y_l)})$ |

## Empirical results (Hong 2024)

| Model | Method | AlpacaEval 2.0 LC | MT-Bench |
|---|---|---|---|
| Mistral-7B | SFT only | 11.5% | 6.8 |
| Mistral-7B | SFT → DPO | 14.6% | 7.4 |
| Mistral-7B | **ORPO** | **15.6%** | **7.5** |
| Llama-2-7B | SFT → DPO | 5.7% | 6.4 |
| Llama-2-7B | **ORPO** | **6.0%** | **6.6** |

Comparable or slightly better than SFT+DPO, with half the wall-clock and no reference model.

## Choosing $\lambda$

| $\lambda$ | Behavior |
|---|---|
| 0.0 | Pure SFT; chosen-only training |
| 0.1 (default) | Balanced; matches DPO strength on most tasks |
| 0.5 | Strong preference signal; risk of policy collapse on rejected modes |
| ≥1.0 | Preference dominates SFT; convergence less stable |

Most published ORPO recipes use $\lambda = 0.1$ for instruction tuning, $\lambda = 0.5$ for safety alignment.

## When ORPO fits

- **One-shot alignment** of a base model to a preference dataset.
- **Limited VRAM** budgets — no reference model means ~50% memory savings vs DPO.
- **Mid-size models** (7B–70B) being fine-tuned on commodity GPUs.
- **Short alignment data** — single-stage training reduces sample requirements vs SFT+DPO.

## When DPO/KTO/RLHF still win

- **Already-SFT'd checkpoint** — running ORPO from scratch wastes the SFT compute. Use DPO instead.
- **Very large preference datasets** — RLHF's reward model has more capacity to capture nuance.
- **Imbalanced preference data** (only positive labels, no pairs) — use [[KTO]].
- **Multi-objective alignment** (helpfulness + harmlessness + honesty) — RLHF reward shaping is more flexible.

## Failure modes

- **Mode collapse** — too-large $\lambda$ pushes $p_\theta(y_l)$ toward zero on examples that aren't actually rejected by the user, just rejected on this prompt. Validate per-task quality.
- **Tokenizer mismatch with reference data** — without a reference model to anchor, ORPO is more sensitive to dataset preprocessing.
- **Gradient explosion at $\log(1 - p)$ term** — rare but real when $p \to 1$ on a sequence. Mitigate with gradient clipping and FP32 logsumexp.

## Connections

- [[Direct Preference Optimization]] — the closest relative; ORPO removes the reference model
- [[KTO]] — alternative reference-free alignment method
- [[RLHF]] — three-stage parametric counterpart
- [[Fine-Tuning]] — broader topic
- [[Supervised Fine-Tuning]] — first stage of standard recipe; ORPO folds into one
- [[Half Fine-Tuning]] — orthogonal SFT variant
- [[Low-Rank Adaptation]] — ORPO works with LoRA adapters too
- [[Parameter-Efficient Fine-Tuning]] — composable
- [[Unsloth]] — library that provides efficient ORPO implementations
