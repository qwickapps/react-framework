/**
 * ResponsiveMenu - Adaptive navigation component
 * 
 * Automatically renders different navigation styles based on screen size:
 * - Mobile (< 768px): Bottom navigation bar
 * - Tablet (768px - 1024px): Expandable nav rail (sidebar)
 * - Desktop (> 1024px): Top navigation with drawer
 * 
 * Features:
 * - Theme-aware styling
 * - Customizable menu items with icons
 * - Automatic logo display using QwickApp context
 * - Keyboard navigation support
 * - ARIA accessibility
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React, { useState, useEffect } from 'react';
import { WithBaseProps, useBaseProps, QWICKAPP_COMPONENT } from '../hooks/useBaseProps';
import { useQwickApp } from '../contexts/QwickAppContext';
import Logo from './Logo';
import { getIconComponent } from './buttons/Button';
import './ResponsiveMenu.css';
import { useNavigation } from '../contexts/NavigationContext';
import { loggers } from '../utils/logger';
import type { MenuItem } from './menu/MenuItem';

const logger = loggers.menu;

export interface ResponsiveMenuProps extends WithBaseProps {
  /** Array of menu items to display */
  items: MenuItem[];
  /** Custom logo component override (uses QwickApp context by default) */
  logo?: React.ReactNode;
  /** Whether to show the logo (default: true) */
  showLogo?: boolean;
  /** Position of the logo in desktop mode ('left' | 'center' | 'right') */
  logoPosition?: 'left' | 'center' | 'right';
  /** Custom brand text (uses QwickApp appName by default) */
  brandText?: string;
  /** Callback when menu state changes (open/closed) */
  onMenuToggle?: (isOpen: boolean) => void;
}

type ScreenSize = 'mobile' | 'tablet' | 'desktop';

