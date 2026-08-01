'use client';

import { useState, useEffect } from 'react';
import AppLayout from '@/components/AppLayout';
import { useAppData } from '@/lib/context/AppDataContext';
import FullscreenTrophyCelebration from '@/components/FullscreenTrophyCelebration';
import StreakBadge from '@/components/StreakBadge';
import { triggerSingleHabitConfetti } from '@/lib/confetti';
import type { Habit } from '@/lib/supabase/types';
import { Check } from 'lucide-react';

const CATEGORY_STYLE: Record<string, { gradient: string; icon: string; glow: string }> = {
  Kesehatan:   { gradient: 'from-rose-400 via-pink-500 to-red-500',      icon: 'favorite',          glow: 'shadow-rose-400/40' },
  Mindfulness: { gradient: 'from-emerald-400 via-teal-500 to-cyan-500',  icon: 'self_improvement',  glow: 'shadow-emerald-400/40' },
  Belajar:     { gradient: 'from-violet-500 via-purple-500 to-indigo-500',icon: 'school',            glow: 'shadow-violet-400/40' },
  Olahraga:    { gradient: 'from-orange-400 via-amber-500 to-yellow-400', icon: 'fitness_center',    glow: 'shadow-orange-400/40' },
  Produktif:   { gradient: 'from-blue-500 via-indigo-500 to-purple-500',  icon: 'rocket_launch',    glow: 'shadow-blue-400/40' },
  Hobi:        { gradient: 'from-fuchsia-400 via-pink-500 to-rose-400',   icon: 'palette',          glow: 'shadow-fuchsia-400/40' },
  Keuangan:    { gradient: 'from-amber-400 via-yellow-400 to-lime-400',   icon: 'savings',          glow: 'shadow-amber-400/40' },
  Umum:        { gradient: 'from-sky-400 via-blue-400 to-indigo-400',     icon: 'star',             glow: 'shadow-sky-400/40' },
};

function getDefaultStyle() {
  return { gradient: 'from-sky-400 via-blue-400 to-indigo-400', icon: 'star', glow: 'shadow-sky-400/40' };
}

