"use client";

import { useEffect, useRef } from "react";

export function CursorGlitter() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!overlayRef.current) return;
      const { clientX, clientY } = e;
      
      // Update the mask position for the spotlight
      overlayRef.current.style.setProperty("--x", `${clientX}px`);
      overlayRef.current.style.setProperty("--y", `${clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden"
      style={{
        "--x": "-1000px",
        "--y": "-1000px",
      } as any}
    >
      {/* The Glitter Base - Very faint white dots across the whole screen */}
      <div 
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* The Magical Spotlight - Only shows glitter near the cursor with a beautiful glow */}
      <div 
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle 180px at var(--x) var(--y), rgba(255, 255, 255, 0.2), transparent)`,
          maskImage: `radial-gradient(circle 120px at var(--x) var(--y), black, transparent)`,
          WebkitMaskImage: `radial-gradient(circle 120px at var(--x) var(--y), black, transparent)`,
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            opacity: 0.2,
            mixBlendMode: 'overlay',
          }}
        />
        
        {/* Animated Sparkles inside the spotlight - even fainter */}
        <div className="absolute inset-0 animate-pulse bg-white/[0.03]" style={{ mixBlendMode: 'screen' }} />
      </div>
    </div>
  );
}
