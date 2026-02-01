/**
 * Schema for Captcha component - Universal CAPTCHA widget
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { IsIn, IsOptional, IsString } from 'class-validator';
import 'reflect-metadata';
import { Editor, Field, Schema, FieldType } from '@qwickapps/schema';
import ViewSchema from './ViewSchema';

@Schema('Captcha', '1.0.0')
export class CaptchaModel extends ViewSchema {
  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'CAPTCHA Provider',
    description: 'Which CAPTCHA service to use'
  })
  @IsIn(['recaptcha-v2', 'recaptcha-v3', 'hcaptcha', 'turnstile'])
  provider!: 'recaptcha-v2' | 'recaptcha-v3' | 'hcaptcha' | 'turnstile';

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Site Key',
    description: 'Public site key from CAPTCHA provider',
    placeholder: 'Enter site key...'
  })
  @IsString()
  siteKey!: string;

  @Field({ defaultValue: 'light' })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Theme',
    description: 'CAPTCHA widget theme'
  })
  @IsOptional()
  @IsIn(['light', 'dark'])
  theme?: 'light' | 'dark';

  @Field({ defaultValue: 'normal' })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Size',
    description: 'CAPTCHA widget size'
  })
  @IsOptional()
  @IsIn(['normal', 'compact', 'invisible'])
  size?: 'normal' | 'compact' | 'invisible';

  @Field({ defaultValue: 'submit' })
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Action',
    description: 'reCAPTCHA v3 action name',
    placeholder: 'submit'
  })
  @IsOptional()
  @IsString()
  action?: string;
}

export default CaptchaModel;
