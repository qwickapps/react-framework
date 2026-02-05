/**
 * FormSelect - Themed form select component wrapping MUI Select
 *
 * Features:
 * - Uses QwickApps CSS theme variables for consistent styling
 * - Simplified select-only interface (use FormField for mixed inputs)
 * - Support for placeholder, size variants, and helper text
 * - Integrated with MUI FormControl and Select
 * - Schema-driven architecture with serialization support
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
import type { SchemaProps } from '@qwickapps/schema';
import FormSelectModel from '../../schemas/FormSelectSchema';
import { ViewProps } from '../shared/viewProps';
import { createSerializableView, SerializableComponent } from '../shared/createSerializableView';

export interface FormSelectOption {
  value: string | number;
  label: string;
}

/**
 * Props interface for FormSelect component
 * Combines schema props with callback handlers
 */
export interface FormSelectProps extends ViewProps, SchemaProps<typeof FormSelectModel> {
  /** Callback when value changes */
  onChange: (value: string | number) => void;
  /** Options array (runtime prop, overrides schema) */
  options: FormSelectOption[];
}

/**
 * FormSelectView - Pure view component that renders the select field
 */
function FormSelectView({
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
  // Exclude ViewProps that conflict with MUI FormControl types
  margin: _margin,
  marginTop: _marginTop,
  marginRight: _marginRight,
  marginBottom: _marginBottom,
  marginLeft: _marginLeft,
  marginX: _marginX,
  marginY: _marginY,
  padding: _padding,
  paddingTop: _paddingTop,
  paddingRight: _paddingRight,
  paddingBottom: _paddingBottom,
  paddingLeft: _paddingLeft,
  paddingX: _paddingX,
  paddingY: _paddingY,
  ...restProps
}: FormSelectProps) {
  const handleChange = (e: { target: { value: unknown } }) => {
    onChange(e.target.value as string | number);
  };

  const selectStyles = {
    p: 1,
    pl: 1.6,
    ...(label ? { mt: 1, color: 'var(--theme-text-primary)' } : {}),
    backgroundColor: 'var(--theme-surface-variant)',
    borderColor: 'var(--theme-surface)',
    color: 'var(--theme-text-primary)',
    borderRadius: 1,
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
      size={size}
      {...restProps}
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
}

/**
 * Create FormSelect component using the factory pattern
 */
export const FormSelect: SerializableComponent<FormSelectProps> = createSerializableView<FormSelectProps>({
  tagName: 'FormSelect',
  version: '1.0.0',
  role: 'input',
  View: FormSelectView,
});

export default FormSelect;
