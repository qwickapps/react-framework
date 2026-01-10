/**
 * ComponentTransformer - Core component serialization and HTML pattern transformation system
 * 
 * Enables "WebView for React" functionality by providing serialization
 * and deserialization of React components to/from JSON structures.
 * Also supports HTML pattern-based transformations where components can
 * register HTML patterns they can handle.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React, { ReactNode, ReactElement } from 'react';
import { SerializableConstructor } from '../types/Serializable';
import { ReactNodeTransformer } from './ReactNodeTransformer';
import SafeSpan from '../../components/SafeSpan';

/**
 * Registry for component classes that support serialization
 */
const componentRegistry = new Map<string, SerializableConstructor>();

/**
 * Registry for HTML pattern handlers
 */
const patternRegistry = new Map<string, PatternHandler>();

/**
 * Type for HTML pattern transformation handlers
 */
export type PatternHandler = (element: Element) => unknown;

/**
 * Strict mode: throw on unregistered components
 * When true, the transformer will throw errors instead of using fallback
 */
let strictMode = true;

/**
 * Fallback tag for unregistered components / html / text (legacy mode only)
 */
const FALLBACK_TAG = '__react_node__';
const FALLBACK_VERSION = '1.0.0';

/**
 * Core transformer for React component serialization
 * Provides static methods for component registration and transformation
 */
export class ComponentTransformer {
  /**
   * Enable or disable strict mode
   * @param enabled - Whether to enable strict mode (throws on unregistered components)
   */
  static setStrictMode(enabled: boolean): void {
    strictMode = enabled;
  }

  /**
   * Check if strict mode is enabled
   * @returns True if strict mode is enabled
   */
  static isStrictMode(): boolean {
    return strictMode;
  }

  /**
   * Register a component class for serialization
   * Component must declare its own tagName and version via static properties
   * @param componentClass - Component class that implements Serializable interface
   */
  static registerComponent(componentClass: SerializableConstructor): void {
    const { tagName, version } = componentClass;

    if (!tagName || typeof tagName !== 'string') {
      throw new Error(`Component class must have a static 'tagName' property`);
    }

    if (!version || typeof version !== 'string') {
      throw new Error(`Component class '${tagName}' must have a static 'version' property`);
    }

    if (typeof (componentClass as { fromJson?: unknown }).fromJson !== 'function') {
      throw new Error(`Component class '${tagName}' must implement static 'fromJson' method`);
    }

    if (componentRegistry.has(tagName)) {
      console.warn(`Component '${tagName}' is already registered. Overwriting existing registration.`);
    }

    componentRegistry.set(tagName, componentClass);

    // Register HTML patterns if component supports them
    const classWithPatterns = componentClass as SerializableConstructor & { registerPatternHandlers?: (transformer: typeof ComponentTransformer) => void };
    if (typeof classWithPatterns.registerPatternHandlers === 'function') {
      classWithPatterns.registerPatternHandlers(ComponentTransformer);
    }
  }

  /**
   * Serialize React node(s) to JSON string
   * In strict mode: throws on unregistered components
   * In legacy mode: uses fallback tag for unregistered components/html/text
   */
  static serialize(node: ReactNode | ReactNode[]): string {
    const serializedData = ComponentTransformer.serializeNode(node);
    return JSON.stringify(serializedData);
  }

  /**
   * Deserialize JSON input to React node(s)
   * In strict mode: throws on unregistered components
   * In legacy mode: never throws; always returns a valid ReactNode (or array) or null
   * - Strings: try JSON.parse; if fails, return the string as a text node
   * - Objects/arrays: only schema objects are transformed; non-schema become text via JSON.stringify
   */
  static deserialize(input: string | object | object[]): ReactNode | ReactNode[] {
    if (typeof input === 'string') {
      try {
        const parsed = JSON.parse(input);
        return ComponentTransformer.deserializeData(parsed);
      } catch {
        // Not JSON; plain string is a valid ReactNode
        return input;
      }
    }

    if (input == null) return null;
    return ComponentTransformer.deserializeData(input);
  }

  /**
 * Type guard for serialized component schema objects
 * Requires: { tagName: string; version: string; data: unknown }
 * Optional: key?: string
 */
  private static isSerializedComponent(obj: unknown): obj is { tagName: string; version: string; data: unknown; key?: string } {
    return !!obj
      && typeof obj === 'object'
      && typeof (obj as { tagName?: string }).tagName === 'string'
      && typeof (obj as { version?: string }).version === 'string'
      && 'data' in obj;
  }

