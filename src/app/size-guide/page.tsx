"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Ruler, Baby, Smiley, SmileyWink } from "@phosphor-icons/react";

const sizeData: Record<string, any[]> = {
  newborn: [
    { age: "NB", height: "Up to 52cm", weight: "Up to 3.5kg" },
    { age: "0-3M", height: "52-62cm", weight: "3.5-5.5kg" },
    { age: "3-6M", height: "62-68cm", weight: "5.5-7.5kg" },
    { age: "6-12M", height: "68-80cm", weight: "7.5-10kg" }
  ],
  toddler: [
    { age: "1-2Y", height: "80-92cm", weight: "10-13kg" },
    { age: "2-3Y", height: "92-98cm", weight: "13-15kg" },
    { age: "3-4Y", height: "98-104cm", weight: "15-17kg" }
  ],
  kids: [
    { age: "4-5Y", height: "104-110cm", weight: "17-20kg" },
    { age: "5-6Y", height: "110-116cm", weight: "20-23kg" },
    { age: "6-7Y", height: "116-122cm", weight: "23-26kg" }
  ]
};

export default function SizeGuidePage() {
  const [activeTab, setActiveTab] = useState("newborn");
  const [userHeight, setUserHeight] = useState<string>("");
  const [userWeight, setUserWeight] = useState<string>("");

  const getRecommendedSize = () => {
    if (!userHeight && !userWeight) return null;
    const h = parseFloat(userHeight);
    const w = parseFloat(userWeight);
    
    // Find closest match in current data
    return sizeData[activeTab].find(row => {
      const rowH = parseFloat(row.height.match(/\d+/)?.[0] || "0");
      const rowW = parseFloat(row.weight.match(/\d+/)?.[0] || "0");
      if (h && h <= rowH) return true;
      if (w && w <= rowW) return true;
      return false;
    })?.age;
  };

  const recommendedSize = getRecommendedSize();

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />

      <section className="pt-40 pb-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-16 h-16 bg-zuzu-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-zuzu-blue"
            >
              <Ruler weight="fill" className="w-8 h-8" />
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-display text-black mb-4">Finding the Perfect Fit</h1>
            <p className="text-gray-500 text-lg">Input your little one's measurements for a personalized recommendation.</p>
          </div>

          {/* Interactive Recommender Panel */}
          <div className="bg-white/40 backdrop-blur-md rounded-[40px] p-8 mb-12 border border-white shadow-sm">
             <div className="max-w-2xl mx-auto w-full space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 text-center mb-6">Smart Recommender</p>
                <div className="flex gap-4">
                   <div className="flex-1 space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 ml-2">Height (cm)</label>
                      <input 
                        type="number" 
                        value={userHeight}
                        onChange={(e) => setUserHeight(e.target.value)}
                        className="w-full bg-white rounded-2xl px-6 py-4 outline-none focus:border-zuzu-blue border border-black/5" 
                        placeholder="e.g. 60"
                      />
                   </div>
                   <div className="flex-1 space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 ml-2">Weight (kg)</label>
                      <input 
                        type="number" 
                        value={userWeight}
                        onChange={(e) => setUserWeight(e.target.value)}
                        className="w-full bg-white rounded-2xl px-6 py-4 outline-none focus:border-zuzu-blue border border-black/5" 
                        placeholder="e.g. 5"
                      />
                   </div>
                </div>
             </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-12">
            {[
              { id: "newborn", label: "Newborn", icon: <Baby /> },
              { id: "toddler", label: "Toddler", icon: <SmileyWink /> },
              { id: "kids", label: "Big Kid", icon: <Smiley /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold uppercase tracking-widest text-[10px] transition-all ${
                  activeTab === tab.id 
                    ? "bg-black text-white shadow-lg scale-105" 
                    : "bg-white/50 text-gray-400 hover:bg-white"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Table Container */}
          <motion.div 
            layout
            className="bg-white/60 backdrop-blur-md rounded-[40px] shadow-xl border border-white overflow-hidden p-8 md:p-12"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-black/5">
                      <th className="py-4 font-display text-lg text-gray-900">Age / Size</th>
                      <th className="py-4 font-display text-lg text-gray-900">Height</th>
                      <th className="py-4 font-display text-lg text-gray-900">Weight</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                    {sizeData[activeTab].map((row, i) => {
                      const isRecommended = recommendedSize === row.age;
                      return (
                        <tr 
                          key={i} 
                          className={`group transition-all duration-500 ${
                            isRecommended 
                              ? "bg-zuzu-blue/10 scale-[1.02] shadow-sm relative z-10" 
                              : "hover:bg-butter/20"
                          }`}
                        >
                          <td className="py-6 font-bold text-zuzu-blue flex items-center gap-3 pl-4">
                            {row.age}
                            {isRecommended && (
                               <motion.span 
                                 initial={{ scale: 0 }}
                                 animate={{ scale: 1 }}
                                 className="px-2 py-1 bg-zuzu-blue text-white text-[8px] rounded-full uppercase tracking-tighter"
                               >Best Fit</motion.span>
                            )}
                          </td>
                          <td className="py-6 text-gray-600">{row.height}</td>
                          <td className="py-6 text-gray-600">{row.weight}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </motion.div>
            </AnimatePresence>

            <div className="mt-12 p-6 bg-zuzu-pink/5 rounded-3xl border border-zuzu-pink/10">
              <p className="text-xs text-zuzu-pink font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                <span>💡</span> Boutique Tip
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                If your little one is between sizes, we always recommend sizing up for extra comfort and room to grow. 
                Our fabrics are pre-washed to minimize shrinkage.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
