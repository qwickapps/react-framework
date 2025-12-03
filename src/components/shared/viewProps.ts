/**
 * ViewProps - Runtime-friendly props derived from ViewSchema
 * 
 * Provides normalized view props that integrate seamlessly with the existing 
 * BaseComponentProps system and useBaseProps hook. Handles type conversion
 * from schema strings to proper React prop types including event handlers,
 * styling props, and grid values.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import type { SxProps, Theme } from '@mui/material/styles';
import type { SchemaProps, WithDataBinding } from '@qwickapps/schema';
import { BaseComponentProps } from '../../hooks/useBaseProps';
import { ViewSchema } from '../../schemas/ViewSchema';

/**
 * ViewProps - Single source of truth for all base component props
 * 
 * Extends SchemaProps<ViewSchema> to get all base properties with proper types
 * and adds WithDataBinding for CMS integration. ViewSchema is the authoritative
 * source for all base props including styling, grid, events, accessibility, etc.
 */
export interface ViewProps extends SchemaProps<ViewSchema>, WithDataBinding {
  // Add children prop for components that need it
  children?: React.ReactNode;
}

/**
 * Type for string event handlers in schema
 */
type EventHandlerValue = string | React.MouseEventHandler<unknown> | React.FocusEventHandler<unknown> | undefined;

/**
 * Runtime event handler conversion map
 */
interface EventHandlers {
  onClick?: React.MouseEventHandler<unknown>;
  onMouseEnter?: React.MouseEventHandler<unknown>;
  onMouseLeave?: React.MouseEventHandler<unknown>;
  onFocus?: React.FocusEventHandler<unknown>;
  onBlur?: React.FocusEventHandler<unknown>;
}

/**
 * Convert string event handlers to React function handlers
 * @param eventHandlers - Object containing string or function event handlers
 * @returns Object with converted function handlers
 */
function parseEventHandlers(eventHandlers: Record<string, EventHandlerValue>): EventHandlers {
  const result: EventHandlers = {};

  for (const [key, value] of Object.entries(eventHandlers)) {
    if (typeof value === 'string' && value.trim()) {
      try {
        // Convert string to function - safe eval for event handlers
        // This creates a function that executes the string as code
        const func = new Function('event', value);
        result[key as keyof EventHandlers] = func as React.MouseEventHandler<unknown> | React.FocusEventHandler<unknown>;
      } catch (error) {
        console.warn(`Invalid event handler string for ${key}:`, value, error);
        // Keep as undefined for invalid handlers
      }
    } else if (typeof value === 'function') {
      // Already a function, use as-is
      result[key as keyof EventHandlers] = value as React.MouseEventHandler<unknown> | React.FocusEventHandler<unknown>;
    }
  }
  
  return result;
}

/**
 * Parse SX props from string or object
 * @param sx - SX prop as string or object
 * @returns Parsed SX props
 */
function parseSxProps(sx: string | SxProps<Theme> | undefined): SxProps<Theme> | undefined {
  if (!sx) return undefined;
  
  if (typeof sx === 'string') {
    try {
      return JSON.parse(sx);
    } catch (error) {
      console.warn('Invalid sx JSON string:', sx, error);
      return undefined;
    }
  }
  
  return sx;
}

/**
 * Parse style props from string or object
 * @param style - Style prop as string or object
 * @returns Parsed style props
 */
function parseStyleProps(style: string | React.CSSProperties | undefined): React.CSSProperties | undefined {
  if (!style) return undefined;
  
  if (typeof style === 'string') {
    try {
      return JSON.parse(style);
    } catch (error) {
      console.warn('Invalid style JSON string:', style, error);
      return undefined;
    }
  }
  
  return style;
}

/**
 * Coerce grid values from strings to numbers/keywords
 * @param value - Grid value as string or number
 * @returns Coerced value
 */
function coerceGridValue(value: string | number | undefined): number | 'auto' | 'grow' | undefined {
  if (value === undefined || value === null) return undefined;
  
  if (typeof value === 'number') return value;
  
  if (typeof value === 'string') {
    // Handle keyword values
    if (value === 'auto' || value === 'grow') return value;
    
    // Try to parse as number
    const parsed = parseInt(value, 10);
    if (!isNaN(parsed) && parsed > 0) return parsed;
  }
  
  return undefined;
}

/**
 * Normalize ViewProps for runtime use
 * 
 * Converts schema-friendly string props to runtime-friendly React props:
 * - Parses sx/style JSON strings
 * - Converts string event handlers to functions
 * - Coerces grid span/breakpoint values from strings to numbers/keywords
 * - Maintains compatibility with BaseComponentProps system
 * 
 * @param props - Raw ViewProps from schema
 * @returns Normalized props compatible with useBaseProps
 */
export function normalizeViewProps<T extends ViewProps>(props: T): T & BaseComponentProps {
  const {
    sx,
    style,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    span,
    xs,
    sm,
    md,
    lg,
    xl,
    backgroundColor,
    ...restProps
  } = props;

  // Parse style and sx props
  const normalizedSx = parseSxProps(sx);
  const normalizedStyle = parseStyleProps(style);

  // Parse event handlers
  const eventHandlers = parseEventHandlers({
    onClick,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
  });

  // Coerce grid values
  const normalizedGridProps = {
    span: coerceGridValue(span),
    xs: coerceGridValue(xs),
    sm: coerceGridValue(sm),
    md: coerceGridValue(md),
    lg: coerceGridValue(lg),
    xl: coerceGridValue(xl),
  };

  // Canonicalize background prop (backgroundColor → background)
  const canonicalBackground = (restProps as { background?: string }).background ?? backgroundColor;

  // Return normalized props with proper typing
  const normalized = {
    ...restProps,
    ...normalizedGridProps,
    sx: normalizedSx,
    style: normalizedStyle,
    ...eventHandlers,
    // Set canonical background prop
    background: canonicalBackground,
  } as T & BaseComponentProps;

  // Remove backgroundColor to avoid duplication
  delete (normalized as T & BaseComponentProps & { backgroundColor?: string }).backgroundColor;
  
  return normalized;
}