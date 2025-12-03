/**
 * Data Binding System - Storybook Stories
 * 
 * Demonstrates the AI-driven data-binding component system that enables
 * components to be configured through CMS data rather than hardcoded props.
 * 
 * This is the foundation for AI agents to automatically generate both
 * content and presentation for web applications.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Card, Typography } from '@mui/material';
import { JsonDataProvider } from '@qwickapps/schema';
import type { Meta, StoryObj } from '@storybook/react';
import { Code, GridLayout, SafeSpan, Section } from '../components';
import { DataProvider } from '../contexts';

// Sample CMS data for demonstrations - using dotted notation for testing JsonDataProvider conversion
const sampleCmsData = {
  // Company information
  'company.tagline': {
    html: '<h1>Build Apps <em>Faster</em> with <strong>QwickApps</strong></h1>',
    placeholder: 'Loading company tagline...'
  },
  'company.description': {
    html: '<p>QwickApps React Framework provides a comprehensive set of tools and components to help developers create high-quality applications with <strong>minimal effort</strong> and <em>maximum efficiency</em>.</p>',
    placeholder: 'Loading company description...'
  },

  // Page content
  'pages.home.hero-subtitle': {
    html: '<p class="subtitle">The complete solution for modern web development</p>',
    placeholder: 'Loading hero subtitle...'
  },
  'pages.about.mission': {
    html: '<p>Our mission is to <strong>empower developers</strong> with tools that make app development accessible, efficient, and enjoyable.</p>',
    placeholder: 'Loading mission statement...'
  },

  // Feature descriptions
  'features.responsive-design': {
    html: '<p>Built-in responsive design patterns that work seamlessly across all devices and screen sizes.</p>',
    placeholder: 'Loading responsive features...'
  },
  'features.performance': {
    html: '<p>Optimized rendering and caching strategies ensure your applications run fast and efficiently at scale.</p>',
    placeholder: 'Loading performance features...'
  },

  // Marketing content
  'marketing.cta': {
    html: '<p><strong>Get started today</strong> and experience the future of app development!</p>',
    placeholder: 'Loading call-to-action...'
  },

  // User testimonials
  'testimonials.developer': {
    html: '<blockquote><p>"QwickApps has <em>revolutionized</em> our development workflow. We ship features <strong>3x faster</strong> now."</p><cite>- Sarah Chen, Senior Developer</cite></blockquote>',
    placeholder: 'Loading testimonial...'
  },

  // Empty content for fallback testing
  'empty.content': {},

  // Content with only placeholder
  'placeholder.only': {
    placeholder: 'This content is coming soon...'
  }
};

// Create data provider
const dataProvider = new JsonDataProvider({ data: sampleCmsData });

const meta: Meta<typeof SafeSpan> = {
  title: 'Framework/Data Binding',
  component: SafeSpan,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Data Binding System

The QwickApps Data Binding System enables dynamic component configuration through CMS data.
Instead of hardcoding props, components can resolve their content from data sources with
automatic validation and type safety.

## Key Concepts

**Traditional Approach:**
\`\`\`jsx
<SafeSpan html="<p>Hardcoded content</p>" placeholder="Hardcoded placeholder" />
\`\`\`

**Data-Driven Approach:**
\`\`\`jsx
<SafeSpan dataSource="company.description" />
\`\`\`

## Component Schema

Each data-driven component has a schema that defines:
- Field types (using ContentTypes.FieldType enum)
- Validation rules
- Content editor instructions
- Usage examples

## Data Source Syntax

Data sources use dot notation to reference nested data:
- \`company.tagline\` - Company tagline content
- \`pages.home.hero-block\` - Home page hero block
- \`features.responsive-design\` - Feature descriptions

## Benefits

The data binding system provides:
1. Clear separation between content and presentation
2. Runtime validation of content data
3. Flexible fallback mechanisms
4. Type-safe component configuration
5. Consistent CMS integration patterns
        `
      }
    }
  },
  decorators: [
    (Story) => (
      <DataProvider dataSource={{ dataProvider }}>
        <Story />
      </DataProvider>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const CompanyTagline: Story = {
  render: () => (
    <Section>
      <Typography variant="h4">Company Tagline</Typography>
      <Typography variant="body1" gutterBottom>
        Company tagline loaded from CMS data with rich HTML formatting.
      </Typography>
      <Card variant="outlined" style={{ padding: '1rem', marginBottom: '1rem', backgroundColor: '#f8f9fa' }}>
        <SafeSpan dataSource="company.tagline" />
      </Card>
      <Code title="Usage">{`<SafeSpan dataSource="company.tagline" />`}</Code>
      <Code title="CMS Data">{`'company.tagline': [
  {
    html: '<h1>Build Apps <em>Faster</em> with <strong>QwickApps</strong></h1>',
    placeholder: 'Loading company tagline...'
  }
]`}</Code>
    </Section>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Company tagline loaded from CMS data with rich HTML formatting.'
      }
    }
  }
};

export const CompanyDescription: Story = {
  render: () => (
    <Section>
      <Typography variant="h4">Company Description</Typography>
      <Typography variant="body1" gutterBottom>
        Detailed company description with emphasis and strong text formatting.
      </Typography>
      <Card variant="outlined" style={{ padding: '1rem', marginBottom: '1rem', backgroundColor: '#f8f9fa' }}>
        <SafeSpan dataSource="company.description" />
      </Card>
      <Code title="Usage">{`<SafeSpan dataSource="company.description" />`}</Code>
      <Code title="CMS Data">{`'company.description': [
  {
    html: '<p>QwickApps React Framework provides comprehensive tools with <strong>minimal effort</strong> and <em>maximum efficiency</em>.</p>',
    placeholder: 'Loading company description...'
  }
]`}</Code>
    </Section>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Detailed company description with emphasis and strong text formatting.'
      }
    }
  }
};

export const HeroSubtitle: Story = {
  render: () => (
    <Section>
      <Typography variant="h4">Hero Subtitle</Typography>
      <Typography variant="body1" gutterBottom>
        Page-specific content with custom CSS classes from CMS.
      </Typography>
      <Card variant="outlined" style={{ padding: '1rem', marginBottom: '1rem', backgroundColor: '#f8f9fa' }}>
        <SafeSpan dataSource="pages.home.hero-subtitle" />
      </Card>
      <Code title="Usage">{`<SafeSpan dataSource="pages.home.hero-subtitle" />`}</Code>
      <Code title="CMS Data">{`'pages.home.hero-subtitle': [
  {
    html: '<p class="subtitle">The complete solution for modern web development</p>',
    placeholder: 'Loading hero subtitle...'
  }
]`}</Code>
    </Section>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Page-specific content with custom CSS classes from CMS.'
      }
    }
  }
};

// Comparison Stories
export const TraditionalVsDataDriven: Story = {
  render: () => (
    <Section>
      <Typography variant="h4">Traditional vs Data-Driven Approach</Typography>
      <Typography variant="body1" gutterBottom>
        Side-by-side comparison showing traditional hardcoded props vs data-driven approach.
      </Typography>
      
      <GridLayout columns={2} spacing="large">
        <div>
          <Typography variant="h6">Traditional Approach (Hardcoded Props)</Typography>
          <Card variant="outlined" style={{ padding: '1rem', marginBottom: '1rem', backgroundColor: '#fff3cd' }}>
            <SafeSpan
              html="<p>This content is <strong>hardcoded</strong> in the component props.</p>"
              placeholder="Hardcoded placeholder"
            />
          </Card>
        </div>

        <div>
          <Typography variant="h6">Data-Driven Approach (CMS Data)</Typography>
          <Card variant="outlined" style={{ padding: '1rem', marginBottom: '1rem', backgroundColor: '#d4edda' }}>
            <SafeSpan dataSource="features.responsive-design" />
          </Card>
        </div>
      </GridLayout>

      <Code title="Traditional Approach">{`<SafeSpan 
  html="<p>This content is <strong>hardcoded</strong>...</p>"
  placeholder="Hardcoded placeholder"
/>`}</Code>

      <Code title="Data-Driven Approach">{`<SafeSpan dataSource="features.responsive-design" />`}</Code>
    </Section>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison showing traditional hardcoded props vs data-driven approach.'
      }
    }
  }
};

// Fallback and Error Handling
export const FallbackBehavior: Story = {
  render: () => (
    <Section>
      <Typography variant="h4">Fallback and Error Handling</Typography>
      <Typography variant="body1" gutterBottom>
        Demonstrates how the system handles missing, empty, or invalid data sources.
      </Typography>

      <GridLayout spacing="large">
        <div>
          <Typography variant="h6">Empty Content (Uses Fallback Props)</Typography>
          <Card variant="outlined" style={{ padding: '1rem', marginBottom: '1rem', backgroundColor: '#f8f9fa' }}>
            <SafeSpan
              dataSource="empty.content"
              html="<p>This is <strong>fallback content</strong> when CMS data is empty.</p>"
              placeholder="Fallback placeholder"
            />
          </Card>
        </div>

        <div>
          <Typography variant="h6">Placeholder Only Content</Typography>
          <Card variant="outlined" style={{ padding: '1rem', marginBottom: '1rem', backgroundColor: '#f8f9fa' }}>
            <SafeSpan dataSource="placeholder.only" />
          </Card>
        </div>

        <div>
          <Typography variant="h6">Non-existent Data Source</Typography>
          <Card variant="outlined" style={{ padding: '1rem', marginBottom: '1rem', backgroundColor: '#f8f9fa' }}>
            <SafeSpan
              dataSource="nonexistent.data"
              placeholder="This placeholder shows when data source doesn't exist"
            />
          </Card>
        </div>
      </GridLayout>

      <Code title="Fallback with Props">{`<SafeSpan
  dataSource="empty.content"
  html="<p>This is <strong>fallback content</strong> when CMS data is empty.</p>"
  placeholder="Fallback placeholder"
/>`}</Code>

      <Code title="Placeholder Only">{`<SafeSpan dataSource="placeholder.only" />`}</Code>

      <Code title="Non-existent Data Source">{`<SafeSpan
  dataSource="nonexistent.data"
  placeholder="This placeholder shows when data source doesn't exist"
/>`}</Code>
    </Section>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how the system handles missing, empty, or invalid data sources.'
      }
    }
  }
};

// Real-world Use Cases
export const MarketingContent: Story = {
  render: () => (
    <Section>
      <Typography variant="h4">Marketing Content</Typography>
      <Typography variant="body1" gutterBottom>
        Marketing content including call-to-action and user testimonials.
      </Typography>

      <GridLayout spacing="large">
        <Card variant="outlined" style={{ padding: '1rem', backgroundColor: '#f8f9fa' }}>
          <SafeSpan dataSource="marketing.cta" />
        </Card>
        <Card variant="outlined" style={{ padding: '1rem', backgroundColor: '#f8f9fa' }}>
          <SafeSpan dataSource="testimonials.developer" />
        </Card>
      </GridLayout>

      <Code title="Call to Action">{`<SafeSpan dataSource="marketing.cta" />`}</Code>
      <Code title="User Testimonial">{`<SafeSpan dataSource="testimonials.developer" />`}</Code>
    </Section>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Marketing content including call-to-action and user testimonials.'
      }
    }
  }
};

export const FeatureDescriptions: Story = {
  render: () => (
    <Section>
      <Typography variant="h4">Feature Descriptions</Typography>
      <Typography variant="body1" gutterBottom>
        Feature descriptions loaded from CMS, perfect for product pages.
      </Typography>

      <GridLayout spacing="large">
        <div>
          <Typography variant="h6">Responsive Design</Typography>
          <Card variant="outlined" style={{ padding: '1rem', backgroundColor: '#f8f9fa' }}>
            <SafeSpan dataSource="features.responsive-design" />
          </Card>
        </div>

        <div>
          <Typography variant="h6">Performance Optimization</Typography>
          <Card variant="outlined" style={{ padding: '1rem', backgroundColor: '#f8f9fa' }}>
            <SafeSpan dataSource="features.performance" />
          </Card>
        </div>
      </GridLayout>

      <Code title="Responsive Design Features">{`<SafeSpan dataSource="features.responsive-design" />`}</Code>
      <Code title="Performance Features">{`<SafeSpan dataSource="features.performance" />`}</Code>
    </Section>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Feature descriptions loaded from CMS, perfect for product pages.'
      }
    }
  }
};

// Schema Information
export const ComponentSchemaInfo: Story = {
  render: () => (
    <Section>
      <Typography variant="h4">Component Schema System</Typography>
      <Typography variant="body1" gutterBottom>
        Component schemas define data structure requirements for data-driven components with validation and type safety.
      </Typography>

      <Card variant="outlined" style={{ padding: '1rem', marginBottom: '1rem', backgroundColor: '#f8f9fa' }}>
        <Typography variant="h6" gutterBottom>Schema Benefits:</Typography>
        <ul>
          <li><strong>Field Types:</strong> Defines whether content should be text, textarea, etc.</li>
          <li><strong>Validation:</strong> Ensures content meets component requirements</li>
          <li><strong>Editor Instructions:</strong> Guides content editors with context</li>
          <li><strong>Usage Examples:</strong> Shows proper dataSource syntax</li>
          <li><strong>Type Safety:</strong> Runtime validation of CMS data</li>
        </ul>
      </Card>

      <Code title="SafeSpan Component Schema" language="json">
        {JSON.stringify(undefined, null, 2)}
      </Code>

      <Code title="Schema Usage in Component">{`import { toDataSchema, createFieldMapping } from '../utils/toDataSchema';

const schema = toDataSchema<SafeSpanProps>({
  componentName: 'SafeSpan',
  description: 'Safely renders HTML content with automatic sanitization',
  usageExamples: [
    '<SafeSpan dataSource="company.description" />',
    '<SafeSpan dataSource="pages.home.tagline" />'
  ]
}, {
  html: createFieldMapping.richText({ 
    required: false,
    instructions: 'HTML content to display safely'
  }),
  placeholder: createFieldMapping.text({ 
    required: false,
    instructions: 'Text to show when no content is available'
  })
});`}</Code>
    </Section>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Component schema system that enables type-safe data binding with runtime validation and CMS integration.'
      }
    }
  }
};