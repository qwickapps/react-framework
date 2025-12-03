/**
 * Real-World Component Serialization Scenario Tests
 * 
 * Tests actual usage patterns and scenarios that the serialization system
 * will encounter in production environments, including API data transformation,
 * form submissions, page builders, and content management systems.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React, { ReactElement } from 'react';
import { ComponentTransformer } from '../ComponentTransformer';
import { Serializable, SerializableConstructor } from '../../types/Serializable';

// Realistic component implementations based on common patterns
class RealButton implements Serializable {
  constructor(public props: {
    id?: string;
    label?: string;
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    icon?: string;
    href?: string;
    target?: '_blank' | '_self';
    onClick?: string; // Event handler name/reference
    'data-testid'?: string;
    'aria-label'?: string;
    className?: string;
  }) {}

  static fromJson(jsonData: Record<string, unknown>): ReactElement {
    const isLink = !!jsonData.href;
    const element = isLink ? 'a' : 'button';

    const props: Record<string, unknown> = {
      id: jsonData.id,
      className: [
        'btn',
        `btn-${jsonData.variant || 'primary'}`,
        `btn-${jsonData.size || 'md'}`,
        jsonData.loading ? 'btn-loading' : '',
        jsonData.className || ''
      ].filter(Boolean).join(' '),
      disabled: jsonData.disabled || jsonData.loading,
      'data-testid': jsonData['data-testid'],
      'aria-label': jsonData['aria-label'] || jsonData.label
    };

    if (isLink) {
      props.href = jsonData.href;
      props.target = jsonData.target || '_self';
    } else {
      props.type = 'button';
      if (jsonData.onClick) {
        props['data-onclick'] = jsonData.onClick;
      }
    }

    const children = [
      jsonData.icon ? React.createElement('i', { 
        key: 'icon', 
        className: `icon icon-${jsonData.icon}` 
      }) : null,
      jsonData.loading ? React.createElement('span', { 
        key: 'spinner', 
        className: 'spinner' 
      }) : null,
      jsonData.label ? React.createElement('span', { 
        key: 'label' 
      }, jsonData.label) : null
    ].filter(Boolean);

    return React.createElement(element, props, children);
  }

  toJson(): Record<string, unknown> {
    return {
      id: this.props.id,
      label: this.props.label,
      variant: this.props.variant,
      size: this.props.size,
      disabled: this.props.disabled,
      loading: this.props.loading,
      icon: this.props.icon,
      href: this.props.href,
      target: this.props.target,
      onClick: this.props.onClick,
      'data-testid': this.props['data-testid'],
      'aria-label': this.props['aria-label'],
      className: this.props.className
    };
  }
}

class RealCard implements Serializable {
  constructor(public props: {
    id?: string;
    title?: string;
    subtitle?: string;
    content?: string;
    image?: {
      src: string;
      alt?: string;
      width?: number;
      height?: number;
    };
    metadata?: {
      author?: string;
      date?: string;
      tags?: string[];
      category?: string;
      readTime?: string;
    };
    actions?: React.ReactNode[];
    variant?: 'default' | 'outlined' | 'elevated';
    clickable?: boolean;
    href?: string;
    className?: string;
  }) {}

  static fromJson(jsonData: unknown): ReactElement {
    const actions = jsonData.actions ? ComponentTransformer.deserialize(jsonData.actions) : null;
    const isClickable = jsonData.clickable || jsonData.href;
    
    const cardContent = [
      jsonData.image ? React.createElement('div', {
        key: 'image',
        className: 'card-image'
      }, React.createElement('img', {
        src: jsonData.image.src,
        alt: jsonData.image.alt || jsonData.title || 'Card image',
        width: jsonData.image.width,
        height: jsonData.image.height,
        loading: 'lazy'
      })) : null,
      
      React.createElement('div', {
        key: 'body',
        className: 'card-body'
      }, [
        jsonData.title ? React.createElement('h3', {
          key: 'title',
          className: 'card-title'
        }, jsonData.title) : null,
        
        jsonData.subtitle ? React.createElement('p', {
          key: 'subtitle',
          className: 'card-subtitle'
        }, jsonData.subtitle) : null,
        
        jsonData.content ? React.createElement('div', {
          key: 'content',
          className: 'card-content',
          dangerouslySetInnerHTML: { __html: jsonData.content }
        }) : null,
        
        jsonData.metadata ? React.createElement('div', {
          key: 'metadata',
          className: 'card-metadata'
        }, [
          jsonData.metadata.author ? React.createElement('span', {
            key: 'author',
            className: 'card-author'
          }, `By ${jsonData.metadata.author}`) : null,
          
          jsonData.metadata.date ? React.createElement('time', {
            key: 'date',
            className: 'card-date',
            dateTime: jsonData.metadata.date
          }, jsonData.metadata.date) : null,
          
          jsonData.metadata.readTime ? React.createElement('span', {
            key: 'readTime',
            className: 'card-read-time'
          }, jsonData.metadata.readTime) : null,
          
          jsonData.metadata.tags ? React.createElement('div', {
            key: 'tags',
            className: 'card-tags'
          }, jsonData.metadata.tags.map((tag: string, index: number) => 
            React.createElement('span', {
              key: index,
              className: 'card-tag'
            }, tag)
          )) : null
        ].filter(Boolean)) : null,
        
        actions ? React.createElement('div', {
          key: 'actions',
          className: 'card-actions'
        }, actions) : null
      ].filter(Boolean))
    ].filter(Boolean);

    const props: unknown = {
      id: jsonData.id,
      className: [
        'card',
        `card-${jsonData.variant || 'default'}`,
        isClickable ? 'card-clickable' : '',
        jsonData.className || ''
      ].filter(Boolean).join(' '),
      'data-testid': 'real-card'
    };

    if (jsonData.href) {
      return React.createElement('a', {
        ...props,
        href: jsonData.href,
        className: `${props.className} card-link`
      }, cardContent);
    }

    return React.createElement('div', props, cardContent);
  }

  toJson(): unknown {
    return {
      id: this.props.id,
      title: this.props.title,
      subtitle: this.props.subtitle,
      content: this.props.content,
      image: this.props.image,
      metadata: this.props.metadata,
      actions: this.props.actions ? ComponentTransformer.serialize(this.props.actions) : null,
      variant: this.props.variant,
      clickable: this.props.clickable,
      href: this.props.href,
      className: this.props.className
    };
  }
}

class RealSection implements Serializable {
  constructor(public props: {
    id?: string;
    title?: string;
    subtitle?: string;
    children?: unknown;
    layout?: 'container' | 'full-width' | 'grid';
    columns?: number;
    gap?: string;
    padding?: string;
    backgroundColor?: string;
    backgroundImage?: string;
    textAlign?: 'left' | 'center' | 'right';
    className?: string;
    'data-section'?: string;
  }) {}

  static fromJson(jsonData: unknown): ReactElement {
    const children = jsonData.children ? ComponentTransformer.deserialize(jsonData.children) : null;
    
    const sectionStyle: React.CSSProperties = {
      backgroundColor: jsonData.backgroundColor,
      backgroundImage: jsonData.backgroundImage ? `url(${jsonData.backgroundImage})` : undefined,
      padding: jsonData.padding,
      textAlign: jsonData.textAlign as unknown,
      gap: jsonData.gap
    };

    const contentProps: unknown = {
      className: 'section-content'
    };

    if (jsonData.layout === 'grid' && jsonData.columns) {
      contentProps.style = {
        display: 'grid',
        gridTemplateColumns: `repeat(${jsonData.columns}, 1fr)`,
        gap: jsonData.gap || '1rem'
      };
    } else if (jsonData.layout === 'container') {
      contentProps.className += ' container';
    }

    return React.createElement('section', {
      id: jsonData.id,
      className: [
        'section',
        `section-${jsonData.layout || 'container'}`,
        jsonData.className || ''
      ].filter(Boolean).join(' '),
      style: sectionStyle,
      'data-section': jsonData['data-section'],
      'data-testid': 'real-section'
    }, [
      jsonData.title || jsonData.subtitle ? React.createElement('header', {
        key: 'header',
        className: 'section-header'
      }, [
        jsonData.title ? React.createElement('h2', {
          key: 'title',
          className: 'section-title'
        }, jsonData.title) : null,
        
        jsonData.subtitle ? React.createElement('p', {
          key: 'subtitle',
          className: 'section-subtitle'
        }, jsonData.subtitle) : null
      ].filter(Boolean)) : null,
      
      children ? React.createElement('div', contentProps, children) : null
    ].filter(Boolean));
  }

  toJson(): unknown {
    return {
      id: this.props.id,
      title: this.props.title,
      subtitle: this.props.subtitle,
      children: this.props.children ? ComponentTransformer.serialize(this.props.children) : null,
      layout: this.props.layout,
      columns: this.props.columns,
      gap: this.props.gap,
      padding: this.props.padding,
      backgroundColor: this.props.backgroundColor,
      backgroundImage: this.props.backgroundImage,
      textAlign: this.props.textAlign,
      className: this.props.className,
      'data-section': this.props['data-section']
    };
  }
}

class RealFormField implements Serializable {
  constructor(public props: {
    id?: string;
    name: string;
    label?: string;
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'textarea' | 'select';
    value?: unknown;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    validation?: {
      pattern?: string;
      minLength?: number;
      maxLength?: number;
      min?: number;
      max?: number;
    };
    options?: { value: string; label: string }[]; // For select fields
    rows?: number; // For textarea
    helperText?: string;
    error?: string;
    className?: string;
  }) {}

  static fromJson(jsonData: unknown): ReactElement {
    const fieldId = jsonData.id || `field-${jsonData.name}`;
    const hasError = !!jsonData.error;
    
    let inputElement: ReactElement;
    
    if (jsonData.type === 'textarea') {
      inputElement = React.createElement('textarea', {
        id: fieldId,
        name: jsonData.name,
        value: jsonData.value || '',
        placeholder: jsonData.placeholder,
        required: jsonData.required,
        disabled: jsonData.disabled,
        readOnly: jsonData.readOnly,
        rows: jsonData.rows || 3,
        minLength: jsonData.validation?.minLength,
        maxLength: jsonData.validation?.maxLength,
        className: `form-control ${hasError ? 'is-invalid' : ''}`,
        'aria-describedby': jsonData.helperText || jsonData.error ? `${fieldId}-help` : undefined
      });
    } else if (jsonData.type === 'select') {
      inputElement = React.createElement('select', {
        id: fieldId,
        name: jsonData.name,
        value: jsonData.value || '',
        required: jsonData.required,
        disabled: jsonData.disabled,
        className: `form-control ${hasError ? 'is-invalid' : ''}`,
        'aria-describedby': jsonData.helperText || jsonData.error ? `${fieldId}-help` : undefined
      }, [
        React.createElement('option', { key: 'empty', value: '' }, 'Select an option'),
        ...(jsonData.options || []).map((option: unknown, index: number) => 
          React.createElement('option', { 
            key: index, 
            value: option.value 
          }, option.label)
        )
      ]);
    } else {
      inputElement = React.createElement('input', {
        id: fieldId,
        name: jsonData.name,
        type: jsonData.type || 'text',
        value: jsonData.value || '',
        placeholder: jsonData.placeholder,
        required: jsonData.required,
        disabled: jsonData.disabled,
        readOnly: jsonData.readOnly,
        pattern: jsonData.validation?.pattern,
        minLength: jsonData.validation?.minLength,
        maxLength: jsonData.validation?.maxLength,
        min: jsonData.validation?.min,
        max: jsonData.validation?.max,
        className: `form-control ${hasError ? 'is-invalid' : ''}`,
        'aria-describedby': jsonData.helperText || jsonData.error ? `${fieldId}-help` : undefined
      });
    }

    return React.createElement('div', {
      className: [
        'form-field',
        hasError ? 'form-field-error' : '',
        jsonData.className || ''
      ].filter(Boolean).join(' '),
      'data-testid': 'real-form-field'
    }, [
      jsonData.label ? React.createElement('label', {
        key: 'label',
        htmlFor: fieldId,
        className: 'form-label'
      }, [
        jsonData.label,
        jsonData.required ? React.createElement('span', {
          key: 'required',
          className: 'required',
          'aria-label': 'required'
        }, ' *') : null
      ]) : null,
      
      inputElement,
      
      (jsonData.helperText || jsonData.error) ? React.createElement('div', {
        key: 'help',
        id: `${fieldId}-help`,
        className: hasError ? 'form-error' : 'form-help'
      }, jsonData.error || jsonData.helperText) : null
    ].filter(Boolean));
  }

  toJson(): unknown {
    return {
      id: this.props.id,
      name: this.props.name,
      label: this.props.label,
      type: this.props.type,
      value: this.props.value,
      placeholder: this.props.placeholder,
      required: this.props.required,
      disabled: this.props.disabled,
      readOnly: this.props.readOnly,
      validation: this.props.validation,
      options: this.props.options,
      rows: this.props.rows,
      helperText: this.props.helperText,
      error: this.props.error,
      className: this.props.className
    };
  }
}

describe('Real-World Component Serialization Scenarios', () => {
  beforeEach(() => {
    ComponentTransformer.clearRegistry();
    ComponentTransformer.registerComponent('RealButton', RealButton as SerializableConstructor);
    ComponentTransformer.registerComponent('RealCard', RealCard as SerializableConstructor);
    ComponentTransformer.registerComponent('RealSection', RealSection as SerializableConstructor);
    ComponentTransformer.registerComponent('RealFormField', RealFormField as SerializableConstructor);
  });

  afterEach(() => {
    ComponentTransformer.clearRegistry();
  });

  describe('API Data Transformation', () => {
    it('should handle blog post API data transformation', () => {
      // Simulate API response for a blog post
      const blogPostApiData = {
        id: 'post-123',
        title: 'Building Scalable React Applications',
        subtitle: 'A comprehensive guide to modern React development',
        author: 'Jane Developer',
        publishedAt: '2025-01-01T10:00:00Z',
        readTime: '8 min read',
        tags: ['React', 'JavaScript', 'Web Development'],
        coverImage: {
          url: 'https://example.com/cover.jpg',
          width: 1200,
          height: 630,
          alt: 'React application architecture diagram'
        },
        content: '<p>React applications can be complex...</p><p>In this article, we\'ll explore...</p>',
        category: 'Technology'
      };

      // Transform to component structure
      const componentStructure = {
        tag: 'RealCard',
        version: '1.0.0',
        data: {
          id: blogPostApiData.id,
          title: blogPostApiData.title,
          subtitle: blogPostApiData.subtitle,
          content: blogPostApiData.content,
          image: {
            src: blogPostApiData.coverImage.url,
            alt: blogPostApiData.coverImage.alt,
            width: blogPostApiData.coverImage.width,
            height: blogPostApiData.coverImage.height
          },
          metadata: {
            author: blogPostApiData.author,
            date: new Date(blogPostApiData.publishedAt).toLocaleDateString(),
            tags: blogPostApiData.tags,
            category: blogPostApiData.category,
            readTime: blogPostApiData.readTime
          },
          href: `/blog/${blogPostApiData.id}`,
          variant: 'elevated'
        }
      };

      const result = ComponentTransformer.deserialize(componentStructure);
      expect(React.isValidElement(result)).toBe(true);
      
      const element = result as ReactElement;
      expect(element.props['data-testid']).toBe('real-card');
      expect(element.props.href).toBe('/blog/post-123');
      expect(element.props.className).toContain('card-elevated');
    });

    it('should handle e-commerce product listing API data', () => {
      const productListingApiData = [
        {
          id: 'prod-1',
          name: 'Wireless Headphones',
          price: 199.99,
          originalPrice: 249.99,
          rating: 4.5,
          reviewCount: 128,
          image: 'https://example.com/headphones.jpg',
          inStock: true,
          category: 'Electronics'
        },
        {
          id: 'prod-2',
          name: 'Smart Watch',
          price: 299.99,
          rating: 4.8,
          reviewCount: 89,
          image: 'https://example.com/watch.jpg',
          inStock: false,
          category: 'Electronics'
        }
      ];

      const productGrid = {
        tag: 'RealSection',
        version: '1.0.0',
        data: {
          title: 'Featured Products',
          layout: 'grid',
          columns: 2,
          gap: '2rem',
          className: 'product-grid',
          children: productListingApiData.map(product => ({
            tag: 'RealCard',
            version: '1.0.0',
            data: {
              id: product.id,
              title: product.name,
              content: `$${product.price}${product.originalPrice ? ` <del>$${product.originalPrice}</del>` : ''}`,
              image: {
                src: product.image,
                alt: product.name
              },
              metadata: {
                category: product.category,
                tags: [`⭐ ${product.rating} (${product.reviewCount} reviews)`]
              },
              actions: [
                {
                  tag: 'RealButton',
                  version: '1.0.0',
                  data: {
                    label: product.inStock ? 'Add to Cart' : 'Out of Stock',
                    variant: product.inStock ? 'primary' : 'secondary',
                    disabled: !product.inStock,
                    icon: product.inStock ? 'cart' : 'clock'
                  }
                }
              ]
            }
          }))
        }
      };

      const result = ComponentTransformer.deserialize(productGrid);
      expect(React.isValidElement(result)).toBe(true);
      
      const section = result as ReactElement;
      expect(section.props['data-testid']).toBe('real-section');
      expect(section.props.className).toContain('product-grid');
    });
  });

  describe('Form Submission and Processing', () => {
    it('should handle contact form structure', () => {
      const contactFormStructure = {
        tag: 'RealSection',
        version: '1.0.0',
        data: {
          id: 'contact-form',
          title: 'Get In Touch',
          subtitle: 'We\'d love to hear from you',
          className: 'contact-section',
          children: [
            {
              tag: 'RealFormField',
              version: '1.0.0',
              data: {
                name: 'name',
                label: 'Full Name',
                type: 'text',
                required: true,
                placeholder: 'Enter your full name',
                validation: {
                  minLength: 2,
                  maxLength: 100
                }
              }
            },
            {
              tag: 'RealFormField',
              version: '1.0.0',
              data: {
                name: 'email',
                label: 'Email Address',
                type: 'email',
                required: true,
                placeholder: 'your@email.com',
                validation: {
                  pattern: '^[^@]+@[^@]+\\.[^@]+$'
                }
              }
            },
            {
              tag: 'RealFormField',
              version: '1.0.0',
              data: {
                name: 'subject',
                label: 'Subject',
                type: 'select',
                required: true,
                options: [
                  { value: 'general', label: 'General Inquiry' },
                  { value: 'support', label: 'Technical Support' },
                  { value: 'sales', label: 'Sales Question' },
                  { value: 'partnership', label: 'Partnership Opportunity' }
                ]
              }
            },
            {
              tag: 'RealFormField',
              version: '1.0.0',
              data: {
                name: 'message',
                label: 'Message',
                type: 'textarea',
                required: true,
                placeholder: 'Tell us about your inquiry...',
                rows: 6,
                validation: {
                  minLength: 10,
                  maxLength: 1000
                },
                helperText: 'Please provide detailed information about your request'
              }
            },
            {
              tag: 'RealButton',
              version: '1.0.0',
              data: {
                label: 'Send Message',
                variant: 'primary',
                size: 'lg',
                icon: 'send',
                onClick: 'submitContactForm',
                'data-testid': 'submit-button'
              }
            }
          ]
        }
      };

      const result = ComponentTransformer.deserialize(contactFormStructure);
      expect(React.isValidElement(result)).toBe(true);
      
      // Verify form structure
      const section = result as ReactElement;
      expect(section.props['data-testid']).toBe('real-section');
      expect(section.props.id).toBe('contact-form');
    });

    it('should handle form with validation errors', () => {
      const formWithErrors = [
        {
          tag: 'RealFormField',
          version: '1.0.0',
          data: {
            name: 'email',
            label: 'Email Address',
            type: 'email',
            value: 'invalid-email',
            error: 'Please enter a valid email address',
            required: true
          }
        },
        {
          tag: 'RealFormField',
          version: '1.0.0',
          data: {
            name: 'password',
            label: 'Password',
            type: 'password',
            value: '123',
            error: 'Password must be at least 8 characters long',
            required: true,
            validation: {
              minLength: 8
            }
          }
        }
      ];

      const result = ComponentTransformer.deserialize(formWithErrors);
      expect(Array.isArray(result)).toBe(true);
      
      const fields = result as ReactElement[];
      expect(fields).toHaveLength(2);
      
      // Check error states
      fields.forEach(field => {
        expect(field.props.className).toContain('form-field-error');
      });
    });
  });

  describe('Page Builder Scenarios', () => {
    it('should handle complex landing page structure', () => {
      const landingPageStructure = [
        // Hero Section
        {
          tag: 'RealSection',
          version: '1.0.0',
          data: {
            id: 'hero',
            title: 'Build Amazing Web Applications',
            subtitle: 'The fastest way to create modern, responsive web apps',
            layout: 'container',
            textAlign: 'center',
            backgroundColor: '#f8f9fa',
            padding: '4rem 2rem',
            children: [
              {
                tag: 'RealButton',
                version: '1.0.0',
                data: {
                  label: 'Get Started Free',
                  variant: 'primary',
                  size: 'lg',
                  icon: 'rocket',
                  href: '/signup'
                }
              },
              {
                tag: 'RealButton',
                version: '1.0.0',
                data: {
                  label: 'Watch Demo',
                  variant: 'secondary',
                  size: 'lg',
                  icon: 'play',
                  href: '/demo',
                  className: 'ml-3'
                }
              }
            ]
          }
        },
        // Features Section
        {
          tag: 'RealSection',
          version: '1.0.0',
          data: {
            id: 'features',
            title: 'Why Choose Our Platform?',
            layout: 'grid',
            columns: 3,
            gap: '2rem',
            padding: '4rem 2rem',
            children: [
              {
                tag: 'RealCard',
                version: '1.0.0',
                data: {
                  title: 'Lightning Fast',
                  content: 'Built with performance in mind. Load times under 100ms.',
                  image: {
                    src: 'https://example.com/speed-icon.svg',
                    alt: 'Speed icon'
                  },
                  variant: 'outlined'
                }
              },
              {
                tag: 'RealCard',
                version: '1.0.0',
                data: {
                  title: 'Fully Responsive',
                  content: 'Works perfectly on desktop, tablet, and mobile devices.',
                  image: {
                    src: 'https://example.com/responsive-icon.svg',
                    alt: 'Responsive icon'
                  },
                  variant: 'outlined'
                }
              },
              {
                tag: 'RealCard',
                version: '1.0.0',
                data: {
                  title: 'SEO Optimized',
                  content: 'Built-in SEO tools to help your site rank higher.',
                  image: {
                    src: 'https://example.com/seo-icon.svg',
                    alt: 'SEO icon'
                  },
                  variant: 'outlined'
                }
              }
            ]
          }
        },
        // CTA Section
        {
          tag: 'RealSection',
          version: '1.0.0',
          data: {
            id: 'cta',
            title: 'Ready to Get Started?',
            subtitle: 'Join thousands of developers building with our platform',
            layout: 'container',
            textAlign: 'center',
            backgroundColor: '#007bff',
            padding: '3rem 2rem',
            className: 'text-white',
            children: [
              {
                tag: 'RealButton',
                version: '1.0.0',
                data: {
                  label: 'Start Building Now',
                  variant: 'success',
                  size: 'lg',
                  icon: 'arrow-right',
                  href: '/signup'
                }
              }
            ]
          }
        }
      ];

      const result = ComponentTransformer.deserialize(landingPageStructure);
      expect(Array.isArray(result)).toBe(true);
      
      const sections = result as ReactElement[];
      expect(sections).toHaveLength(3);
      
      // Verify each section
      expect(sections[0].props.id).toBe('hero');
      expect(sections[1].props.id).toBe('features');
      expect(sections[2].props.id).toBe('cta');
    });

    it('should handle dynamic content variations', () => {
      // Simulate A/B test variations
      const variations = {
        control: {
          tag: 'RealButton',
          version: '1.0.0',
          data: {
            label: 'Sign Up',
            variant: 'primary'
          }
        },
        variation_a: {
          tag: 'RealButton',
          version: '1.0.0',
          data: {
            label: 'Join Now - Free!',
            variant: 'success',
            icon: 'star'
          }
        },
        variation_b: {
          tag: 'RealButton',
          version: '1.0.0',
          data: {
            label: 'Get Started Today',
            variant: 'primary',
            size: 'lg',
            icon: 'rocket'
          }
        }
      };

      Object.entries(variations).forEach(([, variation]) => {
        const result = ComponentTransformer.deserialize(variation);
        expect(React.isValidElement(result)).toBe(true);

        const button = result as ReactElement;
        expect(button.type).toBe('button');
        expect(button.props.className).toContain('btn');
      });
    });
  });

  describe('Content Management System Integration', () => {
    it('should handle rich content with mixed components', () => {
      const richContentStructure = {
        tag: 'RealSection',
        version: '1.0.0',
        data: {
          id: 'article-content',
          className: 'article-body',
          children: [
            // Text content
            {
              tag: 'RealCard',
              version: '1.0.0',
              data: {
                content: '<p>This article explores the latest trends in web development...</p>',
                variant: 'default'
              }
            },
            // Embedded image
            {
              tag: 'RealCard',
              version: '1.0.0',
              data: {
                image: {
                  src: 'https://example.com/diagram.jpg',
                  alt: 'Web development architecture diagram',
                  width: 800,
                  height: 400
                },
                subtitle: 'Figure 1: Modern web application architecture'
              }
            },
            // Call-to-action
            {
              tag: 'RealCard',
              version: '1.0.0',
              data: {
                title: 'Want to Learn More?',
                content: 'Subscribe to our newsletter for the latest web development insights.',
                variant: 'outlined',
                actions: [
                  {
                    tag: 'RealButton',
                    version: '1.0.0',
                    data: {
                      label: 'Subscribe Now',
                      variant: 'primary',
                      icon: 'email'
                    }
                  }
                ]
              }
            },
            // Related articles
            {
              tag: 'RealSection',
              version: '1.0.0',
              data: {
                title: 'Related Articles',
                layout: 'grid',
                columns: 2,
                gap: '1rem',
                children: [
                  {
                    tag: 'RealCard',
                    version: '1.0.0',
                    data: {
                      title: 'React Best Practices',
                      subtitle: '10 min read',
                      href: '/articles/react-best-practices'
                    }
                  },
                  {
                    tag: 'RealCard',
                    version: '1.0.0',
                    data: {
                      title: 'State Management Guide',
                      subtitle: '15 min read',
                      href: '/articles/state-management'
                    }
                  }
                ]
              }
            }
          ]
        }
      };

      const result = ComponentTransformer.deserialize(richContentStructure);
      expect(React.isValidElement(result)).toBe(true);
      
      const article = result as ReactElement;
      expect(article.props.id).toBe('article-content');
      expect(article.props.className).toContain('article-body');
    });

    it('should handle user-generated content with safety considerations', () => {
      const userGeneratedContent = {
        tag: 'RealCard',
        version: '1.0.0',
        data: {
          title: 'User Comment',
          content: 'This is a great article! <script>alert("xss")</script> Thanks for sharing.',
          metadata: {
            author: 'JohnDoe123',
            date: '2025-01-01',
            tags: ['comment', 'feedback']
          },
          actions: [
            {
              tag: 'RealButton',
              version: '1.0.0',
              data: {
                label: 'Reply',
                variant: 'secondary',
                size: 'sm'
              }
            },
            {
              tag: 'RealButton',
              version: '1.0.0',
              data: {
                label: 'Like',
                variant: 'secondary',
                size: 'sm',
                icon: 'heart'
              }
            }
          ]
        }
      };

      const result = ComponentTransformer.deserialize(userGeneratedContent);
      expect(React.isValidElement(result)).toBe(true);
      
      // Note: In a real implementation, the content should be sanitized
      // before reaching the component serialization system
      const card = result as ReactElement;
      expect(card.props['data-testid']).toBe('real-card');
    });
  });

  describe('Performance and Scale Testing', () => {
    it('should handle large-scale content efficiently', () => {
      const startTime = performance.now();
      
      // Generate 1000 components
      const largeContentStructure = {
        tag: 'RealSection',
        version: '1.0.0',
        data: {
          title: 'Large Content Section',
          layout: 'grid',
          columns: 4,
          children: Array.from({ length: 1000 }, (_, i) => ({
            tag: 'RealCard',
            version: '1.0.0',
            data: {
              id: `item-${i}`,
              title: `Item ${i}`,
              content: `Content for item ${i}`,
              metadata: {
                index: i,
                category: `category-${i % 10}`,
                tags: [`tag-${i % 5}`]
              },
              actions: [
                {
                  tag: 'RealButton',
                  version: '1.0.0',
                  data: {
                    label: `Action ${i}`,
                    variant: i % 2 === 0 ? 'primary' : 'secondary'
                  }
                }
              ]
            }
          }))
        }
      };

      const result = ComponentTransformer.deserialize(largeContentStructure);
      const endTime = performance.now();
      
      expect(React.isValidElement(result)).toBe(true);
      expect(endTime - startTime).toBeLessThan(500); // Should complete within 500ms
      
      console.log(`Large content deserialization took ${(endTime - startTime).toFixed(2)}ms`);
    });

    it('should handle complex nested structures in real-world scenarios', () => {
      // Simulate a complex dashboard
      const dashboardStructure = {
        tag: 'RealSection',
        version: '1.0.0',
        data: {
          id: 'dashboard',
          title: 'Analytics Dashboard',
          children: Array.from({ length: 20 }, (_, i) => ({
            tag: 'RealSection',
            version: '1.0.0',
            data: {
              title: `Widget ${i}`,
              layout: 'grid',
              columns: 2,
              children: Array.from({ length: 10 }, (_, j) => ({
                tag: 'RealCard',
                version: '1.0.0',
                data: {
                  title: `Metric ${i}-${j}`,
                  content: `Value: ${Math.random() * 1000}`,
                  actions: [
                    {
                      tag: 'RealButton',
                      version: '1.0.0',
                      data: {
                        label: 'View Details',
                        size: 'sm'
                      }
                    }
                  ]
                }
              }))
            }
          }))
        }
      };

      expect(() => {
        const result = ComponentTransformer.deserialize(dashboardStructure);
        expect(React.isValidElement(result)).toBe(true);
      }).not.toThrow();
    });
  });
});