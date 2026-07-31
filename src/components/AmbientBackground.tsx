'use client';

import React from 'react';
import CartoonSeasonalOverlay from './CartoonSeasonalOverlay';

/**
 * AmbientBackground — Now powered by the Disney Cartoon Seasonal Theme System.
 *
 * Delegates all background/particle/decorator rendering to CartoonSeasonalOverlay.
 * The original progress-based gradient logic is superseded by season-aware gradients.
 */
export default function AmbientBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <CartoonSeasonalOverlay>
        {/* Page content on top of seasonal layers */}
        <div className="relative z-10">
          {children}
        </div>
      </CartoonSeasonalOverlay>
    </div>
  );
}
