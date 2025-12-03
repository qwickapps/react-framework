/**
 * HeroBlock Component Stories - Hero sections with data binding support
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Box, Typography, Alert, Paper } from '@mui/material';
import { JsonDataProvider } from '@qwickapps/schema';
import type { Meta, StoryObj } from '@storybook/react';
import QwickApp from '../components/QwickApp';
import { Code } from '../components/blocks';
import HeroBlock from '../components/blocks/HeroBlock';
import { DataProvider } from '../contexts/DataContext';
import { ComponentTransformer } from '../schemas/transformers/ComponentTransformer';
import { makeSerializationStory } from './_templates/SerializationTemplate';
import React from 'react';

// Sample CMS data for data binding stories
const sampleCmsData = {
 'heroes': {
 'home': {
 title: 'Build Apps 10x Faster with QwickApps',
 subtitle: 'The most developer-friendly React framework that turns complex UI development into a joy. Build production-ready applications in hours, not weeks.',
 backgroundGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
 actions: [
 { label: 'Get Started Free', variant: 'primary', buttonSize: 'large' },
 { label: 'Watch Demo', variant: 'outlined', buttonSize: 'large', icon: '▶' }
 ],
 textAlign: 'center',
 blockHeight: 'large',
 overlayOpacity: 0.6
 },
 'product-launch': {
 title: ' Revolutionary New Framework',
 subtitle: 'Skip months of boilerplate setup. Focus on what makes your application unique.',
 backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
 actions: [
 { label: 'Launch Now', variant: 'primary', buttonSize: 'large' },
 { label: 'View Features', variant: 'text', buttonSize: 'large' }
 ],
 textAlign: 'center',
 blockHeight: 'viewport',
 overlayOpacity: 0.7
 },
 'about': {
 title: 'Empowering Developers Worldwide',
 subtitle: 'Our mission is to make web development accessible, enjoyable, and productive for everyone.',
 backgroundColor: 'primary',
 actions: [
 { label: 'Our Story', variant: 'secondary', buttonSize: 'medium' },
 { label: 'Join Team', variant: 'outlined', buttonSize: 'medium' }
 ],
 textAlign: 'left',
 blockHeight: 'medium'
 },
 'minimal': {
 title: 'Simple. Powerful. Elegant.',
 subtitle: 'Everything you need, nothing you don\'t.',
 backgroundColor: 'surface',
 blockHeight: 'small',
 textAlign: 'center'
 }
 }
};

const dataProvider = new JsonDataProvider({ data: sampleCmsData });

const meta = {
 title: 'Blocks/HeroBlock',
 component: HeroBlock,
 parameters: {
 layout: 'fullscreen',
 docs: {
 description: {
 component: `HeroBlock is a powerful full-width hero section component that supports both traditional props and data binding through dataSource.

**Key Features:**
- **Flexible Backgrounds**: Support for images, gradients, and theme colors
- **Responsive Typography**: Automatically scales from mobile to desktop
- **Action Buttons**: Built-in support for multiple call-to-action buttons
- **Height Variants**: Small, medium, large, and full viewport options
- **Text Alignment**: Left, center, or right alignment options
- **Data Binding**: Full CMS integration through dataSource prop
- **Overlay Control**: Customizable overlay opacity for background images

**Perfect For:**
- Landing page heroes and primary messaging
- Product launch announcements
- Marketing campaigns and promotions 
- About pages and company messaging
- Feature highlights and value propositions`,
 },
 },
 },
 tags: ['autodocs'],
} satisfies Meta<typeof HeroBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

// Traditional Usage Examples
export const BasicHero: Story = {
 render: () => (
 <QwickApp appId="heroblock-basic" appName='Basic HeroBlock'>
 <HeroBlock
 title="Welcome to Our Platform"
 subtitle="Build amazing applications with our comprehensive toolkit"
 backgroundColor="primary"
 textAlign="center"
 blockHeight="medium"
 actions={[
 { label: 'Get Started', variant: 'primary', buttonSize: 'large' },
 { label: 'Learn More', variant: 'outlined', buttonSize: 'large' }
 ]}
 />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Basic HeroBlock with traditional props - title, subtitle, actions, and theme background.',
 },
 },
 },
};

export const BackgroundVariants: Story = {
 render: () => (
 <QwickApp appId="heroblock-backgrounds" appName='HeroBlock Backgrounds'>
 <Box sx={{ '& > *:not(:last-child)': { mb: 2 } }}>
 
 <HeroBlock
 title="Gradient Background Hero"
 subtitle="Beautiful gradients create visual impact"
 backgroundGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
 blockHeight="medium"
 actions={[{ label: 'Explore', variant: 'primary', buttonSize: 'large' }]}
 />
 
 <HeroBlock
 title="Image Background Hero"
 subtitle="High-quality images with customizable overlay"
 backgroundImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
 overlayOpacity={0.6}
 blockHeight="medium"
 actions={[{ label: 'Discover', variant: 'primary', buttonSize: 'large' }]}
 />
 
 <HeroBlock
 title="Theme Color Background"
 subtitle="Consistent with your application theme"
 backgroundColor="secondary"
 blockHeight="medium"
 actions={[{ label: 'Continue', variant: 'primary', buttonSize: 'large' }]}
 />
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Different background options: gradients, images with overlay, and theme colors.',
 },
 },
 },
};

export const HeightVariants: Story = {
 render: () => (
 <QwickApp appId="heroblock-heights" appName='HeroBlock Heights'>
 <Box sx={{ '& > *:not(:last-child)': { mb: 1 } }}>
 
 <HeroBlock
 title="Small Height Hero"
 subtitle="Compact hero for minimal messaging"
 backgroundColor="primary"
 blockHeight="small"
 textAlign="center"
 />
 
 <HeroBlock
 title="Medium Height Hero (Default)"
 subtitle="Balanced height for most use cases"
 backgroundColor="secondary"
 blockHeight="medium"
 textAlign="center"
 />
 
 <HeroBlock
 title="Large Height Hero"
 subtitle="Expansive hero for maximum impact"
 backgroundGradient="linear-gradient(45deg, #2196F3, #21CBF3)"
 blockHeight="large"
 textAlign="center"
 />
 
 <Box sx={{ height: '50vh', overflow: 'hidden' }}>
 <HeroBlock
 title="Viewport Height Hero"
 subtitle="Full-screen dramatic effect"
 backgroundGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
 blockHeight="viewport"
 textAlign="center"
 />
 </Box>
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Available height options: small (300px), medium (400px), large (600px), and viewport (100vh).',
 },
 },
 },
};

export const TextAlignment: Story = {
 render: () => (
 <QwickApp appId="heroblock-alignment" appName='HeroBlock Text Alignment'>
 <Box sx={{ '& > *:not(:last-child)': { mb: 2 } }}>
 
 <HeroBlock
 title="Left Aligned Hero"
 subtitle="Content-heavy heroes work well with left alignment"
 backgroundColor="surface"
 textAlign="left"
 blockHeight="medium"
 actions={[{ label: 'Read More', variant: 'primary' }]}
 />
 
 <HeroBlock
 title="Center Aligned Hero"
 subtitle="Traditional center alignment for maximum impact"
 backgroundGradient="linear-gradient(45deg, #2196F3, #21CBF3)"
 textAlign="center"
 blockHeight="medium"
 actions={[{ label: 'Get Started', variant: 'primary' }]}
 />
 
 <HeroBlock
 title="Right Aligned Hero"
 subtitle="Unique visual balance with right alignment"
 backgroundColor="secondary"
 textAlign="right"
 blockHeight="medium"
 actions={[{ label: 'Learn More', variant: 'primary' }]}
 />
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Text alignment options: left (content-heavy), center (traditional), right (unique balance).',
 },
 },
 },
};

// Data Binding Examples
export const DataBindingBasic: Story = {
 render: () => (
 <QwickApp appId="heroblock-data-binding" appName='HeroBlock Data Binding'>
 <DataProvider dataSource={{ dataProvider }}>
 <Box>
 
 <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
 <Typography variant="h5" gutterBottom> Data-Driven HeroBlock</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 HeroBlock components can be driven entirely by CMS data using the dataSource prop.
 </Typography>
 
 <Code title="Usage" language="tsx">{`<HeroBlock dataSource="heroes.home" />`}</Code>
 
 <Code title="Data Structure" language="json">{JSON.stringify(sampleCmsData.heroes.home, null, 2)}</Code>
 </Box>

 <HeroBlock dataSource="heroes.home" />
 
 </Box>
 </DataProvider>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'HeroBlock with data binding - all props resolved from CMS data through dataSource.',
 },
 },
 },
};

export const DataBindingAdvanced: Story = {
 render: () => (
 <QwickApp appId="heroblock-data-advanced" appName='Advanced HeroBlock Data Binding'>
 <DataProvider dataSource={{ dataProvider }}>
 <Box>
 
 <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
 <Typography variant="h5" gutterBottom> Multiple Data Sources</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 Different HeroBlock components can pull from different data sources with varying configurations.
 </Typography>
 </Box>

 {/* Product Launch Hero */}
 <HeroBlock dataSource="heroes.product-launch" />
 
 {/* About Hero */}
 <HeroBlock dataSource="heroes.about" />
 
 {/* Minimal Hero */}
 <HeroBlock dataSource="heroes.minimal" />
 
 </Box>
 </DataProvider>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Advanced data binding with multiple data sources showcasing different hero styles and configurations.',
 },
 },
 },
};

