/**
 * HeroBlock Component - Factory-based implementation using createSerializableView
 *
 * Migrated from class-based ModelView to factory pattern for better
 * schema-driven architecture while preserving all functionality.
 *
 * Features:
 * - Responsive headline, subtitle, and actions
 * - Supports background images, gradients, and theme colors
 * - Overlay for image backgrounds
 * - Customizable height, alignment, and overlay opacity
 * - Full serialization support
 * - Nested Button component support
 *
 * Usage:
 * - Traditional: <HeroBlock title="Welcome" subtitle="Get started" actions={[...]} />
 * - Data-driven: <HeroBlock dataSource="pages.home.hero" />
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Box, Container, Stack, useTheme } from '@mui/material';
import React from 'react';
import { createSerializableView, SerializableComponent } from '../shared/createSerializableView';
import { ViewProps } from '../shared/viewProps';
import { Button, ButtonProps } from '../buttons/Button';
import Text from './Text';

/**
 * Props interface for HeroBlock component - extends ViewProps
 */
export interface HeroBlockProps extends ViewProps {
  /** Main headline text */
  title?: string;
  /** Subtitle or description text */
  subtitle?: string;
  /** Background image URL */
  backgroundImage?: string;
  /** Background gradient CSS value */
  backgroundGradient?: string;
  /** Background color theme variant */
  backgroundColor?: 'default' | 'primary' | 'secondary' | 'surface';
  /** Action buttons (data-driven) */
  actions?: ButtonProps[];
  /** Text alignment */
  textAlign?: 'left' | 'center' | 'right';
  /** Block height preset */
  blockHeight?: 'small' | 'medium' | 'large' | 'viewport';
  /** Custom overlay opacity (0-1) when using background images */
  overlayOpacity?: number;
}

/**
 * HeroBlockView - Pure view component that renders the actual hero block
 * 
 * This component receives fully processed props from createSerializableView
 * and renders the hero block using Material-UI components with all styling applied.
 */
function HeroBlockView({
  title = '',
  subtitle,
  backgroundImage,
  backgroundGradient,
  backgroundColor = 'primary',
  actions = [],
  children,
  textAlign = 'center',
  blockHeight = 'medium',
  overlayOpacity = 0.5,
  gridProps,
  ...props
}: HeroBlockProps & { gridProps?: unknown }) {
  const theme = useTheme();

  // Map height variants to actual heights
  const getHeight = () => {
    switch (blockHeight) {
      case 'small':
        return 300;
      case 'medium':
        return 400;
      case 'large':
        return 600;
      case 'viewport':
        return '100vh';
      default:
        return 400;
    }
  };

  // Get background color from theme
  const getBackgroundColor = () => {
    if (backgroundImage || backgroundGradient) {
      return 'transparent';
    }
    
    switch (backgroundColor) {
      case 'primary':
        return theme.palette.primary.main;
      case 'secondary':
        return theme.palette.secondary.main;
      case 'surface':
        return theme.palette.background.paper;
      default:
        return theme.palette.background.default;
    }
  };

  // Get text color based on background
  const getTextColor = () => {
    switch (backgroundColor) {
      case 'primary':
        return theme.palette.primary.contrastText;
      case 'secondary':
        return theme.palette.secondary.contrastText;
      case 'surface':
        return theme.palette.getContrastText(theme.palette.background.paper);
      default:
        return theme.palette.text.primary;
    }
  };

  return (
    <Box
      component="section"
      {...props}
      {...(gridProps ? { 'data-grid': JSON.stringify(gridProps) } : {})}
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: getHeight(),
        backgroundColor: getBackgroundColor(),
        color: getTextColor(),
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : backgroundGradient || 'none',
        backgroundSize: backgroundImage ? 'cover' : 'auto',
        backgroundPosition: backgroundImage ? 'center' : 'initial',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
        ...props.sx,
      }}
    >
      {/* Overlay for background images */}
      {backgroundImage && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            opacity: overlayOpacity,
            zIndex: 1,
          }}
        />
      )}

      {/* Content */}
      <Container
        maxWidth="md"
        sx={{
          position: 'relative',
          zIndex: 2,
          textAlign,
          py: 4,
        }}
      >
        <Stack spacing={3} alignItems={textAlign === 'center' ? 'center' : textAlign === 'right' ? 'flex-end' : 'flex-start'}>
          {/* Title */}
          <Text
            variant="h2"
            component="h1"
            customColor='var(--theme-on-primary)'
            sx={{
              fontWeight: 700,
              fontSize: {
                xs: '2rem',
                sm: '2.5rem',
                md: '3rem',
                lg: '3.5rem',
              },
              lineHeight: 1.2,
              maxWidth: '800px',
            }}
          >
            {title}
          </Text>

          {/* Subtitle */}
          {subtitle && (
            <Text
              variant="h5"
              component="p"
              customColor='var(--theme-on-primary)'
              fontWeight='400'
              sx={{
                opacity: 0.9,
                maxWidth: '600px'
              }}
            >
              {subtitle}
            </Text>
          )}

          {/* Actions */}
          {actions.length > 0 && (
            <Stack
              direction="row"
              spacing={2}
              sx={{
                mt: 2,
                flexWrap: 'wrap',
                gap: 1,
                justifyContent: textAlign === 'center' ? 'center' : textAlign === 'right' ? 'flex-end' : 'flex-start',
              }}
            >
              {actions.map((action, index) => (
                <Button
                  key={`hero-action-${index}`}
                  buttonSize="large"
                  {...action}
                />
              ))}
            </Stack>
          )}

          {/* Additional content */}
          {children && (
            <Box sx={{ maxWidth: '800px' }}>
              {children}
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

/**
 * Create HeroBlock component using the factory pattern
 */
export const HeroBlock: SerializableComponent<HeroBlockProps> = createSerializableView<HeroBlockProps>({
  tagName: 'HeroBlock',
  version: '1.0.0',
  role: 'container',
  View: HeroBlockView
});

/**
 * Export the component as default
 */
export default HeroBlock;
