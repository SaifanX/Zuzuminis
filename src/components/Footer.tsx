import Link from "next/link";
import { Globe } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="pt-24 pb-12 px-8 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div>
          <Link href="/" className="flex items-center mb-8">
            <Logo className="w-56 h-16" variant="horizontal" />
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            Premium sustainable kidswear, crafted with love for the dreamers of tomorrow. Quality is our promise.
          </p>
          <div className="flex gap-4">
            <Globe className="w-5 h-5 text-gray-300 hover:text-zuzu-teal cursor-pointer transition-colors" />
            <Globe className="w-5 h-5 text-gray-300 hover:text-zuzu-teal cursor-pointer transition-colors" />
            <Globe className="w-5 h-5 text-gray-300 hover:text-zuzu-teal cursor-pointer transition-colors" />
            <Globe className="w-5 h-5 text-gray-300 hover:text-zuzu-teal cursor-pointer transition-colors" />
          </div>
        </div>
        
        <div>
          <h4 className="font-display text-xl mb-8 text-gray-900">Universe</h4>
          <ul className="space-y-4 text-sm text-gray-400 font-bold uppercase tracking-widest text-[10px]">
            <li><Link href="#" className="hover:text-zuzu-teal transition-colors">Our Story</Link></li>
            <li><Link href="#" className="hover:text-zuzu-teal transition-colors">Sustainability</Link></li>
            <li><Link href="#" className="hover:text-zuzu-teal transition-colors">Care Guide</Link></li>
            <li><Link href="#" className="hover:text-zuzu-teal transition-colors">Privacy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-xl mb-8 text-gray-900">Support</h4>
          <ul className="space-y-4 text-sm text-gray-400 font-bold uppercase tracking-widest text-[10px]">
            <li><Link href="#" className="hover:text-zuzu-teal transition-colors">Track Order</Link></li>
            <li><Link href="#" className="hover:text-zuzu-teal transition-colors">Exchanges</Link></li>
            <li><Link href="#" className="hover:text-zuzu-teal transition-colors">Size Chart</Link></li>
            <li><Link href="#" className="hover:text-zuzu-teal transition-colors">Shipping</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-xl mb-8 text-gray-900">Explore</h4>
          <ul className="space-y-4 text-sm text-gray-400 font-bold uppercase tracking-widest text-[10px]">
            <li><Link href="/shop" className="hover:text-zuzu-teal transition-colors">Shop All</Link></li>
            <li><Link href="#" className="hover:text-zuzu-teal transition-colors">New Arrivals</Link></li>
            <li><Link href="#" className="hover:text-zuzu-teal transition-colors">Best Sellers</Link></li>
            <li><Link href="#" className="hover:text-zuzu-teal transition-colors">Gift Cards</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] text-gray-300 font-bold uppercase tracking-widest">
         <p>© 2024 Zuzu Minis Studio. All Rights Reserved.</p>
         <div className="flex gap-6">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4 grayscale opacity-30" alt="Visa" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4 grayscale opacity-30" alt="Mastercard" />
         </div>
      </div>
    </footer>
  );
}
