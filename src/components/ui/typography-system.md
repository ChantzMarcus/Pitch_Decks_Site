# Cinematic Typography System

## Overview
The cinematic typography system enhances the film pitch deck showcase with carefully selected variable fonts and film-inspired text treatments. The system combines Fraunces, Inter, and JetBrains Mono fonts to create a sophisticated, readable, and visually striking typographic hierarchy.

## Font Stack

### Display Font: Fraunces Variable
- **Primary use**: Headings, titles, and prominent text
- **Characteristics**: High contrast, contemporary interpretation of Didone typefaces
- **Optical sizing**: Automatically adjusts for different sizes
- **Best for**: Large headlines and display text

### Body Font: Inter Variable
- **Primary use**: Paragraphs, body text, and navigation
- **Characteristics**: Designed for computer screens, excellent readability
- **Optical sizing**: Adjusts weight and spacing based on size
- **Best for**: Long-form content and UI text

### Monospace Font: JetBrains Mono
- **Primary use**: Code snippets, technical information, and data displays
- **Characteristics**: Clear distinction between characters, developer-friendly
- **Best for**: Technical content and data visualization

## CSS Classes

### Base Font Classes
- `font-display` - Applies Fraunces font family
- `font-body` - Applies Inter font family  
- `font-mono` - Applies JetBrains Mono font family

### Cinematic Text Effects
- `text-cinematic-title` - Enhanced styling for main titles with letter spacing and text shadow
- `text-cinematic-subtitle` - Uppercase styling with increased letter spacing
- `text-cinematic-quote` - Special styling for quotes with decorative quotation marks

### Responsive Typography
- `font-display-responsive` - Clamp-based responsive sizing for display text
- `font-body-responsive` - Clamp-based responsive sizing for body text

## Component API

### CinematicText Component
The `CinematicText` component provides animated text treatments with several variants:

```jsx
<CinematicText variant="title">Main Title</CinematicText>
<CinematicText variant="subtitle">Subtitle Text</CinematicText>
<CinematicText variant="quote">Quoted Text</CinematicText>
<CinematicText variant="typewriter">Typewriter Effect</CinematicText>
```

#### Props:
- `children` (string): Text content
- `className` (string): Additional CSS classes
- `variant` ('title' | 'subtitle' | 'quote' | 'typewriter'): Text treatment
- `delay` (number): Animation delay
- `stagger` (number): Delay between animated words
- `animateOnLoad` (boolean): Whether to animate on component load

### Dedicated Components
- `CinematicTitle` - Pre-configured for main titles
- `CinematicSubtitle` - Pre-configured for subtitles
- `CinematicQuote` - Pre-configured for quotes
- `TypewriterText` - Pre-configured for typewriter effect

## Usage Examples

### Basic Usage
```jsx
import CinematicText from '@/components/ui/CinematicText';

function MyComponent() {
  return (
    <div>
      <CinematicText variant="title">Film Pitch Decks</CinematicText>
      <CinematicText variant="subtitle">Cinematic Excellence</CinematicText>
    </div>
  );
}
```

### Advanced Usage
```jsx
import { CinematicTitle, CinematicSubtitle, TypewriterText } from '@/components/ui/CinematicText';

function HeroSection() {
  return (
    <div>
      <CinematicTitle className="text-5xl md:text-7xl">
        Pitch Decks That Captivate
      </CinematicTitle>
      <CinematicSubtitle className="mt-4">
        Studio-Caliber Packaging
      </CinematicSubtitle>
      <div className="mt-8">
        <TypewriterText>Experience cinematic storytelling...</TypewriterText>
      </div>
    </div>
  );
}
```

## Design Principles

### 1. Hierarchy
- Clear visual distinction between heading levels
- Consistent sizing relationships
- Proper spacing between text elements

### 2. Readability
- Adequate line height for body text (1.6 ratio)
- Appropriate letter spacing for different contexts
- High contrast for text against backgrounds

### 3. Cinematic Feel
- Film-inspired styling treatments
- Sophisticated typography choices
- Professional aesthetic suitable for film industry

## Best Practices

1. Use `font-display` for all headings and prominent text
2. Use `font-body` for paragraphs and UI text
3. Use `font-mono` for technical information
4. Apply cinematic text effects sparingly for maximum impact
5. Maintain consistent spacing and sizing relationships
6. Ensure sufficient contrast for accessibility
7. Test typography across different screen sizes

## Accessibility Considerations

- All text meets WCAG contrast requirements
- Font sizes are appropriate for readability
- Animation respects `prefers-reduced-motion` setting
- Semantic HTML elements are preserved
- Screen reader compatibility maintained

## Performance

- Variable fonts reduce HTTP requests compared to static fonts
- Font loading is optimized through @fontsource packages
- Animation performance is optimized with hardware acceleration
- Minimal CSS footprint for typography enhancements