"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Logo } from "./Logo";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm border-b border-gray-100 flex flex-col pointer-events-none">
      {/* Top bar (Promotion) */}
      <div className="bg-zuzu-purple text-white text-[10px] py-1 text-center font-body tracking-wider uppercase">
        Free shipping on orders over ₹1999!
      </div>
      
      <div className="flex justify-between items-center px-8 md:px-16 py-4 pointer-events-auto">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="w-10 h-10" />
          <span className="font-display text-2xl tracking-tighter text-zuzu-purple">zuzu</span>
        </Link>

        <div className="hidden lg:flex items-center gap-10">
          <Link href="/" className="text-sm font-body hover:text-zuzu-purple transition-colors">Home</Link>
          <Link href="/shop" className="text-sm font-body hover:text-zuzu-purple transition-colors">Shop All</Link>
          <Link href="/about" className="text-sm font-body hover:text-zuzu-purple transition-colors">Our Story</Link>
          <Link href="/contact" className="text-sm font-body hover:text-zuzu-purple transition-colors">Contact</Link>
        </div>

        <div className="flex gap-6 items-center">
          <button className="relative p-2">
            <ShoppingBag className="w-5 h-5 text-gray-700" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-zuzu-pink text-white text-[8px] flex items-center justify-center rounded-full">0</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
