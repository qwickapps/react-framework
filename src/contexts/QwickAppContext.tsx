/**
 * QwickApp Context - Application-level context for QwickApp configuration
 * 
 * Provides app-level state and configuration that can be accessed by components
 * within the QwickApp provider hierarchy.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import type { MenuItem } from '../components/menu';
import type { ScaffoldProps } from '../components/Scaffold';

export interface QwickAppProps {
  /** Application name displayed in header/title (optional when config is provided) */
  appName?: string;
  /** Custom logo component - overrides the default logo */
  logo?: React.ReactNode;
  /** App identifier used for storage keys */
  appId?: string | true | false;
  /** Application version string */
  appVersion?: string;
  /** Theme mode preference (light/dark/auto) */
  defaultTheme?: 'light' | 'dark' | 'system';
  /** Default palette to use */
  defaultPalette?: string;
  /** Enable scaffolding with navigation system (default: false) */
  enableScaffolding?: boolean;
  /** Primary navigation items for scaffolding */
  navigationItems?: MenuItem[];
  /** App bar configuration for scaffolding - use render function for actions to cross server/client boundaries safely */
  appBar?: ScaffoldProps['appBar'];
  /** Whether to show app bar when scaffolding is enabled (default: true) */
  showAppBar?: boolean;
  /** Custom app bar height when scaffolding is enabled */
  appBarHeight?: number;
  /** Whether to show theme switcher in app bar (default: false) */
  showThemeSwitcher?: boolean;
  /** Whether to show palette switcher in app bar (default: false) */
  showPaletteSwitcher?: boolean;
  /** Callback when logo is clicked */
  onLogoClick?: () => void;
}

export interface QwickAppContextValue {
  /** Application name */
  appName: string;
  /** Custom logo component */
  logo?: React.ReactNode;
  /** App identifier used for storage keys */
  appId?: string | true | false;
  /** Whether scaffolding is enabled */
  enableScaffolding: boolean;
  /** Navigation items for scaffolding */
  navigationItems: MenuItem[];
  /** App bar configuration */
  appBar?: ScaffoldProps['appBar'];
  /** Whether to show app bar */
  showAppBar: boolean;
  /** App bar height */
  appBarHeight: number;
  /** Whether to show theme switcher in app bar */
  showThemeSwitcher: boolean;
  /** Whether to show palette switcher in app bar */
  showPaletteSwitcher: boolean;
  /** Callback when logo is clicked */
  onLogoClick?: () => void;
  /** Update app configuration (excludes appName and appId for security) */
  updateConfig: (updates: Partial<Pick<QwickAppProps, 'logo' | 'enableScaffolding' | 'navigationItems' | 'appBar' | 'showAppBar' | 'appBarHeight' | 'showThemeSwitcher' | 'showPaletteSwitcher'>>) => void;
  // Navigation removed - now handled by AuthProvider when routing needed
}

const QwickAppContext = React.createContext<QwickAppContextValue>({
  appName: 'QwickApps',
  logo: undefined,
  appId: true,
  enableScaffolding: false,
  navigationItems: [],
  appBar: undefined,
  showAppBar: true,
  appBarHeight: 64,
  showThemeSwitcher: false,
  showPaletteSwitcher: false,
  updateConfig: () => {},
});

export { QwickAppContext };

export const useQwickApp = (): QwickAppContextValue => {
  const context = React.useContext(QwickAppContext);
  if (!context) {
    throw new Error('useQwickApp must be used within a QwickApp provider');
  }
  return context;
};