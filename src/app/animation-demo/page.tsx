'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// Configuration
const CONFIG = {
  typingText: "your story deserves to be a movie... Ext. your established world now from the most riveting cold open...",
  typingSpeed: 50,
  countdownFrom: 10,
  barPosition: 70, // percentage from left
};

export default function AnimationDemo() {
  const typingBarRef = useRef<HTMLDivElement>(null);
  const typingContentRef = useRef<HTMLDivElement>(null);
  const typingTextRef = useRef<HTMLSpanElement>(null);
  const magicalBarRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ringProgressRef = useRef<SVGCircleElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  const [countdown, setCountdown] = useState(CONFIG.countdownFrom);
  const [countdownLabel, setCountdownLabel] = useState('Transformation');
  const [isComplete, setIsComplete] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const countdownRef = useRef(countdown);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Sync countdown state
  useEffect(() => {
    countdownRef.current = countdown;
  }, [countdown]);

  // Typewriter effect
  const typeText = async (text: string, speed: number = 50): Promise<void> => {
    return new Promise((resolve) => {
      if (!typingTextRef.current) {
        resolve();
        return;
      }
      typingTextRef.current.textContent = '';
      let index = 0;

      const type = () => {
        if (index < text.length && typingTextRef.current) {
          typingTextRef.current.textContent += text.charAt(index);
          index++;
          setTimeout(type, speed + Math.random() * 30);
        } else {
          resolve();
        }
      };

      type();
    });
  };

  // Create particle burst
  const createParticleBurst = (x: number, y: number, count: number = 20) => {
    if (!particlesRef.current) return;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particlesRef.current.appendChild(particle);

      const angle = (Math.PI * 2 * i) / count;
      const speed = 0.5 + Math.random() * 1.5;
      const vx = Math.cos(angle) * speed * 100;
      const vy = Math.sin(angle) * speed * 100;

      gsap.to(particle, {
        x: vx,
        y: vy,
        opacity: 0,
        duration: 1 + Math.random(),
        ease: 'power2.out',
        onComplete: () => particle.remove(),
      });
    }
  };

  // Start countdown
  const startCountdown = () => {
    let timeLeft = CONFIG.countdownFrom;
    const circumference = 440; // 2 * PI * 70

    countdownIntervalRef.current = setInterval(() => {
      timeLeft--;
      setCountdown(timeLeft);

      // Update progress ring
      if (ringProgressRef.current) {
        const progress = (CONFIG.countdownFrom - timeLeft) / CONFIG.countdownFrom;
        ringProgressRef.current.style.strokeDashoffset = `${circumference * (1 - progress)}`;
      }

      // Pulse effect
      gsap.fromTo(
        cardRef.current?.querySelector('.countdown-display'),
        { scale: 1.2 },
        { scale: 1, duration: 0.3, ease: 'power2.out' }
      );

      if (timeLeft <= 0) {
        if (countdownIntervalRef.current) {
          clearInterval(countdownIntervalRef.current);
        }
        countdownComplete();
      }
    }, 1000);
  };

  // Countdown complete celebration
  const countdownComplete = () => {
    const barX = (window.innerWidth * CONFIG.barPosition) / 100;
    const barY = window.innerHeight / 2;

    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        createParticleBurst(
          barX + (Math.random() - 0.5) * 200,
          barY + (Math.random() - 0.5) * 200,
          15
        );
      }, i * 100);
    }

    setCountdownLabel('Complete');
    setIsComplete(true);

    // Ring glow effect
    gsap.to('.card-glow', {
      scale: 1.5,
      opacity: 1,
      duration: 0.5,
      yoyo: true,
      repeat: 3,
    });
  };

  // Main animation sequence
  const startAnimation = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsComplete(false);
    setCountdown(CONFIG.countdownFrom);
    setCountdownLabel('Transformation');

    // Reset
    resetAnimation();
    await new Promise((r) => setTimeout(r, 100));

    // Show magical bar
    gsap.to(magicalBarRef.current, { opacity: 1, duration: 0.5 });

    // PHASE 1: Animate typing bar width in
    await new Promise((resolve) => {
      gsap.to(typingBarRef.current, {
        width: 700,
        duration: 1,
        ease: 'power3.out',
        onComplete: resolve,
      });
    });

    // Show typing content and type text
    gsap.to(typingContentRef.current, { opacity: 1, duration: 0.3 });
    await typeText(CONFIG.typingText, CONFIG.typingSpeed);

    // Wait a moment
    await new Promise((r) => setTimeout(r, 500));

    // PHASE 2: Animate to bar
    await new Promise((resolve) => {
      const barX = (window.innerWidth * CONFIG.barPosition) / 100;

      // Fade out typing content as it approaches the bar
      gsap.to(typingContentRef.current, {
        opacity: 0,
        duration: 0.5,
        delay: 1,
      });

      gsap.to(typingBarRef.current, {
        left: barX - 150,
        duration: 1.5,
        ease: 'power2.inOut',
        onComplete: resolve,
      });
    });

    // PHASE 3: Morph to card
    await new Promise((resolve) => {
      const barX = (window.innerWidth * CONFIG.barPosition) / 100;

      // Flash effect
      gsap.to(flashRef.current, {
        opacity: 1,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          gsap.set(flashRef.current, { opacity: 0 });
        },
      });

      // Particle burst
      createParticleBurst(barX, window.innerHeight / 2, 30);

      // Hide typing bar
      gsap.to(typingBarRef.current, {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        ease: 'back.in(1.7)',
      });

      // Show card
      gsap.to(cardRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: 0.3,
        ease: 'elastic.out(1, 0.5)',
        onComplete: resolve,
      });

      // Animate bar glow
      gsap.fromTo(
        magicalBarRef.current,
        { filter: 'brightness(1)' },
        {
          filter: 'brightness(2)',
          duration: 0.3,
          yoyo: true,
          repeat: 3,
        }
      );
    });

    // Start countdown
    startCountdown();

    setIsAnimating(false);
  };

  // Reset animation
  const resetAnimation = () => {
    gsap.killTweensOf([
      typingBarRef.current,
      typingContentRef.current,
      magicalBarRef.current,
      cardRef.current,
      flashRef.current,
    ]);

    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
    }

    gsap.set(typingBarRef.current, {
      width: 0,
      left: 0,
      opacity: 1,
      scale: 1,
    });

    gsap.set(typingContentRef.current, { opacity: 0 });
    if (typingTextRef.current) typingTextRef.current.textContent = '';

    gsap.set(magicalBarRef.current, { opacity: 0, filter: 'brightness(1)' });

    gsap.set(cardRef.current, {
      opacity: 0,
      scale: 0,
    });

    gsap.set(flashRef.current, { opacity: 0 });

    setCountdown(CONFIG.countdownFrom);
    setCountdownLabel('Transformation');
    setIsComplete(false);

    if (ringProgressRef.current) {
      ringProgressRef.current.style.strokeDashoffset = '0';
    }

    // Clear particles
    if (particlesRef.current) {
      particlesRef.current.innerHTML = '';
    }
  };

  // Ambient particles
  useEffect(() => {
    const createAmbientParticle = () => {
      if (!particlesRef.current) return;

      const particle = document.createElement('div');
      particle.className = 'particle ambient';
      particle.style.left = `${Math.random() * window.innerWidth}px`;
      particle.style.top = `${Math.random() * window.innerHeight}px`;
      particle.style.opacity = `${Math.random() * 0.5}`;
      particle.style.width = `${2 + Math.random() * 3}px`;
      particle.style.height = particle.style.width;
      particlesRef.current.appendChild(particle);

      gsap.to(particle, {
        y: -100 - Math.random() * 200,
        x: (Math.random() - 0.5) * 100,
        opacity: 0,
        duration: 3 + Math.random() * 4,
        ease: 'none',
        onComplete: () => particle.remove(),
      });
    };

    const interval = setInterval(createAmbientParticle, 200);
    return () => clearInterval(interval);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#0a0a0f] overflow-hidden flex items-center justify-start font-mono">
      {/* Scanlines Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[99] opacity-30 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.1)_0px,rgba(0,0,0,0.1)_1px,transparent_1px,transparent_2px)]" />

      {/* Particles Container */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />

      {/* Flash Effect */}
      <div
        ref={flashRef}
        className="fixed inset-0 pointer-events-none opacity-0 z-50"
        style={{
          background: 'radial-gradient(ellipse at 70% 50%, rgba(196, 181, 253, 0.8) 0%, rgba(139, 92, 246, 0.4) 30%, transparent 70%)',
        }}
      />

      {/* Phase 1: Typing Bar */}
      <div
        ref={typingBarRef}
        className="absolute top-1/2 -translate-y-1/2 left-0 h-[120px] bg-gradient-to-r from-[rgba(20,20,30,0.95)] to-[rgba(30,30,45,0.9)] border-r-2 border-white/10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent animate-shimmer" />
        <div
          ref={typingContentRef}
          className="absolute left-[30px] top-1/2 -translate-y-1/2 flex items-center opacity-0"
        >
          <span ref={typingTextRef} className="text-[16px] text-gray-200 leading-relaxed max-w-[600px] tracking-wide" />
          <span className="inline-block w-[2px] h-[1.2em] bg-purple-400 ml-1 animate-blink" />
        </div>
      </div>

      {/* Phase 2: Magical Bar */}
      <div
        ref={magicalBarRef}
        className="absolute top-[15%] left-[70%] w-[4px] h-[70%] opacity-0 rounded-sm"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(139, 92, 246, 0.3) 10%, rgba(167, 139, 250, 0.8) 20%, rgba(196, 181, 253, 1) 50%, rgba(167, 139, 250, 0.8) 80%, rgba(139, 92, 246, 0.3) 90%, transparent 100%)',
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[20px] h-full bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.4)_0%,rgba(139,92,246,0.1)_40%,transparent_70%)] animate-bar-glow" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40px] h-full bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.2)_0%,transparent_60%)] animate-bar-glow-reverse" />
      </div>

      {/* Phase 3: Card */}
      <div
        ref={cardRef}
        className="absolute top-1/2 left-[70%] -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-2xl border border-purple-500/30 bg-gradient-to-br from-[rgba(20,20,35,0.98)] to-[rgba(30,30,50,0.95)] flex flex-col items-center justify-center overflow-hidden opacity-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent pointer-events-none" />
        <div className="card-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(139,92,246,0.3)_0%,transparent_60%)] animate-card-glow pointer-events-none" />

        <svg className="countdown-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px]" viewBox="0 0 150 150">
          <defs>
            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c4b5fd" />
              <stop offset="50%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <circle cx="75" cy="75" r="70" fill="none" stroke="rgba(139, 92, 246, 0.1)" strokeWidth="2" />
          <circle
            ref={ringProgressRef}
            cx="75"
            cy="75"
            r="70"
            fill="none"
            stroke="url(#ringGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            transform="rotate(-90 75 75)"
            style={{ strokeDasharray: '440', strokeDashoffset: '0' }}
          />
        </svg>

        <div className="relative z-10 text-center">
          <div className="text-[10px] uppercase tracking-widest text-purple-400/70 mb-2">{countdownLabel}</div>
          <div className="countdown-display text-[48px] font-light text-white tabular-nums drop-shadow-[0_0_30px_rgba(139,92,246,0.5)]" style={{ fontFamily: 'Inter, sans-serif' }}>
            {isComplete ? '✓' : countdown}
          </div>
          <div className="text-[14px] text-purple-400/80 mt-1">{isComplete ? '' : 'seconds'}</div>
        </div>
      </div>

      {/* Controls */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-[100]">
        <button
          onClick={startAnimation}
          className="px-6 py-3 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400 text-xs uppercase tracking-wider hover:bg-purple-500/30 hover:border-purple-500/50 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(139,92,246,0.2)] transition-all backdrop-blur-md"
        >
          ▶ Play
        </button>
        <button
          onClick={resetAnimation}
          className="px-6 py-3 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400 text-xs uppercase tracking-wider hover:bg-purple-500/30 hover:border-purple-500/50 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(139,92,246,0.2)] transition-all backdrop-blur-md"
        >
          ↺ Reset
        </button>
      </div>

      {/* Credit */}
      <div className="fixed bottom-5 right-5 text-[10px] text-purple-400/50 uppercase tracking-wider">
        Inspired by{' '}
        <a href="https://worksbyvan.com" target="_blank" rel="noopener noreferrer" className="text-purple-400/70 hover:text-purple-400 transition-colors">
          @worksbyvan
        </a>
        {' '}+{' '}
        <a href="https://blacklead.studio" target="_blank" rel="noopener noreferrer" className="text-purple-400/70 hover:text-purple-400 transition-colors">
          @blacklead.studio
        </a>
        {' '}+{' '}
        <a href="https://koturno.com" target="_blank" rel="noopener noreferrer" className="text-purple-400/70 hover:text-purple-400 transition-colors">
          @koturno
        </a>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        @keyframes bar-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes bar-glow-reverse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes card-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animate-blink {
          animation: blink 0.8s ease-in-out infinite;
        }
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
        .animate-bar-glow {
          animation: bar-glow 2s ease-in-out infinite alternate;
        }
        .animate-bar-glow-reverse {
          animation: bar-glow-reverse 2s ease-in-out infinite alternate-reverse;
        }
        .animate-card-glow {
          animation: card-glow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
