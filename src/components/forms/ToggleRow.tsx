'use client';

/**
 * ToggleRow - Palette-aware labeled toggle switch row component.
 *
 * Renders a labeled row with a toggle switch. Uses CSS theme variables
 * exclusively for all colors.
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';

export interface ToggleRowProps {
  label: string;
  subLabel?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function ToggleRow({
  label,
  subLabel,
  checked,
  onChange,
  disabled = false,
  className,
}: ToggleRowProps): React.ReactElement {
  const rowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44,
    borderBottom: '1px solid var(--theme-border-lighter)',
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'default',
  };

  const labelGroupStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 14,
    fontWeight: 500,
    color: 'var(--theme-text-primary)',
    lineHeight: 1.3,
  };

  const subLabelStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 400,
    color: 'var(--theme-text-secondary)',
    lineHeight: 1.3,
  };

  const trackStyle: React.CSSProperties = {
    width: 40,
    height: 22,
    borderRadius: 99,
    position: 'relative',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background 150ms',
    flexShrink: 0,
    background: checked
      ? 'var(--theme-primary)'
      : 'var(--palette-surface-variant, #263549)',
    border: checked
      ? '1px solid var(--theme-primary)'
      : '1px solid var(--theme-border)',
    boxShadow: checked
      ? '0 0 0 3px rgba(59,130,246,0.15)'
      : 'none',
  };

  const thumbStyle: React.CSSProperties = {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: '50%',
    background: 'white',
    top: 2,
    left: checked ? 20 : 2,
    transition: 'left 150ms',
    boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
  };

  function handleToggle(): void {
    if (!disabled) {
      onChange(!checked);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>): void {
    if (!disabled && (e.key === ' ' || e.key === 'Enter')) {
      e.preventDefault();
      onChange(!checked);
    }
  }

  return (
    <div style={rowStyle} className={className}>
      <div style={labelGroupStyle}>
        <span style={labelStyle}>{label}</span>
        {subLabel && <span style={subLabelStyle}>{subLabel}</span>}
      </div>
      <div
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        style={trackStyle}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
      >
        <div style={thumbStyle} />
      </div>
    </div>
  );
}

export default ToggleRow;
