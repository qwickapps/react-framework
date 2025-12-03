/**
 * Persistence utilities for theme and palette preferences
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import type { ThemeMode } from '../contexts/ThemeContext';

/**
 * Load user theme preference from localStorage
 */
export const loadUserThemePreference = (storageKey: string | null): ThemeMode | null => {
  if (!storageKey || typeof window === 'undefined') {
    return null;
  }
  
  try {
    const saved = localStorage.getItem(storageKey) as ThemeMode;
    if (saved && ['light', 'dark', 'system'].includes(saved)) {
      return saved;
    }
  } catch (error) {
    console.warn('[persistenceUtils] Theme localStorage read failed:', error);
  }
  
  return null;
};

/**
 * Save user theme preference to localStorage
 */
export const saveUserThemePreference = (storageKey: string | null, theme: ThemeMode): void => {
  if (!storageKey || typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.setItem(storageKey, theme);
  } catch (error) {
    console.warn('[persistenceUtils] Theme localStorage write failed:', error);
  }
};

/**
 * Clear user theme preference from localStorage
 */
export const clearUserThemePreference = (storageKey: string | null): void => {
  if (!storageKey || typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.removeItem(storageKey);
  } catch (error) {
    console.warn('[persistenceUtils] Theme localStorage clear failed:', error);
  }
};

/**
 * Load user palette preference from localStorage
 */
export const loadUserPalettePreference = (storageKey: string | null, availablePalettes: string[]): string | null => {
  if (!storageKey || typeof window === 'undefined') {
    return null;
  }
  
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved && availablePalettes.includes(saved)) {
      return saved;
    }
  } catch (error) {
    console.warn('[persistenceUtils] Palette localStorage read failed:', error);
  }
  
  return null;
};

/**
 * Save user palette preference to localStorage
 */
export const saveUserPalettePreference = (storageKey: string | null, palette: string): void => {
  if (!storageKey || typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.setItem(storageKey, palette);
  } catch (error) {
    console.warn('[persistenceUtils] Palette localStorage write failed:', error);
  }
};

/**
 * Clear user palette preference from localStorage
 */
export const clearUserPalettePreference = (storageKey: string | null): void => {
  if (!storageKey || typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.removeItem(storageKey);
  } catch (error) {
    console.warn('[persistenceUtils] Palette localStorage clear failed:', error);
  }
};