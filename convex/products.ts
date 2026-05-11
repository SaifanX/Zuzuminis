import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const list = query({
  args: {
    ageGroup: v.optional(v.string()),
    gender: v.optional(v.string()),
    category: v.optional(v.string()),
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Explicitly handle filters to avoid schema mismatches
    const products = await ctx.db.query("products").filter((q) => {
      const conditions = [];
      if (args.ageGroup && args.ageGroup !== "All") conditions.push(q.eq(q.field("ageGroup"), args.ageGroup));
      if (args.gender && args.gender !== "All") conditions.push(q.eq(q.field("gender"), args.gender));
      if (args.category && args.category !== "All") conditions.push(q.eq(q.field("category"), args.category));
      
      if (conditions.length === 0) return true;
      if (conditions.length === 1) return conditions[0];
      return q.and(...conditions as [any, any, ...any[]]);
    }).collect();

    if (args.search) {
      const s = args.search.toLowerCase();
      return products.filter((p) => 
        p.name.toLowerCase().includes(s) || 
        p.category.toLowerCase().includes(s)
      );
    }

    return products;
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

// Seed function for development
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("products").collect();
    if (existing.length > 0) {
      for (const product of existing) {
        await ctx.db.delete(product._id);
      }
    }

    const products = [
      {
        name: "Cloud Cotton Night Suit",
        description: "Ultra-soft 100% organic cotton night suit for peaceful dreams.",
        price: 1299,
        category: "Nightwear",
        inventory: 50,
        images: ["/assets/product1.png"],
        slug: "cloud-cotton-night-suit",
        isFeatured: true,
        ageGroup: "2-3",
        gender: "Unisex",
        position: [5, 0, -10],
        rotation: [0, 0.5, 0],
      },
      {
        name: "Botanical Garden Set",
        description: "Playful floral prints on breathable summer cotton.",
        price: 1499,
        category: "Casuals",
        inventory: 30,
        images: ["/assets/product2.png"],
        slug: "botanical-garden-set",
        isFeatured: true,
        ageGroup: "3-4",
        gender: "Girl",
        position: [-8, 2, -25],
        rotation: [0, -0.8, 0],
      }
    ];

    for (const product of products) {
      await ctx.db.insert("products", product as any);
    }
  },
});
