import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function DeliveriesPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <Navbar />
      <div className="h-[100px]" /> {/* Spacer */}

      <div className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="font-display text-5xl md:text-7xl text-zuzu-blue mb-8">Shipping & Deliveries</h1>
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-16">Last Updated: May 2026</p>

        <div className="prose prose-lg prose-gray max-w-none text-gray-600 space-y-8 font-light">
          <section>
            <h2 className="font-display text-3xl text-gray-900 mb-4">1. Processing Time</h2>
            <p>
              We know how excited you are to receive your Zuzu Minis order! All orders are processed and packed within 1-2 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl text-gray-900 mb-4">2. Domestic Shipping Rates and Estimates</h2>
            <p>
              Shipping charges for your order will be calculated and displayed at checkout. We offer standard shipping (3-5 business days) across India. Orders above ₹1,499 qualify for complimentary free standard shipping. 
            </p>
            <p className="mt-4">
              <strong>Express Shipping:</strong> Expedited shipping (1-2 business days) is available for select pin codes for an additional fee at checkout.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl text-gray-900 mb-4">3. Local Delivery (Bengaluru)</h2>
            <p>
              For our local customers in Bengaluru, we offer next-day delivery on all orders placed before 2:00 PM IST. Our delivery partners ensure your little one's outfits arrive safely and promptly.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl text-gray-900 mb-4">4. How do I check the status of my order?</h2>
            <p>
              When your order has shipped, you will receive an email and WhatsApp notification from us which will include a tracking number you can use to check its status. Please allow 24 hours for the tracking information to become available.
            </p>
            <p className="mt-4">
              If you haven't received your order within 5 days of receiving your shipping confirmation email, please contact us at support@zuzuminis.com with your name and order number, and we will look into it for you.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl text-gray-900 mb-4">5. Damages and Issues</h2>
            <p>
              In the event that your order arrives damaged in any way, please email us as soon as possible at support@zuzuminis.com with your order number and a photo of the item's condition. We address these on a case-by-case basis but will try our best to work towards a satisfactory solution.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
