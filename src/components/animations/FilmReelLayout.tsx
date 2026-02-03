// src/components/animations/FilmReelLayout.tsx
'use client';

import { useMemo } from 'react';
import * as THREE from 'three';

interface Deck {
  id: string;
  title: string;
  cover_image_url: string;
  genre: string[];
}

export interface FilmReelLayoutProps {
  decks: Deck[];
  radius?: number;
  spiralTurns?: number;
  verticalSpread?: number;
}

export interface FilmReelCardPosition {
  deck: Deck;
  position: [number, number, number];
  rotation: [number, number, number];
  index: number;
}

/**
 * Film Reel Spiral Layout
 * Positions 3D cards in a spiral formation mimicking a film reel
 */
export function useFilmReelLayout({
  decks,
  radius = 3.5,
  spiralTurns = 2,
  verticalSpread = 1.5,
}: FilmReelLayoutProps): FilmReelCardPosition[] {
  return useMemo(() => {
    const cardCount = Math.min(decks.length, 12); // Limit to 12 for performance
    const positions: FilmReelCardPosition[] = [];

    for (let i = 0; i < cardCount; i++) {
      const deck = decks[i];
      const t = i / (cardCount - 1); // Normalized position 0-1

      // Spiral parameters
      const angle = t * Math.PI * 2 * spiralTurns;
      const currentRadius = radius * (0.5 + t * 0.5); // Radius grows from center
      const height = (t - 0.5) * verticalSpread * 2; // Vertical spread

      const x = Math.cos(angle) * currentRadius;
      const z = Math.sin(angle) * currentRadius;
      const y = height;

      // Rotation: face inward toward the spiral
      const rotationY = -angle + Math.PI / 2;

      positions.push({
        deck,
        position: [x, y, z] as [number, number, number],
        rotation: [0, rotationY, 0] as [number, number, number],
        index: i,
      });
    }

    return positions;
  }, [decks, radius, spiralTurns, verticalSpread]);
}

export default function FilmReelLayout(props: FilmReelLayoutProps) {
  return null; // This is a utility component, use useFilmReelLayout hook
}
