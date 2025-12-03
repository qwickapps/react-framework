/**
 * PrintConfig Schema - Configuration for print mode rendering
 * 
 * Defines how components should behave and appear when printed,
 * including theme settings and layout modifications for print media.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { IsOptional, IsString, IsBoolean, IsIn } from 'class-validator';
import 'reflect-metadata';
import { Editor, Field, FieldType, Model, Schema } from '@qwickapps/schema';
import { ReactNode } from 'react';

@Schema('PrintConfig', '1.0.0')
export class PrintConfigSchema extends Model {
  @Field({ defaultValue: 'light' })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Print Theme',
    description: 'Theme mode to use when printing',
    validation: {
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' }
      ]
    }
  })
  @IsOptional()
  @IsIn(['light', 'dark'])
  theme?: 'light' | 'dark';

  @Field({ defaultValue: 'default' })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Print Palette',
    description: 'Color palette to use for print output',
    validation: {
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Autumn', value: 'autumn' },
        { label: 'Cosmic', value: 'cosmic' },
        { label: 'Ocean', value: 'ocean' },
        { label: 'Spring', value: 'spring' },
        { label: 'Winter', value: 'winter' }
      ]
    }
  })
  @IsOptional()
  @IsString()
  palette?: string;

  @Field({ defaultValue: true })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Hide Scaffolding',
    description: 'Hide app scaffolding (navigation, headers) when printing'
  })
  @IsOptional()
  @IsBoolean()
  hideScaffolding?: boolean;

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Hide Interactive Elements',
    description: 'Hide buttons and interactive elements when printing'
  })
  @IsOptional()
  @IsBoolean()
  hideInteractiveElements?: boolean;

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Optimize For Monochrome',
    description: 'Optimize design for black and white printing'
  })
  @IsOptional()
  @IsBoolean()
  optimizeForMonochrome?: boolean;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Print Title',
    description: 'Custom title to show when printing (optional)',
    placeholder: 'Document Title'
  })
  @IsOptional()
  @IsString()
  printTitle?: string;

  @Field({ defaultValue: true })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Show Print Date',
    description: 'Include print date and time in printed output'
  })
  @IsOptional()
  @IsBoolean()
  showPrintDate?: boolean;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Print Header',
    description: 'Custom header content for printed pages (HTML string or React component)',
    placeholder: '<div>Custom header content...</div>'
  })
  @IsOptional()
  printHeader?: string | ReactNode;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Print Header (First Page)',
    description: 'Different header for the first page only (overrides main header on page 1)',
    placeholder: '<div>First page header...</div>'
  })
  @IsOptional()
  printHeaderFirstPage?: string | ReactNode;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Print Footer',
    description: 'Custom footer content for printed pages (HTML string or React component)',
    placeholder: '<div>Custom footer content...</div>'
  })
  @IsOptional()
  printFooter?: string | ReactNode;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Print Footer (First Page)',
    description: 'Different footer for the first page only (overrides main footer on page 1)',
    placeholder: '<div>First page footer...</div>'
  })
  @IsOptional()
  printFooterFirstPage?: string | ReactNode;

  @Field({ defaultValue: '12mm' })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Page Margins',
    description: 'Print page margins',
    validation: {
      options: [
        { label: 'Compact (6mm)', value: '6mm' },
        { label: 'Standard (12mm)', value: '12mm' },
        { label: 'Large (20mm)', value: '20mm' },
        { label: 'Formal (25mm)', value: '25mm' }
      ]
    }
  })
  @IsOptional()
  @IsString()
  pageMargins?: string;

  @Field({ defaultValue: '60px' })
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Print Header Height',
    description: 'Height allocated for print header (CSS units: px, mm, etc.)',
    placeholder: '60px'
  })
  @IsOptional()
  @IsString()
  printHeaderHeight?: string;

  @Field({ defaultValue: '40px' })
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Print Footer Height',
    description: 'Height allocated for print footer (CSS units: px, mm, etc.)',
    placeholder: '40px'
  })
  @IsOptional()
  @IsString()
  printFooterHeight?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Print Background',
    description: 'CSS background for all printed pages (color, gradient, or image)',
    placeholder: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
  })
  @IsOptional()
  @IsString()
  printBackground?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Print Background (First Page)',
    description: 'Different background for the first page only',
    placeholder: 'url(/logo-watermark.png) no-repeat center, #ffffff'
  })
  @IsOptional()
  @IsString()
  printBackgroundFirstPage?: string;
}

export default PrintConfigSchema;