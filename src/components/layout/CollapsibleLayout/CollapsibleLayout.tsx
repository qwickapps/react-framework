/**
 * CollapsibleLayout Component - Advanced expandable/collapsible container
 * 
 * Features:
 * - Controlled and uncontrolled state management
 * - Multiple animation styles (fade, slide, scale)
 * - Customizable trigger areas (button, header, both)
 * - localStorage persistence
 * - Full accessibility support
 * - Material-UI integration with themes
 * - Multiple visual variants
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React, { useCallback, useEffect, useId, useMemo, useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Collapse,
  Divider,
  Paper,
  Stack,
  useTheme,
  SxProps,
  Theme,
} from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
const ExpandMoreIcon = ExpandMore;
const ExpandLessIcon = ExpandLess;
import { QWICKAPP_COMPONENT, useBaseProps, useDataBinding } from '../../../hooks';
import CollapsibleLayoutModel from '../../../schemas/CollapsibleLayoutSchema';
import {
  CollapsibleLayoutViewProps,
  CollapsibleLayoutProps,
  UseCollapsibleLayoutState,
  spacingConfigs,
  animationConfigs,
  defaultCollapsibleLayoutProps,
} from '../../../types/CollapsibleLayout';
import Html from '../../Html';

/**
 * Custom hook for managing collapsible state - simplified approach
 */
function useCollapsibleState(
  controlled: boolean,
  collapsedProp?: boolean,
  defaultCollapsedProp?: boolean,
  onToggleProp?: (collapsed: boolean) => void,
  persistState?: boolean,
  storageKey?: string
): UseCollapsibleLayoutState {
  const id = useId();
  const finalStorageKey = storageKey || `collapsible-${id}`;

  // For controlled components, use the prop; for uncontrolled, use internal state
  const [internalCollapsed, setInternalCollapsed] = useState<boolean>(() => {
    if (controlled) {
      return collapsedProp ?? false;
    }
    
    // Try localStorage first if persistence is enabled
    if (persistState && typeof window !== 'undefined') {
      const stored = localStorage.getItem(finalStorageKey);
      if (stored !== null) {
        return JSON.parse(stored);
      }
    }
    
    return defaultCollapsedProp ?? false;
  });

  // Sync with controlled prop changes
  useEffect(() => {
    if (controlled && collapsedProp !== undefined) {
      setInternalCollapsed(collapsedProp);
    }
  }, [controlled, collapsedProp]);

  // Persist to localStorage for uncontrolled components
  useEffect(() => {
    if (!controlled && persistState && typeof window !== 'undefined') {
      localStorage.setItem(finalStorageKey, JSON.stringify(internalCollapsed));
    }
  }, [controlled, internalCollapsed, persistState, finalStorageKey]);

  const toggle = useCallback(() => {
    const currentState = controlled ? (collapsedProp ?? false) : internalCollapsed;
    const newCollapsed = !currentState;
    
    // Always update internal state for visual updates
    setInternalCollapsed(newCollapsed);
    
    // Call callback to notify parent
    onToggleProp?.(newCollapsed);
  }, [controlled, collapsedProp, internalCollapsed, onToggleProp]);

  const setCollapsed = useCallback((collapsed: boolean) => {
    setInternalCollapsed(collapsed);
    onToggleProp?.(collapsed);
  }, [onToggleProp]);

  // Return the appropriate state
  const finalCollapsed = controlled ? (collapsedProp ?? false) : internalCollapsed;
  
  return {
    collapsed: finalCollapsed,
    toggle,
    setCollapsed,
    isControlled: controlled,
  };
}

/**
 * Core CollapsibleLayout View component
 */
