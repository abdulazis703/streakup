'use client';

/**
 * CartoonSeasonalOverlay — Disney Cartoon Modern Seasonal Effects System
 *
 * Provides a fully boosted, premium visual experience for all four seasons:
 * - ❄️ Winter: 3-tier wobbly snow, thick glossy snow piles on Sidebar & Topbar, snowy pine trees, cute snowman.
 * - 🌸 Spring: 3-tier cherry blossom petal storm, leafy vine wraps on borders, puffy sakura trees.
 * - ☀️ Summer: 3-tier sparkle stars & green leaves, sun flares top corner, tropical palm leaves.
 * - 🍂 Autumn: 3-tier spinning maple/oak leaves, leaf piles on borders, cozy cartoon pumpkins & oak trees.
 *
 * All backgrounds have rich gradients and radial overlays.
 * All interactive overlays use pointer-events-none.
 */

import React, { useMemo } from 'react';
import { useSeason, Season } from '@/lib/context/SeasonContext';
import { useSettings } from '@/lib/context/SettingsContext';

// ─────────────────────────────────────────────────────────────────────────────
// Seeded random — stable across SSR & CSR hydration
// ─────────────────────────────────────────────────────────────────────────────

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// ❄️ WINTER PARTICLE SYSTEM
// ─────────────────────────────────────────────────────────────────────────────

interface SnowParticle {
  id: number;
  symbol: string;
  color: string;
  size: number;
  left: number;
  delay: number;
  duration: number;
  opacity: number;
  tier: 'fast' | 'wobbly' | 'slow';
  blur: number;
}

const WINTER_SYMBOLS = {
  fast:   ['❄', '❅', '·', '•', '✦'],
  wobbly: ['❆', '❄', '❅', '✧', '⋆'],
  slow:   ['❄', '❅', '❆', '❄', '✦'],
};

const WINTER_COLORS = ['#bae6fd', '#e0f2fe', '#dbeafe', '#ffffff', '#eff6ff', '#cffafe'];

function WinterParticleField() {
  const particles = useMemo<SnowParticle[]>(() => {
    const r = seededRandom(0x1111);
    const result: SnowParticle[] = [];

    // Tier 1 — Fast small (front)
    for (let i = 0; i < 14; i++) {
      result.push({
        id: i,
        symbol: WINTER_SYMBOLS.fast[Math.floor(r() * WINTER_SYMBOLS.fast.length)],
        color: WINTER_COLORS[Math.floor(r() * WINTER_COLORS.length)],
        size: 10 + r() * 8,
        left: r() * 100,
        delay: r() * 8,
        duration: 5 + r() * 4,
        opacity: 0.75 + r() * 0.20,
        tier: 'fast',
        blur: 0,
      });
    }

    // Tier 2 — Wobbly medium (mid)
    for (let i = 14; i < 28; i++) {
      result.push({
        id: i,
        symbol: WINTER_SYMBOLS.wobbly[Math.floor(r() * WINTER_SYMBOLS.wobbly.length)],
        color: WINTER_COLORS[Math.floor(r() * WINTER_COLORS.length)],
        size: 18 + r() * 12,
        left: r() * 100,
        delay: r() * 12,
        duration: 9 + r() * 5,
        opacity: 0.70 + r() * 0.25,
        tier: 'wobbly',
        blur: 0,
      });
    }

    // Tier 3 — Slow fluffy big (back)
    for (let i = 28; i < 38; i++) {
      result.push({
        id: i,
        symbol: WINTER_SYMBOLS.slow[Math.floor(r() * WINTER_SYMBOLS.slow.length)],
        color: WINTER_COLORS[Math.floor(r() * WINTER_COLORS.length)],
        size: 28 + r() * 18,
        left: r() * 100,
        delay: r() * 16,
        duration: 14 + r() * 8,
        opacity: 0.35 + r() * 0.25,
        tier: 'slow',
        blur: 0.8 + r() * 1.2,
      });
    }

    return result;
  }, []);

  const tierClass = {
    fast:   'season-particle-snow-fast',
    wobbly: 'season-particle-snow-wobbly',
    slow:   'season-particle-snow-slow',
  };

  return (
    <>
      {particles.map((p) => (
        <span
          key={p.id}
          aria-hidden="true"
          className={`pointer-events-none select-none ${tierClass[p.tier]}`}
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            color: p.color,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationFillMode: 'both',
            filter: p.blur > 0 ? `blur(${p.blur}px)` : undefined,
            willChange: 'transform, opacity',
          }}
        >
          {p.symbol}
        </span>
      ))}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ❄️ WINTER DECORATORS
// ─────────────────────────────────────────────────────────────────────────────

function SnowPileSidebar() {
  return (
    <div
      aria-hidden="true"
      className="fixed left-0 top-0 w-72 pointer-events-none z-[38]"
      style={{
        filter: 'drop-shadow(0 6px 16px rgba(125,211,252,0.50))',
        maskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)',
      }}
    >
      <svg viewBox="0 0 288 44" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="snowGradSidebar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity="1.00" />
            <stop offset="45%"  stopColor="#e0f7fa" stopOpacity="0.96" />
            <stop offset="100%" stopColor="#b3e5fc" stopOpacity="0.55" />
          </linearGradient>
          <filter id="snowSoftSidebar" x="-5%" y="-5%" width="110%" height="130%">
            <feGaussianBlur stdDeviation="0.8" />
          </filter>
        </defs>
        {/* Main thick snow body */}
        <path
          d="M0,44 Q8,14 22,20 Q40,6 58,16 Q76,4 92,14 Q108,22 124,10 Q140,0 156,12 Q172,22 188,10 Q204,2 220,14 Q236,8 252,16 Q268,6 278,14 Q284,8 288,20 L288,44 Z"
          fill="url(#snowGradSidebar)"
          filter="url(#snowSoftSidebar)"
        />
        {/* Glossy top surface highlight */}
        <path
          d="M0,18 Q8,6 22,12 Q40,0 58,10 Q76,0 92,8 Q108,16 124,4 Q140,-4 156,6 Q172,16 188,4 Q204,-2 220,8 Q236,2 252,10 Q268,0 278,8 Q284,4 288,14"
          fill="none"
          stroke="rgba(255,255,255,0.95)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Fat cartoon snow bumps */}
        <ellipse cx="30"  cy="12" rx="12" ry="8"  fill="white" opacity="0.90" />
        <ellipse cx="80"  cy="7"  rx="10" ry="7"  fill="white" opacity="0.85" />
        <ellipse cx="144" cy="8"  rx="14" ry="9"  fill="white" opacity="0.92" />
        <ellipse cx="205" cy="7"  rx="11" ry="7"  fill="white" opacity="0.88" />
        <ellipse cx="260" cy="10" rx="12" ry="8"  fill="white" opacity="0.90" />
        {/* Tiny sparkle dots */}
        <circle cx="55"  cy="5"  r="2.5" fill="#e0f7fa" opacity="0.80" />
        <circle cx="115" cy="3"  r="2"   fill="#bae6fd" opacity="0.75" />
        <circle cx="175" cy="4"  r="2.5" fill="#e0f7fa" opacity="0.80" />
        <circle cx="235" cy="5"  r="2"   fill="#bae6fd" opacity="0.75" />
      </svg>
    </div>
  );
}

