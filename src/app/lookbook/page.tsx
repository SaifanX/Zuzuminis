"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import Image from "next/image";

const lookbookItems = [
  {
    title: "Golden Hour Garden",
    desc: "Soft linens and gentle play in the afternoon sun.",
    img: "/lookbook_lifestyle_1_1778662885657.png",
    colSpan: "lg:col-span-2",
    rowSpan: "row-span-2"
  },
  {
    title: "Velvet Dreams",
    desc: "Luxury textures for the most special occasions.",
    img: "/lookbook_lifestyle_2_1778662922014.png",
    colSpan: "lg:col-span-1",
    rowSpan: "row-span-1"
  },
  {
    title: "Urban Explorer",
    desc: "Modern denim for the little adventurer.",
    img: "/lookbook_lifestyle_3_1778662948719.png",
    colSpan: "lg:col-span-1",
    rowSpan: "row-span-1"
  },
  {
    title: "The Classics",
    desc: "Timeless basics that never go out of style.",
    img: "/assets/products/product_shortset.png",
    colSpan: "lg:col-span-1",
    rowSpan: "row-span-1"
  }
];

export default function LookbookPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />

      <section className="pt-40 pb-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-zuzu-pink font-bold uppercase tracking-[0.3em] text-xs mb-4"
              >
                Spring / Summer 2024
              </motion.p>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-8xl font-display text-black"
              >
                The Little <br/>Collection
              </motion.h1>
            </div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 text-sm max-w-xs uppercase tracking-widest font-bold leading-relaxed"
            >
              A visual journey through the moments that define childhood.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[300px] md:auto-rows-[400px] gap-8">
            {lookbookItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`group relative overflow-hidden rounded-[40px] shadow-2xl ${item.colSpan} ${item.rowSpan}`}
              >
                <Image 
                  src={item.img} 
                  alt={item.title} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-12">
                  <h3 className="text-white text-3xl font-display mb-2">{item.title}</h3>
                  <p className="text-white/70 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Editorial Text */}
          <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
             <div className="relative aspect-square rounded-full overflow-hidden border-8 border-white shadow-2xl">
                <Image 
                  src="/boutique_studio_story_1778661403327.png" 
                  alt="Editorial" 
                  fill 
                  className="object-cover"
                />
             </div>
             <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-display text-black leading-tight">Crafted for the Dreamers</h2>
                <p className="text-gray-500 text-lg leading-relaxed">
                  Every stitch in our collection tells a story of comfort, sustainability, and style. 
                  We believe that the clothes they wear should be as vibrant and imaginative as the 
                  worlds they create every day.
                </p>
                <div className="flex gap-4">
                   <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center">
                      <span className="text-xs font-bold uppercase tracking-widest">01</span>
                   </div>
                   <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center">
                      <span className="text-xs font-bold uppercase tracking-widest">02</span>
                   </div>
                   <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center">
                      <span className="text-xs font-bold uppercase tracking-widest">03</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
