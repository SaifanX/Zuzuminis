import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const searghy = localFont({
  src: [
    {
      path: "../fonts/Searghy.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-searghy",
});

const kiddos = localFont({
  src: [
    {
      path: "../fonts/Kiddos-Demo.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-kiddos",
});

import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/CartDrawer";
import { UserSync } from "@/components/UserSync";
import { ChildOnboarding } from "@/components/ChildOnboarding";

export const metadata: Metadata = {
  title: "Zuzu Minis | Premium Kidswear",
  description: "Hand-crafted comfort for your little ones.",
  icons: {
    icon: [
      { url: "/favicon.ico?v=10" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

import { MagicRipple } from "@/components/MagicRipple";
import { BoutiqueBackground } from "@/components/BoutiqueBackground";
import { PostHogProvider } from "@/context/PostHogProvider";
import PostHogPageView from "@/components/PostHogPageView";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${searghy.variable} ${kiddos.variable} ${outfit.variable} antialiased`} suppressHydrationWarning>
        <PostHogProvider>
          <Suspense fallback={null}>
            <PostHogPageView />
          </Suspense>
          <ConvexClientProvider>
          <CartProvider>
            <UserSync />
            <ChildOnboarding />
            <CartDrawer />
            <MagicRipple />
            <div className="relative min-h-screen bg-butter overflow-hidden">
              <BoutiqueBackground />
              <div className="relative z-10">
                {children}
              </div>
            </div>
          </CartProvider>
        </ConvexClientProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
