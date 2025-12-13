/**
 * Icon Map Tests
 *
 * Tests for the icon mapping utility functions.
 */

import {
  getIconComponent,
  getIconEmoji,
  hasIcon,
  registerIcon,
  getRegisteredIcons,
  iconMap,
} from '../../utils/iconMap';
import { Home, Star } from '@mui/icons-material';

describe('iconMap', () => {
  describe('getIconComponent', () => {
    it('returns null for undefined input', () => {
      expect(getIconComponent(undefined)).toBeNull();
    });

    it('returns null for empty string', () => {
      expect(getIconComponent('')).toBeNull();
    });

    it('returns correct component for mapped icon', () => {
      const result = getIconComponent('home');
      expect(result).not.toBeNull();
      expect(result?.type).toBe(Home);
    });

    it('is case-insensitive', () => {
      const lower = getIconComponent('home');
      const upper = getIconComponent('HOME');
      const mixed = getIconComponent('Home');

      expect(lower?.type).toBe(upper?.type);
      expect(lower?.type).toBe(mixed?.type);
    });

    it('supports snake_case icon names', () => {
      const result = getIconComponent('manage_accounts');
      expect(result).not.toBeNull();
    });

    it('returns HelpOutline fallback for unmapped icons', () => {
      // Suppress console.warn for this test
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

      const result = getIconComponent('nonexistent_icon_xyz');
      expect(result).not.toBeNull();

      warnSpy.mockRestore();
    });

    it('logs warning for unmapped icons in non-production', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

      getIconComponent('nonexistent_icon_xyz');

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('nonexistent_icon_xyz')
      );

      warnSpy.mockRestore();
    });
  });

  describe('getIconEmoji', () => {
    it('returns fallback for undefined input', () => {
      expect(getIconEmoji(undefined)).toBe('🔗');
    });

    it('returns custom fallback when provided', () => {
      expect(getIconEmoji(undefined, '❓')).toBe('❓');
    });

    it('returns correct emoji for mapped icon', () => {
      expect(getIconEmoji('home')).toBe('🏠');
      expect(getIconEmoji('favorite')).toBe('❤️');
      expect(getIconEmoji('star')).toBe('⭐');
    });

    it('is case-insensitive', () => {
      expect(getIconEmoji('HOME')).toBe(getIconEmoji('home'));
    });

    it('returns fallback for unmapped icons', () => {
      expect(getIconEmoji('nonexistent_icon')).toBe('🔗');
    });
  });

  describe('hasIcon', () => {
    it('returns true for mapped icons', () => {
      expect(hasIcon('home')).toBe(true);
      expect(hasIcon('settings')).toBe(true);
      expect(hasIcon('people')).toBe(true);
    });

    it('returns false for unmapped icons', () => {
      expect(hasIcon('nonexistent_icon')).toBe(false);
    });

    it('is case-insensitive', () => {
      expect(hasIcon('HOME')).toBe(true);
      expect(hasIcon('Home')).toBe(true);
    });
  });

  describe('registerIcon', () => {
    // Cleanup any test icons after each test to prevent pollution
    afterEach(() => {
      delete iconMap['custom_test_icon'];
      delete iconMap['upper_case_icon'];
    });

    it('registers new icons at runtime', () => {
      const customIconName = 'custom_test_icon';

      // Should not exist initially
      expect(hasIcon(customIconName)).toBe(false);

      // Register it
      registerIcon(customIconName, {
        emoji: '🎯',
        component: Star,
      });

      // Should exist now
      expect(hasIcon(customIconName)).toBe(true);
      expect(getIconEmoji(customIconName)).toBe('🎯');
    });

    it('is case-insensitive for registration', () => {
      registerIcon('UPPER_CASE_ICON', {
        emoji: '🔤',
        component: Star,
      });

      expect(hasIcon('upper_case_icon')).toBe(true);
      expect(hasIcon('UPPER_CASE_ICON')).toBe(true);
    });
  });

  describe('getRegisteredIcons', () => {
    it('returns an array of icon names', () => {
      const icons = getRegisteredIcons();

      expect(Array.isArray(icons)).toBe(true);
      expect(icons.length).toBeGreaterThan(0);
    });

    it('includes common icons', () => {
      const icons = getRegisteredIcons();

      expect(icons).toContain('home');
      expect(icons).toContain('settings');
      expect(icons).toContain('dashboard');
      expect(icons).toContain('people');
      expect(icons).toContain('manage_accounts');
    });
  });

  describe('iconMap coverage', () => {
    it('has emoji and component for all entries', () => {
      for (const [name, mapping] of Object.entries(iconMap)) {
        expect(mapping.emoji).toBeDefined();
        expect(typeof mapping.emoji).toBe('string');
        expect(mapping.emoji.length).toBeGreaterThan(0);

        expect(mapping.component).toBeDefined();
        // Components can be functions or objects (React.memo, forwardRef, etc.)
        expect(['function', 'object']).toContain(typeof mapping.component);
      }
    });

    it('includes essential icons for navigation', () => {
      const essentialIcons = [
        'home', 'dashboard', 'settings', 'menu',
        'people', 'person', 'help', 'info',
      ];

      for (const icon of essentialIcons) {
        expect(hasIcon(icon)).toBe(true);
      }
    });

    it('includes authentication icons', () => {
      const authIcons = ['lock', 'security', 'key', 'login', 'logout'];

      for (const icon of authIcons) {
        expect(hasIcon(icon)).toBe(true);
      }
    });
  });
});
