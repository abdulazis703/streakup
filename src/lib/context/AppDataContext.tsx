"use client";

/**
 * AppDataContext — Single Source of Truth untuk seluruh aplikasi StreakUp.
 *
 * - Menggunakan data RIIL dari AuthContext (habits, profile, user).
 * - Menambahkan data dummy yang KONSISTEN di semua halaman:
 *   achievements, statistics, reflection, calendar, dll.
 * - Semua halaman harus import useAppData() bukan useAuth() langsung.
 */

import React, { createContext, useContext, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number;   // 0-100
  maxProgress: number;
  category: "streak" | "consistency" | "special" | "social";
}

export interface ReflectionEntry {
  id: string;
  date: string;
  mood: 1 | 2 | 3 | 4 | 5;
  moodLabel: string;
  text: string;
  habitsCompleted: number;
  totalHabits: number;
}

export interface CalendarDay {
  date: string;    // "YYYY-MM-DD"
  completionRate: number; // 0-100
  habitsCompleted: number;
  totalHabits: number;
}

export interface StatSummary {
  totalCheckIns: number;
  currentStreak: number;
  longestStreak: number;
  completionRate: number;  // % rata-rata 30 hari
  totalHabits: number;
  completedToday: number;
  weeklyData: { day: string; completed: number; total: number }[];
  monthlyData: { week: string; rate: number }[];
  categoryBreakdown: { category: string; count: number; color: string }[];
}

// ─────────────────────────────────────────────
// Dummy generator helpers
// ─────────────────────────────────────────────
function generateCalendarData(totalHabits: number, currentStreak: number): CalendarDay[] {
  const days: CalendarDay[] = [];
  const today = new Date();
  // Helper: format tanggal lokal (bukan UTC) agar sesuai timezone WIB
  const toLocalDateStr = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

  for (let i = 59; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = toLocalDateStr(d);

    // Days in streak range have high completion
    const inStreak = i < currentStreak;
    const rate = inStreak
      ? 80 + Math.floor(Math.random() * 20)
      : i < currentStreak + 7
      ? 40 + Math.floor(Math.random() * 40)
      : Math.floor(Math.random() * 70);

    const completed = Math.round((totalHabits * rate) / 100);

    days.push({
      date: dateStr,
      completionRate: rate,
      habitsCompleted: completed,
      totalHabits,
    });
  }

  return days;
}


function generateReflections(): ReflectionEntry[] {
  const moods: { mood: 1 | 2 | 3 | 4 | 5; label: string }[] = [
    { mood: 5, label: "Sangat Bahagia" },
    { mood: 4, label: "Baik" },
    { mood: 3, label: "Biasa" },
    { mood: 2, label: "Kurang Baik" },
    { mood: 1, label: "Buruk" },
  ];

  const texts = [
    "Hari yang produktif! Berhasil menyelesaikan semua target habit hari ini. Merasa puas dan bersemangat untuk besok.",
    "Cukup baik hari ini, meskipun ada 1 habit yang terlewat. Akan lebih konsisten besok.",
    "Hari yang berat, tapi tetap berhasil menyelesaikan beberapa habit. Progres kecil tetaplah progres.",
    "Luar biasa! Streak terus berlanjut. Merasa termotivasi dan energi penuh.",
    "Perlu lebih fokus lagi. Distraksi cukup banyak hari ini, tapi tidak apa-apa. Besok lebih baik!",
  ];

  return Array.from({ length: 10 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const m = moods[Math.floor(Math.random() * moods.length)];
    return {
      id: `r${i}`,
      date: d.toISOString().split("T")[0],
      mood: m.mood,
      moodLabel: m.label,
      text: texts[i % texts.length],
      habitsCompleted: 3 + Math.floor(Math.random() * 3),
      totalHabits: 5,
    };
  });
}

function generateAchievements(currentStreak: number, totalHabits: number, totalCheckIns: number): Achievement[] {
  return [
    {
      id: "first_checkin",
      title: "Langkah Pertama",
      description: "Selesaikan habit pertamamu",
      icon: "rocket_launch",
      color: "#ff8c69",
      unlocked: totalCheckIns >= 1,
      unlockedAt: "2024-01-15",
      progress: Math.min(totalCheckIns, 1),
      maxProgress: 1,
      category: "special",
    },
    {
      id: "streak_7",
      title: "Seminggu Penuh",
      description: "Pertahankan streak 7 hari berturut-turut",
      icon: "local_fire_department",
      color: "#ff6b35",
      unlocked: currentStreak >= 7,
      unlockedAt: currentStreak >= 7 ? "2024-01-22" : undefined,
      progress: Math.min(currentStreak, 7),
      maxProgress: 7,
      category: "streak",
    },
    {
      id: "streak_30",
      title: "Sebulan Konsisten",
      description: "Pertahankan streak 30 hari",
      icon: "emoji_events",
      color: "#ffd700",
      unlocked: currentStreak >= 30,
      progress: Math.min(currentStreak, 30),
      maxProgress: 30,
      category: "streak",
    },
    {
      id: "habit_collector",
      title: "Kolektor Habit",
      description: "Tambahkan 5 habit aktif",
      icon: "checklist",
      color: "#63bd8b",
      unlocked: totalHabits >= 5,
      progress: Math.min(totalHabits, 5),
      maxProgress: 5,
      category: "consistency",
    },
    {
      id: "century",
      title: "100 Check-in!",
      description: "Lakukan 100 check-in habit",
      icon: "stars",
      color: "#b7a8fe",
      unlocked: totalCheckIns >= 100,
      progress: Math.min(totalCheckIns, 100),
      maxProgress: 100,
      category: "consistency",
    },
    {
      id: "perfect_week",
      title: "Minggu Sempurna",
      description: "Selesaikan semua habit selama 7 hari",
      icon: "auto_awesome",
      color: "#cabeff",
      unlocked: currentStreak >= 7,
      progress: Math.min(currentStreak, 7),
      maxProgress: 7,
      category: "special",
    },
    {
      id: "early_bird",
      title: "Early Bird",
      description: "Selesaikan habit sebelum jam 8 pagi (10x)",
      icon: "light_mode",
      color: "#ffb59f",
      unlocked: false,
      progress: 4,
      maxProgress: 10,
      category: "special",
    },
    {
      id: "comeback",
      title: "Comeback King",
      description: "Mulai lagi setelah streak terputus",
      icon: "refresh",
      color: "#9af6c0",
      unlocked: true,
      unlockedAt: "2024-01-10",
      progress: 1,
      maxProgress: 1,
      category: "special",
    },
  ];
}

