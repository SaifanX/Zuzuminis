"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Truck } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { triggerRipple } from "./MagicRipple";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const Squiggle = ({ color, className, rotation = 0, strokeWidth = 12 }: { color: string, className?: string, rotation?: number, strokeWidth?: number }) => (
  <svg 
    viewBox="0 0 100 20" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    style={{ transform: `rotate(${rotation}deg)` }}
  >
    <path 
      d="M5 10C20 10 20 2 35 2C50 2 50 18 65 18C80 18 80 10 95 10" 
      stroke={color} 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const Cloud = ({ color, className }: { color: string, className?: string }) => (
  <svg viewBox="0 0 240 140" fill={color} xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M70,40 C70,15 110,15 110,40 C110,10 170,10 170,40 C170,15 210,15 210,40 C235,40 235,75 210,75 C235,75 235,110 210,110 C210,135 170,135 170,110 C170,140 110,140 110,110 C110,135 70,135 70,110 C45,110 45,75 70,75 C45,75 45,40 70,40 Z" />
  </svg>
);

export function HeroBento() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const router = useRouter();

  const trendingItems = [
    { id: "basics", title: "Essential Basics", offer: "STARTS ₹199 >", img: "/assets/products/product_tee.png", bg: "bg-[#BDE0FE]", params: "category=Tees%20%26%20Polos", rippleColor: "#BDE0FE" },
    { id: "knits", title: "Boutique Knits", offer: "NEW SEASON >", img: "/assets/products/wool_sweater.png", bg: "bg-[#FFF6E9]", params: "category=Outerwear", rippleColor: "#BDE0FE" },
    { id: "signature", title: "Signature Sets", offer: "UP TO 50% OFF >", img: "/assets/products/product_skirtset.png", bg: "bg-[#FFD1DC]", params: "category=Sets", rippleColor: "#FFD1DC" },
    { id: "denim", title: "Daily Denim", offer: "BEST SELLERS >", img: "/assets/products/denim_jacket.png", bg: "bg-[#E9FFEB]", params: "category=Jean%20Sets", rippleColor: "#BDE0FE" },
    { id: "accessories", title: "Accessories", offer: "FINISHING TOUCHES >", img: "https://res.cloudinary.com/dyxjxhie1/image/upload/v1778657050/zuzuminis/baby_accessories_curated.jpg", bg: "bg-[#F4F6F6]", params: "category=Accessories", rippleColor: "#BDE0FE" },
    { id: "footwear", title: "Footwear", offer: "STARTS ₹299 >", img: "/assets/products/product_footwear.png", bg: "bg-[#FDEDEC]", params: "category=Footwear", rippleColor: "#BDE0FE" }
  ];

  const categoryContent: Record<string, { title: string, color: string, params: string, items: any[] }> = {
    basics: {
      title: "Essential Basics",
      color: "#BDE0FE",
      params: "category=Tees%20%26%20Polos",
      items: [
        { title: "Cotton Tee", img: "/assets/products/product_tee.png", bg: "bg-[#BDE0FE]" },
        { title: "Soft Joggers", img: "/assets/products/joggers.png", bg: "bg-[#BDE0FE]" },
        { title: "Daily Shorts", img: "/assets/products/product_shortset.png", bg: "bg-[#BDE0FE]" }
      ]
    },
    knits: {
      title: "Boutique Knits",
      color: "#BDE0FE",
      params: "category=Outerwear",
      items: [
        { title: "Wool Sweater", img: "/assets/products/wool_sweater.png", bg: "bg-[#FFF6E9]" },
        { title: "Knitted Vest", img: "/assets/products/wool_sweater.png", bg: "bg-[#FFF6E9]" },
        { title: "Cozy Cardigan", img: "/assets/products/wool_sweater.png", bg: "bg-[#FFF6E9]" }
      ]
    },
    signature: {
      title: "Signature Sets",
      color: "#FFD1DC",
      params: "category=Sets",
      items: [
        { title: "Floral Skirt Set", img: "/assets/products/product_skirtset.png", bg: "bg-[#FFD1DC]" },
        { title: "Velvet Coord", img: "/assets/products/product_skirtset.png", bg: "bg-[#FFD1DC]" },
        { title: "Lace Party Set", img: "/assets/products/product_skirtset.png", bg: "bg-[#FFD1DC]" }
      ]
    },
    denim: {
      title: "Daily Denim",
      color: "#BDE0FE",
      params: "category=Jean%20Sets",
      items: [
        { title: "Denim Jacket", img: "/assets/products/denim_jacket.png", bg: "bg-[#BDE0FE]" },
        { title: "Jean Shorts", img: "/assets/products/denim_jacket.png", bg: "bg-[#BDE0FE]" },
        { title: "Denim Dungarees", img: "/assets/products/denim_jacket.png", bg: "bg-[#BDE0FE]" }
      ]
    },
    accessories: {
      title: "Accessories",
      color: "#BDE0FE",
      params: "category=Accessories",
      items: [
        { title: "Baby Bonnet", img: "https://res.cloudinary.com/dyxjxhie1/image/upload/v1778657050/zuzuminis/baby_accessories_curated.jpg", bg: "bg-[#F4F6F6]" },
        { title: "Headband Set", img: "https://res.cloudinary.com/dyxjxhie1/image/upload/v1778657050/zuzuminis/baby_accessories_curated.jpg", bg: "bg-[#F4F6F6]" },
        { title: "Cotton Bib", img: "https://res.cloudinary.com/dyxjxhie1/image/upload/v1778657050/zuzuminis/baby_accessories_curated.jpg", bg: "bg-[#F4F6F6]" }
      ]
    },
    footwear: {
      title: "Footwear",
      color: "#BDE0FE",
      params: "category=Footwear",
      items: [
        { title: "Leather Boots", img: "/assets/products/product_footwear.png", bg: "bg-[#FDEDEC]" },
        { title: "Canvas Shoes", img: "/assets/products/product_footwear.png", bg: "bg-[#FDEDEC]" },
        { title: "Soft Sandals", img: "/assets/products/product_footwear.png", bg: "bg-[#FDEDEC]" }
      ]
    }
  };

  const ageCategories: Record<string, { title: string, color: string, categories: any[] }> = {
    "0-1": {
      title: "Newborn Essentials",
      color: "#FFF6E9", // Cream
      categories: [
        { name: "Rompers", params: "ageGroup=0-1&category=Sets", img: "/assets/products/product_shortset.png", bg: "bg-[#FFF6E9]" },
        { name: "Sleepsuits", params: "ageGroup=0-1&category=Sets", img: "/assets/products/product_shortset.png", bg: "bg-[#FFF6E9]" },
        { name: "Swaddles", params: "ageGroup=0-1&category=Accessories", img: "https://res.cloudinary.com/dyxjxhie1/image/upload/v1778657050/zuzuminis/baby_accessories_curated.jpg", bg: "bg-[#FFF6E9]" },
        { name: "Gift Sets", params: "ageGroup=0-1&category=Sets", img: "/assets/products/product_skirtset.png", bg: "bg-[#FFF6E9]" }
      ]
    },
    "1-2": {
      title: "Toddler Trends",
      color: "#BDE0FE", // Blue
      categories: [
        { name: "Play Sets", params: "ageGroup=1-2&category=Sets", img: "/assets/products/product_shortset.png", bg: "bg-[#BDE0FE]" },
        { name: "Dresses", params: "ageGroup=1-2&category=Dresses", img: "/assets/products/product_sundress.png", bg: "bg-[#BDE0FE]" },
        { name: "Outerwear", params: "ageGroup=1-2&category=Outerwear", img: "/assets/products/denim_jacket.png", bg: "bg-[#BDE0FE]" },
        { name: "Footwear", params: "ageGroup=1-2&category=Footwear", img: "/assets/products/product_footwear.png", bg: "bg-[#BDE0FE]" }
      ]
    },
    "3-4": {
      title: "Explorer Gear",
      color: "#BDE0FE", // Blue
      categories: [
        { name: "Denim", params: "ageGroup=3-4&category=Jean%20Sets", img: "/assets/products/denim_jacket.png", bg: "bg-[#BDE0FE]" },
        { name: "Tees", params: "ageGroup=3-4&category=Tees%20%26%20Polos", img: "/assets/products/product_tee.png", bg: "bg-[#BDE0FE]" },
        { name: "Activewear", params: "ageGroup=3-4&category=Sets", img: "/assets/products/joggers.png", bg: "bg-[#BDE0FE]" },
        { name: "Accessories", params: "ageGroup=3-4&category=Accessories", img: "https://res.cloudinary.com/dyxjxhie1/image/upload/v1778657050/zuzuminis/baby_accessories_curated.jpg", bg: "bg-[#BDE0FE]" }
      ]
    },
    "5-7": {
      title: "Big Kid Style",
      color: "#BDE0FE", // Blue
      categories: [
        { name: "Party Wear", params: "ageGroup=5-7&category=Formal%20Sets", img: "/assets/products/product_sundress.png", bg: "bg-[#BDE0FE]" },
        { name: "School Basics", params: "ageGroup=5-7&category=Tees%20%26%20Polos", img: "/assets/products/product_tee.png", bg: "bg-[#BDE0FE]" },
        { name: "Jackets", params: "ageGroup=5-7&category=Outerwear", img: "/assets/products/denim_jacket.png", bg: "bg-[#BDE0FE]" },
        { name: "Shoes", params: "ageGroup=5-7&category=Footwear", img: "/assets/products/product_footwear.png", bg: "bg-[#BDE0FE]" }
      ]
    }
  };

  const [activeAge, setActiveAge] = useState<string | null>(null);

  const handleDeepDive = (e: React.MouseEvent, item: any) => {
    e.preventDefault();
    setActiveCategory(item.id);
    setActiveAge(null); // Reset age mode if category mode is clicked
  };

  const handleAgeDive = (e: React.MouseEvent, ageGroup: string) => {
    e.preventDefault();
    setActiveAge(ageGroup);
    setActiveCategory(null); // Reset category mode if age mode is clicked
  };

  const handleRevealClick = (e: React.MouseEvent, params: string, color: string) => {
    triggerRipple(e.clientX, e.clientY, color);
    setTimeout(() => {
      router.push(`/shop?${params}`);
    }, 400);
  };

  return (
    <section className="relative min-h-[100dvh] pt-40 pb-16 px-4 md:px-8 bg-butter flex items-center overflow-hidden">
      
      {/* ... (Clouds & Squiggles layer remains the same) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Massive Soft Drifting Clouds */}
        <motion.div 
          animate={{ x: [-500, 2000] }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute top-[5%] w-[600px] opacity-[0.4]"
        >
          <Cloud color="#BDE0FE" />
        </motion.div>
        
        <motion.div 
          animate={{ x: [2000, -500] }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute top-[25%] w-[800px] opacity-[0.4]"
        >
          <Cloud color="#FFD1DC" />
        </motion.div>
        
        <motion.div 
          animate={{ x: [-1000, 2500] }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear", delay: 10 }}
          className="absolute top-[45%] w-[500px] opacity-[0.4]"
        >
          <Cloud color="#BDE0FE" />
        </motion.div>

        {/* Floating Clouds */}
        <motion.div 
          animate={{ y: [0, -40, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[60%] right-[10%] w-[400px] opacity-[0.4]"
        >
          <Cloud color="#BDE0FE" />
        </motion.div>

        <motion.div 
          animate={{ y: [0, 50, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[10%] left-[15%] w-[350px] opacity-[0.4]"
        >
          <Cloud color="#FFD1DC" />
        </motion.div>

        {/* Thick Background Squiggles */}
        <motion.div 
          animate={{ y: [0, -30, 0], rotate: [-15, -10, -15] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[5%] w-48 opacity-[0.4]"
        >
          <Squiggle color="#BDE0FE" rotation={-15} strokeWidth={14} />
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 30, 0], rotate: [20, 25, 20] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[15%] right-[5%] w-56 opacity-[0.4]"
        >
          <Squiggle color="#FFD1DC" rotation={20} strokeWidth={14} />
        </motion.div>

        <motion.div 
          animate={{ x: [-20, 20, -20], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] right-[30%] w-32 opacity-[0.4]"
        >
          <Squiggle color="#BDE0FE" rotation={45} strokeWidth={14} />
        </motion.div>

        <motion.div 
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[30%] left-[40%] w-40 opacity-[0.4]"
        >
          <Squiggle color="#FF9D66" rotation={-10} strokeWidth={14} />
        </motion.div>
      </div>

      <div className="max-w-[1500px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 relative z-10">
        
        {/* COLUMN 1: Campaign Highlight (~25%) */}
        <div className="md:col-span-3 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-center font-display text-black text-lg tracking-widest uppercase">New This Season!</h2>
            
            {/* Main Feature Banner */}
            <Link 
              href="/shop" 
              onClick={(e) => triggerRipple(e.clientX, e.clientY, "#BDE0FE")}
              className="group relative w-full h-[380px] bg-[#BDE0FE] border border-black/10 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-end p-6"
            >
              <Image 
                src="/assets/products/denim_jacket.png" 
                alt="New Essentials" 
                fill 
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 20vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out origin-bottom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/50 to-transparent" />
              <div className="relative z-10 text-center">
                <h1 className="text-4xl font-display text-black leading-[1.1] mb-2 tracking-tight drop-shadow-sm">
                  ESSENTIAL<br/><span className="text-black uppercase">Classics</span>
                </h1>
                <p className="text-black text-xs font-bold tracking-widest uppercase mb-4">Up to 50% Off</p>
                <div className="inline-flex items-center text-xs font-bold text-black border border-black px-4 py-2 rounded-full group-hover:bg-black group-hover:text-white transition-colors bg-white">
                  SHOP NOW <ArrowRight weight="bold" className="ml-1" />
                </div>
              </div>
            </Link>
          </div>

          {/* Row 4: Shop By Occasion (Moved to Column 1) */}
          <div className="flex flex-col gap-4 mt-2">
            <h2 className="text-center font-display text-black text-lg tracking-widest uppercase">Shop By Occasion</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Party Glam", params: "category=Formal%20Sets", img: "/assets/products/product_sundress.png" },
                { title: "Weekend Ready", params: "category=Sets", img: "/assets/products/product_shortset.png" }
              ].map((occ, i) => (
                <Link 
                  href={`/shop?${occ.params}`} 
                  key={i} 
                  onClick={(e) => triggerRipple(e.clientX, e.clientY, "#BDE0FE")}
                  className="relative h-40 border border-black/10 rounded-2xl overflow-hidden group shadow-sm bg-white"
                >
                  <Image 
                    src={occ.img} 
                    alt={occ.title} 
                    fill 
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-contain p-2 group-hover:scale-110 transition-transform duration-500 opacity-90" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-0 w-full text-center text-black text-[12px] font-bold uppercase tracking-widest z-10">{occ.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* COLUMN 2: Trending Collections (~35%) */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <h2 className="text-center font-display text-transparent select-none text-lg tracking-widest uppercase hidden md:block">.</h2>
          <div className="grid grid-cols-2 gap-4 h-[650px] relative">
            <AnimatePresence mode="wait">
              {(!activeCategory && !activeAge) ? (
                <motion.div 
                  key="main-grid"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-2 gap-4 absolute inset-0"
                >
                  {trendingItems.map((item, i) => (
                    <button 
                      key={i} 
                      onClick={(e) => handleDeepDive(e, item)}
                      className={`group relative ${item.bg} border border-black/10 rounded-2xl overflow-hidden shadow-sm flex flex-col items-center justify-between p-4 cursor-pointer text-left w-full h-full`}
                    >
                      <div className="relative w-full h-28 mt-2">
                        <Image 
                          src={item.img} 
                          alt={item.title} 
                          fill 
                          sizes="(max-width: 768px) 50vw, 20vw"
                          className="object-contain drop-shadow-xl group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-500" 
                        />
                      </div>
                      <div className="text-center mt-4">
                        <h3 className="font-display text-black text-base tracking-wide">{item.title}</h3>
                        <p className="text-black text-[10px] font-bold uppercase tracking-widest mt-1">{item.offer}</p>
                      </div>
                    </button>
                  ))}
                </motion.div>
              ) : activeAge ? (
                <motion.div 
                  key="age-grid"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="grid grid-cols-2 gap-4 absolute inset-0"
                >
                  <div className="col-span-2 flex justify-between items-center px-2 py-4">
                    <div>
                      <h3 className="font-display text-black text-2xl">{ageCategories[activeAge].title}</h3>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: ageCategories[activeAge].color }}>Browse by Category</p>
                    </div>
                    <button 
                      onClick={() => setActiveAge(null)}
                      className="text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors"
                    >
                      ← Back
                    </button>
                  </div>
                  {ageCategories[activeAge].categories.map((cat, i) => (
                    <motion.button 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i + 0.1 }}
                      onClick={(e) => handleRevealClick(e, cat.params, ageCategories[activeAge].color)}
                      className={`${cat.bg} border border-black/10 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 group cursor-pointer`}
                    >
                       <div className="relative w-full h-24">
                        <Image 
                          src={cat.img} 
                          alt={cat.name} 
                          fill 
                          className="object-contain group-hover:scale-110 transition-transform duration-500" 
                        />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-black/60 group-hover:text-black">{cat.name}</span>
                    </motion.button>
                  ))}
                  
                  <motion.button 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    onClick={(e) => handleRevealClick(e, `ageGroup=${activeAge}`, ageCategories[activeAge].color)}
                    className="bg-black rounded-2xl p-4 flex flex-col items-center justify-center gap-1 group"
                  >
                    <span className="text-white font-display text-lg">Shop All</span>
                    <ArrowRight className="text-white w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div 
                  key="category-grid"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="grid grid-cols-2 gap-4 absolute inset-0"
                >
                  <div className="col-span-2 flex justify-between items-center px-2 py-4">
                    <div>
                      <h3 className="font-display text-black text-2xl">{categoryContent[activeCategory!].title}</h3>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: categoryContent[activeCategory!].color }}>Collection Reveal</p>
                    </div>
                    <button 
                      onClick={() => setActiveCategory(null)}
                      className="text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors"
                    >
                      ← Back
                    </button>
                  </div>
                  {categoryContent[activeCategory!].items.map((item, i) => (
                    <motion.button 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i + 0.1 }}
                      onClick={(e) => handleRevealClick(e, categoryContent[activeCategory!].params, activeCategory === "signature" ? "#FFD1DC" : "#BDE0FE")}
                      className={`${item.bg} border border-black/10 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 group cursor-pointer`}
                    >
                       <div className="relative w-full h-24">
                        <Image 
                          src={item.img} 
                          alt={item.title} 
                          fill 
                          className="object-contain group-hover:scale-110 transition-transform duration-500" 
                        />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-black/60 group-hover:text-black">{item.title}</span>
                    </motion.button>
                  ))}
                  
                  <motion.button 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    onClick={(e) => handleRevealClick(e, categoryContent[activeCategory!].params, activeCategory === "signature" ? "#FFD1DC" : "#BDE0FE")}
                    className="bg-black rounded-2xl p-4 flex flex-col items-center justify-center gap-1 group"
                  >
                    <span className="text-white font-display text-lg">View All</span>
                    <ArrowRight className="text-white w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* COLUMN 3: Discovery Hub (~40%) */}
        <div className="md:col-span-5 flex flex-col gap-8">
          
          {/* Row 1: Shop By Age (Implicit Groups) */}
          <div className="flex flex-col gap-4">
            <h2 className="text-center font-display text-black text-lg tracking-widest uppercase">Shop By Age</h2>
            <div className="flex justify-center gap-4 md:gap-8">
              {[
                { name: "Newborn", params: "0-1", img: "/assets/products/product_shortset.png" },
                { name: "Toddler", params: "1-2", img: "/assets/products/product_sundress.png" },
                { name: "Explorer", params: "3-4", img: "/assets/products/joggers.png" },
                { name: "Big Kid", params: "5-7", img: "/assets/products/denim_jacket.png" }
              ].map((pill, i) => (
                <button 
                  key={i} 
                  onClick={(e) => handleAgeDive(e, pill.params)}
                  className="flex flex-col items-center gap-2 group flex-1 max-w-[100px] cursor-pointer"
                >
                  <div className="aspect-square w-full rounded-2xl border border-black/10 group-hover:border-black overflow-hidden transition-all duration-300 shadow-sm bg-white p-2 relative">
                     <Image 
                      src={pill.img} 
                      alt={pill.name} 
                      fill
                      sizes="100px"
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  <span className="text-[11px] font-bold text-black uppercase tracking-wider text-center">{pill.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Row 2: Wardrobe Quick Links (Girls & Boys) */}
          <div className="grid grid-cols-2 gap-6 bg-white border border-black/10 rounded-2xl p-6 shadow-sm relative overflow-hidden">
            
            {/* Girls */}
            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex flex-col items-center">
                <h2 className="text-center font-display text-black text-xl leading-tight">Essential<br/><span className="text-black text-sm uppercase tracking-widest">Girl's Wardrobe</span></h2>
                <Squiggle color="#FFD1DC" className="w-16 h-3 mt-2" strokeWidth={16} />
              </div>
              <div className="grid grid-cols-2 gap-y-6 gap-x-2">
                {[
                  { name: "Dresses", params: "gender=Girl&category=Dresses", img: "/assets/products/product_sundress.png" },
                  { name: "Skirt Sets", params: "gender=Girl&category=Sets", img: "/assets/products/product_skirtset.png" },
                  { name: "Outerwear", params: "gender=Girl&category=Outerwear", img: "/assets/products/puffer_jacket.png" },
                  { name: "Footwear", params: "gender=Girl&category=Footwear", img: "/assets/products/product_footwear.png" }
                ].map((cat, i) => (
                  <Link 
                    href={`/shop?${cat.params}`} 
                    key={i} 
                    onClick={(e) => triggerRipple(e.clientX, e.clientY, "#FFD1DC")}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-14 h-14 bg-[#FFD1DC] rounded-xl shadow-sm border border-black/5 flex items-center justify-center group-hover:border-black group-hover:-translate-y-1 transition-all relative overflow-hidden">
                      <Image 
                        src={cat.img} 
                        alt={cat.name} 
                        fill
                        sizes="56px"
                        className="object-contain drop-shadow-sm p-1" 
                      />
                    </div>
                    <span className="text-[10px] font-bold text-black uppercase text-center leading-tight">{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[80%] w-px bg-gray-100" />

            {/* Boys */}
            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex flex-col items-center">
                <h2 className="text-center font-display text-black text-xl leading-tight">Essential<br/><span className="text-black text-sm uppercase tracking-widest">Boy's Wardrobe</span></h2>
                <Squiggle color="#BDE0FE" className="w-16 h-3 mt-2" strokeWidth={16} />
              </div>
              <div className="grid grid-cols-2 gap-y-6 gap-x-2">
                {[
                  { name: "Denim", params: "gender=Boy&category=Jean%20Sets", img: "/assets/products/denim_jacket.png" },
                  { name: "Tees", params: "gender=Boy&category=Tees%20%26%20Polos", img: "/assets/products/product_tee.png" },
                  { name: "Knits", params: "gender=Boy&category=Outerwear", img: "/assets/products/wool_sweater.png" },
                  { name: "Footwear", params: "gender=Boy&category=Footwear", img: "/assets/products/product_footwear.png" }
                ].map((cat, i) => (
                  <Link 
                    href={`/shop?${cat.params}`} 
                    key={i} 
                    onClick={(e) => triggerRipple(e.clientX, e.clientY, "#BDE0FE")}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-14 h-14 bg-[#BDE0FE] rounded-xl shadow-sm border border-black/5 flex items-center justify-center group-hover:border-black group-hover:-translate-y-1 transition-all relative overflow-hidden">
                      <Image 
                        src={cat.img} 
                        alt={cat.name} 
                        fill
                        sizes="56px"
                        className="object-contain drop-shadow-sm p-1" 
                      />
                    </div>
                    <span className="text-[10px] font-bold text-black uppercase text-center leading-tight">{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Row 3: 60-Min Delivery Banner */}
          <div className="px-2">
            <Link 
              href="/shop" 
              onClick={(e) => triggerRipple(e.clientX, e.clientY, "#BDE0FE")}
              className="group relative w-full bg-[#BDE0FE] border border-black/10 rounded-2xl p-6 shadow-sm flex items-center justify-between overflow-hidden"
            >
               <div className="absolute right-0 top-0 w-64 h-full bg-white/40 skew-x-12 translate-x-32 group-hover:translate-x-[-200%] transition-transform duration-1000 ease-in-out" />
               <div className="relative z-10 text-black">
                 <div className="flex items-center gap-2 mb-1">
                   <Clock weight="fill" className="w-5 h-5 text-black" />
                   <span className="text-xs font-bold tracking-widest uppercase">Fast Track</span>
                 </div>
                 <h3 className="text-2xl font-display leading-none mb-1">60-Min Delivery!</h3>
                 <p className="text-[10px] uppercase tracking-wider text-black">On Party Wear & Essentials</p>
               </div>
               <div className="relative z-10 w-12 h-12 bg-white border border-black/10 rounded-full flex items-center justify-center text-black shadow-sm group-hover:scale-110 transition-transform">
                 <Truck weight="fill" className="w-6 h-6" />
               </div>
            </Link>
          </div>


        </div>
      </div>
    </section>
  );
}
