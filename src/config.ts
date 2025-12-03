/**
 * QwickApps Configuration Module Entry
 * 
 * Lightweight export for config-only usage at build time.
 * This file only exports configuration types and builders
 * without pulling in React or MUI dependencies.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

export { AppConfig } from './config/AppConfig';
export { AppConfigBuilder } from './config/AppConfigBuilder';
export type {
  AppConfig as IAppConfig,
  AppIdentity,
  BuildConfig,
  PWAConfig,
  UIConfig,
  AppConfigOptions,
  ValidationResult,
} from './config/types';

// Re-export for convenience
import { AppConfigBuilder } from './config/AppConfigBuilder';
export const createAppConfig = AppConfigBuilder.create;