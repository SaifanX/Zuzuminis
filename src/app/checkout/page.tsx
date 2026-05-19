"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckoutLayout } from "@/components/CheckoutLayout";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <Navbar />
      
      {/* Spacer for fixed navbar */}
      <div className="h-[100px]" />

      <CheckoutLayout />

      <Footer />
    </main>
  );
}
