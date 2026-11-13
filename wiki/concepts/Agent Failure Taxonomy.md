---

title: Agent Failure Taxonomy
type: concept
tags: [agents, agentops, reliability, evaluation, failure-modes, cluster/agents]
sources: [2026-04-12-ai-agents-in-action, 2026-07-07-building-ai-agents-with-llms-rag-knowledge-graphs]
created: 2026-07-10
updated: 2026-07-10
---


# Agent Failure Taxonomy

## Definition

Agent Failure Taxonomy is the structured classification of how AI agents fail in production. In [[Agent Operations]], this taxonomy is used to debug agent traces, design guardrails, define evaluation categories, and decide where to add approvals, retries, or fallbacks.

## Why a taxonomy is needed

- Agent runs fail in more ways than standard model calls.
- Different failure classes need different mitigations.
- Evaluation becomes clearer when failures are labeled consistently.

## Major failure classes

### 1. Reasoning failures

- incorrect decomposition of the task
- wrong intermediate assumptions
- contradiction between steps
- premature stopping

### 2. Tool-use failures

- wrong tool selected
- correct tool called with bad arguments
- failed tool invocation not handled correctly
- tool output misunderstood by the agent

### 3. Memory failures

- relevant memory not retrieved
- stale or corrupted memory used
- important prior constraint forgotten
- long-term memory polluted by bad writes

### 4. Control-loop failures

- repeated ineffective steps
- runaway loops
- excessive chain length for simple tasks
- failure to escalate when stuck

### 5. Safety and policy failures

- unsafe action proposed
- unauthorized tool or data access attempted
- instruction hierarchy violated
- approval gate bypass attempt

### 6. Output-quality failures

- task completed incorrectly
- answer incomplete or unsupported
- poor formatting or schema violations
- user intent only partially satisfied

### 7. Operational failures

- latency too high
- token or tool cost too high
- dependency outage breaks the workflow
- trace or logging gaps block diagnosis

## How to use this taxonomy

1. Label failed runs by primary and secondary failure class.
2. Aggregate failure counts over traces.
3. Tie each class to a mitigation owner: prompt, tool, memory, policy, or infra.
4. Build eval sets that intentionally stress the high-frequency failure classes.

## Related concepts

- [[Agent Operations]]
- [[Agentic Systems]]
- [[Tool Use]]
- [[Agent Trust and Safety]]
- [[Prompt Versioning]]
- [[LLMOps]]

## Sources

- [[2026-04-12-ai-agents-in-action]]
- [[2026-07-07-building-ai-agents-with-llms-rag-knowledge-graphs]]
