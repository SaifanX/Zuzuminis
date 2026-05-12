import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const subscribe = mutation({
  args: { phone: v.string() },
  handler: async (ctx, args) => {
    // Check if phone already exists
    const existing = await ctx.db
      .query("subscribers")
      .withIndex("by_phone", (q) => q.eq("phone", args.phone))
      .unique();

    if (existing) {
      return { success: true, message: "Already subscribed!" };
    }

    await ctx.db.insert("subscribers", {
      phone: args.phone,
      createdAt: Date.now(),
    });

    return { success: true, message: "Welcome to the Universe!" };
  },
});
