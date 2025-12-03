/**
 * QwickApps React Framework - React Utilities
 * This module provides utility functions for React components in the QwickApps React Framework.
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { ReactNode } from 'react';

/** Location type for routing */
type LocationType = { pathname: string, search: string, hash: string };

/**
 * Get the current location from browser or undefined in SSR
 * Works without relying on routing libraries
 * @returns {object | undefined} - The location object if in browser, otherwise undefined
 */
export const useSafeLocation = (): LocationType | undefined => {
  // Use browser location if available (works in any React app)
  if (typeof window !== 'undefined') {
    return {
      pathname: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash
    };
  }
  return undefined;
};

/**
 * Navigate function type
 */
export type NavigateFunction = (to: string | number, options?: unknown) => void;

/**
 * Get a navigation function with fallback to window.location
 * Works without relying on routing libraries
 * @returns {NavigateFunction} - The navigate function
 */
export const useSafeNavigate = (): NavigateFunction => {
  // Return function that uses window.location
  return (to: string | number) => {
    if (typeof to === 'string') {
      if (typeof window !== 'undefined') {
        window.location.href = to;
      }
    } else if (typeof to === 'number') {
      if (typeof window !== 'undefined' && window.history) {
        window.history.go(to);
      }
    }
  };
};

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
    return node.map(child => extractTextFromReactNode(child)).join('');
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
