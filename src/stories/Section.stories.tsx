/**
 * Section Component Stories - Layout containers with data binding support
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Alert, Box, Paper, Typography } from '@mui/material';
import { JsonDataProvider } from '@qwickapps/schema';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import QwickApp from '../components/QwickApp';
import { ModelView } from '../components/base/ModelView';
import { Code } from '../components/blocks';
import Section from '../components/blocks/Section';
import { makeSerializationStory } from './_templates/SerializationTemplate';

// Sample CMS data for data binding stories
const sampleCmsData = {
  'pages.home.intro-section': [
    {
      background: 'var(--theme-primary)',
      color: 'var(--theme-on-primary)',
      padding: 'large',
      contentMaxWidth: 'lg',
      component: 'section'
    }
  ],
  'content.feature-section': [
    {
      background: '#f8f9fa',
      color: '#212529',
      padding: 'medium',
      contentMaxWidth: 'xl',
      component: 'article'
    }
  ],
  'layouts.hero-section': [
    {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#ffffff',
      padding: 'extra-large',
      contentMaxWidth: 'false',
      component: 'main'
    }
  ],
  'layouts.minimal-section': [
    {
      background: '#ffffff',
      color: '#333333',
      padding: 'none',
      contentMaxWidth: 'md',
      component: 'div'
    }
  ],
  'marketing.cta-section': [
    {
      background: '#e3f2fd',
      color: '#1565c0',
      padding: 'large',
      contentMaxWidth: 'lg',
      component: 'section'
    }
  ],
  'company.about-section': [
    {
      background: 'var(--theme-secondary)',
      color: 'var(--theme-on-secondary)',
      padding: 'medium',
      contentMaxWidth: 'md',
      component: 'section'
    }
  ]
};

const dataProvider = new JsonDataProvider({ data: sampleCmsData });

const meta = {
  title: 'Components/Section',
  component: Section,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Section is a foundational layout container component that supports both traditional props and data binding through dataSource.

**Key Features:**
- **Theme-Aware Backgrounds**: Support for CSS colors, gradients, and theme variables
- **Responsive Spacing**: Six padding presets from none to extra-large
- **Container Control**: Customizable max width with responsive breakpoints
- **Semantic HTML**: Choose appropriate HTML elements (section, article, main, div)
- **Data Binding**: Full CMS integration through dataSource prop
- **Grid Integration**: Works with QwickApps grid system

**Perfect For:**
- Page section containers and layout organization
- Content areas with consistent spacing and styling
- Theme-based background and text color management
- Responsive content width control
- Semantic HTML structure for accessibility`,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

// Traditional Usage Examples
export const BasicSection: Story = {
  render: () => (
    <QwickApp appId="section-basic" appName='Basic Section'>
      <Section
        background="#f5f5f5"
        color="#333333"
        padding="medium"
        contentMaxWidth="lg"
        component="section"
      >
        <Typography variant="h4" gutterBottom>
          Basic Section Container
        </Typography>
        <Typography variant="body1">
          This is a basic section with custom background color, standard padding, and responsive content width.
        </Typography>
      </Section>
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic Section with traditional props - background color, padding, and content width control.',
      },
    },
  },
};

export const PaddingVariants: Story = {
  render: () => (
    <QwickApp appId="section-padding" appName='Section Padding Variants'>
      <Box>
        
        <Section background="#e3f2fd" padding="none" contentMaxWidth="lg">
          <Typography variant="h6">No Padding Section</Typography>
          <Typography variant="body2">Compact section with no vertical spacing (0px)</Typography>
        </Section>
        
        <Section background="#f3e5f5" padding="tiny" contentMaxWidth="lg">
          <Typography variant="h6">Tiny Padding Section</Typography>
          <Typography variant="body2">Minimal spacing section (8px vertical)</Typography>
        </Section>
        
        <Section background="#e8f5e8" padding="small" contentMaxWidth="lg">
          <Typography variant="h6">Small Padding Section</Typography>
          <Typography variant="body2">Small spacing section (16px vertical)</Typography>
        </Section>
        
        <Section background="#fff3e0" padding="medium" contentMaxWidth="lg">
          <Typography variant="h6">Medium Padding Section (Default)</Typography>
          <Typography variant="body2">Standard spacing section (32px vertical)</Typography>
        </Section>
        
        <Section background="#fce4ec" padding="large" contentMaxWidth="lg">
          <Typography variant="h6">Large Padding Section</Typography>
          <Typography variant="body2">Generous spacing section (64px vertical)</Typography>
        </Section>
        
        <Section background="#e0f2f1" padding="extra-large" contentMaxWidth="lg">
          <Typography variant="h6">Extra Large Padding Section</Typography>
          <Typography variant="body2">Maximum spacing section (96px vertical)</Typography>
        </Section>
        
      </Box>
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available padding variants: none (0px), tiny (8px), small (16px), medium (32px), large (64px), extra-large (96px).',
      },
    },
  },
};

export const ContentWidthVariants: Story = {
  render: () => (
    <QwickApp appId="section-widths" appName='Section Content Width Variants'>
      <Box>
        
        <Section background="#f5f5f5" padding="medium" contentMaxWidth="xs">
          <Typography variant="h6" gutterBottom>XS Max Width</Typography>
          <Typography variant="body2">Extra small container width (444px max)</Typography>
        </Section>
        
        <Section background="#e3f2fd" padding="medium" contentMaxWidth="sm">
          <Typography variant="h6" gutterBottom>SM Max Width</Typography>
          <Typography variant="body2">Small container width (600px max)</Typography>
        </Section>
        
        <Section background="#f3e5f5" padding="medium" contentMaxWidth="md">
          <Typography variant="h6" gutterBottom>MD Max Width</Typography>
          <Typography variant="body2">Medium container width (900px max)</Typography>
        </Section>
        
        <Section background="#e8f5e8" padding="medium" contentMaxWidth="lg">
          <Typography variant="h6" gutterBottom>LG Max Width (Default)</Typography>
          <Typography variant="body2">Large container width (1200px max)</Typography>
        </Section>
        
        <Section background="#fff3e0" padding="medium" contentMaxWidth="xl">
          <Typography variant="h6" gutterBottom>XL Max Width</Typography>
          <Typography variant="body2">Extra large container width (1536px max)</Typography>
        </Section>
        
        <Section background="#fce4ec" padding="medium" contentMaxWidth={undefined}>
          <Typography variant="h6" gutterBottom>Full Width (No Max Width)</Typography>
          <Typography variant="body2">Full width container with no maximum width constraint</Typography>
        </Section>
        
      </Box>
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Content width options: xs, sm, md, lg (default), xl, and false for full width.',
      },
    },
  },
};

export const SemanticElements: Story = {
  render: () => (
    <QwickApp appId="section-semantic" appName='Section Semantic Elements'>
      <Box>
        
        <Section background="#e3f2fd" padding="medium" component="main">
          <Typography variant="h5" gutterBottom>Main Element</Typography>
          <Typography variant="body1">
            Use &lt;main&gt; for the primary content area of the page
          </Typography>
        </Section>
        
        <Section background="#f3e5f5" padding="medium" component="section">
          <Typography variant="h5" gutterBottom>Section Element (Default)</Typography>
          <Typography variant="body1">
            Use &lt;section&gt; for thematic groupings of content
          </Typography>
        </Section>
        
        <Section background="#e8f5e8" padding="medium" component="article">
          <Typography variant="h5" gutterBottom>Article Element</Typography>
          <Typography variant="body1">
            Use &lt;article&gt; for standalone, reusable content
          </Typography>
        </Section>
        
        <Section background="#fff3e0" padding="medium" component="div">
          <Typography variant="h5" gutterBottom>Div Element</Typography>
          <Typography variant="body1">
            Use &lt;div&gt; for non-semantic containers and styling
          </Typography>
        </Section>
        
      </Box>
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Semantic HTML elements: main, section (default), article, and div for appropriate content structure.',
      },
    },
  },
};

// Data Binding Examples
export const DataBindingBasic: Story = {
  render: () => (
    <QwickApp appId="section-data-binding" appName='Section Data Binding' dataSource={{ dataProvider }}>
      <Box>
        
        <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
          <Typography variant="h5" gutterBottom>📊 Data-Driven Section</Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
            Section components can be driven entirely by CMS data using the dataSource prop.
          </Typography>
          
          <Code title="Usage" language="tsx">{`<Section dataSource="pages.home.intro-section">
  <YourContent />
</Section>`}</Code>
          
          <Code title="Data Structure" language="json">{JSON.stringify(sampleCmsData['pages.home.intro-section'][0], null, 2)}</Code>
        </Box>

        <Section dataSource="pages.home.intro-section">
          <Typography variant="h4" gutterBottom>
            Welcome to QwickApps React Framework
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            This section is entirely configured through CMS data with primary theme background,
            large padding, and responsive content width.
          </Typography>
        </Section>
        
      </Box>
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Section with data binding - all styling resolved from CMS data through dataSource.',
      },
    },
  },
};

export const DataBindingAdvanced: Story = {
  render: () => (
    <QwickApp appId="section-data-advanced" appName='Advanced Section Data Binding' dataSource={{ dataProvider }}>
      <Box>
        
        <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
          <Typography variant="h5" gutterBottom>🎯 Multiple Data Sources</Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
            Different Section components can pull from different data sources with varying configurations.
          </Typography>
          
          <Code title="Multiple Data Sources" language="tsx">{`{/* Hero with gradient background */}
