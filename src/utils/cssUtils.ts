/**
 * Utility functions for CSS value conversions.
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

/**
 * Converts a value to a CSS length string.
 * @param value The value to convert (number, string, etc.).
 * @param opts Options for controlling the conversion.
 * @returns The CSS length string (e.g., "10px", "100%", etc.).
 */
export function toCssLength(
  value: unknown,
  opts: {
    defaultUnit?: string;
    allowedUnits?: string[];
    allowKeywords?: boolean;
    fallback?: string;
  } = {}
): string {
  const {
    defaultUnit = 'px',
    allowedUnits = ['px','mm','cm','in','pt','pc'],
    allowKeywords = false,
    fallback = `0${defaultUnit}`
  } = opts;

  if (value == null) return fallback;

  if (typeof value === 'number' && isFinite(value)) {
    return `${value}${defaultUnit}`;
  }

  const s = String(value).trim();
  if (!s) return fallback;

  if (allowKeywords && /^(auto|inherit|initial|unset)$/.test(s)) return s;

  // Pure numeric string
  if (/^-?\d+(\.\d+)?$/.test(s)) return `${s}${defaultUnit}`;

  // Number + allowed unit
  const unitPattern = new RegExp(
    `^-?\\d+(?:\\.\\d+)?(${allowedUnits.map(u => u.replace(/[-/\\^$*+?.()|[\]{}]/g,'\\$&')).join('|')})$`
  );
  if (unitPattern.test(s)) return s;

  return fallback;
}