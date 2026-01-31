/**
 * Site-wide constants and configuration
 */

// Consultation booking link
// Set NEXT_PUBLIC_CONSULTATION_URL in .env.local to your Cal.com or Calendly link
// If not set, defaults to mailto link for hello@filmdecks.biz
export const CONSULTATION_BOOKING_URL = 
  process.env.NEXT_PUBLIC_CONSULTATION_URL || 
  'mailto:hello@filmdecks.biz?subject=Consultation%20Request&body=Hi,%20I%27d%20like%20to%20schedule%20a%20consultation%20call.';

/**
 * Get consultation URL with optional UTM parameters
 * Note: UTM parameters only work for HTTP/HTTPS URLs, not mailto links
 */
export function getConsultationUrl(source?: string, medium?: string): string {
  const baseUrl = CONSULTATION_BOOKING_URL;
  
  // Don't add UTM params to mailto links
  if (baseUrl.startsWith('mailto:')) {
    return baseUrl;
  }
  
  if (!source && !medium) {
    return baseUrl;
  }
  
  const params = new URLSearchParams();
  if (source) params.set('utm_source', source);
  if (medium) params.set('utm_medium', medium);
  
  return `${baseUrl}?${params.toString()}`;
}
