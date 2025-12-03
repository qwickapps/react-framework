/**
 * GridLayout Stories - Flexible grid layout component with serialization support
 */

import type { Meta, StoryObj } from '@storybook/react';
import { GridLayout } from '../components/layout/GridLayout';
import { GridCell } from '../components/layout/GridCell';
import { Text } from '../components/blocks/Text';
import { Button } from '../components/buttons/Button';
import { Code } from '../components/blocks/Code';
import { ComponentTransformer } from '../schemas/transformers/ComponentTransformer';
import { makeSerializationStory } from './_templates/SerializationTemplate';
import React from 'react';

// Ensure components are registered for serialization
ComponentTransformer.registerComponent(GridLayout as React.ComponentType);
ComponentTransformer.registerComponent(GridCell as React.ComponentType);
ComponentTransformer.registerComponent(Text as React.ComponentType);
ComponentTransformer.registerComponent(Button as React.ComponentType);
ComponentTransformer.registerComponent(Code as React.ComponentType);

const meta: Meta<typeof GridLayout> = {
  title: 'Layout/GridLayout',
  component: GridLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `GridLayout is a flexible grid layout component that supports serialization through the ModelView pattern.

**Key Features:**
- **Responsive Grid**: Supports 1-6 columns with automatic responsive behavior
- **Flexible Spacing**: T-shirt sizing system (tiny, small, medium, large, huge)
- **Equal Heights**: Optional equal height columns
- **Nested Components**: Full support for nested GridCell and other serializable components
- **Serialization Support**: Complete serialize → deserialize → render workflow
- **Performance Optimized**: Efficient handling of large grids and complex nested structures

**Serialization Capabilities:**
- Preserves all layout properties (columns, spacing, dimensions, styling)
- Handles nested component serialization automatically
- Supports mixed content (serializable components + regular React nodes)
- Maintains grid behavior through serialization cycles`,
      },
    },
  },
  argTypes: {
    columns: {
      control: { type: 'select', options: [1, 2, 3, 4, 5, 6] },
      description: 'Number of equal-width columns',
    },
    spacing: {
      control: { type: 'select', options: ['tiny', 'small', 'medium', 'large', 'huge'] },
      description: 'Spacing between grid items',
    },
    equalHeight: {
      control: 'boolean',
      description: 'Make all grid items the same height',
    },
    height: {
      control: 'text',
      description: 'Grid container height',
    },
    width: {
      control: 'text',
      description: 'Grid container width',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
    },
  },
};

export default meta;
type Story = StoryObj<typeof GridLayout>;

// Basic grid layout examples
export const TwoColumns: Story = {
  args: {
    columns: 2,
    spacing: 'medium',
  },
  render: (args) => (
    <GridLayout {...args}>
      <div style={{ padding: '20px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
        Column 1 - Simple div content
      </div>
      <div style={{ padding: '20px', backgroundColor: '#fff0f5', borderRadius: '8px' }}>
        Column 2 - More content here
      </div>
    </GridLayout>
  ),
};

export const ThreeColumnsEqual: Story = {
  args: {
    columns: 3,
    spacing: 'large',
    equalHeight: true,
  },
  render: (args) => (
    <GridLayout {...args}>
      <div style={{ padding: '20px', backgroundColor: '#e6ffe6', borderRadius: '8px' }}>
        <h3>Column 1</h3>
        <p>Short content</p>
      </div>
      <div style={{ padding: '20px', backgroundColor: '#ffe6e6', borderRadius: '8px' }}>
        <h3>Column 2</h3>
        <p>This column has more content to demonstrate equal height functionality working properly across all columns.</p>
      </div>
      <div style={{ padding: '20px', backgroundColor: '#e6e6ff', borderRadius: '8px' }}>
        <h3>Column 3</h3>
        <p>Medium content here</p>
      </div>
    </GridLayout>
  ),
};

// GridCell integration examples
export const WithGridCells: Story = {
  args: {
    spacing: 'large',
  },
  render: (args) => (
    <GridLayout {...args}>
      <GridCell xs={12} sm={8} background="#f8f9fa" padding="large">
        <Text content="Main Content Area" variant="h3" />
        <Text content="This is the primary content area that takes up 8 columns on small screens and full width on mobile." variant="body1" />
      </GridCell>
      <GridCell xs={12} sm={4} background="#e9ecef" padding="large">
        <Text content="Sidebar" variant="h4" />
        <Text content="This sidebar takes up 4 columns on small screens." variant="body2" />
        <Button label="Call to Action" variant="primary" />
      </GridCell>
    </GridLayout>
  ),
};

export const ComplexResponsive: Story = {
  args: {
    spacing: 'medium',
  },
  render: (args) => (
    <GridLayout {...args}>
      <GridCell xs={12} sm={6} md={4} lg={3} padding="medium">
        <div style={{ padding: '16px', backgroundColor: '#fff3cd', borderRadius: '4px', textAlign: 'center' }}>
          <strong>Responsive Card 1</strong>
          <br />
          <small>XS: 12, SM: 6, MD: 4, LG: 3</small>
        </div>
      </GridCell>
      <GridCell xs={12} sm={6} md={4} lg={3} padding="medium">
        <div style={{ padding: '16px', backgroundColor: '#d4edda', borderRadius: '4px', textAlign: 'center' }}>
          <strong>Responsive Card 2</strong>
          <br />
          <small>XS: 12, SM: 6, MD: 4, LG: 3</small>
        </div>
      </GridCell>
      <GridCell xs={12} sm={12} md={4} lg={6} padding="medium">
        <div style={{ padding: '16px', backgroundColor: '#cce5ff', borderRadius: '4px', textAlign: 'center' }}>
          <strong>Wider Card</strong>
          <br />
          <small>XS: 12, SM: 12, MD: 4, LG: 6</small>
        </div>
      </GridCell>
    </GridLayout>
  ),
};

// Serialization examples - using standardized template
export const SerializationDemo: Story = {
  render: makeSerializationStory(() => (
    <GridLayout columns={2} spacing="large" height="400px">
      <GridCell span={8} background="background.paper" padding="large">
        <Text content="Serializable Content" variant="h3" />
        <Text content="This entire grid layout can be serialized to JSON and recreated exactly." variant="body1" />
        <Button label="Interactive Button" variant="outlined" />
      </GridCell>
      <GridCell span={4} background="grey.100" padding="medium">
        <Text content="Code Example" variant="h5" />
        <Code language="typescript" showCopy={true}>
{`// Serialize the grid
const serialized = ComponentTransformer
  .serialize(gridComponent);

// Deserialize back to React
const restored = ComponentTransformer
  .deserialize(serialized);`}
        </Code>
      </GridCell>
    </GridLayout>
  )),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates GridLayout serialization with nested components using the standardized serialization template.',
      },
    },
  },
};