  /**
   * Internal method to deserialize data back to React nodes
   * @param data - Data to deserialize
   * @returns React node(s)
   */
  private static deserializeData(data: unknown): ReactNode | ReactNode[] {
    if (data == null) return null;

    // Arrays: map recursively
    if (Array.isArray(data)) {
      return data.map(item => ComponentTransformer.deserializeData(item));
    }

    if (ComponentTransformer.isSerializedComponent(data)) {
      const { key, tagName, data: componentData } = data;

      try {
        const componentClass = componentRegistry.get(tagName);

        if (!componentClass) {
          if (strictMode) {
            throw new Error(`Component '${tagName}' is not registered in strict mode`);
          }
          // Legacy fallback
          const node = ComponentTransformer.deserializeUnregisteredComponent(componentData);
          return key ? React.cloneElement(node as ReactElement, { key }) : node;
        }

        const node = componentClass.fromJson(data);
        // Apply key if provided
        return key ? React.cloneElement(node as ReactElement, { key }) : node;
      } catch (error) {
        if (strictMode) {
          throw error; // Re-throw in strict mode
        }
        console.error(`TEST: Error deserializing component '${tagName}':`, error);
      }
    }

    // Handle primitives that are valid React children
    if (typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean') {
      return data;
    }

    // For objects, we can't render them directly
    console.warn(`TEST: Unrecognized data:`, data);

    // In development, show debug info; in production, return null
    if (process.env.NODE_ENV !== 'production') {
      const displayText = typeof data === 'object' ? JSON.stringify(data, null, 2) : String(data);
      return React.createElement(SafeSpan, { html: `<pre>${displayText}</pre>` });
    }

    return null;
  }

  /**
   * Internal method to serialize a single React node
   * @param node - React node to serialize
   * @returns Serializable data structure { tagName, version, data }
   */
  private static serializeNode(node: unknown): unknown {
    if (node == null) return null;

    // Handle arrays of nodes (produce array of schema objects/null)
    if (Array.isArray(node)) {
      return node.map(child => ComponentTransformer.serializeNode(child));
    }

    // Handle primitive values (strings, numbers, booleans) - these are valid React children
    if (typeof node === 'string' || typeof node === 'number' || typeof node === 'boolean') {
      return node;
    }

    // React elements
    if (typeof node === 'object' && 'type' in node) {
      const element = node as ReactElement;
      const key = element.key ? { key: String(element.key) } : {};

      // Registered component?
      const componentType = element.type;
      if (typeof componentType === 'function') {
        const tagName = ComponentTransformer.findTagNameForComponent(componentType);
        if (tagName) {
          const componentClass = componentRegistry.get(tagName)!;

          let serializedData: unknown = null;
          const classWithToJson = componentClass as SerializableConstructor & { toJson?: (props: unknown) => unknown };
          if (typeof classWithToJson.toJson === 'function') {
            serializedData = classWithToJson.toJson(element.props);
          }

          if (serializedData !== null) {
            // Process children recursively if they exist in the data
            if (serializedData.data && serializedData.data.children !== undefined) {
              serializedData.data.children = ComponentTransformer.serializeNode(serializedData.data.children);
            }
            
            const result = {
              ...key,
              ...serializedData
            };
            
            return result;
          }
        } else if (strictMode) {
          // In strict mode, throw if we can't find a tag name for the component
          const typeWithName = componentType as { displayName?: string; name?: string };
          const componentName = typeWithName.displayName || typeWithName.name || 'Unknown';
          throw new Error(`Unregistered component '${componentName}' cannot be serialized in strict mode`);
        }
      }
    }

    if (strictMode) {
      throw new Error(`Cannot serialize unregistered node in strict mode: ${typeof node === 'object' && node && 'type' in node ? node.type : typeof node}`);
    }

    const result = {
      tagName: FALLBACK_TAG,
      version: FALLBACK_VERSION,
      data: ReactNodeTransformer.serialize(node)
    };
    
    return result;
  }

  /**
   * Deserialize unregistered nodes using ReactNodeTransformer
   * @param data - Serialized data from ReactNodeTransformer
   * @returns React node
   */
  private static deserializeUnregisteredComponent(data: unknown): ReactNode {
    return ReactNodeTransformer.deserialize(data);
  }

