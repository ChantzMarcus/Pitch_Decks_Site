'use client';

import { motion } from 'framer-motion';

interface StaggeredGridProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeInOut' as const },
  },
};

export default function StaggeredGrid({
  children,
  className = '',
  staggerDelay = 0.1,
}: StaggeredGridProps) {
  const containerVariantsWithDelay = {
    ...containerVariants,
    visible: {
      ...containerVariants.visible,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2,
      },
    },
  };

  // Clone children and add motion wrapper
  const childrenWithMotion = Array.isArray(children)
    ? children.map((child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))
    : children;

  return (
    <motion.div
      variants={containerVariantsWithDelay}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {childrenWithMotion}
    </motion.div>
  );
}
