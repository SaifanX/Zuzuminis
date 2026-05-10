"use client";

export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <img 
        src="/assets/logo.png" 
        alt="Zuzuminis Logo" 
        className="w-full h-full object-contain"
      />
    </div>
  );
}
