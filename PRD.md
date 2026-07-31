# Product Requirement Document (PRD)
# Streak Up — Premium Habit Tracker Website

**Versi Dokumen:** 2.0 (Revisi)
**Tanggal:** 29 Juli 2026
**Status:** Draft untuk Review
**Disusun oleh:** Senior Product Manager & UX Designer
**Perubahan dari v1.0:** Menghapus seluruh sistem avatar, pet companion, shop, fantasy world progression, coin, dan story mode. Menghapus fitur sosial (friends/leaderboard/weekly challenge) yang bergantung pada sistem tersebut. Fokus produk dipindahkan sepenuhnya ke kualitas UX, animasi, micro-interaction, dan sound design sebagai pembeda utama. Dokumen disesuaikan agar murni untuk **website responsif**, bukan aplikasi mobile.
**Confidential — Internal Use Only**

---

## Daftar Isi

1. Executive Summary
2. Product Vision
3. Problem Statement
4. Goals
5. Success Metrics (KPI)
6. User Persona
7. User Journey
8. User Stories
9. Functional Requirements
10. Non-Functional Requirements
11. Information Architecture
12. Sitemap Website
13. Navigation Flow
14. Screen Breakdown
15. Feature Breakdown
16. Database Entity Recommendation
17. ERD Recommendation
18. Supabase Database Schema
19. Authentication Flow
20. Gamification Flow
21. Streak Logic
22. XP & Level Logic
23. Achievement Logic
24. Daily Reflection Logic
25. Animation Guideline
26. Sound Guideline
27. Responsive Design Guideline
28. Accessibility (WCAG)
29. Design System Recommendation
30. Color Palette Recommendation
31. Typography Recommendation
32. Component Guideline
33. Security Requirement
34. Edge Cases
35. Technical Architecture
36. API Requirement
37. Sprint Planning
38. Development Roadmap (MVP, V1, V2)
39. Acceptance Criteria per Fitur

---

## 1. Executive Summary

Streak Up adalah **website habit tracker premium** yang membantu pengguna membangun kebiasaan positif melalui pengalaman digital yang hangat, halus, dan memotivasi. Alih-alih bersaing lewat banyaknya fitur atau dunia fantasi yang rumit, Streak Up memposisikan dirinya sebagai gabungan kekuatan **Notion (kerapian & struktur), TickTick (efisiensi produktivitas), dan Finch (kehangatan emosional)** — dibungkus dengan visual kartun lembut, animasi berkualitas tinggi, dan sound design yang menyenangkan.

Nilai inti produk ini bukan dari kompleksitas sistem gamifikasi, melainkan dari **kualitas pengalaman**: setiap interaksi terasa hidup, setiap penyelesaian habit terasa memuaskan, dan setiap kunjungan ke dashboard terasa menenangkan sekaligus memotivasi.

Target pengguna adalah mahasiswa, pelajar, freelancer, karyawan, dan content creator berusia 16–35 tahun yang ingin membangun konsistensi tanpa merasa terbebani oleh aplikasi yang terlalu "game-y" atau terlalu polos seperti checklist biasa.

Streak Up dibangun di atas stack modern (Next.js, React, TypeScript, Tailwind CSS, Supabase, Framer Motion, Lottie) yang memungkinkan pengembangan cepat dengan biaya operasional rendah, murni sebagai **website responsif** — tanpa aplikasi mobile native, tanpa AI generatif, dan tanpa integrasi Spotify.

---

## 2. Product Vision

> **"Membangun kebiasaan baik seharusnya terasa menenangkan dan menyenangkan, bukan seperti mencentang checklist yang membosankan — dan juga bukan seperti bermain RPG yang rumit."**

Streak Up ingin menjadi habit tracker berbasis web yang paling nyaman digunakan setiap hari, dengan menggabungkan psikologi kebiasaan (cue–routine–reward), craftsmanship desain produk (animasi, micro-interaction, sound), dan kesederhanaan fungsional (tanpa fitur berlebihan).

**Visi jangka panjang:** Menjadi referensi utama "habit tracker dengan UX terbaik" — produk yang portofolio-worthy karena kedalaman perhatian terhadap detail interaksi, bukan karena luasnya fitur.

**Diferensiasi dari kompetitor** (Habitica, Finch, Streaks, TickTick, Loop Habit Tracker):
- Kualitas animasi dan micro-interaction sebagai prioritas utama, bukan fitur gamifikasi berlapis-lapis
- Nuansa visual hangat terinspirasi animasi fantasi tanpa membangun "dunia" yang perlu dikelola pengguna
- Gamifikasi sederhana (XP, Level, Streak, Achievement) yang mendukung motivasi tanpa terasa seperti game RPG
- Murni web-first, dioptimalkan untuk pengalaman desktop dan mobile browser tanpa kompromi fitur

---

## 3. Problem Statement

### Masalah yang Dihadapi Pengguna

1. **Kesulitan konsistensi.** Sebagian besar orang gagal mempertahankan kebiasaan baru dalam 30 hari pertama karena tidak ada reward instan yang terasa memuaskan.
2. **Habit tracker terasa seperti pekerjaan.** Aplikasi tracker konvensional (checklist, tabel, kalender polos) tidak memberikan dorongan emosional untuk kembali membuka aplikasi setiap hari.
3. **Aplikasi gamifikasi lain terlalu rumit.** Sistem avatar, shop, pet, dan dunia fantasi pada kompetitor justru menambah beban kognitif dan terasa seperti game terpisah dari tujuan utama membangun kebiasaan.
4. **Tidak ada rasa progres yang terlihat jelas.** Streak angka semata terasa abstrak tanpa visualisasi yang memuaskan (heatmap, chart, progress ring).
5. **Motivasi menurun setelah beberapa minggu.** Tanpa feedback visual dan sensorik yang berkualitas, novelty aplikasi cepat hilang.

