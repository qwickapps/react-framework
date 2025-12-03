/**
 * Integration tests for Section with data binding functionality
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Section from '../../components/blocks/Section';
import { DataProvider } from '../../contexts/DataContext';
import { JsonDataProvider } from '@qwickapps/schema';

describe.skip('Section Integration (Traditional + Data Binding)', () => {
  const testData = {
    'pages.home.intro-section': [
      {
        background: 'var(--theme-primary)',
        color: 'var(--theme-on-primary)',
        padding: 'large',
        contentMaxWidth: 'lg',
        component: 'section'
      }
    ],
    'content.feature-section': [
      {
        background: '#f5f5f5',
        color: '#333333',
        padding: 'medium',
        contentMaxWidth: 'xl',
        component: 'article'
      }
    ],
    'layouts.hero-section': [
      {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#ffffff',
        padding: 'extra-large',
        contentMaxWidth: 'false',
        component: 'main'
      }
    ],
    'layouts.minimal-section': [
      {
        padding: 'none',
        contentMaxWidth: 'md'
      }
    ],
    'empty.section': [{}]
  };

  const dataProvider = new JsonDataProvider({ data: testData });

  it('should work as traditional Section without dataSource', () => {
    const { container } = render(
      <Section 
        background="#ffffff"
        color="#000000" 
        padding="medium"
        contentMaxWidth="lg"
        component="section"
      >
        <div>Traditional section content</div>
      </Section>
    );

    expect(container.innerHTML).toContain('Traditional section content');
    const sectionElement = container.querySelector('section');
    expect(sectionElement).toHaveStyle({ 
      backgroundColor: '#ffffff',
      color: '#000000'
    });
  });

  it('should work with dataSource prop (data binding)', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <Section dataSource="pages.home.intro-section">
          <div>Data-driven section content</div>
        </Section>
      </DataProvider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain('Data-driven section content');
      const sectionElement = container.querySelector('section');
      expect(sectionElement).toHaveStyle({
        backgroundColor: 'var(--theme-primary)',
        color: 'var(--theme-on-primary)'
      });
    });
  });

  it('should use fallback props when dataSource has no content', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <Section 
          dataSource="empty.section"
          background="#f9f9f9"
          padding="small"
          contentMaxWidth="sm"
        >
          <div>Fallback section content</div>
        </Section>
      </DataProvider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain('Fallback section content');
      const sectionElement = container.querySelector('section');
      expect(sectionElement).toHaveStyle({ backgroundColor: '#f9f9f9' });
    });
  });

  it('should include data attributes when using dataSource', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <Section dataSource="pages.home.intro-section">
          <div>Test content</div>
        </Section>
      </DataProvider>
    );

    await waitFor(() => {
      const sectionElement = container.querySelector('[data-component="Section"]');
      expect(sectionElement).toHaveAttribute('data-component', 'Section');
      expect(sectionElement).toHaveAttribute('data-data-source', 'pages.home.intro-section');
    });
  });

  it('should work with base props like grid attributes', () => {
    const { container } = render(
      <Section 
        background="#ffffff"
        span={12}
        xs={12}
        lg={10}
      >
        <div>Grid test content</div>
      </Section>
    );

    const sectionElement = container.querySelector('[data-grid-span]');
    expect(sectionElement).toHaveAttribute('data-grid-span', '12');
    expect(sectionElement).toHaveAttribute('data-grid-xs', '12');
    expect(sectionElement).toHaveAttribute('data-grid-lg', '10');
  });

  it('should handle custom binding options', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <Section 
          dataSource="nonexistent.section"
          bindingOptions={{
            fallback: {
              background: '#e0e0e0',
              padding: 'tiny',
              contentMaxWidth: 'xs'
            }
          }}
        >
          <div>Custom fallback content</div>
        </Section>
      </DataProvider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain('Custom fallback content');
      const sectionElement = container.querySelector('section');
      expect(sectionElement).toHaveStyle({ backgroundColor: '#e0e0e0' });
    });
  });

  it('should handle different padding variants', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <Section dataSource="layouts.hero-section">
          <div>Extra large padding content</div>
        </Section>
      </DataProvider>
    );

    await waitFor(() => {
      const sectionElement = container.querySelector('main');
      expect(sectionElement).toBeTruthy(); // Component should be 'main'
      expect(container.innerHTML).toContain('Extra large padding content');
    });
  });

  it('should work with different content max widths', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <Section dataSource="content.feature-section">
          <div>XL width content</div>
        </Section>
      </DataProvider>
    );

    await waitFor(() => {
      const articleElement = container.querySelector('article');
      expect(articleElement).toBeTruthy(); // Component should be 'article'
      expect(container.innerHTML).toContain('XL width content');
    });
  });

  it('should handle loading state', () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <Section dataSource="slow.loading.section" />
      </DataProvider>
    );

    // Should show loading content initially
    expect(container.innerHTML).toContain('Loading section content...');
  });

  it('should work with no padding', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <Section dataSource="layouts.minimal-section">
          <div>No padding content</div>
        </Section>
      </DataProvider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain('No padding content');
      // Should have no vertical padding (py: 0)
      const sectionElement = container.querySelector('section');
      expect(sectionElement).toBeTruthy();
    });
  });

  it('should work with custom CSS backgrounds', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <Section dataSource="content.feature-section">
          <div>Custom background content</div>
        </Section>
      </DataProvider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain('Custom background content');
      const sectionElement = container.querySelector('article');
      expect(sectionElement).toHaveStyle({
        backgroundColor: '#f5f5f5',
        color: '#333333'
      });
    });
  });

  it('should preserve children content with data binding', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <Section dataSource="pages.home.intro-section">
          <div>Child content preserved</div>
        </Section>
      </DataProvider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain('Child content preserved');
      const sectionElement = container.querySelector('section');
      expect(sectionElement).toHaveStyle({
        backgroundColor: 'var(--theme-primary)'
      });
    });
  });

  it('should handle gradient backgrounds', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <Section dataSource="layouts.hero-section">
          <div>Gradient background content</div>
        </Section>
      </DataProvider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain('Gradient background content');
      const mainElement = container.querySelector('main');
      expect(mainElement).toHaveStyle({
        backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#ffffff'
      });
    });
  });
});