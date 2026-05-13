"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Envelope, MapPin, Phone, InstagramLogo, WhatsappLogo } from "@phosphor-icons/react";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />

      <section className="pt-40 pb-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

            {/* Left Side: Info */}
            <div className="space-y-12">
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-zuzu-blue font-bold uppercase tracking-[0.3em] text-xs mb-4"
                >
                  Get in Touch
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-5xl md:text-7xl font-display text-black mb-6"
                >
                  We'd Love to <br />Hear from You
                </motion.h1>
                <p className="text-gray-500 text-lg max-w-md">
                  Have a question about a size, a collection, or just want to say hi?
                  Our team is here to help make your shopping experience magical.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: <Envelope className="w-6 h-6" />, label: "Email Us", value: "hello@zuzuminis.com" },
                  { icon: <WhatsappLogo className="w-6 h-6" />, label: "WhatsApp", value: "+91 97408 24499" },
                  { icon: <InstagramLogo className="w-6 h-6" />, label: "Follow Us", value: "@zuzuminis" },
                  { icon: <MapPin className="w-6 h-6" />, label: "Visit Our Studio", value: " 1ST FLOOR, 3/1, Kathriguppe Main Rd, Kathreguppe, Banashankari 3rd Stage, Banashankari, Bengaluru, Karnataka 560085, India" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                    className="flex items-center gap-6 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-zuzu-blue group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{item.label}</p>
                      <p className="text-black font-medium">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Side: Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white/60 backdrop-blur-md p-8 md:p-12 rounded-[40px] shadow-xl border border-white"
            >
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Name</label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full bg-butter/30 border border-black/5 rounded-2xl px-6 py-4 outline-none focus:border-zuzu-blue transition-colors font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Email</label>
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full bg-butter/30 border border-black/5 rounded-2xl px-6 py-4 outline-none focus:border-zuzu-blue transition-colors font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us about your little one..."
                    className="w-full bg-butter/30 border border-black/5 rounded-2xl px-6 py-4 outline-none focus:border-zuzu-blue transition-colors font-medium resize-none"
                  />
                </div>

                <button className="w-full bg-black text-white rounded-2xl py-5 font-bold uppercase tracking-[0.2em] text-xs hover:bg-gray-900 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg">
                  Send Message
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