// ─────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────
interface AppDataContextValue {
  // From AuthContext (real data)
  user: ReturnType<typeof useAuth>["user"];
  profile: ReturnType<typeof useAuth>["profile"];
  habits: ReturnType<typeof useAuth>["habits"];
  loading: ReturnType<typeof useAuth>["loading"];
  checkInHabit: ReturnType<typeof useAuth>["checkInHabit"];
  uncheckHabit: ReturnType<typeof useAuth>["uncheckHabit"];
  addHabit: ReturnType<typeof useAuth>["addHabit"];
  deleteHabit: ReturnType<typeof useAuth>["deleteHabit"];
  signOut: ReturnType<typeof useAuth>["signOut"];
  refreshHabits: ReturnType<typeof useAuth>["refreshHabits"];

  // Computed from real data
  stats: StatSummary;

  // Consistent dummy/derived data
  achievements: Achievement[];
  reflections: ReflectionEntry[];
  calendarData: CalendarDay[];
  addReflection: (entry: Omit<ReflectionEntry, 'id'>) => void;
}

const AppDataContext = createContext<AppDataContextValue | undefined>(undefined);

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const [addedReflections, setAddedReflections] = useState<ReflectionEntry[]>([]);

  const value = useMemo<AppDataContextValue>(() => {
    const { habits } = auth;

    // Computed real stats
    const currentStreak = habits.length > 0
      ? Math.max(...habits.map((h) => h.current_streak), 0)
      : 0;
    const longestStreak = habits.length > 0
      ? Math.max(...habits.map((h) => h.longest_streak), 0)
      : 0;
    const completedToday = habits.filter((h) => h.done_today).length;
    const totalHabits = habits.length;
    const completionRate = totalHabits > 0
      ? Math.round((completedToday / totalHabits) * 100)
      : 0;

    // Dummy totalCheckIns (would be real from habit_logs count in full impl)
    const totalCheckIns = currentStreak * totalHabits + 12;

    // Weekly data (last 7 days — dummy but consistent)
    const weekdays = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
    const weeklyData = weekdays.map((day, i) => ({
      day,
      completed: i < 5 ? Math.max(1, totalHabits - Math.floor(Math.random() * 2)) : Math.floor(totalHabits * 0.6),
      total: totalHabits || 5,
    }));

    const monthlyData = [
      { week: "Mg 1", rate: 72 },
      { week: "Mg 2", rate: 85 },
      { week: "Mg 3", rate: 78 },
      { week: "Mg 4", rate: completionRate > 0 ? completionRate : 90 },
    ];

    const categoryBreakdown = habits.length > 0
      ? Object.entries(
          habits.reduce<Record<string, number>>((acc, h) => {
            acc[h.category] = (acc[h.category] || 0) + 1;
            return acc;
          }, {})
        ).map(([category, count]) => ({
          category,
          count,
          color: habits.find((h) => h.category === category)?.color ?? "#94a3b8",
        }))
      : [
          { category: "Kesehatan", count: 2, color: "#ff8c69" },
          { category: "Mindfulness", count: 2, color: "#b7a8fe" },
          { category: "Belajar", count: 1, color: "#63bd8b" },
        ];

    const stats: StatSummary = {
      totalCheckIns,
      currentStreak,
      longestStreak,
      completionRate,
      totalHabits,
      completedToday,
      weeklyData,
      monthlyData,
      categoryBreakdown,
    };

    return {
      ...auth,
      stats,
      achievements: generateAchievements(currentStreak, totalHabits, totalCheckIns),
      reflections: [...addedReflections, ...generateReflections()],
      addReflection: (entry) => {
        setAddedReflections((prev) => [{ ...entry, id: `ref_${Date.now()}` }, ...prev]);
      },
      calendarData: generateCalendarData(totalHabits || 5, currentStreak),
    };
  }, [auth, addedReflections]);

  return (
    <AppDataContext.Provider value={value}>
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData must be used inside <AppDataProvider>");
  return ctx;
}
