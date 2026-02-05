'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AutomaticFilmProcessTransformation() {
  const [stage, setStage] = useState<'screenplay' | 'transition' | 'projector'>('screenplay');
  const [countdown, setCountdown] = useState(10);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Automatically start the transformation after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setStage('transition');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // After transition, go to projector
  useEffect(() => {
    if (stage === 'transition') {
      const timer = setTimeout(() => {
        setStage('projector');
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [stage]);

  // Start countdown when projector stage is reached
  useEffect(() => {
    if (stage === 'projector' && countdown > 0) {
      intervalRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [stage, countdown]);

  return (
    <div className="relative h-[600px] flex items-center justify-center bg-gradient-to-b from-ivory to-old-gold rounded-2xl overflow-hidden">
      {/* Subtle gear pattern overlay */}
      <div className="absolute inset-0 steampunk-gear-pattern opacity-5 pointer-events-none" />
      
      <div className="max-w-4xl w-full px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold vintage-text-gold mb-4">
            See Our Process in Action
          </h2>
          <p className="text-xl text-charcoal/80">
            Watch how we transform stories into production-ready pitch decks
          </p>
        </div>

        <div className="relative h-96 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {stage === 'screenplay' && (
              <motion.div
                key="screenplay"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-2xl mx-auto"
              >
                <h3 className="font-display text-3xl font-bold text-charcoal mb-6">
                  Your Life Story or Idea
                </h3>
                <p className="text-lg text-charcoal/80 mb-8 leading-relaxed">
                  Transform your concept into a compelling screenplay format. 
                  We take your raw idea and craft it into a cinematic narrative 
                  that resonates with investors and audiences alike.
                </p>
                <div className="bg-ivory/50 p-6 rounded-xl border border-brass-dark/30">
                  <h4 className="font-bold text-charcoal mb-3">From Concept to Reality</h4>
                  <ul className="text-left text-charcoal/80 space-y-2">
                    <li className="flex items-start">
                      <span className="text-carnival-gold mr-2">✓</span>
                      <span>Idea development and refinement</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-carnival-gold mr-2">✓</span>
                      <span>Story structure and character development</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-carnival-gold mr-2">✓</span>
                      <span>Market positioning and audience targeting</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-carnival-gold mr-2">✓</span>
                      <span>Visual storytelling and presentation</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}

            {stage === 'transition' && (
              <motion.div
                key="transition"
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 1.2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="text-center"
              >
                <div className="text-6xl mb-4">🎬</div>
                <p className="text-2xl text-charcoal font-bold">
                  Transforming to Film...
                </p>
                <p className="text-charcoal/70 mt-2">Cinematic magic in progress</p>
              </motion.div>
            )}

            {stage === 'projector' && (
              <motion.div
                key="projector"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-md mx-auto"
              >
                {/* Retro Projector Screen */}
                <div className="relative bg-gray-800 p-6 rounded-lg border-8 border-gray-900 shadow-2xl mx-auto" 
                     style={{ maxWidth: '400px' }}>
                  {/* Projector Screen Effect */}
                  <div className="relative bg-black h-64 rounded overflow-hidden">
                    {/* Film Reel Effect */}
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-full border-4 border-gray-600 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full border border-gray-500"></div>
                    </div>
                    
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full border-4 border-gray-600 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full border border-gray-500"></div>
                    </div>
                    
                    {/* Screen Content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-7xl font-mono font-bold text-green-400 mb-2">
                          {countdown}
                        </div>
                        <div className="text-green-400 font-mono text-sm tracking-widest">
                          COUNTDOWN TO PREMIERE
                        </div>
                      </div>
                    </div>
                    
                    {/* Scan Lines Effect */}
                    <div className="absolute inset-0 pointer-events-none" style={{
                      background: `repeating-linear-gradient(
                        0deg,
                        rgba(0, 0, 0, 0.15),
                        rgba(0, 0, 0, 0.15) 1px,
                        transparent 1px,
                        transparent 2px
                      )`
                    }}></div>
                  </div>
                  
                  {/* Projector Body */}
                  <div className="mt-3 bg-gray-900 p-3 rounded">
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="text-gray-300 text-xs font-mono">FILM PROJECTOR 3000</div>
                    </div>
                  </div>
                </div>
                
                {countdown === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 text-center"
                  >
                    <p className="text-xl text-charcoal font-bold">
                      Lights, Camera, Action!
                    </p>
                    <p className="text-charcoal/80 mt-2">
                      Your story is now ready for the big screen
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {stage === 'projector' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-8 text-center"
          >
            <h3 className="font-display text-2xl font-bold text-charcoal mb-4">
              Your Story, Transformed
            </h3>
            <p className="text-lg text-charcoal/80 max-w-2xl mx-auto">
              From screenplay to cinematic reality. We transform your life story or idea 
              into a compelling visual narrative that captivates audiences.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}