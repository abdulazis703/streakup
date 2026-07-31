'use client';

import { useState } from 'react';
import Link from 'next/link';

const RECOMMENDED_HABITS = [
  { id: 'h1', title: 'Minum air 2L', category: 'KESEHATAN', icon: 'water_drop', color: '#ff8c69' },
  { id: 'h2', title: 'Meditasi 5 menit', category: 'MINDFULNESS', icon: 'self_improvement', color: '#63bd8b' },
  { id: 'h3', title: 'Membaca 10 halaman', category: 'BELAJAR', icon: 'menu_book', color: '#ffb59f' },
  { id: 'h4', title: 'Jalan pagi 15 menit', category: 'OLAHRAGA', icon: 'directions_run', color: '#cabeff' },
  { id: 'h5', title: 'Journaling', category: 'MINDFULNESS', icon: 'edit_note', color: '#b7a8fe' },
];

export default function HabitsSelectionPage() {
  const [selected, setSelected] = useState<string[]>(['h1']);

  const toggleHabit = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '580px',
        minWidth: '320px',
        backgroundColor: '#ffffff',
        borderRadius: '32px',
        padding: '32px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
        margin: '0 auto',
        border: '1px solid #ffedd5'
      }}
    >
      {/* Header Navigation Progress */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#A04223' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>local_fire_department</span>
          <span style={{ fontWeight: '800', fontSize: '16px', color: '#1e293b' }}>Streak Up</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#fdba74' }} />
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#fdba74' }} />
            <div style={{ width: '24px', height: '6px', borderRadius: '999px', backgroundColor: '#A04223' }} />
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#e2e8f0' }} />
          </div>
          <span style={{ fontSize: '10px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Langkah 3 dari 4
          </span>
        </div>

        <div style={{ width: '36px', height: '36px', backgroundColor: '#ffedd5', color: '#A04223', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>person</span>
        </div>
      </div>

      {/* Judul & Deskripsi */}
      <div style={{ textAlign: 'center', marginBottom: '28px', width: '100%' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#1e293b', marginBottom: '8px', lineHeight: '1.2' }}>
          Pilih kebiasaan pertamamu
        </h1>
        <p style={{ fontSize: '14px', color: '#64748b', margin: '0 auto', maxWidth: '420px', lineHeight: '1.5' }}>
          Berdasarkan area fokusmu, kami merekomendasikan habit ini. Pilih 1–3 habit untuk permulaan.
        </p>
      </div>

      {/* List Habit Items */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', width: '100%', marginBottom: '24px' }}>
        {RECOMMENDED_HABITS.map((habit) => {
          const isSelected = selected.includes(habit.id);
          return (
            <div
              key={habit.id}
              onClick={() => toggleHabit(habit.id)}
              style={{
                padding: '14px 16px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                border: isSelected ? '2px solid #A04223' : '2px solid #f1f5f9',
                backgroundColor: isSelected ? '#fff7ed' : '#ffffff',
                boxSizing: 'border-box'
              }}
            >
              {/* Icon Box */}
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  backgroundColor: habit.color + '20'
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '22px', color: habit.color }}>
                  {habit.icon}
                </span>
              </div>

              {/* Info Habit */}
              <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                <h3 style={{ fontWeight: '700', color: '#1e293b', fontSize: '14px', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {habit.title}
                </h3>
                <p style={{ fontSize: '9px', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.05em', textTransform: 'uppercase', margin: '2px 0 0 0' }}>
                  {habit.category}
                </p>
              </div>

              {/* Radio Bulat */}
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: isSelected ? '2px solid #A04223' : '2px solid #cbd5e1',
                  backgroundColor: isSelected ? '#A04223' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                {isSelected && (
                  <span className="material-symbols-outlined" style={{ fontSize: '12px', color: '#ffffff', fontWeight: 'bold' }}>
                    check
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tombol Buat Habit Kustom */}
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          color: '#A04223',
          fontWeight: '700',
          fontSize: '14px',
          border: 'none',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          marginBottom: '28px',
          width: '100%'
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
        <span>Buat habit kustom</span>
      </button>

      {/* Bottom Navigation */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '100%' }}>
        <Link
          href="/onboarding/ready"
          style={{
            width: '100%',
            maxWidth: '360px',
            padding: '14px',
            borderRadius: '16px',
            fontWeight: '700',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            textDecoration: 'none',
            backgroundColor: selected.length > 0 && selected.length <= 3 ? '#A04223' : '#e2e8f0',
            color: selected.length > 0 && selected.length <= 3 ? '#ffffff' : '#94a3b8',
            pointerEvents: selected.length > 0 && selected.length <= 3 ? 'auto' : 'none',
            transition: 'all 0.2s',
            boxSizing: 'border-box'
          }}
        >
          <span>Mulai Perjalanan</span>
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>rocket_launch</span>
        </Link>
        <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0, textAlign: 'center' }}>
          Pilih 1–3 habit untuk menjaga konsistensi
        </p>
      </div>

    </div>
  );
}