### Dampak Bisnis Jika Masalah Tidak Diselesaikan

- Retensi rendah pada aplikasi produktivitas umumnya (rata-rata D30 retention di bawah 15% untuk aplikasi habit tracker konvensional).
- Pengguna churn sebelum sempat merasakan manfaat jangka panjang dari kebiasaan yang dibangun.

### Solusi yang Ditawarkan Streak Up

Memberikan pengalaman habit tracking yang terasa "hidup" melalui animasi halus, micro-interaction yang responsif, dan sound effect yang menyenangkan — tanpa kompleksitas sistem gamifikasi berlapis yang membebani. Kesederhanaan fitur dikompensasi dengan kedalaman kualitas pengalaman pengguna.

---

## 4. Goals

| Goal | Deskripsi |
|---|---|
| G1 | Meningkatkan retensi harian pengguna melalui loop reward sederhana namun memuaskan |
| G2 | Menjadikan pembuatan & penyelesaian habit terasa ringan, cepat, dan menyenangkan |
| G3 | Mendorong konsistensi jangka panjang (7–100 hari streak) |
| G4 | Menciptakan diferensiasi produk lewat kualitas UX, animasi, dan sound — bukan lewat jumlah fitur |
| G5 | Membangun produk yang solid sebagai portofolio profesional (desain + engineering) |

---

## 5. Success Metrics (KPI)

Target 6 bulan pasca-launch:

| Metrik | Target | Cara Ukur |
|---|---|---|
| D1 Retention | ≥ 45% | Analytics event `session_start` |
| D7 Retention | ≥ 25% | Analytics cohort |
| D30 Retention | ≥ 12% | Analytics cohort |
| Habit Completion Rate rata-rata | ≥ 60% | `habit_logs` completed / assigned |
| Average Session Duration | ≥ 2.5 menit | Analytics |
| Achievement Unlock Rate (min. 3 badge) | ≥ 50% pengguna aktif | DB query |
| Churn Rate bulanan | ≤ 8% | Analytics cohort |
| Streak rata-rata (pengguna aktif) | ≥ 9 hari | DB query `current_streak` |
| Time to First Habit Completion | < 90 detik dari registrasi | Analytics funnel |

---

## 6. User Persona

### Persona 1 — "Dinda, Mahasiswa yang Mudah Terdistraksi"
- **Usia:** 20 tahun, Mahasiswa Semester 5
- **Goals:** Membangun rutinitas belajar dan olahraga ringan
- **Pain points:** Mudah kehilangan motivasi, sering skip hari karena tidak ada dorongan visual yang memuaskan
- **Kebutuhan produk:** Reminder, visual progress yang memuaskan, feedback instan yang menyenangkan

### Persona 2 — "Raka, Freelancer yang Butuh Struktur"
- **Usia:** 27 tahun, Freelance Designer
- **Goals:** Menjaga rutinitas kerja tanpa atasan yang mengawasi
- **Pain points:** Tidak ada struktur harian yang jelas, mudah burnout, tidak suka aplikasi yang terlalu "game-y"
- **Kebutuhan produk:** Kategori habit produktivitas, statistik mingguan yang jelas, tampilan clean

### Persona 3 — "Sari, Karyawan yang Ingin Self-Improvement"
- **Usia:** 30 tahun, Karyawan Kantoran
- **Goals:** Membangun kebiasaan mindfulness dan kesehatan di tengah kesibukan kerja
- **Pain points:** Waktu terbatas, butuh aplikasi yang cepat dipakai (< 2 menit per sesi)
- **Kebutuhan produk:** Dashboard ringkas, quick check-in, daily reflection singkat

### Persona 4 — "Bimo, Pelajar SMA yang Suka Estetika Playful"
- **Usia:** 16 tahun, Siswa SMA
- **Goals:** Membangun kebiasaan belajar mandiri
- **Pain points:** Motivasi belajar rendah tanpa elemen menyenangkan, bosan dengan aplikasi polos
- **Kebutuhan produk:** Visual playful, animasi memuaskan saat menyelesaikan habit, achievement yang terasa berarti

---

## 7. User Journey

1. **Discovery** — Pengguna menemukan Streak Up melalui media sosial/rekomendasi teman.
2. **Onboarding** — Register → mengisi preferensi habit awal → tutorial singkat 3–4 langkah (skip option tersedia).
3. **First Habit Creation** — Pengguna diarahkan membuat 1–3 habit pertama dengan kategori yang relevan.
4. **First Completion (Aha Moment)** — Menyelesaikan habit pertama → animasi confetti/sparkle, XP naik, toast success, sound effect.
5. **Daily Loop** — Login harian → cek dashboard & greeting → selesaikan habit hari ini → dapat XP → lihat progress ring bertambah → opsional daily reflection.
6. **Weekly Loop** — Melihat statistik mingguan → cek heatmap kalender → evaluasi habit yang sering terlewat.
7. **Milestone Moment** — Mencapai 7/30/100 hari streak → unlock achievement → animasi badge pop-up.
8. **Retention Loop** — Notifikasi reminder dan streak reminder sebagai trigger untuk kembali membuka website.

---

## 8. User Stories

### Authentication
- Sebagai pengguna baru, saya ingin mendaftar dengan email agar dapat menyimpan progres saya.
- Sebagai pengguna, saya ingin reset password jika lupa, agar tetap bisa mengakses akun saya.

### Habit Management
- Sebagai pengguna, saya ingin membuat habit dengan nama, ikon, warna, dan kategori agar mudah dikenali.
- Sebagai pengguna, saya ingin mengatur jadwal repeat (harian/mingguan/custom) agar sesuai rutinitas saya.
- Sebagai pengguna, saya ingin menerima reminder agar tidak lupa menyelesaikan habit.

