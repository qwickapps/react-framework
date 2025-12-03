/**
 * PageTemplate Schema - Complete page template configuration
 * 
 * Extends ViewSchema to provide comprehensive page-level configuration
 * including metadata, print settings, and content structure.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Editor, Field, FieldType, Schema } from '@qwickapps/schema';
import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import 'reflect-metadata';
import { PrintConfigSchema } from './PrintConfigSchema';
import { ViewSchema } from './ViewSchema';

@Schema('PageTemplate', '1.0.0')
export class PageTemplateSchema extends ViewSchema {
  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Page Slug',
    description: 'URL-friendly page identifier (e.g., "about-us")',
    placeholder: 'page-slug'
  })
  @IsOptional()
  @IsString()
  slug?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Page Name',
    description: 'Human-readable page name',
    placeholder: 'About Us'
  })
  @IsOptional()
  @IsString()
  name?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXTAREA,
    label: 'Page Description',
    description: 'Description of the page content (used for SEO)',
    placeholder: 'Brief description of this page...'
  })
  @IsOptional()
  @IsString()
  description?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Page Title',
    description: 'HTML title tag content (defaults to name if not provided)',
    placeholder: 'Page Title | Site Name'
  })
  @IsOptional()
  @IsString()
  title?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXTAREA,
    label: 'Meta Keywords',
    description: 'SEO keywords (comma-separated)',
    placeholder: 'keyword1, keyword2, keyword3'
  })
  @IsOptional()
  @IsString()
  metaKeywords?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Meta Author',
    description: 'Page author information',
    placeholder: 'Author Name'
  })
  @IsOptional()
  @IsString()
  metaAuthor?: string;

  @Field()
  @Editor({
    field_type: FieldType.URL,
    label: 'Canonical URL',
    description: 'Canonical URL for SEO (optional)',
    placeholder: 'https://example.com/page'
  })
  @IsOptional()
  @IsString()
  canonicalUrl?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXTAREA,
    label: 'Page Content',
    description: 'Main page content - can include React components and HTML'
  })
  @IsOptional()
  children?: React.ReactNode | string;

  @Field()
  @Editor({
    field_type: FieldType.FORM,
    label: 'Print Configuration',
    description: 'Configuration for print mode behavior'
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => PrintConfigSchema)
  printConfig?: PrintConfigSchema;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Layout Template',
    description: 'Layout template identifier to use for this page',
    placeholder: 'default, fullwidth, sidebar, etc.'
  })
  @IsOptional()
  @IsString()
  layout?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Page Icon',
    description: 'Icon identifier for page (used in navigation)',
    placeholder: 'home, about, contact'
  })
  @IsOptional()
  @IsString()
  icon?: string;

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Requires Authentication',
    description: 'Whether this page requires user authentication'
  })
  @IsOptional()
  requiresAuth?: boolean;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Required Roles',
    description: 'Comma-separated list of roles required to access this page',
    placeholder: 'admin, user, moderator'
  })
  @IsOptional()
  @IsString()
  requiredRoles?: string;

  @Field({ defaultValue: true })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Show in Navigation',
    description: 'Whether to include this page in navigation menus'
  })
  @IsOptional()
  showInNavigation?: boolean;

  @Field({ defaultValue: 0 })
  @Editor({
    field_type: FieldType.NUMBER,
    label: 'Navigation Priority',
    description: 'Priority in navigation (lower numbers appear first)'
  })
  @IsOptional()
  navigationPriority?: number;

  @Field({ defaultValue: true })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Indexable',
    description: 'Whether search engines should index this page'
  })
  @IsOptional()
  indexable?: boolean;
}

export default PageTemplateSchema;