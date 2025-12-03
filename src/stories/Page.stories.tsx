/**
 * Page Component Stories - Route-aware content management
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Page } from '../components/pages';
import QwickApp from '../components/QwickApp';
import Scaffold from '../components/Scaffold';
import CoverImageHeader from '../components/blocks/CoverImageHeader';
import PageBannerHeader from '../components/blocks/PageBannerHeader';
import Footer from '../components/blocks/Footer';
import { Section, Content, FeatureGrid } from '../components/blocks';
import { GridLayout, GridCell } from '../components/layout';
import { Edit as EditIcon, Share as ShareIcon, MoreVert as MoreIcon, Add as AddIcon, Settings as SettingsIcon } from '@mui/icons-material';
import { Button } from '../components/buttons/Button';

const meta: Meta<typeof Page> = {
 title: 'Framework/Page',
 component: Page,
 parameters: {
 layout: 'fullscreen',
 docs: {
 description: {
 component: `The Page component provides a flexible layout wrapper with optional header and footer components, loading states, and message handling.

**Key Features:**
- **Header & Footer**: Optional header and footer components for consistent page structure
- **Auto-route Detection**: Automatically detects current route when used with React Router
- **Loading States**: Multiple loading indicator types (spinner, bars, dots)
- **Message System**: Error, warning, success, and info message states
- **Flexible Layout**: Multiple layout variants and responsive design options
- **Router Integration**: Seamless React Router integration with automatic route detection

**Perfect For:**
- Application page layouts with consistent structure
- Content pages requiring loading and error states
- Multi-page applications with routing
- Dashboard and admin interface layouts
- Documentation and help pages
- Landing pages with structured content`,
 },
 },
 },
 tags: ['autodocs'],
 argTypes: {
 route: {
 description: 'Current route/path (auto-detected when using React Router)',
 control: { type: 'text' },
 },
 header: {
 description: 'Optional header component',
 control: false,
 },
 footer: {
 description: 'Optional footer component', 
 control: false,
 },
 variant: {
 description: 'Page layout variant',
 control: { type: 'select' },
 options: ['default', 'centered', 'narrow', 'wide', 'fullwidth'],
 },
 padding: {
 description: 'Padding around page content',
 control: { type: 'select' },
 options: ['none', 'small', 'medium', 'large'],
 },
 background: {
 description: 'Background variant',
 control: { type: 'select' },
 options: ['default', 'surface', 'alternate'],
 },
 loading: {
 description: 'Loading state',
 control: { type: 'boolean' },
 },
 message: {
 description: 'Message state for displaying info/warning/error/success messages',
 control: false,
 },
 },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample navigation items for routing demos
const navigationItems = [
 {
 id: 'home',
 label: 'Home',
 icon: <span>🏠</span>,
 priority: 1,
 },
 {
 id: 'products',
 label: 'Products',
 icon: <span></span>,
 priority: 2,
 },
 {
 id: 'about',
 label: 'About',
 icon: <span>ℹ</span>,
 priority: 3,
 },
 {
 id: 'contact',
 label: 'Contact',
 icon: <span>📧</span>,
 priority: 4,
 },
];

// Router-based navigation wrapper
function RouterNavigationWrapper({ children }: { children: React.ReactNode }) {
 const navigate = useNavigate();
 
 const navItemsWithNavigation = navigationItems.map(item => ({
 ...item,
 onClick: () => navigate(item.id === 'home' ? '/' : `/${item.id}`),
 }));

 return (
 <Scaffold
 appName="Page Demo App"
 navigationItems={navItemsWithNavigation}
 showAppBar={true}
 >
 {children}
 </Scaffold>
 );
}

export const BasicPage: Story = {
 args: {
 variant: 'default',
 padding: 'medium',
 },
 render: (args) => (
 <Page {...args}>
 <Section padding="large">
 <Content title="Simple Page Content" centered maxWidth="large">
 <p>This is a basic page example without router integration. The route and canonical URL are handled manually.</p>

 <GridLayout columns={2} spacing="large">
 <GridCell>
 <Content variant="outlined">
 <h3>Manual Configuration</h3>
 <ul>
 <li>Route prop specified manually</li>
 <li>Canonical URL set via meta prop</li>
 <li>Works without any router dependency</li>
 </ul>
 </Content>
 </GridCell>
 
 <GridCell>
 <Content variant="elevated">
 <h3>Use Cases</h3>
 <ul>
 <li>Static pages and documentation</li>
 <li>Single page applications</li>
 <li>Non-React Router setups</li>
 </ul>
 </Content>
 </GridCell>
 </GridLayout>
 </Content>
 </Section>
 </Page>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Basic page usage with simple content. Clean layout without header or footer components.',
 },
 },
 },
};

export const WithRouterIntegration: Story = {
 args: {
 },
 render: (args) => (
 <QwickApp appId="page-router-demo" appName='Page Router Demo'>
 <BrowserRouter>
 <RouterNavigationWrapper>
 <Routes>
 <Route path="/" element={
 <Page {...args}>
 <Section padding="large">
 <Content title="Router Integration Demo" centered maxWidth="large">
 <p> <strong>Route automatically detected!</strong> No need to specify the route prop when using React Router.</p>
 
 <FeatureGrid
 columns={3}
 gap="medium"
 features={[
 {
 id: 'auto-route',
 icon: <span style={{ fontSize: '2rem' }}></span>,
 title: 'Auto-Detection',
 description: 'Current route is automatically detected using useLocation() hook.',
 },
 {
 id: 'canonical',
 icon: <span style={{ fontSize: '2rem' }}>🔗</span>,
 title: 'SEO Optimization',
 description: 'Canonical URLs are automatically generated for better SEO.',
 },
 {
 id: 'integration',
 icon: <span style={{ fontSize: '2rem' }}>⚙</span>,
 title: 'Seamless Integration',
 description: 'Works perfectly with Scaffold navigation and app bar.',
 },
 ]}
 />

 <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'var(--theme-surface)', borderRadius: '8px', border: '1px solid var(--theme-outline)' }}>
 <h4>Try Navigation:</h4>
 <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
 <Link to="/products" style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--theme-primary)', color: 'var(--theme-on-primary)', borderRadius: '4px', textDecoration: 'none' }}>
 Products
 </Link>
 <Link to="/about" style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--theme-primary)', color: 'var(--theme-on-primary)', borderRadius: '4px', textDecoration: 'none' }}>
 About
 </Link>
 <Link to="/contact" style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--theme-primary)', color: 'var(--theme-on-primary)', borderRadius: '4px', textDecoration: 'none' }}>
 Contact
 </Link>
 </div>
 </div>
 </Content>
 </Section>
 </Page>
 } />
 
 <Route path="/products" element={
 <Page>
 <Section padding="large">
 <Content title="Products Page" centered maxWidth="large">
 <p>This is the products page. Notice how the route is automatically detected and the page title updates in both the browser tab and app bar.</p>
 
 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
 {['Product A', 'Product B', 'Product C'].map(product => (
 <div key={product} style={{
 padding: '1.5rem',
 border: '1px solid var(--theme-outline)',
 borderRadius: '8px',
 backgroundColor: 'var(--theme-surface)',
 textAlign: 'center'
 }}>
 <h4>{product}</h4>
 <p>Sample product description</p>
 </div>
 ))}
 </div>
 
 <div style={{ marginTop: '2rem' }}>
 <Link to="/" style={{ color: 'var(--theme-primary)' }}>← Back to Home</Link>
 </div>
 </Content>
 </Section>
 </Page>
 } />
 
 <Route path="/about" element={
 <Page>
 <Section padding="large" background="alternate">
 <Content title="About Our Company" centered maxWidth="large">
 <p>Learn about our mission and values. This page demonstrates different layout options.</p>
 
 <GridLayout columns={2} spacing="large">
 <GridCell>
 <Content variant="elevated">
 <h3>Our Mission</h3>
 <p>To build amazing React applications with powerful, reusable components that follow best practices.</p>
 </Content>
 </GridCell>
 
 <GridCell>
 <Content variant="outlined">
 <h3>Our Values</h3>
 <ul>
 <li>Developer Experience</li>
 <li>Accessibility First</li>
 <li>Performance Optimized</li>
 <li>Type Safety</li>
 </ul>
 </Content>
 </GridCell>
 </GridLayout>
 
 <div style={{ marginTop: '2rem' }}>
 <Link to="/" style={{ color: 'var(--theme-primary)' }}>← Back to Home</Link>
 </div>
 </Content>
 </Section>
 </Page>
 } />
 
 <Route path="/contact" element={
 <Page>
 <Section padding="large">
 <Content title="Get In Touch" centered maxWidth="medium">
 <p>This page demonstrates page-specific actions in the app bar.</p>
 
 <div style={{
 padding: '2rem',
 backgroundColor: 'var(--theme-surface)',
 borderRadius: '8px',
 border: '1px solid var(--theme-outline)',
 marginTop: '2rem'
 }}>
 <h4>Contact Information</h4>
 <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
 <div>📧 contact@example.com</div>
 <div>📞 (555) 123-4567</div>
 <div>🏢 123 Main Street, City, State 12345</div>
 </div>
 <hr style={{ margin: '1.5rem 0', borderColor: 'var(--theme-outline)' }} />
 <Button label='Send Message' onClick={() => alert('Message sent!')} />
 </div>
 
 <div style={{ marginTop: '2rem' }}>
 <Link to="/" style={{ color: 'var(--theme-primary)' }}>← Back to Home</Link>
 </div>
 </Content>
 </Section>
 </Page>
 } />
 </Routes>
 </RouterNavigationWrapper>
 </BrowserRouter>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Complete routing integration demo with React Router. Shows automatic route detection, navigation, and page-specific actions.',
 },
 },
 },
};

export const PageVariants: Story = {
 args: {
 variant: 'default',
 },
 render: (args) => (
 <QwickApp appId="page-variants-demo" appName='Page Variants Demo'>
 <BrowserRouter>
 <Scaffold appName="Page Variants" navigationItems={navigationItems} showAppBar={true}>
 <Routes>
 <Route path="/" element={
 <Page {...args} variant="centered">
 <Section padding="large">
 <Content title="Page Layout Variants" centered>
 <p>The Page component supports multiple layout variants for different content types.</p>
 
 <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
 <Link to="/narrow" style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--theme-primary)', color: 'var(--theme-on-primary)', borderRadius: '4px', textDecoration: 'none' }}>
 Narrow
 </Link>
 <Link to="/wide" style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--theme-primary)', color: 'var(--theme-on-primary)', borderRadius: '4px', textDecoration: 'none' }}>
 Wide
 </Link>
 <Link to="/fullwidth" style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--theme-primary)', color: 'var(--theme-on-primary)', borderRadius: '4px', textDecoration: 'none' }}>
 Full Width
 </Link>
 </div>
 </Content>
 </Section>
 </Page>
 } />
 
 <Route path="/narrow" element={
 <Page variant="narrow" padding="large">
 <Content title="Narrow Content Layout" centered>
 <p>Perfect for blog posts, articles, and focused content. The narrow layout provides optimal reading width for text-heavy content.</p>
 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
 <div style={{ marginTop: '2rem' }}>
 <Link to="/" style={{ color: 'var(--theme-primary)' }}>← Back</Link>
 </div>
 </Content>
 </Page>
 } />
 
 <Route path="/wide" element={
 <Page variant="wide" padding="large">
 <Content title="Wide Content Layout">
 <p>Great for dashboards, data tables, and content that needs more horizontal space.</p>
 
 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '2rem' }}>
 {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
 <div key={i} style={{
 padding: '1rem',
 backgroundColor: 'var(--theme-surface)',
 border: '1px solid var(--theme-outline)',
 borderRadius: '4px',
 textAlign: 'center'
 }}>
 Card {i}
 </div>
 ))}
 </div>
 
 <div style={{ marginTop: '2rem' }}>
 <Link to="/" style={{ color: 'var(--theme-primary)' }}>← Back</Link>
 </div>
 </Content>
 </Page>
 } />
 
 <Route path="/fullwidth" element={
 <Page variant="fullwidth" padding="none">
 <div style={{
 height: '400px',
 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 color: 'white',
 marginBottom: '2rem'
 }}>
 <div style={{ textAlign: 'center' }}>
 <h2>Full Width Hero Section</h2>
 <p>Perfect for landing pages and immersive content</p>
 </div>
 </div>
 
 <Section padding="large">
 <Content centered maxWidth="large">
 <p>Full width layout removes all default padding and constraints, giving you complete control over the content layout.</p>
 <div style={{ marginTop: '2rem' }}>
 <Link to="/" style={{ color: 'var(--theme-primary)' }}>← Back</Link>
 </div>
 </Content>
 </Section>
 </Page>
 } />
 </Routes>
 </Scaffold>
 </BrowserRouter>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Demonstrates different page layout variants: narrow, wide, and fullwidth options for different content types.',
 },
 },
 },
};

export const LoadingAndErrorStates: Story = {
 args: {
 loading: true,
 },
 render: (args) => (
 <Page {...args}>
 <Section padding="large">
 <Content>
 <p>This content won't be visible in loading state.</p>
 </Content>
 </Section>
 </Page>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Demonstrates loading and error states. Toggle the loading and error controls to see different states.',
 },
 },
 },
};

export const WithCoverImageHeader: Story = {
 args: {
 variant: 'default',
 padding: 'medium',
 header: (
 <CoverImageHeader
 image="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
 imageAlt="Team collaboration"
 title="Project Dashboard"
 subtitle="Manage your projects efficiently with powerful tools"
 overline="WORKSPACE"
 tags={['Active', 'Team Project', 'Due Soon']}
 actions={[
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
 id: 'settings',
 label: 'Settings',
 icon: <SettingsIcon />,
 onClick: () => alert('Settings clicked'),
 priority: 3,
 },
 {
 id: 'archive',
 label: 'Archive',
 onClick: () => alert('Archive clicked'),
 destructive: true,
 priority: 4,
 },
 ]}
 maxVisibleActions={2}
 />
 ),
 },
 render: (args) => (
 <Page {...args}>
 <Section padding="large">
 <Content title="Page with CoverImageHeader" maxWidth="large">
 <p>This example shows how to use the CoverImageHeader component as a page header. It provides a clean layout with image, title, subtitle, tags, and actions.</p>
 
 <FeatureGrid
 columns={3}
 gap="medium"
 features={[
 {
 id: 'header-image',
 icon: <span style={{ fontSize: '2rem' }}>🖼</span>,
 title: 'Header Image',
 description: 'Optional image or avatar with configurable size and shape.',
 },
 {
 id: 'contextual-actions',
 icon: <span style={{ fontSize: '2rem' }}></span>,
 title: 'Contextual Actions',
 description: 'Priority-based actions with overflow menu for additional options.',
 },
 {
 id: 'flexible-content',
 icon: <span style={{ fontSize: '2rem' }}></span>,
 title: 'Flexible Content',
 description: 'Overline, title, subtitle, and tags for comprehensive information display.',
 },
 ]}
 />
 </Content>
 </Section>
 </Page>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Demonstrates using CoverImageHeader as a page header with image, title, subtitle, tags, and contextual actions.',
 },
 },
 },
};

export const WithPageBannerHeader: Story = {
 args: {
 variant: 'default',
 padding: 'none',
 header: (
 <PageBannerHeader
 coverImage="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
 coverImageAlt="Team workspace"
 profileImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
 profileImageAlt="User avatar"
 title="John Doe"
 subtitle="Senior Product Manager"
 overline="TEAM MEMBER"
 metadata={[
 { label: 'Projects', value: 12 },
 { label: 'Team Size', value: 8 },
 { label: 'Years', value: '3+' },
 ]}
 tags={['Product Manager', 'Team Lead', 'Remote']}
 actions={[
 {
 id: 'message',
 label: 'Message',
 icon: <ShareIcon />,
 onClick: () => alert('Message sent'),
 priority: 1,
 },
 {
 id: 'follow',
 label: 'Follow',
 icon: <AddIcon />,
 onClick: () => alert('Following'),
 priority: 2,
 },
 {
 id: 'more',
 label: 'More',
 icon: <MoreIcon />,
 onClick: () => alert('More options'),
 priority: 3,
 },
 ]}
 height={180}
 profilePosition="overlay-center"
 />
 ),
 },
 render: (args) => (
 <Page {...args}>
 <Section padding="large">
 <Content title="Page with PageBannerHeader" maxWidth="large">
 <p>This example demonstrates the Facebook-style PageBannerHeader with cover image, profile overlay, metadata, and responsive actions.</p>

 <GridLayout columns={2} spacing="large">
 <GridCell>
 <Content variant="outlined">
 <h3>Banner Features</h3>
 <ul>
 <li>Cover image with gradient overlay</li>
 <li>Profile image with configurable position</li>
 <li>Metadata display (followers, posts, etc.)</li>
 <li>Tag system for categorization</li>
 <li>Responsive action buttons</li>
 </ul>
 </Content>
 </GridCell>
 
 <GridCell>
 <Content variant="elevated">
 <h3>Use Cases</h3>
 <ul>
 <li>User profiles and team pages</li>
 <li>Project showcases</li>
 <li>Company pages</li>
 <li>Social media style layouts</li>
 <li>Portfolio headers</li>
 </ul>
 </Content>
 </GridCell>
 </GridLayout>
 </Content>
 </Section>
 </Page>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Shows PageBannerHeader with Facebook-style banner, profile overlay, metadata display, and responsive actions.',
 },
 },
 },
};

export const WithFooter: Story = {
 args: {
 variant: 'default',
 padding: 'medium',
 footer: (
 <Footer
 logo={<div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--theme-primary)' }}>QwickApps</div>}
 sections={[
 {
 id: 'product',
 title: 'Product',
 items: [
 { id: 'features', label: 'Features', href: '#features' },
 { id: 'pricing', label: 'Pricing', href: '#pricing' },
 { id: 'documentation', label: 'Documentation', href: '#docs' },
 { id: 'api', label: 'API Reference', href: '#api' },
 ],
 },
 {
 id: 'company',
 title: 'Company',
 items: [
 { id: 'about', label: 'About', href: '#about' },
 { id: 'careers', label: 'Careers', href: '#careers' },
 { id: 'blog', label: 'Blog', href: '#blog' },
 { id: 'contact', label: 'Contact', href: '#contact' },
 ],
 },
 {
 id: 'support',
 title: 'Support',
 items: [
 { id: 'help', label: 'Help Center', href: '#help' },
 { id: 'community', label: 'Community', href: '#community' },
 { id: 'status', label: 'Status', href: '#status', external: true },
 ],
 },
 ]}
 copyright="© 2025 QwickApps. All rights reserved."
 legalText="Privacy Policy • Terms of Service"
 orientation="horizontal"
 variant="contained"
 />
 ),
 },
 render: (args) => (
 <Page {...args}>
 <Section padding="large">
 <Content title="Page with Footer Component" centered maxWidth="large">
 <p>This example shows how to add a comprehensive footer to your pages with multiple sections, links, and legal information.</p>
 
 <FeatureGrid
 columns={3}
 gap="medium"
 features={[
 {
 id: 'sections',
 icon: <span style={{ fontSize: '2rem' }}>📂</span>,
 title: 'Organized Sections',
 description: 'Group related links into titled sections for better organization.',
 },
 {
 id: 'responsive',
 icon: <span style={{ fontSize: '2rem' }}></span>,
 title: 'Responsive Design',
 description: 'Automatically adapts layout for mobile and desktop viewing.',
 },
 {
 id: 'legal',
 icon: <span style={{ fontSize: '2rem' }}>⚖</span>,
 title: 'Legal Information',
 description: 'Built-in support for copyright, privacy policy, and terms.',
 },
 ]}
 />

 <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: 'var(--theme-surface)', borderRadius: '8px', border: '1px solid var(--theme-outline)' }}>
 <h4>Footer Configuration Options:</h4>
 <ul style={{ textAlign: 'left', margin: '1rem 0' }}>
 <li><strong>Sections:</strong> Organize links into logical groups</li>
 <li><strong>Orientation:</strong> Vertical (default) or horizontal layout</li>
 <li><strong>Variants:</strong> Default, contained, or outlined styling</li>
 <li><strong>Logo/Branding:</strong> Optional logo or brand element</li>
 <li><strong>Legal Text:</strong> Copyright and policy links</li>
 </ul>
 </div>
 </Content>
 </Section>
 </Page>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Demonstrates comprehensive footer implementation with sections, legal information, and responsive design.',
 },
 },
 },
};