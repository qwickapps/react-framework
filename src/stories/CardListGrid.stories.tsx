/**
 * CardListGrid Component Stories - Generic grid layout with data binding support
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Box, Typography } from '@mui/material';
import { JsonDataProvider } from '@qwickapps/schema';
import type { Meta, StoryObj } from '@storybook/react';
import { Code } from '../components/blocks';
import { CardListGrid } from '../components/blocks/CardListGrid';
import QwickApp from '../components/QwickApp';

// Sample data for different card types
const sampleProducts = [
 {
 id: 'product-1',
 name: 'QwickApps React Framework',
 category: 'Frontend Framework',
 description: 'A comprehensive React framework for building modern web applications with AI-driven component generation and data binding.',
 shortDescription: 'React framework for modern web apps',
 features: ['AI-driven components', 'Data binding', 'Enterprise ready'],
 technologies: ['React', 'TypeScript', 'Material-UI'],
 status: 'launched',
 image: 'https://via.placeholder.com/400x200/1976d2/ffffff?text=QwickApps+Framework'
 },
 {
 id: 'product-2',
 name: 'QwickApps CMS',
 category: 'Content Management',
 description: 'Headless CMS built for developers with powerful API and visual editing capabilities.',
 shortDescription: 'Developer-friendly headless CMS',
 features: ['RESTful APIs', 'Visual editing', 'Multi-tenant'],
 technologies: ['Node.js', 'PostgreSQL', 'GraphQL'],
 status: 'beta',
 image: 'https://via.placeholder.com/400x200/388e3c/ffffff?text=QwickApps+CMS'
 },
 {
 id: 'product-3',
 name: 'QwickApps AI',
 category: 'AI Platform',
 description: 'AI-powered development assistant for generating components and optimizing code.',
 shortDescription: 'AI development assistant',
 features: ['Code generation', 'Performance optimization', 'Security analysis'],
 technologies: ['Python', 'TensorFlow', 'OpenAI API'],
 status: 'coming-soon',
 image: 'https://via.placeholder.com/400x200/7b1fa2/ffffff?text=QwickApps+AI'
 }
];

const sampleFeatures = [
 {
 id: 'feature-1',
 title: 'Lightning Fast',
 description: 'Optimized for performance with minimal bundle size and efficient rendering.',
 icon: ''
 },
 {
 id: 'feature-2',
 title: 'Type Safe',
 description: 'Built with TypeScript for better developer experience and fewer runtime errors.',
 icon: ''
 },
 {
 id: 'feature-3',
 title: 'Scalable',
 description: 'Enterprise-grade architecture that scales with your application needs.',
 icon: '📈'
 },
 {
 id: 'feature-4',
 title: 'Flexible',
 description: 'Customizable components that adapt to your design requirements.',
 icon: ''
 }
];

// Sample CMS data for data binding stories with nested structure
const sampleCmsData = {
 'cardListGrids': {
 'products': {
 items: sampleProducts,
 renderComponent: 'ProductCard',
 columns: 3,
 spacing: 'large',
 equalHeight: true,
 itemProps: { variant: 'compact', maxFeaturesCompact: 2 }
 },
 'features': {
 items: sampleFeatures,
 renderComponent: 'FeatureCard',
 columns: 2,
 spacing: 'large',
 equalHeight: false,
 itemProps: { variant: 'detailed' }
 },
 'product-showcase': {
 items: sampleProducts.slice(0, 2),
 renderComponent: 'ProductCard',
 columns: 2,
 spacing: 'huge',
 equalHeight: true,
 itemProps: { variant: 'detailed', showTechnologies: true }
 },
 'feature-compact': {
 items: sampleFeatures,
 renderComponent: 'FeatureCard',
 columns: 4,
 spacing: 'medium',
 equalHeight: true,
 itemProps: { variant: 'compact' }
 }
 }
};

const dataProvider = new JsonDataProvider({ data: sampleCmsData });

const meta = {
 title: 'Blocks/CardListGrid',
 component: CardListGrid,
 parameters: {
 layout: 'padded',
 docs: {
 description: {
 component: `CardListGrid is a versatile grid layout component that can display any type of card component with consistent spacing and responsive design.

**Key Features:**
- **Universal Grid Layout**: Works with ProductCard, FeatureCard, or any custom card component
- **Flexible Columns**: Support for 1-6 columns with responsive behavior
- **Smart Spacing**: Six spacing options from none to huge for perfect visual balance
- **Equal Height Control**: Optional equal height for consistent card alignment
- **Data Binding**: Full CMS integration through dataSource prop
- **Custom Rendering**: Support for custom render functions or predefined component types
- **Item Props**: Pass additional properties to all rendered items
- **Responsive Design**: Automatically adapts to different screen sizes

**Perfect For:**
- Product catalogs and showcases
- Feature comparison grids
- Service offerings displays
- Blog post collections
- Team member grids
- Portfolio layouts`,
 },
 },
 },
 tags: ['autodocs'],
} satisfies Meta<typeof CardListGrid>;

export default meta;
type Story = StoryObj<typeof CardListGrid>;

// Traditional Usage Examples
export const ProductGrid: Story = {
 render: () => (
 <QwickApp appId="cardlistgrid-products" appName='Product Grid'>
 <CardListGrid
 items={sampleProducts}
 renderComponent="ProductCard"
 columns={3}
 spacing="large"
 equalHeight={true}
 itemProps={{ variant: 'compact', maxFeaturesCompact: 2 }}
 />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Grid of ProductCards with consistent spacing and equal height alignment.',
 },
 },
 },
};

export const FeatureGrid: Story = {
 render: () => (
 <QwickApp appId="cardlistgrid-features" appName='Feature Grid'>
 <CardListGrid
 items={sampleFeatures}
 renderComponent="FeatureCard"
 columns={2}
 spacing="large"
 equalHeight={false}
 itemProps={{ variant: 'detailed' }}
 />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Grid of FeatureCards with detailed variant and natural height variation.',
 },
 },
 },
};

export const CustomRenderFunction: Story = {
 render: () => {
 const customRenderItem = (item: { id?: string; title?: string; description?: string }, index: number) => (
 <Box 
 key={item.id || index}
 sx={{ 
 p: 3, 
 border: 1, 
 borderColor: 'divider', 
 borderRadius: 2,
 textAlign: 'center',
 backgroundColor: 'background.paper'
 }}
 >
 <Typography variant="h6" gutterBottom>{item.name}</Typography>
 <Typography variant="body2" color="text.secondary">
 {item.shortDescription || item.description}
 </Typography>
 </Box>
 );

 return (
 <QwickApp appId="cardlistgrid-custom" appName='Custom Render Grid'>
 <CardListGrid
 items={sampleProducts}
 renderItem={customRenderItem}
 columns={3}
 spacing="medium"
 />
 </QwickApp>
 );
 },
 parameters: {
 docs: {
 description: {
 story: 'Using a custom render function to create unique card layouts with complete control over appearance.',
 },
 },
 },
};

export const ColumnVariations: Story = {
 render: () => (
 <QwickApp appId="cardlistgrid-columns" appName='Column Variations'>
 <Box sx={{ '& > *:not(:last-child)': { mb: 4 } }}>
 
 <Box>
 <Typography variant="h6" gutterBottom>Single Column Layout</Typography>
 <CardListGrid
 items={[sampleProducts[0]]}
 renderComponent="ProductCard"
 columns={1}
 spacing="large"
 itemProps={{ variant: 'detailed', showTechnologies: true }}
 />
 </Box>
 
 <Box>
 <Typography variant="h6" gutterBottom>Two Column Layout</Typography>
 <CardListGrid
 items={sampleProducts.slice(0, 2)}
 renderComponent="ProductCard"
 columns={2}
 spacing="large"
 itemProps={{ variant: 'compact' }}
 />
 </Box>
 
 <Box>
 <Typography variant="h6" gutterBottom>Four Column Layout</Typography>
 <CardListGrid
 items={sampleFeatures}
 renderComponent="FeatureCard"
 columns={4}
 spacing="medium"
 itemProps={{ variant: 'compact' }}
 />
 </Box>
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Different column configurations showing how the grid adapts to various layout needs.',
 },
 },
 },
};

export const SpacingOptions: Story = {
 render: () => (
 <QwickApp appId="cardlistgrid-spacing" appName='Spacing Options'>
 <Box sx={{ '& > *:not(:last-child)': { mb: 4 } }}>
 
 <Box>
 <Typography variant="h6" gutterBottom>Small Spacing</Typography>
 <CardListGrid
 items={sampleFeatures.slice(0, 2)}
 renderComponent="FeatureCard"
 columns={2}
 spacing="small"
 itemProps={{ variant: 'compact' }}
 />
 </Box>
 
 <Box>
 <Typography variant="h6" gutterBottom>Large Spacing</Typography>
 <CardListGrid
 items={sampleFeatures.slice(0, 2)}
 renderComponent="FeatureCard"
 columns={2}
 spacing="large"
 itemProps={{ variant: 'compact' }}
 />
 </Box>
 
 <Box>
 <Typography variant="h6" gutterBottom>Huge Spacing</Typography>
 <CardListGrid
 items={sampleFeatures.slice(0, 2)}
 renderComponent="FeatureCard"
 columns={2}
 spacing="huge"
 itemProps={{ variant: 'compact' }}
 />
 </Box>
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Different spacing options demonstrating visual density and breathing room between cards.',
 },
 },
 },
};

// Data Binding Examples
export const DataBindingBasic: Story = {
 render: () => (
 <QwickApp appId="cardlistgrid-data-binding" appName='CardListGrid Data Binding' dataSource={{ dataProvider }}>
 <Box>
 
 <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
 <Typography variant="h5" gutterBottom> Data-Driven CardListGrid</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 CardListGrid can be completely driven by CMS data, automatically rendering the specified component type with configured properties.
 </Typography>
 
 <Code title="Usage" language="tsx">{`<CardListGrid dataSource="cardListGrids.products" />`}</Code>
 
 <Code title="Data Structure" language="json">{JSON.stringify(sampleCmsData['cardListGrids']['products'], null, 2)}</Code>
 </Box>

 <CardListGrid dataSource="cardListGrids.products" />
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'CardListGrid with data binding - all configuration resolved from CMS data through dataSource.',
 },
 },
 },
};

export const DataBindingAdvanced: Story = {
 render: () => (
 <QwickApp appId="cardlistgrid-data-advanced" appName='Advanced CardListGrid Data Binding' dataSource={{ dataProvider }}>
 <Box>
 
 <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
 <Typography variant="h5" gutterBottom> Multiple Grid Types</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 Different CardListGrid instances can render different component types from separate data sources.
 </Typography>
 </Box>

 {/* Product Showcase */}
 <Box sx={{ mb: 4 }}>
 <Typography variant="h4" gutterBottom>Product Showcase</Typography>
 <CardListGrid dataSource="cardListGrids.product-showcase" />
 </Box>

 {/* Feature Grid */}
 <Box sx={{ mb: 4 }}>
 <Typography variant="h4" gutterBottom>Key Features</Typography>
 <CardListGrid dataSource="cardListGrids.feature-compact" />
 </Box>
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Advanced data binding with multiple grid types showcasing different component configurations.',
 },
 },
 },
};

