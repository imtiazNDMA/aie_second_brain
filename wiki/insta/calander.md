---
title: 30-Day AI Engineering Content Calendar
type: content-calendar
tags: [instagram, calendar, ai-engineering, carousel, analytics]
sources: []
created: 2026-09-11
updated: 2026-09-11
start_date: 2026-09-12
end_date: 2026-10-11
---

# 30-Day AI Engineering Content Calendar

Thirty consecutive carousel briefs for aspiring AI engineers. The sequence moves from foundations to language-model architecture, retrieval-augmented generation (RAG), agents, evaluation, operations, and portfolio proof.

Use this as a publishing experiment. If daily publishing reduces quality, preserve the order and treat each date as a production slot rather than rushing unfinished work.

## Campaign objective

Position the account as a trusted source for practical AI engineering education by consistently delivering:

- clear mental models
- technically accurate mechanisms
- architecture and decision guidance
- production failure modes
- concrete next actions

The campaign should make the audience think: "This account helps me understand how AI systems actually work and how to build them well."

## ChatGPT project instruction

Add the following instruction once to the ChatGPT Project used to generate carousel copy. Then paste one daily brief from this calendar.

```text
You are an expert technical educator and Instagram carousel copywriter for aspiring AI engineers.

Turn the supplied brief into a complete Instagram carousel. Follow these rules:

1. Write 7-9 slides unless the brief explicitly requires 10.
2. Give every slide one clear job and one core idea.
3. Write five hook alternatives before selecting the strongest truthful hook.
4. Use this teaching sequence when appropriate: problem -> weak mental model -> correct mechanism -> example -> failure mode -> decision rule.
5. Explain mechanisms and tradeoffs instead of listing tools or benefits.
6. Define every technical acronym on first reader-facing use. The audience-standard acronym AI is exempt. If a specialized acronym appears in the title, place its expansion in an eyebrow above the title so the expansion is encountered first.
7. Keep text comfortably readable on a 1080x1350 mobile slide.
8. Do not invent statistics, benchmarks, personal experience, or technical claims.
9. Preserve the facts and boundaries in the brief.
10. For every slide, return: slide number, slide type, slide goal, exact on-slide copy, and visual direction.
11. End with a concrete action or diagnostic question and name the next concept to learn.
12. Write a caption that adds one useful nuance instead of repeating the slides.
13. Add concise alt text for the complete carousel.
14. Use a clear, direct, technically serious voice. Avoid hype, empty engagement bait, generic AI claims, and unexplained jargon.

Return sections in this order:
- Reader outcome
- Five hook options
- Selected hook
- Slide-by-slide carousel
- Caption
- Alt text
- Technical claims to verify before publishing
```

## Calendar overview

| Day | Date       |  ID | Pillar           | Level   | Working title                                                      | Supporting wiki material                                                                                                                    | Status   |
| --: | ---------- | --: | ---------------- | ------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
|   1 | 2026-09-12 | 001 | Foundations      | Explain | Why Impressive AI Demos Still Fail in Production                   | [[001 - What AI Engineering Actually Is]], [[AI Engineering]], [[AI Engineering Wiki Plan]]                                                 | drafting |
|   2 | 2026-09-13 | 013 | Foundations      | Explain | Stop Mixing Up Machine Learning, Deep Learning, and Generative AI  | [[Generative AI]], [[2026-04-29-hands-on-ml-python]], [[2026-04-12-deep-learning-with-pytorch]], [[2026-04-12-building-agentic-ai-systems]] | idea     |
|   3 | 2026-09-14 | 004 | Foundations      | Explain | Embeddings: How Inputs Become Searchable Vectors                   | [[Embeddings]], [[Vector Database]]                                                                                                         | idea     |
|   4 | 2026-09-15 | 016 | Foundations      | Explain | The Hidden Effects of Tokenization on Cost, Context, and Latency   | [[Tokenization]], [[Large Language Models]], [[Inference Optimization]]                                                                     | idea     |
|   5 | 2026-09-16 | 005 | LLM architecture | Explain | Inside the Transformer: How the Next Token Gets Predicted          | [[Transformer Architecture Anatomy]], [[Transformer]], [[Tokenization]]                                                                     | idea     |
|   6 | 2026-09-17 | 011 | LLM architecture | Explain | How Query, Key, and Value Make Self-Attention Work                 | [[Self-Attention]], [[Scaled Dot-Product Attention]], [[Multi-Head Attention]]                                                              | idea     |
|   7 | 2026-09-18 | 022 | LLM architecture | Explain | How Transformers Encode Token Order                                | [[Positional Encoding]], [[Rotary Position Embeddings]], [[NoPE]]                                                                           | idea     |
|   8 | 2026-09-19 | 023 | LLM architecture | Explain | The Routing Trick Behind Sparse Mixture-of-Experts Models          | [[Mixture of Experts]], [[LLM Architecture Landscape 2026]]                                                                                 | idea     |
|   9 | 2026-09-20 | 008 | Inference        | Explain | Why Faster Generation Can Consume So Much Memory                   | [[KV Cache]], [[LLM Inference Optimization Stack]], [[Paged Attention]]                                                                     | idea     |
|  10 | 2026-09-21 | 027 | Inference        | Judge   | Your Model May Not Be the Biggest Latency Bottleneck               | [[Inference Optimization]], [[LLM Inference Optimization Stack]], [[Continuous Batching]]                                                   | idea     |
|  11 | 2026-09-22 | 002 | RAG              | Explain | Retrieval Can Fail Before Generation Even Starts                   | [[002 - RAG Is a System, Not a Feature]], [[Retrieval-Augmented Generation]], [[RAG Architecture Decision Guide]]                           | drafting |
|  12 | 2026-09-23 | 012 | RAG              | Apply   | Why "Best Chunk Size" Advice Can Hurt Retrieval Quality            | [[Retrieval-Augmented Generation]], [[Advanced RAG]], [[RAG Evaluation]]                                                                    | idea     |
|  13 | 2026-09-24 | 032 | RAG              | Judge   | When Lexical Search Beats Vector Search                            | [[BM25]], [[Hybrid Search]], [[Embeddings]]                                                                                                 | idea     |
|  14 | 2026-09-25 | 033 | RAG              | Apply   | The Retriever Found the Evidence. Then the Pipeline Dropped It     | [[Reranking]], [[Pre-Retrieval Techniques for RAG]], [[Advanced RAG]]                                                                       | idea     |
|  15 | 2026-09-26 | 035 | RAG              | Judge   | Not Every Retrieval Pipeline Is "Advanced"                         | [[Advanced RAG]], [[Modular RAG]], [[Retrieval-Augmented Generation]]                                                                       | idea     |
|  16 | 2026-09-27 | 036 | RAG              | Explain | What Graph Retrieval Finds That Chunk Similarity Can Miss          | [[Graph RAG]], [[Knowledge Graphs]], [[2026-04-29-graph-rag-survey]]                                                                        | idea     |
|  17 | 2026-09-28 | 037 | RAG              | Judge   | 3 Self-Correcting Retrieval Patterns and When Each Fits            | [[Self-Correcting RAG Patterns]]                                                                                                            | idea     |
|  18 | 2026-09-29 | 006 | Evaluation       | Apply   | One Good Score Can Hide a Broken Retrieval Pipeline                | [[RAG Evaluation Playbook]], [[RAG Evaluation]], [[Response Adherence]], [[Context Relevance]]                                              | idea     |
|  19 | 2026-09-30 | 041 | Agents           | Explain | Workflow or AI Agent? Choose by Uncertainty and Control            | [[Agentic Systems]], [[Agent Components]], [[Compound AI Systems]]                                                                          | idea     |
|  20 | 2026-10-01 | 042 | Agents           | Explain | ReAct (Reasoning + Acting) Is a Loop You Must Control              | [[ReAct]], [[Tool Use]], [[Reasoning Strategies]]                                                                                           | idea     |
|  21 | 2026-10-02 | 043 | Agents           | Apply   | How Poor Tool Interfaces Cause Agent Failures                      | [[Tool Use]], [[OpenAI Function Calling]], [[Agent Operations]]                                                                             | idea     |
|  22 | 2026-10-03 | 044 | Agents           | Judge   | What Should an Agent Remember, Refresh, or Delete?                 | [[Agent Memory]], [[Agent Memory Architectures]], [[Agent Operations]]                                                                      | idea     |
|  23 | 2026-10-04 | 003 | Agents           | Judge   | Before You Upgrade the Model, Classify the Agent Failure           | [[003 - Why AI Agents Fail in Production]], [[Agent Failure Taxonomy]], [[Agent Operations]]                                                | drafting |
|  24 | 2026-10-05 | 046 | Agents           | Judge   | More Agents, More Problems: When AI Teams Backfire                 | [[Multi-Agent Systems]], [[Multi-Agent Collaboration Taxonomy]], [[Agent Orchestration Platforms]]                                          | idea     |
|  25 | 2026-10-06 | 049 | Evaluation       | Apply   | The Final Answer Can Be Right While the Agent Is Dangerous         | [[Agent Operations]], [[Agent Failure Taxonomy]], [[LLM Evaluation Rubrics]]                                                                | idea     |
|  26 | 2026-10-07 | 052 | Evaluation       | Judge   | Treat a Model Judge Like a Measurement Tool, Not the Truth         | [[LLM-as-Judge]], [[LLM Evaluation Benchmark Map]], [[LLM Evaluation Rubrics]]                                                              | idea     |
|  27 | 2026-10-08 | 053 | Reliability      | Explain | The Reliability Math That Turns "Good AI" Into a Measurable Target | [[SLI SLO SLA]], [[Error Budget]], [[Reliability for LLM Systems]]                                                                          | idea     |
|  28 | 2026-10-09 | 054 | Reliability      | Apply   | Reliable AI Is Designed to Fail Safely                             | [[Reliability for LLM Systems]], [[Circuit Breaker]], [[Retry with Backoff]], [[Fault Tolerance]]                                           | idea     |
|  29 | 2026-10-10 | 056 | Operations       | Judge   | MLOps vs LLMOps vs AIOps: What Each Discipline Operates            | [[MLOps]], [[LLMOps]], [[AIOps]], [[AIOps-LLMOps Convergence for Agent Operations]]                                                         | idea     |
|  30 | 2026-10-11 | 060 | Career proof     | Apply   | A Demo Shows Output. A Case Study Shows Engineering Evidence.      | [[AI Engineer Portfolio Blueprint]], [[AI Engineer Project Tracker]], [[AI Engineer Skills Matrix]]                                         | idea     |

