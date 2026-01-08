'use client';

/**
 * Footer - Reusable footer component with flexible layout options
 *
 * Provides a clean footer layout with:
 * - Configurable orientation (vertical/horizontal)
 * - Optional logo/branding
 * - Multiple sections for links, text, or custom content
 * - Responsive design with MUI components
 * - Copyright and legal information support
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import {
  Box,
  Divider,
  Link,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { WithDataBinding } from '@qwickapps/schema';
import React from 'react';
import { QWICKAPP_COMPONENT, useBaseProps, useDataBinding, WithBaseProps } from '../../hooks';
import FooterModel from '../../schemas/FooterSchema';
import Text from './Text';

export interface FooterSection {
  /** Unique identifier for the section */
  id: string;
  /** Section title/heading */
  title?: string;
  /** Array of items in this section */
  items: FooterItem[];
}

export interface FooterItem {
  /** Unique identifier for the item */
  id: string;
  /** Display text */
  label: string;
  /** Optional URL for links */
  href?: string;
  /** Click handler for custom actions */
  onClick?: () => void;
  /** Whether to open links in new tab */
  external?: boolean;
}

interface FooterViewProps extends WithBaseProps {
  /** Footer sections */
  sections?: FooterSection[];
  /** Optional logo or branding element */
  logo?: React.ReactNode;
  /** Copyright text or custom React element */
  copyright?: string | React.ReactNode;
  /** Additional legal or info text */
  legalText?: string;
  /** Layout orientation */
  orientation?: 'vertical' | 'horizontal';
  /** Background variant */
  variant?: 'default' | 'contained' | 'outlined';
  /** Whether to show divider above footer */
  showDivider?: boolean;
}

export interface FooterProps extends FooterViewProps, WithDataBinding {}

