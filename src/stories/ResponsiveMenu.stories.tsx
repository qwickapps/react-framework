import type { Meta, StoryObj } from '@storybook/react';
import { QwickApp } from '../components/QwickApp';
import { Page } from '../components/pages';
import { HeroBlock, Section, Content } from '../components/blocks';

// Mock icons for demonstration
const HomeIcon = () => <span>🏠</span>;
const AboutIcon = () => <span>📖</span>;
const ContactIcon = () => <span>📞</span>;
const ServicesIcon = () => <span>🛠</span>;
const BlogIcon = () => <span></span>;
const ProfileIcon = () => <span>👤</span>;

const sampleMenuItems = [
 {
 id: 'home',
 label: 'Home',
 icon: <HomeIcon />,
 onClick: () => { alert('Navigate to Home'); },
 active: true,
 },
 {
 id: 'about',
 label: 'About',
 icon: <AboutIcon />,
 onClick: () => { alert('Navigate to About'); },
 },
 {
 id: 'services',
 label: 'Services',
 icon: <ServicesIcon />,
 onClick: () => { alert('Navigate to Services'); },
 badge: '3',
 },
 {
 id: 'blog',
 label: 'Blog',
 icon: <BlogIcon />,
 onClick: () => { alert('Navigate to Blog'); },
 badge: 'New',
 },
 {
 id: 'contact',
 label: 'Contact',
 icon: <ContactIcon />,
 onClick: () => { alert('Navigate to Contact'); },
 },
 {
 id: 'profile',
 label: 'Profile',
 icon: <ProfileIcon />,
 onClick: () => { alert('Navigate to Profile'); },
 },
];

const meta: Meta = {
 title: 'Framework/Responsive Navigation',
 decorators: [
 (Story) => <Story />
 ],
 parameters: {
 layout: 'fullscreen',
 docs: {
 description: {
 component: `Complete responsive navigation system that automatically adapts to different screen sizes.

**Key Features:**
- Automatic adaptation: bottom nav on mobile, nav rail on tablet, top nav on desktop
- Badge support for notifications and status indicators
- Integrated page actions and menu items
- Material UI compliance with proper limits and overflow handling
- Seamless QwickApp integration with automatic scaffolding

**Perfect For:**
- Multi-page applications with complex navigation
- Apps that need consistent navigation across all devices
- Applications requiring notification badges and status indicators
- Projects using the QwickApp framework`,
 },
 },
 },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
 render: () => (
 <QwickApp 
 appName="Demo App" 
 enableScaffolding={true}
 navigationItems={sampleMenuItems}
 >
 <Page route="/">
 <Section padding="large">
 <Content title="Responsive Navigation Demo" centered maxWidth="large">
 <p>Resize the viewport to see the responsive navigation in action:</p>
 <ul>
 <li><strong>Mobile (&lt; 600px):</strong> Bottom navigation (3-5 items, rest in drawer)</li>
 <li><strong>Tablet (600px - 1024px):</strong> Navigation rail on the left (3-7 items, rest in drawer)</li>
 <li><strong>Desktop (&gt; 1024px):</strong> App bar navigation (5-7 items, rest in drawer)</li>
 </ul>
 </Content>
 </Section>
 
 <Section padding="large" background="alternate">
 <Content variant="elevated">
 <h2>Sample Content Area</h2>
 <p>This content area demonstrates how the layout adapts with different navigation styles.</p>
 <p>Notice how the content is properly spaced to avoid overlap with navigation elements.</p>
 </Content>
 </Section>
 
 <Section padding="large">
 <HeroBlock
 title="Content flows properly"
 subtitle="The scaffolding system ensures content doesn't overlap with navigation"
 height="medium"
 backgroundGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
 />
 </Section>
 </Page>
 </QwickApp>
 ),
};

export const WithCustomLogo: Story = {
 render: () => (
 <QwickApp 
 appName="Custom Logo Demo" 
 logo={<div style={{ padding: '8px', background: 'var(--theme-primary)', color: 'white', borderRadius: '4px' }}>CUSTOM</div>}
 enableScaffolding={true}
 navigationItems={sampleMenuItems}
 >
 <Page route="/logo">
 <Section padding="large">
 <Content title="Custom Logo Example" centered>
 <p>This example shows how to use a custom logo component instead of the default text-based logo.</p>
 </Content>
 </Section>
 </Page>
 </QwickApp>
 ),
};