## Title psychology map

The titles use ethical attention mechanisms: each creates tension that the carousel fully resolves. Track these patterns so hook performance can be compared after the campaign.

| Day | Primary hook mechanism | Open loop created |
|---:|---|---|
| 1 | Consequence + contrast | Why a successful demo can still fail as a product |
| 2 | Misconception correction | Which boundaries separate three commonly confused fields |
| 3 | Mechanism curiosity | How raw inputs become vectors that can be searched |
| 4 | Systems consequence | How tokenization affects three system constraints |
| 5 | Backstage access | What occurs inside a transformer before prediction |
| 6 | Mechanism gap | Why query, key, and value projections are all needed |
| 7 | Mechanism gap | How transformer architectures make token order available to the model |
| 8 | Mechanism curiosity | How routing activates only selected experts for each token |
| 9 | Cost of speed | How key-value caching can trade recomputation for memory |
| 10 | Diagnostic reversal | Which stages may matter more than model compute |
| 11 | Temporal surprise | How failure happens before generation begins |
| 12 | Myth correction + risk | Why universal chunk advice can reduce quality |
| 13 | Competitive contrast | Which queries favor lexical retrieval |
| 14 | Narrative interruption | Where relevant evidence disappears after retrieval |
| 15 | Contrarian classification | What actually separates retrieval architecture paradigms |
| 16 | Information gap | Which relationships graph retrieval can expose |
| 17 | Specificity + choice | How three corrective patterns differ |
| 18 | Metric paradox | How a healthy aggregate score can hide local failure |
| 19 | Decision criteria | Which architecture fits task uncertainty, risk, and adaptation needs |
| 20 | Control tension | Where runtime controls enter a reasoning-and-acting loop |
| 21 | Causal diagnosis | How interface design becomes an agent failure |
| 22 | Curiosity triad | What belongs in memory, refresh, or deletion |
| 23 | Loss avoidance | What to diagnose before changing or upgrading the model |
| 24 | Escalating complexity | When added agents reduce system quality |
| 25 | Safety paradox | How a correct result can still come from a dangerous run |
| 26 | Authority skepticism | How to use a judge that is not objective truth |
| 27 | Vague-to-measurable transformation | How reliability language becomes operational targets |
| 28 | Productive paradox | Why planning for failure enables safer behavior |
| 29 | Confusion relief | What three similarly named disciplines actually operate |
| 30 | Artifact + evidence contrast | What makes engineering ability visible beyond a demo |

## Daily carousel briefs

### Day 1: Why Impressive AI Demos Still Fail in Production

Sources: [[001 - What AI Engineering Actually Is]], [[AI Engineering]], [[AI Engineering Wiki Plan]]

```text
Create an Instagram carousel titled "Why Impressive AI Demos Still Fail in Production"

Audience problem: aspiring AI engineers often reduce the discipline to calling a model API or writing prompts.

Reader outcome: explain AI engineering as the work of turning probabilistic model capability into measurable, reliable, secure, and maintainable product behavior.

Core thesis: the model is one component; the system is the product.

Teach these points:
- A demo proves that an impressive output can happen. A product must deliver useful behavior repeatedly under real constraints.
- Before inference, engineers define the task, prepare data, choose context, design evaluation, and set cost and latency limits.
- During inference, the system may retrieve knowledge, call tools, manage state, validate outputs, and handle failure.
- After release, engineers monitor quality, trace failures, control cost, secure access, compare versions, and iterate.
- Use this lifecycle: Concept -> Implementation -> Evaluation -> Deployment -> Monitoring -> Security -> Iteration.
- End with this decision question: "What system makes this behavior measurable, reliable, and maintainable?"

Use 9 slides. Make the visual story expand from one model box into a complete production architecture. Name RAG as the next concept.
```

### Day 2: Stop Mixing Up Machine Learning, Deep Learning, and Generative AI

Sources: [[Generative AI]], [[2026-04-29-hands-on-ml-python]], [[2026-04-12-deep-learning-with-pytorch]], [[2026-04-12-building-agentic-ai-systems]]

