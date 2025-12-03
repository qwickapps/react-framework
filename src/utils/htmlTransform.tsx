/**
 * HTML Transform Utilities - Shared transformation logic for HTML content
 * 
 * Provides configurable HTML element transformation rules to convert
 * standard HTML elements into Framework components.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Box } from '@mui/material';
import React from 'react';
import { ComponentTransformer } from '../schemas/transformers/ComponentTransformer';

export interface TransformRule {
  selector: string;
  transform: (element: Element, key: string) => React.ReactNode;
}

export interface TransformConfig {
  rules: TransformRule[];
  sanitize?: boolean;
  sanitizeOptions?: Record<string, unknown>;
  fallbackComponent?: (element: Element, key: string) => React.ReactNode;
}

/**
 * Default transformation rules for article/blog content
 */
export const defaultArticleRules: TransformRule[] = [
  // Pre + Code blocks → Code component via ComponentTransformer
  {
    selector: 'pre',
    transform: (element: Element, key: string) => {
      const codeChild = element.querySelector('code');
      if (!codeChild) return null;

      const language = Array.from(codeChild.classList)
        .find(cls => cls.startsWith('language-'))
        ?.replace('language-', '') || 'text';

      // Use ComponentTransformer to create Code component
      const codeData = {
        tagName: 'Code',
        version: '1.0.0',
        data: {
          language,
          showCopy: true,
          showLineNumbers: false,
          children: codeChild.textContent || ''
        }
      };

      return (
        <Box key={key} sx={{ my: 1.5 }}>
          {ComponentTransformer.deserialize(codeData)}
        </Box>
      );
    }
  },

  // Standalone complex code blocks → Code component
  {
    selector: 'code',
    transform: (element: Element, key: string) => {
      // Skip if inside pre (already handled above)
      if (element.closest('pre')) return null;

      const text = element.textContent || '';
      const hasMultipleLines = text.includes('\n');
      const hasComplexContent = element.children.length > 0;

      // Check if code is in an inline context (would violate DOM nesting rules)
      const inlineParents = ['p', 'span', 'a', 'strong', 'em', 'b', 'i', 'u', 'small'];
      const isInInlineContext = inlineParents.some(tag => element.closest(tag));

      if ((hasMultipleLines || hasComplexContent) && !isInInlineContext) {
        // Use ComponentTransformer to create Code component
        const codeData = {
          tagName: 'Code',
          version: '1.0.0',
          data: {
            language: 'text',
            showCopy: true,
            showLineNumbers: false,
            children: text
          }
        };

        return (
          <Box key={key} sx={{ my: 1.5 }}>
            {ComponentTransformer.deserialize(codeData)}
          </Box>
        );
      }

      return null; // Let default handling take over
    }
  },

  // Blog sections → Section component
  {
    selector: 'section.blog-section',
    transform: (element: Element, key: string) => {
      const children = Array.from(element.children);
      const title = element.querySelector('h2')?.textContent || '';
      const content = children.filter(child => child.tagName !== 'H2');
      const spacing = element.getAttribute('data-padding') || 'none';

      // Use ComponentTransformer to create Section component
      const sectionData = {
        tagName: 'Section',
        version: '1.0.0',
        data: {
          padding: spacing || 'medium',
          children: [
            title && {
              tagName: 'Typography',
              version: '1.0.0',
              data: {
                variant: 'h4',
                component: 'h2',
                sx: { mb: 2 },
                children: title
              }
            },
            ...content.map((child, index) =>
              transformElement(child, `${key}-${index}`, { rules: defaultArticleRules })
            )
          ].filter(Boolean)
        }
      };

      return ComponentTransformer.deserialize(sectionData);
    }
  },

  // Button elements → Button component
  {
    selector: 'button',
    transform: (element: Element) => {
      const text = element.textContent || '';
      const variant = element.getAttribute('data-variant') || 'contained';
      const disabled = element.hasAttribute('disabled');

      // Use ComponentTransformer to create Button component
      const buttonData = {
        tagName: 'Button',
        version: '1.0.0',
        data: {
          variant,
          disabled,
          label: text
        }
      };

      return ComponentTransformer.deserialize(buttonData);
    }
  }
];

/**
 * Transform rules optimized for Markdown content
 */
export const defaultMarkdownRules: TransformRule[] = [
  // Pre + Code blocks → Code component (same as article)
  {
    selector: 'pre',
    transform: (element: Element, key: string) => {
      const codeChild = element.querySelector('code');
      if (!codeChild) return null;

      const language = Array.from(codeChild.classList)
        .find(cls => cls.startsWith('language-'))
        ?.replace('language-', '') || 'text';

      // Use ComponentTransformer to create Code component
      const codeData = {
        tagName: 'Code',
        version: '1.0.0',
        data: {
          language,
          showCopy: true,
          showLineNumbers: false,
          children: codeChild.textContent || ''
        }
      };

      return (
        <Box key={key} sx={{ my: 1.5 }}>
          {ComponentTransformer.deserialize(codeData)}
        </Box>
      );
    }
  },

  // Inline code → preserve as regular code element (no transformation)
  {
    selector: 'code',
    transform: (element: Element) => {
      // Skip if inside pre (already handled above)
      if (element.closest('pre')) return null;

      // For Markdown, keep inline code as-is
      return null;
    }
  }
];

/**
 * Parse style string into React style object
 */
