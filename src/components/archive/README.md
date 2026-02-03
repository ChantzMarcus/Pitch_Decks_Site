# Archived Components

This directory contains experimental components that were created but never integrated into the main site.

## Why These Components Are Archived

These components were part of a "Cross-Industry Enhancement Initiative" - experimental features inspired by other industries (music, gaming, photography) that were built but never integrated into the production site flow.

## Archived Components

### AlbumStyleProject.tsx
- **Created**: As part of music-inspired layout initiative
- **Purpose**: Present projects like music albums with cover art, track listings, and playback controls
- **Status**: Experimental proof-of-concept, never integrated
- **Reason**: Didn't fit the pitch deck presentation model, existing DeckCard/DeckGrid worked better

### CinematicTransitions.tsx
- **Created**: As part of gaming-inspired transitions initiative
- **Purpose**: Add cinematic page transitions (fade, slide, zoom, film reel effects)
- **Status**: Animation library exists but never applied to pages
- **Reason**: Performance concerns, Next.js already has built-in transitions, accessibility considerations

### StorySequence.tsx
- **Created**: As part of photography-inspired narrative initiative
- **Purpose**: Step-by-step visual storytelling with auto-advance
- **Status**: Redundant with existing FeaturedDeckWalkthrough
- **Reason**: Overlapped with existing features, no clear use case for pitch decks

## Can These Be Used?

Yes, but consider:
1. **Do they solve a real problem?** - These were experimental, not production-ready
2. **Are they better than existing solutions?** - Most overlap with existing features
3. **Performance impact?** - Some may have performance implications
4. **Maintenance burden?** - Unused code adds complexity

## If You Want to Revive Them

1. Review the component code
2. Check if use case exists
3. Test performance impact
4. Integrate properly (see FEATURE_INTEGRATION_CHECKLIST.md)
5. Update this README

## Last Updated

February 2, 2026 - Components archived to prevent codebase clutter while preserving work for future reference.
