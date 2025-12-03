/**
 * FeatureGrid Component Stories - Feature showcase grids with data binding support
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Box, Typography } from '@mui/material';
import { JsonDataProvider } from '@qwickapps/schema';
import type { Meta, StoryObj } from '@storybook/react';
import QwickApp from '../components/QwickApp';
import { Code } from '../components/blocks';
import FeatureGrid from '../components/blocks/FeatureGrid';

// Sample CMS data for data binding stories
const sampleCmsData = {
 'pages.home.features': {
 features: [
 {
 id: 'fast',
 title: ' Lightning Fast',
 description: 'Optimized performance for instant loading and smooth user experiences',
 icon: ''
 },
 {
 id: 'beautiful',
 title: ' Beautiful UI',
 description: 'Professional components and layouts that work perfectly out of the box',
 icon: ''
 },
 {
 id: 'mobile',
 title: ' Mobile First',
 description: 'Responsive design principles built into every component and layout',
 icon: ''
 }
 ],
 columns: 3,
 gap: 'medium',
 equalHeight: true
 },
 'product.key-features': {
 features: JSON.stringify([
 {
 id: 'integration',
 title: 'Easy Integration',
 description: 'Simple setup and configuration with minimal boilerplate code required',
 icon: '🔌'
 },
 {
 id: 'typescript',
 title: 'Type Safe',
 description: 'Full TypeScript support with comprehensive type definitions and IntelliSense',
 icon: ''
 },
 {
 id: 'extensible',
 title: 'Highly Extensible',
 description: 'Modular architecture allows for easy customization and feature extension',
 icon: '🧩'
 },
 {
 id: 'documented',
 title: 'Well Documented',
 description: 'Comprehensive documentation with live examples and best practice guides',
 icon: '📚'
 }
 ]),
 columns: 2,
 gap: 'large',
 equalHeight: false
 },
 'marketing.benefits-grid': {
 features: [
 {
 id: 'save-time',
 title: 'Save Development Time',
 description: 'Pre-built components reduce development time by up to 70%',
 icon: '⏰'
 },
 {
 id: 'reduce-costs',
 title: 'Reduce Costs',
 description: 'Less development time means lower project costs and faster ROI',
 icon: '💰'
 },
 {
 id: 'scale-easily',
 title: 'Scale with Confidence',
 description: 'Built-in best practices ensure your application scales smoothly',
 icon: '📈'
 },
 {
 id: 'team-productivity',
 title: 'Boost Team Productivity',
 description: 'Consistent patterns and components improve team collaboration',
 icon: '👥'
 },
 {
 id: 'user-experience',
 title: 'Enhanced User Experience',
 description: 'Professional design system ensures consistent and delightful UX',
 icon: ''
 },
 {
 id: 'future-proof',
 title: 'Future Proof Architecture',
 description: 'Regular updates and modern architecture keep your app current',
 icon: ''
 }
 ],
 columns: 3,
 gap: 'medium',
 equalHeight: true
 },
 'company.tech-stack': {
 features: [
 {
 id: 'react',
 title: 'React 18',
 description: 'Built on the latest React with Concurrent Features',
 icon: '⚛'
 },
 {
 id: 'typescript',
 title: 'TypeScript',
 description: 'Type-safe development with excellent IDE support',
 icon: '📘'
 },
 {
 id: 'mui',
 title: 'Material-UI',
 description: 'Professional component library with customizable theming',
 icon: ''
 },
 {
 id: 'storybook',
 title: 'Storybook',
 description: 'Interactive component documentation and testing',
 icon: '📖'
 },
 {
 id: 'testing',
 title: 'Testing Suite',
 description: 'Comprehensive testing with Jest and React Testing Library',
 icon: '🧪'
 }
 ],
 columns: 4,
 gap: 'small',
 equalHeight: true
 }
};

const dataProvider = new JsonDataProvider({ data: sampleCmsData });

const meta = {
 title: 'Blocks/FeatureGrid',
 component: FeatureGrid,
 parameters: {
 layout: 'fullscreen',
 docs: {
 description: {
 component: `FeatureGrid is a powerful responsive grid component for showcasing multiple features with support for both traditional props and data binding through dataSource.

**Key Features:**
- **Responsive Grid Layout**: Customizable column count with automatic responsive behavior
- **Feature Cards**: Rich feature display with icons, titles, descriptions, and actions
- **Flexible Spacing**: Three gap options for optimal visual hierarchy
- **Equal Height Control**: Option for consistent grid appearance or natural content flow
- **Data Binding**: Full CMS integration with JSON array support
- **Array Processing**: Smart parsing of JSON strings and nested feature objects

**Perfect For:**
- Product feature showcases and benefit highlights
- Service offerings and capability demonstrations
- Technology stack presentations
- Marketing benefit grids and value propositions
- Feature comparison and highlight sections`,
 },
 },
 },
 tags: ['autodocs'],
} satisfies Meta<typeof FeatureGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample features for traditional examples
const sampleFeatures = [
 {
 id: 'traditional-1',
 title: ' Fast Performance',
 description: 'Optimized for speed and efficiency with minimal bundle size',
 icon: ''
 },
 {
 id: 'traditional-2',
 title: ' Developer Friendly',
 description: 'Intuitive APIs and comprehensive TypeScript support',
 icon: ''
 },
 {
 id: 'traditional-3',
 title: ' Highly Customizable',
 description: 'Flexible theming and component customization options',
 icon: ''
 }
];

// Traditional Usage Examples
export const BasicFeatureGrid: Story = {
 render: () => (
 <QwickApp appId="featuregrid-basic" appName='Basic FeatureGrid'>
 <FeatureGrid
 features={sampleFeatures}
 columns={3}
 gap="medium"
 equalHeight={true}
 />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Basic FeatureGrid with traditional props - features array, columns, gap, and equal height.',
 },
 },
 },
};

export const ColumnVariants: Story = {
 render: () => (
 <QwickApp appId="featuregrid-columns" appName='FeatureGrid Column Variants'>
 <Box sx={{ '& > *:not(:last-child)': { mb: 4 } }}>

 <Box>
 <Typography variant="h6" gutterBottom>Single Column Layout</Typography>
 <FeatureGrid
 features={sampleFeatures.slice(0, 1)}
 columns={1}
 gap="medium"
 equalHeight={true}
 />
 </Box>

 <Box>
 <Typography variant="h6" gutterBottom>Two Column Layout</Typography>
 <FeatureGrid
 features={sampleFeatures.slice(0, 2)}
 columns={2}
 gap="medium"
 equalHeight={true}
 />
 </Box>

 <Box>
 <Typography variant="h6" gutterBottom>Three Column Layout (Default)</Typography>
 <FeatureGrid
 features={sampleFeatures}
 columns={3}
 gap="medium"
 equalHeight={true}
 />
 </Box>

 <Box>
 <Typography variant="h6" gutterBottom>Four Column Layout</Typography>
 <FeatureGrid
 features={[...sampleFeatures, {
 id: 'additional-feature',
 title: ' Analytics',
 description: 'Built-in analytics and performance monitoring',
 icon: ''
 }]}
 columns={4}
 gap="medium"
 equalHeight={true}
 />
 </Box>

 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Different column configurations: 1, 2, 3 (default), and 4 columns.',
 },
 },
 },
};

export const GapVariants: Story = {
 render: () => (
 <QwickApp appId="featuregrid-gaps" appName='FeatureGrid Gap Variants'>
 <Box sx={{ '& > *:not(:last-child)': { mb: 4 } }}>

 <Box>
 <Typography variant="h6" gutterBottom>Small Gap</Typography>
 <FeatureGrid
 features={sampleFeatures}
 columns={3}
 gap="small"
 equalHeight={true}
 />
 </Box>

 <Box>
 <Typography variant="h6" gutterBottom>Medium Gap (Default)</Typography>
 <FeatureGrid
 features={sampleFeatures}
 columns={3}
 gap="medium"
 equalHeight={true}
 />
 </Box>

 <Box>
 <Typography variant="h6" gutterBottom>Large Gap</Typography>
 <FeatureGrid
 features={sampleFeatures}
 columns={3}
 gap="large"
 equalHeight={true}
 />
 </Box>

 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Gap spacing options: small (compact), medium (standard), large (spacious).',
 },
 },
 },
};

export const EqualHeightComparison: Story = {
 render: () => (
 <QwickApp appId="featuregrid-height" appName='FeatureGrid Equal Height'>
 <Box sx={{ '& > *:not(:last-child)': { mb: 4 } }}>

 <Box>
 <Typography variant="h6" gutterBottom>Equal Height: True (Default)</Typography>
 <Typography variant="body2" sx={{ mb: 2, opacity: 0.7 }}>
 All cards have the same height regardless of content length
 </Typography>
 <FeatureGrid
 features={[
 {
 id: 'short',
 title: 'Short Feature',
 description: 'Brief description.',
 icon: ''
 },
 {
 id: 'medium',
 title: 'Medium Length Feature',
 description: 'This feature has a moderately long description that spans multiple lines.',
 icon: ''
 },
 {
 id: 'long',
 title: 'Very Long Feature Description',
 description: 'This feature has an extensively long description that demonstrates how the equal height feature works by ensuring all cards maintain the same height regardless of content length, creating a consistent and professional grid appearance.',
 icon: '📜'
 }
 ]}
 columns={3}
 gap="medium"
 equalHeight={true}
 />
 </Box>

 <Box>
 <Typography variant="h6" gutterBottom>Equal Height: False</Typography>
 <Typography variant="body2" sx={{ mb: 2, opacity: 0.7 }}>
 Cards adjust to their natural content height
 </Typography>
 <FeatureGrid
 features={[
 {
 id: 'short-2',
 title: 'Short Feature',
 description: 'Brief description.',
 icon: ''
 },
 {
 id: 'medium-2',
 title: 'Medium Length Feature',
 description: 'This feature has a moderately long description that spans multiple lines.',
 icon: ''
 },
 {
 id: 'long-2',
 title: 'Very Long Feature Description',
 description: 'This feature has an extensively long description that demonstrates how the equal height feature works by ensuring all cards maintain the same height regardless of content length, creating a consistent and professional grid appearance.',
 icon: '📜'
 }
 ]}
 columns={3}
 gap="medium"
 equalHeight={false}
 />
 </Box>

 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Comparison between equal height (consistent appearance) and natural height (content-driven).',
 },
 },
 },
};

// Data Binding Examples
export const DataBindingBasic: Story = {
 render: () => (
 <QwickApp appId="featuregrid-data-binding" appName='FeatureGrid Data Binding' dataSource={{ dataProvider }}>
 <Box>

 <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
 <Typography variant="h5" gutterBottom> Data-Driven FeatureGrid</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 FeatureGrid components can be driven entirely by CMS data using the dataSource prop.
 </Typography>

 <Code title="Usage" language="tsx">{`<FeatureGrid dataSource="pages.home.features" />`}</Code>

 <Code title="Data Structure" language="json">{JSON.stringify(sampleCmsData['pages.home.features'], null, 2)}</Code>
 </Box>

 <FeatureGrid dataSource="pages.home.features" />

 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'FeatureGrid with data binding - all props resolved from CMS data through dataSource.',
 },
 },
 },
};

export const DataBindingAdvanced: Story = {
 render: () => (
 <QwickApp appId="featuregrid-data-advanced" appName='Advanced FeatureGrid Data Binding' dataSource={{ dataProvider }}>
 <Box>

 <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
 <Typography variant="h5" gutterBottom> Multiple Data Sources</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 Different FeatureGrid components can pull from different data sources with varying configurations.
 </Typography>
 </Box>

 {/* Product Features */}
 <Box sx={{ mb: 4 }}>
 <Typography variant="h4" gutterBottom sx={{ p: 2, backgroundColor: 'primary.main', color: 'primary.contrastText', borderRadius: 1 }}>
 Product Features
 </Typography>
 <FeatureGrid dataSource="product.key-features" />
 </Box>

 {/* Marketing Benefits */}
 <Box sx={{ mb: 4 }}>
 <Typography variant="h4" gutterBottom sx={{ p: 2, backgroundColor: 'secondary.main', color: 'secondary.contrastText', borderRadius: 1 }}>
 Why Choose QwickApps?
 </Typography>
 <FeatureGrid dataSource="marketing.benefits-grid" />
 </Box>

 {/* Tech Stack */}
 <Box>
 <Typography variant="h4" gutterBottom sx={{ p: 2, backgroundColor: 'success.main', color: 'success.contrastText', borderRadius: 1 }}>
 Technology Stack
 </Typography>
 <FeatureGrid dataSource="company.tech-stack" />
 </Box>

 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Advanced data binding with multiple data sources showcasing different feature grid configurations.',
 },
 },
 },
};

