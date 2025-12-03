/**
 * CoverImageHeader Component Stories
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import {
 Archive as ArchiveIcon,
 Delete as DeleteIcon,
 Download as DownloadIcon,
 Edit as EditIcon,
 Favorite as FavoriteIcon,
 Settings as SettingsIcon,
 Share as ShareIcon
} from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { JsonDataProvider } from '@qwickapps/schema';
import type { Meta, StoryObj } from '@storybook/react';
import { Code } from '../components/blocks';
import CoverImageHeader from '../components/blocks/CoverImageHeader';
import QwickApp from '../components/QwickApp';

const meta: Meta<typeof CoverImageHeader> = {
 title: 'Blocks/CoverImageHeader',
 component: CoverImageHeader,
 parameters: {
 layout: 'padded',
 docs: {
 description: {
 component: `The CoverImageHeader component provides a flexible header layout with optional image, information section, and contextual actions.

**Key Features:**
- **Optional Image**: Supports URL string or custom React component with configurable size and shape
- **Information Display**: Overline, title, subtitle, and tags for comprehensive content presentation
- **Contextual Actions**: Priority-based action system with overflow menu for additional options
- **Responsive Design**: Automatically adapts layout for mobile and desktop viewing
- **MUI Integration**: Built with Material UI components for consistent styling

**Perfect for:**
- Page headers with user information
- Project cards and portfolio items
- Product listings with actions
- Profile sections and team cards
- Dashboard headers with quick actions`,
 },
 },
 },
 tags: ['autodocs'],
 argTypes: {
 image: {
 description: 'Optional image URL or React component',
 control: { type: 'text' },
 },
 imageAlt: {
 description: 'Image alt text (when using URL)',
 control: { type: 'text' },
 },
 imageSize: {
 description: 'Image size variant',
 control: { type: 'select' },
 options: ['small', 'medium', 'large'],
 },
 imageShape: {
 description: 'Image shape',
 control: { type: 'select' },
 options: ['square', 'circle', 'rounded'],
 },
 overline: {
 description: 'Optional overline text (appears above title)',
 control: { type: 'text' },
 },
 title: {
 description: 'Main title text',
 control: { type: 'text' },
 },
 subtitle: {
 description: 'Optional subtitle text',
 control: { type: 'text' },
 },
 tags: {
 description: 'Array of tag strings',
 control: { type: 'object' },
 },
 actions: {
 description: 'Context menu actions',
 control: false,
 },
 maxVisibleActions: {
 description: 'Maximum number of actions to show as buttons',
 control: { type: 'number', min: 1, max: 5 },
 },
 variant: {
 description: 'Header variant',
 control: { type: 'select' },
 options: ['default', 'compact', 'prominent'],
 },
 background: {
 description: 'Background color or image URL',
 control: { type: 'text' },
 },
 },
} satisfies Meta<typeof CoverImageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample CMS data for data binding stories (following nested structure pattern)
const sampleCmsData = {
 'coverImageHeaders': {
 'teamLead': {
 image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
 imageAlt: 'John Doe profile photo',
 imageSize: 'large',
 imageShape: 'circle',
 overline: 'TEAM LEAD',
 title: 'John Doe',
 subtitle: 'Senior Product Manager & Team Leader',
 tags: ['Product Strategy', 'Team Leadership', 'Agile', 'Remote Work'],
 maxVisibleActions: 2,
 variant: 'default'
 },
 'projectShowcase': {
 image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
 imageAlt: 'Dashboard project icon',
 imageSize: 'medium',
 imageShape: 'rounded',
 overline: 'FEATURED PROJECT',
 title: 'Analytics Dashboard 2.0',
 subtitle: 'Real-time business intelligence platform with advanced data visualization',
 tags: ['React', 'TypeScript', 'D3.js', 'Real-time', 'Analytics'],
 variant: 'compact'
 },
 'companyProfile': {
 overline: 'TECHNOLOGY COMPANY',
 title: 'QwickApps Solutions',
 subtitle: 'Building the future of web development with intelligent component systems',
 tags: ['React', 'TypeScript', 'Enterprise', 'Open Source'],
 variant: 'prominent',
 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
 },
 'productShowcase': {
 image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
 imageAlt: 'Product showcase',
 imageSize: 'large',
 imageShape: 'square',
 overline: 'PRODUCT SHOWCASE',
 title: 'Smart Task Manager',
 subtitle: 'AI-powered productivity suite with intelligent task prioritization',
 tags: ['Productivity', 'AI', 'Task Management', 'Team Collaboration'],
 variant: 'default'
 },
 'imageLoadingDemo': {
 image: 'https://httpstat.us/200?sleep=3000', // Simulates slow loading image
 imageAlt: 'Slow loading image demo',
 imageSize: 'medium',
 imageShape: 'rounded',
 overline: 'LOADING DEMO',
 title: 'Slow Loading Image Test',
 subtitle: 'Tests image loading states and fallback handling',
 tags: ['Performance', 'Loading', 'Fallback'],
 variant: 'default'
 },
 'imageFallbackDemo': {
 image: 'https://invalid-url-that-will-fail.com/image.jpg',
 imageAlt: 'Image that will fail to load',
 imageSize: 'large',
 imageShape: 'circle',
 overline: 'ERROR DEMO',
 title: 'Image Fallback Test',
 subtitle: 'Tests image error handling and accessibility',
 tags: ['Error Handling', 'Accessibility', 'Fallback'],
 variant: 'default'
 }
 }
};

const dataProvider = new JsonDataProvider({ data: sampleCmsData });

// Sample actions for demos
const sampleActions = [
 {
 id: 'edit',
 label: 'Edit',
 icon: <EditIcon />,
 onClick: () => alert('Edit clicked'),
 priority: 1,
 },
 {
 id: 'share',
 label: 'Share',
 icon: <ShareIcon />,
 onClick: () => alert('Share clicked'),
 priority: 2,
 },
 {
 id: 'favorite',
 label: 'Favorite',
 icon: <FavoriteIcon />,
 onClick: () => alert('Added to favorites'),
 priority: 3,
 },
 {
 id: 'download',
 label: 'Download',
 icon: <DownloadIcon />,
 onClick: () => alert('Downloading...'),
 priority: 4,
 },
 {
 id: 'settings',
 label: 'Settings',
 icon: <SettingsIcon />,
 onClick: () => alert('Settings opened'),
 priority: 5,
 },
 {
 id: 'archive',
 label: 'Archive',
 icon: <ArchiveIcon />,
 onClick: () => alert('Archived'),
 destructive: true,
 priority: 6,
 },
 {
 id: 'delete',
 label: 'Delete',
 icon: <DeleteIcon />,
 onClick: () => alert('Deleted'),
 destructive: true,
 priority: 7,
 },
];

export const Basic: Story = {
 args: {
 title: 'Basic Header Example',
 subtitle: 'Simple header without image or actions',
 },
 render: (args) => (
 <QwickApp appId="cover-header-basic" appName='Cover Header Basic'>
 <CoverImageHeader {...args} />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Basic usage with just title and subtitle. Clean and minimal design.',
 },
 },
 },
};

export const WithImage: Story = {
 args: {
 image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
 imageAlt: 'Profile photo',
 title: 'John Doe',
 subtitle: 'Senior Software Engineer',
 overline: 'TEAM MEMBER',
 imageSize: 'medium',
 imageShape: 'circle',
 },
 render: (args) => (
 <QwickApp appId="cover-header-image" appName='Cover Header Image'>
 <CoverImageHeader {...args} />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Header with profile image, overline, title, and subtitle. Perfect for user cards.',
 },
 },
 },
};

export const WithTagsAndActions: Story = {
 args: {
 image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
 imageAlt: 'Project thumbnail',
 title: 'React Dashboard Project',
 subtitle: 'Modern admin dashboard with comprehensive analytics and user management',
 overline: 'ACTIVE PROJECT',
 tags: ['React', 'TypeScript', 'Dashboard', 'Material UI'],
 actions: sampleActions.slice(0, 5),
 maxVisibleActions: 3,
 imageSize: 'large',
 imageShape: 'rounded',
 },
 render: (args) => (
 <QwickApp appId="cover-header-full" appName='Cover Header Full'>
 <CoverImageHeader {...args} />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Complete example with image, tags, and actions. Shows overflow menu when actions exceed maxVisibleActions.',
 },
 },
 },
};

export const ImageSizeVariants: Story = {
 render: () => (
 <QwickApp appId="cover-header-sizes" appName='Cover Header Sizes'>
 <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
 <CoverImageHeader
 image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
 imageAlt="Small image"
 title="Small Image Header"
 subtitle="48px image size"
 imageSize="small"
 imageShape="circle"
 />
 
 <CoverImageHeader
 image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
 imageAlt="Medium image"
 title="Medium Image Header"
 subtitle="64px image size (default)"
 imageSize="medium"
 imageShape="circle"
 />
 
 <CoverImageHeader
 image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
 imageAlt="Large image"
 title="Large Image Header"
 subtitle="80px image size"
 imageSize="large"
 imageShape="circle"
 />
 </div>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Comparison of different image size variants: small (48px), medium (64px), and large (80px).',
 },
 },
 },
};

export const ImageShapeVariants: Story = {
 render: () => (
 <QwickApp appId="cover-header-shapes" appName='Cover Header Shapes'>
 <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
 <CoverImageHeader
 image="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
 imageAlt="Square image"
 title="Square Image"
 subtitle="Sharp corners, perfect for logos"
 imageShape="square"
 imageSize="large"
 />
 
 <CoverImageHeader
 image="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
 imageAlt="Rounded image"
 title="Rounded Image"
 subtitle="Slightly rounded corners (default)"
 imageShape="rounded"
 imageSize="large"
 />
 
 <CoverImageHeader
 image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
 imageAlt="Circle image"
 title="Circle Image"
 subtitle="Perfect circles, ideal for avatars"
 imageShape="circle"
 imageSize="large"
 />
 </div>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Comparison of different image shape variants: square, rounded (default), and circle.',
 },
 },
 },
};

export const VariantComparison: Story = {
 render: () => (
 <QwickApp appId="cover-header-variants" appName='Cover Header Variants'>
 <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
 <CoverImageHeader
 image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
 imageAlt="Compact variant"
 title="Compact Variant"
 subtitle="Reduced padding and spacing"
 tags={['Compact', 'Space-efficient']}
 variant="compact"
 actions={sampleActions.slice(0, 2)}
 />
 
 <CoverImageHeader
 image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
 imageAlt="Default variant"
 title="Default Variant"
 subtitle="Balanced padding and spacing"
 tags={['Default', 'Balanced']}
 variant="default"
 actions={sampleActions.slice(0, 2)}
 />
 
 <CoverImageHeader
 image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
 imageAlt="Prominent variant"
 title="Prominent Variant"
 subtitle="Generous padding with centered alignment"
 tags={['Prominent', 'Eye-catching']}
 variant="prominent"
 actions={sampleActions.slice(0, 2)}
 />
 </div>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Comparison of header variants: compact (minimal spacing), default (balanced), and prominent (generous spacing).',
 },
 },
 },
};

export const WithBackgroundImage: Story = {
 args: {
 title: 'Hero Section Header',
 subtitle: 'Beautiful background with overlay for better text readability',
 overline: 'FEATURED',
 tags: ['Hero', 'Background', 'Overlay'],
 background: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
 variant: 'prominent',
 actions: [
 {
 id: 'cta',
 label: 'Get Started',
 onClick: () => alert('Getting started!'),
 priority: 1,
 },
 {
 id: 'learn-more',
 label: 'Learn More',
 onClick: () => alert('Learning more...'),
 priority: 2,
 },
 ],
 },
 render: (args) => (
 <QwickApp appId="cover-header-background" appName='Cover Header Background'>
 <CoverImageHeader {...args} />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Header with background image and automatic overlay for better text contrast. Perfect for hero sections.',
 },
 },
 },
};

export const ActionsOverflowDemo: Story = {
 args: {
 image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
 imageAlt: 'Document preview',
 title: 'Document Management',
 subtitle: 'Multiple actions available with overflow menu',
 overline: 'DOCUMENT',
 tags: ['PDF', 'Important', 'Shared'],
 actions: sampleActions,
 maxVisibleActions: 2,
 },
 render: (args) => (
 <QwickApp appId="cover-header-overflow" appName='Cover Header Overflow'>
 <CoverImageHeader {...args} />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Demonstrates action overflow functionality. When actions exceed maxVisibleActions, additional actions appear in an overflow menu.',
 },
 },
 },
};

export const CustomContent: Story = {
 args: {
 image: (
 <div style={{
 width: 64,
 height: 64,
 backgroundColor: 'var(--theme-primary)',
 borderRadius: '8px',
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 fontSize: '1.5rem',
 fontWeight: 'bold',
 color: 'white',
 }}>
 
 </div>
 ),
 title: 'Custom React Component',
 subtitle: 'Using a custom React component instead of image URL',
 overline: 'CUSTOM',
 tags: [
 'React',
 <span key="special" style={{ 
 background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
 color: 'white',
 padding: '2px 8px',
 borderRadius: '12px',
 fontSize: '0.75rem',
 fontWeight: 'bold'
 }}>
 Special
 </span>,
 'Component'
 ],
 actions: sampleActions.slice(0, 3),
 },
 render: (args) => (
 <QwickApp appId="cover-header-custom" appName='Cover Header Custom'>
 <CoverImageHeader {...args} />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Demonstrates custom React components for both image and tag content. Great for icons, badges, and custom layouts.',
 },
 },
 },
};

// Data Binding Examples
export const DataBindingTeamLead: Story = {
 render: () => (
 <QwickApp 
 appId="cover-header-data-team" 
 appName='Team Lead Data Binding'
 dataSource={{ dataProvider }}
 >
 <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
 
 <Box>
 <Typography variant="h5" gutterBottom>👤 Data-Driven Team Lead Header</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 CoverImageHeader components can be driven entirely by CMS data using the dataSource prop.
 </Typography>
 
 <Code title="Usage" language="tsx">{`<CoverImageHeader dataSource="coverImageHeaders.teamLead" />`}</Code>
 
 <Code title="Data Structure" language="json">{JSON.stringify(sampleCmsData.coverImageHeaders.teamLead, null, 2)}</Code>
 </Box>

 <CoverImageHeader dataSource="coverImageHeaders.teamLead" />
 
 <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
 <h3>Team Member Profile</h3>
 <p>
 This team lead header is completely driven by CMS data, including the profile image, 
 metadata, tags, and actions. Perfect for team directories, leadership pages, and organizational charts.
 </p>
 </div>
 
 </div>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Team lead header with complete data binding - all content loaded from CMS data source.',
 },
 },
 },
};

export const DataBindingProject: Story = {
 render: () => (
 <QwickApp 
 appId="cover-header-data-project" 
 appName='Project Data Binding'
 dataSource={{ dataProvider }}
 >
 <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
 
 <Box>
 <Typography variant="h5" gutterBottom> Data-Driven Project Header</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 Project headers can pull all their content from CMS, making them perfect for dynamic portfolios.
 </Typography>
 </Box>

 <CoverImageHeader dataSource="coverImageHeaders.projectShowcase" />
 
 <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
 <div>
 <h3>Dynamic Project Info</h3>
 <p>
 All project details including technology stack, status, and actions are dynamically loaded 
 from the CMS, allowing for real-time updates without code changes.
 </p>
 </div>
 
 <div>
 <h3>Flexible Actions</h3>
 <p>
 Project-specific actions like demo links, source code, and documentation can be 
 configured per project through the CMS interface.
 </p>
 </div>
 </div>
 </div>
 
 </div>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Project header with data binding showing technology tags, project status, and dynamic actions.',
 },
 },
 },
};

export const DataBindingCompany: Story = {
 render: () => (
 <QwickApp 
 appId="cover-header-data-company" 
 appName='Company Data Binding'
 dataSource={{ dataProvider }}
 >
 <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
 
 <Box>
 <Typography variant="h5" gutterBottom>🏢 Data-Driven Company Header</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 Company headers with gradient backgrounds and corporate actions, all controlled by CMS.
 </Typography>
 </Box>

 <CoverImageHeader dataSource="coverImageHeaders.companyProfile" />
 
 <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
 <div>
 <h3> Dynamic Styling</h3>
 <p>
 Background gradients, colors, and visual styling can be controlled entirely 
 through the CMS for brand consistency across different pages.
 </p>
 </div>
 
 <div>
 <h3> Business Actions</h3>
 <p>
 Corporate action buttons like contact sales, demos, and documentation 
 can be managed and updated without developer intervention.
 </p>
 </div>
 </div>
 </div>
 
 </div>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Company header with data binding featuring gradient background and corporate action buttons.',
 },
 },
 },
};

export const DataBindingProduct: Story = {
 render: () => (
 <QwickApp 
 appId="cover-header-data-product" 
 appName='Product Data Binding'
 dataSource={{ dataProvider }}
 >
 <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
 
 <Box>
 <Typography variant="h5" gutterBottom> Data-Driven Product Header</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 Product showcase headers with features, pricing actions, and marketing content from CMS.
 </Typography>
 </Box>

 <CoverImageHeader dataSource="coverImageHeaders.productShowcase" />
 
 <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
 <h3>Product Marketing Integration</h3>
 <p>
 Product headers can display feature highlights, call-to-action buttons, and marketing 
 content that's managed through your CMS. Perfect for product pages, landing pages, 
 and marketing campaigns that need frequent updates.
 </p>
 </div>
 
 </div>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Product showcase header with data binding displaying features, pricing actions, and marketing content.',
 },
 },
 },
};

export const DataBindingWithFallback: Story = {
 render: () => (
 <QwickApp 
 appId="cover-header-data-fallback" 
 appName='Data Binding with Fallback'
 dataSource={{ dataProvider }}
 >
 <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
 
 <Box>
 <Typography variant="h5" gutterBottom> Fallback Support</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 CoverImageHeader gracefully handles missing data sources with fallback props.
 </Typography>
 
 <Code title="Fallback Usage" language="tsx">{`<CoverImageHeader 
 dataSource="nonexistent.data" 
 title="Fallback Title"
 subtitle="Shows when data source is missing"
 overline="FALLBACK"
/>`}</Code>
 </Box>

 <CoverImageHeader 
 dataSource="nonexistent.data"
 title="Fallback Header"
 subtitle="This content appears when the dataSource doesn't exist"
 overline="FALLBACK DEMO"
 tags={['Fallback', 'Graceful Degradation']}
 variant="default"
 />
 
 <Box sx={{ mt: 3 }}>
 <Typography variant="h6" gutterBottom> Image Loading Demo</Typography>
 <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
 This example shows how the component handles slow-loading images.
 </Typography>
 <CoverImageHeader dataSource="coverImageHeaders.imageLoadingDemo" />
 </Box>
 
 <Box sx={{ mt: 3 }}>
 <Typography variant="h6" gutterBottom> Image Error Handling</Typography>
 <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
 This example demonstrates image fallback and error handling.
 </Typography>
 <CoverImageHeader dataSource="coverImageHeaders.imageFallbackDemo" />
 </Box>
 
 <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
 <h3>Graceful Degradation</h3>
 <p>
 When a data source is unavailable or empty, the component falls back to traditional props, 
 ensuring your application remains functional even when CMS data is missing.
 </p>
 </div>
 
 </div>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Header with fallback props when dataSource is missing or unavailable, ensuring graceful degradation.',
 },
 },
 },
};