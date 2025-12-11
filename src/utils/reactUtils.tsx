/**
 * QwickApps React Framework - React Utilities
 * This module provides utility functions for React components in the QwickApps React Framework.
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { ReactNode } from 'react';

/**
 * Extract text content from ReactNode for code processing
 * Handles natural React usage like <Code>const x = 1;</Code>
 *
 * @param node - The ReactNode to extract text from
 * @returns String representation of the node's text content
 */
export function extractTextFromReactNode(node: ReactNode): string {
  if (node === null || node === undefined) {
    return '';
  }

  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (typeof node === 'boolean') {
    return node ? 'true' : 'false';
  }

  if (Array.isArray(node)) {
    return node.map((child) => extractTextFromReactNode(child)).join('');
  }

  // For React elements, try to extract text content
  if (typeof node === 'object' && node !== null && 'props' in node) {
    const element = node as { props?: { children?: ReactNode } };
    if (element.props && element.props.children) {
      return extractTextFromReactNode(element.props.children);
    }
  }

  // Fallback: convert to string
  return String(node);
}
