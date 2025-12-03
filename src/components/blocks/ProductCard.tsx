'use client';

/**
 * ProductCard - Unified product card component with variants
 *
 * A flexible product card that can display products in different formats:
 * - Compact variant: For showcases and lists (shows limited features)
 * - Detailed variant: For product pages (shows full details)
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Schedule as ComingSoonIcon, Launch as LaunchIcon, Visibility as PreviewIcon } from '@mui/icons-material';
import {
  Box,
  Chip,
  Typography,
  useTheme
} from '@mui/material';
import { WithDataBinding } from '@qwickapps/schema';
import { QWICKAPP_COMPONENT, useBaseProps, useDataBinding, WithBaseProps } from '../../hooks';
import ProductCardModel from '../../schemas/ProductCardSchema';
import { Button } from '../buttons/Button';

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  shortDescription?: string;
  features: string[];
  technologies: string[];
  status: string;
  image?: string;
  url?: string;
}

export interface ProductCardAction {
  id: string;
  label: string;
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'error';
  disabled?: boolean;
  onClick: () => void;
}

interface ProductCardViewProps extends WithBaseProps {
  /** Product data */
  product?: Product;
  /** Card variant */
  variant?: 'compact' | 'detailed';
  /** Custom actions - if not provided, uses default actions */
  actions?: ProductCardAction[];
  /** Click handler for card */
  onClick?: () => void;
  /** Whether to show the image */
  showImage?: boolean;
  /** Whether to show technologies */
  showTechnologies?: boolean;
  /** Maximum features to show in compact mode */
  maxFeaturesCompact?: number;
}

export interface ProductCardProps extends ProductCardViewProps, WithDataBinding {}

/**
 * Core ProductCard View component - handles product card rendering
 */
