'use client';

import React from 'react';
import { Heart, Leaf, GraduationCap, Dumbbell, Briefcase, Palette, PiggyBank, Star } from 'lucide-react';

type GradientKey = 'fire' | 'purple' | 'emerald' | 'amber' | 'rose' | 'sky' | 'teal' | 'gold' | 'badge';
type SizeKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface Props {
  icon: React.ReactNode;
  gradient: GradientKey;
  size?: SizeKey;
  pulse?: boolean;
  className?: string;
}

const gradients: Record<GradientKey, string> = {
  fire:    'from-orange-400 via-rose-500 to-red-600 shadow-orange-400/40',
  purple:  'from-purple-400 via-indigo-500 to-violet-600 shadow-purple-400/40',
  emerald: 'from-emerald-300 via-teal-400 to-green-500 shadow-emerald-400/40',
  amber:   'from-amber-300 via-yellow-400 to-orange-500 shadow-amber-400/40',
  rose:    'from-pink-400 via-rose-400 to-red-500 shadow-pink-400/40',
  sky:     'from-sky-300 via-blue-400 to-indigo-500 shadow-sky-400/40',
  teal:    'from-teal-300 via-cyan-400 to-blue-500 shadow-teal-400/40',
  gold:    'from-yellow-300 via-amber-400 to-yellow-500 shadow-amber-400/50',
  badge:   'from-amber-400 via-orange-500 to-rose-500 shadow-amber-500/30',
};

const sizes: Record<SizeKey, string> = {
  xs: 'w-7 h-7 text-sm p-1.5',
  sm: 'w-9 h-9 text-base p-2',
  md: 'w-11 h-11 text-xl p-2.5',
  lg: 'w-14 h-14 text-2xl p-3.5',
  xl: 'w-18 h-18 text-3xl p-4',
};

export default function CartoonIcon({ icon, gradient, size = 'md', pulse = false, className = '' }: Props) {
  return (
    <div
      className={`
        relative rounded-2xl bg-gradient-to-tr ${gradients[gradient]} text-white
        ${sizes[size]}
        flex items-center justify-center shrink-0
        shadow-lg border border-white/30
        hover:scale-110 hover:rotate-3 hover:shadow-xl
        transition-all duration-300 cursor-pointer
        ${pulse ? 'animate-pulse' : ''}
        ${className}
      `}
    >
      {/* Glossy shine highlight at top */}
      <div className="absolute top-1 left-2 right-2 h-[30%] rounded-t-xl bg-white/25 pointer-events-none" />
      {/* Icon */}
      <span className="relative z-10 drop-shadow-sm">{icon}</span>
    </div>
  );
}

export function CategoryCartoonIcon({ category, size = 'md', className = '' }: { category: string; size?: SizeKey; className?: string }) {
  switch (category) {
    case 'Kesehatan':
      return <CartoonIcon icon={<Heart size={size === 'xs' ? 12 : size === 'sm' ? 15 : 20} strokeWidth={2.5} />} gradient="rose" size={size} className={className} />;
    case 'Mindfulness':
      return <CartoonIcon icon={<Leaf size={size === 'xs' ? 12 : size === 'sm' ? 15 : 20} strokeWidth={2.5} />} gradient="emerald" size={size} className={className} />;
    case 'Belajar':
      return <CartoonIcon icon={<GraduationCap size={size === 'xs' ? 12 : size === 'sm' ? 15 : 20} strokeWidth={2.5} />} gradient="purple" size={size} className={className} />;
    case 'Olahraga':
      return <CartoonIcon icon={<Dumbbell size={size === 'xs' ? 12 : size === 'sm' ? 15 : 20} strokeWidth={2.5} />} gradient="fire" size={size} className={className} />;
    case 'Produktif':
      return <CartoonIcon icon={<Briefcase size={size === 'xs' ? 12 : size === 'sm' ? 15 : 20} strokeWidth={2.5} />} gradient="sky" size={size} className={className} />;
    case 'Hobi':
      return <CartoonIcon icon={<Palette size={size === 'xs' ? 12 : size === 'sm' ? 15 : 20} strokeWidth={2.5} />} gradient="teal" size={size} className={className} />;
    case 'Keuangan':
      return <CartoonIcon icon={<PiggyBank size={size === 'xs' ? 12 : size === 'sm' ? 15 : 20} strokeWidth={2.5} />} gradient="gold" size={size} className={className} />;
    default:
      return <CartoonIcon icon={<Star size={size === 'xs' ? 12 : size === 'sm' ? 15 : 20} strokeWidth={2.5} />} gradient="amber" size={size} className={className} />;
  }
}