export const LargeGridPerformance: Story = {
  args: {
    columns: 4,
    spacing: 'small',
  },
  render: (args) => {
    const items = Array.from({ length: 24 }, (_, i) => (
      <GridCell key={i} padding="small">
        <div style={{ 
          padding: '12px', 
          backgroundColor: i % 2 === 0 ? '#f0f8ff' : '#fff5ee',
          borderRadius: '4px',
          textAlign: 'center',
          minHeight: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          Item {i + 1}
        </div>
      </GridCell>
    ));

    const startTime = performance.now();
    const gridComponent = <GridLayout {...args}>{items}</GridLayout>;
    const serialized = ComponentTransformer.serialize(gridComponent);
    const deserialized = ComponentTransformer.deserialize(serialized);
    const endTime = performance.now();

    return (
      <div>
        <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#e7f3ff', borderRadius: '4px' }}>
          <strong>Performance Test:</strong> 24-item grid serialized and deserialized in {(endTime - startTime).toFixed(2)}ms
          <br />
          <small>Serialized size: {serialized.length.toLocaleString()} characters</small>
        </div>
        {deserialized}
      </div>
    );
  },
};

export const MixedContent: Story = {
  args: {
    spacing: 'medium',
  },
  render: (args) => (
    <GridLayout {...args}>
      <GridCell xs={12} md={6} background="info.light" padding="large">
        <Text content="Serializable Components" variant="h4" />
        <Text content="This cell contains components that implement ModelView and can be fully serialized." variant="body1" />
        <div style={{ marginTop: '16px' }}>
          <Button label="Serializable Button" variant="primary" />
        </div>
      </GridCell>
      <div style={{ padding: '24px', backgroundColor: '#fff8dc' }}>
        <h4>Regular React Content</h4>
        <p>This is a regular div that will be serialized as a React node structure, preserving its content but not as a component.</p>
        <ul>
          <li>Bullet point 1</li>
          <li>Bullet point 2</li>
        </ul>
      </div>
      <GridCell xs={12} padding="large">
        <Text content="Full Width Footer" variant="h5" />
        <Code language="json" title="Serialization Result">
{`{
  "tag": "GridLayout",
  "version": "1.0.0",
  "data": {
    "spacing": "medium",
    "children": "[...]"
  }
}`}
        </Code>
      </GridCell>
    </GridLayout>
  ),
};

export const DimensionsAndStyling: Story = {
  args: {
    columns: 3,
    spacing: 'huge',
    height: '300px',
    width: '100%',
    maxWidth: '1200px',
    className: 'custom-grid-demo',
  },
  render: (args) => (
    <div style={{ margin: '0 auto' }}>
      <GridLayout {...args}>
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#ffe4e1', 
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text content="Styled Grid" variant="h6" />
        </div>
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#e1f5fe', 
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text content="Fixed Height" variant="h6" />
        </div>
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#e8f5e8', 
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text content="Max Width" variant="h6" />
        </div>
      </GridLayout>
    </div>
  ),
};