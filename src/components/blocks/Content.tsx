'use client';

/**
 * Content Component - General-purpose content container with data binding support
 *
 * Usage:
 * - Traditional: <Content title="Welcome" subtitle="Get started" actions={[...]} />
 * - Data-driven: <Content dataSource="pages.home.intro" />
 *
 * Features:
 * - Optional title, subtitle, and actions
 * - Variant styles: default, elevated, outlined, filled
 * - Responsive spacing, max width, and alignment
 * - Theme-aware and flexible for layouts
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Box, Stack, SxProps, Theme, Typography, useTheme, Paper } from '@mui/material';
import { WithDataBinding, SchemaProps } from '@qwickapps/schema';
import React from 'react';
import { QWICKAPP_COMPONENT, useBaseProps, useDataBinding } from '../../hooks';
import ContentModel from '../../schemas/ContentSchema';
import type { BreakpointValue } from '../../types';
import { mapToMUIBreakpoint } from '../../utils/breakpoints';
import { Button } from '../buttons/Button';
import Html from '../Html';

type ContentViewProps = SchemaProps<ContentModel>;

export interface ContentProps extends ContentViewProps, WithDataBinding {}

function ContentView({
  title,
  subtitle,
  children,
  actions = [],
  variant = 'default',
  blockSpacing = 'comfortable',
  contentMaxWidth = 'md',
  centered = false,
  ...restProps
}: ContentViewProps) {
  const { styleProps, htmlProps, restProps: otherProps } = useBaseProps(restProps);
  const theme = useTheme();

  // Mark as QwickApp component
  (ContentView as Record<string, unknown>)[QWICKAPP_COMPONENT] = true;

  // Map spacing to padding values
  const getPadding = () => {
    switch (blockSpacing) {
      case 'none':
        return 0;
      case 'compact':
        return 2; // 16px
      case 'comfortable':
        return 3; // 24px
      case 'spacious':
        return 4; // 32px
      default:
        return 3;
    }
  };

  // Compute stable wrapper element (avoid recreating component type each render which caused remount & focus loss)
  const paddingValue = getPadding();
  const mappedMaxWidth = mapToMUIBreakpoint(contentMaxWidth === 'false' ? false : contentMaxWidth as BreakpointValue);
  const commonSx: SxProps<Theme> = {
    textAlign: centered ? 'center' : 'left',
    maxWidth: mappedMaxWidth !== false ? theme.breakpoints.values[mappedMaxWidth] : '100%',
    width: '100%',
    ...(centered && contentMaxWidth && { mx: 'auto' }),
    p: paddingValue,
    ...styleProps.sx,
  };

  let Wrapper: React.ElementType = Box;
  let wrapperProps: Record<string, unknown> = { ...htmlProps, ...otherProps, sx: commonSx };
  if (variant === 'elevated') {
    Wrapper = Paper;
    wrapperProps = { ...wrapperProps, elevation: 4, sx: { ...commonSx, backgroundColor: theme.palette.background.paper } };
  } else if (variant === 'outlined') {
    Wrapper = Paper;
    wrapperProps = { ...wrapperProps, variant: 'outlined', elevation: 0, sx: { ...commonSx, backgroundColor: 'var(--theme-surface)', borderColor: 'var(--theme-border-main)', borderWidth: 1, borderStyle: 'solid' } };
  } else if (variant === 'filled') {
    Wrapper = Box;
    wrapperProps = { ...wrapperProps, sx: { ...commonSx, backgroundColor: 'var(--theme-surface-variant)', borderRadius: 1 } };
  }

  return (
    <Wrapper {...wrapperProps}>
      <Stack spacing={2}>
        {/* Header */}
        {(title || subtitle) && (
          <Box>
            {title && (
              <Typography 
                variant="h4" 
                component="h2" 
                gutterBottom={Boolean(subtitle)}
                sx={{ 
                  fontWeight: 600,
                  ...(centered && { textAlign: 'center' })
                }}
              >
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography 
                variant="h6" 
                color="text.secondary"
                sx={{ 
                  ...(centered && { textAlign: 'center' })
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
        )}

        {/* Content */}
        {children && (
          <Box sx={{ 
            '& > *:not(:last-child)': { mb: 2 },
            ...(centered && { textAlign: 'center' })
          }}>
            {typeof children === 'string' ? (
              // Use Html component for string content (from data binding)
              <Html>{children}</Html>
            ) : (
              // Use React nodes directly (traditional usage)
              children
            )}
          </Box>
        )}

        {/* Actions */}
        {actions.length > 0 && (
          <Stack 
            direction="row" 
            spacing={2} 
            sx={{
              ...(centered && { 
                justifyContent: 'center',
                alignItems: 'center' 
              }),
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            {actions.map((action, index) => (
              <Button 
                key={`action-${index}`}
                {...action}
              />
            ))}
          </Stack>
        )}
      </Stack>
  </Wrapper>
  );
}

function Content(props: ContentProps) {
  const { dataSource, bindingOptions, ...restProps } = props;

  // Always call hooks unconditionally
  const bindingResult = useDataBinding<ContentModel>(
    dataSource || '',
    restProps as Partial<ContentModel>,
    ContentModel.getSchema(),
    { cache: true, cacheTTL: 300000, strict: false, ...bindingOptions }
  );

  // If no dataSource, use traditional props
  if (!dataSource) {
    return <ContentView {...restProps} />;
  }

  // Use data binding result
  const { loading, error, ...contentProps } = bindingResult;

  // Show loading state
  if (loading) {
    return (
      <ContentView
        {...restProps}
        title="Loading Content..."
        variant="default"
        blockSpacing="comfortable"
      />
    );
  }

  if (error) {
    console.error('Error loading content:', error);
    if (process.env.NODE_ENV !== 'production') {
      return (
        <ContentView
          {...restProps}
          title="Error Loading Content"
          subtitle={error.message}
          variant="default"
          blockSpacing="comfortable"
        />
      );
    }
    return null;
  }

  return <ContentView {...contentProps} />;
}

export default Content;
export { Content };
