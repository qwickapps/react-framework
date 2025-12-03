# Logo Component Documentation

## Overview

A dynamic, theme-aware logo component with support for multiple variants, sizes, animations, and flexible text formatting. The Logo component provides a complete branding solution with automatic sizing, semantic badge positioning, and advanced text layout capabilities.

## Features

- **Material UI-style sizing** with five semantic size variants
- **Advanced text formatting** with escape sequences for spacing and line breaks
- **Semantic badge positioning** with automatic scaling
- **Theme-aware styling** with multiple color variants
- **Customizable fonts and styling** via props and CSS classes
- **Accessibility support** with proper ARIA labels
- **Automatic SVG sizing** based on text content

## Props

```tsx
interface LogoProps extends React.SVGProps<SVGSVGElement> {
  // Content
  name?: string;                    // Logo text - supports up to TWO parts with \n and \s escape sequences
  
  // Styling
  variant?: 'default' | 'high-contrast' | 'monochrome' | 'on-primary';
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'extra-large';
  fontFamily?: string;              // Font family (default: 'Segoe UI, sans-serif')
  fontWeight?: string | number;     // Font weight (default: 'bold')
  
  // Badge
  badge?: 'none' | 'top-left' | 'top-center' | 'top-right' | 
          'start' | 'center' | 'end' | 
          'bottom-left' | 'bottom-center' | 'bottom-right';
  badgeShape?: 'circle' | 'star' | 'square' | 'heart';
  badgeOffset?: { x?: number; y?: number };  // Automatically scales with size
  
  // Custom styling
  firstPartClass?: string;          // CSS class for first text part
  secondPartClass?: string;         // CSS class for second text part
  className?: string;               // Additional CSS classes
  style?: React.CSSProperties;      // Inline styles
  
  // Interaction
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
}
```

## Size System

The component follows Material UI sizing guidelines with five semantic variants:

| Size | Font Size | Base Height | Use Case |
|------|-----------|-------------|----------|
| `tiny` | 16px | 32px | Icon-sized logos, dense interfaces |
| `small` | 20px | 40px | Compact headers, mobile navigation |
| `medium` | 28px | 50px | **Default** - Standard headers, main navigation |
| `large` | 36px | 64px | Hero sections, prominent branding |
| `extra-large` | 48px | 84px | Landing pages, large hero areas |

**Note**: Heights automatically increase for multi-line logos (when using `\n`).

### Usage Examples

```tsx
// Different sizes
<Logo size="tiny" name="Brand" />
<Logo size="small" name="Company" />
<Logo name="Qwick Apps" />                    // Default: medium
<Logo size="large" name="Brand\nTagline" />
<Logo size="extra-large" name="Hero Logo" />
```

## Text Formatting

The Logo component supports advanced text formatting through escape sequences for **two-part logos only**:

### Escape Sequences

- **`\n`** - Line break (second part appears below first part)
- **`\s`** - Explicit space (useful for custom spacing)

### Important Limitation

**The Logo component supports a maximum of TWO parts only.** Using multiple `\n` sequences will not create more than two lines - only the first `\n` is processed, and any additional `\n` characters are treated as part of the second part.

### Formatting Rules

1. **Single word**: Renders as one colored part
   ```tsx
   <Logo name="QwickApps" />
   // Result: "QwickApps" (single color)
   ```

2. **Two words**: Renders as two colored parts with NO space
   ```tsx
   <Logo name="Qwick Apps" />
   // Result: "QwickApps" (two colors, no space)
   ```

3. **Explicit space**: Use `\s` for actual spaces
   ```tsx
   <Logo name="Qwick\sApps" />
   // Result: "Qwick Apps" (two colors, with space)
   ```

4. **Line break**: Use `\n` for multi-line logos
   ```tsx
   <Logo name="Qwick\nApps" />
   // Result: Two lines:
   // Qwick
   // Apps
   ```

5. **Combined formatting**: Mix both escape sequences (still limited to two parts)
   ```tsx
   <Logo name="My\sCompany\nInc" />
   // Result: Two lines:
   // My Company
   // Inc
   ```

6. **Multiple line breaks**: Only the first `\n` is processed
   ```tsx
   <Logo name="Part1\nPart2\nPart3" />
   // Result: Two lines only:
   // Part1
   // Part2\nPart3  (Part3 becomes part of the second line)
   ```

## Badge Positioning

The badge system uses semantic positioning with optional fine-tuning through offsets.

### Semantic Positions