const ResponsiveMenu: React.FC<ResponsiveMenuProps> = (props) => {
  const { styleProps, htmlProps, restProps } = useBaseProps(props);
  const {
    items = [],
    logo,
    showLogo = true,
    logoPosition = 'left',
    brandText,
    onMenuToggle,
  } = restProps;
  
  // Mark as QwickApp component
  (ResponsiveMenu as Record<string, unknown>)[QWICKAPP_COMPONENT] = true;
  const [screenSize, setScreenSize] = useState<ScreenSize>('desktop');
  const [isNavRailExpanded, setIsNavRailExpanded] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { appName, logo: contextLogo } = useQwickApp();

  // Navigation (uses React Router if available, falls back to window.location)
  const { navigate, location } = useNavigation();
  const currentPath = location?.pathname;
  
  // Debug logging
  React.useEffect(() => {
    logger.debug('Navigate function available:', !!navigate);
    logger.debug('Current path:', currentPath);
  }, [navigate, currentPath]);

  // Determine current screen size
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize('mobile');
      } else if (width <= 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Handle nav rail expansion
  const toggleNavRail = () => {
    const newExpanded = !isNavRailExpanded;
    setIsNavRailExpanded(newExpanded);
    onMenuToggle?.(newExpanded);
  };

  // Handle drawer toggle
  const toggleDrawer = () => {
    const newOpen = !isDrawerOpen;
    setIsDrawerOpen(newOpen);
    onMenuToggle?.(newOpen);
  };

  // Get the logo to display
  const displayLogo = logo || contextLogo || <Logo name={brandText || appName} size="small" />;

  // Render menu item
  const renderMenuItem = (item: MenuItem, isCompact = false) => {
    // Determine if this item is active
    const isActiveItem = item.active || 
      (item.route && currentPath === item.route) ||
      (!item.active && !item.route && currentPath && currentPath === `/${item.id}`);
    
    // Handle click - automatic navigation if no onClick provided
    const handleClick = () => {
      logger.debug('handleClick:', {
        itemId: item.id,
        route: item.route,
        disabled: item.disabled,
        isActiveItem,
        currentPath,
        hasNavigate: !!navigate,
        hasOnClick: !!item.onClick
      });
      
      if (item.disabled) return;
      
      // Don't navigate if already on this route
      if (isActiveItem && item.route === currentPath) return;
      
      if (item.onClick) {
        item.onClick();
      } else if (item.route && navigate) {
        // Automatic navigation using React Router
        logger.debug('Navigating to:', item.route);
        navigate(item.route);
      } else {
        logger.warn('Cannot navigate: missing navigate function or route');
      }
    };

    // Transform icon string to component or use provided ReactNode
    let displayIcon: React.ReactNode = null;
    if (item.icon) {
      if (typeof item.icon === 'string') {
        displayIcon = getIconComponent(item.icon);
      } else {
        displayIcon = item.icon;
      }
    }

    const content = (
      <>
        {displayIcon && <span className="menu-item-icon">{displayIcon}</span>}
        {!isCompact && <span className="menu-item-label">{item.label}</span>}
        {item.badge && <span className="menu-item-badge">{item.badge}</span>}
      </>
    );

    const buttonProps = {
      className: `menu-item ${isActiveItem ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`,
      'aria-label': item.label,
      'aria-current': isActiveItem ? 'page' as const : undefined,
      onClick: item.disabled ? undefined : handleClick,
    };

    // External links
    if (item.href && !item.disabled) {
      return (
        <a href={item.href} {...buttonProps} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      );
    }

    // Internal navigation or custom click handlers
    logger.debug('Rendering menu button for:', item.id, {
      disabled: Boolean(item.disabled || (isActiveItem && item.route === currentPath)),
      hasOnClick: !!buttonProps.onClick,
      route: item.route
    });
    
    return (
      <button 
        type="button" 
        {...buttonProps} 
        disabled={Boolean(item.disabled || (isActiveItem && item.route === currentPath))}
        style={{ pointerEvents: 'auto', cursor: 'pointer' }}
        onMouseDown={() => logger.debug('Mouse down on:', item.id)}
      >
        {content}
      </button>
    );
  };

  // Mobile: Bottom Navigation
  if (screenSize === 'mobile') {
    return (
      <nav 
        {...htmlProps}
        {...styleProps}
        className={`responsive-menu mobile-bottom-nav ${styleProps.className || ''}`} 
        role="navigation"
      >
        <div className="mobile-nav-items">
          {items.map(item => <React.Fragment key={item.id}>{renderMenuItem(item, true)}</React.Fragment>)}
        </div>
      </nav>
    );
  }

  // Tablet: Nav Rail (Expandable Sidebar)
  if (screenSize === 'tablet') {
    return (
      <nav 
        {...htmlProps}
        {...styleProps}
        className={`responsive-menu tablet-nav-rail ${isNavRailExpanded ? 'expanded' : 'collapsed'} ${styleProps.className || ''}`} 
        role="navigation"
      >
        <div className="nav-rail-header">
          {showLogo && (
            <div className="nav-rail-logo">
              {displayLogo}
            </div>
          )}
          <button 
            type="button"
            className="nav-rail-toggle"
            onClick={toggleNavRail}
            aria-label={isNavRailExpanded ? 'Collapse navigation' : 'Expand navigation'}
            aria-expanded={isNavRailExpanded}
          >
            <span className="hamburger-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
        <div className="nav-rail-items">
          {items.map(item => <React.Fragment key={item.id}>{renderMenuItem(item, !isNavRailExpanded)}</React.Fragment>)}
        </div>
      </nav>
    );
  }

  // Desktop: Top Navigation with Drawer
  return (
    <>
      <nav 
        {...htmlProps}
        {...styleProps}
        className={`responsive-menu desktop-top-nav ${styleProps.className || ''}`} 
        role="navigation"
      >
        <div className="top-nav-content">
          {(logoPosition === 'left' || logoPosition === 'center') && showLogo && (
            <div className={`top-nav-logo logo-${logoPosition}`}>
              {displayLogo}
            </div>
          )}
          
          <div className="top-nav-items">
            {items.slice(0, 5).map(item => <React.Fragment key={item.id}>{renderMenuItem(item)}</React.Fragment>)}
            {items.length > 5 && (
              <button 
                type="button"
                className="menu-toggle"
                onClick={toggleDrawer}
                aria-label="Open menu drawer"
                aria-expanded={isDrawerOpen}
              >
                <span className="hamburger-icon">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>
            )}
          </div>

          {logoPosition === 'right' && showLogo && (
            <div className="top-nav-logo logo-right">
              {displayLogo}
            </div>
          )}
        </div>
      </nav>

      {/* Drawer for additional items */}
      {isDrawerOpen && (
        <div className="menu-drawer-overlay" onClick={toggleDrawer}>
          <div className="menu-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h3>Menu</h3>
              <button 
                type="button"
                className="drawer-close"
                onClick={toggleDrawer}
                aria-label="Close menu drawer"
              >
                ×
              </button>
            </div>
            <div className="drawer-items">
              {items.map(item => <React.Fragment key={item.id}>{renderMenuItem(item)}</React.Fragment>)}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResponsiveMenu;