/**
 * QwickApps React Framework - Introduction and Getting Started Guide
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import type { Meta, StoryObj } from '@storybook/react';
import QwickApp from '../components/QwickApp';
import { Page } from '../components/pages';
import CoverImageHeader from '../components/blocks/CoverImageHeader';
import PageBannerHeader from '../components/blocks/PageBannerHeader';
import Footer from '../components/blocks/Footer';
import Scaffold from '../components/Scaffold';
import { GridLayout, GridCell } from '../components/layout';
import { Section, Content, FeatureGrid, HeroBlock } from '../components/blocks';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { 
 Rocket as RocketIcon,
 Palette as PaletteIcon,
 Phone as PhoneIcon,
 Code as CodeIcon,
 Speed as SpeedIcon,
 Security as SecurityIcon,
 Accessibility as AccessibilityIcon,
 GitHub as GitHubIcon,
 Download as DownloadIcon,
 MenuBook as DocsIcon,
 PlayArrow as DemoIcon,
 Category as ComponentsIcon,
 Layers as LayersIcon,
 Settings as SettingsIcon
} from '@mui/icons-material';
import Logo from '../components/Logo';
import { Code } from '../components/blocks';

const meta: Meta = {
 title: 'Introduction',
 parameters: {
 layout: 'fullscreen',
 docs: {
 page: () => (
 <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
 <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
 <h1 style={{ fontSize: '3rem', margin: '0 0 1rem 0', background: 'linear-gradient(45deg, #2196F3, #21CBF3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
 QwickApps React Framework
 </h1>
 <p style={{ fontSize: '1.5rem', color: 'var(--theme-on-background)', opacity: 0.8, margin: '0 0 2rem 0' }}>
 The most developer-friendly React framework that turns complex UI development into a joy. Build production-ready applications in hours, not weeks.
 </p>
 <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
 <span style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--theme-primary)', color: 'white', borderRadius: '20px', fontSize: '0.875rem' }}>
 50+ Components
 </span>
 <span style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--theme-secondary)', color: 'white', borderRadius: '20px', fontSize: '0.875rem' }}>
 TypeScript
 </span>
 <span style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--theme-success)', color: 'white', borderRadius: '20px', fontSize: '0.875rem' }}>
 Material UI
 </span>
 <span style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--theme-warning)', color: 'white', borderRadius: '20px', fontSize: '0.875rem' }}>
 Responsive
 </span>
 </div>
 </div>

 {/* Quick Start Section */}
 <div style={{ marginBottom: '3rem' }}>
 <h2> Quick Start</h2>
 <div style={{ marginBottom: '1rem' }}>
 <h3>Installation</h3>
 <Code language="bash" title="terminal" maxHeight={60}>
