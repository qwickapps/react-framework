/**
 * FormBlock - Reusable form layout component with serialization support
 * 
 * Features:
 * - Complete form layout with header, content, and footer
 * - Status message handling (info, success, warning, error)
 * - Cover image and logo integration
 * - Data binding support for dynamic content
 * - Full serialization support via ModelView
 * - Consistent Material-UI styling
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React, { ReactElement } from 'react';
import {
  Alert,
  Box,
  Card,
  CardContent,
  Container,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import type { SchemaProps, WithDataBinding } from '@qwickapps/schema';
import { useQwickApp } from '../../contexts/QwickAppContext';
import { QWICKAPP_COMPONENT, useBaseProps, useDataBinding } from '../../hooks';
import FormBlockModel from '../../schemas/FormBlockSchema';
import { ModelView } from '../base/ModelView';
import CoverImageHeader from '../blocks/CoverImageHeader';
import Logo from '../Logo';

type FormBlockViewProps = SchemaProps<FormBlockModel> & {
  /**
   * Custom header content - when provided, overrides the default header
   * For full customization control
   */
  header?: React.ReactNode;

  /**
   * Cover image URL or React element for the default header (ignored if custom header is provided)
   * If not provided, will use Logo component with app name
   */
  coverImage?: string | React.ReactNode;

  /**
   * Form content
   */
  children?: React.ReactNode;

  /**
   * Footer content (links, additional text, etc.)
   */
  footer?: React.ReactNode;
};

export interface FormBlockProps extends FormBlockViewProps, WithDataBinding {} 

/**
 * Default header component that uses CoverImageHeader and Logo
 */
const DefaultHeader: React.FC<{
  title?: string;
  subtitle?: string;
  coverImage?: string | React.ReactNode;
}> = ({
  title,
  subtitle,
  coverImage
}) => {
    const { appName } = useQwickApp();

    // Create image element - either coverImage (URL or React element) or Logo component
    const image = coverImage ? (
      coverImage
    ) : (
      <Logo
        name={appName || 'Qwick Apps'}
        size="medium"
        variant="default"
      />
    );

    return (
      <CoverImageHeader
        image={image}
        imageSize="medium"
        imageShape="square"
        title={title || 'Welcome'}
        subtitle={subtitle}
        variant="default"
      />
    );
  };

