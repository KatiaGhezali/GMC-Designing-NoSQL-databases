const database = db.getSiblingDB("ecommerce");

print("\n========== USERS INDEXES ==========");
printjson(database.users.getIndexes());

print("\n========== PRODUCTS INDEXES ==========");
printjson(database.products.getIndexes());

print("\n========== ORDERS INDEXES ==========");
printjson(database.orders.getIndexes());

print("\n========== INVENTORY INDEXES ==========");
printjson(database.inventory.getIndexes());

print("\n========== INDEX COUNTS ==========");
print("Users: " + database.users.getIndexes().length);
print("Products: " + database.products.getIndexes().length);
print("Orders: " + database.orders.getIndexes().length);
print("Inventory: " + database.inventory.getIndexes().length);

print("\nInitial index verification completed.");
