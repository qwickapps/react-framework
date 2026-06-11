/**
 * All component props and exports available in QwickApps React Framework.
 * 
 * Includes:
 * - Base classes and abstractions
 * - Buttons
 * - Form inputs
 * - Layout components
 * - Blocks (Hero, Content, FeatureGrid, Section, etc.)
 * - Pages and scaffolding
 * - Schema-driven component registration (Phase 0)
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

// Import registry to ensure all serializable components are registered
// This must happen when the framework is imported to enable serialization
import '../schemas/transformers/registry';
export * from './base';
export * from './blocks';
export * from './buttons';
export * from './dialogs';
export * from './forms';
export * from './input';
export * from './layout';
export * from './pages';
// Explicit plugin exports — do NOT use export * here.
// plugins/index.ts re-exports StatCard and StatCardProps as deprecated shims,
// which would collide with the authoritative StatCard/StatCardProps from blocks.
// The deprecated shims are accessible via the plugins sub-path only.
export { PluginStatCard } from './plugins';
export type { PluginStatCardProps } from './plugins';
export { DataTable } from './plugins';
export type { DataTableProps, Column } from './plugins';
export { default as Scaffold } from './Scaffold';
export type { ScaffoldProps, AppBarProps } from './Scaffold';
export type { MenuItem } from './menu/MenuItem';
export { default as ResponsiveMenu } from './ResponsiveMenu';
export type { ResponsiveMenuProps } from './ResponsiveMenu';
export * from './QwickApp';
export * from './AccessibilityChecker';
export * from './ErrorBoundary';
export * from './AccessibilityProvider';
export * from './Breadcrumbs';
// DataDrivenSafeSpan functionality is now integrated into SafeSpan

export { default as Logo } from './Logo';
export type { LogoProps } from './Logo';

export { default as ProductLogo } from './ProductLogo';
export type { ProductLogoProps } from './ProductLogo';

export { default as QwickAppsLogo } from './QwickAppsLogo';
export type { QwickAppsLogoProps } from './QwickAppsLogo';

export { default as QwickIcon } from './QwickIcon';
export type { QwickIconProps } from './QwickIcon';

export { default as SafeSpan } from './SafeSpan';
export type { SafeSpanProps } from './SafeSpan';

export { default as Html } from './Html';
export type { HtmlProps } from './Html';

export { default as Markdown } from './Markdown';
export type { MarkdownProps } from './Markdown';

// Shared utilities for serialization
export { createSerializableView } from './shared/createSerializableView';
export type { SerializableComponent } from './shared/createSerializableView';
export type { ViewProps } from './shared/viewProps';
