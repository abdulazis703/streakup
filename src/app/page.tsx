'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ForceLightMode from '@/components/ForceLightMode';

// Floating sparkle positions (static to avoid hydration mismatch)
const SPARKLES = [
  { top: '12%', left: '8%', size: 18, delay: '0s', duration: '3.2s' },
  { top: '20%', left: '88%', size: 14, delay: '0.5s', duration: '2.8s' },
  { top: '45%', left: '5%', size: 10, delay: '1s', duration: '3.5s' },
  { top: '60%', left: '92%', size: 16, delay: '0.3s', duration: '2.6s' },
  { top: '78%', left: '15%', size: 12, delay: '0.8s', duration: '3.1s' },
  { top: '85%', left: '80%', size: 20, delay: '0.2s', duration: '2.9s' },
  { top: '35%', left: '50%', size: 8, delay: '1.2s', duration: '4s' },
  { top: '10%', left: '45%', size: 13, delay: '0.6s', duration: '3.4s' },
];

const FEATURES = [
  {
    icon: '🔥',
    title: 'Streak Ajaib',
    desc: 'Bangun rantai kebiasaan yang tak terputus. Setiap hari bertambah adalah petualangan baru!',
    color: 'from-orange-100 to-rose-100',
    border: 'border-orange-200',
  },
  {
    icon: '🌟',
    title: 'XP & Pencapaian',
    desc: 'Dapatkan poin pengalaman dan buka lencana spesial setiap kali kamu meraih milestone.',
    color: 'from-yellow-100 to-amber-100',
    border: 'border-yellow-200',
  },
  {
    icon: '📅',
    title: 'Kalender Cantik',
    desc: 'Lihat progresmu dalam tampilan kalender warna-warni yang menyenangkan untuk dilihat.',
    color: 'from-violet-100 to-purple-100',
    border: 'border-violet-200',
  },
  {
    icon: '✍️',
    title: 'Jurnal Refleksi',
    desc: 'Tulis perasaan dan pencapaianmu setiap hari. Berkembang dengan penuh kesadaran.',
    color: 'from-teal-100 to-cyan-100',
    border: 'border-teal-200',
  },
  {
    icon: '📊',
    title: 'Statistik Rapi',
    desc: 'Grafik dan analitik yang memperlihatkan tren kebiasaanmu secara jelas dan cantik.',
    color: 'from-blue-100 to-indigo-100',
    border: 'border-blue-200',
  },
  {
    icon: '🎉',
    title: 'Perayaan Seru',
    desc: 'Konfeti dan animasi perayaan spesial saat kamu menyelesaikan semua habit hari ini!',
    color: 'from-pink-100 to-fuchsia-100',
    border: 'border-pink-200',
  },
];

