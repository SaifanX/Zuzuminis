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
import { HeroBento } from "@/components/HeroBento";
import { ProductCard } from "@/components/ProductCard";

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

      {/* THE BENTO HERO (Replaces standard hero) */}
      <HeroBento />

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

      {/* Clean space between sections */}
      <div className="py-12 bg-butter" />

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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 mb-16">
            {products?.slice(0, 8).map((product, i) => (
              <div key={product._id} className="relative">
                {i < 3 && (
                  <div className="absolute -top-4 -left-2 z-20 bg-zuzu-orange text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg transform -rotate-12 border-2 border-white">
                    BEST SELLER
                  </div>
                )}
                <ProductCard product={product} />
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