// View component - handles the actual rendering
function FormBlockView({
  header,
  title,
  description,
  coverImage,
  children: form,
  footer,
  status,
  message,
  maxWidth = 'sm',
  background = '--theme-surface',
  backgroundImage,
  ...restProps
}: FormBlockViewProps) {
  const { styleProps, htmlProps } = useBaseProps(restProps);
  const theme = useTheme();

  // Return empty state if no form content
  if (!form) {
    return (
      <Paper
        {...htmlProps}
        {...styleProps}
        variant="outlined"
        sx={{
          p: 3,
          textAlign: 'center',
          opacity: 0.6,
          ...styleProps.sx
        }}
      >
        <Typography variant="body2" color="text.secondary">
          No form content provided
        </Typography>
      </Paper>
    );
  }

  const getBackgroundStyle = () => {
    switch (background) {
      case 'gradient':
        return {
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        };
      case 'image':
        return backgroundImage ? {
          backgroundImage: `linear-gradient(${theme.palette.action.hover}, ${theme.palette.action.hover}), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        } : {};
      default:
        return {
          backgroundColor: theme.palette.background.default,
        };
    }
  };

  return (
    <Box
      {...htmlProps}
      {...styleProps}
      className={`${styleProps.className || ''}`}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 3,
        ...getBackgroundStyle(),
        ...styleProps.sx,
      }}
    >
      <Container maxWidth={maxWidth}>
        <Card
          elevation={background === 'default' ? 1 : 8}
          sx={{
            borderRadius: 3,
            overflow: 'hidden', // Changed from 'visible' to 'hidden' to clip the corners
            backgroundColor: background === 'default'
              ? theme.palette.background.paper
              : theme.palette.mode === 'dark'
                ? 'rgba(18, 18, 18, 0.95)' // Dark mode background with transparency
                : 'rgba(255, 255, 255, 0.95)', // Light mode background with transparency
            backdropFilter: background !== 'default' ? 'blur(10px)' : 'none',
          }}
        >
          {/* Header Section - Outside CardContent for edge-to-edge */}
          {header || (title || description) ? (
            header || (
              <DefaultHeader
                title={title}
                subtitle={description}
                coverImage={coverImage}
              />
            )
          ) : null}

          <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>

            {/* Status Message */}
            {status && message && (
              <Alert
                severity={status}
                sx={{ mb: 3 }}
                variant="outlined"
              >
                {message}
              </Alert>
            )}

            {/* Form Section */}
            <Box sx={{ mb: footer ? 3 : 0 }}>
              {form}
            </Box>

            {/* Footer Section */}
            {footer && (
              <Box sx={{ textAlign: 'center' }}>
                {footer}
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

// Main component with data binding support and serialization capability
export class FormBlock extends ModelView<FormBlockProps> {
  // Component self-declaration for serialization
  static readonly tagName = 'FormBlock';
  static readonly version = '1.0.0';
  
  // Deserialization: JSON data → React element
  static fromJson(jsonData: unknown): ReactElement {
    return <FormBlock {...(jsonData as Record<string, unknown>)} />;
  }
  
  // FormBlock components have nested ReactNode children (form content)
  protected hasNestedComponents(_children: React.ReactNode): boolean {
    // FormBlock may contain other serializable components as children
    return true;
  }

  // Custom children serialization for FormBlock
  protected serializeChildren(children: React.ReactNode): unknown {
    // For FormBlock, children represent the form content which could be other components
    // We need to handle this properly by checking if children contain serializable components
    interface SerializableType {
      prototype?: { toJson?: unknown };
      fromJson?: unknown;
      tagName?: string;
    }

    if (React.isValidElement(children) && (children.type as SerializableType).prototype?.toJson) {
      // If it's a serializable component, serialize it
      const childType = children.type as SerializableType;
      return childType.fromJson ? {
        component: childType.tagName,
        props: children.props
      } : children;
    }

    // For non-serializable children (regular JSX), extract text or return as-is
    return super.serializeChildren(children);
  }
  
  // Component-specific serialization properties
  protected getComponentSpecificProps(): unknown {
    return {
      title: this.props.title,
      description: this.props.description,
      status: this.props.status,
      message: this.props.message,
      maxWidth: this.props.maxWidth,
      background: this.props.background,
      backgroundImage: this.props.backgroundImage,
      // header, coverImage, footer are ReactNode (handled by base serialization if needed)
      // children is handled by serializeChildren override
    };
  }

  // FormBlock component renders traditional props view
  protected renderView(): React.ReactElement {
    const { dataSource: _dataSource, bindingOptions: _bindingOptions, ...restProps } = this.props;
    return <FormBlockView {...restProps} />;
  }

  // FormBlock component renders data-bound view
  protected renderWithDataBinding(): React.ReactElement {
    return <FormBlockWithDataBinding {...this.props} />;
  }
}

// Helper component to handle data binding with hooks (since we can't use hooks in class components)
function FormBlockWithDataBinding(props: FormBlockProps) {
  const { dataSource, bindingOptions, ...restProps } = props;

  // Use data binding
  const { loading, error, ...formBlockProps } = useDataBinding<FormBlockModel>(
    dataSource!,
    restProps as Partial<FormBlockModel>
  );

  // Show loading state
  if (loading) {
    return (
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          textAlign: 'center'
        }}
      >
        <Typography variant="body2">Loading Form...</Typography>
        <Typography variant="caption" color="text.secondary">
          Loading form content from data source...
        </Typography>
      </Paper>
    );
  }

  if (error) {
    console.error('Error loading form block:', error);
    if (process.env.NODE_ENV !== 'production') {
      return (
        <Paper
          variant="outlined"
          sx={{
            p: 3,
            textAlign: 'center',
            borderColor: 'error.main'
          }}
        >
          <Typography variant="body2" color="error">
            Error loading form: {error.message}
          </Typography>
        </Paper>
      );
    }
    return null;
  }

  return <FormBlockView {...formBlockProps} />;
}

// Mark as QwickApp component
Object.assign(FormBlock, { [QWICKAPP_COMPONENT]: true });

export default FormBlock;