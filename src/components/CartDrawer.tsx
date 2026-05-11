"use client";

import React, { useRef, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useUser, SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export function CartDrawer() {
  const { cart, isOpen, setIsOpen, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleCheckout = () => {
    if (isSignedIn) {
      setIsOpen(false);
      router.push("/checkout");
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.4, display: "block" });
      gsap.to(drawerRef.current, { x: 0, duration: 0.6, ease: "power4.out" });
    } else {
      document.body.style.overflow = "unset";
      gsap.to(drawerRef.current, { x: "100%", duration: 0.6, ease: "power4.in" });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.4, display: "none" });
    }
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div 
        ref={overlayRef}
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] hidden opacity-0"
      />

      {/* Drawer */}
      <div 
        ref={drawerRef}
        className="fixed top-0 right-0 h-full w-full max-w-md bg-butter/95 backdrop-blur-xl z-[101] shadow-2xl translate-x-full border-l border-white/20 flex flex-col"
      >
        {/* Header */}
        <div className="p-8 border-b border-black/5 flex justify-between items-center bg-white/10">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-zuzu-blue" />
            <h2 className="text-2xl font-display text-gray-900">Your Bag <span className="text-sm font-body text-gray-400 font-normal">({totalItems})</span></h2>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-8 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-butter rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-xl font-display text-gray-900 mb-2">Your bag is empty</h3>
              <p className="text-gray-500 mb-8 font-body">Looks like you haven't added anything to your boutique collection yet.</p>
              <button 
                onClick={() => setIsOpen(false)}
                className="px-8 py-3 bg-zuzu-blue text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
              >
                Go Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={`${item._id}-${item.size}`} className="flex gap-4 group">
                  <div className="w-24 h-24 bg-butter rounded-2xl overflow-hidden flex-shrink-0 relative border border-black/5">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-grow flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-display text-gray-900 leading-tight pr-4">{item.name}</h4>
                        <button 
                          onClick={() => removeFromCart(item._id)}
                          className="text-gray-300 hover:text-zuzu-pink transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      {item.size && <p className="text-xs text-zuzu-blue font-bold uppercase tracking-wider mb-2">Size: {item.size}</p>}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-full p-1 border border-white/50">
                        <button 
                          onClick={() => updateQuantity(item._id, -1)}
                          className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item._id, 1)}
                          className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="font-bold text-zuzu-orange">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-8 bg-white/40 border-t border-black/5 backdrop-blur-xl">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-500 font-body">Subtotal</span>
              <span className="text-2xl font-display text-gray-900">₹{totalPrice}</span>
            </div>
            {isLoaded && isSignedIn ? (
              <button 
                onClick={handleCheckout}
                className="w-full py-4 bg-zuzu-pink text-white rounded-full font-bold shadow-xl flex items-center justify-center gap-3 group hover:scale-[1.02] transition-all"
              >
                Secure Checkout
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : isLoaded ? (
              <SignInButton mode="modal">
                <button className="w-full py-4 bg-zuzu-pink text-white rounded-full font-bold shadow-xl flex items-center justify-center gap-3 group hover:scale-[1.02] transition-all">
                  Sign In to Checkout
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </SignInButton>
            ) : (
              <div className="w-full py-4 bg-gray-100 rounded-full animate-pulse" />
            )}
            <p className="text-center text-[10px] text-gray-400 mt-4 uppercase tracking-[0.2em] font-bold">Free Shipping on all orders</p>
          </div>
        )}
      </div>
    </>
  );
}
