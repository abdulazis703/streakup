"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/lib/context/AuthContext';
import ForceLightMode from '@/components/ForceLightMode';

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const CATEGORIES = [
  { id: 'health',       label: 'Kesehatan',    emoji: '❤️', color: '#FF8FAB', bg: 'rgba(255,143,171,0.15)' },
  { id: 'mindful',      label: 'Mindfulness',  emoji: '🧘', color: '#7ED9A5', bg: 'rgba(126,217,165,0.15)' },
  { id: 'learning',     label: 'Belajar',      emoji: '📚', color: '#A78BFA', bg: 'rgba(167,139,250,0.15)' },
  { id: 'fitness',      label: 'Olahraga',     emoji: '🏃', color: '#FBA94C', bg: 'rgba(251,169,76,0.15)'  },
  { id: 'productivity', label: 'Produktif',    emoji: '🚀', color: '#60A5FA', bg: 'rgba(96,165,250,0.15)'  },
  { id: 'hobby',        label: 'Hobi',         emoji: '🎨', color: '#F472B6', bg: 'rgba(244,114,182,0.15)' },
];

const CATEGORY_MAP: Record<string, string> = {
  learning: 'Belajar', health: 'Kesehatan', fitness: 'Olahraga',
  productivity: 'Produktif', hobby: 'Hobi', mindful: 'Mindfulness',
};

// Star indicator component
function StarDot({ active, done }: { active: boolean; done: boolean }) {
  return (
    <span className="text-lg transition-all duration-300" style={{
      opacity: active ? 1 : done ? 0.7 : 0.3,
      filter: active ? 'drop-shadow(0 0 6px rgba(192,132,252,0.8))' : 'none',
      transform: active ? 'scale(1.3)' : 'scale(1)',
      display: 'inline-block',
    }}>
      {done ? '⭐' : active ? '🌟' : '✦'}
    </span>
  );
}

