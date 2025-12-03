/**
 * Schema for CardListGrid component - Generic grid layout for cards
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { IsArray, IsOptional, IsNumber, IsIn, IsBoolean, IsObject } from 'class-validator';
import 'reflect-metadata';
import { Editor, Field, Schema, FieldType } from '@qwickapps/schema';
import { ContainerSchema } from './ContainerSchema';

@Schema('CardListGrid', '1.0.0')
export class CardListGridModel extends ContainerSchema {
  @Field()
  @Editor({
    field_type: FieldType.REPEATER,
    label: 'Grid Items',
    description: 'Array of items to display in the grid'
  })
  @IsArray()
  items?: unknown[];

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Columns',
    description: 'Number of columns in the grid layout',
    validation: {
      options: [
        { value: 1, label: '1 Column' },
        { value: 2, label: '2 Columns (Default)' },
        { value: 3, label: '3 Columns' },
        { value: 4, label: '4 Columns' },
        { value: 5, label: '5 Columns' },
        { value: 6, label: '6 Columns' }
      ]
    }
  })
  @IsOptional()
  @IsNumber()
  @IsIn([1, 2, 3, 4, 5, 6])
  columns?: 1 | 2 | 3 | 4 | 5 | 6;

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Grid Spacing',
    description: 'Spacing between grid items',
    validation: {
      options: [
        { value: 'none', label: 'No Spacing' },
        { value: 'tiny', label: 'Tiny' },
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large (Default)' },
        { value: 'huge', label: 'Huge' }
      ]
    }
  })
  @IsOptional()
  @IsIn(['none', 'tiny', 'small', 'medium', 'large', 'huge'])
  spacing?: 'none' | 'tiny' | 'small' | 'medium' | 'large' | 'huge';

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Equal Height',
    description: 'Whether all cards should have equal height'
  })
  @IsOptional()
  @IsBoolean()
  equalHeight?: boolean;

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Card Component Type',
    description: 'Type of card component to render for each item',
    validation: {
      options: [
        { value: 'ProductCard', label: 'Product Card' },
        { value: 'FeatureCard', label: 'Feature Card' },
        { value: 'Custom', label: 'Custom Component' }
      ]
    }
  })
  @IsOptional()
  @IsIn(['ProductCard', 'FeatureCard', 'Custom'])
  renderComponent?: 'ProductCard' | 'FeatureCard' | 'Custom';

  @Field()
  @Editor({
    field_type: FieldType.FORM,
    label: 'Item Properties',
    description: 'Additional properties to pass to each rendered item'
  })
  @IsOptional()
  @IsObject()
  itemProps?: Record<string, unknown>;
}


export default CardListGridModel;