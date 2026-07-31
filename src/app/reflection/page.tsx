'use client';

import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { useAppData } from '@/lib/context/AppDataContext';
import { Check } from 'lucide-react';

const MOOD_CONFIG = {
  5: { icon: 'sentiment_very_satisfied', color: '#63bd8b', label: 'Sangat Bahagia' },
  4: { icon: 'sentiment_satisfied', color: '#9af6c0', label: 'Baik' },
  3: { icon: 'sentiment_neutral', color: '#ffb59f', label: 'Biasa' },
  2: { icon: 'sentiment_dissatisfied', color: '#ffd580', label: 'Kurang Baik' },
  1: { icon: 'sentiment_very_dissatisfied', color: '#ff8c69', label: 'Buruk' },
} as const;

export default function ReflectionPage() {
  const { reflections, stats, habits, addReflection } = useAppData();
  const [newText, setNewText] = useState('');
  const [newMood, setNewMood] = useState<1 | 2 | 3 | 4 | 5>(4);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!newText.trim()) return;
    
    addReflection({
      date: new Date().toISOString().split('T')[0],
      mood: newMood,
      moodLabel: MOOD_CONFIG[newMood].label,
      text: newText,
      habitsCompleted: stats.completedToday,
      totalHabits: stats.totalHabits,
    });

    setSaved(true);
    setNewText('');
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AppLayout>
      <div className="px-md lg:px-xl py-lg max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-xl">
          <h1 className="text-display font-display text-on-surface">Refleksi Harian</h1>
          <p className="text-body-lg text-on-surface-variant">
            Catat perasaan dan pikiranmu hari ini
          </p>
        </div>

        {/* New Reflection Card */}
        <div className="glass-card rounded-[2rem] p-xl mb-xl hover:shadow-md hover:bg-white/80 dark:hover:bg-slate-800/70 transition-all duration-300">
          <h2 className="text-headline-md font-headline-md text-on-surface mb-lg">Hari ini, bagaimana perasaanmu?</h2>

          {/* Mood Picker */}
          <div className="flex gap-sm justify-center mb-lg">
            {([5, 4, 3, 2, 1] as const).map((mood) => {
              const cfg = MOOD_CONFIG[mood];
              return (
                <button
                  key={mood}
                  onClick={() => setNewMood(mood)}
                  className={`flex flex-col items-center gap-xs p-sm rounded-2xl transition-all ${
                    newMood === mood ? 'scale-110 bg-surface-container-low shadow-md' : 'opacity-60 hover:opacity-90'
                  }`}
                >
                  <span className="material-symbols-outlined text-[36px]" style={{ color: cfg.color, fontVariationSettings: "'FILL' 1" }}>
                    {cfg.icon}
                  </span>
                  <span className="text-[10px] font-bold text-on-surface-variant hidden sm:block">{cfg.label}</span>
                </button>
              );
            })}
          </div>

          {/* Context summary */}
          <div className="flex gap-sm mb-md flex-wrap">
            <span className="text-label-sm bg-primary-fixed text-on-primary-fixed px-sm py-xs rounded-full font-bold">
              🔥 {stats.currentStreak} hari streak
            </span>
            <span className="text-label-sm bg-tertiary-fixed text-on-tertiary-fixed px-sm py-xs rounded-full font-bold">
              ✅ {stats.completedToday}/{stats.totalHabits} habit selesai
            </span>
          </div>

          {/* Text area */}
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Ceritakan hari ini... apa yang berjalan baik? apa yang bisa diperbaiki?"
            rows={4}
            className="w-full p-md bg-surface-container-low rounded-2xl text-on-surface text-body-md focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none border border-outline-variant/20 transition-all"
          />

          <button
            onClick={handleSave}
            disabled={!newText.trim()}
            className={`mt-md w-full py-md rounded-2xl font-bold text-body-md flex items-center justify-center gap-sm transition-all ${
              newText.trim() ? 'bg-primary text-on-primary shadow-lg shadow-primary/20 hover:scale-[1.01]' : 'bg-surface-container-high text-on-surface-variant cursor-not-allowed'
            }`}
          >
            {saved ? (
              <><span className="material-symbols-outlined">check_circle</span> Tersimpan!</>
            ) : (
              <><span className="material-symbols-outlined">save</span> Simpan Refleksi</>
            )}
          </button>
        </div>

        {/* Habit summary mini */}
        <div className="glass-card rounded-[2rem] p-xl mb-xl hover:shadow-md hover:bg-white/80 dark:hover:bg-slate-800/70 transition-all duration-300">
          <h3 className="text-headline-md font-bold text-on-surface mb-md">Habit Hari Ini</h3>
          <div className="space-y-sm">
            {habits.length === 0 ? (
              <p className="text-body-md text-on-surface-variant text-center py-md">Belum ada habit. Tambahkan habit dulu!</p>
            ) : (
              habits.map((h) => (
                <div key={h.id} className="flex items-center gap-md">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: h.color + '33' }}
                  >
                    <span className="material-symbols-outlined text-[16px]" style={{ color: h.color }}>{h.icon}</span>
                  </div>
                  <span className={`flex-1 text-body-md ${h.done_today ? 'line-through text-slate-400 dark:text-slate-500 opacity-60' : 'text-on-surface font-bold'}`}>
                    {h.title}
                  </span>
                  {h.done_today ? (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-emerald-400 via-teal-500 to-green-500 border border-white/60 shadow-sm flex items-center justify-center shrink-0">
                      <Check size={12} strokeWidth={3} className="text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-white/60 border border-orange-200/50 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] shrink-0" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Past reflections */}
        <h2 className="text-headline-md font-headline-md text-on-surface mb-lg">Refleksi Sebelumnya</h2>
        <div className="space-y-md">
          {reflections.map((r) => {
            const moodCfg = MOOD_CONFIG[r.mood];
            return (
              <div key={r.id} className="glass-card rounded-[2rem] p-xl hover:shadow-md hover:bg-white/80 dark:hover:bg-slate-800/70 transition-all duration-300">
                <div className="flex items-center justify-between mb-md">
                  <div className="flex items-center gap-sm">
                    <span className="material-symbols-outlined text-[28px]" style={{ color: moodCfg.color, fontVariationSettings: "'FILL' 1" }}>
                      {moodCfg.icon}
                    </span>
                    <span className="font-bold text-on-surface">{moodCfg.label}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-label-sm text-on-surface-variant">
                      {new Date(r.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </p>
                    <p className="text-label-sm text-tertiary font-bold">{r.habitsCompleted}/{r.totalHabits} habit ✓</p>
                  </div>
                </div>
                <p className="text-body-md text-on-surface-variant leading-relaxed">{r.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
