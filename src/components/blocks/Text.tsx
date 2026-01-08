/**
 * Text - Factory-based typography component with serialization support
 * 
 * Migrated from class-based ModelView to factory pattern for better
 * schema-driven architecture while preserving all typography features.
 * 
 * Features:
 * - Complete typography variant support (h1-h6, body1/2, subtitle, etc.)
 * - Rich styling options (color, alignment, font properties)
 * - Custom typography overrides (fontSize, fontFamily, etc.)
 * - Semantic HTML element rendering
 * - Text formatting and decoration options
 * - Full serialization support via createSerializableView
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Typography } from '@mui/material';
import React from 'react';
import { createSerializableView, SerializableComponent } from '../shared/createSerializableView';
import { ViewProps } from '../shared/viewProps';
import TextSchema from '../../schemas/TextSchema';
import type { SchemaProps } from '@qwickapps/schema/src/types/ModelProps';

/**
 * Props interface for Text component
 * Uses SchemaProps<typeof TextSchema> for clean typing
 * Explicitly includes sx and style for type resolution
 */
export type TextProps = ViewProps & SchemaProps<typeof TextSchema> & {
  /** MUI sx prop for advanced styling (explicit override for type resolution) */
  sx?: import('@mui/material/styles').SxProps<import('@mui/material/styles').Theme>;
  /** Inline CSS styles (explicit override for type resolution) */
  style?: React.CSSProperties;
};

/**
 * TextView - Pure view component that renders the typography
 * 
 * This component receives fully processed props from createSerializableView
 * and renders the text using Material-UI Typography with all styling applied.
 */
function TextView({
  content,
  variant = 'body1',
  color = 'inherit',
  align = 'inherit',
  component = 'p',
  fontWeight = 'inherit',
  textDecoration = 'none',
  textTransform = 'none',
  noWrap = false,
  paragraph = false,
  gutterBottom = false,
  fontSize,
  lineHeight,
  letterSpacing,
  fontFamily,
  customColor,
  maxWidth,
  className,
  style,
  ...restProps
}: TextProps) {
  // Use content prop directly (already a string from content-prop strategy)
  const textContent = content || '';

  // Early return if no content provided
  if (!textContent) {
    return null;
  }

  // Build custom styles
  const customStyles: React.CSSProperties = {
    ...style
  };

  // Apply custom typography overrides
  if (fontSize) customStyles.fontSize = fontSize;
  if (lineHeight) customStyles.lineHeight = lineHeight;
  if (letterSpacing) customStyles.letterSpacing = letterSpacing;
  if (fontFamily) customStyles.fontFamily = fontFamily;
  if (customColor) customStyles.color = customColor;
  if (maxWidth) customStyles.maxWidth = maxWidth;

  // Apply text formatting
  if (fontWeight !== 'inherit') customStyles.fontWeight = fontWeight;
  if (textDecoration !== 'none') customStyles.textDecoration = textDecoration;
  if (textTransform !== 'none') customStyles.textTransform = textTransform;

  // Handle onClick cursor if onClick is provided
  if (restProps.onClick) customStyles.cursor = 'pointer';

  return (
    <Typography
      {...restProps}
      variant={variant}
      color={color as 'initial' | 'inherit' | 'primary' | 'secondary' | 'textPrimary' | 'textSecondary' | 'error'}
      align={align}
      component={component}
      noWrap={noWrap}
      paragraph={paragraph}
      gutterBottom={gutterBottom}
      className={`text ${className || ''}`.trim()}
      style={customStyles}
    >
      {textContent}
    </Typography>
  );
}

/**
 * Create Text component using the factory pattern
 */
export const Text: SerializableComponent<TextProps> = createSerializableView<TextProps>({
  tagName: 'Text',
  version: '1.0.0',
  role: 'view',
  View: TextView,
  childrenStrategy: { mode: 'content-prop', propName: 'content' }
});

// Type for pattern registry with basic methods
interface PatternRegistry {
  hasPattern(pattern: string): boolean;
  registerPattern(pattern: string, handler: (element: Element) => unknown): void;
}

// Type for Text component with pattern handlers
interface TextComponentWithPatterns {
  registerPatternHandlers: (registry: PatternRegistry) => void;
  transformParagraph: (element: Element) => unknown;
  transformHeading: (element: Element, tagName: string) => unknown;
  transformSpan: (element: Element) => unknown;
}

// Register HTML patterns that Text component can handle
(Text as unknown as TextComponentWithPatterns).registerPatternHandlers = (registry: PatternRegistry): void => {
  const typedRegistry = registry as { hasPattern?: (pattern: string) => boolean; registerPattern?: (pattern: string, handler: (element: Element) => Record<string, unknown>) => void };
  const textComponent = Text as unknown as TextComponentWithPatterns;

  // Register paragraph elements
  if (typedRegistry.hasPattern && !typedRegistry.hasPattern('p')) {
    typedRegistry.registerPattern?.('p', textComponent.transformParagraph);
  }

  // Register heading elements
  const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  headings.forEach(heading => {

    if (typedRegistry.hasPattern && !typedRegistry.hasPattern(heading)) {
      typedRegistry.registerPattern?.(heading, (element: Element) => textComponent.transformHeading(element, heading));
    }
  });

  // Register span elements
  if (typedRegistry.hasPattern && !typedRegistry.hasPattern('span')) {
    typedRegistry.registerPattern?.('span', textComponent.transformSpan);
  }
};

// Transform paragraph elements to Text component
(Text as unknown as TextComponentWithPatterns).transformParagraph = (element: Element): unknown => {
  return {
    tagName: 'Text',
    version: '1.0.0',
    data: {
      variant: 'body1',
      component: 'p',
      content: element.textContent || ''
    }
  };
};

// Transform heading elements to Text component
(Text as unknown as TextComponentWithPatterns).transformHeading = (element: Element, tagName: string): unknown => {
  const variantMap: { [key: string]: string } = {
    'h1': 'h1',
    'h2': 'h2',
    'h3': 'h3',
    'h4': 'h4',
    'h5': 'h5',
    'h6': 'h6'
  };

  return {
    tagName: 'Text',
    version: '1.0.0',
    data: {
      variant: variantMap[tagName] || 'h4',
      component: tagName,
      content: element.textContent || ''
    }
  };
};

// Transform span elements to Text component
(Text as unknown as TextComponentWithPatterns).transformSpan = (element: Element): unknown => {
  return {
    tagName: 'Text',
    version: '1.0.0',
    data: {
      variant: 'body2',
      component: 'span',
      content: element.textContent || ''
    }
  };
};

/**
 * Export the component as default
 */
export default Text;