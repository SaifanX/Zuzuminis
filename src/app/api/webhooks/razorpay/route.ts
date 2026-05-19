import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../convex/_generated/api";
import crypto from "crypto";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      console.error("[Razorpay Webhook] Missing x-razorpay-signature header");
      return Response.json({ error: "Missing signature" }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!secret) {
      console.error("[Razorpay Webhook] Webhook secret not configured in env");
      return Response.json({ error: "Configuration error" }, { status: 500 });
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");

    if (signature !== expectedSignature) {
      console.error("[Razorpay Webhook] Invalid signature verification failed");
      return Response.json({ error: "Invalid signature" }, { status: 400 });
    }

    const body = JSON.parse(rawBody);
    const event = body.event;

    console.log(`[Razorpay Webhook] Received verified event: ${event}`);

    // Standard Razorpay capture events
    if (event === "payment.captured" || event === "order.paid") {
      const paymentEntity = body.payload.payment.entity;
      const razorpayOrderId = paymentEntity.order_id;
      const razorpayPaymentId = paymentEntity.id;

      if (!razorpayOrderId) {
        console.warn("[Razorpay Webhook] Webhook payment has no associated order_id");
        return Response.json({ status: "ignored" });
      }

      console.log(`[Razorpay Webhook] Updating order for Razorpay Order: ${razorpayOrderId}`);

      // 1. Mark order as paid in Convex database
      const order = await convex.mutation(api.orders.markOrderAsPaid, {
        razorpayOrderId,
        razorpayPaymentId,
      });

      // 2. Trigger the Convex action to send the WhatsApp confirmation notification
      console.log(`[Razorpay Webhook] Launching WhatsApp confirmation for order ${order._id}`);
      try {
        await convex.action(api.whatsapp.sendWhatsAppNotification, {
          orderId: order._id,
        });
      } catch (waError) {
        console.error("[Razorpay Webhook] Error triggering WhatsApp Action:", waError);
        // Do not crash/return error response so that Razorpay doesn't retry payment capturing
      }
    }

    return Response.json({ success: true });
  } catch (error: any) {
    console.error("[Razorpay Webhook] Error processing webhook:", error);
    return Response.json(
      { error: error.message || "Webhook processing failed" },
      { status: 500 }
    );
  }
}
