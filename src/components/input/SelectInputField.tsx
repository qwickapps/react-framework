/**
 * SelectInputField - Select dropdown component with serialization support
 * 
 * Features:
 * - Complete select dropdown functionality with options
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
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { SelectOption } from '../../schemas/SelectInputFieldSchema';
import { createSerializableView, SerializableComponent } from '../shared/createSerializableView';
import { ViewProps } from '../shared/viewProps';

export interface SelectInputFieldProps extends ViewProps {
  // Component-specific props from SelectInputFieldModel
  label?: string;
  value?: string | number;
  options?: SelectOption[];
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  placeholder?: string;
  // Additional props for enhanced functionality
  onChange?: (value: string | number) => void;
  onFocus?: () => void;
}

// Export SelectOption for external use
export { SelectOption };

// View component - handles the actual rendering
function SelectInputFieldView({
  label,
  value = '',
  onChange,
  onFocus,
  options = [],
  required = false,
  disabled = false,
  error,
  helperText,
  placeholder,
  ...restProps
}: SelectInputFieldProps) {
  const handleChange = (event: SelectChangeEvent<string | number>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  // Filter out ViewProps that conflict with FormControl
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

  const labelId = label ? `select-label-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined;

  return (
    <FormControl 
      fullWidth 
      required={required} 
      disabled={disabled} 
      error={!!error} 
      sx={sx}
      style={style}
      className={className}
      {...filteredProps}
    >
      {label && <InputLabel id={labelId}>{label}</InputLabel>}
      <Select
        labelId={labelId}
        label={label}
        value={value}
        onChange={handleChange}
        onFocus={onFocus}
        displayEmpty={!!placeholder}
      >
        {placeholder && (
          <MenuItem value="" disabled>
            <em>{placeholder}</em>
          </MenuItem>
        )}
        {options.map((option, index) => (
          <MenuItem
            key={`${option.value}-${index}`}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {(error || helperText) && (
        <FormHelperText>{error || helperText}</FormHelperText>
      )}
    </FormControl>
  );
}

// Create the serializable SelectInputField component using the factory
export const SelectInputField: SerializableComponent<SelectInputFieldProps> = createSerializableView<SelectInputFieldProps>({
  tagName: 'SelectInputField',
  version: '1.0.0',
  role: 'view',
  View: SelectInputFieldView,
  // SelectInputField component uses default react-children strategy
});

export default SelectInputField;