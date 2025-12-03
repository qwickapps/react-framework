/**
 * Base props hook for QwickApps React Framework components
 * 
 * Provides standardized prop handling for all framework components
 * including grid behavior, dimensions, spacing, and styling
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { useMemo } from 'react';
import { SxProps, Theme } from '@mui/material';
import { DimensionValue, resolveDimensions } from '../utils/dimensions';
import { SpacingValue, resolveSpacingProps } from '../utils/spacing';

/**
 * Base props that all QwickApps components support
 */
export interface BaseComponentProps {
  // Grid behavior - when used inside ColumnLayout
  span?: number | 'auto' | 'grow';
  xs?: number | 'auto';
  sm?: number | 'auto';
  md?: number | 'auto';
  lg?: number | 'auto';
  xl?: number | 'auto';
  
  // Common styling
  className?: string;
  sx?: SxProps<Theme>;
  style?: React.CSSProperties;
  
  // Dimensions with t-shirt sizing
  width?: DimensionValue;
  height?: DimensionValue;
  minWidth?: DimensionValue;
  minHeight?: DimensionValue;
  maxWidth?: DimensionValue;
  maxHeight?: DimensionValue;
  
  // Spacing with t-shirt sizing
  padding?: SpacingValue;
  paddingTop?: SpacingValue;
  paddingRight?: SpacingValue;
  paddingBottom?: SpacingValue;
  paddingLeft?: SpacingValue;
  paddingX?: SpacingValue;
  paddingY?: SpacingValue;
  margin?: SpacingValue;
  marginTop?: SpacingValue;
  marginRight?: SpacingValue;
  marginBottom?: SpacingValue;
  marginLeft?: SpacingValue;
  marginX?: SpacingValue;
  marginY?: SpacingValue;
  
  // Background
  background?: string; // color, gradient, or theme path
  backgroundImage?: string;
  backgroundGradient?: string;
  
  // Text alignment
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  
  // Common HTML attributes
  id?: string;
  role?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'data-testid'?: string;
  
  // Common event handlers (generic for compatibility)
  onClick?: React.MouseEventHandler<unknown>;
  onMouseEnter?: React.MouseEventHandler<unknown>;
  onMouseLeave?: React.MouseEventHandler<unknown>;
  onFocus?: React.FocusEventHandler<unknown>;
  onBlur?: React.FocusEventHandler<unknown>;
}

/**
 * Marker to identify QwickApps components
 */
export const QWICKAPP_COMPONENT = Symbol('QwickAppComponent');

/**
 * Hook to process base component props
 */
export function useBaseProps<T extends BaseComponentProps>(props: T) {
  const {
    // Grid props
    span,
    xs,
    sm,
    md,
    lg,
    xl,
    
    // Style props
    className,
    sx,
    style,
    
    // Dimension props
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    
    // Spacing props
    padding,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    paddingX,
    paddingY,
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    marginX,
    marginY,
    
    // Background props
    background,
    backgroundImage,
    backgroundGradient,
    
    // Text alignment
    textAlign,
    
    // HTML attributes
    id,
    role,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    'data-testid': dataTestId,
    
    // Event handlers
    onClick,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    
    // Rest of the props
    ...restProps
  } = props;

  // Memoize grid props
  const gridProps = useMemo(() => {
    if (span || xs || sm || md || lg || xl) {
      return {
        span,
        xs: span || xs,
        sm: span || sm,
        md: span || md,
        lg: span || lg,
        xl: span || xl,
      };
    }
    return null;
  }, [span, xs, sm, md, lg, xl]);

  // Memoize resolved dimensions
  const dimensions = useMemo(() => {
    return resolveDimensions({
      width,
      height,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
    });
  }, [width, height, minWidth, minHeight, maxWidth, maxHeight]);

  // Memoize resolved spacing
  const spacing = useMemo(() => {
    return resolveSpacingProps({
      padding,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      paddingX,
      paddingY,
      margin,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      marginX,
      marginY,
    });
  }, [
    padding, paddingTop, paddingRight, paddingBottom, paddingLeft, paddingX, paddingY,
    margin, marginTop, marginRight, marginBottom, marginLeft, marginX, marginY
  ]);

  // Memoize background and text styles
  const backgroundAndTextStyles = useMemo(() => {
    const styles: Record<string, unknown> = {};

    if (backgroundGradient) {
      styles.background = backgroundGradient;
    } else if (backgroundImage) {
      styles.backgroundImage = `url(${backgroundImage})`;
      styles.backgroundSize = 'cover';
      styles.backgroundPosition = 'center';
      styles.backgroundRepeat = 'no-repeat';
    } else if (background) {
      // Could be a color or theme path
      styles.background = background;
    }

    if (textAlign) {
      styles.textAlign = textAlign;
    }

    return styles;
  }, [background, backgroundImage, backgroundGradient, textAlign]);

  // Combine all style props
  const combinedSx = useMemo(() => {
    return {
      ...dimensions,
      ...spacing,
      ...backgroundAndTextStyles,
      ...sx,
    };
  }, [dimensions, spacing, backgroundAndTextStyles, sx]);

  // HTML attributes and event handlers
  const htmlProps = {
    id,
    role,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    'data-testid': dataTestId,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
  };

  return {
    gridProps,
    styleProps: {
      className,
      sx: combinedSx,
      style,
    },
    htmlProps,
    restProps: restProps as Omit<T, keyof BaseComponentProps>,
  };
}

/**
 * Type helper for components using base props
 */
export type WithBaseProps<P = Record<string, never>> = P & BaseComponentProps;