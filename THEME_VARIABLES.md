# QwickApps React Framework - Theme Variables Reference

## Overview

The framework provides a comprehensive theme variable system using CSS custom properties. All components should use these variables for consistent theming across light/dark modes and different palettes.

## Usage

Always use `var(--theme-*)` for dynamic theme values:

```tsx
// ✅ Correct
<Box sx={{ backgroundColor: 'var(--theme-surface)', color: 'var(--theme-on-surface)' }} />

// ❌ Wrong - don't use MUI theme path names directly
<Box sx={{ backgroundColor: 'background.default', color: 'text.primary' }} />
```

## Color Variables

### Primary Colors
```css
--theme-primary              /* Main brand color */
--theme-primary-light        /* Lighter variant */
--theme-primary-dark         /* Darker variant */
--theme-on-primary           /* Text color on primary background */
```

### Secondary Colors
```css
--theme-secondary            /* Secondary brand color */
--theme-secondary-light      /* Lighter variant */
--theme-secondary-dark       /* Darker variant */
--theme-on-secondary         /* Text color on secondary background */
```

### Accent Colors
```css
--theme-accent               /* Accent/highlight color */
--theme-accent-light         /* Lighter variant */
--theme-accent-dark          /* Darker variant */
--theme-on-accent            /* Text color on accent background */
```

### Semantic Colors

#### Success
```css
--theme-success              /* Success state color */
--theme-success-light        /* Light success background */
--theme-success-dark         /* Dark success variant */
--theme-on-success           /* Text on success */
--theme-success-border       /* Success border color */
```

#### Warning
```css
--theme-warning              /* Warning state color */
--theme-warning-light        /* Light warning background */
--theme-warning-dark         /* Dark warning variant */
--theme-on-warning           /* Text on warning */
--theme-warning-border       /* Warning border color */
```

#### Error
```css
--theme-error                /* Error state color */
--theme-error-light          /* Light error background */
--theme-error-dark           /* Dark error variant */
--theme-on-error             /* Text on error */
--theme-error-border         /* Error border color */
```

#### Info
```css
--theme-info                 /* Info state color */
--theme-info-light           /* Light info background */
--theme-info-dark            /* Dark info variant */
--theme-on-info              /* Text on info */
--theme-info-border          /* Info border color */
```

### Surface & Background

#### Background
```css
--theme-background           /* Main background color */
--theme-background-dark      /* Darker background variant */
--theme-background-overlay   /* Semi-transparent overlay */
--theme-on-background        /* Text on background */
```

#### Surface
```css
--theme-surface              /* Surface color (cards, panels) */
--theme-surface-variant      /* Alternate surface color */
--theme-surface-elevated     /* Elevated surface (higher z-index) */
--theme-on-surface           /* Text on surface */
```

### Text Colors
```css
--theme-text-primary         /* Primary text color */
--theme-text-secondary       /* Secondary/muted text */
--theme-text-disabled        /* Disabled text */
--theme-text-inverted        /* Inverted text (light on dark or vice versa) */
```

### Borders
```css
--theme-border-main          /* Standard border color */
--theme-border-light         /* Light border */
--theme-border-lighter       /* Very light border */
--theme-border-medium        /* Medium border */
--theme-border-dark          /* Dark border */
--theme-outline              /* Outline color */
--theme-outline-variant      /* Variant outline */
```

## Sizing & Spacing

### Border Radius
```css
--theme-border-radius        /* Default: 12px */
--theme-border-radius-small  /* Default: 8px */
--theme-border-radius-large  /* Default: 16px */
```

### Elevations (Shadows)
```css
--theme-elevation-1          /* Subtle shadow */
--theme-elevation-2          /* Medium shadow */
--theme-elevation-3          /* Pronounced shadow */
--theme-elevation-4          /* Strong shadow */
```

## Component-Specific Variables

