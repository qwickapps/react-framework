/**
 * Footer Component Stories
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { JsonDataProvider } from '@qwickapps/schema';
import type { Meta, StoryObj } from '@storybook/react';
import Footer from '../components/blocks/Footer';
import Logo from '../components/Logo';
import QwickApp from '../components/QwickApp';

const meta: Meta<typeof Footer> = {
 title: 'Blocks/Footer',
 component: Footer,
 parameters: {
 layout: 'fullscreen',
 docs: {
 description: {
 component: `The Footer component provides a flexible and responsive footer layout with multiple sections, legal information, and branding options.

**Key Features:**
- **Flexible Sections**: Organize links and content into logical groups with titles
- **Responsive Layout**: Automatically adapts between vertical/horizontal orientations based on screen size
- **Legal Information**: Built-in support for copyright notices and legal text
- **Multiple Variants**: Default, contained, and outlined styling options 
- **Logo/Branding**: Optional logo or custom branding element
- **Link Management**: Support for internal and external links with proper accessibility

**Perfect for:**
- Website and application footers
- Page-level footers with contextual information
- Legal compliance and policy links
- Company information and contact details
- Site navigation and resource links
- Brand reinforcement and social links`,
 },
 },
 },
 tags: ['autodocs'],
 argTypes: {
 sections: {
 description: 'Footer sections with titles and links',
 control: { type: 'object' },
 },
 logo: {
 description: 'Optional logo or branding element',
 control: false,
 },
 copyright: {
 description: 'Copyright text',
 control: { type: 'text' },
 },
 legalText: {
 description: 'Additional legal or info text',
 control: { type: 'text' },
 },
 orientation: {
 description: 'Layout orientation',
 control: { type: 'select' },
 options: ['vertical', 'horizontal'],
 },
 variant: {
 description: 'Background variant',
 control: { type: 'select' },
 options: ['default', 'contained', 'outlined'],
 },
 showDivider: {
 description: 'Whether to show divider above footer',
 control: { type: 'boolean' },
 },
 },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample footer sections for demos
const sampleSections = [
 {
 id: 'product',
 title: 'Product',
 items: [
 { id: 'features', label: 'Features', href: '#features' },
 { id: 'pricing', label: 'Pricing', href: '#pricing' },
 { id: 'documentation', label: 'Documentation', href: '#docs' },
 { id: 'api', label: 'API Reference', href: '#api' },
 { id: 'changelog', label: 'Changelog', href: '#changelog' },
 ],
 },
 {
 id: 'company',
 title: 'Company',
 items: [
 { id: 'about', label: 'About Us', href: '#about' },
 { id: 'careers', label: 'Careers', href: '#careers' },
 { id: 'blog', label: 'Blog', href: '#blog' },
 { id: 'press', label: 'Press Kit', href: '#press' },
 { id: 'contact', label: 'Contact', href: '#contact' },
 ],
 },
 {
 id: 'resources',
 title: 'Resources',
 items: [
 { id: 'help', label: 'Help Center', href: '#help' },
 { id: 'community', label: 'Community', href: '#community' },
 { id: 'tutorials', label: 'Tutorials', href: '#tutorials' },
 { id: 'webinars', label: 'Webinars', href: '#webinars' },
 ],
 },
 {
 id: 'legal',
 title: 'Legal',
 items: [
 { id: 'privacy', label: 'Privacy Policy', href: '#privacy' },
 { id: 'terms', label: 'Terms of Service', href: '#terms' },
 { id: 'cookies', label: 'Cookie Policy', href: '#cookies' },
 { id: 'gdpr', label: 'GDPR Compliance', href: '#gdpr' },
 ],
 },
];

const socialSections = [
 {
 id: 'social',
 title: 'Follow Us',
 items: [
 { id: 'twitter', label: 'Twitter', href: 'https://twitter.com/qwickapps', external: true },
 { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/company/qwickapps', external: true },
 { id: 'github', label: 'GitHub', href: 'https://github.com/qwickapps', external: true },
 { id: 'youtube', label: 'YouTube', href: 'https://youtube.com/@qwickapps', external: true },
 ],
 },
];

// Sample CMS data for data binding stories
const sampleCmsData = {
 'footers': {
 'main': {
 sections: [
 {
 id: 'products',
 title: 'Products',
 items: [
 { id: 'framework', label: 'QwickApps React Framework', href: '/framework' },
 { id: 'builder', label: 'QwickApp Builder', href: '/builder' },
 { id: 'cms', label: 'QwickCMS', href: '/cms' },
 { id: 'templates', label: 'Templates', href: '/templates' }
 ]
 },
 {
 id: 'developers',
 title: 'Developers',
 items: [
 { id: 'docs', label: 'Documentation', href: '/docs' },
 { id: 'api', label: 'API Reference', href: '/api' },
 { id: 'guides', label: 'Guides', href: '/guides' },
 { id: 'community', label: 'Community', href: '/community' }
 ]
 },
 {
 id: 'company',
 title: 'Company',
 items: [
 { id: 'about', label: 'About Us', href: '/about' },
 { id: 'careers', label: 'Careers', href: '/careers' },
 { id: 'contact', label: 'Contact', href: '/contact' },
 { id: 'blog', label: 'Blog', href: '/blog' }
 ]
 },
 {
 id: 'social',
 title: 'Connect',
 items: [
 { id: 'twitter', label: 'Twitter', href: 'https://twitter.com/qwickapps', external: true },
 { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/company/qwickapps', external: true },
 { id: 'github', label: 'GitHub', href: 'https://github.com/qwickapps', external: true }
 ]
 }
 ],
 logo: '<strong style="font-size: 1.5rem; color: #1976d2;">QwickApps</strong>',
 copyright: '© 2025 QwickApps. All rights reserved.',
 legalText: 'Privacy Policy | Terms of Service | Cookie Policy',
 orientation: 'vertical',
 variant: 'default',
 showDivider: true
 },
 'startup': {
 sections: [
 {
 id: 'links',
 items: [
 { id: 'home', label: 'Home', href: '/' },
 { id: 'about', label: 'About', href: '/about' },
 { id: 'services', label: 'Services', href: '/services' },
 { id: 'contact', label: 'Contact', href: '/contact' }
 ]
 }
 ],
 copyright: '© 2025 Startup Inc.',
 orientation: 'horizontal',
 variant: 'contained',
 showDivider: false
 },
 'ecommerce': {
 sections: [
 {
 id: 'shop',
 title: 'Shop',
 items: [
 { id: 'products', label: 'All Products', href: '/products' },
 { id: 'sale', label: 'Sale', href: '/sale' },
 { id: 'new', label: 'New Arrivals', href: '/new' }
 ]
 },
 {
 id: 'support',
 title: 'Customer Support',
 items: [
 { id: 'help', label: 'Help Center', href: '/help' },
 { id: 'returns', label: 'Returns', href: '/returns' },
 { id: 'shipping', label: 'Shipping Info', href: '/shipping' }
 ]
 }
 ],
 copyright: '© 2025 E-Store. All rights reserved.',
 legalText: 'Privacy | Terms | Returns Policy',
 orientation: 'vertical',
 variant: 'outlined',
 showDivider: true
 },
 'minimal': {
 copyright: '© 2025 Minimal Site',
 variant: 'default',
 showDivider: false
 }
 }
};

const dataProvider = new JsonDataProvider({ data: sampleCmsData });

export const BasicFooter: Story = {
 args: {
 sections: sampleSections.slice(0, 2),
 copyright: '© 2025 QwickApps. All rights reserved.',
 orientation: 'horizontal',
 variant: 'default',
 showDivider: true,
 },
 render: (args) => (
 <QwickApp appId="footer-basic" appName='Footer Basic'>
 <div style={{ minHeight: '50vh', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
 <div style={{ textAlign: 'center', maxWidth: '600px' }}>
 <h2>Page Content</h2>
 <p>This is the main page content. Scroll down to see the footer.</p>
 <p>The footer will appear below this content with organized sections and copyright information.</p>
 </div>
 </div>
 <Footer {...args} />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Basic footer with two sections and copyright information. Clean and minimal design.',
 },
 },
 },
};

export const ComprehensiveFooter: Story = {
 args: {
 logo: <Logo name="Qwick Apps" size="small" />,
 sections: sampleSections,
 copyright: '© 2025 QwickApps Inc. All rights reserved.',
 legalText: 'Privacy Policy • Terms of Service • Cookie Settings',
 orientation: 'horizontal',
 variant: 'contained',
 showDivider: true,
 },
 render: (args) => (
 <QwickApp appId="footer-comprehensive" appName='Footer Comprehensive'>
 <div style={{ minHeight: '60vh', padding: '2rem' }}>
 <div style={{ maxWidth: '800px', margin: '0 auto' }}>
 <h1>QwickApps Platform</h1>
 <p>
 Build amazing React applications with our comprehensive component library and development tools.
 Our platform provides everything you need to create modern, accessible, and performant web applications.
 </p>

 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', margin: '3rem 0' }}>
 <div style={{ padding: '2rem', backgroundColor: 'var(--theme-surface)', borderRadius: '8px', border: '1px solid var(--theme-outline)' }}>
 <h3> Components</h3>
 <p>Over 50+ production-ready components with TypeScript support.</p>
 </div>
 <div style={{ padding: '2rem', backgroundColor: 'var(--theme-surface)', borderRadius: '8px', border: '1px solid var(--theme-outline)' }}>
 <h3> Theming</h3>
 <p>Flexible theming system with dark mode and custom palettes.</p>
 </div>
 <div style={{ padding: '2rem', backgroundColor: 'var(--theme-surface)', borderRadius: '8px', border: '1px solid var(--theme-outline)' }}>
 <h3> Responsive</h3>
 <p>Mobile-first design with comprehensive responsive breakpoints.</p>
 </div>
 </div>
 </div>
 </div>
 <Footer {...args} />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Comprehensive footer with logo, multiple sections, and legal information. Perfect for business websites and applications.',
 },
 },
 },
};

export const VerticalLayout: Story = {
 args: {
 logo: (
 <div style={{
 fontWeight: 'bold',
 fontSize: '1.5rem',
 background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
 WebkitBackgroundClip: 'text',
 WebkitTextFillColor: 'transparent',
 backgroundClip: 'text'
 }}>
 BRAND
 </div>
 ),
 sections: sampleSections.slice(0, 3),
 copyright: '© 2025 Brand Corp.',
 legalText: 'Privacy • Terms • Cookies',
 orientation: 'vertical',
 variant: 'outlined',
 showDivider: true,
 },
 render: (args) => (
 <QwickApp appId="footer-vertical" appName='Footer Vertical'>
 <div style={{ minHeight: '50vh', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
 <div style={{ textAlign: 'center', maxWidth: '600px' }}>
 <h2>Vertical Footer Layout</h2>
 <p>This demonstrates the vertical orientation where sections are stacked on top of each other.</p>
 </div>
 </div>
 <Footer {...args} />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Vertical footer layout with sections stacked on top of each other. Automatically switches to horizontal on larger screens for better usability.',
 },
 },
 },
};

export const SocialMediaFooter: Story = {
 args: {
 logo: (
 <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
 <div style={{
 width: '32px',
 height: '32px',
 background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
 borderRadius: '8px',
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 fontSize: '1.2rem',
 }}>
 
 </div>
 <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>SocialApp</span>
 </div>
 ),
 sections: [
 ...sampleSections.slice(0, 2),
 ...socialSections,
 ],
 copyright: '© 2025 SocialApp. Made with ❤ in San Francisco.',
 legalText: 'Privacy Policy • Community Guidelines • Terms of Use',
 orientation: 'horizontal',
 variant: 'contained',
 showDivider: false,
 },
 render: (args) => (
 <QwickApp appId="footer-social" appName='Footer Social'>
 <div style={{
 minHeight: '60vh',
 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
 padding: '3rem 2rem',
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 color: 'white'
 }}>
 <div style={{ textAlign: 'center', maxWidth: '700px' }}>
 <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Connect & Share</h1>
 <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
 Join millions of users sharing their stories, connecting with friends, and discovering amazing content every day.
 </p>
 <button style={{
 marginTop: '2rem',
 padding: '1rem 2rem',
 fontSize: '1.1rem',
 backgroundColor: 'white',
 color: '#667eea',
 border: 'none',
 borderRadius: '8px',
 fontWeight: 'bold',
 cursor: 'pointer'
 }}>
 Get Started Today
 </button>
 </div>
 </div>
 <Footer {...args} />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Social media style footer with custom logo, social links, and community-focused content.',
 },
 },
 },
};

export const MinimalFooter: Story = {
 args: {
 copyright: '© 2025 Minimal Co.',
 legalText: 'Privacy • Terms',
 orientation: 'horizontal',
 variant: 'default',
 showDivider: false,
 },
 render: (args) => (
 <QwickApp appId="footer-minimal" appName='Footer Minimal'>
 <div style={{ minHeight: '70vh', padding: '3rem 2rem' }}>
 <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
 <h1>Less is More</h1>
 <p style={{ fontSize: '1.1rem', lineHeight: 1.6, margin: '2rem 0' }}>
 Sometimes the most elegant solution is the simplest one. This minimal footer
 contains only the essential legal information without any additional sections or navigation.
 </p>
 <p>
 Perfect for landing pages, portfolios, or applications where you want to keep
 the focus on your main content while still providing necessary legal compliance.
 </p>
 </div>
 </div>
 <Footer {...args} />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Minimal footer with only copyright and legal text. Perfect for simple pages and focused designs.',
 },
 },
 },
};

export const VariantComparison: Story = {
 render: () => (
 <QwickApp appId="footer-variants" appName='Footer Variants'>
 <div style={{ display: 'flex', flexDirection: 'column' }}>
 {/* Default Variant */}
 <div style={{ minHeight: '30vh', padding: '2rem', backgroundColor: '#f5f5f5' }}>
 <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
 <h2>Default Variant</h2>
 <p>Transparent background, blends with page content.</p>
 </div>
 </div>
 <Footer
 sections={sampleSections.slice(0, 2)}
 copyright="© 2025 Default Footer"
 variant="default"
 />

 {/* Contained Variant */}
 <div style={{ minHeight: '30vh', padding: '2rem', backgroundColor: '#e3f2fd' }}>
 <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
 <h2>Contained Variant</h2>
 <p>Solid background color for clear separation from content.</p>
 </div>
 </div>
 <Footer
 sections={sampleSections.slice(0, 2)}
 copyright="© 2025 Contained Footer"
 variant="contained"
 />

 {/* Outlined Variant */}
 <div style={{ minHeight: '30vh', padding: '2rem', backgroundColor: '#fff3e0' }}>
 <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
 <h2>Outlined Variant</h2>
 <p>Border outline for subtle definition without heavy background.</p>
 </div>
 </div>
 <Footer
 sections={sampleSections.slice(0, 2)}
 copyright="© 2025 Outlined Footer"
 variant="outlined"
 />
 </div>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Comparison of footer variants: default (transparent), contained (solid background), and outlined (border).',
 },
 },
 },
};

