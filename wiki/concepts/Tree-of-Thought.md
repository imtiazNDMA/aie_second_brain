---
title: Tree-of-Thought
type: concept
tags: [prompting, reasoning, search, agents]
sources: [2026-04-12-ai-agents-in-action, 2026-04-12-prompt-engineering-llms]
created: 2026-04-30
updated: 2026-04-30
---

# Tree-of-Thought

## Definition

**Tree-of-Thought (ToT)** is a deliberate-search generalization of [[Chain-of-Thought]] introduced by Yao et al. 2023. Instead of generating one linear reasoning chain, the model maintains a *tree* of partial reasoning states; at each node the model expands several candidate next-thoughts, evaluates them, and explores the most promising branches. Search is typically BFS or DFS with pruning.

ToT trades latency for solution quality on problems where one greedy chain frequently fails — Game of 24, mini crosswords, creative writing under constraint.

## Why a tree?

A linear CoT commits to a reasoning step before knowing whether it pans out. If step $k$ is wrong, every step after $k$ inherits the error. A tree lets the model:

1. Generate **multiple** candidate next-steps (typically 3–5).
2. **Evaluate** each candidate on a scalar score (likely-correct, sure / maybe / impossible).
3. Keep the top-$b$ candidates (beam) and recurse.
4. Backtrack when a branch dead-ends.

This is classical heuristic search where the LLM provides both the *successor function* and the *heuristic*.

## Algorithm sketch

```
function ToT(problem, depth_limit, beam_b, k_candidates):
    frontier = [Node(state=initial_partial_solution(problem), depth=0)]
    best = None
    while frontier:
        # Expand all frontier nodes
        next_frontier = []
        for node in frontier:
            if is_terminal(node.state):
                if better(node, best): best = node
                continue
            if node.depth >= depth_limit: continue
            candidates = LLM.expand(node.state, k=k_candidates)
            scored = [(LLM.evaluate(c, problem), Node(c, node.depth+1)) for c in candidates]
            scored.sort(reverse=True)
            next_frontier.extend(child for _, child in scored[:beam_b])
        frontier = next_frontier
    return best
```

Two LLM calls per node: **expand** (generate next thoughts) and **evaluate** (rate them).

## Search strategies

| Strategy | Best for | Cost |
|---|---|---|
| **BFS with beam-$b$** | Problems with short, parallel branches (Game of 24) | $O(b \cdot d \cdot k)$ calls |
| **DFS with backtracking** | Deep proofs, creative writing | Lower expected cost; high variance |
| **Best-first / A\*** | Heuristic is well-calibrated | Best when evaluator is reliable |

## Evaluator design

The evaluator turns the LLM into a value function. Two common forms:

### 1. Vote-based
Sample $n$ evaluator calls per candidate ("Is this step on track? sure / maybe / impossible"). Average to get a continuous score.

### 2. Self-judge
A single call asks the model to compare a candidate against a goal and return a numeric score. Cheaper but less calibrated.

The evaluator is the bottleneck: a noisy evaluator turns ToT into expensive random search.

## When ToT helps

- **Combinatorial problems** with verifiable sub-goals (Game of 24, mini crosswords, sudoku).
- **Tasks with clear constraints** where infeasible partial solutions can be pruned early.
- **Creative writing under constraint** (e.g., "write a poem where every line starts with the next letter of a word") — branching lets the model salvage when a line fails.

## When ToT hurts

- **Single-step problems** where one CoT chain is enough.
- **Tasks without verifiable progress** — the evaluator has no signal, so search degenerates to expensive sampling.
- **Latency-sensitive** endpoints — ToT can cost 50–100× a single CoT call.

## Empirical numbers (Yao 2023)

- Game of 24: GPT-4 with CoT solves 4%; ToT solves 74%.
- Mini crosswords: CoT 16% letter-level → ToT 78%.
- Creative writing coherence (human eval): preference for ToT in 63% of comparisons.

## Comparison

| Method | Branches | Backtracking | Eval per step | Compute |
|---|---|---|---|---|
| CoT | 1 | No | 0 | $O(d)$ |
| Self-Consistency | $K$ parallel | No | 0 (vote at end) | $O(K \cdot d)$ |
| **ToT** | $b$ per node | Yes | $k$ per node | $O(b^d)$ before pruning |
| Graph-of-Thought | DAG | Yes (with merging) | Per node | Higher |
| ReAct + ToT | Variable | Implicit | Per action | Variable |

## Test-time compute framing

ToT is the canonical **search-based** form of [[Test-Time Compute Scaling]] — spending compute on tree expansion rather than on parallel samples ([[Self-Consistency]]) or sequential extension ([[Budget Forcing]]). The three families are complementary: a [[Reasoning Models|reasoning model]] can sample K trees, each with budget-forced thinking per node — composing all three forms of test-time compute.

## Connections

- [[Chain-of-Thought]] — single-branch ancestor of ToT
- [[Self-Consistency]] — flat sampling without explicit search
- [[Test-Time Compute Scaling]] — ToT is the search-based family member
- [[Reasoning Models]] — composable with ToT (search over trained-reasoning nodes)
- [[Budget Forcing]] — sequential alternative for spending compute
- [[ReAct]] — can be combined: branch on next *Action* instead of next *Thought*
- [[Reflexion]] — adds verbal-memory critique on top of ToT branches
- [[Reasoning Strategies]] — taxonomy
- [[Bayesian Optimization]] — analogous "expand-and-evaluate" search in continuous space
- [[Beam Search]] / [[Speculative Decoding]] — token-level analog of ToT's node-level search
