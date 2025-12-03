/**
 * Markdown Component - Transforms Markdown strings into Framework components
 *
 * Accepts Markdown string as children and converts it through a
 * Markdown → HTML → React components pipeline using the Html component
 * with Markdown-optimized transformation rules.
 *
 * Features:
 * - Full Markdown syntax support via marked library
 * - Transform rules optimized for Markdown content
 * - Code block syntax highlighting
 * - Preserves inline code elements (no transformation)
 * - TypeScript support with proper props interface
 * - Error handling and fallback to Html component
 *
 * Usage:
 * - Basic: <Markdown>{markdownString}</Markdown>
 * - Custom config: <Markdown htmlTransformConfig={customConfig}>{markdownString}</Markdown>
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Box } from '@mui/material';
import { marked } from 'marked';
import React from 'react';
import type { WithDataBinding, SchemaProps } from '@qwickapps/schema';
import { QWICKAPP_COMPONENT, useBaseProps, useDataBinding } from '../hooks';
import MarkdownModel from '../schemas/MarkdownSchema';
import { ModelView } from './base/ModelView';
import Html from './Html';
import SafeSpan from './SafeSpan';
import { TransformConfig, defaultMarkdownRules } from '../utils/htmlTransform';

type MarkdownViewProps = SchemaProps<MarkdownModel> & {
  /** Custom transformation configuration for HTML conversion */
  htmlTransformConfig?: TransformConfig;
  /** Custom sanitization options */
  sanitizeOptions?: unknown;
  /** Container element type */
  component?: React.ElementType;
  /** Marked options for Markdown parsing */
  markedOptions?: marked.MarkedOptions;
};

export interface MarkdownProps extends MarkdownViewProps, WithDataBinding {}

/**
 * Configure marked with security and GitHub Flavored Markdown support
 */
const getMarkedOptions = (customOptions?: marked.MarkedOptions): marked.MarkedOptions => ({
  // GitHub Flavored Markdown
  gfm: true,
  // Convert line breaks to <br> tags
  breaks: false,
  // Pedantic compliance to original markdown.pl
  pedantic: false,
  // Sanitize HTML (we handle this in Html component)
  sanitize: false,
  // Smart punctuation
  smartypants: false,
  // Custom renderer options
  renderer: new marked.Renderer(),
  // Override with user options
  ...customOptions
});

// View component - handles the actual rendering
function MarkdownView({
  children = '',
  htmlTransformConfig,
  sanitize = true,
  sanitizeOptions,
  placeholder,
  component = 'div',
  markedOptions,
  ...restProps
}: MarkdownViewProps) {
  const { styleProps, htmlProps, restProps: otherProps } = useBaseProps(restProps);

  // Mark as QwickApp component
  (MarkdownView as Record<string, unknown>)[QWICKAPP_COMPONENT] = true;

  // Return placeholder if no Markdown content
  if (!children || !children.trim()) {
    if (placeholder) {
      return (
        <Box
          component={component}
          {...htmlProps}
          {...styleProps}
          {...otherProps}
          sx={{
            opacity: 0.6,
            fontStyle: 'italic',
            ...styleProps.sx
          }}
        >
          {placeholder}
        </Box>
      );
    }
    return null;
  }

  try {
    // Configure marked
    const options = getMarkedOptions(markedOptions);
    
    // Convert Markdown to HTML
    const htmlContent = marked(children, options);

    // Use provided transform config or default markdown rules
    const transformConfig: TransformConfig = htmlTransformConfig || {
      rules: defaultMarkdownRules,
      sanitize,
      sanitizeOptions
    };

    // Pass HTML to Html component for transformation
    return (
      <Html
        transformConfig={transformConfig}
        sanitize={sanitize}
        sanitizeOptions={sanitizeOptions}
        component={component}
        {...htmlProps}
        {...styleProps}
        {...otherProps}
      >
        {htmlContent}
      </Html>
    );

  } catch (error) {
    console.error('Error processing Markdown content:', error);
    
    // Fallback handling
    if (process.env.NODE_ENV !== 'production') {
      return (
        <Box
          component={component}
          {...htmlProps}
          {...styleProps}
          {...otherProps}
          sx={{
            p: 2,
            border: '1px solid orange',
            borderRadius: 1,
            backgroundColor: 'rgba(255, 165, 0, 0.1)',
            ...styleProps.sx
          }}
        >
          <strong>Markdown Processing Error:</strong> {error instanceof Error ? error.message : 'Unknown error'}
          <SafeSpan html={children} placeholder="Failed to process Markdown" />
        </Box>
      );
    }

    // Production fallback - try to use Html component with raw content
    try {
      return (
        <Html
          sanitize={sanitize}
          sanitizeOptions={sanitizeOptions}
          component={component}
          {...htmlProps}
          {...styleProps}
          {...otherProps}
        >
          {children}
        </Html>
      );
    } catch (htmlError) {
      // Last resort fallback
      return (
        <SafeSpan 
          html={children} 
          placeholder={placeholder || "Content unavailable"} 
          {...htmlProps}
          {...styleProps}
          {...otherProps}
        />
      );
    }
  }
}

