/**
 * GridCell - Factory-based implementation using createSerializableView
 * 
 * Migrated from class-based ModelView to factory pattern for better
 * schema-driven architecture while preserving all functionality.
 * 
 * A lightweight wrapper that applies grid props to any content
 * Uses the base props pattern for consistency
 * Full serialization support
 * 
 * Usage:
 * - Traditional: <GridCell span={6} background="primary">...</GridCell>
 * - Data-driven: <GridCell dataSource="layout.cell" />
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { Box } from '@mui/material';
import { createSerializableView, SerializableComponent } from '../shared/createSerializableView';
import { ViewProps } from '../shared/viewProps';

/**
 * Props interface for GridCell component - extends ViewProps
 */
export interface GridCellProps extends ViewProps {
  // Note: Grid responsive properties (span, xs, sm, md, lg, xl) are inherited from ViewProps
  // Additional styling properties that might not be in ViewProps
}

/**
 * GridCellView - Pure view component that renders the actual grid cell
 * 
 * This component receives fully processed props from createSerializableView
 * and renders the grid cell using Material-UI Box with all styling applied.
 */
function GridCellView({ children, gridProps, ...props }: GridCellProps & { gridProps?: unknown }) {
  const typedGridProps = gridProps as { span?: number; xs?: number; sm?: number; md?: number; lg?: number; xl?: number } | undefined;
  return (
    <Box
      {...props}
      // Store grid props as data attributes for GridLayout to pick up
      {...(typedGridProps ? {
        'data-grid-span': typedGridProps.span,
        'data-grid-xs': typedGridProps.xs,
        'data-grid-sm': typedGridProps.sm,
        'data-grid-md': typedGridProps.md,
        'data-grid-lg': typedGridProps.lg,
        'data-grid-xl': typedGridProps.xl,
      } : {})}
    >
      {children}
    </Box>
  );
}

/**
 * Create GridCell component using the factory pattern
 */
export const GridCell: SerializableComponent<GridCellProps> = createSerializableView<GridCellProps>({
  tagName: 'GridCell',
  version: '1.0.0',
  role: 'container',
  View: GridCellView
});

/**
 * Export the component as default
 */
export default GridCell;
