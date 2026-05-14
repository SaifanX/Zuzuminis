import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    name: v.string(),
    description: v.string(),
    price: v.number(),
    costPrice: v.optional(v.number()),
    category: v.string(),
    inventory: v.number(),
    images: v.array(v.string()),
    slug: v.string(),
    sku: v.optional(v.string()), // The 'Code' column from CSV
    isFeatured: v.boolean(),
    details: v.optional(v.string()),
    ageGroup: v.optional(v.string()), // e.g., "Newborn", "Toddler"
    gender: v.optional(v.string()),   // e.g., "Boy", "Girl", "Unisex"
    sizes: v.optional(v.array(v.string())), // e.g., ["0-3M", "3-6M"]
    position: v.optional(v.array(v.number())), // [x, y, z]
    rotation: v.optional(v.array(v.number())), // [x, y, z]
  }).index("by_slug", ["slug"])
    .index("by_category", ["category"]),
  
  cartItems: defineTable({
    userId: v.string(),
    productId: v.id("products"),
    quantity: v.number(),
  }).index("by_user", ["userId"]),
  
  orders: defineTable({
    userId: v.string(),
    items: v.array(v.object({
      productId: v.id("products"),
      quantity: v.number(),
      price: v.number(),
    })),
    total: v.number(),
    status: v.string(), // "pending", "paid", "shipped", "delivered"
    customerInfo: v.object({
      name: v.string(),
      email: v.string(),
      address: v.string(),
      phone: v.string(),
    }),
  }).index("by_user", ["userId"]),

  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    points: v.optional(v.number()),
  }).index("by_clerk_id", ["clerkId"]),

  children: defineTable({
    userId: v.string(), // clerkId
    name: v.string(),
    birthday: v.string(),
    gender: v.string(),
  }).index("by_user", ["userId"]),

  subscribers: defineTable({
    phone: v.string(),
    createdAt: v.number(),
  }).index("by_phone", ["phone"]),
});
