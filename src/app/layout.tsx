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

export const metadata: Metadata = {
  title: "Zuzu Minis | Premium Kidswear",
  description: "Hand-crafted comfort for your little ones.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${searghy.variable} ${kiddos.variable} ${outfit.variable} antialiased`}>
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
