// src/components/CinematicTransitions.tsx
import { motion, AnimatePresence, Transition } from 'framer-motion';

export const cinematicTransitions = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.8 }
  },
  slideInFromLeft: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
    transition: { duration: 0.6 }
  },
  slideInFromRight: {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 },
    transition: { duration: 0.6 }
  },
  zoomIn: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: { duration: 0.5 }
  },
  fadeThrough: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.5, ease: [0.42, 0, 0.58, 1] }
  },
  cinematicWipe: {
    initial: { clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' },
    animate: { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' },
    exit: { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' },
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
  },
  filmReel: {
    initial: { 
      opacity: 0,
      rotateX: 90,
      rotateY: 0,
      rotateZ: 0,
      transformPerspective: 1200
    },
    animate: { 
      opacity: 1,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      transformPerspective: 1200
    },
    exit: { 
      opacity: 0,
      rotateX: -90,
      rotateY: 0,
      rotateZ: 0,
      transformPerspective: 1200
    },
    transition: { 
      duration: 0.7,
      ease: [0.23, 1, 0.32, 1]
    }
  }
};

export function CinematicPageTransition({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function CinematicSectionTransition({
  children,
  type = 'fadeIn',
  delay = 0
}: {
  children: React.ReactNode;
  type?: keyof typeof cinematicTransitions;
  delay?: number;
}) {
  const transition = cinematicTransitions[type];

  return (
    <motion.div
      initial={transition.initial}
      animate={transition.animate}
      exit={transition.exit}
      transition={{
        ...transition.transition,
        delay: delay
      } as Transition}
    >
      {children}
    </motion.div>
  );
}

export function FilmReelTransition({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ 
          opacity: 0,
          rotateX: 90,
          transformPerspective: 1200
        }}
        animate={{ 
          opacity: 1,
          rotateX: 0,
          transformPerspective: 1200
        }}
        exit={{ 
          opacity: 0,
          rotateX: -90,
          transformPerspective: 1200
        }}
        transition={{ 
          duration: 0.7,
          ease: [0.23, 1, 0.32, 1]
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function FadeThroughTransition({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}