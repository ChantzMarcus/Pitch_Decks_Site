// scripts/deck-metadata.ts
// Configure your pitch deck metadata here

export interface DeckMetadata {
  id: string;
  title: string;
  logline: string;
  description: string;
  genre: string[];
  target_audience: string;
  production_status: 'Development' | 'Pre-Production' | 'Production' | 'Completed';
  comparable_titles: string[];
  source_folder: string; // Maps to your local folder name
}

export const DECK_METADATA: DeckMetadata[] = [
  {
    id: 'tcg',
    title: 'TCG',
    logline: 'Edit this logline for TCG project',
    description: 'Add full description of TCG project here (2-3 paragraphs about the story, themes, and vision).',
    genre: ['Drama', 'Thriller'],
    target_audience: 'Adults 25-54, fans of psychological dramas',
    production_status: 'Development',
    comparable_titles: ['Comparable Film 1', 'Comparable Film 2'],
    source_folder: 'TCG',
  },
  {
    id: 'hear-transplant',
    title: 'Hear Transplant',
    logline: 'Edit this logline for Hear Transplant project',
    description: 'Add full description of Hear Transplant project here.',
    genre: ['Drama', 'Medical'],
    target_audience: 'Adults 18-49',
    production_status: 'Development',
    comparable_titles: ['Comparable Film 1', 'Comparable Film 2'],
    source_folder: 'Hear Transplant ',
  },
  {
    id: 'navy-divers',
    title: 'Navy Divers',
    logline: 'Edit this logline for Navy Divers project',
    description: 'Add full description of Navy Divers project here.',
    genre: ['Action', 'Thriller'],
    target_audience: 'Adults 18-45',
    production_status: 'Development',
    comparable_titles: ['Comparable Film 1', 'Comparable Film 2'],
    source_folder: 'Navy Divers',
  },
  {
    id: 'crude',
    title: 'CRUDE',
    logline: 'Edit this logline for CRUDE project',
    description: 'Add full description of CRUDE project here.',
    genre: ['Drama', 'Thriller'],
    target_audience: 'Adults 25-54',
    production_status: 'Development',
    comparable_titles: ['Comparable Film 1', 'Comparable Film 2'],
    source_folder: 'CRUDE',
  },
  {
    id: 'the-counterfeit',
    title: 'The Counterfeit',
    logline: 'Edit this logline for The Counterfeit project',
    description: 'Add full description of The Counterfeit project here.',
    genre: ['Thriller', 'Crime'],
    target_audience: 'Adults 18-49',
    production_status: 'Development',
    comparable_titles: ['Comparable Film 1', 'Comparable Film 2'],
    source_folder: 'The Counterfeit',
  },
  {
    id: 'saving-earth-twice',
    title: 'Saving Earth Twice',
    logline: 'Edit this logline for Saving Earth Twice project',
    description: 'Add full description of Saving Earth Twice project here.',
    genre: ['Sci-Fi', 'Action'],
    target_audience: 'Adults 18-49',
    production_status: 'Development',
    comparable_titles: ['Comparable Film 1', 'Comparable Film 2'],
    source_folder: 'SAVING EARTH TWICE',
  },
];
