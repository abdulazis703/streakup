'use client';
import { useState } from 'react';
import Link from 'next/link';

const CATEGORIES = [
  { id: 'health', icon: 'favorite', label: 'Kesehatan', color: '#ff8c69' },
  { id: 'productivity', icon: 'work', label: 'Produktivitas', color: '#b7a8fe' },
  { id: 'mindfulness', icon: 'self_improvement', label: 'Mindfulness', color: '#63bd8b' },
  { id: 'learning', icon: 'school', label: 'Belajar', color: '#ffb59f' },
  { id: 'fitness', icon: 'fitness_center', label: 'Olahraga', color: '#cabeff' },
  { id: 'finance', icon: 'savings', label: 'Keuangan', color: '#9af6c0' },
];

export default function CategoriesPage() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleCat = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-xl relative overflow-hidden" style={{ boxSizing: 'border-box' }}>
      <div className="max-w-3xl w-full z-10 flex flex-col gap-xl px-4" style={{ boxSizing: 'border-box' }}>
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-sm w-full">
          <div className="flex gap-2 mb-lg">
            <div className="w-3 h-2 rounded-full bg-primary" />
            <div className="w-12 h-2 rounded-full bg-primary" />
            <div className="w-3 h-2 rounded-full bg-surface-container-highest" />
          </div>
          <h1 className="font-display text-display text-on-surface" style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>Area Fokusmu</h1>
          <p className="font-body-lg text-on-surface-variant max-w-lg" style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>Pilih 1-3 area yang ingin kamu tingkatkan saat ini. Kami akan memberikan rekomendasi habit yang sesuai.</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-md max-w-2xl mx-auto w-full" style={{ boxSizing: 'border-box' }}>
          {CATEGORIES.map((cat) => {
            const isSelected = selected.includes(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => toggleCat(cat.id)}
                className={`p-xl rounded-[2rem] flex flex-col items-center text-center gap-sm transition-all duration-300 border-4 group ${
                  isSelected
                    ? 'border-primary bg-primary-fixed/20 shadow-xl scale-105'
                    : 'border-transparent bg-surface-container-low hover:bg-surface-container-high hover:-translate-y-1'
                }`}
                style={{ width: '100%', boxSizing: 'border-box' }}
              >
                <div 
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
                    isSelected ? 'shadow-lg scale-110' : 'group-hover:scale-110'
                  }`}
                  style={{ backgroundColor: cat.color + (isSelected ? '44' : '22') }}
                >
                  <span 
                    className="material-symbols-outlined text-[32px] transition-all" 
                    style={{ color: cat.color, fontVariationSettings: isSelected ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {cat.icon}
                  </span>
                </div>
                <span className={`font-headline-md text-body-lg ${isSelected ? 'text-primary font-bold' : 'text-on-surface'}`} style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                  {cat.label}
                </span>
                
                {/* Check indicator */}
                <div className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                  isSelected ? 'bg-primary scale-100' : 'scale-0'
                }`}>
                  <span className="material-symbols-outlined text-[14px] text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center gap-md mt-lg w-full" style={{ boxSizing: 'border-box' }}>
          <Link
            href="/onboarding/ready"
            className={`w-full max-w-sm h-16 rounded-2xl font-headline-md flex items-center justify-center gap-sm transition-all ${
              selected.length > 0 
                ? 'bg-primary text-on-primary shadow-xl shadow-primary/20 hover:scale-105 active:scale-95'
                : 'bg-surface-container-high text-on-surface-variant cursor-not-allowed'
            }`}
            style={{ pointerEvents: selected.length > 0 ? 'auto' : 'none', width: '100%', display: 'flex' }}
          >
            <span>Lanjut ({selected.length}/3)</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
          <Link href="/onboarding/welcome" className="text-on-surface-variant font-body-md hover:text-primary transition-colors" style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
            Kembali
          </Link>
        </div>
      </div>
    </div>
  );
}
