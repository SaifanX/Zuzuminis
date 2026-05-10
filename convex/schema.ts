import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    name: v.string(),
    description: v.string(),
    price: v.number(),
    category: v.string(),
    inventory: v.number(),
    images: v.array(v.string()),
    slug: v.string(),
    isFeatured: v.boolean(),
    details: v.optional(v.string()),
    ageGroup: v.optional(v.string()), // e.g., "0-1", "1-2"
    gender: v.optional(v.string()),   // e.g., "Boy", "Girl", "Unisex"
    position: v.array(v.number()), // [x, y, z]
    rotation: v.array(v.number()), // [x, y, z]
  }).index("by_slug", ["slug"]),
  
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
});
