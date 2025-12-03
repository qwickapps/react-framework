/**
 * MockSerializableComponent - Test helper component implementing new SerializableConstructor interface
 * 
 * NOTE: This is not a test file - it's a helper module for testing.
 * Jest should not run this as a test suite.
 * 
 * Demonstrates component self-declaration pattern with static tagName and version properties
 * Used for testing the updated ComponentTransformer architecture
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React, { ReactElement } from 'react';
import { Serializable, SerializableConstructor } from '../../../schemas';

/**
 * Mock component implementing the new Serializable interface with self-declaration
 */
export class MockSerializableComponent implements Serializable {
  static readonly tagName = 'MockComponent';
  static readonly version = '1.0.0';

  constructor(public props: { 
    title?: string; 
    content?: string; 
    variant?: string;
    children?: React.ReactNode;
  }) {}

  static fromJson(jsonData: Record<string, unknown>): ReactElement {
    return React.createElement('div', {
      className: `mock-component ${(jsonData.variant as string) || 'default'}`,
      'data-testid': 'mock-component'
    }, ([
      jsonData.title && React.createElement('h3', { key: 'title' }, jsonData.title as string),
      jsonData.content && React.createElement('p', { key: 'content' }, jsonData.content as string),
      jsonData.children
    ].filter(Boolean) as React.ReactNode[]));
  }

  toJson(): Record<string, unknown> {
    return {
      title: this.props.title,
      content: this.props.content,
      variant: this.props.variant,
      children: this.props.children
    };
  }
}

// Type assertion to ensure it meets the interface requirements
export const MockSerializableComponentClass = MockSerializableComponent as unknown as SerializableConstructor;

/**
 * Alternative mock component with different tagName and version for testing conflicts
 */
export class AlternativeMockComponent implements Serializable {
  static readonly tagName = 'AlternativeComponent';
  static readonly version = '2.1.0';

  constructor(public props: { 
    label?: string; 
    type?: string;
    active?: boolean;
  }) {}

  static fromJson(jsonData: Record<string, unknown>): ReactElement {
    return React.createElement('button', {
      className: `alt-mock ${(jsonData.type as string) || 'default'}`,
      'data-active': jsonData.active,
      'data-testid': 'alternative-mock'
    }, (jsonData.label as string) || 'Alternative Component');
  }

  toJson(): Record<string, unknown> {
    return {
      label: this.props.label,
      type: this.props.type,
      active: this.props.active
    };
  }
}

export const AlternativeMockComponentClass = AlternativeMockComponent as unknown as SerializableConstructor;

/**
 * Mock component missing required static properties (for error testing)
 */
export class InvalidMockComponent implements Serializable {
  // Missing static tagName and version properties intentionally

  constructor(public props: Record<string, unknown>) {}

  static fromJson(): ReactElement {
    return React.createElement('div', {}, 'Invalid Component');
  }

  toJson(): Record<string, unknown> {
    return {};
  }
}

export const InvalidMockComponentClass = InvalidMockComponent as unknown; // Intentionally not typed as SerializableConstructor