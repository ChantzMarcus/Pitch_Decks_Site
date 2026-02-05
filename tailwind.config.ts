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

        // Willy Wonka/Carnival Color Palette
        'wonka-purple': '#8A2BE2',    // Rich purple (candy color)
        'wonka-pink': '#FF69B4',      // Vibrant pink (candy color)
        'wonka-yellow': '#FFD700',    // Golden yellow (candy color)
        'wonka-orange': '#FF8C00',    // Vibrant orange (candy color)
        'wonka-green': '#32CD32',     // Lime green (candy color)
        'wonka-blue': '#1E90FF',      // Dodger blue (candy color)
        'wonka-red': '#FF4500',       // Orange red (candy color)
        'cotton-candy': '#FFB6C1',    // Cotton candy pink
        'lollipop-red': '#DC143C',    // Lollipop red
        'chocolate-brown': '#8B4513', // Chocolate brown
        'cream': '#FFFDD0',           // Cream color
        'rainbow': 'linear-gradient(45deg, #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #4B0082, #9400D3)',

        // Vintage Circus & Steampunk Color Palette
        'circus-red': '#B22222',       // Deep circus red
        'big-top-navy': '#0F1C2E',     // Deep navy for big top
        'carnival-gold': '#DAA520',    // Rich carnival gold
        'steampunk-brass': '#BFA35F',  // Aged brass
        'steampunk-copper': '#B87333', // Aged copper
        'steampunk-steel': '#7A7A7A',  // Industrial steel
        'vintage-velvet': '#8B0000',   // Deep red velvet
        'gas-light-yellow': '#F0E68C', // Warm gas light yellow
        'ivory': '#FFFFF0',            // Old ivory
        'antique-silver': '#C0C0C0',   // Antique silver
        'mechanical-gear': '#8B7355',  // Bronze gear color
        'circus-bright-red': '#DC143C', // Bright circus red
        'vintage-crimson': '#DC143C',  // Vintage crimson
        'carnival-blue': '#191970',    // Deep carnival blue
        'old-gold': '#CFB53B',         // Old gold
        'brass-dark': '#9D7441',       // Dark brass
        'copper-oxide': '#DA8A67',     // Oxidized copper
        'vintage-emerald': '#50C878',  // Vintage emerald
        'gaslight-gradient': 'linear-gradient(135deg, #F0E68C, #DAA520, #B87333)',
        'circus-gradient': 'linear-gradient(45deg, #B22222, #8B0000, #B87333)',
        'steampunk-gradient': 'linear-gradient(135deg, #7A7A7A, #BFA35F, #8B7355)',

        // Metallic/Circus Golden Ticket Palette (1840s-1930s)
        'gold-100': '#FFF9E6',        // Pale gold
        'gold-200': '#FFE566',        // Light gold
        'gold-300': '#FFD700',        // True gold
        'gold-400': '#E6B800',        // Rich gold
        'gold-500': '#CC9900',        // Deep gold
        'gold-600': '#B8860B',        // Dark gold
        'silver-100': '#F5F5F5',      // Pale silver
        'silver-200': '#E8E8E8',      // Light silver
        'silver-300': '#C0C0C0',      // True silver
        'silver-400': '#A8A8A8',      // Medium silver
        'silver-500': '#909090',      // Dark silver
        'bronze-300': '#E6A850',      // Light bronze
        'bronze-400': '#CD7F32',      // True bronze
        'bronze-500': '#B87333',      // Deep bronze
        'circus-cream': '#FDF5E6',    // Vintage cream background
        'circus-black': '#1A1A1A',    // Vintage black
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        decorative: ['Playfair Display', 'serif'],
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
