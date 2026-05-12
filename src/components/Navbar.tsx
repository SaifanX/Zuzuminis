"use client";

import Link from "next/link";
import { MagnifyingGlass, ShoppingBag, User } from "@phosphor-icons/react";
import { Logo } from "./Logo";
import { useCart } from "@/context/CartContext";
import { SearchOverlay } from "./SearchOverlay";
import { UserButton, useUser, SignInButton } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function Navbar() {
  const { totalItems, setIsOpen } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  const whatsappUrl = "https://wa.me/919740824499?text=Hi";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <>
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-butter py-6 px-8 flex justify-between items-center shadow-sm border-b border-black/5 gap-8">
          
          {/* LEFT: Logo (Scaled Up) */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Logo className="w-64 h-16" variant="horizontal" />
            </Link>
          </div>

          {/* LEFT-CENTER: Category Selectors (Bigger) */}
          <div className="hidden lg:flex items-center gap-8 border-l border-black/10 pl-8 flex-shrink-0">
            {[
              { name: "Baby", img: "/assets/products/product_shortset.png" },
              { name: "Girl", img: "/assets/products/product_sundress.png" },
              { name: "Boy", img: "/assets/products/product_pantset.png" }
            ].map((cat) => (
              <Link 
                href={cat.name === "Baby" ? "/shop?ageGroup=0-1" : `/shop?gender=${cat.name}`} 
                key={cat.name} 
                className="flex flex-col items-center gap-1 group"
              >
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-transparent group-hover:border-zuzu-pink transition-all shadow-sm">
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover scale-110" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-800 group-hover:text-zuzu-pink transition-colors">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>

          {/* CENTER: Search Field (Larger) */}
          <form onSubmit={handleSearch} className="flex-grow max-w-md relative hidden md:block">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for styles..." 
              className="w-full bg-white border border-black/10 rounded-full py-3 px-12 text-sm focus:border-zuzu-pink outline-none transition-all placeholder:text-black/30 font-bold tracking-wide"
            />
            <MagnifyingGlass 
              size={20} 
              weight="bold" 
              className="absolute left-5 top-1/2 -translate-y-1/2 text-black/40" 
            />
          </form>

          {/* RIGHT: Support & Icons */}
          <div className="flex items-center gap-6 text-gray-900 flex-shrink-0">
            
            {/* Support Button (Small, No Icon) */}
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block px-5 py-2 border border-black rounded-full text-[10px] font-bold uppercase tracking-widest text-black hover:bg-black hover:text-white transition-all"
            >
              Support
            </a>

            <div className="flex items-center gap-4">
              <div className="relative">
                <button 
                  onClick={() => setIsOpen(true)}
                  className="hover:text-zuzu-pink transition-all p-2"
                >
                  <ShoppingBag size={24} weight="bold" />
                </button>
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 bg-zuzu-pink text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </div>

              <div className="flex items-center">
                {isLoaded && isSignedIn ? (
                  <UserButton />
                ) : (
                  <SignInButton mode="modal">
                    <button className="hover:text-zuzu-pink transition-all p-2">
                      <User size={24} weight="bold" />
                    </button>
                  </SignInButton>
                )}
              </div>
            </div>
          </div>

        </div>
      </nav>
    </>
  );
}