### Controls (Form Inputs)
```css
--theme-control-bg           /* Control background */
--theme-control-text         /* Control text */
--theme-control-border       /* Control border */
--theme-control-hover-bg     /* Hover background */
--theme-control-hover-text   /* Hover text */
--theme-control-hover-border /* Hover border */
```

### Panels
```css
--theme-panel-bg-start       /* Panel gradient start */
--theme-panel-bg-end         /* Panel gradient end */
--theme-panel-border         /* Panel border */
--theme-panel-shadow         /* Panel shadow */
```

### Floating Elements
```css
--theme-floating-bg          /* Floating element background */
--theme-floating-border      /* Floating element border */
```

### Options (Select, Menu)
```css
--theme-option-bg            /* Option background */
--theme-option-text          /* Option text */
--theme-option-border        /* Option border */
--theme-option-hover-bg      /* Hover background */
--theme-option-selected-bg   /* Selected background */
--theme-option-selected-text /* Selected text */
--theme-option-selected-border /* Selected border */
```

### Links
```css
--theme-link-color           /* Link color */
--theme-link-hover           /* Link hover color */
```

### Code
```css
--theme-code-bg              /* Code block background */
--theme-code-text            /* Code text color */
```

## Block Background Values

When using blocks in the CMS, use these semantic values:

```typescript
background: 'default'        // Maps to --theme-background
background: 'surface'        // Maps to --theme-surface
background: 'surface-variant' // Maps to --theme-surface-variant
```

These are automatically mapped in BlockRenderer to the correct CSS variables.

## Available Palettes

The framework includes 6 palettes, each with light and dark modes:

1. **default** - Classic blue and neutral
2. **ocean** - Ocean blues and teals
3. **autumn** - Warm oranges and ambers
4. **spring** - Fresh greens and pinks
5. **winter** - Cool blues and grays
6. **cosmic** - Deep purples and violets

## Dark Mode

All theme variables automatically adapt to dark mode when `[data-theme="dark"]` is set on the html element.

## Best Practices

1. **Always use var()**: `var(--theme-primary)` not just `--theme-primary`
2. **Use semantic names**: Choose `--theme-surface` over specific colors
3. **Respect on-* colors**: Use `--theme-on-primary` for text on `--theme-primary` backgrounds
4. **Test both modes**: Verify your component works in light and dark themes
5. **Use CSS variables in sx prop**: Works seamlessly with Material-UI

## Examples

### Card Component
```tsx
<Card sx={{
  backgroundColor: 'var(--theme-surface)',
  color: 'var(--theme-on-surface)',
  border: '1px solid var(--theme-border-main)',
  borderRadius: 'var(--theme-border-radius)',
  boxShadow: 'var(--theme-elevation-2)'
}}>
  <CardContent>
    <Typography sx={{ color: 'var(--theme-text-primary)' }}>
      Title
    </Typography>
    <Typography sx={{ color: 'var(--theme-text-secondary)' }}>
      Description
    </Typography>
  </CardContent>
</Card>
```

### Button with Primary Color
```tsx
<Button sx={{
  backgroundColor: 'var(--theme-primary)',
  color: 'var(--theme-on-primary)',
  '&:hover': {
    backgroundColor: 'var(--theme-primary-dark)'
  }
}}>
  Click Me
</Button>
```

### Section with Alternating Backgrounds
```tsx
<Section sx={{ backgroundColor: 'var(--theme-background)' }}>
  {/* Content */}
</Section>

<Section sx={{ backgroundColor: 'var(--theme-surface)' }}>
  {/* Alternating content */}
</Section>

<Section sx={{ backgroundColor: 'var(--theme-surface-variant)' }}>
  {/* Another variant */}
</Section>
```

## Underlying Palette Variables

The theme variables are mapped from palette-specific variables:
- `--theme-primary` maps to `--palette-primary-main`
- `--theme-surface` maps to `--palette-surface-main`
- etc.

You can use palette variables directly if you need palette-specific colors that don't change with the theme system, but this is rare. Prefer theme variables for most use cases.
