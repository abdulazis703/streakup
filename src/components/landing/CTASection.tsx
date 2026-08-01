'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const SPRING = { type: 'spring', stiffness: 300, damping: 20 } as const;

export default function CTASection() {
  return (
    <section className="px-6 py-20">
      <motion.div
        className="max-w-[1000px] w-full mx-auto rounded-[44px] px-8 py-12 md:px-20 md:py-16 relative overflow-hidden flex flex-col items-center text-center gap-7 border border-white/50"
        style={{
          background: 'linear-gradient(135deg, rgba(255,107,157,0.85), rgba(192,132,252,0.85))',
          backdropFilter: 'blur(18px)',
          boxShadow: '0 24px 70px rgba(192,132,252,0.3)',
        }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={SPRING}
      >
        {/* Radial glow overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.25)_0%,transparent_70%)] pointer-events-none" />

        {/* Floating sparkles inside CTA */}
        {['✨', '🌟', '💫', '⭐'].map((s, i) => (
          <motion.span
            key={i}
            className="absolute text-white/40 text-2xl pointer-events-none select-none"
            style={{
              top: `${[15, 70, 20, 75][i]}%`,
              left: `${[8, 5, 88, 92][i]}%`,
            }}
            animate={{ y: [0, -14, 0], rotate: [0, 20, -10, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3 + i * 0.7, repeat: Infinity, delay: i * 0.5 }}
          >
            {s}
          </motion.span>
        ))}

        <motion.h2
          className="text-3xl md:text-5xl font-extrabold text-white max-w-2xl relative z-10 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...SPRING, delay: 0.1 }}
        >
          Siap untuk hari yang lebih{' '}
          <span className="underline decoration-white/50 decoration-wavy">tenang?</span> 🌸
        </motion.h2>

        <motion.p
          className="text-orange-100 text-base md:text-lg font-medium w-full max-w-2xl relative z-10 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Bergabunglah dengan ribuan orang yang telah menemukan kebahagiaan dalam kebiasaan kecil mereka.
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full sm:w-auto justify-center">
          <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }} transition={SPRING}>
            <Link
              href="/register"
              className="block w-full sm:w-auto px-8 py-4 bg-white text-[#9e4225] font-extrabold rounded-2xl shadow-xl hover:shadow-2xl transition-shadow text-center text-sm"
            >
              ✨ Mulai Gratis Sekarang
            </Link>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={SPRING}
            className="w-full sm:w-auto px-8 py-4 bg-white/15 text-white border border-white/30 backdrop-blur-sm font-semibold rounded-2xl hover:bg-white/25 transition-all text-sm"
          >
            Tanya Kami Sesuatu 💬
          </motion.button>
        </div>

        {/* Mascot decoration */}
        <div className="absolute -bottom-6 -right-6 opacity-20 rotate-12 select-none pointer-events-none">
          <img
            alt="Mascot"
            className="w-44 h-44 object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsOxB6u2gWilhKHwLjLTys5aLA3H2VGBFeMbrfe9pj2jx4Nb3KDBjDC-KvqJbMyFHABLUpPyTT-gYNtuZ2YzFT3SvMwTuVjS5prla2AZ35B1xJLJA62Gi8dhvNFUaSadB2YQtUXEp_NMlgf3UnJ6QpQs4f1OmfQ1JJZLNje6iG110VJwkE58iq66JfC3wfOikxGb7tvj6GCQpJyxtgS00_9wnOIeIlh4_wQzZumFU6qG1c1d43pnsllQ"
          />
        </div>
      </motion.div>
    </section>
  );
}
