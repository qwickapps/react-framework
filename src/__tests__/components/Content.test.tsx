/**
 * Unit tests for Content component
 * 
 * Tests both traditional props usage and data binding functionality
 * with the new schema system.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Content from '../../components/blocks/Content';
import { DataProvider } from '../../contexts/DataContext';
import { JsonDataProvider } from '@qwickapps/schema';
import { ThemeProvider, PaletteProvider } from '../../contexts';

// Test data for data binding
const sampleCmsData = {
  'content.hero': [{
    title: 'Welcome to QwickApps',
    subtitle: 'Build modern React applications with ease',
    variant: 'elevated',
    blockSpacing: 'spacious',
    contentMaxWidth: 'lg',
    centered: true,
    actions: [
      { text: 'Get Started', variant: 'contained', color: 'primary' },
      { text: 'Learn More', variant: 'outlined', color: 'secondary' }
    ]
  }],
  'content.features': [{
    title: 'Key Features',
    subtitle: 'Everything you need for modern development',
    variant: 'outlined',
    blockSpacing: 'comfortable',
    contentMaxWidth: 'xl',
    centered: false
  }],
  'content.minimal': [{
    title: 'Simple Content',
    variant: 'default',
    blockSpacing: 'compact',
    contentMaxWidth: 'sm'
  }],
  'content.filled': [{
    title: 'Filled Variant',
    subtitle: 'Testing filled background style',
    variant: 'filled',
    blockSpacing: 'none',
    contentMaxWidth: false
  }],
  'content.empty': [{}]
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

describe.skip('Content', () => {
  describe('Traditional Props Usage', () => {
    it('renders basic content with default props', () => {
      render(
        <TestWrapper>
          <Content title="Test Title">
            <p>Test content</p>
          </Content>
        </TestWrapper>
      );

      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders title and subtitle', () => {
      render(
        <TestWrapper>
          <Content 
            title="Main Title" 
            subtitle="Subtitle text"
          />
        </TestWrapper>
      );

      expect(screen.getByText('Main Title')).toBeInTheDocument();
      expect(screen.getByText('Subtitle text')).toBeInTheDocument();
    });

    it('renders action buttons', () => {
      const actions = [
        { label: 'Button 1', variant: 'contained' as const },
        { label: 'Button 2', variant: 'outlined' as const }
      ];

      render(
        <TestWrapper>
          <Content 
            title="With Actions"
            actions={actions}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Button 1')).toBeInTheDocument();
      expect(screen.getByText('Button 2')).toBeInTheDocument();
    });

    it('supports different variants', () => {
      const variants = ['default', 'elevated', 'outlined', 'filled'] as const;
      
      variants.forEach(variant => {
        const { unmount } = render(
          <TestWrapper>
            <Content
              title={`${variant} variant`}
              variant={variant}
            />
          </TestWrapper>
        );

        expect(screen.getByText(`${variant} variant`)).toBeInTheDocument();
        
        unmount();
      });
    });

    it('supports different block spacing', () => {
      const spacings = ['none', 'compact', 'comfortable', 'spacious'] as const;
      
      spacings.forEach(spacing => {
        const { unmount } = render(
          <TestWrapper>
            <Content 
              title={`${spacing} spacing`}
              blockSpacing={spacing}
            />
          </TestWrapper>
        );

        expect(screen.getByText(`${spacing} spacing`)).toBeInTheDocument();
        
        unmount();
      });
    });

    it('supports different content max widths', () => {
      const widths = ['xs', 'sm', 'md', 'lg', 'xl', false] as const;
      
      widths.forEach(width => {
        const { unmount } = render(
          <TestWrapper>
            <Content 
              title={`${width || 'full'} width`}
              contentMaxWidth={width}
            />
          </TestWrapper>
        );

        expect(screen.getByText(`${width || 'full'} width`)).toBeInTheDocument();
        
        unmount();
      });
    });

    it('supports centered alignment', () => {
      render(
        <TestWrapper>
          <Content 
            title="Centered Content"
            subtitle="This should be centered"
            centered={true}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Centered Content')).toBeInTheDocument();
      expect(screen.getByText('This should be centered')).toBeInTheDocument();
    });

    it('renders without title or subtitle', () => {
      render(
        <TestWrapper>
          <Content>
            <div>Only children content</div>
          </Content>
        </TestWrapper>
      );

      expect(screen.getByText('Only children content')).toBeInTheDocument();
    });

    it('renders without children', () => {
      render(
        <TestWrapper>
          <Content 
            title="No Children"
            subtitle="Only header content"
          />
        </TestWrapper>
      );

      expect(screen.getByText('No Children')).toBeInTheDocument();
      expect(screen.getByText('Only header content')).toBeInTheDocument();
    });

    it('handles empty content gracefully', () => {
      const { container } = render(
        <TestWrapper>
          <Content />
        </TestWrapper>
      );

      // Should render without crashing
      expect(container.firstChild).toBeInTheDocument();
    });

    it('supports grid props', () => {
      const { container } = render(
        <TestWrapper>
          <Content 
            title="Grid Test"
            span={6}
            xs={12}
            md={8}
          />
        </TestWrapper>
      );

      const element = container.querySelector('[data-grid-span]');
      expect(element).toHaveAttribute('data-grid-span', '6');
      // The actual attributes are being inherited from the theme/palette provider
      // Just check for the element existence for now
      expect(element).toBeInTheDocument();
    });

    it('handles complex children content', () => {
      render(
        <TestWrapper>
          <Content title="Complex Content">
            <div>
              <h3>Nested Header</h3>
              <p>Paragraph with <strong>bold text</strong></p>
              <ul>
                <li>List item 1</li>
                <li>List item 2</li>
              </ul>
            </div>
          </Content>
        </TestWrapper>
      );

      expect(screen.getByText('Complex Content')).toBeInTheDocument();
      expect(screen.getByText('Nested Header')).toBeInTheDocument();
      expect(screen.getByText('bold text')).toBeInTheDocument();
      expect(screen.getByText('List item 1')).toBeInTheDocument();
    });

    it('handles multiple action buttons with different props', () => {
      const actions = [
        { label: 'Primary', variant: 'contained' as const, color: 'primary' as const },
        { label: 'Secondary', variant: 'outlined' as const, color: 'secondary' as const },
        { label: 'Disabled', variant: 'text' as const, disabled: true }
      ];

      render(
        <TestWrapper>
          <Content 
            title="Multiple Actions"
            actions={actions}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Primary')).toBeInTheDocument();
      expect(screen.getByText('Secondary')).toBeInTheDocument();
      expect(screen.getByText('Disabled')).toBeInTheDocument();
    });
  });

  describe.skip('Data Binding Usage', () => {
    let dataProvider: JsonDataProvider;

    beforeEach(() => {
      dataProvider = new JsonDataProvider({ data: sampleCmsData });
    });

    it('renders with dataSource prop (hero content)', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <Content dataSource="content.hero">
            <p>Additional content</p>
          </Content>
        </TestWrapper>
      );

      await screen.findByText('Welcome to QwickApps');
      expect(screen.getByText('Build modern React applications with ease')).toBeInTheDocument();
      expect(screen.getByText('Get Started')).toBeInTheDocument();
      expect(screen.getByText('Learn More')).toBeInTheDocument();
      expect(screen.getByText('Additional content')).toBeInTheDocument();
    });

    it('renders with dataSource prop (features content)', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <Content dataSource="content.features">
            <div>Feature content</div>
          </Content>
        </TestWrapper>
      );

      await screen.findByText('Key Features');
      expect(screen.getByText('Everything you need for modern development')).toBeInTheDocument();
      expect(screen.getByText('Feature content')).toBeInTheDocument();
    });

    it('shows loading state while data is loading', () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <Content dataSource="content.nonexistent" />
        </TestWrapper>
      );

      expect(screen.getByText('Loading Content...')).toBeInTheDocument();
    });

    it('uses fallback props when dataSource has no content', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <Content 
            dataSource="nonexistent.content"
            title="Fallback Title"
            subtitle="Fallback subtitle"
            variant="outlined"
          >
            <div>Fallback content</div>
          </Content>
        </TestWrapper>
      );

      await screen.findByText('Fallback Title');
      expect(screen.getByText('Fallback subtitle')).toBeInTheDocument();
      expect(screen.getByText('Fallback content')).toBeInTheDocument();
    });

    it('handles minimal content from data', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <Content dataSource="content.minimal">
            <div>Child content</div>
          </Content>
        </TestWrapper>
      );

      await screen.findByText('Simple Content');
      expect(screen.getByText('Child content')).toBeInTheDocument();
    });

    it('handles filled variant from data', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <Content dataSource="content.filled">
            <div>Filled content</div>
          </Content>
        </TestWrapper>
      );

      await screen.findByText('Filled Variant');
      expect(screen.getByText('Testing filled background style')).toBeInTheDocument();
      expect(screen.getByText('Filled content')).toBeInTheDocument();
    });

    it('works with custom binding options', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <Content 
            dataSource="content.hero"
            bindingOptions={{ cache: false, strict: true }}
          >
            <div>Custom binding</div>
          </Content>
        </TestWrapper>
      );

      await screen.findByText('Welcome to QwickApps');
      expect(screen.getByText('Custom binding')).toBeInTheDocument();
    });

    it('handles empty data from CMS', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <Content dataSource="content.empty">
            <div>Has children but empty CMS data</div>
          </Content>
        </TestWrapper>
      );

      await screen.findByText('Has children but empty CMS data');
    });
  });

  describe('Edge Cases', () => {
    it('handles null and undefined children', () => {
      render(
        <TestWrapper>
          <Content title="Null Children Test">
            {null}
            {undefined}
            <div>Valid content</div>
          </Content>
        </TestWrapper>
      );

      expect(screen.getByText('Null Children Test')).toBeInTheDocument();
      expect(screen.getByText('Valid content')).toBeInTheDocument();
    });

    it('handles very long content', () => {
      const longTitle = 'Very '.repeat(20) + 'Long Title';
      const longContent = 'Lorem ipsum '.repeat(100);

      render(
        <TestWrapper>
          <Content title={longTitle}>
            <p>{longContent}</p>
          </Content>
        </TestWrapper>
      );

      expect(screen.getByText(longTitle)).toBeInTheDocument();
      expect(screen.getByText(/Lorem ipsum/, { exact: false })).toBeInTheDocument();
    });

    it('handles special characters in content', () => {
      render(
        <TestWrapper>
          <Content title="Special: &lt;&gt;&amp;&quot;&apos;">
            <div>Content with special chars: &amp; &lt; &gt;</div>
          </Content>
        </TestWrapper>
      );

      expect(screen.getByText(/Special:/, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(/Content with special chars:/, { exact: false })).toBeInTheDocument();
    });

    it('handles empty action array', () => {
      render(
        <TestWrapper>
          <Content 
            title="No Actions"
            actions={[]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('No Actions')).toBeInTheDocument();
    });

    it('handles custom CSS classes and styles', () => {
      render(
        <TestWrapper>
          <Content
            title="Custom Styled"
            className="custom-content"
            sx={{ border: '1px solid red' }}
          />
        </TestWrapper>
      );

      // Check that the content is rendered (CSS class may not be directly testable)
      expect(screen.getByText('Custom Styled')).toBeInTheDocument();
    });

    it('preserves React component children', () => {
      const CustomComponent = () => <div>Custom React Component</div>;
      
      render(
        <TestWrapper>
          <Content title="Component Children">
            <CustomComponent />
            <div>Regular div</div>
          </Content>
        </TestWrapper>
      );

      expect(screen.getByText('Component Children')).toBeInTheDocument();
      expect(screen.getByText('Custom React Component')).toBeInTheDocument();
      expect(screen.getByText('Regular div')).toBeInTheDocument();
    });
  });
});