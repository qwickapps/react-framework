'use client';

/**
 * CardListGrid - Generic grid layout for cards with data binding support
 *
 * A unified grid component that can display any type of card component
 * with consistent spacing and layout. Works with ProductCard, FeatureCard,
 * or any other card-like components. Supports both traditional props and
 * data binding through dataSource.
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { WithDataBinding, SchemaProps } from '@qwickapps/schema';
import React from 'react';
import { useBaseProps, useDataBinding } from '../../hooks';
import CardListGridModel from '../../schemas/CardListGridSchema';
import { GridLayout } from '../layout';
import { FeatureCard } from './FeatureCard';
import { ProductCard } from './ProductCard';

type CardListGridViewProps = SchemaProps<CardListGridModel> & {
  /** Render function for each item (traditional usage) */
  renderItem?: (item: unknown, index: number) => React.ReactNode;
};

export interface CardListGridProps extends CardListGridViewProps, WithDataBinding {
}

// Default render function based on component type
const getDefaultRenderItem = (renderComponent: string = 'ProductCard', itemProps: Record<string, unknown> = {}) => {
  return (item: unknown, index: number) => {
    const key = item?.id || item?.key || index;

    switch (renderComponent) {
      case 'ProductCard':
        return <ProductCard key={key} product={item} {...itemProps} />;
      case 'FeatureCard':
        return <FeatureCard key={key} feature={item} {...itemProps} />;
      case 'Custom':
      default:
        // For custom components, assume the item contains the component data
        return <div key={key}>{JSON.stringify(item)}</div>;
    }
  };
};

// View component - handles the actual rendering
function CardListGridView({
  items = [],
  renderItem,
  renderComponent = 'ProductCard',
  itemProps = {},
  columns = 2,
  spacing = 'large',
  equalHeight = true,
  ...restProps
}: CardListGridViewProps) {
  const { styleProps, htmlProps, restProps: otherProps } = useBaseProps(restProps);

  // Return null if no items and no render function
  if (!items.length && !renderItem) {
    return null;
  }

  // Use provided renderItem or create default based on renderComponent
  const actualRenderItem = renderItem || getDefaultRenderItem(renderComponent, itemProps);

  return (
    <GridLayout
      columns={columns}
      spacing={spacing}
      equalHeight={equalHeight}
      {...htmlProps}
      {...styleProps}
      {...otherProps}
    >
      {items.map((item, index) => actualRenderItem(item, index))}
    </GridLayout>
  );
}

// Main component with data binding support
function CardListGrid(props: CardListGridProps) {
  const { dataSource, bindingOptions, ...restProps } = props;

  // Always call hooks unconditionally
  const result = useDataBinding<CardListGridModel>(
    dataSource || '',
    restProps as Partial<CardListGridModel>
  );

  // If no dataSource, use traditional props
  if (!dataSource) {
    return <CardListGridView {...restProps} />;
  }

  // Use data binding result
  const { loading, error, ...cardListGridProps } = result;

  // Show loading state
  if (loading) {
    return (
      <GridLayout 
        columns={restProps.columns || 2} 
        spacing={restProps.spacing || 'large'}
        style={{ textAlign: 'center', padding: '2rem' }}
      >
        <div>Loading...</div>
      </GridLayout>
    );
  }

  if (error) {
    console.error('Error loading card list grid:', error);
    if (process.env.NODE_ENV !== 'production') {
      return (
        <GridLayout 
          columns={restProps.columns || 2} 
          spacing={restProps.spacing || 'large'}
          style={{ textAlign: 'center', padding: '2rem' }}
        >
          <div>Error Loading Grid: {error.message}</div>
        </GridLayout>
      );
    }
    return null;
  }

  return <CardListGridView {...cardListGridProps} />;
}

export default CardListGrid;
export { CardListGrid };
