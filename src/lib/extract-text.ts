/**
 * Text extraction utilities for different file formats
 * Supports: PDF, MD, DOCX, TXT
 */

export interface ExtractedText {
  text: string;
  format: string;
  fileName: string;
  error?: string;
}

/**
 * Extract text from a file based on its type
 */
export async function extractTextFromFile(file: File): Promise<ExtractedText> {
  const extension = file.name.split('.').pop()?.toLowerCase() || '';

  try {
    switch (extension) {
      case 'pdf':
        return await extractFromPDF(file);
      case 'md':
      case 'markdown':
        return await extractFromMarkdown(file);
      case 'txt':
        return await extractFromPlainText(file);
      case 'docx':
      case 'doc':
        return await extractFromDocx(file);
      default:
        return {
          text: '',
          format: extension,
          fileName: file.name,
          error: `Unsupported file format: .${extension}`,
        };
    }
  } catch (error) {
    return {
      text: '',
      format: extension,
      fileName: file.name,
      error: error instanceof Error ? error.message : 'Failed to extract text',
    };
  }
}

/**
 * Extract text from PDF using pdf.js
 */
async function extractFromPDF(file: File): Promise<ExtractedText> {
  // Dynamic import for pdfjs
  const pdfjsLib = await import('pdfjs-dist');

  // Set up worker - use the CDN URL for the worker
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let fullText = '';

  // Extract text from all pages
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item: unknown) => (item as { str: string }).str)
      .join(' ');
    fullText += pageText + '\n\n';
  }

  return {
    text: fullText.trim(),
    format: 'pdf',
    fileName: file.name,
  };
}

/**
 * Extract text from Markdown file
 */
async function extractFromMarkdown(file: File): Promise<ExtractedText> {
  const text = await file.text();

  // Remove markdown syntax for cleaner text
  const cleanText = text
    .replace(/^#{1,6}\s+/gm, '') // Remove headers
    .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.+?)\*/g, '$1') // Remove italic
    .replace(/!\[.+?\]\(.+?\)/g, '') // Remove images
    .replace(/\[.+?\]\(.+?\)/g, '$1') // Remove links, keep text
    .replace(/`{1,3}.+?`{1,3}/g, '') // Remove code blocks
    .replace(/^\s*[-*+]\s+/gm, '') // Remove list markers
    .replace(/^\s*\d+\.\s+/gm, '') // Remove numbered list markers
    .trim();

  return {
    text: cleanText,
    format: 'markdown',
    fileName: file.name,
  };
}

/**
 * Extract text from plain text file
 */
async function extractFromPlainText(file: File): Promise<ExtractedText> {
  const text = await file.text();
  return {
    text: text.trim(),
    format: 'txt',
    fileName: file.name,
  };
}

/**
 * Extract text from DOCX using mammoth.js
 */
async function extractFromDocx(file: File): Promise<ExtractedText> {
  const mammoth = await import('mammoth');
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });

  return {
    text: result.value.trim(),
    format: 'docx',
    fileName: file.name,
  };
}

/**
 * Truncate text to a maximum length for API submission
 */
export function truncateText(text: string, maxLength: number = 15000): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Check if a file type is supported
 */
export function isSupportedFileType(fileName: string): boolean {
  const supported = ['pdf', 'md', 'markdown', 'txt', 'docx', 'doc'];
  const extension = fileName.split('.').pop()?.toLowerCase() || '';
  return supported.includes(extension);
}

/**
 * Get file size in a human-readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
