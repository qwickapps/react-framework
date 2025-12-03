import type { Meta, StoryObj } from '@storybook/react';
import { 
 HeroBlock, 
 Content, 
 FeatureGrid, 
 Section 
} from '../components/blocks';
import { 
 GridLayout, 
 GridCell
} from '../components/layout';
import { QwickApp } from '../components/QwickApp';
import { Button } from '../components/buttons/Button';

const meta: Meta = {
 title: 'Layout/LayoutBlocks',
 decorators: [
 (Story) => (
 <QwickApp appName="Layout Demo">
 <Story />
 </QwickApp>
 ),
 ],
 parameters: {
 layout: 'fullscreen',
 docs: {
 description: {
 component: `Comprehensive collection of layout components for building responsive, professional content layouts with minimal effort.

**Key Features:**
- **HeroBlock**: Full-width hero sections with background images, gradients, and call-to-action buttons
- **GridLayout**: Responsive multi-column layouts (1-5 columns) with automatic mobile adaptation
- **GridCell**: Flexible column component with background colors, spacing, and elevation options
- **Content**: Structured content containers with titles, variants, and action buttons
- **FeatureGrid**: Grid layouts for showcasing features with icons, titles, and descriptions
- **Section**: Page-level containers with theming, spacing, and max-width controls
- **Responsive Design**: All components automatically adapt to mobile, tablet, and desktop
- **Theme Integration**: Full support for theme colors, spacing, and typography

**Perfect for:**
- Landing pages and marketing websites
- Product feature showcases and comparisons
- Documentation and help pages
- Dashboard layouts and admin panels
- Blog posts and article layouts
- Portfolio and showcase websites
- Any application requiring structured content presentation`,
 },
 },
 },
};

export default meta;

// Hero Block Stories
export const HeroBlocks: StoryObj = {
 render: () => (
 <div>
 <HeroBlock
 title="Welcome to QwickApps React Framework"
 subtitle="Build beautiful, responsive React applications with ease"
 backgroundGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
 height="medium"
 actions={[
 {
 label: 'Get Started',
 variant: 'primary',
 onClick: () => { alert('Get Started clicked'); }
 },
 {
 label: 'Learn More',
 variant: 'outlined',
 onClick: () => { alert('Learn More clicked'); }
 }
 ]}
 />
 
 <Section spacing="spacious">
 <HeroBlock
 title="Small Hero with Image"
 subtitle="This hero uses a background image with overlay"
 backgroundImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
 height="small"
 overlayOpacity={0.7}
 textAlign="left"
 />
 </Section>
 </div>
 ),
};

// GridCell Layout Stories
export const ColumnLayouts: StoryObj = {
 render: () => (
 <div>
 <Section spacing="spacious">
 <Content title="Two GridCell Layout" centered>
 <GridLayout columns={2} spacing="large">
 <GridCell background="background.paper">
 <h3>Left GridCell</h3>
 <p>This is the left column content with automatic responsive behavior.</p>
 </GridCell>
 <GridCell background="grey.100">
 <h3>Right GridCell</h3>
 <p>This is the right column content that will stack below on mobile.</p>
 </GridCell>
 </GridLayout>
 </Content>
 </Section>

 <Section background="grey.50">
 <Content title="Three GridCell Layout" centered>
 <GridLayout columns={3} spacing="medium" equalHeight>
 <GridCell background="background.paper">
 <h4>Feature One</h4>
 <p>Equal height columns ensure consistent layout.</p>
 </GridCell>
 <GridCell background="background.paper">
 <h4>Feature Two</h4>
 <p>This column has more content to demonstrate the equal height functionality working properly.</p>
 </GridCell>
 <GridCell background="background.paper">
 <h4>Feature Three</h4>
 <p>Short content.</p>
 </GridCell>
 </GridLayout>
 </Content>
 </Section>

 <Section spacing="spacious">
 <Content title="Four & Five GridCell Layouts" centered>
 <GridLayout columns={4} spacing="small" sx={{ mb: 3 }}>
 {[1, 2, 3, 4].map((i) => (
 <GridCell key={i} background="primary.main" sx={{ textAlign: 'center' }}>
 <strong>Col {i}</strong>
 </GridCell>
 ))}
 </GridLayout>
 
 <GridLayout columns={5} spacing="small">
 {[1, 2, 3, 4, 5].map((i) => (
 <GridCell key={i} background="grey.200" sx={{ textAlign: 'center' }}>
 <strong>{i}</strong>
 </GridCell>
 ))}
 </GridLayout>
 </Content>
 </Section>
 </div>
 ),
};

// Content Block Stories
export const Contents: StoryObj = {
 render: () => (
 <div>
 <Section spacing="spacious">
 <Content 
 title="Default Content Block" 
 centered
 maxWidth="md"
 >
 <p>This is a default content block with automatic responsive behavior and theme-aware styling.</p>
 </Content>
 </Section>

 <Section background="default">
 <Content 
 title="Elevated Content Block" 
 variant="elevated"
 spacing="spacious"
 centered
 maxWidth="md"
 >
 <p>This elevated content block has a subtle shadow and stands out from the background.</p>
 </Content>
 </Section>

 <Section spacing="spacious">
 <GridLayout columns={2} spacing="large">
 <GridCell>
 <Content 
 title="Outlined Block" 
 variant="outlined"
 spacing="spacious"
 >
 <p>This content block has a border instead of a shadow.</p>
 </Content>
 </GridCell>
 <GridCell>
 <Content 
 title="Filled Block" 
 variant="filled"
 spacing="spacious"
 >
 <p>This content block has a filled background color.</p>
 </Content>
 </GridCell>
 </GridLayout>
 </Section>
 </div>
 ),
};

