/**
 * Image Component Stories - Comprehensive image display with data binding support
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Box, Typography, Alert, Grid } from '@mui/material';
import { JsonDataProvider } from '@qwickapps/schema';
import type { Meta, StoryObj } from '@storybook/react';
import { Image } from '../components/blocks';
import QwickApp from '../components/QwickApp';
import React from 'react';

// Sample image URLs for different use cases
const sampleImages = {
  landscape: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
  portrait: 'https://images.unsplash.com/photo-1494790108755-2616c57b8a14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
  square: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
  technology: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2225&q=80',
  product: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  fallback: 'https://via.placeholder.com/400x300/e0e0e0/666666?text=Fallback+Image'
};

// Sample CMS data for data binding examples
const sampleCmsData = {
  gallery: {
    heroImage: {
      src: sampleImages.landscape,
      alt: 'Beautiful mountain landscape at sunset',
      width: 800,
      height: 600,
      objectFit: 'cover',
      objectPosition: 'center',
      title: 'Mountain Sunset - Professional Photography',
      showLoading: true,
      borderRadius: '12px'
    },
    profileImage: {
      src: sampleImages.portrait,
      alt: 'Professional headshot of a smiling woman',
      width: 200,
      height: 200,
      objectFit: 'cover',
      objectPosition: 'center',
      borderRadius: '50%',
      showLoading: true,
      draggable: false
    },
    productImage: {
      src: sampleImages.product,
      alt: 'Premium headphones on white background',
      width: 400,
      height: 300,
      objectFit: 'contain',
      objectPosition: 'center',
      showLoading: true,
      showError: true,
      fallbackSrc: sampleImages.fallback,
      borderRadius: '8px'
    },
    responsiveImage: {
      src: sampleImages.technology,
      alt: 'Modern laptop setup with code on screen',
      objectFit: 'cover',
      objectPosition: 'center',
      sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
      srcSet: `${sampleImages.technology}&w=400 400w, ${sampleImages.technology}&w=800 800w, ${sampleImages.technology}&w=1200 1200w`,
      showLoading: true,
      borderRadius: '16px'
    }
  }
};

const dataProvider = new JsonDataProvider({ data: sampleCmsData });

const meta = {
  title: 'Components/Image',
  component: Image,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `Image is a comprehensive image display component with advanced features for responsive design, loading states, and accessibility.

**Key Features:**
- **Responsive Images**: Support for srcSet and sizes for optimized loading
- **Object Fit Control**: Full control over how images fit their containers
- **Loading States**: Visual feedback during image loading with customizable placeholders  
- **Error Handling**: Graceful fallback for failed image loads
- **Accessibility**: Proper alt text and title support for screen readers
- **Lazy Loading**: Built-in support for performance optimization
- **Data Binding**: Full CMS integration through dataSource prop
- **Customization**: Border radius, positioning, and styling options
- **Fallback Support**: Automatic fallback to alternative image sources
- **Touch Friendly**: Configurable draggable behavior for touch interfaces

**Perfect For:**
- Hero sections and banners
- Product galleries and catalogs
- Profile pictures and avatars  
- Content illustrations and media
- Responsive image grids
- Progressive web app imagery`,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof Image>;

// Traditional Usage Examples
export const BasicImage: Story = {
  render: () => (
    <QwickApp appId="image-basic" appName='Basic Image Example'>
      <Image 
        src={sampleImages.landscape}
        alt="Beautiful mountain landscape at sunset"
        width={600}
        height={400}
        showLoading={true}
      />
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic image display with loading state and proper alt text for accessibility.',
      },
    },
  },
};

export const ResponsiveImage: Story = {
  render: () => (
    <QwickApp appId="image-responsive" appName='Responsive Image Example'>
      <Image 
        src={sampleImages.technology}
        alt="Modern laptop setup with code on screen"
        objectFit="cover"
        objectPosition="center"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        srcSet={`${sampleImages.technology}&w=400 400w, ${sampleImages.technology}&w=800 800w, ${sampleImages.technology}&w=1200 1200w`}
        showLoading={true}
        borderRadius="16px"
        style={{ width: '100%', maxWidth: '800px', height: '400px' }}
      />
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Responsive image with srcSet for different screen sizes and optimized loading.',
      },
    },
  },
};

export const ObjectFitModes: Story = {
  render: () => (
    <QwickApp appId="image-object-fit" appName='Object Fit Examples'>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" gutterBottom>Cover (default)</Typography>
          <Image 
            src={sampleImages.landscape}
            alt="Landscape with cover fit"
            width={300}
            height={200}
            objectFit="cover"
            borderRadius="8px"
            showLoading={true}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" gutterBottom>Contain</Typography>
          <Image 
            src={sampleImages.landscape}
            alt="Landscape with contain fit"
            width={300}
            height={200}
            objectFit="contain"
            borderRadius="8px"
            showLoading={true}
            style={{ backgroundColor: '#f5f5f5' }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" gutterBottom>Fill</Typography>
          <Image 
            src={sampleImages.landscape}
            alt="Landscape with fill fit"
            width={300}
            height={200}
            objectFit="fill"
            borderRadius="8px"
            showLoading={true}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" gutterBottom>Scale Down</Typography>
          <Image 
            src={sampleImages.square}
            alt="Small image with scale-down fit"
            width={300}
            height={200}
            objectFit="scale-down"
            borderRadius="8px"
            showLoading={true}
            style={{ backgroundColor: '#f5f5f5' }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" gutterBottom>None</Typography>
          <Image 
            src={sampleImages.square}
            alt="Image with no fitting"
            width={300}
            height={200}
            objectFit="none"
            borderRadius="8px"
            showLoading={true}
            style={{ backgroundColor: '#f5f5f5' }}
          />
        </Grid>
      </Grid>
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different object-fit modes showing how images resize within their containers.',
      },
    },
  },
};

export const LoadingAndErrorStates: Story = {
  render: () => (
    <QwickApp appId="image-states" appName='Loading and Error States'>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>With Loading State</Typography>
          <Image 
            src={sampleImages.portrait}
            alt="Portrait with loading state"
            width={300}
            height={300}
            objectFit="cover"
            borderRadius="8px"
            showLoading={true}
          />
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>Error with Fallback</Typography>
          <Image 
            src="https://invalid-url-that-will-fail.jpg"
            alt="Image that will fail to load"
            width={300}
            height={300}
            objectFit="cover"
            borderRadius="8px"
            showError={true}
            fallbackSrc={sampleImages.fallback}
          />
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>Error State Only</Typography>
          <Image 
            src="https://another-invalid-url.jpg"
            alt="Image that will show error"
            width={300}
            height={300}
            objectFit="cover"
            borderRadius="8px"
            showError={true}
          />
        </Grid>
      </Grid>
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Loading states and error handling including fallback image support.',
      },
    },
  },
};

export const ShapeVariations: Story = {
  render: () => (
    <QwickApp appId="image-shapes" appName='Image Shape Variations'>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>Circular Avatar</Typography>
          <Image 
            src={sampleImages.portrait}
            alt="Circular profile picture"
            width={150}
            height={150}
            objectFit="cover"
            objectPosition="center"
            borderRadius="50%"
            draggable={false}
            showLoading={true}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>Rounded Rectangle</Typography>
          <Image 
            src={sampleImages.product}
            alt="Product image with rounded corners"
            width={200}
            height={150}
            objectFit="cover"
            borderRadius="16px"
            showLoading={true}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>Sharp Rectangle</Typography>
          <Image 
            src={sampleImages.technology}
            alt="Technology image with sharp corners"
            width={200}
            height={150}
            objectFit="cover"
            borderRadius="0px"
            showLoading={true}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>Custom Radius</Typography>
          <Image 
            src={sampleImages.square}
            alt="Image with custom border radius"
            width={150}
            height={150}
            objectFit="cover"
            borderRadius="24px"
            showLoading={true}
          />
        </Grid>
      </Grid>
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Various border radius options for different image shapes and use cases.',
      },
    },
  },
};

export const InteractiveFeatures: Story = {
  render: () => (
    <QwickApp appId="image-interactive" appName='Interactive Image Features'>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>Clickable Image</Typography>
          <Image 
            src={sampleImages.landscape}
            alt="Clickable landscape image"
            width={400}
            height={300}
            objectFit="cover"
            borderRadius="12px"
            showLoading={true}
            onClick={() => alert('Image clicked!')}
            style={{ cursor: 'pointer', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.02)' } }}
            title="Click me!"
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>Non-draggable Image</Typography>
          <Image 
            src={sampleImages.portrait}
            alt="Non-draggable portrait"
            width={300}
            height={400}
            objectFit="cover"
            borderRadius="12px"
            draggable={false}
            showLoading={true}
            title="This image cannot be dragged"
          />
        </Grid>
      </Grid>
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive features including click handlers and drag control.',
      },
    },
  },
};

// Data Binding Examples
export const DataBoundHeroImage: Story = {
  render: () => (
    <QwickApp appId="image-hero-data" appName='Data-Bound Hero Image'>
      <Image 
        dataSource={dataProvider.createDataSource('gallery.heroImage')}
        bindingOptions={{
          cache: true,
          cacheTTL: 300000,
          strict: false
        }}
      />
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Hero image loaded from CMS data with caching enabled for performance.',
      },
    },
  },
};

export const DataBoundProfileAvatar: Story = {
  render: () => (
    <QwickApp appId="image-avatar-data" appName='Data-Bound Profile Avatar'>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Image 
          dataSource={dataProvider.createDataSource('gallery.profileImage')}
          bindingOptions={{
            cache: true,
            strict: false
          }}
        />
        <Box>
          <Typography variant="h6">Sarah Johnson</Typography>
          <Typography variant="body2" color="text.secondary">Senior Developer</Typography>
        </Box>
      </Box>
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Profile avatar loaded from CMS with circular styling and non-draggable setting.',
      },
    },
  },
};

export const DataBoundProductImage: Story = {
  render: () => (
    <QwickApp appId="image-product-data" appName='Data-Bound Product Image'>
      <Image 
        dataSource={dataProvider.createDataSource('gallery.productImage')}
        bindingOptions={{
          cache: true,
          strict: false
        }}
      />
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Product image with fallback support and error handling from CMS data.',
      },
    },
  },
};

export const DataBoundResponsiveImage: Story = {
  render: () => (
    <QwickApp appId="image-responsive-data" appName='Data-Bound Responsive Image'>
      <Box sx={{ width: '100%', maxWidth: '800px' }}>
        <Image 
          dataSource={dataProvider.createDataSource('gallery.responsiveImage')}
          bindingOptions={{
            cache: true,
            strict: false
          }}
          style={{ width: '100%', height: '400px' }}
        />
      </Box>
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Responsive image with srcSet and sizes loaded from CMS for optimal performance.',
      },
    },
  },
};

// ModelView Serialization Examples - Demonstrating the new ModelView base class
export const ModelViewBasic: Story = {
  render: () => {
    // Demonstrate that Image extends ModelView
    const imageInstance = new Image({
      src: sampleImages.landscape,
      alt: 'Mountain landscape',
      width: 400,
      height: 300,
      objectFit: 'cover',
      borderRadius: '12px',
      showLoading: true
    });
    
    // Show that it has ModelView properties
    const hasToJson = typeof imageInstance.toJson === 'function';
    const hasFromJson = typeof (imageInstance.constructor as Record<string, unknown>).fromJson === 'function';
    const tagName = (imageInstance.constructor as Record<string, unknown>).tagName as string;
    const version = (imageInstance.constructor as Record<string, unknown>).version as string;
    
    return (
      <QwickApp appId="image-modelview" appName='Image ModelView Demonstration'>
        <Box sx={{ mb: 4 }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2" component="div">
              <strong>Image Component extends ModelView:</strong><br />
              • Has toJson method: {hasToJson ? '✅ Yes' : '❌ No'}<br />
              • Has fromJson method: {hasFromJson ? '✅ Yes' : '❌ No'}<br />
              • Component tag name: <code>{tagName}</code><br />
              • Component version: <code>{version}</code>
            </Typography>
          </Alert>
          
          {imageInstance.render()}
        </Box>
      </QwickApp>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates that Image extends ModelView and has serialization capabilities.',
      },
    },
  },
};

// Import makeSerializationStory for standardized serialization demos
import { makeSerializationStory } from './_templates/SerializationTemplate';

// Enhanced Serialization Examples - "WebView for React" functionality
export const SerializationBasic: Story = {
  render: makeSerializationStory(() => (
    <Image 
      src={sampleImages.landscape}
      alt="Serializable mountain landscape"
      width={600}
      height={400}
      objectFit="cover"
      objectPosition="center"
      borderRadius="16px"
      showLoading={true}
      title="Beautiful mountain vista"
    />
  )),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates basic Image component serialization and deserialization using ComponentTransformer.',
      },
    },
  },
};

export const SerializationComplex: Story = {
  render: makeSerializationStory(() => (
    <Image 
      src={sampleImages.technology}
      alt="Complex responsive technology image"
      width={800}
      height={500}
      objectFit="cover"
      objectPosition="center"
      loading="lazy"
      borderRadius="20px"
      showLoading={true}
      showError={true}
      fallbackSrc={sampleImages.fallback}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      srcSet={`${sampleImages.technology}&w=400 400w, ${sampleImages.technology}&w=800 800w, ${sampleImages.technology}&w=1200 1200w`}
      title="Advanced technology setup with multiple monitors"
      draggable={false}
    />
  )),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates complex Image serialization with responsive images, fallbacks, and all advanced features.',
      },
    },
  },
};

export const SerializationWithDataBinding: Story = {
  render: makeSerializationStory(() => (
    <Image 
      dataSource={dataProvider.createDataSource('gallery.heroImage')}
      bindingOptions={{
        cache: true,
        cacheTTL: 300000,
        strict: false
      }}
    />
  )),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates serialization of data-bound Image components with CMS integration preserved.',
      },
    },
  },
};