### Gamification Sederhana
- Sebagai pengguna, saya ingin mendapatkan XP setiap menyelesaikan habit agar merasa dihargai.
- Sebagai pengguna, saya ingin naik level seiring konsistensi saya agar termotivasi jangka panjang.
- Sebagai pengguna, saya ingin mendapatkan achievement/badge pada milestone tertentu agar merasa pencapaian saya diakui.

### Statistik & Reflection
- Sebagai pengguna, saya ingin melihat heatmap penyelesaian habit saya agar memahami pola konsistensi saya.
- Sebagai pengguna, saya ingin menulis reflection singkat setelah menyelesaikan seluruh habit hari itu agar lebih sadar akan progres saya.

### Pengalaman Visual
- Sebagai pengguna, saya ingin melihat animasi yang memuaskan saat menyelesaikan habit agar termotivasi kembali besok.
- Sebagai pengguna, saya ingin mendengar sound effect ringan saat berinteraksi agar pengalaman terasa hidup, dengan opsi mematikan suara.

---

## 9. Functional Requirements

| ID | Requirement | Prioritas |
|---|---|---|
| FR-01 | Sistem harus mendukung register, login, logout, forgot password | Must Have |
| FR-02 | Sistem harus mendukung CRUD habit lengkap (nama, deskripsi, icon, warna, kategori, difficulty, repeat schedule, reminder, target) | Must Have |
| FR-03 | Sistem harus menampilkan dashboard dengan greeting, current streak, longest streak, progress hari ini, today's habit, progress ring, quote harian, cuaca, kalender mini | Must Have |
| FR-04 | Sistem harus menyediakan checklist "Today's Habit" dengan animasi completion dan reward XP | Must Have |
| FR-05 | Sistem harus menampilkan kalender dengan heatmap gaya GitHub | Must Have |
| FR-06 | Sistem harus menghitung dan menampilkan statistik (completion rate, weekly/monthly progress, longest streak, current streak, habit terbaik, habit paling sering terlewat) | Must Have |
| FR-07 | Sistem harus memberikan achievement/badge otomatis berdasarkan milestone | Must Have |
| FR-08 | Sistem harus menyediakan sistem XP dan Level sederhana | Must Have |
| FR-09 | Sistem harus menyediakan daily reflection (mood + catatan singkat) setelah seluruh habit hari itu selesai | Should Have |
| FR-10 | Sistem harus menampilkan halaman profile (foto, nama, level, XP, total habit, total achievement) | Should Have |
| FR-11 | Sistem harus menyediakan settings (theme, notification, language, export data, delete account) | Should Have |
| FR-12 | Sistem harus mengambil data cuaca dari Open-Meteo API dan menampilkan quote harian dari local JSON | Could Have |
| FR-13 | Sistem harus menyediakan preferensi "reduce animation" dan toggle sound on/off | Should Have |

---

## 10. Non-Functional Requirements

| ID | Kategori | Requirement |
|---|---|---|
| NFR-01 | Performance | Halaman dashboard harus load < 2 detik pada koneksi 4G |
| NFR-02 | Scalability | Arsitektur harus mampu menangani hingga 50.000 pengguna aktif tanpa refactor besar |
| NFR-03 | Availability | Uptime sistem minimal 99.5% |
| NFR-04 | Responsiveness | UI harus tetap optimal di layar 320px hingga 1920px (desktop, tablet, mobile browser) |
| NFR-05 | Security | Semua data sensitif harus terenkripsi in transit (HTTPS) dan menggunakan Row Level Security Supabase |
| NFR-06 | Usability | Pengguna baru harus bisa membuat habit pertama dalam < 60 detik dari onboarding |
| NFR-07 | Accessibility | Sistem harus memenuhi standar WCAG 2.1 Level AA minimal untuk komponen utama |
| NFR-08 | Maintainability | Kode frontend harus modular berbasis komponen reusable (design system) |
| NFR-09 | Localization | Sistem harus mendukung minimal Bahasa Indonesia dan Bahasa Inggris |
| NFR-10 | Data Portability | Pengguna harus bisa export data (habit log, statistik) dalam format CSV/JSON |

---

## 11. Information Architecture

```
Streak Up (Website)
├── Landing Page (Public)
├── Auth
│   ├── Register
│   ├── Login
│   └── Forgot Password
├── Onboarding
├── Dashboard (Home)
├── Habits
│   ├── Habit List
│   ├── Create/Edit Habit
│   └── Habit Detail
├── Today's Habit
├── Calendar
├── Statistics
├── Achievements
├── Daily Reflection
├── Profile
└── Settings
```

---

## 12. Sitemap Website

```
/                      → Landing Page
/register              → Register
/login                 → Login
/forgot-password        → Forgot Password
/onboarding            → Onboarding Flow
/dashboard             → Dashboard utama
/habits                → Daftar habit
/habits/create          → Form buat habit baru
/habits/:id             → Detail & edit habit
/today                 → Today's Habit checklist
/calendar               → Kalender & heatmap
/statistics             → Statistik lengkap
/achievements            → Daftar badge & achievement
/reflection              → Daily reflection (list & entry)
/profile                → Profil pengguna
/settings                → Pengaturan akun & aplikasi
```

---

## 13. Navigation Flow

**Primary Navigation (Sidebar — Desktop / Bottom Nav — Mobile Browser):**
Dashboard → Habits → Today's Habit → Statistics → Profile

**Flow Utama:**
1. Login → Dashboard
2. Dashboard → klik "Today's Habit" → checklist habit → completion animation + sound → kembali ke Dashboard (state ter-update)
3. Dashboard → Calendar (dari kalender mini) → lihat heatmap penuh & detail riwayat
4. Dashboard → Statistics (dari card ringkasan) → lihat detail completion rate & chart
5. Setelah seluruh habit hari ini selesai → modal Daily Reflection muncul otomatis (dapat di-skip)
6. Habits → Create Habit → isi form multi-step (info dasar → jadwal → reminder → target) → simpan