export const DataBindingWithFallback: Story = {
 render: () => (
 <QwickApp appId="heroblock-fallback" appName='HeroBlock Data Binding with Fallback'>
 <DataProvider dataSource={{ dataProvider }}>
 <Box>
 
 <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
 <Typography variant="h5" gutterBottom> Fallback Support</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 HeroBlock components gracefully handle missing data sources with fallback props.
 </Typography>
 
 <Code title="Fallback Usage" language="tsx">{`<HeroBlock 
 dataSource="nonexistent.hero" 
 title="Fallback Hero Title"
 subtitle="Shows when data source is missing"
 backgroundColor="default"
/>`}</Code>
 </Box>

 <HeroBlock 
 dataSource="nonexistent.hero"
 title="Fallback Hero Content"
 subtitle="This hero appears when the dataSource doesn't exist, ensuring your page never breaks"
 backgroundColor="default"
 blockHeight="medium"
 textAlign="center"
 actions={[
 { label: 'Fallback Action', variant: 'primary' }
 ]}
 />
 
 </Box>
 </DataProvider>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'HeroBlock with fallback props when dataSource is missing or unavailable.',
 },
 },
 },
};

export const RealWorldExample: Story = {
 render: () => (
 <QwickApp appId="heroblock-real-world" appName='Real World HeroBlock Example'>
 <DataProvider dataSource={{ dataProvider }}>
 <Box>
 
 {/* Main Hero - Data Driven */}
 <HeroBlock dataSource="heroes.home" />
 
 {/* Product Launch Hero - Data Driven */}
 <HeroBlock dataSource="heroes.product-launch">
 <Typography sx={{ 
 mt: 3, 
 fontSize: '1.1rem', 
 maxWidth: '600px', 
 opacity: 0.9,
 fontWeight: 500 
 }}>
 Join thousands of developers who have already transformed their workflow
 </Typography>
 </HeroBlock>
 
 {/* About Hero - Traditional Props with Custom Content */}
 <HeroBlock
 title="Ready to Get Started?"
 subtitle="Join our community and start building amazing applications today"
 backgroundColor="primary"
 blockHeight="medium"
 textAlign="center"
 actions={[
 { label: 'Create Account', variant: 'primary', buttonSize: 'large' },
 { label: 'Browse Examples', variant: 'text', buttonSize: 'large' }
 ]}
 >
 <Box sx={{ 
 mt: 4, 
 display: 'flex', 
 justifyContent: 'center', 
 gap: 4, 
 flexWrap: 'wrap',
 opacity: 0.9 
 }}>
 <Box sx={{ textAlign: 'center' }}>
 <Typography variant="h4" sx={{ fontWeight: 'bold' }}>10k+</Typography>
 <Typography>Developers</Typography>
 </Box>
 <Box sx={{ textAlign: 'center' }}>
 <Typography variant="h4" sx={{ fontWeight: 'bold' }}>500+</Typography>
 <Typography>Companies</Typography>
 </Box>
 <Box sx={{ textAlign: 'center' }}>
 <Typography variant="h4" sx={{ fontWeight: 'bold' }}>99.9%</Typography>
 <Typography>Uptime</Typography>
 </Box>
 </Box>
 </HeroBlock>
 
 </Box>
 </DataProvider>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Real-world example combining data-driven HeroBlocks with traditional usage and custom child content.',
 },
 },
 },
};

