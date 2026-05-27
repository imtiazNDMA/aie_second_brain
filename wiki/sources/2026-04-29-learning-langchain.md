---
title: Learning LangChain
type: source
authors: [Mayo Oshin, Nuno Campos]
tags: [langchain, llm, rag, agents]
created: 2026-04-29
updated: 2026-04-29
---

# Learning LangChain

## Summary
Comprehensive guide to building production-ready LLM applications with LangChain and LangGraph. Covers RAG, memory systems, agent architectures, deployment, and evaluation.

## Key Takeaways

### LLM Fundamentals with LangChain
- **Using LLMs**: OpenAI, Anthropic, Google integrations
- **Prompt templates**: Reusable, parameterized prompts
- **Output parsers**: JSON, YAML, custom formats
- **Runnable Interface**: Unified API for composition (see [[Runnable Interface]])

### RAG Part I: Indexing
- **Embeddings**: Converting text to numbers (see [[Embeddings]])
- **Text splitting**: Chunk strategies for optimal retrieval
- **Vector stores**: PGVector, Pinecone, Chroma integration
- **MultiVectorRetriever**: Multiple chunk representations
- **RAPTOR**: Recursive Abstractive Processing for trees

### RAG Part II: Chatting with Data
- **Retrieval**: Semantic search for relevant documents
- **Query transformation**: Rewrite, multi-query, RAG-Fusion
- **Query routing**: Logical and semantic routing
- **Query construction**: Text-to-SQL, metadata filtering

### LangGraph for Memory
- **StateGraph**: Define stateful workflows
- **Chatbot memory**: Conversation history management
- **Message trimming/filtering**: Control context length
- **LangGraph Studio**: Visual development environment

### Cognitive Architectures
- **LLM Call**: Single inference call
- **Chain**: Sequential processing
- **Router**: Conditional branching
- **Agent**: Plan-Do loops with tools

### Agent Architectures
- **LangGraph Agent**: Structured agent workflows
- **Subgraphs**: Modular agent components
- **Multi-agent**: Supervisor architecture
- **Human-in-the-loop**: Approval workflows

### Production Deployment
- **LangGraph Platform**: Deploy and scale agents
- **LangSmith**: Debug, trace, monitor workflows
- **Security**: Authentication, rate limiting
- **Backend API**: FastAPI integration

### Testing and Evaluation
- **Self-Corrective RAG**: Iterative improvement
- **Datasets**: Create evaluation suites
- **Criteria definition**: Task-specific metrics
- **Regression testing**: Catch performance degradation

## Connections
- [[Mayo Oshin]] — co-author, early LangChain advocate
- [[Nuno Campos]] — co-author, founding engineer at LangChain
- [[LangChain]] — core framework (see [[LangChain]] page)
- [[LangGraph]] — agent runtime
- [[LangSmith]] — observability platform

## Related Concepts
- [[LangChain]] (enhanced with detailed patterns)
- [[LangGraph]] (detailed coverage)
- [[Runnable Interface]] (new page)
- [[LangSmith]] (new entity page)
- [[RAG Evaluation]] (testing workflows)
- [[Agent Memory]] (LangGraph implementation)