export const CenterLogo: Story = {
 render: () => (
 <QwickApp 
 appName="Centered Logo Demo" 
 enableScaffolding={true}
 navigationItems={sampleMenuItems}
 appBar={{
 logoPosition: 'center',
 title: 'Centered Brand'
 }}
 >
 <Page route="/center">
 <Section padding="large">
 <Content title="Centered Logo Layout" centered>
 <p>The logo and title are positioned in the center of the app bar for a different visual hierarchy.</p>
 </Content>
 </Section>
 </Page>
 </QwickApp>
 ),
};

export const WithPageActions: Story = {
 render: () => (
 <QwickApp 
 appName="Page Actions Demo" 
 enableScaffolding={true}
 navigationItems={sampleMenuItems}
 >
 <Page 
 route="/actions"
 actions={
 <div style={{ display: 'flex', gap: '8px' }}>
 <button style={{ padding: '8px 16px', background: 'var(--theme-primary)', color: 'var(--theme-on-primary)', border: 'none', borderRadius: '6px' }}>
 Save
 </button>
 <button style={{ padding: '8px 16px', background: 'transparent', color: 'var(--theme-on-surface)', border: '1px solid var(--theme-outline)', borderRadius: '6px' }}>
 Cancel
 </button>
 </div>
 }
 >
 <Section padding="large">
 <Content title="Page-Specific Actions" centered>
 <p>This page demonstrates how page-specific actions appear in the app bar.</p>
 </Content>
 </Section>
 </Page>
 </QwickApp>
 ),
};

export const ManyItems: Story = {
 render: () => {
 const manyItems = [
 ...sampleMenuItems,
 {
 id: 'docs',
 label: 'Documentation',
 icon: <span>📚</span>,
 onClick: () => { alert('Navigate to Docs'); },
 priority: 10,
 },
 {
 id: 'support',
 label: 'Support',
 icon: <span>💬</span>,
 onClick: () => { alert('Navigate to Support'); },
 badge: '2',
 priority: 11,
 },
 {
 id: 'settings',
 label: 'Settings',
 icon: <span>⚙</span>,
 onClick: () => { alert('Navigate to Settings'); },
 priority: 12,
 },
 {
 id: 'analytics',
 label: 'Analytics',
 icon: <span></span>,
 onClick: () => { alert('Navigate to Analytics'); },
 priority: 13,
 },
 {
 id: 'reports',
 label: 'Reports',
 icon: <span>📈</span>,
 onClick: () => { alert('Navigate to Reports'); },
 priority: 14,
 },
 ];
 
 return (
 <QwickApp 
 appName="Many Items Demo" 
 enableScaffolding={true}
 navigationItems={manyItems}
 >
 <Page route="/many">
 <Section padding="large">
 <Content title="Navigation with Many Items" centered>
 <p>This example demonstrates how the Material UI guidelines handle overflow items:</p>
 <ul>
 <li><strong>Mobile:</strong> First 5 items in bottom nav, rest in drawer</li>
 <li><strong>Tablet:</strong> First 7 items in rail, rest in drawer</li>
 <li><strong>Desktop:</strong> First 7 items in app bar, rest in drawer</li>
 </ul>
 <p>Try opening the hamburger menu to see the overflow items.</p>
 </Content>
 </Section>
 </Page>
 </QwickApp>
 );
 },
};

export const WithPageMenuItems: Story = {
 render: () => (
 <QwickApp 
 appName="Page Menu Demo" 
 enableScaffolding={true}
 navigationItems={sampleMenuItems.slice(0, 3)}
 >
 <Page 
 route="/page-menu"
 menuItems={[
 {
 id: 'page-action-1',
 label: 'Page Action 1',
 icon: <span></span>,
 onClick: () => { alert('Page Action 1'); },
 priority: 1000,
 },
 {
 id: 'page-action-2',
 label: 'Page Action 2', 
 icon: <span></span>,
 onClick: () => { alert('Page Action 2'); },
 priority: 1001,
 },
 ]}
 >
 <Section padding="large">
 <Content title="Page-Specific Menu Items" centered>
 <p>This page adds its own menu items to the navigation. These items appear after the main navigation items and are only visible when this page is active.</p>
 <p>Check the navigation (bottom nav, rail, or drawer) to see the additional page-specific items.</p>
 </Content>
 </Section>
 </Page>
 </QwickApp>
 ),
};