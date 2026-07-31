'use client';

/**
 * SeasonSwitcher — Compact UI widget to toggle the active cartoon season.
 * Designed to sit inside the Sidebar footer or Topbar.
 */

import { useSeason, Season, SEASON_THEMES } from '@/lib/context/SeasonContext';

const SEASONS: Season[] = ['spring', 'summer', 'autumn', 'winter'];

interface SeasonSwitcherProps {
  isCollapsed?: boolean;
}

export default function SeasonSwitcher({ isCollapsed }: SeasonSwitcherProps) {
  const { season, setSeason } = useSeason();

  if (isCollapsed) {
    const activeTheme = SEASON_THEMES[season];
    const handleCycle = () => {
      const idx = SEASONS.indexOf(season);
      setSeason(SEASONS[(idx + 1) % SEASONS.length]);
    };

    return (
      <div className="flex justify-center items-center w-full mt-4">
        <button
          onClick={handleCycle}
          title={activeTheme.label}
          aria-label={`Ganti tema, saat ini ${activeTheme.label}`}
          className="w-10 h-10 rounded-xl bg-white shadow-md ring-2 ring-white/80 flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{
            background: `linear-gradient(135deg, ${activeTheme.glassTint}, white)`,
            boxShadow: `0 2px 8px ${activeTheme.accentColor}40`,
          }}
        >
          <span className="text-lg leading-none" style={{ filter: `drop-shadow(0 0 4px ${activeTheme.accentColor})` }}>
            {activeTheme.icon}
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-on-surface-variant/70 px-1">
        Tema Musim
      </p>
      <div className="flex gap-1 p-1 bg-white/40 backdrop-blur-sm rounded-xl border border-white/50 shadow-inner">
        {SEASONS.map((s) => {
          const theme = SEASON_THEMES[s];
          const isActive = season === s;
          return (
            <button
              key={s}
              id={`season-switcher-${s}`}
              onClick={() => setSeason(s)}
              title={theme.label}
              aria-label={`Ganti ke ${theme.label}`}
              aria-pressed={isActive}
              className={`
                flex-1 h-8 rounded-lg text-base transition-all duration-300
                flex items-center justify-center
                ${isActive
                  ? 'bg-white shadow-md scale-110 ring-2 ring-white/80'
                  : 'opacity-50 hover:opacity-80 hover:scale-105'
                }
              `}
              style={{
                background: isActive
                  ? `linear-gradient(135deg, ${theme.glassTint}, white)`
                  : undefined,
                boxShadow: isActive
                  ? `0 2px 8px ${theme.accentColor}40`
                  : undefined,
              }}
            >
              <span
                className="text-sm leading-none"
                style={{
                  filter: isActive
                    ? `drop-shadow(0 0 4px ${theme.accentColor})`
                    : undefined,
                  transform: isActive ? 'scale(1.1)' : undefined,
                  display: 'inline-block',
                }}
              >
                {theme.icon}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
