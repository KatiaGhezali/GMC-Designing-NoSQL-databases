# Part 1: Initial NoSQL Database Design

## 1. Overview

The initial design uses MongoDB, a document-oriented NoSQL
database, for an e-commerce platform. The system must support
product browsing, product search, order management, and a high
volume of transactions.

The document model was selected because it supports flexible
schemas, embedded documents, indexing, and horizontal scaling.

## 2. Main Collections

The database contains four collections:

- users: customer profiles and contact information.
- products: product descriptions, prices, categories, and attributes.
- orders: customer snapshots, purchased items, payment details,
  and delivery information.
- inventory: stock quantities and warehouse information.

## 3. Relationships and Data Modeling

Users and orders have a one-to-many relationship. Each order
references its customer through customerId.

Orders embed customer and product snapshots. This preserves
historical information even if a customer's profile or a product's
catalog information changes later.

Products and inventory are separated because product descriptions
change less frequently than stock quantities.

Product categories are represented by embedded category
identifiers and names. This supports efficient catalog queries
without requiring a separate join for common product listings.

## 4. Query Patterns

The design supports these main operations:

1. Find a customer by email.
2. Browse active products by category.
3. Search products by name, description, or tags.
4. Retrieve an order using its order number.
5. Retrieve a customer's orders sorted by date.
6. Filter orders by order or delivery status.
7. Check inventory by product and warehouse.

Indexes are defined in initial-indexes.js to support these
query patterns and reduce collection scans.

## 5. Scalability and Consistency

MongoDB supports horizontal scaling through sharding and
high availability through replica sets.

The initial design uses atomic document-level updates for
operations such as changing an inventory record or updating
an order's status.

However, placing an order may involve multiple documents,
including inventory and order records. Such operations require
appropriate transaction handling to prevent inconsistent stock
and order data.

The design aims to balance efficient reads, write throughput,
and consistency for critical order operations.

## 6. Initial Design Limitations

The initial design is suitable for operational workloads but
does not yet provide a dedicated analytical data model.

Large-scale sales reporting could require expensive aggregations
over operational orders. The design also needs explicit
distribution and replication strategies to address increasing
traffic and infrastructure failures.

These limitations motivate the refactored design in Part 2.
