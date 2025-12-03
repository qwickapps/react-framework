/**
 * Button Component Stories - Enhanced action component with data binding support
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Box, Typography } from '@mui/material';
import { JsonDataProvider } from '@qwickapps/schema';
import type { Meta, StoryObj } from '@storybook/react';
import { Code } from '../components/blocks';
import { Button } from '../components/buttons/Button';
import QwickApp from '../components/QwickApp';
import { makeSerializationStory } from './_templates/SerializationTemplate';

// Sample button data for different use cases
const sampleCmsData = {
  'buttons': {
    'hero-primary': { 
      label: 'Get Started Free', 
      variant: 'primary', 
      buttonSize: 'large',
      href: '/signup'
    },
    'hero-secondary': { 
      label: 'Watch Demo', 
      variant: 'outlined', 
      buttonSize: 'large' 
    },
    'feature-cta': { 
      label: 'Try Feature', 
      variant: 'primary', 
      buttonSize: 'small',
      href: '/features/analytics' 
    },
    'download-button': { 
      label: 'Download Guide', 
      variant: 'secondary', 
      href: '/guide.pdf',
      target: '_blank' 
    },
    'loading-button': { 
      label: 'Processing...', 
      variant: 'primary', 
      loading: true,
      disabled: true 
    },
    'contact-sales': { 
      label: 'Contact Sales', 
      variant: 'outlined',
      href: 'mailto:sales@example.com' 
    },
    'full-width': { 
      label: 'Get Started', 
      variant: 'primary', 
      fullWidth: true,
      buttonSize: 'large' 
    },
    'disabled': { 
      label: 'Unavailable', 
      variant: 'outlined', 
      disabled: true 
    }
  }
};

const dataProvider = new JsonDataProvider({ data: sampleCmsData });

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `Button is the enhanced action component for QwickApps React Framework with comprehensive features and data binding support.

**Key Features:**
- **Dual Purpose**: Works as both link (href) and button (onClick)
- **Loading States**: Built-in spinner and disabled state management
- **Icon Support**: Start and end icon placement with customization
- **Custom Variants**: Primary, secondary, outlined, text, and contained styles
- **Data Binding**: Full CMS integration through dataSource prop
- **Accessibility**: Complete ARIA support and keyboard navigation
- **Theme Integration**: Automatically uses QwickApp theme colors and styling
- **Base Props**: Supports grid behavior and consistent styling patterns
- **Flexible API**: Label prop for simple usage, children for complex content

**Perfect For:**
- Hero section calls-to-action and primary user flows
- Feature grid actions and secondary interactions
- Content block buttons and navigation elements
- Form submissions and interactive controls
- Any interactive element requiring consistent styling and behavior`,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

// Traditional Usage Examples
export const Primary: Story = {
  render: () => (
    <QwickApp appId="button-primary" appName='Primary Button'>
      <Button 
        label="Get Started" 
        variant="primary"
        onClick={() => { alert('Primary button clicked'); }}
      />
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Primary button with default styling and click handler.',
      },
    },
  },
};

export const Secondary: Story = {
  render: () => (
    <QwickApp appId="button-secondary" appName='Secondary Button'>
      <Button 
        label="Learn More" 
        variant="secondary"
        onClick={() => { alert('Secondary button clicked'); }}
      />
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Secondary button variant with contained styling.',
      },
    },
  },
};

export const Outlined: Story = {
  render: () => (
    <QwickApp appId="button-outlined" appName='Outlined Button'>
      <Button 
        label="View Details" 
        variant="outlined"
        onClick={() => { alert('Outlined button clicked'); }}
      />
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Outlined button variant for secondary actions.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <QwickApp appId="button-icons" appName='Button with Icons'>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button 
          label="Download" 
          icon={<span>⬇️</span>} 
          onClick={() => { alert('Download clicked'); }} 
        />
        <Button 
          label="Share" 
          endIcon={<span>↗️</span>} 
          variant="outlined"
          onClick={() => { alert('Share clicked'); }} 
        />
        <Button 
          label="Save & Continue" 
          icon={<span>💾</span>} 
          endIcon={<span>→</span>}
          onClick={() => { alert('Save & Continue clicked'); }} 
        />
      </Box>
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons can have icons at the start (icon prop) or end (endIcon prop), or both.',
      },
    },
  },
};

export const AsLinks: Story = {
  render: () => (
    <QwickApp appId="button-links" appName='Button as Links'>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button 
          label="Visit Homepage" 
          href="https://example.com"
          target="_blank"
          icon={<span>🏠</span>}
        />
        <Button 
          label="Internal Link" 
          href="/about"
          variant="outlined"
        />
        <Button 
          label="Email Us" 
          href="mailto:hello@example.com"
          variant="text"
          icon={<span>📧</span>}
        />
      </Box>
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button automatically becomes a link when href prop is provided. Supports external links, internal navigation, and mailto links.',
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <QwickApp appId="button-states" appName='Button States'>
      <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', maxWidth: 400 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button 
            label="Normal" 
            onClick={() => { alert('Normal clicked'); }} 
          />
          <Button 
            label="Loading..." 
            loading={true}
            onClick={() => { alert('Loading clicked'); }} 
          />
          <Button 
            label="Disabled" 
            disabled={true}
            onClick={() => { alert('Disabled clicked'); }} 
          />
        </Box>
        <Button 
          label="Full Width" 
          fullWidth={true}
          variant="outlined"
          onClick={() => { alert('Full Width clicked'); }} 
        />
      </Box>
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons support loading states (with spinner), disabled states, and full-width layout.',
      },
    },
  },
};

// Data Binding Examples
export const DataBindingBasic: Story = {
  render: () => (
    <QwickApp appId="button-data-binding" appName='Button Data Binding' dataSource={{ dataProvider }}>
      <Box>
        
        <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
          <Typography variant="h5" gutterBottom>📊 Data-Driven Button</Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
            Button components can be completely driven by CMS data, loading configuration and behavior from your data source.
          </Typography>
          
          <Code title="Usage" language="tsx">{`<Button dataSource="buttons.hero-primary" />`}</Code>
          
          <Code title="Data Structure" language="json">{JSON.stringify(sampleCmsData.buttons['hero-primary'], null, 2)}</Code>
        </Box>

        <Button dataSource="buttons.hero-primary" />
        
      </Box>
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button with data binding - configuration resolved from CMS data through dataSource.',
      },
    },
  },
};

export const DataBindingAdvanced: Story = {
  render: () => (
    <QwickApp appId="button-data-advanced" appName='Advanced Button Data Binding' dataSource={{ dataProvider }}>
      <Box>
        
        <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
          <Typography variant="h5" gutterBottom>🎯 Multiple Button Types</Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
            Different Button instances can load different configurations from separate data sources.
          </Typography>
        </Box>

        {/* Hero Section Buttons */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>Hero Section</Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button dataSource="buttons.hero-primary" />
            <Button dataSource="buttons.hero-secondary" />
          </Box>
        </Box>

        {/* Feature Actions */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>Feature Actions</Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button dataSource="buttons.feature-cta" />
            <Button dataSource="buttons.download-button" />
          </Box>
        </Box>

        {/* Special States */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>Special States</Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button dataSource="buttons.loading-button" />
            <Button dataSource="buttons.disabled" />
          </Box>
        </Box>
        
      </Box>
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Advanced data binding with multiple button types showcasing different configurations and states.',
      },
    },
  },
};