<Section dataSource="layouts.hero-section">
  <HeroContent />
</Section>

{/* Feature section with light background */}
<Section dataSource="content.feature-section">
  <FeatureContent />
</Section>

{/* Minimal section with no padding */}
<Section dataSource="layouts.minimal-section">
  <CompactContent />
</Section>`}</Code>
        </Box>

        {/* Hero Section */}
        <Section dataSource="layouts.hero-section">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Revolutionary Framework
            </Typography>
            <Typography variant="h5" sx={{ opacity: 0.9, maxWidth: '600px', mx: 'auto' }}>
              Full-width gradient background with extra-large padding and dramatic typography
            </Typography>
          </Box>
        </Section>
        
        {/* Feature Section */}
        <Section dataSource="content.feature-section">
          <Typography variant="h4" gutterBottom>
            Feature Highlights
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
            This article section uses a light background with extended content width,
            perfect for detailed feature descriptions and technical content.
          </Typography>
        </Section>
        
        {/* Minimal Section */}
        <Section dataSource="layouts.minimal-section">
          <Typography variant="h6" gutterBottom>
            Minimal Design Section
          </Typography>
          <Typography variant="body2">
            Clean, no-padding section with medium content width for compact layouts
          </Typography>
        </Section>
        
      </Box>
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Advanced data binding with multiple data sources showcasing different section configurations.',
      },
    },
  },
};

export const DataBindingWithFallback: Story = {
  render: () => (
    <QwickApp appId="section-fallback" appName='Section Data Binding with Fallback' dataSource={{ dataProvider }}>
      <Box>
        
        <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
          <Typography variant="h5" gutterBottom>🛡️ Fallback Support</Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
            Section components gracefully handle missing data sources with fallback props.
          </Typography>
          
          <Code title="Fallback Usage" language="tsx">{`<Section 
  dataSource="nonexistent.section" 
  background="#f9f9f9"
  padding="small"
  contentMaxWidth="md"
