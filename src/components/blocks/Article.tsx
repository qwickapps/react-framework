'use client';

/**
 * Article - Transforms HTML content to use framework components with data binding support
 *
 * Automatically transforms:
 * - <pre><code> blocks to Code components with syntax highlighting
 * - Complex <code> elements to Code components
 * - <section class="blog-section"> to Section components
 * - Other framework-compatible elements
 * - Preserves all other HTML structure and attributes
 *
 * Supports both traditional props and data binding through dataSource.
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Box, Typography } from '@mui/material';
import { WithDataBinding, SchemaProps } from '@qwickapps/schema';
import React from 'react';
import { QWICKAPP_COMPONENT, useBaseProps, useDataBinding } from '../../hooks';
import ArticleModel from '../../schemas/ArticleSchema';
import { ModelView } from '../base/ModelView';
import Html from '../Html';

type ArticleViewProps = SchemaProps<ArticleModel>;

export interface ArticleProps extends ArticleViewProps, WithDataBinding {
}



// View component - handles the actual rendering
function ArticleView({
  html = '',
  skipHeader = false,
  ...restProps
}: ArticleViewProps) {
  const { styleProps, htmlProps, restProps: otherProps } = useBaseProps(restProps);

  // Mark as QwickApp component
  Object.assign(ArticleView, { [QWICKAPP_COMPONENT]: true });

  // Return empty state if no HTML content
  if (!html.trim()) {
    return (
      <Box
        component="article"
        {...htmlProps}
        {...styleProps}
        sx={{
          maxWidth: '800px',
          mx: 'auto',
          p: 4,
          textAlign: 'center',
          opacity: 0.6,
          ...styleProps.sx
        }}
      >
        <Typography variant="h6" color="var(--theme-text)">
          No Content Available
        </Typography>
        <Typography variant="body2" color="var(--theme-text)">
          No HTML content provided for this article
        </Typography>
      </Box>
    );
  }

  return (
    <Html
      component="article"
      stripHeaders={skipHeader}
      placeholder="No content available"
      {...htmlProps}
      {...otherProps}
      {...styleProps}
      {...{
        // Modern article layout
        maxWidth: '900px',
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 3, md: 5 },

        // Typography - Modern, readable hierarchy
        '& h1, & h2, & h3, & h4, & h5, & h6': {
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'var(--theme-text)',
          scrollMarginTop: '100px', // For anchor links
          '&:first-of-type': {
            mt: 0
          }
        },
        '& h1': {
          fontSize: { xs: '2rem', md: '2.75rem' },
          lineHeight: 1.15,
          mb: 3,
          mt: 5
        },
        '& h2': {
          fontSize: { xs: '1.5rem', md: '2rem' },
          lineHeight: 1.25,
          mb: 2.5,
          mt: 5,
          pb: 1.5,
          borderBottom: '1px solid var(--theme-border-lighter)'
        },
        '& h3': {
          fontSize: { xs: '1.25rem', md: '1.5rem' },
          lineHeight: 1.3,
          mb: 2,
          mt: 4
        },
        '& h4': {
          fontSize: { xs: '1.1rem', md: '1.25rem' },
          lineHeight: 1.4,
          mb: 1.5,
          mt: 3,
          color: 'var(--theme-text)',
          fontWeight: 600
        },

        // Body text - Optimized for reading
        '& p': {
          fontSize: { xs: '1rem', md: '1.0625rem' },
          lineHeight: 1.75,
          mb: 2,
          color: 'var(--theme-text)',
          fontFamily: 'Georgia, "Times New Roman", serif',
          '&:last-child': {
            mb: 0
          }
        },

        // Lists - Better visual hierarchy
        '& ul, & ol': {
          mb: 3,
          pl: { xs: 3, md: 4 },
          '& li': {
            mb: 1.25,
            lineHeight: 1.7,
            fontSize: { xs: '1rem', md: '1.0625rem' },
            color: 'var(--theme-text)',
            fontFamily: 'Georgia, "Times New Roman", serif',
            '&::marker': {
              color: 'var(--theme-primary)',
              fontWeight: 600
            },
            '& p': {
              mb: 0.5
            }
          },
          '& ul, & ol': {
            mt: 1,
            mb: 0
          }
        },

        // Code blocks - Modern syntax highlighting style
        '& pre': {
          backgroundColor: 'var(--theme-surface-elevated)',
          color: 'var(--theme-text)',
          borderRadius: 'var(--theme-border-radius)',
          p: { xs: 2, md: 3 },
          mb: 3,
          overflow: 'auto',
          fontSize: '0.9rem',
          lineHeight: 1.6,
          fontFamily: '"Fira Code", "Cascadia Code", "SF Mono", Monaco, Consolas, monospace',
          border: '1px solid var(--theme-border-light)',
          boxShadow: 'var(--theme-elevation-2)',
          '& code': {
            backgroundColor: 'transparent',
            color: 'inherit',
            padding: 0,
            fontSize: 'inherit',
            fontFamily: 'inherit'
          }
        },

        // Inline code - Subtle highlight
        '& code': {
          backgroundColor: 'var(--theme-code-bg)',
          color: 'var(--theme-error)',
          padding: '0.2em 0.4em',
          borderRadius: 'var(--theme-border-radius-small)',
          fontSize: '0.9em',
          fontFamily: '"Fira Code", "Cascadia Code", "SF Mono", Monaco, Consolas, monospace',
          fontWeight: 500
        },

        // Blockquotes - Elegant callouts
        '& blockquote': {
          borderLeft: '4px solid var(--theme-primary)',
          backgroundColor: 'var(--theme-surface-variant)',
          borderRadius: `0 var(--theme-border-radius-small) var(--theme-border-radius-small) 0`,
          pl: 3,
          pr: 3,
          py: 2.5,
          my: 4,
          ml: 0,
          mr: 0,
          '& p': {
            fontSize: { xs: '1.05rem', md: '1.125rem' },
            fontStyle: 'italic',
            lineHeight: 1.6,
            mb: 1.5,
            color: 'var(--theme-text)',
            '&:last-child': {
              mb: 0
            }
          },
          '& cite': {
            display: 'block',
            fontSize: '0.9rem',
            fontStyle: 'normal',
            fontWeight: 500,
            color: 'var(--theme-text)',
            mt: 1,
            '&::before': {
              content: '"— "',
              color: 'var(--theme-primary)'
            }
          }
        },

        // Tables - Clean, modern design
        '& table': {
          width: '100%',
          borderCollapse: 'separate',
          borderSpacing: 0,
          mb: 3,
          fontSize: '0.95rem',
          overflow: 'hidden',
          borderRadius: 'var(--theme-border-radius-small)',
          border: '1px solid var(--theme-border-light)',
          '& thead': {
            backgroundColor: 'var(--theme-surface-variant)',
            '& th': {
              padding: '12px 16px',
              textAlign: 'left',
              fontWeight: 600,
              color: 'var(--theme-text)',
              borderBottom: '2px solid var(--theme-border-main)',
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }
          },
          '& tbody': {
            '& tr': {
              borderBottom: '1px solid var(--theme-border-lighter)',
              transition: 'background-color 0.2s ease',
              '&:hover': {
                backgroundColor: 'var(--theme-surface-variant)'
              },
              '&:last-child': {
                borderBottom: 'none'
              }
            },
            '& td': {
              padding: '12px 16px',
              color: 'var(--theme-text)',
              lineHeight: 1.6
            }
          }
        },

        // Text emphasis
        '& strong': {
          fontWeight: 700,
          color: 'var(--theme-text)'
        },
        '& em': {
          fontStyle: 'italic',
          color: 'var(--theme-text)'
        },

        // Links - Modern, accessible
        '& a': {
          color: 'var(--theme-primary)',
          textDecoration: 'none',
          fontWeight: 500,
          borderBottom: '1px solid transparent',
          transition: 'border-color 0.2s ease',
          '&:hover': {
            borderBottomColor: 'var(--theme-primary)'
          },
          '&:focus-visible': {
            outline: '2px solid var(--theme-primary)',
            outlineOffset: '2px',
            borderRadius: '2px'
          }
        },

        // Images and figures
        '& img': {
          maxWidth: '100%',
          height: 'auto',
          borderRadius: 'var(--theme-border-radius-small)',
          display: 'block',
          my: 3
        },
        '& figure': {
          margin: '3rem 0',
          '& img': {
            maxWidth: '100%',
            height: 'auto',
            borderRadius: 'var(--theme-border-radius-small)',
            boxShadow: 'var(--theme-elevation-2)'
          },
          '& figcaption': {
            textAlign: 'center',
            fontSize: '0.875rem',
            color: 'var(--theme-text)',
            mt: 1.5,
            fontStyle: 'italic'
          }
        },

        // Horizontal rules
        '& hr': {
          border: 'none',
          borderTop: '1px solid var(--theme-border-light)',
          my: 5
        },

        ...styleProps.sx
      }}
    >
      {html}
    </Html>
  );
}

// Main component with data binding support and serialization capability
export class Article extends ModelView<ArticleProps> {
  // Component self-declaration for serialization
  static readonly tagName = 'Article';
  static readonly version = '1.0.0';
  
  // Component-specific serialization properties
  protected getComponentSpecificProps(): unknown {
    return {
      html: this.props.html,
      skipHeader: this.props.skipHeader
    };
  }

  // Article component renders traditional props view
  protected renderView(): React.ReactElement {
    const { ...restProps } = this.props;
    return <ArticleView {...restProps} />;
  }

  // Article component renders data-bound view
  protected renderWithDataBinding(): React.ReactElement {
    return <ArticleWithDataBinding {...this.props} />;
  }

  // Register HTML patterns that Article component can handle
  static registerPatternHandlers(registry: unknown): void {
    const typedRegistry = registry as { hasPattern?: (pattern: string) => boolean; registerPattern?: (pattern: string, handler: (element: Element) => Record<string, unknown>) => void };

    // Register article elements
    if (typedRegistry.hasPattern && !typedRegistry.hasPattern('article')) {
      typedRegistry.registerPattern?.('article', Article.transformArticle);
    }
  }

  // Transform article elements to Article component
  private static transformArticle(element: Element): Record<string, unknown> {
    const skipHeader = element.getAttribute('data-skip-header') === 'true';
    
    return {
      tagName: 'Article',
      props: {
        html: element.innerHTML,
        skipHeader
      }
    };
  }
}

// Helper component to handle data binding with hooks (since we can't use hooks in class components)
function ArticleWithDataBinding(props: ArticleProps) {
  const { dataSource, bindingOptions, ...restProps } = props;

  // Use data binding
  const { loading, error, ...articleProps } = useDataBinding<ArticleModel>(
    dataSource!,
    restProps as Partial<ArticleModel>
  );

  // Show loading state
  if (loading) {
    return (
      <Box
        component="article"
        sx={{
          maxWidth: '800px',
          mx: 'auto',
          p: 4,
          textAlign: 'center'
        }}
      >
        <Typography variant="h6">Loading Article...</Typography>
        <Typography variant="body2" color="var(--theme-text)">
          Loading
        </Typography>
      </Box>
    );
  }

  if (error) {
    console.error('Error loading article:', error);
    if (process.env.NODE_ENV !== 'production') {
      return (
        <Box
          component="article"
          sx={{
            maxWidth: '800px',
            mx: 'auto',
            p: 4,
            textAlign: 'center'
          }}
        >
          <Typography variant="h6">Error Loading Article</Typography>
          <Typography variant="body2" color="var(--theme-text)">
            {error.message}
          </Typography>
        </Box>
      );
    }
    return null;
  }

  return <ArticleView {...articleProps} />;
}

export default Article;
