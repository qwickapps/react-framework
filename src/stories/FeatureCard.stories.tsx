/**
 * FeatureCard Component Stories - Individual feature display cards with data binding support
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Box, Typography } from '@mui/material';
import { JsonDataProvider } from '@qwickapps/schema';
import type { Meta, StoryObj } from '@storybook/react';
import QwickApp from '../components/QwickApp';
import { Code } from '../components/blocks';
import FeatureCard from '../components/blocks/FeatureCard';
import { DataProvider } from '../contexts/DataContext';

// Sample CMS data for data binding stories
const sampleCmsData = {
 'features': {
 'lightning-fast': {
 feature: {
 id: 'lightning-fast',
 title: ' Lightning Fast Performance',
 description: 'Optimized for speed with sub-millisecond response times and efficient memory usage for smooth user experiences',
 icon: ''
 },
 variant: 'standard',
 elevation: 3
 },
 'benefits-list': {
 features: [
 'Zero configuration setup required',
 'Full TypeScript support included',
 'Hot module reloading for development',
 'Built-in testing framework integration',
 'Production-ready build optimization',
 'Comprehensive documentation and examples'
 ],
 variant: 'list',
 title: 'Key Benefits',
 elevation: 1
 },
 'developer-experience': {
 feature: {
 id: 'developer-experience',
 title: ' Exceptional Developer Experience',
 description: 'Intuitive APIs, comprehensive documentation, and powerful tooling make development efficient and enjoyable',
 icon: ''
 },
 actions: [
 {
 id: 'learn-more',
 label: 'Learn More',
 variant: 'contained',
 color: 'primary'
 },
 {
 id: 'try-demo',
 label: 'Try Demo',
 variant: 'outlined',
 color: 'secondary'
 }
 ],
 variant: 'standard',
 elevation: 4
 },
 'enterprise-benefits': {
 features: [
 'Enterprise-grade security and compliance',
 'Scalable architecture for high-traffic applications',
 'Modern React patterns and best practices',
 'Comprehensive testing and quality assurance',
 '24/7 professional support and maintenance'
 ],
 variant: 'list',
 title: 'Enterprise Features',
 elevation: 0
 },
 'cutting-edge': {
 feature: {
 id: 'cutting-edge',
 title: ' Cutting-Edge Technology',
 description: 'Built with the latest React features, modern tooling, and industry best practices to ensure your application stays current',
 icon: ''
 },
 variant: 'standard',
 elevation: 6
 }
 }
};

const dataProvider = new JsonDataProvider({ data: sampleCmsData });

const meta = {
 title: 'Blocks/FeatureCard',
 component: FeatureCard,
 parameters: {
 layout: 'padded',
 docs: {
 description: {
 component: `FeatureCard is a flexible card component supporting both individual feature display and simple feature lists with data binding through dataSource.

**Key Features:**
- **Dual Variants**: Standard cards with rich content or simple list format
- **Interactive Elements**: Hover effects, click handlers, and custom actions
- **Flexible Content**: Icons, titles, descriptions, and action buttons
- **Elevation Control**: Material-UI Paper elevation for visual hierarchy
- **Data Binding**: Full CMS integration with JSON parsing support
- **Theme Integration**: Consistent styling with Material-UI theme system

**Perfect For:**
- Individual feature highlights and benefit showcases
- Feature comparison cards and capability displays
- Simple feature lists and bullet point summaries
- Interactive elements with call-to-action buttons
- Product cards and service offerings`,
 },
 },
 },
 tags: ['autodocs'],
} satisfies Meta<typeof FeatureCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample features for traditional examples
const sampleFeature = {
 id: 'sample-feature',
 title: ' Advanced Tooling',
 description: 'Professional development tools and utilities that streamline your workflow and boost productivity',
 icon: ''
};

const sampleFeatures = [
 'Comprehensive component library',
 'Advanced theming capabilities',
 'Built-in accessibility support',
 'Performance optimization tools',
 'Responsive design system'
];

// Traditional Usage Examples
export const StandardFeatureCard: Story = {
 render: () => (
 <QwickApp appId="featurecard-standard" appName='Standard FeatureCard'>
 <FeatureCard
 feature={sampleFeature}
 variant="standard"
 elevation={2}
 />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Standard FeatureCard with traditional props - feature object, variant, and elevation.',
 },
 },
 },
};

export const ListFeatureCard: Story = {
 render: () => (
 <QwickApp appId="featurecard-list" appName='List FeatureCard'>
 <FeatureCard
 features={sampleFeatures}
 variant="list"
 title="Framework Features"
 elevation={1}
 />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'List FeatureCard variant showing simple bullet-point features.',
 },
 },
 },
};

export const ElevationVariants: Story = {
 render: () => (
 <QwickApp appId="featurecard-elevation" appName='FeatureCard Elevation Variants'>
 <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3, mb: 4 }}>
 
 <Box>
 <Typography variant="h6" gutterBottom>Elevation 0 (Flat)</Typography>
 <FeatureCard
 feature={{
 id: 'flat-feature',
 title: ' Flat Design',
 description: 'Clean, minimal appearance with no shadow depth',
 icon: ''
 }}
 elevation={0}
 />
 </Box>
 
 <Box>
 <Typography variant="h6" gutterBottom>Elevation 2 (Default)</Typography>
 <FeatureCard
 feature={{
 id: 'default-feature',
 title: ' Standard Card',
 description: 'Balanced elevation for most use cases',
 icon: ''
 }}
 elevation={2}
 />
 </Box>
 
 <Box>
 <Typography variant="h6" gutterBottom>Elevation 4 (Raised)</Typography>
 <FeatureCard
 feature={{
 id: 'raised-feature',
 title: '📈 Emphasized Card',
 description: 'Higher elevation for visual prominence',
 icon: '📈'
 }}
 elevation={4}
 />
 </Box>
 
 <Box>
 <Typography variant="h6" gutterBottom>Elevation 8 (High)</Typography>
 <FeatureCard
 feature={{
 id: 'high-feature',
 title: ' Premium Feature',
 description: 'Maximum elevation for special highlights',
 icon: ''
 }}
 elevation={8}
 />
 </Box>
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Different elevation options showing visual depth and hierarchy.',
 },
 },
 },
};

export const VariantComparison: Story = {
 render: () => (
 <QwickApp appId="featurecard-variants" appName='FeatureCard Variant Comparison'>
 <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
 
 <Box>
 <Typography variant="h5" gutterBottom>Standard Variant</Typography>
 <Typography variant="body2" sx={{ mb: 2, opacity: 0.7 }}>
 Rich cards with icons, titles, descriptions, and actions
 </Typography>
 <FeatureCard
 feature={{
 id: 'rich-feature',
 title: ' Rich Feature Display',
 description: 'Comprehensive feature showcase with icon, detailed description, and interactive elements for maximum engagement',
 icon: ''
 }}
 actions={[
 {
 id: 'explore',
 label: 'Explore',
 variant: 'contained',
 color: 'primary',
 onClick: () => console.log('Explore clicked')
 }
 ]}
 elevation={3}
 />
 </Box>
 
 <Box>
 <Typography variant="h5" gutterBottom>List Variant</Typography>
 <Typography variant="body2" sx={{ mb: 2, opacity: 0.7 }}>
 Simple bullet-point lists for concise information
 </Typography>
 <FeatureCard
 features={[
 'Clean, minimal design approach',
 'Quick information scanning',
 'Space-efficient layout',
 'Perfect for feature summaries',
 'Easy to digest content'
 ]}
 variant="list"
 title="List Benefits"
 elevation={1}
 />
 </Box>
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Side-by-side comparison of standard vs list variants.',
 },
 },
 },
};

// Data Binding Examples
export const DataBindingBasic: Story = {
 render: () => (
 <QwickApp appId="featurecard-data-binding" appName='FeatureCard Data Binding'>
 <DataProvider dataSource={{ dataProvider }}>
 <Box>
 
 <Box sx={{ p: 4, backgroundColor: 'background.paper', mb: 4 }}>
 <Typography variant="h5" gutterBottom> Data-Driven FeatureCard</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 FeatureCard components can be driven entirely by CMS data using the dataSource prop.
 </Typography>
 
 <Code title="Usage" language="tsx">{`<FeatureCard dataSource="features.lightning-fast" />`}</Code>
 
 <Code title="Data Structure" language="json">{JSON.stringify(sampleCmsData.features['lightning-fast'], null, 2)}</Code>
 </Box>

 <FeatureCard dataSource="features.lightning-fast" />
 
 </Box>
 </DataProvider>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'FeatureCard with data binding - all props resolved from CMS data through dataSource.',
 },
 },
 },
};

export const DataBindingAdvanced: Story = {
 render: () => (
 <QwickApp appId="featurecard-data-advanced" appName='Advanced FeatureCard Data Binding'>
 <DataProvider dataSource={{ dataProvider }}>
 <Box>
 
 <Box sx={{ p: 4, backgroundColor: 'background.paper', mb: 4 }}>
 <Typography variant="h5" gutterBottom> Multiple Data Sources</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 Different FeatureCard components can pull from different data sources with varying configurations.
 </Typography>
 </Box>

 <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 4 }}>
 
 {/* Standard Feature Card */}
 <Box>
 <Typography variant="h6" gutterBottom>Performance Feature</Typography>
 <FeatureCard dataSource="features.lightning-fast" />
 </Box>
 
 {/* Innovation Card with Higher Elevation */}
 <Box>
 <Typography variant="h6" gutterBottom>Innovation Highlight</Typography>
 <FeatureCard dataSource="features.cutting-edge" />
 </Box>
 
 {/* Feature List */}
 <Box>
 <Typography variant="h6" gutterBottom>Benefits List</Typography>
 <FeatureCard dataSource="features.benefits-list" />
 </Box>
 
 </Box>
 
 </Box>
 </DataProvider>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Advanced data binding with multiple data sources showcasing different card configurations.',
 },
 },
 },
};

