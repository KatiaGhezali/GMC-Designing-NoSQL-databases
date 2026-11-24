# Query Execution and Index Performance Analysis

## Objective

The purpose of this test was to verify that the initial MongoDB indexes support the main e-commerce queries and that MongoDB uses index scans instead of unnecessary full collection scans.

## Execution results

The queries were tested using MongoDB's `explain("executionStats")` method.

| Query                                     | Index used                          | Execution stage | Documents returned | Documents examined |
| ----------------------------------------- | ----------------------------------- | --------------- | -----------------: | -----------------: |
| Customer lookup by email                  | email_1                             | EXPRESS_IXSCAN  |                  1 |                  1 |
| Product browsing by category and status   | category.id_1_status_1              | IXSCAN          |                  2 |                  2 |
| Customer order history                    | customerId*1_createdAt*-1           | IXSCAN          |                  2 |                  2 |
| Inventory lookup by product and warehouse | productId_1_warehouse.warehouseId_1 | IXSCAN          |                  1 |                  1 |

## Analysis

All four queries successfully used their corresponding indexes.

- The customer email lookup used the `email_1` index.
- Product browsing used a compound index on category ID and status.
- Customer order history used a compound index on customer ID and creation date, supporting both filtering and sorting.
- Inventory lookup used a unique compound index on product ID and warehouse ID.

The execution statistics showed that the number of documents examined matched the number of documents returned in all four tests. This indicates that the indexes efficiently located the matching records in this demonstration.

## Limitations

The database contains only a small sample dataset. The reported execution times of 0–1 ms demonstrate successful query execution but do not establish production-level performance or prove that the system can sustain thousands of transactions per second.

A realistic scalability assessment would require a larger dataset, controlled load testing, monitoring, and an appropriately configured sharded deployment.

## Conclusion

The initial indexing strategy supports the selected e-commerce access patterns. The execution plans confirm that MongoDB can use the defined indexes for customer, product, order, and inventory queries.
