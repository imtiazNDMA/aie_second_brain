---
title: Runnable Interface
type: concept
tags: [langchain, llm, interface]
sources: [2026-04-29-learning-langchain]
created: 2026-04-29
updated: 2026-04-29
---

# Runnable Interface

## Definition
LangChain's unified interface for composable components that can be invoked, batched, streamed, and composed together. All LangChain components implement the Runnable protocol.

## Core Methods

### invoke(input)
Single synchronous call:
```python
chain.invoke({"question": "What is AI?"})
```

### batch(inputs)
Process multiple inputs in parallel:
```python
chain.batch([{"question": "Q1"}, {"question": "Q2"}])
```

### stream(input)
Stream output token-by-token:
```python
for chunk in chain.stream({"question": "Tell me a story"}):
    print(chunk, end="")
```

### astream(input)
Async streaming for concurrent processing.

## Composition Operators

### Pipe Operator (|)
Chain runnables together:
```python
chain = prompt | model | output_parser
```

### Parallel (RunnableParallel)
Execute multiple branches simultaneously:
```python
chain = {
    "summary": summary_chain,
    "sentiment": sentiment_chain
}
```

### Branch (RunnableBranch)
Conditional execution based on input.

## Benefits
- **Unified API**: Same interface for LLMs, prompts, retrievers, tools
- **Composability**: Build complex pipelines from simple parts
- **Async support**: Native async/streaming for performance
- **Type safety**: Input/output types can be validated

## Connections
- [[LangChain]] — framework providing the interface
- [[LangGraph]] — extends runnables with graph-based workflows
- [[Learning LangChain]] — source documentation

## Sources
- [[2026-04-29-learning-langchain]]