---

## 14. Screen Breakdown

| No | Screen | Deskripsi Singkat |
|---|---|---|
| 1 | Landing Page | Halaman marketing publik |
| 2 | Register | Form pendaftaran |
| 3 | Login | Form login |
| 4 | Forgot Password | Reset password via email |
| 5 | Onboarding | 3–4 step intro produk + pilih habit awal |
| 6 | Dashboard | Ringkasan harian & quick actions |
| 7 | Habit List | Semua habit dengan filter kategori |
| 8 | Habit Form | Create/edit habit |
| 9 | Habit Detail | Detail 1 habit + history |
| 10 | Today's Habit | Checklist interaktif harian |
| 11 | Calendar/Heatmap | Kalender bulanan gaya GitHub |
| 12 | Statistics | Grafik & angka statistik |
| 13 | Achievements | Grid badge terkunci/terbuka |
| 14 | Daily Reflection | List & form entry reflection |
| 15 | Profile | Ringkasan profil & pencapaian |
| 16 | Settings | Preferensi akun & aplikasi |

---

## 15. Feature Breakdown

### 15.1 Authentication
Register (email + password, validasi), Login, Forgot Password (reset via Supabase Auth), Logout, Remember Me, Session persistence.

### 15.2 Dashboard
Greeting dinamis berdasarkan waktu ("Selamat pagi, Dinda!"), current streak, longest streak, progress hari ini, today's habit ringkas, progress ring (radial chart), quote harian (local JSON), cuaca (Open-Meteo), kalender mini, ringkasan aktivitas.

### 15.3 Habit Management (CRUD)
Form pembuatan habit multi-step. Setiap habit menyimpan: nama, deskripsi, icon (icon picker), warna (color picker), kategori (Study/Health/Exercise/Productivity/Hobby/Mindfulness), tingkat kesulitan (Easy/Medium/Hard — mempengaruhi reward XP), repeat schedule (daily, specific days, X times per week), reminder (waktu), target (angka, misal "30 menit" atau "3 kali").

### 15.4 Today's Habit
Menampilkan seluruh habit yang jatuh tempo hari ini sebagai checklist. Saat dicentang: progress bertambah, XP bertambah, streak diperbarui, animasi muncul (confetti/sparkle), sound effect diputar.

### 15.5 Calendar
Tampilan bulanan dengan heatmap intensitas warna berdasarkan jumlah habit selesai per hari (mirip kontribusi GitHub), riwayat streak, aktivitas harian. Klik tanggal menampilkan detail riwayat.

### 15.6 Statistics
Completion rate (%), weekly & monthly progress chart, longest streak, current streak, total habit completed, habit terbaik, habit paling sering terlewat.

### 15.7 Achievement
Badge otomatis berdasarkan milestone: First Habit, First Week, Seven Days Streak, Thirty Days Streak, Hundred Days Streak, Perfect Week, Perfect Month, Early Bird, Night Owl, Consistency Master.

### 15.8 Daily Reflection
Setelah seluruh habit hari itu selesai, pengguna dapat menulis mood (emoji-based), catatan singkat, dan reflection bebas. Bersifat opsional, tidak memblokir alur utama.

### 15.9 Profile
Foto profil, nama, level, XP, total habit, total achievement, statistik singkat.

### 15.10 Settings
Theme (light/dark), notification preference, language (ID/EN), export data (CSV/JSON), delete account, toggle reduce-animation, toggle sound.

---

## 16. Database Entity Recommendation

**Entities utama:**
1. `profiles` — data akun & profil pengguna (extends `auth.users`)
2. `habits` — data habit milik user
3. `habit_logs` — log penyelesaian habit harian
4. `xp_transactions` — histori perolehan XP
5. `achievements` — master data achievement
6. `user_achievements` — achievement yang dimiliki user
7. `daily_reflections` — entri reflection harian user
8. `notifications` — notifikasi in-app

---

## 17. ERD Recommendation

**Relasi Utama (deskriptif — high level):**

- `profiles (1) — (N) habits`
- `habits (1) — (N) habit_logs`
- `profiles (1) — (N) habit_logs`
- `profiles (1) — (N) xp_transactions`
- `profiles (1) — (N) user_achievements — (N) — (1) achievements`
- `profiles (1) — (N) daily_reflections`
- `profiles (1) — (N) notifications`

> Diagram visual ERD (format .drawio/.dbdiagram) direkomendasikan dibuat pada tahap technical design menggunakan tool seperti dbdiagram.io berdasarkan skema tabel pada Bagian 18.

---

## 18. Supabase Database Schema

```sql
-- PROFILES (extends Supabase auth.users)
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  display_name text,
  avatar_url text,
  xp integer default 0,
  level integer default 1,
  current_streak integer default 0,
  longest_streak integer default 0,
  last_active_date date,
  language text default 'id',
  theme text default 'light',
  reduce_animation boolean default false,
  sound_enabled boolean default true,
  created_at timestamptz default now()
);

-- HABITS
create table habits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  name text not null,
  description text,
  icon text,
  color text,
  category text check (category in ('Study','Health','Exercise','Productivity','Hobby','Mindfulness')),
  difficulty text check (difficulty in ('Easy','Medium','Hard')),
  repeat_schedule jsonb, -- {"type":"daily"} atau {"type":"weekly","days":[1,3,5]}
  reminder_time time,
  target_value numeric,
  target_unit text,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- HABIT LOGS
create table habit_logs (
  id uuid primary key default gen_random_uuid(),
  habit_id uuid references habits(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  completed_at date not null,
  status text check (status in ('completed','missed','skipped')),
  xp_earned integer default 0,
  created_at timestamptz default now(),
  unique (habit_id, completed_at)
);

-- XP TRANSACTIONS
create table xp_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  amount integer not null,
  source text, -- 'habit_completion','streak_bonus','achievement'
  reference_id uuid,
  created_at timestamptz default now()
);

-- ACHIEVEMENTS (master)
create table achievements (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name text not null,
  description text,
  icon text,
  criteria jsonb -- {"type":"streak","value":7}
);

-- USER ACHIEVEMENTS
create table user_achievements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  achievement_id uuid references achievements(id) on delete cascade,
  unlocked_at timestamptz default now(),
  unique (user_id, achievement_id)
);

-- DAILY REFLECTIONS
create table daily_reflections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  reflection_date date not null,
  mood text,
  notes text,
  created_at timestamptz default now(),
  unique (user_id, reflection_date)
);

-- NOTIFICATIONS
create table notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  type text,
  title text,
  body text,
  is_read boolean default false,
  created_at timestamptz default now()
);
```

