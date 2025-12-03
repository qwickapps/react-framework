# PaletteSwitcher Component Documentation

## Overview

A dropdown component for switching between different color palettes in real-time. The PaletteSwitcher provides an intuitive interface for users to select from predefined color schemes, instantly updating the entire application's appearance through CSS custom properties.

## Features

- **Real-time palette switching** with instant visual feedback
- **Intuitive dropdown interface** with palette previews
- **Context-aware selection** showing the currently active palette
- **Accessibility support** with proper ARIA labels and keyboard navigation
- **Persistent selection** using localStorage to remember user preferences
- **Theme integration** that works seamlessly with the palette system

## Prerequisites

The PaletteSwitcher component requires the `PaletteProvider` context to function properly. Make sure your application is wrapped with the provider:

```tsx
import { PaletteProvider } from '@qwickapps/react-framework';

function App() {
  return (
    <PaletteProvider storageKey="com.mycompany.myapp.palette">
      {/* Your app content */}
    </PaletteProvider>
  );
}
```

**Storage Key Options**:
- **Explicit key**: `"com.mycompany.myapp.palette"` - Recommended for production apps
- **Default key**: `true` or `undefined` - Uses `"qwickapps-react-framework-palette"` (good for development)
- **No persistence**: `false` - Session-only (good for embedded widgets)

## Props

The PaletteSwitcher component doesn't accept any props - it's a self-contained component that uses the PaletteContext for state management.

```tsx
interface PaletteSwitcherProps {
  // No props - uses PaletteContext for all functionality
}
```

## Available Palettes

The component provides access to five predefined color palettes:

| Palette | Description | Primary Color | Use Case |
|---------|-------------|---------------|----------|
| **Default** | Classic blue and neutral colors | `#007bff` | Professional, corporate applications |
| **Winter** | Cool blues and icy whites | `#0077be` | Clean, minimalist interfaces |
| **Autumn** | Warm oranges and golden yellows | `#ea580c` | Cozy, warm user experiences |
| **Spring** | Fresh greens and soft pinks | `#16a34a` | Nature-inspired, growth-focused apps |
| **Ocean** | Deep blues and aqua teals | `#0891b2` | Calming, water-themed interfaces |

## Usage Examples

### Basic Usage

```tsx
import { PaletteSwitcher } from '@qwickapps/react-framework';

function Header() {
  return (
    <header>
      <nav>
        <div>My App</div>
        <PaletteSwitcher />
      </nav>
    </header>
  );
}
```

### In a Settings Panel

```tsx
import { PaletteSwitcher } from '@qwickapps/react-framework';
import { Box, Typography } from '@mui/material';

function SettingsPanel() {
  return (
    <Box p={3}>
      <Typography variant="h6" gutterBottom>
        Appearance Settings
      </Typography>
      
      <Box display="flex" alignItems="center" gap={2}>
        <Typography>Color Theme:</Typography>
        <PaletteSwitcher />
      </Box>
    </Box>
  );
}
```

### In a Toolbar Context

```tsx
import { PaletteSwitcher } from '@qwickapps/react-framework';
import { Toolbar, Button } from '@mui/material';

function AppToolbar() {
  return (
    <Toolbar>
      <Button>File</Button>
      <Button>Edit</Button>
      <Button>View</Button>
      
      <div style={{ marginLeft: 'auto' }}>
        <PaletteSwitcher />
      </div>
    </Toolbar>
  );
}
```

## CSS Variables Affected

When a palette is switched, the following CSS custom properties are updated automatically:

### Primary Colors
- `--palette-primary-main` - Main primary color
- `--palette-primary-light` - Lighter variant
- `--palette-primary-dark` - Darker variant

### Secondary Colors
- `--palette-secondary-main` - Main secondary color
- `--palette-secondary-light` - Lighter variant
- `--palette-secondary-dark` - Darker variant

### Semantic Colors
- `--palette-success-main` - Success/positive actions
- `--palette-warning-main` - Warning/caution states
- `--palette-error-main` - Error/danger states
- `--palette-info-main` - Informational content

### Surface & Background
- `--palette-surface-main` - Primary surface color
- `--palette-surface-variant` - Alternative surface
- `--palette-background-main` - Main background
- `--palette-background-dark` - Secondary background

### Text Colors
- `--palette-text-primary` - Primary text color
- `--palette-text-secondary` - Secondary text color
- `--palette-text-disabled` - Disabled text color
- `--palette-text-inverted` - Inverted text (for dark backgrounds)

### Borders
- `--palette-border-main` - Primary border color
- `--palette-border-light` - Light border variant
- `--palette-border-medium` - Medium border variant

## Using Palette Variables in Your Components

### CSS

```css
.my-component {
  background-color: var(--palette-surface-main);
  color: var(--palette-text-primary);
  border: 1px solid var(--palette-border-main);
}

.my-button {
  background-color: var(--palette-primary-main);
  color: var(--palette-text-inverted);
}

.my-button:hover {
  background-color: var(--palette-primary-dark);
}
```

### Inline Styles (React)

```tsx
function MyComponent() {
  return (
    <div
      style={{
        backgroundColor: 'var(--palette-surface-main)',
        color: 'var(--palette-text-primary)',
        border: '1px solid var(--palette-border-main)',
        padding: '16px',
        borderRadius: '8px'
      }}
    >
      <h3 style={{ color: 'var(--palette-primary-main)' }}>
        Title
      </h3>
      <p style={{ color: 'var(--palette-text-secondary)' }}>
        Description text
      </p>
    </div>
  );
}
```