```text
Create an Instagram carousel titled "Stop Mixing Up Machine Learning, Deep Learning, and Generative AI"

Audience problem: beginners use these terms interchangeably and cannot place modern model types in the engineering landscape.

Reader outcome: distinguish the three scopes and explain how they overlap without presenting them as competing technologies.

Core thesis: machine learning learns patterns from data, deep learning is the neural-network branch of machine learning, and generative AI describes systems that produce new content from learned distributions.

Teach these points:
- Machine learning improves behavior from data rather than relying only on explicitly programmed rules.
- Deep learning is a machine-learning family built from multilayer neural networks.
- Generative AI describes systems that synthesize text, images, audio, code, or other outputs; many modern examples use deep learning.
- Not every machine-learning model is deep learning, and not every deep-learning system is generative.
- A generative model does not automatically make a reliable product; engineering still requires data, software, evaluation, deployment, and operations.

Use an overlapping-map visual, then finish with a practical classification exercise. Name embeddings as the next concept.
```

### Day 3: Embeddings: How Inputs Become Searchable Vectors

Sources: [[Embeddings]], [[Vector Database]]

```text
Create an Instagram carousel titled "Embeddings: How Inputs Become Searchable Vectors"

Audience problem: aspiring engineers can call an embedding API but cannot explain what the returned vector represents or how it enables retrieval.

Reader outcome: explain embeddings as learned numeric representations whose geometry makes related inputs searchable.

Core thesis: an embedding does not store human-readable meaning; it places an input in a learned vector space where distance can approximate useful similarity.

Teach these points:
- An embedding model converts text, images, or other inputs into fixed-length vectors.
- Inputs with related patterns tend to occupy nearby regions under a chosen similarity measure.
- Similarity can be measured with cosine similarity, dot product, or distance, depending on the model and index.
- Vector dimensions are learned features, not individually named concepts.
- Retrieval quality depends on the embedding model, input representation, domain, similarity function, and evaluation data.
- Similarity is not truth: semantically close content can still be outdated, irrelevant to intent, or factually wrong.

Use one simple 2D map only as an intuition and clearly state that real embedding spaces have many dimensions. End with a query-to-neighbor example. Name tokenization as the next concept.
```

### Day 4: The Hidden Effects of Tokenization on Cost, Context, and Latency

Sources: [[Tokenization]], [[Large Language Models]], [[Inference Optimization]]

```text
Create an Instagram carousel titled "The Hidden Effects of Tokenization on Cost, Context, and Latency"

Audience problem: learners think language models read words directly and treat token limits as an arbitrary billing detail.

Reader outcome: explain how tokenization converts text into model inputs and why token count affects system design.

Core thesis: language models process tokens, so tokenization influences sequence length, context usage, generation cost, and latency.

Teach these points:
- A tokenizer converts text into integer token IDs from a vocabulary.
- A token may be a whole word, part of a word, punctuation, whitespace pattern, or byte sequence.
- The same sentence can produce different token counts under different tokenizers.
- Input tokens consume context capacity; generated tokens add decode work and cost.
- Domain text, source code, and multilingual text may tokenize very differently.
- Engineers should measure with the deployed model's tokenizer instead of estimating from word count.

Show one sentence splitting into subword tokens, then connect token count to context, cost, and latency. Avoid claiming a universal words-to-tokens ratio. Name transformers as the next concept.
```

### Day 5: Inside the Transformer: How the Next Token Gets Predicted

Sources: [[Transformer Architecture Anatomy]], [[Transformer]], [[Tokenization]]

```text
Create an Instagram carousel titled "Inside the Transformer: How the Next Token Gets Predicted"

Audience problem: transformer diagrams look like unexplained stacks of boxes.

Reader outcome: trace the major transformations from token ID to next-token probability.

Core thesis: a decoder-only transformer repeatedly mixes contextual information and transforms each token representation before predicting what comes next.

Teach these points:
- Token IDs are mapped to learned embedding vectors.
- Position information is added or applied so order affects computation.
- In common modern pre-norm decoders, normalization stabilizes the representation entering each sublayer; post-norm architectures place it after the residual update.
- Self-attention lets each position gather relevant information from allowed earlier positions.
- The feed-forward network transforms each position independently after attention mixes context.
- Residual connections preserve and update the running representation across layers.
- A final projection and softmax produce probabilities over the vocabulary for the next token.

Use an input-to-output pipeline visual. State that training adjusts the weights, while inference repeatedly executes the learned transformations. Name self-attention as the next concept.
```

### Day 6: How Query, Key, and Value Make Self-Attention Work

Sources: [[Self-Attention]], [[Scaled Dot-Product Attention]], [[Multi-Head Attention]]

```text
Create an Instagram carousel titled "How Query, Key, and Value Make Self-Attention Work"

Audience problem: learners memorize Q, K, and V formulas without understanding the mechanism.

Reader outcome: explain queries, keys, values, attention scores, and weighted aggregation using one consistent mental model.

Core thesis: each token asks a learned question with its query, advertises what it contains with its key, and contributes information through its value.

Teach these points:
- The same token representation is projected into query, key, and value vectors.
- Query-key dot products score how relevant one allowed position is to another.
- Scores are divided by the square root of the key dimension to control their variance, preventing softmax saturation and vanishing gradients as dimensions grow.
- Softmax converts scores into weights.
- The output is a weighted sum of value vectors.
- Causal masking prevents a decoder token from using future tokens.
- Attention weights are useful mechanics, but they should not automatically be treated as faithful explanations of model reasoning.

Use a short sentence to visualize one token gathering context. Include the compact attention equation only if every term is explained. Name multi-head attention as the next concept.
```

### Day 7: How Transformers Encode Token Order

Sources: [[Positional Encoding]], [[Rotary Position Embeddings]], [[NoPE]]

```text
Create an Instagram carousel titled "How Transformers Encode Token Order"

Audience problem: learners assume attention automatically knows token order.

Reader outcome: explain why position must enter the model and distinguish additive positional encodings from rotary position embeddings.

Core thesis: self-attention compares token representations without an inherent sequence order, so transformer architectures inject position explicitly or create position-sensitive attention behavior.

Teach these points:
- Reordering tokens should change meaning, but plain content-based attention alone does not encode sequence order.
- Original transformers added sinusoidal position vectors to token embeddings.
- Learned positional embeddings assign trainable vectors to positions.
- Rotary position embeddings rotate query and key features so attention scores carry relative-position information.
- Position methods affect context extension and long-sequence behavior.
- No single position strategy guarantees that a model uses long context well.

Use "dog bites man" versus "man bites dog" as the opening intuition. End with a comparison table and name mixture of experts as the next concept.
```

### Day 8: The Routing Trick Behind Sparse Mixture-of-Experts Models

Sources: [[Mixture of Experts]], [[LLM Architecture Landscape 2026]]

```text
Create an Instagram carousel titled "The Routing Trick Behind Sparse Mixture-of-Experts Models"

Audience problem: parameter counts make learners assume every model parameter runs for every token.

Reader outcome: explain expert routing, active parameters, load balancing, and the systems tradeoff behind sparse models.

Core thesis: a sparse mixture-of-experts model can contain many feed-forward experts while routing each token through only a small subset.

Teach these points:
- Mixture-of-experts commonly replaces a dense feed-forward block with multiple expert networks.
- A router scores experts for each token and selects the top candidates.
- Only selected experts process that token, so total parameters can greatly exceed active parameters.
- Sparse activation can increase model capacity without proportional compute per token.
- Routing creates new problems: expert imbalance, communication overhead, memory footprint, and deployment complexity.
- Shared experts and balancing strategies are architectural responses, not free solutions.

Use a switchboard visual showing tokens routed to different experts. Do not imply that experts map cleanly to human-readable specialties. Name the key-value cache as the next concept.
```

### Day 9: Why Faster Generation Can Consume So Much Memory

Sources: [[KV Cache]], [[LLM Inference Optimization Stack]], [[Paged Attention]]

