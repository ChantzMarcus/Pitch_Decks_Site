'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// The emotional opening text that transforms
const RAW_STORY_TEXT = `"your story deserves to be a movie..."

now from the most riveting cold open, we will begin to tell the world your story and ask that they hang on by their fingers, and walk through this journey in your shoes, and no it never starts perfect, nor am i perfect, but i'm here, and that's a miracle right.`;

// Story stages for the assembly line
const STAGES = [
  {
    id: 1,
    title: 'Your Story',
    format: 'plain',
    sample: RAW_STORY_TEXT.slice(0, 50) + '...',
    fullText: RAW_STORY_TEXT,
    color: 'from-gray-400 to-gray-500',
    bg: 'bg-gray-900/50'
  },
  {
    id: 2,
    title: 'Cold Open',
    format: 'structured',
    sample: 'EXT. YOUR WORLD - DAY\nA riveting moment...',
    color: 'from-amber-400 to-amber-500',
    bg: 'bg-amber-950/30'
  },
  {
    id: 3,
    title: 'The Journey',
    format: 'outline',
    sample: 'ACT I • ACT II • ACT III\nThey walk in your shoes...',
    color: 'from-yellow-400 to-yellow-500',
    bg: 'bg-yellow-950/30'
  },
  {
    id: 4,
    title: 'Screenplay',
    format: 'screenplay',
    sample: 'EXT. ESTABLISHED WORLD - DAY\n\nThe miracle begins...\n\nFADE IN.',
    color: 'from-vintage-gold to-brass-dark',
    bg: 'bg-amber-900/40'
  }
];

// Individual text item that transforms
interface TransformingTextItem {
  stage: number;
  index: number;
  total: number;
}

