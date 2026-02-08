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

import Schedule from '@mui/icons-material/Schedule';
import Launch from '@mui/icons-material/Launch';
import Visibility from '@mui/icons-material/Visibility';
import StarIcon from '@mui/icons-material/Star';
const ComingSoonIcon = Schedule;
const LaunchIcon = Launch;
const PreviewIcon = Visibility;
import {
  Box,
  Chip,
  Rating,
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
  features?: string[];
  technologies?: string[];
  status: string;
  image?: string;
  url?: string;
  // E-commerce fields (optional)
  price?: number;
  salePrice?: number;
  rating?: number;
  reviewCount?: number;
  isNew?: boolean;
  featured?: boolean;
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
  /** Handler for adding product to cart (e-commerce products only) */
  onAddToCart?: (product: Product) => void;
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
  onAddToCart,
  ...restProps
}: ProductCardViewProps) {
  const { styleProps, htmlProps } = useBaseProps(restProps);
  const theme = useTheme();

  // Return null if no product data
  if (!product) return null;

  // Detect product type: e-commerce products have price field
  const isEcommerce = product.price !== undefined;

  // E-commerce helpers
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const calculateDiscount = () => {
    if (!product.price || !product.salePrice) return 0;
    return Math.round(((product.price - product.salePrice) / product.price) * 100);
  };

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
    }
    // Note: Navigation is handled by parent wrapper (e.g., Next.js Link in BlockRenderer)
    // For standalone usage, provide onClick prop with navigation logic
  };

  const getDefaultActions = (): ProductCardAction[] => {
    // E-commerce products get "Add to Cart" action
    if (isEcommerce) {
      return [
        {
          id: 'add-to-cart',
          label: 'Add to Cart',
          variant: 'contained',
          color: 'primary',
          onClick: () => {
            if (onAddToCart && product) {
              onAddToCart(product);
            }
          }
        }
      ];
    }

    // Software products get status-based actions
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

  const technologiesSectionElement = (!showTechnologies || variant === 'compact' || !product.technologies) ? null : (
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
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.paper',
        borderRadius: isEcommerce ? 2 : 3,
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
        position: 'relative',
        cursor: variant === 'compact' ? 'pointer' : 'default',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': variant === 'compact' ? {
          transform: 'translateY(-4px)',
          boxShadow: 3
        } : {},
        ...(styleProps.sx || {})
      }}
      style={styleProps.style}
    >
      {/* Status Badge - only for software products */}
      {!isEcommerce && (
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
      )}

      {/* Product Image */}
      {showImage && product.image && (
        <Box
          sx={{
            width: '100%',
            height: isEcommerce ? 280 : (variant === 'detailed' ? 240 : 200),
            backgroundColor: 'divider',
            position: 'relative'
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

          {/* E-commerce badges */}
          {isEcommerce && (
            <>
              {/* Left side badges */}
              <Box sx={{ position: 'absolute', top: 12, left: 12, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {product.isNew && (
                  <Chip
                    label="NEW"
                    sx={{
                      backgroundColor: 'primary.main',
                      color: 'white',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      height: '24px',
                      px: 1
                    }}
                  />
                )}
                {product.featured && (
                  <Chip
                    label="POPULAR"
                    sx={{
                      backgroundColor: 'warning.main',
                      color: 'white',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      height: '24px',
                      px: 1
                    }}
                  />
                )}
              </Box>

              {/* Right side badges */}
              <Box sx={{ position: 'absolute', top: 12, right: 12, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {product.salePrice && product.price && (
                  <>
                    <Chip
                      label="ON SALE"
                      sx={{
                        backgroundColor: 'error.main',
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        height: '24px',
                        px: 1
                      }}
                    />
                    <Chip
                      label={`-${calculateDiscount()}%`}
                      sx={{
                        backgroundColor: 'error.dark',
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        height: '24px',
                        px: 1
                      }}
                    />
                  </>
                )}
              </Box>
            </>
          )}
        </Box>
      )}

      {/* Product Info */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: isEcommerce ? 2 : 3 }}>
        {isEcommerce ? (
          /* E-commerce product info */
          <Box>
            {/* Category */}
            {product.category && (
              <Typography
                variant="caption"
                sx={{
                  mb: 0.5,
                  color: 'text.secondary',
                  display: 'block'
                }}
              >
                {product.category}
              </Typography>
            )}

            {/* Product name */}
            <Typography
              variant="h6"
              component="h3"
              sx={{
                mb: 1,
                fontSize: '1rem',
                fontWeight: 500,
                lineHeight: 1.3,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }}
            >
              {product.name}
            </Typography>

            {/* Rating */}
            {product.rating !== undefined && product.rating > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                <Rating
                  value={product.rating}
                  readOnly
                  size="small"
                  precision={0.5}
                  emptyIcon={<StarIcon style={{ opacity: 0.3 }} fontSize="inherit" />}
                />
                {product.reviewCount !== undefined && product.reviewCount > 0 && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary'
                    }}
                  >
                    ({product.reviewCount})
                  </Typography>
                )}
              </Box>
            )}

            {/* Price */}
            <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: product.salePrice ? 'primary.main' : 'inherit'
                }}
              >
                {formatPrice(product.salePrice || product.price!)}
              </Typography>
              {product.salePrice && (
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'line-through'
                  }}
                >
                  {formatPrice(product.price!)}
                </Typography>
              )}
            </Box>
          </Box>
        ) : (
          /* Software product info */
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
        )}

  {/* Features - only show for software products */}
  {!isEcommerce && product.features && product.features.length > 0 && featuresListElement}

  {/* Technologies - only show for software products */}
  {!isEcommerce && product.technologies && product.technologies.length > 0 && technologiesSectionElement}

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
              onClick={(e) => {
                // Prevent Link navigation when clicking button (e.g., Add to Cart)
                e.stopPropagation();
                e.preventDefault();
                action.onClick();
              }}
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
  Object.assign(ProductCard, { [QWICKAPP_COMPONENT]: true });

  // Always call hooks unconditionally
  const bindingResult = useDataBinding<ProductCardModel>(
    dataSource || '',
    restProps as Partial<ProductCardModel>
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
