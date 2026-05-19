import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "../../components/Footer";
import { ShopLayout } from "@/components/ShopLayout";

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <Navbar />
      
      {/* Spacer for fixed navbar */}
      <div className="h-[100px]" />

      <React.Suspense fallback={<div className="h-screen flex items-center justify-center font-display text-zuzu-blue text-2xl animate-pulse">Loading Boutique...</div>}>
        <ShopLayout />
      </React.Suspense>

      <Footer />
    </main>
  );
}
