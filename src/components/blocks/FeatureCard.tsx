'use client';

/**
 * FeatureCard Component - Unified feature card with data binding support
 *
 * Enhanced with data binding support through dataSource prop.
 *
 * Usage:
 * - Traditional: <FeatureCard feature={featureObj} variant="standard" elevation={2} />
 * - Data-driven: <FeatureCard dataSource="product.single-feature" />
 *
 * Features:
 * - Standard variant: Rich feature cards with icons, titles, descriptions, and actions
 * - List variant: Simple bullet list of features for compact display
 * - Interactive elements with hover effects and customizable actions
 * - Full CMS integration through dataSource prop
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import {
  Box,
  Paper,
  Typography,
  useTheme
} from '@mui/material';
import { WithDataBinding } from '@qwickapps/schema';
import React from 'react';
import { QWICKAPP_COMPONENT, useBaseProps, useDataBinding, WithBaseProps } from '../../hooks';
import FeatureCardModel from '../../schemas/FeatureCardSchema';
import { Button } from '../buttons/Button';

export interface FeatureItem {
  /** Unique identifier */
  id: string;
  /** Feature icon */
  icon?: React.ReactNode;
  /** Feature title */
  title: string;
  /** Feature description */
  description?: string;
  /** Optional action/button */
  action?: React.ReactNode;
}

export interface FeatureCardAction {
  id: string;
  label: string;
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'error';
  disabled?: boolean;
  onClick: () => void;
}

type FeatureCardViewProps = WithBaseProps & {
  /** Feature data */
  feature?: FeatureItem;
  /** For list variant: array of feature strings */
  features?: string[];
  /** Card variant */
  variant?: 'standard' | 'list';
  /** Custom actions - with click handlers */
  actions?: FeatureCardAction[];
  /** Click handler for card */
  onClick?: () => void;
  /** List variant title */
  title?: string;
  /** Whether to show as paper card or plain box */
  elevation?: number;
};

export interface FeatureCardProps extends FeatureCardViewProps, WithDataBinding {}

/**
 * Core FeatureCard View component - handles feature card rendering
 */
function FeatureCardView({
  feature,
  features,
  variant = 'standard',
  actions,
  onClick,
  title = 'Key Features',
  elevation = 2,
  ...restProps
}: FeatureCardViewProps) {
  const { styleProps, htmlProps } = useBaseProps(restProps);
  const theme = useTheme();

  // List variant for simple feature lists
  if (variant === 'list' && features) {
    return (
      <Box {...htmlProps} {...styleProps}>
        <Typography 
          variant="h6" 
          component="h4"
          sx={{ 
            mb: 1.5, 
            fontSize: '1.1rem',
            fontWeight: 600
          }}
        >
          {title}
        </Typography>
        <Box component="ul" sx={{ 
          m: 0, 
          p: 0,
          listStyle: 'none'
        }}>
          {features.map((featureText, index) => (
            <Box
              key={index}
              component="li"
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                mb: 0.5,
                gap: 1.5
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  backgroundColor: 'primary.main',
                  borderRadius: '50%',
                  mt: 1,
                  flexShrink: 0
                }}
              />
              <Typography 
                variant="body2" 
                sx={{ 
                  fontSize: '0.95rem',
                  lineHeight: 1.4,
                  opacity: 0.8
                }}
              >
                {featureText}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  // Standard variant for feature items
  if (!feature) return null;

  const displayActions = actions || (feature.action ? [{ 
    id: 'default', 
    label: 'Learn More', 
    variant: 'contained' as const,
    onClick: onClick || (() => {})
  }] : []);

  const handleClick = onClick || htmlProps?.onClick;
  const { onClick: _htmlOnClick, ...filteredHtmlProps } = htmlProps || {};

  return (
    <Paper
      elevation={elevation}
      onClick={handleClick}
      sx={{
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        height: '100%',
        cursor: handleClick ? 'pointer' : 'default',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': handleClick ? {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[4],
        } : {},
        ...styleProps.sx
      }}
      style={styleProps.style}
      {...filteredHtmlProps}
    >
      {feature.icon && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 64,
            height: 64,
            mb: 2,
            borderRadius: '50%',
            backgroundColor: 'action.hover',
            color: 'primary.main'
          }}
        >
          {feature.icon}
        </Box>
      )}
      
      <Typography
        variant="h6"
        component="h3"
        sx={{ 
          mb: feature.description ? 1 : 2,
          fontWeight: 600 
        }}
      >
        {feature.title}
      </Typography>
      
      {feature.description && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ 
            mb: 2, 
            flexGrow: 1,
            lineHeight: 1.5
          }}
        >
          {feature.description}
        </Typography>
      )}

      {feature.action && (
        <Box sx={{ mt: 'auto' }}>
          {feature.action}
        </Box>
      )}

      {displayActions.length > 0 && !feature.action && (
        <Box sx={{ 
          display: 'flex', 
          gap: 1,
          mt: 'auto'
        }}>
          {displayActions.map((action) => (
            <Button
              key={action.id}
              variant={action.variant || 'contained'}
              // color={action.color || 'primary'}
              disabled={action.disabled}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ))}
        </Box>
      )}
    </Paper>
  );
}

/**
 * FeatureCard component with data binding support
 * Supports both traditional props and dataSource-driven rendering
 */
function FeatureCard(props: FeatureCardProps) {
  const { dataSource, bindingOptions, ...restProps } = props;

  // Mark as QwickApp component
  Object.assign(FeatureCard, { [QWICKAPP_COMPONENT]: true });

  // Always call hooks unconditionally
  const bindingResult = useDataBinding<FeatureCardModel>(
    dataSource || '',
    restProps as Partial<FeatureCardModel>
  );

  // If no dataSource, use traditional props
  if (!dataSource) {
    return <FeatureCardView {...restProps} />;
  }

  // Use data binding result
  const { loading, error, ...featureProps } = bindingResult;

  // Show loading state
  if (loading) {
    return (
      <FeatureCardView
        {...restProps}
        feature={{
          id: 'loading-feature',
          title: 'Loading Feature...',
          description: 'Loading feature content from data source',
          icon: '⏳'
        }}
        variant="standard"
        elevation={2}
      />
    );
  }

  if (error) {
    console.error('Error loading feature card:', error);
    if (process.env.NODE_ENV !== 'production') {
      return (
        <FeatureCardView
          {...restProps}
          feature={{
            id: 'error-feature',
            title: 'Feature Loading Error',
            description: error.message,
            icon: '⚠️'
          }}
          variant="standard"
          elevation={2}
        />
      );
    }
    return null;
  }

  // Pass through data directly - let component handle missing properties
  const transformedProps = featureProps as FeatureCardViewProps;

  return <FeatureCardView {...transformedProps} />;
}

export default FeatureCard;
export { FeatureCard };