function SnowPileTopbar() {
  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 pointer-events-none z-[39]"
      style={{
        filter: 'drop-shadow(0 6px 14px rgba(125,211,252,0.45))',
        maskImage: 'linear-gradient(to bottom, black 45%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 45%, transparent 100%)',
      }}
    >
      <svg
        viewBox="0 0 1200 38"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        preserveAspectRatio="none"
        style={{ height: '36px' }}
      >
        <defs>
          <linearGradient id="snowGradTop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity="1.00" />
            <stop offset="50%"  stopColor="#e0f7fa" stopOpacity="0.94" />
            <stop offset="100%" stopColor="#b3e5fc" stopOpacity="0.45" />
          </linearGradient>
          <filter id="snowSoftTop" x="-2%" y="-5%" width="104%" height="130%">
            <feGaussianBlur stdDeviation="0.7" />
          </filter>
        </defs>
        {/* Main thick snow body */}
        <path
          d="M0,38 Q40,10 90,18 Q150,4 220,16 Q290,26 360,10 Q430,0 500,14 Q570,24 640,8 Q710,0 780,14 Q850,24 920,10 Q990,0 1060,14 Q1120,22 1160,12 Q1185,6 1200,16 L1200,38 Z"
          fill="url(#snowGradTop)"
          filter="url(#snowSoftTop)"
        />
        {/* Glossy highlight stripe */}
        <path
          d="M0,14 Q40,4 90,12 Q150,0 220,10 Q290,20 360,6 Q430,-4 500,8 Q570,18 640,4 Q710,-4 780,8 Q850,18 920,4 Q990,-4 1060,8 Q1120,16 1160,8 Q1185,4 1200,10"
          fill="none"
          stroke="rgba(255,255,255,0.95)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Fat rounded snow bumps along topbar */}
        <ellipse cx="70"   cy="11" rx="18" ry="9"  fill="white" opacity="0.85" />
        <ellipse cx="190"  cy="8"  rx="16" ry="8"  fill="white" opacity="0.88" />
        <ellipse cx="340"  cy="6"  rx="20" ry="10" fill="white" opacity="0.90" />
        <ellipse cx="500"  cy="8"  rx="17" ry="8"  fill="white" opacity="0.86" />
        <ellipse cx="650"  cy="5"  rx="19" ry="10" fill="white" opacity="0.92" />
        <ellipse cx="800"  cy="8"  rx="16" ry="8"  fill="white" opacity="0.85" />
        <ellipse cx="950"  cy="6"  rx="18" ry="9"  fill="white" opacity="0.88" />
        <ellipse cx="1100" cy="9"  rx="17" ry="8"  fill="white" opacity="0.86" />
      </svg>
    </div>
  );
}

function PineTreeLeft() {
  return (
    <div
      aria-hidden="true"
      className="fixed bottom-0 left-0 pointer-events-none z-[4]"
      style={{ opacity: 0.38 }}
    >
      <svg width="240" height="420" viewBox="0 0 240 420" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pineGradL" x1="0.2" y1="0" x2="0.8" y2="1">
            <stop offset="0%"   stopColor="#22c55e" />
            <stop offset="45%"  stopColor="#16a34a" />
            <stop offset="100%" stopColor="#14532d" />
          </linearGradient>
          <linearGradient id="pineShadL" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#14532d" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#14532d" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="snowCapL" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#ffffff" />
            <stop offset="70%"  stopColor="#e0f7fa" />
            <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Trunk — cartoon chunky */}
        <rect x="100" y="365" width="40" height="55" rx="8" fill="#92400e" />
        <rect x="108" y="365" width="12" height="55" rx="4" fill="#b45309" opacity="0.5" />

        {/* Bottom tier — wide, chunky */}
        <polygon points="120,248 10,380 230,380" fill="url(#pineGradL)" />
        <polygon points="120,248 10,380 65,380"  fill="url(#pineShadL)" />
        {/* Snow cap bottom */}
        <path d="M10,380 Q40,358 80,364 Q120,358 160,364 Q200,358 230,380"
              fill="url(#snowCapL)" opacity="0.95" />
        <ellipse cx="50"  cy="368" rx="20" ry="10" fill="white" opacity="0.85" />
        <ellipse cx="120" cy="362" rx="24" ry="12" fill="white" opacity="0.90" />
        <ellipse cx="192" cy="368" rx="18" ry="9"  fill="white" opacity="0.85" />

        {/* Middle tier */}
        <polygon points="120,158 22,290 218,290" fill="url(#pineGradL)" />
        <polygon points="120,158 22,290 72,290"  fill="url(#pineShadL)" />
        {/* Snow cap middle */}
        <path d="M22,290 Q55,272 90,278 Q120,270 150,278 Q185,272 218,290"
              fill="url(#snowCapL)" opacity="0.92" />
        <ellipse cx="60"  cy="280" rx="18" ry="9"  fill="white" opacity="0.82" />
        <ellipse cx="120" cy="274" rx="20" ry="10" fill="white" opacity="0.88" />
        <ellipse cx="178" cy="280" rx="16" ry="8"  fill="white" opacity="0.82" />

        {/* Upper tier */}
        <polygon points="120,80 38,196 202,196"  fill="url(#pineGradL)" />
        <polygon points="120,80 38,196 80,196"   fill="url(#pineShadL)" />
        {/* Snow cap upper */}
        <path d="M38,196 Q70,180 100,186 Q120,178 140,186 Q170,180 202,196"
              fill="url(#snowCapL)" opacity="0.90" />
        <ellipse cx="75"  cy="188" rx="14" ry="7" fill="white" opacity="0.80" />
        <ellipse cx="120" cy="182" rx="16" ry="8" fill="white" opacity="0.86" />
        <ellipse cx="165" cy="188" rx="14" ry="7" fill="white" opacity="0.80" />

        {/* Tip */}
        <polygon points="120,14 76,110 164,110" fill="url(#pineGradL)" />
        {/* Snow tip cap */}
        <ellipse cx="120" cy="20"  rx="16" ry="18" fill="white" opacity="0.92" />
        <ellipse cx="120" cy="14"  rx="10" ry="10" fill="white" opacity="0.98" />

        {/* Hanging snow drips */}
        <ellipse cx="30"  cy="375" rx="6"  ry="10" fill="white" opacity="0.60" />
        <ellipse cx="210" cy="375" rx="5"  ry="8"  fill="white" opacity="0.60" />
        <ellipse cx="28"  cy="285" rx="5"  ry="8"  fill="white" opacity="0.55" />
        <ellipse cx="212" cy="285" rx="5"  ry="7"  fill="white" opacity="0.55" />
      </svg>
    </div>
  );
}

