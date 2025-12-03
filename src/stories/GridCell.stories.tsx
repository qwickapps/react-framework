/**
 * GridCell Stories - Grid layout cell wrapper with serialization support
 */

import type { Meta, StoryObj } from '@storybook/react';
import { GridCell } from '../components/layout/GridCell';
import { Text } from '../components/blocks/Text';
import { Button } from '../components/buttons/Button';
import { Code } from '../components/blocks/Code';
import { Image } from '../components/blocks/Image';
import { ComponentTransformer } from '../schemas/transformers/ComponentTransformer';
import { makeSerializationStory } from './_templates/SerializationTemplate';
import React from 'react';

// Ensure components are registered for serialization
ComponentTransformer.registerComponent(GridCell as React.ComponentType);
ComponentTransformer.registerComponent(Text as React.ComponentType);
ComponentTransformer.registerComponent(Button as React.ComponentType);
ComponentTransformer.registerComponent(Code as React.ComponentType);
ComponentTransformer.registerComponent(Image as React.ComponentType);

const meta: Meta<typeof GridCell> = {
  title: 'Layout/GridCell',
  component: GridCell,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `GridCell is a wrapper component for grid layout cells that supports comprehensive responsive behavior and serialization.

**Key Features:**
- **Responsive Grid Properties**: Full breakpoint support (xs, sm, md, lg, xl)
- **Flexible Span System**: Span-based column width control
- **Base Props Support**: Inherits styling capabilities (background, padding, margin, dimensions)
- **Nested Component Support**: Handles any content including other serializable components
- **Serialization Ready**: Complete ModelView implementation for serialize → deserialize workflows
- **Grid Integration**: Works seamlessly with GridLayout for data-driven layouts

**Responsive Behavior:**
- **xs**: Extra small screens (mobile portrait)
- **sm**: Small screens (mobile landscape, small tablets)  
- **md**: Medium screens (tablets, small laptops)
- **lg**: Large screens (desktops)
- **xl**: Extra large screens (large desktops, wide monitors)

**Serialization Features:**
- Preserves all responsive grid properties
- Maintains styling properties (background, padding, margins)
- Handles nested component serialization automatically
- Supports mixed content serialization`,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ 
        width: '100%', 
        minHeight: '200px',
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: '16px',
        padding: '16px',
        backgroundColor: '#f8f9fa'
      }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    span: {
      control: { type: 'number', min: 1, max: 12 },
      description: 'Number of columns to span (1-12)',
    },
    xs: {
      control: { type: 'number', min: 1, max: 12 },
      description: 'Columns on extra small screens',
    },
    sm: {
      control: { type: 'number', min: 1, max: 12 },
      description: 'Columns on small screens',
    },
    md: {
      control: { type: 'number', min: 1, max: 12 },
      description: 'Columns on medium screens',
    },
    lg: {
      control: { type: 'number', min: 1, max: 12 },
      description: 'Columns on large screens',
    },
    xl: {
      control: { type: 'number', min: 1, max: 12 },
      description: 'Columns on extra large screens',
    },
    background: {
      control: 'text',
      description: 'Background color or theme color',
    },
    padding: {
      control: { type: 'select', options: ['tiny', 'small', 'medium', 'large', 'huge', 'none'] },
      description: 'Internal spacing',
    },
    margin: {
      control: { type: 'select', options: ['tiny', 'small', 'medium', 'large', 'huge', 'none'] },
      description: 'External spacing',
    },
    height: {
      control: 'text',
      description: 'Cell height',
    },
    width: {
      control: 'text', 
      description: 'Cell width',
    },
  },
};

export default meta;
type Story = StoryObj<typeof GridCell>;

// Basic GridCell examples
export const BasicCell: Story = {
  args: {
    span: 6,
    background: '#ffffff',
    padding: 'medium',
  },
  render: (args) => (
    <GridCell {...args}>
      <Text content="Basic Grid Cell" variant="h4" />
      <Text content="This is a basic grid cell spanning 6 columns with medium padding and white background." variant="body1" />
    </GridCell>
  ),
};

export const ResponsiveCell: Story = {
  args: {
    xs: 12,
    sm: 8,
    md: 6,
    lg: 4,
    xl: 3,
    background: '#e3f2fd',
    padding: 'large',
  },
  render: (args) => (
    <GridCell {...args}>
      <Text content="Responsive Cell" variant="h5" />
      <Text content="Resize your browser to see responsive behavior:" variant="body1" />
      <ul style={{ margin: '12px 0', paddingLeft: '20px' }}>
        <li>Mobile (xs): 12 columns</li>
        <li>Tablet (sm): 8 columns</li>
        <li>Desktop (md): 6 columns</li>
        <li>Large (lg): 4 columns</li>
        <li>XL (xl): 3 columns</li>
      </ul>
    </GridCell>
  ),
};

export const StyledCell: Story = {
  args: {
    span: 8,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: 'huge',
    margin: 'medium',
    height: '200px',
  },
  render: (args) => (
    <GridCell {...args}>
      <div style={{ color: 'white', textAlign: 'center' }}>
        <Text content="Styled Cell" variant="h3" color="inherit" />
        <Text content="Custom background gradient with huge padding and medium margin" variant="body1" color="inherit" />
      </div>
    </GridCell>
  ),
};