```text
Create an Instagram carousel titled "Why Faster Generation Can Consume So Much Memory"

Audience problem: learners know generation is autoregressive but do not understand why long conversations consume growing accelerator memory.

Reader outcome: explain what the key-value cache stores, what computation it avoids, and why it becomes a serving bottleneck.

Core thesis: during generation, the key-value cache stores attention keys and values from prior tokens so the model does not recompute them at every new step.

Teach these points:
- Autoregressive generation adds one token at a time.
- Without caching, earlier attention states would be recomputed repeatedly.
- Each transformer layer stores prior key and value tensors for the active sequence.
- Cache memory grows with sequence length, layer count, batch size, and key-value head dimensions.
- The cache speeds decoding but limits concurrency when memory is scarce.
- Grouped-query attention, quantization, paging, and cache-management policies can reduce or manage the burden.

Use a timeline showing reuse of old key/value states while one new token is appended. Avoid presenting exact memory numbers without a specified architecture. Name end-to-end latency as the next concept.
```

### Day 10: Your Model May Not Be the Biggest Latency Bottleneck

Sources: [[Inference Optimization]], [[LLM Inference Optimization Stack]], [[Continuous Batching]]

```text
Create an Instagram carousel titled "Your Model May Not Be the Biggest Latency Bottleneck"

Audience problem: engineers compare model speed using one number and overlook the rest of the request path.

Reader outcome: separate time to first token, inter-token latency, queue time, retrieval, tool calls, network time, and total task latency.

Core thesis: user-perceived latency is an end-to-end system outcome, not only model compute time.

Teach these points:
- Time to first token measures the wait before generation begins.
- Inter-token latency controls how quickly the response streams after it starts.
- Queueing and batching affect both throughput and individual waits.
- Retrieval, reranking, safety checks, tool calls, and network hops add non-model latency.
- A faster model can still produce a slower product if surrounding stages dominate.
- Optimize from traces: identify the largest stage contribution before choosing a technique.

Use a waterfall trace for one request. End with a decision rule: measure the complete critical path before optimizing the model. Name RAG as the next concept.
```

### Day 11: Retrieval Can Fail Before Generation Even Starts

Sources: [[002 - RAG Is a System, Not a Feature]], [[Retrieval-Augmented Generation]], [[RAG Architecture Decision Guide]]

```text
Create an Instagram carousel titled "Retrieval Can Fail Before Generation Even Starts"

Audience problem: beginners model retrieval-augmented generation as a language model connected directly to a vector database.

Reader outcome: trace the full RAG pipeline and identify failures before and after generation.

Core thesis: RAG is a chain of independently fallible decisions, not one feature.

Teach these stages:
- Ingest and clean source material.
- Split content into retrievable units and attach useful metadata.
- Convert content into searchable representations and build indexes.
- Rewrite or decompose the user's query when needed.
- Retrieve candidates with semantic, lexical, or hybrid search.
- Rerank and construct a context that fits the budget.
- Generate an answer that uses evidence and exposes verifiable citations when required.
- Evaluate retrieval, grounding, quality, latency, and cost by stage.

Use 9 slides and a pipeline of testable contracts. End with: "Do not tune the prompt for a retrieval failure." Name chunking as the next concept.
```

### Day 12: Why "Best Chunk Size" Advice Can Hurt Retrieval Quality

Sources: [[Retrieval-Augmented Generation]], [[Advanced RAG]], [[RAG Evaluation]]

```text
Create an Instagram carousel titled "Why 'Best Chunk Size' Advice Can Hurt Retrieval Quality"

Audience problem: tutorials recommend one universal chunk size without considering document structure, query type, embedding behavior, or context budget.

Reader outcome: choose and test chunking strategies using retrieval and answer failures rather than folklore.

Core thesis: the best chunk is the smallest retrievable unit that preserves enough context to answer the target query.

Teach these points:
- Chunks that are too small can separate facts from definitions, qualifiers, or evidence.
- Chunks that are too large can dilute similarity, waste context, and reduce the number of distinct results.
- Preserve natural boundaries such as headings, paragraphs, code blocks, tables, and speaker turns.
- Add overlap only when boundary loss is observed; overlap increases index size and duplicate retrieval.
- Evaluate multiple strategies on representative queries using retrieval recall, relevance, answer grounding, latency, and cost.
- Diagnose examples where the answer span was split, buried, duplicated, or missing.

Use a document-boundary visual and a small experiment matrix. Do not prescribe a universal token count. Name hybrid search as the next concept.
```

### Day 13: When Lexical Search Beats Vector Search

Sources: [[BM25]], [[Hybrid Search]], [[Embeddings]]

```text
Create an Instagram carousel titled "When Lexical Search Beats Vector Search"

Audience problem: engineers treat semantic vector search as a complete replacement for lexical search.

Reader outcome: compare the retrieval signals and know why hybrid search is a strong production baseline.

Core thesis: vector search captures semantic similarity, while BM25 rewards exact lexical evidence; combining them covers complementary failure modes.

Teach these points:
- Vector retrieval helps when queries and documents express the same idea with different words.
- BM25 is strong for exact product names, error codes, identifiers, rare terms, and domain vocabulary.
- Vector search can retrieve conceptually related but operationally wrong passages.
- Lexical search can miss paraphrases and synonyms.
- Hybrid systems retrieve from both and combine rankings with a method such as reciprocal rank fusion.
- The fusion method and weights must be evaluated on real queries.

Use side-by-side examples: a paraphrase query and an exact error-code query. End with a decision rule based on query mix. Name reranking as the next concept.
```

### Day 14: The Retriever Found the Evidence. Then the Pipeline Dropped It

Sources: [[Reranking]], [[Pre-Retrieval Techniques for RAG]], [[Advanced RAG]]

```text
Create an Instagram carousel titled "The Retriever Found the Evidence. Then the Pipeline Dropped It"

Audience problem: learners send the first vector-search results directly into the language model and assume similarity order equals usefulness.

Reader outcome: explain the retrieve-then-rerank pattern and where to evaluate it.

Core thesis: first-stage retrieval maximizes candidate recall cheaply; a stronger reranker then spends more compute judging query-document relevance.

Teach these points:
- Fast retrieval narrows a large corpus to a candidate set.
- A bi-encoder creates query and document representations independently; the similarity function then compares their vectors.
- A cross-encoder reranker can inspect the query and candidate together for a stronger relevance judgment.
- The reranker selects a smaller context set for generation.
- Reranking can improve precision but adds latency and compute.
- Measure recall before reranking, relevance after reranking, and answer quality after generation.

Use a funnel visual: corpus -> top K candidates -> reranker -> top N context items. Do not call reranking free. Name RAG architecture levels as the next concept.
```

### Day 15: Not Every Retrieval Pipeline Is "Advanced"

Sources: [[Advanced RAG]], [[Modular RAG]], [[Retrieval-Augmented Generation]]

```text
Create an Instagram carousel titled "Not Every Retrieval Pipeline Is 'Advanced'"

Audience problem: every added retrieval technique is labeled "advanced RAG," making architectures hard to compare.

Reader outcome: distinguish the three paradigms by where adaptation and control enter the pipeline.

Core thesis: naive RAG uses a fixed retrieve-then-generate path, advanced RAG improves stages around that path, and modular RAG composes or routes specialized modules dynamically.

Teach these points:
- Naive RAG: index, retrieve, place context in the prompt, generate.
- Advanced RAG: improve pre-retrieval, retrieval, and post-retrieval stages with rewriting, metadata, hybrid search, reranking, or compression.
- Modular RAG: add routing, iteration, adaptive retrieval, multiple data sources, or specialized generation and evaluation modules.
- More modules increase control but also latency, cost, observability needs, and failure surface.
- Architecture should follow measured failure, not maturity theater.
- Start simple, instrument the pipeline, and add the smallest module that addresses a verified weakness.

Use three architecture diagrams with increasing modularity. Name Graph RAG as the next concept.
```

