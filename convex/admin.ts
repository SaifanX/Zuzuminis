import { query } from "./_generated/server";

export const getSystemStatus = query({
  args: {},
  handler: async (ctx) => {
    const orders = await ctx.db.query("orders").collect();
    
    const pendingFulfillments = orders.filter(
      (o) => o.status === "pending" || o.status === "paid" || o.status === "pending_payment"
    ).length;

    const shippedOrders = orders.filter((o) => o.status === "shipped").length;
    const deliveredOrders = orders.filter((o) => o.status === "delivered").length;

    const shiprocketConfigured = !!process.env.SHIPROCKET_EMAIL && !!process.env.SHIPROCKET_PASSWORD;
    const whatsappConfigured = !!process.env.WHATSAPP_ACCESS_TOKEN && !!process.env.WHATSAPP_PHONE_NUMBER_ID;

    return {
      totalOrders: orders.length,
      pendingFulfillments,
      shippedOrders,
      deliveredOrders,
      shiprocketConfigured,
      whatsappConfigured,
      shiprocketEmail: process.env.SHIPROCKET_EMAIL || null,
      whatsappPhoneId: process.env.WHATSAPP_PHONE_NUMBER_ID || null,
    };
  },
});
