'use client';

import { motion } from 'framer-motion';
import CinematicText, { CinematicTitle, CinematicSubtitle, CinematicQuote, TypewriterText } from '@/components/ui/CinematicText';

export default function TypographyDemo() {
  return (
    <div className="min-h-screen bg-charcoal text-paper py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <CinematicSubtitle>CINEMATIC TYPOGRAPHY SYSTEM</CinematicSubtitle>
          <h1 className="font-display text-5xl md:text-7xl font-bold mt-4 mb-8 text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-accent-indigo">
            Film-Inspired Text Design
          </h1>
          <p className="font-body text-xl text-paper-muted max-w-3xl mx-auto">
            A showcase of the new cinematic typography system with variable fonts, 
            enhanced readability, and film-inspired text treatments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-charcoal-light p-8 rounded-2xl border border-charcoal-medium"
          >
            <h2 className="font-display text-3xl font-bold mb-6 text-accent-gold">Display Typography</h2>
            <CinematicTitle>Film Pitch Decks That Captivate Audiences</CinematicTitle>
            <p className="font-body text-lg mt-6 text-paper-muted">
              Using Fraunces Variable font with optical sizing for optimal readability at any size.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-charcoal-light p-8 rounded-2xl border border-charcoal-medium"
          >
            <h2 className="font-display text-3xl font-bold mb-6 text-accent-indigo">Body Typography</h2>
            <p className="font-body text-lg leading-relaxed">
              Inter Variable font provides excellent readability for long-form content. 
              The variable font technology adjusts to different weights and optical sizes 
              for optimal legibility across all devices.
            </p>
            <div className="mt-6 p-4 bg-charcoal-medium rounded-lg">
              <code className="font-mono text-sm text-accent-teal">
                {`// Example of monospace typography\nconst cinematicEffect = {\n  font: 'JetBrains Mono',\n  weight: 'normal'\n};`}
              </code>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-br from-charcoal-light to-charcoal-medium p-12 rounded-2xl border border-accent-indigo/20 mb-20"
        >
          <CinematicQuote>
            Great typography is the difference between a good film and a masterpiece. 
            It guides the viewer's eye, sets the mood, and enhances the narrative.
          </CinematicQuote>
          <div className="mt-8 text-right text-paper-muted text-sm">
            — Modern Film Typography Principles
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <h2 className="font-display text-3xl font-bold mb-8">Animated Typography</h2>
          <div className="bg-charcoal-light p-8 rounded-2xl inline-block">
            <TypewriterText>Experience the magic of cinematic storytelling...</TypewriterText>
          </div>
        </motion.div>
      </div>
    </div>
  );
}