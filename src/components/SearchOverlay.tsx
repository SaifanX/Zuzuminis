"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, X, ArrowRight, TrendingUp } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useRouter } from "next/navigation";

export function SearchOverlay({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [query, setQuery] = useState("");
  const results = useQuery(api.search.search, { query });
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.4, display: "block" });
      gsap.fromTo(contentRef.current, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" });
    } else {
      document.body.style.overflow = "unset";
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.4, display: "none" });
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && query.trim()) {
      router.push(`/shop?q=${encodeURIComponent(query)}`);
      onClose();
    }
  };

  const trending = ["Nightwear", "Summer Cotton", "Organic", "Newborn Sets"];

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 bg-butter/95 backdrop-blur-2xl z-[200] hidden opacity-0"
    >
      <div className="max-w-4xl mx-auto pt-24 px-8" ref={contentRef}>
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-display text-gray-900">What are you looking for?</h2>
          <button onClick={onClose} className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="relative mb-12">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 text-zuzu-blue" />
          <input 
            autoFocus
            type="text" 
            placeholder="Search products, collections, styles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-white border-none rounded-[2rem] py-8 pl-20 pr-8 text-2xl font-body shadow-xl focus:ring-4 focus:ring-zuzu-blue/10 outline-none transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Recommendations */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
              {query ? "Best Matches" : <><TrendingUp className="w-4 h-4" /> Trending Searches</>}
            </h3>
            
            {!query ? (
              <div className="flex flex-wrap gap-3">
                {trending.map(tag => (
                  <button 
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-6 py-3 bg-white rounded-full text-sm font-bold text-gray-600 hover:bg-zuzu-blue hover:text-white transition-all shadow-sm"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {results?.map((product) => (
                  <Link 
                    key={product._id} 
                    href={`/product/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 p-4 bg-white rounded-2xl hover:shadow-md transition-all group"
                  >
                    <div className="w-16 h-16 bg-butter rounded-xl overflow-hidden relative border border-black/5">
                      <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-display text-gray-900 group-hover:text-zuzu-blue transition-colors">{product.name}</h4>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{product.category}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-zuzu-blue group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
                {results?.length === 0 && query.length >= 2 && (
                  <p className="text-gray-400 italic">No matches found for "{query}"</p>
                )}
              </div>
            )}
          </div>

          {/* Quick Suggestions */}
          <div className="hidden md:block">
             <div className="bg-zuzu-pink/5 rounded-[2.5rem] p-8 border border-zuzu-pink/10">
                <h3 className="text-xl font-display text-gray-900 mb-4">Looking for a gift?</h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">Discover our hand-picked collection of premium newborn sets and birthday outfits.</p>
                <Link 
                  href="/shop?category=Gifts" 
                  onClick={onClose}
                  className="inline-flex items-center gap-2 text-zuzu-pink font-bold text-sm hover:gap-3 transition-all"
                >
                  Explore Gift Sets <ArrowRight className="w-4 h-4" />
                </Link>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
