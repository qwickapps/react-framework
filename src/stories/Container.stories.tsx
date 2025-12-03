/**
 * Container Component Stories - Comprehensive ViewSchema prop showcase
 * 
 * This story demonstrates the new Container component that replaces the 
 * abstract ModelView class with a concrete React component using ViewSchema
 * as its props interface.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Alert, Box, Typography } from '@mui/material';
import { JsonDataProvider } from '@qwickapps/schema';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Container } from '../components/base/Container';
import { makeSerializationStory } from './_templates/SerializationTemplate';
import { Code, Text } from '../components/blocks';
import { Button } from '../components/buttons/Button';
import QwickApp from '../components/QwickApp';
import {registerSerializableComponents} from '../schemas/transformers/registry';

console.log('Registering serializable components for stories...', registerSerializableComponents);
// Sample data for comprehensive demonstrations
const sampleData = {
  'functional-modelview': {
    'basic-card': {
      span: '6',
      padding: 'medium',
      background: '#f5f5f5',
      className: 'basic-card-example'
    },
    'responsive-grid': {
      xs: '12',
      sm: '8',
      md: '6',
      lg: '4',
      xl: '3',
      padding: 'large',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      textAlign: 'center'
    },
    'styled-container': {
      span: '8',
      padding: 'huge',
      margin: 'medium',
      width: '100%',
      height: '200px',
      background: 'primary.main',
      backgroundGradient: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      textAlign: 'center',
      className: 'styled-container',
      'data-testid': 'styled-container-test'
    },
    'interactive-element': {
      span: '10',
      padding: 'large',
      background: 'background.paper',
      onClick: 'function(event) { alert("Container clicked!"); console.log("Click event:", event); }',
      onMouseEnter: 'function(event) { event.target.style.transform = "scale(1.02)"; }',
      onMouseLeave: 'function(event) { event.target.style.transform = "scale(1)"; }',
      'aria-label': 'Interactive ModelView container',
      role: 'button',
      'data-testid': 'interactive-modelview'
    },
    'accessibility-example': {
      span: '12',
      padding: 'medium',
      background: 'info.light',
      id: 'accessibility-demo',
      role: 'region',
      'aria-label': 'Accessibility demonstration section',
      'aria-describedby': 'accessibility-description',
      'data-testid': 'accessibility-container'
    }
  }
};

const dataProvider = new JsonDataProvider({ data: sampleData });

const meta = {
  title: 'Components/Container',
  component: Container,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `Container is the concrete implementation of the ViewSchema that replaces the abstract ModelView class pattern with a direct React component.

**Key Features:**
- **ViewSchema Props**: Direct support for all ViewSchema properties
- **Grid Layout**: Full responsive breakpoint system (xs, sm, md, lg, xl) with span support
- **Dimension Control**: T-shirt sizing and CSS values for width, height, min/max variants
- **Spacing System**: T-shirt sized padding and margin with directional control
- **Background Options**: Colors, gradients, images with theme integration
- **Style Integration**: className, sx props, and inline styles with JSON parsing
- **Accessibility**: Complete ARIA support and semantic HTML attributes
- **Event Handlers**: String-to-function conversion for onClick, onMouseEnter, etc.
- **Data Binding**: Full CMS integration through dataSource prop
- **Serialization**: Complete toJson/fromJson support for dynamic UIs

**Architecture:**
- Uses ViewSchema as the props interface
- Integrates with existing useBaseProps utility
- Converts string props to appropriate React prop types
- Handles event string evaluation safely
- Supports children rendering and data binding
- Maintains backward compatibility with ModelView patterns

**Perfect For:**
- Container components with comprehensive styling needs
- Data-driven UI components loaded from CMS
- Responsive grid layouts with complex styling requirements
- Components requiring full accessibility and semantic markup
- Serializable UI elements for dynamic page generation`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Grid Props
    span: {
      control: { type: 'select', options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'auto', 'grow'] },
      description: 'Grid column span (1-12, auto, or grow)',
    },
    xs: {
      control: { type: 'select', options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'auto'] },
      description: 'Grid columns on extra small screens',
    },
    sm: {
      control: { type: 'select', options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'auto'] },
      description: 'Grid columns on small screens',
    },
    md: {
      control: { type: 'select', options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'auto'] },
      description: 'Grid columns on medium screens',
    },
    lg: {
      control: { type: 'select', options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'auto'] },
      description: 'Grid columns on large screens',
    },
    xl: {
      control: { type: 'select', options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'auto'] },
      description: 'Grid columns on extra large screens',
    },
    // Dimension Props
    width: {
      control: 'text',
      description: 'Width (t-shirt sizes, CSS values, breakpoints)',
    },
    height: {
      control: 'text',
      description: 'Height (t-shirt sizes, CSS values)',
    },
    // Spacing Props
    padding: {
      control: { type: 'select', options: ['none', 'tiny', 'small', 'medium', 'large', 'huge'] },
      description: 'Internal spacing for all sides',
    },
    margin: {
      control: { type: 'select', options: ['none', 'tiny', 'small', 'medium', 'large', 'huge'] },
      description: 'External spacing for all sides',
    },
    // Background Props
    background: {
      control: 'text',
      description: 'Background color, theme path, or CSS value',
    },
    backgroundGradient: {
      control: 'text',
      description: 'CSS gradient for background',
    },
    backgroundImage: {
      control: 'text',
      description: 'Background image URL',
    },
    // Style Props
    className: {
      control: 'text',
      description: 'Additional CSS class names',
    },
    textAlign: {
      control: { type: 'select', options: ['left', 'center', 'right', 'justify'] },
      description: 'Text alignment within component',
    },
    // HTML Attributes
    id: {
      control: 'text',
      description: 'HTML element ID',
    },
    role: {
      control: 'text',
      description: 'ARIA role for accessibility',
    },
    'aria-label': {
      control: 'text',
      description: 'ARIA label for screen readers',
    },
    'data-testid': {
      control: 'text',
      description: 'Test automation identifier',
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
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

// === BASIC USAGE STORIES ===

export const BasicContainer: Story = {
  args: {
    span: 6,
    padding: 'medium',
    background: '#ffffff',
    className: 'basic-container',
  },
  render: (args) => (
    <Container {...args}>
      <Typography variant="h5" gutterBottom>Basic Container</Typography>
      <Typography variant="body1">
        This is a basic container using Container with span=6, medium padding,
        and white background. It demonstrates the simplest usage pattern.
      </Typography>
    </Container>
  ),
};

export const WithComplexChildren: Story = {
  args: {
    span: 8,
    padding: 'large',
    background: 'background.paper',
    className: 'complex-children-container',
  },
  render: (args) => (
    <Container {...args}>
      <Typography variant="h4" gutterBottom color="primary">
        Complex Content Example
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Container can contain any React children including other components:
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <Button label="Primary Action" variant="primary" onClick={() => alert('Button clicked!')} />
        <Button label="Secondary" variant="outlined" onClick={() => alert('Secondary clicked!')} />
      </Box>

      <Code language="jsx" title="JSX Usage">
        {`<Container span="8" padding="large" background="background.paper">
  <Typography variant="h4">Title</Typography>
  <Button label="Action" variant="primary" />
  <Code>/* Code blocks */</Code>
