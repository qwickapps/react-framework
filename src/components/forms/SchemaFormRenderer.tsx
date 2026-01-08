/**
 * SchemaFormRenderer - Dynamic form generation from @qwickapps/schema models
 *
 * Reads @Editor metadata from Model classes and generates Material-UI form fields.
 * Maps field_type to appropriate input components with validation.
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React, { useState, useCallback } from 'react';
import {
  TextField,
  FormControlLabel,
  Switch,
  Box,
  Typography,
  FormHelperText,
  Alert,
} from '@mui/material';
import { Model, FieldType } from '@qwickapps/schema';
import type { FieldDefinition } from '@qwickapps/schema';

export interface SchemaFormRendererProps<T extends Model> {
  /** Model class to generate form from */
  modelClass: new () => T;

  /** Current form data */
  value: Partial<T>;

  /** Called when any field changes */
  onChange: (data: Partial<T>) => void;

  /** Show validation errors */
  showValidation?: boolean;

  /** Validation errors from Model.validate() */
  validationErrors?: string[];

  /** Read-only mode */
  readOnly?: boolean;
}

/**
 * Render a single form field based on its editor configuration
 */
function renderField<T extends Model>(
  field: FieldDefinition,
  value: unknown,
  onChange: (name: string, value: unknown) => void,
  readOnly: boolean
): React.ReactNode {
  const { name, required, editor } = field;

  if (!editor) {
    return null;
  }

  const { field_type, label, description, placeholder, validation } = editor;
  const fieldValue = value ?? '';

  const commonProps = {
    fullWidth: true,
    margin: 'normal' as const,
    required,
    disabled: readOnly,
    label,
    helperText: description,
  };

  switch (field_type) {
    case FieldType.TEXT:
    case FieldType.EMAIL:
      return (
        <TextField
          {...commonProps}
          type={field_type === FieldType.EMAIL ? 'email' : 'text'}
          value={fieldValue}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder}
          inputProps={{
            minLength: validation?.min,
            maxLength: validation?.max,
          }}
        />
      );

    case FieldType.TEXTAREA:
      return (
        <TextField
          {...commonProps}
          multiline
          rows={4}
          value={fieldValue}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder}
          inputProps={{
            minLength: validation?.min,
            maxLength: validation?.max,
          }}
        />
      );

    case FieldType.NUMBER:
      return (
        <TextField
          {...commonProps}
          type="number"
          value={fieldValue}
          onChange={(e) => {
            const val = e.target.value;
            onChange(name, val === '' ? undefined : parseFloat(val));
          }}
          placeholder={placeholder}
          inputProps={{
            min: validation?.min,
            max: validation?.max,
          }}
        />
      );

    case FieldType.BOOLEAN:
      return (
        <FormControlLabel
          control={
            <Switch
              checked={!!fieldValue}
              onChange={(e) => onChange(name, e.target.checked)}
              disabled={readOnly}
            />
          }
          label={
            <Box>
              <Typography variant="body2" fontWeight={required ? 600 : 400}>
                {label}
              </Typography>
              {description && (
                <Typography variant="caption" color="text.secondary">
                  {description}
                </Typography>
              )}
            </Box>
          }
        />
      );

    case FieldType.DATE_TIME:
      return (
        <TextField
          {...commonProps}
          type="datetime-local"
          value={fieldValue}
          onChange={(e) => onChange(name, e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      );

    case FieldType.COLOR:
      return (
        <Box>
          <TextField
            {...commonProps}
            type="color"
            value={fieldValue || '#000000'}
            onChange={(e) => onChange(name, e.target.value)}
          />
        </Box>
      );

    case FieldType.IMAGE:
      return (
        <Box>
          <Typography variant="body2" fontWeight={required ? 600 : 400}>
            {label}
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            type="url"
            value={fieldValue}
            onChange={(e) => onChange(name, e.target.value)}
            placeholder={placeholder || 'https://example.com/image.jpg'}
            helperText={description}
            disabled={readOnly}
          />
        </Box>
      );

    case FieldType.FORM:
      // Nested form - would need recursive rendering
      return (
        <Alert severity="info" sx={{ my: 2 }}>
          Nested form for {name} (not yet implemented)
        </Alert>
      );

    case FieldType.MODEL_REPEATER:
      // Array of nested forms
      return (
        <Alert severity="info" sx={{ my: 2 }}>
          Array field {name} (not yet implemented)
        </Alert>
      );

    default:
      return (
        <TextField
          {...commonProps}
          value={fieldValue}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder}
        />
      );
  }
}

/**
 * SchemaFormRenderer Component
 */
export function SchemaFormRenderer<T extends Model>({
  modelClass,
  value,
  onChange,
  showValidation = false,
  validationErrors = [],
  readOnly = false,
}: SchemaFormRendererProps<T>) {
  const schema = modelClass.getSchema();

  const handleFieldChange = useCallback(
    (fieldName: string, fieldValue: any) => {
      onChange({
        ...value,
        [fieldName]: fieldValue,
      });
    },
    [value, onChange]
  );

  return (
    <Box>
      {showValidation && validationErrors.length > 0 && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="body2" fontWeight={600} gutterBottom>
            Please fix the following errors:
          </Typography>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {validationErrors.map((error, idx) => (
              <li key={idx}>
                <Typography variant="body2">{error}</Typography>
              </li>
            ))}
          </ul>
        </Alert>
      )}

      {schema.fields.map((field) => (
        <Box key={field.name}>
          {renderField<T>(
            field,
            (value as any)[field.name],
            handleFieldChange,
            readOnly
          )}
        </Box>
      ))}
    </Box>
  );
}
