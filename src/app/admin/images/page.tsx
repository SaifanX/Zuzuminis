"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { CldUploadWidget } from "next-cloudinary";
import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Trash2, Edit3, Check, Loader2, Filter, LayoutGrid, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminImagesPage() {
  const products = useQuery(api.products.list, {});
  const updateImage = useMutation(api.products.updateImage);
  const updateProduct = useMutation(api.products.update);
  const removeProduct = useMutation(api.products.remove);
  
  const [filterNoImage, setFilterNoImage] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  if (!products) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] p-8 space-y-12">
        <div className="w-full max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 opacity-20">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-[4/5] bg-white/5 animate-pulse rounded-sm" />
          ))}
        </div>
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center space-y-4">
             <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
             <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-light">Vault Initializing</p>
          </div>
        </div>
      </div>
    );
  }

  const isPlaceholder = (url: string) => url.includes("/zuzuminis/products/product_");

  const displayedProducts = filterNoImage 
    ? products.filter(p => p.images.some(isPlaceholder) || p.images.length === 0)
    : products;

  const handleUpdate = async (e?: React.FormEvent) => {
    e?.preventDefault();
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

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f7] pb-24 font-sans selection:bg-white selection:text-black">
      {/* Dynamic Header */}
      <header className="sticky top-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 px-6 py-6 md:px-16 md:py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-2 font-bold">Boutique Control</p>
              <h1 className="text-3xl md:text-6xl font-extralight tracking-tighter italic">
                Media <span className="font-normal not-italic">Vault</span>
              </h1>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <div className="hidden md:flex flex-col items-end mr-4">
                <span className="text-3xl font-thin tracking-tighter text-white/40 leading-none">{displayedProducts.length}</span>
                <span className="text-[8px] uppercase tracking-widest text-white/20">Items in View</span>
              </div>
              <button 
                onClick={() => setFilterNoImage(!filterNoImage)}
                className={`p-3 rounded-full transition-all duration-500 ${filterNoImage ? "bg-white text-black" : "bg-white/5 text-white/60 hover:text-white"}`}
              >
                <Filter size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-16 py-8">
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {displayedProducts.map((product) => (
              <motion.div 
                key={product._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative flex flex-col"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#121212] rounded-sm transition-all duration-700 ring-1 ring-white/5 hover:ring-white/20">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  
                  {/* Action Icons - Tactical Touch */}
                  <div className="absolute top-3 right-3 flex gap-2 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300">
                    <button 
                      onClick={() => setEditingProduct(product)}
                      className="w-10 h-10 flex items-center justify-center bg-black/60 backdrop-blur-xl rounded-full text-white/80 hover:text-white hover:bg-white hover:text-black transition-all active:scale-90"
                    >
                      <Edit3 size={16} />
                    </button>
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                    <p className="text-[8px] md:text-[9px] uppercase tracking-[0.25em] text-white/40 mb-1 font-bold">{product.category}</p>
                    <h3 className="text-sm md:text-base font-light tracking-tight mb-4 leading-tight truncate">{product.name}</h3>
                    
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
                          className="w-full py-3 bg-white text-black text-[9px] uppercase tracking-[0.2em] font-black md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 hover:bg-[#f5f5f7] active:scale-[0.98] shadow-2xl"
                        >
                          Update Visual
                        </button>
                      )}
                    </CldUploadWidget>
                  </div>

                  {isPlaceholder(product.images[0]) && (
                    <div className="absolute top-3 left-3 px-2 py-1 bg-red-500/10 border border-red-500/20 backdrop-blur-md rounded-full">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1 h-1 bg-red-400 rounded-full animate-pulse" />
                        <span className="text-[7px] uppercase tracking-widest text-red-300 font-black">Null Asset</span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Reactive Bottom Sheet (Mobile) / Side Drawer (Desktop) */}
      <AnimatePresence>
        {editingProduct && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingProduct(null)}
              className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md"
            />
            
            {/* Drawer */}
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-[101] bg-[#0f0f10] border-t border-white/10 rounded-t-[2.5rem] p-8 md:p-12 md:max-w-xl md:left-auto md:top-0 md:bottom-0 md:rounded-none md:border-t-0 md:border-l"
            >
              <div className="w-12 h-1 bg-white/10 rounded-full mx-auto mb-8 md:hidden" />
              
              <div className="flex justify-between items-start mb-10">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-2 font-bold">Edit Piece</p>
                  <h2 className="text-3xl font-extralight tracking-tighter italic">
                    Refine <span className="font-normal not-italic">Data</span>
                  </h2>
                </div>
                <button 
                  onClick={() => setEditingProduct(null)}
                  className="p-2 text-white/20 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-8 overflow-y-auto max-h-[60vh] md:max-h-none pr-2 custom-scrollbar">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-bold">Name</label>
                  <input 
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                    className="w-full bg-white/5 border-b border-white/10 p-3 text-lg font-light focus:outline-none focus:border-white transition-colors placeholder:text-white/10"
                  />
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-bold">Price (₹)</label>
                    <input 
                      type="number"
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})}
                      className="w-full bg-white/5 border-b border-white/10 p-3 text-lg font-light focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-bold">Stock</label>
                    <input 
                      type="number"
                      value={editingProduct.inventory}
                      onChange={(e) => setEditingProduct({...editingProduct, inventory: e.target.value})}
                      className="w-full bg-white/5 border-b border-white/10 p-3 text-lg font-light focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-bold">Collection Category</label>
                  <input 
                    type="text"
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                    className="w-full bg-white/5 border-b border-white/10 p-3 text-lg font-light focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-bold">Description</label>
                  <textarea 
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                    rows={4}
                    className="w-full bg-white/5 border-b border-white/10 p-3 text-base font-light focus:outline-none focus:border-white transition-colors resize-none leading-relaxed"
                  />
                </div>
              </div>

              <div className="mt-12 flex gap-4">
                <button 
                  onClick={() => handleDelete(editingProduct._id)}
                  type="button"
                  className="flex-1 py-5 border border-red-500/20 text-red-400 text-[10px] uppercase tracking-widest font-bold hover:bg-red-500/10 transition-all active:scale-95"
                >
                  Delete Piece
                </button>
                <button 
                  onClick={() => handleUpdate()}
                  disabled={isUpdating}
                  className="flex-[2] bg-white text-black py-5 text-[10px] uppercase tracking-[0.25em] font-black hover:bg-[#f5f5f7] transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-2xl"
                >
                  {isUpdating ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                  {isUpdating ? "Syncing" : "Save Changes"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );

  async function handleDelete(id: any) {
    if (confirm("Are you sure you want to remove this piece from the collection?")) {
      await removeProduct({ id });
      setEditingProduct(null);
    }
  }
}
