'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AppLayout from '@/components/AppLayout';
import { useAuth } from '@/lib/context/AuthContext';
import type { HabitInsert } from '@/lib/supabase/types';
import CartoonIcon from '@/components/CartoonIcon';
import {
  Heart, Leaf, GraduationCap, Dumbbell, Briefcase,
  Palette, PiggyBank, Star,
  Droplets, BookOpen, Pencil, Zap,
  Moon, UtensilsCrossed, Music, Flame, CheckSquare, Layers, Target
} from 'lucide-react';

/* ── Pemetaan Kategori → CartoonIcon ── */
const CATEGORY_OPTIONS = [
  {
    value: 'Kesehatan', label: 'Kesehatan', gradient: 'rose', lucide: <Heart size={20} strokeWidth={2.5} />,
    color: '#ff8c69', icon: 'favorite',
  },
  {
    value: 'Mindfulness', label: 'Mindfulness', gradient: 'emerald', lucide: <Leaf size={20} strokeWidth={2.5} />,
    color: '#63bd8b', icon: 'self_improvement',
  },
  {
    value: 'Belajar', label: 'Belajar', gradient: 'purple', lucide: <GraduationCap size={20} strokeWidth={2.5} />,
    color: '#b7a8fe', icon: 'school',
  },
  {
    value: 'Olahraga', label: 'Olahraga', gradient: 'fire', lucide: <Dumbbell size={20} strokeWidth={2.5} />,
    color: '#ff6b35', icon: 'fitness_center',
  },
  {
    value: 'Produktif', label: 'Produktif', gradient: 'sky', lucide: <Briefcase size={20} strokeWidth={2.5} />,
    color: '#6153a2', icon: 'work',
  },
  {
    value: 'Hobi', label: 'Hobi', gradient: 'teal', lucide: <Palette size={20} strokeWidth={2.5} />,
    color: '#63bd8b', icon: 'palette',
  },
  {
    value: 'Keuangan', label: 'Keuangan', gradient: 'gold', lucide: <PiggyBank size={20} strokeWidth={2.5} />,
    color: '#ffd700', icon: 'savings',
  },
  {
    value: 'Umum', label: 'Umum', gradient: 'amber', lucide: <Star size={20} strokeWidth={2.5} />,
    color: '#ff8c69', icon: 'star',
  },
] as const;

/* ── Pemetaan Ikon → Lucide + Gradient ── */
const ICON_OPTIONS = [
  { key: 'water_drop', lucide: <Droplets size={16} strokeWidth={2.5} />, gradient: 'sky' },
  { key: 'self_improvement', lucide: <Leaf size={16} strokeWidth={2.5} />, gradient: 'emerald' },
  { key: 'menu_book', lucide: <BookOpen size={16} strokeWidth={2.5} />, gradient: 'purple' },
  { key: 'directions_run', lucide: <Zap size={16} strokeWidth={2.5} />, gradient: 'fire' },
  { key: 'edit_note', lucide: <Pencil size={16} strokeWidth={2.5} />, gradient: 'teal' },
  { key: 'fitness_center', lucide: <Dumbbell size={16} strokeWidth={2.5} />, gradient: 'fire' },
  { key: 'favorite', lucide: <Heart size={16} strokeWidth={2.5} />, gradient: 'rose' },
  { key: 'school', lucide: <GraduationCap size={16} strokeWidth={2.5} />, gradient: 'purple' },
  { key: 'savings', lucide: <PiggyBank size={16} strokeWidth={2.5} />, gradient: 'gold' },
  { key: 'work', lucide: <Briefcase size={16} strokeWidth={2.5} />, gradient: 'sky' },
  { key: 'palette', lucide: <Palette size={16} strokeWidth={2.5} />, gradient: 'teal' },
  { key: 'star', lucide: <Star size={16} strokeWidth={2.5} />, gradient: 'amber' },
  { key: 'local_fire_department', lucide: <Flame size={16} strokeWidth={2.5} />, gradient: 'fire' },
  { key: 'bedtime', lucide: <Moon size={16} strokeWidth={2.5} />, gradient: 'purple' },
  { key: 'restaurant', lucide: <UtensilsCrossed size={16} strokeWidth={2.5} />, gradient: 'amber' },
  { key: 'music_note', lucide: <Music size={16} strokeWidth={2.5} />, gradient: 'rose' },
] as const;

