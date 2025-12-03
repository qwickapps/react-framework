/**
 * PageTemplate Schema Tests
 * 
 * Tests for PageTemplateSchema functionality and validation
 */

import { PageTemplateSchema } from '../../schemas/PageTemplateSchema';
import { PrintConfigSchema } from '../../schemas/PrintConfigSchema';

describe('PageTemplateSchema', () => {
  it('should create a valid PageTemplateSchema instance', () => {
    const pageTemplate = new PageTemplateSchema();
    expect(pageTemplate).toBeInstanceOf(PageTemplateSchema);
  });

  it('should have correct schema metadata', () => {
    const schema = PageTemplateSchema.getSchema();
    expect(schema.name).toBe('PageTemplate');
    expect(schema.version).toBe('1.0.0');
  });

  it('should inherit from ViewSchema properties', async () => {
    const data = {
      className: 'page-template',
      id: 'test-page',
      'aria-label': 'Test Page Template'
    };
    
    const result = await PageTemplateSchema.validate(data);
    expect(result.isValid).toBe(true);
    
    const pageTemplate = PageTemplateSchema.createWithDefaults(data);
    expect(pageTemplate.className).toBe('page-template');
    expect(pageTemplate.id).toBe('test-page');
    expect(pageTemplate['aria-label']).toBe('Test Page Template');
  });

  it('should validate page-specific properties correctly', async () => {
    const data = {
      slug: 'about-us',
      name: 'About Us',
      description: 'Learn more about our company',
      title: 'About Us | Company Name',
      metaKeywords: 'about, company, information',
      metaAuthor: 'Web Team',
      canonicalUrl: 'https://example.com/about-us',
      children: '<div>Page content here</div>',
      layout: 'default',
      icon: 'info',
      requiresAuth: false,
      requiredRoles: 'user',
      showInNavigation: true,
      navigationPriority: 1,
      indexable: true
    };
    
    const result = await PageTemplateSchema.validate(data);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should create instance with page data correctly', () => {
    const data = {
      slug: 'contact',
      name: 'Contact Us',
      description: 'Get in touch with us',
      title: 'Contact | Company',
      layout: 'fullwidth',
      showInNavigation: true,
      navigationPriority: 5
    };
    
    const pageTemplate = PageTemplateSchema.createWithDefaults(data);
    expect(pageTemplate.slug).toBe('contact');
    expect(pageTemplate.name).toBe('Contact Us');
    expect(pageTemplate.description).toBe('Get in touch with us');
    expect(pageTemplate.title).toBe('Contact | Company');
    expect(pageTemplate.layout).toBe('fullwidth');
    expect(pageTemplate.showInNavigation).toBe(true);
    expect(pageTemplate.navigationPriority).toBe(5);
  });

  it('should handle print configuration integration', () => {
    const printConfig = PrintConfigSchema.createWithDefaults({
      theme: 'dark',
      palette: 'ocean',
      hideScaffolding: false,
      printTitle: 'Page Print Title'
    });
    
    const pageData = {
      name: 'Test Page',
      slug: 'test-page',
      printConfig: printConfig
    };
    
    const pageTemplate = PageTemplateSchema.createWithDefaults(pageData);
    expect(pageTemplate.name).toBe('Test Page');
    expect(pageTemplate.slug).toBe('test-page');
    expect(pageTemplate.printConfig).toBeDefined();
    expect(pageTemplate.printConfig?.theme).toBe('dark');
    expect(pageTemplate.printConfig?.palette).toBe('ocean');
    expect(pageTemplate.printConfig?.hideScaffolding).toBe(false);
    expect(pageTemplate.printConfig?.printTitle).toBe('Page Print Title');
  });

  it('should handle boolean default values correctly', () => {
    const pageTemplate = PageTemplateSchema.createWithDefaults();
    
    // These are the default values as specified in the schema
    expect(pageTemplate.requiresAuth).toBe(false); // @Field({ defaultValue: false })
    expect(pageTemplate.showInNavigation).toBe(true); // @Field({ defaultValue: true })
    expect(pageTemplate.navigationPriority).toBe(0); // @Field({ defaultValue: 0 })
    expect(pageTemplate.indexable).toBe(true); // @Field({ defaultValue: true })
  });

  it('should support comprehensive page metadata', async () => {
    const comprehensiveData = {
      slug: 'comprehensive-page',
      name: 'Comprehensive Test Page',
      description: 'A page with all possible metadata',
      title: 'Complete Page | Site',
      metaKeywords: 'test, comprehensive, page, metadata',
      metaAuthor: 'Test Author',
      canonicalUrl: 'https://example.com/comprehensive',
      children: '<h1>Welcome</h1><p>This is a comprehensive test page.</p>',
      layout: 'sidebar',
      icon: 'star',
      requiresAuth: true,
      requiredRoles: 'admin,moderator',
      showInNavigation: false,
      navigationPriority: 10,
      indexable: false,
      className: 'comprehensive-page',
      id: 'comp-page',
      hidden: false
    };
    
    const result = await PageTemplateSchema.validate(comprehensiveData);
    expect(result.isValid).toBe(true);
    
    const pageTemplate = PageTemplateSchema.createWithDefaults(comprehensiveData);
    expect(pageTemplate.slug).toBe('comprehensive-page');
    expect(pageTemplate.name).toBe('Comprehensive Test Page');
    expect(pageTemplate.description).toBe('A page with all possible metadata');
    expect(pageTemplate.title).toBe('Complete Page | Site');
    expect(pageTemplate.metaKeywords).toBe('test, comprehensive, page, metadata');
    expect(pageTemplate.metaAuthor).toBe('Test Author');
    expect(pageTemplate.canonicalUrl).toBe('https://example.com/comprehensive');
    expect(pageTemplate.layout).toBe('sidebar');
    expect(pageTemplate.icon).toBe('star');
    expect(pageTemplate.requiresAuth).toBe(true);
    expect(pageTemplate.requiredRoles).toBe('admin,moderator');
    expect(pageTemplate.showInNavigation).toBe(false);
    expect(pageTemplate.navigationPriority).toBe(10);
    expect(pageTemplate.indexable).toBe(false);
    expect(pageTemplate.className).toBe('comprehensive-page');
    expect(pageTemplate.id).toBe('comp-page');
    expect(pageTemplate.hidden).toBe(false);
  });
});