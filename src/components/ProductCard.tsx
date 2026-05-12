"use client";

import { Heart, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
    slug: string;
    category?: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      slug: product.slug,
      quantity: 1
    });
  };

  return (
    <Link href={`/product/${product.slug}`} className="product-card group cursor-pointer flex flex-col h-full block">
      <div className="aspect-[4/5] bg-butter rounded-2xl overflow-hidden mb-6 relative border border-black/5 shadow-sm">
        <Image 
          src={product.images[0]} 
          alt={product.name} 
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        
        {/* Hover overlay with Add to Cart */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <button 
            onClick={handleAddToCart}
            className="bg-butter text-zuzu-blue font-bold py-3 px-6 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-zuzu-blue hover:text-white"
          >
            Quick Add +
          </button>
        </div>

        {/* Wishlist Button */}
        <div className="absolute top-4 right-4 translate-x-12 group-hover:translate-x-0 transition-transform duration-300 delay-100">
          <button className="w-10 h-10 bg-butter rounded-full shadow-md flex items-center justify-center hover:bg-zuzu-pink hover:text-white transition-colors">
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
        <p className="text-zuzu-orange font-bold text-lg">₹{product.price}</p>
      </div>
    </Link>
  );
}