export const JsonStringParsing: Story = {
 render: () => (
 <QwickApp appId="featurecard-json" appName='FeatureCard JSON String Parsing'>
 <DataProvider dataSource={{ dataProvider }}>
 <Box>
 
 <Box sx={{ p: 4, backgroundColor: 'background.paper', mb: 4 }}>
 <Typography variant="h5" gutterBottom> JSON String Processing</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 FeatureCard automatically parses JSON strings for feature data and actions, perfect for CMS integration.
 </Typography>
 
 <Code title="JSON Feature Data" language="json">{`{
 "feature": ${JSON.stringify({ id: 'example', title: 'Example Feature', description: 'Parsed from JSON string' }, null, 2)},
 "actions": ${JSON.stringify([{ id: 'action', label: 'Learn More', variant: 'contained' }], null, 2)}
}`}</Code>
 </Box>

 <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
 
 <Box>
 <Typography variant="h6" gutterBottom>JSON Feature + Actions</Typography>
 <FeatureCard dataSource="features.developer-experience" />
 </Box>
 
 <Box>
 <Typography variant="h6" gutterBottom>JSON Features List</Typography>
 <FeatureCard dataSource="features.enterprise-benefits" />
 </Box>
 
 </Box>
 
 </Box>
 </DataProvider>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'FeatureCard with automatic JSON string parsing for CMS-friendly data formats.',
 },
 },
 },
};

