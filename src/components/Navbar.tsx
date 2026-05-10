"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Phone, Mail } from "lucide-react";
import { Logo } from "./Logo";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar */}
      <div className="bg-zuzu-pink text-white py-2 px-8 flex justify-between items-center text-[10px] font-bold tracking-widest">
        <div className="flex gap-6 uppercase">
          <span className="flex items-center gap-2">
            <span className="opacity-70">📞</span> +91 97408 24499
          </span>
          <span className="flex items-center gap-2">
            <span className="opacity-70">✉️</span> HELLO@ZUZUMINIS.COM
          </span>
        </div>
        <div className="hidden sm:block">
          FREE SHIPPING ON ALL ORDERS OVER ₹999
        </div>
        <div className="flex gap-6">
          {/* Removed Login/Register */}
        </div>
      </div>

      <div className="bg-butter py-4 px-8 flex justify-between items-center shadow-sm">
        <Link href="/" className="flex items-center">
          <Logo className="w-48 h-12" variant="horizontal" />
        </Link>

        <div className="hidden md:flex gap-10 text-[11px] font-bold uppercase tracking-widest text-gray-900">
          <Link href="/" className="hover:text-zuzu-blue transition-colors">Home</Link>
          <Link href="/shop" className="hover:text-zuzu-blue transition-colors">Shop</Link>
          <Link href="/shop" className="hover:text-zuzu-blue transition-colors">Collections</Link>
          <Link href="/shop" className="hover:text-zuzu-blue transition-colors">New Arrivals</Link>
          <Link href="/shop" className="hover:text-zuzu-blue transition-colors">Offer</Link>
          <Link href="/shop" className="hover:text-zuzu-blue transition-colors">Blog</Link>
        </div>

        <div className="flex items-center gap-6 text-gray-900">
          <button className="hover:text-zuzu-blue transition-all"><Search className="w-5 h-5" /></button>
          <div className="relative">
            <button className="hover:text-zuzu-blue transition-all"><ShoppingCart className="w-5 h-5" /></button>
            <span className="absolute -top-2 -right-2 bg-zuzu-orange text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
          </div>
          <button className="hover:text-zuzu-blue transition-all"><User className="w-5 h-5" /></button>
        </div>
      </div>
    </nav>
  );
}