// Main component with data binding support and serialization capability
export class Markdown extends ModelView<MarkdownProps, MarkdownModel> {
  // Component self-declaration for serialization
  static readonly tagName = 'Markdown';
  static readonly version = '1.0.0';
  
  // Component-specific serialization properties
  protected getComponentSpecificProps(): unknown {
    return {
      children: this.props.children,
      sanitize: this.props.sanitize,
      placeholder: this.props.placeholder
    };
  }

  // Markdown component renders traditional props view
  protected renderView(): React.ReactElement {
    const { ...restProps } = this.props;
    return <MarkdownView {...restProps} />;
  }

  // Markdown component renders data-bound view
  protected renderWithDataBinding(): React.ReactElement {
    return <MarkdownWithDataBinding {...this.props} />;
  }

  // Register HTML patterns that Markdown component can handle
  static registerPatternHandlers(registry: unknown): void {
    // Register div elements with specific classes for Markdown transformation
    if (!registry.hasPattern('div.markdown-content')) {
      registry.registerPattern('div.markdown-content', Markdown.transformMarkdownDiv);
    }
    
    // Register elements with data-markdown attribute
    if (!registry.hasPattern('[data-markdown]')) {
      registry.registerPattern('[data-markdown]', Markdown.transformDataMarkdown);
    }
  }

  // Transform div with markdown-content class to Markdown component
  private static transformMarkdownDiv(element: Element): unknown {
    const sanitize = element.getAttribute('data-sanitize') !== 'false';
    const placeholder = element.getAttribute('data-placeholder');
    
    return {
      tagName: 'Markdown',
      props: {
        children: element.textContent || '',
        sanitize,
        placeholder: placeholder || undefined
      }
    };
  }

  // Transform elements with data-markdown attribute to Markdown component
  private static transformDataMarkdown(element: Element): unknown {
    const markdownContent = element.getAttribute('data-markdown') || element.textContent;
    const sanitize = element.getAttribute('data-sanitize') !== 'false';
    const placeholder = element.getAttribute('data-placeholder');
    
    return {
      tagName: 'Markdown',
      props: {
        children: markdownContent,
        sanitize,
        placeholder: placeholder || undefined
      }
    };
  }
}

// Helper component to handle data binding with hooks (since we can't use hooks in class components)
function MarkdownWithDataBinding(props: MarkdownProps) {
  const { dataSource, bindingOptions, ...restProps } = props;

  // Use data binding
  const { loading, error, ...markdownProps } = useDataBinding<MarkdownModel>(
    dataSource!,
    restProps as Partial<MarkdownModel>,
    MarkdownModel.getSchema(),
    { cache: true, cacheTTL: 300000, strict: false, ...bindingOptions }
  );

  // Show loading state
  if (loading) {
    return (
      <Box sx={{ p: 2, textAlign: 'center', opacity: 0.6 }}>
        Loading Markdown content...
      </Box>
    );
  }

  if (error) {
    console.error('Error loading Markdown content:', error);
    if (process.env.NODE_ENV !== 'production') {
      return (
        <Box sx={{ p: 2, border: '1px solid orange', borderRadius: 1, backgroundColor: 'rgba(255, 165, 0, 0.1)' }}>
          <strong>Error Loading Markdown:</strong> {error.message}
        </Box>
      );
    }
    return null;
  }

  return <MarkdownView {...markdownProps} />;
}

export default Markdown;