'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StreakBadgeProps {
  streak: number;
}

export default function StreakBadge({ streak }: StreakBadgeProps) {
  if (streak === 0) return null;

  return (
    <AnimatePresence mode="wait">
      {/* LEVEL 1: Streak < 3 (Biasa) */}
      {streak < 3 && (
        <motion.div
          key="level-1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="flex items-center gap-1 text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100"
        >
          <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
          {streak}
        </motion.div>
      )}

      {/* LEVEL 2: Streak 3-6 (Pulsing) */}
      {streak >= 3 && streak < 7 && (
        <motion.div
          key="level-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="flex items-center gap-1 text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full shadow-sm border border-red-100"
        >
          <motion.span 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="material-symbols-outlined text-[14px]" 
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            local_fire_department
          </motion.span>
          {streak}
        </motion.div>
      )}

      {/* LEVEL 3: Streak 7-29 (Floating/Wobbly) */}
      {streak >= 7 && streak < 30 && (
        <motion.div
          key="level-3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="flex items-center gap-1 text-[11px] font-extrabold text-white bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 rounded-full shadow-md"
        >
          <motion.span 
            animate={{ y: [-2, 2, -2], rotate: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="material-symbols-outlined text-[16px] text-yellow-200" 
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            local_fire_department
          </motion.span>
          {streak}
        </motion.div>
      )}

      {/* LEVEL 4: Streak >= 30 (Legendary) */}
      {streak >= 30 && (
        <motion.div
          key="level-4"
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="relative overflow-hidden flex items-center gap-1.5 text-xs font-extrabold text-amber-900 bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 px-4 py-1.5 rounded-full shadow-lg border-2 border-amber-300"
        >
          {/* Shimmer Effect */}
          <motion.div
            className="absolute inset-0 w-[200%] bg-gradient-to-r from-transparent via-white/60 to-transparent -skew-x-12"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
          />
          <span className="material-symbols-outlined text-[16px] text-amber-700 animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>
            local_fire_department
          </span>
          <span className="relative z-10 drop-shadow-sm">LEGENDARY STREAK: {streak}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
