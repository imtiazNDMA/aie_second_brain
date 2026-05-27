---
title: KTO
type: concept
tags: [alignment, fine-tuning, preference-learning, prospect-theory]
sources: [2026-04-12-ultimate-guide-fine-tuning, 2026-04-12-llm-engineers-handbook]
created: 2026-04-30
updated: 2026-04-30
---

# KTO

## Definition

**KTO** — *Kahneman-Tversky Optimization* (Ethayarajh et al. 2024) — is an alignment algorithm derived from **prospect theory**, the behavioral-economics framework Kahneman and Tversky used to describe how humans actually evaluate outcomes (loss aversion, reference-dependent utility). Unlike [[Direct Preference Optimization]] (DPO), KTO does **not** require paired (chosen, rejected) examples — it accepts a binary signal (this output is *desirable* or *undesirable*) per individual sample.

This makes KTO uniquely suited to production data, where you typically have user thumbs-up/thumbs-down events but rarely matched pairs.

## Motivation

DPO and [[ORPO]] both require the data shape:

```
{prompt: ..., chosen: response_A, rejected: response_B}
```

Real-world feedback rarely arrives this way. What you usually have is:

```
{prompt: ..., response: ..., label: positive}
{prompt: ..., response: ..., label: negative}
{prompt: ..., response: ..., label: positive}
...
```

Building pairs from such data requires arbitrary matching choices that bias the optimization. KTO sidesteps the problem: train on individual labeled examples directly.

The bonus claim from prospect theory: humans aren't rational expected-utility maximizers, so a loss that mirrors human valuation should better-align models to human preference than one that assumes rationality (which DPO and PPO implicitly do).

## Prospect theory in 90 seconds

Kahneman & Tversky (1979) replaced expected utility with three modifications:

1. **Reference dependence.** Outcomes are evaluated against a reference point, not in absolute terms.
2. **Loss aversion.** Losses hurt more than equivalent gains feel good (typical ratio: ~2.25× weight on losses).
3. **Diminishing sensitivity.** Both gains and losses have a concave value function (logarithmic-ish near zero, flat far from reference).

The Kahneman-Tversky **value function**:

$$v(z) = \begin{cases} z^{\alpha} & \text{if } z \geq 0 \\ -\beta \cdot (-z)^{\gamma} & \text{if } z < 0 \end{cases}$$

with $\alpha, \gamma \in (0, 1)$ (concavity) and $\beta > 1$ (loss aversion). KTO parameterizes this and uses it as the alignment objective.

## The KTO loss

For a sample $(x, y, \text{label})$ where label $\in \{+1, -1\}$ (desirable or undesirable):

$$z(x, y) = \beta \cdot \left(\log \frac{\pi_\theta(y \mid x)}{\pi_{\text{ref}}(y \mid x)}\right) - z_{\text{ref}}$$

where $z_{\text{ref}}$ is a running estimate of the average log-ratio over the batch (the reference point — KL divergence proxy).

The per-sample loss is:

$$\mathcal{L}_{\text{KTO}} = \begin{cases} \lambda_d \cdot (1 - \sigma(z)) & \text{if label}=+1 \\ \lambda_u \cdot (1 - \sigma(-z)) & \text{if label}=-1 \end{cases}$$

where:
- $\lambda_d$ is the *desirable* weight (typically 1.0).
- $\lambda_u$ is the *undesirable* weight (typically 1.0–2.0; embodies loss aversion).
- $\sigma$ is the sigmoid (the prospect-theory value function approximation).

The asymmetry $\lambda_u / \lambda_d$ encodes loss aversion: rejected outputs hurt more than chosen outputs help.

## What's actually happening

For desirable samples, KTO maximizes $\sigma(z)$ — pushes $\pi_\theta(y)$ above $\pi_{\text{ref}}(y)$ (relative to the running reference $z_{\text{ref}}$).

For undesirable samples, KTO maximizes $\sigma(-z)$ — pushes $\pi_\theta(y)$ below $\pi_{\text{ref}}(y)$.