function FooterView({
  sections = [],
  logo,
  copyright,
  legalText,
  orientation = 'vertical',
  variant = 'default',
  showDivider = true,
  ...restProps
}: FooterViewProps) {
  const { gridProps, styleProps, htmlProps } = useBaseProps(restProps);

  // Mark as QwickApp component
  Object.assign(FooterView, { [QWICKAPP_COMPONENT]: true });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Force vertical on mobile for better usability
  const effectiveOrientation = isMobile ? 'vertical' : orientation;

  const renderFooterItem = (item: FooterItem) => {
    const content = (
      <Text
        variant="body2"
        customColor="var(--theme-text-secondary)"
        sx={{
          textDecoration: item.href ? 'none' : 'inherit',
          '&:hover': item.href ? { color: 'primary.main' } : {},
          cursor: item.href || item.onClick ? 'pointer' : 'default',
          transition: 'color 0.2s'
        }}
        onClick={item.onClick}
      >
        {item.label}
      </Text>
    );

    if (item.href) {
      return (
        <Link
          key={item.id}
          href={item.href}
          target={item.external ? '_blank' : undefined}
          rel={item.external ? 'noopener noreferrer' : undefined}
          underline="none"
          sx={{ display: 'block', mb: 0.5 }}
        >
          {content}
        </Link>
      );
    }

    return (
      <Box key={item.id} sx={{ mb: 0.5 }}>
        {content}
      </Box>
    );
  };

  const renderSection = (section: FooterSection) => (
    <Box key={section.id} sx={{ minWidth: 0 }}>
      {section.title && (
        <Text
          variant="subtitle2"
          component="h3"
          sx={{
            fontWeight: 600,
            mb: 1.5
          }}
          customColor="var(--theme-text-primary)"
        >
          {section.title}
        </Text>
      )}
      <Box>
        {section.items.map(item => renderFooterItem(item))}
      </Box>
    </Box>
  );

  const getContainerProps = () => {
    const baseProps = {
      component: 'footer' as const,
      ...htmlProps,
      ...styleProps,
      ...(gridProps && {
        'data-grid-span': gridProps.span,
        'data-grid-xs': gridProps.xs,
        'data-grid-sm': gridProps.sm,
        'data-grid-md': gridProps.md,
        'data-grid-lg': gridProps.lg,
        'data-grid-xl': gridProps.xl,
      }),
      sx: {
        mt: 'auto',
        py: 3,
        px: { xs: 2, sm: 3 },
        ...styleProps.sx
      }
    };

    switch (variant) {
      case 'contained':
        return {
          ...baseProps,
          component: Paper,
          sx: {
            ...baseProps.sx,
            borderRadius: 0,
            backgroundColor: 'background.paper'
          }
        };
      case 'outlined':
        return {
          ...baseProps,
          component: Paper,
          sx: {
            ...baseProps.sx,
            borderRadius: 0,
            border: 1,
            borderColor: 'divider',
            backgroundColor: 'transparent'
          },
          variant: 'outlined' as const
        };
      default:
        return baseProps;
    }
  };

  const containerProps = getContainerProps();

  return (
    <>
      {showDivider && <Divider />}
      <Box {...containerProps}>
        <Box
          sx={{
            maxWidth: 'lg',
            mx: 'auto',
            display: 'flex',
            flexDirection: effectiveOrientation === 'vertical' ? 'column' : 'row',
            gap: effectiveOrientation === 'vertical' ? 3 : 4,
            alignItems: effectiveOrientation === 'horizontal' ? 'flex-start' : 'stretch'
          }}
        >
          {/* Logo/Branding Section */}
          {logo && (
            <Box
              sx={{
                flexShrink: 0,
                mb: effectiveOrientation === 'vertical' ? 2 : 0,
                mr: effectiveOrientation === 'horizontal' ? 'auto' : 0
              }}
            >
              {logo}
            </Box>
          )}

          {/* Footer Sections */}
          {sections.length > 0 && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: effectiveOrientation === 'vertical' ? 'column' : 'row' },
                gap: { xs: 2, sm: 4 },
                flex: 1,
                justifyContent: effectiveOrientation === 'horizontal' ? 'space-between' : 'flex-start'
              }}
            >
              {sections.map(section => renderSection(section))}
            </Box>
          )}
        </Box>

        {/* Copyright and Legal */}
        {(copyright || legalText) && (
          <Box
            sx={{
              mt: 3,
              pt: 2,
              borderTop: 1,
              borderColor: 'divider',
              maxWidth: 'lg',
              mx: 'auto'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'center' },
                gap: 1
              }}
            >
              {copyright && (
                typeof copyright === 'string' ? (
                  <Text variant="caption" customColor='var(--theme-text-secondary)'>
                    {copyright}
                  </Text>
                ) : (
                  copyright
                )
              )}
              {legalText && (
                <Text variant="caption" customColor="var(--theme-text-secondary)">
                  {legalText}
                </Text>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}

function Footer(props: FooterProps) {
  const { dataSource, bindingOptions, ...restProps } = props;

  // Always call hooks unconditionally
  const bindingResult = useDataBinding<FooterModel>(
    dataSource || '',
    restProps as Partial<FooterModel>
  );

  // If no dataSource, use traditional props
  if (!dataSource) {
    return <FooterView {...restProps} />;
  }

  // Use data binding result
  const { loading, error, ...footerProps } = bindingResult;

  // Show loading state
  if (loading) {
    return (
      <Box
        component="footer"
        sx={{
          mt: 'auto',
          py: 3,
          px: { xs: 2, sm: 3 },
          textAlign: 'center'
        }}
      >
        <Text variant="body2" customColor="var(--theme-text-secondary)">
          Loading Footer...
        </Text>
      </Box>
    );
  }

  if (error) {
    console.error('Error loading footer:', error);
    if (process.env.NODE_ENV !== 'production') {
      return (
        <Box
          component="footer"
          sx={{
            mt: 'auto',
            py: 3,
            px: { xs: 2, sm: 3 },
            textAlign: 'center'
          }}
        >
          <Text variant="body2" customColor='var(--theme-error)' >
            Error Loading Footer: {error.message}
          </Text>
        </Box>
      );
    }
    return null;
  }

  // Map FooterSectionModel[] to FooterSection[] and ensure id is a string
  const mappedSections =
    footerProps.sections?.map(section => ({
      ...section,
      id: section.id ?? '', // fallback to empty string if id is undefined
      items: section.items?.map(item => ({
        ...item,
        id: item.id ?? '', // fallback to empty string if id is undefined
        label: item.label ?? '', // ensure label is always a string
      })) ?? [],
    })) ?? [];

  return <FooterView {...footerProps} sections={mappedSections} />;
}

export default Footer;