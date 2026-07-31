'use client';

import AppLayout from '@/components/AppLayout';
import { useAppData } from '@/lib/context/AppDataContext';
import Link from 'next/link';
import CartoonIcon from '@/components/CartoonIcon';
import {
  Layers,
  Trophy,
  CheckCircle2,
  Star,
  Settings,
  BarChart3,
  Droplets,
  Leaf,
  Zap,
  Pencil,
  Dumbbell,
  Heart,
  GraduationCap,
  PiggyBank,
  Briefcase,
  Palette,
  Flame,
  Moon,
  UtensilsCrossed,
  Music,
  BookOpen
} from 'lucide-react';

function getCategoryGradient(category: string) {
  switch (category) {
    case 'Kesehatan':
      return 'bg-gradient-to-tr from-rose-500 to-red-600';
    case 'Olahraga':
    case 'Keuangan':
    case 'Umum':
      return 'bg-gradient-to-tr from-amber-400 to-orange-500';
    case 'Mindfulness':
    case 'Hobi':
      return 'bg-gradient-to-tr from-emerald-400 to-teal-600';
    case 'Belajar':
    case 'Produktif':
      return 'bg-gradient-to-tr from-purple-500 to-indigo-600';
    default:
      return 'bg-gradient-to-tr from-amber-400 to-orange-500';
  }
}

function getHabitLucideIcon(iconKey: string, size = 18, className = "") {
  switch (iconKey) {
    case 'water_drop': return <Droplets size={size} className={className} strokeWidth={2.5} />;
    case 'self_improvement': return <Leaf size={size} className={className} strokeWidth={2.5} />;
    case 'menu_book': return <BookOpen size={size} className={className} strokeWidth={2.5} />;
    case 'directions_run': return <Zap size={size} className={className} strokeWidth={2.5} />;
    case 'edit_note': return <Pencil size={size} className={className} strokeWidth={2.5} />;
    case 'fitness_center': return <Dumbbell size={size} className={className} strokeWidth={2.5} />;
    case 'favorite': return <Heart size={size} className={className} strokeWidth={2.5} />;
    case 'school': return <GraduationCap size={size} className={className} strokeWidth={2.5} />;
    case 'savings': return <PiggyBank size={size} className={className} strokeWidth={2.5} />;
    case 'work': return <Briefcase size={size} className={className} strokeWidth={2.5} />;
    case 'palette': return <Palette size={size} className={className} strokeWidth={2.5} />;
    case 'star': return <Star size={size} className={className} strokeWidth={2.5} />;
    case 'local_fire_department': return <Flame size={size} className={className} strokeWidth={2.5} />;
    case 'bedtime': return <Moon size={size} className={className} strokeWidth={2.5} />;
    case 'restaurant': return <UtensilsCrossed size={size} className={className} strokeWidth={2.5} />;
    case 'music_note': return <Music size={size} className={className} strokeWidth={2.5} />;
    default: return <Star size={size} className={className} strokeWidth={2.5} />;
  }
}

