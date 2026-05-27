---
title: AI Coding Agents
type: synthesis
tags: [ai-coding-agents, claude-code, compound-ai, agentic-systems, developer-tools]
sources: [2026-04-12-building-ai-coding-agents-terminal, 2026-04-12-prompt-engineering-llms]
created: 2026-05-09
updated: 2026-05-09
---

# AI Coding Agents

Coding agents are the densest currently-shipping example of [[Compound AI Systems]] — a planner LLM coordinating retrieval over a codebase, tool calls (file edits, shell, tests), and self-evaluation, all under a long-running loop. The wiki has atomic pages on [[AI Coding Agent]], [[Claude Code]], [[Anthropic]], [[Compound AI Systems]], [[Tool Use]], [[Reflection]], [[Agent Memory]] but no synthesis tying them together. This page maps the architectural surface (terminal-native vs IDE-native vs API-driven), the substrate components, and the operational lessons that distinguish a useful coding agent from a dangerous one.

## What makes coding agents different from other agents

| Property | Coding agent | Generic agent |
| --- | --- | --- |
| Task verifiability | High — tests, type-check, build run | Low to medium |
| Action space | Bounded — files, shell, tests, git | Unbounded |
| Blast radius | Bounded but real — local FS, packages, repos | Highly variable |
| Loop length | Minutes to hours, hundreds of tool calls | Usually shorter |
| Context | Codebase (often large) + task | Mostly conversational |
| Evaluation signal | Tests pass / lint / type-check | Mostly LLM-as-judge |

The high verifiability is what makes the category work — tests are a free reward signal. It's why coding is the canonical [[RLVR]] domain and why coding agents reach reliability levels other agents don't.

## The three deployment surfaces

### Terminal-native (Claude Code, Aider, OpenDev)

The agent runs as a CLI inside the user's shell. Owns the working directory; reads/writes files directly.

**Pattern:** [[2026-04-12-building-ai-coding-agents-terminal]] documents the OpenDev architecture. Layers:

1. **REPL + slash-command surface** — interactive control, short-circuits for common ops
2. **Codebase index** — usually file-tree + tags + symbol search; sometimes embeddings
3. **Planner** — decomposes user goal into steps
4. **Tool executor** — bash, file read/write, edit, grep, glob
5. **Verifier** — run tests, type-check, lint between iterations
6. **Memory** — `CLAUDE.md` / `AGENTS.md` for durable instructions; conversation context for the rest

[[Claude Code]] is the canonical commercial example. The repo you're reading right now uses Claude Code (see this repo's `CLAUDE.md` and `.claude/` directory).

### IDE-native (Cursor, Windsurf, GitHub Copilot Workspace)

The agent runs inside the editor. Owns the editor's diagnostics, language-server, and selection.

**Pattern:** thinner planner, richer environmental signals (LSP errors, type info, test runner integration).

**Trade-off:** stronger code intelligence; weaker autonomy and tool surface than terminal-native.

### API-driven (autonomous services, GitHub Actions bots)

Agent runs headless as a service. Often consumes a ticket / issue / PR description.

**Pattern:** more akin to Devin / Cognition's published architecture; longer-horizon autonomy; PR-centric workflow.

**Trade-off:** highest autonomy ceiling; weakest interactivity; reliability is the hardest problem.

## The compound-system substrate

Per [[Compound AI Systems]], modern coding agents are *systems*, not single LLM calls:

```
User goal
  ↓
Planner LLM (large model, e.g., Claude Opus, GPT-5)
  ↓
Code retrieval (grep + glob + symbol search ± embeddings)
  ↓
Tool calls in sequence
  ├── File reads
  ├── File edits (Edit, Write tools)
  ├── Shell (test runs, build, git)
  └── Sub-agent dispatch (parallel exploration / specialist tasks)
  ↓
Verifier (tests, type-check, lint)
  ↓
Reflection ([[Reflection]] - check goal vs. state)
  ↓
Either terminate or loop
```

Each box can be a different model. The 2026 cost-effective pattern:

- **Strong planner** — Claude Opus / GPT-5 / Gemini 2.5 Pro for the main loop
- **Cheap retrievers** — Haiku / 4o-mini / Gemma for grep result ranking
- **Specialist sub-agents** — invoke the strong model only for hard sub-tasks

The economics roughly mirror [[Reasoning Models Landscape]]'s routing pattern: don't pay frontier-model prices for trivial steps.

