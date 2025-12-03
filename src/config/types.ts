/**
 * QwickApps AppConfig Types
 * 
 * Defines the configuration contract for QwickApp applications.
 * Separates static app configuration from runtime settings.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import type { UserConfig as ViteUserConfig } from 'vite';

/**
 * Static, immutable application configuration
 */
export interface AppConfig {
  /** Application identity and metadata */
  readonly app: AppIdentity;
  
  /** Build and development settings */
  readonly build: BuildConfig;
  
  /** Progressive Web App configuration */
  readonly pwa: PWAConfig;
  
  /** Default theme and UI settings */
  readonly ui: UIConfig;
  
  /** Copyright and legal information */
  readonly copyright: CopyrightConfig;
  
  /** Computed Vite configuration */
  readonly viteConfig: ViteUserConfig;
  
  /** Computed PWA manifest */
  readonly pwaManifest: Record<string, unknown>;
}

/**
 * Application identity and basic metadata
 */
export interface AppIdentity {
  /** Unique application identifier */
  readonly id: string;
  
  /** Full application name */
  readonly name: string;
  
  /** Short name for PWA and limited spaces */
  readonly shortName: string;
  
  /** Application description */
  readonly description: string;
  
  /** Application version */
  readonly version: string;
  
  /** Path to application logo/icon */
  readonly logo: string;
  
  /** Application author/organization */
  readonly author?: string;
  
  /** Application homepage URL */
  readonly homepage?: string;
}

/**
 * Build and development configuration
 */
export interface BuildConfig {
  /** Development server port */
  readonly port: number;
  
  /** Preview server port */
  readonly previewPort: number;
  
  /** Build output directory */
  readonly outputDir: string;
  
  /** Public path for assets */
  readonly publicPath: string;
  
  /** Base URL for the application */
  readonly base: string;
}

/**
 * Progressive Web App configuration
 */
export interface PWAConfig {
  /** PWA theme color */
  readonly themeColor: string;
  
  /** PWA background color */
  readonly backgroundColor: string;
  
  /** PWA start URL */
  readonly startUrl: string;
  
  /** PWA scope */
  readonly scope: string;
  
  /** PWA display mode */
  readonly display: 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser';
  
  /** PWA orientation */
  readonly orientation?: 'portrait' | 'landscape' | 'any';
}

/**
 * Default UI and theme configuration
 */
export interface UIConfig {
  /** Default theme mode */
  readonly defaultTheme: 'light' | 'dark' | 'system';
  
  /** Default color palette */
  readonly defaultPalette: string;
  
  /** Enable scaffolding (navigation, layout) */
  readonly enableScaffolding: boolean;
  
  /** Show theme switcher */
  readonly showThemeSwitcher: boolean;
  
  /** Show palette switcher */
  readonly showPaletteSwitcher: boolean;
}

/**
 * Copyright and legal information
 */
export interface CopyrightConfig {
  /** Copyright year ('auto' for current year or specific year) */
  readonly year: 'auto' | number;
  
  /** Copyright holder/owner */
  readonly author: string;
  
  /** Additional legal text */
  readonly text?: string;
}

/**
 * Configuration builder options
 */
export interface AppConfigOptions {
  /** Base directory for resolving relative paths */
  baseDir?: string;
  
  /** Environment (development, production, test) */
  env?: string;
  
  /** Skip file existence validation */
  skipValidation?: boolean;
}

/**
 * Validation result
 */
export interface ValidationResult {
  /** Validation warnings */
  warnings: string[];
  
  /** Validation errors */
  errors: string[];
  
  /** Whether configuration is valid */
  isValid: boolean;
}