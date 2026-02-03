// src/components/ThreeDPitchDeckShowcase.tsx - ENHANCED VERSION
'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Environment, ContactShadows, Float } from '@react-three/drei';
// import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useFilmReelLayout } from './animations/FilmReelLayout';
import { useStoryArcLayout } from './animations/StoryArcLayout';

interface Deck {
  id: string;
  title: string;
  cover_image_url: string;
  genre: string[];
}

interface ThreeDPitchDeckShowcaseProps {
  decks: Deck[];
  layout?: 'circular' | 'film-reel' | 'story-arc';
  enablePostProcessing?: boolean;
}

type LayoutType = 'circular' | 'film-reel' | 'story-arc';

// Individual 3D card component with shader effects
const DeckCard3D = ({
  deck,
  position,
  rotation,
  index,
}: {
  deck: Deck;
  position: [number, number, number];
  rotation: [number, number, number];
  index: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 384;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, 384);
      gradient.addColorStop(0, '#1e1e1e');
      gradient.addColorStop(0.5, '#2d2d2d');
      gradient.addColorStop(1, '#1e1e1e');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add border
      ctx.strokeStyle = '#6366F1';
      ctx.lineWidth = 4;
      ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);

      // Title text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      const words = deck.title.split(' ');
      let y = 40;
      words.forEach(word => {
        ctx.fillText(word.substring(0, 15), canvas.width / 2, y);
        y += 18;
      });

      // Genre tags
      ctx.fillStyle = '#6366F1';
      ctx.font = '11px Arial';
      const genreText = deck.genre.slice(0, 2).join(' • ');
      ctx.fillText(genreText, canvas.width / 2, canvas.height - 20);

      const texture = new THREE.CanvasTexture(canvas);
      texture.magFilter = THREE.NearestFilter;
      texture.minFilter = THREE.LinearFilter;
      setTexture(texture);
    }
  }, [deck.title, deck.genre]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Gentle floating animation with phase offset
      const phase = index * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.5 + phase) * 0.05;
      // Gentle rotation
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position} rotation={rotation} castShadow>
        <planeGeometry args={[1.5, 2]} />
        {texture ? (
          <meshStandardMaterial
            map={texture}
            transparent
            emissive="#6366F1"
            emissiveIntensity={0.1}
            metalness={0.3}
            roughness={0.7}
          />
        ) : (
          <meshStandardMaterial color="#f5f5f5" />
        )}
        <Text
          position={[0, -1.2, 0.01]}
          fontSize={0.15}
          maxWidth={1.4}
          textAlign="center"
          color="#ffffff"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {deck.title}
        </Text>
      </mesh>
    </Float>
  );
};

// Enhanced Scene component with post-processing
const Scene = ({
  decks,
  layout = 'film-reel',
}: {
  decks: Deck[];
  layout: LayoutType;
}) => {
  // Get card positions based on selected layout
  let cardPositions: any[] = [];

  if (layout === 'film-reel') {
    cardPositions = useFilmReelLayout({ decks });
  } else if (layout === 'story-arc') {
    cardPositions = useStoryArcLayout({ decks });
  } else {
    // Circular layout (original)
    cardPositions = decks.slice(0, 6).map((deck, index) => {
      const angle = (index / 6) * Math.PI * 2;
      const radius = 3;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(angle * 2) * 0.5;
      return {
        deck,
        position: [x, y, z] as [number, number, number],
        rotation: [0, angle + Math.PI / 2, 0] as [number, number, number],
        index,
      };
    });
  }

  return (
    <>
      {/* Enhanced lighting for cinematic look */}
      <ambientLight intensity={0.4} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
        color="#ffffff"
      />
      <spotLight
        position={[-10, -10, -10]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        castShadow
        color="#6366F1"
      />
      <pointLight position={[0, 5, 0]} intensity={0.3} color="#f59e0b" />

      {/* Floating 3D cards */}
      {cardPositions.map(({ deck, position, rotation, index }) => (
        <DeckCard3D
          key={deck.id}
          deck={deck}
          position={position}
          rotation={rotation}
          index={index}
        />
      ))}

      {/* Central glow element */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#6366F1"
          emissive="#6366F1"
          emissiveIntensity={2}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Camera controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={15}
        autoRotate
        autoRotateSpeed={0.5}
      />

      {/* Contact shadows for grounding */}
      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.4}
        scale={10}
        blur={2}
        far={4}
      />

      {/* Environment reflections */}
      <Environment preset="sunset" />
    </>
  );
};

export default function ThreeDPitchDeckShowcase({
  decks,
  layout = 'film-reel',
  enablePostProcessing = false,
}: ThreeDPitchDeckShowcaseProps) {
  return (
    <div className="w-full h-96 md:h-[500px] bg-gradient-to-b from-charcoal/10 to-charcoal/5 rounded-2xl overflow-hidden shadow-xl">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        shadows
        className="bg-transparent"
        gl={{ antialias: true, alpha: true }}
      >
        {/* Post-processing effects temporarily disabled due to React 19 compatibility */}
        {/* {enablePostProcessing ? (
          <EffectComposer disableNormalPass>
            <Bloom
              intensity={0.5}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
            <ChromaticAberration
              offset={new THREE.Vector2(0.001, 0.001)}
              radialModulation={false}
              modulationOffset={0}
            />
          </EffectComposer>
        ) : null} */}

        <Scene decks={decks} layout={layout} />
      </Canvas>

      {/* Layout indicator */}
      <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-lg text-xs backdrop-blur-sm">
        {layout === 'film-reel' && '🎬 Film Reel Layout'}
        {layout === 'story-arc' && '📖 Story Arc Layout'}
        {layout === 'circular' && '⭕ Circular Layout'}
      </div>

      {/* Controls hint */}
      <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm backdrop-blur-sm">
        Drag to rotate • Scroll to zoom • Auto-rotate
      </div>
    </div>
  );
}
