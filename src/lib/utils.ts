import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  // Filter out undefined, null, and false values to prevent tailwind-merge errors
  const filteredInputs = inputs.filter(
    (input): input is NonNullable<typeof input> =>
      input !== undefined && input !== null && input !== false
  )
  return twMerge(clsx(filteredInputs))
}

export function getBaseUrl() {
  if (typeof window !== 'undefined') {
    // Browser environment
    return window.location.origin;
  }

  // Server environment
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }

  // Default for development
  return 'http://localhost:3000';
}
