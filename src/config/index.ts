/**
 * QwickApps Configuration Module
 * 
 * Exports configuration types and utilities for QwickApp applications.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

export { AppConfig } from './AppConfig';
export { AppConfigBuilder } from './AppConfigBuilder';
export type {
  AppConfig as IAppConfig,
  AppIdentity,
  BuildConfig,
  PWAConfig,
  UIConfig,
  CopyrightConfig,
  AppConfigOptions,
  ValidationResult,
} from './types';

// Re-export for convenience
import { AppConfigBuilder } from './AppConfigBuilder';
export const createAppConfig = AppConfigBuilder.create;