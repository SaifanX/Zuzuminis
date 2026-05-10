"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export function FloatingLogo({ className = "" }: { className?: string }) {
  const ref = useRef(null);

  useEffect(() => {
    gsap.to(ref.current, {
      y: "random(-20, 20)",
      x: "random(-20, 20)",
      rotation: "random(-10, 10)",
      duration: "random(2, 4)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div ref={ref} className={`opacity-5 pointer-events-none select-none relative ${className}`}>
      <Image 
        src="/assets/logo.png" 
        alt="" 
        fill
        className="object-contain grayscale invert" 
      />
    </div>
  );
}

