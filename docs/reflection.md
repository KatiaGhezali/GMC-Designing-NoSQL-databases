# Reflection Report

Refactoring the initial NoSQL database design presented several challenges. The main difficulty was balancing high transaction throughput, strong consistency, high availability, and analytical performance without making the operational database unnecessarily complex.

The new requirements significantly influenced the architecture. Initially, a document-oriented MongoDB design was sufficient for product browsing, customer information, inventory, and order management. However, increasing traffic required a more explicit distribution strategy. I designed shard keys for the main collections, considering query patterns, write distribution, and the risk of hotspots or expensive cross-shard queries. I also proposed replica sets to improve fault tolerance and support automatic failover in a production environment.

The analytical requirement changed the data model as well. Instead of repeatedly aggregating the complete order history, I introduced a denormalized `dailyProductSales` collection containing precomputed sales metrics. An asynchronous event-processing pipeline updates these summaries, allowing analytical workloads to operate independently of critical order transactions.

The refactored design aims to improve horizontal scalability, fault tolerance, and analytical query performance. However, it introduces trade-offs, including replication lag, eventual consistency in analytics, additional storage, and greater operational complexity. Critical order and inventory operations therefore retain stronger consistency requirements, while analytical data can tolerate temporary delays.

I implemented and verified the schemas, indexes, sample data, and representative queries locally. However, the local environment uses a single-member replica set, so actual multi-node replication, automatic failover, and horizontal sharding remain proposed production capabilities requiring further deployment and testing.

This exercise demonstrated that effective NoSQL database design requires adapting data models and distribution strategies to different workload requirements.
