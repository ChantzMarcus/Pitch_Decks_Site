# Film-Themed Icon System

## Overview
This icon system replaces generic UI icons with film-themed alternatives to enhance the cinematic branding of the pitch deck website. All icons maintain the same API as the original Lucide icons but feature film-inspired designs.

## Available Icons

### Core Film Icons
- `FilmReelIcon` - Represents pitch decks and film content
- `SpotlightIcon` - Highlights important features or content
- `ScriptIcon` - Represents screenwriting and creative development
- `DirectorsChairIcon` - Represents leadership and direction
- `MovieStarIcon` - Represents awards and recognition
- `CameraLensIcon` - Represents filming and production
- `FilmSlateIcon` - Represents shooting and recording
- `BoxOfficeChartIcon` - Represents financial success and analytics
- `FilmStripIcon` - Represents film sequences
- `ClapperboardIcon` - Represents filmmaking
- `CinemaSeatsIcon` - Represents viewing experience
- `PopcornIcon` - Represents entertainment
- `FilmReelSpoolIcon` - Represents traditional film storage
- `MovieTheaterIcon` - Represents presentation venues
- `RedCarpetIcon` - Represents prestige and premieres
- `FilmCameraIcon` - Represents film equipment
- `MovieTicketIcon` - Represents access and events
- `SpotlightStageIcon` - Represents performance and attention
- `FilmProjectorIcon` - Represents playback and presentation
- `MovieClapboardIcon` - Alternative clapperboard design

### UI Icons (Film-Themed Variants)
- `PlayButtonIcon` - Film-style play button
- `ClockIcon` - Time and scheduling
- `EyeIcon` - Visibility and viewing
- `ArrowRightIcon` - Navigation
- `TrendingUpIcon` - Growth and success
- `AwardIcon` - Recognition and achievement

## Usage

### Individual Icon Import
```jsx
import { FilmReelIcon, PlayButtonIcon } from './icons/FilmIcons';

function MyComponent() {
  return (
    <div>
      <FilmReelIcon size={24} className="text-accent-indigo" />
      <PlayButtonIcon size={16} />
    </div>
  );
}
```

### Bulk Import
```jsx
import { FilmIcons } from './icons/FilmIcons';

function MyComponent() {
  const PlayIcon = FilmIcons.PlayButton;
  const ReelIcon = FilmIcons.FilmReel;
  
  return (
    <div>
      <ReelIcon size={24} />
      <PlayIcon size={16} />
    </div>
  );
}
```

## Props
All icons accept the following props:
- `size` (number): Sets both width and height (default: 24)
- `className` (string): Additional CSS classes to apply
- All other SVG attributes are passed through

## Implementation Status
The following components have been updated to use film-themed icons:
- `Hero.tsx` - Updated Play and ArrowRight icons
- `ServicesShowcase.tsx` - Completely redesigned with film-themed service icons
- `DeckCard.tsx` - Updated Eye, Clock, and Play icons
- `EnhancedDeckCard.tsx` - Updated Eye icon
- `HeroVideo.tsx` - Updated Play icon

## Benefits
1. **Brand Consistency**: All icons reinforce the cinematic theme
2. **Visual Cohesion**: Unified design language across the site
3. **Memorable Experience**: Film-themed icons create a unique user experience
4. **Professional Identity**: Aligns with the film industry positioning

## Future Enhancements
Consider expanding the icon set with:
- Genre-specific icons (horror, comedy, drama, etc.)
- Equipment icons (tripods, lights, microphones)
- Character/role icons (producer, actor, editor)
- Film era icons (vintage camera, retro equipment)