### Material-UI Theme Integration

```tsx
import { usePalette } from '@qwickapps/react-framework';

function ThemedComponent() {
  const { currentPalette } = usePalette();
  
  return (
    <Box
      sx={{
        backgroundColor: 'var(--palette-surface-main)',
        color: 'var(--palette-text-primary)',
        border: '1px solid var(--palette-border-main)',
        p: 2,
        borderRadius: 1
      }}
    >
      Current palette: {currentPalette}
    </Box>
  );
}
```

## Context API

### usePalette Hook

Access palette functionality programmatically:

```tsx
import { usePalette } from '@qwickapps/react-framework';

function MyComponent() {
  const { 
    currentPalette,      // string: ID of current palette
    availablePalettes,   // PaletteConfig[]: all available palettes
    switchPalette        // function: programmatically switch palette
  } = usePalette();
  
  const handleCustomSwitch = () => {
    switchPalette('ocean');
  };
  
  return (
    <div>
      <p>Current: {currentPalette}</p>
      <button onClick={handleCustomSwitch}>
        Switch to Ocean
      </button>
    </div>
  );
}
```

### PaletteConfig Interface

```tsx
interface PaletteConfig {
  id: string;           // Unique identifier
  name: string;         // Display name
  description: string;  // User-friendly description
  primaryColor: string; // Main color for preview
}
```

## Persistence

The PaletteSwitcher automatically saves the user's palette preference based on the configured storage strategy.

### Storage Key Strategies

#### 1. Explicit Key (Production Recommended)
```tsx
<PaletteProvider storageKey="com.mycompany.myapp.palette">
  <App />
</PaletteProvider>
```
**Best for**: Production applications where you want full control over storage keys.

#### 2. Default Key (Development Friendly)
```tsx
<PaletteProvider storageKey={true}>
  <App />
</PaletteProvider>
// OR simply
<PaletteProvider>
  <App />
</PaletteProvider>
```
**Uses key**: `qwickapps-react-framework-palette`  
**Best for**: Development, demos, or quick prototyping.  
**Note**: Shows a console warning to encourage explicit keys in production.

#### 3. No Persistence (Session Only)
```tsx
<PaletteProvider storageKey={false}>
  <App />
</PaletteProvider>
```
**Best for**: Embedded widgets, temporary demos, or when you don't want to persist user preferences.

### Custom Storage

If you need to override the storage behavior, you can listen for palette changes:

```tsx
useEffect(() => {
  const handlePaletteChange = (event) => {
    const { palette } = event.detail;
    // Custom storage logic here
    console.log('Palette changed to:', palette);
  };
  
  window.addEventListener('palette-changed', handlePaletteChange);
  
  return () => {
    window.removeEventListener('palette-changed', handlePaletteChange);
  };
}, []);
```

## Accessibility

The PaletteSwitcher includes comprehensive accessibility features:

- **Keyboard Navigation**: Full keyboard support with arrow keys
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **Focus Management**: Clear focus indicators and logical tab order
- **High Contrast**: Works with high contrast mode and accessibility tools

### ARIA Attributes

- `aria-label="palette switcher"`
- `aria-controls="palette-menu"`
- `aria-haspopup="true"`
- `aria-expanded` state management
- `role="menu"` for dropdown list

## Best Practices

1. **Single Instance**: Use only one PaletteSwitcher per application
2. **Persistent Placement**: Keep it in a consistent location (header, settings panel)
3. **Visual Feedback**: The component provides built-in visual feedback for the active palette
4. **Context Wrapping**: Always wrap your app with PaletteProvider
5. **CSS Variables**: Use palette CSS variables throughout your application for consistency

## Troubleshooting

### Common Issues

**Problem**: PaletteSwitcher shows error about missing context
```
Error: usePalette must be used within a PaletteProvider
```
**Solution**: Wrap your application with `<PaletteProvider>`

**Problem**: Colors don't change when switching palettes
**Solution**: Ensure you're using the correct CSS variable names (e.g., `--palette-primary-main` not `--color-primary`)

**Problem**: Palette selection doesn't persist across page reloads
**Solution**: Check browser localStorage permissions and ensure no localStorage clearing is happening

### Debug Information

```tsx
import { usePalette } from '@qwickapps/react-framework';

function DebugInfo({ storageKey }: { storageKey?: string | true | false }) {
  const { currentPalette, availablePalettes } = usePalette();
  
  // Helper to get actual storage key (same logic as in PaletteProvider)
  const getActualKey = () => {
    if (storageKey === false) return null;
    if (storageKey === true || !storageKey) {
      return 'qwickapps-react-framework-palette';
    }
    return storageKey;
  };
  
  const actualKey = getActualKey();
  
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      right: 0, 
      background: 'rgba(0,0,0,0.8)', 
      color: 'white', 
      padding: '8px',
      fontSize: '12px',
      fontFamily: 'monospace'
    }}>
      <div>Current: {currentPalette}</div>
      <div>Available: {availablePalettes.length}</div>
      <div>Storage Key: {actualKey || 'none'}</div>
      <div>Storage Value: {actualKey ? localStorage.getItem(actualKey) || 'null' : 'disabled'}</div>
    </div>
  );
}
```
