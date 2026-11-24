# Sharding Configuration and Distribution Strategy

## 1. Objective

The refactored architecture uses MongoDB sharding to distribute large collections across multiple servers. This is intended to improve horizontal scalability and distribute storage and query workloads.

The following configuration is designed for a properly configured MongoDB sharded cluster. It must not be executed against the local single-node replica set.

## 2. Proposed shard keys

| Collection        | Shard key                   | Reason                                                                       |
| ----------------- | --------------------------- | ---------------------------------------------------------------------------- |
| products          | `{ slug: 1 }`               | Supports product lookups and is compatible with the unique slug index.       |
| orders            | `{ customerId: 1 }`         | Supports targeted customer order-history queries.                            |
| inventory         | `{ productId: 1 }`          | Distributes inventory records by product and supports product-based lookups. |
| dailyProductSales | `{ productId: 1, date: 1 }` | Distributes analytical records by product and date.                          |

The users collection remains unsharded. Its unique email index supports account lookups, and it does not initially require the same distribution strategy as the larger collections.

## 3. Sharded cluster setup

The following commands are intended for execution through `mongos` after a sharded cluster has been configured and the required indexes have been created.

```javascript
const database = db.getSiblingDB("ecommerce");

sh.enableSharding("ecommerce");

// Remove the old globally unique orderNumber index.
// The replacement compound index is compatible with the customerId shard key.
database.orders.dropIndex("orderNumber_1");

// Products
sh.shardCollection("ecommerce.products", { slug: 1 });

// Orders
sh.shardCollection("ecommerce.orders", { customerId: 1 });

// Inventory
sh.shardCollection("ecommerce.inventory", { productId: 1 });

// Daily sales analytics
sh.shardCollection("ecommerce.dailyProductSales", { productId: 1, date: 1 });
```

These commands are for a future sharded-cluster deployment only. They must not be run against the current local replica set.

## 4. Unique index considerations

MongoDB requires a unique index on a sharded collection to include the shard key as a prefix, subject to MongoDB's sharding restrictions.

- **Products:** The unique `slug` index is compatible with the `slug` shard key.
- **Orders:** The unique `orderNumber` index must be replaced by the compound unique index `{ customerId: 1, orderNumber: 1 }`. This guarantees uniqueness within each customer. If globally unique order numbers are required, the application must enforce that requirement separately.
- **Inventory:** The unique compound index `{ productId: 1, "warehouse.warehouseId": 1 }` includes the proposed `productId` shard key as its prefix.
- **Daily sales:** The unique compound index `{ productId: 1, date: 1 }` matches the proposed shard key.

Before sharding existing collections, incompatible unique indexes must be removed or redesigned.

When `_id` is not the shard key, MongoDB does not enforce `_id` uniqueness across all shards. The application must therefore generate globally unique identifiers.

## 5. Scalability and trade-offs

Range-based shard keys support targeted queries when requests include the shard-key fields. Their distribution depends on the values and workload.

- Product queries by slug can be routed to the relevant shard.
- Customer order-history queries can be routed using `customerId`.
- Inventory queries containing `productId` can be routed to the relevant shard range.
- Analytics queries containing `productId` and `date` can target relevant shard ranges.

Queries that do not include the shard key may require scatter-gather operations across multiple shards.

Range-based shard keys can also create uneven distribution or hotspots when some values receive disproportionately high traffic. Production deployment would require workload analysis, shard-key cardinality assessment, monitoring and possible resharding.

## 6. Availability and fault tolerance

A production deployment should use multiple replica-set-backed shards and redundant config servers. Each shard should have multiple members so that data can remain available following an individual server failure.

Sharding distributes data and workload; replication provides redundancy and automatic failover. Both are needed for a highly available design.

## 7. Local environment limitation

The local environment uses a single-node replica set named `rs0`. It supports local replica-set operations but does not provide a `mongos` router, multiple shards or genuine horizontal distribution.

Therefore, the index definitions can be demonstrated locally, while the sharding commands document the intended production architecture. A multi-node sharded cluster and load testing would be required to validate real horizontal scalability and high availability.

## 8. Conclusion

The proposed refactored architecture separates transactional workloads from analytical workloads and introduces shard keys that support the main access patterns.

The design aims to improve horizontal scalability while retaining appropriate indexing and consistency requirements. Its actual performance and fault tolerance would need to be validated in a production-like sharded cluster.
