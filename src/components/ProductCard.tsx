"use client";

import { Heart, Star } from "lucide-react";

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
    category?: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card group cursor-pointer flex flex-col h-full">
      <div className="aspect-[4/5] bg-gray-50 rounded-2xl overflow-hidden mb-6 relative">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        
        {/* Hover overlay with Add to Cart */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <button className="bg-white text-zuzu-purple font-bold py-3 px-6 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-zuzu-purple hover:text-white">
            Quick Add
          </button>
        </div>

        {/* Wishlist Button */}
        <div className="absolute top-4 right-4 translate-x-12 group-hover:translate-x-0 transition-transform duration-300 delay-100">
          <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-zuzu-pink hover:text-white transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="text-center flex-grow flex flex-col justify-end">
        <div className="flex justify-center gap-1 text-zuzu-yellow mb-2">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
        </div>
        <h3 className="text-lg font-display text-gray-900 mb-1">{product.name}</h3>
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">{product.category}</p>
        <p className="text-zuzu-purple font-bold text-lg">₹{product.price}</p>
      </div>
    </div>
  );
}
