import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../convex/_generated/api";
import Razorpay from "razorpay";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, items, total, customerInfo } = body;

    if (!userId || !items || !total || !customerInfo) {
      return Response.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // 1. Create order in Convex database with ONLINE payment method (starts as pending_payment)
    const orderId = await convex.mutation(api.orders.placeOrder, {
      userId,
      items,
      total,
      paymentMethod: "ONLINE",
      customerInfo,
    });

    // 2. Create payment order on Razorpay servers
    // Amount must be in paise (e.g. ₹500.00 = 50000 paise)
    const options = {
      amount: Math.round(total * 100),
      currency: "INR",
      receipt: orderId,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // 3. Update the Convex order to link it to the Razorpay Order ID
    await convex.mutation(api.orders.updateOrderRazorpayId, {
      orderId,
      razorpayOrderId: razorpayOrder.id,
    });

    return Response.json({
      success: true,
      orderId,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });
  } catch (error: any) {
    console.error("[Razorpay Create Order API] Error:", error);
    return Response.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
