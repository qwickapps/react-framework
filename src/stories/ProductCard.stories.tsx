/**
 * ProductCard Component Stories - Product showcase with data binding support
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Box, Typography } from '@mui/material';
import { JsonDataProvider } from '@qwickapps/schema';
import type { Meta, StoryObj } from '@storybook/react';
import { Code } from '../components/blocks';
import type { Product } from '../components/blocks/ProductCard';
import { ProductCard } from '../components/blocks/ProductCard';
import { GridLayout } from '../components/layout';
import QwickApp from '../components/QwickApp';

// Sample product data
const sampleProducts: Product[] = [
 {
 id: 'qwickapps-react-framework',
 name: 'QwickApps React Framework',
 category: 'Frontend Framework',
 description: 'A comprehensive React framework for building modern web applications with AI-driven component generation, data binding, and enterprise-grade features.',
 shortDescription: 'React framework for modern web apps',
 features: [
 'AI-driven component generation',
 'Automatic data binding',
 'Enterprise authentication',
 'Real-time collaboration',
 'Advanced theming system',
 'Comprehensive testing suite'
 ],
 technologies: ['React', 'TypeScript', 'Material-UI', 'Node.js'],
 status: 'launched',
 image: 'https://via.placeholder.com/400x200/1976d2/ffffff?text=QwickApps+Framework',
 url: 'https://qwickapps.com/framework'
 },
 {
 id: 'qwickapps-cms',
 name: 'QwickApps CMS',
 category: 'Content Management',
 description: 'Headless CMS built for developers with powerful API, visual editing, and seamless integration with modern frameworks.',
 shortDescription: 'Developer-friendly headless CMS',
 features: [
 'RESTful and GraphQL APIs',
 'Visual content editing',
 'Multi-tenant architecture',
 'Advanced caching',
 'Role-based permissions'
 ],
 technologies: ['Node.js', 'PostgreSQL', 'Redis', 'GraphQL'],
 status: 'beta',
 image: 'https://via.placeholder.com/400x200/388e3c/ffffff?text=QwickApps+CMS'
 },
 {
 id: 'qwickapps-ai',
 name: 'QwickApps AI Assistant',
 category: 'AI/ML Platform',
 description: 'Intelligent development assistant that helps generate components, optimize code, and automate development workflows.',
 shortDescription: 'AI-powered development assistant',
 features: [
 'Code generation',
 'Performance optimization',
 'Security analysis',
 'Documentation generation',
 'Test automation'
 ],
 technologies: ['Python', 'TensorFlow', 'OpenAI API', 'Docker'],
 status: 'coming-soon',
 image: 'https://via.placeholder.com/400x200/7b1fa2/ffffff?text=QwickApps+AI'
 }
];

// Sample CMS data for data binding stories
const sampleCmsData = {
 'products': {
 'framework': {
 product: sampleProducts[0],
 variant: 'detailed',
 showImage: true,
 showTechnologies: true
 },
 'cms-beta': {
 product: sampleProducts[1],
 variant: 'compact',
 showImage: true,
 showTechnologies: false,
 maxFeaturesCompact: 3
 },
 'ai-coming': {
 product: sampleProducts[2],
 variant: 'detailed',
 showImage: true,
 showTechnologies: true
 },
 'showcase': sampleProducts.map(product => ({
 product,
 variant: 'compact',
 showImage: true,
 maxFeaturesCompact: 2
 })),
 'detailed-showcase': sampleProducts.map(product => ({
 product,
 variant: 'detailed',
 showImage: true,
 showTechnologies: true
 }))
 }
};

const dataProvider = new JsonDataProvider({ data: sampleCmsData });

const meta = {
 title: 'Blocks/ProductCard',
 component: ProductCard,
 parameters: {
 layout: 'padded',
 docs: {
 description: {
 component: `ProductCard is a flexible component for showcasing products and services with both traditional props and data binding through dataSource.

**Key Features:**
- **Two Display Variants**: Compact for grids and lists, Detailed for individual showcases
- **Product Status Support**: Handles launched, beta, and coming-soon product states
- **Smart Feature Display**: Automatic feature limiting in compact mode with "+X more" indicators
- **Technology Badges**: Optional technology stack display for technical products
- **Custom Actions**: Support for multiple action buttons with different variants
- **Data Binding**: Full CMS integration through dataSource prop
- **Image Handling**: Optional product images with fallback support
- **Responsive Design**: Adapts beautifully across all screen sizes

**Perfect For:**
- Product showcases and catalogs
- Service offerings and portfolios 
- Software tool presentations
- Feature comparison grids
- Beta product announcements
- Coming soon product teasers`,
 },
 },
 },
 tags: ['autodocs'],
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof ProductCard>;

// Traditional Usage Examples
export const LaunchedProduct: Story = {
 render: () => (
 <QwickApp appId="productcard-launched" appName='Launched ProductCard'>
 <ProductCard
 product={sampleProducts[0]}
 variant="detailed"
 />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'ProductCard displaying a launched product with detailed variant showing full description and technology stack.',
 },
 },
 },
};

export const ProductStatusVariants: Story = {
 render: () => (
 <QwickApp appId="productcard-statuses" appName='ProductCard Status Variants'>
 <GridLayout columns={3} spacing="large" equalHeight>
 <ProductCard
 product={sampleProducts[0]}
 variant="compact"
 maxFeaturesCompact={2}
 />
 <ProductCard
 product={sampleProducts[1]}
 variant="compact"
 maxFeaturesCompact={2}
 />
 <ProductCard
 product={sampleProducts[2]}
 variant="compact"
 maxFeaturesCompact={2}
 />
 </GridLayout>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Different product status states: launched (green), beta (orange), and coming-soon (disabled) with appropriate action buttons.',
 },
 },
 },
};

export const VariantComparison: Story = {
 render: () => (
 <QwickApp appId="productcard-variants" appName='ProductCard Variant Comparison'>
 <Box sx={{ '& > *:not(:last-child)': { mb: 4 } }}>

 <Box>
 <Typography variant="h6" gutterBottom>Compact Variant</Typography>
 <Typography variant="body2" sx={{ mb: 2, opacity: 0.7 }}>
 Ideal for product grids and lists with limited space
 </Typography>
 <GridLayout columns={2} spacing="medium">
 <ProductCard
 product={sampleProducts[0]}
 variant="compact"
 maxFeaturesCompact={3}
 />
 <ProductCard
 product={sampleProducts[1]}
 variant="compact"
 maxFeaturesCompact={2}
 showTechnologies={false}
 />
 </GridLayout>
 </Box>

 <Box>
 <Typography variant="h6" gutterBottom>Detailed Variant</Typography>
 <Typography variant="body2" sx={{ mb: 2, opacity: 0.7 }}>
 Perfect for individual product showcases with complete information
 </Typography>
 <ProductCard
 product={sampleProducts[0]}
 variant="detailed"
 showTechnologies={true}
 />
 </Box>

 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Side-by-side comparison of compact vs detailed variants showing different use cases and information density.',
 },
 },
 },
};

export const CustomizationOptions: Story = {
 render: () => (
 <QwickApp appId="productcard-customization" appName='ProductCard Customization'>
 <GridLayout columns={2} spacing="large">

 <ProductCard
 product={sampleProducts[0]}
 variant="detailed"
 showImage={false}
 showTechnologies={false}
 />

 <ProductCard
 product={sampleProducts[0]}
 variant="detailed"
 actions={[
 {
 id: 'demo',
 label: 'View Demo',
 variant: 'contained',
 color: 'primary',
 onClick: () => alert('Demo clicked!')
 },
 {
 id: 'docs',
 label: 'Documentation',
 variant: 'outlined',
 color: 'primary',
 onClick: () => alert('Docs clicked!')
 }
 ]}
 />

 </GridLayout>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Customization options: hiding images/technologies and adding custom action buttons.',
 },
 },
 },
};

// Data Binding Examples
export const DataBindingBasic: Story = {
 render: () => (
 <QwickApp appId="productcard-data-binding" appName='ProductCard Data Binding' dataSource={{ dataProvider }}>
 <Box>

 <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
 <Typography variant="h5" gutterBottom> Data-Driven ProductCard</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 ProductCard components can be driven entirely by CMS data using the dataSource prop.
 </Typography>

 <Code title="Usage" language="tsx">{`<ProductCard dataSource="products.framework" />`}</Code>

 <Code title="Data Structure" language="json">{JSON.stringify(sampleCmsData.products.framework, null, 2)}</Code>
 </Box>

 <ProductCard dataSource="products.framework" />

 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'ProductCard with data binding - all props resolved from CMS data through dataSource.',
 },
 },
 },
};

export const DataBindingAdvanced: Story = {
 render: () => (
 <QwickApp appId="productcard-data-advanced" appName='Advanced ProductCard Data Binding' dataSource={{ dataProvider }}>
 <Box>

 <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
 <Typography variant="h5" gutterBottom> Multiple Data Sources</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 Different ProductCard components can pull from different data sources with varying configurations.
 </Typography>
 </Box>

 <GridLayout columns={3} spacing="large" equalHeight>
 <ProductCard dataSource="products.framework" />
 <ProductCard dataSource="products.cms-beta" />
 <ProductCard dataSource="products.ai-coming" />
 </GridLayout>

 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Advanced data binding with multiple data sources showcasing different product statuses and configurations.',
 },
 },
 },
};

export const DataBindingWithFallback: Story = {
 render: () => (
 <QwickApp appId="productcard-fallback" appName='ProductCard Data Binding with Fallback' dataSource={{ dataProvider }}>
 <Box>

 <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
 <Typography variant="h5" gutterBottom> Fallback Support</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 ProductCard components gracefully handle missing data sources with fallback props.
 </Typography>

 <Code title="Fallback Usage" language="tsx">{`<ProductCard 
 dataSource="nonexistent.product" 
 product={fallbackProduct}
 variant="compact"
/>`}</Code>
 </Box>

 <GridLayout columns={2} spacing="large">
 <ProductCard
 dataSource="nonexistent.product"
 product={sampleProducts[0]}
 variant="compact"
 maxFeaturesCompact={3}
 />
 <ProductCard dataSource="products.framework" />
 </GridLayout>

 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'ProductCard with fallback props when dataSource is missing or unavailable.',
 },
 },
 },
};

export const ProductShowcaseGrid: Story = {
 render: () => (
 <QwickApp appId="productcard-showcase" appName='Product Showcase Grid'>
 <Box>

 <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
 <Typography variant="h5" gutterBottom>🏪 Product Showcase</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 Real-world example of ProductCard in a product catalog layout.
 </Typography>
 </Box>

 <GridLayout columns={3} spacing="large" equalHeight>
 {sampleProducts.map((product) => (
 <ProductCard
 key={product.id}
 product={product}
 variant="compact"
 maxFeaturesCompact={2}
 />
 ))}
 </GridLayout>

 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Product catalog layout with multiple ProductCards showing different statuses and consistent spacing.',
 },
 },
 },
};

export const RealWorldExample: Story = {
 render: () => (
 <QwickApp appId="productcard-real-world" appName='Real World ProductCard Example' dataSource={{ dataProvider }}>
 <Box>
 {/* Featured Product - Data Driven */}
 <Box sx={{ mb: 4 }}>
 <Typography variant="h4" gutterBottom>Featured Product</Typography>
 <ProductCard dataSource="products.framework" />
 </Box>

 {/* Product Grid - Mixed Data Sources */}
 <Box sx={{ mb: 4 }}>
 <Typography variant="h4" gutterBottom>Our Products</Typography>
 <GridLayout columns={3} spacing="large" equalHeight>
 <ProductCard dataSource="products.framework" />
 <ProductCard dataSource="products.cms-beta" />
 <ProductCard dataSource="products.ai-coming" />
 </GridLayout>
 </Box>

 {/* Coming Soon Section */}
 <Box>
 <Typography variant="h4" gutterBottom>Coming Soon</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.7 }}>
 Get excited about our upcoming releases
 </Typography>
 <ProductCard
 product={sampleProducts[2]}
 variant="detailed"
 showTechnologies={true}
 />
 </Box>
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Real-world example combining data-driven ProductCards with traditional usage in a complete product showcase page.',
 },
 },
 },
};

export const EmptyAndLoadingStates: Story = {
 render: () => (
 <QwickApp appId="productcard-states" appName='ProductCard States' dataSource={{ dataProvider }}>
 <Box>

 <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
 <Typography variant="h5" gutterBottom> State Management</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 ProductCard handles various states including empty data and loading scenarios.
 </Typography>
 </Box>

 <GridLayout columns={2} spacing="large">
 <Box>
 <Typography variant="h6" gutterBottom>Empty State</Typography>
 <ProductCard />
 </Box>
 <Box>
 <Typography variant="h6" gutterBottom>Valid Product</Typography>
 <ProductCard dataSource="products.framework" />
 </Box>
 </GridLayout>

 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Demonstrates empty state handling and normal product display states.',
 },
 },
 },
};