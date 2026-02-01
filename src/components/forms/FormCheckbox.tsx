/**
 * FormCheckbox - Themed checkbox component wrapping MUI Checkbox and FormControlLabel
 *
 * Features:
 * - Uses QwickApps CSS theme variables for consistent styling
 * - Supports FormControlLabel for proper label positioning
 * - Handles required and disabled states
 * - Helper text support
 * - Schema-driven architecture with serialization support
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
import type { SchemaProps } from '@qwickapps/schema';
import FormCheckboxModel from '../../schemas/FormCheckboxSchema';
import { ViewProps } from '../shared/viewProps';
import { createSerializableView, SerializableComponent } from '../shared/createSerializableView';

/**
 * Props interface for FormCheckbox component
 * Combines schema props with callback handler
 */
export interface FormCheckboxProps extends ViewProps, SchemaProps<typeof FormCheckboxModel> {
  /** Callback when checkbox state changes */
  onChange: (checked: boolean) => void;
}

/**
 * FormCheckboxView - Pure view component that renders the checkbox
 */
function FormCheckboxView({
  label,
  checked,
  onChange,
  helperText,
  required = false,
  disabled = false,
  ...restProps
}: FormCheckboxProps) {
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
  };

  const helperTextStyles = {
    color: 'var(--theme-secondary)',
    marginLeft: '32px',
  };

  return (
    <FormControl {...restProps}>
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
}

/**
 * Create FormCheckbox component using the factory pattern
 */
export const FormCheckbox: SerializableComponent<FormCheckboxProps> = createSerializableView<FormCheckboxProps>({
  tagName: 'FormCheckbox',
  version: '1.0.0',
  role: 'input',
  View: FormCheckboxView,
});

export default FormCheckbox;
