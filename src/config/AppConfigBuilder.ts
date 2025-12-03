/**
 * QwickApps AppConfigBuilder
 * 
 * Builder pattern for creating validated, immutable AppConfig instances.
 * Supports fluent API and deferred validation.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

// Node.js imports (only available in build/development environment)
let fs: typeof import('fs') | undefined;
let path: typeof import('path') | undefined;

try {
  // Only import if we're in Node.js environment
  if (typeof window === 'undefined' && typeof process !== 'undefined') {
    fs = require('fs');
    path = require('path');
  }
} catch (error) {
  // Browser environment - fs/path not available
}
import { AppConfig } from './AppConfig';
import type { 
  AppIdentity, 
  BuildConfig, 
  PWAConfig, 
  UIConfig,
  CopyrightConfig,
  AppConfigOptions,
  ValidationResult 
} from './types';

/**
 * Builder for creating AppConfig instances with validation
 */
export class AppConfigBuilder {
  private config: {
    app: Partial<{
      id: string;
      name: string;
      shortName: string;
      description: string;
      version: string;
      logo: string;
      author?: string;
      homepage?: string;
    }>;
    build: Partial<{
      port: number;
      previewPort: number;
      outputDir: string;
      publicPath: string;
      base: string;
    }>;
    pwa: Partial<{
      themeColor: string;
      backgroundColor: string;
      startUrl: string;
      scope: string;
      display: 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser';
      orientation?: 'portrait' | 'landscape' | 'any';
    }>;
    ui: Partial<{
      defaultTheme: 'light' | 'dark' | 'system';
      defaultPalette: string;
      enableScaffolding: boolean;
      showThemeSwitcher: boolean;
      showPaletteSwitcher: boolean;
    }>;
    copyright: Partial<{
      year: 'auto' | number;
      author: string;
      text?: string;
    }>;
  } = {
    app: {},
    build: {},
    pwa: {},
    ui: {},
    copyright: {},
  };

  private options: AppConfigOptions = {};

  private constructor() {}

  /**
   * Create a new AppConfigBuilder instance
   */
  static create(): AppConfigBuilder {
    return new AppConfigBuilder();
  }

  /**
   * Load configuration from JSON file (Node.js only)
   */
  withConfig(configPath: string): AppConfigBuilder {
    if (!fs || !path) {
      // Only warn in development, not in tests or production browsers
      if (process.env.NODE_ENV !== 'test' && typeof window === 'undefined') {
        console.warn('Warning: File system operations not available in browser environment');
      }
      return this;
    }

    try {
      const fullPath = path.resolve(configPath);
      const configData = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
      
      if (configData.app) Object.assign(this.config.app, configData.app);
      if (configData.build) Object.assign(this.config.build, configData.build);
      if (configData.pwa) Object.assign(this.config.pwa, configData.pwa);
      if (configData.ui) Object.assign(this.config.ui, configData.ui);
      if (configData.copyright) Object.assign(this.config.copyright, configData.copyright);
    } catch (error) {
      // Don't throw here - will be handled in build()
      console.warn(`Warning: Could not load config file: ${configPath}`);
    }
    
    return this;
  }

  /**
   * Set builder options
   */
  withOptions(options: AppConfigOptions): AppConfigBuilder {
    this.options = { ...this.options, ...options };
    return this;
  }

  // App Identity Methods
  withName(name: string): AppConfigBuilder {
    this.config.app.name = name;
    return this;
  }

  withId(id: string): AppConfigBuilder {
    this.config.app.id = id;
    return this;
  }

  withShortName(shortName: string): AppConfigBuilder {
    this.config.app.shortName = shortName;
    return this;
  }

  withDescription(description: string): AppConfigBuilder {
    this.config.app.description = description;
    return this;
  }

  withVersion(version: string): AppConfigBuilder {
    this.config.app.version = version;
    return this;
  }

  withLogo(logo: string): AppConfigBuilder {
    this.config.app.logo = logo;
    return this;
  }

  withAuthor(author: string): AppConfigBuilder {
    this.config.app.author = author;
    return this;
  }

