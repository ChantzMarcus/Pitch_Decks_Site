'use client';

import { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface WonkaModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  variant?: 'golden-ticket' | 'candy-jar' | 'chocolate-fall' | 'glass-elevator';
}

export default function WonkaModal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  variant = 'golden-ticket'
}: WonkaModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const getVariantClasses = () => {
    switch(variant) {
      case 'candy-jar':
        return 'bg-gradient-to-br from-cotton-candy to-wonka-pink border-4 border-wonka-purple rounded-3xl';
      case 'chocolate-fall':
        return 'bg-gradient-to-br from-chocolate-brown to-amber-900 border-4 border-wonka-yellow rounded-2xl';
      case 'glass-elevator':
        return 'bg-gradient-to-br from-cream to-wonka-blue border-4 border-wonka-green rounded-xl';
      case 'golden-ticket':
      default:
        return 'bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300 border-4 border-gold rounded-2xl';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className={`relative max-w-2xl w-full max-h-[90vh] overflow-y-auto ${getVariantClasses()}`}
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                y: 0,
                transition: { type: "spring", bounce: 0.3, duration: 0.6 }
              }}
              exit={{ 
                scale: 0.8, 
                opacity: 0, 
                y: 50,
                transition: { duration: 0.2 }
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors z-10"
                aria-label="Close modal"
              >
                <X className="text-chocolate-brown" />
              </button>
              
              {title && (
                <div className="pt-6 px-6 pb-2">
                  <h2 className="font-display text-2xl font-bold text-chocolate-brown">
                    {title}
                  </h2>
                </div>
              )}
              
              <div className="p-6 pt-2">
                {children}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}