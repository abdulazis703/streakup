"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/lib/context/AuthContext';

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const CATEGORIES = [
  { id: 'learning', label: 'Belajar', icon: 'school' },
  { id: 'health', label: 'Kesehatan', icon: 'favorite' },
  { id: 'fitness', label: 'Olahraga', icon: 'fitness_center' },
  { id: 'productivity', label: 'Produktif', icon: 'work' },
  { id: 'hobby', label: 'Hobi', icon: 'palette' },
  { id: 'mindful', label: 'Mindful', icon: 'self_improvement' },
];

const CATEGORY_MAP: Record<string, string> = {
  learning: 'Belajar',
  health: 'Kesehatan',
  fitness: 'Olahraga',
  productivity: 'Produktif',
  hobby: 'Hobi',
  mindful: 'Mindfulness',
};

const HABITS_LIST = [
  { id: 'h1', title: 'Minum air 2L', category: 'health', icon: 'water_drop', color: '#ff8c69' },
  { id: 'h2', title: 'Meditasi 5 menit', category: 'mindful', icon: 'self_improvement', color: '#63bd8b' },
  { id: 'h3', title: 'Membaca 10 halaman', category: 'learning', icon: 'menu_book', color: '#ffb59f' },
  { id: 'h4', title: 'Jalan pagi 15 menit', category: 'fitness', icon: 'directions_run', color: '#cabeff' },
  { id: 'h5', title: 'Journaling', category: 'mindful', icon: 'edit_note', color: '#b7a8fe' },
];

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export default function OnboardingFlow() {
  const router = useRouter();
  const { refreshHabits } = useAuth();

  const [step, setStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedHabitIds, setSelectedHabitIds] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const toggleHabit = (id: string) => {
    setSelectedHabitIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  // ── Save selected habits to Supabase ──
  const saveHabitsAndFinish = async () => {
    setSaving(true);
    setSaveError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User tidak ditemukan. Silakan login ulang.');

      const habitsToInsert = HABITS_LIST
        .filter(h => selectedHabitIds.includes(h.id))
        .map(h => ({
          user_id: user.id,
          title: h.title,
          category: CATEGORY_MAP[h.category] ?? h.category,
          icon: h.icon,
          color: h.color,
          target_days: 7,
        }));

      if (habitsToInsert.length > 0) {
        const { error } = await supabase.from('habits').insert(habitsToInsert);
        if (error) throw new Error(error.message);
      }

      // Mark onboarding as complete
      await supabase
        .from('profiles')
        .update({ onboarding_completed: true })
        .eq('id', user.id);

      // Refresh global habits state
      await refreshHabits();

      // Go to step 4 (ready)
      nextStep();
    } catch (e: unknown) {
      setSaveError(e instanceof Error ? e.message : 'Terjadi kesalahan. Coba lagi.');
    } finally {
      setSaving(false);
    }
  };

  // ─────────────────────────────────────────────
  // STEP 1: WELCOME
  // ─────────────────────────────────────────────
  const renderStep1 = () => (
    <div className="flex flex-col items-center justify-center flex-1 text-center w-full my-auto py-4" style={{ width: '100%' }}>
      <div className="w-52 h-52 sm:w-64 sm:h-64 mx-auto mb-6 bg-orange-50 rounded-full flex items-center justify-center relative shadow-inner overflow-hidden border border-orange-100 shrink-0">
        <span className="material-symbols-outlined text-[100px] sm:text-[120px] text-[#A04223] opacity-80">emoji_nature</span>
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-800 mb-4 w-full" style={{ whiteSpace: 'normal' }}>
        Selamat datang di <span className="text-[#A04223] italic">Streak Up!</span>
      </h1>

      <p className="text-slate-500 text-sm md:text-base mb-8 leading-relaxed mx-auto" style={{ whiteSpace: 'normal', maxWidth: '480px', display: 'block' }}>
        Mari mulai perjalanan kecilmu menuju kebiasaan yang lebih baik dengan langkah-langkah lembut setiap hari.
      </p>

      <div className="w-full flex flex-col items-center gap-4" style={{ maxWidth: '360px' }}>
        <button
          onClick={nextStep}
          className="w-full py-3.5 bg-[#A04223] hover:bg-[#85351a] text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
          style={{ width: '100%', display: 'flex' }}
        >
          <span>Lanjut</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
        <button
          onClick={() => router.push('/dashboard')}
          className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          Lewati Onboarding
        </button>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────
  // STEP 2: CATEGORIES
  // ─────────────────────────────────────────────
  const renderStep2 = () => (
    <div className="flex flex-col flex-1 w-full max-w-2xl mx-auto h-full justify-between" style={{ width: '100%' }}>
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2" style={{ whiteSpace: 'normal', width: '100%' }}>
          Pilih kategori yang kamu minati
        </h2>
        <p className="text-slate-500 text-sm" style={{ whiteSpace: 'normal', width: '100%' }}>
          Kami akan menyesuaikan rekomendasi berdasarkan pilihanmu. (Maks. 3)
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 w-full">
        {CATEGORIES.map(cat => {
          const isSelected = selectedCategories.includes(cat.id);
          return (
            <button
              key={cat.id}
              onClick={() => toggleCategory(cat.id)}
              className={`relative p-5 sm:p-6 rounded-2xl flex flex-col items-center gap-3 transition-all cursor-pointer ${
                isSelected
                  ? 'border-2 border-[#A04223] bg-orange-50/50 shadow-md scale-[1.02]'
                  : 'border-2 border-slate-100 bg-white hover:border-slate-300 hover:bg-slate-50'
              }`}
              style={{ width: '100%' }}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 w-5 h-5 bg-[#A04223] rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-[12px]">check</span>
                </div>
              )}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isSelected ? 'bg-[#A04223]/20 text-[#A04223]' : 'bg-slate-100 text-slate-500'}`}>
                <span className="material-symbols-outlined text-[24px]">{cat.icon}</span>
              </div>
              <span className={`font-semibold text-sm ${isSelected ? 'text-[#A04223]' : 'text-slate-600'}`} style={{ whiteSpace: 'normal' }}>
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100 w-full mt-auto">
        <button onClick={prevStep} className="px-5 py-2.5 text-slate-500 hover:text-slate-800 font-medium transition-colors text-sm cursor-pointer">
          Kembali
        </button>
        <span className="text-[11px] font-bold text-slate-400 tracking-wider">
          {selectedCategories.length}/3 TERPILIH
        </span>
        <button
          onClick={nextStep}
          disabled={selectedCategories.length === 0}
          className={`px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 text-sm transition-all cursor-pointer ${
            selectedCategories.length > 0
              ? 'bg-[#A04223] text-white shadow-md hover:bg-[#85351a]'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          Lanjut
        </button>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────
  // STEP 3: HABITS
  // ─────────────────────────────────────────────
  const renderStep3 = () => (
    <div className="flex flex-col flex-1 w-full max-w-xl mx-auto h-full justify-between" style={{ width: '100%' }}>
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2" style={{ whiteSpace: 'normal', width: '100%' }}>
          Pilih kebiasaan pertamamu
        </h2>
        <p className="text-slate-500 text-sm" style={{ whiteSpace: 'normal', width: '100%' }}>
          Pilih 1-3 kebiasaan untuk memulai. Kamu bisa menambahkan lebih banyak nanti.
        </p>
      </div>

      {saveError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl">
          {saveError}
        </div>
      )}

      <div className="flex flex-col gap-3 mb-6 flex-1 overflow-y-auto pr-1 w-full">
        {HABITS_LIST.map(habit => {
          const isSelected = selectedHabitIds.includes(habit.id);
          return (
            <div
              key={habit.id}
              onClick={() => toggleHabit(habit.id)}
              className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all border-2 w-full ${
                isSelected
                  ? 'border-[#A04223] bg-orange-50/50 shadow-sm'
                  : 'border-slate-100 bg-white hover:border-slate-300'
              }`}
            >
              <div
                className="w-12 h-12 rounded-xl flex shrink-0 items-center justify-center"
                style={{ backgroundColor: habit.color + '33' }}
              >
                <span className="material-symbols-outlined text-[24px]" style={{ color: habit.color }}>
                  {habit.icon}
                </span>
              </div>
              <div className="flex-1 min-w-0 text-left">
                <h4 className="font-bold text-slate-800 text-sm sm:text-base" style={{ whiteSpace: 'normal' }}>{habit.title}</h4>
                <span className="text-[10px] font-bold text-slate-400 tracking-wider block mt-0.5">{CATEGORY_MAP[habit.category]}</span>
              </div>
              <div className={`w-6 h-6 shrink-0 rounded-full border-2 flex items-center justify-center transition-all ${
                isSelected ? 'border-[#A04223] bg-[#A04223]' : 'border-slate-300'
              }`}>
                {isSelected && (
                  <span className="material-symbols-outlined text-[14px] text-white">check</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100 w-full mt-auto">
        <button onClick={prevStep} className="px-5 py-2.5 text-slate-500 hover:text-slate-800 font-medium transition-colors text-sm cursor-pointer">
          Kembali
        </button>
        <span className="text-[11px] font-bold text-slate-400 tracking-wider">
          {selectedHabitIds.length}/3 KEBIASAAN
        </span>
        <button
          onClick={saveHabitsAndFinish}
          disabled={selectedHabitIds.length === 0 || saving}
          className={`px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 text-sm transition-all cursor-pointer ${
            selectedHabitIds.length > 0 && !saving
              ? 'bg-[#A04223] text-white shadow-md hover:bg-[#85351a]'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          {saving ? (
            <>
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Menyimpan...
            </>
          ) : (
            'Lanjut'
          )}
        </button>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────
  // STEP 4: READY
  // ─────────────────────────────────────────────
  const renderStep4 = () => (
    <div className="flex flex-col lg:flex-row items-center flex-1 w-full gap-6 lg:gap-10 my-auto" style={{ width: '100%' }}>
      {/* Left: Illustration */}
      <div className="w-full lg:w-1/2 h-56 lg:h-80 bg-orange-50 rounded-3xl relative overflow-hidden flex items-center justify-center border border-orange-100 shrink-0">
        <span className="material-symbols-outlined text-[100px] lg:text-[130px] text-orange-300 z-10">auto_stories</span>
        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-3.5 py-1.5 rounded-xl shadow-md border border-white flex items-center gap-2">
          <span className="material-symbols-outlined text-[#A04223] text-[18px]">water_drop</span>
          <span className="text-xs font-bold text-slate-700">Minum Air</span>
        </div>
        <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur px-3.5 py-1.5 rounded-xl shadow-md border border-white flex items-center gap-2">
          <span className="material-symbols-outlined text-[#A04223] text-[18px]">self_improvement</span>
          <span className="text-xs font-bold text-slate-700">Meditasi</span>
        </div>
      </div>

      {/* Right: Content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-start text-left" style={{ width: '100%' }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3" style={{ whiteSpace: 'normal', width: '100%' }}>
          Kamu siap <span className="text-[#A04223] italic">memulai!</span>
        </h2>
        <p className="text-slate-500 text-sm mb-6 leading-relaxed" style={{ whiteSpace: 'normal', width: '100%' }}>
          Kebiasaan kecil adalah benih untuk hari esok yang lebih baik. Kami telah menyiapkan jurnal pribadimu.
        </p>

        {/* Summary Box */}
        <div className="w-full bg-orange-50/40 rounded-2xl p-5 mb-6 border border-orange-100/60" style={{ width: '100%' }}>
          <h4 className="font-bold text-slate-400 mb-3 text-[10px] tracking-widest uppercase">RANGKUMAN KAMU</h4>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#A04223]" />
              <span className="text-xs text-slate-700 font-bold">{selectedHabitIds.length} Kebiasaan Tersimpan</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs text-slate-700 font-bold">Pengingat Aktif</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => router.push('/dashboard')}
          className="w-full py-3.5 bg-[#A04223] hover:bg-[#85351a] text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
          style={{ width: '100%', display: 'flex' }}
        >
          <span>Mulai Sekarang</span>
          <span className="material-symbols-outlined text-sm">rocket_launch</span>
        </button>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────
  // MAIN RENDER
  // ─────────────────────────────────────────────
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FFF9F2] p-4 md:p-6">
      <div
        className="w-full bg-white rounded-3xl shadow-xl overflow-hidden min-h-[580px] flex flex-col p-6 md:p-10 relative"
        style={{ maxWidth: '860px', width: '100%', boxSizing: 'border-box' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between w-full mb-6 shrink-0" style={{ width: '100%' }}>
          <div className="flex items-center gap-2 text-[#A04223]">
            <span className="material-symbols-outlined text-[24px]">local_fire_department</span>
            <span className="font-bold text-base tracking-tight text-slate-800">Streak Up</span>
          </div>

          {/* Stepper */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4].map(idx => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === step ? 'w-6 bg-[#A04223]' : idx < step ? 'w-1.5 bg-orange-300' : 'w-1.5 bg-slate-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase hidden sm:block">
              Langkah {step} dari 4
            </span>
          </div>

          <div className="w-8 h-8 bg-orange-100 text-[#A04223] rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 w-full items-center justify-center" style={{ width: '100%' }}>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
        </div>
      </div>
    </div>
  );
}