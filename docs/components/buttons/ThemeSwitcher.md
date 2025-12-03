# ThemeSwitcher Component Documentation

## Overview

A dropdown component for switching between light, dark, and system theme modes in real-time. The ThemeSwitcher provides an intuitive interface for users to select their preferred theme mode, instantly updating the entire application's appearance through Material-UI's theme system and CSS custom properties.

## Features

- **Real-time theme switching** with instant visual feedback
- **Intuitive dropdown interface** with theme mode icons and labels
- **Context-aware selection** showing the currently active theme mode
- **System preference detection** for automatic light/dark mode switching
- **Material-UI integration** that automatically updates MUI component themes
- **Persistent selection** using localStorage to remember user preferences
- **Accessibility support** with proper ARIA labels and keyboard navigation

## Prerequisites

The ThemeSwitcher component requires the `ThemeProvider` context to function properly. Make sure your application is wrapped with the provider:

```tsx
import { ThemeProvider } from '@qwickapps/react-framework';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

function App() {
  return (
    <ThemeProvider storageKey="com.mycompany.myapp.theme">
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

**Storage Key Options**:
- **Explicit key**: `"com.mycompany.myapp.theme"` - Recommended for production apps
- **Default key**: `true` or `undefined` - Uses `"qwickapps-react-framework-theme"` (good for development)
- **No persistence**: `false` - Session-only (good for embedded widgets)

## Props

The ThemeSwitcher component doesn't accept any props - it's a self-contained component that uses the ThemeContext for state management.

```tsx
interface ThemeSwitcherProps {
  // No props - uses ThemeContext for all functionality
}
```

## Available Theme Modes

The component provides access to three theme modes:

| Mode | Description | Behavior | Use Case |
|------|-------------|----------|----------|
| **Light** | Bright theme with dark text | Always uses light colors | Users who prefer bright interfaces |
| **Dark** | Dark theme with light text | Always uses dark colors | Users who prefer dark interfaces |
| **System** | Follows system preference | Automatically switches based on OS setting | Users who want automatic adaptation |

## Usage Examples

### Basic Usage

```tsx
import { ThemeSwitcher } from '@qwickapps/react-framework';

function Header() {
  return (
    <header>
      <nav>
        <div>My App</div>
        <ThemeSwitcher />
      </nav>
    </header>
  );
}
```

### With Material-UI Integration

```tsx
import { ThemeSwitcher, ThemeProvider, useTheme } from '@qwickapps/react-framework';
import { ThemeProvider as MuiThemeProvider, AppBar, Toolbar, Typography } from '@mui/material';

function ThemedApp() {
  const { theme } = useTheme();
  
  return (
    <MuiThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My App
          </Typography>
          <ThemeSwitcher />
        </Toolbar>
      </AppBar>
    </MuiThemeProvider>
  );
}

function App() {
  return (
    <ThemeProvider storageKey="com.mycompany.myapp.theme">
      <ThemedApp />
    </ThemeProvider>
  );
}
```

### In a Settings Panel

```tsx
import { ThemeSwitcher } from '@qwickapps/react-framework';
import { Box, Typography } from '@mui/material';

function SettingsPanel() {
  return (
    <Box p={3}>
      <Typography variant="h6" gutterBottom>
        Appearance Settings
      </Typography>
      
      <Box display="flex" alignItems="center" gap={2}>
        <Typography>Theme Mode:</Typography>
        <ThemeSwitcher />
      </Box>
    </Box>
  );
}
```

### With Palette Integration

```tsx
import { ThemeSwitcher, PaletteSwitcher } from '@qwickapps/react-framework';
import { Box, Divider } from '@mui/material';

function ThemeControls() {
  return (
    <Box display="flex" alignItems="center" gap={2}>
      <ThemeSwitcher />
      <Divider orientation="vertical" flexItem />
      <PaletteSwitcher />
    </Box>
  );
}
```

## CSS Variables Affected

When a theme mode is switched, the following aspects of the interface change:

### Material-UI Theme Integration
- **Background colors**: `background.default`, `background.paper`
- **Text colors**: `text.primary`, `text.secondary`
- **Component colors**: All MUI components automatically adapt
- **Color palette**: Primary, secondary, error, warning, info, success colors

### CSS Custom Properties
Theme switching works seamlessly with the palette system's CSS variables:
- `--palette-background-main`
- `--palette-surface-main`
- `--palette-text-primary`
- `--palette-text-secondary`
- All palette color variables adapt to the current theme mode

## Persistence

The ThemeSwitcher automatically saves the user's theme preference based on the configured storage strategy.

### Storage Key Strategies

#### 1. Explicit Key (Production Recommended)
```tsx
<ThemeProvider storageKey="com.mycompany.myapp.theme">
  <App />
