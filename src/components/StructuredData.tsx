/**
 * Structured Data (JSON-LD) component for SEO
 * Adds schema.org markup to help search engines understand your content
 */
interface StructuredDataProps {
  type: 'organization' | 'webpage' | 'collection' | 'service';
  data?: Record<string, any>;
}

const schemas = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FilmDecks',
    description: 'Professional pitch deck services for film and TV. Get your story funded with our expert packaging, financial analysis, and creative development.',
    url: 'https://filmdecks.biz',
    logo: 'https://filmdecks.biz/logo.png',
    sameAs: [
      // Add social media links here when available
      // 'https://twitter.com/848washington',
      // 'https://linkedin.com/company/848washington',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      availableLanguage: 'English',
    },
  },
  service: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Film Pitch Deck Services',
    description: 'Professional pitch deck services for film and TV. Expert packaging, financial analysis, and creative development.',
    provider: {
      '@type': 'Organization',
      name: 'FilmDecks',
    },
    areaServed: 'Worldwide',
    category: 'Entertainment Industry',
  },
  webpage: (url: string, name: string, description: string) => ({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: `https://filmdecks.biz${url}`,
    name,
    description,
    publisher: {
      '@type': 'Organization',
      name: 'FilmDecks',
      logo: {
        '@type': 'ImageObject',
        url: 'https://filmdecks.biz/logo.png',
      },
    },
  }),
  collection: (items: Array<{ name: string; description: string; url: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Pitch Deck Gallery',
    description: 'Browse our collection of award-winning film and TV pitch decks',
    url: 'https://filmdecks.biz/gallery',
    publisher: {
      '@type': 'Organization',
      name: 'FilmDecks',
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'CreativeWork',
          name: item.name,
          description: item.description,
          url: `https://filmdecks.biz${item.url}`,
        },
      })),
    },
  }),
};

export default function StructuredData({ type, data }: StructuredDataProps) {
  let schema: Record<string, any>;

  switch (type) {
    case 'organization':
      schema = schemas.organization;
      break;
    case 'service':
      schema = schemas.service;
      break;
    case 'webpage':
      schema = schemas.webpage(data?.url || '', data?.name || '', data?.description || '');
      break;
    case 'collection':
      schema = schemas.collection(data?.items || []);
      break;
    default:
      return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
