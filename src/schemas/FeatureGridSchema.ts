/**
 * FeatureGrid Schema - Defines data structure and validation for FeatureGrid component
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { IsArray, IsOptional, IsNumber, IsIn, IsBoolean, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import 'reflect-metadata';
import { Editor, Field, Schema, Model, FieldType } from '@qwickapps/schema';
import { FeatureItemModel } from './FeatureItemSchema';

@Schema('FeatureGrid', '1.0.0')
export class FeatureGridModel extends Model {
  @Field()
  @Editor({
    field_type: FieldType.REPEATER,
    label: 'Features',
    description: 'Array of feature items'
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FeatureItemModel)
  features?: FeatureItemModel[];

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Columns',
    description: 'Number of columns in the grid',
    validation: {
      options: [
        { label: '1 Column', value: 1 },
        { label: '2 Columns', value: 2 },
        { label: '3 Columns', value: 3 },
        { label: '4 Columns', value: 4 },
        { label: '5 Columns', value: 5 },
        { label: '6 Columns', value: 6 }
      ]
    }
  })
  @IsOptional()
  @IsNumber()
  @IsIn([1, 2, 3, 4, 5, 6])
  columns?: number;

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Gap',
    description: 'Grid gap size',
    validation: {
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' }
      ]
    }
  })
  @IsOptional()
  @IsIn(['small', 'medium', 'large'])
  gap?: 'small' | 'medium' | 'large';

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Equal Height',
    description: 'Whether all grid items should have equal height'
  })
  @IsOptional()
  @IsBoolean()
  equalHeight?: boolean;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'CSS Class',
    description: 'Additional CSS class name',
    placeholder: 'custom-class'
  })
  @IsOptional()
  @IsString()
  className?: string;
}


export default FeatureGridModel;