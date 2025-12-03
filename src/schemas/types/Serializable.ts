/**
 * Serializable Interface - Component Serialization System Foundation
 * 
 * Defines the contract for components that can be serialized to/from JSON
 * for "WebView for React" functionality.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { ReactElement } from 'react';

/**
 * Interface for components that support JSON serialization
 * Components implementing this interface can be transformed between
 * React elements and serializable JSON data structures
 */
export interface Serializable {
  /**
   * Convert component instance to JSON data
   * @returns Serializable data structure
   */
  toJson(): unknown;
}

/**
 * Interface for serializable component constructor
 * Defines static methods and properties required for component classes
 * Components implementing this interface must declare their own identity
 */
export interface SerializableConstructor {
  /**
   * Component's unique tag name for serialization
   * Must be unique across all registered components
   */
  readonly tagName: string;
  
  /**
   * Component's version for serialization format compatibility
   * Should follow semantic versioning (e.g., "1.0.0")
   */
  readonly version: string;
  
  /**
   * Convert JSON data to a React element
   * @param jsonData - Serialized component data
   * @returns React element representing the component
   */
  fromJson(jsonData: unknown): ReactElement;
  
  new (...args: unknown[]): Serializable;
}