// ModelView Serialization Examples - Demonstrating the new ModelView base class
export const ModelViewBasic: Story = {
 render: () => {
 // Demonstrate that HeroBlock extends ModelView
 const heroInstance = new HeroBlock({
 title: 'ModelView HeroBlock',
 subtitle: 'Extends ModelView for standardized serialization',
 backgroundColor: 'primary',
 textAlign: 'center',
 blockHeight: 'medium',
 actions: [
 { label: 'Test Action', variant: 'primary', buttonSize: 'large' }
 ]
 });

 // Convert to JSON and back
 const serializedData = heroInstance.toJson();
 
 return (
 <QwickApp appId="heroblock-modelview" appName='HeroBlock ModelView Pattern'>
 <Box>
 
 <Box sx={{ mb: 6, textAlign: 'center' }}>
 <Typography variant="h3" gutterBottom>HeroBlock ModelView Pattern</Typography>
 <Typography variant="h6" sx={{ mb: 4, opacity: 0.7 }}>
 HeroBlock extends ModelView for standardized serialization and component lifecycle
 </Typography>
 
 <Alert severity="info" sx={{ mb: 4, textAlign: 'left' }}>
 The HeroBlock component now extends ModelView base class, which implements the Serializable interface 
 and provides standardized serialization patterns. This enables "WebView for React" functionality with 
 support for nested Button components and complex hero structures.
 </Alert>
 </Box>

 {/* Rendered HeroBlock */}
 <Box sx={{ mb: 6 }}>
 <Typography variant="h4" gutterBottom>Rendered HeroBlock</Typography>
 <HeroBlock 
 title="ModelView Demonstration" 
 subtitle="This HeroBlock extends ModelView and supports full serialization"
 backgroundColor="primary"
 textAlign="center"
 blockHeight="medium"
 actions={[
 { label: 'Learn More', variant: 'primary', buttonSize: 'large' },
 { label: 'View Docs', variant: 'outlined', buttonSize: 'large' }
 ]}
 />
 </Box>

 {/* Serialized Data */}
 <Box sx={{ mb: 6 }}>
 <Typography variant="h4" gutterBottom>Serialized JSON Data</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 The HeroBlock instance serialized to JSON using the toJson() method:
 </Typography>
 <Paper sx={{ p: 2, backgroundColor: 'grey.100' }}>
 <Code language="json" showLineNumbers={true} title="heroblock-serialized.json">
 {JSON.stringify(serializedData, null, 2)}
 </Code>
 </Paper>
 </Box>
 
 </Box>
 </QwickApp>
 );
 },
 parameters: {
 docs: {
 description: {
 story: 'Basic ModelView pattern demonstration showing HeroBlock serialization capabilities.',
 },
 },
 },
};

// Enhanced Serialization Examples - "WebView for React" functionality 
export const SerializationBasic: Story = {
 render: () => {
 // Create a HeroBlock component instance (now extends ModelView)
 const originalHeroComponent = (
 <HeroBlock 
 title="Serializable HeroBlock"
 subtitle="Full serialization support with nested Button components"
 backgroundGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
 textAlign="center"
 blockHeight="large"
 overlayOpacity={0.6}
 actions={[
 { label: 'Primary Action', variant: 'primary', buttonSize: 'large' },
 { label: 'Secondary Action', variant: 'outlined', buttonSize: 'large' }
 ]}
 />
 );
 
 // Serialize using ComponentTransformer
 const serializedData = ComponentTransformer.serialize(originalHeroComponent);
 
 // Deserialize back to component
 const deserializedComponent = ComponentTransformer.deserialize(serializedData);
 
 // Parse the JSON for display
 const parsedData = JSON.parse(serializedData);
 
 return (
 <QwickApp appId="heroblock-serialization-basic" appName='HeroBlock Serialization Demo'>
 <Box>
 
 <Box sx={{ mb: 6, textAlign: 'center' }}>
 <Typography variant="h3" gutterBottom>HeroBlock Serialization Pattern</Typography>
 <Typography variant="h6" sx={{ mb: 4, opacity: 0.7 }}>
 "WebView for React" - HeroBlock extends ModelView for standardized serialization
 </Typography>
 
 <Alert severity="success" sx={{ mb: 4, textAlign: 'left' }}>
 The HeroBlock component supports full round-trip serialization including nested Button components 
 in the actions array, background styles, layout configurations, and all hero-specific properties.
 </Alert>
 </Box>

 {/* Original Component */}
 <Box sx={{ mb: 6 }}>
 <Typography variant="h4" gutterBottom> Original HeroBlock</Typography>
 {originalHeroComponent}
 </Box>

 {/* Serialized Data */}
 <Box sx={{ mb: 6 }}>
 <Typography variant="h4" gutterBottom> Serialized JSON</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 Complete component serialization including actions array and hero properties:
 </Typography>
 <Paper sx={{ p: 2, backgroundColor: 'grey.100' }}>
 <Code language="json" showLineNumbers={true} title="heroblock-serialized.json">
 {JSON.stringify(parsedData, null, 2)}
 </Code>
 </Paper>
 </Box>

 {/* Deserialized Component */}
 <Box sx={{ mb: 6 }}>
 <Typography variant="h4" gutterBottom>♻ Deserialized HeroBlock</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 Component reconstructed from JSON data - identical to original:
 </Typography>
 {deserializedComponent as React.ReactElement}
 </Box>
 
 </Box>
 </QwickApp>
 );
 },
 parameters: {
 docs: {
 description: {
 story: 'Basic serialization round-trip demonstrating HeroBlock "WebView for React" functionality.',
 },
 },
 },
};

