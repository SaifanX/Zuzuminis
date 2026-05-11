import { useState } from "react";
import { Star, Heart, Share2, Ruler, ShoppingCart, X } from "lucide-react";

import { useCart } from "@/context/CartContext";

interface ProductInfoProps {
  product: {
    _id: string;
    name: string;
    price: number;
    description: string;
    images: string[];
    slug: string;
    details?: string;
  };
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("default");
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const sizes = ["0-3M", "3-6M", "6-12M", "1-2Y", "2-3Y", "3-4Y"];
  const colors = [
    { id: "default", hex: "#FF9D66" }, // zuzu-orange light
    { id: "pink", hex: "#FBCFE8" },
    { id: "blue", hex: "#BFDBFE" },
    { id: "yellow", hex: "#FEF08A" },
  ];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size first!");
      return;
    }
    
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      slug: product.slug,
      quantity: 1,
      size: selectedSize
    });
  };

  return (
    <div className="flex flex-col h-full py-4 md:py-10 md:px-8">
      {/* Reviews & Badges */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-1 text-zuzu-yellow">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
          <span className="text-gray-400 text-sm ml-2">(42 reviews)</span>
        </div>
        <div className="flex gap-3">
          <button className="w-10 h-10 rounded-full bg-butter border border-black/5 flex items-center justify-center hover:bg-zuzu-pink hover:text-white transition-colors group">
            <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>
          <button 
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-butter border border-black/5 flex items-center justify-center hover:bg-zuzu-blue hover:text-white transition-colors group"
          >
            <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      {/* Title & Price */}
      <h1 className="text-4xl md:text-5xl font-display text-gray-900 mb-4 leading-tight">{product.name}</h1>
      <p className="text-3xl font-bold text-zuzu-orange mb-8">₹{product.price}</p>

      {/* Description */}
      <p className="text-gray-500 font-body leading-relaxed mb-10">
        {product.description}
      </p>

      {/* Color Selector */}
      <div className="mb-8">
        <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-widest text-xs">Select Color</h3>
        <div className="flex gap-4">
          {colors.map(color => (
            <button
              key={color.id}
              onClick={() => setSelectedColor(color.id)}
              className={`w-12 h-12 rounded-full border-2 transition-transform hover:scale-110 ${
                selectedColor === color.id ? "border-gray-900 scale-110 shadow-md" : "border-transparent shadow-sm"
              }`}
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>
      </div>

      {/* Size Selector */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-900 uppercase tracking-widest text-xs">
            Select Size {selectedSize && <span className="ml-2 text-zuzu-blue">— {selectedSize}</span>}
          </h3>
          <button 
            onClick={() => setIsSizeGuideOpen(true)}
            className="text-xs text-gray-400 hover:text-zuzu-blue flex items-center gap-1 font-bold underline transition-colors"
          >
            <Ruler className="w-3 h-3" /> Size Guide
          </button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {sizes.map(size => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`py-3 rounded-xl font-bold text-sm transition-all ${
                selectedSize === size 
                  ? "bg-zuzu-blue text-white shadow-lg scale-105" 
                  : "bg-white/50 text-gray-600 hover:bg-white border border-black/5"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Add to Cart CTA */}
      <div className="mt-auto pt-8 border-t border-gray-100">
        <button 
          className="w-full py-5 bg-zuzu-pink text-white rounded-full font-bold text-lg shadow-xl shadow-pink-200 hover:scale-[1.02] transition-transform flex items-center justify-center gap-3 active:scale-95"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-6 h-6" />
          Add to Cart - ₹{product.price}
        </button>
        
        <div className="mt-6 flex justify-center gap-8 text-xs font-bold text-gray-400 uppercase tracking-widest">
           <span className="flex items-center gap-2">✓ Free Shipping</span>
           <span className="flex items-center gap-2">✓ Easy Returns</span>
        </div>
      </div>

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsSizeGuideOpen(false)} />
          <div className="bg-butter rounded-[2rem] w-full max-w-lg relative z-10 p-8 shadow-2xl overflow-hidden">
            <button 
              onClick={() => setIsSizeGuideOpen(false)}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>

            <h2 className="text-3xl font-display text-gray-900 mb-8">Size Guide</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 uppercase tracking-widest text-[10px]">
                    <th className="pb-4 font-bold">Size</th>
                    <th className="pb-4 font-bold">Age</th>
                    <th className="pb-4 font-bold">Height (cm)</th>
                    <th className="pb-4 font-bold">Weight (kg)</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 font-medium">
                  <tr className="border-b border-gray-50"><td className="py-4 font-bold text-gray-900">0-3M</td><td className="py-4">0-3 Months</td><td className="py-4">50-60</td><td className="py-4">3-5</td></tr>
                  <tr className="border-b border-gray-50"><td className="py-4 font-bold text-gray-900">3-6M</td><td className="py-4">3-6 Months</td><td className="py-4">60-68</td><td className="py-4">5-7</td></tr>
                  <tr className="border-b border-gray-50"><td className="py-4 font-bold text-gray-900">6-12M</td><td className="py-4">6-12 Months</td><td className="py-4">68-80</td><td className="py-4">7-10</td></tr>
                  <tr className="border-b border-gray-50"><td className="py-4 font-bold text-gray-900">1-2Y</td><td className="py-4">1-2 Years</td><td className="py-4">80-92</td><td className="py-4">10-13</td></tr>
                  <tr className="border-b border-gray-50"><td className="py-4 font-bold text-gray-900">2-3Y</td><td className="py-4">2-3 Years</td><td className="py-4">92-98</td><td className="py-4">13-15</td></tr>
                  <tr><td className="py-4 font-bold text-gray-900">3-4Y</td><td className="py-4">3-4 Years</td><td className="py-4">98-104</td><td className="py-4">15-18</td></tr>
                </tbody>
              </table>
            </div>

            <p className="mt-8 text-xs text-gray-400 italic">
              * Measurements are approximate and may vary slightly by style. If between sizes, we recommend sizing up.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

