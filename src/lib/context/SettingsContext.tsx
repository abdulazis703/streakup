'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';

type Theme = 'light' | 'dark' | 'auto';
type Language = 'id' | 'en';

interface SettingsContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  isDarkMode: boolean; // Resolved boolean whether we are actually painting dark mode
  t: (key: string) => string;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

// ─────────────────────────────────────────────────────────────────────────────
// DICTIONARY
// ─────────────────────────────────────────────────────────────────────────────
type TranslationDict = Record<string, Record<Language, string>>;

const DICTIONARY: TranslationDict = {
  // Navigation
  'nav.dashboard': { id: 'Dasbor', en: 'Dashboard' },
  'nav.habits': { id: 'Habits', en: 'Habits' },
  'nav.today': { id: 'Hari Ini', en: 'Today' },
  'nav.calendar': { id: 'Kalender', en: 'Calendar' },
  'nav.statistics': { id: 'Statistik', en: 'Statistics' },
  'nav.achievements': { id: 'Pencapaian', en: 'Achievements' },
  'nav.reflection': { id: 'Refleksi', en: 'Reflection' },
  'nav.profile': { id: 'Profil', en: 'Profile' },
  'nav.settings': { id: 'Pengaturan', en: 'Settings' },
  
  // Sidebar
  'sidebar.currentStreak': { id: 'Streak Saat Ini', en: 'Current Streak' },
  'sidebar.target30Days': { id: 'Target 30 Hari', en: '30 Days Goal' },
  'sidebar.seasonTheme': { id: 'Tema Musim', en: 'Season Theme' },
  'sidebar.days': { id: 'Hari', en: 'Days' },

  // Topbar
  'topbar.searchPlaceholder': { id: 'Cari habit atau kategori...', en: 'Search habits or categories...' },
  'topbar.notifications': { id: 'Notifikasi', en: 'Notifications' },
  'topbar.markAllRead': { id: 'Tandai semua dibaca', en: 'Mark all as read' },
  'topbar.seeAllActivity': { id: 'Lihat semua aktivitas →', en: 'See all activity →' },
  'topbar.member': { id: 'Member', en: 'Member' },
  'topbar.logout': { id: 'Keluar', en: 'Sign Out' },

  // Settings
  'settings.title': { id: 'Pengaturan', en: 'Settings' },
  'settings.subtitle': { id: 'Kelola preferensi aplikasimu', en: 'Manage your app preferences' },
  'settings.account': { id: 'Akun', en: 'Account' },
  'settings.streakDays': { id: 'hari streak', en: 'days streak' },
  'settings.activeHabits': { id: 'habit aktif', en: 'active habits' },
  'settings.editProfile': { id: 'Edit Profil', en: 'Edit Profile' },
  'settings.notificationsTitle': { id: 'Notifikasi', en: 'Notifications' },
  'settings.dailyReminder': { id: 'Pengingat Harian', en: 'Daily Reminder' },
  'settings.dailyReminderDesc': { id: 'Notifikasi untuk menyelesaikan habit', en: 'Notifications to complete habits' },
  'settings.reminderTime': { id: 'Waktu Pengingat', en: 'Reminder Time' },
  'settings.reminderTimeDesc': { id: 'Setiap hari pukul', en: 'Every day at' },
  'settings.appearance': { id: 'Tampilan', en: 'Appearance' },
  'settings.theme': { id: 'Tema', en: 'Theme' },
  'settings.theme.light': { id: 'Terang', en: 'Light' },
  'settings.theme.dark': { id: 'Gelap', en: 'Dark' },
  'settings.theme.auto': { id: 'Otomatis', en: 'Auto' },
  'settings.language': { id: 'Bahasa', en: 'Language' },
  'settings.aboutApp': { id: 'Tentang Aplikasi', en: 'About App' },
  'settings.version': { id: 'Versi', en: 'Version' },
  'settings.totalActiveHabits': { id: 'Total Habit Aktif', en: 'Total Active Habits' },
  'settings.totalCheckins': { id: 'Total Check-in', en: 'Total Check-ins' },
  'settings.longestStreak': { id: 'Streak Terpanjang', en: 'Longest Streak' },
  'settings.saveBtn': { id: 'Simpan Pengaturan', en: 'Save Settings' },
  'settings.savedBtn': { id: 'Tersimpan!', en: 'Saved!' },
  'settings.logoutBtn': { id: 'Keluar dari Akun', en: 'Sign Out of Account' },
};

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [language, setLanguageState] = useState<Language>('id');
  const isDarkMode = false;

  // Initialize from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('streakup_lang') as Language;
    if (savedLang) setLanguageState(savedLang);
    document.documentElement.classList.remove('dark');
  }, []);

  // Ensure dark mode is never applied
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, [theme]);

  const setTheme = (t: Theme) => {
    setThemeState('light');
    localStorage.removeItem('streakup_theme');
  };

  const setLanguage = (l: Language) => {
    setLanguageState(l);
    localStorage.setItem('streakup_lang', l);
  };

  const t = useMemo(() => {
    return (key: string): string => {
      if (!DICTIONARY[key]) {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
      return DICTIONARY[key][language];
    };
  }, [language]);

  return (
    <SettingsContext.Provider value={{ theme, setTheme, language, setLanguage, isDarkMode, t }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
