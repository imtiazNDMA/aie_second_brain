---
title: Hands-On Large Language Models
type: source
authors: [Jay Alammar, Maarten Grootendorst]
tags: [llm, nlp, transformer, prompting]
created: 2026-04-29
updated: 2026-04-29
---

# Hands-On Large Language Models

## Summary
Comprehensive guide to LLM architecture, tokenization, embeddings, attention mechanisms, prompting techniques, RAG, and fine-tuning. By the creator of the famous Transformer Explainer.

## Key Takeaways

### LLM Fundamentals
- **Tokenization**: BPE, WordPiece, SentencePiece — converting text to subword units
- **Embeddings**: Dense vector representations (see [[Embeddings]])
- **Transformer architecture**: Encoder-decoder structure (see [[Transformer]])
- **Attention mechanisms**: Self-attention, multi-head attention (see [[Self-Attention]], [[Multi-Head Attention]])

### Prompt Engineering Techniques
- **Zero-shot prompting**: Direct instructions without examples
- **Few-shot prompting**: Provide examples in context
- **Chain-of-Thought**: "Think step by step" for reasoning
- **Self-Consistency**: Sample multiple reasoning paths
- **Tree of Thoughts**: Explore multiple reasoning branches

### Retrieval-Augmented Generation
- **Basic RAG**: Retrieve relevant passages, augment prompt, generate (see [[Retrieval-Augmented Generation]])
- **Advanced RAG**: Query rewriting, expansion, reranking (see [[Advanced RAG]])
- **Self-RAG**: Self-reflective retrieval with critique tokens (see [[Self-RAG]])

### Fine-Tuning Methods
- **Instruction tuning**: Train on (instruction, response) pairs
- **RLHF**: Reinforcement Learning from Human Feedback (see [[RLHF]])
- **LoRA**: Low-Rank Adaptation (see [[Low-Rank Adaptation]])
- **QLoRA**: Quantized LoRA (see [[QLoRA]])

### Model Types
- **Base LLMs**: Pretrained on next-token prediction
- **Instruction-tuned**: Fine-tuned on task instructions
- **Dialogue-tuned**: Optimized for conversational interaction
- **Fine-tuned**: Specialized for specific domains

## Visual Explanations
- **Transformer Explainer**: Interactive visualization of attention
- **BERT Explorer**: Bidirectional encoder representations
- **GPT Decoder**: Autoregressive generation process

## Connections
- [[Jay Alammar]] — author and Transformer Explainer creator
- [[Maarten Grootendorst]] — co-author, Sentence-BERT creator
- [[Transformer]] — visualized in Transformer Explainer
- [[Tokenization]] — covered extensively

## Related Concepts
- [[LLM Architecture]] (new page created)
- [[Prompt Engineering]] (enhanced with techniques)
- [[Embeddings]] (enhanced with BGE, E5, Voyage)
- [[Self-RAG]] (covered as advanced technique)
- [[Advanced RAG]] (surveyed)
