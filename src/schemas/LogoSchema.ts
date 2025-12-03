/**
 * Schema for Logo component - Dynamic theme-aware logo
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { DataType, Editor, Field, FieldType, Model, Schema } from '@qwickapps/schema';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { ReactNode } from 'react';
import 'reflect-metadata';

// Logo visual variants
export type LogoVariant = 'default' | 'high-contrast' | 'monochrome' | 'on-primary';

// Logo size options
export type LogoSize = 'tiny' | 'small' | 'medium' | 'large' | 'extra-large';

// Badge shape options
export type LogoBadgeShape = 'circle' | 'star' | 'square' | 'heart';

// Position type for badges and images (updated naming)
export type PositionType = 
  | 'none'
  | 'top-left' 
  | 'top-center' 
  | 'top-right' 
  | 'start'  // was 'center-left'
  | 'center' 
  | 'end'    // was 'center-right'
  | 'bottom-left' 
  | 'bottom-center' 
  | 'bottom-right';

// Badge offset interface
export interface BadgeOffset {
  /** Horizontal offset from the calculated position (positive = right, negative = left) */
  x?: number;
  /** Vertical offset from the calculated position (positive = down, negative = up) */
  y?: number;
}

@Schema('Logo', '1.0.0')
export class LogoModel extends Model {
  @Field({ defaultValue: 'Qwick Apps', dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Logo Name/Text',
    description: 'Logo name/text to display. Supports up to TWO parts with \\n for line breaks and \\s for explicit spaces.',
    placeholder: 'Enter logo text (e.g., "Qwick Apps", "Qwick\\nApps")'
  })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ defaultValue: 'default', dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Visual Variant',
    description: 'Visual style variant of the logo',
    validation: {
      options: [
        { label: 'Default', value: 'default' },
        { label: 'High Contrast', value: 'high-contrast' },
        { label: 'Monochrome', value: 'monochrome' },
        { label: 'On Primary Background', value: 'on-primary' }
      ]
    }
  })
  @IsOptional()
  @IsString()
  @IsIn(['default', 'high-contrast', 'monochrome', 'on-primary'])
  variant?: LogoVariant;

  @Field({ defaultValue: 'medium', dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Size',
    description: 'Size variant of the logo (controls both text size and visual height)',
    validation: {
      options: [
        { label: 'Tiny (16px)', value: 'tiny' },
        { label: 'Small (20px)', value: 'small' },
        { label: 'Medium (28px)', value: 'medium' },
        { label: 'Large (36px)', value: 'large' },
        { label: 'Extra Large (48px)', value: 'extra-large' }
      ]
    }
  })
  @IsOptional()
  @IsString()
  @IsIn(['tiny', 'small', 'medium', 'large', 'extra-large'])
  size?: LogoSize;

  @Field({ defaultValue: 'top-right', dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Badge Position',
    description: 'Badge position and visibility. "none" hides the badge, others show it at the specified position.',
    validation: {
      options: [
        { label: 'None (Hidden)', value: 'none' },
        { label: 'Top Left', value: 'top-left' },
        { label: 'Top Center', value: 'top-center' },
        { label: 'Top Right', value: 'top-right' },
        { label: 'Start (Left Center)', value: 'start' },
        { label: 'Center', value: 'center' },
        { label: 'End (Right Center)', value: 'end' },
        { label: 'Bottom Left', value: 'bottom-left' },
        { label: 'Bottom Center', value: 'bottom-center' },
        { label: 'Bottom Right', value: 'bottom-right' }
      ]
    }
  })
  @IsOptional()
  @IsString()
  @IsIn(['none', 'top-left', 'top-center', 'top-right', 'start', 'center', 'end', 'bottom-left', 'bottom-center', 'bottom-right'])
  badge?: PositionType;

  @Field({ defaultValue: 'circle', dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Badge Shape',
    description: 'Shape of the badge when visible',
    validation: {
      options: [
        { label: 'Circle', value: 'circle' },
        { label: 'Star', value: 'star' },
        { label: 'Square', value: 'square' },
        { label: 'Heart', value: 'heart' }
      ]
    }
  })
  @IsOptional()
  @IsString()
  @IsIn(['circle', 'star', 'square', 'heart'])
  badgeShape?: LogoBadgeShape;

  @Field({ dataType: DataType.NUMBER })
  @Editor({
    field_type: FieldType.NUMBER,
    label: 'Badge Offset X',
    description: 'Horizontal offset from calculated badge position (positive = right, negative = left)',
    placeholder: '0'
  })
  @IsOptional()
  @IsNumber()
  badgeOffsetX?: number;

  @Field({ dataType: DataType.NUMBER })
  @Editor({
    field_type: FieldType.NUMBER,
    label: 'Badge Offset Y',
    description: 'Vertical offset from calculated badge position (positive = down, negative = up)',
    placeholder: '0'
  })
  @IsOptional()
  @IsNumber()
  badgeOffsetY?: number;

  @Field({ defaultValue: 'Segoe UI, sans-serif', dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Font Family',
    description: 'Font family for the logo text',
    placeholder: 'Segoe UI, sans-serif'
  })
  @IsOptional()
  @IsString()
  fontFamily?: string;

  @Field({ defaultValue: 'bold', dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Font Weight',
    description: 'Font weight for the logo text',
    placeholder: 'bold'
  })
  @IsOptional()
  @IsString()
  fontWeight?: string;

  @Field({ defaultValue: 'logo-first-part', dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.TEXT,
    label: 'First Part CSS Class',
    description: 'CSS class name for the first part of the logo text',
    placeholder: 'logo-first-part'
  })
  @IsOptional()
  @IsString()
  firstPartClass?: string;

  @Field({ defaultValue: 'logo-second-part', dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Second Part CSS Class',
    description: 'CSS class name for the second part of the logo text',
    placeholder: 'logo-second-part'
  })
  @IsOptional()
  @IsString()
  secondPartClass?: string;

  // New image support properties
  @Field({ dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.IMAGE,
    label: 'Logo Image',
    description: 'Optional image to display alongside the logo text (ReactNode or image path)',
    placeholder: 'Image path or React component'
  })
  @IsOptional()
  image?: ReactNode | string;

  @Field({ defaultValue: 'start', dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Image Position',
    description: 'Position of the image relative to the logo text',
    validation: {
      options: [
        { label: 'None (Hidden)', value: 'none' },
        { label: 'Top Left', value: 'top-left' },
        { label: 'Top Center', value: 'top-center' },
        { label: 'Top Right', value: 'top-right' },
        { label: 'Start (Left)', value: 'start' },
        { label: 'Center', value: 'center' },
        { label: 'End (Right)', value: 'end' },
        { label: 'Bottom Left', value: 'bottom-left' },
        { label: 'Bottom Center', value: 'bottom-center' },
        { label: 'Bottom Right', value: 'bottom-right' }
      ]
    }
  })
  @IsOptional()
  @IsString()
  @IsIn(['none', 'top-left', 'top-center', 'top-right', 'start', 'center', 'end', 'bottom-left', 'bottom-center', 'bottom-right'])
  imagePosition?: PositionType;
}

export default LogoModel;