function TransformingText({ stage, index }: TransformingTextItem) {
  const currentStage = STAGES[stage];

  return (
    <motion.div
      initial={{ opacity: 0, x: -100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={`relative ${currentStage.bg} rounded-2xl border border-white/10 overflow-hidden w-[280px] md:w-[320px]`}
    >
      {/* Glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentStage.color} opacity-10`} />

      {/* Stage indicator */}
      <div className="absolute top-4 right-4 flex gap-1">
        {STAGES.map((s, i) => (
          <div
            key={s.id}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              i <= stage
                ? `bg-gradient-to-r ${currentStage.color}`
                : 'bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative p-6">
        {/* Stage label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + index * 0.1 }}
          className={`text-xs font-bold tracking-widest uppercase mb-4 bg-gradient-to-r ${currentStage.color} bg-clip-text text-transparent`}
        >
          Stage 0{stage + 1}: {currentStage.title}
        </motion.div>

        {/* Text content with format-specific styling */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 + index * 0.1 }}
          className="min-h-[120px] flex items-center justify-center"
        >
          {stage === 0 && (
            <div className="text-gray-400 text-lg italic text-center">
              &ldquo;your life story...&rdquo;
            </div>
          )}

          {stage === 1 && (
            <div className="text-amber-200 text-sm font-mono">
              <div className="text-amber-500/60 text-xs mb-2">CONCEPT:</div>
              <div className="leading-relaxed">
                A compelling narrative<br/>
                with emotional depth<br/>
                and commercial potential
              </div>
            </div>
          )}

          {stage === 2 && (
            <div className="text-yellow-200 text-sm font-mono">
              <div className="text-yellow-500/60 text-xs mb-2">STRUCTURE:</div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                  <span>ACT I: Setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                  <span>ACT II: Conflict</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                  <span>ACT III: Resolution</span>
                </div>
              </div>
            </div>
          )}

          {stage === 3 && (
            <div className="text-vintage-gold text-xs font-mono">
              <div className="border-l-2 border-vintage-gold/50 pl-3 mb-2">
                <div className="text-vintage-gold/60 text-xs mb-1">SCENE HEADING</div>
                <div>INT. WORLD - DAY</div>
              </div>
              <div className="text-vintage-gold/80 leading-relaxed">
                Your story comes alive<br/>
                on the page...
              </div>
            </div>
          )}
        </motion.div>

        {/* Transformation arrow for non-final stages */}
        {stage < 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            className="mt-4 flex justify-center"
          >
            <div className="flex items-center gap-2 text-white/40 text-xs">
              <span>transform</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// Conveyor belt track
function ConveyorBelt() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Moving track lines */}
      <div className="absolute inset-y-0 left-0 right-0 flex">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="flex-1 border-r border-white/5"
            animate={{
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      /* Animated dots on the track */
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 -translate-y-1/2 w-1 h-1 bg-vintage-gold/30 rounded-full"
            initial={{ left: '-5%' }}
            animate={{ left: '105%' }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 1.5,
              ease: 'linear'
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Main assembly line component
interface TextAssemblyLineProps {
  title?: string;
  subtitle?: string;
}

export default function TextAssemblyLine({
  title = 'From Raw Idea to Screenplay',
  subtitle = 'Watch your story transform through our proven process'
}: TextAssemblyLineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-20 overflow-hidden bg-gradient-to-b from-charcoal via-[#0a0805] to-charcoal"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold vintage-text-gold mb-4">
            {title}
          </h2>
          <p className="text-xl text-amber-200/70 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Assembly Line Container */}
        <div className="relative">
          {/* Stage labels above */}
          <div className="hidden md:grid md:grid-cols-4 gap-4 mb-8 px-4">
            {STAGES.map((stage, i) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className={`text-xs font-bold tracking-widest uppercase bg-gradient-to-r ${stage.color} bg-clip-text text-transparent`}>
                  {stage.title}
                </div>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mt-2" />
              </motion.div>
            ))}
          </div>

          {/* Conveyor Belt Track */}
          <div className="relative bg-charcoal/80 rounded-3xl border border-white/10 overflow-hidden p-8 md:p-12">
            <ConveyorBelt />

            {/* Assembly Line Items */}
            <div className="relative">
              {/* Large screens: Show all 4 stages side by side */}
              <div className="hidden md:grid md:grid-cols-4 gap-6">
                {isVisible && STAGES.map((stage, i) => (
                  <TransformingText
                    key={stage.id}
                    stage={i}
                    index={i}
                    total={STAGES.length}
                  />
                ))}
              </div>

              {/* Small screens: Vertical stack with scroll */}
              <div className="md:hidden space-y-6">
                {isVisible && STAGES.map((stage, i) => (
                  <TransformingText
                    key={stage.id}
                    stage={i}
                    index={i}
                    total={STAGES.length}
                  />
                ))}
              </div>
            </div>

            {/* Animated progress line below */}
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-vintage-gold via-brass-dark to-vintage-gold"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.5 }}
            />
          </div>

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="text-center mt-12"
          >
            <p className="text-amber-200/60 mb-6">
              Your story goes through this same transformation
            </p>
            <a
              href="/questionnaire"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-vintage-gold to-brass-dark text-charcoal font-semibold rounded-xl hover:scale-105 transition-transform shadow-lg shadow-amber-500/20"
            >
              Start Your Transformation
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-vintage-gold/20 rounded-full"
            style={{ left: `${10 + i * 15}%`, bottom: '20%' }}
          >
            <motion.div
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              className="w-full h-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

// Alternate version: Animated horizontal scroll assembly line
export function HorizontalScrollAssemblyLine({
  title = 'The Assembly Line',
  subtitle = 'Your story, transformed'
}: {
  title?: string;
  subtitle?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const stories = [
    { raw: '"my memoir"', transformed: 'INT. HOME - DAY\nA life remembered...' },
    { raw: '"startup idea"', transformed: 'INT. OFFICE - NIGHT\nThe pitch that changed everything...' },
    { raw: '"family drama"', transformed: 'EXT. BACKYARD - SUMMER\nSecrets revealed under the sun...' },
    { raw: '"adventure novel"', transformed: 'EXT. JUNGLE - DAY\nThe quest begins...' },
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-charcoal to-[#0a0805]">
      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold vintage-text-gold mb-4">
            {title}
          </h2>
          <p className="text-xl text-amber-200/70">{subtitle}</p>
        </motion.div>
      </div>

      {/* Horizontal scrolling assembly line */}
      <div
        ref={scrollRef}
        className="relative overflow-hidden"
      >
        {/* Animated scroll container */}
        <motion.div
          className="flex gap-8 px-8"
          animate={{
            x: [0, -1500],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {/* Duplicate items for seamless loop */}
          {[...stories, ...stories, ...stories].map((story, i) => (
            <motion.div
              key={`${story.raw}-${i}`}
              className="flex-shrink-0 w-80"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative bg-charcoal/80 rounded-2xl border border-white/10 overflow-hidden">
                {/* Raw text (left side of card) */}
                <div className="p-4 border-b border-white/10">
                  <div className="text-xs text-gray-500 mb-2">INPUT</div>
                  <div className="text-gray-400 italic">&ldquo;{story.raw}&rdquo;</div>
                </div>

                {/* Transformation arrow */}
                <div className="flex justify-center py-3 bg-gradient-to-b from-amber-900/20 to-transparent">
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-vintage-gold"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </motion.div>
                </div>

                {/* Transformed text (right side of card) */}
                <div className="p-4 bg-amber-950/20">
                  <div className="text-xs text-vintage-gold/60 mb-2">OUTPUT</div>
                  <div className="text-vintage-gold text-xs font-mono whitespace-pre-line">
                    {story.transformed}
                  </div>
                </div>

                {/* Progress indicator */}
                <div className="absolute top-2 right-2 flex gap-1">
                  {[0, 1, 2].map((j) => (
                    <motion.div
                      key={j}
                      className="w-1 h-1 rounded-full bg-vintage-gold/30"
                      animate={{
                        backgroundColor: j <= (i % 3) ? 'rgb(251, 191, 36)' : 'rgba(251, 191, 36, 0.3)',
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Fade gradients on edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-charcoal to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-charcoal to-transparent z-10" />
      </div>
    </section>
  );
}
