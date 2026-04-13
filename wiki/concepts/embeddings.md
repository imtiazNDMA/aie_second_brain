---
title: Embeddings
type: concept
tags: [nlp, vector, representation]
sources: [2026-04-12-llm-engineers-handbook, 2026-04-12-rag-driven-generative-ai]
created: 2026-04-13
updated: 2026-04-13
---

# Embeddings

## Definition

Continuous vector representations of text (tokens, sentences, documents) learned so that semantic similarity corresponds to geometric proximity. Embeddings feed retrieval, clustering, similarity search, recommendation, and downstream fine-tuning pipelines described across the LLM Engineer’s Handbook and *RAG-Driven Generative AI*.

## Generation Pipeline

1. **Normalize text** — lowercasing, punctuation stripping, splitting into spans/chunks.
2. **Encode** — apply transformer or dual-encoder model (OpenAI text-embedding-3-large, Cohere, instructor-xl, sentence-transformers) to output dense vectors.
3. **Store** — persist vectors plus metadata in a [[Vector Database]] such as [[Pinecone]], [[Weaviate]], or [[Qdrant]].
4. **Refresh** — monitor drift; re-embed when corpora change or models improve.

## Best Practices

- **Chunking**: choose chunk sizes that balance semantic completeness vs. token limits (RAG book recommends 300-600 tokens for prose, smaller for code).
- **Normalization**: L2-normalize vectors for cosine similarity; store raw norms if using dot products.
- **Metadata**: attach titles, timestamps, and filters to target retrieval subsets.
- **Versioning**: track embedding model/version to coordinate upgrades across retrievers and rerankers.

## Related Concepts

- [[Reranking]]
- [[Dynamic RAG Collections]]
- [[Knowledge-Graph Indexing]]