function PineTreeRight() {
  return (
    <div
      aria-hidden="true"
      className="fixed bottom-0 right-0 pointer-events-none z-[4]"
      style={{ opacity: 0.38 }}
    >
      <svg width="260" height="450" viewBox="0 0 260 450" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pineGradR" x1="0.8" y1="0" x2="0.2" y2="1">
            <stop offset="0%"   stopColor="#22c55e" />
            <stop offset="45%"  stopColor="#16a34a" />
            <stop offset="100%" stopColor="#14532d" />
          </linearGradient>
          <linearGradient id="pineShadR" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%"   stopColor="#14532d" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#14532d" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="snowCapR" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#ffffff" />
            <stop offset="70%"  stopColor="#e0f7fa" />
            <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Trunk */}
        <rect x="110" y="395" width="40" height="55" rx="8" fill="#92400e" />
        <rect x="118" y="395" width="12" height="55" rx="4" fill="#b45309" opacity="0.5" />

        {/* Bottom tier */}
        <polygon points="130,268 5,410 255,410" fill="url(#pineGradR)" />
        <polygon points="130,268 195,410 255,410" fill="url(#pineShadR)" />
        <path d="M5,410 Q45,388 90,394 Q130,386 170,394 Q215,388 255,410"
              fill="url(#snowCapR)" opacity="0.95" />
        <ellipse cx="50"  cy="396" rx="22" ry="11" fill="white" opacity="0.88" />
        <ellipse cx="130" cy="390" rx="26" ry="13" fill="white" opacity="0.92" />
        <ellipse cx="208" cy="396" rx="20" ry="10" fill="white" opacity="0.86" />

        {/* Middle tier */}
        <polygon points="130,170 20,312 240,312"  fill="url(#pineGradR)" />
        <polygon points="130,170 190,312 240,312" fill="url(#pineShadR)" />
        <path d="M20,312 Q55,292 94,300 Q130,290 166,300 Q205,292 240,312"
              fill="url(#snowCapR)" opacity="0.92" />
        <ellipse cx="58"  cy="300" rx="18" ry="9"  fill="white" opacity="0.84" />
        <ellipse cx="130" cy="294" rx="22" ry="11" fill="white" opacity="0.90" />
        <ellipse cx="200" cy="300" rx="18" ry="9"  fill="white" opacity="0.84" />

        {/* Upper tier */}
        <polygon points="130,88 44,210 216,210"  fill="url(#pineGradR)" />
        <polygon points="130,88 180,210 216,210" fill="url(#pineShadR)" />
        <path d="M44,210 Q76,193 106,199 Q130,190 154,199 Q184,193 216,210"
              fill="url(#snowCapR)" opacity="0.90" />
        <ellipse cx="80"  cy="201" rx="14" ry="7" fill="white" opacity="0.82" />
        <ellipse cx="130" cy="194" rx="17" ry="8" fill="white" opacity="0.87" />
        <ellipse cx="178" cy="201" rx="14" ry="7" fill="white" opacity="0.82" />

        {/* Tip */}
        <polygon points="130,18 84,116 176,116" fill="url(#pineGradR)" />
        <ellipse cx="130" cy="24" rx="18" ry="20" fill="white" opacity="0.92" />
        <ellipse cx="130" cy="16" rx="11" ry="11" fill="white" opacity="0.98" />

        {/* Drips */}
        <ellipse cx="18"  cy="404" rx="6"  ry="10" fill="white" opacity="0.58" />
        <ellipse cx="242" cy="404" rx="6"  ry="9"  fill="white" opacity="0.58" />
        <ellipse cx="22"  cy="307" rx="5"  ry="8"  fill="white" opacity="0.52" />
        <ellipse cx="238" cy="307" rx="5"  ry="8"  fill="white" opacity="0.52" />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 🌸 SPRING PARTICLE SYSTEM
// ─────────────────────────────────────────────────────────────────────────────

interface SpringParticle {
  id: number;
  symbol: string;
  color: string;
  size: number;
  left: number;
  delay: number;
  duration: number;
  opacity: number;
  tier: 'fast' | 'wobbly' | 'slow';
  blur: number;
}

const SPRING_SYMBOLS = {
  fast:   ['🌸', '✿', '•', '🌸'],
  wobbly: ['🌸', '🌺', '❀', '🌸'],
  slow:   ['🌸', '🌺', '🌼', '🌸'],
};

const SPRING_COLORS = ['#fda4af', '#fb7185', '#f9a8d4', '#fbcfe8', '#fce7f3', '#ffe4e6'];

function SpringParticleField() {
  const particles = useMemo<SpringParticle[]>(() => {
    const r = seededRandom(0x2222);
    const result: SpringParticle[] = [];

    // Tier 1 — Fast small petals
    for (let i = 0; i < 14; i++) {
      result.push({
        id: i,
        symbol: SPRING_SYMBOLS.fast[Math.floor(r() * SPRING_SYMBOLS.fast.length)],
        color: SPRING_COLORS[Math.floor(r() * SPRING_COLORS.length)],
        size: 10 + r() * 6,
        left: r() * 100,
        delay: r() * 8,
        duration: 6 + r() * 4,
        opacity: 0.80 + r() * 0.15,
        tier: 'fast',
        blur: 0,
      });
    }

    // Tier 2 — Wobbly medium petals
    for (let i = 14; i < 28; i++) {
      result.push({
        id: i,
        symbol: SPRING_SYMBOLS.wobbly[Math.floor(r() * SPRING_SYMBOLS.wobbly.length)],
        color: SPRING_COLORS[Math.floor(r() * SPRING_COLORS.length)],
        size: 16 + r() * 8,
        left: r() * 100,
        delay: r() * 12,
        duration: 10 + r() * 6,
        opacity: 0.70 + r() * 0.25,
        tier: 'wobbly',
        blur: 0,
      });
    }

    // Tier 3 — Slow large dreamy petals
    for (let i = 28; i < 36; i++) {
      result.push({
        id: i,
        symbol: SPRING_SYMBOLS.slow[Math.floor(r() * SPRING_SYMBOLS.slow.length)],
        color: SPRING_COLORS[Math.floor(r() * SPRING_COLORS.length)],
        size: 24 + r() * 12,
        left: r() * 100,
        delay: r() * 16,
        duration: 16 + r() * 8,
        opacity: 0.38 + r() * 0.22,
        tier: 'slow',
        blur: 0.6 + r() * 1.0,
      });
    }

    return result;
  }, []);

  const tierClass = {
    fast:   'season-particle-petal-fast',
    wobbly: 'season-particle-petal-wobbly',
    slow:   'season-particle-petal-slow',
  };

  return (
    <>
      {particles.map((p) => (
        <span
          key={p.id}
          aria-hidden="true"
          className={`pointer-events-none select-none ${tierClass[p.tier]}`}
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            color: p.color,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationFillMode: 'both',
            filter: p.blur > 0 ? `blur(${p.blur}px)` : undefined,
            willChange: 'transform, opacity',
          }}
        >
          {p.symbol}
        </span>
      ))}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ☀️ SUMMER PARTICLE SYSTEM
// ─────────────────────────────────────────────────────────────────────────────

interface SummerParticle {
  id: number;
  symbol: string;
  color: string;
  size: number;
  left: number;
  delay: number;
  duration: number;
  opacity: number;
  tier: 'fast' | 'wobbly' | 'slow';
  blur: number;
}

const SUMMER_SYMBOLS = {
  fast:   ['✨', '✦', '✧', '★'],
  wobbly: ['🌿', '🍃', '🌿', '🍃'],
  slow:   ['✨', '✧', '✦', '✨'],
};

const SUMMER_COLORS = ['#fde047', '#fbbf24', '#fef08a', '#4ade80', '#86efac', '#bef264', '#ffffff'];

function SummerParticleField() {
  const particles = useMemo<SummerParticle[]>(() => {
    const r = seededRandom(0x3333);
    const result: SummerParticle[] = [];

    // Tier 1 — Sparkle twinkle floating UP
    for (let i = 0; i < 12; i++) {
      result.push({
        id: i,
        symbol: SUMMER_SYMBOLS.fast[Math.floor(r() * SUMMER_SYMBOLS.fast.length)],
        color: SUMMER_COLORS[Math.floor(r() * SUMMER_COLORS.length)],
        size: 8 + r() * 6,
        left: r() * 100,
        delay: r() * 6,
        duration: 5 + r() * 4,
        opacity: 0.78 + r() * 0.15,
        tier: 'fast',
        blur: 0,
      });
    }

    // Tier 2 — Green leaves falling DOWN
    for (let i = 12; i < 24; i++) {
      result.push({
        id: i,
        symbol: SUMMER_SYMBOLS.wobbly[Math.floor(r() * SUMMER_SYMBOLS.wobbly.length)],
        color: SUMMER_COLORS[Math.floor(r() * SUMMER_COLORS.length)],
        size: 14 + r() * 8,
        left: r() * 100,
        delay: r() * 8,
        duration: 8 + r() * 5,
        opacity: 0.70 + r() * 0.20,
        tier: 'wobbly',
        blur: 0,
      });
    }

    // Tier 3 — Large sparkles drifting UP slowly
    for (let i = 24; i < 32; i++) {
      result.push({
        id: i,
        symbol: SUMMER_SYMBOLS.slow[Math.floor(r() * SUMMER_SYMBOLS.slow.length)],
        color: SUMMER_COLORS[Math.floor(r() * SUMMER_COLORS.length)],
        size: 20 + r() * 14,
        left: r() * 100,
        delay: r() * 10,
        duration: 11 + r() * 7,
        opacity: 0.35 + r() * 0.25,
        tier: 'slow',
        blur: 0.5 + r() * 1.0,
      });
    }

    return result;
  }, []);

  const tierClass = {
    fast:   'season-particle-sparkle-fast',
    wobbly: 'season-particle-leaf-float',
    slow:   'season-particle-sparkle-slow',
  };

  return (
    <>
      {particles.map((p) => (
        <span
          key={p.id}
          aria-hidden="true"
          className={`pointer-events-none select-none ${tierClass[p.tier]}`}
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            color: p.color,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationFillMode: 'both',
            filter: p.blur > 0 ? `blur(${p.blur}px)` : undefined,
            willChange: 'transform, opacity',
          }}
        >
          {p.symbol}
        </span>
      ))}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 🍂 AUTUMN PARTICLE SYSTEM
// ─────────────────────────────────────────────────────────────────────────────

interface AutumnParticle {
  id: number;
  symbol: string;
  color: string;
  size: number;
  left: number;
  delay: number;
  duration: number;
  opacity: number;
  tier: 'fast' | 'wobbly' | 'slow';
  blur: number;
}

const AUTUMN_SYMBOLS = {
  fast:   ['🍁', '🍂', '•', '🍂'],
  wobbly: ['🍁', '🍂', '🍁', '🍂'],
  slow:   ['🍁', '🍂', '🍁', '🍁'],
};

const AUTUMN_COLORS = ['#fb923c', '#f97316', '#ef4444', '#dc2626', '#fbbf24', '#b45309', '#ea580c'];

function AutumnParticleField() {
  const particles = useMemo<AutumnParticle[]>(() => {
    const r = seededRandom(0x4444);
    const result: AutumnParticle[] = [];

    // Tier 1 — Fast leaves
    for (let i = 0; i < 14; i++) {
      result.push({
        id: i,
        symbol: AUTUMN_SYMBOLS.fast[Math.floor(r() * AUTUMN_SYMBOLS.fast.length)],
        color: AUTUMN_COLORS[Math.floor(r() * AUTUMN_COLORS.length)],
        size: 12 + r() * 6,
        left: r() * 100,
        delay: r() * 8,
        duration: 5 + r() * 4,
        opacity: 0.82 + r() * 0.12,
        tier: 'fast',
        blur: 0,
      });
    }

    // Tier 2 — Wobbly spiral leaves
    for (let i = 14; i < 28; i++) {
      result.push({
        id: i,
        symbol: AUTUMN_SYMBOLS.wobbly[Math.floor(r() * AUTUMN_SYMBOLS.wobbly.length)],
        color: AUTUMN_COLORS[Math.floor(r() * AUTUMN_COLORS.length)],
        size: 18 + r() * 10,
        left: r() * 100,
        delay: r() * 12,
        duration: 9 + r() * 6,
        opacity: 0.75 + r() * 0.20,
        tier: 'wobbly',
        blur: 0,
      });
    }

    // Tier 3 — Slow large oak leaves
    for (let i = 28; i < 36; i++) {
      result.push({
        id: i,
        symbol: AUTUMN_SYMBOLS.slow[Math.floor(r() * AUTUMN_SYMBOLS.slow.length)],
        color: AUTUMN_COLORS[Math.floor(r() * AUTUMN_COLORS.length)],
        size: 28 + r() * 12,
        left: r() * 100,
        delay: r() * 16,
        duration: 15 + r() * 7,
        opacity: 0.40 + r() * 0.25,
        tier: 'slow',
        blur: 0.6 + r() * 1.2,
      });
    }

    return result;
  }, []);

  const tierClass = {
    fast:   'season-particle-leaf-fast',
    wobbly: 'season-particle-leaf-wobbly',
    slow:   'season-particle-leaf-slow',
  };

  return (
    <>
      {particles.map((p) => (
        <span
          key={p.id}
          aria-hidden="true"
          className={`pointer-events-none select-none ${tierClass[p.tier]}`}
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            color: p.color,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationFillMode: 'both',
            filter: p.blur > 0 ? `blur(${p.blur}px)` : undefined,
            willChange: 'transform, opacity',
          }}
        >
          {p.symbol}
        </span>
      ))}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 🌸 SPRING DECORATORS — Vines and Sakura Trees
// ─────────────────────────────────────────────────────────────────────────────

function SpringVinesSidebar() {
  return (
    <div
      aria-hidden="true"
      className="fixed left-0 top-0 w-72 pointer-events-none z-[38]"
      style={{
        filter: 'drop-shadow(0 4px 10px rgba(244,143,177,0.4))',
        maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
      }}
    >
      <svg viewBox="0 0 288 32" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="springVineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="50%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#86efac" />
          </linearGradient>
        </defs>
        {/* Vine stem */}
        <path
          d="M0,8 Q30,18 70,6 Q110,-4 150,12 Q190,26 230,8 Q260,-2 288,14"
          fill="none"
          stroke="url(#springVineGrad)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Leaves */}
        <ellipse cx="25" cy="11" rx="8" ry="4" fill="#22c55e" transform="rotate(-15 25 11)" />
        <ellipse cx="90" cy="5" rx="7" ry="3.5" fill="#4ade80" transform="rotate(20 90 5)" />
        <ellipse cx="140" cy="10" rx="8" ry="4" fill="#22c55e" transform="rotate(-30 140 10)" />
        <ellipse cx="210" cy="14" rx="9" ry="4.5" fill="#86efac" transform="rotate(15 210 14)" />
        <ellipse cx="270" cy="8" rx="7" ry="3.5" fill="#22c55e" transform="rotate(-10 270 8)" />

        {/* Small Sakura Flowers */}
        <circle cx="50" cy="10" r="5" fill="#fda4af" />
        <circle cx="50" cy="10" r="2" fill="#fff" />
        
        <circle cx="115" cy="8" r="6" fill="#f9a8d4" />
        <circle cx="115" cy="8" r="2.5" fill="#fff" />

        <circle cx="175" cy="12" r="5.5" fill="#fda4af" />
        <circle cx="175" cy="12" r="2" fill="#fff" />

        <circle cx="245" cy="7" r="5" fill="#fb7185" />
        <circle cx="245" cy="7" r="1.8" fill="#fff" />
      </svg>
    </div>
  );
}

function SpringVinesTopbar() {
  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 pointer-events-none z-[39]"
      style={{
        filter: 'drop-shadow(0 4px 8px rgba(244,143,177,0.3))',
        maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
      }}
    >
      <svg
        viewBox="0 0 1200 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        preserveAspectRatio="none"
        style={{ height: '22px' }}
      >
        <path
          d="M0,6 Q100,16 200,6 Q300,-4 400,10 Q500,20 600,6 Q700,-4 800,10 Q900,20 1000,6 Q1100,-4 1200,12"
          fill="none"
          stroke="#4ade80"
          strokeWidth="3"
        />
        {/* Repeating Sakura petals wrapping */}
        {Array.from({ length: 12 }, (_, i) => (
          <g key={i} transform={`translate(${i * 100 + 40}, 8)`}>
            <circle cx="0" cy="0" r="5" fill="#fda4af" />
            <circle cx="0" cy="0" r="1.5" fill="#fff" />
            <ellipse cx="6" cy="4" rx="4" ry="2" fill="#22c55e" transform="rotate(30)" />
          </g>
        ))}
      </svg>
    </div>
  );
}

