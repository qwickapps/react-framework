/**
 * Html Component - Transforms HTML strings into Framework components
 *
 * Accepts HTML string as children and transforms HTML elements to Framework 
 * components using configurable rules. Default transform rules include:
 * - <header> → Remove (for articles) or transform to PageBannerHeader
 * - <pre><code> → Code component with language detection
 * - <section class="blog-section"> → Section component
 * - <button> → Button component
 * - Fall back to SafeSpan for other elements
 *
 * Features:
 * - Sanitization enabled by default (lenient - allow Framework components)
 * - Configurable transformation rules
 * - TypeScript support with proper props interface
 * - Error handling and fallback to SafeSpan
 *
 * Usage:
 * - Basic: <Html>{htmlString}</Html>
 * - Custom rules: <Html transformConfig={customConfig}>{htmlString}</Html>
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Box } from '@mui/material';
import React, { ReactElement } from 'react';
import type { WithDataBinding, SchemaProps } from '@qwickapps/schema';
import { QWICKAPP_COMPONENT, useBaseProps, useDataBinding } from '../hooks';
import HtmlModel from '../schemas/HtmlSchema';
import { ComponentTransformer } from '../schemas/transformers/ComponentTransformer';
import { ModelView } from './base/ModelView';
import SafeSpan from './SafeSpan';

// Legacy types for backward compatibility (now unused internally but maintained for API)
export interface TransformConfig {
  rules?: unknown[];
  sanitize?: boolean;
  sanitizeOptions?: Record<string, unknown>;
  fallbackComponent?: (element: Element, key: string) => React.ReactNode;
}

type HtmlViewProps = SchemaProps<HtmlModel> & {
  /** Custom transformation configuration (legacy - now handled by ComponentTransformer) */
  transformConfig?: TransformConfig;
  /** Whether to sanitize HTML (legacy - now handled internally) */
  sanitize?: boolean;
  /** Custom sanitization options (legacy - now handled internally) */
  sanitizeOptions?: Record<string, unknown>;
  /** Container element type (React.ElementType for internal use, string in model for serialization) */
  component?: React.ElementType;
};

export interface HtmlProps extends HtmlViewProps, WithDataBinding {}