export const DataBindingWithFallback: Story = {
 render: () => (
 <QwickApp appId="featurecard-fallback" appName='FeatureCard Data Binding with Fallback'>
 <DataProvider dataSource={{ dataProvider }}>
 <Box>
 
 <Box sx={{ p: 4, backgroundColor: 'background.paper', mb: 4 }}>
 <Typography variant="h5" gutterBottom> Fallback Support</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 FeatureCard components gracefully handle missing data sources with fallback props.
 </Typography>
 
 <Code title="Fallback Usage" language="tsx">{`<FeatureCard 
 dataSource="nonexistent.feature" 
 feature={fallbackFeature}
 variant="standard"
 elevation={3}
/>`}</Code>
 </Box>

 <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
 
 <Box>
 <Typography variant="h6" gutterBottom>Standard Fallback</Typography>
 <FeatureCard 
 dataSource="nonexistent.feature"
 feature={{
 id: 'fallback-standard',
 title: ' Reliable Fallbacks',
 description: 'Components gracefully handle missing data with fallback content to ensure your application never breaks',
 icon: ''
 }}
 variant="standard"
 elevation={3}
 />
 </Box>
 
 <Box>
 <Typography variant="h6" gutterBottom>List Fallback</Typography>
 <FeatureCard 
 dataSource="nonexistent.features"
 features={[
 'Graceful error handling',
 'Fallback content support',
 'Robust data binding',
 'Never breaks your layout'
 ]}
 variant="list"
 title="Fallback Features"
 elevation={1}
 />
 </Box>
 
 </Box>
 
 </Box>
 </DataProvider>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'FeatureCard with fallback props when dataSource is missing or unavailable.',
 },
 },
 },
};