</Container>`}
      </Code>
    </Container>
  ),
};

// === GRID LAYOUT STORIES ===

export const GridLayoutShowcase: Story = {
  render: () => (
    <QwickApp appId="functional-modelview-grid" appName="Container Grid Layout">
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2, width: '100%' }}>

        {/* Title */}
        <Container span={12} padding="medium" background="primary.main" textAlign="center">
          <Typography variant="h4" color="primary.contrastText">Grid Layout Examples</Typography>
          <Typography variant="body1" color="primary.contrastText">
            Demonstrating various span and responsive breakpoint configurations
          </Typography>
        </Container>

        {/* Fixed Span Examples */}
        <Container span={3} padding="small" background="#e3f2fd" textAlign="center">
          <Typography variant="h6">Span 3</Typography>
          <Typography variant="body2">25% width</Typography>
        </Container>

        <Container span={6} padding="small" background="#e8f5e8" textAlign="center">
          <Typography variant="h6">Span 6</Typography>
          <Typography variant="body2">50% width</Typography>
        </Container>

        <Container span={3} padding="small" background="#fff3e0" textAlign="center">
          <Typography variant="h6">Span 3</Typography>
          <Typography variant="body2">25% width</Typography>
        </Container>

        {/* Auto and Grow Examples */}
        <Container span="auto" padding="small" background="#f3e5f5" textAlign="center">
          <Typography variant="h6">Span Auto</Typography>
          <Typography variant="body2">Auto-sized</Typography>
        </Container>

        <Container span="grow" padding="small" background="#e0f2f1" textAlign="center">
          <Typography variant="h6">Span Grow</Typography>
          <Typography variant="body2">Fills remaining space</Typography>
        </Container>

      </Box>
    </QwickApp>
  ),
};

export const ResponsiveBreakpoints: Story = {
  render: () => (
    <QwickApp appId="functional-modelview-responsive" appName="Container Responsive">
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2, width: '100%' }}>

        <Container span={12} padding="medium" background="info.main" textAlign="center">
          <Typography variant="h4" color="info.contrastText">Responsive Breakpoints</Typography>
          <Typography variant="body1" color="info.contrastText">
            Resize your browser to see responsive behavior
          </Typography>
        </Container>

        <Container
          xs={12}
          sm={8}
          md={6}
          lg={4}
          xl={3}
          padding="medium"
          background="#ffebee"
          textAlign="center"
        >
          <Typography variant="h6" color="error.dark">Responsive Card 1</Typography>
          <Typography variant="body2">
            xs:12 → sm:8 → md:6 → lg:4 → xl:3
          </Typography>
        </Container>

        <Container
          xs={12}
          sm={4}
          md={6}
          lg={8}
          xl={9}
          padding="medium"
          background="#e8f5e8"
          textAlign="center"
        >
          <Typography variant="h6" color="success.dark">Responsive Card 2</Typography>
          <Typography variant="body2">
            xs:12 → sm:4 → md:6 → lg:8 → xl:9
          </Typography>
        </Container>

      </Box>
    </QwickApp>
  ),
};

// === DIMENSION STORIES ===

export const DimensionExamples: Story = {
  render: () => (
    <QwickApp appId="functional-modelview-dimensions" appName="Container Dimensions">
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2, width: '100%' }}>

        <Container span={12} padding="medium" background="secondary.main" textAlign="center">
          <Typography variant="h4" color="secondary.contrastText">Dimension Control Examples</Typography>
          <Typography variant="body1" color="secondary.contrastText">
            T-shirt sizes, CSS values, and responsive dimensions
          </Typography>
        </Container>

        {/* T-shirt Sizes */}
        <Container span={4} width="small" height="small" padding="small" background="#f3e5f5" textAlign="center">
          <Typography variant="h6">Small Size</Typography>
          <Typography variant="body2">width: small, height: small</Typography>
        </Container>

        <Container span={4} width="medium" height="medium" padding="small" background="#e3f2fd" textAlign="center">
          <Typography variant="h6">Medium Size</Typography>
          <Typography variant="body2">width: medium, height: medium</Typography>
        </Container>

        <Container span={4} width="large" height="large" padding="small" background="#e8f5e8" textAlign="center">
          <Typography variant="h6">Large Size</Typography>
          <Typography variant="body2">width: large, height: large</Typography>
        </Container>

        {/* CSS Values */}
        <Container span={6} width="300px" height="120px" padding="medium" background="#fff3e0" textAlign="center">
          <Typography variant="h6">Fixed Dimensions</Typography>
          <Typography variant="body2">width: 300px, height: 120px</Typography>
        </Container>

        <Container span={6} width="100%" minHeight="120px" maxHeight="200px" padding="medium" background="#ffebee" textAlign="center">
          <Typography variant="h6">Constrained Dimensions</Typography>
          <Typography variant="body2">width: 100%, minHeight: 120px, maxHeight: 200px</Typography>
        </Container>

      </Box>
    </QwickApp>
  ),
};

// === SPACING STORIES ===

export const SpacingExamples: Story = {
  render: () => (
    <QwickApp appId="functional-modelview-spacing" appName="Container Spacing">
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2, width: '100%' }}>

        <Container span={12} padding="medium" background="success.main" textAlign="center">
          <Typography variant="h4" color="success.contrastText">Spacing System Examples</Typography>
          <Typography variant="body1" color="success.contrastText">
            T-shirt sized padding and margin with directional control
          </Typography>
        </Container>

        {/* Padding Examples */}
        <Container span={4} padding="tiny" background="#e3f2fd" textAlign="center">
          <Typography variant="h6" sx={{ border: '1px dashed #2196F3' }}>Tiny Padding</Typography>
        </Container>

        <Container span={4} padding="medium" background="#e8f5e8" textAlign="center">
          <Typography variant="h6" sx={{ border: '1px dashed #4CAF50' }}>Medium Padding</Typography>
        </Container>

        <Container span={4} padding="huge" background="#fff3e0" textAlign="center">
          <Typography variant="h6" sx={{ border: '1px dashed #FF9800' }}>Huge Padding</Typography>
        </Container>

        {/* Directional Spacing */}
        <Container span={6} paddingTop="large" paddingBottom="small" paddingX="medium" background="#f3e5f5" textAlign="center">
          <Typography variant="h6">Directional Padding</Typography>
          <Typography variant="body2">paddingTop: large, paddingBottom: small, paddingX: medium</Typography>
        </Container>

        <Container span={6} margin="large" padding="medium" background="#e0f2f1">
          <Typography variant="h6" textAlign="center">With Margin</Typography>
          <Typography variant="body2" textAlign="center">margin: large, padding: medium</Typography>
        </Container>

      </Box>
    </QwickApp>
  ),
};

// === BACKGROUND STORIES ===

export const BackgroundExamples: Story = {
  render: () => (
    <QwickApp appId="functional-modelview-backgrounds" appName="Container Backgrounds">
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2, width: '100%' }}>

        <Container span={12} padding="medium" background="error.main" textAlign="center">
          <Typography variant="h4" color="error.contrastText">Background Examples</Typography>
          <Typography variant="body1" color="error.contrastText">
            Colors, gradients, images, and theme integration
          </Typography>
        </Container>

        {/* Solid Colors */}
        <Container span={4} padding="large" background="#FF5722" textAlign="center">
          <Typography variant="h6" color="white">Hex Color</Typography>
          <Typography variant="body2" color="white">#FF5722</Typography>
        </Container>

        <Container span={4} padding="large" background="primary.light" textAlign="center">
          <Typography variant="h6" color="primary.contrastText">Theme Color</Typography>
          <Typography variant="body2" color="primary.contrastText">primary.light</Typography>
        </Container>

        <Container span={4} padding="large" background="rgba(76, 175, 80, 0.2)" textAlign="center">
          <Typography variant="h6">RGBA Color</Typography>
          <Typography variant="body2">rgba(76, 175, 80, 0.2)</Typography>
        </Container>

        {/* Gradients */}
        <Container
          span={6}
          padding="large"
          backgroundGradient="linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
          textAlign="center"
        >
          <Typography variant="h6" color="white">Linear Gradient</Typography>
          <Typography variant="body2" color="white">45deg, pink to orange</Typography>
        </Container>

        <Container
          span={6}
          padding="large"
          backgroundGradient="radial-gradient(circle, #667eea 0%, #764ba2 100%)"
          textAlign="center"
        >
          <Typography variant="h6" color="white">Radial Gradient</Typography>
          <Typography variant="body2" color="white">blue to purple radial</Typography>
        </Container>

      </Box>
    </QwickApp>
  ),
};

// === STYLE INTEGRATION STORIES ===

export const StyleIntegrationExamples: Story = {
  render: () => (
    <QwickApp appId="functional-modelview-styles" appName="Container Styling">
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2, width: '100%' }}>

        <Container span={12} padding="medium" background="warning.main" textAlign="center">
          <Typography variant="h4" color="warning.contrastText">Style Integration Examples</Typography>
          <Typography variant="body1" color="warning.contrastText">
            className, sx props, and inline styles with JSON parsing
          </Typography>
        </Container>

        {/* className Example */}
        <Container
          span={4}
          padding="medium"
          className="custom-class-example"
          background="#f5f5f5"
          textAlign="center"
        >
          <Typography variant="h6">CSS Classes</Typography>
          <Typography variant="body2">className: "custom-class-example"</Typography>
        </Container>

        {/* sx prop Example (JSON string) */}
        <Container
          span={4}
          padding="medium"
          sx={{ border: "2px solid #2196F3", borderRadius: "8px", backgroundColor: "#e3f2fd" }}
          textAlign="center"
        >
          <Typography variant="h6">MUI SX Props</Typography>
          <Typography variant="body2">sx: JSON string with MUI styling</Typography>
        </Container>

        {/* Inline styles Example (JSON string) */}
        <Container
          span={4}
          padding="medium"
          style={{ border: "3px dashed #FF9800", backgroundColor: "#fff3e0", borderRadius: "12px" }}
          textAlign="center"
        >
          <Typography variant="h6">Inline Styles</Typography>
          <Typography variant="body2">style: JSON string with CSS</Typography>
        </Container>

        {/* Text Alignment Examples */}
        <Container span={3} padding="medium" background="#f3e5f5" textAlign="left">
          <Typography variant="h6">Left Align</Typography>
          <Typography variant="body2">textAlign: "left"</Typography>
        </Container>

        <Container span={3} padding="medium" background="#e8f5e8" textAlign="center">
          <Typography variant="h6">Center Align</Typography>
          <Typography variant="body2">textAlign: "center"</Typography>
        </Container>

        <Container span={3} padding="medium" background="#e3f2fd" textAlign="right">
          <Typography variant="h6">Right Align</Typography>
          <Typography variant="body2">textAlign: "right"</Typography>
        </Container>

        <Container span={3} padding="medium" background="#ffebee" textAlign="justify">
          <Typography variant="h6">Justify</Typography>
          <Typography variant="body2">textAlign: "justify" - This longer text demonstrates justified alignment behavior when there is enough content to wrap across multiple lines.</Typography>
        </Container>

      </Box>
    </QwickApp>
  ),
};

// === INTERACTIVE STORIES ===

export const InteractiveExamples: Story = {
  render: () => (
    <QwickApp appId="functional-modelview-interactive" appName="Container Interactive">
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2, width: '100%' }}>

        <Container span={12} padding="medium" background="info.dark" textAlign="center">
          <Typography variant="h4" color="info.contrastText">Interactive Event Handlers</Typography>
          <Typography variant="body1" color="info.contrastText">
            String-to-function conversion for onClick, onMouseEnter, onMouseLeave, onFocus, onBlur
          </Typography>
        </Container>

        {/* Click Handler Example */}
        <Container
          span={4}
          padding="large"
          background="primary.light"
          textAlign="center"
          onClick={(event) => { alert("Container clicked! Target: " + (event.target as HTMLElement).tagName); console.log("Click event details:", event); }}
          style={{ cursor: "pointer", transition: "transform 0.2s" }}>
          <Typography variant="h6" color="primary.contrastText">Click Handler</Typography>
          <Typography variant="body2" color="primary.contrastText">Click me to trigger alert</Typography>
        </Container>

        {/* Hover Effects */}
        <Container
          span={4}
          padding="large"
          background="success.light"
          textAlign="center"
          onMouseEnter={function (event) {
            const target = event.target as HTMLElement;
            target.style.transform = "scale(1.05)";
            target.style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)";
          }}
          onMouseLeave={function (event) {
            const target = event.target as HTMLElement;
            target.style.transform = "scale(1)";
            target.style.boxShadow = "none";
          }}
          style={{ cursor: "pointer", transition: "all 0.3s ease" }}>
          <Typography variant="h6" color="success.contrastText">Hover Effects</Typography>
          <Typography variant="body2" color="success.contrastText">Hover for scale and shadow</Typography>
        </Container>

        {/* Focus/Blur Handlers */}
        <Container
          span={4}
          padding="large"
          background="warning.light"
          textAlign="center"
          onFocus={function (event) { event.target.style.outline = "3px solid #FF9800"; console.log("Container focused"); }}
          onBlur={function (event) { event.target.style.outline = "none"; console.log("Container blurred"); }}
          style={{ cursor: "pointer" }}
        >
          <Typography variant="h6" color="warning.contrastText">Focus/Blur</Typography>
          <Typography variant="body2" color="warning.contrastText">Tab to focus, click elsewhere to blur</Typography>
        </Container>

        {/* Complex Interactive Example */}
        <Container
          span={12}
          padding="large"
          background="gradient.primary"
          textAlign="center"
          onClick={(event) => { const colors = ["#FF5722", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFC107", "#FF9800"]; (event.target as HTMLElement).style.background = colors[Math.floor(Math.random() * colors.length)]; }}
          onMouseEnter={(event) => {
            const target = event.target as HTMLElement;
            target.style.transform = "scale(1.02)";
            target.style.filter = "brightness(1.1)";
          }}
          onMouseLeave={(event) => {
            const target = event.target as HTMLElement;
            target.style.transform = "scale(1)";
            target.style.filter = "brightness(1)";
          }}
          style={{ cursor: "pointer", transition: "all 0.3s ease", background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)" }}
        >
          <Typography variant="h5" color="white" gutterBottom>Complex Interactive Example</Typography>
          <Typography variant="body1" color="white">
            Hover for effects, click to change background color randomly!
            This demonstrates complex event handlers with multiple effects.
          </Typography>
        </Container>

      </Box>
    </QwickApp>
  ),
};

// === ACCESSIBILITY STORIES ===

export const AccessibilityExamples: Story = {
  render: () => (
    <QwickApp appId="functional-modelview-accessibility" appName="Container Accessibility">
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2, width: '100%' }}>

        <Container span={12} padding="medium" background="secondary.dark" textAlign="center">
          <Typography variant="h4" color="secondary.contrastText">Accessibility Examples</Typography>
          <Typography variant="body1" color="secondary.contrastText">
            ARIA properties, semantic roles, and testing attributes
          </Typography>
        </Container>

        {/* ARIA Label and Role */}
        <Container
          span={6}
          padding="large"
          background="info.light"
          textAlign="center"
          role="region"
          aria-label="Main content area for accessibility demonstration"
          id="main-content-area"
        >
          <Typography variant="h6">ARIA Region</Typography>
          <Typography variant="body2">
            role="region", aria-label="Main content area..."
          </Typography>
        </Container>

        {/* Button Role with Click Handler */}
        <Container
          span={6}
          padding="large"
          background="success.light"
          textAlign="center"
          role="button"
          aria-label="Interactive button that shows an alert"
          onClick={() => { alert("Accessible button activated!"); }}

          // onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); alert("Accessible button activated via keyboard!"); } }}

          style={{ cursor: "pointer" }}
        >
          <Typography variant="h6" color="success.contrastText">Accessible Button</Typography>
          <Typography variant="body2" color="success.contrastText">
            role="button", keyboard accessible
          </Typography>
        </Container>

        {/* Described By Relationship */}
        <Container
          span={8}
          padding="medium"
          background="warning.light"
          textAlign="center"
          aria-labelledby="form-title"
          aria-describedby="form-description"
        >
          <Typography id="form-title" variant="h6" color="warning.contrastText">
            Form Container
          </Typography>
          <Typography variant="body2" color="warning.contrastText" sx={{ mb: 2 }}>
            aria-labelledby="form-title", aria-describedby="form-description"
          </Typography>

          <Box sx={{ textAlign: 'left' }}>
            <Typography variant="body2">Sample form content would go here</Typography>
          </Box>
        </Container>

        <Container span={4} padding="medium" background="grey.100">
          <Typography id="form-description" variant="body2">
            This description is linked to the form container via aria-describedby,
            providing additional context for screen readers.
          </Typography>
        </Container>

        {/* Test Automation Support */}
        <Container
          span={12}
          padding="large"
          background="error.light"
          textAlign="center"
          data-testid="automation-test-container"
          id="test-container"
          className="test-automation-example"
        >
          <Typography variant="h6" color="error.contrastText" gutterBottom>
            Test Automation Support
          </Typography>
          <Typography variant="body2" color="error.contrastText">
            data-testid="automation-test-container", id="test-container", className="test-automation-example"
          </Typography>
          <Typography variant="body2" color="error.contrastText" sx={{ mt: 1, opacity: 0.9 }}>
            These attributes make the component easy to target in automated tests
          </Typography>
        </Container>

      </Box>
    </QwickApp>
  ),
};

// === DATA BINDING STORIES ===

export const DataBindingBasic: Story = {
  render: () => (
    <QwickApp appId="functional-modelview-data-basic" appName="Container Data Binding" dataSource={{ dataProvider }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2, width: '100%' }}>

        <Container span={12} padding="medium" background="primary.main" textAlign="center">
          <Typography variant="h4" color="primary.contrastText">Data Binding Examples</Typography>
          <Typography variant="body1" color="primary.contrastText">
            Loading configuration from CMS data sources
          </Typography>
        </Container>

        <Container span={6} padding="medium" background="background.paper">
          <Typography variant="h6" gutterBottom>Basic Data Binding Usage</Typography>
          <Code language="tsx" title="Component Usage">
            {`<Container dataSource="functional-modelview.basic-card">
  <Typography variant="h6">CMS-Driven Content</Typography>
  <Typography variant="body2">
    Configuration loaded from data source
  </Typography>
