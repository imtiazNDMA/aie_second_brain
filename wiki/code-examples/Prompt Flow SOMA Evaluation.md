---
title: Prompt Flow SOMA Evaluation
type: code-example
tags: [prompt-flow, evaluation, soma]
sources: []
created: 2026-04-12
updated: 2026-04-12
---

# Prompt Flow SOMA Evaluation

Starter assets for running a Prompt Flow evaluation loop that scores generations with the [[SOMA Evaluation Framework]] (Subject, Objective, Medium, Audience). Assumes the Azure Prompt Flow CLI is installed.

## 1. Flow Structure (`flow.dag.yaml`)

```yaml
inputs:
  user_question:
    type: string
outputs:
  answer:
    type: string
nodes:
  - name: generate
    type: llm
    source:
      type: code
      path: generate.py
    inputs:
      question: ${inputs.user_question}
  - name: soma_eval
    type: python
    source:
      type: code
      path: soma_eval.py
    inputs:
      question: ${inputs.user_question}
      answer: ${nodes.generate.output}
```

## 2. Generation Node (`generate.py`)

```python
from promptflow import tool
from promptflow.connections import AzureOpenAIConnection

conn = AzureOpenAIConnection(api_key="${{connections.azure_openai.api_key}}", deployment="gpt-4o-mini")

@tool
    system = "You are an accurate assistant. Provide concise answers with citations when available."
    response = conn.chat_completion(model=conn.deployment, messages=[
        {"role": "system", "content": system},
        {"role": "user", "content": question}
    ])
    return response.choices[0].message["content"]
```

## 3. SOMA Evaluator (`soma_eval.py`)

```python
from promptflow import tool

RUBRIC = {
    "subject": "Is the answer on-topic for the user's question?",
    "objective": "Does it provide concrete facts, numbers, or steps?",
    "medium": "Is the tone/form appropriate (e.g., tutorial, summary)?",
    "audience": "Is it written for a practitioner audience?"
}

@tool
    scores = {}
    for dimension, prompt in RUBRIC.items():
        scores[dimension] = 1 if prompt.lower() in answer.lower() else 0
    scores["overall"] = sum(scores.values()) / len(RUBRIC)
    return {"scores": scores, "answer": answer}
```

Replace the scoring logic with an LLM grader (e.g., OpenAI or Azure) for higher fidelity. Prompt Flow will log these scores so you can visualize regression tests as described in [[Prompt Evaluation Workflows]].
