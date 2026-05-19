import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <Navbar />
      <div className="h-[100px]" /> {/* Spacer */}

      <div className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="font-display text-5xl md:text-7xl text-zuzu-blue mb-8">Privacy Policy</h1>
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-16">Last Updated: May 2026</p>

        <div className="prose prose-lg prose-gray max-w-none text-gray-600 space-y-8 font-light">
          <section>
            <h2 className="font-display text-3xl text-gray-900 mb-4">1. Information We Collect</h2>
            <p>
              At Zuzu Minis, we prioritize your privacy. We collect information you provide directly to us, such as when you create or modify your account, make a purchase, request customer support, or communicate with us. This information may include your name, email address, phone number, postal address, payment information, and any other information you choose to provide.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to deliver, maintain, and improve our services, including to process transactions, send you related information such as confirmations and invoices, and provide customer support. We may also use the information to send you promotional communications, such as newsletters and special offers, if you have opted in to receive them.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl text-gray-900 mb-4">3. Sharing of Information</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except to provide products or services you've requested, when we have your permission, or under certain circumstances, such as trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl text-gray-900 mb-4">4. Security</h2>
            <p>
              We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information. However, no internet or email transmission is ever fully secure or error-free.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl text-gray-900 mb-4">5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at support@zuzuminis.com or visit us at our Bengaluru boutique.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