### Day 16: What Graph Retrieval Finds That Chunk Similarity Can Miss

Sources: [[Graph RAG]], [[Knowledge Graphs]], [[2026-04-29-graph-rag-survey]]

```text
Create an Instagram carousel titled "What Graph Retrieval Finds That Chunk Similarity Can Miss"

Audience problem: learners know vector retrieval but struggle with multi-hop questions, global summaries, and relationship-heavy domains.

Reader outcome: explain how graph-based indexing and retrieval add relational context to RAG.

Core thesis: Graph RAG represents entities and relationships explicitly so retrieval can follow connected evidence rather than only rank independent text chunks.

Teach these points:
- Traditional chunk retrieval can miss relationships spread across documents.
- A graph stores nodes such as entities or concepts and edges such as ownership, dependency, cause, or citation.
- Graph construction may use existing structured data or information extraction from text.
- Retrieval can start from matched entities and traverse relevant neighborhoods or communities.
- Retrieved graph context can be combined with supporting passages for generation.
- Graph RAG adds extraction errors, graph maintenance, traversal choices, and evaluation complexity.

Use a multi-hop question where two passages become useful only after their entities are connected. End with when not to use a graph. Name self-correcting RAG as the next concept.
```

### Day 17: 3 Self-Correcting Retrieval Patterns and When Each Fits

Sources: [[Self-Correcting RAG Patterns]]

```text
Create an Instagram carousel titled "3 Self-Correcting Retrieval Patterns and When Each Fits"

Audience problem: Self-RAG, Corrective RAG, and Adaptive RAG sound interchangeable.

Reader outcome: compare where each pattern adds control and what failure it targets.

Core thesis: self-correcting RAG patterns differ mainly in when they decide, critique, and revise retrieval or generation.

Teach these points:
- Self-RAG trains or uses reflection signals to decide when to retrieve and to critique relevance, support, and usefulness.
- Corrective RAG evaluates retrieved documents and can refine, replace, or supplement weak evidence before generation.
- Adaptive RAG routes queries through different retrieval depths or strategies based on need and complexity.
- All add evaluation inside the request path, increasing latency and implementation complexity.
- Choose based on observed failure: unnecessary retrieval, poor evidence, or one-size-fits-all routing.
- Compare against a well-instrumented simpler pipeline before accepting the added complexity.

Use a three-column comparison covering trigger, intervention point, strength, and cost. Name RAG evaluation as the next concept.
```

### Day 18: One Good Score Can Hide a Broken Retrieval Pipeline

Sources: [[RAG Evaluation Playbook]], [[RAG Evaluation]], [[Response Adherence]], [[Context Relevance]]

```text
Create an Instagram carousel titled "One Good Score Can Hide a Broken Retrieval Pipeline"

Audience problem: teams score final answers but cannot determine which RAG stage caused a regression.

Reader outcome: build a stage-by-stage evaluation sequence for retrieval, context, generation, system performance, and human usefulness.

Core thesis: end-to-end quality tells you whether the system failed; stage metrics tell you what to fix.

Teach these points:
- Start with a versioned set of representative queries and expected evidence or answer criteria.
- Evaluate retriever recall and whether ground-truth evidence appears in the candidate set.
- Evaluate context relevance after filtering and reranking.
- Evaluate answer support, factual alignment, completeness, and citation coverage.
- Track latency and cost alongside quality because a better score may be operationally unusable.
- Add human or domain-expert review for criteria automated metrics cannot establish reliably.
- Log the exact corpus, index, retriever, reranker, prompt, and model versions for every run.

Use a diagnostic ladder and map each failed metric to its owning stage. Name agents as the next concept.
```

### Day 19: Workflow or AI Agent? Choose by Uncertainty and Control

Sources: [[Agentic Systems]], [[Agent Components]], [[Compound AI Systems]]

```text
Create an Instagram carousel titled "Workflow or AI Agent? Choose by Uncertainty and Control"

Audience problem: every language-model application is marketed as an agent.

Reader outcome: distinguish conversational interfaces, deterministic workflows, and agents by control flow and autonomy.

Core thesis: use the least autonomous architecture that can handle the task's uncertainty.

Teach these points:
- A chatbot is an interaction surface; it may or may not use tools, memory, or autonomous control.
- A workflow follows control flow designed largely in code, even if language models execute some steps.
- An agent chooses among actions or tools based on state and intermediate outcomes.
- Compound AI systems can combine deterministic stages with bounded agent decisions.
- More autonomy adds flexibility but also cost, variance, security risk, and evaluation difficulty.
- Prefer a workflow when the path is known; add agent decisions only where adaptation creates measurable value.

Use a decision tree based on path predictability, action risk, and need for adaptation. Name ReAct as the next concept.
```

### Day 20: ReAct (Reasoning + Acting) Is a Loop You Must Control

Sources: [[ReAct]], [[Tool Use]], [[Reasoning Strategies]]

```text
Create an Instagram carousel titled "ReAct (Reasoning + Acting) Is a Loop You Must Control"

Audience problem: learners copy a reasoning-and-action prompt without understanding the execution loop around it.

Reader outcome: explain the observation, reasoning, action, and new-observation cycle and identify where controls belong.

Core thesis: ReAct interleaves model reasoning with external actions, but the application runtime must enforce tool, budget, termination, and safety boundaries.

Teach these points:
- The agent receives a task and current observation.
- It chooses a next action or tool based on the current state.
- The environment executes the action and returns a new observation.
- The loop continues until the agent returns an answer, meets a stop condition, exhausts a budget, or escalates.
- Tool errors, repeated actions, and misleading observations can derail the loop.
- Trace the complete cycle and evaluate actions, not only the final response.

Use a circular loop with explicit runtime gates around actions. Do not expose or request private chain-of-thought; describe observable decisions and actions. Name tool design as the next concept.
```

### Day 21: How Poor Tool Interfaces Cause Agent Failures

Sources: [[Tool Use]], [[OpenAI Function Calling]], [[Agent Operations]]

```text
Create an Instagram carousel titled "How Poor Tool Interfaces Cause Agent Failures"

Audience problem: agent developers expose existing APIs directly and blame the model when tool selection or arguments fail.

Reader outcome: design narrow, legible, validated tool interfaces for language-model use.

Core thesis: tool design is an interface-design problem for a probabilistic caller.

Teach these points:
- Give each tool one clear purpose and a description that distinguishes it from neighboring tools.
- Use explicit parameter names, types, allowed values, and required fields.
- Validate arguments before execution and return structured, actionable errors.
- Separate read actions from writes and require approval for high-impact side effects.
- Return concise results with stable schemas instead of large unstructured payloads.
- Log the selection, arguments, result, latency, cost, and side effect for every call.
- Test confusing tool pairs, missing arguments, invalid values, retries, and partial failures.

Use a before-and-after tool schema example. End with a checklist. Name agent memory as the next concept.
```

### Day 22: What Should an Agent Remember, Refresh, or Delete?

Sources: [[Agent Memory]], [[Agent Memory Architectures]], [[Agent Operations]]