export const SerializationAdvanced: Story = {
 render: () => {
 // Create multiple HeroBlock components with different configurations
 const heroComponents = [
 <HeroBlock 
 key="gradient" 
 title="Gradient Background Hero" 
 subtitle="Beautiful gradients with multiple actions"
 backgroundGradient="linear-gradient(45deg, #2196F3, #21CBF3)"
 textAlign="center"
 blockHeight="medium"
 actions={[
 { label: 'Primary', variant: 'primary', buttonSize: 'large' },
 { label: 'Secondary', variant: 'secondary', buttonSize: 'medium' }
 ]}
 />,
 <HeroBlock 
 key="image" 
 title="Image Background Hero" 
 subtitle="High-quality image with customizable overlay"
 backgroundImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3"
 overlayOpacity={0.7}
 textAlign="left"
 blockHeight="large"
 actions={[
 { label: 'Explore', variant: 'primary', buttonSize: 'large' }
 ]}
 />,
 <HeroBlock 
 key="minimal" 
 title="Minimal Theme Hero" 
 subtitle="Clean design with theme colors"
 backgroundColor="secondary"
 textAlign="right"
 blockHeight="small"
 actions={[
 { label: 'Learn More', variant: 'outlined', buttonSize: 'medium' }
 ]}
 />
 ];
 
 // Serialize and deserialize each component
 const serializedComponents = heroComponents.map((component, index) => {
 const serializedData = ComponentTransformer.serialize(component);
 const deserializedComponent = ComponentTransformer.deserialize(serializedData);
 return {
 original: component,
 serialized: serializedData,
 deserialized: deserializedComponent,
 name: ['Gradient', 'Image', 'Minimal'][index]
 };
 });
 
 return (
 <QwickApp appId="heroblock-serialization-advanced" appName='Advanced HeroBlock Serialization'>
 <Box>
 
 <Box sx={{ mb: 6, textAlign: 'center' }}>
 <Typography variant="h3" gutterBottom>Advanced HeroBlock Serialization</Typography>
 <Typography variant="h6" sx={{ mb: 4, opacity: 0.7 }}>
 Complex serialization scenarios with different HeroBlock configurations
 </Typography>
 </Box>
 
 {serializedComponents.map((item, index) => (
 <Box key={index} sx={{ mb: 8 }}>
 <Typography variant="h4" gutterBottom>
 {item.name} HeroBlock Serialization Round-Trip
 </Typography>
 
 <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 4, mb: 4 }}>
 <Box>
 <Typography variant="h6" gutterBottom>Original Component</Typography>
 {item.original}
 </Box>
 <Box>
 <Typography variant="h6" gutterBottom>Deserialized Component</Typography>
 {item.deserialized as React.ReactElement}
 </Box>
 </Box>
 
 <Box>
 <Typography variant="h6" gutterBottom>Serialized JSON Structure</Typography>
 <Paper sx={{ p: 2, backgroundColor: 'grey.100' }}>
 <Code language="json" showLineNumbers={false}>
 {JSON.stringify(JSON.parse(item.serialized), null, 2)}
 </Code>
 </Paper>
 </Box>
 
 {index < serializedComponents.length - 1 && <Box sx={{ my: 4, borderBottom: '1px solid', borderColor: 'divider' }} />}
 </Box>
 ))}
 
 </Box>
 </QwickApp>
 );
 },
 parameters: {
 docs: {
 description: {
 story: 'Advanced serialization patterns with multiple HeroBlock configurations and background types.',
 },
 },
 },
};

