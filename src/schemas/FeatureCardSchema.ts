/**
 * FeatureCard Schema - Schema definition for FeatureCard component
 * 
 * Defines the data structure and form editors for the FeatureCard component
 * using the declarative Model pattern with decorators.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { IsOptional, IsString, IsArray, IsIn, IsNumber, Min, Max, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import 'reflect-metadata';
import { Editor, Field, Schema, Model, FieldType, DataType } from '@qwickapps/schema';
import { FeatureItemModel } from './FeatureItemSchema';

@Schema('FeatureCardAction', '1.0.0')
export class FeatureCardActionModel extends Model {
  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Action ID',
    description: 'Unique identifier for the action',
    placeholder: 'action-1'
  })
  @IsString()
  @IsNotEmpty()
  id?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Label',
    description: 'Action button label',
    placeholder: 'Button text...'
  })
  @IsString()
  label?: string;

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Style',
    description: 'Button style variant',
    validation: {
      options: [
        { label: 'Contained', value: 'contained' },
        { label: 'Outlined', value: 'outlined' },
        { label: 'Text', value: 'text' }
      ]
    }
  })
  @IsOptional()
  @IsIn(['contained', 'outlined', 'text'])
  variant?: 'contained' | 'outlined' | 'text';

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Color',
    description: 'Button color theme',
    validation: {
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Error', value: 'error' }
      ]
    }
  })
  @IsOptional()
  @IsIn(['primary', 'secondary', 'error'])
  color?: 'primary' | 'secondary' | 'error';

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Disabled',
    description: 'Disabled state'
  })
  @IsOptional()
  disabled?: boolean;
}

@Schema('FeatureCard', '1.0.0')
export class FeatureCardModel extends Model {
  @Field({ type: DataType.OBJECT })
  @Editor({
    field_type: FieldType.FORM,
    label: 'Feature Data',
    description: 'Single feature item to display'
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => FeatureItemModel)
  feature?: FeatureItemModel;

  @Field({ type: DataType.ARRAY })
  @Editor({
    field_type: FieldType.REPEATER,
    label: 'Features List',
    description: 'List of feature strings for list variant'
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  features?: string[];

  @Field({ defaultValue: 'standard' })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Card Type',
    description: 'Display variant for the feature card',
    validation: {
      options: [
        { label: 'Standard', value: 'standard' },
        { label: 'List', value: 'list' }
      ]
    }
  })
  @IsOptional()
  @IsIn(['standard', 'list'])
  variant?: 'standard' | 'list';

  @Field({ type: DataType.ARRAY })
  @Editor({
    field_type: FieldType.REPEATER,
    label: 'Actions',
    description: 'Custom action buttons'
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FeatureCardActionModel)
  actions?: FeatureCardActionModel[];

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Title',
    description: 'Title for list variant',
    placeholder: 'Enter card title...'
  })
  @IsOptional()
  @IsString()
  title?: string;

  @Field()
  @Editor({
    field_type: FieldType.NUMBER,
    label: 'Elevation',
    description: 'Card elevation (0-24)',
    validation: { min: 0, max: 24 }
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(24)
  elevation?: number;
}


export default FeatureCardModel;