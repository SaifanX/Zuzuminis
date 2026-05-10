"use client";

import { useState } from "react";
import { Star, Heart, Share2, Ruler } from "lucide-react";

interface ProductInfoProps {
  product: {
    _id: string;
    name: string;
    price: number;
    description: string;
    details?: string;
  };
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("default");

  const sizes = ["0-3M", "3-6M", "6-12M", "1-2Y", "2-3Y", "3-4Y"];
  const colors = [
    { id: "default", hex: "#00E5BC" }, // zuzu-teal light
    { id: "pink", hex: "#FBCFE8" },
    { id: "blue", hex: "#BFDBFE" },
    { id: "yellow", hex: "#FEF08A" },
  ];

  return (
    <div className="flex flex-col h-full py-4 md:py-10 md:px-8">
      {/* Reviews & Badges */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-1 text-zuzu-yellow">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
          <span className="text-gray-400 text-sm ml-2">(42 reviews)</span>
        </div>
        <div className="flex gap-3">
          <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-zuzu-pink hover:text-white transition-colors">
            <Heart className="w-4 h-4" />
          </button>
          <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Title & Price */}
      <h1 className="text-4xl md:text-5xl font-display text-gray-900 mb-4 leading-tight">{product.name}</h1>
      <p className="text-3xl font-bold text-zuzu-teal mb-8">₹{product.price}</p>

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
          <h3 className="font-bold text-gray-900 uppercase tracking-widest text-xs">Select Size</h3>
          <button className="text-xs text-gray-400 hover:text-zuzu-teal flex items-center gap-1 font-bold underline">
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
                  ? "bg-gray-900 text-white shadow-lg scale-105" 
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
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
          className="w-full py-5 bg-zuzu-pink text-white rounded-full font-bold text-lg shadow-xl shadow-pink-200 hover:scale-[1.02] transition-transform flex items-center justify-center gap-3"
          onClick={() => {
            if (!selectedSize) alert("Please select a size first!");
            else alert("Added to cart! (Glitter effect coming soon)");
          }}
        >
          <ShoppingCart className="w-6 h-6" />
          Add to Cart - ₹{product.price}
        </button>
        
        <div className="mt-6 flex justify-center gap-8 text-xs font-bold text-gray-400 uppercase tracking-widest">
           <span className="flex items-center gap-2">✓ Free Shipping</span>
           <span className="flex items-center gap-2">✓ Easy Returns</span>
        </div>
      </div>
    </div>
  );
}

// Need to import ShoppingCart
import { ShoppingCart } from "lucide-react";