export const DataBindingWithFallback: Story = {
 render: () => (
 <QwickApp appId="cardlistgrid-fallback" appName='CardListGrid Data Binding with Fallback' dataSource={{ dataProvider }}>
 <Box>
 
 <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
 <Typography variant="h5" gutterBottom> Fallback Support</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 CardListGrid gracefully handles missing data sources with fallback props and items.
 </Typography>
 
 <Code title="Fallback Usage" language="tsx">{`<CardListGrid 
 dataSource="cardListGrids.nonexistent" 
 items={fallbackItems}
 renderComponent="ProductCard"
 columns={2}
/>`}</Code>
 </Box>

 <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
 <Box>
 <Typography variant="h6" gutterBottom>Missing Data Source (Fallback)</Typography>
 <CardListGrid 
 dataSource="nonexistent.grid"
 items={sampleProducts.slice(0, 2)}
 renderComponent="ProductCard"
 columns={1}
 spacing="medium"
 itemProps={{ variant: 'compact' }}
 />
 </Box>
 <Box>
 <Typography variant="h6" gutterBottom>Valid Data Source</Typography>
 <CardListGrid dataSource="cardListGrids.features" />
 </Box>
 </Box>
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'CardListGrid with fallback props when dataSource is missing or unavailable.',
 },
 },
 },
};