  /**
   * Find the tag name for a given component constructor
   * @param componentType - Component constructor function
   * @returns Tag name or null if not found
   */
  private static findTagNameForComponent(componentType: unknown): string | null {
    // Direct constructor match
    for (const [tagName, registeredClass] of componentRegistry.entries()) {
      if (registeredClass === componentType) return tagName;
    }

    // If the component exposes a tagName, prefer it
    const explicitTag = componentType?.tagName;
    if (typeof explicitTag === 'string' && componentRegistry.has(explicitTag)) {
      return explicitTag;
    }

    // Unwrap common HOC/wrapper names
    const name: string | undefined = componentType?.displayName || componentType?.name;
    if (name) {
      // ForwardRef(Typography) -> Typography, Styled(Typography) -> Typography
      // WithDataBinding(Text) -> Text, TextWithDataBinding -> Text
      const unwrapped =
        name.replace(/^[A-Za-z]+?\(([^)]+)\)$/, '$1')
            .replace(/WithDataBinding$/, '');

      if (componentRegistry.has(unwrapped)) return unwrapped;
      if (componentRegistry.has(name)) return name;
    }

    return null;
  }

  /**
   * Get list of registered component tags (for debugging/testing)
   * @returns Array of registered tag names
   */
  static getRegisteredComponents(): string[] {
    return Array.from(componentRegistry.keys());
  }

  /**
   * Clear all registered components (for testing)
   */
  static clearRegistry(): void {
    componentRegistry.clear();
    patternRegistry.clear();
  }

  // HTML Pattern Methods

  /**
   * Register an HTML pattern handler
   * @param pattern - CSS selector pattern (e.g., 'pre code', 'section.blog-section')
   * @param handler - Function to transform matching elements to component data
   */
  static registerPattern(pattern: string, handler: PatternHandler): void {
    if (patternRegistry.has(pattern)) {
      console.warn(`Pattern '${pattern}' is already registered. Overwriting existing handler.`);
    }
    patternRegistry.set(pattern, handler);
  }

  /**
   * Check if a pattern is registered
   * @param pattern - CSS selector pattern to check
   * @returns True if pattern is registered
   */
  static hasPattern(pattern: string): boolean {
    return patternRegistry.has(pattern);
  }

  /**
   * Transform an HTML element to React component if a matching pattern exists
   * @param element - DOM Element to transform
   * @returns React node if pattern matches, null otherwise
   */
  static transformHTMLElement(element: Element): ReactNode | null {
    for (const [pattern, handler] of patternRegistry) {
      if (element.matches(pattern)) {
        try {
          const componentData = handler(element);
          return ComponentTransformer.deserialize(componentData);
        } catch (error) {
          console.warn(`Error transforming element with pattern '${pattern}':`, error);
          return null;
        }
      }
    }
    return null;
  }

  /**
   * Transform HTML string to React nodes using registered patterns
   * @param html - HTML string to transform
   * @returns Array of React nodes
   */
  static transformHTML(html: string): ReactNode[] {
    if (!html.trim()) return [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return Array.from(doc.body.children).map((element, index) =>
      ComponentTransformer.transformElement(element, `element-${index}`)
    );
  }

  /**
   * Recursively transform an element and its children
   * @param element - DOM Element to transform
   * @param key - React key for the element
   * @returns React node
   */
  private static transformElement(element: Element, key: string): ReactNode {
    const transformedNode = ComponentTransformer.transformHTMLElement(element);
    if (transformedNode) return transformedNode;

    const children = Array.from(element.children);
    const hasTransformableChildren = children.some(child =>
      Array.from(patternRegistry.keys()).some(pattern => child.matches(pattern))
    );

    if (hasTransformableChildren) {
      const transformedChildren = children.map((child, index) =>
        ComponentTransformer.transformElement(child, `${key}-${index}`)
      );

      return React.createElement(
        element.tagName.toLowerCase(),
        {
          key,
          className: element.className || undefined,
          id: element.id || undefined
        },
        transformedChildren
      );
    }

    // Fallback - use ReactNodeTransformer to handle as unregistered HTML
    const tagName = element.tagName.toLowerCase();

    // Void elements (self-closing tags) cannot have innerHTML
    // https://developer.mozilla.org/en-US/docs/Glossary/Void_element
    const voidElements = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
                          'link', 'meta', 'param', 'source', 'track', 'wbr'];

    const isVoidElement = voidElements.includes(tagName);

    return ReactNodeTransformer.deserialize({
      type: 'react-element',
      elementType: tagName,
      props: {
        key,
        className: element.className || undefined,
        id: element.id || undefined,
        ...(isVoidElement ? {} : { dangerouslySetInnerHTML: { __html: element.innerHTML } })
      }
    });
  }

  /**
   * Get list of registered patterns (for debugging/testing)
   * @returns Array of registered patterns
   */
  static getRegisteredPatterns(): string[] {
    return Array.from(patternRegistry.keys());
  }
}