function ProductCardView({
  product,
  variant = 'compact',
  actions,
  onClick,
  showImage = true,
  showTechnologies = true,
  maxFeaturesCompact = 3,
  ...restProps
}: ProductCardViewProps) {
  const { styleProps, htmlProps } = useBaseProps(restProps);
  const theme = useTheme();

  // Return null if no product data
  if (!product) return null;

  const getStatusIcon = (status: Product['status']) => {
    switch (status) {
      case 'launched':
        return <LaunchIcon fontSize="small" />;
      case 'beta':
        return <PreviewIcon fontSize="small" />;
      case 'coming-soon':
        return <ComingSoonIcon fontSize="small" />;
    }
  };

  const getStatusColor = (status: Product['status']) => {
    switch (status) {
      default:
      case 'launched':
        return theme.palette.success.main;
      case 'beta':
        return theme.palette.warning.main;
      case 'coming-soon':
        return theme.palette.grey[500];
    }
  };

  const handleProductClick = () => {
    if (onClick) {
      onClick();
    } else if (product.status === 'launched' && product.url?.startsWith('http')) {
      window.open(product.url, '_blank', 'noopener,noreferrer');
    }
  };

  const getDefaultActions = (): ProductCardAction[] => {
    const actions: ProductCardAction[] = [
      {
        id: 'primary',
        label: product.status === 'launched' ? 'Learn More' :
               product.status === 'beta' ? 'Try Beta' :
               product.status === 'coming-soon' ? 'Coming Soon' :
               product.status,
        variant: 'contained',
        color: 'primary',
        disabled: product.status === 'coming-soon',
        onClick: handleProductClick
      }
    ];

    if (variant === 'detailed' && product.status !== 'coming-soon') {
      actions.push({
        id: 'secondary',
        label: 'Learn More',
        variant: 'outlined',
        color: 'primary',
        onClick: () => window.location.hash = '#/contact'
      });
    }

    return actions;
  };

  const displayActions = actions || getDefaultActions();

  // INLINE WRAPPERS REFACTORED: Instead of inline component declarations (which cause remounts),
  // compute JSX fragments via plain variables/functions and inject directly.

  const featuresListElement = (() => {
    const featuresToShow = variant === 'compact'
      ? (product.features || []).slice(0, maxFeaturesCompact)
      : (product.features || []);

    return (
      <Box sx={{ mb: variant === 'detailed' ? 2.5 : 2 }}>
        <Typography
          variant="h6"
          component="h4"
          sx={{
            mb: 1.5,
            fontSize: '1.1rem',
            fontWeight: 600
          }}
        >
          Key Features:
        </Typography>
        <Box component="ul" sx={{
          m: 0,
          p: 0,
          listStyle: 'none'
        }}>
          {featuresToShow.map((feature, index) => (
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
                {feature}
              </Typography>
            </Box>
          ))}
          {variant === 'compact' && (product.features || []).length > maxFeaturesCompact && (
            <Typography
              variant="body2"
              color="primary"
              sx={{
                fontSize: '0.9rem',
                pl: 2.5,
                fontWeight: 500
              }}
            >
              +{(product.features || []).length - maxFeaturesCompact} more features
            </Typography>
          )}
        </Box>
      </Box>
    );
  })();

  const technologiesSectionElement = (!showTechnologies || variant === 'compact') ? null : (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="h6"
        component="h4"
        sx={{
          mb: 1.5,
          fontSize: '1rem',
          fontWeight: 600
        }}
      >
        Technologies:
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {product.technologies.map((tech, index) => (
          <Chip
            key={index}
            label={tech}
            variant="outlined"
            size="small"
            sx={{
              fontSize: '0.8rem',
              fontWeight: 500
            }}
          />
        ))}
      </Box>
    </Box>
  );

  return (
    <Box
      className={styleProps.className || "product-card"}
      onClick={htmlProps.onClick || (variant === 'compact' ? handleProductClick : undefined)}
      sx={{
        p: 3, // padding="large" equivalent
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        cursor: variant === 'compact' ? 'pointer' : 'default',
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.paper',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': variant === 'compact' ? {
          transform: 'translateY(-4px)',
          boxShadow: 8
        } : {},
        ...(styleProps.sx || {})
      }}
      style={styleProps.style}
    >
      {/* Status Badge */}
      <Chip
        icon={getStatusIcon(product.status)}
        label={product.status.replace('-', ' ')}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          backgroundColor: getStatusColor(product.status),
          color: 'white',
          fontSize: '0.8rem',
          fontWeight: 500,
          textTransform: 'capitalize',
          zIndex: 2,
          height: '28px',
          px: 1.5,
          '& .MuiChip-icon': {
            color: 'white'
          }
        }}
      />

      {/* Product Image */}
      {showImage && product.image && (
        <Box
          sx={{ 
            width: '100%', 
            height: variant === 'detailed' ? 240 : 200, 
            mb: 2.5,
            borderRadius: 1,
            overflow: 'hidden',
            backgroundColor: 'divider'
          }}
        >
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              if (target.parentElement) {
                target.parentElement.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                target.parentElement.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; font-size: 1.5rem; font-weight: bold;">${product.name}</div>`;
              }
            }}
          />
        </Box>
      )}

      {/* Product Info */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h4"
            component="h3"
            sx={{
              mb: 1,
              fontSize: variant === 'detailed' ? '1.75rem' : '1.5rem',
              fontWeight: 600
            }}
          >
            {product.name}
          </Typography>
          <Typography
            variant="overline"
            sx={{
              mb: 1.5,
              color: 'primary.main',
              fontSize: '0.9rem',
              fontWeight: 500,
              letterSpacing: '0.5px',
              display: 'block'
            }}
          >
            {product.category}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              opacity: 0.8,
              lineHeight: 1.6
            }}
          >
            {variant === 'detailed' ? product.description : (product.shortDescription || product.description)}
          </Typography>
        </Box>

  {/* Features - only show if features exist */}
  {product.features && product.features.length > 0 && featuresListElement}

  {/* Technologies - only show if technologies exist */}
  {product.technologies && product.technologies.length > 0 && technologiesSectionElement}

        {/* Action Buttons */}
        <Box sx={{ 
          display: 'flex', 
          gap: 1.5,
          mt: 'auto',
          ...(variant === 'compact' && { justifyContent: 'center' })
        }}>
          {displayActions.map((action) => (
            <Button
              key={action.id}
              variant={action.variant || 'contained'}
              // color={action.color || 'primary'}
              disabled={action.disabled}
              onClick={action.onClick}
              {...(variant === 'compact' && { fullWidth: true })}
            >
              {action.label}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

/**
 * ProductCard component with data binding support
 * Supports both traditional props and dataSource-driven rendering
 */
function ProductCard(props: ProductCardProps) {
  const { dataSource, bindingOptions, ...restProps } = props;

  // Mark as QwickApp component
  (ProductCard as Record<string, unknown>)[QWICKAPP_COMPONENT] = true;

  // Always call hooks unconditionally
  const bindingResult = useDataBinding<ProductCardModel>(
    dataSource || '',
    restProps as Partial<ProductCardModel>,
    ProductCardModel.getSchema(),
    { cache: true, cacheTTL: 300000, strict: false, ...bindingOptions }
  );

  // If no dataSource, use traditional props
  if (!dataSource) {
    return <ProductCardView {...restProps} />;
  }

  // Use data binding result
  const { loading, error, ...productProps } = bindingResult;

  // Show loading state
  if (loading) {
    return (
      <ProductCardView
        {...restProps}
        product={{
          id: 'loading-product',
          name: 'Loading Product...',
          category: 'Loading',
          description: 'Loading product information from data source',
          shortDescription: 'Loading...',
          features: ['Loading features...'],
          technologies: ['Loading'],
          status: 'coming-soon'
        }}
        variant={restProps.variant || 'compact'}
        showImage={false}
      />
    );
  }

  if (error) {
    console.error('Error loading product card:', error);
    if (process.env.NODE_ENV !== 'production') {
      return (
        <ProductCardView
          {...restProps}
          product={{
            id: 'error-product',
            name: 'Product Loading Error',
            category: 'Error',
            description: error.message,
            features: ['Unable to load product features'],
            technologies: ['N/A'],
            status: 'coming-soon'
          }}
          variant={restProps.variant || 'compact'}
          showImage={false}
        />
      );
    }
    return null;
  }

  // Pass through data directly - let component handle missing properties
  const transformedProps = productProps as ProductCardViewProps;

  return <ProductCardView {...transformedProps} />;
}

export default ProductCard;
export { ProductCard };
