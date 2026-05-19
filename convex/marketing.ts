import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";

// 1. Sync Active Cart for Abandoned Cart Tracking
export const syncActiveCart = mutation({
  args: {
    userId: v.string(),
    email: v.string(),
    cartValue: v.number(),
    itemsCount: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("activeCarts")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    if (args.itemsCount === 0) {
      if (existing) await ctx.db.delete(existing._id);
      return;
    }

    if (existing) {
      await ctx.db.patch(existing._id, {
        cartValue: args.cartValue,
        itemsCount: args.itemsCount,
        updatedAt: Date.now(),
        abandonedPingSent: false, // Reset ping status since they are active
      });
    } else {
      await ctx.db.insert("activeCarts", {
        userId: args.userId,
        email: args.email,
        cartValue: args.cartValue,
        itemsCount: args.itemsCount,
        updatedAt: Date.now(),
        abandonedPingSent: false,
      });
    }
  },
});

// 2. Join Back-in-Stock Waitlist
export const joinWaitlist = mutation({
  args: {
    productId: v.id("products"),
    email: v.string(),
    phone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if already in waitlist
    const existing = await ctx.db
      .query("waitlist")
      .withIndex("by_product", (q) => q.eq("productId", args.productId))
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (!existing) {
      await ctx.db.insert("waitlist", {
        productId: args.productId,
        email: args.email,
        phone: args.phone,
        resolved: false,
        createdAt: Date.now(),
      });
    }
  },
});

// 3. Get Marketing & Automation Logs
export const getMarketingLogs = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("marketingLogs").order("desc").take(50);
  },
});

// 4. Trigger Abandoned Cart Recovery (Simulated/Cron Endpoint)
export const triggerAbandonedCartRecovery = internalMutation({
  args: {},
  handler: async (ctx) => {
    const thirtyMinsAgo = Date.now() - 1000 * 60 * 30;
    const abandonedCarts = await ctx.db
      .query("activeCarts")
      .withIndex("by_abandoned", (q) => q.eq("abandonedPingSent", false))
      .filter((q) => q.lt(q.field("updatedAt"), thirtyMinsAgo))
      .collect();

    let count = 0;
    for (const cart of abandonedCarts) {
      // Mark as sent
      await ctx.db.patch(cart._id, { abandonedPingSent: true });

      // Create Marketing Log (Simulating Resend Email / WhatsApp Blast)
      await ctx.db.insert("marketingLogs", {
        type: "ABANDONED_CART",
        recipient: cart.email,
        title: "🛒 Your Zuzu Minis Cart is Waiting!",
        message: `Hi there! We noticed you left ${cart.itemsCount} premium items (worth ₹${cart.cartValue}) in your cart. Use code RETURN10 for an extra 10% off to complete your order today!`,
        createdAt: Date.now(),
      });
      count++;
    }
    return count;
  },
});

// 5. Trigger Back-In-Stock Alerts
export const triggerBackInStockAlerts = internalMutation({
  args: {},
  handler: async (ctx) => {
    const pendingWaitlist = await ctx.db
      .query("waitlist")
      .withIndex("by_resolved", (q) => q.eq("resolved", false))
      .collect();

    let count = 0;
    for (const entry of pendingWaitlist) {
      const product = await ctx.db.get(entry.productId);
      if (product && product.inventory > 0) {
        await ctx.db.patch(entry._id, { resolved: true });

        await ctx.db.insert("marketingLogs", {
          type: "BACK_IN_STOCK",
          recipient: entry.email,
          title: `✨ Restock Alert: ${product.name} is Back!`,
          message: `Good news! The ${product.name} you were waiting for is officially back in stock. Grab yours before it sells out again!`,
          createdAt: Date.now(),
        });
        count++;
      }
    }
    return count;
  },
});

// 6. Trigger VIP Loyalty Upgrades
export const triggerVipUpgrades = internalMutation({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    let count = 0;

    for (const u of users) {
      // Calculate total spent
      const orders = await ctx.db
        .query("orders")
        .withIndex("by_user", (q) => q.eq("userId", u.clerkId))
        .collect();

      const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);
      let newTier = "MEMBER";
      if (totalSpent >= 5000) newTier = "VIP_GOLD";
      else if (totalSpent >= 2000) newTier = "VIP_SILVER";

      if (u.vipTier !== newTier) {
        await ctx.db.patch(u._id, { vipTier: newTier });

        if (newTier !== "MEMBER") {
          await ctx.db.insert("marketingLogs", {
            type: "VIP_UPGRADE",
            recipient: u.email,
            title: `👑 Welcome to ${newTier.replace("_", " ")}!`,
            message: `Congratulations! You've unlocked ${newTier.replace("_", " ")} status at Zuzu Minis. Enjoy free express shipping and priority support on all future orders.`,
            createdAt: Date.now(),
          });
          count++;
        }
      }
    }
    return count;
  },
});
