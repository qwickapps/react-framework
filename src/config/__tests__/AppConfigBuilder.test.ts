/**
 * AppConfigBuilder Tests
 * 
 * Comprehensive test suite for the AppConfigBuilder class.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import * as fs from 'fs';
import { AppConfigBuilder } from '../AppConfigBuilder';
import { AppConfig } from '../AppConfig';

// Mock fs module for file system tests
jest.mock('fs');
const mockFs = fs as jest.Mocked<typeof fs>;

describe('AppConfigBuilder', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Builder Pattern', () => {
    it('should create a new builder instance', () => {
      const builder = AppConfigBuilder.create();
      expect(builder).toBeInstanceOf(AppConfigBuilder);
    });

    it('should support fluent API chaining', () => {
      const builder = AppConfigBuilder.create()
        .withName('Test App')
        .withId('test-app')
        .withPort(3000)
        .withThemeColor('#ff0000');

      expect(builder).toBeInstanceOf(AppConfigBuilder);
    });
  });

  describe('Required Fields Validation', () => {
    it('should throw error when app name is missing', () => {
      expect(() => {
        AppConfigBuilder.create()
          .withId('test-app')
          .build();
      }).toThrow('AppConfig validation failed');
    });

    it('should throw error when app ID is missing', () => {
      expect(() => {
        AppConfigBuilder.create()
          .withName('Test App')
          .build();
      }).toThrow('AppConfig validation failed');
    });

    it('should build successfully with required fields', () => {
      const config = AppConfigBuilder.create()
        .withName('Test App')
        .withId('test-app')
        .build();

      expect(config).toBeInstanceOf(AppConfig);
      expect(config.app.name).toBe('Test App');
      expect(config.app.id).toBe('test-app');
    });
  });

  describe('Default Values', () => {
    it('should apply default values for optional fields', () => {
      const config = AppConfigBuilder.create()
        .withName('Test App')
        .withId('test-app')
        .build();

      // App defaults
      expect(config.app.shortName).toBe('Test App'); // defaults to name
      expect(config.app.description).toBe('Test App'); // defaults to name
      expect(config.app.version).toBe('1.0.0');
      expect(config.app.logo).toBe('/favicon.ico');

      // Build defaults
      expect(config.build.port).toBe(3000);
      expect(config.build.previewPort).toBe(4173);
      expect(config.build.outputDir).toBe('dist');
      expect(config.build.publicPath).toBe('/');
      expect(config.build.base).toBe('/');

      // PWA defaults
      expect(config.pwa.themeColor).toBe('#000000');
      expect(config.pwa.backgroundColor).toBe('#ffffff');
      expect(config.pwa.startUrl).toBe('/');
      expect(config.pwa.scope).toBe('/');
      expect(config.pwa.display).toBe('standalone');

      // UI defaults
      expect(config.ui.defaultTheme).toBe('light');
      expect(config.ui.defaultPalette).toBe('default');
      expect(config.ui.enableScaffolding).toBe(true);
      expect(config.ui.showThemeSwitcher).toBe(false);
      expect(config.ui.showPaletteSwitcher).toBe(false);
    });

    it('should override defaults with provided values', () => {
      const config = AppConfigBuilder.create()
        .withName('Custom App')
        .withId('custom-app')
        .withShortName('Custom')
        .withDescription('A custom application')
        .withVersion('1.0.0')
        .withLogo('./custom-logo.svg')
        .withPort(4000)
        .withPreviewPort(5000)
        .withThemeColor('#ff5722')
        .withDefaultTheme('dark')
        .withScaffolding(false)
        .build();

      expect(config.app.shortName).toBe('Custom');
      expect(config.app.description).toBe('A custom application');
      expect(config.app.version).toBe('1.0.0');
      expect(config.app.logo).toBe('./custom-logo.svg');
      expect(config.build.port).toBe(4000);
      expect(config.build.previewPort).toBe(5000);
      expect(config.pwa.themeColor).toBe('#ff5722');
      expect(config.ui.defaultTheme).toBe('dark');
      expect(config.ui.enableScaffolding).toBe(false);
    });
  });

  describe('Port Validation', () => {
    it('should accept valid port numbers', () => {
      const config = AppConfigBuilder.create()
        .withName('Test App')
        .withId('test-app')
        .withPort(3000)
        .withPreviewPort(4000)
        .build();

      expect(config.build.port).toBe(3000);
      expect(config.build.previewPort).toBe(4000);
    });

    it('should throw error for invalid port numbers', () => {
      expect(() => {
        AppConfigBuilder.create()
          .withName('Test App')
          .withId('test-app')
          .withPort(0)
          .build();
      }).toThrow('Port must be a valid integer between 1 and 65535');

      expect(() => {
        AppConfigBuilder.create()
          .withName('Test App')
          .withId('test-app')
          .withPort(70000)
          .build();
      }).toThrow('Port must be a valid integer between 1 and 65535');
    });

    it('should throw error for non-integer ports', () => {
      expect(() => {
        AppConfigBuilder.create()
          .withName('Test App')
          .withId('test-app')
          .withPort(3000.5 as unknown as number)
          .build();
      }).toThrow('Port must be a valid integer between 1 and 65535');
    });
  });

  describe('Logo File Validation', () => {
    it.skip('should warn when logo file does not exist', () => {
      const consoleWarn = jest.spyOn(console, 'warn').mockImplementation();
      mockFs.existsSync.mockReturnValue(false);

      const config = AppConfigBuilder.create()
        .withName('Test App')
        .withId('test-app')
        .withLogo('./missing-logo.svg')
        .build();

      expect(consoleWarn).toHaveBeenCalledWith(
        '⚠️  AppConfig: Logo file not found: ./missing-logo.svg (will use default)'
      );
      expect(config.app.logo).toBe('./missing-logo.svg'); // Still uses provided path

      consoleWarn.mockRestore();
    });

    it('should not warn when logo file exists', () => {
      const consoleWarn = jest.spyOn(console, 'warn').mockImplementation();
      mockFs.existsSync.mockReturnValue(true);

      const config = AppConfigBuilder.create()
        .withName('Test App')
        .withId('test-app')
        .withLogo('./existing-logo.svg')
        .build();

      expect(consoleWarn).not.toHaveBeenCalled();
      expect(config.app.logo).toBe('./existing-logo.svg');

      consoleWarn.mockRestore();
    });

    it('should skip validation when skipValidation option is true', () => {
      jest.spyOn(console, 'warn').mockImplementation();

      AppConfigBuilder.create()
        .withOptions({ skipValidation: true })
        .withName('Test App')
        .withId('test-app')
        .withLogo('./missing-logo.svg')
        .build();

      expect(consoleWarn).not.toHaveBeenCalled();
      expect(mockFs.existsSync).not.toHaveBeenCalled();

      consoleWarn.mockRestore();
    });
  });

  describe('Color Validation', () => {
    it('should accept valid hex colors', () => {
      const consoleWarn = jest.spyOn(console, 'warn').mockImplementation();

      const config = AppConfigBuilder.create()
        .withName('Test App')
        .withId('test-app')
        .withThemeColor('#ff5722')
        .withBackgroundColor('#ffffff')
        .build();

      expect(consoleWarn).not.toHaveBeenCalled();
      expect(config.pwa.themeColor).toBe('#ff5722');
      expect(config.pwa.backgroundColor).toBe('#ffffff');

      consoleWarn.mockRestore();
    });

    it('should accept named colors', () => {
      jest.spyOn(console, 'warn').mockImplementation();

      AppConfigBuilder.create()
        .withName('Test App')
        .withId('test-app')
        .withThemeColor('red')
        .withBackgroundColor('white')
        .build();

      expect(consoleWarn).not.toHaveBeenCalled();

      consoleWarn.mockRestore();
    });

    it('should warn for potentially invalid colors', () => {
      const consoleWarn = jest.spyOn(console, 'warn').mockImplementation();

      AppConfigBuilder.create()
        .withName('Test App')
        .withId('test-app')
        .withThemeColor('invalid-color')
        .build();

      expect(consoleWarn).toHaveBeenCalledWith(
        '⚠️  AppConfig: Theme color may not be valid: invalid-color'
      );

      consoleWarn.mockRestore();
    });
  });

  describe('Config File Loading', () => {
    it.skip('should load configuration from JSON file', () => {
      const configData = {
        app: {
          name: 'Config App',
          id: 'config-app',
          version: '1.5.0'
        },
        build: {
          port: 3500
        },
        pwa: {
          themeColor: '#2196f3'
        },
        ui: {
          defaultTheme: 'dark'
        }
      };

      mockFs.readFileSync.mockReturnValue(JSON.stringify(configData));

      const config = AppConfigBuilder.create()
        .withConfig('./app.config.json')
        .build();

      expect(config.app.name).toBe('Config App');
      expect(config.app.id).toBe('config-app');
      expect(config.app.version).toBe('1.5.0');
      expect(config.build.port).toBe(3500);
      expect(config.pwa.themeColor).toBe('#2196f3');
      expect(config.ui.defaultTheme).toBe('dark');
    });

    it.skip('should override config file values with builder methods', () => {
      const configData = {
        app: {
          name: 'Config App',
          id: 'config-app'
        }
      };

      mockFs.readFileSync.mockReturnValue(JSON.stringify(configData));

      const config = AppConfigBuilder.create()
        .withConfig('./app.config.json')
        .withName('Override App') // Override the config file value
        .build();

      expect(config.app.name).toBe('Override App');
      expect(config.app.id).toBe('config-app');
    });

    it.skip('should warn when config file cannot be loaded', () => {
      const consoleWarn = jest.spyOn(console, 'warn').mockImplementation();
      mockFs.readFileSync.mockImplementation(() => {
        throw new Error('File not found');
      });

      AppConfigBuilder.create()
        .withConfig('./missing.json')
        .withName('Test App')
        .withId('test-app')
        .build();

      expect(consoleWarn).toHaveBeenCalledWith(
        'Warning: Could not load config file: ./missing.json'
      );

      consoleWarn.mockRestore();
    });
  });

  describe('Computed Properties', () => {
    it('should generate vite configuration', () => {
      const config = AppConfigBuilder.create()
        .withName('Test App')
        .withId('test-app')
        .withPort(3001)
        .withPreviewPort(4001)
        .withOutputDir('build')
        .withBase('/app/')
        .build();

      const viteConfig = config.viteConfig;

      expect(viteConfig.server?.port).toBe(3001);
      expect(viteConfig.preview?.port).toBe(4001);
      expect(viteConfig.build?.outDir).toBe('build');
      expect(viteConfig.base).toBe('/app/');
      expect(viteConfig.define?.__APP_NAME__).toBe('"Test App"');
      expect(viteConfig.define?.__APP_ID__).toBe('"test-app"');
    });

    it('should generate PWA manifest', () => {
      const config = AppConfigBuilder.create()
        .withName('PWA Test App')
        .withId('pwa-test')
        .withShortName('PWA Test')
        .withDescription('A PWA test application')
        .withThemeColor('#4caf50')
        .withBackgroundColor('#fafafa')
        .withDisplay('fullscreen')
        .build();

      const manifest = config.pwaManifest;

      expect(manifest.name).toBe('PWA Test App');
      expect(manifest.short_name).toBe('PWA Test');
      expect(manifest.description).toBe('A PWA test application');
      expect(manifest.theme_color).toBe('#4caf50');
      expect(manifest.background_color).toBe('#fafafa');
      expect(manifest.display).toBe('fullscreen');
      expect(manifest.icons).toHaveLength(2);
    });
  });

  describe('Error Handling', () => {
    it('should collect multiple errors and throw once', () => {
      expect(() => {
        AppConfigBuilder.create()
          .withPort(0) // Invalid port
          .withPreviewPort(100000) // Invalid port
          .build(); // Missing name and ID
      }).toThrow(/AppConfig validation failed/);
    });

    it('should show all errors in the error message', () => {
      try {
        AppConfigBuilder.create()
          .withPort(0)
          .build();
      } catch (error: unknown) {
        const message = error.message;
        expect(message).toContain('App name is required');
        expect(message).toContain('App ID is required');
        expect(message).toContain('Port must be a valid integer');
      }
    });
  });

  describe('Immutability', () => {
    it('should create immutable configuration objects', () => {
      const config = AppConfigBuilder.create()
        .withName('Test App')
        .withId('test-app')
        .build();

      // Attempt to modify the configuration should not work
      expect(() => {
        (config.app as { name: string }).name = 'Modified Name';
      }).toThrow();

      expect(() => {
        (config as { app: unknown }).app = { name: 'New App' };
      }).toThrow();
    });
  });
});