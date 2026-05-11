import { v } from "convex/values";
import { query } from "./_generated/server";

export const search = query({
  args: {
    query: v.string(),
  },
  handler: async (ctx, args) => {
    if (args.query.length < 2) return [];

    const products = await ctx.db
      .query("products")
      .collect();

    // Simple search for now. Later we can use SearchIndex if needed.
    return products.filter((p) => 
      p.name.toLowerCase().includes(args.query.toLowerCase()) ||
      p.category.toLowerCase().includes(args.query.toLowerCase())
    ).slice(0, 5); // Just top 5 for recommendations
  },
});
