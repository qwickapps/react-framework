/**
 * SwitchInputField - Switch toggle component with serialization support
 * 
 * Features:
 * - Complete switch toggle functionality
 * - Form validation and error handling
 * - Data binding support for dynamic content
 * - Full serialization support via factory pattern
 * - Consistent Material-UI styling
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch,
} from '@mui/material';
import { createSerializableView, SerializableComponent } from '../shared/createSerializableView';
import { ViewProps } from '../shared/viewProps';

export interface SwitchInputFieldProps extends ViewProps {
  // Component-specific props from SwitchInputFieldModel
  label?: string;
  checked?: boolean;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  // Additional props for enhanced functionality
  onChange?: (checked: boolean) => void;
  onFocus?: () => void;
}

// View component - handles the actual rendering
function SwitchInputFieldView({
  label,
  checked = false,
  onChange,
  onFocus,
  required = false,
  disabled = false,
  error,
  helperText,
  ...restProps
}: SwitchInputFieldProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.checked);
  };

  // Filter out ViewProps that conflict with FormControl
  const { margin: _margin, padding: _padding, paddingX: _paddingX, paddingY: _paddingY, paddingTop: _paddingTop, paddingRight: _paddingRight, paddingBottom: _paddingBottom, paddingLeft: _paddingLeft,
          width: _width, height: _height, minWidth: _minWidth, maxWidth: _maxWidth, minHeight: _minHeight, maxHeight: _maxHeight, sx, style,
          span: _span, xs: _xs, sm: _sm, md: _md, lg: _lg, xl: _xl, background: _background, backgroundImage: _backgroundImage, backgroundGradient: _backgroundGradient, textAlign: _textAlign,
          className, ...filteredProps } = restProps;

  return (
    <FormControl 
      component="fieldset" 
      error={!!error} 
      disabled={disabled} 
      sx={sx}
      style={style}
      className={className}
      {...filteredProps}
    >
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={handleChange}
            onFocus={onFocus}
            required={required}
            disabled={disabled}
          />
        }
        label={label}
      />
      {(error || helperText) && (
        <FormHelperText>{error || helperText}</FormHelperText>
      )}
    </FormControl>
  );
}

// Create the serializable SwitchInputField component using the factory
export const SwitchInputField: SerializableComponent<SwitchInputFieldProps> = createSerializableView<SwitchInputFieldProps>({
  tagName: 'SwitchInputField',
  version: '1.0.0',
  role: 'view',
  View: SwitchInputFieldView,
  // SwitchInputField component uses default react-children strategy
});

export default SwitchInputField;