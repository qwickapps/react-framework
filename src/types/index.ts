/**
 * Centralized Type Definitions for QwickApps React Framework
 * 
 * This file consolidates all common types used throughout the framework
 * to ensure consistency and eliminate duplication.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

/**
 * Standard t-shirt sizing system used across the framework
 */
export type TShirtSize = 'tiny' | 'small' | 'medium' | 'large' | 'x-large' | 'huge';

/**
 * MUI breakpoint values for responsive design
 */
export type MUIBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Extended MUI breakpoint names for better readability
 */
export type ExtendedBreakpoint = 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';

/**
 * Combined breakpoint type supporting all naming conventions
 */
export type BreakpointValue = MUIBreakpoint | ExtendedBreakpoint | false;

/**
 * Height presets commonly used in layout components
 */
export type HeightPreset = TShirtSize | 'viewport' | 'auto';

/**
 * Note: SpacingValue is defined in utils/spacing.ts to avoid circular dependencies
 */

/**
 * Dimension values supporting CSS units and t-shirt sizes
 */
export type DimensionValue = TShirtSize | MUIBreakpoint | number | 'auto' | 'grow' | string | undefined;

/**
 * Background variant types for themed components
 */
export type BackgroundVariant = 'default' | 'primary' | 'secondary' | 'surface' | 'paper';

/**
 * Text alignment options
 */
export type TextAlignment = 'left' | 'center' | 'right' | 'justify';

/**
 * Common spacing presets for layout components
 */
export type SpacingPreset = 'none' | 'compact' | 'comfortable' | 'spacious';

/**
 * Component size variants (different from dimension sizes)
 */
export type ComponentSize = 'small' | 'medium' | 'large';

/**
 * Elevation levels for Material-UI components
 */
export type ElevationLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 12 | 16 | 24;

/**
 * Common variant styles for components
 */
export type ComponentVariant = 'default' | 'elevated' | 'outlined' | 'filled' | 'text';

/**
 * Animation durations
 */
export type AnimationDuration = 'fast' | 'medium' | 'slow' | number;

/**
 * Grid span values for layout systems
 */
export type GridSpan = number | 'auto' | 'grow';

/**
 * Color intensity levels
 */
export type ColorIntensity = 'light' | 'main' | 'dark';

/**
 * Common loading states
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Export all content-related types
export * from './CacheProvider';
export * from './CollapsibleLayout';
export * from './ContentProxy';
export * from './DataTypes';
export * from './TemplateProvider';
export * from './TemplateResolver';
