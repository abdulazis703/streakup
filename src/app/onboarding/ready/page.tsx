'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ForceLightMode from '@/components/ForceLightMode';

const LOADING_MSGS = [
  '🌟 Mempersiapkan petualanganmu...',
  '✨ Menyeduh ramuan ajaib...',
  '🔮 Mengatur mantra kebiasaan...',
  '🌈 Melukis dashboard indahmu...',
];

export default function ReadyPage() {
  const router = useRouter();
  const [phase, setPhase] = useState(0); // 0=loading, 1=done
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const msgTimer = setInterval(() => setMsgIdx(i => (i + 1) % LOADING_MSGS.length), 800);
    const loadTimer = setTimeout(() => {
      setPhase(1);
      clearInterval(msgTimer);
    }, 2800);
    return () => { clearInterval(msgTimer); clearTimeout(loadTimer); };
  }, []);

  useEffect(() => {
    if (phase === 1) {
      const r = setTimeout(() => router.push('/dashboard'), 2200);
      return () => clearTimeout(r);
    }
  }, [phase, router]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #FFF0F5 0%, #F5F0FF 50%, #F0F8FF 100%)' }}>
      <ForceLightMode />

      {/* Background sparkles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {['✨', '⭐', '💫', '🌟', '✦', '🎊', '🎉', '🌸'].map((s, i) => (
          <div key={i} className="absolute text-2xl"
            style={{
              top: `${10 + i * 11}%`,
              left: `${8 + (i % 4) * 24}%`,
              animation: `cozyFloat ${2.5 + i * 0.3}s ease-in-out ${i * 0.2}s infinite`,
              opacity: 0.5,
            }}>
            {s}
          </div>
        ))}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(circle, #FFB7D5, transparent 70%)' }} />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #C4B5FD, transparent 70%)' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center rounded-[2.5rem] p-10 shadow-2xl"
        style={{
          width: '90vw',
          maxWidth: '420px',
          background: 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255,200,230,0.5)',
          boxShadow: '0 30px 80px rgba(192,132,252,0.2)',
        }}>

        {phase === 0 ? (
          <>
            {/* Loading mascot */}
            <div className="relative mb-6" style={{ animation: 'cozyFloat 2s ease-in-out infinite' }}>
              <div className="w-28 h-28 rounded-full flex items-center justify-center text-6xl shadow-xl relative"
                style={{
                  background: 'linear-gradient(135deg, #FFE4EC, #E8D5FF)',
                  boxShadow: '0 12px 40px rgba(192,132,252,0.3)',
                }}>
                🔮
              </div>
              {/* Spinning ring */}
              <div className="absolute inset-0 rounded-full border-4 border-transparent animate-spin"
                style={{ borderTopColor: '#C084FC', borderRightColor: '#FF6B9D' }} />
              <div className="absolute -top-1 -right-1 text-xl" style={{ animation: 'cozyFloat 1.5s ease-in-out 0.3s infinite' }}>✨</div>
            </div>

            <h1 className="text-2xl font-extrabold text-slate-800 mb-2">
              Sebentar ya... 🪄
            </h1>
            <p className="text-sm font-semibold mb-6 transition-all duration-500" style={{ color: '#C084FC', minHeight: '1.5rem' }}>
              {LOADING_MSGS[msgIdx]}
            </p>

            {/* Magic loading bar */}
            <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(200,180,255,0.2)' }}>
              <div className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #FF6B9D, #C084FC, #60A5FA)',
                  animation: 'loadBar 2.8s ease-in-out forwards',
                }} />
            </div>
          </>
        ) : (
          <>
            {/* Success mascot */}
            <div className="relative mb-6" style={{ animation: 'cozyFloat 3s ease-in-out infinite' }}>
              <div className="w-32 h-32 rounded-full flex items-center justify-center text-6xl shadow-xl"
                style={{
                  background: 'linear-gradient(135deg, #D1FAE5, #A7F3D0)',
                  boxShadow: '0 16px 50px rgba(52,211,153,0.35)',
                }}>
                🎉
              </div>
              <div className="absolute -top-2 -right-2 text-2xl" style={{ animation: 'cozyFloat 2s ease-in-out 0.2s infinite' }}>🎊</div>
              <div className="absolute -bottom-2 -left-3 text-xl" style={{ animation: 'cozyFloat 2.5s ease-in-out 0.6s infinite' }}>✨</div>
              <div className="absolute top-6 -left-6 text-2xl" style={{ animation: 'cozyFloat 3s ease-in-out 0.4s infinite' }}>⭐</div>
            </div>

            <h1 className="text-3xl font-extrabold mb-2" style={{ color: '#10B981' }}>
              Siap! 🌟
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              Dashboardmu sudah siap.<br />
              Yuk mulai petualangan kebiasaanmu! 🚀
            </p>
            <div className="flex gap-1">
              {[0, 1, 2].map(i => (
                <div key={i} className="w-2 h-2 rounded-full animate-bounce"
                  style={{ background: '#C084FC', animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes cozyFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }
        @keyframes loadBar {
          0% { width: 0%; }
          20% { width: 30%; }
          50% { width: 60%; }
          80% { width: 85%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}