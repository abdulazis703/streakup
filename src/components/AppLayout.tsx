'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import AmbientBackground from './AmbientBackground';
import SeasonSelector from './SeasonSelector';
import { useAppData } from '@/lib/context/AppDataContext';
import { useSettings } from '@/lib/context/SettingsContext';

interface AppLayoutProps {
  children: React.ReactNode;
  currentStreak?: number;
  userName?: string;
}

// ─── Notification type ───────────────────────────────────────────────────────
interface Notification {
  id: string;
  type: 'streak' | 'reminder' | 'achievement' | 'tip';
  title: string;
  body: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  timeLabel: string;
  read: boolean;
  href?: string;
}

// ─── Category gradient map (for search results) ───────────────────────────────
const CATEGORY_GRADIENT: Record<string, string> = {
  Kesehatan: 'from-rose-500 to-red-600',
  Olahraga:  'from-amber-400 to-orange-500',
  Keuangan:  'from-amber-400 to-orange-500',
  Umum:      'from-amber-400 to-orange-500',
  Mindfulness:'from-emerald-400 to-teal-600',
  Hobi:      'from-emerald-400 to-teal-600',
  Belajar:   'from-purple-500 to-indigo-600',
  Produktif: 'from-purple-500 to-indigo-600',
};

export default function AppLayout({ children }: AppLayoutProps) {
  const router = useRouter();
  const { profile, user, signOut, habits, stats } = useAppData();
  const { t } = useSettings();
  
  // ── Sidebar state ────────────────────────────────────────────────────────
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // ── Search state ─────────────────────────────────────────────────────────
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // ── Notification state ───────────────────────────────────────────────────
  const [showNotif, setShowNotif] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // Build dynamic notifications from real habits data
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const generated: Notification[] = [];

    // Streak milestone notifications
    habits
      .filter((h) => h.current_streak > 0)
      .slice(0, 2)
      .forEach((h, i) => {
        generated.push({
          id: `streak-${h.id}`,
          type: 'streak',
          title: `🔥 Streak ${h.current_streak} Hari!`,
          body: `Habit "${h.title}" sudah ${h.current_streak} hari berturut-turut. Pertahankan!`,
          icon: 'local_fire_department',
          iconBg: 'bg-tertiary-fixed',
          iconColor: 'text-tertiary',
          timeLabel: `${i + 1} jam yang lalu`,
          read: false,
          href: '/today',
        });
      });

    // Reminder for habits not done today
    habits
      .filter((h) => !h.done_today)
      .slice(0, 2)
      .forEach((h, i) => {
        generated.push({
          id: `reminder-${h.id}`,
          type: 'reminder',
          title: '📋 Jangan lupa check-in!',
          body: `Habit "${h.title}" belum selesai hari ini.`,
          icon: 'notifications_active',
          iconBg: 'bg-primary-fixed',
          iconColor: 'text-primary',
          timeLabel: `${3 + i} jam yang lalu`,
          read: false,
          href: '/today',
        });
      });

    // Streak milestone tip
    if (stats.currentStreak >= 7) {
      generated.push({
        id: 'milestone-7',
        type: 'achievement',
        title: '🏆 Milestone 7 Hari!',
        body: 'Luar biasa! Kamu sudah konsisten selama seminggu penuh.',
        icon: 'emoji_events',
        iconBg: 'bg-secondary-fixed',
        iconColor: 'text-secondary',
        timeLabel: 'Kemarin',
        read: false,
        href: '/achievements',
      });
    }

    // Fallback if no habits
    if (generated.length === 0) {
      generated.push({
        id: 'welcome',
        type: 'tip',
        title: '👋 Selamat datang di Streak Up!',
        body: 'Mulai tambahkan habit pertamamu dan bangun rutinitas sehat.',
        icon: 'waving_hand',
        iconBg: 'bg-primary-fixed',
        iconColor: 'text-primary',
        timeLabel: 'Baru saja',
        read: false,
        href: '/habits',
      });
    }

    setNotifications(generated);
  }, [habits, stats.currentStreak]);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const hasUnread = unreadCount > 0;

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const markOneRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  // ── Live search filtered results ─────────────────────────────────────────
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return habits.filter(
      (h) =>
        h.title.toLowerCase().includes(q) ||
        h.category.toLowerCase().includes(q)
    );
  }, [searchQuery, habits]);

  const displayName = profile?.full_name ?? user?.email?.split('@')[0] ?? 'Pengguna';

  // ── Keyboard shortcuts ───────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K → open search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(true);
        setShowNotif(false);
      }
      // Escape → close everything
      if (e.key === 'Escape') {
        setShowSearch(false);
        setShowNotif(false);
        setSearchQuery('');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Auto-focus search input when opened
  useEffect(() => {
    if (showSearch) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      setSearchQuery('');
    }
  }, [showSearch]);

  // ── Click-outside to close ───────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearch(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotif(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // ── Navigate from search result ──────────────────────────────────────────
  const handleHabitClick = (habitId: string) => {
    setShowSearch(false);
    setSearchQuery('');
    router.push('/today');
  };

  // ── Navigate "Lihat semua notifikasi" ────────────────────────────────────
  const handleSeeAllNotif = () => {
    setShowNotif(false);
    router.push('/today');
  };

  return (
    <AmbientBackground>
      {/* Desktop Sidebar */}
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(prev => !prev)} />

      {/* Mobile Bottom Nav */}
      <BottomNav />

      {/* ── Search Backdrop (full screen) ─────────────────────────────────── */}
      {showSearch && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] flex items-start justify-center"
          style={{ paddingTop: '72px', paddingLeft: '16px', paddingRight: '16px' }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) { setShowSearch(false); setSearchQuery(''); }
          }}
        >
          <div
            className="w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200"
            style={{ maxWidth: '560px', minWidth: '300px' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-outline-variant/10">
              <span className="material-symbols-outlined text-on-surface-variant text-[22px] shrink-0">search</span>
              <input
                ref={searchInputRef}
                type="text"
                placeholder={t('topbar.searchPlaceholder')}
                className="flex-1 bg-transparent border-none text-body-md focus:outline-none !text-slate-900 placeholder:text-slate-400 py-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}
              <kbd className="hidden sm:flex items-center gap-0.5 text-[10px] font-mono bg-surface-container-high text-on-surface-variant px-1.5 py-0.5 rounded border border-outline-variant/30 shrink-0">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[380px] overflow-y-auto">
              {!searchQuery && (
                <div className="px-5 py-10 text-center">
                  <span className="material-symbols-outlined text-[48px] text-on-surface-variant/30">manage_search</span>
                  <p className="text-label-sm text-on-surface-variant mt-3">Ketik nama habit atau kategori untuk mencari</p>
                  <p className="text-[11px] text-on-surface-variant/60 mt-1.5">Tekan <kbd className="font-mono bg-surface-container-high px-1 py-0.5 rounded text-[10px]">Ctrl+K</kbd> untuk membuka kapan saja</p>
                </div>
              )}

              {searchQuery && searchResults.length === 0 && (
                <div className="px-5 py-10 text-center">
                  <span className="material-symbols-outlined text-[40px] text-on-surface-variant/30">search_off</span>
                  <p className="text-label-sm text-on-surface-variant mt-3">Tidak ada habit yang cocok dengan "<strong>{searchQuery}</strong>"</p>
                </div>
              )}

              {searchResults.length > 0 && (
                <div className="py-xs">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant px-5 py-1.5">
                    {searchResults.length} Habit ditemukan
                  </p>
                  {searchResults.map((h) => (
                    <button
                      key={h.id}
                      onClick={() => handleHabitClick(h.id)}
                      className="w-full flex items-center gap-4 px-5 py-3 hover:bg-surface-container-low transition-colors group text-left"
                    >
                      {/* Category icon bubble */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-tr ${CATEGORY_GRADIENT[h.category] ?? 'from-amber-400 to-orange-500'} shadow-sm`}>
                        <span className="material-symbols-outlined text-[18px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
                          {h.icon}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-body-md font-bold text-on-surface truncate group-hover:text-primary transition-colors">{h.title}</p>
                        <p className="text-label-sm text-on-surface-variant">{h.category}</p>
                      </div>
                      <div className="flex items-center gap-xs text-label-sm font-bold text-primary shrink-0 bg-primary/10 px-2 py-0.5 rounded-full">
                        <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                        {h.current_streak}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer hint */}
            <div className="px-5 py-2.5 border-t border-outline-variant/10 flex items-center gap-5 text-[10px] text-on-surface-variant/60">
              <span><kbd className="font-mono bg-surface-container-high px-1 rounded text-[10px]">↵</kbd> buka</span>
              <span><kbd className="font-mono bg-surface-container-high px-1 rounded text-[10px]">↑↓</kbd> navigasi</span>
              <span><kbd className="font-mono bg-surface-container-high px-1 rounded text-[10px]">Esc</kbd> tutup</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className={`transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'}`}>
        {/* Top Header */}
        <header className={`sticky top-0 left-0 right-0 transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'lg:left-20' : 'lg:left-72'} h-16 bg-transparent z-40 flex items-center justify-between px-md lg:px-xl`}>
          <div className="flex items-center gap-sm">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center gap-sm">
              <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary-container text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  local_fire_department
                </span>
              </div>
              <span className="font-headline-md text-headline-md text-primary">Streak Up</span>
            </div>
          </div>

          <div className="flex items-center gap-sm">

            {/* ── Search Button ───────────────────────────────────────────── */}
            <div ref={searchRef} className="relative">
              <button
                onClick={() => { setShowSearch(!showSearch); setShowNotif(false); }}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${showSearch ? 'bg-primary/10 text-primary' : 'hover:bg-slate-200/50 !text-slate-900'}`}
                aria-label="Pencarian (Ctrl+K)"
                title="Pencarian (Ctrl+K)"
              >
                <span className="material-symbols-outlined text-[20px]">search</span>
              </button>
            </div>

            {/* ── Notification Button + Dropdown ─────────────────────────── */}
            <div ref={notifRef} className="relative">
              <button
                onClick={() => { setShowNotif(!showNotif); setShowSearch(false); }}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors relative ${showNotif ? 'bg-primary/10 text-primary' : 'hover:bg-slate-200/50 !text-slate-900'}`}
                aria-label="Notifikasi"
              >
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                {/* Unread badge — hidden when all read */}
                {hasUnread && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full shadow-sm ring-1 ring-surface animate-pulse" />
                )}
              </button>

              {showNotif && (
                <div className="absolute top-12 -right-16 sm:right-0 w-[300px] sm:w-[380px] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  {/* Header */}
                  <div className="px-md py-sm border-b border-slate-100 flex items-center justify-between bg-slate-50">
                    <div className="flex items-center gap-sm">
                      <h3 className="font-bold !text-slate-900">{t('topbar.notifications')}</h3>
                      {hasUnread && (
                        <span className="text-[10px] font-bold bg-error text-white px-1.5 py-0.5 rounded-full">
                          {unreadCount}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={markAllRead}
                      disabled={!hasUnread}
                      className={`text-[11px] font-bold transition-colors ${hasUnread ? 'text-primary hover:text-primary/70 cursor-pointer' : 'text-on-surface-variant/40 cursor-not-allowed'}`}
                    >
                      {t('topbar.markAllRead')}
                    </button>
                  </div>

                  {/* Notification list */}
                  <div className="max-h-[340px] overflow-y-auto divide-y divide-outline-variant/10">
                    {notifications.map((notif) => (
                      <button
                        key={notif.id}
                        onClick={() => {
                          markOneRead(notif.id);
                          if (notif.href) { setShowNotif(false); router.push(notif.href); }
                        }}
                        className={`w-full text-left p-md flex gap-sm transition-colors group ${notif.read ? 'bg-white hover:bg-slate-50' : 'bg-orange-50/60 hover:bg-orange-50'}`}
                      >
                        {/* Icon */}
                        <div className={`w-10 h-10 rounded-full ${notif.iconBg} ${notif.iconColor} flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform`}>
                          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            {notif.icon}
                          </span>
                        </div>
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <p className="text-body-sm font-bold !text-slate-900 leading-snug truncate">{notif.title}</p>
                          <p className="text-[12px] !text-slate-600 leading-snug mt-0.5 line-clamp-2">{notif.body}</p>
                          <p className="text-[10px] !text-slate-400 mt-1 font-bold">{notif.timeLabel}</p>
                        </div>
                        {/* Unread dot */}
                        {!notif.read && (
                          <span className="w-2 h-2 bg-primary rounded-full shrink-0 mt-1.5" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="border-t border-slate-100 bg-slate-50">
                    <button
                      onClick={handleSeeAllNotif}
                      className="w-full py-sm text-label-sm font-bold text-secondary hover:bg-surface-container-low transition-colors"
                    >
                      {t('topbar.seeAllActivity')}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ── User Info + Sign Out ────────────────────────────────────── */}
            <div className="flex items-center gap-sm ml-base">
              <div className="text-right hidden sm:block">
                <p className="text-label-sm font-bold !text-slate-900">{displayName}</p>
                <p className="text-[10px] !text-slate-700 uppercase tracking-wider">{t('topbar.member')}</p>
              </div>
              <button
                onClick={signOut}
                title={t('topbar.logout')}
                className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20 cursor-pointer hover:scale-105 transition-transform"
              >
                <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="min-h-[calc(100vh-4rem)] pb-24 lg:pb-8">
          {children}
        </main>
      </div>
    </AmbientBackground>
  );
}
