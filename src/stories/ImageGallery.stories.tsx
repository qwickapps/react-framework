/**
 * ImageGallery Component Stories - Image gallery with multiple view variants
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Box, Typography } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import { ImageGallery } from '../components/blocks/ImageGallery';
import QwickApp from '../components/QwickApp';

// Sample product images
const sampleImages = [
  {
    url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',
    alt: 'Premium wristwatch - front view',
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
  },
  {
    url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=800&fit=crop',
    alt: 'Premium wristwatch - side view',
    thumbnail: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=100&h=100&fit=crop',
  },
  {
    url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
    alt: 'Premium sneakers - top view',
    thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
  },
  {
    url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop',
    alt: 'Premium sneakers - side view',
    thumbnail: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=100&h=100&fit=crop',
  },
  {
    url: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&h=800&fit=crop',
    alt: 'Premium sneakers - detail shot',
    thumbnail: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=100&h=100&fit=crop',
  },
];

const sampleImagesWide = [
  {
    url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=800&fit=crop',
    alt: 'Premium headphones - studio shot',
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
  },
  {
    url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1200&h=800&fit=crop',
    alt: 'Premium headphones - lifestyle',
    thumbnail: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=100&h=100&fit=crop',
  },
  {
    url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1200&h=800&fit=crop',
    alt: 'Premium headphones - detail',
    thumbnail: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&h=100&fit=crop',
  },
];

const meta = {
  title: 'Blocks/ImageGallery',
  component: ImageGallery,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `ImageGallery is a comprehensive image gallery component designed for any content with multiple display variants.

**Key Features:**
- **Multiple Variants**: Thumbnails, carousel, and grid display modes
- **Flexible Thumbnail Position**: Left, bottom, or right (for thumbnails variant)
- **Image Zoom Modal**: Full-screen image viewing with zoom functionality
- **Responsive Design**: Adapts seamlessly to all screen sizes
- **Theme Compliant**: Uses CSS custom properties for perfect dark/light mode support
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Customizable Aspect Ratio**: Control main image proportions

**Perfect For:**
- E-commerce any content
- Portfolio showcases
- Image-heavy content
- Product catalogs
- Real estate listings`,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ImageGallery>;

export default meta;
type Story = StoryObj<typeof ImageGallery>;

// Thumbnails Variant Stories
export const ThumbnailsLeft: Story = {
  render: () => (
    <QwickApp appId="product-gallery-thumbnails-left" appName="Thumbnails Left">
      <ImageGallery
        images={sampleImages}
        productName="Premium Wristwatch"
        variant="thumbnails"
        thumbnailPosition="left"
        aspectRatio="1"
        showZoom={true}
      />
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Classic product gallery with thumbnails on the left side - ideal for desktop layouts.',
      },
    },
  },
};

export const ThumbnailsBottom: Story = {
  render: () => (
    <QwickApp appId="product-gallery-thumbnails-bottom" appName="Thumbnails Bottom">
      <ImageGallery
        images={sampleImages}
        productName="Premium Sneakers"
        variant="thumbnails"
        thumbnailPosition="bottom"
        aspectRatio="1"
        showZoom={true}
      />
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Product gallery with thumbnails at the bottom - great for mobile-first designs.',
      },
    },
  },
};

export const ThumbnailsRight: Story = {
  render: () => (
    <QwickApp appId="product-gallery-thumbnails-right" appName="Thumbnails Right">
      <ImageGallery
        images={sampleImages}
        productName="Premium Headphones"
        variant="thumbnails"
        thumbnailPosition="right"
        aspectRatio="1"
        showZoom={true}
      />
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Product gallery with thumbnails on the right side - alternative desktop layout.',
      },
    },
  },
};

// Carousel Variant
export const Carousel: Story = {
  render: () => (
    <QwickApp appId="product-gallery-carousel" appName="Carousel View">
      <ImageGallery
        images={sampleImages}
        productName="Premium Watch Collection"
        variant="carousel"
        aspectRatio="1"
        showZoom={true}
      />
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Carousel mode with navigation arrows and dot indicators - perfect for mobile experiences.',
      },
    },
  },
};

// Grid Variant
export const GridView: Story = {
  render: () => (
    <QwickApp appId="product-gallery-grid" appName="Grid View">
      <ImageGallery
        images={sampleImages}
        productName="Product Image Collection"
        variant="grid"
        showZoom={true}
      />
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Grid layout showing all images at once - ideal for showcasing multiple product angles.',
      },
    },
  },
};

// Aspect Ratio Variations
export const AspectRatioSquare: Story = {
  render: () => (
    <QwickApp appId="product-gallery-square" appName="Square Aspect Ratio">
      <ImageGallery
        images={sampleImages}
        productName="Square Product Images"
        variant="thumbnails"
        thumbnailPosition="left"
        aspectRatio="1"
        showZoom={true}
      />
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Square aspect ratio (1:1) - standard for most product images.',
      },
    },
  },
};

export const AspectRatioWide: Story = {
  render: () => (
    <QwickApp appId="product-gallery-wide" appName="Wide Aspect Ratio">
      <ImageGallery
        images={sampleImagesWide}
        productName="Wide Format Product"
        variant="thumbnails"
        thumbnailPosition="bottom"
        aspectRatio="4/3"
        showZoom={true}
      />
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Wide aspect ratio (4:3) - great for landscape product photography.',
      },
    },
  },
};

export const AspectRatioUltraWide: Story = {
  render: () => (
    <QwickApp appId="product-gallery-ultrawide" appName="Ultra Wide Aspect Ratio">
      <ImageGallery
        images={sampleImagesWide}
        productName="Ultra Wide Product"
        variant="thumbnails"
        thumbnailPosition="bottom"
        aspectRatio="16/9"
        showZoom={true}
      />
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Ultra-wide aspect ratio (16:9) - cinematic product presentation.',
      },
    },
  },
};

// Zoom Control
export const WithoutZoom: Story = {
  render: () => (
    <QwickApp appId="product-gallery-no-zoom" appName="Without Zoom">
      <ImageGallery
        images={sampleImages}
        productName="Product Without Zoom"
        variant="thumbnails"
        thumbnailPosition="left"
        aspectRatio="1"
        showZoom={false}
      />
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Gallery without zoom functionality - simpler interaction for smaller products.',
      },
    },
  },
};

// Limited Images
export const LimitedImages: Story = {
  render: () => (
    <QwickApp appId="product-gallery-limited" appName="Limited Images">
      <ImageGallery
        images={sampleImages}
        productName="Product with Image Limit"
        variant="grid"
        showZoom={true}
        maxImages={3}
      />
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Gallery with maxImages prop limiting displayed images - useful for preview sections.',
      },
    },
  },
};

// Single Image
export const SingleImage: Story = {
  render: () => (
    <QwickApp appId="product-gallery-single" appName="Single Image">
      <ImageGallery
        images={[sampleImages[0]]}
        productName="Single Product Image"
        variant="thumbnails"
        thumbnailPosition="left"
        aspectRatio="1"
        showZoom={true}
      />
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Gallery with single image - gracefully handles minimal image sets.',
      },
    },
  },
};

// Real-World E-commerce Example
export const EcommerceProductPage: Story = {
  render: () => (
    <QwickApp appId="product-gallery-ecommerce" appName="E-commerce Product Page">
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
          {/* Image Gallery */}
          <Box>
            <ImageGallery
              images={sampleImages}
              productName="Premium Leather Sneakers"
              variant="thumbnails"
              thumbnailPosition="left"
              aspectRatio="1"
              showZoom={true}
            />
          </Box>

          {/* Product Details */}
          <Box>
            <Typography variant="overline" color="text.secondary">
              PREMIUM COLLECTION
            </Typography>
            <Typography variant="h3" gutterBottom>
              Premium Leather Sneakers
            </Typography>
            <Typography variant="h4" color="primary" gutterBottom>
              $149.99
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: 'text.secondary' }}>
              Handcrafted premium leather sneakers with exceptional comfort and timeless style.
              Perfect for both casual and semi-formal occasions.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Product Features
            </Typography>
            <Box component="ul" sx={{ color: 'text.secondary' }}>
              <li>100% genuine leather upper</li>
              <li>Memory foam insole for all-day comfort</li>
              <li>Durable rubber outsole</li>
              <li>Hand-stitched details</li>
              <li>Available in multiple colors</li>
            </Box>
          </Box>
        </Box>
      </Box>
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world example showing ImageGallery in a complete e-commerce product page layout.',
      },
    },
  },
};

