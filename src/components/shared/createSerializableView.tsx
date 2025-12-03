/**
 * createSerializableView - Factory for schema-driven components
 * 
 * Creates functional components that:
 * - Normalize schema props using normalizeViewProps
 * - Apply useBaseProps exactly once for style/html/grid processing
 * - Optionally integrate data binding (gated by enabled flag)
 * - Attach static tagName/version/fromJson/toJson for serialization
 * 
 * Works seamlessly with existing BaseComponentProps system and provides
 * the foundation for the new schema-driven architecture.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React, { ComponentType, ReactElement, ReactNode } from 'react';
// SerializableConstructor type is defined inline below
import { useBaseProps, useDataBinding, QWICKAPP_COMPONENT } from '../../hooks';
import { normalizeViewProps, ViewProps } from './viewProps';

/**
 * Helper function to convert React children to text content
 * Used for content-prop strategy to map JSX children to content strings
 */
function toText(node: ReactNode): string | undefined {
  if (node == null || typeof node === 'boolean') return undefined;
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(toText).filter(Boolean).join('');
  return undefined;
}

/**
 * Children handling strategy for serialization
 */
type ChildrenStrategy =
  | { mode: 'react-children' }
  | { mode: 'content-prop'; propName?: string };

/**
 * Component factory configuration
 */
interface CreateSerializableViewConfig<P extends ViewProps> {
  /** Component tag name for serialization */
  tagName: string;
  /** Component version for serialization */
  version: string;
  /** Component role: 'view' for display components, 'container' for layout components */
  role: 'view' | 'container';
  /** View function that renders the component */
  View: ComponentType<P>;
  /** Children handling strategy - defaults to 'react-children' */
  childrenStrategy?: ChildrenStrategy;
  /** Optional prop finalizer function */
  finalize?: (props: P) => P;
}

/**
 * Serializable component interface with all required static properties
 */
export interface SerializableComponent<P extends ViewProps> extends React.FC<P> {
  tagName: string;
  version: string;
  fromJson: (data: unknown) => ReactElement;
  toJson: (props: P) => unknown;
  displayName?: string;
  [QWICKAPP_COMPONENT]: symbol;
}

/**
 * Create a serializable view component using the factory pattern
 * 
 * @param config - Factory configuration
 * @returns Serializable component with attached static methods
 */