```text
Create an Instagram carousel titled "What Should an Agent Remember, Refresh, or Delete?"

Audience problem: developers store entire conversations and call the result long-term memory.

Reader outcome: distinguish working state, episodic history, semantic knowledge, and durable user facts, then decide what deserves persistence.

Core thesis: agent memory is a controlled write-and-retrieval system, not an unlimited transcript.

Teach these points:
- Working memory holds temporary task state needed for the current run.
- Episodic memory records prior events or outcomes that may help future tasks.
- Semantic memory stores reusable facts and knowledge, including durable user or company facts when appropriate.
- Procedural memory stores reusable instructions, policies, and methods for how work should be performed.
- Dynamic collections provide replaceable retrieval corpora that can be refreshed without rewriting durable memory.
- User-related facts need consent, correction, deletion, and retention controls regardless of storage layer.
- Every memory write can preserve an error, stale fact, or sensitive detail.
- Store information only when it has future value, provenance, a retention policy, and a retrieval path.
- Trace reads and writes so memory-caused failures can be diagnosed.

Use a five-layer memory architecture. End with a decision test: future value, confidence, sensitivity, expiry, and user control. Name agent failure classes as the next concept.
```

### Day 23: Before You Upgrade the Model, Classify the Agent Failure

Sources: [[003 - Why AI Agents Fail in Production]], [[Agent Failure Taxonomy]], [[Agent Operations]]

```text
Create a 10-slide Instagram carousel titled "Before You Upgrade the Model, Classify the Agent Failure"

Audience problem: teams attribute every failed agent run to weak model intelligence.

Reader outcome: classify failures before choosing a mitigation.

Core thesis: agent reliability is a property of the complete execution system.

Use one slide for each of these seven failure classes:
- Reasoning: wrong decomposition, unsupported assumptions, contradictions, or premature stopping.
- Tool use: wrong tool, bad arguments, unhandled failure, or misunderstood result.
- Memory: missing, stale, corrupted, forgotten, or polluted state.
- Control loop: repeated actions, runaway loops, excessive steps, or failure to escalate.
- Safety and policy: unsafe action, unauthorized access, instruction violation, or bypassed approval.
- Output quality: incorrect, incomplete, unsupported, badly formatted, or partially useful result.
- Operations: excessive latency or cost, dependency outage, or missing trace evidence.

For every class, pair symptoms with controls supported by tracing, evaluation, allowlists, approval gates, budget caps, fallback routing, and human takeover. Finish with: classify the failure, assign its owner, then fix the boundary that allowed it. Name trajectory evaluation as the next concept.
```

### Day 24: More Agents, More Problems: When AI Teams Backfire

Sources: [[Multi-Agent Systems]], [[Multi-Agent Collaboration Taxonomy]], [[Agent Orchestration Platforms]]

```text
Create an Instagram carousel titled "More Agents, More Problems: When AI Teams Backfire"

Audience problem: builders add agents for role-play or novelty without proving that collaboration improves the task.

Reader outcome: decide when role separation creates value and when it only multiplies cost and failure paths.

Core thesis: multiple agents are justified when decomposition, specialization, parallel work, or independent review produces measurable gains that exceed coordination overhead.

Teach these points:
- Useful roles may include planner, specialist worker, executor, reviewer, or coordinator.
- Role names alone do not create specialization; agents need distinct context, tools, objectives, or evaluation responsibilities.
- More agents add messages, latency, tokens, state synchronization, and disagreement handling.
- Shared memory can spread one agent's error across the system.
- System structure may be centralized, peer-to-peer, or hierarchical.
- Coordination can use turn-taking, asynchronous broadcast, voting, debate, or auction mechanisms.
- Compare the design against one strong agent and a deterministic workflow baseline.
- Require a measurable gain in task success, coverage, review quality, or parallel speed.

Use a decision matrix: specialization value versus coordination cost. Name trajectory evaluation as the next concept.
```

### Day 25: The Final Answer Can Be Right While the Agent Is Dangerous

Sources: [[Agent Operations]], [[Agent Failure Taxonomy]], [[LLM Evaluation Rubrics]]

```text
Create an Instagram carousel titled "The Final Answer Can Be Right While the Agent Is Dangerous"

Audience problem: a correct final answer can hide unsafe, wasteful, or irreproducible agent behavior.

Reader outcome: define task-, step-, action-, and operational-level evaluation for an agent run.

Core thesis: the unit of evaluation is the trajectory: observations, decisions, tool calls, memory operations, side effects, and final outcome.

Teach these points:
- Task success asks whether the user's goal was completed correctly.
- Step evaluation checks whether intermediate actions were relevant and efficient.
- Tool evaluation checks selection, arguments, execution success, result use, and side effects.
- Memory evaluation checks whether reads were relevant and writes were safe and useful.
- Safety evaluation checks policy compliance and required approvals.
- Operational evaluation tracks steps, latency, cost, loop rate, fallback, and human escalation.
- Capture complete traces and label primary and secondary failure classes.

Use one annotated trajectory from request to outcome. End with a minimal scorecard. Name language-model judges as the next concept.
```

### Day 26: Treat a Model Judge Like a Measurement Tool, Not the Truth

Sources: [[LLM-as-Judge]], [[LLM Evaluation Benchmark Map]], [[LLM Evaluation Rubrics]]

```text
Create an Instagram carousel titled "Treat a Model Judge Like a Measurement Tool, Not the Truth"

Audience problem: automated judges are treated either as objective truth or dismissed completely.

Reader outcome: use a language model as a scalable evaluator while controlling known biases and validating agreement.

Core thesis: a model judge is a measurement instrument that must be specified, calibrated, and monitored.

Teach these points:
- Define a task-specific rubric with observable criteria before writing the judge prompt.
- Ask for structured scores and brief evidence tied to the evaluated output.
- Use pairwise comparison when relative preference is easier to judge than absolute quality.
- Control position, verbosity, style, and self-preference biases through randomization and counterbalanced tests.
- Compare judge decisions with qualified human labels on a calibration set.
- Track agreement, disagreement patterns, and sensitivity to prompt or model changes.
- Use deterministic checks for criteria that code can evaluate reliably.

Use a measurement-instrument visual rather than a courtroom metaphor. End with: never deploy a judge whose errors you have not measured. Name service-level objectives as the next concept.
```

### Day 27: The Reliability Math That Turns "Good AI" Into a Measurable Target

Sources: [[SLI SLO SLA]], [[Error Budget]], [[Reliability for LLM Systems]]

```text
Create an Instagram carousel titled "The Reliability Math That Turns 'Good AI' Into a Measurable Target"

Audience problem: AI quality goals stay vague because teams track model metrics without operational reliability targets.

Reader outcome: distinguish service-level indicators, objectives, agreements, and error budgets using AI-specific examples.

Core thesis: reliability becomes actionable when a measurable indicator has a target over a defined window and a policy for what happens when the target is missed.

Teach these points:
- A service-level indicator (SLI) is a measured signal such as grounded-answer rate, successful-task rate, latency, or refusal correctness.
- A service-level objective (SLO) is the target for an SLI over a time window.
- A service-level agreement (SLA) is an external commitment and may include consequences.
- An error budget is the allowed unreliability implied by the SLO.
- AI systems often need quality, safety, latency, availability, and cost indicators together.
- When the budget burns too quickly, teams slow releases and prioritize reliability work.

Use one fictional support assistant example without inventing industry benchmarks. Clearly label all target numbers as illustrative. Name fallback and circuit-breaker patterns as the next concept.
```

### Day 28: Reliable AI Is Designed to Fail Safely

Sources: [[Reliability for LLM Systems]], [[Circuit Breaker]], [[Retry with Backoff]], [[Fault Tolerance]]