**Row Level Security (RLS):** Semua tabel yang memiliki `user_id` wajib mengaktifkan RLS dengan policy `auth.uid() = user_id` untuk SELECT/INSERT/UPDATE/DELETE, kecuali tabel master (`achievements`) yang bersifat read-only public.

---

## 19. Authentication Flow

1. **Register:** Email + Password + Username → Supabase Auth `signUp` → trigger otomatis membuat row di `profiles` (via Postgres trigger/function) → redirect ke Onboarding.
2. **Login:** Email + Password → Supabase Auth `signInWithPassword` → simpan session (JWT) → redirect ke Dashboard.
3. **Forgot Password:** Input email → Supabase Auth `resetPasswordForEmail` → user menerima link → set password baru → redirect ke Login.
4. **Logout:** Supabase Auth `signOut` → clear session → redirect ke Landing Page.
5. **Remember Me:** Session persistence lebih lama menggunakan refresh token Supabase.
6. **Session Handling:** Gunakan Supabase SSR helper untuk Next.js agar session persist di middleware, proteksi route `/dashboard/**` dari akses tanpa login.

---

## 20. Gamification Flow

Gamifikasi Streak Up sengaja dibuat sederhana — cukup untuk memotivasi, tanpa terasa seperti game terpisah:

| Elemen | Fungsi |
|---|---|
| XP | Didapat setiap menyelesaikan habit, jumlah bergantung pada difficulty |
| Level | Naik otomatis setelah XP mencapai threshold kumulatif |
| Streak | Bertambah setiap hari user menyelesaikan minimal 1 habit sesuai jadwal, reset jika absen |
| Achievement/Badge | Unlock otomatis saat kriteria milestone tercapai |
| Daily Goal | Persentase habit hari ini yang sudah diselesaikan, ditampilkan via progress ring |

Tidak ada mata uang virtual, tidak ada item yang dibeli, tidak ada elemen yang perlu "dirawat" — seluruh gamifikasi berputar langsung di sekitar konsistensi habit itu sendiri.

---

## 21. Streak Logic

1. `current_streak` bertambah 1 setiap kali user menyelesaikan **seluruh habit yang dijadwalkan hari itu** sebelum tengah malam (timezone user).
2. Jika user tidak menyelesaikan seluruh habit terjadwal dalam 1 hari kalender, `current_streak` di-reset ke 0 keesokan harinya (dihitung via scheduled job harian).
3. `longest_streak` diperbarui setiap kali `current_streak` melebihi nilai sebelumnya.
4. Perhitungan streak dijalankan di **server (Supabase Edge Function/Cron)**, bukan di client, untuk mencegah manipulasi tanggal perangkat.
5. Grace period opsional (V2): 1x "streak freeze" gratis per bulan untuk mengurangi frustrasi absen tidak sengaja.

---

## 22. XP & Level Logic

**Formula XP per Habit Completion:**

| Difficulty | XP |
|---|---|
| Easy | 10 XP |
| Medium | 20 XP |
| Hard | 35 XP |

**Bonus:**
- Perfect Day (seluruh habit hari itu selesai): +15 XP bonus
- Streak milestone (7/30/100 hari): XP bonus sesuai Bagian 23

**Formula Level:**
Level dihitung dari total XP kumulatif menggunakan kurva eksponensial ringan:

```
xp_required_for_level(n) = 100 * n^1.5
```

Contoh: Level 2 butuh ~283 XP kumulatif, Level 5 butuh ~1.118 XP kumulatif. Level naik otomatis saat threshold terlampaui, disertai animasi level-up dan toast.

---

## 23. Achievement Logic

| Kode | Nama | Kriteria |
|---|---|---|
| FIRST_HABIT | First Habit | Menyelesaikan 1 habit pertama kali |
| FIRST_WEEK | First Week | Aktif menyelesaikan habit selama 7 hari kalender (tidak harus berurutan) |
| STREAK_7 | Seven Days Streak | `current_streak` mencapai 7 |
| STREAK_30 | Thirty Days Streak | `current_streak` mencapai 30 |
| STREAK_100 | Hundred Days Streak | `current_streak` mencapai 100 |
| PERFECT_WEEK | Perfect Week | Menyelesaikan seluruh habit terjadwal selama 7 hari berturut-turut |
| PERFECT_MONTH | Perfect Month | Menyelesaikan seluruh habit terjadwal selama 1 bulan kalender penuh |
| EARLY_BIRD | Early Bird | Menyelesaikan habit sebelum jam 07:00 sebanyak 10 kali |
| NIGHT_OWL | Night Owl | Menyelesaikan habit setelah jam 22:00 sebanyak 10 kali |
| CONSISTENCY_MASTER | Consistency Master | Completion rate ≥ 90% selama 30 hari berturut-turut |

Achievement dicek melalui trigger/Edge Function setiap kali `habit_logs` baru masuk, dan otomatis insert ke `user_achievements` tanpa perlu refresh manual di sisi client.

---

## 24. Daily Reflection Logic

