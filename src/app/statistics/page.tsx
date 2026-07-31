'use client';

import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { useAppData } from '@/lib/context/AppDataContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import CartoonIcon, { CategoryCartoonIcon } from '@/components/CartoonIcon';
import { Flame, Trophy, CheckCircle2, PieChart, Check } from 'lucide-react';

export default function StatisticsPage() {
  const { stats, habits } = useAppData();
  const { weeklyData, monthlyData, categoryBreakdown, currentStreak, longestStreak, totalCheckIns, completionRate, totalHabits, completedToday } = stats;

  const maxWeeklyCompleted = Math.max(...weeklyData.map((d) => d.total), 1);

  return (
    <AppLayout>
      <div className="px-md lg:px-xl py-lg max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-xl">
          <h1 className="text-display font-display text-on-surface">Statistik</h1>
          <p className="text-body-lg text-on-surface-variant">Pantau perkembangan kebiasaanmu</p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-md mb-xl">
          {[
            { label: 'Streak Sekarang', value: `${currentStreak}`, unit: 'Hari',  icon: <Flame size={18} strokeWidth={2.5} />,       gradient: 'fire'    },
            { label: 'Streak Terpanjang', value: `${longestStreak}`, unit: 'Hari', icon: <Trophy size={18} strokeWidth={2.5} />,      gradient: 'amber'   },
            { label: 'Total Check-in', value: `${totalCheckIns}`, unit: 'Kali',    icon: <CheckCircle2 size={18} strokeWidth={2.5} />, gradient: 'emerald' },
            { label: 'Tingkat Selesai', value: `${completionRate}`, unit: '%',      icon: <PieChart size={18} strokeWidth={2.5} />,    gradient: 'purple'  },
          ].map((s) => (
            <div key={s.label} className="glass-card rounded-[2rem] p-lg hover:shadow-md hover:bg-white/80 hover:-translate-y-1 transition-all duration-300">
              <CartoonIcon icon={s.icon} gradient={s.gradient as any} size="md" className="mb-sm" />
              <p className="text-label-sm font-stat-label text-on-surface-variant uppercase tracking-widest mb-xs">{s.label}</p>
              <p className="text-headline-md font-display text-on-surface">
                {s.value} <span className="text-body-md text-on-surface-variant">{s.unit}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-lg">
          {/* Weekly Bar Chart */}
          <div className="col-span-12 lg:col-span-7 glass-card rounded-[2rem] p-xl hover:shadow-md transition-all duration-300">
            <h2 className="text-headline-md font-headline-md text-on-surface mb-xs">Aktivitas 7 Hari Terakhir</h2>
            <p className="text-label-sm text-on-surface-variant mb-xl">Habit yang diselesaikan per hari</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#8b837f', fontSize: 12, fontWeight: 'bold' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8b837f', fontSize: 12 }} />
                  <Tooltip
                    cursor={{ fill: '#f6f3f0' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.08)', fontWeight: 'bold' }}
                    formatter={(value) => [`${value} habit`, 'Diselesaikan']}
                  />
                  <Bar dataKey="completed" radius={[8, 8, 0, 0]} maxBarSize={50}>
                    {weeklyData.map((entry, index) => {
                      const barColors = ['#ffb59f', '#ff8c69', '#ffd700', '#63bd8b', '#b7a8fe', '#ff6b35', '#9e4225'];
                      return <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="col-span-12 lg:col-span-5 glass-card rounded-[2rem] p-xl hover:shadow-md transition-all duration-300">
            <h2 className="text-headline-md font-headline-md text-on-surface mb-xs">Kategori Habit</h2>
            <p className="text-label-sm text-on-surface-variant mb-xl">
              {totalHabits === 0 ? 'Belum ada habit' : `${totalHabits} habit aktif`}
            </p>
            {totalHabits === 0 ? (
              <div className="text-center py-lg text-on-surface-variant">
                <span className="material-symbols-outlined text-[48px] opacity-30 block mb-sm">pie_chart</span>
                <p className="text-body-md">Tambahkan habit untuk melihat breakdown</p>
              </div>
            ) : (
              <div className="space-y-md">
                {categoryBreakdown.map((cat) => {
                  const pct = Math.round((cat.count / totalHabits) * 100);
                  return (
                    <div key={cat.category}>
                      <div className="flex justify-between text-label-sm mb-xs">
                        <span className="font-bold text-on-surface">{cat.category}</span>
                        <span className="text-on-surface-variant">{cat.count} habit ({pct}%)</span>
                      </div>
                      <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${pct}%`, backgroundColor: cat.color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Monthly Completion Rate */}
          <div className="col-span-12 glass-card rounded-[2rem] p-xl hover:shadow-md transition-all duration-300">
            <h2 className="text-headline-md font-headline-md text-on-surface mb-xs">Tingkat Penyelesaian Bulanan</h2>
            <p className="text-label-sm text-on-surface-variant mb-xl">Rata-rata penyelesaian habit per minggu</p>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                  <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#8b837f', fontSize: 12, fontWeight: 'bold' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8b837f', fontSize: 12 }} />
                  <Tooltip
                    cursor={{ fill: '#f6f3f0' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.08)', fontWeight: 'bold' }}
                    formatter={(value) => [`${value}%`, 'Tingkat Selesai']}
                  />
                  <Bar dataKey="rate" radius={[8, 8, 0, 0]} maxBarSize={60}>
                    {monthlyData.map((entry, index) => {
                      const monthColors = ['#b7a8fe', '#ff6b35', '#ffd700', '#63bd8b'];
                      return <Cell key={`cell-${index}`} fill={monthColors[index % monthColors.length]} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Habit Performance Table */}
          {habits.length > 0 && (
            <div className="col-span-12 glass-card rounded-[2rem] p-xl hover:shadow-md transition-all duration-300">
              <h2 className="text-headline-md font-headline-md text-on-surface mb-lg">Performa Per Habit</h2>
              <div className="space-y-sm">
                {habits.map((h) => (
                  <div key={h.id} className="flex items-center gap-md p-md glass-card rounded-2xl hover:shadow-sm transition-all duration-300">
                    <CategoryCartoonIcon category={h.category} size="sm" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-on-surface text-body-md truncate">{h.title}</h4>
                      <p className="text-label-sm text-on-surface-variant">{h.category}</p>
                    </div>
                    <div className="flex items-center gap-md shrink-0">
                      <div className="text-center">
                        <p className="text-headline-md font-bold text-primary">{h.current_streak}</p>
                        <p className="text-[10px] text-on-surface-variant">streak</p>
                      </div>
                      <div className="text-center">
                        <p className="text-headline-md font-bold text-secondary">{h.longest_streak}</p>
                        <p className="text-[10px] text-on-surface-variant">terbaik</p>
                      </div>
                      {h.done_today ? (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-400 via-teal-500 to-green-500 border border-white/60 shadow-md shadow-emerald-500/30 flex items-center justify-center shrink-0">
                          <Check size={14} strokeWidth={3} className="text-white" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-white/60 border border-orange-200/50 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] shrink-0" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
