/**
 * QwickApps AppConfig Implementation
 * 
 * Immutable configuration object with computed properties for Vite and PWA.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import type { UserConfig as ViteUserConfig } from 'vite';
import type { 
  AppConfig as IAppConfig, 
  AppIdentity, 
  BuildConfig, 
  PWAConfig, 
  UIConfig,
  CopyrightConfig
} from './types';

/**
 * Immutable application configuration
 */
export class AppConfig implements IAppConfig {
  public readonly app: AppIdentity;
  public readonly build: BuildConfig;
  public readonly pwa: PWAConfig;
  public readonly ui: UIConfig;
  public readonly copyright: CopyrightConfig;

  constructor(config: {
    app: AppIdentity;
    build: BuildConfig;
    pwa: PWAConfig;
    ui: UIConfig;
    copyright: CopyrightConfig;
  }) {
    // Create frozen, immutable configuration
    this.app = Object.freeze({ ...config.app });
    this.build = Object.freeze({ ...config.build });
    this.pwa = Object.freeze({ ...config.pwa });
    this.ui = Object.freeze({ ...config.ui });
    this.copyright = Object.freeze({ ...config.copyright });
    
    // Freeze the entire object
    Object.freeze(this);
  }

  /**
   * Generate complete Vite configuration
   */
  get viteConfig(): ViteUserConfig {
    return {
      server: {
        port: this.build.port,
        host: true,
      },
      preview: {
        port: this.build.previewPort,
        host: true,
      },
      build: {
        outDir: this.build.outputDir,
      },
      base: this.build.base,
      publicDir: 'public',
      define: {
        __APP_NAME__: JSON.stringify(this.app.name),
        __APP_ID__: JSON.stringify(this.app.id),
        __APP_VERSION__: JSON.stringify(this.app.version),
      },
    };
  }

  /**
   * Generate PWA manifest
   */
  get pwaManifest(): Record<string, unknown> {
    return {
      name: this.app.name,
      short_name: this.app.shortName,
      description: this.app.description,
      start_url: this.pwa.startUrl,
      display: this.pwa.display,
      orientation: this.pwa.orientation,
      theme_color: this.pwa.themeColor,
      background_color: this.pwa.backgroundColor,
      scope: this.pwa.scope,
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    };
  }

  /**
   * Convert to plain object (for serialization)
   */
  toJSON(): Record<string, unknown> {
    return {
      app: this.app,
      build: this.build,
      pwa: this.pwa,
      ui: this.ui,
      copyright: this.copyright,
    };
  }

  /**
   * Create a copy with overrides (returns new immutable instance)
   */
  with(overrides: Partial<{
    app: Partial<AppIdentity>;
    build: Partial<BuildConfig>;
    pwa: Partial<PWAConfig>;
    ui: Partial<UIConfig>;
    copyright: Partial<CopyrightConfig>;
  }>): AppConfig {
    return new AppConfig({
      app: { ...this.app, ...overrides.app },
      build: { ...this.build, ...overrides.build },
      pwa: { ...this.pwa, ...overrides.pwa },
      ui: { ...this.ui, ...overrides.ui },
      copyright: { ...this.copyright, ...overrides.copyright },
    });
  }
}