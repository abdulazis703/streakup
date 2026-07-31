'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AppLayout from '@/components/AppLayout';
import MiniCalendar from '@/components/MiniCalendar';
import FullscreenTrophyCelebration from '@/components/FullscreenTrophyCelebration';
import DailyMotivation from '@/components/DailyMotivation';
import StreakBadge from '@/components/StreakBadge';
import CartoonIcon from '@/components/CartoonIcon';
import { useAppData } from '@/lib/context/AppDataContext';
import { triggerSingleHabitConfetti } from '@/lib/confetti';
import { Flame, Target, Layers, Trophy, Plus, Eye, Trash2, Calendar, Check } from 'lucide-react';

const QUOTES = [
  { text: 'Setiap langkah kecil adalah benih untuk hari esok yang lebih baik.', author: 'Streak Up' },
  { text: 'Konsistensi adalah kunci, bukan kesempurnaan.', author: 'James Clear' },
  { text: 'Mulailah dari yang kecil, tetaplah konsisten, dan bersabarlah.', author: 'Anonim' },
  { text: 'Kebiasaan baik adalah investasi terbaik untuk dirimu.', author: 'Streak Up' },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Selamat pagi';
  if (hour < 15) return 'Selamat siang';
  if (hour < 18) return 'Selamat sore';
  return 'Selamat malam';
}

function getTimeIcon() {
  const hour = new Date().getHours();
  if (hour < 12) return 'light_mode';
  if (hour < 18) return 'partly_cloudy_day';
  return 'dark_mode';
}