export function createSerializableView<P extends ViewProps>(
  config: CreateSerializableViewConfig<P>
): SerializableComponent<P> {
  const { tagName, version, role, View, childrenStrategy = { mode: 'react-children' }, finalize } = config;

  // Create the main component function
  function SerializableViewComponent(props: P): ReactElement {
    const { dataSource, bindingOptions, children, ...schemaProps } = props as P & { dataSource?: string; bindingOptions?: Record<string, unknown>; children?: ReactNode };

    // Step 1: Handle content-prop strategy (map JSX children → content)
    let propsForProcessing = schemaProps;
    if (childrenStrategy.mode === 'content-prop') {
      const propName = childrenStrategy.propName || 'content';
      if (propsForProcessing[propName] == null) {
        const textContent = toText(children);
        if (typeof textContent === 'string') {
          propsForProcessing = { ...propsForProcessing, [propName]: textContent };
        }
      }
    }

    // Step 2: Normalize schema props to runtime-friendly format
    const normalizedProps = normalizeViewProps(propsForProcessing);

    // Step 2: ALWAYS call all hooks first (Rules of Hooks)
    const { loading, error, ...resolvedProps } = useDataBinding(
      dataSource || undefined, // Pass undefined if no dataSource
      normalizedProps,
      undefined, // Schema - let the hook infer it
      dataSource ? { cache: true, cacheTTL: 300000, strict: false, ...bindingOptions } : { enabled: false }
    );
    
    // Determine which props to use based on data binding state
    let boundProps = normalizedProps;
    if (dataSource && !error) {
      boundProps = { ...normalizedProps, ...resolvedProps };
    }

    // Step 3: Apply useBaseProps for style/html/grid processing (ALWAYS call this hook)
    const { gridProps, styleProps, htmlProps, restProps } = useBaseProps(boundProps);

    // Step 4: Handle special states AFTER all hooks have been called
    if (dataSource && loading) {
      return <div>Loading...</div> as ReactElement;
    }
    
    if (dataSource && error) {
      console.error('Data binding error:', error);
      if (process.env.NODE_ENV !== 'production') {
        return <div style={{ color: 'red', padding: '1rem', border: '1px solid red' }}>
          Error loading data: {error.message}
        </div> as ReactElement;
      }
      // In production, continue with fallback props (already set above)
    }

    // Step 5: Prepare final props and apply optional finalize function
    let viewProps = {
      ...restProps,
      ...styleProps,
      ...htmlProps,
      // Grid props are passed separately if needed by container components
      ...(role === 'container' && gridProps ? { gridProps } : {}),
    } as P;

    // Apply finalize function if provided
    if (finalize) {
      viewProps = finalize(viewProps);
    }

    // Step 6: Render with appropriate children strategy
    if (childrenStrategy.mode === 'content-prop') {
      // For content-prop components, don't pass children to the view
      return <View {...viewProps} />;
    } else {
      // For react-children components, pass children through
      return <View {...viewProps}>{children}</View>;
    }
  }

  // Attach static properties for serialization
  const component = SerializableViewComponent as unknown as SerializableComponent<P>;
  
  // Component identification
  component.tagName = tagName;
  component.version = version;
  component[QWICKAPP_COMPONENT] = QWICKAPP_COMPONENT;

  // Serialization methods
  component.fromJson = function fromJson(data: unknown): ReactElement {
    const typedData = data as { tagName?: string; version?: string; data?: unknown };
    const { tagName: dataTagName, version: dataVersion, data: componentData } = typedData;

    // Validate deserialization data
    if (dataTagName !== tagName) {
      throw new Error(`Tag name mismatch: expected ${tagName}, got ${dataTagName}`);
    }

    if (dataVersion !== version) {
      console.warn(`Version mismatch for ${tagName}: expected ${version}, got ${dataVersion}`);
    }

    // Handle deserialization based on children strategy
    if (childrenStrategy.mode === 'content-prop') {
      const propName = childrenStrategy.propName || 'content';
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { children, ...rest } = componentData || {};
      const contentData = { ...rest, [propName]: componentData?.[propName] || '' };
      return React.createElement(component as ComponentType<P>, contentData as P);
    } else {
      // For react-children strategy, recursively deserialize children
      const deserializedData = { ...(componentData as Record<string, unknown>) };
      if ((componentData as Record<string, unknown>).children !== undefined) {
        // Recursively deserialize children using ComponentTransformer
        deserializedData.children = ComponentTransformer.deserialize((componentData as Record<string, unknown>).children);
      }
      return React.createElement(component as ComponentType<P>, deserializedData as P);
    }
  };

  component.toJson = function toJson(props: P): unknown {
    // Handle serialization based on children strategy
    if (childrenStrategy.mode === 'content-prop') {
      const propName = childrenStrategy.propName || 'content';
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { children, ...rest } = props || {};
      const contentValue = (props as Record<string, unknown>)?.[propName] ?? toText((props as Record<string, unknown>)?.children as ReactNode);

      // Clean props for content-prop serialization
      const cleanProps: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(rest)) {
        if (typeof value === 'function' && key.startsWith('on')) {
          cleanProps[key] = value.toString();
        } else if (typeof value !== 'function' && value !== undefined && value !== null) {
          cleanProps[key] = value;
        }
      }
      
      return {
        tagName,
        version,
        data: { ...cleanProps, [propName]: contentValue || '' },
      };
    } else {
      // Handle react-children strategy (existing logic)
      const cleanProps: unknown = {};
      
      for (const [key, value] of Object.entries(props)) {
        if (typeof value === 'function' && key.startsWith('on')) {
          // Convert event handlers to string representation
          cleanProps[key] = value.toString();
        } else if (typeof value === 'function') {
          // Skip non-event handler functions
          continue;
        } else if (key === 'children') {
          // IMPORTANT: Include children as-is for recursive serialization by ComponentTransformer
          // The ComponentTransformer.serializeNode() will handle the recursive serialization
          cleanProps[key] = value;
        } else if (value !== undefined && value !== null) {
          // Include all other serializable props
          cleanProps[key] = value;
        }
      }

      return {
        tagName,
        version,
        data: cleanProps,
      };
    }
  };

  // Set display name for debugging
  component.displayName = `SerializableView(${tagName})`;

  return component;
}

/**
 * Type helper for components created with createSerializableView
 */
export type SerializableViewComponent<P extends ViewProps> = SerializableComponent<P>;

/**
 * Type guard to check if a component is serializable
 */
export function isSerializableComponent(component: unknown): component is SerializableComponent<unknown> {
  return component && 
    typeof component === 'function' &&
    typeof component.tagName === 'string' &&
    typeof component.version === 'string' &&
    typeof component.fromJson === 'function' &&
    typeof component.toJson === 'function' &&
    component[QWICKAPP_COMPONENT] === QWICKAPP_COMPONENT;
}

/**
 * Extract component metadata for registration
 */
export function getComponentMetadata(component: SerializableComponent<unknown>) {
  return {
    tagName: component.tagName,
    version: component.version,
    fromJson: component.fromJson,
    toJson: component.toJson,
  };
}