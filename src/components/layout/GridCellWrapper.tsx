/**
 * GridCellWrapper - Responsive grid cell wrapper for layout consistency
 *
 * This component provides a flexible wrapper for content within a Material-UI Grid,
 * supporting responsive sizing, full-width option, and easy integration with form fields or layout elements.
 *
 * Features:
 * - Responsive grid sizing via breakpoint props (xs, sm, md, lg, xl)
 * - Optional fullWidth prop to force cell to span all columns
 * - Passes additional GridProps for customization
 * - Designed for use in forms and layouts needing consistent grid behavior
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { Grid, GridProps } from '@mui/material';
import { toMuiGridItemProps } from '../../utils/muiGridItem';

/**
 * Props for GridCellWrapper
 * @property children - Content to render inside the grid cell
 * @property xs, sm, md, lg, xl - Grid breakpoint sizes (number or 'auto')
 * @property fullWidth - If true, cell spans all columns (xs=12)
 * @property ...gridProps - Additional GridProps except 'item' and 'children'
 */
export interface GridCellWrapperProps extends Omit<GridProps, 'children'> {
  /** Content to render inside the grid cell */
  children: React.ReactNode;
  /** Grid breakpoint size for extra-small screens */
  xs?: number | 'auto';
  /** Grid breakpoint size for small screens */
  sm?: number | 'auto';
  /** Grid breakpoint size for medium screens */
  md?: number | 'auto';
  /** Grid breakpoint size for large screens */
  lg?: number | 'auto';
  /** Grid breakpoint size for extra-large screens */
  xl?: number | 'auto';
  /** If true, cell spans all columns (xs=12) */
  fullWidth?: boolean;
}

/**
 * GridCellWrapper component
 * Wraps content in a Material-UI Grid cell with responsive sizing and full-width option.
 */
const GridCellWrapper: React.FC<GridCellWrapperProps> = ({
  children,
  xs = 12,
  sm,
  md,
  lg,
  xl,
  fullWidth = false,
  ...gridProps
}) => {
  const responsiveSizing = fullWidth
    ? toMuiGridItemProps({ span: 12 })
    : toMuiGridItemProps({ xs, sm, md, lg, xl });

  return (
    <Grid 
      {...(responsiveSizing ?? {})}
      {...gridProps}
    >
      {children}
    </Grid>
  );
};

export default GridCellWrapper;