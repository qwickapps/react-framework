/**
 * Theme Context - Manages theme state and switching
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createTheme, Theme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { setTheme as setThemeAttribute } from '../utils/themeUtils';
import { PaletteProvider } from './PaletteContext';
import { 
  loadUserThemePreference, 
  saveUserThemePreference, 
  clearUserThemePreference 
} from '../utils/persistenceUtils';

// Type definitions
export type ThemeMode = 'light' | 'dark' | 'system';
export type ActualThemeMode = 'light' | 'dark';

export interface ThemeContextValue {
  /** The theme currently being applied to the UI (resolved from preferred/system/default) */
  currentTheme: ThemeMode;
  /** The user's preferred theme setting, or null if not set */
  preferredTheme: ThemeMode | null;
  /** The resolved theme mode ('light' or 'dark') after system detection */
  actualThemeMode: ActualThemeMode;
  /** The MUI theme object */
  theme: Theme;
  /** Whether the current theme is dark mode */
  isDark: boolean;
  /** Whether preferences are persisted to localStorage */
  isPersistent: boolean;
  
  // Theme preference management
  /** Set user's preferred theme (saves to localStorage if persistent) */
  setPreferredTheme: (theme: ThemeMode) => void;
  /** Clear user's preferred theme (removes from localStorage) */
  clearPreferredTheme: () => void;
  /** Get user's preferred theme */
  getPreferredTheme: () => ThemeMode | null;
  
  // Current theme management (for admin/preview overrides)
  /** Get currently applied theme */
  getCurrentTheme: () => ThemeMode;
  /** Temporarily override current theme (does not affect user preference) */
  setCurrentTheme: (theme: ThemeMode) => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
  /** 
   * App identifier for generating unique storage keys, or persistence strategy.
   * - string: Use as app identifier to generate keys 'appId.theme' and 'appId.palette'
   * - true (default): Use default keys 'qwickapps-react-framework-theme' and 'qwickapps-react-framework-palette'
   * - false: Disable persistence (session-only)
   * @example 'com.mycompany.myapp' | true | false
   */
  appId?: string | true | false;
  /**
   * Whether to automatically include PaletteProvider. Default: true
   * Set to false if you want to use ThemeProvider without palette support
   */
  includePalette?: boolean;
  /**
   * Default theme for the application when no user preference exists. The default is 'system' which follows the user's system preference.
   * This can be overridden by user settings or host device settings.
   * @example 'light' | 'dark' | 'system'
   */
  defaultTheme?: ThemeMode;
  /**
   * Default palette for the application when no user preference exists. The default is 'default'.
   * This can be overridden by user settings.
   * This is only used when includePalette is true.
   * @example 'ocean' | 'autumn' | 'spring' | 'winter' | 'default'
   */
  defaultPalette?: string;
}

// Create context with proper typing
const ThemeContext = createContext<ThemeContextValue | null>(null);

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

/**
 * Resolve the default theme based on user preference or fallback
 * @param defaultTheme - The desired default theme
 * @param warn - Whether to issue a warning for invalid themes
 * @returns The resolved theme mode
 */