function CategoryIconBubble({ category, habitIcon }: { category: string; habitIcon?: string }) {
  const style = CATEGORY_STYLE[category] ?? getDefaultStyle();
  const iconName = habitIcon || style.icon;
  return (
    <div
      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${style.gradient} flex items-center justify-center shadow-lg ${style.glow} group-hover:scale-110 transition-transform duration-200 flex-shrink-0`}
    >
      <span
        className="material-symbols-outlined text-white text-[22px] drop-shadow"
        style={{ fontVariationSettings: "'FILL' 1, 'wght' 500" }}
      >
        {iconName}
      </span>
    </div>
  );
}

export default function TodayPage() {
  const { habits, stats, checkInHabit, uncheckHabit, profile } = useAppData();
  const [showXP, setShowXP] = useState<string | null>(null);
  const [checkingIn, setCheckingIn] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const { completedToday: completed, completionRate: progress, totalHabits } = stats;

  const XP_MAP: Record<string, number> = { easy: 10, medium: 20, hard: 35 };
  const getXP = (h: Habit) => XP_MAP[(h.target_days <= 7 ? 'easy' : h.target_days <= 14 ? 'medium' : 'hard')] ?? 10;

  const totalXP = habits.filter(h => h.done_today).reduce((acc, h) => acc + getXP(h), 0);
  const allDone = totalHabits > 0 && progress === 100;

  // Celebration trigger
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

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2000);
  };

  const handleToggle = async (habit: Habit, event?: React.MouseEvent) => {
    if (checkingIn) return;
    setCheckingIn(habit.id);

    if (habit.done_today) {
      const { error } = await uncheckHabit(habit.id);
      if (error) showToast('Gagal membatalkan');
      else showToast('Dibatalkan ✓');
    } else {
      const { error } = await checkInHabit(habit.id);
      if (error) showToast('Gagal check-in');
      else {
        showToast('Habit selesai! 🔥');
        if (event) triggerSingleHabitConfetti(event);
        setShowXP(habit.id);
        setTimeout(() => setShowXP(null), 1500);
      }
    }
    setCheckingIn(null);
  };

  const userName = profile?.full_name ?? 'Pengguna';
  const currentStreak = habits.length > 0 ? Math.max(...habits.map(h => h.current_streak), 0) : 0;

  return (
    // @ts-ignore
    <AppLayout currentStreak={currentStreak} userName={userName}>
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-800 text-white text-sm font-bold px-6 py-3 rounded-2xl shadow-xl">
          {toastMsg}
        </div>
      )}

      {/* Celebration Modal */}
      <FullscreenTrophyCelebration show={showCelebration} onClose={() => setShowCelebration(false)} />

      <div className="px-md lg:px-xl py-lg max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-xl">
          <h1 className="text-display font-display text-on-surface">Habit Hari Ini</h1>
          <p className="text-body-lg text-on-surface-variant">
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* Progress Overview - Glassmorphism & Disney Cartoon Aesthetic */}
        <div className="relative overflow-hidden backdrop-blur-xl bg-white/40 dark:bg-slate-800/40 border-[3px] border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_4px_12px_rgba(255,255,255,0.4)] rounded-[2.5rem] p-xl mb-xl transition-all duration-300 hover:shadow-[0_16px_48px_rgba(0,0,0,0.15)] hover:-translate-y-1">
          {/* Subtle cartoon reflection on top */}
          <div className="absolute top-2 left-[10%] right-[10%] h-4 bg-white/30 blur-[4px] rounded-full opacity-60 pointer-events-none" />
          
          <div className="flex items-center justify-between mb-lg relative z-10">
            <div>
              <p className="text-label-sm font-stat-label text-slate-600 dark:text-slate-300 uppercase tracking-widest mb-xs font-bold drop-shadow-sm">Progress Hari Ini</p>
              <div className="flex items-baseline gap-1">
                <p className="text-[2.75rem] leading-none font-display text-slate-800 dark:text-white drop-shadow-sm">{completed}</p>
                <p className="text-2xl font-display text-slate-500 dark:text-slate-400">/ {totalHabits}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-label-sm font-stat-label text-slate-600 dark:text-slate-300 uppercase tracking-widest mb-xs font-bold drop-shadow-sm">XP Diperoleh</p>
              <p className="text-[2.75rem] leading-none font-display text-amber-500 drop-shadow-sm">+{totalXP}</p>
            </div>
          </div>
          
          {/* Cartoon Progress Bar */}
          <div className="relative w-full h-10 bg-slate-200/50 dark:bg-slate-700/50 rounded-full border-[3px] border-white/80 shadow-[inset_0_2px_6px_rgba(0,0,0,0.15)] p-[3px] z-10 overflow-hidden">
            <div
              className={`relative h-full rounded-full transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${allDone ? 'bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400' : 'bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500'}`}
              style={{ width: `${progress}%` }}
            >
              {/* Progress Bar Highlight (Cartoon shine) */}
              <div className="absolute top-0 left-0 right-0 h-[40%] bg-white/40 rounded-t-full" />
            </div>
          </div>
          
          <div className="flex justify-between mt-sm relative z-10">
            <span className="text-label-sm font-bold text-slate-600 dark:text-slate-300 drop-shadow-sm">{progress}% selesai</span>
            <span className="text-label-sm font-bold text-slate-600 dark:text-slate-300 drop-shadow-sm">{totalHabits - completed} tersisa</span>
          </div>

          {allDone && (
            <div className="mt-lg p-md bg-gradient-to-r from-amber-200/80 to-yellow-400/80 border-2 border-white/80 rounded-[1.5rem] flex items-center gap-md shadow-lg transform transition-transform hover:scale-[1.02] z-10 relative">
              <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center shadow-inner shrink-0">
                <span className="material-symbols-outlined text-amber-600 text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>celebration</span>
              </div>
              <div>
                <p className="font-display text-xl text-slate-800 drop-shadow-sm">Hari yang sempurna! 🎉</p>
                <p className="text-body-sm font-bold text-slate-700">Semua habit selesai! +15 XP bonus Perfect Day</p>
              </div>
            </div>
          )}
        </div>

        {/* Empty state */}
        {habits.length === 0 && (
          <div className="text-center py-16 text-on-surface-variant">
            <span className="material-symbols-outlined text-[64px] opacity-30 block mb-4">checklist</span>
            <p className="font-bold text-body-lg">Belum ada habit</p>
            <p className="text-body-md mt-2">Tambahkan habit di halaman Habits</p>
          </div>
        )}

        {/* Habit List */}
        <div className="space-y-sm">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className={`relative glass-card rounded-[1.5rem] p-md flex items-center gap-md transition-all cursor-pointer group ${
                habit.done_today ? 'opacity-70' : 'hover:bg-white/90 dark:hover:bg-slate-800/80 hover:shadow-md'
              } ${checkingIn === habit.id ? 'pointer-events-none' : ''}`}
              onClick={(e) => handleToggle(habit, e)}
            >
              {/* XP Flash */}
              {showXP === habit.id && (
                <div className="absolute -top-4 right-6 z-10 text-tertiary font-bold text-headline-md animate-float pointer-events-none">
                  +{getXP(habit)} XP ✨
                </div>
              )}

              {/* Icon / Checkbox */}
              <div className="relative w-12 h-12 flex-shrink-0">
                {checkingIn === habit.id ? (
                  <div className="absolute inset-0 rounded-2xl flex items-center justify-center border-2 border-emerald-300">
                    <span className="w-5 h-5 border-2 border-emerald-500/40 border-t-emerald-500 rounded-full animate-spin" />
                  </div>
                ) : habit.done_today ? (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-emerald-400 via-teal-500 to-green-500 shadow-lg shadow-emerald-500/30 border border-white/80 flex items-center justify-center scale-100 transition-all duration-200 animate-pop">
                    <Check size={24} strokeWidth={3.5} className="text-white drop-shadow" />
                  </div>
                ) : (
                  <CategoryIconBubble category={habit.category} habitIcon={habit.icon} />
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <h3 className={`text-body-lg font-bold text-on-surface transition-all duration-200 ${habit.done_today ? 'line-through text-slate-400 dark:text-slate-500 opacity-60' : ''}`}>
                  {habit.title}
                </h3>
                <div className="flex items-center gap-sm mt-xs flex-wrap">
                  <span className="text-label-sm font-stat-label text-on-surface-variant uppercase tracking-wide">{habit.category}</span>
                  <StreakBadge streak={habit.current_streak} />
                </div>
              </div>

              {/* XP Badge */}
              <div className={`px-sm py-xs rounded-full text-label-sm font-bold ${habit.done_today ? 'bg-tertiary-fixed text-tertiary' : 'bg-surface-container-high text-on-surface-variant'}`}>
                +{getXP(habit)} XP
              </div>
            </div>
          ))}
        </div>

        {/* Daily Reflection CTA */}
        {allDone && (
          <div className="mt-xl bg-gradient-to-br from-secondary-container/40 to-secondary-container/20 rounded-[2rem] p-xl border border-secondary-container/30 text-center">
            <span className="material-symbols-outlined text-secondary text-[48px] mb-md block" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            <h3 className="text-headline-md font-headline-md text-on-surface mb-sm">Luar biasa!</h3>
            <p className="text-body-md text-on-surface-variant mb-lg">Semua habit selesai! Bagaimana perasaanmu hari ini?</p>
            <a href="/reflection" className="inline-flex items-center gap-sm bg-secondary text-on-secondary px-lg py-sm rounded-xl font-body-md font-bold hover:scale-105 transition-transform shadow-lg shadow-secondary/20">
              <span>Tulis Refleksi</span>
              <span className="material-symbols-outlined">edit_note</span>
            </a>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
