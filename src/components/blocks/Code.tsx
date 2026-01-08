'use client';

/**
 * Code - Content-prop leaf component for secure code display
 *
 * Uses content-prop strategy to prevent JSON deserialization vulnerabilities.
 * Code content is serialized as data.content (string), not data.children,
 * preventing recursive deserialization of example JSON that looks like components.
 *
 * Features preserved:
 * - Syntax highlighting support
 * - Copy to clipboard functionality
 * - Light/dark theme support
 * - Multiple language support
 * - Responsive design
 * - Line numbers support
 * - Title display
 * - Custom backgrounds
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React, { useState } from 'react';
import { Box, Typography, Tooltip, IconButton, Snackbar, Alert, useTheme, Paper } from '@mui/material';
import ContentCopy from '@mui/icons-material/ContentCopy';
import Check from '@mui/icons-material/Check';
const CopyIcon = ContentCopy;
const CheckIcon = Check;
import CodeSchema from '../../schemas/CodeSchema';
import type { SchemaProps } from '@qwickapps/schema/src/types/ModelProps';
import { ViewProps } from '../shared/viewProps';
import { createSerializableView, SerializableComponent } from '../shared/createSerializableView';

/**
 * Props interface for Code component
 * Uses SchemaProps<typeof CodeSchema> for clean typing
 */
export type CodeProps = ViewProps & SchemaProps<typeof CodeSchema>;

/**
 * CodeView - Pure view component that renders the code display
 * 
 * This component receives fully processed props from createSerializableView
 * and renders the code using Material-UI components with all features preserved.
 */
