/**
 * Dynamic Logo Component - Generic theme-aware logo with image support
 * 
 * Features:
 * - Automatic text width calculation with dynamic SVG sizing
 * - Semantic badge positioning (top-left, top-right, center, etc.)
 * - Customizable badge position via custom coordinates or relative offset
 * - Multiple badge shapes: circle, star, square, heart
 * - Theme-aware styling with multiple variants
 * - Accessibility support with proper ARIA labels
 * - Customizable styling via CSS classes for each text part
 * - Text formatting with escape sequences
 * - Image support with flexible positioning
 * 
 * Text Formatting (TWO PARTS MAXIMUM):
 * - Use \n for line breaks (second part appears on new line)
 * - Use \s for explicit spaces (useful for custom spacing)
 * - Default: Two-word logos appear as one word in two colors (no space)
 * - Limitation: Only TWO parts supported - multiple \n will not create more than two lines
 * - Examples: "QwickApps" (one word, one color), "Qwick Apps" (two parts, two colors), "Qwick\sApps" (two parts with space), "Qwick\nApps" (two parts on two lines)
 * 
 * Badge Positioning:
 * - Semantic: Use 'top-left', 'top-right', 'center', etc. (automatically adapts to logo size)
 * - Default: 'top-right' - positions at top-right of text
 * - Offset: Use badgeOffset to fine-tune any position (automatically scales with size)
 * - None: Use 'none' to hide the badge
 * - Flexible: Combine any semantic position with custom offsets for precise control
 * 
 * Text Styling:
 * - Use firstPartClass and secondPartClass for custom CSS styling
 * - Default classes: 'logo-first-part' and 'logo-second-part'
 * - Font family and weight can be set via props for basic customization
 * - Advanced styling (colors, effects, transforms) via CSS classes
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import type { WithDataBinding, SchemaProps } from '@qwickapps/schema';
import { QWICKAPP_COMPONENT, useBaseProps, useDataBinding } from '../hooks';
import LogoModel from '../schemas/LogoSchema';
import { LogoVariant, LogoSize, LogoBadgeShape, PositionType, BadgeOffset } from '../schemas/LogoSchema';
import './Logo.css';

type LogoViewProps = SchemaProps<LogoModel> & {
  /** Click handler for the logo */
  onClick?: (event: React.MouseEvent<SVGSVGElement | HTMLDivElement>) => void;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Additional CSS class names */
  className?: string;
};

interface LogoProps extends LogoViewProps, WithDataBinding {}

