"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Star, ShieldCheck } from "@phosphor-icons/react";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-zuzu-pink font-bold uppercase tracking-[0.3em] text-xs mb-4"
          >
            Since 2024
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display text-black mb-8"
          >
            Our Little Story
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative w-full h-[400px] md:h-[600px] rounded-[40px] overflow-hidden shadow-2xl border-8 border-white"
          >
            <Image 
              src="/boutique_studio_story_1778661403327.png" 
              alt="Zuzu Minis Studio" 
              fill 
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6 relative z-10 bg-white/40 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display text-black mb-6">Designed with Love, Made for Magic</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-12">
            Zuzu Minis was born from a simple belief: that every child deserves to feel as special as they are. 
            We curate high-end, boutique collections that combine timeless elegance with the everyday comfort 
            your little ones need for their biggest adventures.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
            {[
              { 
                icon: <Heart weight="fill" className="w-8 h-8 text-zuzu-pink" />, 
                title: "Premium Quality", 
                desc: "We hand-select only the softest, most durable fabrics." 
              },
              { 
                icon: <Star weight="fill" className="w-8 h-8 text-zuzu-blue" />, 
                title: "Unique Design", 
                desc: "Boutique styles you won't find on every high-street shelf." 
              },
              { 
                icon: <ShieldCheck weight="fill" className="w-8 h-8 text-green-500" />, 
                title: "Ethical Sourcing", 
                desc: "Responsibly made because we care about their future." 
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 rounded-3xl bg-white shadow-sm flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-display text-xl">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-6xl text-zuzu-blue/20 font-serif">"</span>
          <p className="text-2xl md:text-3xl font-display italic text-black/80 leading-snug">
            We don't just sell clothes; we help create the memories that will last a lifetime.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="w-12 h-[1px] bg-black/10" />
            <p className="font-bold uppercase tracking-widest text-[10px]">The Zuzu Team</p>
            <div className="w-12 h-[1px] bg-black/10" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
