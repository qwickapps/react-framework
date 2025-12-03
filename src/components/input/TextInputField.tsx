/**
 * TextInputField - Reusable text input component with serialization support
 * 
 * Features:
 * - Complete text field functionality (single/multiline, input types)
 * - Form validation and error handling
 * - Data binding support for dynamic content
 * - Full serialization support via factory pattern
 * - Consistent Material-UI styling
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
// import TextInputFieldModel from '../../schemas/TextInputFieldSchema';
import { createSerializableView, SerializableComponent } from '../shared/createSerializableView';
import { ViewProps } from '../shared/viewProps';

export interface TextInputFieldProps extends ViewProps {
  // Component-specific props from TextInputFieldModel
  label?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
  maxRows?: number;
  // Additional props for enhanced functionality
  onChange?: (value: string) => void;
  onFocus?: () => void;
  textFieldProps?: Omit<TextFieldProps, 'label' | 'value' | 'onChange' | 'onFocus' | 'required' | 'disabled' | 'error' | 'helperText' | 'placeholder' | 'type' | 'multiline' | 'rows' | 'maxRows'>;
}

// View component - handles the actual rendering
function TextInputFieldView({
  label,
  value = '',
  onChange,
  onFocus,
  required = false,
  disabled = false,
  error,
  helperText,
  placeholder,
  type = 'text',
  multiline = false,
  rows,
  maxRows,
  textFieldProps,
  ...restProps
}: TextInputFieldProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  // Filter out ViewProps that conflict with TextField
  const {
    margin: _margin,
    padding: _padding,
    paddingX: _paddingX,
    paddingY: _paddingY,
    paddingTop: _paddingTop,
    paddingRight: _paddingRight,
    paddingBottom: _paddingBottom,
    paddingLeft: _paddingLeft,
    width: _width,
    height: _height,
    minWidth: _minWidth,
    maxWidth: _maxWidth,
    minHeight: _minHeight,
    maxHeight: _maxHeight,
    sx,
    style,
    span: _span,
    xs: _xs,
    sm: _sm,
    md: _md,
    lg: _lg,
    xl: _xl,
    background: _background,
    backgroundImage: _backgroundImage,
    backgroundGradient: _backgroundGradient,
    textAlign: _textAlign,
    className,
    ...filteredProps
  } = restProps;

  return (
    <TextField
      {...filteredProps}
      fullWidth
      label={label}
      value={value}
      onChange={handleChange}
      onFocus={onFocus}
      required={required}
      disabled={disabled}
      error={!!error}
      helperText={error || helperText}
      placeholder={placeholder}
      type={type}
      multiline={multiline}
      rows={rows}
      maxRows={maxRows}
      sx={sx}
      style={style}
      className={className}
      {...textFieldProps}
    />
  );
}

// Create the serializable TextInputField component using the factory
export const TextInputField: SerializableComponent<TextInputFieldProps> = createSerializableView<TextInputFieldProps>({
  tagName: 'TextInputField',
  version: '1.0.0',
  role: 'view',
  View: TextInputFieldView,
  // TextInputField component uses default react-children strategy
});

export default TextInputField;