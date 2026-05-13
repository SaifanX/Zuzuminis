"use client";

import React, { useState, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
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

export function CheckoutLayout() {
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useUser();
  const placeOrder = useMutation(api.orders.placeOrder);

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

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

  const handlePlaceOrder = async () => {
    if (!user) return;
    setIsSubmitting(true);

    try {
      const items = cart.map(item => ({
        productId: item._id as any,
        quantity: item.quantity,
        price: item.price,
      }));

      const res = await placeOrder({
        userId: user.id,
        items,
        total: totalPrice,
        customerInfo: {
          name: formData.name,
          email: formData.email,
          address: `${formData.address}, ${formData.city}, ${formData.zip}`,
          phone: formData.phone,
        },
      });

      setOrderId(res);
      setStep(3); // Success step
      clearCart();
    } catch (error) {
      console.error("Failed to place order:", error);
    } finally {
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
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Full Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    type="text"
                    className="w-full bg-white border-2 border-transparent focus:border-zuzu-blue/10 rounded-2xl p-4 outline-none transition-all font-medium"
                    placeholder="e.g. Anaya Sharma"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Email Address</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    type="email"
                    className="w-full bg-white border-2 border-transparent focus:border-zuzu-blue/10 rounded-2xl p-4 outline-none transition-all font-medium"
                    placeholder="hello@example.com"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Delivery Address</label>
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    type="text"
                    className="w-full bg-white border-2 border-transparent focus:border-zuzu-blue/10 rounded-2xl p-4 outline-none transition-all font-medium"
                    placeholder="House No, Street, Landmark"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">City</label>
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    type="text"
                    className="w-full bg-white border-2 border-transparent focus:border-zuzu-blue/10 rounded-2xl p-4 outline-none transition-all font-medium"
                    placeholder="Bangalore"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Phone Number</label>
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
                onClick={() => setStep(2)}
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
                onClick={() => setStep(1)}
                className="text-gray-400 flex items-center gap-2 text-sm font-bold hover:text-zuzu-blue transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Shipping
              </button>

              <h2 className="text-3xl font-display flex items-center gap-4">
                <CreditCard className="w-8 h-8 text-zuzu-blue" />
                Payment Method
              </h2>

              <div className="grid grid-cols-1 gap-4">
                <div className="p-6 bg-white border-2 border-zuzu-blue rounded-[2rem] flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-zuzu-blue/10 rounded-full flex items-center justify-center">
                      <Truck className="w-6 h-6 text-zuzu-blue" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Cash on Delivery</p>
                      <p className="text-xs text-gray-400 font-medium">Pay when your minis arrive</p>
                    </div>
                  </div>
                  <CheckCircle2 className="w-6 h-6 text-zuzu-blue" />
                </div>

                <div className="p-6 bg-gray-50 border-2 border-transparent rounded-[2rem] flex items-center justify-between opacity-60">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-400">UPI / Card</p>
                      <p className="text-xs text-gray-400 font-medium">Currently disabled for maintenance</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-butter border border-black/5 rounded-[2.5rem] flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-zuzu-blue shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-gray-900 mb-1">Secure Transaction</p>
                  <p className="text-xs text-gray-500 leading-relaxed font-body">Your safety is our priority. We use industry-standard encryption to protect your data. Payment is currently cash-only for maximum trust.</p>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
                className="w-full py-5 bg-zuzu-pink text-white rounded-full font-bold text-lg shadow-xl shadow-pink-100 flex items-center justify-center gap-3 hover:scale-[1.02] transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Placing Order..." : "Confirm & Place Order"}
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
