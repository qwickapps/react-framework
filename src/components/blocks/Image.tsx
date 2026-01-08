'use client';

/**
 * Image - Comprehensive image display component with serialization support
 *
 * Features:
 * - Responsive image handling with srcSet and sizes
 * - Multiple fit modes and positioning options
 * - Loading states and error handling
 * - Accessibility support with proper alt text
 * - Lazy loading support
 * - Fallback image handling
 * - Full serialization support via factory pattern
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React, { useState, useCallback } from 'react';
import { Box, Skeleton, Typography, useTheme } from '@mui/material';
import BrokenImage from "@mui/icons-material/BrokenImage";
const BrokenImageIcon = BrokenImage;
import { ImageFit, ImageLoading, ImagePosition } from '../../schemas/ImageSchema';
import { createSerializableView, SerializableComponent } from '../shared/createSerializableView';
import { ViewProps } from '../shared/viewProps';

export interface ImageProps extends ViewProps {
  // Component-specific props from ImageModel
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  objectFit?: ImageFit;
  objectPosition?: ImagePosition;
  loading?: ImageLoading;
  title?: string;
  draggable?: boolean;
  borderRadius?: string;
  showLoading?: boolean;
  showError?: boolean;
  fallbackSrc?: string;
  sizes?: string;
  srcSet?: string;
  loadingPlaceholder?: React.ReactNode;
  errorPlaceholder?: React.ReactNode;
}

// View component - handles the actual rendering
function ImageView({
  src,
  alt = '',
  width,
  height,
  objectFit = 'cover',
  objectPosition = 'center',
  loading = 'lazy',
  title,
  draggable = false,
  borderRadius,
  showLoading = false,
  showError = false,
  fallbackSrc,
  sizes,
  srcSet,
  loadingPlaceholder,
  errorPlaceholder,
  onClick,
  style,
  className,
  ...restProps
}: ImageProps) {
  const theme = useTheme();

  const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleLoad = useCallback(() => {
    setImageState('loaded');
  }, []);

  const handleError = useCallback(() => {
    // Try fallback source if available and not already using it
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      return;
    }
    setImageState('error');
  }, [fallbackSrc, currentSrc]);

  // Early return if no src provided
  if (!src) {
    if (showError) {
      return (
        <Box
          {...restProps}
          className={`image-error ${className || ''}`.trim()}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.palette.grey[100],
            color: theme.palette.text.secondary,
            width: width || 200,
            height: height || 150,
            borderRadius,
            ...style
          }}
        >
          {errorPlaceholder || (
            <Box sx={{ textAlign: 'center' }}>
              <BrokenImageIcon sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                No image source
              </Typography>
            </Box>
          )}
        </Box>
      );
    }
    return null;
  }

  // Loading state
  if (imageState === 'loading' && showLoading) {
    return (
      <Box
        {...restProps}
        className={`image-loading ${className || ''}`.trim()}
        style={{
          width: width || '100%',
          height: height || 200,
          borderRadius,
          ...style
        }}
      >
        {loadingPlaceholder || (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            sx={{ borderRadius }}
          />
        )}
      </Box>
    );
  }

  // Error state
  if (imageState === 'error' && showError) {
    return (
      <Box
        {...restProps}
        className={`image-error ${className || ''}`.trim()}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.palette.grey[100],
          color: theme.palette.text.secondary,
          width: width || '100%',
          height: height || 200,
          borderRadius,
          ...style
        }}
      >
        {errorPlaceholder || (
          <Box sx={{ textAlign: 'center', p: 2 }}>
            <BrokenImageIcon sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              Failed to load image
            </Typography>
            {fallbackSrc && (
              <Typography variant="caption" color="text.secondary">
                Fallback image also failed
              </Typography>
            )}
          </Box>
        )}
      </Box>
    );
  }

  const imageStyles: React.CSSProperties = {
    display: 'block',
    maxWidth: '100%',
    height: 'auto',
    objectFit,
    objectPosition,
    borderRadius,
    cursor: onClick ? 'pointer' : 'default',
    ...style
  };

  // Apply dimensions if provided
  if (width) imageStyles.width = width;
  if (height) imageStyles.height = height;

  return (
    <img
      {...restProps}
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      title={title}
      draggable={draggable}
      sizes={sizes}
      srcSet={srcSet}
      className={`image ${className || ''}`.trim()}
      style={imageStyles}
      onClick={onClick}
      onLoad={handleLoad}
      onError={handleError}
    />
  );
}

// Create the serializable Image component using the factory
export const Image: SerializableComponent<ImageProps> = createSerializableView<ImageProps>({
  tagName: 'Image',
  version: '1.0.0',
  role: 'view',
  View: ImageView,
  // Image component uses default react-children strategy
});

// Type for pattern registry with basic methods
interface PatternRegistry {
  hasPattern(pattern: string): boolean;
  registerPattern(pattern: string, handler: (element: Element) => unknown): void;
}

// Register HTML patterns that Image component can handle
(Image as unknown as { registerPatternHandlers: (registry: PatternRegistry) => void }).registerPatternHandlers = (registry: PatternRegistry): void => {
  const typedRegistry = registry as { hasPattern?: (pattern: string) => boolean; registerPattern?: (pattern: string, handler: (element: Element) => Record<string, unknown>) => void };

  // Register img elements
  if (typedRegistry.hasPattern && !typedRegistry.hasPattern('img')) {
    typedRegistry.registerPattern?.('img', transformImage);
  }

  // Register figure elements with img
  if (typedRegistry.hasPattern && !typedRegistry.hasPattern('figure img')) {
    typedRegistry.registerPattern?.('figure img', transformFigureImage);
  }
};

// Transform img elements to Image component
function transformImage(element: Element): Record<string, unknown> {
  const src = element.getAttribute('src') || '';
  const alt = element.getAttribute('alt') || '';
  const width = element.getAttribute('width');
  const height = element.getAttribute('height');
  const loading = element.getAttribute('loading') as 'lazy' | 'eager' | undefined;

  return {
    tagName: 'Image',
    props: {
      src,
      alt,
      width: width ? parseInt(width) : undefined,
      height: height ? parseInt(height) : undefined,
      loading: loading || 'lazy'
    }
  };
}

// Transform figure > img elements to Image component with caption support
function transformFigureImage(element: Element): Record<string, unknown> {
  const figure = element.closest('figure');
  const figcaption = figure?.querySelector('figcaption');
  const caption = figcaption?.textContent || '';
  
  const src = element.getAttribute('src') || '';
  const alt = element.getAttribute('alt') || caption;
  const width = element.getAttribute('width');
  const height = element.getAttribute('height');

  return {
    tagName: 'Image',
    props: {
      src,
      alt,
      caption: caption || undefined,
      width: width ? parseInt(width) : undefined,
      height: height ? parseInt(height) : undefined,
      loading: 'lazy'
    }
  };
}

export default Image;