>
  <FallbackContent />
</Section>`}</Code>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
          <Box>
            <Typography variant="h6" gutterBottom>Missing Data Source (Fallback)</Typography>
            <Section 
              dataSource="nonexistent.section"
              background="#f9f9f9"
              color="#333333"
              padding="small"
              contentMaxWidth="md"
              component="section"
            >
              <Typography variant="h6" gutterBottom>
                Fallback Section Content
              </Typography>
              <Typography variant="body2">
                This section uses fallback props when the dataSource doesn't exist.
              </Typography>
            </Section>
          </Box>
          <Box>
            <Typography variant="h6" gutterBottom>Valid Data Source</Typography>
            <Section dataSource="marketing.cta-section">
              <Typography variant="h6" gutterBottom>
                CTA Section from Data
              </Typography>
              <Typography variant="body2">
                This section loads successfully from the CMS data source.
              </Typography>
            </Section>
          </Box>
        </Box>
        
      </Box>
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Section with fallback props when dataSource is missing or unavailable.',
      },
    },
  },
};

export const ThemeIntegration: Story = {
  render: () => (
    <QwickApp appId="section-theme" appName='Section Theme Integration'>
      <Box>
        
        <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
          <Typography variant="h5" gutterBottom>🎨 Theme Integration</Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
            Sections support both CSS colors and theme variables for consistent branding.
          </Typography>
        </Box>

        <Section background="var(--theme-primary)" color="var(--theme-on-primary)" padding="large">
          <Typography variant="h4" gutterBottom>
            Primary Theme Section
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Using theme variables ensures consistency with your application's color system
          </Typography>
        </Section>
        
        <Section background="var(--theme-secondary)" color="var(--theme-on-secondary)" padding="large">
          <Typography variant="h4" gutterBottom>
            Secondary Theme Section
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Secondary theme colors work perfectly for supporting content areas
          </Typography>
        </Section>
        
        <Section background="#2c3e50" color="#ecf0f1" padding="large">
          <Typography variant="h4" gutterBottom>
            Custom Color Section
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Direct CSS colors provide full customization when needed
          </Typography>
        </Section>
        
      </Box>
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Theme integration examples showing theme variables and custom CSS colors.',
      },
    },
  },
};

export const RealWorldExample: Story = {
  render: () => (
    <QwickApp appId="section-real-world" appName='Real World Section Example' dataSource={{ dataProvider }}>
      <Box>
        
        {/* Hero Section - Data Driven */}
        <Section dataSource="layouts.hero-section">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h1" gutterBottom sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 'bold',
              mb: 3
            }}>
              Build Apps 10x Faster
            </Typography>
            <Typography variant="h5" sx={{ 
              opacity: 0.9, 
              maxWidth: '700px', 
              mx: 'auto',
              lineHeight: 1.4
            }}>
              The most developer-friendly React framework that turns complex UI development into pure joy
            </Typography>
          </Box>
        </Section>
        
        {/* Feature Section - Data Driven */}
        <Section dataSource="content.feature-section">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 4 }}>
            <Box>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                ⚡ Lightning Fast
              </Typography>
              <Typography variant="body1">
                Optimized build system and runtime performance for instant user experiences
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                🎨 Beautiful UI
              </Typography>
              <Typography variant="body1">
                Professional components and layouts that work perfectly out of the box
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                📱 Mobile First
              </Typography>
              <Typography variant="body1">
                Responsive design principles built into every component and layout
              </Typography>
            </Box>
          </Box>
        </Section>
        
        {/* CTA Section - Traditional Props */}
        <Section
          background="linear-gradient(45deg, #2196F3, #21CBF3)"
          color="#ffffff"
          padding="large"
          contentMaxWidth="md"
          component="section"
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
              Ready to Get Started?
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>
              Join thousands of developers building amazing applications
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Typography 
                component="div"
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  backgroundColor: 'rgba(255,255,255,0.2)', 
                  borderRadius: 2,
                  fontWeight: 'bold'
                }}
              >
                Get Started Free
              </Typography>
              <Typography 
                component="div"
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  border: '2px solid rgba(255,255,255,0.5)', 
                  borderRadius: 2,
                  fontWeight: 'bold'
                }}
              >
                View Documentation
              </Typography>
            </Box>
          </Box>
        </Section>
        
      </Box>
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world example combining data-driven Sections with traditional usage for complete page layouts.',
      },
    },
  },
};

// ModelView Serialization Examples
export const ModelViewBasic: Story = {
  render: () => {
    // Demonstrate that Section extends ModelView
    const sectionInstance = new Section({
      background: '#f0f8ff',
      padding: 'medium',
      contentMaxWidth: 'lg',
      component: 'section',
      children: React.createElement('div', {}, 'Section content')
    });

    // Show ModelView metadata
    const ComponentClass = sectionInstance.constructor as { tagName?: string; version?: string };
    const metadata = {
      tagName: ComponentClass.tagName,
      version: ComponentClass.version,
      isModelView: sectionInstance instanceof ModelView,
      supportsNestedComponents: true,
      hasToJson: typeof sectionInstance.toJson === 'function'
    };

    return (
      <QwickApp appId="section-modelview-basic" appName='Section ModelView Integration'>
        <Box>
          
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant="h3" gutterBottom>Section Component ModelView Integration</Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.7 }}>
              Section now extends the ModelView base class for standardized serialization
            </Typography>
            
            <Alert severity="success" sx={{ mb: 4, textAlign: 'left' }}>
              Section component now extends ModelView base class, providing standardized serialization
              and data binding support. Section supports nested components through specialized serialization.
            </Alert>
          </Box>
          
          {/* ModelView Metadata */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" gutterBottom>🏗️ ModelView Metadata</Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
              Section component inherits ModelView capabilities and metadata
            </Typography>
            <Paper sx={{ p: 2, backgroundColor: 'grey.100', overflow: 'auto' }}>
              <Code language="json" showLineNumbers={true} title="section-modelview-metadata.json">
                {JSON.stringify(metadata, null, 2)}
              </Code>
            </Paper>
          </Box>
          
          {/* Rendered Component */}
          <Box>
            <Typography variant="h4" gutterBottom>📦 Section Component (extends ModelView)</Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
              The rendered Section component with full ModelView functionality
            </Typography>
            <Section 
              background="#f0f8ff"
              padding="medium"
              contentMaxWidth="lg"
            >
              <Typography variant="h5" gutterBottom>
                ModelView Section Container
              </Typography>
              <Typography variant="body1">
                This section extends ModelView base class, providing standardized serialization patterns
                for layout containers with nested component support.
              </Typography>
            </Section>
          </Box>
          
        </Box>
      </QwickApp>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates Section component extending ModelView base class with nested component serialization.',
      },
    },
  },
};

/**
 * SerializationDemo - Demonstrates section component serialization
 */
export const SerializationDemo: StoryObj<typeof Section> = {
  render: makeSerializationStory(() => (
    <Section 
      background="primary.light"
      padding="large"
      contentMaxWidth="md"
      component="section"
    >
      <Typography variant="h4" component="h2" gutterBottom>
        Section Serialization Demo
      </Typography>
      <Typography variant="body1" paragraph>
        This section demonstrates how container components serialize their children
        while maintaining proper semantic HTML structure.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Content max width: md • Padding: large • Component: section
        </Typography>
      </Box>
    </Section>
  )),
  parameters: {
    docs: {
      description: {
        story: 'Shows how Section components are serialized with their nested children and semantic HTML structure preserved.',
      },
    },
  },
};
