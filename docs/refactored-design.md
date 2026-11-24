# Part 2: Refactored NoSQL Database Design

## 1. Overview

The original e-commerce database has been refactored to
address two additional requirements:

- Large-scale analytical queries for sales and product trends.
- High availability and partition tolerance as user traffic grows.

The refactored design continues to use MongoDB but introduces
sharding, replica sets, denormalized analytical collections,
and asynchronous data processing.

## 2. Sharding

Sharding distributes collection data across multiple servers.

The proposed design uses hashed shard keys for products,
orders, and inventory to distribute records across shards.

Orders use a hashed customerId shard key. This helps distribute
customer order data while allowing customer-specific queries
to target the appropriate shard.

The dailyProductSales collection uses a compound shard key
containing date and a hashed productId.

Sharding increases the system's capacity to distribute
storage and query workloads. However, poor shard-key choices
can cause uneven distribution, hot spots, or scatter-gather
queries.

## 3. Replication and High Availability

Each shard is deployed as a replica set.

A typical replica set contains:

- One primary node that accepts writes.
- Two secondary nodes that replicate the primary's operations.

If the primary becomes unavailable, the remaining eligible
members can elect a new primary.

Production deployment should place replica-set members across
separate availability zones or failure domains.

Majority write concern is recommended for critical operations
such as order creation and inventory changes.

This improves durability but may increase write latency.
Secondary reads can reduce primary read load, but may return
stale data depending on replication lag and read concern.

## 4. Denormalization and Analytics

The new dailyProductSales collection stores pre-aggregated
sales information.

It contains:

- Product identifier and name.
- Category identifier.
- Aggregation date.
- Units sold.
- Number of orders.
- Gross revenue.

This avoids repeatedly scanning the complete orders collection
for common sales reports.

Analytical summaries are updated asynchronously from order
events through a background processing pipeline.

The consumer must process events idempotently to avoid
counting the same order more than once.

The analytical collection is eventually consistent with
operational orders.

## 5. Operational Consistency

Order creation and inventory reservation are critical
operations.

Inventory updates should use conditional atomic updates
to prevent stock from becoming negative.

For example, a stock reservation should only succeed when
availableQuantity is greater than or equal to the requested
quantity.

When order creation and inventory reservation involve
multiple documents, a MongoDB transaction can provide
atomicity across those changes.

Distributed transactions can introduce additional latency,
so their use should be limited to operations that require
cross-document consistency.

## 6. Availability and Partition Tolerance

Replication and sharding improve fault tolerance and allow
the database to continue operating when individual nodes fail.

However, distributed systems cannot guarantee both strong
consistency and availability for every operation during
a network partition.

For critical order and inventory operations, the system
prioritizes consistency and durable writes.

For analytical summaries and non-critical reporting,
eventual consistency is acceptable.

This separates transactional correctness from analytical
performance.

## 7. Trade-offs

The refactored design provides better horizontal scalability,
fault tolerance, and analytical query performance.

However, it introduces additional operational complexity:

- Shard-key selection and balancing.
- Replica-set monitoring and failover.
- Replication lag.
- Asynchronous event processing.
- Duplicate event handling.
- Additional storage for denormalized data.

These trade-offs are justified by the new workload requirements.
