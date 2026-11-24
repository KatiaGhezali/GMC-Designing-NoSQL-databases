const database = db.getSiblingDB("ecommerce");

print("\n1. CUSTOMER LOOKUP BY EMAIL");
printjson(
  database.users.find({
    email: "sarah.benali@example.com"
  }).explain("executionStats").executionStats
);

print("\n2. PRODUCT BROWSING BY CATEGORY");
printjson(
  database.products.find({
    "category.id": "category_electronics",
    status: "active"
  }).explain("executionStats").executionStats
);

print("\n3. CUSTOMER ORDER HISTORY");
printjson(
  database.orders.find({
    customerId: "user_001"
  }).sort({
    createdAt: -1
  }).explain("executionStats").executionStats
);

print("\n4. INVENTORY LOOKUP");
printjson(
  database.inventory.find({
    productId: "product_001",
    "warehouse.warehouseId": "warehouse_001"
  }).explain("executionStats").executionStats
);

print("\nIndex execution analysis completed.");
