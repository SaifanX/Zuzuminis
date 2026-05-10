"use client";

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
      <img 
        src={src} 
        alt="Zuzuminis Logo" 
        className="w-full h-full object-contain"
      />
    </div>
  );
}
