---
title: Machine Learning Algorithms in Depth
type: source
tags: [machine-learning, algorithms, bayesian]
sources: [Machine Learning Algorithms in Depth.pdf]
created: 2026-04-12
updated: 2026-04-12
---

# Machine Learning Algorithms in Depth

**Author:** [[Vadim Smolyakov]]  
**Publisher:** Manning (2024)  
**Date ingested:** 2026-04-12  
**Type:** book

## Summary

Comprehensive tour from Bayesian foundations to modern deep learning, balancing rigorous derivations with from-scratch implementations. The book explains why understanding MCMC, [[Variational Inference]], and data-structure choices matters before diving into supervised/unsupervised algorithms and neural architectures. Later chapters cover practical issues—imbalanced data, [[Active Learning]], [[Bayesian Optimization]], ensemble design, and deployment-focused deep learning (VAEs, transformers, GNNs).

## Key Claims

- Deriving algorithms from first principles leads to better debugging intuition than relying solely on libraries.
- Bayesian thinking (MCMC, VI) underpins both classical ML and modern probabilistic deep learning.
- Handling real-world data requires attention to imbalance, [[Active Learning]], hyperparameter search, and ensembles.
- Unsupervised learning (Dirichlet processes, LDA, manifold learning) unlocks latent structure critical for downstream tasks.
- Deep learning success depends on architecture know-how plus practical tooling (optimizers, initialization, batching) rather than just code snippets.

## Structure

- **Chapter 1 — Machine learning algorithms:** Defines supervised vs unsupervised, argues for from-scratch learning, and surveys Bayesian/deep perspectives.
- **Chapter 2 — Markov chain Monte Carlo:** Introduces Monte Carlo methods, Gibbs sampling, Metropolis-Hastings, and importance sampling.
- **Chapter 3 — [[Variational Inference]]:** Derives KL-based VI, mean-field approximations, and applies them to denoising and mutual information tasks.
- **Chapter 4 — Software implementation:** Reviews data structures and algorithmic paradigms (complete search, greedy, divide-and-conquer, DP).
- **Chapter 5 — Classification algorithms:** Covers perceptron, SVM, logistic regression, Naive Bayes, and CART.
- **Chapter 6 — Regression algorithms:** Explores Bayesian linear regression, hierarchical models, k-NN regression, and Gaussian processes.
- **Chapter 7 — Selected supervised algorithms:** Discusses PageRank, HMMs, imbalanced learning, [[Active Learning]], [[Bayesian Optimization]], and ensembles.
- **Chapter 8 — Fundamental unsupervised algorithms:** Presents [[Dirichlet Process K-Means]], Gaussian mixtures, PCA, and t-SNE.
- **Chapter 9 — Selected unsupervised algorithms:** Includes LDA, density estimation, structure learning, simulated annealing, genetic algorithms.
- **Chapter 10 — Fundamental deep learning:** Builds MLPs, CNNs (LeNet/ResNet), RNNs/LSTMs, and optimizer comparisons.
- **Chapter 11 — Advanced deep learning:** Covers autoencoders/VAEs, amortized VI, mixture density networks, transformers, and graph neural networks.
- **Appendices — Further reading & exercises:** Provide references and solutions.

## Entities Mentioned

- [[Vadim Smolyakov]] — Author and educator.

## Concepts Covered

- [[Markov Chain Monte Carlo]], [[Variational Inference]], [[Dirichlet Process K-Means]], [[Gaussian Mixture Model]], [[Latent Dirichlet Allocation]], [[Active Learning]], [[Bayesian Optimization]], [[Ensemble Methods]], [[Mixture Density Network]], [[Graph Neural Network]].
