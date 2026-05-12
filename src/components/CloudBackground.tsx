"use client";

import { motion } from "framer-motion";

const Cloud = ({ color, className }: { color: string, className?: string }) => (
  <svg viewBox="0 0 240 120" fill={color} xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M190,100c22,0,40-18,40-40c0-22-18-40-40-40c-3,0-6,1-9,1C170,8,150,0,130,0c-30,0-55,20-63,48 c-4-1-8-2-12-2c-22,0-40,18-40,40c0,22,18,40,40,40H190z" />
  </svg>
);

export function CloudBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Blue Cloud 1 */}
      <motion.div 
        animate={{ x: [-300, 2000], y: [0, 100, 0] }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute top-[10%] w-[350px] opacity-20"
      >
        <Cloud color="#4D96FF" />
      </motion.div>
      
      {/* Pink Cloud 1 */}
      <motion.div 
        animate={{ x: [2000, -300], y: [0, -100, 0] }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        className="absolute top-[35%] w-[450px] opacity-15"
      >
        <Cloud color="#FF66A1" />
      </motion.div>

      {/* Blue Cloud 2 */}
      <motion.div 
        animate={{ x: [-400, 2000], y: [50, -50, 50] }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear", delay: 5 }}
        className="absolute top-[60%] w-[400px] opacity-15"
      >
        <Cloud color="#4D96FF" />
      </motion.div>

      {/* Pink Cloud 2 */}
      <motion.div 
        animate={{ x: [2000, -400], scale: [1, 1.2, 1] }}
        transition={{ duration: 110, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[10%] w-[500px] opacity-20"
      >
        <Cloud color="#FF66A1" />
      </motion.div>
    </div>
  );
}
