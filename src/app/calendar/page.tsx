'use client';

import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { useAppData } from '@/lib/context/AppDataContext';
import CartoonIcon, { CategoryCartoonIcon } from '@/components/CartoonIcon';
import { Flame, CalendarCheck, Layers, CalendarDays } from 'lucide-react';

export default function CalendarPage() {
  const { calendarData, habits, stats } = useAppData();
  const [selectedDay, setSelectedDay] = useState<typeof calendarData[0] | null>(null);

  // Gunakan tanggal lokal (bukan UTC) agar sesuai timezone WIB
  const toLocalDateStr = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const today = toLocalDateStr(new Date());

  const getColorForRate = (rate: number) => {
    if (rate === 0) return '#e9dfed';
    if (rate < 40) return '#ffdbd1';
    if (rate < 70) return '#ffb59f';
    if (rate < 90) return '#ff8c69';
    return '#9e4225';
  };

  // Group calendarData by month for display
  const last30 = calendarData.slice(-42); // 6 weeks max

  // Create proper week grid for current month
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startPadding = firstDay === 0 ? 6 : firstDay - 1; // Monday-first

  const monthDays = Array.from({ length: daysInMonth }, (_, i) => {
    const d = new Date(year, month, i + 1);
    const dateStr = toLocalDateStr(d); // pakai local date agar tidak bergeser timezone
    const calDay = calendarData.find((c) => c.date === dateStr);
    return {
      date: dateStr,
      day: i + 1,
      completionRate: calDay?.completionRate ?? 0,
      habitsCompleted: calDay?.habitsCompleted ?? 0,
      totalHabits: calDay?.totalHabits ?? stats.totalHabits,
      isFuture: dateStr > today,
      isToday: dateStr === today,
    };
  });

  const monthLabel = now.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

  return (
    <AppLayout>
      <div className="px-md lg:px-xl py-lg max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-xl">
          <h1 className="text-display font-display text-on-surface">Kalender</h1>
          <p className="text-body-lg text-on-surface-variant">Visualisasi konsistensi habitmu</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-md mb-xl">
          {[
            { label: 'Streak Sekarang', value: `${stats.currentStreak} Hari`, icon: <Flame size={18} strokeWidth={2.5} />,        gradient: 'fire'    },
            { label: 'Selesai Hari Ini', value: `${stats.completedToday}/${stats.totalHabits}`, icon: <CalendarCheck size={18} strokeWidth={2.5} />, gradient: 'emerald' },
            { label: 'Total Habit',      value: `${stats.totalHabits}`,        icon: <Layers size={18} strokeWidth={2.5} />,        gradient: 'purple'  },
            { label: 'Bulan Ini',        value: `${Math.round(monthDays.filter(d => !d.isFuture).reduce((a, d) => a + d.completionRate, 0) / Math.max(monthDays.filter(d => !d.isFuture).length, 1))}%`, icon: <CalendarDays size={18} strokeWidth={2.5} />, gradient: 'sky' },
          ].map((s) => (
            <div key={s.label} className="glass-card rounded-[2rem] p-lg hover:shadow-md hover:bg-white/80 hover:-translate-y-1 transition-all duration-300">
              <CartoonIcon icon={s.icon} gradient={s.gradient as any} size="sm" className="mb-xs" />
              <p className="text-label-sm font-stat-label text-on-surface-variant uppercase tracking-widest mb-xs">{s.label}</p>
              <p className="text-headline-md font-display text-on-surface">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="glass-card rounded-[2rem] p-xl hover:shadow-md transition-all duration-300 mb-xl">
          <h2 className="text-headline-md text-black font-bold mb-lg capitalize">{monthLabel}</h2>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-sm">
            {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((d) => (
              <div key={d} className="text-center text-label-sm text-black font-semibold py-sm">{d}</div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-sm">
            {/* padding */}
            {Array.from({ length: startPadding }).map((_, i) => <div key={`pad-${i}`} />)}
            {monthDays.map((day) => (
              <button
                key={day.date}
                onClick={() => !day.isFuture && setSelectedDay(day as any)}
                disabled={day.isFuture}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center transition-all ${
                  day.isToday ? 'ring-2 ring-primary scale-105 shadow-md' : ''
                } ${day.isFuture ? 'opacity-30 cursor-default' : 'hover:scale-105 cursor-pointer'}`}
                style={{
                  backgroundColor: day.isFuture ? '#e9dfed' : getColorForRate(day.completionRate),
                }}
              >
                <span className={`text-[11px] ${day.completionRate > 0 && !day.isFuture ? 'text-white font-bold' : 'text-black font-medium'}`}>
                  {day.day}
                </span>
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-sm mt-xl flex-wrap">
            <span className="text-label-sm text-on-surface-variant">Kurang</span>
            {['#e9dfed', '#ffdbd1', '#ffb59f', '#ff8c69', '#9e4225'].map((c) => (
              <div key={c} className="w-5 h-5 rounded-md" style={{ backgroundColor: c }} />
            ))}
            <span className="text-label-sm text-on-surface-variant">Banyak</span>
          </div>
        </div>

        {/* Selected Day Detail */}
        {selectedDay && (
          <div className="glass-card rounded-[2rem] p-xl hover:shadow-md transition-all duration-300 mb-xl">
            <h3 className="text-headline-md font-headline-md text-on-surface mb-md">
              {new Date(selectedDay.date + 'T00:00:00').toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </h3>
            <div className="flex gap-md flex-wrap">
              <div className="bg-surface-container-low px-lg py-md rounded-2xl">
                <p className="text-label-sm text-on-surface-variant">Habit Selesai</p>
                <p className="text-headline-md font-bold text-primary">{selectedDay.habitsCompleted}/{selectedDay.totalHabits}</p>
              </div>
              <div className="bg-surface-container-low px-lg py-md rounded-2xl">
                <p className="text-label-sm text-on-surface-variant">Tingkat</p>
                <p className="text-headline-md font-bold text-tertiary">{selectedDay.completionRate}%</p>
              </div>
            </div>
          </div>
        )}

        {/* Habit streaks overview */}
        {habits.length > 0 && (
          <div className="glass-card rounded-[2rem] p-xl hover:shadow-md transition-all duration-300">
            <h2 className="text-headline-md font-headline-md text-on-surface mb-lg">Streak Per Habit</h2>
            <div className="space-y-md">
              {habits.map((h) => {
                const streakPct = Math.min((h.current_streak / Math.max(h.target_days, 1)) * 100, 100);
                return (
                  <div key={h.id}>
                    <div className="flex items-center justify-between mb-sm">
                      <div className="flex items-center gap-sm">
                        <CategoryCartoonIcon category={h.category} size="sm" />
                        <span className="font-bold text-on-surface text-body-md">{h.title}</span>
                      </div>
                      <div className="flex items-center gap-sm">
                        <span className="text-label-sm font-bold text-primary">{h.current_streak} hari</span>
                        <span className="material-symbols-outlined text-primary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${streakPct}%`, backgroundColor: h.color }} />
                    </div>
                    <p className="text-[10px] text-on-surface-variant mt-xs">Target: {h.target_days} hari</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
