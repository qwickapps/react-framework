'use client';

/**
 * SidebarLayout - Palette-aware full-page sidebar navigation layout.
 *
 * Provides a responsive shell with a collapsible sidebar, top bar, and
 * scrollable content area. Uses CSS theme/palette variables exclusively
 * for all colors.
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';

export interface SidebarNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number | string;
}

export interface SidebarLayoutProps {
  navItems: SidebarNavItem[];
  activeNav: string;
  onNavChange?: (id: string) => void;
  sidebarHeader?: React.ReactNode;
  sidebarFooter?: React.ReactNode;
  topBarLeft?: React.ReactNode;
  topBarRight?: React.ReactNode;
  children: React.ReactNode;
  /** Sidebar width in pixels. Default 240. */
  sidebarWidth?: number;
  className?: string;
}

export function SidebarLayout({
  navItems,
  activeNav,
  onNavChange,
  sidebarHeader,
  sidebarFooter,
  topBarLeft,
  topBarRight,
  children,
  sidebarWidth = 240,
  className,
}: SidebarLayoutProps): React.ReactElement {
  const rootStyle: React.CSSProperties = {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
    background: 'var(--theme-background)',
    fontFamily: 'var(--theme-font-family)',
  };

  const sidebarStyle: React.CSSProperties = {
    width: sidebarWidth,
    flexShrink: 0,
    background: 'var(--theme-surface)',
    borderRight: '1px solid var(--theme-border)',
    display: 'flex',
    flexDirection: 'column',
  };

  const navListStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    padding: '4px 12px',
    flex: 1,
    overflowY: 'auto',
  };

  const mainStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  };

  const topBarStyle: React.CSSProperties = {
    height: 64,
    background: 'var(--theme-background)',
    borderBottom: '1px solid var(--theme-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    flexShrink: 0,
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    position: 'relative',
  };

  return (
    <div style={rootStyle} className={className}>
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        {sidebarHeader && (
          <div style={{ flexShrink: 0 }}>{sidebarHeader}</div>
        )}

        <nav style={navListStyle} aria-label="Sidebar navigation">
          {navItems.map((item) => {
            const isActive = item.id === activeNav;
            const itemStyle: React.CSSProperties = {
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              height: 38,
              padding: '0 12px',
              borderRadius: 8,
              cursor: 'pointer',
              position: 'relative',
              background: isActive
                ? 'rgba(59,130,246,0.15)'
                : 'transparent',
              border: 'none',
              width: '100%',
              textAlign: 'left',
            };

            const labelStyle: React.CSSProperties = {
              fontSize: 14,
              fontWeight: isActive ? 600 : 500,
              color: isActive
                ? 'var(--theme-primary)'
                : 'var(--theme-text-secondary)',
              flex: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            };

            const indicatorStyle: React.CSSProperties = {
              position: 'absolute',
              left: 0,
              top: 8,
              bottom: 8,
              width: 3,
              background: 'var(--theme-primary)',
              borderRadius: '0 3px 3px 0',
              boxShadow: '0 0 8px var(--theme-primary)',
            };

            const badgeStyle: React.CSSProperties = {
              minWidth: 18,
              height: 18,
              borderRadius: 99,
              background: 'var(--theme-error)',
              padding: '0 5px',
              fontSize: 10,
              fontWeight: 700,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            };

            return (
              <button
                key={item.id}
                style={itemStyle}
                onClick={() => onNavChange?.(item.id)}
                aria-current={isActive ? 'page' : undefined}
              >
                {isActive && <div style={indicatorStyle} aria-hidden="true" />}
                <span
                  style={{
                    color: isActive
                      ? 'var(--theme-primary)'
                      : 'var(--theme-text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </span>
                <span style={labelStyle}>{item.label}</span>
                {item.badge !== undefined && (
                  <span style={badgeStyle}>{item.badge}</span>
                )}
              </button>
            );
          })}
        </nav>

        {sidebarFooter && (
          <div style={{ flexShrink: 0 }}>{sidebarFooter}</div>
        )}
      </aside>

      {/* Main area */}
      <div style={mainStyle}>
        {/* Top bar */}
        <header style={topBarStyle}>
          <div>{topBarLeft}</div>
          <div>{topBarRight}</div>
        </header>

        {/* Content */}
        <main style={contentStyle}>{children}</main>
      </div>
    </div>
  );
}

export default SidebarLayout;
