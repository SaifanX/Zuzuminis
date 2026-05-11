import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const storeUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (existing) {
      if (existing.email !== args.email || existing.name !== args.name) {
        await ctx.db.patch(existing._id, { email: args.email, name: args.name });
      }
      return existing._id;
    }

    return await ctx.db.insert("users", {
      clerkId: args.clerkId,
      email: args.email,
      name: args.name,
      points: 0,
    });
  },
});

export const getByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();
  },
});

export const addChild = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    birthday: v.string(),
    gender: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("children", {
      userId: args.userId,
      name: args.name,
      birthday: args.birthday,
      gender: args.gender,
    });
  },
});

export const getChildren = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("children")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});
