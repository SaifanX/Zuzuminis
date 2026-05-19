"use client";

import { motion } from "framer-motion";
import { Cloud, Squiggle } from "./HeroBento";

export function BoutiqueBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Massive Soft Drifting Clouds */}
      <motion.div 
        animate={{ x: [-500, 2000] }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute top-[5%] w-[600px] opacity-[0.5]"
      >
        <Cloud color="#4D96FF" />
      </motion.div>
      
      <motion.div 
        animate={{ x: [2000, -500] }}
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
        className="absolute top-[25%] w-[800px] opacity-[0.5]"
      >
        <Cloud color="#FF66A1" />
      </motion.div>

      {/* Middle-left drifting cloud */}
      <motion.div 
        animate={{ x: [-600, 2200] }}
        transition={{ duration: 140, repeat: Infinity, ease: "linear", delay: 20 }}
        className="absolute top-[35%] w-[450px] opacity-[0.5]"
      >
        <Cloud color="#4D96FF" />
      </motion.div>
      
      <motion.div 
        animate={{ x: [-1000, 2500] }}
        transition={{ duration: 180, repeat: Infinity, ease: "linear", delay: 10 }}
        className="absolute top-[45%] w-[500px] opacity-[0.5]"
      >
        <Cloud color="#4D96FF" />
      </motion.div>

      {/* Floating Clouds */}
      <motion.div 
        animate={{ y: [0, -40, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[60%] right-[10%] w-[400px] opacity-[0.5]"
      >
        <Cloud color="#4D96FF" />
      </motion.div>

      {/* Lower-right floating cloud */}
      <motion.div 
        animate={{ y: [0, -35, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute top-[75%] right-[15%] w-[550px] opacity-[0.5]"
      >
        <Cloud color="#FF66A1" />
      </motion.div>

      <motion.div 
        animate={{ y: [0, 50, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[10%] left-[15%] w-[350px] opacity-[0.5]"
      >
        <Cloud color="#FF66A1" />
      </motion.div>

      {/* Thick Background Squiggles */}
      {/* Top-right accent */}
      <motion.div 
        animate={{ y: [0, -25, 0], rotate: [5, 10, 5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[8%] right-[12%] w-44 opacity-[0.5]"
      >
        <Squiggle color="#FF9D66" rotation={5} strokeWidth={14} />
      </motion.div>

      <motion.div 
        animate={{ y: [0, -30, 0], rotate: [-15, -10, -15] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] left-[5%] w-48 opacity-[0.5]"
      >
        <Squiggle color="#4D96FF" rotation={-15} strokeWidth={14} />
      </motion.div>
      
      <motion.div 
        animate={{ y: [0, 30, 0], rotate: [20, 25, 20] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[15%] right-[5%] w-56 opacity-[0.5]"
      >
        <Squiggle color="#FF66A1" rotation={20} strokeWidth={14} />
      </motion.div>

      <motion.div 
        animate={{ x: [-20, 20, -20], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] right-[30%] w-32 opacity-[0.5]"
      >
        <Squiggle color="#4D96FF" rotation={45} strokeWidth={14} />
      </motion.div>

      {/* Center-left Accent */}
      <motion.div 
        animate={{ x: [-15, 15, -15], rotate: [-5, 5, -5] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-[50%] left-[8%] w-36 opacity-[0.5]"
      >
        <Squiggle color="#FF66A1" rotation={-10} strokeWidth={14} />
      </motion.div>

      <motion.div 
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[30%] left-[40%] w-40 opacity-[0.5]"
      >
        <Squiggle color="#FF9D66" rotation={-10} strokeWidth={14} />
      </motion.div>
    </div>
  );
}
