/**
 * Dimension utilities for QwickApps React Framework
 * 
 * Provides standardized dimension value resolution with t-shirt sizing
 * and MUI breakpoint compatibility
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import type { DimensionValue, TShirtSize, MUIBreakpoint } from '../types';

// Re-export the type for backward compatibility
export type { DimensionValue };
import { MUI_BREAKPOINT_VALUES } from './breakpoints';

export type DimensionContext = 'width' | 'height' | 'maxWidth' | 'maxHeight' | 'minWidth' | 'minHeight';

/**
 * T-shirt size mappings for different dimension contexts
 */
const TSHIRT_SIZES: Record<DimensionContext, Record<TShirtSize, number>> = {
  width: {
    tiny: 120,
    small: 200,
    medium: 300,
    large: 400,
    'x-large': 500,
    huge: 600,
  },
  height: {
    tiny: 200,
    small: 300,
    medium: 400,
    large: 500,
    'x-large': 600,
    huge: 800,
  },
  maxWidth: {
    tiny: 300,
    small: 600,
    medium: 900,
    large: 1200,
    'x-large': 1536,
    huge: 1920,
  },
  maxHeight: {
    tiny: 200,
    small: 400,
    medium: 600,
    large: 800,
    'x-large': 1000,
    huge: 1200,
  },
  minWidth: {
    tiny: 50,
    small: 100,
    medium: 200,
    large: 300,
    'x-large': 400,
    huge: 500,
  },
  minHeight: {
    tiny: 50,
    small: 100,
    medium: 200,
    large: 300,
    'x-large': 400,
    huge: 500,
  },
};

/**
 * CSS value pattern for validation
 */
const CSS_VALUE_PATTERN = /^(\d+(\.\d+)?(px|%|em|rem|vh|vw|fr|ch|ex)|auto|inherit|initial|unset|min-content|max-content|fit-content)$/;

/**
 * Resolves a dimension value to a valid CSS value
 */
export function resolveDimension(
  value: DimensionValue,
  context: DimensionContext = 'width'
): string | number | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  // Number values are returned as-is
  if (typeof value === 'number') {
    return value;
  }

  // Auto and grow are always valid
  if (value === 'auto') {
    return 'auto';
  }
  
  if (value === 'grow') {
    return '1';  // Flex grow: 1 for CSS flexbox
  }

  // Check for t-shirt sizes
  const tshirtSizes = TSHIRT_SIZES[context];
  if (tshirtSizes && value in tshirtSizes) {
    return tshirtSizes[value as TShirtSize];
  }
  
  // Check for MUI breakpoint values (for maxWidth/width contexts)
  if ((context === 'maxWidth' || context === 'width') && value in MUI_BREAKPOINT_VALUES) {
    return MUI_BREAKPOINT_VALUES[value as MUIBreakpoint];
  }

  // Validate CSS string values
  if (typeof value === 'string') {
    if (CSS_VALUE_PATTERN.test(value)) {
      return value;
    } else {
      console.warn(
        `[QwickApps] Invalid CSS dimension value: "${value}". Using as-is but consider using a valid CSS value or t-shirt size.`
      );
      return value;
    }
  }

  return undefined;
}

/**
 * Resolves multiple dimension props at once
 */
export function resolveDimensions(props: {
  width?: DimensionValue;
  height?: DimensionValue;
  minWidth?: DimensionValue;
  minHeight?: DimensionValue;
  maxWidth?: DimensionValue;
  maxHeight?: DimensionValue;
}) {
  return {
    width: resolveDimension(props.width, 'width'),
    height: resolveDimension(props.height, 'height'),
    minWidth: resolveDimension(props.minWidth, 'minWidth'),
    minHeight: resolveDimension(props.minHeight, 'minHeight'),
    maxWidth: resolveDimension(props.maxWidth, 'maxWidth'),
    maxHeight: resolveDimension(props.maxHeight, 'maxHeight'),
  };
}