1. Modal Daily Reflection muncul otomatis **hanya sekali per hari kalender**, dipicu saat seluruh habit terjadwal hari itu berstatus `completed`.
2. Pengguna dapat memilih mood (emoji: senang, biasa, lelah, stres, bersyukur, dll) dan menulis catatan singkat (opsional, maksimal ~500 karakter).
3. Reflection dapat di-skip tanpa memengaruhi XP/streak.
4. Riwayat reflection dapat dilihat kembali di halaman `/reflection`, diurutkan berdasarkan tanggal.
5. Satu entri reflection per hari (unique constraint pada `user_id` + `reflection_date`); entri yang sudah ada dapat diedit di hari yang sama.

---

## 25. Animation Guideline

Animasi merupakan bagian utama dari pengalaman produk. Gunakan **Framer Motion** untuk transisi/interaksi UI dan **Lottie** untuk ilustrasi kompleks.

**Dashboard**
- Matahari/bulan berubah posisi & ilustrasi sesuai waktu (pagi/siang/sore/malam)
- Awan bergerak perlahan (looping, subtle)
- Card muncul dengan fade + slide-up saat halaman dimuat

**Button & Interaksi**
- Hover: scale ringan (1.02–1.05x)
- Click: bounce/scale-down singkat

**Habit Completed**
- Checkbox bertransisi ke state success dengan checkmark animasi
- Confetti/sparkle burst ringan
- Progress bar animation (easing smooth, bukan linear)
- XP counter animation (angka naik bertahap, bukan langsung loncat)
- Toast success muncul dari atas/bawah dengan fade

**Achievement**
- Badge pop-up dengan scale + glow effect
- Modal muncul dengan backdrop blur halus

**Statistics**
- Counter animation untuk angka statistik
- Chart animation saat data pertama kali dimuat (bar tumbuh dari 0)

**Navigation**
- Smooth page transition (fade/slide antar halaman, durasi 200–300ms)

**Loading & Empty State**
- Skeleton loading untuk konten yang sedang dimuat
- Ilustrasi ramah + floating animation ringan untuk empty state (misal belum ada habit)

**Prinsip performa:** Semua animasi harus tetap smooth di device low-end; sediakan toggle "Reduce Animation" di Settings yang menonaktifkan animasi non-esensial (menghormati `prefers-reduced-motion`).

---

## 26. Sound Guideline

Sound effect bersifat ringan, singkat (< 1 detik), dan tidak mengganggu. Semua dapat dimatikan lewat toggle di Settings.

| Aksi | Sound |
|---|---|
| Button click | Klik lembut, pitch tinggi |
| Habit completed | Chime pendek yang memuaskan |
| Achievement unlock | Fanfare singkat |
| Level up | Nada naik (ascending chime) |
| Notification | Ping halus |
| Success/save | Konfirmasi nada pendek |

**Prinsip:** Volume default rendah–sedang, tidak ada musik latar berkelanjutan, tidak menggunakan aset berbayar/berhak cipta (gunakan sound library royalty-free seperti Freesound dengan lisensi CC0).

---

## 27. Responsive Design Guideline

- **Desktop (≥1024px):** Layout sidebar + konten utama, grid multi-kolom untuk dashboard card.
- **Tablet (768–1023px):** Sidebar collapsible/icon-only, grid 2 kolom.
- **Mobile Browser (<768px):** Bottom navigation bar, layout 1 kolom, card full-width, modal menjadi bottom sheet.
- Breakpoint mengikuti Tailwind default (`sm`, `md`, `lg`, `xl`) dengan penyesuaian khusus di 320px sebagai batas bawah.
- Seluruh animasi tetap dioptimalkan untuk mobile browser (hindari animasi berat yang menyebabkan jank pada scroll).

---

## 28. Accessibility (WCAG)

