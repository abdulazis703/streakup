'use client';

/**
 * SeasonContext — Global state for Disney Cartoon Seasonal Theme System.
 *
 * Seasons:
 *   'spring'  → Cherry blossom petals, fresh green, pink pastels
 *   'summer'  → Sparkle stars, vibrant green leaves, sunny warm
 *   'autumn'  → Maple/oak leaves, warm honey orange, cozy amber
 *   'winter'  → Snowflakes, icy creamy blue, pine trees, snow drifts
 *
 * Persists selection in localStorage under key 'streakup-season'.
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

interface SeasonTheme {
  /** CSS gradient string for main background */
  backgroundGradient: string;
  /** Tailwind/hex primary color accent for season */
  accentColor: string;
  /** Emoji icon for the season */
  icon: string;
  /** Human-readable label */
  label: string;
  /** Glass card tint for this season */
  glassTint: string;
}

export const SEASON_THEMES: Record<Season, SeasonTheme> = {
  spring: {
    backgroundGradient: 'linear-gradient(135deg, #fff5f8 0%, #fdf2f4 50%, #f0fdf4 100%)',
    accentColor: '#f9a8d4',
    icon: '🌸',
    label: 'Musim Semi',
    glassTint: 'rgba(253, 242, 244, 0.75)',
  },
  summer: {
    backgroundGradient: 'linear-gradient(135deg, #fffdf0 0%, #fffbeb 50%, #e0f7fa 100%)',
    accentColor: '#fbbf24',
    icon: '☀️',
    label: 'Musim Panas',
    glassTint: 'rgba(255, 251, 235, 0.75)',
  },
  autumn: {
    backgroundGradient: 'linear-gradient(135deg, #fff8f0 0%, #fef3e0 50%, #fcfaf2 100%)',
    accentColor: '#f97316',
    icon: '🍂',
    label: 'Musim Gugur',
    glassTint: 'rgba(254, 243, 224, 0.75)',
  },
  winter: {
    backgroundGradient: 'linear-gradient(135deg, #e0f7fa 0%, #e1f5fe 50%, #ffffff 100%)',
    accentColor: '#7dd3fc',
    icon: '❄️',
    label: 'Musim Salju',
    glassTint: 'rgba(225, 245, 254, 0.75)',
  },
};

interface SeasonContextValue {
  season: Season;
  setSeason: (s: Season) => void;
  theme: SeasonTheme;
}

const SeasonContext = createContext<SeasonContextValue | undefined>(undefined);

const STORAGE_KEY = 'streakup-season';

/** Auto-detect season from current month (Northern Hemisphere) */
function detectSeasonFromDate(): Season {
  const month = new Date().getMonth() + 1; // 1–12
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'autumn';
  return 'winter';
}

export function SeasonProvider({ children }: { children: React.ReactNode }) {
  const [season, setSeasonState] = useState<Season>('winter');
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on client
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Season | null;
    const valid: Season[] = ['spring', 'summer', 'autumn', 'winter'];
    if (saved && valid.includes(saved)) {
      setSeasonState(saved);
    } else {
      setSeasonState(detectSeasonFromDate());
    }
    setHydrated(true);
  }, []);

  const setSeason = useCallback((s: Season) => {
    setSeasonState(s);
    localStorage.setItem(STORAGE_KEY, s);
  }, []);

  const value = useMemo<SeasonContextValue>(
    () => ({ season, setSeason, theme: SEASON_THEMES[season] }),
    [season, setSeason]
  );

  // Avoid SSR mismatch — render with default until hydrated
  if (!hydrated) {
    return (
      <SeasonContext.Provider value={{ season: 'winter', setSeason, theme: SEASON_THEMES['winter'] }}>
        {children}
      </SeasonContext.Provider>
    );
  }

  return (
    <SeasonContext.Provider value={value}>
      {children}
    </SeasonContext.Provider>
  );
}

export function useSeason() {
  const ctx = useContext(SeasonContext);
  if (!ctx) throw new Error('useSeason must be used inside <SeasonProvider>');
  return ctx;
}
