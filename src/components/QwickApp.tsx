/**
 * QwickApp - Main application wrapper with routing support
 * 
 * This component eliminates the need to manually set up provider hierarchy.
 * Provides theme system, app context, optional scaffolding, and routing.
 * 
 * Example usage with config:
 * ```tsx
 * import { BrowserRouter } from 'react-router-dom';
 * import { QwickApp, AuthProvider, JsonDataProvider, AppConfigBuilder } from '@qwickapps/react-framework';
 * 
 * function App() {
 *   const config = AppConfigBuilder.create()
 *     .withName("My App")
 *     .withId("my.app")
 *     .build();
 *
 *   const dataSource = {
 *     dataProvider: new JsonDataProvider({ data: { company: [...] } }),
 *     cacheProvider: true, // Use default MemoryCacheProvider
 *     enableLogging: false
 *   };
 * 
 *   return (
 *     <QwickApp config={config} dataSource={dataSource}>
 *       <AuthProvider router={<BrowserRouter />} user={user}>
 *         <Route path="/" component={HomePage} />
 *         <Route path="/admin" component={AdminPage} requiresRole="admin" />
 *       </AuthProvider>
 *     </QwickApp>
 *   );
 * }
 * ```
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */
import React, { cloneElement, useState } from 'react';
import { DataProvider, ThemeProvider, PrintModeProvider, type ThemeMode } from '../contexts';
import { QwickAppContext, type QwickAppContextValue, type QwickAppProps } from '../contexts/QwickAppContext';
import { type TemplateResolverConfig } from '../types';
import { AppConfig } from '../config';
import './QwickApp.css';
import Scaffold from './Scaffold';
import { ErrorBoundary } from './ErrorBoundary';
import { AccessibilityProvider } from './AccessibilityProvider';
// Auth logic moved to AuthProvider - QwickApp now focuses on app infrastructure

// RouteConfig moved to AuthProvider for auth-specific routing

interface QwickAppComponentProps extends QwickAppProps {
  /** Child components to render when no routing is used */
  children?: React.ReactNode;
  /** CSS class name to apply to the root element */
  className?: string;
  /** Inline styles to apply to the root element */
  style?: React.CSSProperties;
  /** Additional content to show in footer */
  footerContent?: React.ReactNode;
  /** Theme mode preference (light/dark/auto) */
  defaultTheme?: ThemeMode;
  /** Optional router component to wrap the app (e.g., <BrowserRouter />, <HashRouter />) */
  router?: React.ReactElement;
  /** Data source configuration for content management and template resolution */
  dataSource?: TemplateResolverConfig;
  /** 
   * AppConfig instance - when provided, overrides individual props 
   * @example
   * const config = AppConfigBuilder.create().withName("My App").build();
   * <QwickApp config={config}>...</QwickApp>
   */
  config?: AppConfig;
  // Auth-related props moved to AuthProvider for better separation of concerns
}

export const QwickApp: React.FC<QwickAppComponentProps> = ({
  children,
  className,
  style,
  defaultTheme: defaultThemeProp,
  defaultPalette: defaultPaletteProp,
  appName: appNameProp,
  logo: logoProp,
  appId: appIdProp,
  enableScaffolding: enableScaffoldingProp,
  navigationItems: navigationItemsProp = [],
  appBar,
  showAppBar: showAppBarProp = true,
  appBarHeight: appBarHeightProp = 64,
  showThemeSwitcher: showThemeSwitcherProp,
  showPaletteSwitcher: showPaletteSwitcherProp,
  onLogoClick,
  router,
  dataSource,
  config,
}) => {
  // Resolve configuration: explicit props override config defaults
  const resolvedConfig = {
    appName: appNameProp ?? config?.app.name,
    appId: appIdProp ?? config?.app.id,
    logo: logoProp ?? config?.app.logo,
    enableScaffolding: enableScaffoldingProp ?? config?.ui.enableScaffolding ?? false,
    showThemeSwitcher: showThemeSwitcherProp ?? config?.ui.showThemeSwitcher ?? false,
    showPaletteSwitcher: showPaletteSwitcherProp ?? config?.ui.showPaletteSwitcher ?? false,
    defaultTheme: defaultThemeProp ?? config?.ui.defaultTheme,
    defaultPalette: defaultPaletteProp ?? config?.ui.defaultPalette,
  };

  // Ensure we have required configuration
  if (!resolvedConfig.appName) {
    throw new Error('QwickApp requires either appName prop or config with app.name');
  }

  // State for app configuration that can be updated via useQwickApp
  const [appConfig, setAppConfig] = useState({
    logo: resolvedConfig.logo,
    enableScaffolding: resolvedConfig.enableScaffolding,
    navigationItems: navigationItemsProp,
    appBar,
    showAppBar: showAppBarProp,
    appBarHeight: appBarHeightProp,
    showThemeSwitcher: resolvedConfig.showThemeSwitcher,
    showPaletteSwitcher: resolvedConfig.showPaletteSwitcher,
  });

  const updateConfig = (updates: Partial<Pick<QwickAppProps, 'logo' | 'enableScaffolding' | 'navigationItems' | 'appBar' | 'showAppBar' | 'appBarHeight' | 'showThemeSwitcher' | 'showPaletteSwitcher'>>) => {
    setAppConfig(prev => ({ ...prev, ...updates } as typeof prev));
  };

  const contextValue: QwickAppContextValue = {
    appName: resolvedConfig.appName!, // Safe to use ! since we validated above
    appId: resolvedConfig.appId,
    ...appConfig,
    onLogoClick,
    updateConfig,
    // Navigation removed - now handled by AuthProvider when routing needed
  };

  const content = appConfig.enableScaffolding ? (
    <Scaffold
      appName={resolvedConfig.appName!} // Safe to use ! since we validated above
      navigationItems={appConfig.navigationItems}
      appBar={appConfig.appBar}
      showAppBar={appConfig.showAppBar}
      appBarHeight={appConfig.appBarHeight}
      showThemeSwitcher={appConfig.showThemeSwitcher}
      showPaletteSwitcher={appConfig.showPaletteSwitcher}
      onLogoClick={onLogoClick}
    >
      {children}
    </Scaffold>
  ) : children;

  // Wrap with DataProvider if dataSource is provided (FIRST wrapper)
  const wrappedContent = dataSource ? (
    <DataProvider dataSource={dataSource}>
      {content}
    </DataProvider>
  ) : content;

  const appContent = (
    <ErrorBoundary>
      <AccessibilityProvider>
        <div className={`qwick-app ${className || ''}`} style={style}>
          <ThemeProvider 
            appId={resolvedConfig.appId} 
            defaultTheme={resolvedConfig.defaultTheme} 
            defaultPalette={resolvedConfig.defaultPalette}
          >
            <QwickAppContext.Provider value={contextValue}>
              <PrintModeProvider>
                {wrappedContent}
              </PrintModeProvider>
            </QwickAppContext.Provider>
          </ThemeProvider>
        </div>
      </AccessibilityProvider>
    </ErrorBoundary>
  );

  // If router is provided, wrap the entire app with it
  if (router) {
    return cloneElement(router, {}, appContent);
  }

  return appContent;
};

export const useQwickApp = (): QwickAppContextValue => {
  const context = React.useContext(QwickAppContext);
  if (!context) {
    throw new Error('useQwickApp must be used within a QwickApp provider');
  }
  return context;
};

export default QwickApp;