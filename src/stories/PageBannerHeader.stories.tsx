/**
 * PageBannerHeader Component Stories
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import {
 Block as BlockIcon,
 Bookmark as BookmarkIcon,
 Edit as EditIcon,
 Favorite as FavoriteIcon,
 PersonAdd as FollowIcon,
 Message as MessageIcon,
 Report as ReportIcon,
 Share as ShareIcon
} from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { JsonDataProvider } from '@qwickapps/schema';
import type { Meta, StoryObj } from '@storybook/react';
import { Code } from '../components/blocks';
import PageBannerHeader from '../components/blocks/PageBannerHeader';
import QwickApp from '../components/QwickApp';

const meta: Meta<typeof PageBannerHeader> = {
 title: 'Blocks/PageBannerHeader',
 component: PageBannerHeader,
 parameters: {
 layout: 'fullscreen',
 docs: {
 description: {
 component: `The PageBannerHeader component provides a Facebook-style banner layout with cover image and profile overlay.

**Key Features:**
- **Cover Image**: Large banner background image with gradient overlay
- **Profile Overlay**: Profile image positioned over the banner (bottom-left, center, etc.)
- **Rich Information**: Overline, title, subtitle, metadata (followers, posts, etc.), and tags
- **Contextual Actions**: Priority-based actions with responsive overflow handling
- **Responsive Design**: Automatically adapts for mobile and desktop viewing
- **Material UI**: Built with MUI components for consistent styling and theming

**Perfect for:**
- User profile pages and team member showcases
- Company and organization pages
- Project portfolios and case studies
- Social media style layouts
- Personal brand pages and portfolios
- Community group headers`,
 },
 },
 },
 tags: ['autodocs'],
 argTypes: {
 coverImage: {
 description: 'Cover/banner image URL',
 control: { type: 'text' },
 },
 coverImageAlt: {
 description: 'Cover image alt text',
 control: { type: 'text' },
 },
 profileImage: {
 description: 'Profile/avatar image URL or component',
 control: { type: 'text' },
 },
 profileImageAlt: {
 description: 'Profile image alt text',
 control: { type: 'text' },
 },
 profileImageSize: {
 description: 'Profile image size',
 control: { type: 'select' },
 options: ['small', 'medium', 'large'],
 },
 overline: {
 description: 'Optional overline text',
 control: { type: 'text' },
 },
 title: {
 description: 'Main title',
 control: { type: 'text' },
 },
 subtitle: {
 description: 'Subtitle text',
 control: { type: 'text' },
 },
 metadata: {
 description: 'Array of metadata items (followers, posts, etc.)',
 control: { type: 'object' },
 },
 tags: {
 description: 'Array of tag strings or JSX elements',
 control: { type: 'object' },
 },
 actions: {
 description: 'Action buttons',
 control: false,
 },
 maxVisibleActions: {
 description: 'Maximum visible actions before overflow',
 control: { type: 'number', min: 1, max: 5 },
 },
 height: {
 description: 'Banner height in pixels',
 control: { type: 'number', min: 120, max: 300 },
 },
 profilePosition: {
 description: 'Profile position relative to banner',
 control: { type: 'select' },
 options: ['bottom-left', 'bottom-center', 'overlay-center'],
 },
 },
} satisfies Meta<typeof PageBannerHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample CMS data for data binding stories
const sampleCmsData = {
 'pageBannerHeaders': {
 'teamMember': {
 coverImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
 coverImageAlt: 'Mountain landscape cover image',
 profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
 profileImageAlt: 'John Doe profile photo',
 profileImageSize: 'large',
 overline: 'TEAM LEAD',
 title: 'John Doe',
 subtitle: 'Senior Full Stack Developer & Team Leader',
 metadata: [
 { label: 'projects', value: '25+' },
 { label: 'experience', value: '8 years' },
 { label: 'team size', value: 12 }
 ],
 tags: ['React', 'Node.js', 'TypeScript', 'Team Leadership', 'Architecture'],
 maxVisibleActions: 2,
 height: 220,
 profilePosition: 'bottom-left'
 },
 'company': {
 coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
 coverImageAlt: 'QwickApps office space',
 profileImageSize: 'medium',
 overline: 'TECHNOLOGY COMPANY',
 title: 'QwickApps React Framework',
 subtitle: 'Revolutionizing React development with intelligent components',
 metadata: [
 { label: 'developers', value: '50+' },
 { label: 'components', value: '200+' },
 { label: 'downloads', value: '1M+' }
 ],
 tags: ['React', 'TypeScript', 'Open Source', 'Developer Tools'],
 height: 200,
 profilePosition: 'bottom-center'
 },
 'project': {
 coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
 coverImageAlt: 'Analytics dashboard screenshot',
 profileImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
 profileImageAlt: 'Project logo',
 profileImageSize: 'medium',
 overline: 'FEATURED PROJECT',
 title: 'Real-time Analytics Platform',
 subtitle: 'Advanced data visualization and business intelligence dashboard',
 metadata: [
 { label: 'users', value: '10K+' },
 { label: 'data points', value: '1B+' },
 { label: 'uptime', value: '99.9%' }
 ],
 tags: ['React', 'D3.js', 'PostgreSQL', 'Real-time', 'Data Viz'],
 height: 180,
 profilePosition: 'overlay-center'
 },
 'accessibilityDemo': {
 coverImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
 coverImageAlt: 'Scenic mountain landscape with accessible pathways',
 profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
 profileImageAlt: 'Profile photo of accessibility advocate Sarah Johnson',
 profileImageSize: 'large',
 overline: 'ACCESSIBILITY ADVOCATE',
 title: 'Sarah Johnson',
 subtitle: 'UX Designer specializing in accessible web experiences',
 metadata: [
 { label: 'audits completed', value: '150+' },
 { label: 'WCAG certifications', value: 3 },
 { label: 'speaking engagements', value: 25 }
 ],
 tags: ['WCAG 2.1', 'Screen Readers', 'Inclusive Design', 'ARIA', 'Color Contrast'],
 maxVisibleActions: 2,
 height: 200,
 profilePosition: 'bottom-left'
 }
 }
};

const dataProvider = new JsonDataProvider({ data: sampleCmsData });

// Sample actions for demos
const profileActions = [
 {
 id: 'message',
 label: 'Message',
 icon: <MessageIcon />,
 onClick: () => alert('Message sent'),
 priority: 1,
 },
 {
 id: 'follow',
 label: 'Follow',
 icon: <FollowIcon />,
 onClick: () => alert('Now following'),
 priority: 2,
 },
 {
 id: 'share',
 label: 'Share',
 icon: <ShareIcon />,
 onClick: () => alert('Profile shared'),
 priority: 3,
 },
 {
 id: 'favorite',
 label: 'Favorite',
 icon: <FavoriteIcon />,
 onClick: () => alert('Added to favorites'),
 priority: 4,
 },
 {
 id: 'bookmark',
 label: 'Bookmark',
 icon: <BookmarkIcon />,
 onClick: () => alert('Bookmarked'),
 priority: 5,
 },
 {
 id: 'report',
 label: 'Report',
 icon: <ReportIcon />,
 onClick: () => alert('Reported'),
 destructive: true,
 priority: 6,
 },
 {
 id: 'block',
 label: 'Block',
 icon: <BlockIcon />,
 onClick: () => alert('Blocked'),
 destructive: true,
 priority: 7,
 },
];

export const UserProfile: Story = {
 args: {
 coverImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
 coverImageAlt: 'Scenic mountain landscape',
 profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
 profileImageAlt: 'Profile photo of John Doe',
 title: 'John Doe',
 subtitle: 'Senior Product Manager at TechCorp',
 overline: 'TEAM MEMBER',
 metadata: [
 { label: 'followers', value: '2.5K' },
 { label: 'following', value: 456 },
 { label: 'posts', value: 127 },
 ],
 tags: ['Product Manager', 'Team Lead', 'Remote Work', 'Tech Enthusiast'],
 actions: profileActions.slice(0, 5),
 maxVisibleActions: 3,
 height: 200,
 profileImageSize: 'large',
 profilePosition: 'bottom-left',
 },
 render: (args) => (
 <QwickApp appId="banner-user-profile" appName='User Profile'>
 <PageBannerHeader {...args} />
 <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
 <h3>About</h3>
 <p>
 Passionate product manager with over 5 years of experience in building user-centered products.
 Led cross-functional teams to deliver innovative solutions that drive business growth and enhance user experience.
 </p>

 <h3>Experience</h3>
 <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
 <div style={{ padding: '1rem', border: '1px solid var(--theme-outline)', borderRadius: '8px' }}>
 <strong>Senior Product Manager</strong> - TechCorp (2022 - Present)
 </div>
 <div style={{ padding: '1rem', border: '1px solid var(--theme-outline)', borderRadius: '8px' }}>
 <strong>Product Manager</strong> - StartupXYZ (2020 - 2022)
 </div>
 </div>
 </div>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Complete user profile with cover image, profile photo, metadata, tags, and social actions. Perfect for team directories and social platforms.',
 },
 },
 },
};

export const CompanyPage: Story = {
 args: {
 coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
 coverImageAlt: 'Modern office space',
 profileImage: (
 <div style={{
 width: '100%',
 height: '100%',
 backgroundColor: '#1976d2',
 borderRadius: '16px',
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 fontSize: '2rem',
 fontWeight: 'bold',
 color: 'white',
 }}>
 TC
 </div>
 ),
 title: 'TechCorp Solutions',
 subtitle: 'Building the future of enterprise software',
 overline: 'TECHNOLOGY COMPANY',
 metadata: [
 { label: 'employees', value: '500+' },
 { label: 'founded', value: 2018 },
 { label: 'locations', value: 12 },
 ],
 tags: ['Enterprise Software', 'AI/ML', 'Cloud Solutions', 'B2B'],
 actions: [
 {
 id: 'contact',
 label: 'Contact Us',
 icon: <MessageIcon />,
 onClick: () => alert('Contact form opened'),
 priority: 1,
 },
 {
 id: 'careers',
 label: 'View Jobs',
 icon: <EditIcon />,
 onClick: () => alert('Careers page opened'),
 priority: 2,
 },
 {
 id: 'share',
 label: 'Share',
 icon: <ShareIcon />,
 onClick: () => alert('Company page shared'),
 priority: 3,
 },
 ],
 height: 180,
 profileImageSize: 'medium',
 profilePosition: 'bottom-left',
 },
 render: (args) => (
 <QwickApp appId="banner-company" appName='Company Profile'>
 <PageBannerHeader {...args} />
 <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
 <div>
 <h3>About Us</h3>
 <p>
 TechCorp Solutions is a leading provider of enterprise software solutions,
 specializing in AI-driven platforms that help businesses streamline operations
 and drive digital transformation.
 </p>
 </div>

 <div>
 <h3>Our Services</h3>
 <ul>
 <li>Enterprise Software Development</li>
 <li>AI & Machine Learning Solutions</li>
 <li>Cloud Infrastructure & Migration</li>
 <li>Digital Transformation Consulting</li>
 </ul>
 </div>

 <div>
 <h3>Contact Information</h3>
 <div style={{ display: 'grid', gap: '0.5rem' }}>
 <div>📧 hello@techcorp.com</div>
 <div>📞 +1 (555) 123-4567</div>
 <div>🏢 123 Innovation Drive, Tech City, TC 12345</div>
 </div>
 </div>
 </div>
 </div>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Company page layout with custom logo component, business metadata, and corporate actions. Ideal for business profiles.',
 },
 },
 },
};

export const ProjectShowcase: Story = {
 args: {
 coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
 coverImageAlt: 'Data visualization dashboard',
 profileImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
 profileImageAlt: 'Project screenshot',
 title: 'Analytics Dashboard 2.0',
 subtitle: 'Real-time business intelligence and data visualization platform',
 overline: 'FEATURED PROJECT',
 metadata: [
 { label: 'stars', value: '1.2K' },
 { label: 'forks', value: 234 },
 { label: 'contributors', value: 18 },
 ],
 tags: ['React', 'TypeScript', 'D3.js', 'Node.js', 'PostgreSQL'],
 actions: [
 {
 id: 'demo',
 label: 'Live Demo',
 onClick: () => alert('Opening demo...'),
 priority: 1,
 },
 {
 id: 'github',
 label: 'GitHub',
 icon: <ShareIcon />,
 onClick: () => alert('Opening GitHub...'),
 priority: 2,
 },
 {
 id: 'star',
 label: 'Star',
 icon: <FavoriteIcon />,
 onClick: () => alert('Starred!'),
 priority: 3,
 },
 ],
 height: 160,
 profileImageSize: 'medium',
 profilePosition: 'bottom-left',
 },
 render: (args) => (
 <QwickApp appId="banner-project" appName='Project Showcase'>
 <PageBannerHeader {...args} />
 <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
 <div>
 <h3> Project Overview</h3>
 <p>
 A comprehensive business intelligence platform that transforms complex data
 into actionable insights through interactive visualizations and real-time analytics.
 </p>
 </div>

 <div>
 <h3> Key Features</h3>
 <ul>
 <li>Real-time data processing</li>
 <li>Interactive dashboards</li>
 <li>Custom visualization builder</li>
 <li>Advanced filtering & querying</li>
 <li>Export & sharing capabilities</li>
 </ul>
 </div>

 <div>
 <h3>🛠 Technology Stack</h3>
 <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
 {['React', 'TypeScript', 'D3.js', 'Node.js', 'PostgreSQL', 'Docker'].map(tech => (
 <span key={tech} style={{
 padding: '0.25rem 0.75rem',
 backgroundColor: 'var(--theme-primary)',
 color: 'var(--theme-on-primary)',
 borderRadius: '12px',
 fontSize: '0.75rem',
 fontWeight: '500'
 }}>
 {tech}
 </span>
 ))}
 </div>
 </div>
 </div>
 </div>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Project showcase with technical metadata, technology tags, and project-specific actions. Perfect for portfolios and open source projects.',
 },
 },
 },
};

export const ProfilePositions: Story = {
 render: () => (
 <QwickApp appId="banner-positions" appName='Profile Positions'>
 <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
 <PageBannerHeader
 coverImage="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
 profileImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
 title="Bottom Left Position"
 subtitle="Profile positioned at bottom-left of banner"
 profilePosition="bottom-left"
 profileImageSize="medium"
 height={140}
 />

 <PageBannerHeader
 coverImage="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
 profileImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
 title="Bottom Center Position"
 subtitle="Profile positioned at bottom-center of banner"
 profilePosition="bottom-center"
 profileImageSize="medium"
 height={140}
 />

 <PageBannerHeader
 coverImage="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
 profileImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
 title="Overlay Center Position"
 subtitle="Profile positioned at center of banner overlay"
 profilePosition="overlay-center"
 profileImageSize="medium"
 height={140}
 />
 </div>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Comparison of different profile image positions: bottom-left (default), bottom-center, and overlay-center.',
 },
 },
 },
};

export const ProfileSizes: Story = {
 render: () => (
 <QwickApp appId="banner-sizes" appName='Profile Sizes'>
 <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
 <PageBannerHeader
 coverImage="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
 profileImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
 title="Small Profile Image"
 subtitle="64px on mobile, 80px on desktop"
 profileImageSize="small"
 height={120}
 />

 <PageBannerHeader
 coverImage="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
 profileImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
 title="Medium Profile Image"
 subtitle="80px on mobile, 100px on desktop (default)"
 profileImageSize="medium"
 height={140}
 />

 <PageBannerHeader
 coverImage="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
 profileImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
 title="Large Profile Image"
 subtitle="100px on mobile, 120px on desktop"
 profileImageSize="large"
 height={160}
 />
 </div>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Comparison of different profile image sizes with responsive breakpoints. Sizes automatically adjust for mobile viewing.',
 },
 },
 },
};

export const ActionOverflow: Story = {
 args: {
 coverImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
 profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
 title: 'Action Overflow Demo',
 subtitle: 'Demonstrates responsive action handling with overflow menu',
 actions: profileActions,
 maxVisibleActions: 2,
 height: 160,
 profileImageSize: 'medium',
 },
 render: (args) => (
 <QwickApp appId="banner-overflow" appName='Action Overflow'>
 <PageBannerHeader {...args} />
 <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
 <h3>Action Overflow Behavior</h3>
 <p>
 This demo shows how the PageBannerHeader handles multiple actions. With <code>maxVisibleActions</code> set to 2,
 only the first 2 priority actions are shown as buttons, while the remaining actions are accessible through
 the overflow menu (⋮ button).
 </p>

 <div style={{
 marginTop: '2rem',
 padding: '1rem',
 backgroundColor: 'var(--theme-surface)',
 borderRadius: '8px',
 border: '1px solid var(--theme-outline)'
 }}>
 <h4>💡 Responsive Design:</h4>
 <ul style={{ margin: '1rem 0' }}>
 <li>On mobile, action button text may be hidden to save space</li>
 <li>Actions are sorted by priority (lower numbers = higher priority)</li>
 <li>Destructive actions are styled with warning colors</li>
 <li>Overflow menu provides access to all additional actions</li>
 </ul>
 </div>
 </div>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Demonstrates action overflow functionality with priority-based sorting and responsive behavior.',
 },
 },
 },
};

export const MinimalLayout: Story = {
 args: {
 coverImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
 title: 'Minimal Banner',
 subtitle: 'Clean layout without profile image or actions',
 height: 120,
 },
 render: (args) => (
 <QwickApp appId="banner-minimal" appName='Minimal Banner'>
 <PageBannerHeader {...args} />
 <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
 <p>
 Sometimes less is more. This minimal banner focuses attention on the content
 while providing a beautiful backdrop with the cover image.
 </p>
 </div>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Minimal banner with just cover image, title, and subtitle. Perfect for simple headers and landing pages.',
 },
 },
 },
};

// Data Binding Examples
export const DataBindingTeamMember: Story = {
 render: () => (
 <QwickApp
 appId="banner-data-team"
 appName='Team Member Data Binding'
 dataSource={{ dataProvider }}
 >
 <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

 <Box>
 <Typography variant="h5" gutterBottom> Data-Driven Team Member Banner</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 PageBannerHeader components can be driven entirely by CMS data using the dataSource prop.
 </Typography>

 <Code title="Usage" language="tsx">{`<PageBannerHeader dataSource="pageBannerHeaders.teamMember" />`}</Code>

 <Code title="Data Structure" language="json">{JSON.stringify(sampleCmsData.pageBannerHeaders.teamMember, null, 2)}</Code>
 </Box>

 <PageBannerHeader dataSource="pageBannerHeaders.teamMember" />

 <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
 <h3>Team Member Profile</h3>
 <p>
 This team member banner is completely driven by CMS data, including the cover image,
 profile photo, metadata, tags, and actions. Perfect for team directories and professional profiles.
 </p>
 </div>

 </div>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Team member banner with complete data binding - all content loaded from CMS data source.',
 },
 },
 },
};

export const DataBindingCompany: Story = {
 render: () => (
 <QwickApp
 appId="banner-data-company"
 appName='Company Data Binding'
 dataSource={{ dataProvider }}
 >
 <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

 <Box>
 <Typography variant="h5" gutterBottom>🏢 Data-Driven Company Banner</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 Company banners can pull all their content from CMS, making them perfect for dynamic business pages.
 </Typography>
 </Box>

 <PageBannerHeader dataSource="pageBannerHeaders.company" />

 <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
 <div>
 <h3>Dynamic Content</h3>
 <p>
 All banner content including metrics, tags, and actions are dynamically loaded
 from the CMS, allowing for real-time updates without code changes.
 </p>
 </div>

 <div>
 <h3>Flexible Layout</h3>
 <p>
 The banner automatically adapts to the available data, showing or hiding
 elements based on what's provided in the data source.
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
 story: 'Company banner with data binding showing business metrics, technology tags, and corporate actions.',
 },
 },
 },
};

export const DataBindingProject: Story = {
 render: () => (
 <QwickApp
 appId="banner-data-project"
 appName='Project Data Binding'
 dataSource={{ dataProvider }}
 >
 <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

 <Box>
 <Typography variant="h5" gutterBottom> Data-Driven Project Banner</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 Project showcases benefit from data binding by automatically displaying current metrics and status.
 </Typography>
 </Box>

 <PageBannerHeader dataSource="pageBannerHeaders.project" />

 <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
 <div>
 <h3> Real-time Metrics</h3>
 <p>
 Project banners can display live statistics like user counts, data processing volumes,
 and system uptime directly from your APIs.
 </p>
 </div>

 <div>
 <h3> Technology Stack</h3>
 <p>
 Technology tags are automatically generated from project metadata, keeping
 documentation in sync with actual implementation.
 </p>
 </div>

 <div>
 <h3>🔗 Dynamic Actions</h3>
 <p>
 Action buttons can be configured per project, with URLs and availability
 controlled through the CMS for maximum flexibility.
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
 story: 'Project showcase banner with data binding displaying real-time metrics, technology stack, and dynamic actions.',
 },
 },
 },
};

export const DataBindingWithFallback: Story = {
 render: () => (
 <QwickApp
 appId="banner-data-fallback"
 appName='Data Binding with Fallback'
 dataSource={{ dataProvider }}
 >
 <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

 <Box>
 <Typography variant="h5" gutterBottom> Fallback Support</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 PageBannerHeader gracefully handles missing data sources with fallback props.
 </Typography>

 <Code title="Fallback Usage" language="tsx">{`<PageBannerHeader 
 dataSource="nonexistent.data" 
 title="Fallback Title"
 subtitle="Shows when data source is missing"
 coverImage="/fallback-cover.jpg"
/>`}</Code>
 </Box>

 <PageBannerHeader
 dataSource="nonexistent.data"
 title="Fallback Banner"
 subtitle="This content appears when the dataSource doesn't exist"
 coverImage="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
 height={160}
 />

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
 story: 'Banner with fallback props when dataSource is missing or unavailable, ensuring graceful degradation.',
 },
 },
 },
};

export const AccessibilityDemo: Story = {
 render: () => (
 <QwickApp
 appId="banner-accessibility"
 appName='Accessibility Features Demo'
 dataSource={{ dataProvider }}
 >
 <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

 <Box>
 <Typography variant="h5" gutterBottom>♿ Accessibility Features</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 PageBannerHeader components include comprehensive accessibility features following WCAG 2.1 guidelines.
 </Typography>

 <Code title="Accessibility Features" language="tsx">{`<PageBannerHeader 
 dataSource="pageBannerHeaders.accessibilityDemo"
 // Automatic accessibility features:
 // - Semantic HTML (header element)
 // - Proper heading hierarchy (h1 for title)
 // - Alt text for all images
 // - ARIA labels for interactive elements
 // - Keyboard navigation support
 // - Screen reader friendly
/>`}</Code>
 </Box>

 <PageBannerHeader dataSource="pageBannerHeaders.accessibilityDemo" />

 <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
 <h3> Built-in Accessibility</h3>
 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '1rem' }}>
 <div>
 <h4>Semantic HTML</h4>
 <ul>
 <li>Uses proper <code>&lt;header&gt;</code> element</li>
 <li>Heading hierarchy with <code>&lt;h1&gt;</code></li>
 <li>Descriptive alt text for images</li>
 <li>ARIA labels for action buttons</li>
 </ul>
 </div>

 <div>
 <h4>Keyboard Navigation</h4>
 <ul>
 <li>All interactive elements focusable</li>
 <li>Logical tab order maintained</li>
 <li>Action buttons keyboard accessible</li>
 <li>Menu items properly navigable</li>
 </ul>
 </div>

 <div>
 <h4>Screen Reader Support</h4>
 <ul>
 <li>Comprehensive image alt text</li>
 <li>Descriptive action labels</li>
 <li>Proper heading structure</li>
 <li>Context-aware descriptions</li>
 </ul>
 </div>

 <div>
 <h4>Visual Design</h4>
 <ul>
 <li>High contrast text overlays</li>
 <li>Readable typography scaling</li>
 <li>Focus indicators on all controls</li>
 <li>Responsive design for all devices</li>
 </ul>
 </div>
 </div>
 </div>

 </div>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Comprehensive accessibility demo showing WCAG 2.1 compliance, semantic HTML, keyboard navigation, and screen reader support.',
 },
 },
 },
};