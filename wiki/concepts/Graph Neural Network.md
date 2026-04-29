---
title: Graph Neural Network
type: concept
tags: [deep-learning, graph, gnn, representation-learning]
sources: [2026-04-12-ml-algorithms-in-depth.md, 2026-04-29-graph-rag-survey.md]
created: 2026-04-29
updated: 2026-04-29
---

# Graph Neural Network

A class of neural networks designed to operate on graph-structured data, learning representations by aggregating information from neighboring nodes.

## Definition

Graph Neural Networks (GNNs) extend deep learning to graph-structured data by learning node embeddings through message passing between connected nodes. They can capture both node features and graph topology.

## Key Concepts

- **Message Passing**: Nodes exchange information with neighbors iteratively
- **Node Embeddings**: Learned vector representations of graph nodes
- **Graph Convolution**: Aggregating features from local neighborhoods
- **Readout Functions**: Pooling node embeddings for graph-level predictions
- **Types**: GCN, GAT (attention-based), GraphSAGE (sampling-based)

## Related Concepts

- [[Knowledge Graphs]] — Common application domain for GNNs
- [[Graph RAG]] — Uses GNNs for knowledge graph reasoning
- [[Attention Mechanism]] — GAT uses attention to weight neighbor importance
- [[Representation Learning]] — GNNs learn distributed representations

## Sources

- [[2026-04-12-ml-algorithms-in-depth.md]]: Listed among advanced ML algorithms
- [[2026-04-29-graph-rag-survey.md]]: Used for knowledge graph embedding in Graph RAG

## Open Questions

- How do GNNs handle heterogenous graph types?
- What are the limitations on very large graphs?
