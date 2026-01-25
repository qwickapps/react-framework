'use client';

/**
 * ImageGallery - Comprehensive product image gallery with multiple view variants
 *
 * Features:
 * - Multiple view variants (thumbnails, carousel, grid)
 * - Configurable thumbnail position (left, bottom, right)
 * - Image zoom modal
 * - Video support
 * - Responsive design
 * - Accessibility support
 * - Full serialization support via factory pattern
 * - Theme-compliant styling with CSS custom properties
 *
 * @example
 * <ImageGallery
 *   images={[
 *     { url: '/image1.jpg', alt: 'Product view 1' },
 *     { url: '/image2.jpg', alt: 'Product view 2' }
 *   ]}
 *   productName="Premium Cotton T-Shirt"
 *   variant="thumbnails"
 *   thumbnailPosition="left"
 *   showZoom={true}
 * />
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React, { useState, useCallback } from 'react';
import { Box, IconButton, Modal, Grid, Skeleton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { createSerializableView, SerializableComponent } from '../shared/createSerializableView';
import { ViewProps } from '../shared/viewProps';

export interface GalleryImage {
  url: string;
  alt: string;
  thumbnail?: string;
}

export interface ImageGalleryProps extends ViewProps {
  /** Array of product images */
  images: GalleryImage[];

  /** Product name for accessibility */
  productName: string;

  /** Gallery display variant */
  variant?: 'thumbnails' | 'carousel' | 'grid';

  /** Position of thumbnails (only for thumbnails variant) */
  thumbnailPosition?: 'left' | 'bottom' | 'right';

  /** Aspect ratio for main image */
  aspectRatio?: string;

  /** Enable zoom functionality */
  showZoom?: boolean;

  /** Maximum number of images to display */
  maxImages?: number;

  /** Data source for dynamic loading */
  dataSource?: string;

  /** Data binding configuration */
  bindingOptions?: Record<string, unknown>;
}