export const DeveloperFooter: Story = {
 args: {
 logo: (
 <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
 <span style={{ fontSize: '1.5rem' }}>👩‍</span>
 <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>DevPortfolio</span>
 </div>
 ),
 sections: [
 {
 id: 'projects',
 title: 'Projects',
 items: [
 { id: 'web-apps', label: 'Web Applications', href: '#web-apps' },
 { id: 'mobile-apps', label: 'Mobile Apps', href: '#mobile-apps' },
 { id: 'open-source', label: 'Open Source', href: '#open-source' },
 { id: 'experiments', label: 'Experiments', href: '#experiments' },
 ],
 },
 {
 id: 'skills',
 title: 'Skills',
 items: [
 { id: 'frontend', label: 'Frontend Development', onClick: () => alert('Frontend skills') },
 { id: 'backend', label: 'Backend Development', onClick: () => alert('Backend skills') },
 { id: 'devops', label: 'DevOps & Cloud', onClick: () => alert('DevOps skills') },
 { id: 'design', label: 'UI/UX Design', onClick: () => alert('Design skills') },
 ],
 },
 {
 id: 'connect',
 title: 'Connect',
 items: [
 { id: 'email', label: 'Email', href: 'mailto:hello@devportfolio.com' },
 { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/developer', external: true },
 { id: 'github', label: 'GitHub', href: 'https://github.com/developer', external: true },
 { id: 'resume', label: 'Download Resume', href: '/resume.pdf', external: true },
 ],
 },
 ],
 copyright: '© 2025 Jane Developer. Built with React and TypeScript.',
 legalText: 'Available for hire • Open to opportunities',
 orientation: 'horizontal',
 variant: 'default',
 showDivider: true,
 },
 render: (args) => (
 <QwickApp appId="footer-developer" appName='Footer Developer'>
 <div style={{ padding: '2rem' }}>
 <div style={{ maxWidth: '800px', margin: '0 auto' }}>
 <h1>Jane Developer</h1>
 <p style={{ fontSize: '1.2rem', color: 'var(--theme-on-background)', opacity: 0.8 }}>
 Full-Stack Developer & UI/UX Designer
 </p>

 <div style={{ margin: '3rem 0' }}>
 <h2>Featured Projects</h2>
 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
 <div style={{ padding: '2rem', border: '1px solid var(--theme-outline)', borderRadius: '12px' }}>
 <h3> Task Management App</h3>
 <p>React, TypeScript, Node.js, PostgreSQL</p>
 <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
 <button style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--theme-primary)', color: 'white', border: 'none', borderRadius: '4px' }}>
 View Project
 </button>
 <button style={{ padding: '0.5rem 1rem', border: '1px solid var(--theme-outline)', backgroundColor: 'transparent', borderRadius: '4px' }}>
 GitHub
 </button>
 </div>
 </div>

 <div style={{ padding: '2rem', border: '1px solid var(--theme-outline)', borderRadius: '12px' }}>
 <h3> Design System</h3>
 <p>React, Storybook, Figma, Design Tokens</p>
 <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
 <button style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--theme-primary)', color: 'white', border: 'none', borderRadius: '4px' }}>
 View Project
 </button>
 <button style={{ padding: '0.5rem 1rem', border: '1px solid var(--theme-outline)', backgroundColor: 'transparent', borderRadius: '4px' }}>
 GitHub
 </button>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 <Footer {...args} />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Developer portfolio footer with projects, skills, and professional contact information. Perfect for personal websites and portfolios.',
 },
 },
 },
};

