// Initial MongoDB index definitions
// All indexes are created in the ecommerce database.

const database = db.getSiblingDB("ecommerce");

// USERS
database.users.createIndex({ email: 1 }, { unique: true });

// PRODUCTS
database.products.createIndex({ slug: 1 }, { unique: true });

database.products.createIndex({ "category.id": 1, status: 1 });

database.products.createIndex({ price: 1 });

database.products.createIndex({
  name: "text",
  description: "text",
  tags: "text",
});

// ORDERS
database.orders.createIndex({ orderNumber: 1 }, { unique: true });

database.orders.createIndex({ customerId: 1, createdAt: -1 });

database.orders.createIndex({ orderStatus: 1, createdAt: -1 });

database.orders.createIndex({ "delivery.status": 1 });

// INVENTORY
database.inventory.createIndex(
  { productId: 1, "warehouse.warehouseId": 1 },
  { unique: true },
);

database.inventory.createIndex({ sku: 1 });

print("Initial ecommerce indexes created successfully.");
