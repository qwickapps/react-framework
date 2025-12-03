/**
 * Schema for Section component - Themed, responsive section container
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { IsOptional, IsString, IsIn } from 'class-validator';
import 'reflect-metadata';
import { Editor, Field, Schema, FieldType } from '@qwickapps/schema';
import { ContainerSchema } from './ContainerSchema';

@Schema('Section', '1.0.0')
export class SectionModel extends ContainerSchema {
  // children field inherited from ContainerSchema

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Background Color',
    description: 'Background color (CSS color, theme path, or palette color)',
    placeholder: '#ffffff or primary.main'
  })
  @IsOptional()
  @IsString()
  background?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Text Color',
    description: 'Text color (CSS color, theme path, or palette color)',
    placeholder: '#000000 or text.primary'
  })
  @IsOptional()
  @IsString()
  color?: string;

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Section Padding',
    description: 'Vertical padding/spacing for the section',
    validation: {
      options: [
        { value: 'none', label: 'None' },
        { value: 'tiny', label: 'Tiny (8px)' },
        { value: 'small', label: 'Small (16px)' },
        { value: 'medium', label: 'Medium (32px)' },
        { value: 'large', label: 'Large (64px)' },
        { value: 'extra-large', label: 'Extra Large (96px)' }
      ]
    }
  })
  @IsOptional()
  @IsIn(['none', 'tiny', 'small', 'medium', 'large', 'extra-large'])
  padding?: 'none' | 'tiny' | 'small' | 'medium' | 'large' | 'extra-large';

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Content Max Width',
    description: 'Maximum width for the content container',
    validation: {
      options: [
        { value: 'xs', label: 'Extra Small (444px)' },
        { value: 'sm', label: 'Small (600px)' },
        { value: 'md', label: 'Medium (900px)' },
        { value: 'lg', label: 'Large (1200px)' },
        { value: 'xl', label: 'Extra Large (1536px)' },
        { value: 'false', label: 'Full Width' }
      ]
    }
  })
  @IsOptional()
  @IsIn(['xs', 'sm', 'md', 'lg', 'xl', 'false'])
  contentMaxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'false';

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'HTML Element',
    description: 'HTML element type to use for the section',
    validation: {
      options: [
        { value: 'section', label: 'Section' },
        { value: 'div', label: 'Div' },
        { value: 'article', label: 'Article' },
        { value: 'main', label: 'Main' }
      ]
    }
  })
  @IsOptional()
  @IsIn(['section', 'div', 'article', 'main'])
  component?: 'section' | 'div' | 'article' | 'main';
}


export default SectionModel;