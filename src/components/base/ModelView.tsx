/**
 * ModelView - Abstract Base Class implementing ViewSchema
 * 
 * This abstract base class processes ViewSchema props and provides them
 * to subclasses through processed props. All concrete components should
 * extend this class to get consistent ViewSchema prop handling.
 * 
 * Key Features:
 * - Processes all ViewSchema properties (grid, spacing, styling, etc.)
 * - Provides processed props to subclasses via getProcessedProps()
 * - Maintains abstract pattern for component-specific rendering
 * - Handles serialization and data binding
 */

import { Serializable } from "@/schemas";
import { SchemaProps, WithDataBinding } from "@qwickapps/schema";
import React, { ReactElement, ReactNode } from "react";
import { WithBaseProps } from '../../hooks';
import ViewSchema from '../../schemas/ViewSchema';
import { extractTextFromReactNode } from '../../utils/reactUtils';

/**
 * Convert ViewSchema props to BaseComponentProps format
 */
function convertSchemaToBaseProps(schema: Partial<ViewSchema>): WithBaseProps {
  const {
    // Grid props - convert strings to proper types
    span,
    xs,
    sm,
    md,
    lg,
    xl,

    // Style props - convert JSON strings to objects
    sx,
    style,

    // All other props pass through directly
    ...restProps
  } = schema;

  return {
    // Convert grid span values
    span: span === 'auto' ? 'auto' : span === 'grow' ? 'grow' : (span && typeof span === 'string') ? parseInt(span, 10) : span,
    xs: xs === 'auto' ? 'auto' : (xs && typeof xs === 'string') ? parseInt(xs, 10) : xs,
    sm: sm === 'auto' ? 'auto' : (sm && typeof sm === 'string') ? parseInt(sm, 10) : sm,
    md: md === 'auto' ? 'auto' : (md && typeof md === 'string') ? parseInt(md, 10) : md,
    lg: lg === 'auto' ? 'auto' : (lg && typeof lg === 'string') ? parseInt(lg, 10) : lg,
    xl: xl === 'auto' ? 'auto' : (xl && typeof xl === 'string') ? parseInt(xl, 10) : xl,

    // Parse JSON strings for sx and style
    sx: typeof sx === 'string' ? (() => {
      try { return JSON.parse(sx); } catch { return sx; }
    })() : sx,

    style: typeof style === 'string' ? (() => {
      try { return JSON.parse(style); } catch { return style; }
    })() : style,

    // Convert event handlers from strings to functions
    onClick: typeof schema.onClick === 'string' ? convertEventHandler(schema.onClick) : schema.onClick,
    onMouseEnter: typeof schema.onMouseEnter === 'string' ? convertEventHandler(schema.onMouseEnter) : schema.onMouseEnter,
    onMouseLeave: typeof schema.onMouseLeave === 'string' ? convertEventHandler(schema.onMouseLeave) : schema.onMouseLeave,
    onFocus: typeof schema.onFocus === 'string' ? convertEventHandler(schema.onFocus) : schema.onFocus,
    onBlur: typeof schema.onBlur === 'string' ? convertEventHandler(schema.onBlur) : schema.onBlur,

    // Pass through all other props directly
    ...restProps
  } as WithBaseProps;
}

/**
 * Convert string event handler to function
 */
function convertEventHandler(handlerStr?: string): ((event: unknown) => void) | undefined {
  if (!handlerStr || typeof handlerStr !== 'string') {
    return undefined;
  }

  try {
    // Create function from string - handle both function declarations and expressions
    let func: (...args: unknown[]) => unknown;
    if (handlerStr.trim().startsWith('function')) {
      func = new Function(`return (${handlerStr})`)() as (...args: unknown[]) => unknown;
    } else {
      func = new Function('event', handlerStr) as (...args: unknown[]) => unknown;
    }

    return (event: unknown) => func(event);
  } catch (error) {
    console.error('Error parsing event handler:', error);
    return undefined;
  }
}

/**
 * Processed props that subclasses receive
 */
export interface ProcessedProps {
  gridProps: unknown;
  styleProps: unknown;
  htmlProps: unknown;
  restProps: unknown;
}

/**
 * Abstract base class implementing ViewSchema
 * All concrete components should extend this class
 */
