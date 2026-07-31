'use client';
import React from 'react';

export default function MiniCalendar() {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // Nama bulan Indonesia
  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  // Hitung jumlah hari & hari pertama bulan ini
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  // Array offset kosong untuk padding hari pertama (Minggu = 0)
  const emptyDays = Array.from({ length: firstDayIndex });
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="glass-card p-lg rounded-[2.5rem] hover:shadow-md transition-all duration-300">
      {/* Header Bulan & Tahun */}
      <h3 className="font-extrabold text-black text-base mb-4 capitalize">
        {monthNames[currentMonth]} {currentYear}
      </h3>

      {/* Header Nama Hari */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-black mb-2">
        <span>M</span><span>S</span><span>S</span><span>R</span><span>K</span><span>J</span><span>S</span>
      </div>

      {/* Grid Tanggal */}
      <div className="grid grid-cols-7 gap-1 gap-y-2 text-center text-xs">
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="h-8" />
        ))}
        {days.map((day) => {
          const isToday = day === currentDay;
          return (
            <div
              key={day}
              className={`h-8 w-8 mx-auto flex items-center justify-center rounded-full font-medium transition-all cursor-pointer ${
                isToday
                  ? 'bg-[#9e4225] text-white font-bold shadow-md scale-105'
                  : 'text-black hover:bg-slate-100'
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
