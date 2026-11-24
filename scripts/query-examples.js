const database = db.getSiblingDB("ecommerce");

// 1. Find a customer by email
print("\n1. Find a customer by email");

printjson(
  database.users.findOne({
    email: "sarah.benali@example.com",
  }),
);

// 2. Browse active electronics products
print("\n2. Browse active electronics products");

printjson(
  database.products
    .find({
      "category.id": "category_electronics",
      status: "active",
    })
    .toArray(),
);

// 3. Find a product by name
print("\n3. Find a product by name");

printjson(
  database.products
    .find({
      name: "Wireless Bluetooth Headphones",
    })
    .toArray(),
);

// 4. Retrieve a customer's orders
print("\n4. Retrieve a customer's orders");

printjson(
  database.orders
    .find({
      customerId: "user_001",
    })
    .sort({
      createdAt: -1,
    })
    .toArray(),
);

// 5. Find orders currently in transit
print("\n5. Find orders currently in transit");

printjson(
  database.orders
    .find({
      "delivery.status": "in_transit",
    })
    .toArray(),
);

// 6. Check product inventory
print("\n6. Check product inventory");

printjson(
  database.inventory.findOne({
    productId: "product_001",
  }),
);

// 7. Identify top-selling products
print("\n7. Identify top-selling products");

printjson(
  database.dailyProductSales
    .aggregate([
      {
        $group: {
          _id: "$productName",
          unitsSold: { $sum: "$totalUnitsSold" },
          revenue: { $sum: "$grossRevenue" },
        },
      },
      {
        $sort: { unitsSold: -1 },
      },
    ])
    .toArray(),
);

// 8. Calculate revenue by category
print("\n8. Calculate revenue by category");

printjson(
  database.dailyProductSales
    .aggregate([
      {
        $group: {
          _id: "$categoryId",
          totalRevenue: { $sum: "$grossRevenue" },
        },
      },
      {
        $sort: { totalRevenue: -1 },
      },
    ])
    .toArray(),
);

print("\nAll query demonstrations completed.");
