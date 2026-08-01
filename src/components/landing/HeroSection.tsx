'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const SPRING = { type: 'spring', stiffness: 300, damping: 20 } as const;

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { ...SPRING } },
};

export default function HeroSection() {
  return (
    <section className="relative px-6 py-24 lg:py-32 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#ffdbd1]/50 to-[#e6deff]/40 blur-[130px] rounded-full -mr-64 -mt-32 -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#9af6c0]/30 to-[#ffdbd1]/20 blur-[100px] rounded-full -ml-32 -mb-32 -z-10" />

      <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Text */}
        <motion.div
          className="flex flex-col items-start gap-6 z-10"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/60 shadow-sm"
            style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(12px)' }}
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-[#9e4225]"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            <span className="text-xs font-bold text-[#9e4225] uppercase tracking-[0.18em]">
              Wellness First ✨
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={fadeUp}
            className="font-extrabold text-4xl lg:text-[52px] lg:leading-[62px] text-slate-800 max-w-[500px]"
          >
            Membangun kebiasaan baik seharusnya terasa{' '}
            <span
              className="italic"
              style={{
                background: 'linear-gradient(135deg, #9e4225, #c4659e)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              menyenangkan
            </span>{' '}
            🌸
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-base text-slate-500 max-w-[460px] leading-relaxed"
          >
            Track habit kamu dengan cara yang emosional, hangat, dan penuh pencapaian. Kami percaya
            produktivitas adalah tentang perawatan diri.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }} transition={SPRING}>
              <Link
                href="/register"
                className="block px-8 py-4 bg-[#9e4225] text-white font-bold rounded-2xl shadow-[0_10px_30px_rgba(158,66,37,0.3)] hover:shadow-[0_15px_40px_rgba(158,66,37,0.4)] transition-shadow text-center text-sm"
              >
                Mulai Perjalananmu 🚀
              </Link>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={SPRING}
              className="px-8 py-4 rounded-2xl border border-white/60 shadow-sm font-semibold text-sm text-slate-600 flex items-center justify-center gap-2 transition-all"
              style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(12px)' }}
            >
              <span className="material-symbols-outlined text-[20px]">play_circle</span>
              Lihat Demo
            </motion.button>
          </motion.div>

          {/* Stats row */}
          <motion.div variants={fadeUp} className="flex gap-6 mt-2">
            {[
              { val: '10K+', label: 'Pengguna Aktif' },
              { val: '95%', label: 'Terasa Lebih Baik' },
              { val: '21 hari', label: 'Rata-rata Streak' },
            ].map((stat) => (
              <div key={stat.val} className="flex flex-col">
                <span className="font-extrabold text-xl text-[#9e4225]">{stat.val}</span>
                <span className="text-xs text-slate-400 font-medium">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Floating mascot */}
        <div className="relative flex justify-center lg:justify-end">
          <motion.div
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-10"
          >
            {/* Glow behind mascot */}
            <div className="absolute inset-0 bg-gradient-radial from-[#ffdbd1]/60 to-transparent blur-3xl rounded-full scale-110" />
            <motion.img
              alt="Streak Up Mascot"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsOxB6u2gWilhKHwLjLTys5aLA3H2VGBFeMbrfe9pj2jx4Nb3KDBjDC-KvqJbMyFHABLUpPyTT-gYNtuZ2YzFT3SvMwTuVjS5prla2AZ35B1xJLJA62Gi8dhvNFUaSadB2YQtUXEp_NMlgf3UnJ6QpQs4f1OmfQ1JJZLNje6iG110VJwkE58iq66JfC3wfOikxGb7tvj6GCQpJyxtgS00_9wnOIeIlh4_wQzZumFU6qG1c1d43pnsllQ"
              className="w-full max-w-[460px] drop-shadow-[0_24px_60px_rgba(158,66,37,0.18)] relative"
              whileHover={{ rotate: 3, scale: 1.04 }}
              transition={SPRING}
            />
          </motion.div>

          {/* Floating badge — Streak 15 hari */}
          <motion.div
            className="absolute -bottom-6 left-0 md:-left-10 hidden md:block z-20 rounded-2xl border border-white/60 shadow-xl px-4 py-3"
            style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(18px)' }}
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ ...SPRING, delay: 0.9 }}
            whileHover={{ scale: 1.06, y: -4 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#ffdbd1] flex items-center justify-center">
                <span className="text-xl">🔥</span>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Streak 15 Hari!</p>
                <p className="text-[10px] font-semibold text-[#9e4225] uppercase tracking-wider">Luar Biasa</p>
              </div>
            </div>
          </motion.div>

          {/* Floating badge — Mood */}
          <motion.div
            className="absolute top-4 -right-2 md:-right-10 hidden md:block z-20 rounded-2xl border border-white/60 shadow-xl px-4 py-3"
            style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(18px)' }}
            initial={{ opacity: 0, scale: 0.7, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ ...SPRING, delay: 1.2 }}
            whileHover={{ scale: 1.06, y: -4 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#e6deff] flex items-center justify-center">
                <span className="text-xl">😊</span>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Mood: Bahagia!</p>
                <p className="text-[10px] font-semibold text-[#6153a2] uppercase tracking-wider">Refleksi Hari Ini</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