export default function CreateHabitPage() {
  const router = useRouter();
  const { addHabit, profile, habits } = useAuth();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<typeof CATEGORY_OPTIONS[number]['value']>('Kesehatan');
  const [icon, setIcon] = useState<typeof ICON_OPTIONS[number]['key']>('star');
  const [color, setColor] = useState('#ff8c69');
  const [targetDays, setTargetDays] = useState(7);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedCategory = CATEGORY_OPTIONS.find(c => c.value === category)!;
  const selectedIconEntry = ICON_OPTIONS.find(i => i.key === icon) ?? ICON_OPTIONS[11];

  const handleCategoryChange = (val: typeof CATEGORY_OPTIONS[number]['value']) => {
    setCategory(val);
    const cat = CATEGORY_OPTIONS.find(c => c.value === val);
    if (cat) { setColor(cat.color); setIcon(cat.icon as any); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    setError(null);

    const data: HabitInsert = { title: title.trim(), category, icon, color, target_days: targetDays };
    const { error: addError } = await addHabit(data);

    if (addError) { setError(addError); setLoading(false); return; }
    router.push('/dashboard');
  };

  const userName = profile?.full_name ?? 'Pengguna';
  const currentStreak = habits.length > 0 ? Math.max(...habits.map(h => h.current_streak), 0) : 0;

  return (
    // @ts-ignore
    <AppLayout currentStreak={currentStreak} userName={userName}>
      <div className="px-md lg:px-xl py-lg max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-md mb-xl">
          <Link
            href="/dashboard"
            className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-white/90 transition-all"
          >
            <span className="material-symbols-outlined text-on-surface-variant">arrow_back</span>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-headline-lg font-display text-on-surface">Tambah Habit Baru</h1>
            <p className="text-sm sm:text-body-md text-on-surface-variant">Buat kebiasaan baru yang ingin kamu bangun</p>
          </div>
        </div>

        {/* Live Preview Card */}
        <div
          className="glass-card p-lg rounded-[2rem] mb-xl flex items-center gap-md shadow-md transition-all duration-500"
          style={{ borderColor: color + '50' }}
        >
          <div
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-lg shrink-0 transition-all duration-500"
            style={{ background: `linear-gradient(135deg, ${color}80, ${color}40)` }}
          >
            <span className="material-symbols-outlined text-[28px] sm:text-[32px]" style={{ color, fontVariationSettings: "'FILL' 1" }}>
              {icon}
            </span>
          </div>
          <div>
            <h3 className="text-base sm:text-body-lg font-bold text-on-surface">{title || 'Nama habitmu...'}</h3>
            <p className="text-[10px] sm:text-label-sm text-on-surface-variant uppercase tracking-wider">{category}</p>
            <p className="text-[10px] sm:text-label-sm text-on-surface-variant mt-1">Target: {targetDays} hari</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-lg">
          {error && (
            <div className="p-md bg-error/10 border border-error/30 text-error text-body-md rounded-2xl">{error}</div>
          )}

          {/* Title */}
          <div className="space-y-sm">
            <label className="text-xs sm:text-label-sm font-bold text-on-surface uppercase tracking-widest">
              Nama Kebiasaan *
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Contoh: Minum air 2L, Olahraga 30 menit..."
              maxLength={80}
              required
              className="w-full px-4 sm:px-lg py-3 sm:py-md glass-card rounded-2xl text-on-surface text-sm sm:text-body-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>

          {/* ── Kategori Picker ── */}
          <div className="space-y-sm">
            <label className="text-xs sm:text-label-sm font-bold text-on-surface uppercase tracking-widest">Kategori</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-sm">
              {CATEGORY_OPTIONS.map(cat => {
                const isActive = category === cat.value;
                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => handleCategoryChange(cat.value)}
                    className={`
                      relative p-sm rounded-2xl flex flex-col items-center gap-xs text-center transition-all duration-300
                      border-2 overflow-hidden
                      ${isActive
                        ? 'border-[#9e4225] scale-105 shadow-lg bg-white/80'
                        : 'border-transparent glass-card hover:scale-[1.02] hover:border-white/80'
                      }
                    `}
                  >
                    {/* glow ring when active */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-2xl opacity-20 pointer-events-none"
                        style={{ background: `radial-gradient(circle at 50% 30%, ${cat.color}, transparent 70%)` }}
                      />
                    )}
                    <CartoonIcon
                      icon={cat.lucide}
                      gradient={cat.gradient as any}
                      size="sm"
                      className={`${isActive ? 'shadow-xl scale-110' : ''} sm:w-10 sm:h-10 w-8 h-8`}
                    />
                    <span className={`text-[10px] sm:text-label-sm font-bold ${isActive ? 'text-[#9e4225]' : 'text-on-surface'}`}>
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Icon Picker ── */}
          <div className="space-y-sm">
            <label className="text-xs sm:text-label-sm font-bold text-on-surface uppercase tracking-widest">Ikon</label>
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-sm justify-items-center">
              {ICON_OPTIONS.map(ic => {
                const isActive = icon === ic.key;
                return (
                  <button
                    key={ic.key}
                    type="button"
                    onClick={() => setIcon(ic.key as any)}
                    className={`
                      w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center aspect-square transition-all duration-300
                      ${isActive
                        ? 'scale-110 ring-2 ring-[#9e4225] ring-offset-2'
                        : 'opacity-70 hover:opacity-100 hover:scale-105'
                      }
                    `}
                  >
                    <CartoonIcon
                      icon={ic.lucide}
                      gradient={isActive ? (selectedCategory.gradient as any) : (ic.gradient as any)}
                      className="!rounded-full !w-10 !h-10 !p-0"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Picker */}
          <div className="space-y-sm">
            <label className="text-xs sm:text-label-sm font-bold text-on-surface uppercase tracking-widest">Warna Aksen</label>
            <div className="flex items-center gap-md flex-wrap">
              <input
                type="color"
                value={color}
                onChange={e => setColor(e.target.value)}
                className="w-12 h-12 rounded-xl cursor-pointer border border-outline-variant/30 p-1 bg-surface"
              />
              <div className="flex gap-sm flex-wrap">
                {['#ff8c69', '#63bd8b', '#b7a8fe', '#cabeff', '#ffb59f', '#9af6c0', '#ffd580', '#94a3b8'].map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-4 transition-all hover:scale-110 shadow-md ${color === c ? 'border-[#9e4225] scale-110' : 'border-transparent'
                      }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Target Days */}
          <div className="space-y-sm">
            <label className="text-xs sm:text-label-sm font-bold text-on-surface uppercase tracking-widest">
              Target Hari: <span className="text-primary">{targetDays} Hari</span>
            </label>
            <input
              type="range" min={1} max={30} value={targetDays}
              onChange={e => setTargetDays(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs sm:text-label-sm text-on-surface-variant">
              <span>1 hari</span><span>30 hari</span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !title.trim()}
            className={`w-full py-3 sm:py-lg rounded-2xl font-bold text-base sm:text-body-lg flex items-center justify-center gap-sm transition-all shadow-lg ${loading || !title.trim()
              ? 'bg-surface-container-high text-on-surface-variant cursor-not-allowed'
              : 'bg-primary text-on-primary hover:scale-[1.02] hover:shadow-xl shadow-primary/20'
              }`}
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-on-primary/40 border-t-on-primary rounded-full animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined">add_circle</span>
                Tambahkan Habit
              </>
            )}
          </button>
        </form>
      </div>
    </AppLayout>
  );
}