  withHomepage(homepage: string): AppConfigBuilder {
    this.config.app.homepage = homepage;
    return this;
  }

  // Build Config Methods
  withPort(port: number): AppConfigBuilder {
    this.config.build.port = port;
    return this;
  }

  withPreviewPort(previewPort: number): AppConfigBuilder {
    this.config.build.previewPort = previewPort;
    return this;
  }

  withOutputDir(outputDir: string): AppConfigBuilder {
    this.config.build.outputDir = outputDir;
    return this;
  }

  withPublicPath(publicPath: string): AppConfigBuilder {
    this.config.build.publicPath = publicPath;
    return this;
  }

  withBase(base: string): AppConfigBuilder {
    this.config.build.base = base;
    return this;
  }

  // PWA Config Methods
  withThemeColor(themeColor: string): AppConfigBuilder {
    this.config.pwa.themeColor = themeColor;
    return this;
  }

  withBackgroundColor(backgroundColor: string): AppConfigBuilder {
    this.config.pwa.backgroundColor = backgroundColor;
    return this;
  }

  withStartUrl(startUrl: string): AppConfigBuilder {
    this.config.pwa.startUrl = startUrl;
    return this;
  }

  withScope(scope: string): AppConfigBuilder {
    this.config.pwa.scope = scope;
    return this;
  }

  withDisplay(display: 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser'): AppConfigBuilder {
    this.config.pwa.display = display;
    return this;
  }

  withOrientation(orientation: 'portrait' | 'landscape' | 'any'): AppConfigBuilder {
    this.config.pwa.orientation = orientation;
    return this;
  }

  // UI Config Methods
  withDefaultTheme(defaultTheme: 'light' | 'dark' | 'system'): AppConfigBuilder {
    this.config.ui.defaultTheme = defaultTheme;
    return this;
  }

  withDefaultPalette(defaultPalette: string): AppConfigBuilder {
    this.config.ui.defaultPalette = defaultPalette;
    return this;
  }

  withScaffolding(enableScaffolding: boolean): AppConfigBuilder {
    this.config.ui.enableScaffolding = enableScaffolding;
    return this;
  }

  withThemeSwitcher(showThemeSwitcher: boolean): AppConfigBuilder {
    this.config.ui.showThemeSwitcher = showThemeSwitcher;
    return this;
  }

  withPaletteSwitcher(showPaletteSwitcher: boolean): AppConfigBuilder {
    this.config.ui.showPaletteSwitcher = showPaletteSwitcher;
    return this;
  }

  // Copyright Methods
  withCopyright(year: 'auto' | number, author: string, text?: string): AppConfigBuilder {
    this.config.copyright.year = year;
    this.config.copyright.author = author;
    if (text !== undefined) this.config.copyright.text = text;
    return this;
  }

  withCopyrightYear(year: 'auto' | number): AppConfigBuilder {
    this.config.copyright.year = year;
    return this;
  }

  withCopyrightAuthor(author: string): AppConfigBuilder {
    this.config.copyright.author = author;
    return this;
  }

  withCopyrightText(text: string): AppConfigBuilder {
    this.config.copyright.text = text;
    return this;
  }

  /**
   * Build and validate the configuration
   */
  build(): AppConfig {
    const validation = this.validate();
    
    // Print warnings
    validation.warnings.forEach(warning => {
      console.warn(`⚠️  AppConfig: ${warning}`);
    });
    
    // Throw on errors
    if (!validation.isValid) {
      throw new Error(`AppConfig validation failed:\n${validation.errors.map(e => `  - ${e}`).join('\n')}`);
    }

    // Apply defaults and build
    const completeConfig = this.applyDefaults();
    return new AppConfig(completeConfig);
  }

