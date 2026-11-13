---
title: "Prompt Engineering vs Loop Engineering vs Graph Engineering"
source: "https://www.designgurus.io/blog/prompt-engineering-vs-loop-engineering-vs-graph-engineering?gad_source=1&gad_campaignid=23163907085&gbraid=0AAAAADME9yosji6kNXDyc82yIVr6z__Ph&gclid=Cj0KCQjwk5nVBhDiARIsAHNGqafaZhOvmum9KwAuf3t6QVkNP2ByrRpvgTYYfcu9yLRAuMdYP9Pm8KEaAoztEALw_wcB"
author:
published: 1787-10-10
created: 2026-09-13
description: "Prompt engineering vs loop engineering vs graph engineering: what each approach is, what you actually engineer in each, how they fail, and how to choose."
tags:
  - "clippings"
---
We use cookies to provide you with an optimal experience and relevant communication.[Cookie Policy](https://www.designgurus.io/cookie-policy)

Prompt engineering vs loop engineering vs graph engineering: what each approach is, what you actually engineer in each, how they fail, and how to choose.

![Image](https://www.designgurus.io/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fdownload%2Fstorage%2Fv1%2Fb%2Fdesigngurus-prod.appspot.com%2Fo%2Farticle%252Fadhoc%252Fimg%3A4d6fe81-4f03-076-f41-2c8855f16e8.png%3Fgeneration%3D1785333614131302%26alt%3Dmedia&w=1200&q=75&dpl=dpl_BhddNXsU8g9EXMswiSEqvEdJDeaF)

The Three at a Glance

Prompt Engineering: One Call In, One Answer Out

Loop Engineering: The Model Decides the Next Step

What You Actually Engineer in a Loop

Why Loops Are Hard

Graph Engineering: You Decide the Path

What Graphs Buy You

What Graphs Cost You

How to Choose

They Compose, and Real Systems Use All Three

Evaluation Changes at Every Layer

What to Say in a System Design Interview

Frequently Asked Questions

Is prompt engineering obsolete?

Is loop engineering just another word for building an agent?

Where does context engineering fit?

Do I need a framework to build a graph or a loop?

Which should I learn first?

How do I know if my loop is properly bounded?

There are three ways to get real work out of a language model. You can ask it once and use the answer (prompt engineering). You can let it run in a cycle with tools until the job is done (loop engineering). Or you can draw the steps and the connections between them ahead of time and let the model fill in the boxes (graph engineering).

Only the first of those has a settled name. "Loop engineering" and "graph engineering" are labels that have grown up around two disciplines that turned out to be real jobs once teams started shipping systems instead of demos. The names matter less than the distinction underneath them, which is the point of this article.

Here is that distinction in one sentence: **the three approaches differ in who decides the next step.** In prompt engineering there is only one step. In loop engineering the model decides at run time. In graph engineering you decide at design time. Everything else, cost, testability, failure modes, follows from that one choice.

![Prompt, loop, and graph engineering compared: a single call with no routing, a bounded loop where the model picks the next step at run time, and a graph where you draw the steps and edges at design time](https://storage.googleapis.com/download/storage/v1/b/designgurus-prod.appspot.com/o/article%2Fadhoc%2Fimg:2fc80d-7e7-22e0-7e20-6a4ff803da3.png?generation=1785333615446112&alt=media)

## The Three at a Glance

|  | Prompt engineering | Loop engineering | Graph engineering |
| --- | --- | --- | --- |
| Unit of work | One model call | One run | One graph |
| Who picks the next step | Nobody, there is one step | The model, at run time | You, at design time |
| What you write | Instructions, examples, output format | Tools, budgets, the loop around the model | Nodes, edges, and the state passed between them |
| Typical failure | A wrong or badly formatted answer | A run that wanders, stalls, or burns money | A case that has no path through your graph |
| How you test it | Input and output pairs | Whole trajectories, plus cost and step counts | Each node on its own, plus the routing |
| Cost per request | Predictable | Variable, sometimes wildly | Predictable within known bounds |
| Best fit | One well specified task | Open ended work where the steps are unknown | A known process with branches |

Read that table as a ladder, not a menu. Each rung costs more to build and more to operate. The right move is always the lowest rung that solves the problem.

## Prompt Engineering: One Call In, One Answer Out

Prompt engineering is the craft of getting a good answer from a single model call. You control four things and nothing else: the instructions, the examples, the context you paste in, and the shape of the output you ask for.

That is a smaller surface than people expect, and it is more powerful than people expect. Most production LLM traffic is still single calls: classify this ticket, summarize this document, extract these fields, rewrite this paragraph, answer this question from this retrieved text. These tasks are fully specified. There is nothing for a model to decide beyond the answer itself.

What good looks like at this layer:

- **Say what you want, not what you do not want.** Positive examples of the target output beat a list of prohibitions.
- **Constrain the output shape.** Ask for a schema and validate it in code. Most model providers now support a structured output mode that guarantees valid JSON against a schema, which removes an entire class of parsing bugs.
- **Put the stable text first.** Providers cache repeated prefixes, so a frozen instruction block followed by the varying question is much cheaper than a template that interpolates a timestamp into the first line.
- **Give the model the evidence.** Most "the model is wrong" bugs are really "the model was never told," and the fix is retrieval, not a cleverer instruction.

Where this layer stops is easy to name. One call cannot check its own work against the world. It cannot look anything up that you did not hand it. It cannot take an action. And it gets exactly one attempt at quality. When the task needs any of those, you are no longer writing a prompt. You are building a system, and you have two ways to build it.

## Loop Engineering: The Model Decides the Next Step

A loop is what turns a model into an agent. The whole idea fits in five lines:

```
context = [the task]
while budget remains:
    reply = model(context, tools)
    if reply has no tool call: break
    result = execute(reply.tool_call)
    context += [reply, result]
```

That is it. The model looks at the state, picks a tool, your code runs the tool, the result goes back into the context, and the model looks again. The loop ends when the model stops asking for tools or when a limit you set stops it first.

The five lines are not the work. The work is everything around them, and that is loop engineering.

### What You Actually Engineer in a Loop

- **The tool surface.** Fewer tools, sharply described. Write each description to say *when* to call the tool, not just what it does. "Call this when the user asks about current pricing or recent events" produces measurably better tool selection than "searches the web." Tool descriptions are prompt engineering with a different name.
- **The stopping condition.** "The model stopped asking for tools" is not the same as "the work is correct." Strong loops finish with a verification step: run the tests, re-read the file, check the invariant.
- **Budgets.** Every loop ships with three limits: maximum steps, a token or dollar cap, and a wall clock timeout. You also need a plan for what happens when one runs out. Failing loudly with partial results beats stopping silently.
- **Context management.** The window fills up as the loop runs. You decide what stays: clear old tool results, summarize the middle of the run, or have the model write findings to a scratch file it can re-read. This sub-discipline has its own name now, context engineering, and it is where most loop quality is won or lost.
- **Error handling.** A failed tool call is not an exception to throw. It is a result to return, marked as an error, so the model can adapt. A loop that crashes on the first bad argument is a loop that never recovers from anything.
- **Blast radius.** Split tools by reversibility. Reading is free. Writing to a scratch directory is cheap. Sending an email, moving money, or dropping a table is not, and those belong behind an approval gate or behind a permission the loop does not hold.
- **Observability.** Your unit of debugging is no longer a response. It is a trajectory: every step, every tool call, every result, with token counts attached. If you cannot replay a bad run step by step, you cannot fix it.

### Why Loops Are Hard

Errors compound. If each step is ninety-five percent reliable, twenty steps land you near thirty-six percent. Loops that work in a demo fall apart on long tasks for exactly this reason, and the fix is fewer steps, better tools, and verification inside the loop, not a better instruction at the top.

Cost is a distribution, not a number. The same request can take three steps or thirty. You cannot quote a price per request without a budget, which is why budgets are not optional.

And failure is quiet. A confused loop rarely throws. It keeps calling tools, produces something plausible, and reports success. This is the single most important thing to say out loud when you design one.

## Graph Engineering: You Decide the Path

A graph is a set of steps you draw before anything runs. Each node does one unit of work. Each edge says what runs next, sometimes conditionally. A typed state object travels along the edges and accumulates results.

The model still does the thinking inside the nodes. It just does not choose the route. Your code does, which is why this approach is sometimes called workflow orchestration, and why frameworks built around it (graph runners, DAG engines, durable state machines) look more like build systems than like chatbots.

A handful of shapes cover most real graphs:

- **Chain.** Step A feeds step B feeds step C. Use it when a task is easier as three focused calls than one crowded one.
- **Router.** One cheap classifier picks the branch, and each branch is tuned for its case. This is the highest value shape in most products, because it lets you send easy traffic to a small fast model and hard traffic to a big one.
- **Fan out and gather.** Run N independent calls in parallel and merge the results. Good for reviewing a diff along several dimensions at once, or checking one claim from several angles.
- **Generate and critique.** One node produces, a second node grades against explicit criteria, and the graph loops back a fixed number of times. This is a loop, but a bounded one you drew yourself, which is a different risk profile from a model deciding to keep going.
- **Approval gate.** The graph stops, persists its state, waits for a human, and resumes. This is nearly impossible to do cleanly inside a free running loop and nearly free inside a graph.

### What Graphs Buy You

- **Determinism where it matters.** The path is your code. The same input takes the same route every time.
- **Testable pieces.** Each node has typed input and typed output, so you can unit test it. You cannot unit test "the agent."
- **Resumability.** Checkpoint the state at each node and a crashed run restarts from the last good step instead of the beginning. On a long expensive job this is the whole ballgame.
- **Cost control by construction.** A cheap model on the classifier node and an expensive one on the two hard nodes is a large cost cut that costs you nothing in quality.
- **An audit trail.** Every step, with its input and output, in order. Regulated domains effectively require this.

### What Graphs Cost You

You have to know the steps in advance. When the work genuinely varies per input, you either draw a graph with an unmanageable number of edges or you keep discovering cases with no path through it. That is the moment a loop earns its keep, and not before.

## How to Choose

Start at the bottom and move up only when you are forced to. Anthropic's own guidance for building agents makes the same argument: use the simplest approach that works, and reach for an agent only when the task is genuinely open ended.

Four questions settle most designs.

1. **Can you write the steps down?** If you can list them on a whiteboard, build a graph. If the steps depend on what the model finds along the way, you need a loop.
2. **What does a wrong step cost?** If a mistake is cheap and reversible (a draft, a suggestion, a search), a loop is fine. If it is expensive or hard to undo, either use a graph or put approval gates on the dangerous tools.
3. **Do you need to explain what happened?** Audits, compliance, and support escalations all want a fixed record of steps. Graphs give you one for free.
4. **Is there a hard latency budget?** Loops have unbounded tails. Interactive surfaces usually want a single call or a short graph, with the loop pushed into a background job.

One more rule worth internalizing: **do not build an agent to do a job a graph already does.** The agent will be slower, more expensive, less testable, and correct slightly less often. Reserve loops for the problems that actually need them.

## They Compose, and Real Systems Use All Three

This is the part that gets lost in versus framing. These are layers, not competitors. A production system is usually a graph, some of whose nodes contain bounded loops, all of whose nodes are prompts.

Take support ticket resolution:

1. **Classify the ticket** (single call, small model, strict output schema).
2. **Route on the class** (plain code, no model involved).
3. **Answer a question** by retrieving the relevant help center documents and generating a grounded answer with citations (single call plus retrieval).
4. **Perform an action** such as issuing a refund or reshipping an order. This node is a bounded loop, because the steps depend on the account state, with scoped tools, a step cap, and an approval gate above a dollar threshold.
5. **Verify** the outcome against the original request (single call acting as a grader).
6. **Escalate to a human** on low confidence, budget exhaustion, or a failed verification.

Every layer appears. The graph gives the system its shape and its audit trail, the one loop absorbs the genuine uncertainty, and each node is a prompt someone had to write well. That is what most good AI systems look like underneath.

## Evaluation Changes at Every Layer

A quiet trap: teams move from prompts to loops and keep evaluating like it is still prompts.

- **Prompt layer.** A set of input and output pairs, scored automatically. Cheap to build, run it on every change.
- **Graph layer.** Unit tests per node, plus routing tests that assert the right branch was taken for a given input. A router that misclassifies is a bug you can catch in continuous integration.
- **Loop layer.** You grade trajectories, not answers. Did the run reach the goal? How many steps did it take? What did it cost? Which tool calls were wasted? Keep a small set of golden tasks with known-good runs and treat a regression in steps or cost as seriously as a regression in the answer.

If you can only afford one, build the loop evaluation, because that is the layer where problems hide.

## What to Say in a System Design Interview

Agentic design questions now show up in interviews, usually phrased as "design an agent that does X." Interviewers are listening for a small number of specific things, and they map exactly onto this article:

- **Name the layer and defend it.** "This is a fixed process with four branches, so I will build it as a workflow and not as an agent" is a strong opening, and it is the answer many candidates skip past.
- **Bound the loop out loud.** Maximum steps, cost cap, timeout, and what happens when each one trips.
- **Scope the tools.** List them, say which are read only, and put irreversible actions behind a human approval or a hard permission check that fails closed.
- **Say how you measure quality.** Task success rate, cost per completed task, and human escalation rate. An agent with no evaluation story is an agent nobody can operate.
- **Name the silent failure.** Agents rarely crash. They finish confidently with the wrong result. Naming that risk without being asked marks you as someone who has run one of these in production.

Our [complete guide to the AI system design interview](https://www.designgurus.io/blog/ai-system-design-interview) covers the wider round, including how agentic questions sit next to recommendation, ranking, and retrieval systems. If you want the foundations underneath all of it, [Grokking Modern AI Fundamentals](https://www.designgurus.io/course/grokking-modern-ai-fundamentals?utm_source=blog&utm_medium=post&utm_campaign=prompt-loop-graph-engineering) is the place to start.

## Frequently Asked Questions

### Is prompt engineering obsolete?

No. It moved inward. Every node in a graph and every turn in a loop is still a model call whose quality depends on its instructions, its examples, and its context. What changed is that prompt quality is now one input to a larger system instead of the whole system.

### Is loop engineering just another word for building an agent?

Essentially, yes. An agent is a model in a loop with tools. "Loop engineering" is a useful name because it puts the attention where the difficulty actually is: the tools, the budgets, the context policy, and the stopping condition, rather than the personality of the model.

### Where does context engineering fit?

It cuts across all three. Context engineering is the practice of deciding what goes into the window for each call: which instructions, which retrieved documents, which prior steps, which tool results. It is a small problem for a single call, a moderate one for a graph, and the dominant problem for a long running loop, where the window fills up and something has to be dropped or summarized.

### Do I need a framework to build a graph or a loop?

No. A loop is ten lines of code, and a small graph is a switch statement. Frameworks start paying for themselves when you need durable state, checkpointing and resume, retries with backoff per node, parallel branches, and a visual trace of what ran. Start without one and adopt it when you feel the specific pain it solves.

### Which should I learn first?

Prompts, then graphs, then loops. That order matches how difficulty and cost of failure increase, and each layer is built out of the one before it. Skipping to agents first is the most common reason teams end up with something impressive in a demo and unshippable in production.

### How do I know if my loop is properly bounded?

Answer three questions without looking at the code: what is the maximum number of steps, what is the maximum spend, and what happens when either limit is hit. If any answer is "I am not sure," the loop is not bounded, it just has not run away yet.

---

The three approaches are not rivals. They are rungs on a ladder, and the skill is knowing which rung a given problem belongs on. Write a prompt when the task is fully specified. Draw a graph when you know the steps. Build a loop only when the steps genuinely depend on what the model discovers along the way, and then spend your effort on the tools, the budgets, and the verification rather than on the wording.

If you want to go deeper on designing these systems end to end, including bounded agent loops, tool permissions, evaluation, and the cost math behind them, [Grokking the AI System Design Interview](https://www.designgurus.io/course/grokking-the-ai-system-design-interview?utm_source=blog&utm_medium=post&utm_campaign=prompt-loop-graph-engineering) walks through agentic systems alongside the retrieval and generative designs that surround them.

AI

System Design

Interview Preparation

### What our users say

Ashley Pean

Check out Grokking the Coding Interview. Instead of trying out random Algos, they break down the patterns you need to solve them. Helps immensely with retention!

Steven Zhang

Just wanted to say thanks for your Grokking the system design interview resource (https://lnkd.in/g4Wii9r7) - it helped me immensely when I was interviewing from Tableau (very little system design exp) and helped me land 18 FAANG+ jobs!

MO JAFRI

The courses which have "grokking" before them, are exceptionally well put together! These courses magically condense 3 years of CS in short bite-size courses and lectures (I have tried Grokking System Design Interview, OODI, and Coding patterns). The Grokking courses are godsent, to be honest.

Annual Subscription

Get instant access to all current and upcoming courses for one year.

Access to 50+ courses

New content added monthly

Certificate of completion

$5.33

/month

Billed Annually