export default function OnboardingFlow() {
  const router = useRouter();
  const { refreshHabits } = useAuth();

  const [step, setStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const saveOnboardingAndFinish = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User tidak ditemukan.');
      await supabase.from('profiles').update({ onboarding_completed: true }).eq('id', user.id);
      await refreshHabits();
      nextStep();
    } catch (e: unknown) {
      setSaveError(e instanceof Error ? e.message : 'Terjadi kesalahan. Coba lagi.');
    } finally {
      setSaving(false);
    }
  };

  // ── STEP 1: WELCOME ──
  const renderStep1 = () => (
    <div className="flex flex-col items-center text-center w-full">
      {/* Mascot */}
      <div className="relative mb-8" style={{ animation: 'cozyFloat 4s ease-in-out infinite' }}>
        <div className="w-36 h-36 rounded-full flex items-center justify-center text-7xl shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, #FFE4EC, #E8D5FF)',
            boxShadow: '0 20px 60px rgba(192,132,252,0.35), 0 0 0 10px rgba(255,200,230,0.2)',
          }}>
          🌟
        </div>
        <div className="absolute -top-2 -right-2 text-2xl" style={{ animation: 'cozyFloat 2.5s ease-in-out 0.3s infinite' }}>✨</div>
        <div className="absolute -bottom-2 -left-3 text-xl" style={{ animation: 'cozyFloat 3s ease-in-out 0.8s infinite' }}>💫</div>
        <div className="absolute top-4 -left-6 text-lg" style={{ animation: 'cozyFloat 2.8s ease-in-out 0.5s infinite' }}>⭐</div>
      </div>

      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-3">
        Selamat Datang, <span style={{ color: '#C084FC' }}>Pahlawan!</span> 🎉
      </h2>
      <p className="text-slate-500 text-base mb-8 max-w-sm leading-relaxed">
        Kami akan membantumu membangun kebiasaan ajaib dalam 3 langkah mudah yang menyenangkan!
      </p>

      {/* Steps preview */}
      <div className="flex flex-col gap-3 w-full max-w-xs mb-8">
        {[
          ['🌈', 'Pilih Area Fokus'],
          ['✅', 'Selesaikan Onboarding'],
          ['🚀', 'Mulai Petualangan!'],
        ].map(([emoji, label], i) => (
          <div key={i} className="flex items-center gap-3 px-5 py-3 rounded-2xl text-left"
            style={{ background: 'rgba(243,232,255,0.5)', border: '1px solid rgba(192,132,252,0.2)' }}>
            <span className="text-xl">{emoji}</span>
            <span className="font-semibold text-slate-700 text-sm">{label}</span>
          </div>
        ))}
      </div>

      <button
        onClick={nextStep}
        className="w-full max-w-xs py-4 text-white font-extrabold rounded-3xl shadow-xl hover:scale-105 transition-all"
        style={{ background: 'linear-gradient(135deg, #FF6B9D, #C084FC)', boxShadow: '0 10px 40px rgba(192,132,252,0.4)' }}>
        Ayo Mulai! ✨
      </button>
      <button
        onClick={() => router.push('/dashboard')}
        className="mt-3 text-xs text-slate-400 hover:text-slate-600 transition-colors">
        Lewati Onboarding
      </button>
    </div>
  );

  // ── STEP 2: CATEGORIES ──
  const renderStep2 = () => (
    <div className="flex flex-col w-full">
      <div className="text-center mb-6">
        <div className="text-5xl mb-3" style={{ animation: 'cozyFloat 3s ease-in-out infinite' }}>🌈</div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2">
          Apa Area Fokusmu? ✨
        </h2>
        <p className="text-slate-500 text-sm max-w-sm mx-auto">
          Pilih hingga 3 area yang ingin kamu kembangkan. Kami akan menyesuaikan pengalamanmu!
        </p>
      </div>

      {saveError && (
        <div className="mb-4 p-4 rounded-2xl text-sm" style={{ background: '#FFF0F0', border: '1px solid #FFCDD2', color: '#E57373' }}>
          {saveError}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {CATEGORIES.map(cat => {
          const isSelected = selectedCategories.includes(cat.id);
          return (
            <button
              key={cat.id}
              onClick={() => toggleCategory(cat.id)}
              className="relative flex flex-col items-center gap-2 p-5 rounded-3xl transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{
                background: isSelected ? cat.bg : 'rgba(255,255,255,0.7)',
                border: `2px solid ${isSelected ? cat.color : 'rgba(200,200,200,0.3)'}`,
                boxShadow: isSelected ? `0 8px 24px ${cat.color}30` : '0 2px 8px rgba(0,0,0,0.04)',
                transform: isSelected ? 'scale(1.04)' : 'scale(1)',
              }}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: cat.color }}>
                  ✓
                </div>
              )}
              <span className="text-3xl">{cat.emoji}</span>
              <span className="font-bold text-slate-700 text-sm">{cat.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <button onClick={prevStep} className="px-5 py-2.5 text-slate-400 hover:text-slate-600 font-semibold text-sm transition-colors">
          ← Kembali
        </button>
        <span className="text-xs font-bold tracking-widest" style={{ color: '#C084FC' }}>
          {selectedCategories.length}/3 ✨
        </span>
        <button
          onClick={saveOnboardingAndFinish}
          disabled={selectedCategories.length === 0 || saving}
          className="px-7 py-2.5 rounded-2xl font-bold text-sm text-white transition-all disabled:opacity-50 hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #FF6B9D, #C084FC)' }}>
          {saving ? '✨ Menyimpan...' : 'Lanjut →'}
        </button>
      </div>
    </div>
  );

  // ── STEP 3: READY ──
  const renderStep3 = () => (
    <div className="flex flex-col items-center text-center w-full">
      {/* Success mascot */}
      <div className="relative mb-8" style={{ animation: 'cozyFloat 3s ease-in-out infinite' }}>
        <div className="w-36 h-36 rounded-full flex items-center justify-center text-7xl shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, #D1FAE5, #A7F3D0)',
            boxShadow: '0 20px 60px rgba(52,211,153,0.35), 0 0 0 10px rgba(167,243,208,0.2)',
          }}>
          🎉
        </div>
        <div className="absolute -top-2 -right-2 text-2xl" style={{ animation: 'cozyFloat 2s ease-in-out 0.2s infinite' }}>🎊</div>
        <div className="absolute -bottom-2 -left-3 text-xl" style={{ animation: 'cozyFloat 2.5s ease-in-out 0.6s infinite' }}>✨</div>
        <div className="absolute top-6 -left-6 text-2xl" style={{ animation: 'cozyFloat 3s ease-in-out 0.4s infinite' }}>⭐</div>
      </div>

      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-3">
        Kamu <span style={{ color: '#10B981' }}>Siap!</span> 🌟
      </h2>
      <p className="text-slate-500 text-base mb-6 max-w-sm leading-relaxed">
        Petualangan kebiasaan ajaibmu telah dimulai. Setiap hari adalah kesempatan baru untuk berkembang!
      </p>

      {/* Summary */}
      <div className="w-full max-w-xs rounded-3xl p-5 mb-8"
        style={{ background: 'linear-gradient(135deg, rgba(255,230,250,0.7), rgba(230,245,255,0.7))', border: '1.5px solid rgba(200,180,255,0.3)' }}>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Pilihan Kamu</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {selectedCategories.map(id => {
            const cat = CATEGORIES.find(c => c.id === id);
            if (!cat) return null;
            return (
              <span key={id} className="px-3 py-1.5 rounded-2xl text-xs font-bold text-white"
                style={{ background: cat.color }}>
                {cat.emoji} {CATEGORY_MAP[id]}
              </span>
            );
          })}
          {selectedCategories.length === 0 && (
            <span className="text-sm text-slate-400">Belum ada pilihan</span>
          )}
        </div>
      </div>

      <button
        onClick={() => router.push('/dashboard')}
        className="w-full max-w-xs py-4 text-white font-extrabold rounded-3xl shadow-xl hover:scale-105 transition-all"
        style={{ background: 'linear-gradient(135deg, #10B981, #3B82F6)', boxShadow: '0 10px 40px rgba(59,130,246,0.4)' }}>
        Mulai Sekarang 🚀
      </button>
    </div>
  );

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #FFF0F5 0%, #F5F0FF 50%, #F0F8FF 100%)' }}>
      <ForceLightMode />

      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-8 left-10 text-3xl" style={{ animation: 'cozyFloat 3s ease-in-out infinite' }}>✨</div>
        <div className="absolute top-16 right-14 text-2xl" style={{ animation: 'cozyFloat 2.5s ease-in-out 0.5s infinite' }}>⭐</div>
        <div className="absolute bottom-20 left-16 text-xl" style={{ animation: 'cozyFloat 3.5s ease-in-out 0.8s infinite' }}>💫</div>
        <div className="absolute bottom-12 right-10 text-2xl" style={{ animation: 'cozyFloat 2.8s ease-in-out 0.3s infinite' }}>🌸</div>
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(circle, #FFB7D5, transparent 70%)' }} />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #C4B5FD, transparent 70%)' }} />
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full rounded-[2.5rem] shadow-2xl"
        style={{
          maxWidth: '560px',
          background: 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255,200,230,0.5)',
          boxShadow: '0 30px 80px rgba(192,132,252,0.2), 0 8px 32px rgba(0,0,0,0.08)',
        }}>

        {/* Header with Logo & Stepper */}
        <div className="px-8 pt-7 pb-0 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl shadow-md"
              style={{ background: 'linear-gradient(135deg, #FFB347, #FF7F7F)' }}>
              🔥
            </div>
            <span className="font-extrabold text-slate-700 text-base">Streak Up</span>
          </div>

          {/* Star Stepper */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2">
              {[1, 2, 3].map(i => (
                <StarDot key={i} active={step === i} done={step > i} />
              ))}
            </div>
            <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: '#C084FC' }}>
              Langkah {step} dari 3
            </span>
          </div>

          {/* Person icon */}
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
            style={{ background: 'rgba(243,232,255,0.5)', border: '1px solid rgba(192,132,252,0.2)' }}>
            🧙
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>
      </div>

      <style>{`
        @keyframes cozyFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }
      `}</style>
    </div>
  );
}