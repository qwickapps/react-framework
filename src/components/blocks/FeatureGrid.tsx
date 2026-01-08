'use client';

/**
 * FeatureGrid Component - Responsive grid for showcasing features with data binding support
 *
 * Enhanced with data binding support through dataSource prop.
 *
 * Usage:
 * - Traditional: <FeatureGrid features={featuresArray} columns={3} gap="medium" />
 * - Data-driven: <FeatureGrid dataSource="pages.home.features" />
 *
 * Features:
 * - Displays feature items in responsive grid layout
 * - Supports icons, titles, descriptions, and actions
 * - Customizable columns, spacing, and equal height
 * - Full CMS integration through dataSource prop
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { WithDataBinding } from '@qwickapps/schema';
import React from 'react';
import { QWICKAPP_COMPONENT, useBaseProps, useDataBinding, WithBaseProps } from '../../hooks';
import FeatureGridModel from '../../schemas/FeatureGridSchema';
import { GridLayout } from '../layout';
import FeatureCard from './FeatureCard';

export interface FeatureItem {
  /** Unique identifier */
  id: string;
  /** Feature icon */
  icon?: React.ReactNode;
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
  /** Optional action/link */
  action?: React.ReactNode;
}

interface FeatureGridViewProps extends WithBaseProps {
  /** Array of feature items */
  features?: FeatureItem[];
  /** Number of columns */
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Grid gap */
  gap?: 'small' | 'medium' | 'large';
  /** Equal height for grid items */
  equalHeight?: boolean;
}

export interface FeatureGridProps extends FeatureGridViewProps, WithDataBinding {}

/**
 * Core FeatureGrid View component - handles feature grid rendering
 */
function FeatureGridView({
  features = [],
  columns = 3,
  gap = 'medium',
  equalHeight = true,
  ...restProps
}: FeatureGridViewProps) {
  const { styleProps, htmlProps } = useBaseProps(restProps);
  
  // Mark as QwickApp component
  Object.assign(FeatureGridView, { [QWICKAPP_COMPONENT]: true });

  // Map gap to spacing value for GridLayout
  const getSpacing = (): 'none' | 'tiny' | 'small' | 'medium' | 'large' | 'huge' => {
    switch (gap) {
      case 'small':
        return 'small';
      case 'medium':
        return 'medium';
      case 'large':
        return 'large';
      default:
        return 'medium';
    }
  };

  return (
    <GridLayout columns={columns} spacing={getSpacing()} equalHeight={equalHeight} {...htmlProps} {...styleProps}>
      {features.map((feature) => (
        <FeatureCard key={feature.id} feature={feature} />
      ))}
    </GridLayout>
  );
}

function FeatureGrid(props: FeatureGridProps) {
  const { dataSource, bindingOptions, ...restProps } = props;

  // Always call hooks unconditionally
  const bindingResult = useDataBinding<FeatureGridModel>(
    dataSource || '',
    restProps as Partial<FeatureGridModel>
  );

  // If no dataSource, use traditional props
  if (!dataSource) {
    return <FeatureGridView {...restProps} />;
  }

  // Use data binding result
  const { loading, error, ...featureGridProps } = bindingResult;

  // Show loading state
  if (loading) {
    const loadingFeatures = Array.from({ length: 3 }, (_, i) => ({
      id: `loading-${i}`,
      title: 'Loading Feature...',
      description: 'Loading feature content from data source'
    }));
    
    return (
      <FeatureGridView
        features={loadingFeatures}
        columns={3}
        gap="medium"
        equalHeight={true}
      />
    );
  }

  if (error) {
    console.error('Error loading feature grid:', error);
    if (process.env.NODE_ENV !== 'production') {
      return (
        <FeatureGridView
          features={[{
            id: 'error-feature',
            title: 'Error Loading Features',
            description: error.message
          }]}
          columns={1}
          gap="medium"
          equalHeight={false}
        />
      );
    }
    return null;
  }

  // Ensure features have a non-optional 'id'
  const safeFeatures =
    Array.isArray(featureGridProps.features)
      ? featureGridProps.features.map((f, idx) => ({
          ...f,
          id: f.id ?? `feature-${idx}`,
          title: f.title ?? '',
          description: f.description ?? '',
        }))
      : featureGridProps.features;

  // Ensure columns is one of the allowed values
  const allowedColumns = [1, 2, 3, 4, 5, 6];
  const columns =
    allowedColumns.includes(featureGridProps.columns as number)
      ? (featureGridProps.columns as 1 | 2 | 3 | 4 | 5 | 6)
      : undefined;

  return <FeatureGridView {...featureGridProps} features={safeFeatures} columns={columns} />;
}

export default FeatureGrid;
export { FeatureGrid };
