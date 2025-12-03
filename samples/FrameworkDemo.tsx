/**
 * QwickApps React Framework Demo - Complete Example
 * 
 * This example demonstrates how to use the QwickApps React Framework to build
 * a complete application with responsive navigation and flexible layouts.
 */

import React from 'react';
import {
  QwickApp,
  ResponsiveMenu,
  HeroBlock,
  Section,
  Content,
  GridLayout,
  GridCell,
  FeatureGrid,
  Logo,
  type MenuItem,
} from '../src';

// Sample menu items
const menuItems: MenuItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: <span>🏠</span>,
    active: true,
    onClick: () => console.log('Navigate to Home'),
  },
  {
    id: 'features',
    label: 'Features',
    icon: <span>✨</span>,
    onClick: () => console.log('Navigate to Features'),
  },
  {
    id: 'pricing',
    label: 'Pricing',
    icon: <span>💰</span>,
    onClick: () => console.log('Navigate to Pricing'),
    badge: 'New',
  },
  {
    id: 'docs',
    label: 'Documentation',
    icon: <span>📚</span>,
    onClick: () => console.log('Navigate to Docs'),
  },
  {
    id: 'support',
    label: 'Support',
    icon: <span>💬</span>,
    onClick: () => console.log('Navigate to Support'),
    badge: '3',
  },
  {
    id: 'about',
    label: 'About',
    icon: <span>ℹ️</span>,
    onClick: () => console.log('Navigate to About'),
  },
];

// Custom logo example
const CustomLogo: React.FC = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem',
    background: 'linear-gradient(45deg, #667eea, #764ba2)',
    color: 'white',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '1.1rem',
  }}>
    <span style={{ fontSize: '1.5rem' }}>🚀</span>
    MyApp
  </div>
);

