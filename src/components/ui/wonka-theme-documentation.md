# Willy Wonka / Candy Factory Theme

## Overview
The Willy Wonka theme transforms the film pitch deck showcase into a vibrant, whimsical candy factory experience. This theme uses bright, saturated colors, playful animations, and candy-inspired design elements to create a magical atmosphere.

## Color Palette

### Primary Wonka Colors
- `wonka-purple`: `#8A2BE2` - Rich purple reminiscent of candy wrappers
- `wonka-pink`: `#FF69B4` - Vibrant pink for candy accents
- `wonka-yellow`: `#FFD700` - Golden yellow like golden tickets
- `wonka-orange`: `#FF8C00` - Vibrant orange for citrus candies
- `wonka-green`: `#32CD32` - Lime green for sour candies
- `wonka-blue`: `#1E90FF` - Dodger blue for blueberries
- `wonka-red`: `#FF4500` - Orange red for cherry flavors

### Supporting Colors
- `cotton-candy`: `#FFB6C1` - Soft pink like cotton candy
- `lollipop-red`: `#DC143C` - Classic lollipop red
- `chocolate-brown`: `#8B4513` - Rich brown like chocolate
- `cream`: `#FFFDD0` - Off-white like cream
- `rainbow`: Gradient from red to violet

## CSS Classes

### Backgrounds
- `wonka-bg-gradient` - Multi-colored Wonka gradient background
- `wonka-candy-stripes` - Candy stripe pattern background
- `wonka-polka-dots` - Polka dot pattern background
- `wonka-checkered` - Checkered pattern background

### Cards & Elements
- `wonka-card` - Candy-themed card with gradient and border
- `wonka-button` - Animated candy-themed button
- `wonka-glow` - Glowing effect that intensifies on hover

### Text Effects
- `wonka-text-rainbow` - Animated rainbow text effect

### Borders
- `wonka-border-dashed` - Dashed border in Wonka green
- `wonka-border-dotted` - Dotted border in Wonka orange
- `wonka-border-double` - Double border in Wonka blue

## Components

### WonkaCard
A themed card component with different variants:
- `candy` - Standard candy-themed card
- `chocolate` - Chocolate-themed card
- `lollipop` - Lollipop-themed card
- `gummy` - Gummy-themed card

```jsx
<WonkaCard title="Chocolate Room" variant="chocolate">
  <p>Swimming pools of liquid chocolate as far as the eye can see.</p>
</WonkaCard>
```

### WonkaButton
A themed button component with different variants:
- `caramel` - Caramel-themed button
- `chocolate` - Chocolate-themed button
- `lollipop` - Lollipop-themed button
- `gum` - Gum-themed button
- `pop` - Candy pop-themed button

```jsx
<WonkaButton variant="lollipop" onClick={handleClick}>
  Enter the Factory
</WonkaButton>
```

### WonkaBanner
A themed banner component with different variants:
- `factory` - Main factory theme
- `entrance` - Factory entrance theme
- `golden-ticket` - Golden ticket theme
- `candy-aisle` - Candy aisle theme

```jsx
<WonkaBanner 
  title="Welcome to Wonka's Factory" 
  variant="factory"
>
  <p>Experience the magic!</p>
</WonkaBanner>
```

### WonkaModal
A themed modal component with different variants:
- `golden-ticket` - Golden ticket invitation
- `candy-jar` - Candy jar theme
- `chocolate-fall` - Chocolate waterfall theme
- `glass-elevator` - Glass elevator theme

```jsx
<WonkaModal 
  isOpen={isOpen} 
  onClose={handleClose} 
  variant="golden-ticket"
>
  <p>Congratulations! You found a golden ticket!</p>
</WonkaModal>
```

### WonkaAnimation
An animated wrapper with different animation types:
- `candy-bounce` - Bouncing candy animation
- `golden-ticket` - Golden ticket shimmer
- `chocolate-river` - Flowing chocolate animation
- `fizzy-lifting` - Floating animation
- `oompah-loompa` - Color-changing animation

```jsx
<WonkaAnimation type="fizzy-lifting">
  <div>Content that floats upward</div>
</WonkaAnimation>
```

## Usage Guidelines

### When to Use
- For promotional sections highlighting special offers
- For playful sections that need to engage users
- For themed campaigns related to sweets, candy, or magical experiences
- For creating a joyful, memorable user experience

### Best Practices
1. Use the Wonka theme sparingly - it's meant to be special
2. Pair with appropriate content that matches the whimsical theme
3. Ensure sufficient contrast for readability
4. Don't use for critical information that requires serious attention
5. Consider user preferences (e.g. reduced motion)

### Accessibility Considerations
- All animations respect the `prefers-reduced-motion` setting
- Text maintains sufficient contrast against backgrounds
- Interactive elements maintain focus states
- Color is not the sole means of conveying information

## Customization

The Wonka theme can be customized by:
1. Modifying the color values in `tailwind.config.ts`
2. Adjusting the CSS animations in `globals.css`
3. Creating new component variants in the respective component files
4. Adding new animation types to the `WonkaAnimation` component