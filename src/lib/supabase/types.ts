// ============================================================
// StreakUp — Supabase TypeScript Types
// ============================================================

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Habit {
  id: string;
  user_id: string;
  title: string;
  category: string;
  icon: string;
  color: string;
  target_days: number;
  current_streak: number;
  longest_streak: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  // Virtual field: added client-side after fetching today's logs
  done_today?: boolean;
}

export interface HabitLog {
  id: string;
  habit_id: string;
  user_id: string;
  completed_date: string; // "YYYY-MM-DD"
  created_at: string;
}

export interface HabitInsert {
  title: string;
  category: string;
  icon: string;
  color: string;
  target_days?: number;
}
