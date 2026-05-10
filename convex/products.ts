import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("products").collect();
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
    if (existing.length > 0) return;

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
        position: [-8, 2, -25],
        rotation: [0, -0.8, 0],
      },
      {
        name: "Azure Breeze Romper",
        description: "Cool linen blend in a soothing zuzu blue.",
        price: 1899,
        category: "Casuals",
        inventory: 25,
        images: ["/assets/product3.png"],
        slug: "azure-breeze-romper",
        isFeatured: true,
        position: [12, -1, -40],
        rotation: [0, 0.3, 0],
      },
      {
        name: "Petal Soft Onesie",
        description: "Delicate pink hues for the softest skin.",
        price: 999,
        category: "Essentials",
        inventory: 100,
        images: ["/assets/product4.png"],
        slug: "petal-soft-onesie",
        isFeatured: true,
        position: [-5, 3, -55],
        rotation: [0, 1.2, 0],
      }
    ];

    for (const product of products) {
      await ctx.db.insert("products", product as any);
    }
  },
});
