'use client';
import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface Props {
  show: boolean;
  onClose: () => void;
}

export default function FullscreenTrophyCelebration({ show, onClose }: Props) {
  useEffect(() => {
    if (show) {
      // Efek tembakan confetti warna-warni hangat
      const count = 200;
      const defaults = { origin: { y: 0.7 } };

      function fire(particleRatio: number, opts: confetti.Options) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
          colors: ['#9e4225', '#b7a8fe', '#63bd8b', '#ff8c69', '#facc15']
        });
      }

      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });

      const timer = setTimeout(() => {
        onClose();
      }, 4500);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-500">
      {/* Paksa lebar modal minimum 300px - 400px agar TIDAK BISA GEPENG */}
      <div 
        className="bg-white rounded-3xl p-6 md:p-8 text-center shadow-2xl flex flex-col items-center border-2 border-amber-200 animate-in zoom-in-90 duration-500 my-auto"
        style={{ width: '100%', maxWidth: '400px', minWidth: '300px' }}
      >
        
        {/* Ikon Trofi Kemenangan Besar */}
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-4 shrink-0">
          <span className="material-symbols-outlined text-5xl text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>
            emoji_events
          </span>
        </div>

        <h2 className="text-2xl font-extrabold text-main mb-2 w-full">
          Target Tuntas! 🏆
        </h2>

        <p className="text-muted-custom text-sm mb-6 leading-relaxed w-full">
          Luar biasa! Semua habit hari ini berhasil kamu selesaikan 100%. Satu langkah lebih dekat ke tujuanmu!
        </p>

        <button
          onClick={onClose}
          type="button"
          className="w-full py-3.5 bg-[#9e4225] hover:bg-[#80331b] text-white font-bold rounded-2xl shadow-lg transition-all active:scale-95 cursor-pointer block"
        >
          Siap, Mantap!
        </button>
      </div>
    </div>
  );
}
