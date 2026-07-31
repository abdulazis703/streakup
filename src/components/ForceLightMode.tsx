'use client';

import { useEffect } from 'react';

/**
 * Komponen ini memaksa halaman selalu tampil dalam mode Light,
 * terlepas dari pengaturan tema global pengguna.
 * Dipakai di halaman Login, Register, Landing Page, dan Onboarding.
 */
export default function ForceLightMode() {
  useEffect(() => {
    const html = document.documentElement;
    const wasDark = html.classList.contains('dark');

    // Hapus class dark saat halaman ini dimuat
    html.classList.remove('dark');

    // Kembalikan class dark saat meninggalkan halaman
    return () => {
      if (wasDark) {
        html.classList.add('dark');
      }
    };
  }, []);

  return null;
}
