/**
 * FormField - Themed form field component wrapping MUI FormControl
 *
 * Features:
 * - Uses QwickApps CSS theme variables for consistent styling
 * - Supports text, number, password, and email input types
 * - Integrated with MUI FormControl, Input, and Select
 * - Handles readonly, disabled, and required states
 * - Support for adornments and helper text
 * - Base props support for grid behavior and styling
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  InputAdornment,
} from '@mui/material';
import { useBaseProps, WithBaseProps, QWICKAPP_COMPONENT } from '../../hooks/useBaseProps';

export interface FormFieldOption {
  value: string | number;
  label: string;
}

interface FormFieldBaseProps {
  label: string;
  value: string | number;
  onChange?: (value: string | number) => void;
  onChangeRaw?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: 'text' | 'number' | 'password' | 'email' | 'tel';
  helperText?: string;
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  disabledColor?: string;
  fullWidth?: boolean;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  inputProps?: unknown;
}

export interface FormFieldProps extends WithBaseProps<FormFieldBaseProps> {}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>((props, ref) => {
  const { gridProps, styleProps, htmlProps, restProps } = useBaseProps(props);

  const {
    label,
    value,
    onChange,
    onChangeRaw,
    type = 'text',
    helperText,
    required = false,
    readOnly = false,
    disabled = false,
    disabledColor,
    fullWidth = true,
    multiline = false,
    rows,
    placeholder,
    startAdornment,
    endAdornment,
    inputProps,
  } = restProps as FormFieldBaseProps;

  // Generate a unique ID for the input field
  const fieldId = React.useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // If onChangeRaw is provided, use it instead
    if (onChangeRaw) {
      onChangeRaw(e);
      return;
    }

    if (onChange) {
      const newValue = type === 'number' ? parseInt(e.target.value) || 0 : e.target.value;
      onChange(newValue);
    }
  };

  const inputStyles = {
    p: 1,
    pl: 1.6,
    mt: 3,
    color: disabled && disabledColor
      ? disabledColor
      : readOnly
        ? 'var(--theme-text-secondary)'
        : 'var(--theme-text-primary)',
    backgroundColor: readOnly ? 'var(--theme-surface-variant)' : 'transparent',
    borderRadius: 1,
    '&.Mui-disabled': disabledColor ? {
      color: disabledColor,
      WebkitTextFillColor: disabledColor,
    } : undefined,
    '& input.Mui-disabled': disabledColor ? {
      color: disabledColor,
      WebkitTextFillColor: disabledColor,
    } : undefined,
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
      <InputLabel htmlFor={fieldId} sx={labelStyles} shrink>
        {label}
      </InputLabel>

      <Input
        id={fieldId}
        type={type}
        value={value}
        onChange={handleChange}
        readOnly={readOnly}
        disabled={disabled}
        required={required}
        multiline={multiline}
        rows={rows}
        placeholder={placeholder}
        inputProps={inputProps}
        sx={inputStyles}
        startAdornment={
          startAdornment ? (
            <InputAdornment position="start">{startAdornment}</InputAdornment>
          ) : undefined
        }
        endAdornment={
          endAdornment ? (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          ) : undefined
        }
      />

      {helperText && (
        <FormHelperText sx={helperTextStyles}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
});

FormField.displayName = 'FormField';

// Mark as QwickApp component
(FormField as Record<string, unknown>)[QWICKAPP_COMPONENT] = true;

export default FormField;
