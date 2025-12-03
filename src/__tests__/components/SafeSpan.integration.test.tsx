/**
 * Integration tests for SafeSpan with data binding functionality
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { render, waitFor } from '@testing-library/react';
import SafeSpan from '../../SafeSpan';
import { DataProvider } from '../../../contexts/DataContext';
import { JsonDataProvider } from '@qwickapps/schema';

describe.skip('SafeSpan Integration (Traditional + Data Binding)', () => {
  const testData = {
    'company.description': {
      html: '<p>QwickApps helps you <strong>build apps faster</strong> with our comprehensive framework.</p>',
      placeholder: 'Loading company description...'
    },
    'empty.content': {}
  };

  const dataProvider = new JsonDataProvider({ data: testData });

  it('should work as traditional SafeSpan without dataSource', () => {
    const { container } = render(
      <SafeSpan 
        html="<p>Traditional <strong>SafeSpan</strong> usage</p>" 
        placeholder="Traditional placeholder" 
      />
    );

    expect(container.innerHTML).toContain('Traditional <strong>SafeSpan</strong> usage');
  });

  it('should work with dataSource prop (data binding)', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <SafeSpan dataSource="company.description" />
      </DataProvider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain('QwickApps helps you <strong>build apps faster</strong>');
    });
  });

  it('should use fallback props when dataSource has no content', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <SafeSpan 
          dataSource="empty.content" 
          html="<p>Fallback HTML content</p>"
          placeholder="Fallback placeholder"
        />
      </DataProvider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain('Fallback HTML content');
    });
  });

  it('should sanitize malicious HTML content', () => {
    const { container } = render(
      <SafeSpan html="<script>alert('xss')</script><p>Safe content</p>" />
    );

    // Script tag should be removed, safe content should remain
    expect(container.innerHTML).not.toContain('<script>');
    expect(container.innerHTML).not.toContain("alert('xss')");
    expect(container.innerHTML).toContain('Safe content');
  });

  it('should include data attributes when using dataSource', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <SafeSpan dataSource="company.description" />
      </DataProvider>
    );

    await waitFor(() => {
      const span = container.querySelector('span');
      expect(span).toHaveAttribute('data-component', 'SafeSpan');
      expect(span).toHaveAttribute('data-data-source', 'company.description');
    });
  });

  it('should work with base props like grid attributes', () => {
    const { container } = render(
      <SafeSpan 
        html="<p>Test content</p>"
        span={6}
        xs={12}
        md={8}
      />
    );

    const span = container.querySelector('span');
    expect(span).toHaveAttribute('data-grid-span', '6');
    expect(span).toHaveAttribute('data-grid-xs', '12');
    expect(span).toHaveAttribute('data-grid-md', '8');
  });

  it('should handle custom binding options', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <SafeSpan 
          dataSource="nonexistent.data"
          bindingOptions={{
            fallback: {
              html: '<p>Custom fallback content</p>',
              placeholder: 'Custom fallback placeholder'
            }
          }}
        />
      </DataProvider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain('Custom fallback content');
    });
  });
});