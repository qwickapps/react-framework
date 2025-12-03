/**
 * SafeSpan Component - Safely renders HTML content with sanitization
 * 
 * Enhanced with data binding support through dataSource prop.
 * 
 * Usage:
 * - Traditional: <SafeSpan html="<p>Hello</p>" placeholder="Loading..." />
 * - Data-driven: <SafeSpan dataSource="company.description" />
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { WithDataBinding, SchemaProps } from '@qwickapps/schema';
import sanitizeHtml from 'sanitize-html';
import { QWICKAPP_COMPONENT, useBaseProps, useDataBinding } from '../hooks';
import SafeSpanModel from '../schemas/SafeSpanSchema';
import { ModelView } from './base/ModelView';

type SafeSpanViewProps = SchemaProps<SafeSpanModel>;
export interface SafeSpanProps extends SafeSpanViewProps, WithDataBinding {}

// View component - handles the actual rendering
function SafeSpanView(props: SafeSpanViewProps) {
  const { html, placeholder, ...restProps } = props;
  const { styleProps, htmlProps } = useBaseProps(restProps);
  
  // Mark as QwickApp component
  (SafeSpanView as Record<string, unknown>)[QWICKAPP_COMPONENT] = true;
  
  // Enhanced HTML sanitization with strict security configuration
  const sanitizeOptions = {
    allowedTags: [
      'p', 'br', 'strong', 'em', 'u', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'a', 'img'
    ],
    allowedAttributes: {
      'a': ['href', 'title', 'target'],
      'img': ['src', 'alt', 'title', 'width', 'height'],
      'span': ['style', 'class'],
      'div': ['style', 'class'],
      'p': ['style', 'class']
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    disallowedTagsMode: 'discard' as const,
    allowedSchemesByTag: {
      'a': ['http', 'https', 'mailto'],
      'img': ['http', 'https']
    },
    transformTags: {
      'a': function(tagName: string, attribs: Record<string, string>) {
        // Add security attributes to external links
        if (attribs.href && (attribs.href.startsWith('http://') || attribs.href.startsWith('https://'))) {
          return {
            tagName: 'a',
            attribs: {
              ...attribs,
              rel: 'noopener noreferrer',
              target: '_blank'
            }
          };
        }
        return { tagName, attribs };
      }
    }
  };

  const sanitizedHtml = html ? sanitizeHtml(html, sanitizeOptions) : '';

  // If no content and no placeholder, return null
  if (!sanitizedHtml && !placeholder) {
    return null;
  }

  // If no content but has placeholder, render placeholder as plain text
  if (!sanitizedHtml && placeholder) {
    return (
      <span
        {...htmlProps}
        {...styleProps}
      >
        {placeholder}
      </span>
    );
  }
  
  // Render sanitized HTML content
  return (
    <span
      {...htmlProps}
      {...styleProps}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}

// Main component with data binding support and serialization capability
export class SafeSpan extends ModelView<SafeSpanProps, SafeSpanModel> {
  // Component self-declaration for serialization
  static readonly tagName = 'SafeSpan';
  static readonly version = '1.0.0';
  
  // Component-specific serialization properties
  protected getComponentSpecificProps(): unknown {
    return {
      html: this.props.html,
      placeholder: this.props.placeholder
    };
  }

  // SafeSpan component renders traditional props view
  protected renderView(): React.ReactElement {
    const { ...restProps } = this.props;
    return <SafeSpanView {...restProps} />;
  }

  // SafeSpan component renders data-bound view
  protected renderWithDataBinding(): React.ReactElement {
    return <SafeSpanWithDataBinding {...this.props} />;
  }

  // Register HTML patterns that SafeSpan component can handle
  static registerPatternHandlers(registry: unknown): void {
    // Register span elements with specific classes or attributes
    if (!registry.hasPattern('span.safe-content')) {
      registry.registerPattern('span.safe-content', SafeSpan.transformSafeSpan);
    }
    
    // Register span elements with data-safe attribute
    if (!registry.hasPattern('span[data-safe]')) {
      registry.registerPattern('span[data-safe]', SafeSpan.transformSafeSpan);
    }
  }

  // Transform span elements to SafeSpan component
  private static transformSafeSpan(element: Element): unknown {
    const placeholder = element.getAttribute('data-placeholder');
    
    return {
      tagName: 'SafeSpan',
      props: {
        html: element.innerHTML,
        placeholder: placeholder || undefined
      }
    };
  }
}

// Helper component to handle data binding with hooks (since we can't use hooks in class components)
function SafeSpanWithDataBinding(props: SafeSpanProps) {
  const { dataSource, bindingOptions, ...restProps } = props;

  // Use data binding
  const { loading, error, ...safeSpanProps } = useDataBinding<SafeSpanModel>(
    dataSource!,
    restProps as Partial<SafeSpanModel>,
    SafeSpanModel.getSchema(),
    { cache: true, cacheTTL: 300000, strict: false, ...bindingOptions }
  );

  // Show loading state
  if (loading) {
    return <span>Loading...</span>;
  }

  if (error) {
    console.error('Error loading safe span:', error);
    if (process.env.NODE_ENV !== 'production') {
      return <span>Error Loading Content: {error.message}</span>;
    }
    return null;
  }

  return <SafeSpanView {...safeSpanProps} />;
}

export default SafeSpan;