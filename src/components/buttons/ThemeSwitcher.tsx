/**
 * ThemeSwitcher - Theme selection control component
 * 
 * Provides consistent theme switching with:
 * - Light/dark/system theme options
 * - Accessible menu interface
 * - Current theme indication
 * - Configurable appearance
 * - Responsive design
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Tooltip,
  Typography
} from '@mui/material';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import SettingsSystemDaydream from '@mui/icons-material/SettingsSystemDaydream';
const DarkModeIcon = DarkMode;
const LightModeIcon = LightMode;
const SystemIcon = SettingsSystemDaydream;
import type { WithDataBinding, SchemaProps } from '@qwickapps/schema';
import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { QWICKAPP_COMPONENT, useBaseProps } from '../../hooks';
import { useDataBinding } from '../../hooks';
import ThemeSwitcherModel from '../../schemas/ThemeSwitcherSchema';
import type { ThemeMode } from '../../utils/themeUtils';

type ThemeSwitcherViewProps = SchemaProps<ThemeSwitcherModel>;

export interface ThemeSwitcherProps extends ThemeSwitcherViewProps, WithDataBinding {}

// View component - handles the actual rendering
function ThemeSwitcherView({
  disabled = false,
  size = 'medium',
  tooltipText,
  showTooltip = true,
  menuPosition = 'bottom',
  showLightTheme = true,
  showDarkTheme = true,
  showSystemTheme = true,
  ...restProps
}: ThemeSwitcherViewProps) {
  const { styleProps, htmlProps } = useBaseProps(restProps);
  const { currentTheme, actualThemeMode, setPreferredTheme } = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeSelect = (newTheme: ThemeMode) => {
    if (disabled) return;
    setPreferredTheme(newTheme);
    handleClose();
  };

  const getCurrentIcon = (): React.ReactNode => {
    switch (actualThemeMode) {
      case 'dark':
        return <DarkModeIcon />;
      case 'light':
        return <LightModeIcon />;
      default:
        return <LightModeIcon />;
    }
  };

  const getTooltipText = (): string => {
    if (tooltipText) return tooltipText;
    
    if (disabled) return 'Theme switcher disabled';
    
    const modeText = currentTheme === 'system' 
      ? `System (${actualThemeMode})`
      : currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1);
    return `Current theme: ${modeText}`;
  };

  const getMenuAnchorOrigin = () => {
    switch (menuPosition) {
      case 'top':
        return { vertical: 'top' as const, horizontal: 'right' as const };
      case 'left':
        return { vertical: 'bottom' as const, horizontal: 'left' as const };
      case 'right':
        return { vertical: 'bottom' as const, horizontal: 'right' as const };
      default: // bottom
        return { vertical: 'bottom' as const, horizontal: 'right' as const };
    }
  };

  const getMenuTransformOrigin = () => {
    switch (menuPosition) {
      case 'top':
        return { vertical: 'bottom' as const, horizontal: 'right' as const };
      case 'left':
        return { vertical: 'top' as const, horizontal: 'right' as const };
      case 'right':
        return { vertical: 'top' as const, horizontal: 'left' as const };
      default: // bottom
        return { vertical: 'top' as const, horizontal: 'right' as const };
    }
  };

  // If no theme options are enabled, show error in development
  if (!showLightTheme && !showDarkTheme && !showSystemTheme) {
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
            Error: No theme options enabled
          </Typography>
        </Paper>
      );
    }
    return null;
  }

  const themeSwitcher = (
    <span suppressHydrationWarning>
      <IconButton
        {...htmlProps}
        onClick={handleClick}
        disabled={disabled}
        size={size}
        aria-label="theme switcher"
        aria-controls={open ? 'theme-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        suppressHydrationWarning
        sx={{
          color: 'var(--theme-on-surface, inherit)',
          '&:hover': {
            backgroundColor: 'var(--menu-hover, rgba(0, 0, 0, 0.04))',
          },
          '&:disabled': {
            color: 'var(--theme-disabled, rgba(0, 0, 0, 0.26))',
          },
          ...styleProps.sx
        }}
        className={styleProps.className}
      >
        {getCurrentIcon()}
      </IconButton>

      <Menu
        id="theme-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            'aria-labelledby': 'theme-button',
          },
        }}
        anchorOrigin={getMenuAnchorOrigin()}
        transformOrigin={getMenuTransformOrigin()}
      >
        {showLightTheme && (
          <MenuItem
            onClick={() => handleThemeSelect('light')}
            selected={currentTheme === 'light'}
          >
            <ListItemIcon>
              <LightModeIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Light</ListItemText>
          </MenuItem>
        )}

        {showDarkTheme && (
          <MenuItem
            onClick={() => handleThemeSelect('dark')}
            selected={currentTheme === 'dark'}
          >
            <ListItemIcon>
              <DarkModeIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Dark</ListItemText>
          </MenuItem>
        )}

        {showSystemTheme && (
          <MenuItem
            onClick={() => handleThemeSelect('system')}
            selected={currentTheme === 'system'}
          >
            <ListItemIcon>
              <SystemIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>System</ListItemText>
          </MenuItem>
        )}
      </Menu>
    </span>
  );

  return showTooltip ? (
    <Tooltip title={getTooltipText()}>
      {themeSwitcher}
    </Tooltip>
  ) : themeSwitcher;
}

/**
 * ThemeSwitcher component with data binding support
 * Supports both traditional props and dataSource-driven rendering
 */
function ThemeSwitcher(props: ThemeSwitcherProps) {
  const { dataSource, bindingOptions, ...restProps } = props;

  // Always call hooks unconditionally
  const bindingResult = useDataBinding<ThemeSwitcherModel>(
    dataSource || '',
    restProps as Partial<ThemeSwitcherModel>
  );

  // If no dataSource, use traditional props
  if (!dataSource) {
    return <ThemeSwitcherView {...restProps} />;
  }

  // Use data binding result
  const { loading, error, ...themeSwitcherProps } = bindingResult;

  // Show loading state
  if (loading) {
    return (
      <IconButton disabled size="medium">
        <LightModeIcon />
      </IconButton>
    );
  }

  if (error) {
    console.error('Error loading theme switcher:', error);
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
            Error loading theme switcher: {error.message}
          </Typography>
        </Paper>
      );
    }
    return null;
  }

  return <ThemeSwitcherView {...themeSwitcherProps} />;
}

// Mark as QwickApp component
Object.assign(ThemeSwitcher, { [QWICKAPP_COMPONENT]: true });

export default ThemeSwitcher;
