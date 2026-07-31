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
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Kata sandi tidak cocok.');
      return;
    }
    if (!termsAccepted) {
      setError('Anda harus menyetujui syarat & ketentuan.');
      return;
    }
    setLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    });

    if (authError) {
      setError(authError.message);
    } else {
      router.push('/onboarding/welcome');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-6"
      style={{ background: 'linear-gradient(135deg, #FFE4E1 0%, #E6E6FA 50%, #E0FFFF 100%)' }}>
      <ForceLightMode />
      {/* CARD WRAPPER UTAMA - Glassmorphism */}
      <div 
        className="w-full rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2"
        style={{ 
          maxWidth: '960px', 
          minHeight: '560px',
          background: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.6)'
        }}
      >
        
        {/* KOLOM KIRI: GAMBAR ILUSTRASI */}
        <div className="relative hidden lg:block w-full h-full min-h-[500px]">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9M-mwsCUcyglUHsz8X5BTwsCRt8uxxo2NnbhLZG8mCbnUuPUKhd7zycgjOYVTDfyPwiCLg3gW0YZxtVeTx6MiGkB1ddKuhneacgNBjoC5lTltHrnQ56_9CD3FW4A7fKh7Kow9-enWFgz_A6NymEf17hBYBqQIxVVUsVmHgr7_miTOZk6CfJXP3oeCwFlcM9w9WHtuuYqzFeUHvIQW5zIs4oEZ-egRWyohHIY8PuXSIweUQ6G8S9tHUgpHUjgwfAzlKvc_lPXKE77Aycc"
            alt="Streak Up Illustration"
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
        </div>

        {/* KOLOM KANAN: FORM REGISTER */}
        <div 
          className="w-full p-6 sm:p-8 md:p-10 flex flex-col justify-center"
          style={{ width: '100%', boxSizing: 'border-box' }}
        >
          <div className="w-full" style={{ maxWidth: '360px', margin: '0 auto' }}>
            
            {/* Header */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-1" style={{ whiteSpace: 'normal' }}>
              Daftar
            </h1>
            <p className="text-slate-600 mb-4 text-sm" style={{ whiteSpace: 'normal' }}>
              Mulai perjalanan habitmu dengan akun baru.
            </p>

            {/* Error Notification */}
            {error && (
              <div className="mb-4 p-3 bg-red-50/80 border border-red-200 text-red-600 text-xs rounded-xl backdrop-blur-sm">
                {error}
              </div>
            )}

            {/* Form */}
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1 w-full">
                <label className="text-xs font-semibold text-slate-700">Nama Lengkap</label>
                <input 
                  type="text" 
                  placeholder="Masukkan nama" 
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/60 bg-white/50 text-sm text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400 backdrop-blur-sm transition-all"
                  style={{ width: '100%', display: 'block' }}
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label className="text-xs font-semibold text-slate-700">Email</label>
                <input 
                  type="email" 
                  placeholder="nama@email.com" 
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/60 bg-white/50 text-sm text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400 backdrop-blur-sm transition-all"
                  style={{ width: '100%', display: 'block' }}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label className="text-xs font-semibold text-slate-700">Kata Sandi</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/60 bg-white/50 text-sm text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400 backdrop-blur-sm transition-all"
                  style={{ width: '100%', display: 'block' }}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label className="text-xs font-semibold text-slate-700">Konfirmasi Kata Sandi</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/60 bg-white/50 text-sm text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400 backdrop-blur-sm transition-all"
                  style={{ width: '100%', display: 'block' }}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-start gap-2.5 pt-1 w-full">
                <input 
                  type="checkbox" 
                  id="terms" 
                  className="mt-0.5 w-4 h-4 rounded border-white/60 cursor-pointer accent-violet-500"
                  checked={termsAccepted}
                  onChange={e => setTermsAccepted(e.target.checked)}
                />
                <label htmlFor="terms" className="text-xs text-slate-600 cursor-pointer leading-tight" style={{ whiteSpace: 'normal' }}>
                  Saya menyetujui <span className="text-violet-600 font-bold underline">syarat & ketentuan</span> Streak Up.
                </label>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3 text-white font-bold text-sm rounded-xl shadow-[0_8px_20px_rgba(192,132,252,0.3)] transition-all mt-2 disabled:opacity-70 hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(192,132,252,0.4)]"
                style={{ width: '100%', display: 'block', background: 'linear-gradient(135deg, #FF6B9D, #C084FC)' }}
              >
                {loading ? 'Mendaftar...' : 'Daftar Sekarang'}
              </button>
            </form>

            <p className="text-center text-xs text-slate-600 mt-4" style={{ whiteSpace: 'normal' }}>
              Sudah punya akun? <Link className="text-violet-600 font-bold hover:underline" href="/login">Masuk</Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}