export const InteractiveFeatures: Story = {
 render: () => (
 <QwickApp appId="featurecard-interactive" appName='Interactive FeatureCard Features'>
 <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 4 }}>
 
 <FeatureCard
 feature={{
 id: 'clickable-card',
 title: '👆 Clickable Card',
 description: 'Entire card is clickable with hover effects and cursor feedback',
 icon: '👆'
 }}
 onClick={() => alert('Card clicked!')}
 elevation={2}
 />
 
 <FeatureCard
 feature={{
 id: 'action-buttons',
 title: ' Action Buttons',
 description: 'Multiple call-to-action buttons with different variants and colors',
 icon: ''
 }}
 actions={[
 {
 id: 'primary-action',
 label: 'Primary',
 variant: 'contained',
 color: 'primary',
 onClick: () => alert('Primary action!')
 },
 {
 id: 'secondary-action',
 label: 'Secondary',
 variant: 'outlined',
 color: 'secondary',
 onClick: () => alert('Secondary action!')
 }
 ]}
 elevation={3}
 />
 
 <FeatureCard
 feature={{
 id: 'high-elevation',
 title: '📈 High Impact',
 description: 'Higher elevation creates visual prominence and draws attention',
 icon: '📈'
 }}
 elevation={6}
 />
 
 <FeatureCard
 features={[
 'Interactive hover states',
 'Smooth transitions',
 'Accessibility support',
 'Keyboard navigation',
 'Focus indicators'
 ]}
 variant="list"
 title="Interactive Features"
 elevation={1}
 />
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Interactive features including click handlers, action buttons, hover effects, and visual emphasis.',
 },
 },
 },
};

export const RealWorldExample: Story = {
 render: () => (
 <QwickApp appId="featurecard-real-world" appName='Real World FeatureCard Example'>
 <DataProvider dataSource={{ dataProvider }}>
 <Box>
 
 {/* Hero Feature Card */}
 <Box sx={{ mb: 6, textAlign: 'center' }}>
 <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
 Why Choose QwickApps React Framework?
 </Typography>
 <Box sx={{ maxWidth: '400px', mx: 'auto' }}>
 <FeatureCard dataSource="features.lightning-fast" />
 </Box>
 </Box>
 
 {/* Feature Grid with Mixed Variants */}
 <Box sx={{ mb: 6 }}>
 <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
 Complete Development Solution
 </Typography>
 
 <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 4 }}>
 
 {/* Main Feature Highlight */}
 <FeatureCard dataSource="features.developer-experience" />
 
 {/* Benefits List */}
 <FeatureCard dataSource="features.benefits-list" />
 
 </Box>
 </Box>
 
 {/* Bottom Feature Grid */}
 <Box>
 <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
 Enterprise Ready
 </Typography>
 
 <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
 
 {/* Innovation Card */}
 <FeatureCard dataSource="features.cutting-edge" />
 
 {/* Enterprise Features */}
 <FeatureCard dataSource="features.enterprise-benefits" />
 
 </Box>
 </Box>
 
 </Box>
 </DataProvider>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Real-world example combining data-driven FeatureCards with different variants and configurations for a complete marketing page.',
 },
 },
 },
};