"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Truck } from "@phosphor-icons/react";
import { motion } from "framer-motion";

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
  <svg viewBox="0 0 240 120" fill={color} xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M190,100c22,0,40-18,40-40c0-22-18-40-40-40c-3,0-6,1-9,1C170,8,150,0,130,0c-30,0-55,20-63,48 c-4-1-8-2-12-2c-22,0-40,18-40,40c0,22,18,40,40,40H190z" />
  </svg>
);

export function HeroBento() {
  return (
    <section className="relative min-h-[100dvh] pt-40 pb-16 px-4 md:px-8 bg-butter flex items-center overflow-hidden">
      
      {/* CLOUDS & SQUIGGLES LAYER */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Massive Soft Drifting Clouds */}
        <motion.div 
          animate={{ x: [-500, 2000] }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute top-[5%] w-[600px] opacity-[0.06]"
        >
          <Cloud color="#4D96FF" />
        </motion.div>
        
        <motion.div 
          animate={{ x: [2000, -500] }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute top-[35%] w-[800px] opacity-[0.05]"
        >
          <Cloud color="#FF66A1" />
        </motion.div>

        {/* Floating Clouds (No X Drift) */}
        <motion.div 
          animate={{ y: [0, -40, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[60%] right-[10%] w-[400px] opacity-[0.04]"
        >
          <Cloud color="#4D96FF" />
        </motion.div>

        {/* Thick Background Squiggles */}
        <motion.div 
          animate={{ y: [0, -30, 0], rotate: [-15, -10, -15] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[5%] w-48 opacity-40"
        >
          <Squiggle color="#4D96FF" rotation={-15} strokeWidth={14} />
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 30, 0], rotate: [20, 25, 20] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[15%] right-[5%] w-56 opacity-40"
        >
          <Squiggle color="#FF66A1" rotation={20} strokeWidth={14} />
        </motion.div>
      </div>

      <div className="max-w-[1500px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 relative z-10">
        
        {/* COLUMN 1: Campaign Highlight (~25%) */}
        <div className="md:col-span-3 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-center font-display text-black text-lg tracking-widest uppercase">New This Season!</h2>
            
            {/* Main Feature Banner */}
            <Link href="/shop" className="group relative w-full h-[380px] bg-[#E9F9FF] border border-black/10 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-end p-6">
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

          <div className="flex flex-col gap-4 mt-2">
            <h2 className="text-center font-display text-black text-lg tracking-widest uppercase">Curated Mini Edits</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Curated Item 1: The Essential */}
              <Link href="/shop?gender=Boy&category=Tees & Polos" className="group relative h-44 bg-white border border-black/10 rounded-2xl overflow-hidden shadow-sm p-4 flex flex-col justify-between">
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2 py-0.5 bg-zuzu-pink text-white text-[8px] font-bold uppercase tracking-widest rounded-full">Stylist Pick</span>
                </div>
                <div className="relative w-full h-24 mt-2">
                  <Image 
                    src="/assets/products/classic_white_tee.png" 
                    alt="Essential Edit" 
                    fill 
                    sizes="(max-width: 768px) 50vw, 15vw"
                    className="object-contain group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
                <div className="text-center">
                  <span className="text-[12px] font-bold text-black uppercase tracking-wider block">Premium Basics</span>
                  <span className="text-[10px] text-black/60 uppercase font-bold tracking-widest">Shop The Edit &gt;</span>
                </div>
              </Link>
              
              {/* Curated Item 2: The Statement */}
              <Link href="/shop?gender=Boy&category=Jean Sets" className="group relative h-44 bg-[#F5F5F5] border border-black/10 rounded-2xl overflow-hidden shadow-sm p-4 flex flex-col justify-between">
                <div className="absolute top-3 right-3 z-10">
                  <span className="px-2 py-0.5 bg-black text-white text-[8px] font-bold uppercase tracking-widest rounded-full">Limited</span>
                </div>
                <div className="relative w-full h-24 mt-2">
                  <Image 
                    src="/assets/products/denim_jacket.png" 
                    alt="Statement Edit" 
                    fill 
                    sizes="(max-width: 768px) 50vw, 15vw"
                    className="object-contain group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
                <div className="text-center">
                  <span className="text-[12px] font-bold text-black uppercase tracking-wider block">Statement Denim</span>
                  <span className="text-[10px] text-black/60 uppercase font-bold tracking-widest">Explore Now &gt;</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* COLUMN 2: Trending Collections (~35%) */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <h2 className="text-center font-display text-transparent select-none text-lg tracking-widest uppercase hidden md:block">.</h2>
          <div className="grid grid-cols-2 gap-4 h-[650px]">
            {[
              { title: "Essential Basics", offer: "STARTS ₹199 &gt;", img: "/assets/products/product_tee.png", bg: "bg-[#E9F9FF]", params: "category=Tees & Polos" },
              { title: "Boutique Knits", offer: "NEW SEASON &gt;", img: "/assets/products/wool_sweater.png", bg: "bg-[#FFF6E9]", params: "category=Outerwear" },
              { title: "Signature Sets", offer: "UP TO 50% OFF &gt;", img: "/assets/products/product_skirtset.png", bg: "bg-[#FBE9FF]", params: "category=Sets" },
              { title: "Daily Denim", offer: "BEST SELLERS &gt;", img: "/assets/products/denim_jacket.png", bg: "bg-[#E9FFEB]", params: "category=Jean Sets" },
              { title: "Warm Layers", offer: "WINTER WEAR &gt;", img: "/assets/products/puffer_jacket.png", bg: "bg-[#F4F6F6]", params: "category=Outerwear" },
              { title: "Footwear", offer: "STARTS ₹299 &gt;", img: "/assets/products/product_footwear.png", bg: "bg-[#FDEDEC]", params: "category=Footwear" }
            ].map((item, i) => (
              <Link href={`/shop?${item.params}`} key={i} className={`group relative ${item.bg} border border-black/10 rounded-2xl overflow-hidden shadow-sm flex flex-col items-center justify-between p-4`}>
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
              </Link>
            ))}
          </div>
        </div>

        {/* COLUMN 3: Discovery Hub (~40%) */}
        <div className="md:col-span-5 flex flex-col gap-8">
          
          {/* Row 1: Shop By Age (Implicit Groups) */}
          <div className="flex flex-col gap-4">
            <h2 className="text-center font-display text-black text-lg tracking-widest uppercase">Shop By Age</h2>
            <div className="flex justify-center gap-4 md:gap-8">
              {[
                { name: "Newborn", params: "ageGroup=0-1", img: "/assets/products/product_shortset.png" },
                { name: "Toddler", params: "ageGroup=1-2", img: "/assets/products/product_sundress.png" },
                { name: "Explorer", params: "ageGroup=3-4", img: "/assets/products/joggers.png" },
                { name: "Big Kid", params: "ageGroup=5-7", img: "/assets/products/denim_jacket.png" }
              ].map((pill, i) => (
                <Link href={`/shop?${pill.params}`} key={i} className="flex flex-col items-center gap-2 group flex-1 max-w-[100px]">
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
                </Link>
              ))}
            </div>
          </div>

          {/* Row 2: Wardrobe Quick Links (Girls & Boys) */}
          <div className="grid grid-cols-2 gap-6 bg-white border border-black/10 rounded-2xl p-6 shadow-sm relative overflow-hidden">
            
            {/* Girls */}
            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex flex-col items-center">
                <h2 className="text-center font-display text-black text-xl leading-tight">Essential<br/><span className="text-black text-sm uppercase tracking-widest">Girl's Wardrobe</span></h2>
                <Squiggle color="#FF66A1" className="w-16 h-3 mt-2" strokeWidth={16} />
              </div>
              <div className="grid grid-cols-2 gap-y-6 gap-x-2">
                {[
                  { name: "Dresses", params: "gender=Girl&category=Dresses", img: "/assets/products/product_sundress.png" },
                  { name: "Skirt Sets", params: "gender=Girl&category=Sets", img: "/assets/products/product_skirtset.png" },
                  { name: "Outerwear", params: "gender=Girl&category=Outerwear", img: "/assets/products/puffer_jacket.png" },
                  { name: "Footwear", params: "gender=Girl&category=Footwear", img: "/assets/products/product_footwear.png" }
                ].map((cat, i) => (
                  <Link href={`/shop?${cat.params}`} key={i} className="flex flex-col items-center gap-2 group">
                    <div className="w-14 h-14 bg-[#FBE9FF] rounded-xl shadow-sm border border-black/5 flex items-center justify-center group-hover:border-black group-hover:-translate-y-1 transition-all relative overflow-hidden">
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
                <Squiggle color="#4D96FF" className="w-16 h-3 mt-2" strokeWidth={16} />
              </div>
              <div className="grid grid-cols-2 gap-y-6 gap-x-2">
                {[
                  { name: "Denim", params: "gender=Boy&category=Jean Sets", img: "/assets/products/denim_jacket.png" },
                  { name: "Tees", params: "gender=Boy&category=Tees & Polos", img: "/assets/products/product_tee.png" },
                  { name: "Knits", params: "gender=Boy&category=Outerwear", img: "/assets/products/wool_sweater.png" },
                  { name: "Footwear", params: "gender=Boy&category=Footwear", img: "/assets/products/product_footwear.png" }
                ].map((cat, i) => (
                  <Link href={`/shop?${cat.params}`} key={i} className="flex flex-col items-center gap-2 group">
                    <div className="w-14 h-14 bg-[#E9F9FF] rounded-xl shadow-sm border border-black/5 flex items-center justify-center group-hover:border-black group-hover:-translate-y-1 transition-all relative overflow-hidden">
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
            <Link href="/shop" className="group relative w-full bg-[#E9F9FF] border border-black/10 rounded-2xl p-6 shadow-sm flex items-center justify-between overflow-hidden">
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

          {/* Row 4: Shop By Occasion */}
          <div className="flex flex-col gap-4">
            <h2 className="text-center font-display text-black text-lg tracking-widest uppercase">Shop By Occasion</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Party Glam", params: "category=Formal Sets", img: "/assets/products/product_sundress.png" },
                { title: "Weekend Ready", params: "category=Sets", img: "/assets/products/product_shortset.png" }
              ].map((occ, i) => (
                <Link href={`/shop?${occ.params}`} key={i} className="relative h-32 border border-black/10 rounded-2xl overflow-hidden group shadow-sm bg-white">
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
      </div>
    </section>
  );
}
