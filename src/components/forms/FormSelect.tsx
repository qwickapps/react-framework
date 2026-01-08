/**
 * FormSelect - Themed form select component wrapping MUI Select
 *
 * Features:
 * - Uses QwickApps CSS theme variables for consistent styling
 * - Simplified select-only interface (use FormField for mixed inputs)
 * - Support for placeholder, size variants, and helper text
 * - Integrated with MUI FormControl and Select
 * - Base props support for grid behavior and styling
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { useBaseProps, WithBaseProps, QWICKAPP_COMPONENT } from '../../hooks/useBaseProps';

export interface FormSelectOption {
  value: string | number;
  label: string;
}

interface FormSelectBaseProps {
  label?: string;
  value: string | number;
  onChange: (value: string | number) => void;
  options: FormSelectOption[];
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: 'small' | 'medium';
  placeholder?: string;
}

export interface FormSelectProps extends WithBaseProps<FormSelectBaseProps> {}

export const FormSelect = React.forwardRef<HTMLDivElement, FormSelectProps>((props, ref) => {
  const { gridProps, styleProps, htmlProps, restProps } = useBaseProps(props);

  const {
    label,
    value,
    onChange,
    options,
    helperText,
    required = false,
    disabled = false,
    fullWidth = true,
    size = 'small',
    placeholder,
  } = restProps as FormSelectBaseProps;

  const handleChange = (e: unknown) => {
    onChange(e.target.value);
  };

  const selectStyles = {
    p: 1,
    pl: 1.6,
    ...(label ? { mt: 1, color: 'var(--theme-text-primary)' } : {}),
    backgroundColor: 'var(--theme-surface-variant)',
    borderColor: 'var(--theme-surface)',
    color: 'var(--theme-text-primary)',
    borderRadius: 1,
    ...styleProps.sx,
  };

  const labelStyles = {
    left: -12,
    fontWeight: 600,
    color: 'var(--theme-text-primary)',
  };

  const helperTextStyles = {
    color: 'var(--theme-secondary)',
  };

  return (
    <FormControl
      ref={ref}
      fullWidth={fullWidth}
      size={size}
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
      {label && (
        <InputLabel sx={labelStyles} shrink>
          {label}
        </InputLabel>
      )}

      <Select
        value={value}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        displayEmpty={!!placeholder}
        sx={selectStyles}
      >
        {placeholder && (
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
        )}
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>

      {helperText && (
        <FormHelperText sx={helperTextStyles}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
});

FormSelect.displayName = 'FormSelect';

// Mark as QwickApp component
Object.assign(FormSelect, { [QWICKAPP_COMPONENT]: true });

export default FormSelect;
