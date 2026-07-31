"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';
import type { Profile, Habit, HabitInsert } from '@/lib/supabase/types';

// ─────────────────────────────────────────────
// Context Type
// ─────────────────────────────────────────────
interface AuthContextValue {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  habits: Habit[];
  loading: boolean;
  refreshHabits: () => Promise<void>;
  checkInHabit: (habitId: string) => Promise<{ error: string | null }>;
  uncheckHabit: (habitId: string) => Promise<{ error: string | null }>;
  addHabit: (data: HabitInsert) => Promise<{ error: string | null; habit: Habit | null }>;
  deleteHabit: (habitId: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ─────────────────────────────────────────────
// Helper: Get today's date as "YYYY-MM-DD"
// ─────────────────────────────────────────────
function getTodayString() {
  return new Date().toISOString().split('T')[0];
}

// ─────────────────────────────────────────────
// AuthProvider Component
// ─────────────────────────────────────────────
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  // ── Fetch profile ──
  const fetchProfile = useCallback(async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (data) setProfile(data as Profile);
  }, []);

  // ── Fetch habits + today's logs ──
  const refreshHabits = useCallback(async () => {
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    if (!currentUser) return;

    const today = getTodayString();

    // Fetch active habits
    const { data: habitsData, error } = await supabase
      .from('habits')
      .select('*')
      .eq('user_id', currentUser.id)
      .eq('is_active', true)
      .order('created_at', { ascending: true });

    if (error || !habitsData) return;

    // Fetch today's logs to know which are done
    const { data: logsData } = await supabase
      .from('habit_logs')
      .select('habit_id')
      .eq('user_id', currentUser.id)
      .eq('completed_date', today);

    const doneHabitIds = new Set((logsData ?? []).map((l) => l.habit_id));

    // Merge done_today into habits
    const merged: Habit[] = habitsData.map((h) => ({
      ...h,
      done_today: doneHabitIds.has(h.id),
    }));

    setHabits(merged);
  }, []);

  // ── Check-in habit ──
  const checkInHabit = useCallback(async (habitId: string): Promise<{ error: string | null }> => {
    const today = getTodayString();
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    if (!currentUser) return { error: 'Not authenticated' };

    // Insert log (will fail silently if duplicate due to unique constraint)
    const { error: logError } = await supabase
      .from('habit_logs')
      .insert({ habit_id: habitId, user_id: currentUser.id, completed_date: today });

    if (logError && logError.code !== '23505') {
      // 23505 = unique violation → already checked in today, that's OK
      return { error: logError.message };
    }

    // Recalculate streak via Supabase function
    await supabase.rpc('recalculate_streak', { p_habit_id: habitId });

    // Update local state optimistically
    setHabits((prev) =>
      prev.map((h) =>
        h.id === habitId
          ? { ...h, done_today: true, current_streak: h.current_streak + 1 }
          : h
      )
    );

    return { error: null };
  }, []);

  // ── Uncheck habit (remove today's log) ──
  const uncheckHabit = useCallback(async (habitId: string): Promise<{ error: string | null }> => {
    const today = getTodayString();
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    if (!currentUser) return { error: 'Not authenticated' };

    const { error } = await supabase
      .from('habit_logs')
      .delete()
      .eq('habit_id', habitId)
      .eq('user_id', currentUser.id)
      .eq('completed_date', today);

    if (error) return { error: error.message };

    // Recalculate streak
    await supabase.rpc('recalculate_streak', { p_habit_id: habitId });

    // Update local state
    setHabits((prev) =>
      prev.map((h) =>
        h.id === habitId
          ? { ...h, done_today: false, current_streak: Math.max(0, h.current_streak - 1) }
          : h
      )
    );

    return { error: null };
  }, []);

  // ── Add habit ──
  const addHabit = useCallback(async (data: HabitInsert): Promise<{ error: string | null; habit: Habit | null }> => {
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    if (!currentUser) return { error: 'Not authenticated', habit: null };

    const { data: newHabit, error } = await supabase
      .from('habits')
      .insert({ ...data, user_id: currentUser.id })
      .select()
      .single();

    if (error) return { error: error.message, habit: null };

    const habitWithDone = { ...newHabit, done_today: false } as Habit;
    setHabits((prev) => [...prev, habitWithDone]);

    return { error: null, habit: habitWithDone };
  }, []);

  // ── Delete habit ──
  const deleteHabit = useCallback(async (habitId: string): Promise<{ error: string | null }> => {
    const { error } = await supabase
      .from('habits')
      .update({ is_active: false })
      .eq('id', habitId);

    if (error) return { error: error.message };

    setHabits((prev) => prev.filter((h) => h.id !== habitId));
    return { error: null };
  }, []);

  // ── Sign out ──
  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    setHabits([]);
  }, []);

  // ── Init: listen to auth state changes ──
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        fetchProfile(s.user.id);
        refreshHabits();
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        fetchProfile(s.user.id);
        refreshHabits();
      } else {
        setProfile(null);
        setHabits([]);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile, refreshHabits]);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        habits,
        loading,
        refreshHabits,
        checkInHabit,
        uncheckHabit,
        addHabit,
        deleteHabit,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
