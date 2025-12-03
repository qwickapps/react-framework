/**
 * ModelView Base Component Stories - Standardized serialization architecture
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Box, Typography, Alert, Paper } from '@mui/material';
import { JsonDataProvider } from '@qwickapps/schema';
import type { Meta, StoryObj } from '@storybook/react';
import { Code } from '../components/blocks';
import Section from '../components/blocks/Section';
import { Button } from '../components/buttons/Button';
import { ComponentTransformer } from '../schemas/transformers/ComponentTransformer';
import { ModelView } from '../components/base/ModelView';
import QwickApp from '../components/QwickApp';
import React from 'react';

// Sample data for ModelView demonstrations
const sampleData = {
  'modelview': {
    'code-example': {
      language: 'typescript',
      title: 'modelview-example.ts',
      showLineNumbers: true,
      showCopy: true,
      children: `// ModelView base class provides standardized serialization
class Code extends ModelView<CodeProps, CodeModel> {
  static readonly tagName = 'Code';
  static readonly version = '1.0.0';
  
  protected getComponentSpecificProps(): unknown {
    return {
      language: this.props.language,
      showCopy: this.props.showCopy,
      showLineNumbers: this.props.showLineNumbers,
      title: this.props.title
    };
  }
}`
    },
    'section-example': {
      background: '#f0f8ff',
      padding: 'medium',
      contentMaxWidth: 'lg',
      component: 'section'
    },
    'button-example': {
      label: 'ModelView Button',
      variant: 'primary',
      action: { type: 'navigate', url: '/modelview' }
    }
  }
};

const dataProvider = new JsonDataProvider({ data: sampleData });

const meta = {
  title: 'Architecture/ModelView',
  component: ModelView,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `ModelView is the abstract base class for all serializable QwickApps components, providing standardized serialization patterns and eliminating code duplication.

**Core Architecture Principles:**
- **Single Source of Truth**: All components inherit common serialization behavior
- **Standardized API**: Consistent toJson/fromJson patterns across all components
- **Data Binding Integration**: Automatic CMS integration with loading states and error handling
- **Type Safety**: Strong typing for component props, models, and serialization data
- **"WebView for React"**: Enables complete UI serialization and reconstruction

**Key Features:**
- **Common Base Props**: Automatic handling of children, dataSource, bindingOptions, className, id
- **Component-Specific Extensions**: Hook for components to add their specific serialization properties
- **Nested Component Support**: Specialized handling for components with nested children (like Section)
- **Action Pattern Support**: Serializable behavior patterns for interactive components (like Button)
- **Render Pattern Standardization**: Common render logic for data-bound vs traditional prop usage

**Benefits:**
- **Code Deduplication**: Common patterns implemented once and inherited by all components
- **Consistency**: All components serialize/deserialize with identical patterns
- **Maintainability**: Changes to base behavior automatically apply to all components
- **Testing**: Unified test patterns for serialization across the entire component library`,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ModelView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ArchitectureOverview: Story = {
  render: () => (
    <QwickApp appId="modelview-architecture" appName='ModelView Architecture Overview'>
      <Box>
        
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h2" gutterBottom>ModelView Architecture Pattern</Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.7 }}>
            The foundation for standardized component serialization in QwickApps React Framework
          </Typography>
          
          <Alert severity="info" sx={{ mb: 4, textAlign: 'left' }}>
            ModelView is an abstract base class that eliminates code duplication across QwickApps components
            by providing common serialization, data binding, and rendering patterns. Every serializable
            component (Code, Section, Button) extends ModelView to inherit standardized behavior.
          </Alert>
        </Box>
        
        {/* Core Architecture */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" gutterBottom>Core Architecture</Typography>
          <Code language="typescript" title="ModelView.ts" showLineNumbers={true}>
            {`// Abstract base class for all serializable components
export abstract class ModelView<TProps, TModel> 
  extends React.Component<TProps & WithDataBinding> 
  implements Serializable {
  
  // Component metadata (overridden by subclasses)
  static readonly tagName: string;
  static readonly version: string;
  
  // Common serialization implementation
  toJson(): unknown {
    return {
      ...this.getBaseSerializableProps(),
      ...this.getComponentSpecificProps()
    };
  }
  
  // Base props all components serialize
  protected getBaseSerializableProps(): unknown {
    return {
      children: this.serializeChildren(this.props.children),
      dataSource: this.props.dataSource,
      bindingOptions: this.props.bindingOptions,
      className: this.props.className,
      id: this.props.id
    };
  }
  
  // Hook for component-specific props (implemented by subclasses)
  protected abstract getComponentSpecificProps(): unknown;
  
  // Common render pattern
  render() {
    return this.props.dataSource 
      ? this.renderWithDataBinding() 
      : this.renderView();
  }
}`}
          </Code>
        </Box>
        
        {/* Implementation Pattern */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" gutterBottom>Component Implementation Pattern</Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
            Every QwickApps component follows this standardized pattern when extending ModelView
          </Typography>
          <Code language="typescript" title="ComponentImplementation.ts" showLineNumbers={true}>
            {`// Example: Code component implementation
export class Code extends ModelView<CodeProps, CodeModel> {
  // Required: Component identification
  static readonly tagName = 'Code';
  static readonly version = '1.0.0';
  
  // Required: Deserialization factory method
  static fromJson(jsonData: unknown): ReactElement {
    return <Code {...jsonData} />;
  }
  
  // Required: Component-specific serialization properties
  protected getComponentSpecificProps(): unknown {
    return {
      language: this.props.language,
      showCopy: this.props.showCopy,
      showLineNumbers: this.props.showLineNumbers,
      title: this.props.title,
      wrapLines: this.props.wrapLines,
      codeBackground: this.props.codeBackground
    };
  }
  
  // Required: Traditional props rendering
  protected renderView(): React.ReactElement {
    const { dataSource, bindingOptions, ...restProps } = this.props;
    return <CodeView {...restProps} />;
  }
  
  // Required: Data-bound rendering
  protected renderWithDataBinding(): React.ReactElement {
    return <CodeWithDataBinding {...this.props} />;
  }
}`}
          </Code>
        </Box>
        
        {/* Benefits Grid */}
        <Box sx={{ p: 4, backgroundColor: 'primary.light', color: 'primary.contrastText', borderRadius: 2 }}>
          <Typography variant="h3" gutterBottom>ModelView Benefits</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' }, gap: 4, mt: 4 }}>
            <Box>
              <Typography variant="h6" gutterBottom>Code Deduplication</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Common serialization logic implemented once, inherited by all components. No repetitive boilerplate.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>Consistency</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                All components serialize/deserialize with identical patterns. Predictable behavior across the framework.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>Maintainability</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Changes to base behavior automatically apply to all components. Single point of maintenance.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>Data Binding</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Automatic CMS integration with loading states, error handling, and fallback support built-in.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>Type Safety</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Strong typing for component props, models, and serialization data structures throughout.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>WebView Ready</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Complete "WebView for React" functionality - UI can be dynamically generated from data.
              </Typography>
            </Box>
          </Box>
        </Box>
        
      </Box>
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive overview of the ModelView architecture pattern and its benefits.',
      },
    },
  },
};

