'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ForceLightMode from '@/components/ForceLightMode';
import FloatingSparkles from '@/components/landing/FloatingSparkles';
import LandingHeader from '@/components/landing/LandingHeader';
import HeroSection from '@/components/landing/HeroSection';
import FeatureSection from '@/components/landing/FeatureSection';
import ShowcaseSection from '@/components/landing/ShowcaseSection';
import CTASection from '@/components/landing/CTASection';

export default function LandingPage() {
  return (
    <div
      className="min-h-screen text-slate-800 font-sans selection:bg-violet-200 selection:text-violet-900 overflow-x-hidden relative"
      style={{
        background: 'linear-gradient(135deg, #FFF5E4 0%, #EDE7FF 50%, #E0F7FF 100%)',
      }}
    >
      <ForceLightMode />

      {/* Global floating sparkles layer */}
      <FloatingSparkles count={20} />

      {/* Navbar */}
      <LandingHeader />

      <main className="w-full pt-20">
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Fitur Utama */}
        <FeatureSection />

        {/* 3. Website Samples / Showcase */}
        <ShowcaseSection />

        {/* 4. CTA */}
        <CTASection />
      </main>

      {/* Footer */}
      <motion.footer
        className="w-full py-16 border-t border-white/40"
        style={{ background: 'rgba(255,255,255,0.35)', backdropFilter: 'blur(12px)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-[1200px] w-full mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-2">
              <img
                alt="Streak Up Logo"
                className="h-6 w-auto grayscale opacity-70"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCK-7soSxxpUhtn3GWuTxcHJlSgrGihG_9NZeVWvfQW8z_hWsRe3z49-Ge5GZHIy6FUhzoCMTPRl2Wx_Fv_owzTuV-Zj4mj-G6YG-_2aBkmXBVGZ9u3n1n6ppHyniafQUjMQysQcSuQWXxJyoa0svtp6-kPaIBLzbA_QdUJgb1UcHHiQGwYAyCrQ3uhJ4BkAeFwUaN7UpvHO0klToAXKzTv7c3rkprLJ7FUOOJqUAyqCDZ8IKI-YqXqAg"
              />
              <span className="font-bold text-sm text-slate-500">Streak Up</span>
            </div>
            <p className="text-xs text-slate-400">© 2024 Streak Up. Gentle Productivity for Wellness. ✨</p>
          </div>
          <div className="flex gap-6">
            {[
              ['Kebijakan Privasi', '#'],
              ['Syarat & Ketentuan', '#'],
              ['Bantuan', '#'],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="text-xs font-semibold text-slate-400 hover:text-[#9e4225] transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </motion.footer>
    </div>
  );
}