function parseStyleString(styleStr: string): React.CSSProperties {
  const styles: React.CSSProperties = {};
  
  if (!styleStr) return styles;
  
  styleStr.split(';').forEach(declaration => {
    const [property, value] = declaration.split(':').map(s => s.trim());
    if (property && value) {
      // Convert kebab-case to camelCase
      const camelProperty = property.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      styles[camelProperty as keyof React.CSSProperties] = value as string;
    }
  });
  
  return styles;
}

/**
 * Default fallback component - renders element as-is with SafeSpan content
 */
export const defaultFallback = (element: Element, key: string): React.ReactNode => {
  const tagName = element.tagName.toLowerCase();

  // Check if this is a void element (self-closing)
  const voidElements = new Set([
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
    'link', 'meta', 'param', 'source', 'track', 'wbr'
  ]);

  // Handle style attribute separately to convert to object
  const styleAttr = element.getAttribute('style');
  const style = styleAttr ? parseStyleString(styleAttr) : undefined;

  const props = {
    key,
    ...(element.className ? { className: element.className } : {}),
    ...(element.id ? { id: element.id } : {}),
    ...(style ? { style } : {}),
    ...Object.fromEntries(
      Array.from(element.attributes)
        .filter(attr => !['class', 'id', 'style'].includes(attr.name))
        .map(attr => [attr.name, attr.value])
    )
  };

  if (voidElements.has(tagName)) {
    // Void elements can't have children
    return React.createElement(tagName, props);
  }

  // Regular elements with content
  return React.createElement(
    tagName,
    props,
    element.innerHTML
  );
};

/**
 * Check if an element needs recursive processing
 */
function needsRecursiveTransform(element: Element, rules: TransformRule[]): boolean {
  const children = Array.from(element.children);

  return children.some(child => {
    // Check if any rule applies to this child
    const matchingRule = rules.find(rule => child.matches(rule.selector));
    if (matchingRule) return true;

    // Check if child has transformable descendants
    return rules.some(rule => child.querySelector(rule.selector));
  });
}

/**
 * Transform a single HTML element to React component
 */
export function transformElement(
  element: Element, 
  key: string, 
  config: TransformConfig = { rules: defaultArticleRules }
): React.ReactNode {
  const { rules, fallbackComponent = defaultFallback } = config;

  // Try to find a matching rule for this element
  const matchingRule = rules.find(rule => element.matches(rule.selector));
  if (matchingRule) {
    const result = matchingRule.transform(element, key);
    if (result !== null) return result;
  }

  // Check if this element needs recursive processing
  if (needsRecursiveTransform(element, rules)) {
    const children = Array.from(element.children);
    const tagName = element.tagName.toLowerCase();

    const transformedChildren = children.map((child, index) =>
      transformElement(child, `${key}-${index}`, config)
    );

    // Handle style attribute separately to convert to object
    const styleAttr = element.getAttribute('style');
    const style = styleAttr ? parseStyleString(styleAttr) : undefined;

    return React.createElement(
      tagName,
      {
        key,
        ...(element.className ? { className: element.className } : {}),
        ...(element.id ? { id: element.id } : {}),
        ...(style ? { style } : {}),
        ...Object.fromEntries(
          Array.from(element.attributes)
            .filter(attr => !['class', 'id', 'style'].includes(attr.name))
            .map(attr => [attr.name, attr.value])
        )
      },
      ...transformedChildren
    );
  }

  // No transformation needed - use fallback
  return fallbackComponent(element, key);
}

/**
 * Clean up invalid DOM nesting that can cause React errors
 */
function cleanupInvalidNesting(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  // Find paragraphs that contain block-level elements (invalid nesting)
  const paragraphs = doc.querySelectorAll('p');
  const blockElements = ['div', 'section', 'article', 'aside', 'header', 'footer', 'nav', 'main', 'figure', 'blockquote', 'pre', 'table', 'form', 'fieldset', 'address'];
  
  paragraphs.forEach(p => {
    const hasBlockChildren = Array.from(p.children).some(child => 
      blockElements.includes(child.tagName.toLowerCase())
    );
    
    if (hasBlockChildren) {
      // Convert paragraph to div to allow block children
      const div = doc.createElement('div');
      div.innerHTML = p.innerHTML;
      
      // Copy attributes
      Array.from(p.attributes).forEach(attr => {
        div.setAttribute(attr.name, attr.value);
      });
      
      p.parentNode?.replaceChild(div, p);
    }
  });
  
  return doc.body.innerHTML;
}

/**
 * Transform HTML string to React components
 */
export function transformHtmlToReact(
  html: string,
  config: TransformConfig = { rules: defaultArticleRules }
): React.ReactNode[] {
  if (!html.trim()) return [];

  // Clean up invalid DOM nesting first
  const cleanHtml = cleanupInvalidNesting(html);
  
  const parser = new DOMParser();
  const doc = parser.parseFromString(cleanHtml, 'text/html');
  
  return Array.from(doc.body.children).map((element, index) =>
    transformElement(element, index.toString(), config)
  );
}

/**
 * Strip header elements from HTML content (for articles)
 */
export function stripHeaderFromContent(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // Remove header elements that are handled by PageBannerHeader
  const elementsToRemove = [
    'header.blog-header',
    '.blog-header',
    'header[class*="blog"]',
  ];

  elementsToRemove.forEach(selector => {
    const elements = doc.querySelectorAll(selector);
    elements.forEach(el => el.remove());
  });

  // Remove standalone h1 if it's the first child and looks like a title
  const firstChild = doc.body.firstElementChild;
  if (firstChild && firstChild.tagName === 'H1') {
    firstChild.remove();
  }

  return doc.body.innerHTML;
}