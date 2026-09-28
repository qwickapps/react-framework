'use client';

/**
 * ActionMenu - Overflow (⋯) menu for card / row actions.
 *
 * Themed IconButton + MUI Menu wrapper. App code imports from
 * @qwickapps/react-framework only — no raw MUI Menu/IconButton.
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React, { useState } from 'react';
import {
  IconButton,
  Menu as MuiMenu,
  MenuItem as MuiMenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export interface ActionMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  danger?: boolean;
  dividerBefore?: boolean;
}

export interface ActionMenuProps {
  items: ActionMenuItem[];
  /** Accessible label for the trigger button */
  ariaLabel?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export function ActionMenu({
  items,
  ariaLabel = 'More actions',
  size = 'small',
  className,
}: ActionMenuProps): React.ReactElement {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(anchor);

  return (
    <>
      <IconButton
        className={className}
        size={size}
        aria-label={ariaLabel}
        aria-haspopup="menu"
        aria-expanded={open ? 'true' : undefined}
        onClick={(e) => {
          e.stopPropagation();
          setAnchor(e.currentTarget);
        }}
        sx={{
          color: 'var(--theme-text-secondary)',
          '&:hover': {
            backgroundColor: 'var(--theme-surface-hover, rgba(0,0,0,0.04))',
            color: 'var(--theme-text-primary)',
          },
        }}
      >
        <MoreVertIcon fontSize="inherit" />
      </IconButton>
      <MuiMenu
        anchorEl={anchor}
        open={open}
        onClose={() => setAnchor(null)}
        onClick={(e) => e.stopPropagation()}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            backgroundColor: 'var(--theme-surface)',
            color: 'var(--theme-text-primary)',
            border: '1px solid var(--theme-border)',
            borderRadius: 'var(--theme-border-radius, 8px)',
            minWidth: 180,
          },
        }}
      >
        {items.map((item) => (
          <React.Fragment key={item.id}>
            {item.dividerBefore ? <Divider sx={{ borderColor: 'var(--theme-border)' }} /> : null}
            <MuiMenuItem
              disabled={item.disabled}
              onClick={() => {
                setAnchor(null);
                item.onClick?.();
              }}
              sx={{
                color: item.danger
                  ? 'var(--palette-error-main, #d32f2f)'
                  : 'var(--theme-text-primary)',
                fontFamily: 'var(--theme-font-family)',
                fontSize: 14,
              }}
            >
              {item.icon ? <ListItemIcon sx={{ color: 'inherit', minWidth: 36 }}>{item.icon}</ListItemIcon> : null}
              <ListItemText>{item.label}</ListItemText>
            </MuiMenuItem>
          </React.Fragment>
        ))}
      </MuiMenu>
    </>
  );
}

export default ActionMenu;
