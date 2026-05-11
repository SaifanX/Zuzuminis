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
    customerInfo: v.object({
      name: v.string(),
      email: v.string(),
      address: v.string(),
      phone: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const orderId = await ctx.db.insert("orders", {
      ...args,
      status: "pending",
    });

    // Optionally: Update inventory or award loyalty points
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.userId))
      .unique();

    if (user) {
      const currentPoints = user.points || 0;
      const newPoints = currentPoints + Math.floor(args.total / 10); // 1 point per 10 rupees
      await ctx.db.patch(user._id, { points: newPoints });
    }

    return orderId;
  },
});

export const getOrder = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.orderId);
  },
});