</ThemeProvider>
```
**Best for**: Production applications where you want full control over storage keys.

#### 2. Default Key (Development Friendly)
```tsx
<ThemeProvider storageKey={true}>
  <App />
</ThemeProvider>
// OR simply
<ThemeProvider>
  <App />
</ThemeProvider>
```
**Uses key**: `qwickapps-react-framework-theme`  
**Best for**: Development, demos, or quick prototyping.  
**Note**: Shows a console warning to encourage explicit keys in production.

#### 3. No Persistence (Session Only)
```tsx
<ThemeProvider storageKey={false}>
  <App />
</ThemeProvider>
```
**Best for**: Embedded widgets, temporary demos, or when you don't want to persist user preferences.

### Custom Storage

If you need to override the storage behavior, you can listen for theme changes:

```tsx
useEffect(() => {
  const handleThemeChange = (event) => {
    const { theme } = event.detail;
    // Custom storage logic here
    console.log('Theme changed to:', theme);
  };
  
  window.addEventListener('theme-changed', handleThemeChange);
  return () => window.removeEventListener('theme-changed', handleThemeChange);
}, []);
```

## System Preference Detection

The "System" mode automatically detects the user's OS theme preference using the `prefers-color-scheme` media query:

```css
@media (prefers-color-scheme: dark) {
  /* Automatically uses dark theme when system is set to dark */
}
```

This provides a seamless experience for users who have configured their operating system for automatic light/dark switching.

## API Reference

### ThemeContext Hook

```tsx
import { useTheme } from '@qwickapps/react-framework';

function MyComponent() {
  const { 
    themeMode,        // Current mode: 'light' | 'dark' | 'system'
    actualThemeMode,  // Resolved mode: 'light' | 'dark' 
    theme,            // Material-UI theme object
    switchTheme,      // Function to change theme mode
    isDark            // Boolean indicating if current theme is dark
  } = useTheme();
  
  return (
    <div>
      <p>Theme Mode: {themeMode}</p>
      <p>Actual Theme: {actualThemeMode}</p>
      <p>Is Dark: {isDark ? 'Yes' : 'No'}</p>
    </div>
  );
}
```

### Theme Interface

```tsx
interface ThemeContextValue {
  themeMode: 'light' | 'dark' | 'system';
  actualThemeMode: 'light' | 'dark';
  theme: Theme; // Material-UI theme object
  switchTheme: (newMode: ThemeMode) => void;
  isDark: boolean;
}
```

## Troubleshooting

### Common Issues

**Problem**: ThemeSwitcher doesn't appear or throws context error  
**Solution**: Wrap your application with `<ThemeProvider>`

**Problem**: Theme changes don't affect Material-UI components  
**Solution**: Ensure you're using Material-UI's `ThemeProvider` with the theme from `useTheme()`

**Problem**: System mode doesn't detect OS preference  
**Solution**: Check that your browser supports `prefers-color-scheme` media query

**Problem**: Theme selection doesn't persist across page reloads  
**Solution**: Check browser localStorage permissions and ensure no localStorage clearing is happening

### Debug Information

```tsx
import { useTheme } from '@qwickapps/react-framework';

function DebugInfo({ storageKey }: { storageKey?: string | true | false }) {
  const { themeMode, actualThemeMode, isDark } = useTheme();
  
  // Helper to get actual storage key (same logic as in ThemeProvider)
  const getActualKey = () => {
    if (storageKey === false) return null;
    if (storageKey === true || !storageKey) {
      return 'qwickapps-react-framework-theme';
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
      <div>Theme Mode: {themeMode}</div>
      <div>Actual Mode: {actualThemeMode}</div>
      <div>Is Dark: {isDark ? 'Yes' : 'No'}</div>
      <div>Storage Key: {actualKey || 'none'}</div>
      <div>Storage Value: {actualKey ? localStorage.getItem(actualKey) || 'null' : 'disabled'}</div>
    </div>
  );
}
```

## Best Practices

1. **Use explicit storage keys** in production to avoid conflicts with other apps
2. **Combine with PaletteSwitcher** for comprehensive theme customization
3. **Test system mode** with different OS settings to ensure proper detection
4. **Consider placement** in headers, toolbars, or settings panels for easy access
5. **Provide fallbacks** for environments where localStorage might not be available

## Examples

See the interactive demo in Storybook for a complete working example showing how the ThemeSwitcher integrates with Material-UI components and the palette system.