Choose from 10 intuitive positions that automatically adapt to logo size:

- **Top**: `top-left`, `top-center`, `top-right`
- **Center**: `start`, `center`, `end`
- **Bottom**: `bottom-left`, `bottom-center`, `bottom-right`
- **None**: `none` (hides the badge)

### Badge Shapes

- `circle` - Default animated circle
- `star` - Animated star shape
- `square` - Animated square
- `heart` - Animated heart shape

### Fine-Tuning with Offsets

Use `badgeOffset` to precisely position badges relative to semantic positions:

```tsx
<Logo 
  name="My Logo"
  badge="center"                    // Semantic position
  badgeOffset={{ x: 15, y: -8 }}   // Fine-tune position
/>
```

**Important**: Offsets automatically scale with logo size, ensuring consistent relative positioning across all sizes.

### Scaling Factor

| Size | Font Size | Scale Factor | Example: offset x=15 becomes |
|------|-----------|--------------|------------------------------|
| tiny | 16px | 0.57x | x=9 |
| small | 20px | 0.71x | x=11 |
| medium | 28px | 1.00x | x=15 |
| large | 36px | 1.29x | x=19 |
| extra-large | 48px | 1.71x | x=26 |

## Color Variants

### Available Variants

- **`default`** - Standard theme colors
- **`high-contrast`** - Enhanced contrast for accessibility
- **`monochrome`** - Single-color styling
- **`on-primary`** - Optimized for primary background colors

### Usage Examples

```tsx
<Logo name="Default" variant="default" />
<Logo name="High Contrast" variant="high-contrast" />
<Logo name="Monochrome" variant="monochrome" />

{/* On colored background */}
<div style={{ background: 'var(--palette-primary-main)' }}>
  <Logo name="On Primary" variant="on-primary" />
</div>
```

## Custom Styling

### Font Customization

```tsx
<Logo 
  name="Custom Font"
  fontFamily="Georgia, serif"
  fontWeight="300"
/>
```

### CSS Class Customization

```tsx
<Logo 
  name="Custom Colors"
  firstPartClass="custom-first-part"
  secondPartClass="custom-second-part"
/>
```

Then define your CSS:

```css
.custom-first-part {
  fill: #ff6b6b;
  font-style: italic;
}

.custom-second-part {
  fill: #4ecdc4;
  font-weight: 300;
}
```

## Advanced Examples

### Complete Logo with All Features

```tsx
<Logo 
  name="My\sCompany\nLogo"          // Multi-line with space
  size="large"                      // Large size
  variant="high-contrast"           // High contrast colors
  badge="top-right"                 // Badge at top-right
  badgeShape="star"                 // Star-shaped badge
  badgeOffset={{ x: -5, y: 5 }}    // Fine-tune badge position
  fontFamily="Inter, sans-serif"    // Custom font
  fontWeight="600"                  // Semi-bold weight
  firstPartClass="brand-primary"    // Custom styling
  secondPartClass="brand-secondary"
  onClick={() => console.log('Logo clicked!')}
/>
```

### Responsive Logo

```tsx
// Mobile
<Logo name="Brand" size="small" badge="none" />

// Desktop
<Logo name="Brand\nTagline" size="large" badge="top-right" />
```

### Themed Logo

```tsx
// Light theme
<Logo name="Company" variant="default" />

// Dark theme  
<Logo name="Company" variant="high-contrast" />

// On primary color background
<Logo name="Company" variant="on-primary" />
```

## Best Practices

1. **Use semantic sizes**: Choose sizes based on context (`small` for mobile, `large` for heroes)
2. **Combine semantic positioning with offsets**: Start with `badge="center"` then fine-tune with `badgeOffset`
3. **Consistent text formatting**: Use escape sequences consistently across your app
4. **Respect the two-part limit**: Remember that logos support only TWO parts maximum
5. **Theme-appropriate variants**: Use `on-primary` for colored backgrounds
6. **Accessibility**: Ensure sufficient contrast, especially with custom colors
7. **Responsive design**: Consider different sizes for different screen sizes

## CSS Variables

The Logo component respects theme CSS variables for colors:

```css
:root {
  --palette-primary-main: #3b82f6;
  --palette-text-primary: #1f2937;
  --palette-text-secondary: #6b7280;
}
```

## Accessibility

- Automatic `aria-label` generation from logo name
- `role="img"` for semantic meaning
- High contrast variant for accessibility compliance
- Keyboard navigation support when `onClick` is provided
