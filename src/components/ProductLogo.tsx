/**
 * ProductLogo - Simplified QwickApps product logo component
 *
 * A convenience wrapper around the Logo component specifically designed for
 * QwickApps product branding. Automatically handles icon positioning and
 * styling to create consistent product logos across the QwickApps suite.
 *
 * Features:
 * - Automatically positions the icon close to the product name
 * - Consistent styling across all QwickApps products
 * - Simple API: just provide icon and name
 * - Supports all Logo component features (size, variant, badge, etc.)
 *
 * Example Usage:
 * ```tsx
 * import { ProductLogo, QwickIcon } from '@qwickapps/react-framework';
 *
 * // Simple usage
 * <ProductLogo icon={<QwickIcon />} name="wick Press" />
 *
 * // With custom size
 * <ProductLogo
 *   icon={<QwickIcon size={32} />}
 *   name="wick Forge"
 *   size="small"
 * />
 *
 * // With click handler
 * <ProductLogo
 *   icon={<QwickIcon />}
 *   name="wick Apps"
 *   onClick={() => window.location.href = '/'}
 * />
 * ```
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React, { cloneElement, isValidElement } from 'react';
import Logo from './Logo';
import type { LogoProps } from './Logo';
import QwickIcon from './QwickIcon';

export interface ProductLogoProps extends Omit<LogoProps, 'image' | 'imagePosition'> {
  /** The icon element (defaults to QwickIcon) */
  icon?: React.ReactElement;
  /** The product name (e.g., "wick Press", "wick Forge") */
  name: string;
  /** Optional click handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement | HTMLDivElement>) => void;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Additional CSS class names */
  className?: string;
}

/**
 * ProductLogo Component
 *
 * Creates a branded product logo by combining a QwickIcon with a product name.
 * The icon is automatically positioned close to the text with proper styling.
 */
const ProductLogo: React.FC<ProductLogoProps> = ({
  icon,
  name,
  size = 'small',
  onClick,
  style,
  className,
  ...restProps
}) => {
  // Calculate icon size based on logo size
  const getIconSize = (logoSize: string = 'small'): number => {
    const sizeMap: Record<string, number> = {
      'tiny': 20,
      'small': 32,
      'medium': 40,
      'large': 52,
      'extra-large': 68
    };
    return sizeMap[logoSize] || 32;
  };

  // Use QwickIcon as default if no icon provided
  const iconElement = icon || <QwickIcon />;

  // Clone the icon element and apply positioning styles
  const styledIcon = isValidElement(iconElement)
    ? cloneElement(iconElement, {
        size: (iconElement.props as Record<string, unknown>).size || getIconSize(size as string),
        style: {
          position: 'relative',
          left: '25px',
          zIndex: 999,
          ...((iconElement.props as Record<string, unknown>).style as React.CSSProperties | undefined)
        }
      } as Record<string, unknown>)
    : iconElement;

  return (
    <Logo
      name={name}
      size={size}
      image={styledIcon}
      imagePosition="start"
      style={{
        cursor: onClick ? 'pointer' : 'default',
        zIndex: 1000,
        ...style
      }}
      className={className}
      onClick={onClick}
      {...restProps}
    />
  );
};

export default ProductLogo;
