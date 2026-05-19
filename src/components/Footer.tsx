"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { InstagramLogo, FacebookLogo, PinterestLogo, TiktokLogo } from "@phosphor-icons/react";


export function Footer() {
  return (
    <footer className="pt-24 pb-12 px-8 bg-butter border-t border-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div>
          <Link href="/" className="flex items-center mb-8">
            <Logo className="w-56 h-16" variant="horizontal" />
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            Premium sustainable kidswear, crafted with love for the dreamers of tomorrow. Quality is our promise.
          </p>
          <div className="flex gap-4">
            <InstagramLogo className="w-5 h-5 text-gray-300 hover:text-zuzu-pink cursor-pointer transition-colors" weight="bold" />
            <FacebookLogo className="w-5 h-5 text-gray-300 hover:text-zuzu-blue cursor-pointer transition-colors" weight="bold" />
            <PinterestLogo className="w-5 h-5 text-gray-300 hover:text-red-400 cursor-pointer transition-colors" weight="bold" />
            <TiktokLogo className="w-5 h-5 text-gray-300 hover:text-black cursor-pointer transition-colors" weight="bold" />
          </div>
        </div>

        <div>
          <h4 className="font-display text-xl mb-8 text-gray-900">Universe</h4>
          <ul className="space-y-4 text-sm text-gray-400 font-bold uppercase tracking-widest text-[10px]">
            <li><Link href="/shop" className="hover:text-zuzu-blue transition-colors">Shop All</Link></li>
            <li><Link href="/about" className="hover:text-zuzu-blue transition-colors">Our Story</Link></li>
            <li><Link href="/lookbook" className="hover:text-zuzu-blue transition-colors">Lookbook</Link></li>
            <li><Link href="/care" className="hover:text-zuzu-blue transition-colors">Care Guide</Link></li>
            <li><Link href="/contact" className="hover:text-zuzu-blue transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-xl mb-8 text-gray-900">Support</h4>
          <ul className="space-y-4 text-sm text-gray-400 font-bold uppercase tracking-widest text-[10px]">
            <li><Link href="#" className="hover:text-zuzu-blue transition-colors">Track Order</Link></li>
            <li><Link href="#" className="hover:text-zuzu-blue transition-colors">Exchanges</Link></li>
            <li><Link href="/size-guide" className="hover:text-zuzu-blue transition-colors">Size Chart</Link></li>
            <li><Link href="/deliveries" className="hover:text-zuzu-blue transition-colors">Shipping</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-xl mb-8 text-gray-900">Visit Us</h4>
          <div className="rounded-2xl overflow-hidden shadow-sm border border-black/5 h-48 w-full relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.720262677604!2d77.55201723648311!3d12.925692373430463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3f000200e26b%3A0xb6bb30054a41b61b!2sZuzu%20Minis!5e0!3m2!1sen!2sin!4v1778666036117!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="mt-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
            1st Floor, 3/1, Kathriguppe Main Rd,<br/>Banashankari 3rd Stage, Bengaluru 560085
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] text-gray-300 font-bold uppercase tracking-widest">
        <p>© 2026 Zuzu Minis Studio. All Rights Reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-zuzu-blue transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-zuzu-blue transition-colors">Terms of Service</Link>
          <Link href="/refunds" className="hover:text-zuzu-blue transition-colors">Return Policy</Link>
        </div>
      </div>
    </footer>
  );
}
