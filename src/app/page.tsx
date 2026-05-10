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
import { ShoppingBag, ArrowRight, Heart } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const products = useQuery(api.products.list);
  const container = useRef(null);

  useGSAP(() => {
    // Hero Entrance
    gsap.from(".hero-content > *", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });

    gsap.from(".hero-image", {
      scale: 1.2,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
    });

    // Category Reveal
    gsap.from(".category-circle", {
      scale: 0,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".categories-section",
        start: "top 80%",
      }
    });

    // Product Fade In
    gsap.from(".product-card", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".products-grid",
        start: "top 85%",
      }
    });
  }, { scope: container });

  return (
    <main ref={container} className="relative overflow-x-hidden bg-white">
      <GrainOverlay />
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[95vh] bg-zuzu-purple pt-48 pb-60 px-8 flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="hero-content text-white">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-12 h-[2px] bg-zuzu-yellow" />
              <span className="text-zuzu-yellow font-bold uppercase tracking-[0.3em] text-xs">New Collection 2024</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-display leading-[0.85] mb-10">
              Style for your <br />
              <span className="text-zuzu-yellow italic">little</span> hero.
            </h1>
            <p className="text-xl opacity-90 max-w-lg mb-14 font-body leading-relaxed">
              Premium, organic, and designed for every playground adventure. Give them the comfort they deserve.
            </p>
            <div className="flex flex-wrap gap-6 items-center">
              <button className="group px-12 py-6 bg-zuzu-pink text-white rounded-full font-body text-lg font-bold shadow-2xl hover:scale-105 transition-all flex items-center gap-4">
                Shop Collection 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
              <button className="px-8 py-3 border-b-2 border-white/30 text-white font-bold hover:border-white transition-all">
                Our Story
              </button>
            </div>
          </div>
          
          <div className="hero-image relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white/10 group">
            <img 
              src="/assets/hero-kid.png" 
              alt="Happy Kid in Zuzu Wear" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
        
        {/* Cloud Bottom */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-white cloud-separator" />
      </section>

      {/* SHOP BY AGE */}
      <section className="categories-section py-32 px-8 text-center bg-white">
        <div className="max-w-2xl mx-auto mb-20">
          <h2 className="text-5xl md:text-6xl font-display mb-6 text-gray-900">Shop by Age</h2>
          <p className="text-gray-400 font-body">Find the perfect fit for every milestone of their journey.</p>
        </div>
        
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-10 md:gap-20">
          {[
            { label: "0-1", sub: "Age 0-1 Years", color: "bg-zuzu-blue" },
            { label: "1-3", sub: "Age 1-3 Years", color: "bg-zuzu-teal" },
            { label: "3-5", sub: "Age 3-5 Years", color: "bg-zuzu-yellow" },
            { label: "5-8", sub: "Age 5-8 Years", color: "bg-zuzu-pink" },
            { label: "8-10", sub: "Age 8-10 Years", color: "bg-zuzu-purple" },
            { label: "10+", sub: "Age 10+ Years", color: "bg-[#00E0D7]" },
          ].map((cat, i) => (
            <div key={i} className="flex flex-col items-center gap-6 group cursor-pointer">
              <div className={`category-circle w-36 h-36 rounded-full ${cat.color} flex items-center justify-center text-white text-4xl font-display shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                {cat.label}
              </div>
              <p className="text-xs uppercase tracking-widest text-gray-400 font-bold group-hover:text-gray-900 transition-colors">{cat.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS GRID */}
      <section className="py-32 px-8 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8 mb-20">
            <div>
              <span className="text-zuzu-pink font-bold uppercase tracking-widest text-xs mb-4 block">Hand-picked for you</span>
              <h2 className="text-6xl font-display text-gray-900">New Arrivals</h2>
            </div>
            <Link href="/shop" className="group flex items-center gap-4 text-gray-400 hover:text-gray-900 transition-all">
              <span className="font-bold uppercase tracking-widest text-sm">Explore All Products</span>
              <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-zuzu-purple group-hover:border-zuzu-purple group-hover:text-white transition-all">
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
          </div>

          <div className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {products?.slice(0, 4).map((product, i) => (
              <div key={product._id} className="product-card group cursor-pointer">
                <div className="aspect-[3/4] bg-white rounded-[3rem] overflow-hidden mb-8 relative shadow-sm group-hover:shadow-2xl transition-all duration-700">
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Quick Actions */}
                  <div className="absolute top-6 right-6 translate-x-12 group-hover:translate-x-0 transition-transform duration-500">
                    <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-zuzu-pink hover:text-white transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-20 group-hover:translate-y-0 transition-transform duration-500 w-[80%]">
                    <button className="w-full py-4 bg-zuzu-purple text-white rounded-full shadow-xl font-bold flex items-center justify-center gap-3 hover:bg-zuzu-pink transition-colors">
                      <ShoppingBag className="w-4 h-4" />
                      Quick Add
                    </button>
                  </div>

                  {i === 0 && <span className="absolute top-6 left-6 bg-zuzu-pink text-white text-[10px] px-4 py-2 rounded-full uppercase font-bold shadow-lg">Trending</span>}
                </div>
                
                <div className="px-2">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-display text-gray-900 group-hover:text-zuzu-purple transition-colors">{product.name}</h3>
                    <p className="text-zuzu-purple font-bold text-lg">₹{product.price}</p>
                  </div>
                  <div className="flex gap-1 text-zuzu-yellow text-xs">
                    {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
                    <span className="text-gray-300 ml-2">(24 reviews)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMO BANNERS */}
      <section className="py-32 px-8 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="bg-[#E9F9FF] rounded-[4rem] p-16 flex flex-col justify-center items-start relative overflow-hidden group h-[500px]">
             <div className="relative z-10">
               <span className="text-zuzu-pink font-bold uppercase tracking-widest text-xs mb-6 block">Member Exclusive</span>
               <h2 className="text-6xl font-display mb-10 max-w-sm text-gray-900 leading-[1.1]">15% Off Your First Adventure</h2>
               <button className="px-10 py-5 bg-zuzu-purple text-white rounded-full font-bold shadow-2xl hover:bg-zuzu-pink hover:scale-105 transition-all">Claim Discount &gt;</button>
             </div>
             {/* Abstract Shapes */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-zuzu-blue/10 rounded-full translate-x-20 -translate-y-20 blur-3xl" />
             <div className="absolute bottom-0 right-0 w-80 h-80 bg-zuzu-pink/10 rounded-full translate-x-20 translate-y-20 blur-3xl" />
          </div>

          <div className="grid grid-rows-2 gap-8">
            <div className="bg-[#FFF6E9] rounded-[3.5rem] p-12 flex justify-between items-center group overflow-hidden relative cursor-pointer shadow-sm hover:shadow-xl transition-all">
               <div className="relative z-10">
                 <h3 className="text-4xl font-display mb-6 text-gray-900">For The Little <br /><span className="text-zuzu-blue">Princes</span></h3>
                 <button className="group flex items-center gap-3 text-zuzu-pink font-bold uppercase tracking-widest text-xs">
                   Shop Boys Collection
                   <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                 </button>
               </div>
               <div className="w-40 h-40 bg-zuzu-blue/20 rounded-full group-hover:scale-125 transition-transform duration-1000" />
            </div>
            <div className="bg-[#FBE9FF] rounded-[3.5rem] p-12 flex justify-between items-center group overflow-hidden relative cursor-pointer shadow-sm hover:shadow-xl transition-all">
               <div className="relative z-10">
                 <h3 className="text-4xl font-display mb-6 text-gray-900">For The Little <br /><span className="text-zuzu-pink">Princesses</span></h3>
                 <button className="group flex items-center gap-3 text-zuzu-pink font-bold uppercase tracking-widest text-xs">
                   Shop Girls Collection
                   <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                 </button>
               </div>
               <div className="w-40 h-40 bg-zuzu-pink/20 rounded-full group-hover:scale-125 transition-transform duration-1000" />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative bg-zuzu-purple pt-64 pb-20 px-8 text-white">
        <div className="absolute top-0 left-0 w-full h-40 bg-white cloud-top" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-12 gap-20 mb-32">
            <div className="md:col-span-5">
               <Link href="/" className="flex items-center gap-3 mb-10">
                  <Logo className="w-16 h-16 invert brightness-0" />
                  <span className="font-display text-5xl tracking-tighter">zuzu</span>
               </Link>
               <p className="opacity-70 text-lg leading-relaxed mb-12 max-w-sm font-body">
                 Crafting childhood magic through premium, sustainable style. Based in Bangalore, inspired by you.
               </p>
               <div className="flex gap-6">
                 {[1,2,3,4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-zuzu-pink hover:scale-110 transition-all cursor-pointer">
                      <div className="w-5 h-5 bg-white/40 rounded-sm" />
                    </div>
                 ))}
               </div>
            </div>
            
            <div className="md:col-span-2">
              <h4 className="font-display text-2xl mb-10">Explore</h4>
              <ul className="space-y-6 opacity-70 font-body text-sm">
                <li><Link href="#" className="hover:opacity-100 transition-opacity">About Us</Link></li>
                <li><Link href="#" className="hover:opacity-100 transition-opacity">Collections</Link></li>
                <li><Link href="#" className="hover:opacity-100 transition-opacity">Size Guide</Link></li>
                <li><Link href="#" className="hover:opacity-100 transition-opacity">Store Locator</Link></li>
              </ul>
            </div>

            <div className="md:col-span-5">
              <h4 className="font-display text-2xl mb-10">Join Our Universe</h4>
              <p className="opacity-70 text-sm mb-10 font-body">Subscribe for early access to drops and exclusive offers.</p>
              <div className="flex gap-3 p-2 bg-white/10 rounded-full border border-white/20 focus-within:border-white/50 transition-all">
                <input type="email" placeholder="Email address" className="bg-transparent px-6 py-3 flex-grow outline-none placeholder:text-white/40 text-sm" />
                <button className="px-8 py-3 bg-white text-zuzu-purple rounded-full font-bold text-sm hover:bg-zuzu-pink hover:text-white transition-all">
                  Join
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-20 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-10 opacity-50 text-[10px] uppercase tracking-widest font-bold">
            <p>© 2024 Zuzu Minis Studio. All Rights Reserved.</p>
            <div className="flex gap-10">
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Terms of Service</Link>
              <Link href="#">Refund Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
