"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import Image from "next/image";

export default function AdminImagesPage() {
  const products = useQuery(api.products.list, {});
  const updateImage = useMutation(api.products.updateImage);
  const [filterNoImage, setFilterNoImage] = useState(false);

  if (!products) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a] text-white">
        <div className="animate-pulse font-light tracking-widest uppercase">Initializing Boutique...</div>
      </div>
    );
  }

  const isPlaceholder = (url: string) => url.includes("/zuzuminis/products/product_");

  const displayedProducts = filterNoImage 
    ? products.filter(p => p.images.some(isPlaceholder) || p.images.length === 0)
    : products;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f7] p-8 md:p-16">
      <header className="mb-16">
        <h1 className="text-5xl md:text-7xl font-extralight tracking-tighter mb-4 italic">
          Media <span className="font-normal not-italic">Vault</span>
        </h1>
        <p className="text-[#86868b] max-w-xl text-lg font-light leading-relaxed">
          Elevate your boutique's visual presence. Curate and upload high-resolution 
          imagery for each piece in your collection.
        </p>
        
        <div className="mt-8 flex items-center gap-6">
          <button 
            onClick={() => setFilterNoImage(!filterNoImage)}
            className={`px-6 py-2 rounded-full border border-white/10 transition-all duration-500 text-sm tracking-wide ${
              filterNoImage ? "bg-white text-black" : "bg-transparent text-white hover:bg-white/5"
            }`}
          >
            {filterNoImage ? "Showing Missing Assets" : "All Collections"}
          </button>
          <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {displayedProducts.map((product) => (
          <div key={product._id} className="group relative">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#161617] rounded-sm transition-all duration-700 hover:shadow-2xl hover:shadow-white/5">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1">{product.category}</p>
                <h3 className="text-xl font-light tracking-tight mb-4">{product.name}</h3>
                
                <CldUploadWidget
                  uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "zuzuminis_default"}
                  onSuccess={(result: any) => {
                    updateImage({
                      id: product._id,
                      imageUrl: result.info.secure_url,
                    });
                  }}
                >
                  {({ open }) => (
                    <button
                      onClick={() => open()}
                      className="w-full py-3 bg-white text-black text-xs uppercase tracking-widest font-medium opacity-0 group-hover:opacity-100 transition-all duration-700 hover:bg-[#f5f5f7] transform translate-y-4 group-hover:translate-y-0"
                    >
                      Update Visual
                    </button>
                  )}
                </CldUploadWidget>
              </div>

              {isPlaceholder(product.images[0]) && (
                <div className="absolute top-4 right-4 px-2 py-1 bg-red-500/10 border border-red-500/20 backdrop-blur-md rounded-full">
                  <span className="text-[8px] uppercase tracking-widest text-red-400 font-bold">Missing Asset</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
