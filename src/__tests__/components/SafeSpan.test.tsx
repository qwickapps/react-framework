/**
 * Unit tests for SafeSpan component with Article data binding pattern
 * 
 * Tests both traditional props usage and data binding functionality with
 * comprehensive security testing for XSS prevention.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SafeSpan from '../../components/SafeSpan';
import { DataProvider } from '../../contexts/DataContext';
import { JsonDataProvider } from '@qwickapps/schema';

describe.skip('SafeSpan Component', () => {
  
  describe('Traditional Props Usage', () => {
    
    it('renders safe HTML content correctly', () => {
      render(
        <SafeSpan html="<p>Hello <strong>World</strong>!</p>" />
      );
      
      expect(screen.getByText(/Hello/)).toBeInTheDocument();
      expect(screen.getByText(/World/)).toBeInTheDocument();
      // Check that strong tag is preserved
      const strongElement = screen.getByText('World');
      expect(strongElement.tagName).toBe('STRONG');
    });

    it('displays placeholder when no HTML content is provided', () => {
      render(
        <SafeSpan html="" placeholder="Loading content..." />
      );
      
      expect(screen.getByText('Loading content...')).toBeInTheDocument();
    });

    it('returns null when no HTML and no placeholder', () => {
      const { container } = render(
        <SafeSpan html="" />
      );
      
      expect(container.firstChild).toBeNull();
    });

    it('returns null when HTML is undefined and no placeholder', () => {
      const { container } = render(
        <SafeSpan />
      );
      
      expect(container.firstChild).toBeNull();
    });

    it('applies custom className and styles', () => {
      render(
        <SafeSpan 
          html="<p>Styled content</p>"
          className="custom-class"
          style={{ color: 'red' }}
        />
      );
      
      const element = screen.getByText('Styled content').closest('span');
      expect(element).toHaveClass('custom-class');
      expect(element).toHaveStyle({ color: 'red' });
    });

  });

  describe('HTML Sanitization & Security', () => {
    
    it('removes script tags completely', () => {
      render(
        <SafeSpan html="<p>Safe content</p><script>alert('xss')</script>" />
      );
      
      expect(screen.getByText('Safe content')).toBeInTheDocument();
      // Script content should not be in DOM
      expect(screen.queryByText("alert('xss')")).not.toBeInTheDocument();
      expect(document.querySelector('script')).not.toBeInTheDocument();
    });

    it('removes event handlers from elements', () => {
      const { container } = render(
        <SafeSpan html='<p onclick="alert(&#39;click xss&#39;)" onmouseover="alert(&#39;hover xss&#39;)">Click me</p>' />
      );
      
      const paragraph = container.querySelector('p');
      expect(paragraph).toBeInTheDocument();
      expect(paragraph).not.toHaveAttribute('onclick');
      expect(paragraph).not.toHaveAttribute('onmouseover');
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('blocks javascript: URLs in links', () => {
      const { container } = render(
        <SafeSpan html='<a href="javascript:alert(&#39;link xss&#39;)">Malicious Link</a>' />
      );
      
      const link = container.querySelector('a');
      expect(link).toBeInTheDocument();
      expect(link).not.toHaveAttribute('href', "javascript:alert('link xss')");
      // Should either have no href or safe href
      if (link?.hasAttribute('href')) {
        expect(link.getAttribute('href')).not.toMatch(/^javascript:/);
      }
    });

    it('sanitizes iframe elements', () => {
      render(
        <SafeSpan html='<p>Content</p><iframe src="javascript:alert(&#39;iframe xss&#39;)"></iframe>' />
      );
      
      expect(screen.getByText('Content')).toBeInTheDocument();
      // iframe should be removed entirely as it's not in allowedTags
      expect(document.querySelector('iframe')).not.toBeInTheDocument();
    });

    it('removes style tags that could hide content', () => {
      render(
        <SafeSpan html='<p>Visible content</p><style>body { display: none; }</style>' />
      );
      
      expect(screen.getByText('Visible content')).toBeInTheDocument();
      expect(document.querySelector('style')).not.toBeInTheDocument();
    });

    it('adds security attributes to external links', () => {
      const { container } = render(
        <SafeSpan html='<a href="https://example.com">External Link</a>' />
      );
      
      const link = container.querySelector('a');
      expect(link).toHaveAttribute('href', 'https://example.com');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link).toHaveAttribute('target', '_blank');
    });

    it('preserves safe HTML elements and attributes', () => {
      const safeHtml = `
        <div class="content">
          <h3>Title</h3>
          <p style="color: blue;">Paragraph with <strong>bold</strong> and <em>italic</em> text.</p>
          <ul>
            <li>List item</li>
          </ul>
          <blockquote>Quote text</blockquote>
          <code>Code snippet</code>
        </div>
      `;
      
      const { container } = render(
        <SafeSpan html={safeHtml} />
      );
      
      expect(container.querySelector('div.content')).toBeInTheDocument();
      expect(container.querySelector('h3')).toBeInTheDocument();
      expect(container.querySelector('p[style="color: blue;"]')).toBeInTheDocument();
      expect(container.querySelector('strong')).toBeInTheDocument();
      expect(container.querySelector('em')).toBeInTheDocument();
      expect(container.querySelector('ul li')).toBeInTheDocument();
      expect(container.querySelector('blockquote')).toBeInTheDocument();
      expect(container.querySelector('code')).toBeInTheDocument();
    });

    it('handles malformed HTML gracefully', () => {
      render(
        <SafeSpan html="<p>Unclosed paragraph<div>Nested <strong>content</div>" />
      );
      
      // Should still render safely without breaking
      expect(screen.getByText(/Unclosed paragraph/)).toBeInTheDocument();
      expect(screen.getByText(/Nested/)).toBeInTheDocument();
      expect(screen.getByText(/content/)).toBeInTheDocument();
    });

  });

  describe('Data Binding Support', () => {
    const testData = {
      'company.description': {
        html: '<p>QwickApps helps you <strong>build apps faster</strong> with our comprehensive framework.</p>',
        placeholder: 'Loading company description...'
      },
      'blog.post': {
        html: '<h2>Blog Post Title</h2><p>Blog post content with <em>emphasis</em>.</p>',
        placeholder: 'Loading blog post...'
      },
      'empty.content': {},
      'malicious.content': {
        html: '<p>Safe content</p><script>alert("xss")</script>',
        placeholder: 'Loading...'
      }
    };

    const dataProvider = new JsonDataProvider({ data: testData });

    it('renders content from dataSource using data binding', async () => {
      render(
        <DataProvider dataSource={{ dataProvider }}>
          <SafeSpan dataSource="company.description" />
        </DataProvider>
      );

      await waitFor(() => {
        expect(screen.getByText(/QwickApps helps you/)).toBeInTheDocument();
        expect(screen.getByText(/build apps faster/)).toBeInTheDocument();
      });
    });

    it('shows loading state during data binding', () => {
      render(
        <DataProvider dataSource={{ dataProvider }}>
          <SafeSpan dataSource="company.description" />
        </DataProvider>
      );

      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('handles error state in development mode', async () => {
      // Mock console.error to avoid test output noise
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const originalNodeEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      render(
        <DataProvider dataSource={{ dataProvider }}>
          <SafeSpan dataSource="nonexistent.data" />
        </DataProvider>
      );

      await waitFor(() => {
        expect(screen.getByText(/Error Loading Content/)).toBeInTheDocument();
      });

      process.env.NODE_ENV = originalNodeEnv;
      consoleSpy.mockRestore();
    });

    it('returns null for error state in production mode', async () => {
      // Mock console.error to avoid test output noise
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const originalNodeEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      const { container } = render(
        <DataProvider dataSource={{ dataProvider }}>
          <SafeSpan dataSource="nonexistent.data" />
        </DataProvider>
      );

      await waitFor(() => {
        expect(container.firstChild).toBeNull();
      });

      process.env.NODE_ENV = originalNodeEnv;
      consoleSpy.mockRestore();
    });

    it('sanitizes malicious content from data binding', async () => {
      render(
        <DataProvider dataSource={{ dataProvider }}>
          <SafeSpan dataSource="malicious.content" />
        </DataProvider>
      );

      await waitFor(() => {
        expect(screen.getByText('Safe content')).toBeInTheDocument();
        expect(screen.queryByText('alert("xss")')).not.toBeInTheDocument();
        expect(document.querySelector('script')).not.toBeInTheDocument();
      });
    });

    it('uses traditional props when no dataSource is provided', () => {
      render(
        <DataProvider dataSource={{ dataProvider }}>
          <SafeSpan html="<p>Traditional props content</p>" placeholder="Traditional placeholder" />
        </DataProvider>
      );

      expect(screen.getByText('Traditional props content')).toBeInTheDocument();
    });

    it('respects binding options for caching and strictness', async () => {
      render(
        <DataProvider dataSource={{ dataProvider }}>
          <SafeSpan 
            dataSource="company.description"
            bindingOptions={{
              cache: false,
              cacheTTL: 60000,
              strict: true
            }}
          />
        </DataProvider>
      );

      await waitFor(() => {
        expect(screen.getByText(/QwickApps helps you/)).toBeInTheDocument();
      });
    });

    it('falls back to traditional props when data binding fails', async () => {
      render(
        <DataProvider dataSource={{ dataProvider }}>
          <SafeSpan 
            dataSource="empty.content"
            html="<p>Fallback HTML content</p>"
            placeholder="Fallback placeholder"
          />
        </DataProvider>
      );

      await waitFor(() => {
        expect(screen.getByText('Fallback placeholder')).toBeInTheDocument();
      });
    });

  });

  describe('Schema Integration', () => {
    
    it('uses SafeSpanModel schema for data binding validation', async () => {
      const testData = {
        'valid.content': {
          html: '<p>Valid HTML content</p>',
          placeholder: 'Valid placeholder'
        }
      };

      const dataProvider = new JsonDataProvider({ data: testData });

      render(
        <DataProvider dataSource={{ dataProvider }}>
          <SafeSpan dataSource="valid.content" />
        </DataProvider>
      );

      await waitFor(() => {
        expect(screen.getByText('Valid HTML content')).toBeInTheDocument();
      });
    });

  });

  describe('Performance and Edge Cases', () => {
    
    it('handles very large HTML content efficiently', () => {
      const largeHtml = '<p>' + 'A'.repeat(10000) + '</p>';
      
      const { container } = render(
        <SafeSpan html={largeHtml} />
      );
      
      expect(container.querySelector('p')).toBeInTheDocument();
    });

    it('handles empty string HTML gracefully', () => {
      const { container } = render(
        <SafeSpan html="" />
      );
      
      expect(container.firstChild).toBeNull();
    });

    it('handles whitespace-only HTML', () => {
      const { container } = render(
        <SafeSpan html="   \n\t   " />
      );
      
      expect(container.firstChild).toBeNull();
    });

    it('preserves HTML entities', () => {
      render(
        <SafeSpan html="<p>&lt;script&gt;alert('safe')&lt;/script&gt;</p>" />
      );
      
      expect(screen.getByText("<script>alert('safe')</script>")).toBeInTheDocument();
    });

  });

});