// Responsive Comparison
export const ResponsiveComparison: Story = {
  render: () => (
    <QwickApp appId="product-gallery-responsive" appName="Responsive Comparison">
      <Box>
        <Box sx={{ p: 4, backgroundColor: 'background.paper', mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Responsive Behavior
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, opacity: 0.8 }}>
            ImageGallery automatically adapts to different screen sizes:
          </Typography>
          <Box component="ul" sx={{ opacity: 0.8 }}>
            <li>Mobile: Thumbnails stack below main image</li>
            <li>Tablet: Thumbnails appear beside or below based on position prop</li>
            <li>Desktop: Full layout with optimal thumbnail positioning</li>
          </Box>
        </Box>

        {/* Desktop Layout */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h6" gutterBottom>
            Desktop Layout (Thumbnails Left)
          </Typography>
          <ImageGallery
            images={sampleImages}
            productName="Desktop Product View"
            variant="thumbnails"
            thumbnailPosition="left"
            aspectRatio="1"
            showZoom={true}
          />
        </Box>

        {/* Mobile-Optimized Layout */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Mobile-Optimized (Carousel)
          </Typography>
          <Box sx={{ maxWidth: 375, mx: 'auto' }}>
            <ImageGallery
              images={sampleImages}
              productName="Mobile Product View"
              variant="carousel"
              aspectRatio="1"
              showZoom={true}
            />
          </Box>
        </Box>
      </Box>
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of different layouts optimized for various screen sizes and use cases.',
      },
    },
  },
};

// Theme Compliance Demo
export const ThemeCompliance: Story = {
  render: () => (
    <QwickApp appId="product-gallery-theme" appName="Theme Compliance">
      <Box>
        <Box sx={{ p: 4, backgroundColor: 'background.paper', mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Theme Compliance
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, opacity: 0.8 }}>
            ImageGallery uses CSS custom properties exclusively for all styling:
          </Typography>
          <Box component="ul" sx={{ opacity: 0.8, fontFamily: 'monospace', fontSize: '0.875rem' }}>
            <li>var(--theme-surface) - Background colors</li>
            <li>var(--theme-border-main) - Border colors</li>
            <li>var(--theme-primary) - Selected states</li>
            <li>var(--theme-border-radius) - Border radius</li>
            <li>var(--theme-elevation-1) - Shadows</li>
          </Box>
          <Typography variant="body2" sx={{ mt: 2, opacity: 0.7 }}>
            Try switching between light and dark modes to see seamless theme integration!
          </Typography>
        </Box>

        <ImageGallery
          images={sampleImages}
          productName="Theme-Compliant Product"
          variant="thumbnails"
          thumbnailPosition="left"
          aspectRatio="1"
          showZoom={true}
        />
      </Box>
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates theme compliance with CSS custom properties for perfect light/dark mode support.',
      },
    },
  },
};
