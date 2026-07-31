'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ForceLightMode from '@/components/ForceLightMode';

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Simple intersection observer for reveal animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('section > div > div').forEach(el => {
      el.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Generate heatmap colors predictably for SSR compatibility
  const opacities = ['bg-surface-container-high', 'bg-primary-fixed', 'bg-primary-container', 'bg-primary'];

  if (!mounted) return null;

  return (
    <div className="min-h-screen text-slate-800 font-sans selection:bg-violet-200 selection:text-violet-900 overflow-x-hidden"
      style={{ background: 'linear-gradient(135deg, #FFE4E1 0%, #E6E6FA 50%, #E0FFFF 100%)' }}>
      <ForceLightMode />
      <header className="fixed top-0 w-full z-50 shadow-sm border-b border-white/50"
        style={{ background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(20px)' }}>
        <div className="h-20 w-full px-container-padding flex items-center justify-between max-w-[1200px] mx-auto">
          <div className="flex items-center gap-sm">
            <img alt="Streak Up Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCK-7soSxxpUhtn3GWuTxcHJlSgrGihG_9NZeVWvfQW8z_hWsRe3z49-Ge5GZHIy6FUhzoCMTPRl2Wx_Fv_owzTuV-Zj4mj-G6YG-_2aBkmXBVGZ9u3n1n6ppHyniafQUjMQysQcSuQWXxJyoa0svtp6-kPaIBLzbA_QdUJgb1UcHHiQGwYAyCrQ3uhJ4BkAeFwUaN7UpvHO0klToAXKzTv7c3rkprLJ7FUOOJqUAyqCDZ8IKI-YqXqAg" />
            <span className="font-display text-headline-md font-extrabold text-primary tracking-tight">Streak Up</span>
          </div>
          <nav className="hidden md:flex items-center gap-lg">
            <Link href="#fitur" className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors">Fitur</Link>
            <Link href="#tentang" className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors">Tentang</Link>
            <Link href="/login" className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors">Login</Link>
          </nav>
          <div className="flex items-center gap-md">
            <Link href="/register" className="hidden md:block px-md py-sm bg-primary text-on-primary font-label-sm text-label-sm rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all">
              Mulai Gratis
            </Link>
            <Link href="/login" className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="w-full pt-20 min-h-screen">
        <div className="flex flex-col w-full">
          {/* Hero Section */}
          <section className="relative px-container-padding py-xl overflow-hidden">
            {/* Decorative Gradient Blobs */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary-fixed/20 to-secondary-fixed/20 blur-[120px] rounded-full -mr-64 -mt-32 -z-10"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-tertiary-fixed/10 to-primary-fixed/10 blur-[100px] rounded-full -ml-32 -mb-32 -z-10"></div>
            <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
              <div className="flex flex-col items-start gap-lg z-10">
                <div className="inline-flex items-center gap-sm bg-surface-container px-md py-xs rounded-full">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="font-stat-label text-label-sm text-primary uppercase tracking-widest">Wellness First</span>
                </div>
                <h1 className="font-display text-display lg:text-[56px] lg:leading-[64px] font-extrabold text-on-surface max-w-[500px]">
                  Membangun kebiasaan baik seharusnya terasa <span className="text-primary italic font-extrabold">menyenangkan</span>
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[460px]">
                  Track habit kamu dengan cara yang emosional, hangat, dan penuh pencapaian. Kami percaya produktivitas adalah tentang perawatan diri.
                </p>
                <div className="flex flex-col sm:flex-row gap-md w-full sm:w-auto">
                  <Link href="/register" className="px-xl py-md bg-primary text-on-primary font-headline-md text-body-md rounded-xl shadow-[0_10px_30px_rgba(158,66,37,0.2)] hover:scale-105 hover:shadow-[0_15px_40px_rgba(158,66,37,0.3)] transition-all duration-300 text-center">
                    Mulai Perjalananmu
                  </Link>
                  <button className="px-xl py-md bg-surface-container-high text-on-surface font-label-sm text-label-sm rounded-xl hover:bg-surface-variant transition-colors flex items-center justify-center gap-sm">
                    <span className="material-symbols-outlined">play_circle</span>
                    Lihat Demo
                  </button>
                </div>
              </div>
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative z-10 hover:rotate-2 transition-transform duration-700">
                  <img alt="Streak Up Mascot" className="w-full max-w-[500px] drop-shadow-[0_20px_50px_rgba(158,66,37,0.15)]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsOxB6u2gWilhKHwLjLTys5aLA3H2VGBFeMbrfe9pj2jx4Nb3KDBjDC-KvqJbMyFHABLUpPyTT-gYNtuZ2YzFT3SvMwTuVjS5prla2AZ35B1xJLJA62Gi8dhvNFUaSadB2YQtUXEp_NMlgf3UnJ6QpQs4f1OmfQ1JJZLNje6iG110VJwkE58iq66JfC3wfOikxGb7tvj6GCQpJyxtgS00_9wnOIeIlh4_wQzZumFU6qG1c1d43pnsllQ" />
                </div>
                {/* Floating Glass Badge */}
                <div className="absolute -bottom-8 -left-8 bg-surface/80 backdrop-blur-xl p-md rounded-2xl shadow-xl border border-white/50 z-20 hidden md:block animate-bounce" style={{ animationDuration: '5s' }}>
                  <div className="flex items-center gap-md">
                    <div className="w-12 h-12 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container">
                      <span className="material-symbols-outlined">auto_awesome</span>
                    </div>
                    <div>
                      <p className="font-label-sm text-label-sm text-on-surface">Streak 15 Hari!</p>
                      <p className="font-stat-label text-[10px] text-outline uppercase">Luar Biasa</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Feature Grid */}
          <section id="fitur" className="px-container-padding py-xl relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-transparent to-white/20 -z-10" />
            <div className="max-w-[1200px] w-full mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end gap-md mb-xl">
                <div className="max-w-md">
                  <p className="font-stat-label text-label-sm text-primary uppercase tracking-[0.2em] mb-sm">Fitur Utama</p>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface">Didesain untuk ketenangan pikiran Anda.</h2>
                </div>
                <div className="h-[1px] flex-grow bg-outline-variant mx-lg hidden md:block mb-base"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
                {/* Card 1 */}
                <div className="group p-lg rounded-[24px] shadow-sm hover:shadow-[0_12px_30px_rgba(192,132,252,0.2)] hover:-translate-y-2 transition-all duration-500"
                  style={{ background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.6)' }}>
                  <div className="w-14 h-14 rounded-2xl bg-primary-fixed flex items-center justify-center mb-lg group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-on-primary-fixed-variant text-[32px]">checklist</span>
                  </div>
                  <h3 className="font-headline-md text-body-md text-on-surface mb-base">Today's Checklist</h3>
                  <p className="font-body-md text-label-sm text-on-surface-variant leading-relaxed">
                    Selesaikan habit harian dengan sentuhan personal yang menenangkan.
                  </p>
                </div>
                {/* Card 2 */}
                <div className="group p-lg rounded-[24px] shadow-sm hover:shadow-[0_12px_30px_rgba(192,132,252,0.2)] hover:-translate-y-2 transition-all duration-500"
                  style={{ background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.6)' }}>
                  <div className="relative w-14 h-14 mb-lg">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path className="text-tertiary-fixed stroke-current" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3"></path>
                      <path className="text-tertiary stroke-current transition-all duration-1000 ease-out" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeDasharray="75, 100" strokeLinecap="round" strokeWidth="3"></path>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-tertiary text-[18px]">bolt</span>
                    </div>
                  </div>
                  <h3 className="font-headline-md text-body-md text-on-surface mb-base">Progress Ring & Streak</h3>
                  <p className="font-body-md text-label-sm text-on-surface-variant leading-relaxed">
                    Visualisasi kemajuan yang memuaskan mata untuk motivasi berkelanjutan.
                  </p>
                </div>
                {/* Card 3 */}
                <div className="group p-lg rounded-[24px] shadow-sm hover:shadow-[0_12px_30px_rgba(192,132,252,0.2)] hover:-translate-y-2 transition-all duration-500"
                  style={{ background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.6)' }}>
                  <div className="w-14 h-14 rounded-2xl bg-secondary-fixed flex items-center justify-center mb-lg overflow-hidden relative">
                    <div className="absolute inset-0 bg-gray-400 opacity-50 group-hover:opacity-0 transition-opacity duration-500"></div>
                    <span className="material-symbols-outlined text-on-secondary-fixed text-[32px] relative z-10">military_tech</span>
                  </div>
                  <h3 className="font-headline-md text-body-md text-on-surface mb-base">Achievement Badge</h3>
                  <p className="font-body-md text-label-sm text-on-surface-variant leading-relaxed">
                    Koleksi badge unik untuk setiap milestone yang kamu capai.
                  </p>
                </div>
                {/* Card 4 */}
                <div className="group p-lg rounded-[24px] shadow-sm hover:shadow-[0_12px_30px_rgba(192,132,252,0.2)] hover:-translate-y-2 transition-all duration-500"
                  style={{ background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.6)' }}>
                  <div className="flex gap-xs mb-lg">
                    <span className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center text-[18px]">✨</span>
                    <span className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center text-[18px]">🌿</span>
                    <span className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center text-[18px]">🌙</span>
                  </div>
                  <h3 className="font-headline-md text-body-md text-on-surface mb-base">Daily Reflection</h3>
                  <p className="font-body-md text-label-sm text-on-surface-variant leading-relaxed">
                    Ruang tenang untuk mencatat perasaanmu setiap hari tanpa tekanan.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Dashboard Showcase */}
          <section id="tentang" className="px-container-padding py-xl overflow-hidden">
            <div className="max-w-[1200px] w-full mx-auto flex flex-col items-center gap-xl">
              <div className="text-center max-w-2xl">
                <h2 className="font-display text-headline-lg text-on-surface mb-md">Dashboard yang Menenangkan</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">Fokus pada apa yang penting. UI kami dirancang untuk meminimalkan gangguan dan memaksimalkan fokus pada kebahagiaan Anda.</p>
              </div>
              {/* Mockup Frame */}
              <div className="w-full relative">
                <div className="absolute inset-0 bg-violet-400/20 blur-3xl rounded-full scale-110 -z-10"></div>
                <div className="w-full rounded-[32px] overflow-hidden shadow-[0_40px_100px_rgba(192,132,252,0.15)] border-[1px] border-white/60"
                  style={{ background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(24px)' }}>
                  {/* Browser Header */}
                  <div className="h-12 bg-white/30 flex items-center px-lg gap-sm border-b border-white/40">
                    <div className="flex gap-xs">
                      <div className="w-3 h-3 rounded-full bg-error/30"></div>
                      <div className="w-3 h-3 rounded-full bg-primary/30"></div>
                      <div className="w-3 h-3 rounded-full bg-tertiary/30"></div>
                    </div>
                    <div className="bg-surface rounded-full h-6 flex-grow max-w-xs mx-auto"></div>
                  </div>
                  {/* Mock Content */}
                  <div className="p-lg grid grid-cols-1 md:grid-cols-3 gap-lg">
                    <div className="md:col-span-2 space-y-lg">
                      <div className="p-lg rounded-2xl border border-white/50" style={{ background: 'rgba(255,255,255,0.5)' }}>
                        <div className="flex justify-between items-center mb-lg">
                          <p className="font-headline-md text-body-md text-on-surface">Daily Activity</p>
                          <p className="font-label-sm text-label-sm text-primary">Mei 2024</p>
                        </div>
                        {/* Heatmap Component */}
                        <div className="grid grid-cols-7 sm:grid-cols-[repeat(14,minmax(0,1fr))] lg:grid-cols-[repeat(21,minmax(0,1fr))] gap-2">
                          {mounted && Array.from({ length: 120 }).map((_, i) => {
                            const colorIndex = (i * 7 + 3) % opacities.length;
                            const randomColor = opacities[colorIndex];
                            return (
                              <div key={i} className={`w-full aspect-square rounded-sm ${randomColor} opacity-80 hover:scale-125 transition-transform cursor-pointer`}></div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-md">
                        <div className="bg-tertiary-container/20 p-md rounded-2xl flex items-center gap-3 overflow-hidden">
                          <div className="w-12 h-12 rounded-xl bg-tertiary-container flex items-center justify-center flex-shrink-0 overflow-hidden">
                            <span className="material-symbols-outlined text-on-tertiary-container select-none text-[24px]">fitbit_push_ups</span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-label-sm text-label-sm text-on-surface truncate">Meditasi</p>
                            <p className="font-stat-label text-[10px] text-tertiary uppercase">Done</p>
                          </div>
                        </div>
                        <div className="bg-primary-container/20 p-md rounded-2xl flex items-center gap-3 overflow-hidden">
                          <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center flex-shrink-0 overflow-hidden">
                            <span className="material-symbols-outlined text-on-primary-container select-none text-[24px]">water_drop</span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-label-sm text-label-sm text-on-surface truncate">Minum Air</p>
                            <p className="font-stat-label text-[10px] text-primary uppercase">80%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-secondary-container/10 p-lg rounded-2xl border border-secondary-container/20">
                      <div className="flex flex-col items-center text-center gap-md">
                        <div className="w-24 h-24 rounded-full border-4 border-secondary-container border-t-transparent animate-spin [animation-duration:8s] relative">
                          <div className="absolute inset-2 bg-surface rounded-full flex items-center justify-center animate-none">
                            <span className="font-headline-md text-headline-md text-secondary">88%</span>
                          </div>
                        </div>
                        <h4 className="font-headline-md text-body-md text-on-surface">Mood Hari Ini</h4>
                        <div className="flex gap-sm">
                          <span className="text-2xl hover:scale-125 transition-transform cursor-pointer grayscale hover:grayscale-0">😊</span>
                          <span className="text-2xl hover:scale-125 transition-transform cursor-pointer grayscale hover:grayscale-0">😌</span>
                          <span className="text-2xl hover:scale-125 transition-transform cursor-pointer">✨</span>
                          <span className="text-2xl hover:scale-125 transition-transform cursor-pointer grayscale hover:grayscale-0">🌊</span>
                        </div>
                        <hr className="w-full border-secondary-container/20" />
                        <p className="font-body-md text-label-sm text-on-surface-variant italic">&quot;Kamu sudah melakukan yang terbaik hari ini. Istirahatlah.&quot;</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="px-container-padding py-xl">
            <div className="max-w-[1000px] w-full mx-auto rounded-[40px] p-8 md:p-14 relative overflow-hidden flex flex-col items-center text-center gap-6 shadow-[0_20px_60px_rgba(192,132,252,0.25)] border border-white/50"
              style={{ background: 'linear-gradient(135deg, rgba(255,107,157,0.8), rgba(192,132,252,0.8))', backdropFilter: 'blur(16px)' }}>
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2)_0%,transparent_70%)] pointer-events-none"></div>

              <h2 className="text-3xl md:text-5xl font-extrabold text-white max-w-2xl relative z-10 leading-tight">
                Siap untuk hari yang lebih tenang?
              </h2>

              <p className="w-full max-w-2xl text-center text-orange-100 text-base sm:text-lg font-medium relative z-10 block my-4 leading-relaxed">
                Bergabunglah dengan ribuan orang yang telah menemukan kebahagiaan dalam kebiasaan kecil mereka.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full sm:w-auto justify-center items-center mt-2">
                <Link href="/register" className="w-full sm:w-auto px-8 py-3.5 bg-white text-primary font-bold text-base rounded-2xl shadow-xl hover:scale-105 transition-all text-center">
                  Mulai Gratis Sekarang
                </Link>
                <button className="w-full sm:w-auto px-8 py-3.5 bg-white/10 text-white border border-white/20 backdrop-blur-sm font-semibold text-base rounded-2xl hover:bg-white/20 transition-all">
                  Tanya Kami Sesuatu
                </button>
              </div>

              {/* Maskot Kanan Bawah */}
              <div className="absolute -bottom-6 -right-6 opacity-30 transform rotate-12 select-none pointer-events-none z-0">
                <img alt="Mascot" className="w-48 h-48 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsOxB6u2gWilhKHwLjLTys5aLA3H2VGBFeMbrfe9pj2jx4Nb3KDBjDC-KvqJbMyFHABLUpPyTT-gYNtuZ2YzFT3SvMwTuVjS5prla2AZ35B1xJLJA62Gi8dhvNFUaSadB2YQtUXEp_NMlgf3UnJ6QpQs4f1OmfQ1JJZLNje6iG110VJwkE58iq66JfC3wfOikxGb7tvj6GCQpJyxtgS00_9wnOIeIlh4_wQzZumFU6qG1c1d43pnsllQ" />
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="w-full py-xl border-t border-white/40" style={{ background: 'rgba(255,255,255,0.3)', backdropFilter: 'blur(10px)' }}>
        <div className="max-w-[1200px] w-full mx-auto px-container-padding flex flex-col md:flex-row justify-between items-center gap-md">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-xs mb-base">
              <img alt="Streak Up Logo" className="h-6 w-auto grayscale opacity-70" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCK-7soSxxpUhtn3GWuTxcHJlSgrGihG_9NZeVWvfQW8z_hWsRe3z49-Ge5GZHIy6FUhzoCMTPRl2Wx_Fv_owzTuV-Zj4mj-G6YG-_2aBkmXBVGZ9u3n1n6ppHyniafQUjMQysQcSuQWXxJyoa0svtp6-kPaIBLzbA_QdUJgb1UcHHiQGwYAyCrQ3uhJ4BkAeFwUaN7UpvHO0klToAXKzTv7c3rkprLJ7FUOOJqUAyqCDZ8IKI-YqXqAg" />
              <span className="font-display text-body-md font-bold text-on-surface-variant">Streak Up</span>
            </div>
            <p className="font-body-md text-label-sm text-outline">© 2024 Streak Up. Gentle Productivity for Wellness.</p>
          </div>
          <div className="flex gap-lg">
            <Link href="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors">Kebijakan Privasi</Link>
            <Link href="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors">Syarat & Ketentuan</Link>
            <Link href="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors">Bantuan</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}