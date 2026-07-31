'use client';

import { useState } from 'react';
import Link from 'next/link';
import AppLayout from '@/components/AppLayout';
import { useAuth } from '@/lib/context/AuthContext';
import { CategoryCartoonIcon } from '@/components/CartoonIcon';
import { Check } from 'lucide-react';

const CATEGORIES = ['Semua', 'Kesehatan', 'Mindfulness', 'Belajar', 'Olahraga', 'Produktif', 'Hobi', 'Keuangan', 'Umum'];

export default function HabitsPage() {
  const { habits, deleteHabit } = useAuth();
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = habits.filter((h) => {
    const matchCat = activeCategory === 'Semua' || h.category === activeCategory;
    const matchSearch = h.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const completedToday = habits.filter(h => h.done_today).length;

  const handleDelete = async (habitId: string) => {
    if (!confirm('Hapus habit ini? Semua data streak akan hilang.')) return;
    setDeletingId(habitId);
    await deleteHabit(habitId);
    setDeletingId(null);
  };

  return (
    <AppLayout>
      <div className="px-md lg:px-xl py-lg">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md mb-xl">
          <div>
            <h1 className="text-display font-display text-on-surface">Habit Saya</h1>
            <p className="text-body-lg text-on-surface-variant">
              {habits.length} habit aktif · {completedToday} selesai hari ini
            </p>
          </div>
          <Link
            href="/habits/create"
            className="flex items-center gap-sm bg-primary text-on-primary px-lg py-sm rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 hover:shadow-xl transition-all self-start sm:self-auto"
          >
            <span className="material-symbols-outlined">add</span>
            <span className="font-body-md font-bold">Tambah Habit</span>
          </Link>
        </div>

        {/* Search */}
        <div className="relative mb-lg">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input
            type="text"
            placeholder="Cari habit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-surface-container-lowest text-on-surface rounded-[16px] shadow-sm focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all placeholder:text-outline-variant border-none"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-sm overflow-x-auto pb-sm mb-xl scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-md py-sm rounded-full font-body-md transition-all ${
                activeCategory === cat
                  ? 'bg-primary text-on-primary shadow-lg shadow-primary/20 scale-105'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Empty state */}
        {habits.length === 0 && (
          <div className="flex flex-col items-center justify-center py-xl text-center">
            <div className="w-24 h-24 rounded-full bg-surface-container-high flex items-center justify-center mb-lg animate-float">
              <span className="material-symbols-outlined text-outline text-[48px]">add_task</span>
            </div>
            <h3 className="text-headline-md font-headline-md text-on-surface mb-sm">Belum ada habit</h3>
            <p className="text-body-md text-on-surface-variant mb-lg">Mulai perjalananmu dengan menambahkan habit pertama!</p>
            <Link href="/habits/create" className="inline-flex items-center gap-sm bg-primary text-on-primary px-lg py-sm rounded-2xl font-bold shadow-lg hover:scale-105 transition-all">
              <span className="material-symbols-outlined">add</span>
              Tambah Habit
            </Link>
          </div>
        )}

        {/* No search results */}
        {habits.length > 0 && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-xl text-center">
            <div className="w-24 h-24 rounded-full bg-surface-container-high flex items-center justify-center mb-lg animate-float">
              <span className="material-symbols-outlined text-outline text-[48px]">search_off</span>
            </div>
            <h3 className="text-headline-md font-headline-md text-on-surface mb-sm">Tidak ditemukan</h3>
            <p className="text-body-md text-on-surface-variant">Coba ubah filter atau kata kunci pencarian</p>
          </div>
        )}

        {/* Habit Grid */}
        {filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-md">
            {filtered.map((habit) => (
              <div
                key={habit.id}
                className="group glass-card rounded-[2rem] p-lg hover:shadow-md hover:bg-white/80 hover:-translate-y-1 transition-all duration-300 relative"
              >
                {/* Delete button */}
                <button
                  onClick={() => handleDelete(habit.id)}
                  disabled={deletingId === habit.id}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-container-high opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-on-surface-variant hover:bg-error hover:text-on-error"
                >
                  {deletingId === habit.id
                    ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    : <span className="material-symbols-outlined text-[16px]">delete</span>
                  }
                </button>

                {/* Icon + Status */}
                <div className="flex items-start justify-between mb-lg">
                  <CategoryCartoonIcon category={habit.category} size="lg" />
                  {habit.done_today ? (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-400 via-teal-500 to-green-500 border border-white/60 shadow-md shadow-emerald-500/30 flex items-center justify-center">
                      <Check size={14} strokeWidth={3} className="text-white" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-white/60 border border-orange-200/50 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]" />
                  )}
                </div>

                {/* Name & Category */}
                <h3 className="text-body-lg font-body-lg font-bold text-on-surface mb-xs">{habit.title}</h3>
                <p className="text-label-sm font-stat-label text-on-surface-variant uppercase tracking-wider mb-md">{habit.category}</p>

                {/* Streak */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-xs">
                    <span className="material-symbols-outlined text-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                    <span className="font-stat-label text-body-md font-bold text-on-surface">{habit.current_streak} hari</span>
                  </div>
                  <span className="text-label-sm text-on-surface-variant">Target {habit.target_days} hari</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
