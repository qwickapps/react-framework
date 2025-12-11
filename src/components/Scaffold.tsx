/**
 * Scaffold - Complete application scaffolding system
 * 
 * Provides proper Material UI compliant layout scaffolding with:
 * - AppBar with responsive behavior
 * - Navigation rail/drawer with proper item limits
 * - Bottom navigation with 3-5 items
 * - Content area with proper spacing to avoid overlap
 * - Responsive breakpoints following Material Design
 * 
 * Material UI Navigation Guidelines:
 * - Bottom Navigation: 3-5 destinations (excess in drawer)
 * - Navigation Rail: 3-7 destinations (excess in drawer)
 * - Navigation Drawer: All items, organized by priority
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React, { useState, useEffect } from 'react';
import { useQwickApp } from '../contexts/QwickAppContext';
import Logo from './Logo';
import ThemeSwitcher from './buttons/ThemeSwitcher';
import PaletteSwitcher from './buttons/PaletteSwitcher';
import { RadioButtonUnchecked as DefaultIcon } from '@mui/icons-material';
import { getIconComponent } from './buttons/Button';
import './Scaffold.css';
import { useNavigation } from '../contexts/NavigationContext';
import { loggers } from '../utils/logger';
import type { MenuItem } from './menu/MenuItem';

const logger = loggers.scaffold;

export interface AppBarProps {
  /** Title to display in the app bar */
  title?: string;
  /** Actions to display on the right side */
  actions?: React.ReactNode;
  /** Whether to show the menu button (for drawer toggle) */
  showMenuButton?: boolean;
  /** Custom logo override */
  logo?: React.ReactNode;
  /** Logo position when in app bar */
  logoPosition?: 'left' | 'center';
}

export interface ScaffoldProps {
  /** Child components (page content) */
  children: React.ReactNode;
  /** Primary navigation items */
  navigationItems: MenuItem[];
  /** App bar configuration */
  appBar?: AppBarProps;
  /** Additional CSS class */
  className?: string;
  /** Whether to show app bar (default: true) */
  showAppBar?: boolean;
  /** Custom app bar height (default: 64px) */
  appBarHeight?: number;
  /** Application name for display purposes */
  appName?: string;
  /** Whether to show theme switcher in app bar (default: false) */
  showThemeSwitcher?: boolean;
  /** Whether to show palette switcher in app bar (default: false) */
  showPaletteSwitcher?: boolean;
  /** Callback when logo is clicked */
  onLogoClick?: () => void;
}

type ScreenSize = 'mobile' | 'tablet' | 'desktop';

// Material UI breakpoints
const BREAKPOINTS = {
  mobile: 600,    // < 600px
  tablet: 1024,   // 600px - 1024px  
  desktop: 1024,  // > 1024px
} as const;

