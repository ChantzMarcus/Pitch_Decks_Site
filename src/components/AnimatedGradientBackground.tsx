// src/components/AnimatedGradientBackground.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function AnimatedGradientBackground() {
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gradientRef.current) return;

    // Create animated gradient effect
    const gradient = gradientRef.current;
    let progress = 0;
    let animationFrameId: number;

    // Animate gradient positions for flowing effect
    const animateGradient = () => {
      animationFrameId = requestAnimationFrame(animateGradient);
      progress += 0.002;
      if (progress > 1) progress = 0;

      const colors = [
        `radial-gradient(circle at ${20 + progress * 60}%, ${progress < 0.25 ? 'rgba(120, 119, 198, 0.3)' : progress < 0.5 ? 'rgba(255, 119, 198, 0.3)' : progress < 0.75 ? 'rgba(120, 219, 255, 0.3)' : 'rgba(120, 119, 198, 0.3)'} 0%, transparent 50%)`,
        `radial-gradient(circle at ${80 - progress * 60}%, ${progress > 0.25 && progress < 0.5 ? 'rgba(255, 119, 198, 0.3)' : progress > 0.5 && progress < 0.75 ? 'rgba(120, 219, 255, 0.3)' : 'rgba(120, 119, 198, 0.3)'} 0%, transparent 50%)`
      ];
      gradient.style.background = `linear-gradient(135deg, #f5f5f5 0%, #eaeaea 100%), ${colors.join(', ')}`;
    };

    animationFrameId = requestAnimationFrame(animateGradient);

    // Create floating particles effect
    const particles: HTMLElement[] = [];
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full opacity-20';
      particle.style.width = `${Math.random() * 20 + 5}px`;
      particle.style.height = particle.style.width;
      particle.style.backgroundColor = ['#6366F1', '#F59E0B', '#EC4899'][Math.floor(Math.random() * 3)];
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;

      gradient.appendChild(particle);
      particles.push(particle);

      // Animate each particle and store reference for cleanup
      const tween = gsap.to(particle, {
        x: `${(Math.random() - 0.5) * 100}`,
        y: `${(Math.random() - 0.5) * 100}`,
        duration: Math.random() * 10 + 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      // Store tween reference on particle element for cleanup
      (particle as any)._gsapTween = tween;
    }

    return () => {
      // Cleanup animations
      cancelAnimationFrame(animationFrameId);
      particles.forEach(p => {
        // Kill GSAP animation if it exists
        if ((p as any)._gsapTween) {
          (p as any)._gsapTween.kill();
        }
        p.remove();
      });
    };
  }, []);

  return (
    <div
      ref={gradientRef}
      className="fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#e5e5e5_1px,transparent_1px)] [background-size:16px_16px]" />
    </div>
  );
}
