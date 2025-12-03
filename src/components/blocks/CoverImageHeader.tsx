'use client';

/**
 * CoverImageHeader - Flexible header with optional image, info section, and context menu
 *
 * Provides a clean header layout similar to modern app interfaces with:
 * - Optional image/avatar on the left
 * - Info section with overline, title, subtitle, and tags
 * - Context menu with up to 3 visible actions + overflow menu
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { MoreVert as MoreIcon } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from '@mui/material';
import { WithDataBinding, SchemaProps } from '@qwickapps/schema';
import React, { useState } from 'react';
import { useBaseProps, useDataBinding, WithBaseProps } from '../../hooks';
import CoverImageHeaderModel from '../../schemas/CoverImageHeaderSchema';
import './CoverImageHeader.css';

export interface HeaderAction {
  /** Unique identifier for the action */
  id: string;
  /** Display label for the action */
  label: string;
  /** Icon component or JSX element */
  icon?: React.ReactNode;
  /** Click handler */
  onClick: () => void;
  /** Whether this action is disabled */
  disabled?: boolean;
  /** Whether this action is destructive (shows with warning styling) */
  destructive?: boolean;
  /** Priority for ordering (lower numbers = higher priority, shown first) */
  priority?: number;
}

type CoverImageHeaderViewProps = Omit<SchemaProps<CoverImageHeaderModel>, 'actions' | 'tags' | 'image'> & WithBaseProps & {
  /** Image URL or React component (extended from schema string) */
  image?: string | React.ReactNode;
  /** Array of tag strings or JSX elements (extended from schema string[]) */
  tags?: (string | React.ReactNode)[];
  /** Context menu actions (extended from schema HeaderActionModel[]) */
  actions?: HeaderAction[];
};

export interface CoverImageHeaderProps extends CoverImageHeaderViewProps, WithDataBinding {}