</Container>`}
          </Code>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Data Structure</Typography>
          <Code language="json">
            {JSON.stringify(sampleData['functional-modelview']['basic-card'], null, 2)}
          </Code>
        </Container>

        <Container dataSource="functional-modelview.basic-card">
          <Typography variant="h6" color="primary" gutterBottom>CMS-Driven Container</Typography>
          <Typography variant="body2">
            This container's span, padding, background, and className are all loaded
            from the CMS data source "functional-modelview.basic-card".
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
            The styling you see here comes entirely from the JSON data structure.
          </Typography>
        </Container>

      </Box>
    </QwickApp>
  ),
};

export const DataBindingAdvanced: Story = {
  render: () => (
    <QwickApp appId="functional-modelview-data-advanced" appName="Container Advanced Data Binding" dataSource={{ dataProvider }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2, width: '100%' }}>

        <Container span={12} padding="large" background="secondary.main" textAlign="center">
          <Typography variant="h4" color="secondary.contrastText">Advanced Data Binding Scenarios</Typography>
          <Typography variant="body1" color="secondary.contrastText">
            Complex configurations with responsive design and interactions
          </Typography>
        </Container>

        {/* Responsive Grid from Data */}
        <Container dataSource="functional-modelview.responsive-grid">
          <Typography variant="h5" color="white" gutterBottom>Responsive Grid Card</Typography>
          <Typography variant="body1" color="white" sx={{ mb: 2 }}>
            All responsive breakpoints, gradient background, and centering loaded from CMS data.
          </Typography>
          <Code language="json" title="Data Source">
            {JSON.stringify(sampleData['functional-modelview']['responsive-grid'], null, 2)}
          </Code>
        </Container>

        {/* Styled Container from Data */}
        <Container dataSource="functional-modelview.styled-container">
          <Typography variant="h5" color="white" gutterBottom>Styled Container</Typography>
          <Typography variant="body1" color="white">
            Complex styling with dimensions, spacing, gradients, and test attributes from data.
          </Typography>
        </Container>

        {/* Interactive Element from Data */}
        <Container dataSource="functional-modelview.interactive-element">
          <Typography variant="h6" gutterBottom>Interactive Element</Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Click handlers, hover effects, ARIA properties, and semantic role - all from CMS data.
          </Typography>
          <Alert severity="info">
            Event handlers are safely evaluated from string functions in the data source.
            This enables dynamic behavior configuration through CMS.
          </Alert>
        </Container>

        {/* Accessibility Example from Data */}
        <Container dataSource="functional-modelview.accessibility-example">
          <Typography variant="h6" color="info.contrastText" gutterBottom>
            Accessibility Configuration
          </Typography>
          <Typography variant="body2" color="info.contrastText">
            Complete accessibility setup loaded from data source including:
          </Typography>
          <ul style={{ color: 'white', marginTop: '8px' }}>
            <li>Semantic role attribute</li>
            <li>ARIA label for screen readers</li>
            <li>ARIA described-by relationships</li>
            <li>Test automation identifiers</li>
          </ul>
        </Container>

      </Box>
    </QwickApp>
  ),
};

// === PLAYGROUND STORY ===

export const Playground: Story = {
  args: {
    span: 6,
    padding: 'medium',
    background: '#ffffff',
    textAlign: 'center',
    className: 'playground-example',
  },
  render: (args) => (
    <Container {...args}>
      <Typography variant="h5" gutterBottom>Interactive Playground</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Use the Controls panel below to experiment with all ViewSchema properties.
        This playground lets you test different combinations of:
      </Typography>
      <ul style={{ textAlign: 'left', margin: '16px 0' }}>
        <li>Grid layout (span and responsive breakpoints)</li>
        <li>Dimensions (width, height, constraints)</li>
        <li>Spacing (padding, margin with t-shirt sizes)</li>
        <li>Backgrounds (colors, gradients, images)</li>
        <li>Styling (className, textAlign)</li>
        <li>Accessibility attributes</li>
      </ul>
      <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
        Modify the controls to see real-time changes to this component!
      </Typography>
    </Container>
  ),
};

/**
 * SerializationDemo - Demonstrates container component serialization with children
 */
export const SerializationDemo: StoryObj<typeof Container> = {
  render: makeSerializationStory(() => (
    <Container 
      background="linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
      padding="large"
      textAlign="center"
      sx={{ borderRadius: '8px', boxShadow: 3 }}
    >
      <Text content="Container with Serializable Children" variant="h5" />
      <Text content="This container demonstrates serialization with nested registered components." variant="body1" />
      <Button label="Nested Button" variant="outlined" />
      <Text content="All children are registered components that serialize correctly." variant="caption" />
    </Container>
  )),
  parameters: {
    docs: {
      description: {
        story: 'Shows how Container components with nested children are serialized and deserialized. Uses only registered components (Text, Button) to ensure proper serialization.',
      },
    },
  },
};