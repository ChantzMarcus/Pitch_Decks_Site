// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Cinematic dark background palette (2025 film industry standard)
        'charcoal': '#0A0A0A',       // Deep black (main background)
        'charcoal-light': '#141414', // Slightly lighter (cards, sections)
        'charcoal-medium': '#1E1E1E', // Medium dark (elevated elements)
        'paper': '#F5F5F5',          // Light text (high contrast for readability)
        'paper-muted': '#A0A0A0',    // Muted text (secondary, captions)
        'accent-indigo': '#6366F1',  // Brighter indigo for visibility on dark
        'accent-indigo-glow': '#818CF8',
        'accent-red': '#EF4444',     // Bright red for CTAs
        'accent-gold': '#F59E0B',    // Gold (unchanged, works well on dark)
        'accent-teal': '#14B8A6',    // New: cinematic teal accent
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
