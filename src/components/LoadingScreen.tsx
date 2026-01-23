// components/LoadingScreen.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
  subtext?: string;
  duration?: number;
  showSparkles?: boolean;
}

export default function LoadingScreen({
  message = 'Analyzing your story...',
  subtext = 'Our AI is evaluating your concept',
  duration = 3000, // 3 seconds minimum
  showSparkles = true,
}: LoadingScreenProps) {
  const minDuration = duration;
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    
    const timer = setInterval(() => {
      const now = Date.now();
      const newElapsed = now - startTime;
      setElapsed(newElapsed);
      
      if (newElapsed >= minDuration) {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [minDuration]);

  // Calculate progress percentage
  const progress = Math.min((elapsed / minDuration) * 100, 100);

  return (
    <div className="fixed inset-0 bg-paper flex items-center justify-center z-50">
      <div className="max-w-md mx-auto p-8 text-center">
        {/* Animated Circle Progress */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
              className="text-charcoal/10"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
              strokeLinecap="round"
              className="text-accent-indigo"
              initial={{ strokeDasharray: "0 314" }}
              animate={{ 
                strokeDasharray: [
                  `0 314`,
                  `${(progress * 314) / 100} 314`
                ] 
              }}
              transition={{ 
                duration: duration / 1000,
                ease: "easeInOut"
              }}
              style={{
                strokeDashoffset: 0,
              }}
            />
          </svg>
          
          {showSparkles && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              <Sparkles className="text-accent-indigo" size={24} />
            </motion.div>
          )}
        </div>

        {/* Progress Text */}
        <motion.h3 
          className="text-2xl font-bold text-charcoal mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {message}
        </motion.h3>
        
        <motion.p 
          className="text-charcoal/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {subtext}
        </motion.p>

        {/* Progress Bar */}
        <div className="mt-8">
          <div className="h-1.5 bg-charcoal/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-accent-indigo to-accent-gold"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: duration / 1000, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between text-sm text-charcoal/50 mt-2">
            <span>Processing</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}