export const SerializationWorkflow: Story = {
  render: () => {
    // Create a complex component structure
    const complexStructure = (
      <Section background="#f5f5f5" padding="large" contentMaxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Complex Component Structure
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          This demonstrates how ModelView handles nested component serialization across different component types.
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 4 }}>
          <Box>
            <Typography variant="h6" gutterBottom>Code Example</Typography>
            <Code language="typescript" title="nested-example.ts">
              {`// Nested components within Section
const structure = (
  <Section>
    <Code language="typescript">
      console.log("Nested code");
    </Code>
    <Button action={{ type: 'navigate', url: '/example' }}>
      Click Me
    </Button>
  </Section>
);`}
            </Code>
          </Box>
          <Box>
            <Typography variant="h6" gutterBottom>Interactive Button</Typography>
            <Button 
              label="Navigate Example"
              variant="primary"
              action={{ type: 'navigate', url: '/workflow' }}
            />
          </Box>
        </Box>
      </Section>
    );
    
    // Serialize the entire structure
    const serializedData = ComponentTransformer.serialize(complexStructure);
    const deserializedComponent = ComponentTransformer.deserialize(serializedData);
    const parsedData = JSON.parse(serializedData);
    
    return (
      <QwickApp appId="modelview-serialization-workflow" appName='ModelView Serialization Workflow'>
        <Box>
          
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant="h3" gutterBottom>Complete Serialization Workflow</Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.7 }}>
              Demonstrating full component tree serialization and reconstruction
            </Typography>
          </Box>
          
          {/* Original Structure */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" gutterBottom>Original Component Structure</Typography>
            {complexStructure}
          </Box>
          
          {/* Serialized JSON Preview */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" gutterBottom>Serialized JSON Structure</Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
              Complete component tree serialized to JSON with ModelView metadata preserved
            </Typography>
            <Paper sx={{ p: 2, backgroundColor: 'grey.100', maxHeight: 500, overflow: 'auto' }}>
              <Code language="json" showLineNumbers={true} title="serialized-structure.json">
                {JSON.stringify(parsedData, null, 2)}
              </Code>
            </Paper>
          </Box>
          
          {/* Deserialized Structure */}
          <Box>
            <Typography variant="h4" gutterBottom>Deserialized Component Structure</Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
              Complete component tree reconstructed from JSON with full functionality preserved
            </Typography>
            {deserializedComponent as React.ReactElement}
          </Box>
          
        </Box>
      </QwickApp>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete serialization workflow showing complex component tree serialization and reconstruction.',
      },
    },
  },
};

