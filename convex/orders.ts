import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const placeOrder = mutation({
  args: {
    userId: v.string(),
    items: v.array(
      v.object({
        productId: v.id("products"),
        quantity: v.number(),
        price: v.number(),
      })
    ),
    total: v.number(),
    paymentMethod: v.string(), // "COD" or "ONLINE"
    customerInfo: v.object({
      name: v.string(),
      email: v.string(),
      address: v.string(),
      phone: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const status = args.paymentMethod === "COD" ? "pending" : "pending_payment";
    const orderId = await ctx.db.insert("orders", {
      ...args,
      status,
    });

    // Award loyalty points immediately for COD orders
    if (args.paymentMethod === "COD") {
      const user = await ctx.db
        .query("users")
        .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.userId))
        .unique();

      if (user) {
        const currentPoints = user.points || 0;
        const newPoints = currentPoints + Math.floor(args.total / 10); // 1 point per 10 rupees
        await ctx.db.patch(user._id, { points: newPoints });
      }
    }

    return orderId;
  },
});

export const updateOrderRazorpayId = mutation({
  args: {
    orderId: v.id("orders"),
    razorpayOrderId: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.orderId, {
      razorpayOrderId: args.razorpayOrderId,
    });
  },
});

export const markOrderAsPaid = mutation({
  args: {
    razorpayOrderId: v.string(),
    razorpayPaymentId: v.string(),
  },
  handler: async (ctx, args) => {
    const order = await ctx.db
      .query("orders")
      .withIndex("by_razorpay_order_id", (q) => q.eq("razorpayOrderId", args.razorpayOrderId))
      .unique();

    if (!order) {
      throw new Error(`Order with Razorpay ID ${args.razorpayOrderId} not found.`);
    }

    if (order.status === "paid") {
      return order; // Already processed
    }

    await ctx.db.patch(order._id, {
      status: "paid",
      razorpayPaymentId: args.razorpayPaymentId,
    });

    // Award loyalty points for online order once paid
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", order.userId))
      .unique();

    if (user) {
      const currentPoints = user.points || 0;
      const newPoints = currentPoints + Math.floor(order.total / 10);
      await ctx.db.patch(user._id, { points: newPoints });
    }

    return order;
  },
});

export const markWhatsappSent = mutation({
  args: {
    orderId: v.id("orders"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.orderId, {
      whatsappSent: true,
    });
  },
});

export const getOrder = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.orderId);
  },
});

export const listAllOrders = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("orders").order("desc").take(100);
  },
});

export const updateOrderStatus = mutation({
  args: {
    orderId: v.id("orders"),
    status: v.string(), // "pending", "paid", "shipped", "delivered"
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.orderId, {
      status: args.status,
    });
  },
});

export const updateOrderShipping = mutation({
  args: {
    orderId: v.id("orders"),
    shipmentId: v.string(),
    awbCode: v.string(),
    courierName: v.string(),
    trackingUrl: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.orderId, {
      status: "shipped",
      shipmentId: args.shipmentId,
      awbCode: args.awbCode,
      courierName: args.courierName,
      trackingUrl: args.trackingUrl,
    });
  },
});


