'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppData } from '@/lib/context/AppDataContext';
import { useSettings } from '@/lib/context/SettingsContext';
import CartoonIcon from './CartoonIcon';
import SeasonSwitcher from './SeasonSwitcher';
import { useSeason } from '@/lib/context/SeasonContext';
import {
  LayoutDashboard, CheckSquare, CalendarCheck, CalendarDays,
  BarChart3, Trophy, BookOpen, User, Settings, Flame, ChevronLeft, ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const NAV_ITEMS_KEYS = [
  { href: '/dashboard',    labelKey: 'nav.dashboard',     lucide: <LayoutDashboard size={18} strokeWidth={2.5} />,  gradient: 'fire'    },
  { href: '/habits',       labelKey: 'nav.habits',         lucide: <CheckSquare size={18} strokeWidth={2.5} />,       gradient: 'emerald' },
  { href: '/today',        labelKey: 'nav.today',       lucide: <CalendarCheck size={18} strokeWidth={2.5} />,     gradient: 'purple'  },
  { href: '/calendar',     labelKey: 'nav.calendar',       lucide: <CalendarDays size={18} strokeWidth={2.5} />,      gradient: 'sky'     },
  { href: '/statistics',   labelKey: 'nav.statistics',     lucide: <BarChart3 size={18} strokeWidth={2.5} />,         gradient: 'teal'    },
  { href: '/achievements', labelKey: 'nav.achievements',   lucide: <Trophy size={18} strokeWidth={2.5} />,            gradient: 'amber'   },
  { href: '/reflection',   labelKey: 'nav.reflection',     lucide: <BookOpen size={18} strokeWidth={2.5} />,          gradient: 'rose'    },
] as const;

const BOTTOM_ITEMS_KEYS = [
  { href: '/profile',  labelKey: 'nav.profile',   lucide: <User size={18} strokeWidth={2.5} />,     gradient: 'purple' },
  { href: '/settings', labelKey: 'nav.settings',  lucide: <Settings size={18} strokeWidth={2.5} />, gradient: 'sky'    },
] as const;

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const { season } = useSeason();
  const { t } = useSettings();
  // ── Single Source of Truth: baca langsung dari AuthContext ──
  const { habits } = useAppData();

  const currentStreak = habits.length > 0
    ? Math.max(...habits.map(h => h.current_streak), 0)
    : 0;

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <aside className={`fixed left-0 top-0 h-full z-50 flex flex-col transition-all duration-300 ease-in-out shadow-[4px_0_24px_rgba(0,0,0,0.04)] dark:shadow-[4px_0_24px_rgba(0,0,0,0.3)] border-r border-white/30 dark:border-slate-700/50 season-glass-${season} ${isCollapsed ? 'w-20' : 'w-72'}`}>
      
      {/* Toggle Button */}
      <button 
        onClick={onToggle}
        className="absolute -right-3 top-6 w-6 h-6 bg-white dark:bg-slate-800 border border-outline-variant/30 dark:border-slate-600/60 rounded-full flex items-center justify-center shadow-sm z-10 hover:bg-surface-container-low dark:hover:bg-slate-700 transition-colors"
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Logo */}
      <div className={`py-8 flex items-center ${isCollapsed ? 'justify-center px-0' : 'px-6 gap-3'}`}>
        <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
          <span className="material-symbols-outlined text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
            local_fire_department
          </span>
        </div>
        {!isCollapsed && (
          <span className="font-display text-headline-md text-primary tracking-tight truncate">Streak Up</span>
        )}
      </div>

      {/* Navigation */}
      <nav className={`flex-1 space-y-1 overflow-y-auto ${isCollapsed ? 'px-2' : 'px-4'}`}>
        {NAV_ITEMS_KEYS.map((item) => {
          const active = isActive(item.href);
          const translatedLabel = t(item.labelKey);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={isCollapsed ? translatedLabel : undefined}
              className={`flex items-center rounded-xl transition-all group ${isCollapsed ? 'justify-center p-2.5' : 'gap-3 px-4 py-2.5'} ${
                active
                  ? 'bg-white/60 backdrop-blur-sm shadow-sm font-bold text-on-surface'
                  : 'text-on-surface-variant hover:bg-white/40 hover:text-on-surface'
              }`}
            >
              <CartoonIcon
                icon={item.lucide}
                gradient={item.gradient as any}
                size="sm"
                className={active ? 'scale-110' : 'opacity-80 hover:opacity-100'}
              />
              {!isCollapsed && (
                <span className="font-body-md text-sm truncate">{translatedLabel}</span>
              )}
            </Link>
          );
        })}

        <div className={`my-4 border-t border-outline-variant/30 ${isCollapsed ? 'mx-2' : 'mx-4'}`} />

        {BOTTOM_ITEMS_KEYS.map((item) => {
          const active = isActive(item.href);
          const translatedLabel = t(item.labelKey);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={isCollapsed ? translatedLabel : undefined}
              className={`flex items-center rounded-xl transition-all group ${isCollapsed ? 'justify-center p-2.5' : 'gap-3 px-4 py-2.5'} ${
                active
                  ? 'bg-white/60 backdrop-blur-sm shadow-sm font-bold text-on-surface'
                  : 'text-on-surface-variant hover:bg-white/40 hover:text-on-surface'
              }`}
            >
              <CartoonIcon
                icon={item.lucide}
                gradient={item.gradient as any}
                size="sm"
                className={active ? 'scale-110' : 'opacity-80 hover:opacity-100'}
              />
              {!isCollapsed && (
                <span className="font-body-md text-sm truncate">{translatedLabel}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer widgets */}
      <div className={`p-4 space-y-4 ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
        {/* Streak widget */}
        <div className={`glass-card rounded-xl ${isCollapsed ? 'p-2 flex justify-center' : 'p-4'}`} title={isCollapsed ? `${t('sidebar.currentStreak')}: ${currentStreak} ${t('sidebar.days')}` : undefined}>
          {isCollapsed ? (
            <div className="flex flex-col items-center gap-1">
              <CartoonIcon icon={<Flame size={18} strokeWidth={2.5} />} gradient="fire" size="sm" />
              <span className="text-[10px] font-bold text-primary">{currentStreak}</span>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-3">
                <CartoonIcon icon={<Flame size={14} strokeWidth={2.5} />} gradient="fire" size="xs" />
                <p className="text-label-sm text-on-surface-variant uppercase tracking-widest">{t('sidebar.currentStreak')}</p>
              </div>
              <p className="text-headline-md text-primary font-bold">
                {currentStreak} {t('sidebar.days')}
              </p>
              <div className="mt-3 w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-container rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min((currentStreak / 30) * 100, 100)}%` }}
                />
              </div>
              <p className="text-[10px] text-on-surface-variant mt-1.5 uppercase tracking-wider">{t('sidebar.target30Days')}</p>
            </>
          )}
        </div>

        {/* Season Switcher */}
        <SeasonSwitcher isCollapsed={isCollapsed} />
      </div>
    </aside>
  );
}
