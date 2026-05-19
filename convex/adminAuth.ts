import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Helper function to hash password in Convex using Web Crypto API
async function sha256(message: string) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

// Default fallback password for initial setup
const DEFAULT_PASSWORD = "Zuzuminis@4499";

export const verifyPassword = mutation({
  args: { password: v.string() },
  handler: async (ctx, args) => {
    // 1. Get or initialize the admin password hash from DB
    let passwordRecord = await ctx.db
      .query("adminSecrets")
      .withIndex("by_key", (q) => q.eq("key", "admin_password_hash"))
      .first();

    const inputHash = await sha256(args.password);
    const oldDefaultHash = await sha256("zuzuminis2026");
    const newDefaultHash = await sha256(DEFAULT_PASSWORD);

    // If record exists but is the old default password, migrate it to the new one
    if (passwordRecord && passwordRecord.value === oldDefaultHash) {
      await ctx.db.patch(passwordRecord._id, { value: newDefaultHash });
      passwordRecord.value = newDefaultHash;
    }

    if (!passwordRecord) {
      // If no password exists in DB, initialize with the default fallback password
      await ctx.db.insert("adminSecrets", {
        key: "admin_password_hash",
        value: newDefaultHash,
      });

      // Re-fetch or check input against default hash
      if (inputHash === newDefaultHash) {
        // Generate secure session token
        const token = crypto.randomUUID();
        const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
        await ctx.db.insert("adminSessions", { token, expiresAt });
        return { success: true, token };
      }
      return { success: false, error: "Invalid password" };
    }

    // 2. Verify password match
    if (inputHash === passwordRecord.value) {
      // Generate secure session token
      const token = crypto.randomUUID();
      const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
      await ctx.db.insert("adminSessions", { token, expiresAt });
      return { success: true, token };
    }

    return { success: false, error: "Invalid password" };
  },
});

export const checkSession = query({
  args: { token: v.union(v.string(), v.null()) },
  handler: async (ctx, args) => {
    if (!args.token) {
      return { valid: false };
    }

    const session = await ctx.db
      .query("adminSessions")
      .withIndex("by_token", (q) => q.eq("token", args.token!))
      .first();

    if (!session) {
      return { valid: false };
    }

    if (Date.now() > session.expiresAt) {
      // Clean up expired session in background (since this is a query, we can't write, but mutations will clean up)
      return { valid: false };
    }

    return { valid: true };
  },
});

export const logout = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("adminSessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();

    if (session) {
      await ctx.db.delete(session._id);
    }
    return { success: true };
  },
});
