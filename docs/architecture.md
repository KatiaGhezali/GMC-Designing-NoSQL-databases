# E-commerce Database Architecture

## 1. Initial Architecture

The initial system uses a MongoDB document database with four collections:

- users
- products
- orders
- inventory

The design focuses on operational queries, product discovery, order management, and stock updates.

The collections use document structures that reflect the application's main entities. Related information, such as order items and customer details at the time of purchase, is embedded where this supports efficient retrieval.

## 2. Refactored Architecture

The proposed production architecture contains:

1. An application layer that handles customer requests.
2. A MongoDB sharded cluster for operational data.
3. Replica sets for each shard.
4. An asynchronous event-processing pipeline.
5. A denormalized analytical collection.

Sharding distributes data and query workloads across multiple servers. Replica sets provide redundancy and support automatic failover. The analytical collection separates reporting workloads from the main transactional collections.

## 3. Data Flow

### Order creation

1. A customer submits an order.
2. The application validates the request.
3. Inventory is conditionally reserved.
4. The order document is created.
5. The transaction commits.
6. An order-created event is published.
7. An analytics consumer updates daily sales summaries.

If the inventory reservation or order creation fails, the transactional operation is rolled back.

For operations involving multiple documents, MongoDB transactions can maintain atomicity. The application must also handle transaction retries and failures appropriately.

### Analytics processing

1. The event processor receives an order-created event.
2. It checks whether the event has already been processed.
3. It calculates the contribution of the order to product sales.
4. It updates dailyProductSales.
5. It records successful event processing.

The event-processing mechanism should use durable delivery, retries, and idempotency.

This design allows analytical summaries to be updated asynchronously without making order completion depend on immediate analytics processing.

## 4. CAP Theorem and Consistency Considerations

The CAP theorem describes a trade-off that distributed systems must manage when a network partition occurs:

- **Consistency (C):** reads observe data that satisfies the chosen consistency guarantees.
- **Availability (A):** every request to a non-failing node receives a response.
- **Partition tolerance (P):** the system continues operating despite communication failures between nodes.

Partition tolerance is essential in a distributed database. During a partition, the system must manage the trade-off between consistency and availability.

The proposed architecture prioritizes consistency for critical operations such as order creation and inventory reservation. If a replica-set majority cannot be reached, majority-acknowledged writes may be rejected or delayed rather than accepted without the required guarantees.

MongoDB provides configurable consistency controls:

- **Majority write concern (`w: "majority"`):** requests acknowledgement from a majority of replica-set voting members before a write is considered successful.
- **Primary-based writes:** writes are normally directed to the replica-set primary.
- **Read preference:** applications can choose whether reads are directed to the primary or eligible secondary members.
- **Read concern:** controls the consistency guarantees of data returned by reads.

Reading from secondary members can improve read distribution, but secondary data may be stale because replication is asynchronous.

During a primary election, writes may be temporarily unavailable while a new primary is selected. This is an availability trade-off that supports the configured consistency guarantees.

Analytical summaries can tolerate temporary delays because they are eventually consistent. This allows the system to prioritize reliable transactional operations while processing reporting data asynchronously.

## 5. Performance Considerations

Performance depends on more than schema design.

The production system would require:

- Load testing at the target transaction rate.
- Appropriate shard-key selection and distribution analysis.
- Connection pooling.
- Query profiling and index optimization.
- Replication-lag monitoring.
- Automated failover testing.
- Backup and recovery procedures.
- Monitoring of resource utilization and slow queries.

The local single-node replica set can demonstrate database operations and index usage, but it cannot validate real multi-node failover, horizontal sharding, or production-scale throughput.

## 6. Conclusion

The refactored architecture separates transactional operations from analytical processing while combining sharding, replication, indexing, and asynchronous events.

These design decisions aim to improve scalability, fault tolerance, and workload isolation. Actual performance and availability would need to be validated through deployment and testing in a multi-node sharded environment.