export const DataBindingIntegration: Story = {
  render: () => (
    <QwickApp appId="modelview-databinding" appName='ModelView Data Binding Integration' dataSource={{ dataProvider }}>
      <Box>
        
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom>Data Binding Integration</Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.7 }}>
            ModelView provides standardized data binding support across all components
          </Typography>
          
          <Alert severity="info" sx={{ mb: 4, textAlign: 'left' }}>
            ModelView includes built-in data binding support that automatically handles CMS integration,
            loading states, error handling, and fallback props. All components extending ModelView
            inherit this functionality without additional implementation.
          </Alert>
        </Box>
        
        {/* Data Binding Examples */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" gutterBottom>Data Binding Examples</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 4 }}>
            
            {/* Code Component */}
            <Box>
              <Typography variant="h5" gutterBottom>Code Component (Data-Bound)</Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 3 }}>
                <Box>
                  <Typography variant="h6" gutterBottom>CMS Data Structure</Typography>
                  <Code language="json" showCopy={false}>
                    {JSON.stringify(sampleData.modelview['code-example'], null, 2)}
                  </Code>
                </Box>
                <Box>
                  <Typography variant="h6" gutterBottom>Rendered Component</Typography>
                  <Code dataSource="modelview.code-example" />
                </Box>
              </Box>
            </Box>
            
            {/* Section Component */}
            <Box>
              <Typography variant="h5" gutterBottom>Section Component (Data-Bound)</Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 3 }}>
                <Box>
                  <Typography variant="h6" gutterBottom>CMS Data Structure</Typography>
                  <Code language="json" showCopy={false}>
                    {JSON.stringify(sampleData.modelview['section-example'], null, 2)}
                  </Code>
                </Box>
                <Box>
                  <Typography variant="h6" gutterBottom>Rendered Component</Typography>
                  <Section dataSource="modelview.section-example">
                    <Typography variant="h6">Data-Bound Section Content</Typography>
                    <Typography variant="body2">
                      This section loads its styling from CMS data while preserving nested content.
                    </Typography>
                  </Section>
                </Box>
              </Box>
            </Box>
            
            {/* Button Component */}
            <Box>
              <Typography variant="h5" gutterBottom>Button Component (Data-Bound)</Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 3 }}>
                <Box>
                  <Typography variant="h6" gutterBottom>CMS Data Structure</Typography>
                  <Code language="json" showCopy={false}>
                    {JSON.stringify(sampleData.modelview['button-example'], null, 2)}
                  </Code>
                </Box>
                <Box>
                  <Typography variant="h6" gutterBottom>Rendered Component</Typography>
                  <Button dataSource="modelview.button-example" />
                </Box>
              </Box>
            </Box>
            
          </Box>
        </Box>
        
        {/* Data Binding Benefits */}
        <Box sx={{ p: 4, backgroundColor: 'success.light', color: 'success.contrastText', borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom>Data Binding Benefits</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mt: 3 }}>
            <Box>
              <Typography variant="h6" gutterBottom>Automatic Integration</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                All ModelView components automatically support data binding without additional implementation.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>Error Handling</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Built-in loading states, error handling, and graceful fallbacks for missing data sources.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>Serialization Preserved</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Data binding configuration is preserved during serialization and deserialization.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>Consistent API</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Identical data binding patterns across all components for predictable behavior.
              </Typography>
            </Box>
          </Box>
        </Box>
        
      </Box>
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates ModelView data binding integration across different component types.',
      },
    },
  },
};