// Custom Film & Cinema Icons
// Custom SVG icons designed for FilmDecks brand - not generic templates

interface IconProps {
  className?: string;
  size?: number;
}

export function FilmIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Film reel with sprockets */}
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v20M1 12h22M12 4v16M4 12h16" />
      <circle cx="12" cy="12" r="1.5" transform="rotate(0 12 12)" />
      <circle cx="12" cy="12" r="1.5" transform="rotate(72 12 12)" />
      <circle cx="12" cy="12" r="1.5" transform="rotate(144 12 12)" />
      <circle cx="12" cy="12" r="1.5" transform="rotate(216 12 12)" />
      <circle cx="12" cy="12" r="1.5" transform="rotate(288 12 12)" />
    </svg>
  );
}

export function ClapperboardIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
    >
      {/* Clapperboard */}
      <rect x="2" y="4" width="20" height="14" rx="1" />
      <path d="M2 12h20" stroke="currentColor" strokeWidth="2" />
      <path d="M2 16l4-2 2M6 18l4-2 2M10 20l4-2 2M14 18l4-2 2M18 16l4-2 2M22 12l-4 2 2M18 8l4-2 2M14 6l4-2 2M10 4l4-2 2" />
      <path d="M6 8v2M18 8v2" />
    </svg>
  );
}

export function CinemaIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Cinema screen with curtains */}
      <rect x="3" y="3" width="18" height="12" rx="1" />
      <path d="M3 6h18M3 12h18" />
      <path d="M6 3v18M18 3v18" />
      <path d="M12 12l5 3" />
      <path d="M12 15l-5 3" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  );
}

export function AwardIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
    >
      {/* Oscar-style trophy */}
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.13 2 9.27l6.91-7.26L12 2z" />
      <ellipse cx="12" cy="21" rx="6" ry="2" />
    </svg>
  );
}

export function StoryIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Script/Story icon */}
      <path d="M4 2h16" />
      <path d="M18 2v16c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V2z" />
      <path d="M6 6h12" />
      <path d="M6 10h8" />
      <path d="M6 14h12" />
      <path d="M8 18h8" />
    </svg>
  );
}

export function ArrowRightIcon({ className = '', size = 20 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18l6-6-6 6" />
    </svg>
  );
}

export function PlayIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
    >
      {/* Play button triangle */}
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export function StarIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
    >
      {/* 5-point star */}
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.13 2 9.27l6.91-7.26L12 2z" />
    </svg>
  );
}

export function CheckIcon({ className = '', size = 16 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 4" />
    </svg>
  );
}

export function CloseIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

export function MailIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  );
}

export function PhoneIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 1.97 2 1 0 0 1 .88-2.11M5 12.46v5.46c0 1.1.9 2 2 2h1.45a2 2 0 0 1 1.55 1.97" />
      <path d="M14.54 8.46a2 2 0 0 0 0 3.08" />
    </svg>
  );
}

export function MenuIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

export function ChevronLeftIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 19l-7-7 7-7" />
    </svg>
  );
}

export function ChevronRightIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function DownloadIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 15 12 9 21 15" />
    </svg>
  );
}

export function ExternalLinkIcon({ className = '', size = 16 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 9 21 9" />
      <line x1="12" y1="15" x2="12" y2="15" />
    </svg>
  );
}

export function UploadIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
 strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 12 15 17" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

export function QuoteIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
    >
      {/* Quote marks */}
      <path d="M14.017 21L14.017 21C11.625 21 11.042 21 8.647 21C6.053 21 4.482 19.42 3 17.546c0-1.545.767-2.736 1.97-4.317 1.97-2.167 0-3.938-1.809-3.938-4.042 0-1.95 1.237-4.066 2.945L7 13.97c-.46.616-.776-.945-.776-1.45V9.6c0-.955-.633-1.77-1.486-1.771h1.712c.855 0 1.486.817 1.486 1.771 0 .505.31.769.776.776 1.45v6.21c0 .505.31.769.776.776 1.45v5.22l2.836-1.66c.696-.416 1.482-.945 1.482-1.677 0-1.31-1.048-3.432-1.771-4.918C15.924 14.03 13.395 12.615 11.226 11.5v-1.386z" />
    </svg>
  );
}

export function CalendarIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v6" />
      <path d="M21 15V9" />
      <path d="M3 15v4" />
      <path d="M12 12h.01" />
    </svg>
  );
}

export function ChartIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

export function UsersIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
 strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-5.66" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function TrendingUpIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
 strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 13.5 23 18" />
      <polyline points="16 6 9 12 9 2" />
      <path d="M21.5 12v6h-6" />
    </svg>
  );
}

export function EyeIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 4-8 4 4-4 4 4 4" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function ClockIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
 strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export function FileTextIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  );
}

export function MessageCircleIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

export function DollarSignIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

export function FilterIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

export function PlusIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export function SearchIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

// Export all as default object for easy importing
const icons = {
  Film: FilmIcon,
  Clapperboard: ClapperboardIcon,
  Cinema: CinemaIcon,
  Award: AwardIcon,
  Story: StoryIcon,
  ArrowRight: ArrowRightIcon,
  Play: PlayIcon,
  Star: StarIcon,
  Check: CheckIcon,
  Close: CloseIcon,
  Mail: MailIcon,
  Phone: PhoneIcon,
  Menu: MenuIcon,
  ChevronLeft: ChevronLeftIcon,
  ChevronRight: ChevronRightIcon,
  Download: DownloadIcon,
  ExternalLink: ExternalLinkIcon,
  Upload: UploadIcon,
  Quote: QuoteIcon,
  Calendar: CalendarIcon,
  Chart: ChartIcon,
  Users: UsersIcon,
  TrendingUp: TrendingUpIcon,
  Eye: EyeIcon,
  Clock: ClockIcon,
  FileText: FileTextIcon,
  MessageCircle: MessageCircleIcon,
  DollarSign: DollarSignIcon,
  Filter: FilterIcon,
  Plus: PlusIcon,
  Search: SearchIcon,
};

export default icons;
