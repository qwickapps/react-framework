/**
 * Palette Manifest Utilities - Fetch and manage palette manifests
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

// Manifest structure
export interface PaletteManifestEntry {
  id: string;
  name: string;
  description: string;
  author?: string;
  license?: string;
  version: string;
  file: string;
  fileMinified?: string;
  thumbnail?: string;
  primaryColor: string;
  inlined?: boolean;
}

export interface PaletteManifest {
  version: string;
  palettes: PaletteManifestEntry[];
}

// Configuration
export interface PaletteManifestConfig {
  /** Enable/disable remote palette loading */
  enableRemote?: boolean;
  /** Custom remote URL for palette manifest */
  remoteUrl?: string;
  /** Custom local path for palette manifest */
  localPath?: string;
}

// Default configuration
const DEFAULT_CONFIG: Required<PaletteManifestConfig> = {
  enableRemote: true,
  remoteUrl: 'https://qwickapps.com/palettes/manifest.json',
  localPath: '/palettes/manifest.json',
};

// Cache for loaded manifests
let cachedManifest: PaletteManifest | null = null;
let manifestLoadAttempted = false;

/**
 * Fetch a manifest from a URL
 */
async function fetchManifestFromUrl(url: string): Promise<PaletteManifest | null> {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      // Short timeout for better UX
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      console.warn(`[PaletteManifest] Failed to fetch from ${url}: ${response.status} ${response.statusText}`);
      return null;
    }

    const manifest: PaletteManifest = await response.json();

    // Basic validation
    if (!manifest.version || !Array.isArray(manifest.palettes)) {
      console.warn(`[PaletteManifest] Invalid manifest structure from ${url}`);
      return null;
    }

    return manifest;
  } catch (error) {
    // Only log in development
    if ((import.meta as Record<string, unknown>).env?.DEV) {
      console.warn(`[PaletteManifest] Error fetching from ${url}:`, error);
    }
    return null;
  }
}

/**
 * Merge multiple manifests, with later manifests overriding earlier ones
 */
function mergeManifests(...manifests: (PaletteManifest | null)[]): PaletteManifest {
  const paletteMap = new Map<string, PaletteManifestEntry>();
  let latestVersion = '0.0.0';

  for (const manifest of manifests) {
    if (!manifest) continue;

    // Track latest version
    if (manifest.version > latestVersion) {
      latestVersion = manifest.version;
    }

    // Merge palettes (later manifests override)
    for (const palette of manifest.palettes) {
      paletteMap.set(palette.id, palette);
    }
  }

  return {
    version: latestVersion,
    palettes: Array.from(paletteMap.values()),
  };
}

/**
 * Load palette manifest from configured sources
 */
export async function loadPaletteManifest(
  config: PaletteManifestConfig = {}
): Promise<PaletteManifest> {
  // Return cached manifest if available
  if (cachedManifest) {
    return cachedManifest;
  }

  // Only attempt once
  if (manifestLoadAttempted) {
    return getFallbackManifest();
  }

  manifestLoadAttempted = true;

  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const manifests: (PaletteManifest | null)[] = [];

  // Try remote manifest first (if enabled)
  if (finalConfig.enableRemote) {
    const remoteManifest = await fetchManifestFromUrl(finalConfig.remoteUrl);
    manifests.push(remoteManifest);
  }

  // Try local manifest
  if (typeof window !== 'undefined') {
    const localManifest = await fetchManifestFromUrl(finalConfig.localPath);
    manifests.push(localManifest);
  }

  // Merge all loaded manifests
  const mergedManifest = mergeManifests(...manifests);

  // If no manifests loaded, use fallback
  if (mergedManifest.palettes.length === 0) {
    if ((import.meta as Record<string, unknown>).env?.DEV) {
      console.warn('[PaletteManifest] No manifests loaded, using fallback');
    }
    cachedManifest = getFallbackManifest();
    return cachedManifest;
  }

  cachedManifest = mergedManifest;
  return cachedManifest;
}

/**
 * Get fallback manifest with built-in palettes
 */
function getFallbackManifest(): PaletteManifest {
  return {
    version: '1.4.9',
    palettes: [
      {
        id: 'default',
        name: 'Default',
        description: 'Classic blue and neutral color scheme',
        version: '1.4.9',
        file: 'PaletteDefault.css',
        primaryColor: '#007bff',
        inlined: true,
      },
      {
        id: 'autumn',
        name: 'Autumn',
        description: 'Warm oranges, golden yellows, and earthy browns',
        version: '1.4.9',
        file: 'PaletteAutumn.css',
        primaryColor: '#ea580c',
        inlined: false,
      },
      {
        id: 'cosmic',
        name: 'Cosmic',
        description: 'Modern purple gradient for creative and tech brands',
        version: '1.4.9',
        file: 'PaletteCosmic.css',
        primaryColor: '#8b5cf6',
        inlined: false,
      },
      {
        id: 'ocean',
        name: 'Ocean',
        description: 'Deep blues, aqua teals, and seafoam greens',
        version: '1.4.9',
        file: 'PaletteOcean.css',
        primaryColor: '#0891b2',
        inlined: false,
      },
      {
        id: 'spring',
        name: 'Spring',
        description: 'Fresh greens, soft pinks, and bright yellows',
        version: '1.4.9',
        file: 'PaletteSpring.css',
        primaryColor: '#16a34a',
        inlined: false,
      },
      {
        id: 'winter',
        name: 'Winter',
        description: 'Cool blues, icy whites, and frosty grays',
        version: '1.4.9',
        file: 'PaletteWinter.css',
        primaryColor: '#0077be',
        inlined: false,
      },
    ],
  };
}

/**
 * Get a specific palette from the manifest
 */
export async function getPaletteFromManifest(
  paletteId: string,
  config?: PaletteManifestConfig
): Promise<PaletteManifestEntry | null> {
  const manifest = await loadPaletteManifest(config);
  return manifest.palettes.find(p => p.id === paletteId) || null;
}

/**
 * Get all available palettes
 */
export async function getAvailablePalettes(
  config?: PaletteManifestConfig
): Promise<PaletteManifestEntry[]> {
  const manifest = await loadPaletteManifest(config);
  return manifest.palettes;
}

/**
 * Clear the cached manifest (useful for testing)
 */
export function clearManifestCache(): void {
  cachedManifest = null;
  manifestLoadAttempted = false;
}

/**
 * Register a custom palette dynamically
 */
export function registerCustomPalette(palette: PaletteManifestEntry): void {
  if (!cachedManifest) {
    cachedManifest = getFallbackManifest();
  }

  // Remove existing palette with same ID
  cachedManifest.palettes = cachedManifest.palettes.filter(p => p.id !== palette.id);

  // Add new palette
  cachedManifest.palettes.push(palette);
}