export abstract class ModelView<TProps = Record<string, unknown>>
  extends React.Component<TProps & SchemaProps<ViewSchema> & WithDataBinding>
  implements Serializable {

  // Static properties - must be overridden by subclasses
  static readonly tagName: string = '';
  static readonly version: string = '';

  /**
   * Common fromJson implementation
   */
  static fromJson(jsonData: unknown): ReactElement {
    const typedData = jsonData as { tagName?: string; version?: string; data?: unknown };
    const { tagName, version, data } = typedData;
    if (tagName !== this.tagName) {
      throw new Error(`Cannot deserialize: Expected tagName '${this.tagName}' but got '${tagName}'`);
    }
    if (version !== this.version) {
      console.warn(`Version mismatch: Expected ${this.version} but got ${version}`);
    }

    return React.createElement(this as React.ComponentType<unknown>, data || {});
  }

  /**
   * Common toJson implementation with hooks for customization
   */
  toJson(): unknown {
    const baseProps = this.getBaseSerializableProps() as Record<string, unknown>;
    const componentProps = this.getComponentSpecificProps() as Record<string, unknown>;
    return {
      tagName: (this.constructor as typeof ModelView).tagName,
      version: (this.constructor as typeof ModelView).version,
      data: {
        ...baseProps,
        ...componentProps
      }
    };
  }

  /**
   * Get processed props for subclasses to use
   * This converts ViewSchema props and processes them through useBaseProps
   */
  protected getProcessedProps(): ProcessedProps {
    const { dataSource: _dataSource, bindingOptions: _bindingOptions, ...schemaProps } = this.props;

    // Convert ViewSchema props to BaseComponentProps format
    const convertedProps = convertSchemaToBaseProps(schemaProps);

    // Process through useBaseProps utility (this is a bit of a hack since we're in a class component)
    // We'll simulate what useBaseProps does
    const mockProps = {
      gridProps: {
        span: convertedProps.span,
        xs: convertedProps.xs,
        sm: convertedProps.sm,
        md: convertedProps.md,
        lg: convertedProps.lg,
        xl: convertedProps.xl,
      },
      styleProps: {
        className: convertedProps.className,
        sx: convertedProps.sx,
        style: convertedProps.style,
      },
      htmlProps: {
        id: convertedProps.id,
        role: convertedProps.role,
        'aria-label': convertedProps['aria-label'],
        'aria-labelledby': convertedProps['aria-labelledby'],
        'aria-describedby': convertedProps['aria-describedby'],
        'data-testid': convertedProps['data-testid'],
        onClick: convertedProps.onClick,
        onMouseEnter: convertedProps.onMouseEnter,
        onMouseLeave: convertedProps.onMouseLeave,
        onFocus: convertedProps.onFocus,
        onBlur: convertedProps.onBlur,
      },
      restProps: {
        // All the spacing, dimension, and background props
        width: convertedProps.width,
        height: convertedProps.height,
        minWidth: convertedProps.minWidth,
        minHeight: convertedProps.minHeight,
        maxWidth: convertedProps.maxWidth,
        maxHeight: convertedProps.maxHeight,
        padding: convertedProps.padding,
        paddingTop: convertedProps.paddingTop,
        paddingRight: convertedProps.paddingRight,
        paddingBottom: convertedProps.paddingBottom,
        paddingLeft: convertedProps.paddingLeft,
        paddingX: convertedProps.paddingX,
        paddingY: convertedProps.paddingY,
        margin: convertedProps.margin,
        marginTop: convertedProps.marginTop,
        marginRight: convertedProps.marginRight,
        marginBottom: convertedProps.marginBottom,
        marginLeft: convertedProps.marginLeft,
        marginX: convertedProps.marginX,
        marginY: convertedProps.marginY,
        background: convertedProps.background,
        backgroundImage: convertedProps.backgroundImage,
        backgroundGradient: convertedProps.backgroundGradient,
        textAlign: convertedProps.textAlign,
      }
    };

    return mockProps;
  }

  /**
   * Common base props that all components serialize
   */
  protected getBaseSerializableProps(): unknown {
    const props = this.props as TProps & SchemaProps<ViewSchema> & WithDataBinding;
    return {
      children: props.children ? this.serializeChildren(props.children) : undefined,
      dataSource: props.dataSource,
      bindingOptions: props.bindingOptions,
      // Include all ViewSchema props in serialization
      ...props,
    };
  }

  /**
   * Hook for subclasses to add component-specific serialization
   */
  protected abstract getComponentSpecificProps(): unknown;

  /**
   * Common children serialization logic
   */
  protected serializeChildren(children: ReactNode): unknown {
    if (typeof children === 'string') {
      return children;
    }

    if (this.hasNestedComponents(children)) {
      throw new Error('Components with nested components must override serializeChildren method');
    }

    return extractTextFromReactNode(children);
  }

  /**
   * Helper to determine if children contain other serializable components
   */
  protected hasNestedComponents(_children: ReactNode): boolean {
    return false;
  }

  /**
   * Common render pattern
   */
  render() {
    const props = this.props as TProps & SchemaProps<ViewSchema> & WithDataBinding;

    if (props.dataSource) {
      return this.renderWithDataBinding();
    }

    return this.renderView();
  }

  /**
   * Hook for subclasses to implement traditional props rendering
   */
  protected abstract renderView(): React.ReactElement;

  /**
   * Hook for subclasses to implement data binding rendering
   */
  protected abstract renderWithDataBinding(): React.ReactElement;

  /**
   * Register HTML pattern handlers for this component
   */
  static registerPatternHandlers(_registry: unknown): void {
    // Default: no patterns to register
  }
}

/**
 * Helper function for creating ModelView component classes with ViewSchema support
 * Updated to work with the new ViewSchema processing system
 */
export function createModelViewClass<TProps>(
  config: {
    tagName: string;
    version: string;
    getComponentSpecificProps: (props: TProps, processedProps: ProcessedProps) => Record<string, unknown>;
    hasNestedComponents?: (children: ReactNode) => boolean;
    renderView: (props: TProps, processedProps: ProcessedProps) => React.ReactElement;
    renderWithDataBinding: (props: TProps & WithDataBinding, processedProps: ProcessedProps) => React.ReactElement;
  }
): unknown {

  class DynamicModelView extends ModelView<TProps> {
    static readonly tagName = config.tagName;
    static readonly version = config.version;

    protected getComponentSpecificProps(): unknown {
      const processedProps = this.getProcessedProps();
      return config.getComponentSpecificProps(this.props as TProps, processedProps);
    }

    protected hasNestedComponents(children: ReactNode): boolean {
      return config.hasNestedComponents ? config.hasNestedComponents(children) : false;
    }

    protected renderView(): React.ReactElement {
      const processedProps = this.getProcessedProps();
      return config.renderView(this.props as TProps, processedProps);
    }

    protected renderWithDataBinding(): React.ReactElement {
      const processedProps = this.getProcessedProps();
      return config.renderWithDataBinding(this.props as TProps & WithDataBinding, processedProps);
    }
  }

  return DynamicModelView;
}