// View component - handles the actual rendering
function ImageGalleryView({
  images = [],
  productName,
  variant = 'thumbnails',
  thumbnailPosition = 'left',
  aspectRatio = '1',
  showZoom = true,
  maxImages,
  dataSource,
  bindingOptions,
  ...restProps
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  // Limit images if maxImages is specified
  const displayImages = maxImages ? images.slice(0, maxImages) : images;

  const handlePrevious = useCallback(() => {
    setSelectedIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  }, [displayImages.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  }, [displayImages.length]);

  const handleThumbnailClick = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const handleZoomOpen = useCallback(() => {
    if (showZoom) {
      setZoomOpen(true);
    }
  }, [showZoom]);

  const handleZoomClose = useCallback(() => {
    setZoomOpen(false);
  }, []);

  // Handle empty images
  if (!displayImages || displayImages.length === 0) {
    return (
      <Box
        {...restProps}
        sx={{
          backgroundColor: 'var(--theme-surface-variant)',
          borderRadius: 'var(--theme-border-radius)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          aspectRatio,
          minHeight: 400,
        }}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{
            borderRadius: 'var(--theme-border-radius)',
          }}
        />
      </Box>
    );
  }

  const currentImage = displayImages[selectedIndex];

  // Render thumbnails
  const renderThumbnails = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: thumbnailPosition === 'left' || thumbnailPosition === 'right' ? 'column' : 'row',
        gap: 1,
        overflow: 'auto',
        maxHeight: thumbnailPosition === 'left' || thumbnailPosition === 'right' ? 500 : 'auto',
        maxWidth: thumbnailPosition === 'bottom' ? '100%' : 'auto',
      }}
    >
      {displayImages.map((image, index) => (
        <Box
          key={index}
          onClick={() => handleThumbnailClick(index)}
          sx={{
            width: 80,
            height: 80,
            flexShrink: 0,
            cursor: 'pointer',
            border: '2px solid',
            borderColor: index === selectedIndex ? 'var(--theme-primary)' : 'var(--theme-border-main)',
            borderRadius: 'var(--theme-border-radius-small)',
            overflow: 'hidden',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              borderColor: 'var(--theme-border-emphasis)',
            },
          }}
        >
          <img
            src={image.thumbnail || image.url}
            alt={`${productName} thumbnail ${index + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
      ))}
    </Box>
  );

  // Render main image container
  const renderMainImage = () => (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        backgroundColor: 'var(--theme-surface)',
        borderRadius: 'var(--theme-border-radius)',
        border: '1px solid var(--theme-border-main)',
        overflow: 'hidden',
        aspectRatio,
      }}
    >
      <img
        src={currentImage.url}
        alt={currentImage.alt || `${productName} - Image ${selectedIndex + 1}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
        }}
      />

      {/* Zoom button */}
      {showZoom && (
        <IconButton
          onClick={handleZoomOpen}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'var(--theme-surface)',
            color: 'var(--theme-text-primary)',
            '&:hover': {
              backgroundColor: 'var(--theme-surface-variant)',
            },
          }}
          aria-label="Zoom image"
        >
          <ZoomInIcon />
        </IconButton>
      )}

      {/* Navigation arrows for carousel */}
      {variant === 'carousel' && displayImages.length > 1 && (
        <>
          <IconButton
            onClick={handlePrevious}
            sx={{
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'var(--theme-surface)',
              color: 'var(--theme-text-primary)',
              '&:hover': {
                backgroundColor: 'var(--theme-surface-variant)',
              },
            }}
            aria-label="Previous image"
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            onClick={handleNext}
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'var(--theme-surface)',
              color: 'var(--theme-text-primary)',
              '&:hover': {
                backgroundColor: 'var(--theme-surface-variant)',
              },
            }}
            aria-label="Next image"
          >
            <ChevronRightIcon />
          </IconButton>
        </>
      )}
    </Box>
  );

  // Render zoom modal
  const renderZoomModal = () => (
    <Modal
      open={zoomOpen}
      onClose={handleZoomClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          maxWidth: '90vw',
          maxHeight: '90vh',
          outline: 'none',
        }}
      >
        <IconButton
          onClick={handleZoomClose}
          sx={{
            position: 'absolute',
            top: -40,
            right: 0,
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
          aria-label="Close zoom"
        >
          <CloseIcon />
        </IconButton>
        <img
          src={currentImage.url}
          alt={currentImage.alt || `${productName} - Zoomed view`}
          style={{
            maxWidth: '100%',
            maxHeight: '90vh',
            objectFit: 'contain',
          }}
        />
      </Box>
    </Modal>
  );

  // Render thumbnails variant
  if (variant === 'thumbnails') {
    return (
      <Box {...restProps}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              sm: thumbnailPosition === 'bottom' ? 'column' : 'row',
            },
            gap: 2,
          }}
        >
          {/* Thumbnails on left */}
          {thumbnailPosition === 'left' && (
            <Box sx={{ order: { xs: 2, sm: 1 } }}>
              {renderThumbnails()}
            </Box>
          )}

          {/* Main image */}
          <Box sx={{ flex: 1, order: { xs: 1, sm: thumbnailPosition === 'left' ? 2 : 1 } }}>
            {renderMainImage()}
          </Box>

          {/* Thumbnails on right */}
          {thumbnailPosition === 'right' && (
            <Box sx={{ order: { xs: 2, sm: 2 } }}>
              {renderThumbnails()}
            </Box>
          )}

          {/* Thumbnails on bottom */}
          {thumbnailPosition === 'bottom' && (
            <Box sx={{ order: 2 }}>
              {renderThumbnails()}
            </Box>
          )}
        </Box>
        {renderZoomModal()}
      </Box>
    );
  }

  // Render carousel variant
  if (variant === 'carousel') {
    return (
      <Box {...restProps}>
        {renderMainImage()}
        {/* Dot indicators */}
        {displayImages.length > 1 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 1,
              mt: 2,
            }}
          >
            {displayImages.map((_, index) => (
              <Box
                key={index}
                onClick={() => handleThumbnailClick(index)}
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: index === selectedIndex ? 'var(--theme-primary)' : 'var(--theme-border-main)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    backgroundColor: index === selectedIndex ? 'var(--theme-primary)' : 'var(--theme-border-emphasis)',
                  },
                }}
              />
            ))}
          </Box>
        )}
        {renderZoomModal()}
      </Box>
    );
  }

  // Render grid variant
  if (variant === 'grid') {
    return (
      <Box {...restProps}>
        <Grid container spacing={2}>
          {displayImages.map((image, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Box
                onClick={() => {
                  setSelectedIndex(index);
                  handleZoomOpen();
                }}
                sx={{
                  width: '100%',
                  aspectRatio: '1',
                  borderRadius: 'var(--theme-border-radius)',
                  border: '1px solid var(--theme-border-main)',
                  overflow: 'hidden',
                  cursor: showZoom ? 'pointer' : 'default',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    borderColor: 'var(--theme-border-emphasis)',
                    boxShadow: 'var(--theme-elevation-1)',
                  },
                }}
              >
                <img
                  src={image.url}
                  alt={image.alt || `${productName} - Image ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
        {renderZoomModal()}
      </Box>
    );
  }

  return null;
}

// Create the serializable ImageGallery component using the factory
export const ImageGallery: SerializableComponent<ImageGalleryProps> =
  createSerializableView<ImageGalleryProps>({
    tagName: 'ImageGallery',
    version: '1.0.0',
    role: 'view',
    View: ImageGalleryView,
  });

export default ImageGallery;
