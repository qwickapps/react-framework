'use client';

/**
 * MobileTabBar - Palette-aware mobile bottom navigation tab bar.
 *
 * Renders a fixed-bottom tab bar with icon+label tabs, active indicator,
 * and optional badge. Uses CSS theme/palette variables exclusively for colors.
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';

export interface MobileTabItem {
  id: string;
  label: string;
  /** Render function receiving size, color, and filled state */
  icon: (props: { size: number; color: string; filled: boolean }) => React.ReactNode;
  badge?: number | string;
}

export interface MobileTabBarProps {
  items: MobileTabItem[];
  activeId: string;
  onTabChange?: (id: string) => void;
  /** Extra bottom padding for safe area. Default 28. */
  safeAreaBottom?: number;
  className?: string;
}

export function MobileTabBar({
  items,
  activeId,
  onTabChange,
  safeAreaBottom = 28,
  className,
}: MobileTabBarProps): React.ReactElement {
  const barStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'var(--palette-background-dark, #131E33)',
    borderTop: '1px solid var(--theme-border)',
    display: 'flex',
    zIndex: 40,
    paddingTop: 10,
    paddingBottom: safeAreaBottom,
    paddingLeft: 8,
    paddingRight: 8,
  };

  return (
    <nav style={barStyle} className={className} aria-label="Tab navigation">
      {items.map((item) => {
        const isActive = item.id === activeId;
        const iconColor = isActive
          ? 'var(--theme-primary)'
          : 'var(--theme-text-disabled, #4a5568)';

        const itemStyle: React.CSSProperties = {
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
          padding: '6px 0 0',
          position: 'relative',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        };

        const labelStyle: React.CSSProperties = {
          fontSize: 11,
          fontWeight: isActive ? 600 : 500,
          color: iconColor,
          whiteSpace: 'nowrap',
          fontFamily: 'var(--theme-font-family)',
        };

        const indicatorStyle: React.CSSProperties = {
          position: 'absolute',
          bottom: -6,
          width: 24,
          height: 3,
          borderRadius: 99,
          background: 'var(--theme-primary)',
          boxShadow: '0 0 8px var(--theme-primary)',
        };

        const badgeStyle: React.CSSProperties = {
          position: 'absolute',
          top: -3,
          right: 'calc(50% - 18px)',
          minWidth: 16,
          height: 16,
          borderRadius: 99,
          background: 'var(--palette-error-main)',
          border: '2px solid var(--palette-background-dark, #131E33)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 3px',
          fontFamily: 'var(--theme-font-family)',
          fontSize: 9,
          fontWeight: 700,
          color: 'white',
          zIndex: 1,
        };

        return (
          <button
            key={item.id}
            style={itemStyle}
            onClick={() => onTabChange?.(item.id)}
            aria-current={isActive ? 'page' : undefined}
            aria-label={item.label}
          >
            {item.badge !== undefined && (
              <span style={badgeStyle}>{item.badge}</span>
            )}
            <span aria-hidden="true">
              {item.icon({ size: 22, color: iconColor, filled: isActive })}
            </span>
            <span style={labelStyle}>{item.label}</span>
            {isActive && <div style={indicatorStyle} aria-hidden="true" />}
          </button>
        );
      })}
    </nav>
  );
}

export default MobileTabBar;
