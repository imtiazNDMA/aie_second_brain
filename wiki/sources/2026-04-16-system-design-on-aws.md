---
title: System Design on AWS
type: source
tags: [system-design, aws, cloud-architecture]
sources: [system design on aws.pdf]
created: 2026-04-16
updated: 2026-04-16
---

# System Design on AWS

**Author/Publisher:** Jayanth Kumar and Mandeep Singh (O'Reilly)  
**Date ingested:** 2026-04-16  
**Type:** technical architecture handbook

## Summary

This source presents a three-part progression for cloud architecture work: core system-design tradeoffs, a service-level map of AWS building blocks, and end-to-end use cases that evolve from Day 0 to Day N architectures. The practical value is the repeated translation of abstract principles (consistency/availability, latency/throughput, modularity, blast radius) into concrete service choices across networking, storage, compute, messaging, orchestration, observability, and access management.

## Key Claims

- Good system design starts with explicit tradeoffs, then maps those constraints to concrete platform primitives.
- Cloud architecture quality depends on balancing performance, scalability, reliability, and cost rather than optimizing a single metric.
- AWS service selection is most effective when organized by system layer (network, storage, compute, messaging, monitoring, identity) and failure boundaries.
- Evolution from Day 0 to Day N is a first-class design concern; architectures should be intentionally staged for growth.
- Reusable patterns (for example CQRS, saga-style orchestration, and circuit-breaker controls) recur across very different product domains.

## Entities Mentioned

- [[Jayanth Kumar]] - co-author focused on systems and scaling practice.
- [[Mandeep Singh]] - co-author with Amazon/AWS systems experience.
- [[Amazon VPC]] - foundational network isolation and routing boundary in AWS.
- [[Amazon Route 53]] - DNS and routing policy layer for global traffic steering.
- [[Amazon API Gateway]] - managed API ingress layer for service front doors.
- [[Amazon CloudFront]] - edge caching and global content-delivery network.
- [[Amazon S3]] - object-storage backbone for durable assets and data lakes.
- [[Amazon EC2]] - general-purpose compute foundation for stateful/stateless services.
- [[AWS Lambda]] - serverless execution model for event-driven workloads.
- [[Amazon DynamoDB]] - managed key-value/document store for high-scale access paths.
- [[Amazon Kinesis]] - managed streaming ingestion and processing platform.
- [[AWS Identity and Access Management]] - policy and principal control plane for access governance.

## Concepts Covered

- [[Blast Radius]]
- [[Day 0 Architecture]]
- [[Day N Architecture]]
- [[Choreography]]
- [[Orchestration]]
- [[Circuit Breaker]]
- [[CQRS]]
- [[Saga Pattern]]

## Flowcharts, Images, and Graphics

- The source contains architecture diagrams for AWS service topologies and Day 0/Day N evolution across URL shortener, crawler/search, social feed, gaming leaderboard, reservation, chat, streaming, and trading use cases.
- Media attachments are intentionally omitted from the wiki; only textual figure catalogs and references are maintained.
