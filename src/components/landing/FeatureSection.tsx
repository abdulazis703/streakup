'use client';

import { motion } from 'framer-motion';

const SPRING = { type: 'spring', stiffness: 300, damping: 22 } as const;

const FEATURES = [
  {
    icon: 'checklist',
    emoji: '📋',
    bg: '#ffdbd1',
    color: '#7e2b10',
    title: "Today's Checklist",
    desc: 'Selesaikan habit harian dengan sentuhan personal yang menenangkan.',
    glow: 'rgba(255,181,159,0.35)',
  },
  {
    icon: 'bolt',
    emoji: '⚡',
    bg: '#e6deff',
    color: '#493a88',
    title: 'Progress Ring & Streak',
    desc: 'Visualisasi kemajuan yang memuaskan mata untuk motivasi berkelanjutan.',
    glow: 'rgba(196,190,254,0.35)',
  },
  {
    icon: 'military_tech',
    emoji: '🏅',
    bg: '#9af6c0',
    color: '#004a2c',
    title: 'Achievement Badge',
    desc: 'Koleksi badge unik untuk setiap milestone yang kamu capai.',
    glow: 'rgba(99,189,139,0.3)',
  },
  {
    icon: 'self_improvement',
    emoji: '🌙',
    bg: '#fff0c4',
    color: '#7a5500',
    title: 'Daily Reflection',
    desc: 'Ruang tenang untuk mencatat perasaanmu setiap hari tanpa tekanan.',
    glow: 'rgba(255,214,100,0.3)',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.94 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...SPRING, delay: i * 0.1 },
  }),
};

export default function FeatureSection() {
  return (
    <section id="fitur" className="px-6 py-20 relative overflow-hidden">
      {/* Subtle background layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent -z-10" />

      <div className="max-w-[1200px] w-full mx-auto">
        {/* Heading row */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end gap-4 mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={SPRING}
        >
          <div className="flex-shrink-0">
            <p className="text-xs font-black text-[#9e4225] uppercase tracking-[0.22em] mb-2 flex items-center gap-2">
              <span>✨</span> Fitur Utama
            </p>
            <h2
              className="font-extrabold text-3xl lg:text-4xl text-slate-800 whitespace-nowrap"
              style={{
                background: 'linear-gradient(135deg, #9e4225, #6153a2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Didesain untuk ketenangan pikiran Anda.
            </h2>
          </div>
          <div className="hidden md:block h-[1px] flex-grow bg-gradient-to-r from-[#dcc0b9] to-transparent ml-6 mb-2" />
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                y: -10,
                boxShadow: `0 20px 50px ${feat.glow}`,
              }}
              transition={SPRING}
              className="group p-6 rounded-3xl cursor-pointer relative overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.45)',
                backdropFilter: 'blur(18px)',
                border: '1.5px solid rgba(255, 255, 255, 0.7)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
              }}
            >
              {/* Top glow pill */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${feat.bg}, transparent)` }}
              />

              {/* Icon */}
              <motion.div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-2xl shadow-sm"
                style={{ background: feat.bg }}
                whileHover={{ rotate: [0, -8, 8, 0], scale: 1.15 }}
                transition={{ duration: 0.5 }}
              >
                {feat.emoji}
              </motion.div>

              <h3 className="font-bold text-base text-slate-800 mb-2">{feat.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{feat.desc}</p>

              {/* Bottom tag */}
              <div
                className="mt-4 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: feat.bg, color: feat.color }}
              >
                <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
                Pelajari
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
