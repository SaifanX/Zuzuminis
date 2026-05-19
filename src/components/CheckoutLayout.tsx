"use client";

import React, { useState, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { useUser } from "@clerk/nextjs";
import { useMutation, useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
  CreditCard,
  MapPin,
  Truck,
  ChevronRight,
  CheckCircle2,
  ShoppingBag,
  ArrowLeft,
  ShieldCheck,
  Gift
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { usePostHog } from "posthog-js/react";

// Helper to dynamically load the Razorpay script
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export function CheckoutLayout() {
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useUser();
  const placeOrder = useMutation(api.orders.placeOrder);
  const sendWhatsAppNotification = useAction(api.whatsapp.sendWhatsAppNotification);
  const posthog = usePostHog();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "ONLINE">("COD");

  // Track checkout started on mount
  React.useEffect(() => {
    if (cart.length > 0) {
      posthog?.capture("checkout_started", {
        cartValue: totalPrice,
        totalItems: cart.length,
      });
    }
  }, [cart.length, totalPrice, posthog]);

  // Form State
  const [formData, setFormData] = useState({
    name: user?.fullName || "",
    email: user?.primaryEmailAddress?.emailAddress || "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStepChange = (newStep: number) => {
    setStep(newStep);
    posthog?.capture("checkout_step_completed", {
      completedStep: step,
      nextStep: newStep,
      cartValue: totalPrice,
    });
  };

  const handlePlaceOrder = async () => {
    if (!user) return;
    setIsSubmitting(true);

    try {
      const items = cart.map(item => ({
        productId: item._id as any,
        quantity: item.quantity,
        price: item.price,
      }));

      const fullAddress = `${formData.address}, ${formData.city}, ${formData.zip}`;

      if (paymentMethod === "COD") {
        // Place COD order directly
        const res = await placeOrder({
          userId: user.id,
          items,
          total: totalPrice,
          paymentMethod: "COD",
          customerInfo: {
            name: formData.name,
            email: formData.email,
            address: fullAddress,
            phone: formData.phone,
          },
        });

        // Trigger WhatsApp order confirmation directly from browser
        try {
          await sendWhatsAppNotification({ orderId: res });
        } catch (waError) {
          console.error("[Checkout] Failed to trigger WhatsApp confirmation for COD:", waError);
        }

        setOrderId(res);
        setStep(3); // Success step
        clearCart();

        posthog?.capture("order_placed_success", {
          orderId: res,
          totalAmount: totalPrice,
          totalItems: items.length,
          paymentMethod: "COD",
        });
      } else {
        // ONLINE PAYMENT
        const isScriptLoaded = await loadRazorpayScript();
        if (!isScriptLoaded) {
          alert("Could not load Razorpay checkout script. Please check your network connection.");
          setIsSubmitting(false);
          return;
        }

        // Initialize order on backend
        const response = await fetch("/api/payments/create-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            items,
            total: totalPrice,
            customerInfo: {
              name: formData.name,
              email: formData.email,
              address: fullAddress,
              phone: formData.phone,
            },
          }),
        });

        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.error || "Failed to initialize payment transaction.");
        }

        const { razorpayOrderId, amount, currency, orderId: dbOrderId } = data;

        // Open Razorpay Popup Modal
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: amount,
          currency: currency,
          name: "Zuzu Minis",
          description: "Premium kids apparel",
          order_id: razorpayOrderId,
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone,
          },
          theme: {
            color: "#f87171", // Zuzu Pink
          },
          handler: function (rzpResponse: any) {
            // Payment success callback from Razorpay
            setOrderId(dbOrderId);
            setStep(3);
            clearCart();

            posthog?.capture("order_placed_success", {
              orderId: dbOrderId,
              totalAmount: totalPrice,
              totalItems: items.length,
              paymentMethod: "ONLINE",
              razorpayPaymentId: rzpResponse.razorpay_payment_id,
            });
          },
          modal: {
            ondismiss: function () {
              setIsSubmitting(false);
            },
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      }
    } catch (error: any) {
      console.error("[Checkout Error] Order placement failed:", error);
      alert(error.message || "Failed to process order. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (step === 3 && orderId) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="w-24 h-24 bg-zuzu-blue/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-12 h-12 text-zuzu-blue" />
        </div>
        <h1 className="text-5xl font-display text-gray-900 mb-4">Order Confirmed!</h1>
        <p className="text-gray-500 font-body text-xl mb-12">
          Thank you for shopping at Zuzu Minis. <br />
          Your order <span className="font-bold text-gray-900">#{orderId.slice(-6).toUpperCase()}</span> is being prepared with love.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-3 px-12 py-5 bg-zuzu-pink text-white rounded-full font-bold shadow-xl hover:scale-105 transition-transform"
        >
          Continue Shopping <ChevronRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Left Side: Forms */}
        <div className="flex-grow space-y-12">
          {/* Steps Indicator */}
          <div className="flex items-center gap-4 mb-12">
            <div className={`flex items-center gap-2 ${step === 1 ? "text-zuzu-blue" : "text-gray-400"}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === 1 ? "bg-zuzu-blue text-white" : "bg-gray-100"}`}>1</span>
              <span className="font-bold uppercase tracking-widest text-[10px]">Shipping</span>
            </div>
            <div className="h-[2px] w-12 bg-gray-100" />
            <div className={`flex items-center gap-2 ${step === 2 ? "text-zuzu-blue" : "text-gray-400"}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === 2 ? "bg-zuzu-blue text-white" : "bg-gray-100"}`}>2</span>
              <span className="font-bold uppercase tracking-widest text-[10px]">Payment</span>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl font-display flex items-center gap-4">
                <MapPin className="w-8 h-8 text-zuzu-blue" />
                Shipping Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    type="text"
                    className="w-full bg-white border-2 border-transparent focus:border-zuzu-blue/10 rounded-2xl p-4 outline-none transition-all font-medium"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    type="email"
                    className="w-full bg-white border-2 border-transparent focus:border-zuzu-blue/10 rounded-2xl p-4 outline-none transition-all font-medium"
                    placeholder="name@example.com"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Street Address</label>
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    type="text"
                    className="w-full bg-white border-2 border-transparent focus:border-zuzu-blue/10 rounded-2xl p-4 outline-none transition-all font-medium"
                    placeholder="Flat / House No. / Area"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">City</label>
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    type="text"
                    className="w-full bg-white border-2 border-transparent focus:border-zuzu-blue/10 rounded-2xl p-4 outline-none transition-all font-medium"
                    placeholder="City name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">ZIP / Postal Code</label>
                  <input
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    type="text"
                    className="w-full bg-white border-2 border-transparent focus:border-zuzu-blue/10 rounded-2xl p-4 outline-none transition-all font-medium"
                    placeholder="600001"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone Number (for updates)</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    type="tel"
                    className="w-full bg-white border-2 border-transparent focus:border-zuzu-blue/10 rounded-2xl p-4 outline-none transition-all font-medium"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <button
                onClick={() => handleStepChange(2)}
                disabled={!formData.address || !formData.phone}
                className="w-full py-5 bg-zuzu-blue text-white rounded-full font-bold text-lg shadow-xl shadow-blue-100 flex items-center justify-center gap-3 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100"
              >
                Continue to Payment
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <button
                onClick={() => handleStepChange(1)}
                className="text-gray-400 flex items-center gap-2 text-sm font-bold hover:text-zuzu-blue transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Shipping
              </button>

              <h2 className="text-3xl font-display flex items-center gap-4">
                <CreditCard className="w-8 h-8 text-zuzu-blue" />
                Payment Method
              </h2>

              <div className="grid grid-cols-1 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("COD")}
                  className={`p-6 text-left rounded-[2rem] border-2 transition-all flex items-center justify-between ${
                    paymentMethod === "COD"
                      ? "bg-white border-zuzu-blue shadow-sm"
                      : "bg-gray-50/50 border-transparent hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-zuzu-blue/10 rounded-full flex items-center justify-center">
                      <Truck className="w-6 h-6 text-zuzu-blue" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Cash on Delivery (COD)</p>
                      <p className="text-xs text-gray-400 font-medium">Pay when your minis arrive</p>
                    </div>
                  </div>
                  {paymentMethod === "COD" && <CheckCircle2 className="w-6 h-6 text-zuzu-blue" />}
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("ONLINE")}
                  className={`p-6 text-left rounded-[2rem] border-2 transition-all flex items-center justify-between ${
                    paymentMethod === "ONLINE"
                      ? "bg-white border-zuzu-blue shadow-sm"
                      : "bg-gray-50/50 border-transparent hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-zuzu-pink/10 rounded-full flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-zuzu-pink" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">UPI / Card / Netbanking</p>
                      <p className="text-xs text-gray-400 font-medium">Fast & secure instant online payment via Razorpay</p>
                    </div>
                  </div>
                  {paymentMethod === "ONLINE" && <CheckCircle2 className="w-6 h-6 text-zuzu-blue" />}
                </button>
              </div>

              <div className="p-8 bg-butter border border-black/5 rounded-[2.5rem] flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-zuzu-blue shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-gray-900 mb-1">Secure Transaction</p>
                  <p className="text-xs text-gray-500 leading-relaxed font-body">Your safety is our priority. We use industry-standard encryption to protect your data. All transactions are fully verified and monitored.</p>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
                className="w-full py-5 bg-zuzu-pink text-white rounded-full font-bold text-lg shadow-xl shadow-pink-100 flex items-center justify-center gap-3 hover:scale-[1.02] transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Processing..." : paymentMethod === "COD" ? "Confirm & Place Order" : "Proceed to Pay"}
                {!isSubmitting && <ShoppingBag className="w-5 h-5" />}
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:w-96 shrink-0">
          <div className="sticky top-32 bg-white/40 backdrop-blur-xl rounded-[3rem] p-10 border border-white/20 shadow-2xl">
            <h3 className="text-2xl font-display text-gray-900 mb-8 flex items-center gap-3">
              Order Summary
              <span className="text-xs font-body text-gray-400 font-normal">({cart.length} items)</span>
            </h3>

            <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
              {cart.map((item) => (
                <div key={`${item._id}-${item.size}`} className="flex gap-4">
                  <div className="w-16 h-16 bg-white rounded-xl overflow-hidden shrink-0 relative border border-black/5">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm font-bold text-gray-900 leading-tight mb-1">{item.name}</h4>
                    <div className="flex justify-between items-center">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{item.quantity} × ₹{item.price}</p>
                      <p className="text-xs font-bold text-zuzu-blue">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t border-black/5 pt-8 mb-8">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Subtotal</span>
                <span className="font-bold text-gray-900">₹{totalPrice}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Shipping</span>
                <span className="text-zuzu-blue font-bold">FREE</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-black/5">
                <span className="text-lg font-display text-gray-900">Total</span>
                <span className="text-2xl font-display text-zuzu-orange">₹{totalPrice}</span>
              </div>
            </div>

            <div className="bg-zuzu-blue/5 rounded-2xl p-4 flex items-center gap-3">
              <Gift className="w-5 h-5 text-zuzu-blue" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-zuzu-blue">Loyalty Reward</p>
                <p className="text-[11px] text-gray-600 font-medium">You'll earn <span className="font-bold">{Math.floor(totalPrice / 10)}</span> points!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
