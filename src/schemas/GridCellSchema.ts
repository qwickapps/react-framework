/**
 * Schema for GridCell component - Grid layout cell wrapper
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { IsOptional, IsString, IsNumber, IsIn } from 'class-validator';
import 'reflect-metadata';
import { Editor, Field, Schema, FieldType } from '@qwickapps/schema';
import { ContainerSchema } from './ContainerSchema';

@Schema('GridCell', '1.0.0')
export class GridCellModel extends ContainerSchema {
  // children field inherited from ContainerSchema

  // Grid responsive properties
  @Field()
  @Editor({
    field_type: FieldType.NUMBER,
    label: 'Span',
    description: 'Number of columns to span (1-12)',
    placeholder: '12'
  })
  @IsOptional()
  @IsNumber()
  @IsIn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
  span?: number;

  @Field()
  @Editor({
    field_type: FieldType.NUMBER,
    label: 'XS (Mobile)',
    description: 'Columns on extra small screens (1-12)',
    placeholder: '12'
  })
  @IsOptional()
  @IsNumber()
  @IsIn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
  xs?: number;

  @Field()
  @Editor({
    field_type: FieldType.NUMBER,
    label: 'SM (Tablet)',
    description: 'Columns on small screens (1-12)',
    placeholder: '6'
  })
  @IsOptional()
  @IsNumber()
  @IsIn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
  sm?: number;

  @Field()
  @Editor({
    field_type: FieldType.NUMBER,
    label: 'MD (Desktop)',
    description: 'Columns on medium screens (1-12)',
    placeholder: '4'
  })
  @IsOptional()
  @IsNumber()
  @IsIn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
  md?: number;

  @Field()
  @Editor({
    field_type: FieldType.NUMBER,
    label: 'LG (Large Desktop)',
    description: 'Columns on large screens (1-12)',
    placeholder: '3'
  })
  @IsOptional()
  @IsNumber()
  @IsIn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
  lg?: number;

  @Field()
  @Editor({
    field_type: FieldType.NUMBER,
    label: 'XL (Extra Large)',
    description: 'Columns on extra large screens (1-12)',
    placeholder: '2'
  })
  @IsOptional()
  @IsNumber()
  @IsIn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
  xl?: number;

  // Styling properties from WithBaseProps
  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Background',
    description: 'Background color or theme color (e.g., "primary.main", "#ffffff")',
    placeholder: 'transparent'
  })
  @IsOptional()
  @IsString()
  background?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Padding',
    description: 'Internal spacing (e.g., "medium", "16px", "1rem")',
    placeholder: 'medium'
  })
  @IsOptional()
  @IsString()
  padding?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Margin',
    description: 'External spacing (e.g., "small", "8px", "0.5rem")',
    placeholder: '0'
  })
  @IsOptional()
  @IsString()
  margin?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Height',
    description: 'Cell height (e.g., "200px", "medium")',
    placeholder: 'auto'
  })
  @IsOptional()
  @IsString()
  height?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Width',
    description: 'Cell width (e.g., "100%", "300px")',
    placeholder: '100%'
  })
  @IsOptional()
  @IsString()
  width?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'CSS Class',
    description: 'Additional CSS class names',
    placeholder: 'custom-cell-class'
  })
  @IsOptional()
  @IsString()
  className?: string;
}

export default GridCellModel;