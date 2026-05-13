"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Wind, Drop, Sun, CoatHanger, Flower, Sparkle } from "@phosphor-icons/react";

const careSections = [
  {
    id: "cotton",
    title: "Organic Cotton & Basics",
    icon: <Flower className="w-10 h-10 text-green-500" />,
    desc: "Our organic cotton is soft and breathable. To keep it that way, treat it with kindness.",
    tips: [
      { icon: <Drop />, text: "Wash in cold water with a gentle, eco-friendly detergent." },
      { icon: <Sun />, text: "Air dry in the shade to prevent fading and save energy." },
      { icon: <Sparkle />, text: "Iron on low heat if needed, avoiding any prints." }
    ]
  },
  {
    id: "knits",
    title: "Boutique Knits & Wool",
    icon: <CoatHanger className="w-10 h-10 text-zuzu-orange" />,
    desc: "Knitted pieces are delicate and can lose their shape if handled roughly.",
    tips: [
      { icon: <Drop />, text: "Hand wash only in cool water. Never wring or twist." },
      { icon: <Wind />, text: "Lay flat to dry on a clean towel to maintain shape." },
      { icon: <Sparkle />, text: "Store folded, never on a hanger, to prevent stretching." }
    ]
  },
  {
    id: "signature",
    title: "Signature & Special Sets",
    icon: <Sparkle className="w-10 h-10 text-zuzu-pink" />,
    desc: "For pieces with lace, velvet, or fine detailing, extra care is required.",
    tips: [
      { icon: <Drop />, text: "Use a mesh laundry bag if machine washing on a delicate cycle." },
      { icon: <Wind />, text: "Steam lightly rather than ironing to protect textures." },
      { icon: <Flower />, text: "Always turn garments inside out before washing." }
    ]
  }
];

export default function CareGuidePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />

      <section className="pt-40 pb-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-zuzu-blue font-bold uppercase tracking-[0.3em] text-xs mb-4"
            >
              The Zuzu Promise
            </motion.p>
            <h1 className="text-5xl md:text-7xl font-display text-black mb-6">Care with Love</h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
              Our clothes are designed to be part of your family's story for years to come. 
              Following these simple care steps ensures they stay as magical as the day they arrived.
            </p>
          </div>

          <div className="space-y-32">
            {careSections.map((section, idx) => (
              <motion.div 
                key={section.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-16 items-center`}
              >
                <div className="flex-1 space-y-8">
                  <div className="w-20 h-20 bg-white rounded-[30px] shadow-sm flex items-center justify-center border border-black/5">
                    {section.icon}
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-display text-black mb-4">{section.title}</h2>
                    <p className="text-gray-500 leading-relaxed text-lg">{section.desc}</p>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    {section.tips.map((tip, i) => (
                      <div key={i} className="flex items-start gap-4 group">
                        <div className="w-10 h-10 rounded-xl bg-butter flex items-center justify-center text-zuzu-blue group-hover:bg-zuzu-blue group-hover:text-white transition-colors flex-shrink-0">
                          {React.cloneElement(tip.icon as any, { size: 20, weight: "bold" })}
                        </div>
                        <p className="text-sm text-gray-600 pt-2">{tip.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-1 w-full aspect-square relative rounded-[60px] overflow-hidden bg-white/40 border-8 border-white shadow-2xl">
                   {/* We can add relevant images here later, for now using a soft themed div */}
                   <div className={`absolute inset-0 bg-gradient-to-br ${idx === 0 ? "from-green-50 to-white" : idx === 1 ? "from-orange-50 to-white" : "from-pink-50 to-white"} flex items-center justify-center opacity-50`}>
                      <div className="scale-150 opacity-20">
                        {React.cloneElement(section.icon as any, { size: 200 })}
                      </div>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Callout */}
          <div className="mt-32 p-12 bg-black rounded-[50px] text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-20 rotate-12">
              <Sparkle size={120} weight="fill" />
            </div>
            <h3 className="text-3xl font-display mb-6">Need more help?</h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">Our boutique team is always available to answer any specific care questions you might have.</p>
            <a href="/contact" className="inline-block bg-zuzu-blue text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] hover:scale-105 transition-transform shadow-lg">
              Contact Support
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