// Data Binding Stories
export const DataBindingMain: Story = {
 args: {
 dataSource: 'footers.main',
 },
 render: (args) => (
 <QwickApp appId="footer-data-main" appName='Footer Data Binding Main' dataSource={{ dataProvider }}>
 <div style={{ minHeight: '50vh', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
 <div style={{ textAlign: 'center', maxWidth: '600px' }}>
 <h1>Company Website</h1>
 <p style={{ fontSize: '1.2rem', color: 'var(--theme-on-background)', opacity: 0.8, marginBottom: '3rem' }}>
 Complete footer loaded from CMS with multiple sections, logo, copyright, and legal information.
 </p>
 </div>
 </div>
 <Footer {...args} />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Footer content loaded from CMS data source. Shows comprehensive footer with multiple navigation sections, social links, and legal information.',
 },
 },
 },
};

export const DataBindingStartup: Story = {
 args: {
 dataSource: 'footers.startup',
 },
 render: (args) => (
 <QwickApp appId="footer-data-startup" appName='Footer Data Binding Startup' dataSource={{ dataProvider }}>
 <div style={{ minHeight: '50vh', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
 <div style={{ textAlign: 'center', maxWidth: '600px' }}>
 <h1>Startup Landing</h1>
 <p style={{ fontSize: '1.2rem', color: 'var(--theme-on-background)', opacity: 0.8, marginBottom: '3rem' }}>
 Simple horizontal footer layout perfect for startup landing pages.
 </p>
 </div>
 </div>
 <Footer {...args} />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Startup-style footer loaded from CMS. Features horizontal layout with contained variant and minimal links.',
 },
 },
 },
};

