'use client';

/**
 * PageBannerHeader - Facebook-style banner header with cover image and profile info
 *
 * Similar to social media banners with:
 * - Large cover/banner image background
 * - Profile image overlay (typically bottom-left)
 * - Info section with title, subtitle, and metadata
 * - Action buttons in various positions
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
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { WithDataBinding, SchemaProps } from '@qwickapps/schema';
import React from 'react';
import { useBaseProps, useDataBinding} from '../../hooks';
import PageBannerHeaderModel from '../../schemas/PageBannerHeaderSchema';
import { HeaderAction } from './CoverImageHeader';

type PageBannerHeaderViewProps = Omit<SchemaProps<PageBannerHeaderModel>, 'actions'> & {
  /** Profile/avatar image URL or component (extended from schema string) */
  profileImage?: string | React.ReactNode;
  /** Array of tag strings or JSX elements (extended from schema string[]) */
  tags?: (string | React.ReactNode)[];
  /** Banner height (extended to support string) */
  height?: number | string;
  /** Action buttons (extended from schema to include onClick) */
  actions?: HeaderAction[];
};

export interface PageBannerHeaderProps extends PageBannerHeaderViewProps, WithDataBinding {}

function PageBannerHeaderView({
  coverImage,
  profileImage,
  profileImageAlt = '',
  profileImageSize = 'large',
  overline,
  title,
  subtitle,
  metadata = [],
  tags = [],
  actions = [],
  maxVisibleActions = 3,
  height = 200,
  profilePosition = 'bottom-left',
  ...restProps
}: PageBannerHeaderViewProps) {
  const { gridProps, styleProps, htmlProps } = useBaseProps(restProps);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  // Sort and split actions
  const sortedActions = [...actions].sort((a, b) => (a.priority || 999) - (b.priority || 999));
  const visibleActions = sortedActions.slice(0, maxVisibleActions);
  const overflowActions = sortedActions.slice(maxVisibleActions);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getProfileSize = () => {
    switch (profileImageSize) {
      case 'small': return isMobile ? 64 : 80;
      case 'large': return isMobile ? 100 : 120;
      default: return isMobile ? 80 : 100;
    }
  };

  const renderProfileImage = () => {
    if (!profileImage) return null;

    const size = getProfileSize();
    const offset = profilePosition === 'bottom-left' ? 3 : 0;

    if (typeof profileImage === 'string') {
      return (
        <Avatar
          src={profileImage}
          alt={profileImageAlt}
          sx={{
            width: size,
            height: size,
            border: 4,
            borderColor: 'background.paper',
            position: 'absolute',
            bottom: profilePosition.includes('bottom') ? -offset : '50%',
            left: profilePosition === 'bottom-left' ? 3 : 
                  profilePosition === 'overlay-center' ? '50%' : 'auto',
            right: profilePosition === 'bottom-center' ? 'auto' : 'auto',
            transform: profilePosition === 'overlay-center' ? 'translate(-50%, 50%)' :
                      profilePosition === 'bottom-center' ? 'translateX(-50%)' : 'none',
            zIndex: 2
          }}
        />
      );
    }

    return (
      <Avatar
        sx={{
          width: size,
          height: size,
          border: 4,
          borderColor: 'background.paper',
          position: 'absolute',
          bottom: profilePosition.includes('bottom') ? -offset : '50%',
          left: profilePosition === 'bottom-left' ? 3 : 
                profilePosition === 'overlay-center' ? '50%' : 'auto',
          transform: profilePosition === 'overlay-center' ? 'translate(-50%, 50%)' : 
                    profilePosition === 'bottom-center' ? 'translateX(-50%)' : 'none',
          zIndex: 2
        }}
      >
        {profileImage}
      </Avatar>
    );
  };

  const renderMetadata = () => {
    if (metadata.length === 0) return null;

    return (
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 0.5 }}>
        {metadata.map((item, index) => (
          <Typography
            key={index}
            variant="body2"
            color="text.secondary"
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              fontSize: '0.875rem'
            }}
          >
            <strong>{item.value}</strong> {item.label}
          </Typography>
        ))}
      </Box>
    );
  };

  const renderTags = () => {
    if (tags.length === 0) return null;

    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
        {tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            size="small"
            variant="outlined"
            sx={{ fontSize: '0.75rem', height: '24px' }}
          />
        ))}
      </Box>
    );
  };

  const renderActions = () => {
    if (actions.length === 0) return null;

    return (
      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
        {visibleActions.map((action) => (
          <Button
            key={action.id}
            variant={action.id === visibleActions[0]?.id ? 'contained' : 'outlined'}
            size="small"
            startIcon={action.icon}
            onClick={action.onClick}
            disabled={action.disabled}
            color={action.destructive ? 'error' : 'primary'}
            sx={{ 
              minHeight: 36,
              whiteSpace: 'nowrap',
              ...(isMobile && {
                minWidth: 36,
                '& .MuiButton-startIcon': {
                  mr: { xs: 0, sm: 0.5 }
                },
                '& .MuiButton-startIcon + *': {
                  display: { xs: 'none', sm: 'inline' }
                }
              })
            }}
          >
            {action.label}
          </Button>
        ))}

        {overflowActions.length > 0 && (
          <>
            <IconButton
              size="small"
              onClick={handleMenuOpen}
              aria-label="More actions"
              sx={{ 
                minHeight: 36, 
                minWidth: 36,
                borderRadius: 1,
                border: 1,
                borderColor: 'divider'
              }}
            >
              <MoreIcon />
            </IconButton>
            
            <Menu
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
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

  const profileOffset = profileImage ? (getProfileSize() / 2) : 0;

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
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        mb: profilePosition.includes('bottom') ? `${profileOffset}px` : 0,
        ...styleProps.sx
      }}
      elevation={3}
    >
      {/* Cover Image */}
      {coverImage && (
        <Box
          sx={{
            width: '100%',
            height,
            backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${coverImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative'
          }}
        />
      )}

      {/* Profile Image Overlay */}
      {renderProfileImage()}

      {/* Content Section */}
      <Box 
        sx={{ 
          p: 3,
          pt: profilePosition === 'bottom-left' && profileImage ? `${profileOffset + 24}px` : 3,
          pl: profilePosition === 'bottom-left' && profileImage ? `${getProfileSize() + 32}px` : 3,
          position: 'relative',
          zIndex: 1
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          gap: 2
        }}>
          {/* Info Section */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {overline && (
              <Typography
                variant="overline"
                color="primary"
                sx={{ 
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  mb: 0.25
                }}
              >
                {overline}
              </Typography>
            )}
            
            <Typography
              variant="h4"
              component="h1"
              sx={{ 
                fontWeight: 600,
                lineHeight: 1.2,
                wordBreak: 'break-word',
                mb: subtitle ? 0.5 : 0,
                fontSize: { xs: '1.5rem', md: '2rem' }
              }}
            >
              {title}
            </Typography>
            
            {subtitle && (
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.4, mb: 0.5 }}
              >
                {subtitle}
              </Typography>
            )}

            {renderMetadata()}
            {renderTags()}
          </Box>

          {/* Actions Section */}
          <Box 
            sx={{ 
              flexShrink: 0,
              width: { xs: '100%', md: 'auto' },
              display: 'flex',
              justifyContent: { xs: 'flex-start', md: 'flex-end' },
              mt: { xs: 2, md: 0 }
            }}
          >
            {renderActions()}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

function PageBannerHeader(props: PageBannerHeaderProps) {
  const { dataSource, bindingOptions, ...restProps } = props;

  // Always call hooks unconditionally
  const bindingResult = useDataBinding<PageBannerHeaderModel>(
    dataSource || '',
    restProps as Partial<PageBannerHeaderModel>,
    PageBannerHeaderModel.getSchema(),
    { cache: true, cacheTTL: 300000, strict: false, ...bindingOptions }
  );

  // If no dataSource, use traditional props
  if (!dataSource) {
    return <PageBannerHeaderView {...restProps} />;
  }

  // Use data binding result
  const { loading, error, ...modelProps } = bindingResult;

  // Convert HeaderActionModel[] to HeaderAction[] by adding default onClick handlers
  const convertedActions: HeaderAction[] | undefined = modelProps.actions
    ?.filter((action): action is typeof action & { id: string } => typeof action.id === 'string')
    .map(action => ({
      id: action.id,
      label: action.label,
      icon: action.icon as React.ReactNode,
      disabled: action.disabled,
      destructive: action.destructive,
      priority: action.priority,
      onClick: () => {
        console.debug(`Action clicked: ${action.id} - ${action.label}`);
        // In a real app, this would dispatch events or call configured handlers
      }
    }));

  const pageBannerHeaderProps: PageBannerHeaderViewProps = {
    ...modelProps,
    actions: convertedActions
  };

  // Show loading state  
  if (loading) {
    return (
      <Paper
        component="header"
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          p: 3,
          textAlign: 'center'
        }}
        elevation={3}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 1 }}>
          Loading...
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Loading page banner content...
        </Typography>
      </Paper>
    );
  }

  if (error) {
    console.error('Error loading page banner header:', error);
    if (process.env.NODE_ENV !== 'production') {
      return (
        <Paper
          component="header"
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
            p: 3,
            textAlign: 'center',
            borderColor: 'error.main'
          }}
          elevation={3}
        >
          <Typography variant="h4" component="h1" color="error" sx={{ mb: 1 }}>
            Error Loading Banner
          </Typography>
          <Typography variant="body2" color="error">
            {error.message}
          </Typography>
        </Paper>
      );
    }
    return null;
  }

  return <PageBannerHeaderView {...pageBannerHeaderProps} />;
}

export default PageBannerHeader;