'use client';

/**
 * OptionSelector - Universal option selection component with visual modes
 *
 * Features:
 * - Multiple display modes (text, color swatches, images)
 * - Multiple variants (buttons, dropdown, grid)
 * - Visual disabled state for unavailable options
 * - Tooltips for unavailable items
 * - Selected state highlighting
 * - Responsive layouts (horizontal, vertical, wrap)
 * - Theme-compliant styling with CSS custom properties
 * - Full serialization support
 *
 * @example
 * // Text mode (sizes, quantities, etc.)
 * <OptionSelector
 *   options={[
 *     { id: 's', label: 'S', available: true },
 *     { id: 'm', label: 'M', available: true },
 *   ]}
 *   displayMode="text"
 * />
 *
 * @example
 * // Color mode (color selection)
 * <OptionSelector
 *   options={[
 *     { id: 'red', label: 'Red', hexValue: '#FF0000', available: true },
 *     { id: 'blue', label: 'Blue', hexValue: '#0000FF', available: true },
 *   ]}
 *   displayMode="color"
 * />
 *
 * @example
 * // Image mode (pattern selection)
 * <OptionSelector
 *   options={[
 *     { id: 'pattern1', label: 'Stripes', imageUrl: '/patterns/stripes.jpg', available: true },
 *   ]}
 *   displayMode="image"
 * />
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React, { useCallback } from 'react';
import { Box, Button, Select, MenuItem, FormControl, InputLabel, Tooltip } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { createSerializableView, SerializableComponent } from '../shared/createSerializableView';
import { ViewProps } from '../shared/viewProps';

export interface SelectOption {
  /** Unique identifier */
  id: string;

  /** Display label */
  label: string;

  /** Whether this option is available for selection */
  available: boolean;

  /** Optional price adjustment */
  price?: number;

  /** Hex color value (for color display mode) */
  hexValue?: string;

  /** Image URL (for image or color display mode) */
  imageUrl?: string;
}

export interface OptionSelectorProps extends ViewProps {
  /** Array of available options */
  options: SelectOption[];

  /** Currently selected option ID */
  selectedOption?: string;

  /** Callback when option is selected */
  onOptionSelect?: (optionId: string) => void;

  /** Display mode */
  displayMode?: 'text' | 'color' | 'image';

  /** Display variant */
  variant?: 'buttons' | 'dropdown' | 'grid';

  /** Layout direction (for buttons variant) */
  layout?: 'horizontal' | 'vertical' | 'wrap';

  /** Visual size (for color/image modes) */
  visualSize?: 'small' | 'medium' | 'large';

  /** Show label below visual (for color/image modes) */
  showLabel?: boolean;

  /** Disable all selections */
  disabled?: boolean;

  /** Label for the selector */
  label?: string;

  /** Data source for dynamic loading */
  dataSource?: string;

  /** Data binding configuration */
  bindingOptions?: Record<string, unknown>;
}