export const FrameworkDemo: React.FC = () => {
  return (
    <QwickApp 
      appName="MyApp"
      appId="com.mycompany.myapp"
      // logo={<CustomLogo />} // Use custom logo
      defaultTheme="system"
      defaultPalette="ocean"
    >
      {/* Responsive Navigation */}
      <ResponsiveMenu 
        items={menuItems}
        logoPosition="left"
        onMenuToggle={(isOpen) => console.log('Menu toggled:', isOpen)}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroBlock
          title="Welcome to MyApp"
          subtitle="Build amazing applications with the QwickApps React Framework"
          backgroundGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          height="large"
          actions={
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button style={{
                padding: '1rem 2rem',
                background: 'white',
                color: '#667eea',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                cursor: 'pointer',
              }}>
                Get Started
              </button>
              <button style={{
                padding: '1rem 2rem',
                background: 'transparent',
                color: 'white',
                border: '2px solid white',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                cursor: 'pointer',
              }}>
                Learn More
              </button>
            </div>
          }
        />

        {/* Features Section */}
        <Section padding="extra-large" background="alternate">
          <Content title="Key Features" centered maxWidth="large">
            <FeatureGrid
              columns={3}
              gap="large"
              features={[
                {
                  id: 'responsive',
                  icon: <span style={{ fontSize: '3rem' }}>📱</span>,
                  title: 'Responsive Design',
                  description: 'Automatically adapts to any screen size with our intelligent responsive components.',
                  action: (
                    <button style={{
                      padding: '0.5rem 1rem',
                      background: 'var(--theme-primary)',
                      color: 'var(--theme-on-primary)',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                    }}>
                      Learn More
                    </button>
                  ),
                },
                {
                  id: 'themes',
                  icon: <span style={{ fontSize: '3rem' }}>🎨</span>,
                  title: 'Theme System',
                  description: 'Built-in light/dark themes with customizable color palettes.',
                  action: (
                    <button style={{
                      padding: '0.5rem 1rem',
                      background: 'var(--theme-primary)',
                      color: 'var(--theme-on-primary)',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                    }}>
                      Explore
                    </button>
                  ),
                },
                {
                  id: 'navigation',
                  icon: <span style={{ fontSize: '3rem' }}>🧭</span>,
                  title: 'Smart Navigation',
                  description: 'Context-aware navigation that changes based on screen size and device.',
                  action: (
                    <button style={{
                      padding: '0.5rem 1rem',
                      background: 'var(--theme-primary)',
                      color: 'var(--theme-on-primary)',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                    }}>
                      See Demo
                    </button>
                  ),
                },
              ]}
            />
          </Content>
        </Section>

        {/* Content Sections */}
        <Section padding="extra-large">
          <GridLayout columns={2}>
            <GridCell>
              <Content title="Easy Integration" variant="elevated" padding="large">
                <p>
                  QwickApps React Framework is designed to integrate seamlessly with your existing React application.
                  Simply wrap your app with the QwickApp component and start using our components.
                </p>
                <pre style={{
                  background: 'var(--theme-surface-variant)',
                  padding: '1rem',
                  borderRadius: '8px',
                  overflow: 'auto',
                  fontSize: '0.9rem',
                }}>
                  {`<QwickApp appName="MyApp">
  <ResponsiveMenu items={menuItems} />
  <YourContent />
</QwickApp>`}
                </pre>
              </Content>
            </GridCell>
            
            <GridCell>
              <Content title="Flexible Layouts" variant="elevated" padding="large">
                <p>
                  Create beautiful, responsive layouts with our pre-built layout blocks.
                  Mix and match components to create unique designs.
                </p>
                <ul style={{ marginLeft: '1rem' }}>
                  <li>Hero blocks for landing pages</li>
                  <li>Multi-column responsive layouts</li>
                  <li>Feature grids and content blocks</li>
                  <li>Customizable sections and containers</li>
                </ul>
              </Content>
            </GridCell>
          </GridLayout>
        </Section>

        {/* Demo Section */}
        <Section padding="large" background="surface">
          <Content title="Try It Out" centered maxWidth="medium">
            <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
              Resize your browser window to see the responsive navigation in action:
            </p>
            <div style={{
              background: 'var(--theme-background)',
              border: '2px solid var(--theme-outline)',
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center',
            }}>
              <h3>Responsive Breakpoints</h3>
              <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
                <div>
                  <strong>Mobile</strong><br />
                  <small>&lt; 768px</small><br />
                  <span style={{ fontSize: '2rem' }}>📱</span>
                </div>
                <div>
                  <strong>Tablet</strong><br />
                  <small>768px - 1024px</small><br />
                  <span style={{ fontSize: '2rem' }}>📟</span>
                </div>
                <div>
                  <strong>Desktop</strong><br />
                  <small>&gt; 1024px</small><br />
                  <span style={{ fontSize: '2rem' }}>🖥️</span>
                </div>
              </div>
            </div>
          </Content>
        </Section>

        {/* Call to Action */}
        <Section padding="large" background="primary">
          <Content centered maxWidth="medium" style={{ textAlign: 'center' }}>
            <h2 style={{
              color: 'var(--theme-on-primary)',
              fontSize: '2.5rem',
              marginBottom: '1rem',
            }}>
              Ready to Build?
            </h2>
            <p style={{
              color: 'var(--theme-on-primary)',
              fontSize: '1.2rem',
              opacity: 0.9,
              marginBottom: '2rem',
            }}>
              Start creating beautiful applications with QwickApps React Framework today.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button style={{
                padding: '1rem 2rem',
                background: 'var(--theme-on-primary)',
                color: 'var(--theme-primary)',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                cursor: 'pointer',
              }}>
                Get Started
              </button>
              <button style={{
                padding: '1rem 2rem',
                background: 'transparent',
                color: 'var(--theme-on-primary)',
                border: '2px solid var(--theme-on-primary)',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                cursor: 'pointer',
              }}>
                View Docs
              </button>
            </div>
          </Content>
        </Section>
      </main>
    </QwickApp>
  );
};

export default FrameworkDemo;