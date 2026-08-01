'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const SPRING = { type: 'spring', stiffness: 320, damping: 22 } as const;

export default function LandingHeader() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ...SPRING, delay: 0.1 }}
      className="fixed top-0 w-full z-50 border-b border-white/50"
      style={{ background: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(22px)' }}
    >
      <div className="h-20 w-full px-6 flex items-center justify-between max-w-[1200px] mx-auto">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.04 }}
          transition={SPRING}
        >
          <img
            alt="Streak Up Logo"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCK-7soSxxpUhtn3GWuTxcHJlSgrGihG_9NZeVWvfQW8z_hWsRe3z49-Ge5GZHIy6FUhzoCMTPRl2Wx_Fv_owzTuV-Zj4mj-G6YG-_2aBkmXBVGZ9u3n1n6ppHyniafQUjMQysQcSuQWXxJyoa0svtp6-kPaIBLzbA_QdUJgb1UcHHiQGwYAyCrQ3uhJ4BkAeFwUaN7UpvHO0klToAXKzTv7c3rkprLJ7FUOOJqUAyqCDZ8IKI-YqXqAg"
          />
          <span className="font-extrabold text-xl tracking-tight text-[#9e4225]">Streak Up</span>
        </motion.div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {['#fitur', '#tentang', '/login'].map((href, i) => (
            <motion.div key={href} whileHover={{ y: -2 }} transition={SPRING}>
              <Link
                href={href}
                className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
              >
                {['Fitur', 'Tentang', 'Login'][i]}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.96 }} transition={SPRING}>
            <Link
              href="/register"
              className="hidden md:inline-flex px-5 py-2.5 bg-[#9e4225] text-white text-sm font-bold rounded-2xl shadow-lg hover:shadow-[#9e4225]/30 hover:shadow-xl transition-shadow"
            >
              Mulai Gratis ✨
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={SPRING}>
            <Link
              href="/login"
              className="w-9 h-9 rounded-full bg-[#9e4225] flex items-center justify-center shadow-md"
            >
              <span className="material-symbols-outlined text-white text-[18px]">person</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
