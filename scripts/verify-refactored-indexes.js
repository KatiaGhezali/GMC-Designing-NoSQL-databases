const database = db.getSiblingDB("ecommerce");

const collections = [
  "users",
  "products",
  "orders",
  "inventory",
  "dailyProductSales"
];

for (const collectionName of collections) {
  print("\n========== " + collectionName.toUpperCase() + " ==========");
  printjson(database.getCollection(collectionName).getIndexes());
}

print("\n========== INDEX COUNTS ==========");

for (const collectionName of collections) {
  const count = database.getCollection(collectionName).getIndexes().length;
  print(collectionName + ": " + count);
}

print("\nRefactored index verification completed.");
