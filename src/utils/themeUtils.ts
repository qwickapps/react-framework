// Theme utilities for QwickApps Theme System

import { ThemeMode, ActualThemeMode } from '../contexts/ThemeContext';

// Re-export types for convenience
export type { ThemeMode, ActualThemeMode } from '../contexts/ThemeContext';

/**
 * Get the current theme mode from CSS variables
 */
export const getCurrentTheme = (): ThemeMode => {
  if (typeof document === 'undefined') {
    return 'system'; // SSR fallback
  }
  const root = document.documentElement;
  const theme = root.getAttribute('data-theme') as ThemeMode;
  return theme || 'system';
};

/**
 * Set theme mode and update CSS variables
 */
export const setTheme = (theme: ThemeMode): void => {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return; // SSR - no-op
  }
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);

  // Trigger custom event for theme change
  window.dispatchEvent(new CustomEvent('themeChange', { detail: { theme } }));
};

/**
 * Get system preference for dark mode
 */
export const getSystemTheme = (): ActualThemeMode => {
  if (typeof window === 'undefined') {
    return 'light'; // SSR fallback
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

/**
 * Get computed theme (resolves 'system' to actual light/dark)
 */
export const getComputedTheme = (theme: ThemeMode = getCurrentTheme()): ActualThemeMode => {
  if (theme === 'system') {
    return getSystemTheme();
  }
  return theme as ActualThemeMode;
};

/**
 * Initialize theme system
 */
export const initializeTheme = (): void => {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return; // SSR - no-op
  }
  const savedTheme = (localStorage.getItem('theme') as ThemeMode) || 'system';
  setTheme(savedTheme);

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (getCurrentTheme() === 'system') {
      // Trigger re-render for system theme changes
      window.dispatchEvent(new CustomEvent('themeChange', { detail: { theme: 'system' } }));
    }
  });
};

/**
 * Save theme preference to localStorage
 */
export const saveThemePreference = (theme: ThemeMode): void => {
  if (typeof localStorage === 'undefined') {
    return; // SSR - no-op
  }
  localStorage.setItem('theme', theme);
  setTheme(theme);
};
