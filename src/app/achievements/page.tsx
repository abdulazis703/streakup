'use client';

import AppLayout from '@/components/AppLayout';
import { useAppData } from '@/lib/context/AppDataContext';
import CartoonIcon from '@/components/CartoonIcon';
import { Trophy, Flame, CheckCircle2, TrendingUp } from 'lucide-react';

export default function AchievementsPage() {
  const { achievements, stats } = useAppData();

  const unlocked = achievements.filter((a) => a.unlocked);
  const locked = achievements.filter((a) => !a.unlocked);

  const CATEGORY_LABELS = {
    streak: 'Streak',
    consistency: 'Konsistensi',
    special: 'Spesial',
    social: 'Sosial',
  };

  return (
    <AppLayout>
      <div className="px-md lg:px-xl py-lg">
        {/* Header */}
        <div className="mb-xl">
          <h1 className="text-display font-display text-on-surface">Pencapaian</h1>
          <p className="text-body-lg text-on-surface-variant">
            {unlocked.length} dari {achievements.length} badge terbuka
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-md mb-xl">
          {[
            { label: 'Badge Terbuka',   value: `${unlocked.length}`,          icon: <Trophy size={18} strokeWidth={2.5} />,       gradient: 'amber'   },
            { label: 'Streak Terbaik',  value: `${stats.longestStreak} Hari`, icon: <Flame size={18} strokeWidth={2.5} />,        gradient: 'fire'    },
            { label: 'Total Check-in',  value: `${stats.totalCheckIns}x`,     icon: <CheckCircle2 size={18} strokeWidth={2.5} />, gradient: 'emerald' },
            { label: 'Tingkat Selesai', value: `${stats.completionRate}%`,     icon: <TrendingUp size={18} strokeWidth={2.5} />,   gradient: 'purple'  },
          ].map((s) => (
            <div key={s.label} className="glass-card rounded-[2rem] p-lg hover:shadow-md hover:bg-white/80 dark:hover:bg-slate-800/80 hover:-translate-y-1 transition-all duration-300">
              <CartoonIcon icon={s.icon} gradient={s.gradient as any} size="md" className="mb-sm" />
              <p className="text-label-sm font-stat-label text-on-surface-variant uppercase tracking-widest mb-xs">{s.label}</p>
              <p className="text-headline-md font-display text-on-surface">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Unlocked Achievements */}
        {unlocked.length > 0 && (
          <section className="mb-xl">
            <h2 className="text-headline-lg font-headline-lg text-on-surface mb-lg">🏆 Terbuka</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-md">
              {unlocked.map((ach) => (
                <div
                  key={ach.id}
                  className="glass-card rounded-[2rem] p-lg flex flex-col items-center text-center gap-sm hover:scale-105 hover:-rotate-1 transition-all duration-300 cursor-pointer"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-tr from-amber-400 to-orange-500 border-t-2 border-white/80 shadow-lg hover:scale-110 transition-all duration-300 transform mb-sm"
                  >
                    <span className="material-symbols-outlined text-[32px] text-white drop-shadow-md" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {ach.icon}
                    </span>
                  </div>
                  <h3 className="font-bold text-on-surface text-body-md">{ach.title}</h3>
                  <p className="text-label-sm text-on-surface-variant leading-relaxed">{ach.description}</p>
                  {ach.unlockedAt && (
                    <span className="text-label-sm text-tertiary font-bold bg-tertiary-fixed/30 px-sm py-xs rounded-full">
                      ✓ {new Date(ach.unlockedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Locked Achievements */}
        {locked.length > 0 && (
          <section>
            <h2 className="text-headline-lg font-headline-lg text-on-surface mb-lg">🔒 Belum Terbuka</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-md">
              {locked.map((ach) => (
                <div
                  key={ach.id}
                  className="relative glass-card rounded-[2rem] p-lg flex flex-col items-center text-center gap-sm opacity-50 grayscale hover:scale-105 hover:-rotate-1 transition-all duration-300"
                >
                  {/* Small lock badge on top right */}
                  <div className="absolute top-4 right-4 bg-slate-200/80 dark:bg-slate-700/80 rounded-full p-1 border border-white/40 dark:border-slate-600/40 shadow-sm flex items-center justify-center">
                    <span className="material-symbols-outlined text-[14px] text-slate-500 dark:text-slate-400 font-bold">lock</span>
                  </div>

                  <div className="w-16 h-16 rounded-2xl grayscale opacity-50 bg-slate-200/50 border border-slate-300/40 flex items-center justify-center mb-sm shadow-inner">
                    <span className="material-symbols-outlined text-[32px] text-slate-400">
                      {ach.icon}
                    </span>
                  </div>
                  <h3 className="font-bold text-on-surface text-body-md">{ach.title}</h3>
                  <p className="text-label-sm text-on-surface-variant leading-relaxed">{ach.description}</p>
                  {/* Progress Bar */}
                  <div className="w-full mt-sm">
                    <div className="flex justify-between text-[10px] text-on-surface-variant mb-xs">
                      <span>Progress</span>
                      <span>{ach.progress}/{ach.maxProgress}</span>
                    </div>
                    <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${(ach.progress / ach.maxProgress) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </AppLayout>
  );
}