export const SerializationWithDataBinding: Story = {
 render: () => {
 // Create a HeroBlock component with data binding
 const dataBindingComponent = (
 <HeroBlock 
 dataSource="heroes.home"
 bindingOptions={{ cache: true, strict: false }}
 />
 );
 
 // Serialize and deserialize
 const serializedData = ComponentTransformer.serialize(dataBindingComponent);
 const deserializedComponent = ComponentTransformer.deserialize(serializedData);
 const parsedData = JSON.parse(serializedData);
 
 return (
 <QwickApp appId="heroblock-serialization-databinding" appName='HeroBlock Serialization with Data Binding' dataSource={{ dataProvider }}>
 <Box>
 
 <Box sx={{ mb: 6, textAlign: 'center' }}>
 <Typography variant="h3" gutterBottom>🔗 HeroBlock Serialization with Data Binding</Typography>
 <Typography variant="h6" sx={{ mb: 4, opacity: 0.7 }}>
 Preserving CMS data connections through serialization
 </Typography>
 
 <Alert severity="success" sx={{ mb: 4, textAlign: 'left' }}>
 Data binding configurations (dataSource, bindingOptions) are preserved during serialization, 
 ensuring that deserialized HeroBlock components maintain their CMS connections and dynamic content capabilities.
 </Alert>
 </Box>
 
 {/* Data Source Configuration */}
 <Box sx={{ mb: 6 }}>
 <Typography variant="h4" gutterBottom> CMS Data Source</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 HeroBlock configured to pull content from "heroes.home" data source:
 </Typography>
 <Paper sx={{ p: 2, backgroundColor: 'grey.100' }}>
 <Code language="tsx" showLineNumbers={true} title="data-binding-usage.tsx">
 {`<HeroBlock 
 dataSource="heroes.home"
 bindingOptions={{ cache: true, strict: false }}
/>`}
 </Code>
 </Paper>
 {dataBindingComponent}
 </Box>
 
 {/* Serialization Preserves Data Binding */}
 <Box sx={{ mb: 6 }}>
 <Typography variant="h4" gutterBottom> Serialized JSON (Data Binding Preserved)</Typography>
 <Paper sx={{ p: 2, backgroundColor: 'grey.100' }}>
 <Code language="json" showLineNumbers={true} title="serialized-with-databinding.json">
 {JSON.stringify(parsedData, null, 2)}
 </Code>
 </Paper>
 </Box>
 
 {/* Deserialized Component with Data Binding */}
 <Box sx={{ mb: 6 }}>
 <Typography variant="h4" gutterBottom>♻ Deserialized with Active Data Binding</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 Deserialized component maintains CMS connection and loads dynamic content:
 </Typography>
 {deserializedComponent as React.ReactElement}
 </Box>
 
 </Box>
 </QwickApp>
 );
 },
 parameters: {
 docs: {
 description: {
 story: 'HeroBlock serialization example preserving data binding configuration for CMS-driven content.',
 },
 },
 },
};