// Content examples
export const WithTextContent: Story = {
  args: {
    span: 10,
    background: '#f5f5f5',
    padding: 'large',
  },
  render: (args) => (
    <GridCell {...args}>
      <Text content="Article Title" variant="h2" />
      <Text content="Published on January 15, 2024" variant="caption" color="textSecondary" />
      <Text content="This is the main article content. GridCell can contain rich text content with multiple Text components, each with their own styling and formatting options." variant="body1" />
      <Text content="Supporting paragraph with additional information and context about the topic being discussed." variant="body2" />
    </GridCell>
  ),
};

export const WithButtonActions: Story = {
  args: {
    span: 6,
    background: '#fff',
    padding: 'large',
  },
  render: (args) => (
    <GridCell {...args}>
      <Text content="Action Card" variant="h4" />
      <Text content="This card demonstrates how GridCell can contain interactive elements." variant="body1" />
      <div style={{ marginTop: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button label="Primary Action" variant="primary" />
        <Button label="Secondary" variant="outlined" />
        <Button label="Text Button" variant="text" />
      </div>
    </GridCell>
  ),
};

export const WithCodeBlock: Story = {
  args: {
    span: 12,
    background: '#1e1e1e',
    padding: 'large',
  },
  render: (args) => (
    <GridCell {...args}>
      <Text content="Code Example" variant="h4" color="inherit" />
      <Code 
        language="typescript" 
        title="GridCell Usage" 
        showCopy={true}
      >
{`import { GridCell } from '@qwickapps/react-framework';

function ResponsiveCard() {
  return (
    <GridCell 
      xs={12} 
      sm={6} 
      md={4}
      background="background.paper"
      padding="large"
    >
      <Text content="Responsive Card" variant="h5" />
      <Text content="Content goes here..." variant="body1" />
    </GridCell>
  );
}`}
      </Code>
    </GridCell>
  ),
};



export const NestedSerializableComponents: Story = {
  args: {
    span: 12,
    background: '#f8f9fa',
    padding: 'huge',
  },
  render: (args) => (
    <GridCell {...args}>
      <Text content="Complex Nested Content" variant="h3" />
      <Text content="This cell contains multiple types of serializable components:" variant="body1" />
      
      <div style={{ margin: '24px 0' }}>
        <Text content="1. Multiple Text Components" variant="h6" />
        <Text content="Each with different styling and properties" variant="body2" color="textSecondary" />
      </div>
      
      <div style={{ margin: '24px 0' }}>
        <Text content="2. Interactive Elements" variant="h6" />
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <Button label="Save" variant="primary" buttonSize="small" />
          <Button label="Cancel" variant="outlined" buttonSize="small" />
        </div>
      </div>
      
      <div style={{ margin: '24px 0' }}>
        <Text content="3. Code Blocks" variant="h6" />
        <Code language="javascript" title="Serialization Method">
{`// All of this content is preserved during serialization
const serialized = ComponentTransformer.serialize(cellComponent);
const deserialized = ComponentTransformer.deserialize(serialized);`}
        </Code>
      </div>
      
      <Text content="All these nested components maintain their properties, styling, and interactivity through the serialization process." variant="body2" />
    </GridCell>
  ),
};

export const PerformanceTest: Story = {
  args: {
    span: 12,
    background: '#fff',
    padding: 'medium',
  },
  render: (args) => {
    // Create a cell with many nested components
    const textItems = Array.from({ length: 15 }, (_, i) => (
      <Text 
        key={i}
        content={`Performance test item ${i + 1}: This text verifies that serialization remains fast even with many nested components.`}
        variant="body2"
      />
    ));

    const complexCell = (
      <GridCell {...args}>
        <Text content="Performance Test Cell" variant="h4" />
        <Text content="This cell contains 15 Text components to test serialization performance:" variant="body1" />
        {textItems}
        <Button label="Test Button" variant="outlined" />
      </GridCell>
    );

    // Measure serialization performance
    const startTime = performance.now();
    const serialized = ComponentTransformer.serialize(complexCell);
    const deserialized = ComponentTransformer.deserialize(serialized);
    const endTime = performance.now();

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '16px' }}>
        <div style={{ 
          gridColumn: '1 / -1', 
          padding: '12px',
          backgroundColor: '#e7f3ff',
          borderRadius: '4px',
          marginBottom: '16px'
        }}>
          <strong>Performance Result:</strong> Serialized and deserialized in {(endTime - startTime).toFixed(2)}ms
          <br />
          <small>Serialized size: {serialized.length.toLocaleString()} characters</small>
        </div>
        
        {deserialized}
      </div>
    );
  },
};

export const ThemeIntegration: Story = {
  args: {
    xs: 12,
    sm: 6,
    background: 'primary.light',
    padding: 'large',
  },
  render: (args) => (
    <GridCell {...args}>
      <Text content="Theme-Aware Cell" variant="h4" color="textPrimary" />
      <Text content="This cell uses theme colors for background and automatically adjusts text color for contrast." variant="body1" color="textSecondary" />
      <div style={{ marginTop: '16px' }}>
        <Button label="Themed Button" variant="contained" />
      </div>
    </GridCell>
  ),
};

/**
 * SerializationDemo - GridCell serialization using template
 */
export const SerializationDemo: Story = {
  render: makeSerializationStory(() => (
    <GridCell xs={12} sm={6} md={4} padding="large" background="#e3f2fd">
      <Text content="Serializable GridCell" variant="h6" />
      <Text content="This grid cell contains nested serializable components." variant="body1" />
      <Button label="Action Button" variant="primary" />
    </GridCell>
  )),
  parameters: {
    docs: {
      description: {
        story: 'Shows GridCell serialization with nested components using the standardized makeSerializationStory template. Demonstrates react-children strategy for layout components.',
      },
    },
  },
};