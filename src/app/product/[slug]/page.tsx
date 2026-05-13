"use client";

import { useRef, use } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductInfo } from "@/components/ProductInfo";
import { useParams, notFound } from "next/navigation";

export default function ProductPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const product = useQuery(api.products.getBySlug, slug ? { slug } : "skip");

  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (product) {
      gsap.from(".product-gallery-anim", { x: -50, opacity: 0, duration: 0.8, ease: "power3.out", clearProps: "all" });
      gsap.from(".product-info-anim", { x: 50, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.2, clearProps: "all" });
    }
  }, { scope: container, dependencies: [product] });

  if (product === undefined) {
    return (
      <div className="min-h-screen bg-butter flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-zuzu-blue border-t-transparent animate-spin mb-4" />
          <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Loading Magic...</p>
        </div>
      </div>
    );
  }

  if (product === null) {
    return notFound();
  }

  return (
    <main ref={container} className="relative min-h-screen selection:bg-zuzu-blue selection:text-white overflow-hidden">
      <Navbar />
      
      {/* Spacer */}
      <div className="h-[120px]" />

      <div className="max-w-7xl mx-auto px-6 mb-24 relative z-10">
        {/* Breadcrumbs */}
        <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8 flex gap-2">
           <a href="/" className="hover:text-zuzu-blue transition-colors">Home</a> 
           <span>/</span> 
           <a href="/shop" className="hover:text-zuzu-blue transition-colors">Shop</a> 
           <span>/</span> 
           <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <div className="product-gallery-anim">
            <ProductGallery images={product.images} />
          </div>
          <div className="product-info-anim">
            <ProductInfo product={product as any} />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
