/**
 * FormField - Themed form field component wrapping MUI FormControl
 *
 * Features:
 * - Uses QwickApps CSS theme variables for consistent styling
 * - Supports text, number, password, and email input types
 * - Integrated with MUI FormControl, Input
 * - Handles readonly, disabled, and required states
 * - Support for adornments and helper text
 * - Schema-driven architecture with serialization support
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
import type { SchemaProps } from '@qwickapps/schema';
import FormFieldModel from '../../schemas/FormFieldSchema';
import { ViewProps } from '../shared/viewProps';
import { createSerializableView, SerializableComponent } from '../shared/createSerializableView';

/**
 * Props interface for FormField component
 * Combines schema props with callback handlers and adornments
 */
export interface FormFieldProps extends ViewProps, SchemaProps<typeof FormFieldModel> {
  /** Callback when value changes */
  onChange?: (value: string | number) => void;
  /** Raw change handler with event */
  onChangeRaw?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** Start adornment (icon, text, etc.) */
  startAdornment?: React.ReactNode;
  /** End adornment (icon, text, etc.) */
  endAdornment?: React.ReactNode;
  /** Additional input props */
  inputProps?: unknown;
}

/**
 * FormFieldView - Pure view component that renders the input field
 */
function FormFieldView({
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
  ...restProps
}: FormFieldProps) {
  const fieldId = React.useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      fullWidth={fullWidth}
      {...restProps}
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
}

/**
 * Create FormField component using the factory pattern
 */
export const FormField: SerializableComponent<FormFieldProps> = createSerializableView<FormFieldProps>({
  tagName: 'FormField',
  version: '1.0.0',
  role: 'input',
  View: FormFieldView,
});

export default FormField;
