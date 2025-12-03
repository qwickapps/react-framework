/**
 * ChoiceInputField - Dynamic option inputs management component with serialization support
 * 
 * Features:
 * - Complete dynamic option input management
 * - Rich text editing for each option (via HtmlInputField)
 * - Data binding support for dynamic content
 * - Full serialization support via factory pattern
 * - Consistent Material-UI styling
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import {
  Alert,
  Box,
  Button,
  Typography
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import HtmlInputField from './HtmlInputField';
// import ChoiceInputFieldModel from '../../schemas/ChoiceInputFieldSchema';
import { createSerializableView, SerializableComponent } from '../shared/createSerializableView';
import { ViewProps } from '../shared/viewProps';

export interface ChoiceInputFieldProps extends Omit<ViewProps, 'onFocus'> {
  // Component-specific props from ChoiceInputFieldModel
  label?: string;
  options?: string[];
  disabled?: boolean;
  placeholder?: string;
  optionLabelPrefix?: string;
  rows?: number;
  maxOptions?: number;
  // Additional props for enhanced functionality
  onOptionChange?: (optionIndex: number, value: string) => void;
  onAddOption?: () => void;
  onChoiceFieldFocus?: (optionIndex?: number) => void;
}

// View component - handles the actual rendering
function ChoiceInputFieldView({
  label = 'Options',
  options = [],
  onOptionChange,
  onAddOption,
  onChoiceFieldFocus,
  disabled = false,
  placeholder = 'Enter option text. HTML formatting supported.',
  optionLabelPrefix = 'Option',
  rows = 2,
  maxOptions = 10,
  ...restProps
}: ChoiceInputFieldProps) {

  const handleOptionChange = (optionIndex: number) => (value: string) => {
    onOptionChange?.(optionIndex, value);
  };

  const handleOptionFocus = (optionIndex: number) => () => {
    onChoiceFieldFocus?.(optionIndex);
  };

  const handleAddOption = () => {
    if (options.length < maxOptions) {
      onAddOption?.();
    }
  };

  return (
    <Box {...restProps}>
      <Typography variant="h6" gutterBottom>
        {label}
      </Typography>

      {/* Display warning if no options */}
      {options.length === 0 && (
        <Alert severity="info" sx={{ mb: 2 }}>
          No options added yet. Click "Add Option" to get started.
        </Alert>
      )}

      {/* Render options */}
      {options.map((optionValue, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <HtmlInputField
            label={`${optionLabelPrefix} ${index + 1}`}
            value={optionValue}
            onChange={handleOptionChange(index)}
            onFocus={handleOptionFocus(index)}
            placeholder={placeholder}
            rows={rows}
            disabled={disabled}
            showPreview={true}
            showHelp={false}
          />
        </Box>
      ))}

      {/* Add Option Button */}
      {options.length < maxOptions && (
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddOption}
          disabled={disabled}
          sx={{ mt: 1 }}
        >
          Add Option
        </Button>
      )}

      {/* Max options reached message */}
      {options.length >= maxOptions && (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
          Maximum number of options ({maxOptions}) reached.
        </Typography>
      )}
    </Box>
  );
}

// Create the serializable ChoiceInputField component using the factory
export const ChoiceInputField: SerializableComponent<ChoiceInputFieldProps> = createSerializableView<ChoiceInputFieldProps>({
  tagName: 'ChoiceInputField',
  version: '1.0.0',
  role: 'view',
  View: ChoiceInputFieldView,
  // ChoiceInputField component uses default react-children strategy
});

export default ChoiceInputField;