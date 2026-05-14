import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Cloudinary Mapping
const cloudImages = {
  "classic_white_tee.png": "https://res.cloudinary.com/dyxjxhie1/image/upload/v1778588962/zuzuminis/products/classic_white_tee.jpg",
  "denim_jacket.png": "https://res.cloudinary.com/dyxjxhie1/image/upload/v1778588964/zuzuminis/products/denim_jacket.jpg",
  "dinosaur_tee.png": "https://res.cloudinary.com/dyxjxhie1/image/upload/v1778588966/zuzuminis/products/dinosaur_tee.jpg",
  "joggers.png": "https://res.cloudinary.com/dyxjxhie1/image/upload/v1778588968/zuzuminis/products/joggers.jpg",
  "leather_loafers.png": "https://res.cloudinary.com/dyxjxhie1/image/upload/v1778588970/zuzuminis/products/leather_loafers.jpg",
  "linen_trousers.png": "https://res.cloudinary.com/dyxjxhie1/image/upload/v1778588972/zuzuminis/products/linen_trousers.jpg",
  "polka_dot_jumpsuit.png": "https://res.cloudinary.com/dyxjxhie1/image/upload/v1778588974/zuzuminis/products/polka_dot_jumpsuit.jpg",
  "product_footwear.png": "https://res.cloudinary.com/dyxjxhie1/image/upload/v1778588976/zuzuminis/products/product_footwear.jpg",
  "product_pantset.png": "https://res.cloudinary.com/dyxjxhie1/image/upload/v1778588978/zuzuminis/products/product_pantset.jpg",
  "product_shortset.png": "https://res.cloudinary.com/dyxjxhie1/image/upload/v1778588979/zuzuminis/products/product_shortset.jpg",
  "product_skirtset.png": "https://res.cloudinary.com/dyxjxhie1/image/upload/v1778588980/zuzuminis/products/product_skirtset.jpg",
  "product_sundress.png": "https://res.cloudinary.com/dyxjxhie1/image/upload/v1778588982/zuzuminis/products/product_sundress.jpg",
  "product_tee.png": "https://res.cloudinary.com/dyxjxhie1/image/upload/v1778588984/zuzuminis/products/product_tee.jpg",
  "puffer_jacket.png": "https://res.cloudinary.com/dyxjxhie1/image/upload/v1778588986/zuzuminis/products/puffer_jacket.jpg",
  "ruffle_skirt.png": "https://res.cloudinary.com/dyxjxhie1/image/upload/v1778588987/zuzuminis/products/ruffle_skirt.jpg",
  "striped_polo.png": "https://res.cloudinary.com/dyxjxhie1/image/upload/v1778588988/zuzuminis/products/striped_polo.jpg",
  "wool_sweater.png": "https://res.cloudinary.com/dyxjxhie1/image/upload/v1778588990/zuzuminis/products/wool_sweater.jpg"
};

const getImg = (name: string) => cloudImages[name as keyof typeof cloudImages] || cloudImages["product_tee.png"];

