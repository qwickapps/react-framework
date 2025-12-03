/**
 * Theme Utilities Tests
 * Tests for theme utility functions
 */

import {
  getCurrentTheme,
  setTheme,
  getSystemTheme,
  getComputedTheme,
  initializeTheme,
  saveThemePreference
} from '../../utils/themeUtils';

describe('Theme Utilities', () => {
  beforeEach(() => {
    // Reset document mock
    document.documentElement.getAttribute.mockReturnValue(null);
    document.documentElement.setAttribute.mockClear();
    
    // Reset localStorage mocks
    localStorage.getItem.mockClear();
    localStorage.setItem.mockClear();
    
    // Restore original matchMedia mock
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
  });

  describe('getCurrentTheme', () => {
    test('returns default system when no theme is set', () => {
      expect(getCurrentTheme()).toBe('system');
    });

    test('returns theme from document attribute', () => {
      document.documentElement.getAttribute.mockReturnValue('dark');
      expect(getCurrentTheme()).toBe('dark');
    });
  });

  describe('setTheme', () => {
    test('sets theme attribute on document element', () => {
      setTheme('dark');
      expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'dark');
    });

    test('dispatches theme change event', () => {
      const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent');
      setTheme('light');
      
      expect(dispatchEventSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'themeChange',
          detail: { theme: 'light' }
        })
      );
    });
  });

  describe('getSystemTheme', () => {
    test('returns dark when system prefers dark', () => {
      window.matchMedia.mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)',
      }));
      
      expect(getSystemTheme()).toBe('dark');
    });

    test('returns light when system prefers light', () => {
      window.matchMedia.mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: light)',
      }));
      
      expect(getSystemTheme()).toBe('light');
    });
  });

  describe('getComputedTheme', () => {
    test('resolves system to actual theme', () => {
      window.matchMedia.mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)',
      }));
      
      expect(getComputedTheme('system')).toBe('dark');
    });

    test('returns explicit theme as-is', () => {
      expect(getComputedTheme('light')).toBe('light');
      expect(getComputedTheme('dark')).toBe('dark');
    });

    test('uses current theme when no theme provided', () => {
      document.documentElement.getAttribute.mockReturnValue('light');
      expect(getComputedTheme()).toBe('light');
    });
  });

  describe('initializeTheme', () => {
    test('loads theme from localStorage', () => {
      localStorage.getItem.mockImplementation(() => 'dark');
      initializeTheme();
      
      expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'dark');
    });

    test('uses system default when no saved theme', () => {
      localStorage.getItem.mockImplementation(() => null);
      initializeTheme();
      
      expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'system');
    });

    test('sets up system theme change listener', () => {
      const addEventListenerSpy = jest.fn();
      const mockMatchMedia = jest.fn().mockReturnValue({
        addEventListener: addEventListenerSpy,
      });
      window.matchMedia = mockMatchMedia;
      
      initializeTheme();
      
      expect(addEventListenerSpy).toHaveBeenCalledWith('change', expect.any(Function));
    });
  });

  describe('saveThemePreference', () => {
    test('saves theme to localStorage and sets theme', () => {
      saveThemePreference('dark');
      
      expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
      expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'dark');
    });
  });
});
