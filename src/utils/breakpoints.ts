/**
 * Breakpoint utilities for QwickApps React Framework
 * 
 * Consolidates all breakpoint-related logic and type conversions
 * to ensure consistency across components.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import type { MUIBreakpoint, BreakpointValue, ExtendedBreakpoint } from '../types';

/**
 * Standard MUI breakpoint pixel values
 */
export const MUI_BREAKPOINT_VALUES: Record<MUIBreakpoint, number> = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

/**
 * Mapping from extended names to MUI breakpoint names
 */
const EXTENDED_TO_MUI_MAP: Record<ExtendedBreakpoint, MUIBreakpoint> = {
  'extra-small': 'xs',
  'small': 'sm',
  'medium': 'md',
  'large': 'lg',
  'extra-large': 'xl',
};

/**
 * Converts any breakpoint value to MUI breakpoint format
 * Handles extended names, MUI names, and false values
 */
export function mapToMUIBreakpoint(value?: BreakpointValue): MUIBreakpoint | false {
  if (value === false || value === undefined) {
    return false;
  }
  
  // Direct MUI breakpoint
  if (value in MUI_BREAKPOINT_VALUES) {
    return value as MUIBreakpoint;
  }
  
  // Extended breakpoint name
  if (value in EXTENDED_TO_MUI_MAP) {
    return EXTENDED_TO_MUI_MAP[value as ExtendedBreakpoint];
  }
  
  // Default fallback
  return 'lg';
}

/**
 * Gets the pixel value for a breakpoint
 */
export function getBreakpointPixelValue(breakpoint: MUIBreakpoint | BreakpointValue): number {
  const muiBreakpoint = mapToMUIBreakpoint(breakpoint as BreakpointValue);
  if (muiBreakpoint === false) {
    return Infinity; // No max width
  }
  return MUI_BREAKPOINT_VALUES[muiBreakpoint];
}

/**
 * Type guard to check if a value is a valid MUI breakpoint
 */
export function isMUIBreakpoint(value: unknown): value is MUIBreakpoint {
  return typeof value === 'string' && value in MUI_BREAKPOINT_VALUES;
}

/**
 * Type guard to check if a value is an extended breakpoint name
 */
export function isExtendedBreakpoint(value: unknown): value is ExtendedBreakpoint {
  return typeof value === 'string' && value in EXTENDED_TO_MUI_MAP;
}

/**
 * Type guard to check if a value is any valid breakpoint
 */
export function isBreakpointValue(value: unknown): value is BreakpointValue {
  return value === false || isMUIBreakpoint(value) || isExtendedBreakpoint(value);
}