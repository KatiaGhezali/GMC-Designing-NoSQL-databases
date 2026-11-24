// Refactored MongoDB indexes for the ecommerce database.
// This script creates indexes only.
// Sharding commands are documented separately.

const database = db.getSiblingDB("ecommerce");

// USERS
// Email remains unique for account lookup and authentication.
database.users.createIndex({ email: 1 }, { unique: true });

// PRODUCTS
// Slug supports direct product-page lookups.
database.products.createIndex({ slug: 1 }, { unique: true });

// Supports category filtering, status filtering and price queries.
database.products.createIndex({
  "category.id": 1,
  status: 1,
  "price.amount": 1,
});

// Supports product text searches.
database.products.createIndex({
  name: "text",
  description: "text",
  tags: "text",
});

// ORDERS
// Supports customer-specific order history.
database.orders.createIndex({ customerId: 1, createdAt: -1 });

// Supports order uniqueness within each customer.
// In a sharded deployment, this replaces the global orderNumber index.
database.orders.createIndex(
  { customerId: 1, orderNumber: 1 },
  { unique: true },
);

// Supports filtering orders by status and date.
database.orders.createIndex({ orderStatus: 1, createdAt: -1 });

database.orders.createIndex({ "delivery.status": 1 });

// INVENTORY
// Supports product and warehouse lookups.
database.inventory.createIndex(
  { productId: 1, "warehouse.warehouseId": 1 },
  { unique: true },
);

// ANALYTICS
// Supports product-specific daily sales records.
database.dailyProductSales.createIndex(
  { productId: 1, date: 1 },
  { unique: true },
);

// Supports revenue analysis over recent dates.
database.dailyProductSales.createIndex({ date: -1, grossRevenue: -1 });

// Supports category-based sales analysis.
database.dailyProductSales.createIndex({ categoryId: 1, date: -1 });

print("Refactored ecommerce indexes created successfully.");
