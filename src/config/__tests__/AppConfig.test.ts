/**
 * AppConfig Tests
 * 
 * Test suite for the AppConfig class.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { AppConfig } from '../AppConfig';
import type { AppIdentity, BuildConfig, PWAConfig, UIConfig, CopyrightConfig } from '../types';

describe('AppConfig', () => {
  const mockAppIdentity: AppIdentity = {
    id: 'test-app',
    name: 'Test Application',
    shortName: 'Test App',
    description: 'A test application',
    version: '1.0.0',
    logo: '/test-logo.svg',
    author: 'Test Author',
    homepage: 'https://test.com',
  };

  const mockBuildConfig: BuildConfig = {
    port: 3000,
    previewPort: 4173,
    outputDir: 'dist',
    publicPath: '/',
    base: '/',
  };

  const mockPWAConfig: PWAConfig = {
    themeColor: '#2196f3',
    backgroundColor: '#ffffff',
    startUrl: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
  };

  const mockUIConfig: UIConfig = {
    defaultTheme: 'light',
    defaultPalette: 'default',
    enableScaffolding: true,
    showThemeSwitcher: false,
    showPaletteSwitcher: false,
  };

  const mockCopyrightConfig: CopyrightConfig = {
    year: 2025,
    author: 'Test Author',
    text: 'All rights reserved.',
  };

  describe('Constructor', () => {
    it('should create an AppConfig instance with provided configuration', () => {
      const config = new AppConfig({
        app: mockAppIdentity,
        build: mockBuildConfig,
        pwa: mockPWAConfig,
        ui: mockUIConfig,
        copyright: mockCopyrightConfig,
      });

      expect(config.app).toEqual(mockAppIdentity);
      expect(config.build).toEqual(mockBuildConfig);
      expect(config.pwa).toEqual(mockPWAConfig);
      expect(config.ui).toEqual(mockUIConfig);
    });

    it('should create immutable configuration sections', () => {
      const config = new AppConfig({
        app: mockAppIdentity,
        build: mockBuildConfig,
        pwa: mockPWAConfig,
        ui: mockUIConfig,
        copyright: mockCopyrightConfig,
      });

      // Attempt to modify should fail
      expect(() => {
        (config.app as { name: string }).name = 'Modified Name';
      }).toThrow();

      expect(() => {
        (config.build as { port: number }).port = 4000;
      }).toThrow();
    });
  });

  describe('Vite Configuration', () => {
    it('should generate correct vite configuration', () => {
      const config = new AppConfig({
        app: mockAppIdentity,
        build: mockBuildConfig,
        pwa: mockPWAConfig,
        ui: mockUIConfig,
        copyright: mockCopyrightConfig,
      });

      const viteConfig = config.viteConfig;

      expect(viteConfig.server?.port).toBe(3000);
      expect(viteConfig.server?.host).toBe(true);
      expect(viteConfig.preview?.port).toBe(4173);
      expect(viteConfig.preview?.host).toBe(true);
      expect(viteConfig.build?.outDir).toBe('dist');
      expect(viteConfig.base).toBe('/');
      expect(viteConfig.publicDir).toBe('public');
    });

    it('should include app-specific defines', () => {
      const config = new AppConfig({
        app: mockAppIdentity,
        build: mockBuildConfig,
        pwa: mockPWAConfig,
        ui: mockUIConfig,
        copyright: mockCopyrightConfig,
      });

      const viteConfig = config.viteConfig;

      expect(viteConfig.define?.__APP_NAME__).toBe('"Test Application"');
      expect(viteConfig.define?.__APP_ID__).toBe('"test-app"');
      expect(viteConfig.define?.__APP_VERSION__).toBe('"1.0.0"');
    });

    it('should handle custom build configuration', () => {
      const customBuildConfig: BuildConfig = {
        port: 8080,
        previewPort: 8081,
        outputDir: 'build',
        publicPath: '/static/',
        base: '/app/',
      };

      const config = new AppConfig({
        app: mockAppIdentity,
        build: customBuildConfig,
        pwa: mockPWAConfig,
        ui: mockUIConfig,
        copyright: mockCopyrightConfig,
      });

      const viteConfig = config.viteConfig;

      expect(viteConfig.server?.port).toBe(8080);
      expect(viteConfig.preview?.port).toBe(8081);
      expect(viteConfig.build?.outDir).toBe('build');
      expect(viteConfig.base).toBe('/app/');
    });
  });

  describe('PWA Manifest', () => {
    it('should generate correct PWA manifest', () => {
      const config = new AppConfig({
        app: mockAppIdentity,
        build: mockBuildConfig,
        pwa: mockPWAConfig,
        ui: mockUIConfig,
        copyright: mockCopyrightConfig,
      });

      const manifest = config.pwaManifest;

      expect(manifest.name).toBe('Test Application');
      expect(manifest.short_name).toBe('Test App');
      expect(manifest.description).toBe('A test application');
      expect(manifest.start_url).toBe('/');
      expect(manifest.display).toBe('standalone');
      expect(manifest.orientation).toBe('portrait');
      expect(manifest.theme_color).toBe('#2196f3');
      expect(manifest.background_color).toBe('#ffffff');
      expect(manifest.scope).toBe('/');
    });

    it('should include default PWA icons', () => {
      const config = new AppConfig({
        app: mockAppIdentity,
        build: mockBuildConfig,
        pwa: mockPWAConfig,
        ui: mockUIConfig,
        copyright: mockCopyrightConfig,
      });

      const manifest = config.pwaManifest;

      expect(manifest.icons).toHaveLength(2);
      expect(manifest.icons[0]).toEqual({
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      });
      expect(manifest.icons[1]).toEqual({
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      });
    });

    it('should handle different PWA display modes', () => {
      const fullscreenPWAConfig: PWAConfig = {
        ...mockPWAConfig,
        display: 'fullscreen',
      };

      const config = new AppConfig({
        app: mockAppIdentity,
        build: mockBuildConfig,
        pwa: fullscreenPWAConfig,
        ui: mockUIConfig,
        copyright: mockCopyrightConfig,
      });

      const manifest = config.pwaManifest;
      expect(manifest.display).toBe('fullscreen');
    });
  });

  describe('JSON Serialization', () => {
    it('should serialize to JSON correctly', () => {
      const config = new AppConfig({
        app: mockAppIdentity,
        build: mockBuildConfig,
        pwa: mockPWAConfig,
        ui: mockUIConfig,
        copyright: mockCopyrightConfig,
      });

      const json = config.toJSON();

      expect(json).toEqual({
        app: mockAppIdentity,
        build: mockBuildConfig,
        pwa: mockPWAConfig,
        ui: mockUIConfig,
        copyright: mockCopyrightConfig,
      });
    });

    it('should be JSON.stringify compatible', () => {
      const config = new AppConfig({
        app: mockAppIdentity,
        build: mockBuildConfig,
        pwa: mockPWAConfig,
        ui: mockUIConfig,
        copyright: mockCopyrightConfig,
      });

      const jsonString = JSON.stringify(config);
      const parsed = JSON.parse(jsonString);

      expect(parsed.app).toEqual(mockAppIdentity);
      expect(parsed.build).toEqual(mockBuildConfig);
      expect(parsed.pwa).toEqual(mockPWAConfig);
      expect(parsed.ui).toEqual(mockUIConfig);
    });
  });

  describe('Configuration Override', () => {
    it('should create new instance with overrides', () => {
      const originalConfig = new AppConfig({
        app: mockAppIdentity,
        build: mockBuildConfig,
        pwa: mockPWAConfig,
        ui: mockUIConfig,
        copyright: mockCopyrightConfig,
      });

      const newConfig = originalConfig.with({
        app: { name: 'Modified App Name' },
        build: { port: 8080 },
        ui: { defaultTheme: 'dark' },
      });

      // Original config should be unchanged
      expect(originalConfig.app.name).toBe('Test Application');
      expect(originalConfig.build.port).toBe(3000);
      expect(originalConfig.ui.defaultTheme).toBe('light');

      // New config should have overrides
      expect(newConfig.app.name).toBe('Modified App Name');
      expect(newConfig.app.id).toBe('test-app'); // Unchanged
      expect(newConfig.build.port).toBe(8080);
      expect(newConfig.build.previewPort).toBe(4173); // Unchanged
      expect(newConfig.ui.defaultTheme).toBe('dark');
      expect(newConfig.ui.enableScaffolding).toBe(true); // Unchanged
    });

    it('should handle partial overrides', () => {
      const originalConfig = new AppConfig({
        app: mockAppIdentity,
        build: mockBuildConfig,
        pwa: mockPWAConfig,
        ui: mockUIConfig,
        copyright: mockCopyrightConfig,
      });

      const newConfig = originalConfig.with({
        pwa: { themeColor: '#ff5722' },
      });

      expect(newConfig.pwa.themeColor).toBe('#ff5722');
      expect(newConfig.pwa.backgroundColor).toBe('#ffffff'); // Unchanged
      expect(newConfig.pwa.display).toBe('standalone'); // Unchanged
    });

    it('should maintain immutability after override', () => {
      const originalConfig = new AppConfig({
        app: mockAppIdentity,
        build: mockBuildConfig,
        pwa: mockPWAConfig,
        ui: mockUIConfig,
        copyright: mockCopyrightConfig,
      });

      const newConfig = originalConfig.with({
        app: { name: 'New Name' },
      });

      expect(() => {
        (newConfig.app as { name: string }).name = 'Another Name';
      }).toThrow();
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined optional fields gracefully', () => {
      const minimalApp: AppIdentity = {
        id: 'minimal-app',
        name: 'Minimal App',
        shortName: 'Minimal',
        description: 'Minimal description',
        version: '1.0.0',
        logo: '/logo.svg',
      };

      const minimalPWAConfig: PWAConfig = {
        themeColor: '#2196f3',
        backgroundColor: '#ffffff',
        startUrl: '/',
        scope: '/',
        display: 'standalone',
      };

      const config = new AppConfig({
        app: minimalApp,
        build: mockBuildConfig,
        pwa: minimalPWAConfig,
        ui: mockUIConfig,
        copyright: mockCopyrightConfig,
      });

      expect(config.app.author).toBeUndefined();
      expect(config.app.homepage).toBeUndefined();
      expect(config.pwa.orientation).toBeUndefined();
    });

    it('should generate valid vite config even with minimal configuration', () => {
      const minimalBuild: BuildConfig = {
        port: 3000,
        previewPort: 4173,
        outputDir: 'dist',
        publicPath: '/',
        base: '/',
      };

      const config = new AppConfig({
        app: mockAppIdentity,
        build: minimalBuild,
        pwa: mockPWAConfig,
        ui: mockUIConfig,
        copyright: mockCopyrightConfig,
      });

      const viteConfig = config.viteConfig;

      expect(viteConfig).toBeDefined();
      expect(viteConfig.server).toBeDefined();
      expect(viteConfig.preview).toBeDefined();
      expect(viteConfig.build).toBeDefined();
      expect(viteConfig.define).toBeDefined();
    });
  });
});