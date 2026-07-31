'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface DailyMotivationProps {
  quote: { text: string; author: string };
}

export default function DailyMotivation({ quote }: DailyMotivationProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-full h-48 cursor-pointer group"
      style={{ perspective: 1200 }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Sisi Depan */}
        <div 
          className="absolute inset-0 bg-surface rounded-[2.5rem] shadow-md border border-outline-variant/10 flex flex-col items-center justify-center p-md transition-colors hover:bg-surface-container-low"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-sm">
            <span className="material-symbols-outlined text-[32px] text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
          </div>
          <p className="text-body-lg font-bold text-on-surface text-center px-4">
            Ketuk untuk buka motivasi hari ini 🥠
          </p>
        </div>

        {/* Sisi Belakang */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[#9e4225] to-[#ff8c69] rounded-[2.5rem] shadow-xl flex flex-col items-center justify-center p-xl overflow-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="absolute -top-4 -right-4 p-lg opacity-10">
            <span className="material-symbols-outlined text-white" style={{ fontSize: '100px' }}>format_quote</span>
          </div>
          <p className="text-body-lg font-bold text-white text-center leading-relaxed italic z-10 drop-shadow-md">
            &ldquo;{quote.text}&rdquo;
          </p>
          <div className="mt-4 flex items-center justify-center gap-3 z-10 w-full">
            <div className="h-[2px] flex-1 bg-white/30 max-w-[40px]" />
            <p className="text-[10px] font-bold text-white/90 uppercase tracking-widest">{quote.author}</p>
            <div className="h-[2px] flex-1 bg-white/30 max-w-[40px]" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
