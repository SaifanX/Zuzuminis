import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShopLayout } from "@/components/ShopLayout";

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Spacer for fixed navbar */}
      <div className="h-[100px]" />

      <ShopLayout />

      <Footer />
    </main>
  );
}