function CoverImageHeaderView({
  image,
  imageAlt = '',
  imageSize = 'medium',
  imageShape = 'rounded',
  imageBackgroundColor = 'transparent',
  overline,
  title,
  subtitle,
  tags = [],
  actions = [],
  maxVisibleActions = 3,
  variant = 'default',
  background,
  color,
  ...restProps
}: CoverImageHeaderViewProps) {
  const { gridProps, styleProps, htmlProps } = useBaseProps(restProps);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  // Sort actions by priority (lower number = higher priority)
  const sortedActions = [...actions].sort((a, b) => (a.priority || 999) - (b.priority || 999));
  
  // Split actions into visible and overflow
  const visibleActions = sortedActions.slice(0, maxVisibleActions);
  const overflowActions = sortedActions.slice(maxVisibleActions);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getAvatarSize = () => {
    switch (imageSize) {
      case 'small': return 48;
      case 'large': return 80;
      default: return 64;
    }
  };

  const getAvatarVariant = () => {
    switch (imageShape) {
      case 'circle': return 'circular' as const;
      case 'square': return 'square' as const;
      default: return 'rounded' as const;
    }
  };

  const renderImage = () => {
    if (!image) return null;

    const size = getAvatarSize();

    if (typeof image === 'string') {
      return (
        <Avatar
          src={image}
          alt={imageAlt}
          variant={getAvatarVariant()}
          sx={{ width: size, height: size }}
        />
      );
    }

    return (
      <Avatar
        variant={getAvatarVariant()}
        sx={{ width: size, height: size, backgroundColor: imageBackgroundColor ||'transparent' }}
      >
        {image}
      </Avatar>
    );
  };

  const renderTags = () => {
    if (tags.length === 0) return null;

    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
        {tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            size="small"
            color="primary"
            sx={{ fontSize: '0.75rem', height: '24px' }}
          />
        ))}
      </Box>
    );
  };

  const renderActions = () => {
    if (actions.length === 0) return null;

    return (
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5 }}>
        {/* Visible action buttons */}
        {visibleActions.map((action) => (
          <Button
            key={action.id}
            variant="outlined"
            size="small"
            startIcon={action.icon}
            onClick={action.onClick}
            disabled={action.disabled}
            color={action.destructive ? 'error' : 'primary'}
            sx={{ 
              minHeight: 36,
              whiteSpace: 'nowrap',
              '& .MuiButton-startIcon': { mr: 0.5 }
            }}
          >
            {action.label}
          </Button>
        ))}

        {/* Overflow menu */}
        {overflowActions.length > 0 && (
          <>
            <IconButton
              size="small"
              onClick={handleMenuOpen}
              aria-label="More actions"
              color='info'
              sx={{ minHeight: 36, minWidth: 36 }}
            >
              <MoreIcon />
            </IconButton>
            
            <Menu
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              {overflowActions.map((action) => (
                <MenuItem
                  key={action.id}
                  onClick={() => {
                    action.onClick();
                    handleMenuClose();
                  }}
                  disabled={action.disabled}
                  sx={{ 
                    color: action.destructive ? 'error.main' : 'inherit',
                    gap: 1.5,
                    minWidth: 200
                  }}
                >
                  {action.icon && <Box component="span" sx={{ display: 'flex' }}>{action.icon}</Box>}
                  {action.label}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
      </Box>
    );
  };

  const getPadding = () => {
    switch (variant) {
      case 'compact': return 2;
      case 'prominent': return 3;
      default: return 2.5;
    }
  };

  const getGap = () => {
    switch (variant) {
      case 'compact': return 1.5;
      case 'prominent': return 2;
      default: return 2;
    }
  };

  const getElevation = () => {
    switch (variant) {
      case 'default': return 0;
      case 'compact': return 1;
      case 'prominent': return 1;
      default: return 0;
    }
  };

  const backgroundStyle = background ? { 
    background: background.startsWith('http') || background.startsWith('data:') 
      ? `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${background})`
      : background,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  } : {'background': '-var(--theme-primary)'};

  return (
    <Paper
      component="header"
      {...htmlProps}
      {...(gridProps && {
        'data-grid-span': gridProps.span,
        'data-grid-xs': gridProps.xs,
        'data-grid-sm': gridProps.sm,
        'data-grid-md': gridProps.md,
        'data-grid-lg': gridProps.lg,
        'data-grid-xl': gridProps.xl,
      })}
      sx={{
        p: getPadding(),
        borderRadius: getElevation() > 0 ? 2 : 0, // No border radius when elevation is 0
        ...backgroundStyle,
        color: background ? 'white' : 'inherit',
        ...styleProps.sx
      }}
      elevation={getElevation()}
    >
      <Box 
        sx={{ 
          display: 'flex',
          alignItems: variant === 'prominent' ? 'center' : 'flex-start',
          gap: getGap(),
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
          minHeight: variant === 'prominent' ? 120 : 'auto'
        }}
      >
        {/* Image Section */}
        {renderImage()}

        {/* Info Section */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {overline && (
            <Typography
              variant="overline"
              color={color || '--var(--theme-on-primary)'}
              sx={{ 
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 600,
                lineHeight: 1.2,
                mb: 0.25
              }}
            >
              {overline}
            </Typography>
          )}
          
          <Typography
            variant="h5"
            component="h1"
            sx={{ 
              fontWeight: 600,
              lineHeight: 1.3,
              wordBreak: 'break-word',
              mb: subtitle ? 0.25 : 0
            }}
          >
            {title}
          </Typography>
          
          {subtitle && (
            <Typography
              variant="body2"
              color={color || '--var(--theme-on-primary)'}
              sx={{ 
                lineHeight: 1.4,
                mb: tags.length > 0 ? 0 : 0
              }}
            >
              {subtitle}
            </Typography>
          )}
          
          {renderTags()}
        </Box>

        {/* Actions Section */}
        <Box 
          sx={{ 
            flexShrink: 0,
            width: { xs: '100%', sm: 'auto' },
            display: 'flex',
            justifyContent: { xs: 'flex-end', sm: 'flex-start' },
            mt: { xs: 1, sm: 0 }
          }}
        >
          {renderActions()}
        </Box>
      </Box>
    </Paper>
  );
}

// Loading state component
function LoadingState() {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        textAlign: 'center'
      }}
    >
      <Typography variant="body2">Loading Cover Image Header...</Typography>
      <Typography variant="caption" color="text.secondary">
        Loading header content from data source...
      </Typography>
    </Paper>
  );
}

// Error state component (development only)
function ErrorState() {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        textAlign: 'center',
        borderColor: 'error.main'
      }}
    >
      <Typography variant="body2" color="error">
        Error loading cover image header
      </Typography>
    </Paper>
  );
}

function CoverImageHeader(props: CoverImageHeaderProps) {
  const { dataSource, bindingOptions, ...restProps } = props;

  // Always call hooks unconditionally
  const bindingResult = useDataBinding<CoverImageHeaderModel>(
    dataSource || '',
    restProps as Partial<CoverImageHeaderModel>,
    CoverImageHeaderModel.getSchema(),
    { cache: true, cacheTTL: 300000, strict: false, ...bindingOptions }
  );

  // If no dataSource, use traditional props
  if (!dataSource) {
    return <CoverImageHeaderView {...restProps} />;
  }

  // Use data binding result
  const { loading, error, ...coverImageHeaderProps } = bindingResult;

  // Show loading state
  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    console.error('Error loading cover image header:', error);
    if (process.env.NODE_ENV !== 'production') {
      return <ErrorState />;
    }
    return null;
  }

  // Convert HeaderActionModel[] to HeaderAction[] if actions exist
  const { actions: modelActions, ...viewProps } = coverImageHeaderProps;
  const convertedActions: HeaderAction[] = modelActions
    ? modelActions
        .filter(action => typeof action.id === 'string' && !!action.id)
        .map(action => ({
          ...action,
          id: action.id as string,
          onClick: () => console.debug(`Action clicked: ${action.id}`) // Default handler for data-driven actions
        }))
    : [];

  return <CoverImageHeaderView {...viewProps} actions={convertedActions} />;
}

export default CoverImageHeader;