- Target minimal **WCAG 2.1 Level AA**.
- Kontras warna teks minimal rasio 4.5:1 untuk teks normal, 3:1 untuk teks besar.
- Seluruh flow utama (auth, habit CRUD, today's habit, reflection) dapat dinavigasi penuh dengan keyboard.
- Elemen interaktif memiliki focus state yang jelas.
- Gambar/ikon dekoratif memiliki `aria-hidden`; ikon fungsional memiliki `aria-label`.
- Preferensi `prefers-reduced-motion` dihormati secara otomatis, ditambah toggle manual di Settings.
- Form memiliki label eksplisit dan pesan error yang jelas (bukan hanya warna).

---

## 29. Design System Recommendation

Gunakan pendekatan design token berbasis Tailwind CSS dengan komponen reusable (button, card, input, modal, toast, badge, progress ring, checkbox animasi). Rekomendasikan penggunaan library headless seperti Radix UI untuk aksesibilitas dasar (dialog, dropdown, tooltip) yang kemudian di-style ulang agar sesuai visual playful/cute yang diinginkan.

Struktur token: `color`, `spacing`, `radius`, `shadow`, `typography`, `motion` (durasi & easing standar) sebagai single source of truth agar konsisten di seluruh komponen.

---

## 30. Color Palette Recommendation

Nuansa hangat, lembut, dan calming — bukan warna neon/tajam.

| Token | Fungsi | Contoh Warna |
|---|---|---|
| Primary | Aksi utama, brand | Peach/Coral hangat (#FF8C69 area) |
| Secondary | Aksen pendukung | Lavender lembut (#B8A9FF area) |
| Success | Habit completed, positive feedback | Mint/Hijau lembut (#7ED9A5 area) |
| Warning | Reminder, perhatian | Kuning hangat (#FFD166 area) |
| Background Light | Latar utama mode terang | Cream/off-white (#FFF9F2 area) |
| Background Dark | Latar utama mode gelap | Navy lembut, bukan hitam pekat (#1E1B2E area) |
| Neutral | Teks & border | Abu-abu hangat (#6B6470 area) |

Gunakan gradient lembut (2 warna bersebelahan di color wheel) untuk background hero/card unggulan, hindari gradient tajam yang kontras berlebihan.

---

## 31. Typography Recommendation

- **Font utama:** Nunito atau Baloo 2 (rounded, playful, tetap terbaca profesional) — Google Fonts, gratis.
- **Font angka/statistik:** Boleh gunakan font monospace ringan seperti "JetBrains Mono" untuk angka statistik agar terasa presisi, kontras dengan font utama yang lembut.
- **Skala tipografi:** Gunakan skala modular (misal 1.25 ratio) — h1 32px, h2 24px, h3 20px, body 16px, caption 13px.
- **Line height:** 1.5 untuk body text agar nyaman dibaca dalam sesi singkat.

---

## 32. Component Guideline

| Komponen | Catatan Desain |
|---|---|
| Button | Rounded corner besar (12–16px), hover scale, 3 varian (primary/secondary/ghost) |
| Card | Rounded corner besar, shadow lembut, glassmorphism ringan opsional untuk card unggulan |
| Checkbox Habit | Custom animasi, bukan checkbox default browser |
| Progress Ring | SVG animasi radial, warna berubah sesuai persentase |
| Modal | Backdrop blur, slide-up di mobile (bottom sheet), fade+scale di desktop |
| Toast | Muncul dari pojok atas (desktop) / atas layar (mobile), auto-dismiss 3 detik |
| Badge Achievement | Grayscale saat locked, full color + glow saat unlocked |
| Heatmap Cell | Rounded square kecil, intensitas warna sesuai jumlah completion |

---

## 33. Security Requirement

- Seluruh komunikasi menggunakan HTTPS.
- Row Level Security (RLS) aktif di seluruh tabel Supabase yang memuat data milik user.
- Validasi input di sisi client **dan** server (jangan hanya mengandalkan validasi client).
- Perhitungan XP, streak, dan achievement dijalankan di server (Edge Function), tidak boleh dipercaya dari payload client, untuk mencegah manipulasi.
- Password mengikuti kebijakan Supabase Auth (minimal 8 karakter).
- Rate limiting pada endpoint auth untuk mencegah brute force.
- Data reflection (mood/notes) diperlakukan sebagai data privat — hanya dapat diakses oleh pemiliknya (RLS ketat).

---

## 34. Edge Cases

- User menyelesaikan habit lalu membatalkannya (uncheck) di hari yang sama → XP yang sudah diberikan harus dikurangi kembali, `habit_logs` dihapus/di-update statusnya.
- User mengedit jadwal repeat habit di tengah streak berjalan → streak tidak boleh ter-reset akibat perubahan konfigurasi, hanya dipengaruhi oleh completion aktual.
- User pindah zona waktu (misal traveling) → perhitungan "hari" untuk streak mengikuti timezone yang tersimpan di profil, bukan device secara real-time.
- User menghapus habit yang memiliki histori panjang → histori `habit_logs` tetap tersimpan untuk keperluan statistik historis, habit hanya di-soft-delete (`is_active = false`).
- Dua tab browser terbuka bersamaan, user menyelesaikan habit yang sama di kedua tab → unique constraint pada `habit_logs (habit_id, completed_at)` mencegah duplikasi XP.
- User tidak memiliki habit sama sekali → Dashboard menampilkan empty state ramah yang mengarahkan ke pembuatan habit pertama.

---

## 35. Technical Architecture

```
┌─────────────────────────────────────────────────┐
│                   Client (Browser)                │
│  Next.js 15 (App Router) + React + TypeScript      │
│  Tailwind CSS + Framer Motion + Lottie             │
└───────────────────────┬───────────────────────────┘
                         │ HTTPS
┌───────────────────────▼───────────────────────────┐
│                    Vercel (Hosting)                │
│         Edge Network + Static/SSR Rendering        │
└───────────────────────┬───────────────────────────┘
                         │
┌───────────────────────▼───────────────────────────┐
│                      Supabase                      │
│  ┌─────────────┐ ┌───────────────┐ ┌────────────┐ │
│  │ PostgreSQL  │ │ Auth (JWT)    │ │ Storage    │ │
│  │ + RLS       │ │               │ │ (avatar)   │ │
│  └─────────────┘ └───────────────┘ └────────────┘ │
│  ┌─────────────────────────────────────────────┐  │
│  │ Edge Functions (XP calc, streak calc,        │  │
│  │ achievement check, daily reset cron)         │  │
│  └─────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

**Prinsip arsitektur:**
- Logic bisnis krusial (perhitungan XP, streak, achievement check) dijalankan di **Supabase Edge Functions**, bukan hanya di client, untuk mencegah manipulasi.
- **Scheduled jobs** (via Supabase Cron/pg_cron) untuk reset streak harian dan cek habit yang terlewat.
- **Storage bucket** terpisah untuk foto profil dengan public read policy terbatas.
- Tidak ada realtime channel yang wajib di MVP (tidak ada fitur sosial); dapat ditambahkan di V2 jika diperlukan.

---

## 36. API Requirement

| Kebutuhan | Rekomendasi API Gratis | Catatan |
|---|---|---|
| Cuaca | Open-Meteo (gratis, tanpa API key) | Ditampilkan di widget dashboard |
| Quote harian | Local JSON (kumpulan quote motivasi) | Tidak bergantung pada layanan eksternal |
| Ikon habit | Iconify API / Phosphor Icons (open source) | Tidak perlu API key |
| Ilustrasi/aset | Aset custom SVG/Lottie buatan sendiri (bukan berhak cipta) | Sesuai batasan produk |
| Email (reset password) | Supabase Auth built-in email | Gratis dalam batas kuota Supabase |
| Font | Google Fonts (Nunito, Baloo 2) | Gratis & open license |
| Sound effect | Freesound (lisensi CC0) | Gratis, hindari aset berbayar |

> Tidak ada penggunaan AI generatif maupun integrasi Spotify sesuai batasan produk yang ditetapkan.

---

## 37. Sprint Planning (Contoh Sprint 2 Minggu)

### Sprint 1 — Foundation
- Setup Next.js + Tailwind + Supabase project
- Implementasi Auth (register, login, forgot password, logout, remember me)
- Setup design system dasar (color, typography, komponen inti)

### Sprint 2 — Habit Core
- CRUD Habit (form multi-step)
- Skema database habit & habit_logs
- Today's Habit checklist dasar (tanpa animasi penuh)

### Sprint 3 — Gamification & Reward
- Edge Function perhitungan XP/Level/streak
- Dashboard dengan progress ring, XP bar
- Completion animation (confetti, XP counter, sound)

### Sprint 4 — Achievement & Reflection
- Achievement system + trigger otomatis
- Daily Reflection modal & halaman riwayat
- Toast & badge pop-up animation

### Sprint 5 — Insight
- Calendar/heatmap
- Statistics page dengan chart animation
- Profile page

### Sprint 6 — Polish & QA
- Sound design integration + toggle
- Accessibility audit (WCAG AA) + reduce-animation toggle
- Responsive testing lintas device
- Performance optimization animasi
- Bug bash & regression testing

---

## 38. Development Roadmap (MVP, V1, V2)

### MVP (Sprint 1–4)
- Authentication lengkap
- CRUD Habit + Today's Habit checklist
- XP, Level, Streak dasar
- Achievement dasar (5–6 badge pertama)
- Daily Reflection

### V1 (Sprint 5–6, Launch)
- Calendar/heatmap lengkap
- Statistics lengkap dengan chart
- Profile & Settings lengkap (export data, theme, language)
- Seluruh animation & sound guideline diterapkan penuh
- Accessibility audit selesai

### V2 (Pasca-launch)
- Streak freeze/grace period
- OAuth login (Google)
- PWA/offline support ringan untuk mobile browser
- Notifikasi push via Web Push API
- Insight mingguan otomatis (ringkasan performa habit)

---

## 39. Acceptance Criteria per Fitur

### Authentication
- [ ] User dapat register dengan email valid & password ≥ 8 karakter
- [ ] Error message jelas jika email sudah terdaftar
- [ ] User dapat login dan diarahkan ke Dashboard
- [ ] User dapat reset password melalui email dan berhasil login dengan password baru
- [ ] User dapat logout dan session benar-benar terhapus

### Habit Management
- [ ] User dapat membuat habit dengan seluruh atribut wajib terisi (nama, kategori, repeat schedule)
- [ ] User dapat mengedit habit yang sudah dibuat tanpa kehilangan histori log sebelumnya
- [ ] User dapat menghapus (soft-delete) habit dengan konfirmasi, histori tetap tersimpan
- [ ] Validasi mencegah target value ≤ 0

### Today's Habit
- [ ] Habit yang jatuh tempo hari ini muncul di checklist
- [ ] Menandai selesai memicu animasi completion + sound dalam < 1 detik
- [ ] XP bertambah sesuai formula reward dan tersimpan di database
- [ ] Tidak bisa menyelesaikan habit yang sama dua kali di hari yang sama (unique constraint bekerja)

### Dashboard
- [ ] Menampilkan current streak, level, XP secara real-time sesuai data terbaru
- [ ] Progress ring menampilkan persentase habit selesai hari ini secara akurat
- [ ] Greeting menyesuaikan waktu (pagi/siang/malam)
- [ ] Widget cuaca menampilkan data sesuai lokasi/API tanpa memblokir render dashboard jika API gagal

### Achievement
- [ ] Badge otomatis unlock saat kriteria terpenuhi tanpa perlu refresh manual
- [ ] Badge yang belum unlock tampil dalam state locked/grayscale
- [ ] Tidak ada duplikasi achievement untuk kriteria yang sama

### Daily Reflection
- [ ] Modal reflection muncul hanya sekali per hari kalender, hanya setelah seluruh habit hari itu selesai
- [ ] Reflection dapat di-skip tanpa memengaruhi XP/streak
- [ ] Riwayat reflection tersimpan dan dapat dilihat kembali per tanggal

### Statistics & Calendar
- [ ] Heatmap menampilkan intensitas warna sesuai jumlah completion per hari secara akurat
- [ ] Completion rate dihitung benar berdasarkan (habit selesai / habit yang seharusnya selesai)

### Accessibility
- [ ] Semua flow utama dapat dinavigasi penuh dengan keyboard
- [ ] Kontras warna teks memenuhi rasio minimal 4.5:1
- [ ] Preferensi "Reduce Animation" berfungsi menonaktifkan animasi non-esensial
- [ ] Toggle sound berfungsi mematikan seluruh sound effect

---

## Penutup

Dokumen PRD versi 2.0 ini merupakan acuan utama pengembangan Streak Up sebagai **website habit tracker premium**. Perubahan utama dari versi sebelumnya adalah penyederhanaan sistem gamifikasi (menghapus avatar, pet, shop, fantasy world, coin, story mode, dan fitur sosial) agar tim kecil dapat fokus membangun kualitas pengalaman inti — animasi, micro-interaction, dan sound design — dengan standar eksekusi yang tinggi, alih-alih menyebar fokus ke terlalu banyak sistem sekaligus.

**Rekomendasi langkah selanjutnya:**
1. Review PRD ini bersama tim engineering & design untuk validasi estimasi teknis.
2. Buat wireframe low-fidelity berdasarkan Sitemap & Screen Breakdown (Bagian 12 & 14).
3. Susun ERD visual formal berdasarkan skema tabel (Bagian 18) menggunakan tool diagram.
4. Mulai Sprint 1 sesuai Sprint Planning (Bagian 37).