export default function DashboardPage() {
  const router = useRouter();
  const { user, profile, habits, stats, checkInHabit, uncheckHabit, loading } = useAppData();

  const [weather, setWeather] = useState({ temp: '--', desc: 'Memuat...' });
  const [quote] = useState(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  const [mounted, setMounted] = useState(false);
  const [checkingIn, setCheckingIn] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, user, router]);

  useEffect(() => {
    setMounted(true);
    navigator.geolocation?.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&current_weather=true`
          );
          const data = await res.json();
          const wmo = data.current_weather?.weathercode;
          const desc = wmo <= 3 ? 'Cerah' : wmo <= 48 ? 'Berkabut' : wmo <= 67 ? 'Hujan' : wmo <= 77 ? 'Bersalju' : 'Badai';
          setWeather({ temp: Math.round(data.current_weather?.temperature) + '°C', desc });
        } catch {
          setWeather({ temp: '29°C', desc: 'Cerah Berawan' });
        }
      },
      () => setWeather({ temp: '29°C', desc: 'Cerah Berawan' })
    );
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleToggleHabit = async (habitId: string, doneTodayStatus: boolean, event?: React.MouseEvent) => {
    if (checkingIn) return; // Prevent multiple simultaneous requests
    setCheckingIn(habitId);

    if (doneTodayStatus) {
      const { error } = await uncheckHabit(habitId);
      if (error) showToast('Gagal membatalkan. Coba lagi.');
      else showToast('Habit dibatalkan ✓');
    } else {
      const { error } = await checkInHabit(habitId);
      if (error) showToast('Gagal check-in. Coba lagi.');
      else {
        showToast('Habit selesai! 🔥');
        if (event) triggerSingleHabitConfetti(event);
      }
    }

    setCheckingIn(null);
  };

  const { completedToday: completed, completionRate: progress, currentStreak, longestStreak, totalHabits } = stats;
  const circumference = 2 * Math.PI * 20;
  const userName = profile?.full_name ?? user?.email?.split('@')[0] ?? 'Pengguna';

  // Cek apakah 100% dan modal belum ditampilkan hari ini
  useEffect(() => {
    if (progress === 100 && totalHabits > 0) {
      const todayStr = new Date().toISOString().split('T')[0];
      const lastCelebration = localStorage.getItem('lastCelebrationDate');
      if (lastCelebration !== todayStr) {
        setShowCelebration(true);
        localStorage.setItem('lastCelebrationDate', todayStr);
      }
    }
  }, [progress, totalHabits]);

  if (!mounted || loading) return null;
  if (!user) return null;

  return (
    <AppLayout>
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-800 text-white text-sm font-bold px-6 py-3 rounded-2xl shadow-xl animate-fade-in-up">
          {toastMsg}
        </div>
      )}

      {/* Celebration Modal */}
      <FullscreenTrophyCelebration show={showCelebration} onClose={() => setShowCelebration(false)} />

      {/* HEADER DASHBOARD */}
      <section className="px-md lg:px-xl pt-lg pb-md">
        <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          {/* Sisi Kiri: Greeting & Subtitle */}
          <div className="flex flex-col gap-1 max-w-2xl">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold !text-slate-900 tracking-tight">
                {getGreeting()}, {userName.split(' ')[0]}!
              </h1>
              <span className="text-2xl">
                {getTimeIcon() === 'light_mode' ? '☀️' : getTimeIcon() === 'partly_cloudy_day' ? '⛅' : '🌙'}
              </span>
            </div>
            <p className="!text-slate-700 text-sm md:text-base leading-relaxed">
              {totalHabits === 0
                ? 'Belum ada habit. Yuk tambahkan habit pertamamu!'
                : <>Kamu sudah menyelesaikan <span className="font-bold text-[#9e4225]">{progress}%</span> targetmu hari ini.{' '}
                    {progress < 100 ? 'Sedikit lagi menuju hari yang sempurna!' : '🎉 Hari yang sempurna!'}</>}
            </p>
          </div>

          {/* Sisi Kanan: Widget Cuaca */}
          <div className="flex items-center gap-3 bg-purple-50/60 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/40 px-4 py-2.5 rounded-2xl shrink-0 self-start md:self-auto">
            <div className="flex flex-col text-right">
              <span className="text-[10px] font-bold !text-slate-700 uppercase tracking-wider">CUACA HARI INI</span>
              <span className="text-xs font-bold !text-slate-900">{weather.temp}, {weather.desc}</span>
            </div>
            <span className="material-symbols-outlined text-purple-600 text-xl">weather_mix</span>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="px-md lg:px-xl grid grid-cols-2 lg:grid-cols-4 gap-md mb-xl">
        {/* Current Streak */}
        <div className="glass-card p-md rounded-[2rem] flex flex-col justify-between h-36 lg:h-40 group hover:-translate-y-1 transition-all cursor-pointer">
          <div className="flex justify-between items-start">
            <CartoonIcon icon={<Flame size={20} strokeWidth={2.5} />} gradient="fire" size="md" />
            <span className="text-label-sm font-stat-label text-primary font-bold bg-primary-fixed px-2 py-1 rounded-full">AKTIF</span>
          </div>
          <div>
            <p className="text-label-sm font-stat-label text-on-surface-variant uppercase tracking-widest mb-xs">Current Streak</p>
            <p className="text-headline-md font-display text-on-surface">{currentStreak} Hari</p>
          </div>
        </div>

        {/* Progress Ring */}
        <div className="glass-card p-md rounded-[2rem] flex flex-col justify-between h-36 lg:h-40 group hover:-translate-y-1 transition-all cursor-pointer">
          <div className="flex justify-between items-start">
            <div className="relative w-12 h-12">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 48 48">
                <circle className="text-surface-container-high" cx="24" cy="24" r="20" fill="transparent" stroke="currentColor" strokeWidth="4" />
                <circle
                  className="text-secondary transition-all duration-1000 ease-in-out"
                  cx="24" cy="24" r="20" fill="transparent" stroke="currentColor"
                  strokeDasharray={circumference.toFixed(1)}
                  strokeDashoffset={(circumference - (circumference * progress / 100)).toFixed(1)}
                  strokeWidth="4" strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] font-stat-label font-bold text-secondary">{progress}%</span>
              </div>
            </div>
            <CartoonIcon icon={<Target size={18} strokeWidth={2.5} />} gradient="purple" size="md" />
          </div>
          <div>
            <p className="text-label-sm font-stat-label text-on-surface-variant uppercase tracking-widest mb-xs">Hari Ini</p>
            <p className="text-headline-md font-headline-md text-on-surface">{completed}/{totalHabits} Habit</p>
          </div>
        </div>

        {/* Total Habits */}
        <div className="glass-card p-md rounded-[2rem] flex flex-col justify-between h-36 lg:h-40 group hover:-translate-y-1 transition-all cursor-pointer">
          <div className="flex justify-between items-start">
            <CartoonIcon icon={<Layers size={18} strokeWidth={2.5} />} gradient="emerald" size="md" />
          </div>
          <div>
            <p className="text-label-sm font-stat-label text-on-surface-variant uppercase tracking-widest mb-xs">Total Habit</p>
            <p className="text-headline-md font-display text-on-surface">{habits.length} Aktif</p>
          </div>
        </div>

        {/* Longest Streak */}
        <div className="glass-card p-md rounded-[2rem] flex flex-col justify-between h-36 lg:h-40 group hover:-translate-y-1 transition-all cursor-pointer">
          <div className="flex justify-between items-start">
            <CartoonIcon icon={<Trophy size={18} strokeWidth={2.5} />} gradient="amber" size="md" />
            <span className="text-label-sm font-stat-label text-secondary/60 font-bold text-right">Rekor</span>
          </div>
          <div>
            <p className="text-label-sm font-stat-label text-on-surface-variant uppercase tracking-widest mb-xs">Terpanjang</p>
            <p className="text-headline-md font-display text-on-surface">{longestStreak} Hari</p>
          </div>
        </div>
      </section>

      {/* Main Content: Habits + Sidebar */}
      <section className="px-md lg:px-xl grid grid-cols-12 gap-lg lg:gap-xl pb-lg">
        {/* Today's Habits */}
        <div className="col-span-12 lg:col-span-8">
          <div className="flex items-center justify-between mb-lg">
            <div>
              <h2 className="text-headline-lg font-headline-lg text-on-surface">Habit Hari Ini</h2>
              <p className="text-body-md font-body-md text-on-surface-variant">
                {habits.length === 0
                  ? 'Tambahkan habit pertamamu!'
                  : `${habits.length - completed} kebiasaan tersisa`
                }
              </p>
            </div>
            <Link
              href="/habits/create"
              className="flex items-center gap-sm bg-primary text-on-primary px-md py-sm rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 hover:shadow-xl transition-all"
            >
              <span className="material-symbols-outlined">add</span>
              <span className="font-body-md font-bold hidden sm:block">Habit Baru</span>
            </Link>
          </div>

          {/* Empty State */}
          {habits.length === 0 && (
            <div className="text-center py-16 glass-card rounded-[2rem] border-2 border-dashed border-white/60">
              <span className="material-symbols-outlined text-[64px] text-on-surface-variant/30 mb-4 block">rocket_launch</span>
              <h3 className="text-headline-md font-bold text-on-surface mb-2">Belum ada habit</h3>
              <p className="text-body-md text-on-surface-variant mb-6">Mulai perjalananmu dengan menambahkan habit pertama!</p>
              <Link
                href="/habits/create"
                className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition-all"
              >
                <span className="material-symbols-outlined">add</span>
                Tambah Habit Pertama
              </Link>
            </div>
          )}

          {/* Habit List */}
          <div className="space-y-sm">
            {habits.map((habit) => (
              <div
                key={habit.id}
                className={`glass-card p-base rounded-[1.5rem] flex items-center justify-between group transition-all cursor-pointer ${
                  habit.done_today ? 'opacity-70 hover:opacity-90' : 'hover:bg-white/90 hover:shadow-md'
                } ${checkingIn === habit.id ? 'pointer-events-none' : ''}`}
                onClick={(e) => handleToggleHabit(habit.id, !!habit.done_today, e)}
              >
                <div className="flex items-center gap-md p-sm">
                  {/* Checkbox */}
                  <div className="w-10 h-10 flex-shrink-0 relative">
                    {checkingIn === habit.id ? (
                      <div className="absolute inset-0 rounded-full border-2 border-emerald-300 flex items-center justify-center">
                        <span className="w-5 h-5 border-2 border-emerald-500/40 border-t-emerald-500 rounded-full animate-spin" />
                      </div>
                    ) : habit.done_today ? (
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-400 via-teal-500 to-green-500 border border-white/60 shadow-md shadow-emerald-500/30 flex items-center justify-center scale-100 transition-all duration-200">
                        <Check size={20} strokeWidth={3} className="text-white" />
                      </div>
                    ) : (
                      <div className="absolute inset-0 rounded-full bg-white/60 border-2 border-orange-200 hover:border-orange-400 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] flex items-center justify-center scale-100 hover:scale-105 active:scale-95 transition-all duration-200">
                        <Check size={20} strokeWidth={3} className="text-transparent group-hover:text-orange-300/60 transition-colors" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className={`text-body-lg font-body-lg font-bold text-on-surface transition-all ${habit.done_today ? 'line-through text-slate-400 opacity-60' : ''}`}>
                      {habit.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <p className="text-label-sm font-stat-label text-primary uppercase">{habit.category}</p>
                      <StreakBadge streak={habit.current_streak} />
                    </div>
                  </div>
                </div>
                <div className="pr-md flex items-center">
                  <span className="material-symbols-outlined text-on-surface-variant/30 hover:text-primary transition-colors">more_vert</span>
                </div>
              </div>
            ))}

            {/* See all link */}
            {habits.length > 0 && (
              <Link href="/today" className="flex items-center justify-center gap-sm py-sm text-secondary font-body-md hover:text-primary transition-colors group">
                <span>Lihat semua habit</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-lg">
          {/* Quote Card */}
          <DailyMotivation quote={quote} />

          {/* Mini Calendar */}
          <MiniCalendar />

          {/* Reflection Card */}
          <Link href="/reflection" className="relative w-full h-44 rounded-[2.5rem] overflow-hidden shadow-xl group block">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1484627147104-f5197bcd6651?w=600&q=80')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex items-end p-xl">
              <div className="text-on-primary">
                <p className="text-label-sm font-stat-label uppercase tracking-widest opacity-80">Daily Reflection</p>
                <p className="text-headline-md font-headline-md">Tulis perasaanmu →</p>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </AppLayout>
  );
}