export const DataBindingEcommerce: Story = {
 args: {
 dataSource: 'footers.ecommerce',
 },
 render: (args) => (
 <QwickApp appId="footer-data-ecommerce" appName='Footer Data Binding Ecommerce' dataSource={{ dataProvider }}>
 <div style={{ minHeight: '50vh', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
 <div style={{ textAlign: 'center', maxWidth: '600px' }}>
 <h1>E-Commerce Store</h1>
 <p style={{ fontSize: '1.2rem', color: 'var(--theme-on-background)', opacity: 0.8, marginBottom: '3rem' }}>
 E-commerce footer with shopping categories and customer support sections.
 </p>
 </div>
 </div>
 <Footer {...args} />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'E-commerce footer loaded from CMS. Features outlined variant with shopping and support sections.',
 },
 },
 },
};

export const DataBindingMinimal: Story = {
 args: {
 dataSource: 'footers.minimal',
 },
 render: (args) => (
 <QwickApp appId="footer-data-minimal" appName='Footer Data Binding Minimal' dataSource={{ dataProvider }}>
 <div style={{ minHeight: '50vh', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
 <div style={{ textAlign: 'center', maxWidth: '600px' }}>
 <h1>Minimal Site</h1>
 <p style={{ fontSize: '1.2rem', color: 'var(--theme-on-background)', opacity: 0.8, marginBottom: '3rem' }}>
 Ultra-minimal footer with just copyright information.
 </p>
 </div>
 </div>
 <Footer {...args} />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Minimal footer loaded from CMS. Shows the simplest possible footer with just copyright text.',
 },
 },
 },
};