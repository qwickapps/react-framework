/**
 * GridLayout - Factory-based implementation using createSerializableView
 * 
 * Migrated from class-based ModelView to factory pattern for better
 * schema-driven architecture while preserving all functionality.
 * 
 * Works with any component that has grid props (span, xs, sm, md, lg, xl)
 * Automatically wraps components in Grid when grid props are detected
 * Full serialization support
 * 
 * Usage:
 * - Traditional: <GridLayout columns={3} spacing="medium">...</GridLayout>
 * - Data-driven: <GridLayout dataSource="layouts.main" />
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { Grid } from '@mui/material';
import { resolveSpacing } from '../../utils/spacing';
import { resolveDimension } from '../../utils/dimensions';
import {
  autoDistributeGridItemProps,
  readChildGridBreakpoints,
  toMuiGridItemProps,
} from '../../utils/muiGridItem';
import { createSerializableView, SerializableComponent } from '../shared/createSerializableView';
import { ViewProps } from '../shared/viewProps';

/**
 * Props interface for GridLayout component - extends ViewProps
 */
export interface GridLayoutProps extends ViewProps {
  /** Number of equal-width columns for auto-distribution */
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Spacing between grid items */
  spacing?: string;
  /** Make all grid items the same height */
  equalHeight?: boolean;
  /** Grid container height */
  height?: string;
  /** Grid container width */
  width?: string;
  /** Minimum grid container height */
  minHeight?: string;
  /** Minimum grid container width */
  minWidth?: string;
  /** Maximum grid container height */
  maxHeight?: string;
  /** Maximum grid container width */
  maxWidth?: string;
  /** MUI sx prop for advanced styling (explicit override for type resolution) */
  sx?: import('@mui/material/styles').SxProps<import('@mui/material/styles').Theme>;
  /** Inline CSS styles (explicit override for type resolution) */
  style?: React.CSSProperties;
}

/**
 * GridLayoutView - Pure view component that renders the actual grid layout
 * 
 * This component receives fully processed props from createSerializableView
 * and renders the grid layout using Material-UI Grid with all styling applied.
 */
function GridLayoutView({
  children,
  columns,
  spacing = 'small',
  equalHeight = false,
  height,
  width,
  minHeight,
  minWidth,
  maxHeight,
  maxWidth,
  gridProps,
  ...props
}: GridLayoutProps & { gridProps?: unknown }) {
  
  const resolvedSpacing = resolveSpacing(spacing);
  
  // Process children to handle grid props
  const processChildren = () => {
    const childArray = React.Children.toArray(children);
    
    return childArray.map((child, index) => {
      if (!React.isValidElement(child)) {
        return child;
      }

      const childProps = child.props as Record<string, unknown>;
      // Direct xs/sm/md/lg, data-grid-* (rendered Box), or nested gridProps
      // from createSerializableView/useBaseProps.
      let childGridProps =
        toMuiGridItemProps(readChildGridBreakpoints(childProps)) ?? {};

      // If columns prop is set and no grid props, auto-distribute responsively
      if (columns && Object.keys(childGridProps).length === 0) {
        childGridProps = autoDistributeGridItemProps(columns);
      }

      // If has grid props, wrap in Grid
      if (Object.keys(childGridProps).length > 0) {
        // Clean grid data attributes from child to avoid duplication
        const cleanedProps = { ...(child.props as Record<string, unknown>) };
        delete cleanedProps['data-grid-span'];
        delete cleanedProps['data-grid-xs'];
        delete cleanedProps['data-grid-sm'];
        delete cleanedProps['data-grid-md'];
        delete cleanedProps['data-grid-lg'];
        delete cleanedProps['data-grid-xl'];
        delete cleanedProps.gridProps;
        delete cleanedProps.span;
        delete cleanedProps.xs;
        delete cleanedProps.sm;
        delete cleanedProps.md;
        delete cleanedProps.lg;
        delete cleanedProps.xl;

        return (
          <Grid key={child.key || index} {...childGridProps}>
            {React.cloneElement(child, cleanedProps)}
          </Grid>
        );
      }

      // Return child wrapped in Fragment with key
      return <React.Fragment key={child.key || index}>{child}</React.Fragment>;
    });
  };

  return (
    <Grid
      container
      spacing={resolvedSpacing}
      {...props}
      {...(gridProps ? { 'data-grid': JSON.stringify(gridProps) } : {})}
      sx={{
        width: '100%', // Ensure full width by default in MUI v6
        height: resolveDimension(height, 'height'),
        minHeight: resolveDimension(minHeight, 'minHeight'),
        minWidth: resolveDimension(minWidth, 'minWidth'),
        maxHeight: resolveDimension(maxHeight, 'maxHeight'),
        maxWidth: resolveDimension(maxWidth, 'maxWidth'),
        ...(width && { width: resolveDimension(width, 'width') }), // Override only if explicitly set
        ...(equalHeight && {
          alignItems: 'stretch',
          // Target direct Grid children - MUI v6 uses .MuiGrid-root for grid items with size prop
          '& > .MuiGrid-root': {
            display: 'flex',
            '& > *': {
              width: '100%',
              height: '100%',
            },
          },
        }),
        ...props.sx,
      }}
    >
      {processChildren()}
    </Grid>
  );
}

/**
 * Create GridLayout component using the factory pattern
 */
export const GridLayout: SerializableComponent<GridLayoutProps> = createSerializableView<GridLayoutProps>({
  tagName: 'GridLayout',
  version: '1.0.0',
  role: 'container',
  View: GridLayoutView
});

/**
 * Export the component as default
 */
export default GridLayout;
