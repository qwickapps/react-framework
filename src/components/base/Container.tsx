/**
 * Container - Factory-based implementation using createSerializableView
 * 
 * Migrated from class-based ModelView to factory pattern for better
 * schema-driven architecture while preserving all functionality.
 * 
 * Key Features:
 * - Factory-based component using createSerializableView
 * - Uses ViewProps for normalized props handling
 * - Integrates with existing useBaseProps utility
 * - Processes all grid, dimension, spacing, and styling props
 * - Supports children rendering and data binding
 * - Full serialization support
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Box } from '@mui/material';
import { SchemaProps } from '@qwickapps/schema';
import { ContainerSchema } from '../../schemas/ContainerSchema';
import { createSerializableView, SerializableComponent } from '../shared/createSerializableView';
import { ViewProps } from '../shared/viewProps';

/**
 * Props interface for Container component - extends ViewProps
 */
export type ContainerProps = ViewProps & SchemaProps<typeof ContainerSchema>;

/**
 * ContainerView - Pure view component that renders the actual container
 * 
 * This component receives fully processed props from createSerializableView
 * and renders the container using Material-UI Box with all styling applied.
 */
function ContainerView({ children, gridProps, ...props }: ContainerProps & { gridProps?: unknown }) {
  // Render the component as a Box with all processed props
  return (
    <Box
      {...props}
      {...(gridProps ? { 'data-grid': JSON.stringify(gridProps) } : {})}
      component="div"
    >
      {children}
    </Box>
  );
}

/**
 * Create Container component using the factory pattern
 */
export const Container: SerializableComponent<ContainerProps> = createSerializableView<ContainerProps>({
  tagName: 'Container',
  version: '1.0.0',
  role: 'container',
  View: ContainerView
});

/**
 * Export the component as default
 */
export default Container;
