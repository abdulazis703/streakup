'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BOTTOM_NAV = [
  { href: '/dashboard', icon: 'dashboard', label: 'Home' },
  { href: '/habits', icon: 'checklist', label: 'Habits' },
  { href: '/today', icon: 'task_alt', label: 'Hari Ini' },
  { href: '/statistics', icon: 'monitoring', label: 'Stats' },
  { href: '/profile', icon: 'person', label: 'Profil' },
];

export default function BottomNav() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-surface/90 backdrop-blur-xl border-t border-outline-variant/30 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-around px-sm py-sm">
        {BOTTOM_NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-[2px] px-sm py-xs rounded-xl transition-all group min-w-[56px] ${
              isActive(item.href) ? 'text-primary' : 'text-on-surface-variant'
            }`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
              isActive(item.href) ? 'bg-primary-container' : 'group-hover:bg-surface-container-high'
            }`}>
              <span
                className="material-symbols-outlined text-[20px] transition-transform group-hover:scale-110"
                style={isActive(item.href) ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {item.icon}
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