The reference point $z_{\text{ref}}$ matters: it makes the loss adapt to the *average* policy-vs-reference shift in the batch, so the gradient on any one sample scales with how *anomalous* that sample is. Mirrors prospect theory: $1000 raise feels good if your colleagues got $500, less good if they got $5000$.

## Pseudocode

```python
def kto_loss(model, ref_model, batch,
             beta=0.1, lambda_d=1.0, lambda_u=1.0):
    logp_pol = log_prob(model, batch.prompts, batch.responses)
    logp_ref = log_prob(ref_model, batch.prompts, batch.responses)
    log_ratio = logp_pol - logp_ref
    
    # Reference point: running average over batch
    z_ref = (beta * log_ratio).detach().mean()
    z = beta * log_ratio - z_ref
    
    is_desirable = (batch.labels == +1)
    loss_pos = lambda_d * (1 - torch.sigmoid(z[is_desirable])).mean()
    loss_neg = lambda_u * (1 - torch.sigmoid(-z[~is_desirable])).mean()
    
    return loss_pos + loss_neg
```

## Comparison

| Method | Data shape | Reference model | Loss aversion | Best for |
|---|---|---|---|---|
| **SFT** | $(x, y)$ chosen only | none | n/a | Quality-controlled instruction data |
| **RLHF** | $(x, y_w, y_l)$ pairs | reward model + reference | implicit in reward | Large preference datasets |
| **DPO** | $(x, y_w, y_l)$ pairs | $\pi_{\text{ref}}$ | none (symmetric) | Standard pair data |
| **[[ORPO]]** | $(x, y_w, y_l)$ pairs | none | none (symmetric) | Single-stage alignment |
| **KTO** | $(x, y, \text{label}\in\{\pm 1\})$ | $\pi_{\text{ref}}$ | **explicit** | Real-world thumbs-up/down logs |

## Empirical results (Ethayarajh 2024)

| Setting | Pythia-6.9B | Llama-2-13B |
|---|---|---|
| SFT only | 12.0% | 17.5% |
| DPO | 18.4% | 24.7% |
| KTO (paired data) | **18.9%** | **25.5%** |
| KTO (unpaired thumbs-up/down only) | 17.1% | 22.9% |

Two key results: (1) KTO matches or beats DPO on the same paired data; (2) KTO degrades only modestly when you switch from paired to unpaired data — DPO can't run at all in the unpaired setting.

## When to choose KTO

- **Production thumbs-up/down logs** — most common KTO use case.
- **Imbalanced datasets** (e.g., 90% positive labels) — KTO handles this gracefully via $\lambda_u, \lambda_d$.
- **Loss-aversion-aligned safety** — strongly penalizing rare bad outputs over rewarding common good ones.
- **Multi-source feedback** — combining ratings from different sources without forcing pair construction.

## When DPO/ORPO/RLHF still win

- **High-quality manually-curated pair data** — DPO is simpler and slightly more stable on clean pairs.
- **No SFT checkpoint** — ORPO is one-stage; KTO requires SFT first.
- **Fine-grained reward signals** (1–7 scale) — RLHF can use the gradient; KTO collapses to binary.

## Failure modes

- **Severely imbalanced labels** — if 99% of data is positive, the reference point drifts and gradient flattens. Mitigate with class-balanced batching.
- **Reward model bias** — KTO's labels still reflect the labelers; KTO doesn't fix labeling bias, it just propagates it more efficiently.
- **Insufficient $\lambda_u$** — model fails to suppress rare-but-harmful outputs. Tune up to 2.0–3.0 for safety alignment.

## Connections

- [[Direct Preference Optimization]] — closest sibling; same reference-model framing
- [[ORPO]] — single-stage alternative; requires pairs
- [[RLHF]] — older parametric counterpart
- [[Fine-Tuning]] — parent topic
- [[Reward Modeling]] — KTO's binary labels can be viewed as a 2-class reward
- [[Half Fine-Tuning]] — orthogonal training optimization
- [[Low-Rank Adaptation]] — composes with KTO
- [[Parameter-Efficient Fine-Tuning]] — orthogonal
- [[RLHF]] — note that DPO/KTO/ORPO all attempt to displace it