export const RealWorldExample: Story = {
 render: () => (
 <QwickApp appId="cardlistgrid-real-world" appName='Real World CardListGrid Example' dataSource={{ dataProvider }}>
 <Box>
 
 {/* Hero Products */}
 <Box sx={{ mb: 6 }}>
 <Typography variant="h3" gutterBottom>Our Products</Typography>
 <Typography variant="h6" sx={{ mb: 4, opacity: 0.7 }}>
 Comprehensive solutions for modern web development
 </Typography>
 <CardListGrid dataSource="cardListGrids.products" />
 </Box>
 
 {/* Features Section */}
 <Box sx={{ mb: 6 }}>
 <Typography variant="h3" gutterBottom>Why Choose QwickApps?</Typography>
 <Typography variant="h6" sx={{ mb: 4, opacity: 0.7 }}>
 Built for developers who demand excellence
 </Typography>
 <CardListGrid dataSource="cardListGrids.feature-compact" />
 </Box>
 
 {/* Detailed Product Showcase */}
 <Box>
 <Typography variant="h3" gutterBottom>Featured Solutions</Typography>
 <Typography variant="h6" sx={{ mb: 4, opacity: 0.7 }}>
 Deep dive into our flagship offerings
 </Typography>
 <CardListGrid dataSource="cardListGrids.product-showcase" />
 </Box>
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Real-world example combining multiple CardListGrid instances in a complete landing page layout.',
 },
 },
 },
};

export const EmptyAndLoadingStates: Story = {
 render: () => (
 <QwickApp appId="cardlistgrid-states" appName='CardListGrid States' dataSource={{ dataProvider }}>
 <Box>
 
 <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
 <Typography variant="h5" gutterBottom> State Management</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 CardListGrid handles various states including empty data and component type switching.
 </Typography>
 </Box>

 <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
 <Box>
 <Typography variant="h6" gutterBottom>Empty Items (Returns null)</Typography>
 <CardListGrid 
 items={[]}
 renderComponent="ProductCard"
 columns={2}
 />
 <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
 Component returns null when no items are provided
 </Typography>
 </Box>
 <Box>
 <Typography variant="h6" gutterBottom>Valid Grid</Typography>
 <CardListGrid dataSource="cardListGrids.features" />
 </Box>
 </Box>
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Demonstrates empty state handling and normal grid display states.',
 },
 },
 },
};