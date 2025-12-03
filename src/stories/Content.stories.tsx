/**
 * Content Component Stories - Content blocks with data binding support
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Box, Typography } from '@mui/material';
import { JsonDataProvider } from '@qwickapps/schema';
import type { Meta, StoryObj } from '@storybook/react';
import { Code, Section } from '../components/blocks';
import Content from '../components/blocks/Content';
import { GridLayout } from '../components/layout';
import QwickApp from '../components/QwickApp';

// Sample CMS data for data binding stories
const sampleCmsData = {
 'pages.home.intro': [
 {
 title: 'Welcome to QwickApps React Framework',
 subtitle: 'The most developer-friendly React framework that turns complex UI development into a joy',
 actions: [
 { label: 'Get Started', variant: 'primary', href: '/docs/getting-started' },
 { label: 'View Examples', variant: 'outlined', href: '/examples' }
 ],
 variant: 'elevated',
 centered: true,
 blockSpacing: 'spacious'
 }
 ],
 'features.development': [
 {
 title: 'Development Experience',
 subtitle: 'Built for developer productivity and satisfaction',
 variant: 'default',
 contentMaxWidth: 'lg',
 blockSpacing: 'comfortable'
 }
 ],
 'company.about': [
 {
 title: 'About QwickApps',
 subtitle: 'Empowering developers to build amazing applications',
 actions: [
 { label: 'Learn More', variant: 'secondary' },
 { label: 'Contact Us', variant: 'text', href: 'mailto:hello@qwickapps.com' }
 ],
 variant: 'outlined',
 centered: false,
 contentMaxWidth: 'md'
 }
 ],
 'marketing.hero': [
 {
 title: ' Launch Faster',
 subtitle: 'Skip the boilerplate, focus on what matters - your unique features and business logic',
 actions: [
 { label: 'Start Building', variant: 'primary', buttonSize: 'large' },
 { label: 'Watch Demo', variant: 'outlined', buttonSize: 'large', icon: '▶' }
 ],
 variant: 'filled',
 centered: true,
 blockSpacing: 'spacious',
 contentMaxWidth: 'lg'
 }
 ]
};

const dataProvider = new JsonDataProvider({ data: sampleCmsData });

const meta = {
 title: 'Components/Content',
 component: Content,
 parameters: {
 layout: 'fullscreen',
 docs: {
 description: {
 component: `Content is a versatile content container component that supports both traditional props and data binding through dataSource.

**Key Features:**
- **Flexible Content**: Optional title, subtitle, and child content
- **Action Buttons**: Built-in support for multiple action buttons
- **Visual Variants**: Default, elevated, outlined, and filled styles
- **Responsive Layout**: Configurable spacing, max width, and alignment
- **Data Binding**: Support for CMS-driven content through dataSource prop
- **Theme Integration**: Consistent styling with QwickApps theme system

**Perfect For:**
- Hero sections and feature highlights
- Content blocks in marketing pages
- Structured content areas with actions
- CMS-driven dynamic content sections`,
 },
 },
 },
 tags: ['autodocs'],
} satisfies Meta<typeof Content>;

export default meta;
type Story = StoryObj<typeof meta>;

// Traditional Usage Examples
export const BasicUsage: Story = {
 render: () => (
 <QwickApp appId="content-basic" appName='Content Basic Usage'>
 <Section>
 <GridLayout columns={1} spacing="large">
 <Content
 title="Basic Content Block"
 subtitle="Simple content with title and subtitle"
 >
 <Typography>
 This is a basic content block with traditional prop usage. 
 Perfect for static content that doesn't need dynamic data binding.
 </Typography>
 </Content>
 </GridLayout>
 </Section>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Basic Content usage with traditional props - title, subtitle, and children content.',
 },
 },
 },
};

export const WithActions: Story = {
 render: () => (
 <QwickApp appId="content-actions" appName='Content With Actions'>
 <Section>
 <Content
 title="Content with Actions"
 subtitle="Demonstrating built-in action button support"
 actions={[
 { label: 'Primary Action', variant: 'primary', onClick: () => alert('Primary clicked!') },
 { label: 'Secondary', variant: 'outlined', onClick: () => alert('Secondary clicked!') },
 { label: 'Learn More', variant: 'text', href: '/docs' }
 ]}
 centered={true}
 >
 <Typography>
 Content blocks can include multiple action buttons with different variants and behaviors.
 </Typography>
 </Content>
 </Section>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Content with action buttons supporting different variants and both onClick handlers and href links.',
 },
 },
 },
};

export const VariantStyles: Story = {
 render: () => (
 <QwickApp appId="content-variants" appName='Content Variants'>
 <Section>
 <GridLayout columns={2} spacing="large">
 <Content
 title="Default Variant"
 subtitle="Clean minimal styling"
 variant="default"
 blockSpacing="comfortable"
 >
 <Typography>The default variant provides clean, minimal styling for standard content blocks.</Typography>
 </Content>
 
 <Content
 title="Elevated Variant"
 subtitle="Shadow and prominence"
 variant="elevated"
 blockSpacing="comfortable"
 >
 <Typography>The elevated variant adds shadow and background for visual prominence.</Typography>
 </Content>
 
 <Content
 title="Outlined Variant"
 subtitle="Border definition"
 variant="outlined"
 blockSpacing="comfortable"
 >
 <Typography>The outlined variant provides clear borders and defined areas.</Typography>
 </Content>
 
 <Content
 title="Filled Variant"
 subtitle="Background highlight"
 variant="filled"
 blockSpacing="comfortable"
 >
 <Typography>The filled variant uses background color for emphasis and highlighting.</Typography>
 </Content>
 </GridLayout>
 </Section>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'All available Content variants: default, elevated, outlined, and filled styles.',
 },
 },
 },
};

// Data Binding Examples
export const DataBindingBasic: Story = {
 render: () => (
 <QwickApp 
 appId="content-data-binding" 
 appName='Content Data Binding'
 dataSource={{ dataProvider }}
 >
 <Section>
 <GridLayout columns={1} spacing="large">
 
 <Box>
 <Typography variant="h5" gutterBottom> Data-Driven Content</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 Content components can be driven entirely by CMS data using the dataSource prop.
 </Typography>
 
 <Code title="Usage" language="tsx">{`<Content dataSource="pages.home.intro" />`}</Code>
 
 <Code title="Data Structure" language="json">{JSON.stringify(sampleCmsData['pages.home.intro'][0], null, 2)}</Code>
 </Box>

 <Content dataSource="pages.home.intro" />
 
 </GridLayout>
 </Section>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Content component with data binding - all props resolved from CMS data through dataSource.',
 },
 },
 },
};

export const DataBindingAdvanced: Story = {
 render: () => (
 <QwickApp 
 appId="content-data-advanced" 
 appName='Advanced Data Binding'
 dataSource={{ dataProvider }}
 >
 <Section>
 <GridLayout columns={1} spacing="large">
 
 <Box>
 <Typography variant="h5" gutterBottom> Multiple Data Sources</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 Different Content components can pull from different data sources with varying configurations.
 </Typography>
 </Box>

 <Content dataSource="marketing.hero" />
 
 <GridLayout columns={2} spacing="large">
 <Content dataSource="features.development">
 <Typography>
 Custom child content can be combined with data-driven props for maximum flexibility.
 </Typography>
 </Content>
 
 <Content dataSource="company.about" />
 </GridLayout>
 
 </GridLayout>
 </Section>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Advanced data binding with multiple data sources and mixed traditional/data-driven usage.',
 },
 },
 },
};

export const DataBindingWithFallback: Story = {
 render: () => (
 <QwickApp 
 appId="content-fallback" 
 appName='Data Binding with Fallback'
 dataSource={{ dataProvider }}
 >
 <Section>
 <GridLayout columns={1} spacing="large">
 
 <Box>
 <Typography variant="h5" gutterBottom> Fallback Support</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 Content components gracefully handle missing data sources with fallback props.
 </Typography>
 
 <Code title="Fallback Usage" language="tsx">{`<Content 
 dataSource="nonexistent.data" 
 title="Fallback Title"
 subtitle="Shows when data source is missing"
 variant="outlined"
/>`}</Code>
 </Box>

 <Content 
 dataSource="nonexistent.data"
 title="Fallback Content"
 subtitle="This content appears when the dataSource doesn't exist"
 variant="outlined"
 actions={[
 { label: 'Fallback Action', variant: 'secondary' }
 ]}
 />
 
 </GridLayout>
 </Section>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Content with fallback props when dataSource is missing or unavailable.',
 },
 },
 },
};

export const SpacingAndLayout: Story = {
 render: () => (
 <QwickApp appId="content-spacing" appName='Content Spacing & Layout'>
 <Section>
 <GridLayout columns={1} spacing="large">
 
 <Box>
 <Typography variant="h5" gutterBottom>📐 Spacing & Layout Options</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 Content components offer flexible spacing and layout configuration.
 </Typography>
 </Box>

 <Content
 title="Spacious Padding"
 subtitle="Maximum internal spacing"
 blockSpacing="spacious"
 variant="outlined"
 />
 
 <Content
 title="Comfortable Padding (Default)"
 subtitle="Balanced internal spacing"
 blockSpacing="comfortable"
 variant="outlined"
 />
 
 <Content
 title="Compact Padding"
 subtitle="Minimal internal spacing"
 blockSpacing="compact"
 variant="outlined"
 />
 
 <GridLayout columns={2} spacing="medium">
 <Content
 title="Centered Layout"
 subtitle="Content centered within container"
 centered={true}
 variant="filled"
 />
 
 <Content
 title="Left Aligned"
 subtitle="Standard left-aligned content"
 centered={false}
 variant="filled"
 />
 </GridLayout>
 
 </GridLayout>
 </Section>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Content spacing options (spacious, comfortable, compact) and alignment (centered vs left).',
 },
 },
 },
};

export const RealWorldExample: Story = {
 render: () => (
 <QwickApp 
 appId="content-real-world" 
 appName='Real World Content Example'
 dataSource={{ dataProvider }}
 >
 <Box>
 {/* Hero Section - Data Driven */}
 <Section background="primary">
 <Content dataSource="marketing.hero" />
 </Section>
 
 {/* Feature Section - Mixed Usage */}
 <Section>
 <Content dataSource="features.development">
 <GridLayout columns={3} spacing="medium">
 <Box sx={{ textAlign: 'center', p: 2 }}>
 <Typography variant="h6" gutterBottom> Fast Setup</Typography>
 <Typography>Get started in minutes, not hours</Typography>
 </Box>
 <Box sx={{ textAlign: 'center', p: 2 }}>
 <Typography variant="h6" gutterBottom> Flexible</Typography>
 <Typography>Customize everything to match your needs</Typography>
 </Box>
 <Box sx={{ textAlign: 'center', p: 2 }}>
 <Typography variant="h6" gutterBottom> Responsive</Typography>
 <Typography>Works perfectly on all devices</Typography>
 </Box>
 </GridLayout>
 </Content>
 </Section>
 
 {/* About Section - Traditional Props */}
 <Section background="alternate">
 <Content
 title="Built for Developers"
 subtitle="By developers, for developers"
 variant="elevated"
 centered={true}
 actions={[
 { label: 'View GitHub', variant: 'outlined', href: 'https://github.com' },
 { label: 'Join Community', variant: 'text' }
 ]}
 >
 <Typography sx={{ fontSize: '1.1rem', maxWidth: '600px', mx: 'auto' }}>
 QwickApps React Framework was created to solve real problems that developers face every day. 
 We focus on developer experience, performance, and flexibility.
 </Typography>
 </Content>
 </Section>
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Real-world example combining data-driven Content with traditional usage in a complete layout.',
 },
 },
 },
};