const Scaffold: React.FC<ScaffoldProps> = ({
  children,
  navigationItems = [],
  appBar,
  className = '',
  showAppBar = true,
  appBarHeight = 64,
  appName: propAppName,
  showThemeSwitcher = false,
  showPaletteSwitcher = false,
  onLogoClick,
}) => {
  const [screenSize, setScreenSize] = useState<ScreenSize>('desktop');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isRailExpanded, setIsRailExpanded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Navigation (uses React Router if available, falls back to window.location)
  const { navigate, location } = useNavigation();
  const currentPath = isMounted ? location?.pathname : undefined;
  
  // Debug logging for navigation
  React.useEffect(() => {
    if (currentPath) {
      logger.debug('Current path changed to:', currentPath);
    }
  }, [currentPath]);

  // Set mounted state after hydration to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { appName: contextAppName, logo: contextLogo } = useQwickApp();
  const appName = propAppName || contextAppName;

  // Page context integration is simplified - only used for route detection if needed
  // Page-specific menu items and actions are now handled by header components

  // Determine current screen size using Material UI breakpoints
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < BREAKPOINTS.mobile) {
        setScreenSize('mobile');
      } else if (width <= BREAKPOINTS.tablet) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Page context now only contains route information
  // Page-specific actions and menu items are handled by header components

  // Sort items by priority
  const sortedItems = [...navigationItems].sort((a, b) => (a.priority || 999) - (b.priority || 999));
  
  // Material UI Guidelines: Split items based on screen size
  const getNavigationSplit = () => {
    switch (screenSize) {
      case 'mobile': {
        // Bottom Nav: 3-5 items, rest in drawer
        const bottomNavItems = sortedItems.slice(0, 5);
        const drawerItems = sortedItems.slice(5);
        return { primaryItems: bottomNavItems, drawerItems };
      }

      case 'tablet': {
        // Nav Rail: 3-7 items, rest in drawer
        const railItems = sortedItems.slice(0, 7);
        const railDrawerItems = sortedItems.slice(7);
        return { primaryItems: railItems, drawerItems: railDrawerItems };
      }

      case 'desktop': {
        // App Bar: 5-7 items, rest in drawer
        const appBarItems = sortedItems.slice(0, 7);
        const appBarDrawerItems = sortedItems.slice(7);
        return { primaryItems: appBarItems, drawerItems: appBarDrawerItems };
      }

      default:
        return { primaryItems: sortedItems, drawerItems: [] };
    }
  };

  const { primaryItems, drawerItems } = getNavigationSplit();

  // Enhanced app bar configuration with page integration
  const enhancedAppBar = React.useMemo(() => {
    const baseAppBar = appBar || {};

    return {
      ...baseAppBar,
      title: baseAppBar.title || appName,
      actions: baseAppBar.actions,
    };
  }, [appBar, appName]);

  // Get the logo to display
  const displayLogo = enhancedAppBar?.logo || contextLogo || <Logo name={enhancedAppBar?.title || appName} size="small" />;

  // Toggle drawer
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Toggle rail expansion (tablet only)
  const toggleRail = () => {
    setIsRailExpanded(!isRailExpanded);
  };

  // Render menu item with proper touch targets (48px minimum)
  const renderMenuItem = (item: MenuItem, variant: 'bottom' | 'rail' | 'appbar' | 'drawer' = 'appbar') => {
    // Determine if this item is active
    const isActiveItem = item.active ||
      (item.route && currentPath === item.route) ||
      (!item.active && !item.route && currentPath && currentPath === `/${item.id}`);
      
    // Debug logging for route matching
    if (item.route) {
      logger.debug(`Route matching for ${item.id}: ${currentPath} === ${item.route} = ${isActiveItem}`);
    }

    // Handle click - automatic navigation if no onClick provided
    const handleClick = () => {
      if (item.disabled) return;

      // Enhanced same-route detection
      const isSameRoute = isActiveItem && item.route === currentPath;
      
      if (isSameRoute) {
        logger.debug(`Navigation prevented: Already on route ${item.route}`);
        return;
      }

      if (item.onClick) {
        try {
          item.onClick();
        } catch (error) {
          logger.error('Menu item onClick error:', error);
        }
      } else if (item.route) {
        // Robust navigation with comprehensive error handling
        try {
          logger.debug(`Navigating from ${currentPath} to ${item.route}`);
          
          // Additional safety check to prevent same-route navigation
          if (currentPath && currentPath === item.route) {
            logger.debug('Final check: Same route detected, skipping navigation');
            return;
          }
          
          // Perform navigation with React Router v6
          navigate(item.route);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          logger.error('Navigation error caught:', error);
          logger.error('Navigation context:', {
            from: currentPath,
            to: item.route,
            isActiveItem,
            itemId: item.id,
            errorMessage
          });
          
          // Fallback: use window.location for critical navigation
          if (item.route && item.route !== currentPath) {
            try {
              logger.debug('Attempting fallback navigation using window.location');
              window.location.pathname = item.route;
            } catch (fallbackError) {
              logger.error('Fallback navigation also failed:', fallbackError);
            }
          }
        }
      }
    };

    // Transform icon string to component, or use provided ReactNode, or fallback to DefaultIcon
    const needsIcon = variant !== 'drawer';
    let displayIcon: React.ReactNode = null;

    if (item.icon) {
      // If icon is a string, transform it to component
      if (typeof item.icon === 'string') {
        displayIcon = getIconComponent(item.icon) || (needsIcon ? <DefaultIcon /> : null);
      } else {
        // If icon is already a React component, use it
        displayIcon = item.icon;
      }
    } else if (needsIcon) {
      // No icon provided, use default for primary navigation
      displayIcon = <DefaultIcon />;
    }

    const content = (
      <>
        {displayIcon && (
          <span className={`menu-item-icon menu-item-icon-${variant}`}>
            {displayIcon}
          </span>
        )}
        <span className={`menu-item-label menu-item-label-${variant}`}>
          {item.label}
        </span>
        {item.badge && (
          <span className="menu-item-badge">{item.badge}</span>
        )}
      </>
    );

    const commonProps = {
      className: `menu-item menu-item-${variant} ${isActiveItem ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`,
      'aria-label': item.label,
      'aria-current': isActiveItem ? 'page' as const : undefined,
      onClick: item.disabled ? undefined : handleClick,
    };

    // External links
    if (item.href && !item.disabled) {
      return (
        <a href={item.href} {...commonProps} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      );
    }

    // Internal navigation or custom click handlers
    return (
      <button
        type="button"
        {...commonProps}
        disabled={Boolean(item.disabled || (isActiveItem && item.route === currentPath))}
      >
        {content}
      </button>
    );
  };

  // Calculate layout spacing
  // Base padding varies by screen size, plus extra space for nav elements
  const getLayoutSpacing = () => {
    // Base padding: 16px mobile, 24px tablet, 32px desktop
    const basePadding = screenSize === 'mobile' ? 16 : screenSize === 'tablet' ? 24 : 32;

    // Add nav element heights/widths to the appropriate side
    const paddingTop = basePadding + (showAppBar ? appBarHeight : 0);
    const paddingBottom = basePadding + (screenSize === 'mobile' ? 80 : 0); // Bottom nav height
    const paddingLeft = basePadding + (screenSize === 'tablet' ? (isRailExpanded ? 280 : 80) : 0); // Rail width
    const paddingRight = basePadding;

    return { paddingTop, paddingBottom, paddingLeft, paddingRight };
  };

  const layoutSpacing = getLayoutSpacing();

  const AppLogo = () => {
    return <div
      className="appbar-logo"
      onClick={onLogoClick}
      style={{ cursor: onLogoClick ? 'pointer' : 'default' }}
    >
      {displayLogo}
    </div>
  };

  return (
    <div className={`app-scaffold ${className}`}>
      {/* App Bar */}
      {showAppBar && (
        <header
          className="app-scaffold-appbar"
          style={{ height: appBarHeight }}
        >
          <div className="appbar-content">
            {/* Left section */}
            <div className="appbar-left">
              {/* Menu button for drawer (when needed) */}
              {(drawerItems.length > 0 || screenSize === 'tablet') && (
                <button
                  key="menu-button"
                  type="button"
                  className="menu-button"
                  onClick={screenSize === 'tablet' ? toggleRail : toggleDrawer}
                  aria-label={screenSize === 'tablet' ? 'Toggle navigation rail' : 'Open drawer menu'}
                >
                  <span className="hamburger-icon">
                    <span key="hamburger-line-1"></span>
                    <span key="hamburger-line-2"></span>
                    <span key="hamburger-line-3"></span>
                  </span>
                </button>
              )}

              {/* Logo/Title */}
              {(!enhancedAppBar?.logoPosition || enhancedAppBar.logoPosition === 'left') && <AppLogo key="app-logo-left" />}
            </div>

            {/* Center section */}
            <div className="appbar-center">
              {enhancedAppBar?.logoPosition === 'center' && <AppLogo key="app-logo-center" />}

              {/* Desktop navigation items */}
              {screenSize === 'desktop' && (
                <nav key="desktop-navigation" className="appbar-navigation">
                  {primaryItems.map(item => (
                    <React.Fragment key={item.id}>
                      {renderMenuItem(item, 'appbar')}
                    </React.Fragment>
                  ))}
                </nav>
              )}
            </div>

            {/* Right section */}
            <div className="appbar-right">
              {enhancedAppBar?.actions && (
                <div key="appbar-actions" className="appbar-actions">
                  {enhancedAppBar.actions}
                </div>
              )}
              {/* Theme and Palette Switchers */}
              <div key="appbar-theme-controls" className="appbar-theme-controls">
                {showThemeSwitcher && <ThemeSwitcher key="theme-switcher" />}
                {showPaletteSwitcher && <PaletteSwitcher key="palette-switcher" />}
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Navigation Rail (Tablet) */}
      {screenSize === 'tablet' && (
        <nav className={`navigation-rail ${isRailExpanded ? 'expanded' : 'collapsed'}`}>
          <div className="rail-items">
            {primaryItems.map(item => (
              <React.Fragment key={item.id}>
                {renderMenuItem(item, 'rail')}
              </React.Fragment>
            ))}
          </div>
        </nav>
      )}

      {/* Bottom Navigation (Mobile) */}
      {screenSize === 'mobile' && primaryItems.length > 0 && (
        <nav className="bottom-navigation">
          <div className="bottom-nav-items">
            {primaryItems.map(item => (
              <React.Fragment key={item.id}>
                {renderMenuItem(item, 'bottom')}
              </React.Fragment>
            ))}
          </div>
        </nav>
      )}

      {/* Navigation Drawer (Overflow items) */}
      {isDrawerOpen && drawerItems.length > 0 && (
        <div className="drawer-overlay" onClick={toggleDrawer}>
          <nav className="navigation-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h3 key="drawer-title">Menu</h3>
              <button
                key="drawer-close-button"
                type="button"
                className="drawer-close"
                onClick={toggleDrawer}
                aria-label="Close drawer"
              >
                ×
              </button>
            </div>
            <div className="drawer-items">
              {/* Show all primary items in drawer for consistency */}
              <div className="drawer-section">
                <h4 key="navigation-header">Navigation</h4>
                {primaryItems.map(item => (
                  <React.Fragment key={item.id}>
                    {renderMenuItem(item, 'drawer')}
                  </React.Fragment>
                ))}
              </div>

              {/* Additional items */}
              {drawerItems.length > 0 && (
                <div className="drawer-section">
                  <h4 key="more-header">More</h4>
                  {drawerItems.map(item => (
                    <React.Fragment key={item.id}>
                      {renderMenuItem(item, 'drawer')}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main
        className="app-scaffold-content"
        style={{
          paddingTop: `${layoutSpacing.paddingTop}px`,
          paddingBottom: `${layoutSpacing.paddingBottom}px`,
          paddingLeft: `${layoutSpacing.paddingLeft}px`,
          paddingRight: `${layoutSpacing.paddingRight}px`,
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default Scaffold;