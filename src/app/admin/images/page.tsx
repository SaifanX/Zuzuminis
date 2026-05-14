"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import Image from "next/image";
import { X, Trash2, Edit3, Check, Loader2 } from "lucide-react";

export default function AdminImagesPage() {
  const products = useQuery(api.products.list, {});
  const updateImage = useMutation(api.products.updateImage);
  const updateProduct = useMutation(api.products.update);
  const removeProduct = useMutation(api.products.remove);

  const [filterNoImage, setFilterNoImage] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  if (!products) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a] text-white">
        <div className="animate-pulse font-light tracking-widest uppercase">Image editor is loading</div>
      </div>
    );
  }

  const isPlaceholder = (url: string) => url.includes("/zuzuminis/products/product_");

  const displayedProducts = filterNoImage
    ? products.filter(p => p.images.some(isPlaceholder) || p.images.length === 0)
    : products;

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await updateProduct({
        id: editingProduct._id,
        updates: {
          name: editingProduct.name,
          price: Number(editingProduct.price),
          inventory: Number(editingProduct.inventory),
          category: editingProduct.category,
          description: editingProduct.description,
        }
      });
      setEditingProduct(null);
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: any) => {
    if (confirm("Are you sure you want to remove this piece from the collection?")) {
      await removeProduct({ id });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f7] p-6 md:p-16 font-sans">
      <header className="mb-12 md:mb-16">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl md:text-7xl font-extralight tracking-tighter mb-4 italic">
              Command <span className="font-normal not-italic">Center</span>
            </h1>
            <p className="text-[#86868b] max-w-xl text-base md:text-lg font-light leading-relaxed">
              Curate, edit, and refine your boutique's collection. Total control over
              visuals, pricing, and inventory.
            </p>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-5xl font-thin tracking-tighter text-white/20">{products.length}</p>
            <p className="text-[10px] uppercase tracking-widest text-white/40">Total Pieces</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <button
            onClick={() => setFilterNoImage(!filterNoImage)}
            className={`w-full md:w-auto px-8 py-3 rounded-full border border-white/10 transition-all duration-500 text-xs md:text-sm tracking-widest uppercase font-medium ${filterNoImage ? "bg-white text-black" : "bg-transparent text-white hover:bg-white/5"
              }`}
          >
            {filterNoImage ? "Missing Assets Only" : "View Entire Collection"}
          </button>
          <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
        </div>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
        {displayedProducts.map((product) => (
          <div key={product._id} className="group relative flex flex-col bg-[#161617]/30 rounded-sm border border-white/5 overflow-hidden">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#161617]">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-1000 md:group-hover:scale-105 opacity-90 md:opacity-80 md:group-hover:opacity-100"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-60 md:group-hover:opacity-90 transition-opacity duration-500" />

              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => setEditingProduct(product)}
                  className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white/70 hover:text-white transition-colors"
                >
                  <Edit3 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white/70 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1">{product.category}</p>
                <h3 className="text-base md:text-lg font-light tracking-tight mb-3 md:mb-4 leading-tight truncate">{product.name}</h3>
                <p className="text-sm font-medium text-white/90 mb-4">₹{product.price}</p>

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
                      className="w-full py-3 bg-white text-black text-[10px] uppercase tracking-widest font-bold md:opacity-0 md:group-hover:opacity-100 transition-all duration-700 hover:bg-[#f5f5f7] active:scale-95 shadow-xl"
                    >
                      Update Visual
                    </button>
                  )}
                </CldUploadWidget>
              </div>

              {isPlaceholder(product.images[0]) && (
                <div className="absolute top-3 left-3 px-2 py-0.5 bg-red-500/20 border border-red-500/30 backdrop-blur-md rounded-full">
                  <span className="text-[7px] uppercase tracking-widest text-red-200 font-bold">Missing</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-2xl bg-[#161617] border border-white/10 rounded-sm overflow-hidden shadow-2xl">
            <button
              onClick={() => setEditingProduct(null)}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors z-10"
            >
              <X size={24} />
            </button>

            <form onSubmit={handleUpdate} className="p-8 md:p-12">
              <h2 className="text-3xl font-extralight tracking-tighter mb-8 italic">
                Refine <span className="font-normal not-italic">Details</span>
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-medium">Product Name</label>
                    <input
                      type="text"
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-none p-3 text-sm focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-medium">Price (INR)</label>
                    <input
                      type="number"
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-none p-3 text-sm focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-medium">Description</label>
                  <textarea
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-none p-3 text-sm focus:outline-none focus:border-white/30 transition-colors resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-medium">Inventory Count</label>
                    <input
                      type="number"
                      value={editingProduct.inventory}
                      onChange={(e) => setEditingProduct({ ...editingProduct, inventory: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-none p-3 text-sm focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-medium">Category</label>
                    <input
                      type="text"
                      value={editingProduct.category}
                      onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-none p-3 text-sm focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="w-full bg-white text-black py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#f5f5f7] transition-all flex items-center justify-center gap-2"
                >
                  {isUpdating ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                  {isUpdating ? "Syncing..." : "Commit Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
