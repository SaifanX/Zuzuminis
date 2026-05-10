"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-6 h-full">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-x-visible">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setMainImage(img)}
            className={`w-20 h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
              mainImage === img ? "border-zuzu-blue" : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <div className="w-full h-full relative">
              <Image 
                src={img} 
                alt={`Thumbnail ${i}`} 
                fill
                sizes="80px"
                className="object-cover bg-gray-50" 
              />
            </div>
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-grow bg-[#F8F9FA] rounded-[2rem] overflow-hidden relative flex items-center justify-center min-h-[400px] md:min-h-[600px]">
        {/* Studio Lighting Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white via-gray-50 to-[#EAEAEA] opacity-80" />
        
        <div className="relative z-10 w-full h-full p-8">
          <Image 
            src={mainImage} 
            alt="Product main" 
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain drop-shadow-2xl transition-all duration-500 ease-in-out p-12" 
          />
        </div>
      </div>
    </div>
  );
}

