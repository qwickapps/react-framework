/**
 * ProductCard Schema - Schema definition for ProductCard component
 * 
 * Defines the data structure and form editors for the ProductCard component
 * using the declarative Model pattern with decorators.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { IsOptional, IsString, IsArray, IsUrl, IsIn, IsNumber, Min, Max, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import 'reflect-metadata';
import { Editor, Field, Schema, Model, FieldType, DataType } from '@qwickapps/schema';

@Schema('Product', '1.0.0')
export class ProductModel extends Model {
  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Product ID',
    description: 'Unique product identifier',
    placeholder: 'product-1'
  })
  @IsString()
  @IsNotEmpty()
  id?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Product Name',
    description: 'The display name of the product',
    placeholder: 'Enter product name...'
  })
  @IsString()
  @IsNotEmpty()
  name?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Category',
    description: 'Product category or type',
    placeholder: 'e.g., Software, Hardware, Service'
  })
  @IsString()
  category?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXTAREA,
    label: 'Description',
    description: 'Full product description',
    placeholder: 'Detailed product description...'
  })
  @IsString()
  description?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXTAREA,
    label: 'Short Description',
    description: 'Brief product description for compact view',
    placeholder: 'Brief description...'
  })
  @IsOptional()
  @IsString()
  shortDescription?: string;

  @Field({ type: DataType.ARRAY })
  @Editor({
    field_type: FieldType.REPEATER,
    label: 'Features',
    description: 'List of key product features'
  })
  @IsArray()
  @IsString({ each: true })
  features?: string[];

  @Field({ type: DataType.ARRAY })
  @Editor({
    field_type: FieldType.REPEATER,
    label: 'Technologies',
    description: 'Technologies used in the product'
  })
  @IsArray()
  @IsString({ each: true })
  technologies?: string[];

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Status',
    description: 'Current product status',
    placeholder: 'e.g., Active, Development, Beta'
  })
  @IsString()
  status?: string;

  @Field()
  @Editor({
    field_type: FieldType.IMAGE,
    label: 'Image URL',
    description: 'Product image or screenshot',
    placeholder: 'https://...'
  })
  @IsOptional()
  @IsUrl()
  image?: string;

  @Field()
  @Editor({
    field_type: FieldType.URL,
    label: 'Product URL',
    description: 'Live product URL (for launched products)',
    placeholder: 'https://...'
  })
  @IsOptional()
  @IsUrl()
  url?: string;
}

@Schema('ProductCardAction', '1.0.0')
export class ProductCardActionModel extends Model {
  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Action ID',
    description: 'Unique action identifier',
    placeholder: 'action-1'
  })
  @IsString()
  @IsNotEmpty()
  id?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Button Label',
    description: 'Action button text',
    placeholder: 'Button text...'
  })
  @IsString()
  label?: string;

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Button Style',
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
    label: 'Button Color',
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

@Schema('ProductCard', '1.0.0')
export class ProductCardModel extends Model {
  @Field({ type: DataType.OBJECT })
  @Editor({
    field_type: FieldType.FORM,
    label: 'Product Data',
    description: 'Product information to display'
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProductModel)
  product?: ProductModel;

  @Field({ defaultValue: 'detailed' })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Card Variant',
    description: 'Display variant for the product card',
    validation: {
      options: [
        { label: 'Compact', value: 'compact' },
        { label: 'Detailed', value: 'detailed' }
      ]
    }
  })
  @IsOptional()
  @IsIn(['compact', 'detailed'])
  variant?: 'compact' | 'detailed';

  @Field({ type: DataType.ARRAY })
  @Editor({
    field_type: FieldType.REPEATER,
    label: 'Custom Actions',
    description: 'Custom action buttons'
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductCardActionModel)
  actions?: ProductCardActionModel[];

  @Field({ defaultValue: true })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Show Image',
    description: 'Whether to display the product image'
  })
  @IsOptional()
  showImage?: boolean;

  @Field({ defaultValue: true })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Show Technologies',
    description: 'Whether to display technology chips'
  })
  @IsOptional()
  showTechnologies?: boolean;

  @Field({ defaultValue: 3 })
  @Editor({
    field_type: FieldType.NUMBER,
    label: 'Max Features (Compact)',
    description: 'Maximum features to show in compact mode',
    validation: { min: 1, max: 10 }
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  maxFeaturesCompact?: number;
}


export default ProductCardModel;