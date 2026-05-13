"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Navbar } from "@/components/Navbar";
import { GrainOverlay } from "@/components/GrainOverlay";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { ShoppingBag, ArrowRight, Heart, Star, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { HeroBento, Cloud, Squiggle } from "@/components/HeroBento";
import { ProductCard } from "@/components/ProductCard";
import { motion } from "framer-motion";
import { WobblyNewsletterBg } from "@/components/WobblyNewsletterBg";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const products = useQuery(api.products.list, {});
  const container = useRef<HTMLDivElement>(null);
  const subscribe = useMutation(api.subscribers.subscribe);
  const [phone, setPhone] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async () => {
    const isNumeric = /^\d+$/.test(phone);
    if (!phone || !isNumeric || phone.length < 10 || phone.length > 12) {
      alert("Please enter a valid phone number (10-12 digits)");
      return;
    }
    await subscribe({ phone });
    setIsSubscribed(true);
    setPhone("");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 12) {
      setPhone(value);
    }
  };

  useGSAP(() => {
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
      <HeroBento />

      {/* NEW ARRIVALS */}
      <section className="bg-butter relative py-24 overflow-hidden">
        {/* Transition Cloud */}
        <div className="absolute top-0 left-0 w-full h-32 bg-butter cloud-separator z-10" />
        
        {/* BACKGROUND DECOR */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <motion.div 
            animate={{ x: [-200, 1800] }}
            transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
            className="absolute top-[10%] w-[600px] opacity-[0.4]"
          >
            <Cloud color="#4D96FF" />
          </motion.div>
          <motion.div 
            animate={{ x: [1800, -200] }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[20%] w-[500px] opacity-[0.4]"
          >
            <Cloud color="#FF66A1" />
          </motion.div>
          <div className="absolute top-[40%] left-[10%] w-40 opacity-[0.4]">
            <Squiggle color="#FFD200" rotation={15} strokeWidth={14} />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-5xl font-display text-zuzu-pink mb-4">New Arrivals</h2>
              <p className="text-black/70 font-body text-lg">Fresh picks for your little ones</p>
            </div>
            <button className="px-8 py-3 bg-white text-zuzu-pink rounded-full font-bold shadow-soft hover:scale-105 transition-transform">
              Shop All
            </button>
          </div>

          <div className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products?.slice(0, 4).map((product) => (
              <div key={product._id} className="product-card group cursor-pointer">
                <div className="aspect-[4/5] bg-white rounded-3xl overflow-hidden mb-6 relative border border-black/5 shadow-sm">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-display text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-zuzu-pink font-bold">₹{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR KIDS STYLES */}
      <section className="bg-butter relative py-24 overflow-hidden">
        {/* Transition Cloud */}
        <div className="absolute top-0 left-0 w-full h-32 bg-butter cloud-separator z-10" />
        
        {/* BACKGROUND DECOR */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <motion.div 
            animate={{ y: [0, 50, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[5%] right-[5%] w-[700px] opacity-[0.4]"
          >
            <Cloud color="#FF66A1" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] left-[5%] w-[400px] opacity-[0.4]"
          >
            <Cloud color="#4D96FF" />
          </motion.div>
          <div className="absolute bottom-[20%] right-[15%] w-48 opacity-[0.4]">
            <Squiggle color="#4D96FF" rotation={-10} strokeWidth={14} />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-5xl font-display text-zuzu-blue mb-4">Popular Mini Styles</h2>
              <p className="text-black/70 font-body text-lg">What everyone is loving right now</p>
            </div>
            <button className="px-8 py-3 bg-white text-zuzu-blue rounded-full font-bold shadow-soft hover:scale-105 transition-transform">
              View Trends
            </button>
          </div>

          <div className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products?.slice(4, 8).map((product) => (
              <div key={product._id} className="product-card group cursor-pointer">
                <div className="aspect-[4/5] bg-white rounded-3xl overflow-hidden mb-6 relative border border-black/5 shadow-sm">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-display text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-zuzu-blue font-bold">₹{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CLOUD TRANSITION */}
      <div className="h-32 bg-butter cloud-separator" />

      {/* NEWSLETTER */}
      <section className="relative py-48 overflow-hidden z-10">
        <WobblyNewsletterBg />

        {/* TOP/BOTTOM CLOUD TRANSITIONS */}
        <div className="absolute top-0 left-0 w-full h-32 bg-butter cloud-top z-30" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-butter cloud-separator z-30" />

        <div className="max-w-2xl mx-auto text-center relative z-40 px-8">
          <h2 className="text-5xl font-display text-white mb-8 drop-shadow-lg">Join the Zuzu Universe</h2>
          <p className="text-white/90 mb-12 font-body font-medium drop-shadow-md">Be the first to hear about new drops and exclusive member-only styles.</p>
          
          {isSubscribed ? (
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border border-white/30">
              <h3 className="text-2xl font-display text-white">You're in! 🚀</h3>
              <p className="text-white/80 mt-2">Get ready for something mini and magical.</p>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="tel" 
                value={phone}
                onChange={handlePhoneChange}
                placeholder="Your mobile number" 
                className="flex-grow px-8 py-5 rounded-full bg-white/20 border border-white/30 text-white placeholder:text-white/60 outline-none focus:border-white/50 transition-all backdrop-blur-sm" 
              />
              <button 
                onClick={handleSubscribe}
                className="px-10 py-5 bg-zuzu-pink text-white rounded-full font-bold shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                Join Now
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