export const list = query({
  args: {
    ageGroup: v.optional(v.string()),
    gender: v.optional(v.string()),
    category: v.optional(v.string()),
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
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

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("products").collect();
    for (const p of existing) await ctx.db.delete(p._id);

    const evergreen = [
      { name: "Classic White Tee", category: "Tees & Polos", img: "classic_white_tee.png", price: 299, age: "2-3", gender: "Boy", featured: true },
      { name: "Denim Jacket", category: "Outerwear", img: "denim_jacket.png", price: 1299, age: "4-5", gender: "Unisex", featured: true },
      { name: "Cotton Joggers", category: "Bottoms", img: "joggers.png", price: 499, age: "3-4", gender: "Boy", featured: false },
      { name: "Signature Floral Dress", category: "Dresses", img: "product_sundress.png", price: 599, age: "3-4", gender: "Girl", featured: true },
      { name: "Pastel Skirt Set", category: "Sets", img: "product_skirtset.png", price: 899, age: "2-3", gender: "Girl", featured: true },
      { name: "Adventure Pant Set", category: "Sets", img: "product_pantset.png", price: 799, age: "4-5", gender: "Boy", featured: false },
      { name: "Daily Play Set", category: "Sets", img: "product_shortset.png", price: 499, age: "5-7", gender: "Boy", featured: true },
      { name: "Soft Sandals", category: "Footwear", img: "product_footwear.png", price: 399, age: "2-3", gender: "Girl", featured: false },
      { name: "Sporty Sneakers", category: "Footwear", img: "product_footwear.png", price: 499, age: "3-4", gender: "Boy", featured: true },
      { name: "Dinosaur Print Tee", category: "Tees & Polos", img: "dinosaur_tee.png", price: 249, age: "1-2", gender: "Boy", featured: false },
      { name: "Denim Jean Set", category: "Jean Sets", img: "product_pantset.png", price: 999, age: "5-7", gender: "Girl", featured: true },
      { name: "Nighty-Night Set", category: "Sleepwear", img: "product_shortset.png", price: 349, age: "0-1", gender: "Baby", featured: false },
      { name: "Formal Party Set", category: "Formal Sets", img: "product_pantset.png", price: 1299, age: "4-5", gender: "Boy", featured: true },
      { name: "Animal Onesie", category: "Cute Onesies", img: "product_sundress.png", price: 450, age: "0-1", gender: "Baby", featured: true },
      { name: "Smart Striped Polo", category: "Tees & Polos", img: "striped_polo.png", price: 350, age: "3-4", gender: "Boy", featured: false },
      { name: "Essential Hoodie", category: "Outerwear", img: "joggers.png", price: 699, age: "5-7", gender: "Unisex", featured: false },
      { name: "Canvas Overalls", category: "Sets", img: "denim_jacket.png", price: 1099, age: "2-3", gender: "Boy", featured: true },
      { name: "Button-Up Shirt", category: "Tees & Polos", img: "classic_white_tee.png", price: 550, age: "4-5", gender: "Boy", featured: false },
      { name: "Polka Dot Jumpsuit", category: "Dresses", img: "polka_dot_jumpsuit.png", price: 750, age: "3-4", gender: "Girl", featured: false },
      { name: "Leather Loafers", category: "Footwear", img: "leather_loafers.png", price: 899, age: "4-5", gender: "Boy", featured: true },
      { name: "Linen Trousers", category: "Bottoms", img: "linen_trousers.png", price: 450, age: "3-4", gender: "Unisex", featured: false },
      { name: "Ribbed Basics Set", category: "Sets", img: "product_shortset.png", price: 599, age: "1-2", gender: "Girl", featured: false },
      { name: "Graphic Cotton Tee", category: "Tees & Polos", img: "dinosaur_tee.png", price: 299, age: "2-3", gender: "Unisex", featured: false },
      { name: "Knit Cardigan", category: "Outerwear", img: "wool_sweater.png", price: 850, age: "2-3", gender: "Girl", featured: true },
      { name: "Classic Raincoat", category: "Outerwear", img: "puffer_jacket.png", price: 1100, age: "4-5", gender: "Unisex", featured: false },
      { name: "Ruffle Skirt", category: "Bottoms", img: "ruffle_skirt.png", price: 350, age: "1-2", gender: "Girl", featured: false },
    ];

    const winter = [
      { name: "Forest Puffer Jacket", category: "Outerwear", img: "puffer_jacket.png", price: 1899, age: "5-7", gender: "Boy", featured: true },
      { name: "Burgundy Wool Sweater", category: "Outerwear", img: "wool_sweater.png", price: 1199, age: "3-4", gender: "Unisex", featured: true },
      { name: "Thermal Inner Set", category: "Sleepwear", img: "product_shortset.png", price: 699, age: "2-3", gender: "Unisex", featured: false },
      { name: "Velvet Party Dress", category: "Dresses", img: "product_sundress.png", price: 1499, age: "4-5", gender: "Girl", featured: true },
      { name: "Fleece Lined Pants", category: "Bottoms", img: "product_pantset.png", price: 750, age: "3-4", gender: "Boy", featured: false },
      { name: "Quilted Vest", category: "Outerwear", img: "puffer_jacket.png", price: 999, age: "4-5", gender: "Unisex", featured: false },
      { name: "Knit Beanie Set", category: "Essentials", img: "wool_sweater.png", price: 499, age: "1-2", gender: "Unisex", featured: true },
      { name: "Sherpa Hoodie", category: "Outerwear", img: "joggers.png", price: 1250, age: "3-4", gender: "Girl", featured: false },
      { name: "Winter Boots", category: "Footwear", img: "product_footwear.png", price: 1599, age: "5-7", gender: "Unisex", featured: true },
      { name: "Tweed Skirt Set", category: "Sets", img: "product_skirtset.png", price: 1350, age: "4-5", gender: "Girl", featured: false },
    ];

    const allProducts = [...evergreen, ...winter];

    for (const p of allProducts) {
      await ctx.db.insert("products", {
        name: p.name,
        description: `Premium ${p.name} for the modern little one.`,
        price: p.price,
        category: p.category,
        inventory: 50,
        images: [getImg(p.img)],
        slug: p.name.toLowerCase().replace(/\s+/g, "-"),
        isFeatured: p.featured,
        ageGroup: p.age,
        gender: p.gender,
      });
    }
  },
});

export const upsertProduct = mutation({
  args: {
    product: v.object({
      name: v.string(),
      description: v.string(),
      price: v.number(),
      costPrice: v.optional(v.number()),
      category: v.string(),
      inventory: v.number(),
      images: v.array(v.string()),
      slug: v.string(),
      sku: v.optional(v.string()),
      isFeatured: v.boolean(),
      details: v.optional(v.string()),
      ageGroup: v.optional(v.string()),
      gender: v.optional(v.string()),
      sizes: v.optional(v.array(v.string())),
    }),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", args.product.slug))
      .unique();

    // Assign a placeholder image if none provided
    const productData = { ...args.product };
    if (productData.images.length === 0) {
      const cat = productData.category.toLowerCase();
      let placeholder = "product_tee.png";
      if (cat.includes("bootie") || cat.includes("shoe")) placeholder = "product_footwear.png";
      else if (cat.includes("frock") || cat.includes("dress")) placeholder = "product_sundress.png";
      else if (cat.includes("suit")) placeholder = "product_pantset.png";
      else if (cat.includes("set")) placeholder = "product_shortset.png";
      else if (cat.includes("skirt")) placeholder = "product_skirtset.png";
      else if (cat.includes("pillow") || cat.includes("mat")) placeholder = "product_shortset.png";
      
      productData.images = [getImg(placeholder)];
    }

    if (existing) {
      await ctx.db.patch(existing._id, productData);
      return existing._id;
    } else {
      return await ctx.db.insert("products", productData);
    }
  },
});