## Tool design (the under-recognized leverage point)

The quality of a coding agent is dominated by tool design, not model size:

| Tool | Critical design choices |
| --- | --- |
| File read | Line numbers, ranges, large-file handling |
| File edit | Diff-based vs full-rewrite; verify-after-edit |
| Grep | ripgrep performance; output bounded; multiline support |
| Glob | Path patterns; ignore .gitignore correctly |
| Shell | Sandbox vs no-sandbox; secret handling; timeout |
| Test runner | Output parsing; flake handling; coverage signal |
| Sub-agent | Context isolation; budget cap; result format |

The tool suite is what an agent *can do*; the model is what it *should do*. A weak model with strong tools beats a strong model with weak tools on long-running tasks.

## Memory architecture for coding agents

[[Agent Memory Architectures]] gives the general pattern; coding-specific specializations:

- **Repo memory** — `CLAUDE.md` / `AGENTS.md` / `.cursorrules` — durable instructions for the codebase
- **Session memory** — conversation history, modified-file tracking
- **Task memory** — current goal, plan, completed steps (TodoWrite-style)
- **Result memory** — test/build outcomes, recent failures
- **Learned memory** — auto-saved facts about the user, project, preferences (this repo's `~/.claude/projects/.../memory/` pattern)

Repo memory is the most undervalued. A well-written `CLAUDE.md` halves the agent's wandering on every task.

## Reliability and safety

Coding agents have a real blast radius: they edit files, run shell commands, push to remotes. Per [[Agent Trust and Safety Controls]] and pragmatic experience:

| Risk | Mitigation |
| --- | --- |
| Unauthorized destructive command (rm -rf, force-push) | Permission gating; user confirmation for high-impact ops |
| Secret exfiltration | Never read .env / credentials.* unless explicit; never echo to chat |
| Wrong-file edit | Always read before edit; show diffs |
| Test theatre (skipping or weakening tests to make them pass) | Pre-commit hooks; review for `--no-verify`, `xfail`, skip patterns |
| Infinite loop | Hard turn cap; supervisor watchdog |
| Wrong branch / overwriting work | Status check before destructive ops; create branches for experiments |
| Hallucinated APIs | Verify against actual lib docs (e.g., context7); run code |

The 2026 generation has these as default behaviors in commercial agents (Claude Code's permission system, Cursor's diff-before-apply). For hand-rolled agents, design them in.

## Evaluation

Standard coding-agent benchmarks:

- **HumanEval / HumanEval+** — single-function synthesis
- **MBPP / MBPP+** — slightly larger problems
- **SWE-bench / SWE-bench Verified** — real repo-level tasks (clone repo, fix issue, pass tests). The hard benchmark.
- **LiveCodeBench** — contamination-resistant; recent problems
- **Codeforces** — competitive-programming rating
- **AIDER bench** — agent-loop bench, edit-based

SWE-bench Verified is the contract benchmark for autonomous coding capability — single-call benchmarks (HumanEval) are saturated and don't predict agent-mode performance.

## What's open

- **Long-horizon planning** — agents still struggle past ~30 step plans without losing context coherence
- **Codebase understanding at scale** — embeddings + grep are local; true *architectural* understanding is research
- **Reproducibility** — non-determinism makes regression testing hard
- **Cross-repo work** — most agents operate on one repo; multi-repo refactors are still painful
- **Fixing-the-fixer feedback loops** — agents that touch their own scaffolding without supervision

## Related pages

- [[AI Coding Agent]] — atomic concept
- [[Claude Code]] — flagship commercial example
- [[Anthropic]] — vendor entity
- [[Compound AI Systems]] — architectural framing
- [[Tool Use]] — substrate capability
- [[Reflection]], [[Reflexion]] — self-evaluation primitives
- [[Agent Memory]], [[Agent Memory Architectures]] — memory design
- [[Agent Trust and Safety Controls]] — safety surface
- [[Multi-Agent Collaboration Taxonomy]] — when sub-agent dispatch crosses into MAS
- [[ReAct]] — substrate loop
- [[Reasoning Models Landscape]] — routing strong-vs-fast models inside the agent
- [[2026-04-12-building-ai-coding-agents-terminal]] — OpenDev architecture source
- [[2026-04-12-prompt-engineering-llms]] — Berryman & Ziegler, GitHub Copilot lineage
