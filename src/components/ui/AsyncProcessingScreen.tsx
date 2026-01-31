'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Mail, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface AsyncProcessingScreenProps {
  userName?: string;
  userEmail?: string;
  estimatedTimeMinutes?: number;
  onLeave?: () => void;
}

/**
 * Async Processing Screen
 * Shows while StakeOS processes the story (15+ minutes)
 * Allows user to leave and get email notification
 */
export default function AsyncProcessingScreen({
  userName,
  userEmail,
  estimatedTimeMinutes = 15,
  onLeave,
}: AsyncProcessingScreenProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showLeaveOption, setShowLeaveOption] = useState(false);
  const firstName = userName?.split(' ')[0] || 'there';

  useEffect(() => {
    // Show leave option after 30 seconds
    const leaveTimer = setTimeout(() => {
      setShowLeaveOption(true);
    }, 30000);

    // Update elapsed time
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(leaveTimer);
    };
  }, []);

  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const progress = Math.min((elapsedSeconds / (estimatedTimeMinutes * 60)) * 100, 95); // Cap at 95% until actually done

  return (
    <div className="fixed inset-0 bg-paper flex items-center justify-center z-50 p-6">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center"
        >
          {/* Animated Processing Icon */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0"
            >
              <Sparkles className="text-accent-indigo w-full h-full" />
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 bg-accent-indigo/20 rounded-full"
              />
            </div>
          </div>

          {/* Main Message */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl font-bold text-charcoal mb-4"
          >
            Processing Through StakeOS
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-charcoal/70 mb-6"
          >
            Your story is being analyzed by our proprietary system, comparing it to thousands of successful projects in our database.
          </motion.p>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2 text-sm text-charcoal/60">
              <span>Processing...</span>
              <span>{elapsedMinutes > 0 ? `${elapsedMinutes}m elapsed` : `${elapsedSeconds}s elapsed`}</span>
            </div>
            <div className="h-3 bg-charcoal/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-accent-indigo via-accent-gold to-accent-indigo relative overflow-hidden"
                initial={{ width: '5%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-100%', '200%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
              </motion.div>
            </div>
            <p className="text-sm text-charcoal/50 mt-2">
              Estimated time: ~{estimatedTimeMinutes} minutes
            </p>
          </div>

          {/* What's Happening */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-charcoal/5 rounded-xl p-6 mb-6 text-left"
          >
            <h3 className="font-semibold text-charcoal mb-4 flex items-center gap-2">
              <Clock size={18} className="text-accent-indigo" />
              What's happening now:
            </h3>
            <ul className="space-y-2 text-sm text-charcoal/70">
              <li className="flex items-start gap-2">
                <span className="text-accent-indigo mt-1">•</span>
                <span>Querying StakeOS database of successful projects</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-indigo mt-1">•</span>
                <span>Comparing your story to industry benchmarks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-indigo mt-1">•</span>
                <span>Analyzing commercial viability and market positioning</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-indigo mt-1">•</span>
                <span>Generating comprehensive insights and recommendations</span>
              </li>
            </ul>
          </motion.div>

          {/* Leave Option - Shows after 30 seconds */}
          <AnimatePresence>
            {showLeaveOption && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-charcoal/10 pt-6 mt-6"
              >
                <div className="bg-gradient-to-br from-accent-indigo/5 to-accent-gold/5 rounded-xl p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-accent-indigo/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="text-accent-indigo" size={24} />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-charcoal mb-2">
                        Don't want to wait?
                      </h3>
                      <p className="text-sm text-charcoal/70 mb-4">
                        We'll send your complete StakeOS analysis to <span className="font-medium text-charcoal">{userEmail}</span> when it's ready (usually within {estimatedTimeMinutes} minutes).
                      </p>
                      {onLeave ? (
                        <button
                          onClick={onLeave}
                          className="px-6 py-3 bg-accent-indigo text-white font-medium rounded-lg hover:bg-accent-indigo/90 transition-colors"
                        >
                          I'll Check My Email
                        </button>
                      ) : (
                        <Link
                          href="/"
                          className="inline-block px-6 py-3 bg-accent-indigo text-white font-medium rounded-lg hover:bg-accent-indigo/90 transition-colors"
                        >
                          I'll Check My Email
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-charcoal/50">
                    <CheckCircle size={14} />
                    <span>Your analysis will continue processing - no action needed</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stay Option */}
          {!showLeaveOption && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-sm text-charcoal/50"
            >
              This page will automatically update when your analysis is complete
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
