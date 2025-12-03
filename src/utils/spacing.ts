/**
 * Spacing utilities for QwickApps React Framework
 * 
 * Provides standardized spacing value resolution with t-shirt sizing
 * Based on Material-UI's 8px spacing system
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

export type SpacingValue = number | 'none' | 'tiny' | 'small' | 'medium' | 'large' | 'huge' | string | undefined;

export type SpacingContext = 'padding' | 'margin' | 'gap';

/**
 * T-shirt size mappings for spacing (based on MUI's 8px system)
 * Numbers represent multipliers for the base spacing unit
 */
const SPACING_SIZES: Record<string, number> = {
  none: 0,
  tiny: 0.5,   // 4px
  small: 1,    // 8px
  medium: 2,   // 16px
  large: 3,    // 24px
  huge: 4      // 32px
};

/**
 * CSS spacing value pattern for validation
 */
const CSS_SPACING_PATTERN = /^(\d+(\.\d+)?(px|em|rem|%)|0|auto|inherit|initial|unset)$/;

/**
 * Resolves a spacing value to MUI spacing units or CSS value
 */
export function resolveSpacing(
  value: SpacingValue
): number | string | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  // Number values are returned as-is (MUI spacing units)
  if (typeof value === 'number') {
    return value;
  }

  // Check for t-shirt sizes
  if (value in SPACING_SIZES) {
    return SPACING_SIZES[value];
  }

  // Validate CSS string values
  if (typeof value === 'string') {
    // Check if it's a space-separated value (for margin/padding shorthand)
    const parts = value.split(' ');
    if (parts.length > 1) {
      // Validate each part
      const validParts = parts.every(part => 
        CSS_SPACING_PATTERN.test(part) || part in SPACING_SIZES
      );
      if (validParts) {
        // Convert t-shirt sizes in the string
        return parts.map(part => {
          if (part in SPACING_SIZES) {
            return `${SPACING_SIZES[part] * 8}px`;
          }
          return part;
        }).join(' ');
      }
    }

    // Single value validation
    if (CSS_SPACING_PATTERN.test(value)) {
      return value;
    } else {
      console.warn(
        `[QwickApps] Invalid CSS spacing value: "${value}". Using as-is but consider using a valid CSS value or t-shirt size.`
      );
      return value;
    }
  }

  return undefined;
}

/**
 * Resolves spacing props with support for directional values
 */
export function resolveSpacingProps(props: {
  padding?: SpacingValue;
  paddingTop?: SpacingValue;
  paddingRight?: SpacingValue;
  paddingBottom?: SpacingValue;
  paddingLeft?: SpacingValue;
  paddingX?: SpacingValue;
  paddingY?: SpacingValue;
  margin?: SpacingValue;
  marginTop?: SpacingValue;
  marginRight?: SpacingValue;
  marginBottom?: SpacingValue;
  marginLeft?: SpacingValue;
  marginX?: SpacingValue;
  marginY?: SpacingValue;
}) {
  const resolved: Record<string, number | string | undefined> = {};

  // Padding
  if (props.padding !== undefined) {
    resolved.p = resolveSpacing(props.padding);
  }
  if (props.paddingTop !== undefined) {
    resolved.pt = resolveSpacing(props.paddingTop);
  }
  if (props.paddingRight !== undefined) {
    resolved.pr = resolveSpacing(props.paddingRight);
  }
  if (props.paddingBottom !== undefined) {
    resolved.pb = resolveSpacing(props.paddingBottom);
  }
  if (props.paddingLeft !== undefined) {
    resolved.pl = resolveSpacing(props.paddingLeft);
  }
  if (props.paddingX !== undefined) {
    resolved.px = resolveSpacing(props.paddingX);
  }
  if (props.paddingY !== undefined) {
    resolved.py = resolveSpacing(props.paddingY);
  }

  // Margin
  if (props.margin !== undefined) {
    resolved.m = resolveSpacing(props.margin);
  }
  if (props.marginTop !== undefined) {
    resolved.mt = resolveSpacing(props.marginTop);
  }
  if (props.marginRight !== undefined) {
    resolved.mr = resolveSpacing(props.marginRight);
  }
  if (props.marginBottom !== undefined) {
    resolved.mb = resolveSpacing(props.marginBottom);
  }
  if (props.marginLeft !== undefined) {
    resolved.ml = resolveSpacing(props.marginLeft);
  }
  if (props.marginX !== undefined) {
    resolved.mx = resolveSpacing(props.marginX);
  }
  if (props.marginY !== undefined) {
    resolved.my = resolveSpacing(props.marginY);
  }

  return resolved;
}