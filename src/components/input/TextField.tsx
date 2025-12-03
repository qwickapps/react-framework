/**
 * TextField - Enhanced text input component with base props support
 * 
 * A QwickApps-enhanced version of Material-UI TextField with:
 * - Standardized dimension and spacing props
 * - Grid behavior support for ColumnLayout
 * - Consistent theming and styling
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';
import { useBaseProps, WithBaseProps, QWICKAPP_COMPONENT } from '../../hooks/useBaseProps';

export interface TextFieldProps extends WithBaseProps<Omit<MuiTextFieldProps, 'sx' | 'className' | 'style'>> {
  // Additional QwickApps-specific props can be added here
}

export const TextField = React.forwardRef<HTMLDivElement, TextFieldProps>((props, ref) => {
  const { gridProps, styleProps, htmlProps, restProps } = useBaseProps(props);

  // Extract commonly used props we may inspect
  const { placeholder, value, defaultValue, slotProps, InputLabelProps, InputProps, variant = 'outlined', ...other } = restProps as MuiTextFieldProps;

  // Determine whether label should shrink automatically when a placeholder is shown.
  // MUI does not shrink the label for outlined variant with just a placeholder (and empty value) by default.
  // We standardize that behavior for consistency across admin surfaces.
  const hasContent = (() => {
    if (value != null && value !== '') return true;
    if (defaultValue != null && defaultValue !== '') return true;
    return false;
  })();

  const autoShrink = !!placeholder && !hasContent;

  // Allow explicit user override: if consumer supplied slotProps.inputLabel.shrink or InputLabelProps.shrink, respect it.
  const userShrink = slotProps?.inputLabel?.shrink ?? InputLabelProps?.shrink;
  const finalShrink = userShrink !== undefined ? userShrink : autoShrink;

  const mergedSlotProps = {
    ...slotProps,
    inputLabel: {
      ...(slotProps?.inputLabel || {}),
      ...(finalShrink ? { shrink: true } : {}),
    },
  };

  // Prepare InputProps (for OutlinedInput) to ensure notch appears when we auto-shrink.
  let mergedInputProps = InputProps || {};
  if (variant === 'outlined' && finalShrink && placeholder && !hasContent) {
    if (mergedInputProps.notched === undefined) {
      mergedInputProps = { ...mergedInputProps, notched: true };
    }
  }

  // Mark as QwickApp component
  (TextField as Record<string, unknown>)[QWICKAPP_COMPONENT] = true;

  return (
    <MuiTextField
      ref={ref}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      variant={variant}
      slotProps={mergedSlotProps}
      InputProps={mergedInputProps}
      {...other}
      {...htmlProps}
      {...styleProps}
      // Store grid props as data attributes for ColumnLayout to pick up
      {...(gridProps && {
        'data-grid-span': gridProps.span,
        'data-grid-xs': gridProps.xs,
        'data-grid-sm': gridProps.sm,
        'data-grid-md': gridProps.md,
        'data-grid-lg': gridProps.lg,
        'data-grid-xl': gridProps.xl,
      })}
    />
  );
});

TextField.displayName = 'TextField';

export default TextField;