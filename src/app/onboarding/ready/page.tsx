'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ReadyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTimer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(loadTimer);
  }, []);

  useEffect(() => {
    if (!loading) {
      const redirectTimer = setTimeout(() => router.push('/dashboard'), 2000);
      return () => clearTimeout(redirectTimer);
    }
  }, [loading, router]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, #FFE4E1 0%, #E6E6FA 50%, #E0FFFF 100%)' }}>
      {/* Memaksa minWidth 360px & maxWidth 480px langsung lewat inline style + Glassmorphism */}
      <div
        className="z-10 flex flex-col items-center text-center rounded-3xl p-8 shadow-2xl"
        style={{ 
          width: '90vw', 
          maxWidth: '440px', 
          minWidth: '320px', 
          boxSizing: 'border-box',
          background: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.6)'
        }}
      >
        {loading ? (
          <div className="flex flex-col items-center w-full">
            <div className="relative w-24 h-24 mb-6 flex items-center justify-center shrink-0">
              <svg className="animate-spin w-full h-full text-violet-200" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="#A78BFA" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-[32px] text-violet-500 animate-pulse">
                  auto_awesome
                </span>
              </div>
            </div>

            <h1 className="text-xl font-bold text-slate-800 mb-2 w-full">
              Menyiapkan Dashboard...
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed w-full">
              Membuat habit, mengatur notifikasi, dan menyeduh teh hangat 🍵
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full">
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-6 shadow-md shrink-0 border border-emerald-200">
              <span className="material-symbols-outlined text-[48px] text-emerald-500">
                check_circle
              </span>
            </div>

            <h1 className="text-2xl font-bold text-slate-800 mb-2 w-full">
              Semua Siap!
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed w-full">
              Saatnya memulai kebiasaan baik hari ini.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}