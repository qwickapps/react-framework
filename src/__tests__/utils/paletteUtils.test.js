/**
 * Palette Utilities Tests
 * Tests for palette utility functions
 */

import {
  AVAILABLE_PALETTES,
  getCurrentPalette,
  setPalette,
  getPaletteName,
  initializePalette,
  savePalettePreference,
  getCSSVariable,
  setCSSVariable
} from '../../utils/paletteUtils';

describe('Palette Utilities', () => {
  beforeEach(() => {
    // Reset document mock
    document.documentElement.getAttribute.mockReturnValue(null);
    document.documentElement.setAttribute.mockClear();
    
    // Clear all mocks
    jest.clearAllMocks();
    document.documentElement.setAttribute.mockClear();
  });

  describe('AVAILABLE_PALETTES', () => {
    test('contains all expected palettes', () => {
      expect(AVAILABLE_PALETTES).toHaveLength(5);
      
      const paletteIds = AVAILABLE_PALETTES.map(p => p.id);
      expect(paletteIds).toContain('default');
      expect(paletteIds).toContain('winter');
      expect(paletteIds).toContain('autumn');
      expect(paletteIds).toContain('spring');
      expect(paletteIds).toContain('ocean');
    });

    test('has proper structure for each palette', () => {
      AVAILABLE_PALETTES.forEach(palette => {
        expect(palette).toHaveProperty('id');
        expect(palette).toHaveProperty('name');
        expect(typeof palette.id).toBe('string');
        expect(typeof palette.name).toBe('string');
      });
    });
  });

  describe('getCurrentPalette', () => {
    test('returns default when no palette is set', () => {
      expect(getCurrentPalette()).toBe('default');
    });

    test('returns palette from document attribute', () => {
      document.documentElement.getAttribute.mockReturnValue('winter');
      expect(getCurrentPalette()).toBe('winter');
    });
  });

  describe('setPalette', () => {
    test('sets palette attribute on document element', () => {
      setPalette('ocean');
      expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-palette', 'ocean');
    });

    test('dispatches palette change event', () => {
      const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent');
      setPalette('spring');
      
      expect(dispatchEventSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'paletteChange',
          detail: { palette: 'spring' }
        })
      );
    });
  });

  describe('getPaletteName', () => {
    test('returns correct name for valid palette ID', () => {
      expect(getPaletteName('default')).toBe('Default');
      expect(getPaletteName('winter')).toBe('Winter');
      expect(getPaletteName('autumn')).toBe('Autumn');
      expect(getPaletteName('spring')).toBe('Spring');
      expect(getPaletteName('ocean')).toBe('Ocean');
    });

    test('returns palette ID when name not found', () => {
      expect(getPaletteName('unknown')).toBe('unknown');
    });
  });

  describe('initializePalette', () => {
    test('loads palette from localStorage', () => {
      localStorage.getItem.mockImplementation(() => 'winter');
      initializePalette();
      
      expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-palette', 'winter');
    });

    test('uses default when no saved palette', () => {
      localStorage.getItem.mockImplementation(() => null);
      initializePalette();
      
      expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-palette', 'default');
    });
  });

  describe('savePalettePreference', () => {
    test('saves palette to localStorage and sets palette', () => {
      savePalettePreference('autumn');
      
      expect(localStorage.setItem).toHaveBeenCalledWith('palette', 'autumn');
      expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-palette', 'autumn');
    });
  });

  describe('getCSSVariable', () => {
    test('gets CSS custom property value', () => {
      global.getComputedStyle.mockReturnValue({
        getPropertyValue: jest.fn().mockReturnValue('  #ff0000  '),
      });
      
      const result = getCSSVariable('--primary-color');
      
      expect(getComputedStyle).toHaveBeenCalledWith(document.documentElement);
      expect(result).toBe('#ff0000'); // Should be trimmed
    });
  });

  describe('setCSSVariable', () => {
    test('sets CSS custom property value', () => {
      setCSSVariable('--primary-color', '#00ff00');
      
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--primary-color',
        '#00ff00'
      );
    });
  });
});
