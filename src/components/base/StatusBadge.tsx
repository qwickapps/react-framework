'use client';

/**
 * StatusBadge - Palette-aware status indicator badge component.
 *
 * Uses CSS variables exclusively for theming. Supports two visual variants:
 * - overlay: dark glassmorphism background
 * - tinted: semi-transparent color background
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';

export interface StatusBadgeProps {
  /** CSS color or var() reference for dot, label, and tinted background */
  color: string;
  /** Text label displayed as-is */
  label: string;
  /** Animate the dot with the midnight-live-dot class */
  pulse?: boolean;
  /** sm=22px height (default), md=26px */
  size?: 'sm' | 'md';
  /** overlay=rgba(0,0,0,0.55)+blur background, tinted=color at 15% opacity */
  variant?: 'overlay' | 'tinted';
  className?: string;
}

/**
 * Returns a hex color with a two-digit hex alpha appended.
 * For non-hex colors the alpha suffix is still appended; callers should
 * pass a 6-digit hex string when using the tinted variant.
 */
function withAlphaSuffix(color: string, alphaSuffix: string): string {
  return `${color}${alphaSuffix}`;
}

export function StatusBadge({
  color,
  label,
  pulse = false,
  size = 'sm',
  variant = 'overlay',
  className,
}: StatusBadgeProps): React.ReactElement {
  const height = size === 'md' ? 26 : 22;
  const dotSize = size === 'md' ? 7 : 6;
  const fontSize = size === 'md' ? 11 : 10;

  const backgroundStyle: React.CSSProperties =
    variant === 'tinted'
      ? {
          background: withAlphaSuffix(color, '26'),
          border: `0.5px solid ${withAlphaSuffix(color, '4D')}`,
        }
      : {
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '0.5px solid rgba(255,255,255,0.08)',
        };

  const containerStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 5,
    height,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 99,
    ...backgroundStyle,
  };

  const dotStyle: React.CSSProperties = {
    width: dotSize,
    height: dotSize,
    borderRadius: 99,
    background: color,
    boxShadow: `0 0 6px ${color}`,
    flexShrink: 0,
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--theme-font-family)',
    fontSize,
    fontWeight: 700,
    letterSpacing: 0.6,
    color,
    lineHeight: 1,
  };

  return (
    <span style={containerStyle} className={className}>
      <span
        style={dotStyle}
        className={pulse ? 'midnight-live-dot' : undefined}
      />
      <span style={labelStyle}>{label}</span>
    </span>
  );
}

export default StatusBadge;
