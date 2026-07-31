"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import ForceLightMode from '@/components/ForceLightMode';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Kata sandi tidak cocok. Coba periksa lagi ya! 🔮');
      return;
    }
    if (!termsAccepted) {
      setError('Kamu harus menyetujui syarat & ketentuan dulu ✨');
      return;
    }
    setLoading(true);
    setError(null);
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });
    if (authError) {
      setError(authError.message);
    } else {
      router.push('/onboarding/welcome');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 py-10 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #FFF0F5 0%, #F5F0FF 50%, #F0F8FF 100%)' }}>
      <ForceLightMode />

      {/* Floating decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-8 text-3xl" style={{ animation: 'cozyFloat 3s ease-in-out infinite' }}>🌸</div>
        <div className="absolute top-16 right-12 text-2xl" style={{ animation: 'cozyFloat 2.5s ease-in-out 0.5s infinite' }}>✨</div>
        <div className="absolute bottom-24 left-16 text-xl" style={{ animation: 'cozyFloat 3.5s ease-in-out 0.8s infinite' }}>⭐</div>
        <div className="absolute bottom-12 right-8 text-2xl" style={{ animation: 'cozyFloat 2.8s ease-in-out 0.3s infinite' }}>💫</div>
        <div className="absolute top-1/2 left-4 text-xl" style={{ animation: 'cozyFloat 4s ease-in-out 1s infinite' }}>🌟</div>
        {/* Blobs */}
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(circle, #FFB7D5, transparent 70%)' }} />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #C4B5FD, transparent 70%)' }} />
        <div className="absolute top-1/4 right-1/3 w-60 h-60 rounded-full blur-3xl opacity-25"
          style={{ background: 'radial-gradient(circle, #BAE6FD, transparent 70%)' }} />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full rounded-[2.5rem] overflow-hidden shadow-2xl"
        style={{
          maxWidth: '460px',
          background: 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255,200,230,0.5)',
          boxShadow: '0 30px 80px rgba(192,132,252,0.2), 0 8px 32px rgba(0,0,0,0.08)',
        }}>

        {/* Mascot Header */}
        <div className="pt-10 pb-6 flex flex-col items-center relative"
          style={{ background: 'linear-gradient(160deg, #FFEEF6 0%, #EEE8FF 100%)' }}>
          <div className="absolute top-3 right-6 text-xl opacity-50">✨</div>
          <div className="absolute top-6 left-8 text-lg opacity-40">🌸</div>

          <div className="relative mb-4" style={{ animation: 'cozyFloat 3.5s ease-in-out infinite' }}>
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-5xl shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #FFD6EC, #C8E6F5)',
                boxShadow: '0 12px 40px rgba(255,150,200,0.35), 0 0 0 6px rgba(255,200,230,0.3)',
              }}>
              🌟
            </div>
            <div className="absolute -top-1 -right-2 text-lg" style={{ animation: 'cozyFloat 2s ease-in-out 0.4s infinite' }}>✨</div>
            <div className="absolute bottom-0 -left-2 text-base" style={{ animation: 'cozyFloat 2.5s ease-in-out 0.7s infinite' }}>💫</div>
          </div>

          <h1 className="text-2xl font-extrabold text-slate-800 mb-1">Petualangan Dimulai! 🌟</h1>
          <p className="text-sm font-semibold" style={{ color: '#C084FC' }}>Buat akun ajaibmu sekarang</p>
        </div>

        {/* Form Body */}
        <div className="p-8">
          {error && (
            <div className="mb-5 p-4 rounded-2xl text-sm font-medium"
              style={{ background: '#FFF0F0', border: '1px solid #FFCDD2', color: '#E57373' }}>
              {error}
            </div>
          )}

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Nama */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Nama Lengkap</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base">🧙</span>
                <input
                  type="text"
                  placeholder="Siapa namamu, pahlawan?"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm text-slate-700 focus:outline-none transition-all"
                  style={{ background: 'rgba(243,232,255,0.4)', border: '1.5px solid rgba(192,132,252,0.3)' }}
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base">📧</span>
                <input
                  type="email"
                  placeholder="namamu@email.com"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm text-slate-700 focus:outline-none transition-all"
                  style={{ background: 'rgba(243,232,255,0.4)', border: '1.5px solid rgba(192,132,252,0.3)' }}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Kata Sandi</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base">🔒</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Kata sandi rahasiamu"
                  className="w-full pl-11 pr-11 py-3 rounded-2xl text-sm text-slate-700 focus:outline-none transition-all"
                  style={{ background: 'rgba(243,232,255,0.4)', border: '1.5px solid rgba(192,132,252,0.3)' }}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-violet-400 transition-colors text-sm">
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Konfirmasi Kata Sandi</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base">🔑</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Ulangi kata sandi"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm text-slate-700 focus:outline-none transition-all"
                  style={{ background: 'rgba(243,232,255,0.4)', border: '1.5px solid rgba(192,132,252,0.3)' }}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={termsAccepted}
                  onChange={e => setTermsAccepted(e.target.checked)}
                />
                <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${
                  termsAccepted ? 'border-violet-400 bg-violet-400' : 'border-slate-300 bg-white'
                }`}>
                  {termsAccepted && <span className="text-white text-xs">✓</span>}
                </div>
              </div>
              <span className="text-xs text-slate-500 leading-relaxed">
                Saya menyetujui{' '}
                <span className="font-bold underline" style={{ color: '#C084FC' }}>syarat & ketentuan</span>{' '}
                Streak Up ✨
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 text-white font-extrabold text-base rounded-2xl shadow-lg hover:scale-[1.02] hover:shadow-xl transition-all disabled:opacity-70 disabled:scale-100 mt-1"
              style={{ background: 'linear-gradient(135deg, #FF6B9D, #C084FC)', boxShadow: '0 8px 32px rgba(192,132,252,0.4)' }}>
              {loading ? '✨ Mendaftar...' : '🌟 Mulai Petualangan!'}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-5">
            Sudah punya akun?{' '}
            <Link href="/login" className="font-extrabold hover:underline" style={{ color: '#C084FC' }}>
              Masuk di sini ✨
            </Link>
          </p>
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