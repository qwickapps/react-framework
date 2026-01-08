/**
 * PaletteSwitcher - Color palette switching control component
 * 
 * Provides consistent palette switching with:
 * - Visual palette preview icons
 * - Tooltip with current palette name
 * - Menu-based palette selection
 * - Active palette indicators
 * - Configurable display options
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import Palette from '@mui/icons-material/Palette';
import Circle from '@mui/icons-material/Circle';
const PaletteIcon = Palette;
const CircleIcon = Circle;
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Box,
  Typography,
  Paper,
} from '@mui/material';
import React, { useState } from 'react';
import type { WithDataBinding, SchemaProps } from '@qwickapps/schema';
import { QWICKAPP_COMPONENT, useBaseProps } from '../../hooks';
import { useDataBinding } from '../../hooks';
import { usePalette } from '../../contexts';
import type { PaletteConfig } from '../../contexts';
import PaletteSwitcherModel from '../../schemas/PaletteSwitcherSchema';

type PaletteSwitcherViewProps = SchemaProps<PaletteSwitcherModel>;

export interface PaletteSwitcherProps extends PaletteSwitcherViewProps, WithDataBinding {}

// View component - handles the actual rendering
function PaletteSwitcherView({
  disabled = false,
  buttonSize = 'medium',
  tooltipText,
  showActiveBadge = true,
  showDescriptions = true,
  ...restProps
}: PaletteSwitcherViewProps) {
  const { styleProps, htmlProps } = useBaseProps(restProps);
  const { currentPalette, setPreferredPalette, availablePalettes } = usePalette();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePaletteSelect = (paletteId: string) => {
    setPreferredPalette(paletteId);
    handleClose();
  };

  const getPaletteIcon = (palette: PaletteConfig): React.ReactNode => {
    const isSelected = palette.id === currentPalette;
    return (
      <CircleIcon 
        fontSize="small" 
        sx={{ 
          color: palette.primaryColor,
          filter: isSelected 
            ? 'drop-shadow(0 0 3px currentColor) brightness(1.2)' 
            : 'none',
          transform: isSelected ? 'scale(1.1)' : 'scale(1)',
          transition: 'all 0.2s ease-in-out'
        }} 
      />
    );
  };

  const getCurrentPalette = (): PaletteConfig => {
    return availablePalettes.find(p => p.id === currentPalette) || availablePalettes[0];
  };

  // If no palettes available, return empty state
  if (!availablePalettes || availablePalettes.length === 0) {
    return (
      <Paper
        {...htmlProps}
        {...styleProps}
        variant="outlined"
        sx={{
          p: 2,
          textAlign: 'center',
          opacity: 0.6,
          ...styleProps.sx
        }}
      >
        <Typography variant="body2" color="text.secondary">
          No color palettes available
        </Typography>
      </Paper>
    );
  }

  const defaultTooltipText = `Switch color palette (current: ${getCurrentPalette().name})`;

  return (
    <Box {...htmlProps} {...styleProps}>
      <Tooltip title={tooltipText || defaultTooltipText}>
        <IconButton
          onClick={handleClick}
          disabled={disabled}
          size={buttonSize}
          aria-label="palette switcher"
          aria-controls={open ? 'palette-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          sx={{
            color: 'var(--theme-on-surface, inherit)',
            '&:hover': {
              backgroundColor: 'var(--menu-hover, rgba(0, 0, 0, 0.04))',
            },
          }}
        >
          <PaletteIcon />
        </IconButton>
      </Tooltip>
      
      <Menu
        id="palette-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            'aria-labelledby': 'palette-button',
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {availablePalettes.map((palette) => (
          <MenuItem 
            key={palette.id}
            onClick={() => handlePaletteSelect(palette.id)}
            selected={currentPalette === palette.id}
            sx={{
              '&:hover': {
                backgroundColor: 'action.hover',
              },
              '&.Mui-selected': {
                backgroundColor: 'action.selected',
                '&:hover': {
                  backgroundColor: 'action.selected',
                },
              },
            }}
          >
            <ListItemIcon>
              {getPaletteIcon(palette)}
            </ListItemIcon>
            <ListItemText 
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {palette.name}
                  {showActiveBadge && currentPalette === palette.id && (
                    <Box
                      component="span"
                      sx={{
                        fontSize: '0.75rem',
                        px: 1,
                        py: 0.25,
                        borderRadius: 1,
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                      }}
                    >
                      Active
                    </Box>
                  )}
                </Box>
              }
              secondary={showDescriptions ? palette.description : undefined}
            />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

/**
 * PaletteSwitcher component with data binding support
 * Supports both traditional props and dataSource-driven rendering
 */
function PaletteSwitcher(props: PaletteSwitcherProps) {
  const { dataSource, bindingOptions, ...restProps } = props;

  // Always call hooks unconditionally
  const bindingResult = useDataBinding<PaletteSwitcherModel>(
    dataSource || '',
    restProps as Partial<PaletteSwitcherModel>
  );

  // If no dataSource, use traditional props
  if (!dataSource) {
    return <PaletteSwitcherView {...restProps} />;
  }

  // Use data binding result
  const { loading, error, ...paletteSwitcherProps } = bindingResult;

  // Show loading state
  if (loading) {
    return (
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          textAlign: 'center'
        }}
      >
        <Typography variant="body2">Loading PaletteSwitcher...</Typography>
        <Typography variant="caption" color="text.secondary">
          Loading palette switcher from data source...
        </Typography>
      </Paper>
    );
  }

  if (error) {
    console.error('Error loading palette switcher:', error);
    if (process.env.NODE_ENV !== 'production') {
      return (
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            textAlign: 'center',
            borderColor: 'error.main'
          }}
        >
          <Typography variant="body2" color="error">
            Error loading palette switcher: {error.message}
          </Typography>
        </Paper>
      );
    }
    return null;
  }

  return <PaletteSwitcherView {...paletteSwitcherProps} />;
}

// Mark as QwickApp component
Object.assign(PaletteSwitcher, { [QWICKAPP_COMPONENT]: true });

export default PaletteSwitcher;
