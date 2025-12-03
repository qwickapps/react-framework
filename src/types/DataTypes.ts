/**
 * Content Types for QwickApps React Framework
 *
 * These interfaces define the framework-agnostic content structure that can be
 * automatically created and managed across different CMS systems and used
 * for template resolution and component rendering.
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */


/**
 * Base content structure - common properties for all content elements
 */
export interface BaseContent {
  /** Unique identifier for this content element */
  name: string;
  /** Display title for this content element */
  title?: string;
  /** Subtitle or description */
  subtitle?: string;
  /** Short text displayed above the title */
  overline?: string;
  /** Icon identifier or URL for this content element */
  icon?: string;
}


/**
 * Individual content field definition
 */
export interface Field extends BaseContent {
  /** The type of field */
  type: string;
  /** Current value of the field */
  value?: unknown;
  /** Default value for the field */
  defaultValue?: unknown;
  /** Whether this field is required */
  required?: boolean;
  /** Placeholder text for input fields */
  placeholder?: string;
  /** Help text or instructions */
  instructions?: string;
  /** Options for select/radio/checkbox fields */
  choices?: Array<{ label: string; value: unknown }>;
  /** Minimum value (for numbers) or length (for text) */
  min?: number;
  /** Maximum value (for numbers) or length (for text) */
  max?: number;
  /** Regular expression for validation */
  pattern?: string;
}

/**
 * HTTP methods for form submission
 */
export enum FormMethod {
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH'
}

/**
 * Action types for interactive elements
 */
export enum ActionType {
  NAVIGATE = 'navigate',
  SUBMIT = 'submit',
  RESET = 'reset',
  CANCEL = 'cancel'
}

/**
 * Action definition for interactive elements
 */
export interface Action extends BaseContent {
  /** The type of action */
  type: ActionType;
  /** Target URL for navigation actions */
  target?: string;
  /** JavaScript handler function name */
  handler?: string;
  /** Whether the action is disabled */
  disabled?: boolean;
}

/**
 * Field group - container for fields and nested field groups
 */
export interface FieldGroup extends BaseContent {
  /** Child fields in this group */
  fields?: Field[];
  /** Nested field groups */
  fieldGroups?: FieldGroup[];
  /** Actions available for this field group */
  actions?: Action[];
  /** Whether this field group is repeatable */
  repeatable?: boolean;
  /** Minimum number of repetitions */
  minRows?: number;
  /** Maximum number of repetitions */
  maxRows?: number;
}

/**
 * Form-specific field with validation
 */
export interface FormField extends Field {
  /** Validation rules for forms */
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: unknown) => boolean | string;
  };
}

/**
 * Form-specific action
 */
export interface FormAction extends Action {
  type: ActionType;
  /** Form validation behavior */
  validateOnAction?: boolean;
}

/**
 * Form field group
 */
export interface FormFieldGroup extends FieldGroup {
  fields?: FormField[];
  actions?: FormAction[];
  /** Form submission endpoint */
  submitUrl?: string;
  /** Form method */
  method?: FormMethod;
}

/**
 * Content represents any structured data that can be persisted and managed
 * through the CMS. All content is essentially a field group with a unique type name.
 * 
 * Content types are string-based for maximum flexibility - can be anything
 * as long as it's unique (e.g., 'contact', 'product', 'blog-post', 'testimonial').
 */
export interface Data extends FieldGroup {
  /** The type of content - flexible string identifier */
  type: string;
  /** Whether this content should be auto-created if missing */
  autoCreate?: boolean;
}

/**
 * Generic link interface for database persistence
 * This is a simple data structure, not a Content type
 */
export interface Link {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** URL */
  url: string;
  /** Icon identifier or URL */
  icon?: string;
}

/**
 * Social media link extending base Link
 * This is a simple data structure, not a Content type
 */
export interface SocialLink extends Link {
  /** Social media platform */
  platform: string;
  /** Social media handle or username */
  handle?: string;
}

/**
 * Footer section containing multiple links
 * This is a simple data structure, not a Content type
 */
export interface FooterSection {
  /** Unique section identifier */
  id: string;
  /** Section title */
  title: string;
  /** Links in this section */
  items: Link[];
  /** Display order */
  order?: number;
  /** Whether section is visible */
  visible?: boolean;
}