// Feature Grid Stories
export const FeatureGrids: StoryObj = {
 render: () => (
 <div>
 <Section spacing="spacious">
 <Content title="Feature Grid" centered maxWidth="lg">
 <FeatureGrid
 columns={3}
 gap="large"
 features={[
 {
 id: 'responsive',
 icon: <span style={{ fontSize: '2rem' }}></span>,
 title: 'Responsive Design',
 description: 'All components automatically adapt to different screen sizes for optimal user experience.',
 action: <Button label="Learn More" buttonSize="small" onClick={() => { alert('Learn More clicked'); }} />
 },
 {
 id: 'themes',
 icon: <span style={{ fontSize: '2rem' }}></span>,
 title: 'Theme Support',
 description: 'Built-in light/dark theme support with customizable color palettes.',
 action: <Button label="Explore" buttonSize="small" onClick={() => { alert('Explore clicked'); }} />
 },
 {
 id: 'accessible',
 icon: <span style={{ fontSize: '2rem' }}>♿</span>,
 title: 'Accessibility First',
 description: 'All components follow WCAG guidelines and include proper ARIA labels.',
 action: <Button label="Details" buttonSize="small" onClick={() => { alert('Details clicked'); }} />
 },
 {
 id: 'typescript',
 icon: <span style={{ fontSize: '2rem' }}>🔷</span>,
 title: 'TypeScript Ready',
 description: 'Full TypeScript support with comprehensive type definitions.',
 action: <Button label="Documentation" buttonSize="small" onClick={() => { alert('Documentation clicked'); }} />
 },
 {
 id: 'performance',
 icon: <span style={{ fontSize: '2rem' }}></span>,
 title: 'High Performance',
 description: 'Optimized for speed with minimal bundle size and efficient rendering.',
 action: <Button label="Benchmarks" buttonSize="small" onClick={() => { alert('Benchmarks clicked'); }} />
 },
 {
 id: 'customizable',
 icon: <span style={{ fontSize: '2rem' }}>🛠</span>,
 title: 'Highly Customizable',
 description: 'Easy to customize and extend with your own design system.',
 action: <Button label="Customize" buttonSize="small" onClick={() => { alert('Customize clicked'); }} />
 },
 ]}
 />
 </Content>
 </Section>
 </div>
 ),
};

// Complete Layout Example
export const CompleteLayout: StoryObj = {
 render: () => (
 <div>
 {/* Hero Section */}
 <HeroBlock
 title="QwickApps React Framework"
 subtitle="The complete React framework for building modern applications"
 backgroundGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
 height="large"
 actions={[
 {
 label: 'Get Started',
 variant: 'primary',
 size: 'large',
 onClick: () => { alert('Get Started clicked'); }
 },
 {
 label: 'View Demo',
 variant: 'outlined',
 size: 'large',
 onClick: () => { alert('View Demo clicked'); }
 }
 ]}
 />

 {/* Features Section */}
 <Section background="alternate">
 <Content title="Why Choose QwickApps?" centered maxWidth="lg">
 <p style={{ fontSize: '1.2rem', textAlign: 'center', marginBottom: '3rem', opacity: 0.8 }}>
 Everything you need to build beautiful, responsive applications
 </p>
 <FeatureGrid
 columns={3}
 gap="large"
 features={[
 {
 id: 'components',
 icon: <span style={{ fontSize: '3rem' }}>🧩</span>,
 title: 'Rich Components',
 description: 'Comprehensive set of pre-built, customizable components for rapid development.',
 },
 {
 id: 'layouts',
 icon: <span style={{ fontSize: '3rem' }}>📐</span>,
 title: 'Flexible Layouts',
 description: 'Powerful layout blocks that adapt to any design and screen size automatically.',
 },
 {
 id: 'navigation',
 icon: <span style={{ fontSize: '3rem' }}>🧭</span>,
 title: 'Smart Navigation',
 description: 'Responsive navigation that transforms based on device: bottom nav, rail, or top nav.',
 },
 ]}
 />
 </Content>
 </Section>

 {/* Content Sections */}
 <Section spacing="spacious">
 <GridLayout columns={2} spacing="large">
 <GridCell>
 <Content title="Easy to Use" variant="elevated" spacing="spacious">
 <p>QwickApps React Framework is designed for developers who want to build great applications without spending time on boilerplate.</p>
 <ul>
 <li>Simple API design</li>
 <li>Comprehensive documentation</li>
 <li>TypeScript support</li>
 <li>Storybook examples</li>
 </ul>
 </Content>
 </GridCell>
 <GridCell>
 <Content title="Production Ready" variant="elevated" spacing="spacious">
 <p>Built with best practices and tested in real-world applications to ensure reliability and performance.</p>
 <ul>
 <li>Accessibility compliant</li>
 <li>Performance optimized</li>
 <li>Theme system</li>
 <li>Mobile-first design</li>
 </ul>
 </Content>
 </GridCell>
 </GridLayout>
 </Section>

 {/* Call to Action */}
 <Section background="primary">
 <Content 
 centered 
 maxWidth="md" 
 actions={[
 {
 label: 'Start Building',
 variant: 'secondary',
 size: 'large',
 onClick: () => { alert('Start Building clicked'); }
 },
 {
 label: 'Documentation',
 variant: 'outlined',
 size: 'large',
 onClick: () => console.log('Documentation clicked')
 }
 ]}
 >
 <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
 Ready to Get Started?
 </h2>
 <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '2rem' }}>
 Join thousands of developers building with QwickApps React Framework
 </p>
 </Content>
 </Section>
 </div>
 ),
};