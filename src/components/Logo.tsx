"use client";

import Image from "next/image";

export function Logo({ 
  className = "w-10 h-10", 
  variant = "horizontal" 
}: { 
  className?: string,
  variant?: "horizontal" | "icon"
}) {
  const src = variant === "horizontal" 
    ? "/assets/zuzuminis-logo--hor-trp.png" 
    : "/assets/zuzumini-icononly-trp.png";

  return (
    <div className={`relative ${className}`}>
      <Image 
        src={src} 
        alt="Zuzuminis Logo" 
        fill
        priority
        sizes="(max-width: 768px) 150px, 200px"
        className="object-contain"
      />
    </div>
  );
}

