import confetti from 'canvas-confetti';
import React from 'react';

export function triggerSingleHabitConfetti(event: React.MouseEvent | MouseEvent) {
  // Koordinat relatif terhadap window (0 sampai 1)
  const x = event.clientX / window.innerWidth;
  const y = event.clientY / window.innerHeight;

  confetti({
    particleCount: 20,
    spread: 60,
    origin: { x, y },
    colors: ['#9e4225', '#ff8c69'],
    scalar: 0.7,
    ticks: 150,
    gravity: 0.8,
    startVelocity: 25,
  });
}
