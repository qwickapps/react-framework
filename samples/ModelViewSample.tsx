/**
 * Example: How to use the updated ModelView class with ViewSchema
 * 
 * This example shows how concrete components should extend the ModelView
 * class to get automatic ViewSchema prop processing.
 */

import React from 'react';
import { Box } from '@mui/material';
import { ModelView, ProcessedProps } from '../src/components/base/ModelView';
import { SchemaProps } from '@qwickapps/schema';
import ViewSchema from '../src/schemas/ViewSchema';

// Example 1: Simple Button Component
interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary';
}

class Button extends ModelView<ButtonProps> {
  static readonly tagName = 'Button';
  static readonly version = '2.0.0';

  protected getComponentSpecificProps(): any {
    return {
      label: this.props.label,
      variant: this.props.variant,
    };
  }

  protected renderView(): React.ReactElement {
    const { gridProps, styleProps, htmlProps, restProps } = this.getProcessedProps();
    
    return (
      <Box
        component="button"
        {...htmlProps}      // id, aria-*, data-*, onClick, etc.
        {...styleProps}     // className, sx, style
        {...restProps}      // spacing, dimensions, background, textAlign
        sx={{
          ...styleProps.sx,
          // Button-specific styling
          cursor: 'pointer',
          border: 'none',
          borderRadius: 1,
          bgcolor: this.props.variant === 'primary' ? 'primary.main' : 'secondary.main',
          color: 'white',
          ...restProps, // Apply spacing, dimensions, etc.
        }}
      >
        {this.props.label}
      </Box>
    );
  }

  protected renderWithDataBinding(): React.ReactElement {
    // Data binding implementation - for now, just render normally
    return this.renderView();
  }
}

// Example 2: Card Component with Children
interface CardProps {
  title?: string;
  elevation?: number;
}

class Card extends ModelView<CardProps> {
  static readonly tagName = 'Card';
  static readonly version = '2.0.0';

  protected getComponentSpecificProps(): any {
    return {
      title: this.props.title,
      elevation: this.props.elevation,
    };
  }

  protected renderView(): React.ReactElement {
    const { gridProps, styleProps, htmlProps, restProps } = this.getProcessedProps();
    
    return (
      <Box
        {...htmlProps}
        {...styleProps}
        sx={{
          ...styleProps.sx,
          // Card-specific styling
          borderRadius: 2,
          boxShadow: this.props.elevation || 1,
          p: 2,
          ...restProps, // Apply ViewSchema spacing, dimensions, background, etc.
        }}
      >
        {this.props.title && (
          <Box component="h3" sx={{ mt: 0, mb: 1 }}>
            {this.props.title}
          </Box>
        )}
        {this.props.children}
      </Box>
    );
  }

  protected renderWithDataBinding(): React.ReactElement {
    return this.renderView();
  }
}

// Usage Examples:

// Example usage with ViewSchema props
export function ExampleUsage() {
  return (
    <div>
      {/* Button with ViewSchema props */}
      <Button
        label="Click Me"
        variant="primary"
        // ViewSchema props
        padding="medium"
        margin="small"
        xs="12"
        sm="6" 
        background="primary.dark"
        onClick="function(event) { console.log('Button clicked!'); }"
        role="button"
        aria-label="Primary action button"
        data-testid="action-button"
      />

      {/* Card with ViewSchema props */}
      <Card
        title="My Card"
        elevation={3}
        // ViewSchema props  
        padding="large"
        background="surface.main"
        xs="12"
        md="6"
        lg="4"
        minHeight="medium"
        className="custom-card"
        role="article"
        aria-label="Information card"
      >
        <p>This is card content that gets all ViewSchema styling applied automatically.</p>
      </Card>
    </div>
  );
}

// What the ModelView class provides to subclasses:
//
// 1. **ProcessedProps** via getProcessedProps():
//    - gridProps: { span, xs, sm, md, lg, xl }
//    - styleProps: { className, sx, style }
//    - htmlProps: { id, role, aria-*, data-*, onClick, onMouseEnter, etc. }
//    - restProps: { spacing, dimensions, background, textAlign }
//
// 2. **Automatic Conversion**:
//    - Grid props: "6" → 6, "auto" → "auto"
//    - JSON strings: '{"color": "red"}' → {color: "red"}
//    - Event handlers: "console.log('click')" → function
//
// 3. **Serialization Support**:
//    - toJson() method automatically includes all ViewSchema props
//    - fromJson() static method for reconstruction
//
// 4. **Data Binding Ready**:
//    - renderWithDataBinding() method for CMS integration
//    - dataSource and bindingOptions support

export { Button, Card };