// View component - handles the actual rendering
function HtmlView({
  children = '',
  stripHeaders = false,
  placeholder,
  component = 'div',
  transformConfig,
  sanitize,
  sanitizeOptions,
  ...restProps
}: HtmlViewProps) {
  const { styleProps, htmlProps, restProps: otherProps } = useBaseProps(restProps);

  // Mark as QwickApp component
  Object.assign(HtmlView, { [QWICKAPP_COMPONENT]: true });

  // Return placeholder if no HTML content
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
    // Process HTML content
    let processedHtml = children;

    if (stripHeaders) {
      // Simple header stripping - remove h1, h2, etc. tags
      processedHtml = processedHtml.replace(/<h[1-6][^>]*>.*?<\/h[1-6]>/gi, '');
    }

    // Note: transformConfig, sanitize, and sanitizeOptions are legacy props
    // maintained for backward compatibility. The new ComponentTransformer system
    // handles transformation through registered patterns automatically.

    // Transform HTML to React components using ComponentTransformer
    const components = ComponentTransformer.transformHTML(processedHtml);

    // Return transformed components
    return (
      <Box
        component={component}
        {...htmlProps}
        {...styleProps}
        {...otherProps}
        sx={{
          // Ensure proper spacing between elements
          '& > *:not(:last-child)': { mb: 1.5 },
          // Header styling when headers are present
          '& h1, & h2, & h3, & h4, & h5, & h6': {
            mb: 1.5,
            mt: 2,
            '&:first-of-type': {
              mt: 0
            }
          },
          // Paragraph spacing
          '& p': {
            mb: 1.5,
            lineHeight: 1.6
          },
          // List styling
          '& ul, & ol': {
            mb: 1.5,
            pl: 3
          },
          ...styleProps.sx
        }}
      >
        {components}
      </Box>
    );

  } catch (error) {
    console.error('Error transforming HTML content:', error);

    // Fallback to SafeSpan in development, null in production
    if (process.env.NODE_ENV !== 'production') {
      return (
        <Box
          component={component}
          {...htmlProps}
          {...styleProps}
          {...otherProps}
          sx={{
            p: 2,
            border: '1px solid red',
            borderRadius: 1,
            backgroundColor: 'rgba(255, 0, 0, 0.1)',
            ...styleProps.sx
          }}
        >
          <strong>HTML Transform Error:</strong> {error instanceof Error ? error.message : 'Unknown error'}
          <SafeSpan html={children} placeholder="Failed to transform HTML" />
        </Box>
      );
    }

    // Production fallback - use SafeSpan
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

// Main component with data binding support and serialization capability
export class Html extends ModelView<HtmlProps> {
  // Component self-declaration for serialization
  static readonly tagName = 'Html';
  static readonly version = '1.0.0';

  // Deserialization: JSON data → React element
  static fromJson(jsonData: Record<string, unknown>): ReactElement {
    const { tagName, version, data } = jsonData;
    if (tagName !== Html.tagName) {
      throw new Error(`Cannot deserialize: Expected tagName 'Html' but got '${tagName}'`);
    }
    if (version !== Html.version) {
      console.warn(`Version mismatch: Expected ${Html.version} but got ${version}`);
    }

    const typedData = (data as Record<string, unknown>) || {};
    const { children, ...props } = typedData;
    // Children should be a string (HTML content), not deserialized React nodes
    return <Html {...props}>{children as string}</Html>;
  }

  // Component-specific serialization properties
  protected getComponentSpecificProps(): Record<string, unknown> {
    return {
      children: this.props.children,
      stripHeaders: this.props.stripHeaders,
      placeholder: this.props.placeholder
    };
  }

  // Html component renders traditional props view
  protected renderView(): React.ReactElement {
    const { ...restProps } = this.props;
    return <HtmlView {...restProps} />;
  }

  // Html component renders data-bound view
  protected renderWithDataBinding(): React.ReactElement {
    return <HtmlWithDataBinding {...this.props} />;
  }

  // Register HTML patterns that Html component can handle
  static registerPatternHandlers(registry: Record<string, unknown>): void {
    const typedRegistry = registry as { hasPattern?: (pattern: string) => boolean; registerPattern?: (pattern: string, handler: (element: Element) => Record<string, unknown>) => void };

    // Register div elements with specific classes for Html transformation
    if (typedRegistry.hasPattern && !typedRegistry.hasPattern('div.html-content')) {
      typedRegistry.registerPattern?.('div.html-content', Html.transformHtmlDiv);
    }

    // Register elements with data-html attribute
    if (typedRegistry.hasPattern && !typedRegistry.hasPattern('[data-html]')) {
      typedRegistry.registerPattern?.('[data-html]', Html.transformDataHtml);
    }
  }

  // Transform div with html-content class to Html component
  private static transformHtmlDiv(element: Element): Record<string, unknown> {
    const stripHeaders = element.getAttribute('data-strip-headers') === 'true';
    const placeholder = element.getAttribute('data-placeholder');

    return {
      tagName: 'Html',
      props: {
        children: element.innerHTML,
        stripHeaders,
        placeholder: placeholder || undefined
      }
    };
  }

  // Transform elements with data-html attribute to Html component
  private static transformDataHtml(element: Element): Record<string, unknown> {
    const htmlContent = element.getAttribute('data-html') || element.innerHTML;
    const stripHeaders = element.getAttribute('data-strip-headers') === 'true';
    const placeholder = element.getAttribute('data-placeholder');

    return {
      tagName: 'Html',
      props: {
        children: htmlContent,
        stripHeaders,
        placeholder: placeholder || undefined
      }
    };
  }
}

// Helper component to handle data binding with hooks (since we can't use hooks in class components)
function HtmlWithDataBinding(props: HtmlProps) {
  const { dataSource, bindingOptions, ...restProps } = props;

  // Use data binding
  const { loading, error, ...htmlProps } = useDataBinding<HtmlModel>(
    dataSource!,
    restProps as Partial<HtmlModel>
  );

  // Show loading state
  if (loading) {
    return (
      <Box sx={{ p: 2, textAlign: 'center', opacity: 0.6 }}>
        Loading HTML content...
      </Box>
    );
  }

  if (error) {
    console.error('Error loading HTML content:', error);
    if (process.env.NODE_ENV !== 'production') {
      return (
        <Box sx={{ p: 2, border: '1px solid red', borderRadius: 1, backgroundColor: 'rgba(255, 0, 0, 0.1)' }}>
          <strong>Error Loading HTML:</strong> {error.message}
        </Box>
      );
    }
    return null;
  }

  return <HtmlView {...htmlProps} />;
}

export default Html;