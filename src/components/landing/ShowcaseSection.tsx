'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

const SPRING_CONFIG = { type: 'spring', stiffness: 260, damping: 20 } as const;

/** Inner dashboard preview rendered inside the browser mockup */
function DashboardPreview() {
  const opacities = ['#ffdbd1', '#ffb59f', '#9e4225', '#7e2b10'];

  return (
    <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="md:col-span-2 space-y-5">
        {/* Heatmap card */}
        <div
          className="p-5 rounded-2xl border border-white/50"
          style={{ background: 'rgba(255,255,255,0.55)' }}
        >
          <div className="flex justify-between items-center mb-4">
            <p className="font-bold text-sm text-slate-800">Daily Activity 🔥</p>
            <p className="text-xs font-semibold text-[#9e4225]">Mei 2024</p>
          </div>
          <div className="grid grid-cols-[repeat(21,minmax(0,1fr))] gap-1">
            {Array.from({ length: 120 }).map((_, i) => {
              const colorIndex = (i * 7 + 3) % opacities.length;
              return (
                <motion.div
                  key={i}
                  className="w-full aspect-square rounded-sm cursor-pointer"
                  style={{ background: opacities[colorIndex], opacity: 0.7 }}
                  whileHover={{ scale: 1.5, opacity: 1 }}
                  transition={{ duration: 0.15 }}
                />
              );
            })}
          </div>
        </div>

        {/* Habit mini cards */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: 'self_improvement', label: 'Meditasi', status: '✅ Done', bg: '#9af6c0', color: '#004a2c' },
            { icon: 'water_drop', label: 'Minum Air', status: '80%', bg: '#ffdbd1', color: '#7e2b10' },
          ].map((h) => (
            <motion.div
              key={h.label}
              whileHover={{ scale: 1.03, y: -3 }}
              transition={SPRING_CONFIG}
              className="p-3 rounded-2xl flex items-center gap-3 border border-white/40"
              style={{ background: `${h.bg}55` }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: h.bg }}
              >
                <span className="material-symbols-outlined text-[20px]" style={{ color: h.color }}>
                  {h.icon}
                </span>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">{h.label}</p>
                <p className="text-[10px] font-semibold" style={{ color: h.color }}>{h.status}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mood panel */}
      <div
        className="p-5 rounded-2xl border border-white/40 flex flex-col items-center text-center gap-4"
        style={{ background: 'rgba(230,222,255,0.3)' }}
      >
        {/* Progress ring */}
        <div className="relative w-24 h-24">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e6deff"
              strokeWidth="3"
            />
            <motion.path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#6153a2"
              strokeDasharray="88, 100"
              strokeLinecap="round"
              strokeWidth="3"
              initial={{ strokeDasharray: '0, 100' }}
              animate={{ strokeDasharray: '88, 100' }}
              transition={{ duration: 2, ease: 'easeOut', delay: 0.5 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-extrabold text-lg text-[#6153a2]">88%</span>
          </div>
        </div>
        <h4 className="font-bold text-sm text-slate-800">Mood Hari Ini 😊</h4>
        <div className="flex gap-2">
          {['😊', '😌', '✨', '🌊'].map((e, i) => (
            <motion.span
              key={i}
              className="text-xl cursor-pointer"
              whileHover={{ scale: 1.35 }}
              transition={SPRING_CONFIG}
            >
              {e}
            </motion.span>
          ))}
        </div>
        <hr className="w-full border-[#e6deff]" />
        <p className="text-xs text-slate-500 italic leading-relaxed">
          &quot;Kamu sudah melakukan yang terbaik hari ini. Istirahatlah.&quot;
        </p>
      </div>
    </div>
  );
}

/** Browser window mockup with tilt 3D effect */
function BrowserMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 160,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 160,
    damping: 24,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        transformStyle: 'preserve-3d',
      }}
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      className="w-full rounded-[32px] overflow-hidden shadow-[0_40px_100px_rgba(192,132,252,0.25)] border border-white/70"
      style={
        {
          background: 'rgba(255, 255, 255, 0.42)',
          backdropFilter: 'blur(28px)',
        } as React.CSSProperties
      }
    >
      {/* Browser top bar */}
      <div
        className="h-12 flex items-center px-5 gap-3 border-b border-white/50"
        style={{ background: 'rgba(255,255,255,0.5)' }}
      >
        {/* Pastel traffic light dots */}
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: '#FFB3B3' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#FFE0A3' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#B3F0CC' }} />
        </div>
        {/* URL bar */}
        <div
          className="h-6 flex-grow max-w-xs mx-auto rounded-full flex items-center justify-center gap-1 px-3"
          style={{ background: 'rgba(255,255,255,0.7)' }}
        >
          <span className="material-symbols-outlined text-[12px] text-slate-400">lock</span>
          <span className="text-[10px] text-slate-400 font-medium">streakup.app/today</span>
        </div>
      </div>

      <DashboardPreview />
    </motion.div>
  );
}

export default function ShowcaseSection() {
  return (
    <section id="showcase" className="px-6 py-20 relative overflow-hidden">
      {/* Glow blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-br from-[#e6deff]/50 to-[#ffdbd1]/30 blur-[100px] rounded-full -z-10" />

      <div className="max-w-[1200px] w-full mx-auto flex flex-col items-center gap-12">
        {/* Heading */}
        <motion.div
          className="text-center max-w-2xl"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <p className="text-xs font-black text-[#6153a2] uppercase tracking-[0.22em] mb-3 flex items-center justify-center gap-2">
            <span>🖥️</span> Website Samples
          </p>
          <h2 className="font-extrabold text-3xl lg:text-4xl text-slate-800 mb-4">
            Dashboard yang{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #6153a2, #9e4225)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Menenangkan
            </span>{' '}
            🌸
          </h2>
          <p className="text-slate-500 text-base leading-relaxed">
            Fokus pada apa yang penting. UI kami dirancang untuk meminimalkan gangguan dan
            memaksimalkan fokus pada kebahagiaan Anda.
          </p>
        </motion.div>

        {/* Browser mockup with 3D tilt */}
        <motion.div
          className="w-full relative"
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 22, delay: 0.15 }}
        >
          {/* Glow behind mockup */}
          <div className="absolute inset-0 bg-[#c4b5fd]/20 blur-3xl rounded-full scale-105 -z-10" />
          <BrowserMockup />
        </motion.div>

        {/* Feature pills below mockup */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.3 }}
        >
          {[
            { emoji: '🎨', label: 'Beautiful UI' },
            { emoji: '📱', label: 'Mobile First' },
            { emoji: '⚡', label: 'Super Cepat' },
            { emoji: '🔒', label: 'Data Aman' },
            { emoji: '✨', label: 'Selalu Update' },
          ].map((pill) => (
            <motion.div
              key={pill.label}
              whileHover={{ scale: 1.08, y: -3 }}
              transition={SPRING_CONFIG}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/60 text-sm font-semibold text-slate-600 shadow-sm"
              style={{ background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(12px)' }}
            >
              <span>{pill.emoji}</span>
              {pill.label}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
