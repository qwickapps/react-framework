/**
 * ReactNodeTransformer - Fallback transformer for standard React content
 * 
 * Provides serialization/deserialization for unregistered React components,
 * HTML elements, and other React content that doesn't implement the 
 * Serializable interface.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { ReactElement, ReactNode, createElement, isValidElement } from 'react';
import { Html } from '../../components/Html';

/**
 * Transformer for standard React content and HTML elements
 * Used as fallback when components are not registered in ComponentTransformer
 */
export class ReactNodeTransformer {
  /**
   * Serialize a React node to JSON-compatible structure
   * @param node - React node to serialize
   * @returns Serializable data structure
   */
  static serialize(node: ReactNode): unknown {
    if (node === null || node === undefined) {
      return null;
    }

    // Handle arrays of nodes
    if (Array.isArray(node)) {
      return {
        type: 'array',
        children: node.map(child => ReactNodeTransformer.serialize(child))
      };
    }

    // Handle primitive values
    if (typeof node === 'string' || typeof node === 'number' || typeof node === 'boolean') {
      return {
        type: 'primitive',
        value: node
      };
    }

    // Handle React elements
    if (isValidElement(node)) {
      const element = node as ReactElement;

      const comp: unknown = element.type;
      const rawName =
        typeof comp === 'string'
          ? comp
          : comp?.render?.name || comp?.name || comp?.muiName || comp?.displayName || 'Anonymous';

      // Normalize wrapper names like ForwardRef(Typography), Styled(Typography)
      const displayName =
        typeof rawName === 'string'
          ? (rawName.match(/^[A-Za-z]+?\(([^)]+)\)$/)?.[1] || rawName)
          : 'Anonymous';

      return {
        type: 'react-element',
        elementType: displayName,
        props: ReactNodeTransformer.serializeProps(element.props),
        key: element.key
      };
    }

    // Handle plain objects
    if (typeof node === 'object' && node !== null) {
      try {
        const serialized: unknown = { type: 'object', data: {} };
        for (const [key, value] of Object.entries(node)) {
          serialized.data[key] = ReactNodeTransformer.serialize(value);
        }
        return serialized;
      } catch {
        return {
          type: 'string',
          value: String(node)
        };
      }
    }

    // Fallback for other types
    return {
      type: 'string',
      value: String(node)
    };
  }

  /**
   * Deserialize data back to React node
   * @param data - Data to deserialize
   * @returns React node
   */
  static deserialize(data: unknown): ReactNode {
    if (data === null || data === undefined) {
      return null;
    }

    // Handle serialized data with type information
    if (typeof data === 'object' && data.type) {
      switch (data.type) {
        case 'primitive':
          return data.value;

        case 'string':
          return data.value;

        case 'array':
          return data.children?.map((child: unknown) => ReactNodeTransformer.deserialize(child)) || [];

        case 'react-element':
          return ReactNodeTransformer.deserializeReactElement(data);

        case 'object': {
          const result: Record<string, unknown> = {};
          if (data.data && typeof data.data === 'object') {
            for (const [key, value] of Object.entries(data.data)) {
              result[key] = ReactNodeTransformer.deserialize(value);
            }
          }
          return result;
        }

        default:
          return String(data.value || data);
      }
    }

    // Handle direct primitive values (backward compatibility)
    if (typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean') {
      return data;
    }

    // Fallback
    return String(data);
  }

  /**
   * Serialize props object, handling nested React nodes
   * @param props - Props object to serialize
   * @returns Serialized props
   */
  private static serializeProps(props: unknown): unknown {
    if (!props || typeof props !== 'object') {
      return props;
    }

    const serialized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(props)) {
      if (key === 'children') {
        // Special handling for children prop
        serialized[key] = ReactNodeTransformer.serialize(value as ReactNode);
      } else if (typeof value === 'function') {
        // Skip functions in serialization
        serialized[key] = null;
      } else {
        serialized[key] = value;
      }
    }

    return serialized;
  }

  /**
   * Deserialize React element data back to React element
   * @param data - Serialized React element data
   * @returns React element or fallback content
   */
  private static deserializeReactElement(data: unknown): ReactNode {
    const typedData = data as { elementType?: string; props?: unknown; key?: string };
    const { elementType, props, key } = typedData;

    try {
      // Handle HTML elements
      if (typeof elementType === 'string') {
        const deserializedProps = ReactNodeTransformer.deserializeProps(props) as Record<string, unknown>;

        return createElement(elementType, { key, ...deserializedProps });
      }
    } catch (error) {
      console.warn('Error deserializing React element:', error);
    }

    // Use Html component to render HTML content safely
    return createElement(Html, { key, children: props.children });
  }

  /**
   * Deserialize props object, handling nested React nodes
   * @param props - Serialized props object
   * @returns Deserialized props
   */
  private static deserializeProps(props: unknown): unknown {
    if (!props || typeof props !== 'object') {
      return props;
    }

    const deserialized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(props)) {
      if (key === 'children') {
        // Special handling for children prop
        deserialized[key] = ReactNodeTransformer.deserialize(value);
      } else {
        deserialized[key] = value;
      }
    }

    return deserialized;
  }

  /**
   * Extract text content from props for fallback rendering
   * @param props - Props object
   * @returns Text content or null
   */
  private static extractTextContent(props: unknown): string | null {
    if (!props) return null;

    if (typeof props.children === 'string') {
      return props.children;
    }

    if (props.title && typeof props.title === 'string') {
      return props.title;
    }

    if (props.label && typeof props.label === 'string') {
      return props.label;
    }

    if (props.text && typeof props.text === 'string') {
      return props.text;
    }

    return null;
  }
}