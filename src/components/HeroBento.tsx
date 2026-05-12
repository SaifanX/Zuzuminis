"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Truck } from "@phosphor-icons/react";

export function HeroBento() {
  return (
    <section className="relative min-h-[100dvh] pt-40 pb-16 px-4 md:px-8 bg-butter flex items-center">
      <div className="max-w-[1500px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
        
        {/* COLUMN 1: Campaign Highlight (~25%) */}
        <div className="md:col-span-3 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-center font-display text-black text-sm tracking-widest uppercase">New This Season!</h2>
            
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
            <h2 className="text-center font-display text-black text-sm tracking-widest uppercase">On Everyone's Radar</h2>
            <div className="grid grid-cols-2 gap-3">
              {/* Hot Bestsellers */}
              <Link href="/shop" className="relative h-40 bg-[#E8F5E9] border border-black/10 rounded-2xl overflow-hidden group shadow-sm p-4 flex flex-col justify-between">
                <div className="relative z-10">
                  <span className="text-[10px] font-bold text-black uppercase tracking-wider block mb-1">Hot Bestsellers</span>
                  <div className="flex items-start text-black">
                    <span className="text-xl font-bold mt-1">UP TO</span>
                    <span className="text-4xl font-display leading-none ml-1">50<span className="text-xl">%</span></span>
                  </div>
                  <span className="text-[10px] font-bold text-black uppercase block mt-1">OFF</span>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 opacity-40">
                  <Image 
                    src="/assets/products/product_tee.png" 
                    alt="Bestsellers" 
                    fill 
                    sizes="100px"
                    className="object-contain" 
                  />
                </div>
              </Link>
              
              {/* Clearance Store */}
              <Link href="/shop" className="relative h-40 bg-[#FFF3E0] border border-black/10 rounded-2xl overflow-hidden group shadow-sm">
                <Image 
                  src="/assets/products/product_shortset.png" 
                  alt="Clearance" 
                  fill 
                  sizes="(max-width: 768px) 50vw, 15vw"
                  className="object-contain p-4 group-hover:scale-110 transition-transform duration-500 opacity-80" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-0 w-full text-center text-black text-[10px] font-bold uppercase tracking-widest z-10">Clearance</span>
              </Link>
            </div>
          </div>
        </div>

        {/* COLUMN 2: Trending Collections (~35%) */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <h2 className="text-center font-display text-transparent select-none text-sm tracking-widest uppercase hidden md:block">.</h2>
          <div className="grid grid-cols-2 gap-4 h-[650px]">
            {[
              { title: "Essential Basics", offer: "STARTS ₹199 >", img: "/assets/products/product_tee.png", bg: "bg-[#E9F9FF]" },
              { title: "Boutique Knits", offer: "NEW SEASON >", img: "/assets/products/wool_sweater.png", bg: "bg-[#FFF6E9]" },
              { title: "Signature Sets", offer: "UP TO 50% OFF >", img: "/assets/products/product_skirtset.png", bg: "bg-[#FBE9FF]" },
              { title: "Daily Denim", offer: "BEST SELLERS >", img: "/assets/products/denim_jacket.png", bg: "bg-[#E9FFEB]" },
              { title: "Warm Layers", offer: "WINTER WEAR >", img: "/assets/products/puffer_jacket.png", bg: "bg-[#F4F6F6]" },
              { title: "Footwear", offer: "STARTS ₹299 >", img: "/assets/products/product_footwear.png", bg: "bg-[#FDEDEC]" }
            ].map((item, i) => (
              <Link href="/shop" key={i} className={`group relative ${item.bg} border border-black/10 rounded-2xl overflow-hidden shadow-sm flex flex-col items-center justify-between p-4`}>
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
                  <h3 className="font-display text-black text-sm tracking-wide">{item.title}</h3>
                  <p className="text-black text-[9px] font-bold uppercase tracking-widest mt-1">{item.offer}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* COLUMN 3: Discovery Hub (~40%) */}
        <div className="md:col-span-5 flex flex-col gap-8">
          
          {/* Row 1: What Are You Looking For? */}
          <div className="flex flex-col gap-4">
            <h2 className="text-center font-display text-black text-sm tracking-widest uppercase">What Are You Looking For?</h2>
            <div className="flex justify-center gap-6 md:gap-10">
              {[
                { name: "NEW IN!", img: "/assets/products/product_sundress.png" },
                { name: "Birthday", img: "/assets/products/product_skirtset.png" },
                { name: "Outerwear", img: "/assets/products/puffer_jacket.png" },
                { name: "Playtime", img: "/assets/products/joggers.png" }
              ].map((pill, i) => (
                <Link href="/shop" key={i} className="flex flex-col items-center gap-2 group">
                  <div className="w-16 h-16 rounded-full border-2 border-black/20 group-hover:border-black overflow-hidden transition-all duration-300 shadow-sm bg-white">
                     <Image src={pill.img} alt={pill.name} width={64} height={64} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <span className="text-[10px] font-bold text-black uppercase tracking-wider text-center">{pill.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Row 2: Wardrobe Quick Links (Girls & Boys) */}
          <div className="grid grid-cols-2 gap-6 bg-white border border-black/10 rounded-2xl p-4 shadow-sm">
            {/* Girls */}
            <div className="flex flex-col gap-4">
              <h2 className="text-center font-display text-black text-base">Essential<br/><span className="text-black text-xs">Girl's Wardrobe</span></h2>
              <div className="grid grid-cols-2 gap-y-6 gap-x-2">
                {[
                  { name: "Dresses", img: "/assets/products/product_sundress.png" },
                  { name: "Skirt Sets", img: "/assets/products/product_skirtset.png" },
                  { name: "Outerwear", img: "/assets/products/puffer_jacket.png" },
                  { name: "Footwear", img: "/assets/products/product_footwear.png" }
                ].map((cat, i) => (
                  <Link href="/shop" key={i} className="flex flex-col items-center gap-2 group">
                    <div className="w-12 h-12 bg-[#FBE9FF] rounded-xl shadow-sm border border-black/5 flex items-center justify-center group-hover:border-black group-hover:-translate-y-1 transition-all relative overflow-hidden">
                      <Image 
                        src={cat.img} 
                        alt={cat.name} 
                        fill
                        sizes="48px"
                        className="object-contain drop-shadow-sm p-1" 
                      />
                    </div>
                    <span className="text-[9px] font-bold text-black uppercase text-center leading-tight">{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Boys */}
            <div className="flex flex-col gap-4">
              <h2 className="text-center font-display text-black text-base">Essential<br/><span className="text-black text-xs">Boy's Wardrobe</span></h2>
              <div className="grid grid-cols-2 gap-y-6 gap-x-2">
                {[
                  { name: "Denim", img: "/assets/products/denim_jacket.png" },
                  { name: "Tees", img: "/assets/products/product_tee.png" },
                  { name: "Knits", img: "/assets/products/wool_sweater.png" },
                  { name: "Footwear", img: "/assets/products/product_footwear.png" }
                ].map((cat, i) => (
                  <Link href="/shop" key={i} className="flex flex-col items-center gap-2 group">
                    <div className="w-12 h-12 bg-[#E9F9FF] rounded-xl shadow-sm border border-black/5 flex items-center justify-center group-hover:border-black group-hover:-translate-y-1 transition-all relative overflow-hidden">
                      <Image 
                        src={cat.img} 
                        alt={cat.name} 
                        fill
                        sizes="48px"
                        className="object-contain drop-shadow-sm p-1" 
                      />
                    </div>
                    <span className="text-[9px] font-bold text-black uppercase text-center leading-tight">{cat.name}</span>
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
            <h2 className="text-center font-display text-black text-sm tracking-widest uppercase">Shop By Occasion</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Party Glam", img: "/assets/products/product_sundress.png" },
                { title: "Weekend Ready", img: "/assets/products/product_shortset.png" }
              ].map((occ, i) => (
                <Link href="/shop" key={i} className="relative h-32 border border-black/10 rounded-2xl overflow-hidden group shadow-sm bg-white">
                  <Image 
                    src={occ.img} 
                    alt={occ.title} 
                    fill 
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-contain p-2 group-hover:scale-110 transition-transform duration-500 opacity-90" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-0 w-full text-center text-black text-[11px] font-bold uppercase tracking-widest z-10">{occ.title}</span>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
