/**
 * HtmlInputField - Custom HTML text field with serialization support
 * 
 * Features:
 * - Complete HTML editing with formatting toolbar
 * - HTML preview mode and help system
 * - HTML sanitization for security
 * - Data binding support for dynamic content
 * - Full serialization support via factory pattern
 * - Consistent Material-UI styling
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React, { useState } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Tooltip,
  Typography,
  Collapse,
  Alert,
  ButtonGroup,
  } from '@mui/material';
import {
  FormatBold as BoldIcon,
  FormatItalic as ItalicIcon,
  FormatUnderlined as UnderlineIcon,
  Code as CodeIcon,
  Visibility as PreviewIcon,
  VisibilityOff as EditIcon,
  Help as HelpIcon
} from '@mui/icons-material';
import SafeSpan from '../SafeSpan';
import sanitizeHtml from 'sanitize-html';
// import HtmlInputFieldModel from '../../schemas/HtmlInputFieldSchema';
import { createSerializableView, SerializableComponent } from '../shared/createSerializableView';
import { ViewProps } from '../shared/viewProps';

export interface HtmlInputFieldProps extends ViewProps {
  // Component-specific props from HtmlInputFieldModel
  label?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  showPreview?: boolean;
  showHelp?: boolean;
  // Additional props for enhanced functionality
  onChange?: (value: string) => void;
  onFocus?: () => void;
}

// View component - handles the actual rendering
function HtmlInputFieldView({
  label,
  value = '',
  onChange,
  onFocus,
  required = false,
  disabled = false,
  error,
  helperText,
  placeholder,
  rows = 4,
  maxLength,
  showPreview = true,
  showHelp = false,
  ...restProps
}: HtmlInputFieldProps) {
  const [previewMode, setPreviewMode] = useState(false);
  const [showHelpText, setShowHelpText] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  const insertTag = (tag: string, hasClosing = true) => {
    if (disabled) return;
    
    const textarea = document.activeElement as HTMLTextAreaElement;
    if (!textarea || textarea.tagName !== 'TEXTAREA') return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    let insertText = '';
    if (hasClosing) {
      insertText = `<${tag}>${selectedText}</${tag}>`;
    } else {
      insertText = `<${tag}>`;
    }

    const newValue = value.substring(0, start) + insertText + value.substring(end);
    onChange?.(newValue);
    
    // Set cursor position after insertion
    setTimeout(() => {
      if (hasClosing && !selectedText) {
        const newPos = start + tag.length + 2;
        textarea.setSelectionRange(newPos, newPos);
      }
    }, 0);
  };

  const sanitizedHtml = sanitizeHtml(value || '', {
    allowedTags: ['b', 'i', 'u', 'strong', 'em', 'p', 'br', 'code', 'pre', 'span', 'div'],
    allowedAttributes: {
      '*': ['style', 'class']
    }
  });

  return (
    <Box {...restProps}>
      {/* Toolbar */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, flexWrap: 'wrap', gap: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {label}
          {required && <span style={{ color: 'error.main' }}> *</span>}
        </Typography>
        
        <Box sx={{ flexGrow: 1 }} />
        
        <ButtonGroup size="small" disabled={disabled || previewMode}>
          <Tooltip title="Bold">
            <IconButton onClick={() => insertTag('b')}>
              <BoldIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Italic">
            <IconButton onClick={() => insertTag('i')}>
              <ItalicIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Underline">
            <IconButton onClick={() => insertTag('u')}>
              <UnderlineIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Code">
            <IconButton onClick={() => insertTag('code')}>
              <CodeIcon />
            </IconButton>
          </Tooltip>
        </ButtonGroup>

        {showPreview && (
          <Tooltip title={previewMode ? "Edit Mode" : "Preview Mode"}>
            <IconButton onClick={() => setPreviewMode(!previewMode)} disabled={disabled}>
              {previewMode ? <EditIcon /> : <PreviewIcon />}
            </IconButton>
          </Tooltip>
        )}

        {showHelp && (
          <Tooltip title="HTML Help">
            <IconButton onClick={() => setShowHelpText(!showHelpText)}>
              <HelpIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* Help Text */}
      <Collapse in={showHelpText}>
        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body2">
            Supported HTML tags: &lt;b&gt;, &lt;i&gt;, &lt;u&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;p&gt;, &lt;br&gt;, &lt;code&gt;, &lt;pre&gt;
          </Typography>
        </Alert>
      </Collapse>

      {/* Input/Preview Area */}
      {previewMode ? (
        <Box
          sx={{
            border: 1,
            borderColor: 'divider',
            borderRadius: 1,
            p: 2,
            minHeight: rows * 24,
            backgroundColor: 'background.paper'
          }}
        >
          <SafeSpan 
            html={sanitizedHtml} 
            placeholder="No content to preview"
          />
        </Box>
      ) : (
        <TextField
          fullWidth
          multiline
          rows={rows}
          value={value}
          onChange={handleChange}
          onFocus={onFocus}
          placeholder={placeholder}
          disabled={disabled}
          error={!!error}
          helperText={error || helperText || (maxLength ? `${value.length}/${maxLength}` : undefined)}
          inputProps={{
            maxLength,
          }}
          sx={{
            '& .MuiInputBase-input': {
              fontFamily: 'monospace',
              fontSize: '0.875rem'
            }
          }}
        />
      )}
    </Box>
  );
}

// Create the serializable HtmlInputField component using the factory
export const HtmlInputField: SerializableComponent<HtmlInputFieldProps> = createSerializableView<HtmlInputFieldProps>({
  tagName: 'HtmlInputField',
  version: '1.0.0',
  role: 'view',
  View: HtmlInputFieldView,
  // HtmlInputField component uses default react-children strategy
});

export default HtmlInputField;