const HEATMAP = Array.from({ length: 7 * 14 }, (_, i) => i);

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen text-slate-800 font-sans overflow-x-hidden"
      style={{ background: 'linear-gradient(135deg, #FFF8F0 0%, #FDF4FF 30%, #F0F8FF 60%, #FFF5F8 100%)' }}>
      <ForceLightMode />

      {/* Floating Sparkles Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {SPARKLES.map((s, i) => (
          <div
            key={i}
            className="absolute select-none"
            style={{
              top: s.top,
              left: s.left,
              animation: `cozyFloat ${s.duration} ease-in-out ${s.delay} infinite`,
              fontSize: s.size,
              opacity: 0.6,
            }}
          >
            ✨
          </div>
        ))}
        {/* Soft gradient blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle, #FFD6E7, transparent 70%)' }} />
        <div className="absolute top-1/3 left-0 w-80 h-80 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #C8E6F5, transparent 70%)' }} />
        <div className="absolute bottom-20 right-1/4 w-72 h-72 rounded-full opacity-25 blur-3xl"
          style={{ background: 'radial-gradient(circle, #E8D5FF, transparent 70%)' }} />
      </div>

      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-xl"
        style={{ background: 'rgba(255, 248, 240, 0.85)', borderBottom: '1px solid rgba(255, 200, 180, 0.3)' }}>
        <div className="h-18 w-full px-6 flex items-center justify-between max-w-6xl mx-auto py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
              style={{ background: 'linear-gradient(135deg, #FFB347, #FF7F7F)' }}>
              🔥
            </div>
            <span className="text-xl font-extrabold tracking-tight"
              style={{ background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Streak Up
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {['Fitur', 'Cara Kerja', 'Tentang'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-sm font-semibold text-slate-500 hover:text-violet-500 transition-colors">
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login"
              className="px-5 py-2 text-sm font-bold rounded-2xl border-2 border-violet-200 text-violet-600 hover:bg-violet-50 transition-all">
              Masuk
            </Link>
            <Link href="/register"
              className="px-5 py-2 text-sm font-bold rounded-2xl text-white shadow-lg hover:scale-105 transition-all"
              style={{ background: 'linear-gradient(135deg, #FF6B9D, #C084FC)' }}>
              Daftar ✨
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-20">

        {/* ── HERO ── */}
        <section className="px-6 pt-16 pb-20 flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Mascot / Hero Illustration */}
          <div className="relative mb-8" style={{ animation: 'cozyFloat 4s ease-in-out infinite' }}>
            <div className="w-36 h-36 rounded-full flex items-center justify-center text-7xl shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #FFE0B2, #FFCCBC)',
                boxShadow: '0 20px 60px rgba(255, 107, 107, 0.25), 0 0 0 8px rgba(255, 200, 180, 0.3)',
              }}>
              🌟
            </div>
            {/* Orbit sparkles */}
            <div className="absolute -top-2 -right-2 text-2xl" style={{ animation: 'cozyFloat 2.5s ease-in-out 0.3s infinite' }}>✨</div>
            <div className="absolute -bottom-2 -left-3 text-xl" style={{ animation: 'cozyFloat 3s ease-in-out 0.8s infinite' }}>💫</div>
            <div className="absolute top-4 -left-6 text-lg" style={{ animation: 'cozyFloat 2.8s ease-in-out 0.5s infinite' }}>⭐</div>
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
            style={{ background: 'linear-gradient(135deg, #FFE4EC, #EDE9FE)', color: '#C084FC', border: '1px solid #DDD6FE' }}>
            ✦ Aplikasi Habit Tracker Terfantasi ✦
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6" style={{ letterSpacing: '-0.02em' }}>
            <span className="text-slate-800">Bangun Kebiasaan Baik</span>
            <br />
            <span style={{ background: 'linear-gradient(135deg, #FF6B9D, #C084FC, #60A5FA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              dengan Keajaiban ✨
            </span>
          </h1>

          <p className="text-lg text-slate-500 max-w-xl mb-10 leading-relaxed">
            Jadikan setiap hari terasa seperti petualangan dongeng. Track habit, kumpulkan streak, dan rayakan pencapaianmu dengan cara yang paling menyenangkan.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link href="/register"
              className="px-10 py-4 text-white font-bold text-base rounded-3xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all"
              style={{ background: 'linear-gradient(135deg, #FF6B9D, #C084FC)', boxShadow: '0 10px 40px rgba(192, 132, 252, 0.4)' }}>
              Mulai Petualangan 🚀
            </Link>
            <Link href="/login"
              className="px-10 py-4 font-bold text-base rounded-3xl border-2 border-violet-200 text-violet-600 hover:bg-violet-50 hover:scale-105 transition-all"
              style={{ background: 'rgba(255,255,255,0.8)' }}>
              Sudah Punya Akun →
            </Link>
          </div>

          {/* Stats pill */}
          <div className="mt-12 flex items-center gap-6 flex-wrap justify-center">
            {[['🔥', '10.000+', 'Habit Selesai'], ['⭐', '4.9/5', 'Rating Pengguna'], ['🎯', '98%', 'Kepuasan']].map(([icon, val, label]) => (
              <div key={label} className="flex items-center gap-2 px-5 py-3 rounded-2xl shadow-md"
                style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,200,180,0.4)' }}>
                <span className="text-2xl">{icon}</span>
                <div className="text-left">
                  <div className="font-extrabold text-slate-800 text-base">{val}</div>
                  <div className="text-xs text-slate-400 font-medium">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── HEATMAP PREVIEW ── */}
        <section className="px-6 pb-20 max-w-4xl mx-auto">
          <div className="rounded-3xl p-8 shadow-xl relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,240,255,0.9))', border: '1px solid rgba(200,180,255,0.3)' }}>
            <div className="absolute top-4 right-6 text-2xl opacity-40">✨</div>
            <h3 className="text-lg font-extrabold text-slate-700 mb-1">Streak Heatmap</h3>
            <p className="text-xs text-slate-400 mb-5">Visualisasi konsistensimu dalam 14 minggu terakhir</p>
            <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(14, 1fr)' }}>
              {HEATMAP.map((i) => {
                const intensity = Math.sin(i * 0.4 + 1) * 0.5 + 0.5;
                const colors = ['#F3E8FF', '#DDD6FE', '#C4B5FD', '#A78BFA', '#7C3AED'];
                const colorIdx = Math.floor(intensity * colors.length);
                return (
                  <div key={i} className="rounded-md aspect-square"
                    style={{ backgroundColor: colors[Math.min(colorIdx, colors.length - 1)] }} />
                );
              })}
            </div>
            <div className="flex items-center gap-2 mt-4">
              <span className="text-xs text-slate-400">Sedikit</span>
              {['#F3E8FF', '#DDD6FE', '#C4B5FD', '#A78BFA', '#7C3AED'].map((c) => (
                <div key={c} className="w-4 h-4 rounded" style={{ backgroundColor: c }} />
              ))}
              <span className="text-xs text-slate-400">Banyak</span>
            </div>
          </div>
        </section>

        {/* ── FITUR ── */}
        <section id="fitur" className="px-6 pb-24 max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
              style={{ background: 'linear-gradient(135deg, #FFF0E0, #FFE4EC)', color: '#FF6B9D', border: '1px solid #FFC0CB' }}>
              ✦ Fitur Ajaib ✦
            </div>
            <h2 className="text-4xl font-extrabold text-slate-800 mb-4">
              Semua yang kamu butuhkan 🌈
            </h2>
            <p className="text-slate-500 max-w-md mx-auto">Dirancang dengan penuh kasih sayang untuk membuatmu bersemangat setiap harinya</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title}
                className={`rounded-3xl p-7 border-2 ${f.border} hover:-translate-y-2 hover:shadow-xl transition-all duration-300`}
                style={{ background: `linear-gradient(135deg, ${f.color.split(' ')[1].replace('to-', '')} 0%, white 100%)` }}>
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-extrabold text-slate-800 text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section id="tentang" className="px-6 pb-24">
          <div className="max-w-3xl mx-auto rounded-[2.5rem] p-12 text-center relative overflow-hidden shadow-2xl"
            style={{ background: 'linear-gradient(135deg, #FF6B9D, #C084FC, #60A5FA)' }}>
            <div className="absolute top-4 left-8 text-3xl opacity-40" style={{ animation: 'cozyFloat 3s ease-in-out infinite' }}>✨</div>
            <div className="absolute bottom-4 right-8 text-2xl opacity-40" style={{ animation: 'cozyFloat 2.5s ease-in-out 0.5s infinite' }}>💫</div>
            <div className="absolute top-8 right-12 text-xl opacity-30" style={{ animation: 'cozyFloat 3.5s ease-in-out 1s infinite' }}>⭐</div>

            <h2 className="text-4xl font-extrabold text-white mb-4">
              Mulai perjalananmu hari ini! 🌟
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Bergabunglah dengan ribuan pengguna yang sudah merasakan keajaiban membangun kebiasaan.
            </p>
            <Link href="/register"
              className="inline-flex items-center gap-2 px-10 py-4 bg-white font-extrabold text-violet-600 rounded-3xl shadow-xl hover:scale-105 transition-all">
              Daftar Gratis Sekarang ✨
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-10 text-sm text-slate-400 border-t border-slate-100">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-xl">🔥</span>
            <span className="font-bold text-slate-600">Streak Up</span>
          </div>
          <p>Dibuat dengan 💜 untuk membantu kamu tumbuh setiap hari</p>
          <p className="mt-1">© 2026 Streak Up. Hak Cipta Dilindungi.</p>
        </footer>
      </main>

      <style>{`
        @keyframes cozyFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(3deg); }
        }
      `}</style>
    </div>
  );
}