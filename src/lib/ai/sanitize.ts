/**
 * AI Input Sanitization
 *
 * Prevents prompt injection attacks by sanitizing user input before
 * it's included in AI prompts.
 */

import type { StoryAnalysisRequest } from './types';

// Common prompt injection patterns to detect and neutralize
const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?previous\s+instructions?/gi,
  /ignore\s+(the\s+)?above/gi,
  /disregard\s+(all\s+)?previous/gi,
  /forget\s+(all\s+)?previous/gi,
  /override\s+(all\s+)?instructions?/gi,
  /new\s+instructions?:/gi,
  /system\s*prompt/gi,
  /you\s+are\s+now/gi,
  /pretend\s+(to\s+be|you\s+are)/gi,
  /act\s+as\s+(if|a)/gi,
  /roleplay\s+as/gi,
  /from\s+now\s+on/gi,
  /\bDAN\b/g, // "Do Anything Now" jailbreak
  /jailbreak/gi,
  /bypass\s+(safety|filter|restriction)/gi,
  /return\s+a\s+score\s+of\s+\d+/gi,
  /always\s+(return|respond|give)/gi,
  /\[\[.*?\]\]/g, // Common injection delimiter
  /<<<.*?>>>/g,   // Another common delimiter
];

// Characters that could be used for prompt structure manipulation
const STRUCTURAL_CHARS = /[{}\[\]<>|\\`]/g;

/**
 * Sanitizes user input to prevent prompt injection attacks
 *
 * @param input - Raw user input string
 * @param options - Sanitization options
 * @returns Sanitized string safe for use in AI prompts
 */
export function sanitizeForPrompt(
  input: string,
  options: {
    maxLength?: number;
    allowNewlines?: boolean;
    stripStructuralChars?: boolean;
  } = {}
): string {
  const {
    maxLength = 5000,
    allowNewlines = true,
    stripStructuralChars = true,
  } = options;

  if (!input || typeof input !== 'string') {
    return '';
  }

  let sanitized = input;

  // 1. Truncate to max length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.slice(0, maxLength) + '...';
  }

  // 2. Remove or escape injection patterns
  for (const pattern of INJECTION_PATTERNS) {
    sanitized = sanitized.replace(pattern, '[filtered]');
  }

  // 3. Optionally strip structural characters that could manipulate prompt format
  if (stripStructuralChars) {
    sanitized = sanitized.replace(STRUCTURAL_CHARS, '');
  }

  // 4. Normalize whitespace
  if (!allowNewlines) {
    sanitized = sanitized.replace(/[\r\n]+/g, ' ');
  } else {
    // Limit consecutive newlines to 2
    sanitized = sanitized.replace(/\n{3,}/g, '\n\n');
  }

  // 5. Remove any control characters except newlines/tabs
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  // 6. Trim whitespace
  sanitized = sanitized.trim();

  return sanitized;
}

/**
 * Sanitizes a StoryAnalysisRequest object
 * Returns a new object with all string fields sanitized
 */
export function sanitizeAnalysisRequest(
  request: StoryAnalysisRequest
): StoryAnalysisRequest {
  return {
    logline: sanitizeForPrompt(request.logline, {
      maxLength: 2000,
      allowNewlines: false,
    }),
    description: request.description
      ? sanitizeForPrompt(request.description, {
          maxLength: 10000,
          allowNewlines: true,
        })
      : undefined,
    format: request.format
      ? sanitizeForPrompt(request.format, {
          maxLength: 500,
          allowNewlines: false,
        })
      : undefined,
    budget: request.budget
      ? sanitizeForPrompt(request.budget, {
          maxLength: 100,
          allowNewlines: false,
        })
      : undefined,
  };
}

/**
 * Validates that input doesn't contain suspicious patterns
 * Returns true if input appears safe, false if suspicious
 */
export function isInputSafe(input: string): boolean {
  if (!input || typeof input !== 'string') {
    return true;
  }

  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(input)) {
      return false;
    }
  }

  return true;
}

/**
 * Logs suspicious input attempts for monitoring
 * In production, this could send to a logging service
 */
export function logSuspiciousInput(
  input: string,
  context: string
): void {
  const timestamp = new Date().toISOString();
  const preview = input.slice(0, 200);

  console.warn(`[AI Security] Suspicious input detected`, {
    timestamp,
    context,
    preview,
    length: input.length,
  });
}
