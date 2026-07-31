-- ============================================================
-- StreakUp — Supabase SQL Schema
-- Jalankan file ini di: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- ─────────────────────────────────────────────
-- 1. PROFILES TABLE
-- Dibuat otomatis saat user daftar via trigger
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   TEXT,
  avatar_url  TEXT,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger: auto-create profile saat user baru register
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ─────────────────────────────────────────────
-- 2. HABITS TABLE
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.habits (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  category        TEXT NOT NULL DEFAULT 'Umum',
  icon            TEXT NOT NULL DEFAULT 'star',
  color           TEXT NOT NULL DEFAULT '#ff8c69',
  target_days     INT NOT NULL DEFAULT 7,
  current_streak  INT NOT NULL DEFAULT 0,
  longest_streak  INT NOT NULL DEFAULT 0,
  is_active       BOOLEAN NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- 3. HABIT LOGS TABLE
-- Satu log per habit per hari (unique constraint)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.habit_logs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  habit_id        UUID NOT NULL REFERENCES public.habits(id) ON DELETE CASCADE,
  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  completed_date  DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),

  -- Cegah double check-in pada tanggal yang sama
  CONSTRAINT habit_logs_unique_per_day UNIQUE (habit_id, completed_date)
);

-- ─────────────────────────────────────────────
-- 4. ENABLE ROW LEVEL SECURITY
-- ─────────────────────────────────────────────
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habit_logs ENABLE ROW LEVEL SECURITY;

-- ─────────────────────────────────────────────
-- 5. RLS POLICIES — profiles
-- ─────────────────────────────────────────────
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- ─────────────────────────────────────────────
-- 6. RLS POLICIES — habits
-- ─────────────────────────────────────────────
CREATE POLICY "Users can view own habits"
  ON public.habits FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own habits"
  ON public.habits FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own habits"
  ON public.habits FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own habits"
  ON public.habits FOR DELETE
  USING (auth.uid() = user_id);

-- ─────────────────────────────────────────────
-- 7. RLS POLICIES — habit_logs
-- ─────────────────────────────────────────────
CREATE POLICY "Users can view own logs"
  ON public.habit_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own logs"
  ON public.habit_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own logs"
  ON public.habit_logs FOR DELETE
  USING (auth.uid() = user_id);

-- ─────────────────────────────────────────────
-- 8. HELPER FUNCTION: Hitung streak habit
-- Dipanggil setelah check-in untuk update streak
-- ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.recalculate_streak(p_habit_id UUID)
RETURNS INT AS $$
DECLARE
  v_streak INT := 0;
  v_check_date DATE := CURRENT_DATE;
  v_log_exists BOOLEAN;
BEGIN
  LOOP
    SELECT EXISTS (
      SELECT 1 FROM public.habit_logs
      WHERE habit_id = p_habit_id
        AND completed_date = v_check_date
    ) INTO v_log_exists;

    EXIT WHEN NOT v_log_exists;

    v_streak := v_streak + 1;
    v_check_date := v_check_date - INTERVAL '1 day';
  END LOOP;

  -- Update habit record
  UPDATE public.habits
  SET
    current_streak = v_streak,
    longest_streak = GREATEST(longest_streak, v_streak),
    updated_at = NOW()
  WHERE id = p_habit_id;

  RETURN v_streak;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
