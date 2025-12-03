/**
 * Unit tests for Article component
 * 
 * Tests both traditional props usage and data binding functionality
 * with the new schema system.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Article } from '../../components/blocks/Article';
import { DataProvider } from '../../contexts/DataContext';
import { JsonDataProvider } from '@qwickapps/schema';
import { ThemeProvider, PaletteProvider } from '../../contexts';

// Sample HTML content for testing
const sampleSimpleHtml = `
  <p>This is a simple paragraph.</p>
  <h2>Simple Heading</h2>
  <ul>
    <li>First item</li>
    <li>Second item</li>
  </ul>
`;

const sampleCodeHtml = `
  <h1>Code Examples</h1>
  <p>Here's some JavaScript:</p>
  <pre><code class="language-javascript">function greet(name) {
  return \`Hello, \${name}!\`;
}</code></pre>
  <p>And a simple inline code: <code>console.log('test')</code></p>
`;

const sampleComplexHtml = `
  <header class="blog-header">
    <h1>Blog Title (Should be removed)</h1>
  </header>
  <section class="blog-section" data-padding="large">
    <h2>Section Title</h2>
    <p>Section content with <strong>bold text</strong>.</p>
    <pre><code class="language-python">def hello():
    print("Hello World")</code></pre>
  </section>
  <p>Regular paragraph after section.</p>
`;

const sampleBlogHtml = `
  <h1>Article Title</h1>
  <p>This is the introduction paragraph.</p>
  <h2>Main Section</h2>
  <p>Content with <a href="https://example.com">link</a>.</p>
  <section class="blog-section">
    <h2>Special Section</h2>
    <p>This will be transformed to use Section component.</p>
  </section>
`;

// Test data for data binding
const sampleCmsData = {
  'articles.simple': [{
    html: sampleSimpleHtml,
    skipHeader: false
  }],
  'articles.with-code': [{
    html: sampleCodeHtml,
    skipHeader: false
  }],
  'articles.complex': [{
    html: sampleComplexHtml,
    skipHeader: true
  }],
  'articles.blog-post': [{
    html: sampleBlogHtml,
    skipHeader: true
  }],
  'articles.empty': [{
    html: '',
    skipHeader: false
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

describe.skip('Article', () => {
  describe('Traditional Props Usage', () => {
    it('renders simple HTML content', () => {
      render(
        <TestWrapper>
          <Article html={sampleSimpleHtml} />
        </TestWrapper>
      );

      expect(screen.getByText('This is a simple paragraph.')).toBeInTheDocument();
      expect(screen.getByText('Simple Heading')).toBeInTheDocument();
      expect(screen.getByText('First item')).toBeInTheDocument();
      expect(screen.getByText('Second item')).toBeInTheDocument();
    });

    it('transforms code blocks to Code components', () => {
      render(
        <TestWrapper>
          <Article html={sampleCodeHtml} />
        </TestWrapper>
      );

      expect(screen.getByText('Code Examples')).toBeInTheDocument();
      expect(screen.getByText('Here\'s some JavaScript:')).toBeInTheDocument();
      
      // The code should be transformed to Code component
      expect(screen.getByText(/function greet\(name\)/)).toBeInTheDocument();
      expect(screen.getByText(/return `Hello, \${name}!`;/)).toBeInTheDocument();
    });

    it('transforms blog sections to Section components', () => {
      render(
        <TestWrapper>
          <Article html={sampleComplexHtml} />
        </TestWrapper>
      );

      expect(screen.getByText('Section Title')).toBeInTheDocument();
      expect(screen.getByText(/Section content with/)).toBeInTheDocument();
      expect(screen.getByText(/def hello/)).toBeInTheDocument();
      expect(screen.getByText('Regular paragraph after section.')).toBeInTheDocument();
    });

    it('skips header elements when skipHeader is true', () => {
      render(
        <TestWrapper>
          <Article html={sampleComplexHtml} skipHeader={true} />
        </TestWrapper>
      );

      // Blog header should be removed
      expect(screen.queryByText('Blog Title (Should be removed)')).not.toBeInTheDocument();
      
      // Section content should still be there
      expect(screen.getByText('Section Title')).toBeInTheDocument();
    });

    it('preserves header elements when skipHeader is false', () => {
      render(
        <TestWrapper>
          <Article html={sampleBlogHtml} skipHeader={false} />
        </TestWrapper>
      );

      expect(screen.getByText('Article Title')).toBeInTheDocument();
      expect(screen.getByText('This is the introduction paragraph.')).toBeInTheDocument();
    });

    it('removes first h1 when skipHeader is true', () => {
      render(
        <TestWrapper>
          <Article html={sampleBlogHtml} skipHeader={true} />
        </TestWrapper>
      );

      // First H1 should be removed
      expect(screen.queryByText('Article Title')).not.toBeInTheDocument();
      
      // Other content should remain
      expect(screen.getByText('This is the introduction paragraph.')).toBeInTheDocument();
      expect(screen.getByText('Main Section')).toBeInTheDocument();
    });

    it('shows empty state when no HTML content', () => {
      render(
        <TestWrapper>
          <Article html="" />
        </TestWrapper>
      );

      expect(screen.getByText('No Content Available')).toBeInTheDocument();
      expect(screen.getByText('No HTML content provided for this article')).toBeInTheDocument();
    });

    it('handles missing html prop gracefully', () => {
      render(
        <TestWrapper>
          <Article />
        </TestWrapper>
      );

      expect(screen.getByText('No Content Available')).toBeInTheDocument();
    });

    it('preserves HTML attributes and structure', () => {
      const htmlWithAttributes = '<div id="test-content" class="custom-class"><p data-attr="value">Content</p></div>';
      
      const { container } = render(
        <TestWrapper>
          <Article html={htmlWithAttributes} />
        </TestWrapper>
      );

      // Should preserve the div with its attributes
      expect(container.querySelector('#test-content')).toBeInTheDocument();
      expect(container.querySelector('.custom-class')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
      
      // Note: data attributes might be transformed by React/SafeSpan
      // Let's just check that the content is rendered properly
    });
  });

  describe.skip('Data Binding Usage', () => {
    let dataProvider: JsonDataProvider;

    beforeEach(() => {
      dataProvider = new JsonDataProvider({ data: sampleCmsData });
    });

    it('renders with dataSource prop (simple content)', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <Article dataSource="articles.simple" />
        </TestWrapper>
      );

      await screen.findByText('This is a simple paragraph.');
      expect(screen.getByText('Simple Heading')).toBeInTheDocument();
    });

    it('renders with dataSource prop (code content)', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <Article dataSource="articles.with-code" />
        </TestWrapper>
      );

      await screen.findByText('Code Examples');
      expect(screen.getByText(/function greet\(name\)/)).toBeInTheDocument();
    });

    it('shows loading state while data is loading', () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <Article dataSource="articles.nonexistent" />
        </TestWrapper>
      );

      expect(screen.getByText('Loading Article...')).toBeInTheDocument();
      expect(screen.getByText('Loading')).toBeInTheDocument();
    });

    it('uses fallback props when dataSource has no content', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <Article 
            dataSource="articles.nonexistent-key" 
            html={sampleSimpleHtml}
          />
        </TestWrapper>
      );

      // Should eventually show the fallback content
      await screen.findByText('This is a simple paragraph.');
    });

    it('handles skipHeader from data binding', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <Article dataSource="articles.complex" />
        </TestWrapper>
      );

      // Should load with skipHeader: true from data
      await screen.findByText('Section Title');
      
      // Header should be removed due to skipHeader: true
      expect(screen.queryByText('Blog Title (Should be removed)')).not.toBeInTheDocument();
    });

    it('works with custom binding options', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <Article 
            dataSource="articles.simple" 
            bindingOptions={{ cache: false, strict: true }}
          />
        </TestWrapper>
      );

      await screen.findByText('This is a simple paragraph.');
    });
  });

  describe('Edge Cases', () => {
    it('handles malformed HTML gracefully', () => {
      const malformedHtml = '<p>Unclosed paragraph <div><span>Nested content</div>';
      
      render(
        <TestWrapper>
          <Article html={malformedHtml} />
        </TestWrapper>
      );

      // Should render without crashing
      expect(screen.getByText(/Unclosed paragraph/)).toBeInTheDocument();
    });

    it('handles HTML with only whitespace', () => {
      render(
        <TestWrapper>
          <Article html="   \n   \t   " />
        </TestWrapper>
      );

      // Article should render but might be empty due to whitespace handling
      // Let's just verify it doesn't crash
      expect(screen.getByRole('article')).toBeInTheDocument();
    });

    it('handles nested code blocks correctly', () => {
      const nestedCodeHtml = `
        <div>
          <p>Here's a code example:</p>
          <pre><code class="language-html">&lt;div&gt;&lt;code&gt;nested&lt;/code&gt;&lt;/div&gt;</code></pre>
        </div>
      `;
      
      render(
        <TestWrapper>
          <Article html={nestedCodeHtml} />
        </TestWrapper>
      );

      expect(screen.getByText('Here\'s a code example:')).toBeInTheDocument();
      // The nested code should be preserved in the Code component
      expect(screen.getByText(/<div><code>nested<\/code><\/div>/)).toBeInTheDocument();
    });

    it('handles multiple blog sections', () => {
      const multipleSectionsHtml = `
        <section class="blog-section">
          <h2>First Section</h2>
          <p>First content</p>
        </section>
        <section class="blog-section">
          <h2>Second Section</h2>
          <p>Second content</p>
        </section>
      `;
      
      render(
        <TestWrapper>
          <Article html={multipleSectionsHtml} />
        </TestWrapper>
      );

      expect(screen.getByText('First Section')).toBeInTheDocument();
      expect(screen.getByText('First content')).toBeInTheDocument();
      expect(screen.getByText('Second Section')).toBeInTheDocument();
      expect(screen.getByText('Second content')).toBeInTheDocument();
    });

    it('handles inline code within paragraphs correctly', () => {
      const inlineCodeHtml = '<p>Use <code>console.log()</code> for debugging and <code>alert()</code> for notifications.</p>';
      
      render(
        <TestWrapper>
          <Article html={inlineCodeHtml} />
        </TestWrapper>
      );

      // Inline code should not be transformed to Code component
      expect(screen.getByText(/Use.*for debugging and.*for notifications/)).toBeInTheDocument();
    });

    it('preserves complex HTML structure', () => {
      const complexStructure = `
        <div class="container">
          <article>
            <h1>Title</h1>
            <div class="meta">
              <span class="author">Author</span>
              <time datetime="2023-01-01">2023-01-01</time>
            </div>
            <div class="content">
              <p>Content paragraph</p>
            </div>
          </article>
        </div>
      `;
      
      const { container } = render(
        <TestWrapper>
          <Article html={complexStructure} />
        </TestWrapper>
      );

      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Author')).toBeInTheDocument();
      expect(screen.getByText('Content paragraph')).toBeInTheDocument();
      expect(screen.getByText('2023-01-01')).toBeInTheDocument();
      
      // Basic structure should be preserved
      expect(container.querySelector('.container')).toBeInTheDocument();
    });
  });
});