// View component
function OptionSelectorView({
  options = [],
  selectedOption,
  onOptionSelect,
  displayMode = 'text',
  variant = 'grid',
  layout = 'wrap',
  visualSize = 'medium',
  showLabel = false,
  disabled = false,
  label = 'Select Option',
  dataSource,
  bindingOptions,
  // Exclude ViewProps that conflict with MUI FormControl types
  margin: _margin,
  marginTop: _marginTop,
  marginRight: _marginRight,
  marginBottom: _marginBottom,
  marginLeft: _marginLeft,
  marginX: _marginX,
  marginY: _marginY,
  padding: _padding,
  paddingTop: _paddingTop,
  paddingRight: _paddingRight,
  paddingBottom: _paddingBottom,
  paddingLeft: _paddingLeft,
  paddingX: _paddingX,
  paddingY: _paddingY,
  ...restProps
}: OptionSelectorProps) {
  const handleOptionClick = useCallback((optionId: string, available: boolean) => {
    if (!disabled && available && onOptionSelect) {
      onOptionSelect(optionId);
    }
  }, [disabled, onOptionSelect]);

  const handleDropdownChange = useCallback((event: any) => {
    if (onOptionSelect) {
      onOptionSelect(event.target.value);
    }
  }, [onOptionSelect]);

  // Get visual size in pixels
  const getSizePixels = () => {
    if (displayMode === 'text') return 48;
    switch (visualSize) {
      case 'small': return 32;
      case 'large': return 56;
      case 'medium':
      default: return 44;
    }
  };

  const sizeInPx = getSizePixels();

  // Render nothing if no options
  if (!options || options.length === 0) {
    return null;
  }

  // Dropdown variant
  if (variant === 'dropdown') {
    return (
      <FormControl
        fullWidth
        disabled={disabled}
        {...restProps}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'var(--theme-border-main)',
            },
            '&:hover fieldset': {
              borderColor: 'var(--theme-border-emphasis)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'var(--theme-primary)',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'var(--theme-text-secondary)',
            '&.Mui-focused': {
              color: 'var(--theme-primary)',
            },
          },
        }}
      >
        <InputLabel>{label}</InputLabel>
        <Select
          value={selectedOption || ''}
          onChange={handleDropdownChange}
          label={label}
          sx={{
            backgroundColor: 'var(--theme-surface)',
            color: 'var(--theme-text-primary)',
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option.id}
              value={option.id}
              disabled={!option.available}
              sx={{
                color: option.available ? 'var(--theme-text-primary)' : 'var(--theme-text-disabled)',
              }}
            >
              {displayMode === 'color' && option.hexValue && (
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    mr: 1,
                    borderRadius: '50%',
                    backgroundColor: option.hexValue,
                    border: '1px solid var(--theme-border-main)',
                    backgroundImage: option.imageUrl ? `url(${option.imageUrl})` : undefined,
                    backgroundSize: 'cover',
                  }}
                />
              )}
              {option.label}
              {!option.available && ' (Out of stock)'}
              {option.price && option.price !== 0 && ` (+$${(option.price / 100).toFixed(2)})`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  // Buttons/Grid variant with visual modes
  const getLayoutStyles = (): React.CSSProperties => {
    if (variant === 'grid') {
      const minWidth = displayMode === 'text' ? 60 : sizeInPx + 16;
      return {
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}px, 1fr))`,
        gap: displayMode === 'text' ? 1 : 2,
      } as React.CSSProperties;
    }

    return {
      display: 'flex',
      flexDirection: layout === 'vertical' ? 'column' : 'row',
      flexWrap: layout === 'wrap' ? 'wrap' : 'nowrap',
      gap: 1,
    } as React.CSSProperties;
  };

  return (
    <Box {...restProps}>
      {label && (
        <Box
          component="label"
          sx={{
            display: 'block',
            mb: 1,
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'var(--theme-text-primary)',
          }}
        >
          {label}
        </Box>
      )}

      <Box sx={getLayoutStyles()}>
        {options.map((option) => {
          const isSelected = selectedOption === option.id;
          const isAvailable = option.available;

          // Text mode - render as buttons
          if (displayMode === 'text') {
            const button = (
              <Button
                key={option.id}
                onClick={() => handleOptionClick(option.id, isAvailable)}
                disabled={disabled || !isAvailable}
                variant={isSelected ? 'contained' : 'outlined'}
                sx={{
                  minWidth: variant === 'grid' ? '60px' : '80px',
                  height: `${sizeInPx}px`,
                  borderRadius: 'var(--theme-border-radius-small)',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  backgroundColor: isSelected ? 'var(--theme-primary)' : 'var(--theme-surface)',
                  color: isSelected ? 'var(--theme-text-on-primary)' : 'var(--theme-text-primary)',
                  borderColor: isSelected ? 'var(--theme-primary)' : 'var(--theme-border-main)',
                  borderWidth: '2px',
                  borderStyle: 'solid',
                  '&.Mui-disabled': {
                    backgroundColor: 'var(--theme-surface-variant)',
                    color: 'var(--theme-text-disabled)',
                    borderColor: 'var(--theme-border-light)',
                    opacity: 0.5,
                    textDecoration: 'line-through',
                  },
                  '&:hover:not(.Mui-disabled)': {
                    backgroundColor: !isSelected ? 'var(--theme-surface-variant)' : undefined,
                    borderColor: !isSelected ? 'var(--theme-border-emphasis)' : undefined,
                    boxShadow: 'var(--theme-elevation-1)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                {option.label}
              </Button>
            );

            return !isAvailable ? (
              <Tooltip
                key={option.id}
                title="Not available"
                arrow
                sx={{
                  '& .MuiTooltip-tooltip': {
                    backgroundColor: 'var(--theme-surface)',
                    color: 'var(--theme-text-primary)',
                    border: '1px solid var(--theme-border-main)',
                    boxShadow: 'var(--theme-elevation-2)',
                  },
                  '& .MuiTooltip-arrow': {
                    color: 'var(--theme-surface)',
                  },
                }}
              >
                <span>{button}</span>
              </Tooltip>
            ) : button;
          }

          // Color/Image mode - render as visual swatches
          const swatchContent = (
            <Box
              key={option.id}
              onClick={() => handleOptionClick(option.id, isAvailable)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0.5,
                cursor: disabled || !isAvailable ? 'not-allowed' : 'pointer',
                opacity: disabled || !isAvailable ? 0.5 : 1,
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: sizeInPx,
                  height: sizeInPx,
                  borderRadius: displayMode === 'color' ? '50%' : 'var(--theme-border-radius-small)',
                  backgroundColor: option.hexValue || 'var(--theme-surface-variant)',
                  backgroundImage: option.imageUrl ? `url(${option.imageUrl})` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: '2px solid',
                  borderColor: isSelected ? 'var(--theme-primary)' : 'var(--theme-border-main)',
                  boxShadow: isSelected ? 'var(--theme-elevation-2)' : 'none',
                  transition: 'all 0.2s ease-in-out',
                  ...(isAvailable && !disabled && !isSelected && {
                    '&:hover': {
                      borderColor: 'var(--theme-border-emphasis)',
                      boxShadow: 'var(--theme-elevation-1)',
                      transform: 'scale(1.05)',
                    },
                  }),
                  ...(!isAvailable && {
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: '50%',
                      left: '10%',
                      right: '10%',
                      height: '2px',
                      backgroundColor: 'var(--theme-border-emphasis)',
                      transform: 'translateY(-50%) rotate(-45deg)',
                    },
                  }),
                }}
              >
                {isSelected && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: '100%',
                      borderRadius: 'inherit',
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    <CheckIcon
                      sx={{
                        color: 'white',
                        fontSize: sizeInPx * 0.5,
                        filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))',
                      }}
                    />
                  </Box>
                )}
              </Box>

              {showLabel && (
                <Box
                  sx={{
                    fontSize: '0.75rem',
                    color: 'var(--theme-text-secondary)',
                    textAlign: 'center',
                    maxWidth: sizeInPx + 16,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {option.label}
                </Box>
              )}
            </Box>
          );

          return (
            <Tooltip
              key={option.id}
              title={!isAvailable ? 'Not available' : option.label}
              arrow
              sx={{
                '& .MuiTooltip-tooltip': {
                  backgroundColor: 'var(--theme-surface)',
                  color: 'var(--theme-text-primary)',
                  border: '1px solid var(--theme-border-main)',
                  boxShadow: 'var(--theme-elevation-2)',
                },
                '& .MuiTooltip-arrow': {
                  color: 'var(--theme-surface)',
                },
              }}
            >
              {swatchContent}
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
}

// Create the serializable component
export const OptionSelector: SerializableComponent<OptionSelectorProps> =
  createSerializableView<OptionSelectorProps>({
    tagName: 'OptionSelector',
    version: '1.0.0',
    role: 'view',
    View: OptionSelectorView,
  });

export default OptionSelector;