export const DataBindingWithFallback: Story = {
  render: () => (
    <QwickApp appId="button-fallback" appName='Button Data Binding with Fallback' dataSource={{ dataProvider }}>
      <Box>
        
        <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
          <Typography variant="h5" gutterBottom>🛡️ Fallback Support</Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
            Button components gracefully handle missing data sources with fallback configurations.
          </Typography>
          
          <Code title="Fallback Usage" language="tsx">{`<Button 
  dataSource="nonexistent.button" 
  label="Fallback Button"
  variant="primary"
/>`}</Code>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
          <Box>
            <Typography variant="h6" gutterBottom>Missing Data Source (Fallback)</Typography>
            <Button 
              dataSource="nonexistent.button"
              label="Fallback Button"
              variant="primary"
            />
          </Box>
          <Box>
            <Typography variant="h6" gutterBottom>Valid Data Source</Typography>
            <Button dataSource="buttons.hero-primary" />
          </Box>
        </Box>
        
      </Box>
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button with fallback configuration when dataSource is missing or unavailable.',
      },
    },
  },
};

export const RealWorldExample: Story = {
  render: () => (
    <QwickApp appId="button-real-world" appName='Real World Button Example' dataSource={{ dataProvider }}>
      <Box>
        
        {/* Hero Section */}
        <Box sx={{ mb: 6, p: 4, backgroundColor: 'primary.main', color: 'primary.contrastText', borderRadius: 2 }}>
          <Typography variant="h3" gutterBottom>Transform Your Workflow</Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Experience the power of QwickApps React Framework for modern web development
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button dataSource="buttons.hero-primary" />
            <Button dataSource="buttons.hero-secondary" />
          </Box>
        </Box>
        
        {/* Feature Grid */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" gutterBottom>Feature Highlights</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3 }}>
            <Box sx={{ p: 3, border: 1, borderColor: 'divider', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>Analytics Dashboard</Typography>
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                Get insights into your application performance with real-time analytics.
              </Typography>
              <Button dataSource="buttons.feature-cta" />
            </Box>
            <Box sx={{ p: 3, border: 1, borderColor: 'divider', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>Resource Library</Typography>
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                Access comprehensive guides and documentation for developers.
              </Typography>
              <Button dataSource="buttons.download-button" />
            </Box>
            <Box sx={{ p: 3, border: 1, borderColor: 'divider', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>Sales Support</Typography>
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                Connect with our sales team for personalized assistance.
              </Typography>
              <Button dataSource="buttons.contact-sales" />
            </Box>
          </Box>
        </Box>
        
        {/* Full Width Action */}
        <Box sx={{ p: 4, backgroundColor: 'background.paper', borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>Ready to Get Started?</Typography>
          <Typography variant="body1" sx={{ mb: 4, textAlign: 'center', opacity: 0.8 }}>
            Join thousands of developers building amazing applications with QwickApps React Framework.
          </Typography>
          <Button dataSource="buttons.full-width" />
        </Box>
        
      </Box>
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world example showing Button in various contexts: hero sections, feature grids, and call-to-action areas.',
      },
    },
  },
};

export const LoadingAndErrorStates: Story = {
  render: () => (
    <QwickApp appId="button-states" appName='Button Loading and Error States' dataSource={{ dataProvider }}>
      <Box>
        
        <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
          <Typography variant="h5" gutterBottom>🔄 State Management</Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
            Button handles various states including loading and error scenarios gracefully.
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 4 }}>
          <Box>
            <Typography variant="h6" gutterBottom>Loading State</Typography>
            <Button dataSource="buttons.loading-button" />
          </Box>
          <Box>
            <Typography variant="h6" gutterBottom>Disabled State</Typography>
            <Button dataSource="buttons.disabled" />
          </Box>
          <Box>
            <Typography variant="h6" gutterBottom>Normal State</Typography>
            <Button dataSource="buttons.hero-primary" />
          </Box>
          <Box>
            <Typography variant="h6" gutterBottom>Full Width</Typography>
            <Button dataSource="buttons.full-width" />
          </Box>
        </Box>
        
      </Box>
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates loading, disabled, and various button state handling.',
      },
    },
  },
};

/**
 * SerializationDemo - Demonstrates button component serialization and deserialization
 */
export const SerializationDemo: StoryObj<typeof Button> = {
  render: makeSerializationStory(() => (
    <Button 
      variant="primary" 
      label="Serialize Me!" 
      buttonSize="large"
      fullWidth={false}
      disabled={false}
      loading={false}
    />
  )),
  parameters: {
    docs: {
      description: {
        story: 'Shows how Button components are serialized to JSON and deserialized back to React components. Demonstrates the schema-driven architecture and round-trip serialization fidelity.',
      },
    },
  },
};
