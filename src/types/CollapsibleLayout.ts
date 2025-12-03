/**
 * TypeScript type definitions for CollapsibleLayout component
 * 
 * Provides TypeScript interfaces that extend the schema model with React-specific types
 * and component-level functionality for the CollapsibleLayout component.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { ReactNode } from 'react';
import type { WithDataBinding, SchemaProps } from '@qwickapps/schema';
import type { WithBaseProps } from '../hooks/useBaseProps';
import CollapsibleLayoutModel from '../schemas/CollapsibleLayoutSchema';

/**
 * Core CollapsibleLayout properties extending the schema model
 * 
 * This interface combines the schema-defined properties with React-specific types
 * and additional component functionality not captured in the schema.
 */
export type CollapsibleLayoutViewProps = SchemaProps<CollapsibleLayoutModel> & 
  WithBaseProps & {
    // ========================================
    // React Event Handlers
    // ========================================
    
    /** 
     * Callback fired when the collapsed state changes
     * @param collapsed - The new collapsed state
     */
    onToggle?: (collapsed: boolean) => void;
    
    // ========================================
    // React Node Overrides
    // ========================================
    
    /** Lead icon as React node (overrides string-based leadIcon from schema) */
    leadIcon?: ReactNode;
    
    /** Header actions as React node (overrides string-based headerActions from schema) */
    headerActions?: ReactNode;
    
    /** Collapsed view content as React node (overrides string-based collapsedView from schema) */
    collapsedView?: ReactNode;
    
    /** Main content as React node (overrides string-based children from schema) */
    children?: ReactNode;
    
    /** Footer content as React node (overrides string-based footerView from schema) */
    footerView?: ReactNode;
    
    /** Collapsed state icon as React node (overrides string-based collapsedIcon from schema) */
    collapsedIcon?: ReactNode;
    
    /** Expanded state icon as React node (overrides string-based expandedIcon from schema) */
    expandedIcon?: ReactNode;
    
    // ========================================
    // Additional Component Props
    // ========================================
    
    /** 
     * Unique key for local storage persistence (when persistState is true)
     * Defaults to component id or generates one automatically
     */
    storageKey?: string;
    
    /** 
     * Animation duration in milliseconds 
     * @default 300
     */
    animationDuration?: number;
    
    /**
     * Disable all animations (useful for testing or accessibility)
     * @default false
     */
    disableAnimations?: boolean;
    
    /**
     * Custom CSS class for the container
     */
    containerClassName?: string;
    
    /**
     * Custom CSS class for the header
     */
    headerClassName?: string;
    
    /**
     * Custom CSS class for the content area
     */
    contentClassName?: string;
    
    /**
     * Custom CSS class for the footer
     */
    footerClassName?: string;
    
    // ========================================
    // Accessibility Props
    // ========================================
    
    /** 
     * ARIA label for the toggle button
     * @default "Toggle content visibility"
     */
    toggleAriaLabel?: string;
    
    /**
     * ID of element that describes the collapsible content
     */
    'aria-describedby'?: string;
    
    /**
     * Additional ARIA attributes for the content region
     */
    contentAriaProps?: {
      'aria-label'?: string;
      'aria-labelledby'?: string;
      role?: string;
    };
  };

/**
 * Complete CollapsibleLayout component props interface
 * 
 * This is the interface that should be used by the CollapsibleLayout component.
 * It combines the view props with data binding capabilities.
 */
export interface CollapsibleLayoutProps extends CollapsibleLayoutViewProps, WithDataBinding {}

/**
 * Type guard to check if a component has CollapsibleLayout props
 */
export function isCollapsibleLayoutProps(props: unknown): props is CollapsibleLayoutProps {
  return props && typeof props === 'object' && ('collapsed' in props || 'defaultCollapsed' in props);
}

/**
 * Default props for CollapsibleLayout component
 */
export const defaultCollapsibleLayoutProps: Partial<CollapsibleLayoutProps> = {
  // Note: collapsed is intentionally omitted so components can be uncontrolled
  defaultCollapsed: false,
  triggerArea: 'both',
  animationStyle: 'slide',
  persistState: false,
  showDivider: true,
  variant: 'default',
  headerSpacing: 'comfortable',
  contentSpacing: 'comfortable',
  animationDuration: 300,
  disableAnimations: false,
  toggleAriaLabel: 'Toggle content visibility',
};

/**
 * Animation style configurations
 */
export interface AnimationConfig {
  duration: number;
  easing: string;
  transform?: string;
  opacity?: [number, number];
}

export const animationConfigs: Record<NonNullable<CollapsibleLayoutProps['animationStyle']>, AnimationConfig> = {
  fade: {
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: [0, 1],
  },
  slide: {
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'translateY(-10px)',
  },
  scale: {
    duration: 200,
    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    transform: 'scale(0.95)',
    opacity: [0, 1],
  },
};

/**
 * Spacing configurations
 */
export interface SpacingConfig {
  padding: string;
  gap?: string;
}

export const spacingConfigs: Record<NonNullable<CollapsibleLayoutProps['headerSpacing'] | CollapsibleLayoutProps['contentSpacing']>, SpacingConfig> = {
  compact: {
    padding: '8px 12px',
    gap: '4px',
  },
  comfortable: {
    padding: '16px 20px',
    gap: '8px',
  },
  spacious: {
    padding: '24px 32px', 
    gap: '16px',
  },
};

/**
 * Utility type for extracting controlled vs uncontrolled props
 */
export type ControlledCollapsibleLayoutProps = CollapsibleLayoutProps & {
  collapsed: boolean;
  onToggle: (collapsed: boolean) => void;
};

export type UncontrolledCollapsibleLayoutProps = CollapsibleLayoutProps & {
  defaultCollapsed?: boolean;
  onToggle?: (collapsed: boolean) => void;
};

/**
 * Hook return type for managing collapsed state
 */
export interface UseCollapsibleLayoutState {
  collapsed: boolean;
  toggle: () => void;
  setCollapsed: (collapsed: boolean) => void;
  isControlled: boolean;
}