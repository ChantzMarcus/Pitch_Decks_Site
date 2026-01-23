// components/SVGFilters.tsx
'use client';

/**
 * SVGFilters - Adds gooey liquid effect and other visual filters
 * Place this component at the root of your app to enable filter effects
 */
export default function SVGFilters() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="fixed w-0 h-0 pointer-events-none"
      style={{ position: 'absolute', width: 0, height: 0 }}
    >
      <defs>
        {/* Gooey filter - for liquid morphing effects */}
        <filter id="goo" filterUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 90 -20"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>

        {/* Discrete transition filter - for hard-edge transitions */}
        <filter
          id="component-discrete"
          filterUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="100%"
          height="100%"
        >
          <feGaussianBlur stdDeviation="0" />
          <feComponentTransfer>
            <feFuncA type="discrete" tableValues="0 1" />
          </feComponentTransfer>
          <feGaussianBlur id="post-blur" stdDeviation="0" result="cutoff" />
          <feComposite operator="atop" in="SourceGraphic" in2="cutoff" />
        </filter>

        {/* Noise texture filter */}
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.15" />
          </feComponentTransfer>
        </filter>

        {/* Glitch effect */}
        <filter id="glitch">
          <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="turbulence" />
          <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="5" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {/* Bloom/glow effect */}
        <filter id="bloom">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Wavy distortion */}
        <filter id="wavy">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.05" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" />
        </filter>
      </defs>
    </svg>
  );
}

// Custom hook to apply filters to elements
export function useFilter(filterId: string) {
  return {
    style: {
      filter: `url(#${filterId})`,
    },
  };
}

// Gooey effect button component
export function GooeyButton({
  children,
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`relative overflow-hidden ${className}`}
      style={{ filter: 'url(#goo)' }}
      {...props}
    >
      {children}
    </button>
  );
}

// Glitch text component
export function GlitchText({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`inline-block ${className}`} style={{ filter: 'url(#glitch)' }}>
      {children}
    </span>
  );
}
