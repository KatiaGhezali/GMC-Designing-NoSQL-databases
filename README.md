# GMC Designing NoSQL Databases Based on Multiple Requirement Views

## Project Overview

This project explores the design and refactoring of a NoSQL database for an e-commerce application using MongoDB.

The exercise considers operational queries, high transaction throughput, scalability, availability, consistency, and large-scale analytics.

## Objectives

- Design an initial document-oriented database schema.
- Identify entities, relationships, and query patterns.
- Define indexes for common operations.
- Refactor the design using proposed sharding and replication strategies.
- Introduce denormalized analytical data.
- Evaluate consistency, availability, and performance trade-offs.
- Verify index usage and examine the local replica-set configuration.

## Technology

- MongoDB 8.0
- MongoDB Shell (mongosh)
- JSON document schemas
- JavaScript database scripts
- Markdown documentation

## Repository Structure

```text
GMC-Designing-NoSQL-databases/
├── README.md
├── docs/
│   ├── initial-design.md
│   ├── refactored-design.md
│   ├── architecture.md
│   ├── reflection.md
│   ├── query-performance.md
│   ├── sharding-configuration.md
│   └── replica-set-analysis.md
├── schemas/
│   ├── initial/
│   │   ├── users.json
│   │   ├── products.json
│   │   ├── orders.json
│   │   └── inventory.json
│   └── refactored/
│       ├── users.json
│       ├── products.json
│       ├── orders.json
│       ├── inventory.json
│       └── daily-product-sales.json
├── indexes/
│   ├── initial-indexes.js
│   └── refactored-indexes.js
├── scripts/
│   ├── sample-data.js
│   ├── query-examples.js
│   ├── verify-initial-indexes.js
│   ├── explain-queries.js
│   ├── verify-refactored-indexes.js
│   └── replica-set-status.js
└── screenshots/
```

## Part 1: Initial Schema Design

The initial design uses four collections:

- **Users:** Customer profiles and contact information.
- **Products:** Product descriptions, prices, categories, and attributes.
- **Orders:** Customer snapshots, purchased items, payment details, and delivery information.
- **Inventory:** Stock quantities and warehouse information.

The schema uses embedded documents for customer and product snapshots in orders, while maintaining separate collections for users, products, and inventory.

This approach supports common e-commerce queries while avoiding unbounded growth of user and product documents.

See [Initial Design](docs/initial-design.md).

## Part 2: Refactored Schema

The refactored design introduces several strategies to support increased traffic and analytical workloads:

- **Sharding:** Proposes distributing data across multiple database nodes to support horizontal scalability.
- **Replication:** Proposes replica sets to improve fault tolerance and availability.
- **Denormalization:** Introduces pre-aggregated daily sales information.
- **Asynchronous processing:** Updates analytical collections independently of critical order operations.
- **Consistency strategies:** Prioritizes stronger consistency for order and inventory operations while allowing eventual consistency for analytical summaries.

See [Refactored Design](docs/refactored-design.md).

## Architecture and CAP Considerations

The overall architecture, order-processing workflow, data distribution strategy, and CAP theorem considerations are explained in [Architecture](docs/architecture.md).

The proposed shard keys and deployment commands are documented in [Sharding Configuration](docs/sharding-configuration.md).

The local replica-set configuration and its limitations are discussed in [Replica Set Analysis](docs/replica-set-analysis.md).

## Query and Index Verification

The repository includes scripts for inserting sample data, executing representative e-commerce queries, creating indexes, and verifying index definitions.

Query execution plans were inspected using MongoDB's `explain()` functionality to confirm index usage.

See [Query Performance](docs/query-performance.md).

## Reflection

The reflection report discusses the challenges encountered during the schema refactor, the influence of new requirements on design decisions, and the resulting improvements and trade-offs.

See [Reflection Report](docs/reflection.md).

## Important Implementation Note

This repository contains representative document schemas, index definitions, sample data, query examples, and a proposed distributed architecture.

The schemas, indexes, and representative database operations were tested in a local MongoDB environment. The local environment uses a single-member replica set named `rs0`.

The sharding and multi-member replica-set configuration describes the intended production deployment. A production sharded cluster requires separately provisioned MongoDB infrastructure.

Consequently, the local implementation does not demonstrate genuine horizontal data distribution, multi-node replication, automatic failover, or production-scale throughput.

The design identifies the need for load testing, monitoring, durable event processing, and appropriate shard-key selection before claiming that the system meets a specific transaction-throughput target.

## Conclusion

This project demonstrates how a document-oriented NoSQL database can evolve from an operational e-commerce design into a proposed distributed architecture that supports higher workloads, fault tolerance, and analytical queries.

It highlights the importance of adapting database models and consistency strategies to different application requirements.