function CollapsibleLayoutView({
  // State props
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onToggle,
  
  // Content props  
  title,
  subtitle,
  leadIcon,
  headerActions,
  collapsedView,
  children,
  footerView,
  
  // Behavior props
  triggerArea = 'both',
  animationStyle = 'slide',
  persistState = false,
  storageKey,
  animationDuration = 300,
  disableAnimations = false,
  
  // Icons
  collapsedIcon,
  expandedIcon,
  
  // Layout props
  showDivider = true,
  variant = 'default',
  headerSpacing = 'comfortable', 
  contentSpacing = 'comfortable',
  
  // Accessibility
  toggleAriaLabel = 'Toggle content visibility',
  'aria-describedby': ariaDescribedBy,
  contentAriaProps = {},
  
  // CSS classes
  containerClassName,
  headerClassName,
  contentClassName,
  footerClassName,
  
  ...restProps
}: CollapsibleLayoutViewProps) {
  const theme = useTheme();
  const { styleProps, htmlProps, restProps: otherProps } = useBaseProps(restProps);
  
  // Mark as QwickApp component
  Object.assign(CollapsibleLayoutView, { [QWICKAPP_COMPONENT]: true });

  // Determine controlled vs uncontrolled usage
  const controlled = collapsedProp !== undefined;
  
  // State management
  const { collapsed, toggle } = useCollapsibleState(
    controlled,
    collapsedProp,
    defaultCollapsed,
    onToggle,
    persistState,
    storageKey
  );

  // Get spacing configurations
  const headerSpacingConfig = spacingConfigs[headerSpacing];
  const contentSpacingConfig = spacingConfigs[contentSpacing];
  
  // Get animation configuration
  const animationConfig = animationConfigs[animationStyle];

  // Generate unique IDs for accessibility
  const headerId = useId();
  const contentId = useId();

  // Handle click events
  const handleHeaderClick = useCallback((event: React.MouseEvent) => {
      if (triggerArea === 'header' || triggerArea === 'both') {
      event.preventDefault();
      toggle();
    }
  }, [triggerArea, toggle]);

  const handleButtonClick = useCallback((event: React.MouseEvent) => {
      event.stopPropagation();
    toggle();
  }, [toggle]);

  // Render icons
  const renderIcon = useCallback((icon: React.ReactNode | string | undefined, defaultIcon: React.ReactNode) => {
    if (React.isValidElement(icon)) {
      return icon;
    }
    if (typeof icon === 'string') {
      return <Html>{icon}</Html>;
    }
    return defaultIcon;
  }, []);

  const toggleIcon = renderIcon(
    collapsed ? collapsedIcon : expandedIcon,
    collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />
  );

  // Container styles based on variant
  const containerSx: SxProps<Theme> = useMemo(() => {
    const baseSx: SxProps<Theme> = {
      width: '100%',
      position: 'relative',
      ...styleProps.sx,
    };

    switch (variant) {
      case 'outlined':
        return {
          ...baseSx,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
          backgroundColor: 'var(--theme-surface)',
        };
      case 'elevated':
        return {
          ...baseSx,
          boxShadow: theme.shadows[2],
          borderRadius: 1,
          backgroundColor: theme.palette.background.paper,
        };
      case 'filled':
        return {
          ...baseSx,
          backgroundColor: 'var(--theme-surface-variant)',
          borderRadius: 1,
        };
      default:
        return baseSx;
    }
  }, [variant, theme, styleProps.sx]);

  // Header styles
  const headerSx: SxProps<Theme> = useMemo(() => ({
    ...headerSpacingConfig,
    cursor: (triggerArea === 'header' || triggerArea === 'both') ? 'pointer' : 'default',
    userSelect: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&:hover': (triggerArea === 'header' || triggerArea === 'both') ? {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    } : {},
  }), [headerSpacingConfig, triggerArea]);

  // Content styles
  const contentSx: SxProps<Theme> = useMemo(() => ({
    ...contentSpacingConfig,
  }), [contentSpacingConfig]);

  // Animation props for Collapse component
  const collapseProps = useMemo(() => {
    if (disableAnimations) {
      return { timeout: 0 };
    }

    const baseProps = {
      timeout: animationDuration,
    };

    switch (animationStyle) {
      case 'fade':
        return {
          ...baseProps,
          sx: {
            '& .MuiCollapse-wrapper': {
              opacity: collapsed ? 0 : 1,
              transition: `opacity ${animationDuration}ms ${animationConfig.easing}`,
            },
          },
        };
      case 'scale':
        return {
          ...baseProps,
          sx: {
            '& .MuiCollapse-wrapper': {
              transform: collapsed ? 'scale(0.95)' : 'scale(1)',
              opacity: collapsed ? 0 : 1,
              transition: `all ${animationDuration}ms ${animationConfig.easing}`,
            },
          },
        };
      default: // slide
        return baseProps;
    }
  }, [disableAnimations, animationDuration, animationStyle, animationConfig, collapsed]);

  // Render content based on type
  const renderContent = useCallback((content: React.ReactNode | string | undefined) => {
    if (!content) return null;
    
    if (typeof content === 'string') {
      return <Html>{content}</Html>;
    }
    
    return content;
  }, []);

  // Container content that will be wrapped
  const containerContent = (
    <>
      {/* Header Section */}
      {(title || subtitle || leadIcon || headerActions || (triggerArea === 'button' || triggerArea === 'both')) && (
        <>
          <Box
            id={headerId}
            className={headerClassName}
            sx={headerSx}
            onClick={handleHeaderClick}
            role={triggerArea === 'header' || triggerArea === 'both' ? 'button' : undefined}
            tabIndex={triggerArea === 'header' || triggerArea === 'both' ? 0 : undefined}
            aria-expanded={!collapsed}
            aria-controls={contentId}
            aria-describedby={ariaDescribedBy}
            onKeyDown={(e) => {
              if ((triggerArea === 'header' || triggerArea === 'both') && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                toggle();
              }
            }}
          >
            {/* Left section: Lead icon, title, subtitle */}
            <Stack direction="row" spacing={2} alignItems="center" sx={{ minWidth: 0, flex: 1 }}>
              {leadIcon && (
                <Box sx={{ flexShrink: 0 }}>
                  {renderContent(leadIcon)}
                </Box>
              )}
              
              {(title || subtitle) && (
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  {title && (
                    <Typography 
                      variant="h6" 
                      component="h3"
                      sx={{ 
                        fontWeight: 600,
                        lineHeight: 1.2,
                        ...(subtitle && { mb: 0.5 })
                      }}
                    >
                      {title}
                    </Typography>
                  )}
                  {subtitle && (
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ lineHeight: 1.3 }}
                    >
                      {subtitle}
                    </Typography>
                  )}
                </Box>
              )}
            </Stack>

            {/* Right section: Header actions and toggle button */}
            <Stack direction="row" spacing={1} alignItems="center" sx={{ flexShrink: 0 }}>
              {headerActions && (
                <Box>
                  {renderContent(headerActions)}
                </Box>
              )}
              
              <IconButton
                onClick={handleButtonClick}
                size="small"
                aria-label={toggleAriaLabel}
                aria-expanded={!collapsed}
                aria-controls={contentId}
              >
                {toggleIcon}
              </IconButton>
            </Stack>
          </Box>
          
          {showDivider && <Divider />}
        </>
      )}

      {/* Collapsed View (shown when collapsed) */}
      {collapsed && collapsedView && (
        <>
          <Box 
            className={contentClassName}
            sx={contentSx}
          >
            {renderContent(collapsedView)}
          </Box>
          {showDivider && footerView && <Divider />}
        </>
      )}

      {/* Expanded Content (shown when not collapsed) */}
      <Collapse 
        in={!collapsed}
        {...collapseProps}
      >
        <Box
          id={contentId}
          className={contentClassName}
          sx={contentSx}
          role="region"
          aria-labelledby={title ? headerId : undefined}
          {...contentAriaProps}
        >
          {renderContent(children)}
        </Box>
        {showDivider && footerView && <Divider />}
      </Collapse>

      {/* Footer Section (always visible) */}
      {footerView && (
        <Box 
          className={footerClassName}
          sx={contentSx}
        >
          {renderContent(footerView)}
        </Box>
      )}
    </>
  );

  // Return appropriate container based on variant
  if (variant === 'outlined') {
    return (
      <Paper
        variant="outlined"
        elevation={0}
        {...htmlProps}
        {...otherProps}
        className={containerClassName}
        sx={containerSx}
      >
        {containerContent}
      </Paper>
    );
  }

  if (variant === 'elevated') {
    return (
      <Paper
        elevation={2}
        {...htmlProps}
        {...otherProps}
        className={containerClassName}
        sx={containerSx}
      >
        {containerContent}
      </Paper>
    );
  }

  // Default variant (default, filled)
  return (
    <Box
      {...htmlProps}
      {...otherProps}
      className={containerClassName}
      sx={containerSx}
    >
      {containerContent}
    </Box>
  );
}

