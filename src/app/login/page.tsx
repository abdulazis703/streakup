"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import ForceLightMode from '@/components/ForceLightMode';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError('Email atau kata sandi salah. Coba lagi ya! 🔮');
    } else {
      router.push('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #FFF0F5 0%, #F5F0FF 50%, #F0F8FF 100%)' }}>
      <ForceLightMode />

      {/* Floating decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 text-3xl" style={{ animation: 'cozyFloat 3s ease-in-out infinite' }}>✨</div>
        <div className="absolute top-20 right-16 text-2xl" style={{ animation: 'cozyFloat 2.5s ease-in-out 0.5s infinite' }}>⭐</div>
        <div className="absolute bottom-20 left-20 text-xl" style={{ animation: 'cozyFloat 3.5s ease-in-out 0.8s infinite' }}>💫</div>
        <div className="absolute bottom-16 right-10 text-2xl" style={{ animation: 'cozyFloat 2.8s ease-in-out 0.3s infinite' }}>🌟</div>
        <div className="absolute top-1/2 left-5 text-lg" style={{ animation: 'cozyFloat 4s ease-in-out 1s infinite' }}>✦</div>
        {/* Blobs */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(circle, #FFB7D5, transparent 70%)' }} />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #C4B5FD, transparent 70%)' }} />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-25"
          style={{ background: 'radial-gradient(circle, #BAE6FD, transparent 70%)' }} />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full rounded-[2.5rem] overflow-hidden shadow-2xl"
        style={{
          maxWidth: '440px',
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255,200,230,0.5)',
          boxShadow: '0 30px 80px rgba(192,132,252,0.2), 0 8px 32px rgba(0,0,0,0.08)',
        }}>

        {/* Mascot Header */}
        <div className="pt-10 pb-6 flex flex-col items-center relative"
          style={{ background: 'linear-gradient(160deg, #FFE4F0 0%, #EDE9FE 100%)' }}>
          <div className="absolute top-3 left-6 text-xl opacity-50">✨</div>
          <div className="absolute top-5 right-8 text-lg opacity-40">⭐</div>

          <div className="relative mb-4" style={{ animation: 'cozyFloat 3.5s ease-in-out infinite' }}>
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-5xl shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #FFD6EC, #E8D5FF)',
                boxShadow: '0 12px 40px rgba(192,132,252,0.35), 0 0 0 6px rgba(255,200,230,0.3)',
              }}>
              🔮
            </div>
            <div className="absolute -top-1 -right-1 text-lg" style={{ animation: 'cozyFloat 2s ease-in-out 0.3s infinite' }}>✨</div>
          </div>

          <h1 className="text-2xl font-extrabold text-slate-800 mb-1">Selamat Datang! ✨</h1>
          <p className="text-sm text-violet-500 font-semibold">Masuk ke dunia habitmu yang ajaib</p>
        </div>

        {/* Form Body */}
        <div className="p-8">
          {error && (
            <div className="mb-5 p-4 rounded-2xl text-sm font-medium"
              style={{ background: '#FFF0F0', border: '1px solid #FFCDD2', color: '#E57373' }}>
              {error}
            </div>
          )}

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">📧</span>
                <input
                  type="email"
                  placeholder="namamu@email.com"
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl text-sm text-slate-700 focus:outline-none transition-all"
                  style={{
                    background: 'rgba(243,232,255,0.4)',
                    border: '1.5px solid rgba(192,132,252,0.3)',
                    boxShadow: 'inset 0 2px 6px rgba(192,132,252,0.05)',
                  }}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Kata Sandi</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🔒</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 rounded-2xl text-sm text-slate-700 focus:outline-none transition-all"
                  style={{
                    background: 'rgba(243,232,255,0.4)',
                    border: '1.5px solid rgba(192,132,252,0.3)',
                    boxShadow: 'inset 0 2px 6px rgba(192,132,252,0.05)',
                  }}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-violet-500 transition-colors text-sm">
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 text-white font-extrabold text-base rounded-2xl shadow-lg hover:scale-[1.02] hover:shadow-xl transition-all disabled:opacity-70 disabled:scale-100 mt-2"
              style={{ background: 'linear-gradient(135deg, #FF6B9D, #C084FC)', boxShadow: '0 8px 32px rgba(192,132,252,0.4)' }}>
              {loading ? '✨ Masuk...' : '🚀 Masuk Sekarang'}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-6">
            Belum punya akun?{' '}
            <Link href="/register" className="font-extrabold hover:underline"
              style={{ color: '#C084FC' }}>
              Daftar di sini ✨
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
