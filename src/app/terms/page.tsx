import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <Navbar />
      <div className="h-[100px]" /> {/* Spacer */}

      <div className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="font-display text-5xl md:text-7xl text-zuzu-blue mb-8">Terms of Service</h1>
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-16">Last Updated: May 2026</p>

        <div className="prose prose-lg prose-gray max-w-none text-gray-600 space-y-8 font-light">
          <section>
            <h2 className="font-display text-3xl text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Zuzu Minis website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this website's particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl text-gray-900 mb-4">2. Description of Service</h2>
            <p>
              Zuzu Minis provides premium, sustainable kidswear and related accessories. We reserve the right to modify or discontinue, temporarily or permanently, the service with or without notice to the user.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl text-gray-900 mb-4">3. Intellectual Property</h2>
            <p>
              All content included on this site, such as text, graphics, logos, button icons, images, and software, is the property of Zuzu Minis or its content suppliers and protected by international copyright laws.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl text-gray-900 mb-4">4. Product Availability and Pricing</h2>
            <p>
              We strive to ensure that all details, descriptions, and prices which appear on this website are accurate. However, errors may occur. If we discover an error in the price of any goods which you have ordered, we will inform you of this as soon as possible and give you the option of reconfirming your order at the correct price or cancelling it.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl text-gray-900 mb-4">5. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in Bengaluru.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
