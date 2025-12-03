/**
 * Integration tests for Content with data binding functionality
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Content from '../../components/blocks/Content';
import { DataProvider } from '../../contexts/DataContext';
import { JsonDataProvider } from '@qwickapps/schema';

describe.skip('Content Integration (Traditional + Data Binding)', () => {
  const testData = {
    'pages.home.intro': [
      {
        title: 'Welcome to QwickApps',
        subtitle: 'Build apps faster with our comprehensive React framework',
        actions: [
          { label: 'Get Started', variant: 'primary' },
          { label: 'View Docs', variant: 'outlined' }
        ],
        variant: 'elevated',
        centered: true
      }
    ],
    'features.main-section': [
      {
        title: 'Key Features',
        subtitle: 'Everything you need to build modern applications',
        blockSpacing: 'spacious',
        contentMaxWidth: 'lg'
      }
    ],
    'empty.content': [{}]
  };

  const dataProvider = new JsonDataProvider({ data: testData });

  it('should work as traditional Content without dataSource', () => {
    const { container } = render(
      <Content 
        title="Traditional Content" 
        subtitle="Without data binding"
        variant="outlined"
        centered={false}
      />
    );

    expect(container.innerHTML).toContain('Traditional Content');
    expect(container.innerHTML).toContain('Without data binding');
  });

  it('should work with dataSource prop (data binding)', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <Content dataSource="pages.home.intro" />
      </DataProvider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain('Welcome to QwickApps');
      expect(container.innerHTML).toContain('Build apps faster');
      expect(container.innerHTML).toContain('Get Started');
      expect(container.innerHTML).toContain('View Docs');
    });
  });

  it('should use fallback props when dataSource has no content', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <Content 
          dataSource="empty.content" 
          title="Fallback Title"
          subtitle="Fallback subtitle"
          variant="filled"
        />
      </DataProvider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain('Fallback Title');
      expect(container.innerHTML).toContain('Fallback subtitle');
    });
  });

  it('should include data attributes when using dataSource', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <Content dataSource="pages.home.intro" />
      </DataProvider>
    );

    await waitFor(() => {
      const contentElement = container.querySelector('[data-component="Content"]');
      expect(contentElement).toHaveAttribute('data-component', 'Content');
      expect(contentElement).toHaveAttribute('data-data-source', 'pages.home.intro');
    });
  });

  it('should work with base props like grid attributes', () => {
    const { container } = render(
      <Content 
        title="Grid Test Content"
        span={6}
        xs={12}
        md={8}
      />
    );

    const contentWrapper = container.querySelector('[data-grid-span]');
    expect(contentWrapper).toHaveAttribute('data-grid-span', '6');
    expect(contentWrapper).toHaveAttribute('data-grid-xs', '12');
    expect(contentWrapper).toHaveAttribute('data-grid-md', '8');
  });

  it('should handle custom binding options', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <Content 
          dataSource="nonexistent.data"
          bindingOptions={{
            fallback: {
              title: 'Custom fallback title',
              subtitle: 'Custom fallback subtitle',
              variant: 'outlined'
            }
          }}
        />
      </DataProvider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain('Custom fallback title');
      expect(container.innerHTML).toContain('Custom fallback subtitle');
    });
  });

  it('should render actions from data binding', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <Content dataSource="pages.home.intro" />
      </DataProvider>
    );

    await waitFor(() => {
      // Check that action buttons are rendered
      const buttons = container.querySelectorAll('button');
      expect(buttons).toHaveLength(2);
      expect(buttons[0]).toHaveTextContent('Get Started');
      expect(buttons[1]).toHaveTextContent('View Docs');
    });
  });

  it('should handle loading state', () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <Content dataSource="slow.loading.data" />
      </DataProvider>
    );

    // Should show loading content initially
    expect(container.innerHTML).toContain('Loading...');
  });

  it('should work with different variants', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <Content dataSource="features.main-section" />
      </DataProvider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain('Key Features');
      expect(container.innerHTML).toContain('Everything you need');
    });
  });

  it('should preserve children content with data binding', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <Content dataSource="pages.home.intro">
          <p>Custom child content</p>
        </Content>
      </DataProvider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain('Welcome to QwickApps');
      expect(container.innerHTML).toContain('Custom child content');
    });
  });
});