function CodeView({
  content,
  language: _language = 'text',
  showCopy = true,
  showLineNumbers = false,
  title,
  wrapLines = false,
  codeBackground,
  ...restProps
}: CodeProps) {
  
  
  const theme = useTheme();
  const [copied, setCopied] = useState(false);
  const [showCopiedAlert, setShowCopiedAlert] = useState(false);
  
  const codeMaxHeight = (restProps.sx as Record<string, unknown>)?.maxHeight as number || 400;

  // Use content prop directly (already a string from content-prop strategy)
  const codeContent = content || '';
  
  // Return empty state if no code content
  if (!codeContent?.trim()) {
    return (
      <Paper
        {...restProps}
        variant="outlined"
        sx={{
          p: 3,
          textAlign: 'center',
          opacity: 0.6,
          ...restProps.sx
        }}
      >
        <Typography variant="body2" color="text.secondary">
          No code content provided
        </Typography>
      </Paper>
    );
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeContent);
      setCopied(true);
      setShowCopiedAlert(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const codeLines = codeContent.split('\n');
  
  const getBackgroundColor = () => {
    if (codeBackground) return codeBackground;
    return theme.palette.grey[theme.palette.mode === 'dark' ? 900 : 50];
  };

  const getHeaderBackgroundColor = () => {
    return theme.palette.grey[theme.palette.mode === 'dark' ? 800 : 200];
  };

  const getTextColor = () => {
    return theme.palette.text.primary;
  };

  const getBorderColor = () => {
    return theme.palette.divider;
  };

  return (
    <Paper
      {...restProps}
      variant="outlined"
      sx={{
        backgroundColor: getBackgroundColor(),
        border: `1px solid ${getBorderColor()}`,
        borderRadius: 1,
        overflow: 'hidden',
        position: 'relative',
        ...restProps.sx
      }}
    >
      {/* Header with title and copy button */}
      {(title || showCopy) && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 2,
            py: 1,
            backgroundColor: getHeaderBackgroundColor(),
            borderBottom: `1px solid ${getBorderColor()}`,
          }}
        >
          {title && (
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'Monaco, Consolas, "Ubuntu Mono", monospace',
                color: getTextColor(),
                opacity: 0.8,
              }}
            >
              {title}
            </Typography>
          )}
          
          <Box sx={{ ml: 'auto' }}>
            {showCopy && (
              <Tooltip title={copied ? 'Copied!' : 'Copy code'}>
                <IconButton
                  size="small"
                  onClick={handleCopy}
                  sx={{
                    color: getTextColor(),
                    opacity: 0.7,
                    '&:hover': {
                      opacity: 1,
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  {copied ? (
                    <CheckIcon fontSize="small" />
                  ) : (
                    <CopyIcon fontSize="small" />
                  )}
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>
      )}

      {/* Code content */}
      <Box
        sx={{
          maxHeight: codeMaxHeight,
          overflow: 'auto',
          position: 'relative',
        }}
      >
        <Box
          component="pre"
          sx={{
            margin: 0,
            padding: 2,
            fontFamily: 'Monaco, Consolas, "Ubuntu Mono", monospace',
            fontSize: '0.875rem',
            lineHeight: 1.5,
            color: getTextColor(),
            backgroundColor: 'transparent',
            overflow: wrapLines ? 'visible' : 'auto',
            whiteSpace: wrapLines ? 'pre-wrap' : 'pre',
            wordBreak: wrapLines ? 'break-word' : 'normal',
          }}
        >
          {showLineNumbers ? (
            <Box sx={{ display: 'flex' }}>
              {/* Line numbers */}
              <Box
                sx={{
                  pr: 2,
                  mr: 2,
                  borderRight: `1px solid ${getBorderColor()}`,
                  color: getTextColor(),
                  opacity: 0.5,
                  userSelect: 'none',
                  minWidth: `${String(codeLines.length).length + 1}ch`,
                }}
              >
                {codeLines.map((_: string, index: number) => (
                  <Box key={index} sx={{ textAlign: 'right' }}>
                    {index + 1}
                  </Box>
                ))}
              </Box>
              
              {/* Code content */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <code>{codeContent}</code>
              </Box>
            </Box>
          ) : (
            <code>{codeContent}</code>
          )}
        </Box>
      </Box>

      {/* Copy success snackbar */}
      <Snackbar
        open={showCopiedAlert}
        autoHideDuration={2000}
        onClose={() => setShowCopiedAlert(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setShowCopiedAlert(false)} severity="success" variant="filled">
          Code copied to clipboard!
        </Alert>
      </Snackbar>
    </Paper>
  );
}

/**
 * Create Code component using the factory pattern
 */
export const Code: SerializableComponent<CodeProps> = createSerializableView<CodeProps>({
  tagName: 'Code',
  version: '1.0.0',
  role: 'view',
  View: CodeView,
  childrenStrategy: { mode: 'content-prop', propName: 'content' }
});

// Register HTML patterns that Code component can handle
(Code as Record<string, unknown>).registerPatternHandlers = (registry: Record<string, (...args: unknown[]) => unknown>): void => {
  const typedRegistry = registry as { hasPattern?: (pattern: string) => boolean; registerPattern?: (pattern: string, handler: (...args: unknown[]) => unknown) => void };

  // Register pre + code pattern
  if (typedRegistry.hasPattern && !typedRegistry.hasPattern('pre code')) {
    typedRegistry.registerPattern?.('pre code', (Code as Record<string, unknown>).transformPreCode as (...args: unknown[]) => unknown);
  }

  // Register standalone code pattern for complex code blocks
  if (typedRegistry.hasPattern && !typedRegistry.hasPattern('code.highlight')) {
    typedRegistry.registerPattern?.('code.highlight', (Code as Record<string, unknown>).transformCodeHighlight as (...args: unknown[]) => unknown);
  }
};

// Transform pre + code elements to Code component
(Code as Record<string, unknown>).transformPreCode = (element: Element): unknown => {
  const codeChild = element.querySelector('code');
  if (!codeChild) return null;

  const language = Array.from(codeChild.classList)
    .find(cls => cls.startsWith('language-'))
    ?.replace('language-', '') || 'text';

  return {
    tagName: 'Code',
    props: {
      language,
      showCopy: true,
      showLineNumbers: false,
      content: codeChild.textContent || ''
    }
  };
};

// Transform highlighted code elements to Code component
(Code as Record<string, unknown>).transformCodeHighlight = (element: Element): unknown => {
  const language = Array.from(element.classList)
    .find(cls => cls.startsWith('language-'))
    ?.replace('language-', '') || 'text';

  return {
    tagName: 'Code',
    props: {
      language,
      showCopy: true,
      showLineNumbers: false,
      content: element.textContent || ''
    }
  };
};

/**
 * Export the component as default
 */
export default Code;