'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface Sparkle {
  id: number;
  x: string;
  y: string;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

const EMOJIS = ['✨', '⭐', '🌟', '💫', '🌸', '🍀'];

export default function FloatingSparkles({ count = 18 }: { count?: number }) {
  const sparkles: Sparkle[] = useMemo(() => {
    // Deterministic seeds to avoid SSR mismatch
    return Array.from({ length: count }, (_, i) => {
      const seed = i * 13.7;
      return {
        id: i,
        x: `${((seed * 17.3) % 100).toFixed(1)}%`,
        y: `${((seed * 9.1) % 100).toFixed(1)}%`,
        size: 12 + ((i * 5) % 16),
        duration: 4 + ((i * 1.3) % 4),
        delay: (i * 0.4) % 3,
        emoji: EMOJIS[i % EMOJIS.length],
      };
    });
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute select-none"
          style={{ left: s.x, top: s.y, fontSize: s.size }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.4, 0.9, 0.4],
            rotate: [0, 15, -10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {s.emoji}
        </motion.div>
      ))}
    </div>
  );
}