const resolveDefaultTheme = (defaultTheme: ThemeMode | undefined, warn: boolean = true): ThemeMode => {
  if (defaultTheme && ['light', 'dark', 'system'].includes(defaultTheme)) {
    return defaultTheme;
  }
  
  // Fallback to 'system' if defaultTheme is invalid
  if (warn) {
    console.warn(`[ThemeProvider] Invalid defaultTheme '${defaultTheme}'. Using 'system'.`);
  }
  return 'system';
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  appId,
  includePalette = true,
  defaultTheme = 'light',
  defaultPalette
}) => {
  // Determine storage key based on appId
  const themeStorageKey = React.useMemo(() => {
    if (appId === false) {
      return null; // No persistence
    }
    
    if (typeof appId === 'string') {
      return `${appId}.theme`;
    }
    
    // appId is true or undefined - use default key with warning
    const defaultKey = 'qwickapps-react-framework-theme';
    console.warn(
      `[ThemeProvider] Using default storage key '${defaultKey}'. ` +
      `Consider providing an appId for production apps to avoid conflicts. ` +
      `Example: <ThemeProvider appId="com.mycompany.myapp">`
    );
    
    return defaultKey;
  }, [appId]);

  // Resolve the actual storage key based on strategy
  const actualStorageKey = themeStorageKey;
  
  // User's preferred theme (what they explicitly chose)
  const [preferredTheme, setPreferredThemeState] = useState<ThemeMode | null>(() => {
    return loadUserThemePreference(actualStorageKey);
  });

  // Current theme being applied (resolved from preferred/system/default)
  const [currentTheme, setCurrentThemeState] = useState<ThemeMode>(() => {
    const userPreference = loadUserThemePreference(actualStorageKey);
    return userPreference || resolveDefaultTheme(defaultTheme);
  });

  // Force re-render when palette changes
  const [paletteChangeCounter, setPaletteChangeCounter] = useState<number>(0);

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  // Calculate actual theme mode (resolve 'system' to 'light' or 'dark')
  const actualThemeMode: ActualThemeMode = currentTheme === 'system' 
    ? (prefersDarkMode ? 'dark' : 'light')
    : currentTheme;

  // Listen for both theme and palette changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handlePaletteChange = (): void => {
        setPaletteChangeCounter(prev => prev + 1);
      };

      const handleThemeChange = (): void => {
        setPaletteChangeCounter(prev => prev + 1);
      };

      // Listen for custom palette change events
      window.addEventListener('palette-changed', handlePaletteChange);
      window.addEventListener('theme-changed', handleThemeChange);
      
      return () => {
        window.removeEventListener('palette-changed', handlePaletteChange);
        window.removeEventListener('theme-changed', handleThemeChange);
      };
    }
  }, []);

  // Dispatch theme change event when actualThemeMode changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('theme-changed', {
        detail: { theme: actualThemeMode }
      });
      window.dispatchEvent(event);
    }
  }, [actualThemeMode]);

  // Update HTML data-theme attribute when actual theme mode changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setThemeAttribute(actualThemeMode);
    }
  }, [actualThemeMode]);

  // Helper function to get CSS custom property value
  const getCSSCustomProperty = (property: string): string => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const value = getComputedStyle(document.documentElement).getPropertyValue(property).trim();
      return value;
    }
    return '';
  };

  // Create MUI theme
  const theme = React.useMemo((): Theme => {
    const isDark = actualThemeMode === 'dark';
    
    // Get colors from CSS theme variables (not palette variables)
    const primaryLight = getCSSCustomProperty('--theme-primary-light') || (isDark ? '#87ceeb' : '#4a90e2');
    const primaryMain = getCSSCustomProperty('--theme-primary') || (isDark ? '#90caf9' : '#1976d2');
    const primaryDark = getCSSCustomProperty('--theme-primary-dark') || (isDark ? '#1a365d' : '#0056b3');
    const primaryContrastText = getCSSCustomProperty('--theme-on-primary') || (isDark ? '#000000' : '#ffffff');

    const secondaryLight = getCSSCustomProperty('--theme-secondary-light') || (isDark ? '#adb5bd' : '#868e96');
    const secondaryMain = getCSSCustomProperty('--theme-secondary') || (isDark ? '#f48fb1' : '#dc004e');
    const secondaryDark = getCSSCustomProperty('--theme-secondary-dark') || (isDark ? '#6c757d' : '#495057');
    const secondaryContrastText = getCSSCustomProperty('--theme-on-secondary') || (isDark ? '#b0b0b0' : '#666666');

    const errorLight = getCSSCustomProperty('--theme-error-light') || (isDark ? '#f9c2c2' : '#f5c6cb');
    const errorMain = getCSSCustomProperty('--theme-error') || (isDark ? '#f87171' : '#dc3545');
    const errorDark = getCSSCustomProperty('--theme-error-dark') || (isDark ? '#b91c1c' : '#a71d2a');

    const warningLight = getCSSCustomProperty('--theme-warning-light') || (isDark ? '#fbbf24' : '#ffc107');
    const warningMain = getCSSCustomProperty('--theme-warning') || (isDark ? '#fbbf24' : '#ffc107');
    const warningDark = getCSSCustomProperty('--theme-warning-dark') || (isDark ? '#b57c00' : '#856404');

    const infoLight = getCSSCustomProperty('--theme-info-light') || (isDark ? '#60a5fa' : '#007acc');
    const infoMain = getCSSCustomProperty('--theme-info') || (isDark ? '#60a5fa' : '#007acc');
    const infoDark = getCSSCustomProperty('--theme-info-dark') || (isDark ? '#1e3a8a' : '#0d6efd');

    const successLight = getCSSCustomProperty('--theme-success-light') || (isDark ? '#4ade80' : '#28a745');
    const successMain = getCSSCustomProperty('--theme-success') || (isDark ? '#4ade80' : '#28a745');
    const successDark = getCSSCustomProperty('--theme-success-dark') || (isDark ? '#1f9e3d' : '#1c7430');

    const backgroundMain = getCSSCustomProperty('--theme-background') || (isDark ? '#121212' : '#ffffff');
    const surfaceMain = getCSSCustomProperty('--theme-surface') || (isDark ? '#1e1e1e' : '#ffffff');

    const textPrimary = getCSSCustomProperty('--theme-text-primary') || (isDark ? '#ffffff' : '#000000');
    const textSecondary = getCSSCustomProperty('--theme-text-secondary') || (isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)');
    const textDisabled = getCSSCustomProperty('--theme-on-disabled') || (isDark ? 'rgba(255, 255, 255, 0.38)' : 'rgba(0, 0, 0, 0.38)');

    return createTheme({
      palette: {
        mode: actualThemeMode,
        primary: {
          main: primaryMain,
          light: primaryLight,
          dark: primaryDark,
          contrastText: primaryContrastText,
        },
        secondary: {
          main: secondaryMain,
          light: secondaryLight,
          dark: secondaryDark,
          contrastText: secondaryContrastText,
        },
        error: {
          light: errorLight,
          main: errorMain,
          dark: errorDark,
        },
        warning: {
          light: warningLight,
          main: warningMain,
          dark: warningDark,
        },
        info: {
          light: infoLight,
          main: infoMain,
          dark: infoDark,
        },
        background: {
          default: backgroundMain,
          paper: surfaceMain,
        },
        text: {
          primary: textPrimary,
          secondary: textSecondary,
          disabled: textDisabled,
        },
        success: {
          light: successLight,
          main: successMain,
          dark: successDark,
        },
      },
      typography: {
        fontFamily: '"Segoe UI", "Roboto", "Arial", sans-serif',
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
            },
          },
        },
      },
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actualThemeMode, paletteChangeCounter]); // paletteChangeCounter is needed to force theme rebuild

  // Theme preference management methods
  const setPreferredTheme = (theme: ThemeMode): void => {
    setPreferredThemeState(theme);
    setCurrentThemeState(theme);
    saveUserThemePreference(actualStorageKey, theme);
  };

  const clearPreferredTheme = (): void => {
    setPreferredThemeState(null);
    clearUserThemePreference(actualStorageKey);
    
    // Reset to default theme
    const fallbackTheme = resolveDefaultTheme(defaultTheme, false);
    setCurrentThemeState(fallbackTheme);
  };

  const getPreferredTheme = (): ThemeMode | null => {
    return preferredTheme;
  };

  // Current theme management methods (for admin/preview overrides)
  const getCurrentTheme = (): ThemeMode => {
    return currentTheme;
  };

  const setCurrentTheme = (theme: ThemeMode): void => {
    setCurrentThemeState(theme);
    // Note: This does NOT update preferredTheme or localStorage
  };

  const value: ThemeContextValue = {
    currentTheme,
    preferredTheme,
    actualThemeMode,
    theme,
    isDark: actualThemeMode === 'dark',
    isPersistent: actualStorageKey !== null,
    
    // Theme preference management
    setPreferredTheme,
    clearPreferredTheme,
    getPreferredTheme,
    
    // Current theme management
    getCurrentTheme,
    setCurrentTheme,
  };

  const content = (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );

  // Conditionally wrap with PaletteProvider if enabled
  if (includePalette) {
    return (
      <PaletteProvider appId={appId} defaultPalette={defaultPalette}>
        {content}
      </PaletteProvider>
    );
  }

  // No palette provider
  return content;
};
