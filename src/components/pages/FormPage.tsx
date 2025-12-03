/**
 * FormPage - Reusable page layout for forms with consistent header, status, and footer
 * 
 * Provides a standardized full-page layout for forms with:
 * - CoverImageHeader as the default header with smart branding defaults
 * - Status message handling (info, success, warning, error)
 * - Consistent form container and footer
 * - Background variants (default, gradient, image)
 * - Responsive design for all screen sizes
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import FormBlock from '../forms/FormBlock';

export interface FormPageProps {
  /**
   * Page title (required)
   */
  title: string;
  
  /**
   * Page subtitle/description
   */
  description?: string;
  
  /**
   * Cover image URL or React element for the header
   * If not provided, will use Logo component with app name
   */
  coverImage?: string | React.ReactNode;
  
  /**
   * Form content (required)
   */
  form: React.ReactNode;
  
  /**
   * Footer content
   */
  footer?: React.ReactNode;
  
  /**
   * Status message type
   */
  status?: 'info' | 'success' | 'warning' | 'error';
  
  /**
   * Status message content
   */
  message?: string;
  
  /**
   * Maximum width of the form container
   */
  maxWidth?: 'xs' | 'sm' | 'md';
  
  /**
   * Background style variant
   */
  background?: 'default' | 'gradient' | 'image';
  
  /**
   * Background image URL (when background='image')
   */
  backgroundImage?: string;
  
  /**
   * Custom styling
   */
  sx?: object;
}

/**
 * FormPage component for consistent form page layouts
 */
export const FormPage: React.FC<FormPageProps> = ({
  title,
  description,
  coverImage,
  form,
  footer,
  status,
  message,
  maxWidth = 'sm',
  background = 'default',
  backgroundImage,
}) => {
  return (
    <FormBlock
      title={title}
      description={description}
      coverImage={coverImage}
      children={form}
      footer={footer}
      status={status}
      message={message}
      maxWidth={maxWidth}
      background={background}
      backgroundImage={backgroundImage}
    />
  );
};

export default FormPage;