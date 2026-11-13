---
title: "Graph Engineering vs Loop Engineering: What Actually Changed"
source: "https://www.louisbouchard.ai/graph-engineering-explained/"
author:
  - "[[Louis-François Bouchard]]"
published: 2026-07-22
created: 2026-09-13
description: "Graph engineering explained: why the viral loops-versus-graphs debate misses the point, what actually changed in agent orchestration, and what should stay code."
tags:
  - "clippings"
---
If you spend any time in the AI Twitter bubble, you saw this one. Nine words from Peter Steinberger, the creator of OpenClaw, that had pulled 2.6 million views by the time I recorded my video on it. Probably more by now. Then Hamel Husain, famously known for AI evals, piled on: “Loop engineering is dead. Enter graph engineering.” And just like that, my whole feed decided we have a new discipline.

To be honest, both tweets were jokes. Steinberger was poking at how fast we rename things. Prompt engineering became context engineering, then [harness engineering](https://www.louisbouchard.ai/harness-engineering/), and then [loop engineering](https://www.louisbouchard.ai/loop-engineering/). Which all mostly means the same. But jokes go viral when they point at something real and relatable, and this one does. Even for those of us without an OpenAI employee’s budget.

Prefer to watch this one? The full video version is right here, and the article continues below.

![](https://www.youtube.com/watch?v=MDHcmWmvqvo)

I made a video on loop engineering a few weeks ago, and apparently it died before some of you even got a chance to watch it. So let’s cover what graph engineering actually is and which part deserves your attention. One thing did quietly change, and there is some interesting stuff in this vastly overhyped fuss. It is not the graph part.

## A quick recap on loops

Compared to just prompting a model, as in ChatGPT, a loop has an agent acting toward a goal, an external verifier checking the result, failed work going back in, and a stop condition ending it. One loop, one job. The whole point was to remove the human from that loop, or at least reduce our workload as reviewers. You can implement a basic version inside the prompt itself: ask the model to review its work until it reaches a condition you can check, like code tests that pass.

## Where graphs actually start

The graph conversation starts when one loop is not enough, which shows up fast in code review systems or any genuinely complex task. Say Codex works on a change and opens a pull request. With the right setup, automated scans fan out several audit agents in parallel for each new PR. Their findings converge into a verifier. Confirmed problems go to a fixer, then the test suite. Tests fail, work loops back. Tests pass, the review ships.

You are simulating multiple employees working together, handing work over, reviewing it, going back and forth. That structure of work, the one we already know as humans, is a graph. Which is why “loops versus graphs” is not even a pertinent comparison. Graphs contain loops. A graph is just the extra layer where we trust agents even more to replace us.

## The concept is not new

That is my problem with the bubble sometimes: the concept itself is not new. Anthropic’s Building Effective Agents post from 2024 already drew every one of these patterns: chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer. Put any of them on a whiteboard and you get a graph. Zoom out further and this is workflow engines, DAG schedulers, and state machines. Airflow has been a graph of tasks for a decade, with tooling more battle-tested than most agent frameworks today.

## What actually changed

So why is everyone talking about it now? Because of what lives inside the nodes. A step in a normal pipeline follows fixed rules. An agent interprets its task, so it can misread the instruction or choose differently on the next run. And until recently, we hid all of that inside one giant chat context, where the model was the scheduler, the database, the log, and the project manager at once.

That works for small jobs. It falls apart once the work spans hours, repos, and many agents. Drawing the graph forces you to think about the process and set it up once and for good: what runs in parallel, what state crosses between nodes, who can veto a result, and what it all costs before it stops. Those questions were always there. Chat windows just made them easy to postpone.

If you want to feel this concretely, Claude Code’s dynamic workflows are this exact idea running for real: the plan becomes a program that spawns subagents, runs them in parallel, and retries failures without you babysitting the chat. You can do the same thing with Codex in just a prompt using 5.6 Sol Ultra, asking it to spawn subagents for specific tasks and leverage other threads. You can even spawn a Codex subagent from Claude Code with the Codex MCP, which is my current favourite way to have models work with each other in a token-efficient way.

## Organized nonsense at industrial scale

The best take came from Carlos Perez, and it is one worth remembering: a graph of agents checking agents can produce extremely organized nonsense. Twenty agents on the same model, reading the same flawed context, agree with each other at industrial scale. As we all know, especially if you have been watching my videos for a while, models tend to prefer their own answers, which means they also tend to agree with each other. If you work with multiple agents in a graph, you need a thought-through judging system with multiple reviewers coming from different models with fresh context. And ideally, a human check for the important pushes.

Carlos had one fix, and I agree with him: some evidence has to come from outside the agent system. Tests that actually ran. Money that reached the bank. Customers who stayed. Or an expert human reviewer agreeing or not with the final result. It needs something deterministic, or at least something outside the graph. You cannot automate everything.

## Start simple, grow when forced

Loop engineering is not dead. Graph engineering is this week’s name for taking orchestration a bit more seriously now that we have access to models like 5.6 and Fable. The durable skill is deciding which parts of your system deserve a probabilistic agent and which should stay boring, deterministic code. That one will not get renamed away.

Do you think this graph engineering fuss is pure hype, or are there interesting new paradigms here for working with LLMs? Let me know what you think. Thanks for spending your time here, and I will see you in the next one with a very good project example of my current setup for working with agents.

## FAQ

What is graph engineering?

Graph engineering means connecting several agent loops into one orchestrated system with parallel branches, verifiers, handoffs, shared state, and stop conditions, instead of running everything inside a single chat context.

Is loop engineering dead?

No. A graph is what you build when one loop is no longer enough, and every useful agent graph still contains loops. The viral tweets were jokes about how fast the field renames things.

What is the difference between a loop and a graph of agents?

A loop is one agent working toward one goal with a verifier and a stop condition. A graph coordinates several of those loops, deciding what runs in parallel, what state crosses between nodes, who can veto a result, and when everything stops.

Do I need a framework to build an agent graph?

No. Start with one recurring task, a real verifier, a state you can inspect, and a hard stop. Existing workflow engines and schedulers already model graphs, and tools like Claude Code workflows or the Codex MCP cover most orchestration needs before a dedicated framework does.

Why do multiple agents agree on wrong answers?

Models tend to prefer their own outputs, so agents built on the same model reading the same flawed context validate each other. Mixing reviewer models, giving them fresh context, and requiring evidence from outside the system are the practical defenses.