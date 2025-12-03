/**
 * Schema for GridLayout component - Flexible grid layout
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { IsBoolean, IsOptional, IsString, IsNumber, IsIn, Min } from 'class-validator';
import 'reflect-metadata';
import { Editor, Field, Schema, FieldType } from '@qwickapps/schema';
import { ContainerSchema } from './ContainerSchema';

@Schema('GridLayout', '1.0.0')
export class GridLayoutModel extends ContainerSchema {
  // children field inherited from ContainerSchema

  @Field()
  @Editor({
    field_type: FieldType.NUMBER,
    label: 'Columns',
    description: 'Number of equal-width columns for auto-distribution'
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  columns?: number;

  @Field({ defaultValue: 'small' })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Spacing',
    description: 'Spacing between grid items'
  })
  @IsOptional()
  @IsString()
  @IsIn(['tiny', 'small', 'medium', 'large', 'huge'])
  spacing?: string;

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Equal Height',
    description: 'Make all grid items the same height'
  })
  @IsOptional()
  @IsBoolean()
  equalHeight?: boolean;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Height',
    description: 'Grid container height (e.g., "400px", "50vh", "medium")',
    placeholder: 'auto'
  })
  @IsOptional()
  @IsString()
  height?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Width',
    description: 'Grid container width (e.g., "100%", "800px", "large")',
    placeholder: '100%'
  })
  @IsOptional()
  @IsString()
  width?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Min Height',
    description: 'Minimum grid container height',
    placeholder: 'auto'
  })
  @IsOptional()
  @IsString()
  minHeight?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Min Width',
    description: 'Minimum grid container width',
    placeholder: 'auto'
  })
  @IsOptional()
  @IsString()
  minWidth?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Max Height',
    description: 'Maximum grid container height',
    placeholder: 'none'
  })
  @IsOptional()
  @IsString()
  maxHeight?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Max Width',
    description: 'Maximum grid container width',
    placeholder: 'none'
  })
  @IsOptional()
  @IsString()
  maxWidth?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'CSS Class',
    description: 'Additional CSS class names',
    placeholder: 'custom-grid-class'
  })
  @IsOptional()
  @IsString()
  className?: string;
}

export default GridLayoutModel;