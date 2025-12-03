/**
 * Dialog - Themed dialog component that wraps MUI Dialog
 *
 * Features:
 * - Uses QwickApps CSS theme variables
 * - Consistent styling with other QwickApps components
 * - Supports all standard MUI Dialog props
 * - Themed DialogTitle, DialogContent, and DialogActions
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React, {} from 'react';
import {
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  DialogActions as MuiDialogActions,
  DialogContentText as MuiDialogContentText,
  DialogTitleProps,
  DialogContentProps,
  DialogActionsProps,
  DialogContentTextProps
} from '@mui/material';

// Re-export MUI Dialog props for convenience
export type DialogProps = MuiDialogProps;

/**
 * Themed Dialog component
 */
export function Dialog({ children, PaperProps, ...props }: DialogProps) {
  return (
    <MuiDialog
      {...props}
      PaperProps={{
        ...PaperProps,
        sx: {
          backgroundColor: 'var(--theme-surface)',
          color: 'var(--theme-text-primary)',
          borderRadius: 'var(--theme-border-radius, 8px)',
          ...PaperProps?.sx
        }
      }}
    >
      {children}
    </MuiDialog>
  );
}

/**
 * Themed DialogTitle component
 */
export function DialogTitle({ children, sx, ...props }: DialogTitleProps) {
  return (
    <MuiDialogTitle
      {...props}
      sx={{
        color: 'var(--theme-text-primary)',
        backgroundColor: 'var(--theme-surface)',
        borderBottom: '1px solid var(--theme-border)',
        ...sx
      }}
    >
      {children}
    </MuiDialogTitle>
  );
}

/**
 * Themed DialogContent component
 */
export function DialogContent({ children, sx, ...props }: DialogContentProps) {
  return (
    <MuiDialogContent
      {...props}
      sx={{
        color: 'var(--theme-text-primary)',
        backgroundColor: 'var(--theme-surface)',
        ...sx
      }}
    >
      {children}
    </MuiDialogContent>
  );
}

/**
 * Themed DialogActions component
 */
export function DialogActions({ children, sx, ...props }: DialogActionsProps) {
  return (
    <MuiDialogActions
      {...props}
      sx={{
        backgroundColor: 'var(--theme-surface)',
        borderTop: '1px solid var(--theme-border)',
        padding: '16px 24px',
        ...sx
      }}
    >
      {children}
    </MuiDialogActions>
  );
}

/**
 * Themed DialogContentText component
 */
export function DialogContentText({ children, sx, ...props }: DialogContentTextProps) {
  return (
    <MuiDialogContentText
      {...props}
      sx={{
        color: 'var(--theme-text-secondary)',
        ...sx
      }}
    >
      {children}
    </MuiDialogContentText>
  );
}

// Default export
export default Dialog;