/**
 * Main CollapsibleLayout component with data binding support
 */
function CollapsibleLayout(props: CollapsibleLayoutProps) {
  const { dataSource, bindingOptions, ...restProps } = props;

  // Always call hooks unconditionally
  const bindingResult = useDataBinding<CollapsibleLayoutModel>(
    dataSource || '',
    restProps as Partial<CollapsibleLayoutModel>
  );

  // If no dataSource, use traditional props
  if (!dataSource) {
    return <CollapsibleLayoutView {...restProps} />;
  }

  // Use data binding result
  const { loading, error, ...collapsibleProps } = bindingResult;

  // Show loading state
  if (loading) {
    return (
      <CollapsibleLayoutView
        {...restProps}
        title="Loading..."
        variant="default"
        headerSpacing="comfortable"
        contentSpacing="comfortable"
      />
    );
  }

  if (error) {
    console.error('Error loading collapsible layout:', error);
    if (process.env.NODE_ENV !== 'production') {
      return (
        <CollapsibleLayoutView
          {...restProps}
          title="Error Loading Layout"
          subtitle={error.message}
          variant="outlined"
          headerSpacing="comfortable"
          contentSpacing="comfortable"
        />
      );
    }
    return null;
  }

  return <CollapsibleLayoutView {...collapsibleProps} />;
}

// Set default props
CollapsibleLayout.defaultProps = defaultCollapsibleLayoutProps;

export default CollapsibleLayout;
export { CollapsibleLayout, CollapsibleLayoutView, useCollapsibleState };
export type { CollapsibleLayoutProps, CollapsibleLayoutViewProps, UseCollapsibleLayoutState };