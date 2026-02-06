import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

interface FilmIconProps extends IconProps {}

// Film Reel Icon
export function FilmReelIcon({ className = '', size = 24 }: FilmIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
      <path d="M18 12h.01" />
      <path d="M6 12h.01" />
    </svg>
  );
}

// Spotlight Icon
export function SpotlightIcon({ className = '', size = 24 }: FilmIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 1v22" />
      <path d="M17 5h1a2 2 0 0 1 2 2v1" />
      <path d="M11 5H4a2 2 0 0 0-2 2v1" />
      <path d="M17 18h1a2 2 0 0 0 2-2v-1" />
      <path d="M11 18H4a2 2 0 0 1-2-2v-1" />
      <path d="M7 12h10" />
      <path d="M12 7v10" />
    </svg>
  );
}

// Script Icon
export function ScriptIcon({ className = '', size = 24 }: FilmIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  );
}

// Director's Chair Icon
export function DirectorsChairIcon({ className = '', size = 24 }: FilmIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 20v-5h20v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z" />
      <path d="M12 15V6" />
      <path d="M12 6 8 2" />
      <path d="m12 6 4-4" />
      <path d="m8 10 .88.88a1 1 0 0 1 0 1.41 1 1 0 0 1-1.41 0L8 11.7" />
      <path d="m15 10 .88.88a1 1 0 0 1 0 1.41 1 1 0 0 1-1.41 0L15 11.7" />
    </svg>
  );
}

// Movie Star Icon
export function MovieStarIcon({ className = '', size = 24 }: FilmIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

// Camera Lens Icon
export function CameraLensIcon({ className = '', size = 24 }: FilmIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M5 12h14" />
      <path d="M12 5v14" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

// Film Slate Icon
export function FilmSlateIcon({ className = '', size = 24 }: FilmIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.5 12v6h-6" />
      <path d="M3 12h18" />
      <path d="M3 6h18" />
      <path d="M3 18h18" />
      <path d="M12 12v6" />
      <path d="M9 12v6" />
      <path d="M15 12v6" />
    </svg>
  );
}

// Box Office Chart Icon
export function BoxOfficeChartIcon({ className = '', size = 24 }: FilmIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="M7 16h8" />
      <path d="M7 11h10" />
      <path d="M7 6h5" />
      <path d="M9 16v-6" />
      <path d="M15 11v-1" />
      <path d="M12 16v-4" />
    </svg>
  );
}

// Film Strip Icon
export function FilmStripIcon({ className = '', size = 24 }: FilmIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <path d="M3 9h18" />
      <path d="M3 15h18" />
      <path d="M9 3v18" />
      <path d="M15 3v18" />
    </svg>
  );
}

// Clapperboard Icon
export function ClapperboardIcon({ className = '', size = 24 }: FilmIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4l4 4-4 4 4-4z" />
      <path d="M8 8l4 4-4 4 4-4z" />
      <path d="M12 12l4 4-4 4 4-4z" />
      <path d="M16 16l4 4-4 4 4-4z" />
      <path d="M20 20l4 4-4 4 4-4z" />
      <path d="M2 2l20 20" />
    </svg>
  );
}

// Cinema Seats Icon
export function CinemaSeatsIcon({ className = '', size = 24 }: FilmIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10h16v8H4z" />
      <path d="M2 10v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V10" />
      <path d="M7 14h10" />
      <path d="M9 6h6" />
      <path d="M12 2v4" />
    </svg>
  );
}

// Popcorn Icon
export function PopcornIcon({ className = '', size = 24 }: FilmIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8a2 2 0 0 0 0-4 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0 0 4" />
      <path d="M10 10v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10" />
      <path d="M6 6L3 3" />
      <path d="M6 18L3 21" />
      <path d="M18 6l3-3" />
      <path d="M18 18l3 3" />
    </svg>
  );
}

// Film Reel Spool Icon
export function FilmReelSpoolIcon({ className = '', size = 24 }: FilmIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="8" />
      <path d="M12 2v4" />
      <path d="M12 18v4" />
      <path d="M4.93 4.93l2.83 2.83" />
      <path d="M16.24 16.24l2.83 2.83" />
      <path d="M2 12h4" />
      <path d="M18 12h4" />
      <path d="M4.93 19.07l2.83-2.83" />
      <path d="M16.24 7.76l2.83-2.83" />
    </svg>
  );
}

// Movie Theater Icon
export function MovieTheaterIcon({ className = '', size = 24 }: FilmIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12h20" />
      <path d="M2 8h20" />
      <path d="M2 4h20" />
      <path d="M2 16h20" />
      <path d="M2 20h20" />
      <path d="M12 8v8" />
      <path d="M8 8v8" />
      <path d="M16 8v8" />
    </svg>
  );
}

// Red Carpet Icon
export function RedCarpetIcon({ className = '', size = 24 }: FilmIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16" />
      <path d="M4 8h16" />
      <path d="M4 12h16" />
      <path d="M4 16h16" />
      <path d="M4 20h16" />
      <path d="M12 4v16" />
      <path d="M8 4v16" />
      <path d="M16 4v16" />
    </svg>
  );
}

// Film Camera Icon
export function FilmCameraIcon({ className = '', size = 24 }: FilmIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="3" />
      <path d="M17 8v2" />
      <path d="M7 8v2" />
      <path d="M17 14v2" />
      <path d="M7 14v2" />
    </svg>
  );
}

