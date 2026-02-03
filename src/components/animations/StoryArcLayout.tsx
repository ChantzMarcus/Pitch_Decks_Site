// src/components/animations/StoryArcLayout.tsx
'use client';

import { useMemo } from 'react';
import * as THREE from 'three';

interface Deck {
  id: string;
  title: string;
  cover_image_url: string;
  genre: string[];
}

export interface StoryArcLayoutProps {
  decks: Deck[];
  arcWidth?: number;
  arcHeight?: number;
  arcDepth?: number;
}

export interface StoryArcCardPosition {
  deck: Deck;
  position: [number, number, number];
  rotation: [number, number, number];
  index: number;
}

/**
 * Story Arc Visualization Layout
 * Positions cards in an arc following a classic story structure:
 * Setup → Rising Action → Climax → Falling Action → Resolution
 */
export function useStoryArcLayout({
  decks,
  arcWidth = 8,
  arcHeight = 2,
  arcDepth = 3,
}: StoryArcLayoutProps): StoryArcCardPosition[] {
  return useMemo(() => {
    const cardCount = Math.min(decks.length, 10);
    const positions: StoryArcCardPosition[] = [];

    for (let i = 0; i < cardCount; i++) {
      const deck = decks[i];
      const t = i / (cardCount - 1); // Normalized position 0-1

      // Story arc follows a curve: low → high → low
      // Using a sine wave shifted to create the arc
      const arcPhase = t * Math.PI; // 0 to PI
      const yOffset = Math.sin(arcPhase) * arcHeight;

      // X position: spread across the width
      const x = (t - 0.5) * arcWidth;

      // Z position: slight depth variation
      const z = Math.sin(arcPhase) * arcDepth;

      // Y position: the arc height
      const y = yOffset;

      // Rotation: slight tilt based on arc position
      const rotationY = Math.sin(arcPhase) * 0.2;
      const rotationX = Math.cos(arcPhase) * 0.1;

      positions.push({
        deck,
        position: [x, y, z] as [number, number, number],
        rotation: [rotationX, rotationY, 0] as [number, number, number],
        index: i,
      });
    }

    return positions;
  }, [decks, arcWidth, arcHeight, arcDepth]);
}

export default function StoryArcLayout(props: StoryArcLayoutProps) {
  return null; // This is a utility component, use useStoryArcLayout hook
}