// View component - handles the actual rendering
function LogoView({
  name = 'Qwick Apps',
  variant = 'default',
  size = 'medium',
  badge = 'top-right',
  badgeShape = 'circle',
  badgeOffsetX,
  badgeOffsetY,
  fontFamily = 'Segoe UI, sans-serif',
  fontWeight = 'bold',
  firstPartClass = 'logo-first-part',
  secondPartClass = 'logo-second-part',
  image,
  imagePosition = 'start',
  onClick,
  style,
  className,
  ...restProps
}: LogoViewProps) {
  const { styleProps, htmlProps } = useBaseProps(restProps);

  // Convert separate offset values to BadgeOffset object - memoize to prevent unnecessary re-renders
  const badgeOffset: BadgeOffset | undefined = useMemo(
    () => (badgeOffsetX !== undefined || badgeOffsetY !== undefined)
      ? { x: badgeOffsetX, y: badgeOffsetY }
      : undefined,
    [badgeOffsetX, badgeOffsetY]
  );

  const textRef = useRef<SVGTextElement>(null);
  const [calculatedBadgePosition, setCalculatedBadgePosition] = useState({ x: 155, y: 20 });
  const [svgWidth, setSvgWidth] = useState(180);

  // Parse name with support for escape sequences to determine structure
  const parseNameParts = useCallback((text: string) => {
    // Handle line breaks first
    if (text.includes('\\n')) {
      const [first, ...rest] = text.split('\\n');
      return {
        firstPart: first.replace(/\\s/g, ' '),
        secondPart: rest.join('\\n').replace(/\\s/g, ' '),
        isNewLine: true
      };
    }
    
    // Check if text contains explicit \s sequences
    if (text.includes('\\s')) {
      // Handle explicit spaces - split by \s and treat as two parts
      const parts = text.split('\\s');
      if (parts.length >= 2) {
        return {
          firstPart: parts[0],
          secondPart: parts.slice(1).join(' '), // Join remaining parts with spaces
          isNewLine: false
        };
      } else {
        return { firstPart: parts[0], secondPart: '', isNewLine: false };
      }
    }
    
    // Regular word splitting (no explicit \s)
    const nameParts = text.trim().split(/\s+/);
    
    if (nameParts.length === 1) {
      return { firstPart: nameParts[0], secondPart: '', isNewLine: false };
    } else if (nameParts.length === 2) {
      return { firstPart: nameParts[0], secondPart: nameParts[1], isNewLine: false };
    } else {
      // More than 2 words: everything except last word goes to first part
      return {
        firstPart: nameParts.slice(0, -1).join(' '),
        secondPart: nameParts[nameParts.length - 1],
        isNewLine: false
      };
    }
  }, []);

  const { firstPart, secondPart, isNewLine } = parseNameParts(name);
  
  // Check if original name contained explicit spaces
  const hasExplicitSpaces = name.includes('\\s');

  // Determine size class, font size, and component height (accounting for line breaks)
  const sizeClass = `logo-${size}`;
  const getSizeConfig = (size: LogoSize, hasLineBreak: boolean) => {
    const baseConfig = {
      'tiny': { fontSize: 16, height: 32 },
      'small': { fontSize: 20, height: 40 },
      'medium': { fontSize: 28, height: 50 },
      'large': { fontSize: 36, height: 64 },
      'extra-large': { fontSize: 48, height: 84 }
    };
    
    const config = baseConfig[size] || baseConfig.medium;
    
    // Add extra height for line breaks (approximately 1.4x the font size for proper spacing)
    if (hasLineBreak) {
      config.height += Math.round(config.fontSize * 1.4);
    }
    
    return config;
  };
  const { fontSize, height } = getSizeConfig(size, isNewLine);

  // Calculate badge position based on semantic positioning system
  const calculateBadgePosition = useCallback((textBBox: DOMRect) => {
    // Scale factor based on font size (medium/28px is the baseline)
    const scale = fontSize / 28; // 28 is the medium/default font size
    const scaledOffset = 8 * scale;
    
    // Scale custom offset based on size
    const scaledOffsetX = (badgeOffset?.x ?? 0) * scale;
    const scaledOffsetY = (badgeOffset?.y ?? 0) * scale;
    
    // Calculate position based on semantic positioning
    let x: number, y: number;
    
    switch (badge) {
      case 'top-left':
        x = textBBox.x - scaledOffset;
        y = textBBox.y + scaledOffset;
        break;
      case 'top-center':
        x = textBBox.x + textBBox.width / 2;
        y = textBBox.y + scaledOffset;
        break;
      case 'top-right':
        x = textBBox.x + textBBox.width + scaledOffset;
        y = textBBox.y + scaledOffset;
        break;
      case 'start':  // was 'center-left'
        x = textBBox.x - scaledOffset;
        y = textBBox.y + textBBox.height / 2;
        break;
      case 'center':
        x = textBBox.x + textBBox.width / 2;
        y = textBBox.y + textBBox.height / 2;
        break;
      case 'end':    // was 'center-right'
        x = textBBox.x + textBBox.width + scaledOffset;
        y = textBBox.y + textBBox.height / 2;
        break;
      case 'bottom-left':
        x = textBBox.x - scaledOffset;
        y = textBBox.y + textBBox.height - scaledOffset;
        break;
      case 'bottom-center':
        x = textBBox.x + textBBox.width / 2;
        y = textBBox.y + textBBox.height - scaledOffset;
        break;
      case 'bottom-right':
        x = textBBox.x + textBBox.width + scaledOffset;
        y = textBBox.y + textBBox.height - scaledOffset;
        break;
      default:
        // Default: top-right of text
        x = textBBox.x + textBBox.width + scaledOffset;
        y = textBBox.y + scaledOffset;
        break;
    }
    
    return {
      x: x + scaledOffsetX,
      y: y + scaledOffsetY
    };
  }, [badge, badgeOffset, fontSize]);

  // Calculate badge position and SVG width based on text width
  useEffect(() => {
    if (textRef.current) {
      const textBBox = textRef.current.getBBox();
      // Calculate badge position using semantic positioning
      const badgePos = calculateBadgePosition(textBBox);
      // Ensure SVG is wide enough to accommodate text and badge
      const requiredWidth = Math.max(180, textBBox.x + textBBox.width + 20);

      setCalculatedBadgePosition(badgePos);
      setSvgWidth(requiredWidth);
    }
  }, [name, badge, badgeOffset, calculateBadgePosition, fontSize, height, parseNameParts, svgWidth]);
  
  // Determine CSS class for variant
  let variantClass = '';
  if (variant === 'high-contrast' || variant === 'monochrome' || variant === 'on-primary') {
    variantClass = `logo-${variant}`;
  } else if (variant !== 'default') {
    variantClass = `logo-${variant}`;
  } else {
    variantClass = 'logo-default';
  }
  
  // Create aria-label from the logo name
  const ariaLabel = `${name} Logo`;
  
  // Render badge shape
  const renderBadgeShape = (): React.ReactNode => {
    if (badge === 'none') return null;
    
    const baseProps = {
      className: `logo-badge logo-badge-${badgeShape}`,
    };
    
    // Use the calculated position (which includes custom position logic)
    const { x, y } = calculatedBadgePosition;
    
    // Scale badge size based on font size
    const scale = fontSize / 28; // 28 is the medium/default font size
    const badgeRadius = 5 * scale;
    const badgeSize = 10 * scale;
    
    switch (badgeShape) {
      case 'circle':
        return (
          <circle cx={x} cy={y} r={badgeRadius} {...baseProps}>
            <animate attributeName="r" values={`${badgeRadius};${badgeRadius + 1};${badgeRadius}`} dur="1.5s" repeatCount="indefinite" />
          </circle>
        );
      case 'star': {
        const starScale = scale;
        return (
          <polygon
            points={`${x},${y-5*starScale} ${x+2*starScale},${y} ${x+7*starScale},${y} ${x+3*starScale},${y+3*starScale} ${x+5*starScale},${y+8*starScale} ${x},${y+5*starScale} ${x-5*starScale},${y+8*starScale} ${x-3*starScale},${y+3*starScale} ${x-7*starScale},${y} ${x-2*starScale},${y}`}
            {...baseProps}
          >
            <animate attributeName="opacity" values="0.8;1;0.8" dur="1.5s" repeatCount="indefinite" />
          </polygon>
        );
      }
      case 'square':
        return (
          <rect x={x-badgeRadius} y={y-badgeRadius} width={badgeSize} height={badgeSize} {...baseProps}>
            <animate attributeName="opacity" values="0.8;1;0.8" dur="1.5s" repeatCount="indefinite" />
          </rect>
        );
      case 'heart': {
        const heartScale = scale;
        return (
          <path
            d={`M${x},${y+6*heartScale} C${x},${y+6*heartScale} ${x-7*heartScale},${y} ${x-7*heartScale},${y-4*heartScale} C${x-7*heartScale},${y-6*heartScale} ${x-5*heartScale},${y-8*heartScale} ${x-3*heartScale},${y-8*heartScale} C${x-2*heartScale},${y-8*heartScale} ${x},${y-7*heartScale} ${x},${y-5*heartScale} C${x},${y-7*heartScale} ${x+2*heartScale},${y-8*heartScale} ${x+3*heartScale},${y-8*heartScale} C${x+5*heartScale},${y-8*heartScale} ${x+7*heartScale},${y-6*heartScale} ${x+7*heartScale},${y-4*heartScale} C${x+7*heartScale},${y} ${x},${y+6*heartScale} ${x},${y+6*heartScale} Z`}
            {...baseProps}
          >
            <animate attributeName="fill-opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite" />
          </path>
        );
      }
      default:
        return (
          <circle cx={x} cy={y} r={badgeRadius} {...baseProps}>
            <animate attributeName="r" values={`${badgeRadius};${badgeRadius + 1};${badgeRadius}`} dur="1.5s" repeatCount="indefinite" />
          </circle>
        );
    }
  };

  // Render image if provided
  const renderImage = (): React.ReactNode => {
    if (!image || imagePosition === 'none') return null;
    
    // If image is a string, assume it's an image path
    if (typeof image === 'string') {
      const imageSize = fontSize; // Scale image with font size
      return (
        <img
          src={image}
          alt=""
          style={{
            width: imageSize,
            height: imageSize,
            objectFit: 'contain'
          }}
          className="logo-image"
        />
      );
    }
    
    // If image is a React node, render it directly
    return <div className="logo-image-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{image}</div>;
  };

  // Determine layout based on image position
  const renderWithImage = () => {
    const logoSvg = (
      <svg 
        width={svgWidth} 
        height={height} 
        viewBox={`0 0 ${svgWidth} ${height}`} 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={`logo-svg dynamic-logo ${sizeClass} ${variantClass}`.trim()}
        style={{ height: `${height}px`, ...style }}
        role="img"
        aria-label={ariaLabel}
      >
        <text ref={textRef} fontFamily={fontFamily} fontSize={fontSize} fontWeight={fontWeight}>
          <tspan x="15" y={isNewLine ? height * 0.4 : height * 0.7} className={firstPartClass}>{firstPart}</tspan>
          {secondPart && (
            <tspan 
              x={isNewLine ? "15" : undefined}
              dy={isNewLine ? fontSize * 1.2 : undefined}
              className={secondPartClass}
            >
              {isNewLine ? secondPart : (hasExplicitSpaces ? ` ${secondPart}` : secondPart)}
            </tspan>
          )}
        </text>
        {renderBadgeShape()}
      </svg>
    );

    const imageElement = renderImage();
    
    if (!imageElement) {
      return logoSvg;
    }

    // Create container with image positioned based on imagePosition
    const containerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    };

    let containerClass = 'logo-container';

    switch (imagePosition) {
      case 'start':
        containerStyle.flexDirection = 'row';
        containerClass += ' logo-image-start';
        break;
      case 'end':
        containerStyle.flexDirection = 'row-reverse';
        containerClass += ' logo-image-end';
        break;
      case 'top-center':
        containerStyle.flexDirection = 'column';
        containerClass += ' logo-image-top';
        break;
      case 'bottom-center':
        containerStyle.flexDirection = 'column-reverse';
        containerClass += ' logo-image-bottom';
        break;
      default:
        // For other positions, default to start
        containerStyle.flexDirection = 'row';
        containerClass += ' logo-image-start';
        break;
    }

    return (
      <div
        {...htmlProps}
        {...styleProps}
        className={`${containerClass} ${className || ''}`.trim()}
        style={{ 
          ...containerStyle,
          cursor: onClick ? 'pointer' : 'default',
          ...style
        }}
        onClick={onClick}
      >
        {imageElement}
        {logoSvg}
      </div>
    );
  };

  return renderWithImage();
}

// Main Logo component with data binding support
function Logo(props: LogoProps) {
  const { dataSource, bindingOptions, ...restProps } = props;

  // Always call hooks unconditionally
  const bindingResult = useDataBinding<LogoModel>(
    dataSource || '',
    restProps as Partial<LogoModel>
  );

  // If no dataSource, use traditional props
  if (!dataSource) {
    return <LogoView {...restProps} />;
  }

  // Use data binding result
  const { loading, error, ...logoProps } = bindingResult;

  // Show loading state
  if (loading) {
    return (
      <div style={{ opacity: 0.5, textAlign: 'center', padding: '16px' }}>
        Loading logo...
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div style={{ color: 'red', textAlign: 'center', padding: '16px' }}>
        Error loading logo: {error.message}
      </div>
    );
  }

  return <LogoView {...logoProps} />;
}

// Mark as QwickApp component
Object.defineProperty(Logo, QWICKAPP_COMPONENT, { value: true, enumerable: false, configurable: true });

// Export types for external use
export type { LogoVariant, LogoSize, LogoBadgeShape, PositionType, BadgeOffset };
export type { LogoProps, LogoViewProps };

export default Logo;