```text
Create an Instagram carousel titled "Reliable AI Is Designed to Fail Safely"

Audience problem: prototypes assume every model, retriever, tool, and dependency responds correctly on the first attempt.

Reader outcome: place timeout, retry, fallback, circuit breaker, and human escalation controls at appropriate boundaries.

Core thesis: reliability comes from containing expected failures, not pretending they will disappear.

Teach these points:
- Timeouts bound how long a dependency can block the request.
- Retries help only with transient and safe-to-repeat failures; use backoff and limits.
- Fallbacks trade capability for continuity, such as a smaller model, cached result, retrieval-only answer, or deterministic workflow.
- Circuit breakers stop repeated calls to an unhealthy dependency and allow recovery checks.
- Human escalation handles high-impact or unresolved cases.
- Every control needs observability so teams know which path served the user.
- Do not blindly retry side-effecting actions.

Use one request path with controls at model, retriever, and tool boundaries. End with a failure-mode-to-control table. Name operations disciplines as the next concept.
```

### Day 29: MLOps vs LLMOps vs AIOps: What Each Discipline Operates

Sources: [[MLOps]], [[LLMOps]], [[AIOps]], [[AIOps-LLMOps Convergence for Agent Operations]]

```text
Create an Instagram carousel titled "MLOps vs LLMOps vs AIOps: What Each Discipline Operates". Place an eyebrow above the title that expands all three acronyms before the reader encounters the title.

Audience problem: similar names make three different operational disciplines look interchangeable.

Reader outcome: distinguish what each discipline operates and see where their workflows overlap.

Core thesis: MLOps operates machine-learning lifecycles, LLMOps extends operations to language-model applications and artifacts, and AIOps applies AI to improve IT operations.

Teach these points:
- MLOps covers data, training, experiments, model registry, deployment, monitoring, and retraining.
- Large language model operations (LLMOps) adds prompts, foundation-model APIs, retrieval indexes, evaluations, guardrails, token cost, and language-specific quality risks.
- Artificial intelligence for IT operations (AIOps) uses AI for event correlation, anomaly detection, noise reduction, diagnosis, and remediation.
- Agent operations becomes important when applications take multi-step actions with tools and memory.
- The disciplines share telemetry, versioning, release control, incident response, and feedback loops.
- Choose the label from the operational problem, not from branding.

Use a three-column comparison plus an overlap layer. Name portfolio evidence as the next concept.
```

### Day 30: A Demo Shows Output. A Case Study Shows Engineering Evidence.

Sources: [[AI Engineer Portfolio Blueprint]], [[AI Engineer Project Tracker]], [[AI Engineer Skills Matrix]]

```text
Create an Instagram carousel titled "A Demo Shows Output. A Case Study Shows Engineering Evidence."

Audience problem: aspiring AI engineers publish screenshots and repository links that do not prove engineering judgment.

Reader outcome: convert one working demo into a portfolio case study that demonstrates architecture, evaluation, reliability, and learning.

Core thesis: a strong portfolio artifact shows the problem, decisions, evidence, failures, and tradeoffs, not only the final interface.

Teach these points:
- State the user problem, constraints, and why AI is appropriate.
- Show the architecture and explain why each component exists.
- Document the dataset, evaluation set, metrics, and baseline.
- Include failure cases and the changes made in response.
- Report latency, cost, quality, and reliability tradeoffs.
- Explain deployment, monitoring, security, and known limitations.
- Provide reproducible setup instructions and a concise demo.
- End with what you would test or redesign next.

Use a before-and-after visual: "app screenshot" versus "engineering case study." Finish with a checklist readers can apply to their current project. The next series should begin with a public build log based on the audience's highest-response topic from this campaign.
```

## Production tracker

Update this table daily. A post is not `ready` until its claims are verified and the final deck has been checked at phone size.

| Day | Date | ID | Draft | Claim check | Anchor | Deck | Caption | Scheduled | Published | URL |
|---:|---|---:|---|---|---|---|---|---|---|---|
| 1 | 2026-09-12 | 001 | drafting | pending | pending | pending | drafted | no | no | |
| 2 | 2026-09-13 | 013 | idea | pending | pending | pending | pending | no | no | |
| 3 | 2026-09-14 | 004 | idea | pending | pending | pending | pending | no | no | |
| 4 | 2026-09-15 | 016 | idea | pending | pending | pending | pending | no | no | |
| 5 | 2026-09-16 | 005 | idea | pending | pending | pending | pending | no | no | |
| 6 | 2026-09-17 | 011 | idea | pending | pending | pending | pending | no | no | |
| 7 | 2026-09-18 | 022 | idea | pending | pending | pending | pending | no | no | |
| 8 | 2026-09-19 | 023 | idea | pending | pending | pending | pending | no | no | |
| 9 | 2026-09-20 | 008 | idea | pending | pending | pending | pending | no | no | |
| 10 | 2026-09-21 | 027 | idea | pending | pending | pending | pending | no | no | |
| 11 | 2026-09-22 | 002 | drafting | pending | pending | pending | drafted | no | no | |
| 12 | 2026-09-23 | 012 | idea | pending | pending | pending | pending | no | no | |
| 13 | 2026-09-24 | 032 | idea | pending | pending | pending | pending | no | no | |
| 14 | 2026-09-25 | 033 | idea | pending | pending | pending | pending | no | no | |
| 15 | 2026-09-26 | 035 | idea | pending | pending | pending | pending | no | no | |
| 16 | 2026-09-27 | 036 | idea | pending | pending | pending | pending | no | no | |
| 17 | 2026-09-28 | 037 | idea | pending | pending | pending | pending | no | no | |
| 18 | 2026-09-29 | 006 | idea | pending | pending | pending | pending | no | no | |
| 19 | 2026-09-30 | 041 | idea | pending | pending | pending | pending | no | no | |
| 20 | 2026-10-01 | 042 | idea | pending | pending | pending | pending | no | no | |
| 21 | 2026-10-02 | 043 | idea | pending | pending | pending | pending | no | no | |
| 22 | 2026-10-03 | 044 | idea | pending | pending | pending | pending | no | no | |
| 23 | 2026-10-04 | 003 | drafting | pending | pending | pending | drafted | no | no | |
| 24 | 2026-10-05 | 046 | idea | pending | pending | pending | pending | no | no | |
| 25 | 2026-10-06 | 049 | idea | pending | pending | pending | pending | no | no | |
| 26 | 2026-10-07 | 052 | idea | pending | pending | pending | pending | no | no | |
| 27 | 2026-10-08 | 053 | idea | pending | pending | pending | pending | no | no | |
| 28 | 2026-10-09 | 054 | idea | pending | pending | pending | pending | no | no | |
| 29 | 2026-10-10 | 056 | idea | pending | pending | pending | pending | no | no | |
| 30 | 2026-10-11 | 060 | idea | pending | pending | pending | pending | no | no | |

## Performance metrics

Record one row 48 hours after publication and a second row at 14 days so early and cumulative performance remain comparable. Use `N/A` when Instagram does not expose a metric for the account or post.