export const DataBindingWithFallback: Story = {
 render: () => (
 <QwickApp appId="featuregrid-fallback" appName='FeatureGrid Data Binding with Fallback' dataSource={{ dataProvider }}>
 <Box>

 <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
 <Typography variant="h5" gutterBottom> Fallback Support</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 FeatureGrid components gracefully handle missing data sources with fallback props.
 </Typography>

 <Code title="Fallback Usage" language="tsx">{`<FeatureGrid 
 dataSource="nonexistent.features" 
 features={fallbackFeatures}
 columns={2}
 gap="large"
/>`}</Code>
 </Box>

 <FeatureGrid
 dataSource="nonexistent.features"
 features={[
 {
 id: 'fallback-1',
 title: ' Reliable Fallbacks',
 description: 'Components gracefully handle missing data with fallback content',
 icon: ''
 },
 {
 id: 'fallback-2',
 title: ' Error Recovery',
 description: 'Robust error handling ensures your application never breaks',
 icon: ''
 }
 ]}
 columns={2}
 gap="large"
 equalHeight={true}
 />

 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'FeatureGrid with fallback props when dataSource is missing or unavailable.',
 },
 },
 },
};

export const JsonStringParsing: Story = {
 render: () => (
 <QwickApp appId="featuregrid-json" appName='FeatureGrid JSON String Parsing' dataSource={{ dataProvider }}>
 <Box>

 <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
 <Typography variant="h5" gutterBottom> JSON String Processing</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 FeatureGrid automatically parses JSON strings for features data, perfect for CMS integration.
 </Typography>

 <Code title="JSON String Data" language="json">{`{
 "features": ${JSON.stringify([
 { id: 'example', title: 'Example Feature', description: 'Parsed from JSON string' }
 ], null, 2)}
}`}</Code>
 </Box>

 <FeatureGrid dataSource="product.key-features" />

 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'FeatureGrid with automatic JSON string parsing for CMS-friendly data formats.',
 },
 },
 },
};

