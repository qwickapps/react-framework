// Palette utilities for QwickApps Theme System

import { PaletteConfig } from '../contexts/PaletteContext';

/**
 * Available palette options
 */
export const AVAILABLE_PALETTES: PaletteConfig[] = [
  { id: 'default', name: 'Default', description: 'Classic blue and neutral colors', primaryColor: '#007bff' },
  { id: 'winter', name: 'Winter', description: 'Cool blues and icy whites', primaryColor: '#0077be' },
  { id: 'autumn', name: 'Autumn', description: 'Warm oranges and golden yellows', primaryColor: '#ea580c' },
  { id: 'spring', name: 'Spring', description: 'Fresh greens and soft pinks', primaryColor: '#16a34a' },
  { id: 'ocean', name: 'Ocean', description: 'Deep blues and aqua teals', primaryColor: '#0891b2' }
];

/**
 * Get the current palette from CSS variables
 */
export const getCurrentPalette = (): string => {
  if (typeof document === 'undefined') {
    return 'default'; // SSR fallback
  }
  const root = document.documentElement;
  return root.getAttribute('data-palette') || 'default';
};

/**
 * Set palette and update CSS variables
 */
export const setPalette = (palette: string): void => {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return; // SSR - no-op
  }
  const root = document.documentElement;
  root.setAttribute('data-palette', palette);

  // Trigger custom event for palette change
  window.dispatchEvent(new CustomEvent('paletteChange', { detail: { palette } }));
};

/**
 * Get palette display name
 */
export const getPaletteName = (paletteId: string): string => {
  const palette = AVAILABLE_PALETTES.find(p => p.id === paletteId);
  return palette ? palette.name : paletteId;
};

/**
 * Get palette configuration by ID
 */
export const getPaletteConfig = (paletteId: string): PaletteConfig | undefined => {
  return AVAILABLE_PALETTES.find(p => p.id === paletteId);
};

/**
 * Initialize palette system
 */
export const initializePalette = (): void => {
  if (typeof localStorage === 'undefined') {
    return; // SSR - no-op
  }
  const savedPalette = localStorage.getItem('palette') || 'default';
  setPalette(savedPalette);
};

/**
 * Save palette preference to localStorage
 */
export const savePalettePreference = (palette: string): void => {
  if (typeof localStorage === 'undefined') {
    return; // SSR - no-op
  }
  localStorage.setItem('palette', palette);
  setPalette(palette);
};

/**
 * Get CSS custom property value
 */
export const getCSSVariable = (property: string): string => {
  if (typeof document === 'undefined') {
    return ''; // SSR fallback
  }
  return getComputedStyle(document.documentElement).getPropertyValue(property).trim();
};

/**
 * Set CSS custom property value
 */
export const setCSSVariable = (property: string, value: string): void => {
  if (typeof document === 'undefined') {
    return; // SSR - no-op
  }
  document.documentElement.style.setProperty(property, value);
};
