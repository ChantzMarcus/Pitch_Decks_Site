// src/components/PhysicsStats.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
}

interface PhysicsStatsProps {
  title?: string;
  subtitle?: string;
  stats: StatItem[];
}

export default function PhysicsStats({ 
  title = "Our Impact", 
  subtitle = "Numbers that speak to our success",
  stats 
}: PhysicsStatsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Set initial state
    statRefs.current.forEach(stat => {
      if (stat) {
        gsap.set(stat, { 
          opacity: 0, 
          y: 50,
          scale: 0.8
        });
      }
    });

    // Create scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Add staggered animations for each stat
    statRefs.current.forEach((stat, index) => {
      if (stat) {
        tl.to(stat, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
          delay: index * 0.1
        }, index * 0.1);
      }
    });

    return () => {
      // Only kill ScrollTriggers created by this component
      // Get all triggers and filter by the container
      const triggers = ScrollTrigger.getAll();
      triggers.forEach(trigger => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill();
        }
      });
      // Also kill the timeline animations
      tl.kill();
    };
  }, []);

  return (
    <section className="py-20 bg-charcoal/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
            {title}
          </h2>
          <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              ref={el => { statRefs.current[index] = el; }}
              className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 border border-charcoal/10 shadow-lg text-center transform-gpu"
            >
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-accent-indigo to-accent-gold bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-lg text-charcoal/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}