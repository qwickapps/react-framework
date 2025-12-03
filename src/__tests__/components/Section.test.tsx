/**
 * Unit tests for Section component
 * 
 * Tests both traditional props usage and data binding functionality
 * with the new schema system.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Section from '../../components/blocks/Section';
import { DataProvider } from '../../contexts/DataContext';
import { JsonDataProvider } from '@qwickapps/schema';
import { ThemeProvider, PaletteProvider } from '../../contexts';

// Test data for data binding
const sampleCmsData = {
  'sections.hero': [{
    background: '#1976d2',
    color: '#ffffff',
    padding: 'large',
    contentMaxWidth: 'lg',
    component: 'section',
    children: '<h1>Hero Section</h1><p>Welcome to our site</p>'
  }],
  'sections.feature': [{
    background: '#f5f5f5',
    color: '#333333',
    padding: 'medium',
    contentMaxWidth: 'xl',
    component: 'article',
    children: '<h2>Features</h2><ul><li>Feature 1</li><li>Feature 2</li></ul>'
  }],
  'sections.minimal': [{
    padding: 'none',
    contentMaxWidth: 'sm',
    children: '<div>Minimal content</div>'
  }],
  'sections.gradient': [{
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#ffffff',
    padding: 'extra-large',
    contentMaxWidth: false,
    component: 'main',
    children: '<h1>Gradient Background</h1>'
  }],
  'sections.empty': [{
    background: '#ffffff',
    padding: 'medium'
  }]
};

// Wrapper component for tests that need providers
const TestWrapper: React.FC<{ children: React.ReactNode; dataProvider?: unknown }> = ({ 
  children, 
  dataProvider 
}) => (
  <ThemeProvider>
    <PaletteProvider>
      {dataProvider ? (
        <DataProvider dataSource={dataProvider}>
          {children}
        </DataProvider>
      ) : (
        children
      )}
    </PaletteProvider>
  </ThemeProvider>
);

describe('Section', () => {
  describe.skip('Traditional Props Usage', () => {
    it('renders basic section with default props', () => {
      const { container } = render(
        <TestWrapper>
          <Section>
            <div>Test content</div>
          </Section>
        </TestWrapper>
      );

      expect(screen.getByText('Test content')).toBeInTheDocument();
      const sectionElement = container.querySelector('section');
      expect(sectionElement).toBeInTheDocument();
    });

    it('applies custom background and color', () => {
      const { container } = render(
        <TestWrapper>
          <Section background="#ff0000" color="#ffffff">
            <div>Colored section</div>
          </Section>
        </TestWrapper>
      );

      const sectionElement = container.querySelector('section');
      expect(sectionElement).toBeInTheDocument();
      expect(screen.getByText('Colored section')).toBeInTheDocument();
      // Note: CSS-in-JS styles may not be directly testable via toHaveStyle
    });

    it('uses different padding sizes', () => {
      const { container } = render(
        <TestWrapper>
          <Section padding="large">
            <div>Large padding</div>
          </Section>
        </TestWrapper>
      );

      const sectionElement = container.querySelector('section');
      expect(sectionElement).toBeInTheDocument();
      expect(screen.getByText('Large padding')).toBeInTheDocument();
    });

    it('supports different HTML components', () => {
      const { container } = render(
        <TestWrapper>
          <Section component="article">
            <div>Article content</div>
          </Section>
        </TestWrapper>
      );

      const articleElement = container.querySelector('article');
      expect(articleElement).toBeInTheDocument();
      expect(screen.getByText('Article content')).toBeInTheDocument();
    });

    it('handles different content max widths', () => {
      const { container } = render(
        <TestWrapper>
          <Section contentMaxWidth="sm">
            <div>Small width content</div>
          </Section>
        </TestWrapper>
      );

      expect(screen.getByText('Small width content')).toBeInTheDocument();
      // Container should be present with appropriate max width
      expect(container.querySelector('.MuiContainer-root')).toBeInTheDocument();
    });

    it('handles full width content', () => {
      const { container } = render(
        <TestWrapper>
          <Section contentMaxWidth={false}>
            <div>Full width content</div>
          </Section>
        </TestWrapper>
      );

      expect(screen.getByText('Full width content')).toBeInTheDocument();
      const containerElement = container.querySelector('.MuiContainer-root');
      expect(containerElement).toBeInTheDocument();
    });

    it('displays empty state when no children provided', () => {
      render(
        <TestWrapper>
          <Section />
        </TestWrapper>
      );

      expect(screen.getByText('No content provided for this section')).toBeInTheDocument();
    });

    it('supports no padding option', () => {
      const { container } = render(
        <TestWrapper>
          <Section padding="none">
            <div>No padding content</div>
          </Section>
        </TestWrapper>
      );

      expect(screen.getByText('No padding content')).toBeInTheDocument();
      const sectionElement = container.querySelector('section');
      expect(sectionElement).toBeInTheDocument();
    });

    it('supports all padding variants', () => {
      const paddingVariants = ['none', 'tiny', 'small', 'medium', 'large', 'extra-large'] as const;
      
      paddingVariants.forEach(padding => {
        const { container, unmount } = render(
          <TestWrapper>
            <Section padding={padding}>
              <div>{padding} padding</div>
            </Section>
          </TestWrapper>
        );

        expect(screen.getByText(`${padding} padding`)).toBeInTheDocument();
        const sectionElement = container.querySelector('section');
        expect(sectionElement).toBeInTheDocument();
        
        unmount();
      });
    });

    it('handles gradient backgrounds', () => {
      const { container } = render(
        <TestWrapper>
          <Section background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
            <div>Gradient section</div>
          </Section>
        </TestWrapper>
      );

      const sectionElement = container.querySelector('section');
      expect(sectionElement).toBeInTheDocument();
      expect(screen.getByText('Gradient section')).toBeInTheDocument();
    });

    it('supports theme variable backgrounds', () => {
      const { container } = render(
        <TestWrapper>
          <Section background="var(--theme-primary)" color="var(--theme-on-primary)">
            <div>Theme colors</div>
          </Section>
        </TestWrapper>
      );

      const sectionElement = container.querySelector('section');
      expect(sectionElement).toBeInTheDocument();
      expect(screen.getByText('Theme colors')).toBeInTheDocument();
    });
  });

  describe.skip('Data Binding Usage', () => {
    let dataProvider: JsonDataProvider;

    beforeEach(() => {
      dataProvider = new JsonDataProvider({ data: sampleCmsData });
    });

    it('renders with dataSource prop (hero section)', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <Section dataSource="sections.hero">
            <div>Additional content</div>
          </Section>
        </TestWrapper>
      );

      await screen.findByText('Additional content');
      const sectionElement = document.querySelector('section');
      expect(sectionElement).toHaveStyle({
        backgroundColor: '#1976d2',
        color: '#ffffff'
      });
    });

    it('renders with dataSource prop (feature section)', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <Section dataSource="sections.feature">
            <div>Feature content</div>
          </Section>
        </TestWrapper>
      );

      await screen.findByText('Feature content');
      const articleElement = document.querySelector('article');
      expect(articleElement).toBeInTheDocument();
      expect(articleElement).toHaveStyle({
        backgroundColor: '#f5f5f5',
        color: '#333333'
      });
    });

    it('shows loading state while data is loading', () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <Section dataSource="sections.nonexistent" />
        </TestWrapper>
      );

      expect(screen.getByText('Loading Section...')).toBeInTheDocument();
    });

    it('uses fallback props when dataSource has no content', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <Section 
            dataSource="nonexistent.section"
            background="#f0f0f0"
            padding="small"
          >
            <div>Fallback content</div>
          </Section>
        </TestWrapper>
      );

      await screen.findByText('Fallback content');
      const sectionElement = document.querySelector('section');
      expect(sectionElement).toHaveStyle({
        backgroundColor: '#f0f0f0'
      });
    });

    it('handles minimal sections', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <Section dataSource="sections.minimal">
            <div>Minimal section</div>
          </Section>
        </TestWrapper>
      );

      await screen.findByText('Minimal section');
      // Should use small max width from data
    });

    it('handles gradient backgrounds from data', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <Section dataSource="sections.gradient">
            <div>Gradient from data</div>
          </Section>
        </TestWrapper>
      );

      await screen.findByText('Gradient from data');
      const mainElement = document.querySelector('main');
      expect(mainElement).toBeInTheDocument();
      expect(mainElement).toHaveStyle({
        backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#ffffff'
      });
    });

    it('works with custom binding options', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <Section 
            dataSource="sections.hero"
            bindingOptions={{ cache: false, strict: true }}
          >
            <div>Custom binding</div>
          </Section>
        </TestWrapper>
      );

      await screen.findByText('Custom binding');
    });

    it('handles empty data from CMS', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <Section dataSource="sections.empty">
            <div>Has children but empty CMS data</div>
          </Section>
        </TestWrapper>
      );

      await screen.findByText('Has children but empty CMS data');
    });
  });

  describe.skip('Edge Cases', () => {
    it('handles complex nested content', () => {
      render(
        <TestWrapper>
          <Section background="#ffffff">
            <div>
              <h2>Nested Header</h2>
              <p>Nested paragraph with <strong>bold text</strong></p>
              <ul>
                <li>List item 1</li>
                <li>List item 2</li>
              </ul>
            </div>
          </Section>
        </TestWrapper>
      );

      expect(screen.getByText('Nested Header')).toBeInTheDocument();
      expect(screen.getByText('bold text')).toBeInTheDocument();
      expect(screen.getByText('List item 1')).toBeInTheDocument();
    });

    it('handles multiple sections', () => {
      render(
        <TestWrapper>
          <div>
            <Section background="#ff0000">
              <div>Red section</div>
            </Section>
            <Section background="#00ff00">
              <div>Green section</div>
            </Section>
          </div>
        </TestWrapper>
      );

      expect(screen.getByText('Red section')).toBeInTheDocument();
      expect(screen.getByText('Green section')).toBeInTheDocument();
    });

    it('preserves React component children', () => {
      const CustomComponent = () => <div>Custom React Component</div>;
      
      render(
        <TestWrapper>
          <Section>
            <CustomComponent />
            <div>Regular div</div>
          </Section>
        </TestWrapper>
      );

      expect(screen.getByText('Custom React Component')).toBeInTheDocument();
      expect(screen.getByText('Regular div')).toBeInTheDocument();
    });

    it('handles undefined and null children gracefully', () => {
      render(
        <TestWrapper>
          <Section>
            {null}
            {undefined}
            <div>Valid content</div>
          </Section>
        </TestWrapper>
      );

      expect(screen.getByText('Valid content')).toBeInTheDocument();
    });

    it('supports custom CSS classes and styles', () => {
      const { container } = render(
        <TestWrapper>
          <Section 
            className="custom-section"
            sx={{ border: '1px solid red' }}
          >
            <div>Custom styled section</div>
          </Section>
        </TestWrapper>
      );

      const sectionElement = container.querySelector('section');
      expect(sectionElement).toHaveClass('custom-section');
      expect(screen.getByText('Custom styled section')).toBeInTheDocument();
    });

    it('handles very long content', () => {
      const longContent = 'Lorem ipsum '.repeat(100);
      
      render(
        <TestWrapper>
          <Section>
            <p>{longContent}</p>
          </Section>
        </TestWrapper>
      );

      expect(screen.getByText(/Lorem ipsum/, { exact: false })).toBeInTheDocument();
    });

    it('works with all content max width variants', () => {
      const widthVariants = ['xs', 'sm', 'md', 'lg', 'xl', false] as const;
      
      widthVariants.forEach(width => {
        const { container, unmount } = render(
          <TestWrapper>
            <Section contentMaxWidth={width}>
              <div>{width || 'full'} width</div>
            </Section>
          </TestWrapper>
        );

        expect(screen.getByText(`${width || 'full'} width`)).toBeInTheDocument();
        expect(container.querySelector('.MuiContainer-root')).toBeInTheDocument();
        
        unmount();
      });
    });

    it('handles special characters in content', () => {
      render(
        <TestWrapper>
          <Section>
            <div>Special chars: &lt;&gt;&amp;&quot;&apos;</div>
          </Section>
        </TestWrapper>
      );

      expect(screen.getByText(/Special chars:/, { exact: false })).toBeInTheDocument();
    });
  });
});