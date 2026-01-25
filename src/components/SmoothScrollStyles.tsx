// components/SmoothScrollStyles.tsx - Global styles for smooth scrolling and hidden scrollbars
'use client';

/**
 * Add this component to your root layout to enable:
 * - Smooth scrolling
 * - Hidden scrollbars with scroll functionality preserved
 * - Prevent overscroll/bounce on mobile
 * - Better touch scrolling
 */

export function SmoothScrollStyles() {
  return (
    <style jsx global>{`
      /* Smooth scroll behavior */
      html {
        scroll-behavior: smooth;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      body {
        /* Hide scrollbar but keep functionality */
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE/Edge */
        -webkit-overflow-scrolling: touch; /* iOS smooth scroll */
        overscroll-behavior: none; /* Prevent bounce/pull-to-refresh */
      }

      /* Hide scrollbar for WebKit browsers */
      body::-webkit-scrollbar,
      *::-webkit-scrollbar {
        display: none;
        width: 0;
        height: 0;
      }

      /* Custom scrollbar for specific elements (when needed) */
      .custom-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: rgba(43, 43, 43, 0.3) transparent;
      }

      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }

      .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
      }

      .custom-scrollbar::-webkit-scrollbar-thumb {
        background-color: rgba(43, 43, 43, 0.3);
        border-radius: 10px;
      }

      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background-color: rgba(43, 43, 43, 0.5);
      }

      /* Prevent text selection on desktop (for app-like feel) */
      @media (min-width: 992px) {
        * {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      }

      /* Allow text selection for inputs */
      input,
      textarea,
      [contenteditable] {
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
      }

      /* Loading states */
      [data-load-bottom] {
        opacity: 0;
        transform: translate(0px, 50%);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      }

      [data-load-bottom].loaded {
        opacity: 1;
        transform: translate(0px, 0px);
      }

      [data-load-fade] {
        opacity: 0;
        transition: opacity 0.6s ease-out;
      }

      [data-load-fade].loaded {
        opacity: 1;
      }

      /* Smooth page transitions */
      .page-transition-enter {
        opacity: 0;
        transform: translateY(20px);
      }

      .page-transition-enter-active {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 0.3s ease-out, transform 0.3s ease-out;
      }

      .page-transition-exit {
        opacity: 1;
        transform: translateY(0);
      }

      .page-transition-exit-active {
        opacity: 0;
        transform: translateY(-20px);
        transition: opacity 0.3s ease-in, transform 0.3s ease-in;
      }

      /* Disable scroll during loading */
      body.loading {
        overflow: hidden;
      }

      /* Selection styling */
      ::selection {
        background-color: #4f46e5;
        color: #ffffff;
      }

      ::-moz-selection {
        background-color: #4f46e5;
        color: #ffffff;
      }

      /* Focus styles for accessibility */
      *:focus-visible {
        outline: 2px solid #4f46e5;
        outline-offset: 2px;
      }

      /* Reduce motion for users who prefer it */
      @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }
    `}</style>
  );
}