| Day | ID | Snapshot | Reach | Impressions | Likes | Comments | Saves | Shares | Profile visits | Follows | First-slide reach | Last-slide reach | Watch time | Notes |
|---:|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | 001 | 48h | | | | | | | | | | | | |
| 1 | 001 | 14d | | | | | | | | | | | | |
| 2 | 013 | 48h | | | | | | | | | | | | |
| 2 | 013 | 14d | | | | | | | | | | | | |
| 3 | 004 | 48h | | | | | | | | | | | | |
| 3 | 004 | 14d | | | | | | | | | | | | |
| 4 | 016 | 48h | | | | | | | | | | | | |
| 4 | 016 | 14d | | | | | | | | | | | | |
| 5 | 005 | 48h | | | | | | | | | | | | |
| 5 | 005 | 14d | | | | | | | | | | | | |
| 6 | 011 | 48h | | | | | | | | | | | | |
| 6 | 011 | 14d | | | | | | | | | | | | |
| 7 | 022 | 48h | | | | | | | | | | | | |
| 7 | 022 | 14d | | | | | | | | | | | | |
| 8 | 023 | 48h | | | | | | | | | | | | |
| 8 | 023 | 14d | | | | | | | | | | | | |
| 9 | 008 | 48h | | | | | | | | | | | | |
| 9 | 008 | 14d | | | | | | | | | | | | |
| 10 | 027 | 48h | | | | | | | | | | | | |
| 10 | 027 | 14d | | | | | | | | | | | | |
| 11 | 002 | 48h | | | | | | | | | | | | |
| 11 | 002 | 14d | | | | | | | | | | | | |
| 12 | 012 | 48h | | | | | | | | | | | | |
| 12 | 012 | 14d | | | | | | | | | | | | |
| 13 | 032 | 48h | | | | | | | | | | | | |
| 13 | 032 | 14d | | | | | | | | | | | | |
| 14 | 033 | 48h | | | | | | | | | | | | |
| 14 | 033 | 14d | | | | | | | | | | | | |
| 15 | 035 | 48h | | | | | | | | | | | | |
| 15 | 035 | 14d | | | | | | | | | | | | |
| 16 | 036 | 48h | | | | | | | | | | | | |
| 16 | 036 | 14d | | | | | | | | | | | | |
| 17 | 037 | 48h | | | | | | | | | | | | |
| 17 | 037 | 14d | | | | | | | | | | | | |
| 18 | 006 | 48h | | | | | | | | | | | | |
| 18 | 006 | 14d | | | | | | | | | | | | |
| 19 | 041 | 48h | | | | | | | | | | | | |
| 19 | 041 | 14d | | | | | | | | | | | | |
| 20 | 042 | 48h | | | | | | | | | | | | |
| 20 | 042 | 14d | | | | | | | | | | | | |
| 21 | 043 | 48h | | | | | | | | | | | | |
| 21 | 043 | 14d | | | | | | | | | | | | |
| 22 | 044 | 48h | | | | | | | | | | | | |
| 22 | 044 | 14d | | | | | | | | | | | | |
| 23 | 003 | 48h | | | | | | | | | | | | |
| 23 | 003 | 14d | | | | | | | | | | | | |
| 24 | 046 | 48h | | | | | | | | | | | | |
| 24 | 046 | 14d | | | | | | | | | | | | |
| 25 | 049 | 48h | | | | | | | | | | | | |
| 25 | 049 | 14d | | | | | | | | | | | | |
| 26 | 052 | 48h | | | | | | | | | | | | |
| 26 | 052 | 14d | | | | | | | | | | | | |
| 27 | 053 | 48h | | | | | | | | | | | | |
| 27 | 053 | 14d | | | | | | | | | | | | |
| 28 | 054 | 48h | | | | | | | | | | | | |
| 28 | 054 | 14d | | | | | | | | | | | | |
| 29 | 056 | 48h | | | | | | | | | | | | |
| 29 | 056 | 14d | | | | | | | | | | | | |
| 30 | 060 | 48h | | | | | | | | | | | | |
| 30 | 060 | 14d | | | | | | | | | | | | |

## Calculated indicators

Calculate normalized rates with the denominator named in each formula so posts of different sizes can be compared.

```text
Engagement rate = (likes + comments + saves + shares) / reach
Save rate = saves / reach
Share rate = shares / reach
Comment rate = comments / reach
Profile-interest rate = profile visits / reach
Follow conversion = follows / profile visits
Completion proxy = last-slide reach / first-slide reach
```

Do not combine unavailable values with zero. A missing metric means unknown, not no performance. Record a rate as `N/A` when its denominator is zero or unavailable.

## Weekly strategy review

### Week 1: Foundations and comprehension

Dates: 2026-09-12 through 2026-09-18

- Which concept earned the highest save rate?
- Did broad classification posts drive reach while mechanism posts drove saves?
- Which slide generated confusion or corrective comments?
- Did the audience prefer diagrams, comparisons, or process flows?
- Action for week 2:

### Week 2: Architecture, inference, and RAG entry

Dates: 2026-09-19 through 2026-09-25

- Did systems titles outperform concept definitions?
- Which hook produced the strongest profile-interest rate?
- Did technical depth reduce completion, or increase saves among qualified viewers?
- Which RAG question appeared repeatedly in comments or direct messages?
- Action for week 3:

### Week 3: Advanced RAG and agents

Dates: 2026-09-26 through 2026-10-02

- Which pillar produced more shares: RAG or agents?
- Did comparison posts outperform single-concept explainers?
- Were readers asking implementation questions or conceptual questions?
- Which post should become a deeper tutorial or public build?
- Action for week 4:

### Week 4: Agent systems, evaluation, and reliability

Dates: 2026-10-03 through 2026-10-09

- Did failure-mode posts generate qualified discussion?
- Which practical checklist earned the highest save rate?
- Did evaluation content attract the intended aspiring-engineer audience?
- Which topic revealed the clearest opportunity for a recurring series?
- Action for final two days and next campaign:

### Campaign review

Dates: 2026-10-10 through 2026-10-11, with final metrics reviewed on 2026-10-25

- Top three posts by save rate:
- Top three posts by share rate:
- Top three posts by follow conversion:
- Best-performing pillar:
- Best-performing content level: Explain, Apply, or Judge:
- Best-performing hook pattern:
- Strongest visual system:
- Most common audience question:
- Topic to turn into a public build series:
- Topic to stop, simplify, or reposition:

## Adjustment rules

Use relative performance against this campaign's median rather than arbitrary universal benchmarks.

| Signal | Likely interpretation | Adjustment |
|---|---|---|
| High reach, low saves | Hook is broad but lesson lacks reference value | Add a framework, diagnostic, architecture, or decision rule |
| High saves, low reach | Content is valuable but packaging is weak or narrow | Rewrite the cover around a concrete pain or outcome |
| High shares | Topic helps readers explain something to peers | Build a three-post series around the same problem |
| High comments, low saves | Topic creates debate but may lack durable utility | Keep the angle, add a practical artifact in the follow-up |
| High profile visits, low follows | Positioning or profile promise does not match the post | Align bio, pinned posts, and series naming with the campaign |
| High completion, low action | Narrative works but the ending is weak | Replace generic engagement with a checklist or next-step challenge |
| Early drop-off | Cover promise and slide 2 do not connect | Make slide 2 immediately prove the hook's relevance |
| Technical corrections | Claim review failed or nuance was compressed too far | Correct publicly, update the wiki, and improve the quality gate |
| One pillar wins repeatedly | Audience-market fit is emerging | Increase that pillar by 20% in the next 20-post cycle |
| One format wins repeatedly | Visual teaching pattern is working | Reuse its layout logic without repeating exact compositions |

## Decision policy after 30 days

Keep the three best-performing topic clusters, one experimental cluster, and one portfolio/build-evidence series.

Do not judge topics by likes alone. Prioritize saves, shares, qualified questions, profile interest, and follow conversion because the goal is durable education and authority with aspiring AI engineers.
