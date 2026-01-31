// src/components/ThreeDPitchDeckShowcase.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

interface Deck {
  id: string;
  title: string;
  cover_image_url: string;
  genre: string[];
}

interface ThreeDPitchDeckShowcaseProps {
  decks: Deck[];
}

// Individual 3D card component
const DeckCard3D = ({ 
  deck, 
  position, 
  rotation 
}: { 
  deck: Deck; 
  position: [number, number, number]; 
  rotation: [number, number, number]; 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const textureLoader = new THREE.TextureLoader();
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    if (deck.cover_image_url) {
      // In a real implementation, we'd load the actual image
      // For now, we'll use a placeholder approach
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 384;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#f5f5f5';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0a0a0a';
        ctx.font = '12px sans-serif';
        ctx.fillText(deck.title.substring(0, 20), 10, 20);
        ctx.fillStyle = '#6366F1';
        ctx.fillText(deck.genre.slice(0, 2).join(', '), 10, 40);
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.LinearFilter;
        setTexture(texture);
      }
    }
  }, [deck.cover_image_url, deck.title, deck.genre]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.5 + position[0]) * 0.05;
      // Gentle rotation
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <planeGeometry args={[1.5, 2]} />
      {texture ? (
        <meshStandardMaterial map={texture} attach="material" transparent />
      ) : (
        <meshStandardMaterial color="#f5f5f5" />
      )}
      <Text
        position={[0, -1.2, 0.01]} // Slightly in front of the card
        fontSize={0.15}
        maxWidth={1.4}
        textAlign="center"
        color="#0a0a0a"
      >
        {deck.title}
      </Text>
    </mesh>
  );
};

// Scene component
const Scene = ({ decks }: { decks: Deck[] }) => {
  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.5} />
      {/* Directional lighting */}
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      
      {/* Floating 3D cards */}
      {decks.slice(0, 6).map((deck, index) => { // Limit to 6 for performance
        // Position cards in a circular formation
        const angle = (index / 6) * Math.PI * 2;
        const radius = 3;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(angle * 2) * 0.5; // Add some vertical variation
        
        return (
          <DeckCard3D
            key={deck.id}
            deck={deck}
            position={[x, y, z]}
            rotation={[0, angle + Math.PI / 2, 0]}
          />
        );
      })}
      
      {/* Optional: Central element */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#6366f1" transparent opacity={0.3} />
      </mesh>
      
      {/* Camera controls */}
      <OrbitControls 
        enableZoom={true} 
        enablePan={true} 
        enableRotate={true}
        minDistance={5}
        maxDistance={15}
      />
    </>
  );
};

export default function ThreeDPitchDeckShowcase({ decks }: ThreeDPitchDeckShowcaseProps) {
  return (
    <div className="w-full h-96 md:h-[500px] bg-gradient-to-b from-charcoal/10 to-charcoal/5 rounded-2xl overflow-hidden shadow-xl">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 50 }} 
        shadows
        className="bg-transparent"
      >
        <Scene decks={decks} />
      </Canvas>
      <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
}