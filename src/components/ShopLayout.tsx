"use client";

import { useState, useRef } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ProductCard } from "./ProductCard";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Filter, Search, X } from "lucide-react";
import { useSearchParams } from "next/navigation";

export function ShopLayout() {
  const searchParams = useSearchParams();
  const search = searchParams.get("q") || undefined;

  // Initialize state from URL params if they exist
  const [ageGroup, setAgeGroup] = useState<string>(searchParams.get("ageGroup") || "All");
  const [gender, setGender] = useState<string>(searchParams.get("gender") || "All");
  const [category, setCategory] = useState<string>(searchParams.get("category") || "All");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync state with URL if it changes (e.g. from navbar links)
  const prevParams = useRef(searchParams.toString());
  if (searchParams.toString() !== prevParams.current) {
    const newAge = searchParams.get("ageGroup") || "All";
    const newGender = searchParams.get("gender") || "All";
    const newCat = searchParams.get("category") || "All";
    if (newAge !== ageGroup) setAgeGroup(newAge);
    if (newGender !== gender) setGender(newGender);
    if (newCat !== category) setCategory(newCat);
    prevParams.current = searchParams.toString();
  }

  const products = useQuery(api.products.list, { ageGroup, gender, category, search });
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (products && products.length > 0) {
      gsap.from(".shop-product-card", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out",
        clearProps: "all"
      });
    }
  }, { scope: gridRef, dependencies: [products] });

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search minis..."
          className="w-full pl-10 pr-4 py-3 bg-butter/50 border border-black/5 rounded-xl focus:ring-2 focus:ring-zuzu-blue text-sm font-medium outline-none transition-shadow"
        />
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <h3 className="font-display text-lg">Category</h3>
        <div className="flex flex-col gap-3 text-sm font-medium text-gray-600">
          {["All", "Tees & Polos", "Dresses", "Sets", "Short Sets", "Jean Sets", "Sleepwear", "Formal Sets", "Cute Onesies"].map(cat => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="category"
                checked={category === cat}
                onChange={() => setCategory(cat)}
                className="w-4 h-4 text-zuzu-orange focus:ring-zuzu-orange border-gray-300"
              />
              <span className="group-hover:text-zuzu-orange transition-colors">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Age */}
      <div className="space-y-4">
        <h3 className="font-display text-lg">Age</h3>
        <div className="flex flex-wrap gap-2">
          {["All", "0-1", "1-2", "2-3", "3-4", "4-5", "5-7"].map(age => (
            <button
              key={age}
              onClick={() => setAgeGroup(age)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${ageGroup === age
                  ? "bg-zuzu-blue text-white shadow-md"
                  : "bg-butter text-gray-600 hover:bg-white/50 border border-black/5"
                }`}
            >
              {age}
            </button>
          ))}
        </div>
      </div>

      {/* Gender */}
      <div className="space-y-4">
        <h3 className="font-display text-lg">Gender</h3>
        <div className="flex flex-wrap gap-2">
          {["All", "Girl", "Boy", "Unisex"].map(gen => (
            <button
              key={gen}
              onClick={() => setGender(gen)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${gender === gen
                  ? "bg-zuzu-pink text-white shadow-md"
                  : "bg-butter text-gray-600 hover:bg-white/50 border border-black/5"
                }`}
            >
              {gen}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 relative z-10">
        {/* Mobile Top Bar */}
        <div className="md:hidden flex justify-between items-center mb-8 sticky top-[72px] bg-butter/80 backdrop-blur-md z-40 py-4 -mx-6 px-6 border-b border-gray-100">
          <h1 className="text-2xl font-display">Shop All</h1>
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm font-bold"
          >
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>

        {/* Mobile Drawer Overlay */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 bg-black/40 z-50 md:hidden backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)}>
            <div
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-butter p-6 overflow-y-auto shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-display">Filters</h2>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 bg-gray-100 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FilterContent />
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-12 relative">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-32">
              <h1 className="text-4xl font-display mb-12">Shop All</h1>
              <FilterContent />
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-grow" ref={gridRef}>
            {search && (
              <div className="mb-8 flex items-center justify-between bg-white/50 p-4 rounded-2xl border border-black/5">
                <p className="text-gray-500 font-medium">
                  Showing results for <span className="text-gray-900 font-bold">"{search}"</span>
                </p>
                <Link href="/shop" className="text-zuzu-blue text-sm font-bold hover:underline">Clear Search</Link>
              </div>
            )}
            {products === undefined ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-[4/5] bg-gray-100 animate-pulse rounded-2xl" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-gray-500 font-medium">No minis found matching these filters.</p>
                <button onClick={() => { setAgeGroup("All"); setGender("All"); setCategory("All"); }} className="mt-4 text-zuzu-orange font-bold hover:underline">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <div key={product._id} className="shop-product-card">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
