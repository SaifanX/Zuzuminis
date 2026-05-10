"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Navbar } from "@/components/Navbar";
import { GrainOverlay } from "@/components/GrainOverlay";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Logo } from "@/components/Logo";
import { ShoppingBag, ArrowRight, Heart, Star, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const products = useQuery(api.products.list, {});
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal Animations - Hero only once
    const heroElements = container.current?.querySelectorAll(".hero-content > *");
    if (heroElements?.length) {
      gsap.from(heroElements, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        clearProps: "all"
      });
    }

    gsap.from(".category-circle", {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".categories-section",
        start: "top 85%",
      },
      clearProps: "all"
    });

    // Only animate products if they exist
    if (products && products.length > 0) {
      gsap.from(".product-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".products-grid",
          start: "top 85%",
        }
      });
    }
  }, { scope: container, dependencies: [products] });

  return (
    <main ref={container} className="relative overflow-x-hidden bg-butter selection:bg-zuzu-blue selection:text-white">
      <GrainOverlay />
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] bg-zuzu-blue pt-48 pb-32 px-8 flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="hero-content text-white">
            <h1 className="text-6xl md:text-8xl font-display leading-[1.1] mb-8">
              Styles That Make Your <span className="text-zuzu-yellow italic">Minis</span> Shine!
            </h1>
            <p className="text-lg opacity-80 max-w-lg mb-12 font-body leading-relaxed">
              Discover premium, sustainable kidswear designed for every milestone. From organic cotton basics to celebration-ready outfits.
            </p>
            <Link href="/shop" className="inline-flex items-center justify-center px-10 py-5 bg-zuzu-pink text-white rounded-full font-bold shadow-xl hover:scale-105 transition-all gap-3">
              Explore Collection <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="relative hero-image flex justify-center">
            <Image 
              src="/assets/hero-kid.png" 
              alt="Happy Mini in Zuzu Wear" 
              width={600}
              height={600}
              priority
              className="w-full max-w-[600px] object-contain drop-shadow-2xl"
            />
          </div>
        </div>
        
        {/* Cloud Separator */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-butter cloud-separator" />
      </section>

      {/* SHOP BY AGE */}
      <section className="categories-section py-32 px-8 text-center relative overflow-hidden bg-butter/50">
        {/* Background Blobs for Color */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
          <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-zuzu-blue rounded-full blur-[120px]" />
          <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-zuzu-pink rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-zuzu-yellow rounded-full blur-[150px] opacity-50" />
        </div>

        <h2 className="text-4xl md:text-5xl font-display mb-20 text-gray-900 relative z-10">Shop Styles by Age</h2>
        
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-10 md:gap-14 relative z-10">
          {[
            { label: "0-1", sub: "Newborns", gradient: "from-[#FF6B6B] to-[#FF8E8E]", shadow: "shadow-red-100" },
            { label: "1-2", sub: "Infants", gradient: "from-[#4D96FF] to-[#6BCBFF]", shadow: "shadow-blue-100" },
            { label: "2-3", sub: "Toddlers", gradient: "from-[#6BCB77] to-[#95E1D3]", shadow: "shadow-green-100" },
            { label: "3-4", sub: "Pre-School", gradient: "from-[#FFD93D] to-[#FFEA85]", shadow: "shadow-yellow-100" },
            { label: "4-5", sub: "Early Years", gradient: "from-[#FF9248] to-[#FFB385]", shadow: "shadow-orange-100" },
            { label: "5-7", sub: "Minis", gradient: "from-[#FF66A1] to-[#FF92BC]", shadow: "shadow-pink-100" },
          ].map((cat, i) => (
            <Link href="/shop" key={i} className="flex flex-col items-center gap-6 group cursor-pointer">
              <div className="relative group-hover:scale-110 transition-transform duration-500">
                {/* Secondary Outer Ring */}
                <div className="absolute -inset-2 border-2 border-dashed border-zuzu-blue/20 rounded-full group-hover:border-zuzu-orange transition-all duration-500" />
                
                <div className={`category-circle w-32 h-32 rounded-full bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-white text-3xl font-display shadow-xl ${cat.shadow} relative overflow-hidden`}>
                  {/* Inner Glow */}
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative z-10">{cat.label}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-zuzu-orange transition-colors">{cat.sub}</p>
                <div className="h-1 w-0 bg-zuzu-orange mx-auto rounded-full group-hover:w-full transition-all duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="py-24 px-8 bg-butter">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-4xl font-display text-gray-900">New Arrivals</h2>
            <div className="flex gap-4">
               <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-zuzu-blue hover:text-white transition-all">&lt;</button>
               <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-zuzu-blue hover:text-white transition-all">&gt;</button>
            </div>
          </div>

          <div className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products?.slice(0, 4).map((product) => (
              <div key={product._id} className="product-card group cursor-pointer">
                <div className="aspect-[4/5] bg-butter rounded-2xl overflow-hidden mb-6 relative border border-black/5">
                  <Image 
                    src={product.images[0]} 
                    alt={product.name} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 right-4 translate-x-12 group-hover:translate-x-0 transition-transform">
                    <button className="w-10 h-10 bg-butter rounded-full shadow-md flex items-center justify-center hover:bg-zuzu-pink hover:text-white transition-colors"><Heart className="w-4 h-4" /></button>
                  </div>
                </div>
                <div className="text-center">
                   <div className="flex justify-center gap-1 text-zuzu-yellow mb-2">
                     {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                   </div>
                   <h3 className="text-lg font-display text-gray-900 mb-2">{product.name}</h3>
                   <p className="text-zuzu-orange font-bold">₹{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BANNERS */}
      <section className="py-24 px-8 bg-butter">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Banner */}
          <div className="bg-[#E9F9FF] rounded-[3rem] p-12 flex items-center relative overflow-hidden h-[400px]">
             <div className="relative z-10 max-w-sm">
                <h2 className="text-5xl font-display mb-6 text-gray-900 leading-[1.1]">15% Off Your First Mini Order</h2>
                <p className="text-gray-500 mb-8 font-body">Sustainable clothing that feels like a hug. Join the Zuzu movement.</p>
                <Link href="/shop" className="inline-block px-8 py-4 bg-zuzu-pink text-white rounded-full font-bold shadow-lg">Shop Now &gt;</Link>
             </div>
             <Image 
               src="/assets/product1.png" 
               alt="Boutique banner" 
               width={350}
               height={350}
               className="absolute right-0 bottom-0 w-[350px] object-contain translate-x-10 translate-y-10" 
             />
          </div>

          <div className="grid grid-rows-2 gap-8">
            <div className="bg-[#FFF6E9] rounded-[2.5rem] p-10 flex justify-between items-center relative overflow-hidden group h-[184px]">
               <div className="relative z-10">
                  <h3 className="text-3xl font-display mb-4 text-gray-900">For Princes</h3>
                  <Link href="/shop" className="inline-block px-6 py-3 bg-zuzu-pink text-white rounded-full font-bold text-xs">Explore &gt;</Link>
               </div>
               <Image 
                 src="/assets/product2.png" 
                 alt="Boys wear" 
                 width={180}
                 height={180}
                 className="absolute right-0 bottom-0 w-[180px] object-contain" 
               />
            </div>
            <div className="bg-[#FBE9FF] rounded-[2.5rem] p-10 flex justify-between items-center relative overflow-hidden group h-[184px]">
               <div className="relative z-10">
                  <h3 className="text-3xl font-display mb-4 text-gray-900">For Princesses</h3>
                  <Link href="/shop" className="inline-block px-6 py-3 bg-zuzu-pink text-white rounded-full font-bold text-xs">Explore &gt;</Link>
               </div>
               <Image 
                 src="/assets/product1.png" 
                 alt="Girls wear" 
                 width={180}
                 height={180}
                 className="absolute right-0 bottom-0 w-[180px] object-contain" 
               />
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR KIDS STYLES */}
      <section className="py-24 px-8 bg-butter">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
            <h2 className="text-4xl font-display text-gray-900">Popular Mini Styles</h2>
            <div className="flex gap-4 p-1 bg-gray-100 rounded-full">
               <Link href="/shop" className="px-6 py-2 bg-zuzu-pink text-white rounded-full text-xs font-bold shadow-md">All Styles</Link>
               <Link href="/shop" className="px-6 py-2 text-gray-400 text-xs font-bold hover:text-gray-900 transition-all">For Boys</Link>
               <Link href="/shop" className="px-6 py-2 text-gray-400 text-xs font-bold hover:text-gray-900 transition-all">For Girls</Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {products?.slice(0, 8).map((product) => (
              <div key={product._id} className="product-card group cursor-pointer border border-black/5 rounded-2xl p-4 hover:shadow-xl transition-all bg-butter/50">
                <div className="aspect-[4/5] bg-butter rounded-xl overflow-hidden mb-4 relative">
                  <Image 
                    src={product.images[0]} 
                    alt={product.name} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>
                <div className="flex flex-col items-center">
                   <div className="flex gap-1 text-zuzu-yellow mb-2">
                     {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                   </div>
                   <h3 className="text-md font-display text-gray-900 mb-1">{product.name}</h3>
                   <p className="text-zuzu-orange font-bold text-sm">₹{product.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4">
             <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-zuzu-blue hover:text-white transition-all">&lt;</button>
             <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-zuzu-blue hover:text-white transition-all">&gt;</button>
          </div>
        </div>
      </section>


      {/* NEWSLETTER */}
      <section className="relative py-48 bg-zuzu-blue overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-butter cloud-top" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-butter cloud-separator" />
        
        <div className="max-w-2xl mx-auto text-center relative z-10 px-8">
           <h2 className="text-5xl font-display text-white mb-8">Join the Zuzu Universe</h2>
           <p className="text-white/70 mb-12 font-body">Be the first to hear about new drops and exclusive member-only styles.</p>
           <div className="flex flex-col sm:flex-row gap-4">
             <input type="email" placeholder="Your best email" className="flex-grow px-8 py-5 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 outline-none focus:border-white/50 transition-all" />
             <button className="px-10 py-5 bg-zuzu-pink text-white rounded-full font-bold shadow-xl">Join Now</button>
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
