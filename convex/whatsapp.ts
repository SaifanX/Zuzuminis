import { v } from "convex/values";
import { action } from "./_generated/server";
import { api, internal } from "./_generated/api";

// Helper to format Indian phone numbers to E.164 format without '+'
function formatPhoneNumber(phone: string): string {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, "");
  
  // If it's a 10-digit number, prepend India's country code 91
  if (cleaned.length === 10) {
    return `91${cleaned}`;
  }
  
  // If it starts with 0 and is followed by 10 digits (e.g. 07338552667), replace 0 with 91
  if (cleaned.length === 11 && cleaned.startsWith("0")) {
    return `91${cleaned.substring(1)}`;
  }
  
  return cleaned;
}

export const sendWhatsAppNotification = action({
  args: {
    orderId: v.id("orders"),
  },
  handler: async (ctx, args) => {
    // 1. Fetch order details from the query
    const order = await ctx.runQuery(api.orders.getOrder, { orderId: args.orderId });
    if (!order) {
      console.error(`[WhatsApp] Order ${args.orderId} not found.`);
      return { success: false, error: "Order not found" };
    }

    const { phone, name } = order.customerInfo;
    const cleanPhone = formatPhoneNumber(phone);
    
    console.log(`[WhatsApp] Preparing to send notification to ${name} (${cleanPhone}) for order ${args.orderId}`);

    const token = process.env.WHATSAPP_ACCESS_TOKEN;
    const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;

    if (!token || !phoneId) {
      console.error("[WhatsApp] Credentials missing in environment variables.");
      return { success: false, error: "Configuration credentials missing" };
    }

    // Since we are using Meta's Developer Test Sandbox, we send the default 'hello_world' template.
    // In production, once the business portfolio is verified, we can use a custom template like:
    // template name: 'order_confirmation', components with parameters (customer name, order total, etc.)
    const payload = {
      messaging_product: "whatsapp",
      to: cleanPhone,
      type: "template",
      template: {
        name: "hello_world",
        language: {
          code: "en_US"
        }
      }
    };

    try {
      const response = await fetch(
        `https://graph.facebook.com/v20.0/${phoneId}/messages`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("[WhatsApp] Meta API returned an error:", data);
        
        // Log the failure in marketing logs
        await ctx.runMutation(api.marketing.syncActiveCart, {
          userId: order.userId,
          email: order.customerInfo.email,
          cartValue: 0, // 0 cleans up the activeCart, or we can write directly to marketing logs if needed.
          itemsCount: 0
        });
        
        return { success: false, error: data.error?.message || "Meta API error" };
      }

      console.log(`[WhatsApp] Message sent successfully. Message ID: ${data.messages?.[0]?.id}`);
      
      // Update order status to mark notification sent
      await ctx.runMutation(api.orders.markWhatsappSent, { orderId: args.orderId });

      return { success: true, messageId: data.messages?.[0]?.id };
    } catch (err: any) {
      console.error("[WhatsApp] Network request failed:", err);
      return { success: false, error: err.message || "Network request failed" };
    }
  },
});