export const RealWorldExample: Story = {
 render: () => (
 <QwickApp appId="featuregrid-real-world" appName='Real World FeatureGrid Example' dataSource={{ dataProvider }}>
 <Box>

 {/* Main Features - Data Driven */}
 <Box sx={{ mb: 6, p: 4, backgroundColor: 'primary.main', color: 'primary.contrastText', borderRadius: 2 }}>
 <Typography variant="h2" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', mb: 1 }}>
 Why Developers Love QwickApps
 </Typography>
 <Typography variant="h6" sx={{ textAlign: 'center', opacity: 0.9, mb: 4, maxWidth: '600px', mx: 'auto' }}>
 Discover the features that make QwickApps the preferred choice for modern React development
 </Typography>
 <FeatureGrid dataSource="pages.home.features" />
 </Box>

 {/* Benefits Grid - Data Driven */}
 <Box sx={{ mb: 6 }}>
 <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
 Business Benefits
 </Typography>
 <FeatureGrid dataSource="marketing.benefits-grid" />
 </Box>

 {/* Technical Features - Traditional Props */}
 <Box sx={{ p: 4, backgroundColor: 'background.paper', borderRadius: 2 }}>
 <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
 Technical Excellence
 </Typography>
 <FeatureGrid
 features={[
 {
 id: 'performance',
 title: '🏎 Optimized Performance',
 description: 'Tree shaking, code splitting, and optimized bundle sizes for lightning-fast applications',
 icon: '🏎'
 },
 {
 id: 'accessibility',
 title: '♿ Accessibility First',
 description: 'WCAG 2.1 compliant components with screen reader support and keyboard navigation',
 icon: '♿'
 },
 {
 id: 'testing',
 title: '🧪 Testing Ready',
 description: 'Pre-configured testing setup with comprehensive test utilities and examples',
 icon: '🧪'
 },
 {
 id: 'documentation',
 title: '📖 Living Documentation',
 description: 'Interactive Storybook documentation with live examples and API references',
 icon: '📖'
 },
 {
 id: 'theming',
 title: ' Advanced Theming',
 description: 'Powerful theming system with design tokens and consistent visual language',
 icon: ''
 },
 {
 id: 'community',
 title: '👥 Active Community',
 description: 'Growing community of developers with active support and regular contributions',
 icon: '👥'
 }
 ]}
 columns={3}
 gap="large"
 equalHeight={true}
 />
 </Box>

 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Real-world example combining data-driven FeatureGrids with traditional usage for comprehensive feature showcases.',
 },
 },
 },
};