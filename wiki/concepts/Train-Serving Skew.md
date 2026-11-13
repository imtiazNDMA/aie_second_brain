---

title: Train-Serving Skew
type: concept
tags: [mlops, deployment, data-quality, model-reliability, cluster/serving-inference]
sources: [2026-04-12-ai-engineering]
created: 2026-07-10
updated: 2026-07-10
---


# Train-Serving Skew

## Definition

Train-Serving Skew is the mismatch between how features, inputs, or preprocessing are produced during training and how they are produced at inference time. In [[MLOps]], it is one of the most common causes of silent production failure: offline metrics look strong, but online behavior degrades because the served model is not seeing the same data shape it was trained on.

## Common causes

- different preprocessing code in training and serving paths
- missing or stale online features
- inconsistent categorical encoding
- time leakage in offline training data
- schema drift between batch and real-time pipelines
- training on cleaned data while serving on noisier real-world data

## Why it matters

- It produces misleadingly strong offline evaluation.
- It causes production regressions without changing model weights.
- It is often hard to debug because the model itself may be correct while the input pipeline is wrong.

## Detection strategies

- compare feature distributions between training and serving
- log raw and transformed inputs in production
- validate schemas at the serving boundary
- use shadow or replay testing on historical production traffic
- monitor sudden drops in prediction quality after deployment

## Mitigation patterns

- reuse the same feature-transformation code in both training and serving
- centralize feature generation through a [[Feature Store]] or shared pipeline
- add strict schema and null checks at inference time
- version training data, preprocessing logic, and model artifacts together
- run canary deployments before full rollout

## Related concepts

- [[MLOps]]
- [[Model Registry]]
- [[Feature Store]]
- [[ML Monitoring]]
- [[Continuous Training]]

## Sources

- [[2026-04-12-ai-engineering]]
