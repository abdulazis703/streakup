'use client';

/**
 * SeasonSelector — Floating, beautiful Disney Cartoon season switcher widget.
 *
 * Sits in the bottom-right corner of the viewport (above mobile bottom nav).
 * Features a glossy glassmorphism styling, bouncy cartoon hover effects,
 * and allows instant season toggling.
 */

import React from 'react';
import { useSeason, Season, SEASON_THEMES } from '@/lib/context/SeasonContext';

const SEASONS: Season[] = ['spring', 'summer', 'autumn', 'winter'];

export default function SeasonSelector() {
  const { season, setSeason } = useSeason();

  return (
    <div
      className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-[99] pointer-events-auto select-none"
      style={{ filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.12))' }}
    >
      <div className="season-selector-float bg-white/55 backdrop-blur-lg border border-white/60 rounded-2xl p-1.5 flex flex-col items-center gap-1.5 shadow-[inset_0_2px_4px_rgba(255,255,255,0.8)]">
        <div className="flex gap-1">
          {SEASONS.map((s) => {
            const theme = SEASON_THEMES[s];
            const isActive = season === s;

            return (
              <button
                key={s}
                id={`season-selector-btn-${s}`}
                onClick={() => setSeason(s)}
                title={theme.label}
                aria-label={`Ganti ke ${theme.label}`}
                aria-pressed={isActive}
                className={`
                  relative w-10 h-10 rounded-xl flex items-center justify-center
                  transition-all duration-300 ease-out cursor-pointer active:scale-95
                  ${isActive
                    ? 'scale-110 shadow-lg border border-white/80'
                    : 'opacity-60 hover:opacity-100 hover:scale-105 hover:bg-white/30'
                  }
                `}
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, ${theme.glassTint}, #ffffff)`
                    : 'transparent',
                  boxShadow: isActive
                    ? `0 4px 12px ${theme.accentColor}50, inset 0 2px 3px rgba(255,255,255,0.9)`
                    : undefined,
                }}
              >
                <span
                  className="text-lg leading-none transition-transform"
                  style={{
                    filter: isActive
                      ? `drop-shadow(0 2px 6px ${theme.accentColor}AA)`
                      : 'none',
                    transform: isActive ? 'scale(1.15) rotate(-5deg)' : 'none',
                  }}
                >
                  {theme.icon}
                </span>

                {/* Subtle active indicator dot */}
                {isActive && (
                  <span
                    className="absolute bottom-1 w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: theme.accentColor }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