npm install @qwickapps/react-framework
 </Code>
 </div>
 
 <div style={{ marginBottom: '1rem' }}>
 <h3>Basic Setup</h3>
 <Code language="typescript" title="App.tsx">
{`import { QwickApp } from '@qwickapps/react-framework';

function App() {
 return (
 <QwickApp appId="com.mycompany.myapp">
 {/* Your app content */}
 </QwickApp>
 );
}`}
 </Code>
 </div>
 
 <div style={{ marginBottom: '1rem' }}>
 <h3>With Navigation</h3>
 <Code language="typescript" title="App.tsx">
{`import { QwickApp, Page, Scaffold } from '@qwickapps/react-framework';

const navigationItems = [
 {
 id: 'home',
 label: 'Home',
 icon: <HomeIcon />,
 onClick: () => navigate('/'),
 active: true,
 },
 {
 id: 'about',
 label: 'About', 
 icon: <AboutIcon />,
 onClick: () => navigate('/about'),
 },
];

function App() {
 return (
 <QwickApp appId="com.mycompany.myapp">
 <Scaffold 
 appName="My App"
 navigationItems={navigationItems}
 showAppBar={true}
 >
 <Page title="Welcome" route="/">
 {/* Your page content */}
 </Page>
 </Scaffold>
 </QwickApp>
 );
}`}
 </Code>
 </div>
 
 <div style={{ marginBottom: '1rem' }}>
 <h3>Complete Example</h3>
 <Code language="typescript" title="App.tsx" maxHeight={500}>
{`import { 
 QwickApp, 
 Page, 
 HeroBlock, 
 Section, 
 Content, 
 GridLayout, 
 GridCell,
 FeatureGrid,
 Scaffold
} from '@qwickapps/react-framework';

function App() {
 return (
 <QwickApp appId="com.mycompany.myapp">
 <Scaffold appName="My App" showAppBar={true}>
 <Page title="Home">
 <HeroBlock
 title="Welcome to My App"
 subtitle="Build amazing applications with QwickApps React Framework"
 backgroundGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
 actions={[{
 label: 'Get Started',
 variant: 'primary',
 onClick: () => console.log('Getting started!')
 }]}
 />
 
 <Section padding="large" background="alternate">
 <Content title="Features" centered>
 <FeatureGrid
 columns={3}
 features={[{
 id: 'responsive',
 title: 'Responsive Design',
 description: 'Works perfectly on all devices',
 icon: <span></span>
 }, {
 id: 'accessible',
 title: 'Accessible',
 description: 'WCAG compliant out of the box',
 icon: <span>♿</span>
 }, {
 id: 'secure',
 title: 'Secure',
 description: 'Built-in XSS protection',
 icon: <span>🔒</span>
 }]}
 />
 </Content>
 </Section>
 
 <Section padding="large">
 <GridLayout columns={2} gap="large">
 <GridCell>
 <Content variant="elevated" spacing="spacious">
 <h3>Easy to Use</h3>
 <p>Simple, intuitive API that gets you productive immediately.</p>
 </Content>
 </GridCell>
 <GridCell>
 <Content variant="elevated" spacing="spacious">
 <h3>Fully Featured</h3>
 <p>Everything you need for modern web applications.</p>
 </Content>
 </GridCell>
 </GridLayout>
 </Section>
 </Page>
 </Scaffold>
 </QwickApp>
 );
}`}
 </Code>
 </div>
 </div>

 {/* What's New Section */}
 <div style={{ marginBottom: '3rem' }}>
 <h2> What's New in 2025</h2>
 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
 <div style={{ padding: '1.5rem', border: '1px solid var(--theme-outline)', borderRadius: '8px' }}>
 <h3> Page Component Redesign</h3>
 <p>Simplified with optional header and footer props. No more complex menu/actions logic!</p>
 </div>
 <div style={{ padding: '1.5rem', border: '1px solid var(--theme-outline)', borderRadius: '8px' }}>
 <h3>🖼 New Header Components</h3>
 <p>CoverImageHeader and PageBannerHeader for flexible page layouts and social media style designs.</p>
 </div>
 <div style={{ padding: '1.5rem', border: '1px solid var(--theme-outline)', borderRadius: '8px' }}>
 <h3>🦶 Footer Component</h3>
 <p>Comprehensive footer with sections, legal info, and responsive vertical/horizontal layouts.</p>
 </div>
 <div style={{ padding: '1.5rem', border: '1px solid var(--theme-outline)', borderRadius: '8px' }}>
 <h3> Code Component</h3>
 <p>Syntax-highlighted code display with copy functionality and theme-aware styling for documentation.</p>
 </div>
 </div>
 </div>

 {/* Key Features Section */}
 <div style={{ marginBottom: '3rem' }}>
 <h2> Key Features</h2>
 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
 <div style={{ textAlign: 'center', padding: '1rem' }}>
 <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}></div>
 <h4>Theming System</h4>
 <p>Dark/light mode with custom palettes</p>
 </div>
 <div style={{ textAlign: 'center', padding: '1rem' }}>
 <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}></div>
 <h4>Responsive Design</h4>
 <p>Mobile-first with Material UI breakpoints</p>
 </div>
 <div style={{ textAlign: 'center', padding: '1rem' }}>
 <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>♿</div>
 <h4>Accessibility</h4>
 <p>WCAG compliant with screen reader support</p>
 </div>
 <div style={{ textAlign: 'center', padding: '1rem' }}>
 <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}></div>
 <h4>Performance</h4>
 <p>Optimized components with lazy loading</p>
 </div>
 <div style={{ textAlign: 'center', padding: '1rem' }}>
 <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}></div>
 <h4>TypeScript</h4>
 <p>Full type safety and IntelliSense support</p>
 </div>
 <div style={{ textAlign: 'center', padding: '1rem' }}>
 <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}></div>
 <h4>Layout System</h4>
 <p>Flexible sections, columns, and grids</p>
 </div>
 </div>
 </div>

 {/* Component Categories Section */}
 <div style={{ marginBottom: '3rem' }}>
 <h2>📚 Component Categories</h2>
 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
 <div style={{ padding: '1rem', backgroundColor: 'var(--theme-surface)', borderRadius: '8px', border: '1px solid var(--theme-outline)' }}>
 <h4> Layout</h4>
 <ul style={{ margin: 0, paddingLeft: '1rem' }}>
 <li>Page</li>
 <li>Section</li>
 <li>GridLayout</li>
 <li>Content</li>
 <li>FeatureGrid</li>
 </ul>
 </div>
 <div style={{ padding: '1rem', backgroundColor: 'var(--theme-surface)', borderRadius: '8px', border: '1px solid var(--theme-outline)' }}>
 <h4> Headers</h4>
 <ul style={{ margin: 0, paddingLeft: '1rem' }}>
 <li>CoverImageHeader</li>
 <li>PageBannerHeader</li>
 <li>HeroBlock</li>
 </ul>
 </div>
 <div style={{ padding: '1rem', backgroundColor: 'var(--theme-surface)', borderRadius: '8px', border: '1px solid var(--theme-outline)' }}>
 <h4>🧭 Navigation</h4>
 <ul style={{ margin: 0, paddingLeft: '1rem' }}>
 <li>Scaffold</li>
 <li>ResponsiveMenu</li>
 <li>Footer</li>
 </ul>
 </div>
 <div style={{ padding: '1rem', backgroundColor: 'var(--theme-surface)', borderRadius: '8px', border: '1px solid var(--theme-outline)' }}>
 <h4> Branding</h4>
 <ul style={{ margin: 0, paddingLeft: '1rem' }}>
 <li>Logo</li>
 <li>ThemeSwitcher</li>
 <li>PaletteSwitcher</li>
 </ul>
 </div>
 <div style={{ padding: '1rem', backgroundColor: 'var(--theme-surface)', borderRadius: '8px', border: '1px solid var(--theme-outline)' }}>
 <h4> Utilities</h4>
 <ul style={{ margin: 0, paddingLeft: '1rem' }}>
 <li>SafeSpan</li>
 <li>HtmlInputField</li>
 <li>Button</li>
 <li>Code</li>
 <li>AccessibilityChecker</li>
 </ul>
 </div>
 </div>
 </div>

 {/* Final Call to Action Section */}
 <div style={{ textAlign: 'center', padding: '3rem 2rem', backgroundColor: 'var(--theme-surface)', borderRadius: '12px', margin: '2rem 0' }}>
 <h2>Ready to build amazing applications?</h2>
 <p style={{ fontSize: '1.1rem', margin: '1rem 0 2rem' }}>
 Explore the component stories to see everything in action!
 </p>
 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
 <span>Made with ❤ by</span>
 <Logo size="tiny" badgeShape="heart" style={{ display: 'inline-block' }} />
 </div>
 <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
 <button style={{
 padding: '1rem 2rem',
 fontSize: '1.1rem',
 backgroundColor: 'var(--theme-primary)',
 color: 'var(--theme-on-primary)',
 border: 'none',
 borderRadius: '8px',
 cursor: 'pointer',
 fontWeight: 'bold'
 }}>
 Browse Components
 </button>
 <button style={{
 padding: '1rem 2rem',
 fontSize: '1.1rem',
 backgroundColor: 'transparent',
 color: 'var(--theme-primary)',
 border: '2px solid var(--theme-primary)',
 borderRadius: '8px',
 cursor: 'pointer',
 fontWeight: 'bold'
 }}>
 View on GitHub
 </button>
 </div>
 </div>
 </div>
 ),
 },
 },
 tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Welcome: Story = {
 render: () => (
 <QwickApp appId="framework-introduction" appName='Framework Introduction'>
 <BrowserRouter>
 <Scaffold
 appName="QwickApps React Framework"
 navigationItems={[
 {
 id: 'home',
 label: 'Home',
 icon: <RocketIcon />,
 route: '/',
 priority: 1,
 },
 {
 id: 'components',
 label: 'Components',
 icon: <ComponentsIcon />,
 route: '/components',
 priority: 2,
 },
 {
 id: 'examples',
 label: 'Examples',
 icon: <LayersIcon />,
 route: '/examples',
 priority: 3,
 },
 {
 id: 'docs',
 label: 'Documentation',
 icon: <DocsIcon />,
 route: '/docs',
 priority: 4,
 },
 ]}
 showAppBar={true}
 >
 <Routes>
 <Route path="/" element={
 <Page
 header={
 <PageBannerHeader
 coverImage="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
 profileImage={(
 <div style={{
 width: '100%',
 height: '100%',
 background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
 borderRadius: '16px',
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 fontSize: '3rem',
 fontWeight: 'bold',
 color: 'white',
 }}>
 Q
 </div>
 )}
 title="QwickApps React Framework"
 subtitle="Complete React framework for building modern applications"
 overline="VERSION 2025"
 metadata={[
 { label: 'Components', value: '50+' },
 { label: 'Downloads', value: '10K+' },
 { label: 'Stars', value: '2.1K' },
 ]}
 tags={['React', 'TypeScript', 'Material UI', 'Responsive', 'Accessible']}
 actions={[
 {
 id: 'demo',
 label: 'Try Demo',
 icon: <DemoIcon />,
 onClick: () => alert('Opening demo...'),
 priority: 1,
 },
 {
 id: 'github',
 label: 'GitHub',
 icon: <GitHubIcon />,
 onClick: () => alert('Opening GitHub...'),
 priority: 2,
 },
 {
 id: 'install',
 label: 'Install',
 icon: <DownloadIcon />,
 onClick: () => navigator.clipboard.writeText('npm install @qwickapps/react-framework'),
 priority: 3,
 },
 ]}
 height={200}
 />
 }
 footer={
 <Footer
 logo={
 <div style={{ 
 display: 'flex', 
 alignItems: 'center', 
 gap: '0.5rem',
 fontWeight: 'bold', 
 fontSize: '1.2rem', 
 background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
 WebkitBackgroundClip: 'text',
 WebkitTextFillColor: 'transparent'
 }}>
 QwickApps
 </div>
 }
 sections={[
 {
 id: 'framework',
 title: 'Framework',
 items: [
 { id: 'components', label: 'Components', href: '#components' },
 { id: 'theming', label: 'Theming', href: '#theming' },
 { id: 'layout', label: 'Layout System', href: '#layout' },
 { id: 'examples', label: 'Examples', href: '#examples' },
 ],
 },
 {
 id: 'resources',
 title: 'Resources',
 items: [
 { id: 'docs', label: 'Documentation', href: '#docs' },
 { id: 'storybook', label: 'Storybook', href: '#storybook' },
 { id: 'changelog', label: 'Changelog', href: '#changelog' },
 { id: 'migration', label: 'Migration Guide', href: '#migration' },
 ],
 },
 {
 id: 'community',
 title: 'Community',
 items: [
 { id: 'github', label: 'GitHub', href: 'https://github.com/qwickapps', external: true },
 { id: 'discord', label: 'Discord', href: 'https://discord.gg/qwickapps', external: true },
 { id: 'twitter', label: 'Twitter', href: 'https://twitter.com/qwickapps', external: true },
 { id: 'support', label: 'Support', href: 'mailto:support@qwickapps.com' },
 ],
 },
 ]}
 copyright="© 2025 QwickApps. All rights reserved."
 legalText="Proprietary License • Privacy Policy • Terms of Service"
 orientation="horizontal"
 variant="contained"
 />
 }
 variant="fullwidth"
 padding="none"
 >
 <Section padding="large">
 <Content centered maxWidth="large">
 <HeroBlock
 title="Build Faster with QwickApps"
 subtitle="Everything you need to create modern React applications with professional UI components, responsive design, and accessible interfaces."
 actions={[
 {
 label: "Get Started",
 onClick: () => { alert('Get Started clicked'); }
 },
 {
 label: "View Components",
 variant: "outlined",
 onClick: () => { alert('View Components clicked'); }
 }
 ]}
 />
 </Content>
 </Section>

 <Section padding="large" background="alternate">
 <Content title=" What's New in 2025" centered maxWidth="extra-large">
 <FeatureGrid
 columns={3}
 gap="large"
 features={[
 {
 id: 'page-redesign',
 icon: <LayersIcon style={{ fontSize: '3rem', color: 'var(--theme-primary)' }} />,
 title: 'Page Component Redesign',
 description: 'Simplified architecture with optional header and footer props. Clean separation of concerns.',
 },
 {
 id: 'header-components',
 icon: <ComponentsIcon style={{ fontSize: '3rem', color: 'var(--theme-secondary)' }} />,
 title: 'Header Components',
 description: 'CoverImageHeader and PageBannerHeader for flexible page layouts and social media styles.',
 },
 {
 id: 'footer-system',
 icon: <SettingsIcon style={{ fontSize: '3rem', color: 'var(--theme-success)' }} />,
 title: 'Footer System',
 description: 'Comprehensive footer with sections, legal information, and responsive layouts.',
 },
 ]}
 />
 </Content>
 </Section>

 <Section padding="large">
 <Content title=" Key Features" centered maxWidth="large">
 <GridLayout columns={2} spacing="large">
 <GridCell>
 <FeatureGrid
 columns={1}
 gap="medium"
 features={[
 {
 id: 'theming',
 icon: <PaletteIcon style={{ fontSize: '2rem', color: 'var(--theme-primary)' }} />,
 title: 'Advanced Theming',
 description: 'Dark/light mode with custom color palettes and CSS variable system.',
 },
 {
 id: 'responsive',
 icon: <PhoneIcon style={{ fontSize: '2rem', color: 'var(--theme-secondary)' }} />,
 title: 'Mobile First',
 description: 'Responsive design with Material UI breakpoints and touch-friendly interfaces.',
 },
 {
 id: 'accessibility',
 icon: <AccessibilityIcon style={{ fontSize: '2rem', color: 'var(--theme-success)' }} />,
 title: 'Accessibility',
 description: 'WCAG 2.1 compliant with screen reader support and keyboard navigation.',
 },
 ]}
 />
 </GridCell>
 
 <GridCell>
 <FeatureGrid
 columns={1}
 gap="medium"
 features={[
 {
 id: 'typescript',
 icon: <CodeIcon style={{ fontSize: '2rem', color: 'var(--theme-warning)' }} />,
 title: 'TypeScript First',
 description: 'Full type safety with comprehensive interfaces and IntelliSense support.',
 },
 {
 id: 'performance',
 icon: <SpeedIcon style={{ fontSize: '2rem', color: 'var(--theme-error)' }} />,
 title: 'Performance',
 description: 'Optimized components with lazy loading and efficient re-rendering.',
 },
 {
 id: 'secure',
 icon: <SecurityIcon style={{ fontSize: '2rem', color: 'var(--theme-info)' }} />,
 title: 'Secure by Default',
 description: 'Built-in security features and protection against common vulnerabilities.',
 },
 ]}
 />
 </GridCell>
 </GridLayout>
 </Content>
 </Section>
 </Page>
 } />
 
 <Route path="/components" element={
 <Page
 header={
 <CoverImageHeader
 title="Component Library"
 subtitle="Explore 50+ production-ready components"
 overline="DOCUMENTATION"
 tags={['Components', 'TypeScript', 'Responsive']}
 />
 }
 >
 <Section padding="large">
 <Content title="Browse by Category" maxWidth="large">
 <FeatureGrid
 columns={3}
 gap="large"
 features={[
 {
 id: 'layout',
 icon: <LayersIcon style={{ fontSize: '2rem' }} />,
 title: 'Layout',
 description: 'Page, Section, GridLayout, Content, FeatureGrid',
 },
 {
 id: 'navigation',
 icon: <ComponentsIcon style={{ fontSize: '2rem' }} />,
 title: 'Navigation', 
 description: 'Scaffold, ResponsiveMenu, Footer with responsive behavior',
 },
 {
 id: 'branding',
 icon: <PaletteIcon style={{ fontSize: '2rem' }} />,
 title: 'Branding',
 description: 'Logo, ThemeSwitcher, PaletteSwitcher for brand identity',
 },
 ]}
 />
 </Content>
 </Section>
 </Page>
 } />
 
 <Route path="/examples" element={
 <Page
 header={
 <CoverImageHeader
 title="Examples & Templates"
 subtitle="Ready-to-use templates and code examples"
 overline="EXAMPLES"
 />
 }
 >
 <Section padding="large">
 <Content title="Coming Soon" centered>
 <p>Example templates and code samples will be available here.</p>
 </Content>
 </Section>
 </Page>
 } />
 
 <Route path="/docs" element={
 <Page
 header={
 <CoverImageHeader
 title="Documentation"
 subtitle="Complete guides and API references"
 overline="DOCUMENTATION"
 />
 }
 >
 <Section padding="large">
 <Content title="Documentation Links" centered>
 <p>Full documentation will be available on our website.</p>
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
 story: 'Complete framework introduction with navigation, header components, and footer. Demonstrates the new Page architecture with flexible headers and footers.',
 },
 },
 },
};