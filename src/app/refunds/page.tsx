import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function RefundsPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <Navbar />
      <div className="h-[100px]" /> {/* Spacer */}

      <div className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="font-display text-5xl md:text-7xl text-zuzu-blue mb-8">Return & Refund Policy</h1>
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-16">Last Updated: May 2026</p>

        <div className="prose prose-lg prose-gray max-w-none text-gray-600 space-y-8 font-light">
          <section>
            <h2 className="font-display text-3xl text-gray-900 mb-4">1. Return Window</h2>
            <p>
              We want you to love your Zuzu Minis purchase! If you are not completely satisfied, you may return unused, unwashed items in their original condition and packaging within 14 days of delivery for a full refund or exchange.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl text-gray-900 mb-4">2. Non-Returnable Items</h2>
            <p>
              For hygiene reasons, certain items such as underwear, socks, and personalized/custom-made garments cannot be returned unless they are defective upon arrival. Sale items are also considered final sale and are not eligible for return or exchange.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl text-gray-900 mb-4">3. Return Process</h2>
            <p>
              To initiate a return, please contact our support team at support@zuzuminis.com with your order number. We will provide you with a return authorization and shipping instructions. Please note that return shipping costs are the responsibility of the customer unless the item received was incorrect or defective.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl text-gray-900 mb-4">4. Refunds</h2>
            <p>
              Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 5-7 business days.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl text-gray-900 mb-4">5. Exchanges</h2>
            <p>
              If you need a different size or color, the fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
