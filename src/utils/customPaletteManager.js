/**
 * Custom Palette Manager - Create and manage custom color palettes
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

/**
 * Saves a custom palette to localStorage
 * @param {Object} palette - Palette object with id, name, colors, etc.
 */
export const saveCustomPalette = (palette) => {
  const customPalettes = getCustomPalettes();
  const updatedPalettes = customPalettes.filter(p => p.id !== palette.id);
  updatedPalettes.push(palette);
  
  localStorage.setItem('qwickapps-custom-palettes', JSON.stringify(updatedPalettes));
  
  // Dispatch event to notify components
  window.dispatchEvent(new CustomEvent('custom-palettes-changed', {
    detail: { palettes: updatedPalettes }
  }));
};

/**
 * Gets all custom palettes from localStorage
 * @returns {Array} Array of custom palette objects
 */
export const getCustomPalettes = () => {
  try {
    const stored = localStorage.getItem('qwickapps-custom-palettes');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn('Failed to load custom palettes:', error);
    return [];
  }
};

/**
 * Deletes a custom palette
 * @param {string} paletteId - ID of the palette to delete
 */
export const deleteCustomPalette = (paletteId) => {
  const customPalettes = getCustomPalettes();
  const updatedPalettes = customPalettes.filter(p => p.id !== paletteId);
  
  localStorage.setItem('qwickapps-custom-palettes', JSON.stringify(updatedPalettes));
  
  // Dispatch event to notify components
  window.dispatchEvent(new CustomEvent('custom-palettes-changed', {
    detail: { palettes: updatedPalettes }
  }));
};

/**
 * Exports a palette to a JSON file
 * @param {Object} palette - Palette to export
 */
export const exportPalette = (palette) => {
  const dataStr = JSON.stringify(palette, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = `qwickapps-palette-${palette.id}.json`;
  link.click();
  
  URL.revokeObjectURL(link.href);
};

/**
 * Imports a palette from a JSON file
 * @param {File} file - JSON file containing palette data
 * @returns {Promise<Object>} Parsed palette object
 */
export const importPalette = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const palette = JSON.parse(event.target.result);
        
        // Basic validation
        if (!palette.id || !palette.name || !palette.primaryColor) {
          reject(new Error('Invalid palette format'));
          return;
        }
        
        // Ensure unique ID
        const customPalettes = getCustomPalettes();
        if (customPalettes.find(p => p.id === palette.id)) {
          palette.id = `${palette.id}-${Date.now()}`;
        }
        
        resolve(palette);
      } catch (error) {
        reject(new Error('Failed to parse palette file'));
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

/**
 * Creates a new custom palette from current theme colors
 * @param {string} name - Name for the new palette
 * @param {string} description - Description for the palette
 * @returns {Object} New palette object
 */
export const createPaletteFromCurrentTheme = (name, description) => {
  const root = document.documentElement;
  const style = getComputedStyle(root);
  
  // Extract current colors
  const palette = {
    id: `custom-${Date.now()}`,
    name,
    description,
    isCustom: true,
    createdAt: new Date().toISOString(),
    primaryColor: style.getPropertyValue('--palette-primary-main').trim(),
    colors: {
      primary: {
        main: style.getPropertyValue('--palette-primary-main').trim(),
        light: style.getPropertyValue('--palette-primary-light').trim(),
        dark: style.getPropertyValue('--palette-primary-dark').trim(),
      },
      secondary: {
        main: style.getPropertyValue('--palette-secondary-main').trim(),
        light: style.getPropertyValue('--palette-secondary-light').trim(),
        dark: style.getPropertyValue('--palette-secondary-dark').trim(),
      },
      background: {
        main: style.getPropertyValue('--palette-background-main').trim(),
        secondary: style.getPropertyValue('--palette-background-dark').trim(),
      },
      surface: {
        main: style.getPropertyValue('--palette-surface-main').trim(),
        variant: style.getPropertyValue('--palette-surface-variant').trim(),
        elevated: style.getPropertyValue('--palette-surface-elevated').trim(),
      },
      text: {
        primary: style.getPropertyValue('--palette-text-primary').trim(),
        secondary: style.getPropertyValue('--palette-text-secondary').trim(),
        disabled: style.getPropertyValue('--palette-text-disabled').trim(),
      },
      border: {
        main: style.getPropertyValue('--palette-border-main').trim(),
        light: style.getPropertyValue('--palette-border-light').trim(),
        medium: style.getPropertyValue('--palette-border-medium').trim(),
      },
      success: {
        main: style.getPropertyValue('--palette-success-main').trim(),
        light: style.getPropertyValue('--palette-success-light').trim(),
        dark: style.getPropertyValue('--palette-success-dark').trim(),
      },
      error: {
        main: style.getPropertyValue('--palette-error-main').trim(),
        light: style.getPropertyValue('--palette-error-light').trim(),
        dark: style.getPropertyValue('--palette-error-dark').trim(),
      },
      warning: {
        main: style.getPropertyValue('--palette-warning-main').trim(),
        light: style.getPropertyValue('--palette-warning-light').trim(),
        dark: style.getPropertyValue('--palette-warning-dark').trim(),
      },
      info: {
        main: style.getPropertyValue('--palette-info-main').trim(),
        light: style.getPropertyValue('--palette-info-light').trim(),
        dark: style.getPropertyValue('--palette-info-dark').trim(),
      },
    }
  };
  
  return palette;
};

/**
 * Applies a custom palette dynamically
 * @param {Object} palette - Custom palette object
 */
export const applyCustomPalette = (palette) => {
  const root = document.documentElement;
  
  // Apply colors to CSS custom properties
  if (palette.colors) {
    const { colors } = palette;
    
    // Apply primary colors
    if (colors.primary) {
      root.style.setProperty('--palette-primary-main', colors.primary.main);
      root.style.setProperty('--palette-primary-light', colors.primary.light);
      root.style.setProperty('--palette-primary-dark', colors.primary.dark);
    }
    
    // Apply secondary colors
    if (colors.secondary) {
      root.style.setProperty('--palette-secondary-main', colors.secondary.main);
      root.style.setProperty('--palette-secondary-light', colors.secondary.light);
      root.style.setProperty('--palette-secondary-dark', colors.secondary.dark);
    }
    
    // Apply background colors
    if (colors.background) {
      root.style.setProperty('--palette-background-main', colors.background.main);
      root.style.setProperty('--palette-background-dark', colors.background.secondary);
    }
    
    // Apply other color categories as needed...
    // (This could be expanded to apply all color categories)
  }
};
