"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface RippleState {
  x: number;
  y: number;
  color: string;
}

export const triggerRipple = (x: number, y: number, color: string = "#BDE0FE") => {
  const event = new CustomEvent("zuzu-reveal", {
    detail: { x, y, color },
  });
  window.dispatchEvent(event);
};

export const MagicRipple: React.FC = () => {
  const [ripple, setRipple] = useState<RippleState | null>(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleReveal = (e: any) => {
      const { x, y, color } = e.detail;
      setRipple({ x, y, color });
    };

    window.addEventListener("zuzu-reveal", handleReveal);
    return () => window.removeEventListener("zuzu-reveal", handleReveal);
  }, []);

  // Close the ripple when the page changes
  useEffect(() => {
    if (ripple) {
      // Small delay to ensure the new content has started rendering
      const timer = setTimeout(() => {
        setRipple(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      <AnimatePresence>
        {ripple && (
          <motion.div
            initial={{ 
              scale: 0,
              x: ripple.x,
              y: ripple.y,
              translateX: "-50%",
              translateY: "-50%"
            }}
            animate={{ 
              scale: 1,
            }}
            exit={{ 
              scale: 0,
              transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
            }}
            transition={{ 
              duration: 0.7, 
              ease: [0.76, 0, 0.24, 1],
            }}
            className="flex items-center justify-center overflow-hidden"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "300vmax",
              height: "300vmax",
              backgroundColor: ripple.color,
              borderRadius: "50%",
              transformOrigin: "center",
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
