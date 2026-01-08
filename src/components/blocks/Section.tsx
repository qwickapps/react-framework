/**
 * Section Component - Factory-based implementation using createSerializableView
 *
 * Migrated from class-based ModelView to factory pattern for better
 * schema-driven architecture while preserving all functionality.
 *
 * Usage:
 * - Traditional: <Section background="#f5f5f5" padding="large">Content</Section>
 * - Data-driven: <Section dataSource="pages.home.intro-section">Content</Section>
 *
 * Features:
 * - Theme-aware background color (supports theme palette paths and CSS colors)
 * - Responsive vertical spacing and max width
 * - Semantic HTML element customization
 * - Full CMS integration through dataSource prop
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Box, Container } from '@mui/material';
import React from 'react';
import { createSerializableView, SerializableComponent } from '../shared/createSerializableView';
import { ViewProps } from '../shared/viewProps';
import type { BreakpointValue } from '../../types';
import { mapToMUIBreakpoint } from '../../utils/breakpoints';

/**
 * Props interface for Section component - extends ViewProps
 */
export interface SectionProps extends ViewProps {
  /** Section background color */
  background?: string;
  /** Section text color */
  color?: string;
  /** Section padding/spacing */
  padding?: 'none' | 'tiny' | 'small' | 'medium' | 'large' | 'extra-large';
  /** Maximum content width (maps to MUI Container maxWidth) */
  contentMaxWidth?: BreakpointValue;
  /** HTML element type */
  component?: 'div' | 'section' | 'article' | 'main';
}

/**
 * SectionView - Pure view component that renders the actual section
 * 
 * This component receives fully processed props from createSerializableView
 * and renders the section using Material-UI Box with all styling applied.
 */
function SectionView({
  children,
  background = 'var(--theme-surface)',
  color = 'var(--theme-on-surface)',
  padding = 'medium',
  contentMaxWidth = 'lg',
  component = 'section',
  gridProps,
  ...props
}: SectionProps & { gridProps?: unknown }) {
  
  // Return empty state if no content
  if (!children) {
    return (
      <Box
        component={component}
        {...props}
        {...(gridProps ? { 'data-grid': JSON.stringify(gridProps) } : {})}
        sx={{
          backgroundColor: background,
          color,
          position: 'static',
          py: 2,
          px: 0,
          ...props.sx,
        }}
      >
        <Container
          maxWidth={mapToMUIBreakpoint(contentMaxWidth)}
          sx={{
            position: 'relative',
            textAlign: 'center',
            opacity: 0.6,
            ...(contentMaxWidth === false && {
              maxWidth: 'none !important',
              px: 3,
            }),
          }}
        >
          No content provided for this section
        </Container>
      </Box>
    );
  }
  
  /**
   * Returns MUI spacing units for vertical padding based on spacing preset.
   */
  const getPadding = () => {
    switch (padding) {
      case 'none':
        return 0;
      case 'tiny':
        return { py: 1, px: 0 }; //  8px bottom only (avoiding double spacing)
      case 'small':
        return { py: 2, px: 0 }; // 16px vertical, no horizontal (Container handles)
      case 'medium':
        return { py: 4, px: 0 }; // 32px vertical
      case 'large':
        return { py: 8, px: 0 }; // 64px vertical
      case 'extra-large':
        return { py: 12, px: 0 }; // 96px vertical
      default:
        return { py: 4, px: 0 };  // Default to medium if unknown
    }
  };

  return (
    <Box
      component={component}
      {...props}
      {...(gridProps ? { 'data-grid': JSON.stringify(gridProps) } : {})}
      sx={{
        backgroundColor: background,
        color,
        position: 'static',
        ...getPadding(),
        ...props.sx,
      }}
    >
      {/* Content Container */}
      <Container
        maxWidth={mapToMUIBreakpoint(contentMaxWidth)}
        sx={{
          position: 'relative',
          ...(contentMaxWidth === false && {
            maxWidth: 'none !important',
            px: 3, // Add some padding when no max width
          }),
        }}
      >
        {children}
      </Container>
    </Box>
  );
}

/**
 * Create Section component using the factory pattern
 */
export const Section: SerializableComponent<SectionProps> = createSerializableView<SectionProps>({
  tagName: 'Section',
  version: '1.0.0',
  role: 'container',
  View: SectionView,
  finalize: (props: SectionProps) => {
    // Handle type conversion for contentMaxWidth - convert "false" string to boolean false
    if ((props.contentMaxWidth as unknown) === "false") {
      return { ...props, contentMaxWidth: false as BreakpointValue };
    }
    return props;
  }
});

// Type for pattern registry with basic methods
interface PatternRegistry {
  hasPattern(pattern: string): boolean;
  registerPattern(pattern: string, handler: (element: Element) => unknown): void;
}

// Register HTML patterns that Section component can handle
(Section as unknown as { registerPatternHandlers: (registry: PatternRegistry) => void }).registerPatternHandlers = (registry: PatternRegistry): void => {
  const typedRegistry = registry as { hasPattern?: (pattern: string) => boolean; registerPattern?: (pattern: string, handler: (element: Element) => Record<string, unknown>) => void };

  // Register section element pattern
  if (typedRegistry.hasPattern && !typedRegistry.hasPattern('section')) {
    typedRegistry.registerPattern?.('section', (Section as unknown as { transformSection: (element: Element) => unknown }).transformSection);
  }

  // Register section with specific classes
  if (typedRegistry.hasPattern && !typedRegistry.hasPattern('section.blog-section')) {
    typedRegistry.registerPattern?.('section.blog-section', (Section as unknown as { transformBlogSection: (element: Element) => unknown }).transformBlogSection);
  }
};

// Transform generic section elements to Section component
(Section as unknown as { transformSection: (element: Element) => unknown }).transformSection = (element: Element): unknown => {
  const padding = element.getAttribute('data-padding') || 'medium';
  const background = element.getAttribute('data-background');
  const contentMaxWidth = element.getAttribute('data-max-width') || 'lg';

  return {
    tagName: 'Section',
    version: '1.0.0',
    data: {
      padding,
      background,
      contentMaxWidth,
      children: element.innerHTML
    }
  };
};

// Transform blog section elements to Section component with specific styling
(Section as unknown as { transformBlogSection: (element: Element) => unknown }).transformBlogSection = (element: Element): unknown => {
  const padding = element.getAttribute('data-padding') || 'large';
  const background = element.getAttribute('data-background') || 'var(--theme-surface)';

  return {
    tagName: 'Section',
    version: '1.0.0',
    data: {
      padding,
      background,
      contentMaxWidth: 'md',
      children: element.innerHTML
    }
  };
};

/**
 * Export the component as default
 */
export default Section;