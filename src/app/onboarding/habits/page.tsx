'use client';

import { useState } from 'react';
import Link from 'next/link';

const RECOMMENDED_HABITS = [
  { id: 'h1', title: 'Minum air 2L', category: 'HIDRASI', icon: 'water_drop', bgClass: 'bg-primary-fixed', textClass: 'text-primary' },
  { id: 'h2', title: 'Meditasi 5 menit', category: 'KESEHATAN MENTAL', icon: 'self_improvement', bgClass: 'bg-tertiary-fixed', textClass: 'text-tertiary' },
  { id: 'h3', title: 'Membaca 10 halaman', category: 'PENGEMBANGAN DIRI', icon: 'menu_book', bgClass: 'bg-secondary-fixed', textClass: 'text-secondary' },
  { id: 'h4', title: 'Jalan pagi 15 menit', category: 'KEBUGARAN', icon: 'directions_run', bgClass: 'bg-primary-fixed-dim', textClass: 'text-on-primary-container' },
];

export default function HabitsSelectionPage() {
  const [selected, setSelected] = useState<string[]>(['h1']);

  const toggleHabit = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const isNextEnabled = selected.length > 0 && selected.length <= 3;

  return (
    <div className="min-h-screen w-full bg-surface flex flex-col items-center justify-center pt-20 pb-xl px-container-padding relative overflow-hidden">
      <div className="flex flex-col w-full max-w-2xl mx-auto z-10">
        {/* Progress Indicator */}
        <div className="flex justify-center items-center gap-sm mb-xl">
          <div className="w-2 h-2 rounded-full bg-primary/20"></div>
          <div className="w-2 h-2 rounded-full bg-primary/20"></div>
          <div className="w-8 h-2 rounded-full bg-primary shadow-[0_0_12px_rgba(158,66,37,0.3)] transition-all duration-500"></div>
          <div className="w-2 h-2 rounded-full bg-surface-container-highest"></div>
        </div>

        {/* Header Section */}
        <div className="text-center mb-lg space-y-sm w-full">
          <h1 className="font-display text-display text-on-surface tracking-tight" style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
            Pilih kebiasaan pertamamu
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md mx-auto" style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
            Pilih 1-3 kebiasaan untuk memulai perjalanan hari ini. Tenang, kamu bisa mengubahnya nanti.
          </p>
        </div>

        {/* Habits Grid */}
        <div className="grid grid-cols-1 gap-md mb-xl w-full">
          {RECOMMENDED_HABITS.map((habit) => {
            const isSelected = selected.includes(habit.id);
            return (
              <div
                key={habit.id}
                onClick={() => toggleHabit(habit.id)}
                className={`habit-card group relative overflow-hidden bg-surface-container-low p-md rounded-[24px] cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-2 ${
                  isSelected ? 'border-primary bg-white shadow-[0_10px_30px_-10px_rgba(158,66,37,0.15)]' : 'border-transparent'
                }`}
              >
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-md">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${habit.bgClass} ${habit.textClass}`}>
                      <span className="material-symbols-outlined text-[28px]">{habit.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-headline-md text-headline-md text-on-surface">{habit.title}</h3>
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{habit.category}</span>
                    </div>
                  </div>
                  <div className={`checkbox-ring w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    isSelected ? 'bg-primary border-primary' : 'border-outline-variant'
                  }`}>
                    <span className={`material-symbols-outlined text-on-primary text-[20px] transition-transform duration-300 ${
                      isSelected ? 'scale-100' : 'scale-0'
                    }`}>
                      check
                    </span>
                  </div>
                </div>
                <div className={`absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent transition-opacity duration-300 ${
                  isSelected ? 'opacity-100' : 'opacity-0'
                }`}></div>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-md w-full">
          <Link
            href="/onboarding/categories"
            className="flex-1 h-14 rounded-xl font-headline-md text-headline-md text-on-surface-variant bg-surface-container-high transition-transform active:scale-95 hover:bg-surface-container-highest flex items-center justify-center"
          >
            Kembali
          </Link>
          <Link
            href="/onboarding/ready"
            className={`flex-[2] h-14 rounded-xl font-headline-md text-headline-md text-on-primary bg-primary shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center justify-center ${
              isNextEnabled ? 'hover:scale-[1.02] hover:shadow-xl' : 'opacity-50 cursor-not-allowed pointer-events-none'
            }`}
            style={{ pointerEvents: isNextEnabled ? 'auto' : 'none' }}
          >
            Lanjut
          </Link>
        </div>

        {/* Subtle Tip */}
        <div className="mt-lg flex items-center justify-center gap-xs text-on-surface-variant/60 w-full">
          <span className="material-symbols-outlined text-[18px]">info</span>
          <p className="font-label-sm text-label-sm">Kamu dapat menambahkan kebiasaan kustom nanti</p>
        </div>
      </div>
    </div>
  );
}