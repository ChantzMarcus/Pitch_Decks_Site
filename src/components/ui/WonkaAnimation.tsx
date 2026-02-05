'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface WonkaAnimationProps {
  children: React.ReactNode;
  type?: 'candy-bounce' | 'golden-ticket' | 'chocolate-river' | 'fizzy-lifting' | 'oompah-loompa';
  duration?: number;
  delay?: number;
  className?: string;
}

export default function WonkaAnimation({ 
  children, 
  type = 'candy-bounce', 
  duration = 2,
  delay = 0,
  className = ''
}: WonkaAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  const getAnimationProps = () => {
    switch(type) {
      case 'golden-ticket':
        return {
          initial: { scale: 0, rotate: -180 },
          animate: isVisible ? { 
            scale: 1, 
            rotate: 0,
            boxShadow: [
              "0 0 0 0 rgba(212, 175, 55, 0.7)",
              "0 0 0 20px rgba(212, 175, 55, 0)"
            ]
          } : {},
          transition: {
            type: "spring" as const,
            stiffness: 300,
            damping: 20,
            duration: duration,
            times: [0, 0.2, 0.5, 1],
            boxShadow: {
              duration: duration,
              repeat: Infinity,
              repeatType: "reverse" as const
            }
          }
        };
      
      case 'chocolate-river':
        return {
          initial: { x: -100, opacity: 0 },
          animate: isVisible ? { 
            x: 0, 
            opacity: 1,
            background: [
              "linear-gradient(90deg, #3B2F2F, #5C4343)",
              "linear-gradient(90deg, #5C4343, #8B4513)",
              "linear-gradient(90deg, #8B4513, #3B2F2F)"
            ]
          } : {},
          transition: { 
            x: { duration: duration, ease: "easeOut" },
            background: { 
              duration: duration * 2, 
              repeat: Infinity,
              repeatType: "reverse" as const
            }
          }
        };
      
      case 'fizzy-lifting':
        return {
          initial: { y: 100, opacity: 0 },
          animate: isVisible ? { 
            y: [100, 50, 0, -10, 0],
            opacity: 1,
            rotate: [0, 5, -5, 0]
          } : {},
          transition: { 
            y: { 
              duration: duration, 
              ease: "easeOut",
              times: [0, 0.3, 0.6, 0.8, 1]
            },
            rotate: {
              duration: duration * 0.5,
              repeat: Infinity,
              repeatType: "reverse" as const,
            }
          }
        };
      
      case 'oompah-loompa':
        return {
          initial: { scale: 0 },
          animate: isVisible ? { 
            scale: [0, 1.1, 1, 1.05, 1],
            backgroundColor: [
              "#8A2BE2", // wonka-purple
              "#FF69B4", // wonka-pink
              "#FFD700", // wonka-yellow
              "#FF8C00", // wonka-orange
              "#32CD32", // wonka-green
              "#1E90FF", // wonka-blue
              "#8A2BE2"  // wonka-purple
            ]
          } : {},
          transition: { 
            scale: { 
              duration: duration, 
              times: [0, 0.2, 0.4, 0.7, 1]
            },
            backgroundColor: { 
              duration: duration * 2, 
              repeat: Infinity,
              repeatType: "loop" as const
            }
          }
        };
      
      case 'candy-bounce':
      default:
        return {
          initial: { scale: 0, y: 50 },
          animate: isVisible ? { 
            scale: [0, 1.2, 0.9, 1.1, 1],
            y: [50, -20, 10, -5, 0],
            boxShadow: [
              "0 0 0 0 rgba(255, 105, 180, 0.7)",
              "0 0 0 20px rgba(255, 105, 180, 0)"
            ]
          } : {},
          transition: { 
            scale: { 
              duration: duration, 
              times: [0, 0.3, 0.6, 0.8, 1]
            },
            y: { 
              duration: duration, 
              ease: "easeOut",
              times: [0, 0.3, 0.6, 0.8, 1]
            },
            boxShadow: {
              duration: duration,
              repeat: Infinity,
              repeatType: "reverse" as const
            }
          }
        };
    }
  };

  const animationProps = getAnimationProps();

  return (
    <motion.div 
      className={className}
      {...animationProps}
    >
      {children}
    </motion.div>
  );
}

// Special Wonka-themed animated text component
export const WonkaText = ({ 
  children, 
  type = 'candy-bounce', 
  duration = 2,
  delay = 0,
  className = '' 
}: WonkaAnimationProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  const getAnimationProps = () => {
    switch(type) {
      case 'candy-bounce':
        return {
          initial: { backgroundPosition: "0% 50%" },
          animate: isVisible ? {
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            scale: [1, 1.05, 1]
          } : {},
          transition: {
            backgroundPosition: {
              duration: duration,
              repeat: Infinity,
              ease: "linear" as const
            },
            scale: {
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse" as const
            }
          }
        };
      
      default:
        return {
          initial: { opacity: 0, y: 20 },
          animate: isVisible ? { 
            opacity: 1, 
            y: 0,
            textShadow: [
              "0 0 0px rgba(138, 43, 226, 0.5)",
              "0 0 10px rgba(138, 43, 226, 0.8)",
              "0 0 0px rgba(138, 43, 226, 0.5)"
            ]
          } : {},
          transition: {
            y: { duration: duration * 0.5, ease: "easeOut" as const },
            textShadow: {
              duration: duration,
              repeat: Infinity,
              repeatType: "loop" as const
            }
          }
        };
    }
  };

  const animationProps = getAnimationProps();

  return (
    <motion.span 
      className={`font-display ${className}`}
      {...animationProps}
    >
      {children}
    </motion.span>
  );
};