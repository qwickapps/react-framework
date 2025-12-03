/**
 * Palette Context - Manages color palette state and switching
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AllPalettes } from '../palettes';
import {
  loadUserPalettePreference,
  saveUserPalettePreference,
  clearUserPalettePreference
} from '../utils/persistenceUtils';
import { loadPalette } from '../utils/paletteLoader';

// Type definitions
export interface PaletteConfig {
  id: string;
  name: string;
  description: string;
  primaryColor: string;
}

export interface PaletteContextValue {
  /** The palette currently being applied to the UI (resolved from preferred/default) */
  currentPalette: string;
  /** The user's preferred palette setting, or null if not set */
  preferredPalette: string | null;
  /** List of all available palettes */
  availablePalettes: PaletteConfig[];
  /** Whether preferences are persisted to localStorage */
  isPersistent: boolean;
  
  // Palette preference management
  /** Set user's preferred palette (saves to localStorage if persistent) */
  setPreferredPalette: (paletteId: string) => void;
  /** Clear user's preferred palette (removes from localStorage) */
  clearPreferredPalette: () => void;
  /** Get user's preferred palette */
  getPreferredPalette: () => string | null;
  
  // Current palette management (for admin/preview overrides)
  /** Get currently applied palette */
  getCurrentPalette: () => string;
  /** Temporarily override current palette (does not affect user preference) */
  setCurrentPalette: (paletteId: string) => void;
}

export interface PaletteProviderProps {
  children: ReactNode;
  /** 
   * App identifier for generating unique storage key, or persistence strategy.
   * - string: Use as app identifier to generate key 'appId.palette'
   * - true (default): Use default key 'qwickapps-react-framework-palette'
   * - false: Disable persistence (session-only)
   * @example 'com.mycompany.myapp' | true | false
   */
  appId?: string | true | false;
  /**
   * Default palette for the application when no user preference exists. The default is 'default'.
   * This can be overridden by user settings.
   * @example 'ocean' | 'autumn' | 'spring' | 'winter' | 'default'
   */
  defaultPalette?: string;
}

// Create context with proper typing
const PaletteContext = createContext<PaletteContextValue | null>(null);

export const usePalette = (): PaletteContextValue => {
  const context = useContext(PaletteContext);
  if (!context) {
    throw new Error('usePalette must be used within a PaletteProvider');
  }
  return context;
};

// Use imported palette configurations
const AVAILABLE_PALETTES: PaletteConfig[] = AllPalettes;

/**
 * Resolve the default palette ID based on user preference or fallback
 * @param paletteId - The desired palette ID
 * @param warn - Whether to issue a warning for invalid palette IDs
 * @returns The resolved palette ID
 */
const resolveDefaultPalette = (paletteId: string | undefined, warn = true): string => {
  if (paletteId && AVAILABLE_PALETTES.some(p => p.id === paletteId)) {
    return paletteId;
  }
  if (warn) {
    console.warn(`[PaletteProvider] Invalid defaultPalette '${paletteId}'. Using 'default'.`);
  }
  return 'default';
};

export const PaletteProvider: React.FC<PaletteProviderProps> = ({ 
  children, 
  appId,
  defaultPalette = 'default'
}) => {
  // Determine storage key based on appId
  const actualStorageKey = React.useMemo(() => {
    if (appId === false) {
      return null; // No persistence
    }
    
    if (typeof appId === 'string') {
      return `${appId}.palette`;
    }
    
    // appId is true or undefined - use default key with warning
    const defaultKey = 'qwickapps-react-framework-palette';
    console.warn(
      `[PaletteProvider] Using default storage key '${defaultKey}'. ` +
      `Consider providing an appId for production apps to avoid conflicts. ` +
      `Example: <PaletteProvider appId="com.mycompany.myapp">`
    );
    
    return defaultKey;
  }, [appId]);
  
  // Available palette IDs for validation
  const availablePaletteIds = AVAILABLE_PALETTES.map(p => p.id);

  // User's preferred palette (what they explicitly chose)
  const [preferredPalette, setPreferredPaletteState] = useState<string | null>(() => {
    return loadUserPalettePreference(actualStorageKey, availablePaletteIds);
  });

  // Current palette being applied (resolved from preferred/default)
  const [currentPalette, setCurrentPaletteState] = useState<string>(() => {
    const userPreference = loadUserPalettePreference(actualStorageKey, availablePaletteIds);
    return userPreference || resolveDefaultPalette(defaultPalette);
  });

  // Apply palette to document root immediately and on changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      // Dynamically load the palette CSS if not already loaded
      loadPalette(currentPalette).then(() => {
        // Set the data-palette attribute after CSS is loaded
        document.documentElement.setAttribute('data-palette', currentPalette);

        // Dispatch custom event to notify theme system (with small delay to ensure CSS is applied)
        setTimeout(() => {
          const event = new CustomEvent('palette-changed', {
            detail: { palette: currentPalette }
          });
          window.dispatchEvent(event);
        }, 50);
      }).catch((error) => {
        console.error(`[PaletteContext] Failed to load palette "${currentPalette}":`, error);
        // Still set the attribute and dispatch event even if loading fails
        document.documentElement.setAttribute('data-palette', currentPalette);
        const event = new CustomEvent('palette-changed', {
          detail: { palette: currentPalette }
        });
        window.dispatchEvent(event);
      });
    }
  }, [currentPalette]);

  // Note: We no longer automatically save to localStorage on every change
  // localStorage is only updated via setPreferredPalette() method

  // Palette preference management methods
  const setPreferredPalette = (paletteId: string): void => {
    const targetPalette = AVAILABLE_PALETTES.find(p => p.id === paletteId);
    if (targetPalette) {
      setPreferredPaletteState(paletteId);
      setCurrentPaletteState(paletteId);
      saveUserPalettePreference(actualStorageKey, paletteId);
    } else {
      console.warn(`Palette "${paletteId}" not found. Available palettes:`, AVAILABLE_PALETTES.map(p => p.id));
    }
  };

  const clearPreferredPalette = (): void => {
    setPreferredPaletteState(null);
    clearUserPalettePreference(actualStorageKey);
    
    // Reset to default palette
    const fallbackPalette = resolveDefaultPalette(defaultPalette, false);
    setCurrentPaletteState(fallbackPalette);
  };

  const getPreferredPalette = (): string | null => {
    return preferredPalette;
  };

  // Current palette management methods (for admin/preview overrides)
  const getCurrentPalette = (): string => {
    return currentPalette;
  };

  const setCurrentPalette = (paletteId: string): void => {
    const targetPalette = AVAILABLE_PALETTES.find(p => p.id === paletteId);
    if (targetPalette) {
      setCurrentPaletteState(paletteId);
      // Note: This does NOT update preferredPalette or localStorage
    } else {
      console.warn(`Palette "${paletteId}" not found. Available palettes:`, AVAILABLE_PALETTES.map(p => p.id));
    }
  };

  const value: PaletteContextValue = {
    currentPalette,
    preferredPalette,
    availablePalettes: AVAILABLE_PALETTES,
    isPersistent: actualStorageKey !== null,
    
    // Palette preference management
    setPreferredPalette,
    clearPreferredPalette,
    getPreferredPalette,
    
    // Current palette management
    getCurrentPalette,
    setCurrentPalette,
  };

  return (
    <PaletteContext.Provider value={value}>
      {children}
    </PaletteContext.Provider>
  );
};

export default PaletteProvider;