// Movie Ticket Icon
export function MovieTicketIcon({ className = '', size = 24 }: FilmIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2Z" />
      <path d="M12 12v.01" />
      <path d="M8 12v.01" />
      <path d="M16 12v.01" />
    </svg>
  );
}

// Spotlight Stage Icon
export function SpotlightStageIcon({ className = '', size = 24 }: FilmIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 12v.01" />
      <path d="M12 8v.01" />
      <path d="M12 16v.01" />
      <path d="M8 12v.01" />
      <path d="M16 12v.01" />
      <path d="M10 6v.01" />
      <path d="M14 18v.01" />
      <path d="M6 10v.01" />
      <path d="M18 14v.01" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M4.93 4.93l1.41 1.41" />
      <path d="M17.66 17.66l1.41 1.41" />
      <path d="M4.93 19.07l1.41-1.41" />
      <path d="M17.66 6.34l1.41-1.41" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
    </svg>
  );
}

// Film Projector Icon
export function FilmProjectorIcon({ className = '', size = 24 }: FilmIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="3" />
      <path d="M17 8v2" />
      <path d="M7 8v2" />
      <path d="M7 14v2" />
      <path d="M17 14v2" />
      <path d="M12 15v5" />
      <path d="M9 20h6" />
    </svg>
  );
}

// Award Icon (trophies/achievements)
export function AwardIcon({ className = '', size = 24 }: FilmIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      <line x1="12" y1="2" x2="12" y2="4" />
    </svg>
  );
}

// Movie Clapboard Icon
export function MovieClapboardIcon({ className = '', size = 24 }: FilmIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4v4" />
      <path d="M12 4v4" />
      <path d="M20 4v4" />
      <path d="M4 8v8" />
      <path d="M20 8v8" />
      <path d="M4 16v4" />
      <path d="M12 16v4" />
      <path d="M20 16v4" />
      <path d="M8 8v8" />
      <path d="M16 8v8" />
      <path d="M4 4l16 16" />
    </svg>
  );
}

// Play Button Icon (Film-style)
export function PlayButtonIcon({ className = '', size = 24 }: FilmIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

// Clock Icon (Film-style)
export function ClockIcon({ className = '', size = 24 }: FilmIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

// Eye Icon (Film-style)
export function EyeIcon({ className = '', size = 24 }: FilmIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

// Arrow Right Icon (navigation)
export function ArrowRightIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

// Story Icon (alias for ScriptIcon)
export { ScriptIcon as StoryIcon };

// Trending Up Icon (stats)
export function TrendingUpIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

// Additional utility icons (for dashboard/general use)
export function CalendarIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

export function CheckIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function DollarSignIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

export function DownloadIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export function PhoneIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function MessageCircleIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4 7 7 0 0 0-2.1-.6 8 8 0 0 0-2.1-.6l-4.4 1.1 1.1-4.4a8 8 0 0 0-.6-2.1 7 7 0 0 0-.6-2.1A8.5 8.5 0 0 1 11.5 3a8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

export function MailIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export function QuoteIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 3 0 3v1c0 .823-.5 1.5-1 1.5-.5 0-1-.677-1-1.5v-4H3Z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 3 0 3v1c0 .823-.5 1.5-1 1.5-.5 0-1-.677-1-1.5v-4h-5Z" />
    </svg>
  );
}

export function FileTextIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  );
}

export function FilterIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 22 14 22 22 12.46 14 3" />
    </svg>
  );
}

export function SearchIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function CloseIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function PlusIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export function ExternalLinkIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export function StarIcon({ className = '', size = 18 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.13 2 9.27l6.91-7.26L12 2z" />
    </svg>
  );
}

// TV Icon (retro television)
export function TVIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <rect x="5" y="6" width="14" height="8" rx="1" />
    </svg>
  );
}

// Globe Icon (world/global)
export function GlobeIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

// Export all as default object for easy importing
export const FilmIcons = {
  FilmReel: FilmReelIcon,
  Spotlight: SpotlightIcon,
  Script: ScriptIcon,
  DirectorsChair: DirectorsChairIcon,
  MovieStar: MovieStarIcon,
  CameraLens: CameraLensIcon,
  FilmSlate: FilmSlateIcon,
  BoxOfficeChart: BoxOfficeChartIcon,
  FilmStrip: FilmStripIcon,
  Clapperboard: ClapperboardIcon,
  CinemaSeats: CinemaSeatsIcon,
  Popcorn: PopcornIcon,
  FilmReelSpool: FilmReelSpoolIcon,
  MovieTheater: MovieTheaterIcon,
  RedCarpet: RedCarpetIcon,
  FilmCamera: FilmCameraIcon,
  MovieTicket: MovieTicketIcon,
  SpotlightStage: SpotlightStageIcon,
  FilmProjector: FilmProjectorIcon,
  MovieClapboard: MovieClapboardIcon,
  PlayButton: PlayButtonIcon,
  Clock: ClockIcon,
  Eye: EyeIcon,
  ArrowRight: ArrowRightIcon,
  TrendingUp: TrendingUpIcon,
  Award: AwardIcon,
  TV: TVIcon,
  Globe: GlobeIcon,
};

export default FilmIcons;