/**
 * Palette CSS Loader - Dynamically loads palette CSS files on demand using manifest
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import {
  getPaletteFromManifest,
  type PaletteManifestConfig,
} from './paletteManifest';

// Track loaded palettes to avoid duplicate loading
const loadedPalettes = new Set<string>();

// Track loading promises to avoid race conditions
const loadingPalettes = new Map<string, Promise<void>>();

// Default CDN URLs (prioritized)
const DEFAULT_CDN_URLS = [
  'https://qwickapps.com/palettes/',  // Primary CDN (Cloudflare)
  '/palettes/',  // Local fallback
];

// Global configuration
let globalConfig: PaletteManifestConfig = { enableRemote: true };

/**
 * Configure palette loader
 */
export function configurePaletteLoader(config: PaletteManifestConfig): void {
  globalConfig = { ...globalConfig, ...config };
}

/**
 * Dynamically load a palette CSS file
 *
 * @param paletteId - The ID of the palette to load (e.g., 'autumn', 'ocean')
 * @param config - Optional configuration override
 * @returns Promise that resolves when the palette is loaded
 */
export async function loadPalette(
  paletteId: string,
  config?: PaletteManifestConfig
): Promise<void> {
  // Skip if already loaded
  if (loadedPalettes.has(paletteId)) {
    return Promise.resolve();
  }

  // Return existing loading promise if already loading
  if (loadingPalettes.has(paletteId)) {
    return loadingPalettes.get(paletteId)!;
  }

  // Create new loading promise
  const loadingPromise = loadPaletteInternal(paletteId, config);

  // Store the loading promise
  loadingPalettes.set(paletteId, loadingPromise);

  return loadingPromise;
}

/**
 * Internal palette loading logic
 */
async function loadPaletteInternal(
  paletteId: string,
  config?: PaletteManifestConfig
): Promise<void> {
  const finalConfig = { ...globalConfig, ...config };

  // Don't load the default palette as it's already inlined in QwickApp.css
  if (paletteId === 'default') {
    loadedPalettes.add(paletteId);
    loadingPalettes.delete(paletteId);
    return;
  }

  // Check if we're in a browser environment
  if (typeof document === 'undefined') {
    // SSR environment - mark as loaded and continue
    loadedPalettes.add(paletteId);
    loadingPalettes.delete(paletteId);
    return;
  }

  // Check if the palette link already exists
  const existingLink = document.querySelector(`link[data-palette-id="${paletteId}"]`);
  if (existingLink) {
    loadedPalettes.add(paletteId);
    loadingPalettes.delete(paletteId);
    return;
  }

  try {
    // Get palette metadata from manifest
    const paletteEntry = await getPaletteFromManifest(paletteId, finalConfig);

    if (!paletteEntry) {
      // Palette not found in manifest
      if ((import.meta as Record<string, unknown>).env?.DEV) {
        console.warn(
          `[PaletteLoader] Palette "${paletteId}" not found in manifest. ` +
          `Available palettes will be limited. Falling back to default palette.`
        );
      }
      loadedPalettes.add(paletteId);
      loadingPalettes.delete(paletteId);
      return;
    }

    // Skip if inlined (already available)
    if (paletteEntry.inlined) {
      loadedPalettes.add(paletteId);
      loadingPalettes.delete(paletteId);
      return;
    }

    // Determine which CSS file to use (minified in production, unminified in dev)
    const isDevelopment = (import.meta as Record<string, unknown>).env?.DEV ?? false;
    const useMinified = !isDevelopment && paletteEntry.fileMinified;
    const filename = useMinified ? paletteEntry.fileMinified : paletteEntry.file;

    // Build list of URLs to try
    const urlsToTry: string[] = [];

    // Add remote CDN URLs if enabled
    if (finalConfig.enableRemote) {
      urlsToTry.push(`${DEFAULT_CDN_URLS[0]}${filename}`);
    }

    // Add local URL
    urlsToTry.push(`${DEFAULT_CDN_URLS[1]}${filename}`);

    // Try loading from each URL in order
    let loaded = false;
    for (const url of urlsToTry) {
      const success = await tryLoadPaletteFromUrl(url, paletteId);
      if (success) {
        loaded = true;
        break;
      }
    }

    if (!loaded) {
      // All attempts failed
      if ((import.meta as Record<string, unknown>).env?.DEV) {
        console.warn(
          `[PaletteLoader] Failed to load palette "${paletteId}" from all sources. ` +
          `Falling back to default palette. Tried URLs:`,
          urlsToTry
        );
      }
    }

    loadedPalettes.add(paletteId);
    loadingPalettes.delete(paletteId);
  } catch (error) {
    if ((import.meta as Record<string, unknown>).env?.DEV) {
      console.error(`[PaletteLoader] Error loading palette "${paletteId}":`, error);
    }
    loadedPalettes.add(paletteId);
    loadingPalettes.delete(paletteId);
  }
}

/**
 * Try to load a palette from a specific URL
 */
function tryLoadPaletteFromUrl(url: string, paletteId: string): Promise<boolean> {
  return new Promise((resolve) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    link.setAttribute('data-palette-id', paletteId);

    link.onload = () => {
      resolve(true);
    };

    link.onerror = () => {
      // Remove failed link
      document.head.removeChild(link);
      resolve(false);
    };

    document.head.appendChild(link);
  });
}

/**
 * Preload multiple palettes at once
 * @param paletteIds - Array of palette IDs to preload
 * @param config - Optional configuration
 */
export async function preloadPalettes(
  paletteIds: string[],
  config?: PaletteManifestConfig
): Promise<void> {
  await Promise.all(paletteIds.map(id => loadPalette(id, config)));
}

/**
 * Check if a palette is loaded
 * @param paletteId - The palette ID to check
 */
export function isPaletteLoaded(paletteId: string): boolean {
  return loadedPalettes.has(paletteId);
}

/**
 * Clear loaded palettes cache (useful for testing)
 */
export function clearPaletteCache(): void {
  loadedPalettes.clear();
  loadingPalettes.clear();
}