export default function ProfilePage() {
  const { user, profile, habits, stats, achievements } = useAppData();

  const userName = profile?.full_name ?? user?.email?.split('@')[0] ?? 'Pengguna';
  const userEmail = user?.email ?? '';
  const initials = userName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  const joinDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
    : 'Baru-baru ini';

  const unlockedAchievements = achievements.filter((a) => a.unlocked);

  return (
    <AppLayout>
      <div className="px-md lg:px-xl py-lg max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-xl">
          <h1 className="text-display font-display text-on-surface">Profil</h1>
          <p className="text-body-lg text-on-surface-variant">Akun dan statistik pribadimu</p>
        </div>

        {/* Profile Card */}
        <div className="bg-gradient-to-br from-primary/10 to-secondary/5 rounded-[2rem] p-xl mb-xl shadow-sm border border-primary/10">
          <div className="flex items-start gap-xl flex-wrap">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-3xl bg-primary flex items-center justify-center shadow-xl shadow-primary/30 shrink-0">
              <span className="text-on-primary font-bold text-[32px]">{initials}</span>
            </div>
            {/* Info */}
            <div className="flex-1 min-w-0">
              <h2 className="text-headline-lg font-display text-on-surface mb-xs">{userName}</h2>
              <p className="text-body-md text-on-surface-variant mb-sm">{userEmail}</p>
              <div className="flex gap-sm flex-wrap">
                <span className="text-label-sm bg-primary-fixed text-on-primary-fixed px-sm py-xs rounded-full font-bold">
                  🔥 Streak {stats.currentStreak} hari
                </span>
                <span className="text-label-sm bg-surface-container px-sm py-xs rounded-full text-on-surface-variant">
                  Bergabung {joinDate}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-md mb-xl">
          {[
            { label: 'Total Habit',    value: stats.totalHabits,              icon: <Layers size={16} strokeWidth={2.5} />,       gradient: 'emerald', suffix: ''        },
            { label: 'Streak Terbaik', value: `${stats.longestStreak}`,       icon: <Trophy size={16} strokeWidth={2.5} />,       gradient: 'amber',   suffix: ' hari'   },
            { label: 'Total Check-in', value: stats.totalCheckIns,             icon: <CheckCircle2 size={16} strokeWidth={2.5} />, gradient: 'teal',    suffix: ''        },
            { label: 'Badge',          value: unlockedAchievements.length,    icon: <Star size={16} strokeWidth={2.5} />,         gradient: 'purple',  suffix: ''        },
          ].map((s) => (
            <div key={s.label} className="glass-card rounded-[2rem] p-lg hover:shadow-md hover:bg-white/80 transition-all duration-300 text-center">
              <div className="flex justify-center mb-xs">
                <CartoonIcon icon={s.icon} gradient={s.gradient as any} size="sm" />
              </div>
              <p className="text-headline-md font-display text-on-surface">{s.value}{s.suffix}</p>
              <p className="text-label-sm text-on-surface-variant">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Achievements */}
        {unlockedAchievements.length > 0 && (
          <div className="glass-card rounded-[2rem] p-xl mb-xl hover:shadow-md hover:bg-white/80 transition-all duration-300">
            <div className="flex items-center justify-between mb-lg">
              <h3 className="text-headline-md font-headline-md text-on-surface">Badge Terbuka</h3>
              <Link href="/achievements" className="text-label-sm font-bold text-primary hover:underline">
                Lihat semua →
              </Link>
            </div>
            <div className="flex gap-md flex-wrap">
              {unlockedAchievements.slice(0, 5).map((ach) => (
                <div key={ach.id} className="flex flex-col items-center gap-xs group cursor-pointer" title={ach.title}>
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-tr from-amber-400 to-orange-500 border-t-2 border-white/80 shadow-lg hover:scale-110 transition-all duration-300 transform"
                  >
                    <span className="material-symbols-outlined text-[32px] text-white drop-shadow-md" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {ach.icon}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-on-surface-variant text-center mt-1" style={{ maxWidth: '64px' }}>
                    {ach.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Habit list */}
        <div className="glass-card rounded-[2rem] p-xl mb-xl hover:shadow-md hover:bg-white/80 transition-all duration-300">
          <div className="flex items-center justify-between mb-lg">
            <h3 className="text-headline-md font-headline-md text-on-surface">Habit Aktif</h3>
            <Link href="/habits" className="text-label-sm font-bold text-primary hover:underline">
              Kelola →
            </Link>
          </div>
          {habits.length === 0 ? (
            <p className="text-body-md text-on-surface-variant text-center py-md">Belum ada habit aktif</p>
          ) : (
            <div className="space-y-sm">
              {habits.map((h) => (
                <div key={h.id} className="flex items-center gap-md">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-md border border-white/60 ${getCategoryGradient(h.category)}`}>
                    {getHabitLucideIcon(h.icon, 20, "text-white stroke-[2.5]")}
                  </div>
                  <span className="flex-1 text-body-md font-bold text-on-surface">{h.title}</span>
                  <span className="text-label-sm font-bold text-primary flex items-center gap-xs bg-primary/10 px-3 py-1 rounded-full border border-primary/20 shadow-sm">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                    {h.current_streak}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-md">
          <Link href="/settings" className="glass-card rounded-[2rem] p-lg flex items-center gap-md hover:shadow-md hover:bg-white/80 hover:-translate-y-1 transition-all duration-300">
            <span className="material-symbols-outlined text-on-surface-variant text-[24px]">settings</span>
            <div>
              <p className="font-bold text-on-surface text-body-md">Pengaturan</p>
              <p className="text-label-sm text-on-surface-variant">Preferensi akun</p>
            </div>
          </Link>
          <Link href="/statistics" className="glass-card rounded-[2rem] p-lg flex items-center gap-md hover:shadow-md hover:bg-white/80 hover:-translate-y-1 transition-all duration-300">
            <span className="material-symbols-outlined text-on-surface-variant text-[24px]">monitoring</span>
            <div>
              <p className="font-bold text-on-surface text-body-md">Statistik</p>
              <p className="text-label-sm text-on-surface-variant">Lihat progresmu</p>
            </div>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