export const SerializationNestedActions: Story = {
 render: () => {
 // Create a HeroBlock with complex nested actions (Button components)
 const complexHeroComponent = (
 <HeroBlock 
 title="Complex Action HeroBlock"
 subtitle="HeroBlock with multiple nested Button components and complex configurations"
 backgroundGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
 textAlign="center"
 blockHeight="large"
 overlayOpacity={0.5}
 actions={[
 { 
 label: 'Primary Action', 
 variant: 'primary', 
 buttonSize: 'large',
 action: { type: 'navigate', url: '/primary', target: '_self' }
 },
 { 
 label: 'Secondary Action', 
 variant: 'secondary', 
 buttonSize: 'medium',
 action: { type: 'navigate', url: '/secondary', target: '_blank' }
 },
 { 
 label: 'External Link', 
 variant: 'outlined', 
 buttonSize: 'medium',
 action: { type: 'external', url: 'https://example.com', target: '_blank' }
 },
 { 
 label: 'Custom Action', 
 variant: 'text', 
 buttonSize: 'small',
 action: { type: 'custom', customHandler: 'handleCustomAction' }
 }
 ]}
 >
 <Typography sx={{ mt: 3, fontSize: '1.1rem', opacity: 0.9 }}>
 Additional nested content within the HeroBlock component
 </Typography>
 </HeroBlock>
 );
 
 // Serialize and deserialize the complex structure
 const serializedStructure = ComponentTransformer.serialize(complexHeroComponent);
 const deserializedStructure = ComponentTransformer.deserialize(serializedStructure);
 const parsedData = JSON.parse(serializedStructure);
 
 return (
 <QwickApp appId="heroblock-serialization-nested" appName='HeroBlock Nested Actions Serialization'>
 <Box>
 
 <Box sx={{ mb: 6, textAlign: 'center' }}>
 <Typography variant="h3" gutterBottom> HeroBlock with Nested Actions</Typography>
 <Typography variant="h6" sx={{ mb: 4, opacity: 0.7 }}>
 Complex nested Button components within HeroBlock actions
 </Typography>
 
 <Alert severity="info" sx={{ mb: 4, textAlign: 'left' }}>
 HeroBlock components can contain complex Button configurations in the actions array. 
 Each action can include custom properties, event handlers, and action patterns that are 
 preserved through the serialization process.
 </Alert>
 </Box>
 
 {/* Original Complex HeroBlock */}
 <Box sx={{ mb: 6 }}>
 <Typography variant="h4" gutterBottom> Original Complex HeroBlock</Typography>
 {complexHeroComponent}
 </Box>
 
 {/* Serialized Data Preview */}
 <Box sx={{ mb: 6 }}>
 <Typography variant="h4" gutterBottom> Actions Array Serialization</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 The complex actions array with Button configurations (showing actions section):
 </Typography>
 <Paper sx={{ p: 2, backgroundColor: 'grey.100' }}>
 <Code language="json" showLineNumbers={true}>
 {JSON.stringify(parsedData.data.actions, null, 2)}
 </Code>
 </Paper>
 </Box>
 
 {/* Deserialized Structure */}
 <Box sx={{ mb: 6 }}>
 <Typography variant="h4" gutterBottom>♻ Deserialized HeroBlock</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 Complex HeroBlock reconstructed with all nested Button components:
 </Typography>
 {deserializedStructure as React.ReactElement}
 </Box>
 
 {/* Benefits Summary */}
 <Box sx={{ mt: 8, p: 4, backgroundColor: 'success.light', color: 'success.contrastText', borderRadius: 2 }}>
 <Typography variant="h4" gutterBottom>✅ HeroBlock Serialization Benefits</Typography>
 <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mt: 3 }}>
 <Box>
 <Typography variant="h6" gutterBottom> Complete Hero Preservation</Typography>
 <Typography variant="body2" sx={{ opacity: 0.9 }}>
 All hero properties including backgrounds, layout, actions, and content are preserved.
 </Typography>
 </Box>
 <Box>
 <Typography variant="h6" gutterBottom>🔘 Nested Button Serialization</Typography>
 <Typography variant="body2" sx={{ opacity: 0.9 }}>
 Action buttons with complex configurations and event patterns are fully serialized.
 </Typography>
 </Box>
 <Box>
 <Typography variant="h6" gutterBottom> Responsive Layout Support</Typography>
 <Typography variant="body2" sx={{ opacity: 0.9 }}>
 Responsive design, alignment, and height configurations are maintained.
 </Typography>
 </Box>
 <Box>
 <Typography variant="h6" gutterBottom>🔗 Data Binding Integration</Typography>
 <Typography variant="body2" sx={{ opacity: 0.9 }}>
 CMS data connections and dynamic content loading are preserved through serialization.
 </Typography>
 </Box>
 </Box>
 </Box>
 
 </Box>
 </QwickApp>
 );
 },
 parameters: {
 docs: {
 description: {
 story: 'Complex nested structure serialization with multiple Button components in HeroBlock actions array.',
 },
 },
 },
};

/**
 * SerializationDemo - Modern HeroBlock serialization using template
 */
export const SerializationDemo: Story = {
  render: makeSerializationStory(() => (
    <HeroBlock 
      title="Serializable HeroBlock"
      subtitle="Modern factory-based component with standardized serialization"
      backgroundGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      textAlign="center"
      blockHeight="medium"
      overlayOpacity={0.6}
      actions={[
        { label: 'Primary Action', variant: 'primary', buttonSize: 'large' },
        { label: 'Secondary Action', variant: 'outlined', buttonSize: 'medium' }
      ]}
    />
  )),
  parameters: {
    docs: {
      description: {
        story: 'Shows modern HeroBlock serialization using the standardized makeSerializationStory template. Demonstrates react-children strategy for container components.',
      },
    },
  },
};