function SakuraTreeLeft() {
  return (
    <div
      aria-hidden="true"
      className="fixed bottom-0 left-0 pointer-events-none z-[4]"
      style={{ opacity: 0.35 }}
    >
      <svg width="240" height="380" viewBox="0 0 240 380" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sakuraTrunk" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#78350f" /><stop offset="100%" stopColor="#451a03" />
          </linearGradient>
        </defs>
        {/* Trunk */}
        <path d="M70,380 Q95,300 90,240 Q85,180 110,130" stroke="url(#sakuraTrunk)" strokeWidth="16" fill="none" strokeLinecap="round" />
        <path d="M90,240 Q60,200 45,160" stroke="url(#sakuraTrunk)" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M100,180 Q130,150 150,110" stroke="url(#sakuraTrunk)" strokeWidth="6" fill="none" strokeLinecap="round" />

        {/* Puffy cartoon blossoms */}
        <circle cx="110" cy="110" r="48" fill="#fda4af" opacity="0.9" />
        <circle cx="130" cy="90" r="40" fill="#f9a8d4" opacity="0.85" />
        <circle cx="75" cy="130" r="36" fill="#fbcfe8" opacity="0.9" />
        <circle cx="45" cy="155" r="32" fill="#fda4af" opacity="0.88" />
        <circle cx="155" cy="100" r="35" fill="#fbcfe8" opacity="0.85" />

        {/* Highlights */}
        <circle cx="100" cy="95" r="20" fill="#ffe4e6" opacity="0.6" />
        <circle cx="135" cy="80" r="18" fill="#ffe4e6" opacity="0.5" />
      </svg>
    </div>
  );
}

function SakuraFlowerRight() {
  return (
    <div
      aria-hidden="true"
      className="fixed bottom-0 right-0 pointer-events-none z-[4]"
      style={{ opacity: 0.35 }}
    >
      <svg width="220" height="340" viewBox="0 0 220 340" xmlns="http://www.w3.org/2000/svg">
        <path d="M150,340 Q130,270 135,210 Q140,160 120,120" stroke="#78350f" strokeWidth="14" fill="none" />
        <path d="M135,210 Q165,180 180,140" stroke="#78350f" strokeWidth="8" fill="none" />
        
        <circle cx="120" cy="95" r="45" fill="#f9a8d4" opacity="0.92" />
        <circle cx="95" cy="115" r="38" fill="#fda4af" opacity="0.88" />
        <circle cx="150" cy="85" r="42" fill="#fbcfe8" opacity="0.9" />
        <circle cx="180" cy="130" r="30" fill="#fda4af" opacity="0.85" />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ☀️ SUMMER DECORATORS — Sun corner and Tropical Leaves
// ─────────────────────────────────────────────────────────────────────────────

function SummerSunFlares() {
  return (
    <div
      aria-hidden="true"
      className="fixed top-0 right-0 pointer-events-none z-[58]"
      style={{ opacity: 0.22 }}
    >
      <svg width="320" height="320" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="sunFlareGrad" cx="100%" cy="0%" r="100%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#fde047" stopOpacity="0.80" />
            <stop offset="60%" stopColor="#fbbf24" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#bae6fd" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="320" cy="0" r="280" fill="url(#sunFlareGrad)" />
        {/* Soft cartoon rays */}
        <path d="M320,0 L200,160 Q240,240 320,200 Z" fill="#fde047" opacity="0.12" />
        <path d="M320,0 L120,240 Q180,300 240,240 Z" fill="#fbbf24" opacity="0.08" />
      </svg>
    </div>
  );
}

function TropicalLeavesLeft() {
  return (
    <div
      aria-hidden="true"
      className="fixed bottom-0 left-0 pointer-events-none z-[4]"
      style={{ opacity: 0.38 }}
    >
      <svg width="220" height="320" viewBox="0 0 220 320" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="palmGrad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#166534" />
            <stop offset="50%" stopColor="#15803d" />
            <stop offset="100%" stopColor="#4ade80" />
          </linearGradient>
        </defs>
        {/* Monstera leaf shape */}
        <path d="M0,320 Q60,260 50,180 Q30,100 120,30 Q160,100 140,180 Q120,260 200,320 Z" fill="url(#palmGrad)" />
        <path d="M90,320 Q95,220 120,30" stroke="#14532d" strokeWidth="4" fill="none" />
        
        {/* Cuts in monstera leaf for Disney cartoon styling */}
        <path d="M80,180 Q40,160 20,170" stroke="#fefce8" strokeWidth="5" fill="none" />
        <path d="M95,140 Q50,110 30,125" stroke="#fefce8" strokeWidth="5" fill="none" />
        <path d="M120,220 Q160,200 180,215" stroke="#fefce8" strokeWidth="5" fill="none" />
        <path d="M130,170 Q170,140 185,155" stroke="#fefce8" strokeWidth="5" fill="none" />
      </svg>
    </div>
  );
}

function TropicalLeavesRight() {
  return (
    <div
      aria-hidden="true"
      className="fixed bottom-0 right-0 pointer-events-none z-[4]"
      style={{ opacity: 0.38, transform: 'scaleX(-1)' }}
    >
      <svg width="220" height="320" viewBox="0 0 220 320" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,320 Q60,260 50,180 Q30,100 120,30 Q160,100 140,180 Q120,260 200,320 Z" fill="url(#palmGrad)" />
        <path d="M90,320 Q95,220 120,30" stroke="#14532d" strokeWidth="4" fill="none" />
        <path d="M80,180 Q40,160 20,170" stroke="#fefce8" strokeWidth="5" fill="none" />
        <path d="M95,140 Q50,110 30,125" stroke="#fefce8" strokeWidth="5" fill="none" />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 🍂 AUTUMN DECORATORS — Leaf Piles and Pumpkin
// ─────────────────────────────────────────────────────────────────────────────

function LeafPileSidebar() {
  return (
    <div
      aria-hidden="true"
      className="fixed left-0 top-0 w-72 pointer-events-none z-[38]"
      style={{
        filter: 'drop-shadow(0 4px 10px rgba(194,65,12,0.4))',
        maskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)',
      }}
    >
      <svg viewBox="0 0 288 36" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="leafGradTop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
        </defs>
        {/* Thick curved leaf layer */}
        <path
          d="M0,36 Q15,10 35,16 Q55,4 75,12 Q95,2 115,18 Q135,4 155,14 Q175,2 195,12 Q215,6 235,16 Q255,2 270,14 Q280,8 288,22 L288,36 Z"
          fill="url(#leafGradTop)"
        />
        {/* Layer of maple/oak leaf cartoon shapes overlapping */}
        <path d="M12,22 Q20,10 32,18 M85,15 Q95,5 108,12 M160,18 Q170,4 185,14 M240,16 Q250,5 264,12" stroke="#ea580c" strokeWidth="2.5" fill="none" />
        
        {/* Small colorful accent dots */}
        <circle cx="50" cy="18" r="4" fill="#ef4444" />
        <circle cx="120" cy="14" r="5" fill="#eab308" />
        <circle cx="190" cy="16" r="4.5" fill="#f97316" />
        <circle cx="250" cy="15" r="4" fill="#dc2626" />
      </svg>
    </div>
  );
}

function LeafPileTopbar() {
  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 pointer-events-none z-[39]"
      style={{
        filter: 'drop-shadow(0 4px 8px rgba(194,65,12,0.35))',
        maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
      }}
    >
      <svg
        viewBox="0 0 1200 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        preserveAspectRatio="none"
        style={{ height: '22px' }}
      >
        <path
          d="M0,24 Q50,6 100,12 Q160,2 220,10 Q280,16 340,6 Q400,0 460,8 Q520,14 580,4 Q640,0 700,8 Q760,14 820,4 Q880,0 940,8 Q1000,14 1060,6 Q1120,2 1200,12 L1200,24 Z"
          fill="#f97316"
        />
        {Array.from({ length: 12 }, (_, i) => (
          <ellipse key={i} cx={i * 100 + 50} cy="10" rx="14" ry="6" fill="#ea580c" transform="rotate(5)" />
        ))}
        {Array.from({ length: 11 }, (_, i) => (
          <ellipse key={i} cx={i * 100 + 100} cy="12" rx="10" ry="4" fill="#eab308" transform="rotate(-10)" />
        ))}
      </svg>
    </div>
  );
}

function AutumnPumpkinLeft() {
  return (
    <div
      aria-hidden="true"
      className="fixed bottom-4 left-4 pointer-events-none z-[6]"
      style={{ filter: 'drop-shadow(0 8px 20px rgba(249,115,22,0.4))' }}
    >
      <svg width="110" height="110" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="pumpkinGrad" cx="40%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="60%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#c2410c" />
          </radialGradient>
        </defs>
        
        {/* Pumpkin lobes (overlapping circles/ovals) */}
        <ellipse cx="50" cy="55" rx="36" ry="32" fill="url(#pumpkinGrad)" />
        <ellipse cx="38" cy="55" rx="28" ry="31" fill="url(#pumpkinGrad)" />
        <ellipse cx="62" cy="55" rx="28" ry="31" fill="url(#pumpkinGrad)" />
        <ellipse cx="25" cy="55" rx="18" ry="26" fill="url(#pumpkinGrad)" />
        <ellipse cx="75" cy="55" rx="18" ry="26" fill="url(#pumpkinGrad)" />

        {/* Stem */}
        <path d="M50,25 Q52,12 60,10 Q56,22 50,25" fill="#15803d" stroke="#166534" strokeWidth="2" strokeLinecap="round" />
        
        {/* Curly vines */}
        <path d="M60,10 Q68,6 72,12 Q75,18 70,22 Q65,18 68,14" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />

        {/* Highlights */}
        <ellipse cx="35" cy="40" rx="8" ry="4" fill="#ffedd5" opacity="0.45" />
        <ellipse cx="65" cy="40" rx="8" ry="4" fill="#ffedd5" opacity="0.45" />
      </svg>
    </div>
  );
}

function AutumnTreeRight() {
  return (
    <div
      aria-hidden="true"
      className="fixed bottom-0 right-0 pointer-events-none z-[4]"
      style={{ opacity: 0.38 }}
    >
      <svg width="220" height="380" viewBox="0 0 220 380" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="autumnTrunk" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>
        </defs>
        {/* Trunk */}
        <path d="M120,380 Q100,280 115,220 Q130,160 110,120" stroke="url(#autumnTrunk)" strokeWidth="16" fill="none" strokeLinecap="round" />
        <path d="M115,220 Q145,180 160,140" stroke="url(#autumnTrunk)" strokeWidth="8" fill="none" strokeLinecap="round" />
        
        {/* Orange puffy tree canopy */}
        <circle cx="110" cy="100" r="50" fill="#f97316" opacity="0.92" />
        <circle cx="75" cy="115" r="42" fill="#ef4444" opacity="0.88" />
        <circle cx="145" cy="90" r="45" fill="#fbbf24" opacity="0.9" />
        <circle cx="170" cy="130" r="32" fill="#f97316" opacity="0.85" />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ❄️ WINTER — Cartoon Snowman Accent (bottom-right fixed)
// ─────────────────────────────────────────────────────────────────────────────

function CartoonSnowman() {
  return (
    <div
      aria-hidden="true"
      className="fixed bottom-4 right-4 pointer-events-none z-[6] select-none transition-transform hover:scale-110"
      style={{ filter: 'drop-shadow(0 8px 24px rgba(125,211,252,0.45))' }}
    >
      <svg width="100" height="140" viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="snowmanBodyGrad" cx="35%" cy="30%" r="65%">
            <stop offset="0%"   stopColor="#ffffff" />
            <stop offset="55%"  stopColor="#f0f9ff" />
            <stop offset="100%" stopColor="#bae6fd" />
          </radialGradient>
          <radialGradient id="snowmanHeadGrad" cx="35%" cy="30%" r="65%">
            <stop offset="0%"   stopColor="#ffffff" />
            <stop offset="55%"  stopColor="#e0f2fe" />
            <stop offset="100%" stopColor="#bae6fd" />
          </radialGradient>
          <filter id="snowmanShadow">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#7dd3fc" floodOpacity="0.4"/>
          </filter>
        </defs>
        <circle cx="50" cy="105" r="32" fill="url(#snowmanBodyGrad)" filter="url(#snowmanShadow)" />
        <ellipse cx="38" cy="90" rx="10" ry="7" fill="white" opacity="0.50" />
        <circle cx="50" cy="96"  r="3.5" fill="#1e3a5f" opacity="0.70" />
        <circle cx="50" cy="106" r="3.5" fill="#1e3a5f" opacity="0.70" />
        <circle cx="50" cy="116" r="3.5" fill="#1e3a5f" opacity="0.70" />
        <circle cx="50" cy="58" r="22" fill="url(#snowmanHeadGrad)" filter="url(#snowmanShadow)" />
        <ellipse cx="40" cy="48" rx="7" ry="5" fill="white" opacity="0.55" />
        <circle cx="42" cy="54" r="3.5" fill="#1e293b" />
        <circle cx="58" cy="54" r="3.5" fill="#1e293b" />
        <circle cx="43.5" cy="52.5" r="1.2" fill="white" opacity="0.80" />
        <circle cx="59.5" cy="52.5" r="1.2" fill="white" opacity="0.80" />
        <polygon points="50,58 44,61 56,61" fill="#f97316" />
        <polygon points="50,58 49,62 51,62" fill="#ea580c" />
        <circle cx="40" cy="67" r="1.8" fill="#1e293b" opacity="0.70" />
        <circle cx="44" cy="70" r="1.8" fill="#1e293b" opacity="0.70" />
        <circle cx="50" cy="71" r="1.8" fill="#1e293b" opacity="0.70" />
        <circle cx="56" cy="70" r="1.8" fill="#1e293b" opacity="0.70" />
        <circle cx="60" cy="67" r="1.8" fill="#1e293b" opacity="0.70" />
        <path d="M28,76 Q50,86 72,76" stroke="#ef4444" strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d="M28,76 Q50,84 72,76" stroke="#dc2626" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M30,76 Q24,86 26,96 Q28,102 22,108" stroke="#ef4444" strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d="M30,76 Q25,85 27,95 Q29,101 23,107" stroke="#dc2626" strokeWidth="3" fill="none" strokeLinecap="round" />
        <rect x="32" y="28" width="36" height="24" rx="4" fill="#1e293b" />
        <rect x="32" y="28" width="36" height="5"  rx="2" fill="#334155" />
        <rect x="24" y="36" width="52" height="6"  rx="3" fill="#1e293b" />
        <rect x="36" y="30" width="8"  height="18" rx="3" fill="#334155" opacity="0.45" />
        <path d="M18,90 Q10,78 4,70"  stroke="#92400e" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M10,78 Q6,72 2,68"   stroke="#92400e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M10,78 Q4,76 0,78"   stroke="#92400e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M82,90 Q90,78 96,70" stroke="#92400e" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M90,78 Q94,72 98,68" stroke="#92400e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M90,78 Q96,76 100,78" stroke="#92400e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <ellipse cx="50" cy="135" rx="38" ry="8" fill="white" opacity="0.80" />
        <ellipse cx="50" cy="133" rx="32" ry="5" fill="white" opacity="0.60" />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 🌸 SPRING DECORATORS — Emoji & Additional Layouts
// ─────────────────────────────────────────────────────────────────────────────

function SpringBlossomHeader() {
  return (
    <div
      className="pointer-events-none fixed top-0 left-0 right-0 z-[39] h-8 bg-gradient-to-b from-pink-200/40 to-transparent flex justify-around items-start px-4 pt-1"
      style={{
        maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
      }}
    >
      <span className="text-sm select-none">🌸</span>
      <span className="text-xs select-none">🌿</span>
      <span className="text-sm select-none">🌸</span>
      <span className="text-xs select-none">🌱</span>
      <span className="text-sm select-none">🌸</span>
      <span className="text-xs select-none">🌿</span>
    </div>
  );
}

function SpringTreeLeft() {
  return (
    <div className="pointer-events-none fixed bottom-0 left-2 z-0 opacity-40 select-none text-5xl">
      🌸
    </div>
  );
}

function SpringTreeRight() {
  return (
    <div className="pointer-events-none fixed bottom-0 right-2 z-0 opacity-40 select-none text-5xl">
      🌳
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ☀️ SUMMER DECORATORS — Emoji & Additional Layouts
// ─────────────────────────────────────────────────────────────────────────────

function SunRayOverlay() {
  return (
    <div className="pointer-events-none fixed top-0 right-0 z-0 w-96 h-96 bg-gradient-to-bl from-amber-200/30 via-yellow-100/10 to-transparent rounded-full blur-2xl" />
  );
}

function SummerDecorLeft() {
  return (
    <div className="pointer-events-none fixed bottom-0 left-2 z-0 opacity-40 select-none text-5xl">
      🌻
    </div>
  );
}

function SummerDecorRight() {
  return (
    <div className="pointer-events-none fixed bottom-0 right-2 z-0 opacity-40 select-none text-5xl">
      🌴
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 🍂 AUTUMN DECORATORS — Emoji & Additional Layouts
// ─────────────────────────────────────────────────────────────────────────────

function AutumnLeavesHeader() {
  return (
    <div
      className="pointer-events-none fixed top-0 left-0 right-0 z-[39] h-8 bg-gradient-to-b from-orange-200/40 to-transparent flex justify-around items-start px-4 pt-1"
      style={{
        maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
      }}
    >
      <span className="text-sm select-none">🍂</span>
      <span className="text-xs select-none">🍁</span>
      <span className="text-sm select-none">🍂</span>
      <span className="text-xs select-none">🍁</span>
      <span className="text-sm select-none">🍂</span>
    </div>
  );
}

function AutumnTreeLeft() {
  return (
    <div className="pointer-events-none fixed bottom-0 left-2 z-0 opacity-40 select-none text-5xl">
      🍁
    </div>
  );
}

function AutumnPumpkinRight() {
  return (
    <div className="pointer-events-none fixed bottom-0 right-2 z-0 opacity-40 select-none text-5xl">
      🎃
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Night Mode Component
// ─────────────────────────────────────────────────────────────────────────────

function NightMoonAndStars() {
  return (
    <>
      <div className="pointer-events-none fixed top-4 right-12 z-0 opacity-80 select-none text-6xl drop-shadow-[0_0_15px_rgba(253,224,71,0.6)]">
        🌙
      </div>
      <div className="pointer-events-none fixed top-10 left-20 z-0 opacity-60 select-none text-2xl animate-pulse delay-100">
        ✨
      </div>
      <div className="pointer-events-none fixed top-32 left-1/3 z-0 opacity-50 select-none text-sm animate-pulse delay-300">
        ⭐
      </div>
      <div className="pointer-events-none fixed top-16 right-1/4 z-0 opacity-70 select-none text-xl animate-pulse delay-500">
        ✨
      </div>
      <div className="pointer-events-none fixed top-40 right-20 z-0 opacity-40 select-none text-xs animate-pulse">
        ⭐
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Decorators Dispatcher
// ─────────────────────────────────────────────────────────────────────────────

function SeasonDecorators({ season, isDarkMode }: { season: Season, isDarkMode: boolean }) {
  switch (season) {
    case 'winter':
      return (
        <>
          <SnowPileSidebar />
          <SnowPileTopbar />
          <PineTreeLeft />
          <PineTreeRight />
          <CartoonSnowman />
          {isDarkMode && <NightMoonAndStars />}
        </>
      );
    case 'spring':
      return (
        <>
          <SpringBlossomHeader />
          <SpringVinesSidebar />
          <SpringVinesTopbar />
          <SakuraTreeLeft />
          <SakuraFlowerRight />
          <SpringTreeLeft />
          <SpringTreeRight />
          {isDarkMode && <NightMoonAndStars />}
        </>
      );
    case 'summer':
      return (
        <>
          {!isDarkMode && <SunRayOverlay />}
          {!isDarkMode && <SummerSunFlares />}
          <TropicalLeavesLeft />
          <TropicalLeavesRight />
          <SummerDecorLeft />
          <SummerDecorRight />
          {isDarkMode && <NightMoonAndStars />}
        </>
      );
    case 'autumn':
      return (
        <>
          <AutumnLeavesHeader />
          <LeafPileSidebar />
          <LeafPileTopbar />
          <AutumnPumpkinLeft />
          <AutumnTreeRight />
          <AutumnTreeLeft />
          <AutumnPumpkinRight />
          {isDarkMode && <NightMoonAndStars />}
        </>
      );
    default:
      return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Background Gradient Panel
// ─────────────────────────────────────────────────────────────────────────────

function SeasonBackground({ season, isDarkMode }: { season: Season, isDarkMode: boolean }) {
  const gradients: Record<Season, string> = {
    winter: isDarkMode ? 'linear-gradient(145deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' : 'linear-gradient(145deg, #dbeafe 0%, #bfdbfe 25%, #e0f2fe 55%, #f0f9ff 100%)',
    spring: isDarkMode ? 'linear-gradient(135deg, #1e1b4b 0%, #2e1065 50%, #0f172a 100%)' : 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #dcfce7 100%)',
    summer: isDarkMode ? 'linear-gradient(135deg, #172554 0%, #1e3a8a 50%, #0f172a 100%)' : 'linear-gradient(135deg, #fefce8 0%, #fef08a 50%, #bae6fd 100%)',
    autumn: isDarkMode ? 'linear-gradient(135deg, #2a110a 0%, #431407 50%, #0f172a 100%)' : 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 50%, #fde68a 100%)',
  };

  const extraOverlay = useMemo(() => {
    if (season === 'winter') {
      return (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 15% 5%, rgba(186,230,253,0.55) 0%, transparent 55%), radial-gradient(ellipse at 85% 8%, rgba(191,219,254,0.45) 0%, transparent 50%)',
          }}
        />
      );
    }
    if (season === 'spring') {
      return (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 10% 10%, rgba(251,207,232,0.4) 0%, transparent 60%), radial-gradient(ellipse at 90% 90%, rgba(187,247,208,0.4) 0%, transparent 65%)',
          }}
        />
      );
    }
    if (season === 'summer') {
      return (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 85% 10%, rgba(253,224,71,0.5) 0%, transparent 60%), radial-gradient(ellipse at 15% 90%, rgba(186,230,253,0.4) 0%, transparent 70%)',
          }}
        />
      );
    }
    if (season === 'autumn') {
      return (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 30% 20%, rgba(254,215,170,0.5) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(253,230,138,0.4) 0%, transparent 60%)',
          }}
        />
      );
    }
    return null;
  }, [season]);

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: gradients[season],
          transition: 'background 1.4s ease-in-out',
        }}
      />
      {extraOverlay}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Particle Field dispatcher
// ─────────────────────────────────────────────────────────────────────────────

function ParticleField({ season }: { season: Season }) {
  switch (season) {
    case 'winter':
      return <WinterParticleField />;
    case 'spring':
      return <SpringParticleField />;
    case 'summer':
      return <SummerParticleField />;
    case 'autumn':
      return <AutumnParticleField />;
    default:
      return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Export — CartoonSeasonalOverlay
// ─────────────────────────────────────────────────────────────────────────────

export default function CartoonSeasonalOverlay({ children }: { children: React.ReactNode }) {
  const { season } = useSeason();
  const { isDarkMode } = useSettings();

  return (
    <>
      {/* 1) Latar belakang utama (gradien per musim) */}
      <SeasonBackground season={season} isDarkMode={isDarkMode} />

      {/* 2) Partikel */}
      <ParticleField season={season} />

      {/* 3) Ornamen dekoratif khusus (awan, pohon, daun besar, dll) */}
      <SeasonDecorators season={season} isDarkMode={isDarkMode} />

      {/* 4. Page content above seasonal layers */}
      {children}
    </>
  );
}
