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
    status: v.string(), // "pending", "pending_payment", "paid", "shipped", "delivered"
    paymentMethod: v.string(), // "COD" or "ONLINE"
    razorpayOrderId: v.optional(v.string()),
    razorpayPaymentId: v.optional(v.string()),
    whatsappSent: v.optional(v.boolean()),
    shipmentId: v.optional(v.string()),
    awbCode: v.optional(v.string()),
    courierName: v.optional(v.string()),
    trackingUrl: v.optional(v.string()),
    customerInfo: v.object({
      name: v.string(),
      email: v.string(),
      address: v.string(),
      phone: v.string(),
    }),
  }).index("by_user", ["userId"])
    .index("by_razorpay_order_id", ["razorpayOrderId"]),

  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    points: v.optional(v.number()),
    vipTier: v.optional(v.string()), // "MEMBER", "VIP_SILVER", "VIP_GOLD"
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

  waitlist: defineTable({
    productId: v.id("products"),
    email: v.string(),
    phone: v.optional(v.string()),
    resolved: v.boolean(),
    createdAt: v.number(),
  }).index("by_product", ["productId"])
    .index("by_resolved", ["resolved"]),

  activeCarts: defineTable({
    userId: v.string(),
    email: v.string(),
    cartValue: v.number(),
    itemsCount: v.number(),
    updatedAt: v.number(),
    abandonedPingSent: v.boolean(),
  }).index("by_user", ["userId"])
    .index("by_abandoned", ["abandonedPingSent", "updatedAt"]),

  marketingLogs: defineTable({
    type: v.string(), // "ABANDONED_CART", "BACK_IN_STOCK", "VIP_UPGRADE", "SALE_BLAST"
    recipient: v.string(), // email or phone
    title: v.string(),
    message: v.string(),
    createdAt: v.number(),
  }).index("by_type", ["type"]),

  adminSecrets: defineTable({
    key: v.string(),
    value: v.string(),
  }).index("by_key", ["key"]),

  adminSessions: defineTable({
    token: v.string(),
    expiresAt: v.number(),
  }).index("by_token", ["token"]),
});
