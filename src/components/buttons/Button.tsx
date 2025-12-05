/**
 * Button - Enhanced button component with comprehensive features
 * 
 * A QwickApps-enhanced version of Material-UI Button with:
 * - Standardized dimension and spacing props
 * - Grid behavior support for ColumnLayout
 * - Custom variants and styling
 * - Loading states with spinner
 * - Link support (href prop)
 * - Icon support
 * - Consistent theming and styling
 * - Data binding support for dynamic content
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps, CircularProgress } from '@mui/material';
import ButtonModel from '../../schemas/ButtonSchema';
import { createSerializableView, SerializableComponent } from '../shared/createSerializableView';
import { ViewProps } from '../shared/viewProps';
import type { SchemaProps } from '@qwickapps/schema/src/types/ModelProps';
import { getIconComponent } from '../../utils/iconMap';

/**
 * Re-export getIconComponent from iconMap for backwards compatibility
 * Other components (Scaffold, ResponsiveMenu, etc.) may import from this file
 */
export { getIconComponent, iconMap } from '../../utils/iconMap';

// Action serialization pattern for button clicks
export interface ButtonAction {
  type: 'navigate' | 'submit' | 'custom' | 'external';
  url?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  form?: string;
  customHandler?: string;
}

/**
 * Props interface for Button component
 * Uses SchemaProps<typeof ButtonSchema> for schema-driven typing
 * Icons are transformed from strings to React components by finalize function
 *
 * Note: We omit 'icon' and 'endIcon' from schema props because they are strings in the schema
 * but get transformed to ReactElements by the finalize function.
 */
export type ButtonProps = ViewProps & Omit<SchemaProps<typeof ButtonModel>, 'icon' | 'endIcon'> & {
  // Runtime props (transformed from schema strings by finalize function)
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  // Additional runtime-only props
  action?: ButtonAction;
  // HTML button attributes
  type?: 'button' | 'submit' | 'reset';
};

// View component - handles the actual rendering
const ButtonView = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    label,
    variant = 'primary',
    color,
    buttonSize = 'medium',
    icon,
    endIcon,
    href,
    target = '_self',
    onClick,
    action,
    disabled = false,
    loading = false,
    fullWidth = false,
    children,
    ...restProps
  } = props;

  // Map our variants to MUI variants
  const getMuiVariant = (): MuiButtonProps['variant'] => {
    switch (variant) {
      case 'primary':
        return 'contained';
      case 'secondary':
        return 'contained';
      case 'outlined':
        return 'outlined';
      case 'text':
        return 'text';
      case 'contained':
        return 'contained';
      default:
        return 'contained';
    }
  };

  // Get theme color name - prioritize explicit color prop over variant-derived color
  const getThemeColorName = (): string => {
    // If color prop is explicitly provided, use it
    if (color) {
      return color;
    }

    // Otherwise derive from variant
    switch (variant) {
      case 'primary':
        return 'primary';
      case 'secondary':
        return 'secondary';
      case 'outlined':
        return 'primary';
      case 'text':
        return 'primary';
      case 'contained':
        return 'primary';
      default:
        return 'primary';
    }
  };

  // Get CSS theme variable styles based on variant and color
  const getColorStyles = () => {
    const muiVariant = getMuiVariant();
    const colorName = getThemeColorName();

    // For contained buttons: use solid background
    if (muiVariant === 'contained') {
      return {
        backgroundColor: `var(--theme-${colorName})`,
        color: `var(--theme-on-${colorName})`,
        '&:hover': {
          backgroundColor: `var(--theme-${colorName}-dark)`,
        },
        '&.Mui-disabled': {
          backgroundColor: 'var(--theme-text-disabled)',
          color: 'var(--theme-on-surface)',
        }
      };
    }

    // For outlined buttons: border and text color
    if (muiVariant === 'outlined') {
      return {
        borderColor: `var(--theme-${colorName})`,
        color: `var(--theme-${colorName})`,
        '&:hover': {
          borderColor: `var(--theme-${colorName}-dark)`,
          backgroundColor: `var(--theme-${colorName}-light)`,
        },
        '&.Mui-disabled': {
          borderColor: 'var(--theme-border-main)',
          color: 'var(--theme-text-disabled)',
        }
      };
    }

    // For text buttons: just text color
    return {
      color: `var(--theme-${colorName})`,
      '&:hover': {
        backgroundColor: `var(--theme-${colorName}-light)`,
      },
      '&.Mui-disabled': {
        color: 'var(--theme-text-disabled)',
      }
    };
  };

  // Handle action serialization pattern for onClick
  const handleActionClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (action) {
      event.preventDefault();
      
      switch (action.type) {
        case 'navigate':
          if (action.url) {
            if (action.target === '_blank') {
              window.open(action.url, '_blank', 'noopener,noreferrer');
            } else {
              // Fallback to regular navigation
              window.location.href = action.url;
            }
          }
          break;
          
        case 'submit':
          if (action.form) {
            const form = document.getElementById(action.form);
            if (form instanceof HTMLFormElement) {
              form.requestSubmit();
            }
          }
          break;
          
        case 'external':
          if (action.url) {
            window.open(action.url, action.target || '_blank', 'noopener,noreferrer');
          }
          break;
          
        case 'custom':
          if (action.customHandler && typeof window !== 'undefined') {
            // Look for custom handler function on window
            const handler = (window as Record<string, unknown>)[action.customHandler];
            if (typeof handler === 'function') {
              handler(event);
            }
          }
          break;
      }
    }
    
    // Call original onClick if provided
    if (onClick) {
      onClick(event);
    }
  }, [action, onClick]);

  // Determine if this should be a link (prioritize href over action)
  const isLink = Boolean(href && !disabled && !loading);

  // Base button props
  const baseProps: Partial<MuiButtonProps> = {
    variant: getMuiVariant(),
    size: buttonSize,
    disabled: disabled || loading,
    fullWidth,
    ...restProps,
    sx: {
      // Apply CSS theme variable colors
      ...getColorStyles(),
      // Ensure consistent text transform
      textTransform: 'none',
      // Loading state adjustments
      ...(loading && {
        '& .MuiButton-startIcon': {
          marginRight: 1,
        },
      }),
      // Merge user-provided sx prop last to allow overrides
      ...(restProps.sx || {}),
    },
    startIcon: loading ? (
      <CircularProgress
        size={16}
        color="inherit"
        aria-label="Loading"
      />
    ) : icon,
    endIcon: loading ? undefined : endIcon,
  };

  // Link-specific props
  if (isLink) {
    const linkProps = {
      ...baseProps,
      component: 'a' as const,
      href,
      target,
      rel: target === '_blank' ? 'noopener noreferrer' : undefined,
      onClick: undefined, // Links don't use onClick
    };

    return (
      <MuiButton ref={ref} {...linkProps}>
        {label || children}
      </MuiButton>
    );
  }

  // Button-specific props with action handling
  const buttonProps = {
    ...baseProps,
    onClick: disabled || loading ? undefined : (action ? handleActionClick : onClick),
  };

  return (
    <MuiButton ref={ref} {...buttonProps}>
      {label || children}
    </MuiButton>
  );
});

