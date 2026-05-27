---
title: ReAct
type: concept
tags: [agents, reasoning, tool-use, prompting]
sources: [2026-04-12-ai-agents-in-action, 2026-04-12-building-ai-coding-agents-terminal, 2026-04-12-building-agentic-ai-systems, 2026-04-29-building-applications-with-ai-agents]
created: 2026-04-30
updated: 2026-04-30
---

# ReAct

## Definition

**ReAct** (Reasoning + Acting) is the canonical control loop for autonomous LLM agents. The model interleaves natural-language reasoning steps (`Thought:`) with tool invocations (`Action:`) and observed tool outputs (`Observation:`), repeating the cycle until it decides to emit a final answer. Introduced by Yao et al. 2022, it is now the substrate for nearly every production agent framework — [[LangChain]], [[LangGraph]], [[AutoGen]], [[CrewAI]], and the [[Claude Code]] / OpenDev family of coding agents.

## Motivation

Pure [[Chain-of-Thought]] reasons but cannot act on the world; pure tool-use acts but cannot plan. ReAct merges them: reasoning grounds tool selection, and tool observations ground the next reasoning step. This breaks the closed-world limit of static prompting and lets agents read files, query APIs, search the web, and update state mid-conversation.

## The Loop

```
Question: <user task>
Thought: <reasoning about what to do next>
Action: <tool name>(<tool args>)
Observation: <tool output>
Thought: <reasoning about the observation>
Action: ...
...
Thought: I now have enough information.
Answer: <final response>
```

Each `Thought → Action → Observation` triple is one **step**. The model emits text up to (and stops at) the next `Observation:` marker; the harness executes the tool and appends the real observation; the model resumes.

## Pseudocode

```python
def react_loop(task, tools, model, max_steps=10):
    transcript = SYSTEM_PROMPT + f"Question: {task}\n"
    for step in range(max_steps):
        completion = model.generate(
            transcript,
            stop=["Observation:"]
        )
        transcript += completion
        if "Answer:" in completion:
            return extract_answer(completion)
        action_name, action_args = parse_action(completion)
        if action_name not in tools:
            obs = f"Error: tool '{action_name}' not available."
        else:
            obs = tools[action_name](**action_args)
        transcript += f"Observation: {obs}\n"
    return "Step limit reached."
```

The harness owns: tool dispatch, observation formatting, step accounting, and stop-sequence enforcement. The model owns: reasoning quality, tool selection, and the decision to stop.

## Why it works

1. **Grounding.** Each Thought is conditioned on real observations, not hallucinated state. Hallucinated facts get corrected by the next observation.
2. **Decomposition.** The model breaks a multi-step task into a sequence of single-tool sub-tasks, each individually tractable.
3. **Self-correction.** When a tool returns an error, the next Thought reads the error verbatim and adapts.

## Failure modes

- **Tool hallucination** — the model invents a tool name that doesn't exist. Mitigate with strict JSON schemas and fail-fast harnesses.
- **Loop / oscillation** — alternating between two actions without progress. Mitigate with step caps and history-aware planners (see [[Reflexion]]).
- **Instruction fade-out** — over a long transcript the model forgets the system prompt. Mitigate with periodic prompt re-injection or context [[Compaction]].
- **Premature answering** — the model emits `Answer:` before all sub-questions are resolved. Mitigate with explicit completion criteria in the system prompt.

## Variants

| Variant | Difference |
|---|---|
| **Plain ReAct** | Single agent, single Thought-Action-Observation chain |
| **Extended ReAct** | Adds explicit `Thinking:` (slow reasoning) and `Compaction:` (summarize history) phases — used in OpenDev / Claude Code |
| **ReAct + [[Self-Consistency]]** | Run N parallel ReAct trajectories, vote on final answers |
| **ReAct + [[Reflexion]]** | After failure, generate a verbal critique and prepend it to the next attempt |
| **ReAct + Tree-of-Thought** | Branch on multiple Action candidates, score them, expand the best — see [[Tree-of-Thought]] |
| **Plan-and-Execute** | First emit a full plan, then execute step-by-step (less reactive but cheaper) |

## Comparison with related patterns

| Pattern | Reasoning | Action | Memory | When to use |
|---|---|---|---|---|
| Pure CoT | Yes | No | None | Closed-world QA, math |
| Pure tool-use | No | Yes | None | Single-call API tasks |
| **ReAct** | Yes | Yes | Transcript | Multi-step interactive tasks |
| Reflexion | Yes | Yes | Transcript + verbal memory | Tasks where past failures inform future attempts |
| Plan-and-Execute | Up-front only | Yes | Plan + transcript | Tasks with stable, predictable structure |

## Connections

- [[Chain-of-Thought]] — the reasoning half of ReAct without actions
- [[Tool Use]] — the action half of ReAct
- [[Reflection]] — adds a critique pass after each ReAct trajectory
- [[Reflexion]] — verbal-RL refinement of ReAct
- [[Self-Consistency]] — multi-trajectory voting layered on ReAct
- [[Compound AI Systems]] — production architectures built on top of ReAct
- [[R3A Loop]] — Mira Devlin's variant adding explicit Reflection between Reasoning and Action
- [[Agent Memory]] — what persists across ReAct steps and across sessions
- [[Reasoning Strategies]] — taxonomy that includes ReAct
- [[OpenAI Function Calling]] — JSON-schema implementation of the Action format
- [[LangChain]], [[LangGraph]], [[AutoGen]], [[CrewAI]] — frameworks implementing ReAct loops
