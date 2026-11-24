// E-commerce database sample data
// Run against the ecommerce database using mongosh.

const database = db.getSiblingDB("ecommerce");

// Clear existing demonstration data.
// Only use this script with the dedicated demonstration database.
database.users.deleteMany({});
database.products.deleteMany({});
database.orders.deleteMany({});
database.inventory.deleteMany({});
database.dailyProductSales.deleteMany({});

// USERS
database.users.insertMany([
  {
    _id: "user_001",
    firstName: "Sarah",
    lastName: "Benali",
    email: "sarah.benali@example.com",
    accountStatus: "active",
    createdAt: new Date(),
  },
  {
    _id: "user_002",
    firstName: "Amine",
    lastName: "Kaci",
    email: "amine.kaci@example.com",
    accountStatus: "active",
    createdAt: new Date(),
  },
  {
    _id: "user_003",
    firstName: "Lina",
    lastName: "Mansouri",
    email: "lina.mansouri@example.com",
    accountStatus: "active",
    createdAt: new Date(),
  },
]);

// PRODUCTS
database.products.insertMany([
  {
    _id: "product_001",
    name: "Wireless Bluetooth Headphones",
    slug: "wireless-bluetooth-headphones",
    description: "Wireless headphones with noise cancellation.",
    category: {
      id: "category_electronics",
      name: "Electronics",
    },
    brand: "SoundTech",
    price: { amount: 89.99, currency: "USD" },
    stock: 250,
    tags: ["wireless", "audio", "bluetooth"],
    status: "active",
  },
  {
    _id: "product_002",
    name: "Mechanical Keyboard",
    slug: "mechanical-keyboard",
    description: "Mechanical keyboard with RGB lighting.",
    category: {
      id: "category_electronics",
      name: "Electronics",
    },
    brand: "KeyPro",
    price: { amount: 120, currency: "USD" },
    stock: 150,
    tags: ["keyboard", "computer", "gaming"],
    status: "active",
  },
  {
    _id: "product_003",
    name: "Running Shoes",
    slug: "running-shoes",
    description: "Lightweight running shoes.",
    category: {
      id: "category_fashion",
      name: "Fashion",
    },
    brand: "SportFlex",
    price: { amount: 75, currency: "USD" },
    stock: 100,
    tags: ["shoes", "running", "sport"],
    status: "active",
  },
]);

// INVENTORY
database.inventory.insertMany([
  {
    _id: "inventory_001",
    productId: "product_001",
    sku: "WBH-001",
    availableQuantity: 250,
    reservedQuantity: 0,
    warehouse: { warehouseId: "warehouse_001" },
    version: 1,
  },
  {
    _id: "inventory_002",
    productId: "product_002",
    sku: "MK-002",
    availableQuantity: 150,
    reservedQuantity: 0,
    warehouse: { warehouseId: "warehouse_001" },
    version: 1,
  },
  {
    _id: "inventory_003",
    productId: "product_003",
    sku: "RS-003",
    availableQuantity: 100,
    reservedQuantity: 0,
    warehouse: { warehouseId: "warehouse_001" },
    version: 1,
  },
]);

// ORDERS
database.orders.insertMany([
  {
    _id: "order_001",
    orderNumber: "ORD-2026-0001",
    customerId: "user_001",
    customer: {
      firstName: "Sarah",
      lastName: "Benali",
      email: "sarah.benali@example.com",
    },
    items: [
      {
        productId: "product_001",
        productName: "Wireless Bluetooth Headphones",
        quantity: 2,
        unitPrice: 89.99,
        subtotal: 179.98,
      },
    ],
    total: { amount: 179.98, currency: "USD" },
    orderStatus: "confirmed",
    delivery: { status: "processing" },
    createdAt: new Date("2026-11-20T10:00:00Z"),
  },
  {
    _id: "order_002",
    orderNumber: "ORD-2026-0002",
    customerId: "user_002",
    customer: {
      firstName: "Amine",
      lastName: "Kaci",
      email: "amine.kaci@example.com",
    },
    items: [
      {
        productId: "product_002",
        productName: "Mechanical Keyboard",
        quantity: 1,
        unitPrice: 120,
        subtotal: 120,
      },
    ],
    total: { amount: 120, currency: "USD" },
    orderStatus: "shipped",
    delivery: { status: "in_transit" },
    createdAt: new Date("2026-11-21T14:00:00Z"),
  },
  {
    _id: "order_003",
    orderNumber: "ORD-2026-0003",
    customerId: "user_001",
    customer: {
      firstName: "Sarah",
      lastName: "Benali",
      email: "sarah.benali@example.com",
    },
    items: [
      {
        productId: "product_003",
        productName: "Running Shoes",
        quantity: 1,
        unitPrice: 75,
        subtotal: 75,
      },
    ],
    total: { amount: 75, currency: "USD" },
    orderStatus: "delivered",
    delivery: { status: "delivered" },
    createdAt: new Date("2026-11-22T09:00:00Z"),
  },
]);

// ANALYTICAL SUMMARY
database.dailyProductSales.insertMany([
  {
    _id: "product_001_2026-11-20",
    productId: "product_001",
    productName: "Wireless Bluetooth Headphones",
    categoryId: "category_electronics",
    date: "2026-11-20",
    currency: "USD",
    totalUnitsSold: 2,
    totalOrders: 1,
    grossRevenue: 179.98,
    lastUpdated: new Date(),
  },
  {
    _id: "product_002_2026-11-21",
    productId: "product_002",
    productName: "Mechanical Keyboard",
    categoryId: "category_electronics",
    date: "2026-11-21",
    currency: "USD",
    totalUnitsSold: 1,
    totalOrders: 1,
    grossRevenue: 120,
    lastUpdated: new Date(),
  },
  {
    _id: "product_003_2026-11-22",
    productId: "product_003",
    productName: "Running Shoes",
    categoryId: "category_fashion",
    date: "2026-11-22",
    currency: "USD",
    totalUnitsSold: 1,
    totalOrders: 1,
    grossRevenue: 75,
    lastUpdated: new Date(),
  },
]);

print("Sample e-commerce data inserted successfully.");
print("Users: " + database.users.countDocuments());
print("Products: " + database.products.countDocuments());
print("Orders: " + database.orders.countDocuments());
print("Inventory: " + database.inventory.countDocuments());
print("Daily sales records: " + database.dailyProductSales.countDocuments());