ButtonView.displayName = 'ButtonView';

// Create the serializable Button component using the factory
export const Button: SerializableComponent<ButtonProps> = createSerializableView<ButtonProps>({
  tagName: 'Button',
  version: '1.0.0',
  role: 'view',
  View: ButtonView,
  // Button component uses default react-children strategy for potential child content
  finalize: (props: ButtonProps) => {
    // Transform icon string names to React icon components
    const transformedProps = { ...props };

    if (typeof (props as Record<string, unknown>).icon === 'string') {
      const iconComponent = getIconComponent((props as Record<string, unknown>).icon as string);
      // Always transform: use the component if found, otherwise clear the string to prevent text rendering
      transformedProps.icon = iconComponent || undefined;
    }

    if (typeof (props as Record<string, unknown>).endIcon === 'string') {
      const endIconComponent = getIconComponent((props as Record<string, unknown>).endIcon as string);
      // Always transform: use the component if found, otherwise clear the string to prevent text rendering
      transformedProps.endIcon = endIconComponent || undefined;
    }

    return transformedProps;
  }
});

// Register HTML patterns that Button component can handle
(Button as Record<string, unknown>).registerPatternHandlers = (registry: Record<string, (...args: unknown[]) => unknown>): void => {
  // Register button elements
  if (!registry.hasPattern('button')) {
    registry.registerPattern('button', transformButton);
  }
  
  // Register input type="button" elements
  if (!registry.hasPattern('input[type="button"]')) {
    registry.registerPattern('input[type="button"]', transformInputButton);
  }
  
  // Register input type="submit" elements
  if (!registry.hasPattern('input[type="submit"]')) {
    registry.registerPattern('input[type="submit"]', transformSubmitButton);
  }
};

// Transform button elements to Button component
function transformButton(element: Element): unknown {
  const variant = element.getAttribute('data-variant') || 
                 (element.className.includes('btn-primary') ? 'primary' : 
                  element.className.includes('btn-outlined') ? 'outlined' : 'secondary');
  const disabled = element.hasAttribute('disabled');
  const href = element.getAttribute('data-href');
  const target = element.getAttribute('data-target');

  return {
    tagName: 'Button',
    props: {
      label: element.textContent || 'Button',
      variant,
      disabled,
      href: href || undefined,
      target: target || undefined
    }
  };
}

// Transform input type="button" elements to Button component
function transformInputButton(element: Element): unknown {
  const disabled = element.hasAttribute('disabled');
  const value = element.getAttribute('value') || 'Button';

  return {
    tagName: 'Button',
    props: {
      label: value,
      variant: 'secondary',
      disabled
    }
  };
}

// Transform input type="submit" elements to Button component
function transformSubmitButton(element: Element): unknown {
  const disabled = element.hasAttribute('disabled');
  const value = element.getAttribute('value') || 'Submit';

  return {
    tagName: 'Button',
    props: {
      label: value,
      variant: 'primary',
      disabled,
      type: 'submit'
    }
  };
}

export default Button;