  /**
   * Validate the current configuration
   */
  private validate(): ValidationResult {
    const warnings: string[] = [];
    const errors: string[] = [];

    // Required fields validation
    if (!this.config.app.name) errors.push('App name is required');
    if (!this.config.app.id) errors.push('App ID is required');
    
    // Copyright validation - author will be defaulted if not provided
    if (this.config.copyright.year && 
        this.config.copyright.year !== 'auto' && 
        (!Number.isInteger(this.config.copyright.year) || this.config.copyright.year < 1900)) {
      warnings.push('Copyright year should be "auto" or a valid year >= 1900');
    }
    
    // Logo file validation (warning only) - only in Node.js environment
    if (this.config.app.logo && !this.options.skipValidation && fs && path) {
      const logoPath = path.resolve(this.options.baseDir || process.cwd(), this.config.app.logo);
      if (!fs.existsSync(logoPath)) {
        warnings.push(`Logo file not found: ${this.config.app.logo} (will use default)`);
      }
    }

    // Port validation
    if (this.config.build.port !== undefined) {
      if (!Number.isInteger(this.config.build.port) || this.config.build.port < 1 || this.config.build.port > 65535) {
        errors.push('Port must be a valid integer between 1 and 65535');
      }
    }

    if (this.config.build.previewPort !== undefined) {
      if (!Number.isInteger(this.config.build.previewPort) || this.config.build.previewPort < 1 || this.config.build.previewPort > 65535) {
        errors.push('Preview port must be a valid integer between 1 and 65535');
      }
    }

    // Color validation (warnings only)
    if (this.config.pwa.themeColor && !this.isValidColor(this.config.pwa.themeColor)) {
      warnings.push(`Theme color may not be valid: ${this.config.pwa.themeColor}`);
    }

    if (this.config.pwa.backgroundColor && !this.isValidColor(this.config.pwa.backgroundColor)) {
      warnings.push(`Background color may not be valid: ${this.config.pwa.backgroundColor}`);
    }

    return {
      warnings,
      errors,
      isValid: errors.length === 0,
    };
  }

  /**
   * Apply default values to configuration
   */
  private applyDefaults(): {
    app: AppIdentity;
    build: BuildConfig;
    pwa: PWAConfig;
    ui: UIConfig;
    copyright: CopyrightConfig;
  } {
    const app: AppIdentity = {
      id: this.config.app.id!,
      name: this.config.app.name!,
      shortName: this.config.app.shortName || this.config.app.name!,
      description: this.config.app.description || this.config.app.name!,
      version: this.config.app.version || '1.0.0',
      logo: this.config.app.logo || '/favicon.ico',
      author: this.config.app.author,
      homepage: this.config.app.homepage,
    };

    const build: BuildConfig = {
      port: this.config.build.port || 3000,
      previewPort: this.config.build.previewPort || 4173,
      outputDir: this.config.build.outputDir || 'dist',
      publicPath: this.config.build.publicPath || '/',
      base: this.config.build.base || '/',
    };

    const pwa: PWAConfig = {
      themeColor: this.config.pwa.themeColor || '#000000',
      backgroundColor: this.config.pwa.backgroundColor || '#ffffff',
      startUrl: this.config.pwa.startUrl || '/',
      scope: this.config.pwa.scope || '/',
      display: this.config.pwa.display || 'standalone',
      orientation: this.config.pwa.orientation,
    };

    const ui: UIConfig = {
      defaultTheme: this.config.ui.defaultTheme || 'light',
      defaultPalette: this.config.ui.defaultPalette || 'default',
      enableScaffolding: this.config.ui.enableScaffolding ?? true,
      showThemeSwitcher: this.config.ui.showThemeSwitcher ?? false,
      showPaletteSwitcher: this.config.ui.showPaletteSwitcher ?? false,
    };

    const copyright: CopyrightConfig = {
      year: this.config.copyright.year || 'auto',
      author: this.config.copyright.author || app.author || app.name,
      text: this.config.copyright.text,
    };

    return { app, build, pwa, ui, copyright };
  }

  /**
   * Simple color validation
   */
  private isValidColor(color: string): boolean {
    // Basic hex color validation
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color) ||
           // Named colors (basic check)
           /^(black|white|red|green|blue|yellow|orange|purple|pink|gray|grey)$/i.test(color) ||
           // RGB/RGBA
           /^rgba?\([^)]+\)$/i.test(color);
  }
}