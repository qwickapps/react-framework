/**
 * FormCheckbox - Themed checkbox component wrapping MUI Checkbox and FormControlLabel
 *
 * Features:
 * - Uses QwickApps CSS theme variables for consistent styling
 * - Supports FormControlLabel for proper label positioning
 * - Handles required and disabled states
 * - Helper text support
 * - Base props support for grid behavior and styling
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import {
  FormControl,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from '@mui/material';
import { useBaseProps, WithBaseProps, QWICKAPP_COMPONENT } from '../../hooks/useBaseProps';

interface FormCheckboxBaseProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
}

export interface FormCheckboxProps extends WithBaseProps<FormCheckboxBaseProps> {}

export const FormCheckbox = React.forwardRef<HTMLDivElement, FormCheckboxProps>((props, ref) => {
  const { gridProps, styleProps, htmlProps, restProps } = useBaseProps(props);

  const {
    label,
    checked,
    onChange,
    helperText,
    required = false,
    disabled = false,
  } = restProps as FormCheckboxBaseProps;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  const checkboxStyles = {
    color: 'var(--theme-primary)',
    '&.Mui-checked': {
      color: 'var(--theme-primary)',
    },
    '&.Mui-disabled': {
      color: 'var(--theme-text-disabled)',
    },
  };

  const labelStyles = {
    color: 'var(--theme-text-primary)',
    '& .MuiFormControlLabel-label': {
      color: 'var(--theme-text-primary)',
    },
    '& .MuiFormControlLabel-label.Mui-disabled': {
      color: 'var(--theme-text-disabled)',
    },
    ...styleProps.sx,
  };

  const helperTextStyles = {
    color: 'var(--theme-secondary)',
    marginLeft: '32px', // Align with checkbox + label
  };

  return (
    <FormControl
      ref={ref}
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
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={handleChange}
            required={required}
            disabled={disabled}
            sx={checkboxStyles}
          />
        }
        label={label}
        sx={labelStyles}
      />
      {helperText && (
        <FormHelperText sx={helperTextStyles}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
});

FormCheckbox.displayName = 'FormCheckbox';

// Mark as QwickApp component
(FormCheckbox as Record<string, unknown>)[QWICKAPP_COMPONENT] = true;

export default FormCheckbox;
