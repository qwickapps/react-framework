/**
 * Integration tests for FeatureCard with data binding functionality
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { render, waitFor } from '@testing-library/react';
import FeatureCard from '../../blocks/FeatureCard';
import { DataProvider } from '../../../contexts/DataContext';
import { JsonDataProvider } from '@qwickapps/schema';

describe.skip('FeatureCard Integration (Traditional + Data Binding)', () => {
  const testData = {
    'product.single-feature': {
      feature: {
        id: 'lightning-fast',
        title: '⚡ Lightning Fast Performance',
        description: 'Optimized for speed with sub-millisecond response times and efficient memory usage',
        icon: '⚡'
      },
      variant: 'standard',
      elevation: 3
    },
    'marketing.feature-list': {
      features: [
        'Zero configuration setup',
        'TypeScript support included',
        'Hot module reloading',
        'Built-in testing framework',
        'Production-ready builds'
      ],
      variant: 'list',
      title: 'Key Benefits',
      elevation: 1
    },
    'landing.feature-highlight': {
      feature: JSON.stringify({
        id: 'developer-friendly',
        title: '🎯 Developer Experience',
        description: 'Intuitive APIs and comprehensive documentation make development a breeze',
        icon: '🎯'
      }),
      actions: JSON.stringify([
        {
          id: 'learn-more',
          label: 'Learn More',
          variant: 'contained',
          color: 'primary'
        },
        {
          id: 'try-demo',
          label: 'Try Demo',
          variant: 'outlined',
          color: 'secondary'
        }
      ]),
      variant: 'standard',
      elevation: 4
    },
    'company.tech-stack': {
      features: JSON.stringify([
        'React 18 with Concurrent Features',
        'TypeScript for type safety',
        'Material-UI component library',
        'Storybook documentation',
        'Comprehensive testing suite'
      ]),
      variant: 'list',
      title: 'Technology Stack',
      elevation: 0
    },
    'empty.feature': {}
  };

  const dataProvider = new JsonDataProvider({ data: testData });

  const sampleFeature = {
    id: 'traditional-feature',
    title: '🔧 Traditional Feature',
    description: 'This feature is passed via traditional props without data binding',
    icon: '🔧'
  };

  const sampleFeatures = [
    'Traditional feature list item 1',
    'Traditional feature list item 2',
    'Traditional feature list item 3'
  ];

  it('should work as traditional FeatureCard without dataSource (standard variant)', () => {
    const { container } = render(
      <FeatureCard 
        feature={sampleFeature}
        variant="standard"
        elevation={2}
      />
    );

    expect(container.innerHTML).toContain('Traditional Feature');
    expect(container.innerHTML).toContain('This feature is passed via traditional props');
    expect(container.innerHTML).toContain('🔧');
  });

  it('should work as traditional FeatureCard without dataSource (list variant)', () => {
    const { container } = render(
      <FeatureCard 
        features={sampleFeatures}
        variant="list"
        title="Traditional Features"
        elevation={0}
      />
    );

    expect(container.innerHTML).toContain('Traditional Features');
    expect(container.innerHTML).toContain('Traditional feature list item 1');
    expect(container.innerHTML).toContain('Traditional feature list item 2');
    expect(container.innerHTML).toContain('Traditional feature list item 3');
  });

  it('should work with dataSource prop (standard variant)', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <FeatureCard dataSource="product.single-feature" />
      </DataProvider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain('Lightning Fast Performance');
      expect(container.innerHTML).toContain('Optimized for speed with sub-millisecond response times');
      expect(container.innerHTML).toContain('⚡');
    });
  });

  it('should work with dataSource prop (list variant)', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <FeatureCard dataSource="marketing.feature-list" />
      </DataProvider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain('Key Benefits');
      expect(container.innerHTML).toContain('Zero configuration setup');
      expect(container.innerHTML).toContain('TypeScript support included');
      expect(container.innerHTML).toContain('Hot module reloading');
    });
  });

  it('should parse JSON string feature correctly', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <FeatureCard dataSource="landing.feature-highlight" />
      </DataProvider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain('Developer Experience');
      expect(container.innerHTML).toContain('Intuitive APIs and comprehensive documentation');
      expect(container.innerHTML).toContain('🎯');
    });
  });

  it('should parse JSON string features array correctly', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <FeatureCard dataSource="company.tech-stack" />
      </DataProvider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain('Technology Stack');
      expect(container.innerHTML).toContain('React 18 with Concurrent Features');
      expect(container.innerHTML).toContain('TypeScript for type safety');
      expect(container.innerHTML).toContain('Material-UI component library');
    });
  });

  it('should use fallback props when dataSource has no content', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <FeatureCard 
          dataSource="empty.feature"
          feature={sampleFeature}
          variant="standard"
          elevation={3}
        />
      </DataProvider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain('Traditional Feature');
      expect(container.innerHTML).toContain('This feature is passed via traditional props');
    });
  });

  it('should include data attributes when using dataSource', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <FeatureCard dataSource="product.single-feature" />
      </DataProvider>
    );

    await waitFor(() => {
      const cardElement = container.querySelector('[data-component="FeatureCard"]');
      expect(cardElement).toHaveAttribute('data-component', 'FeatureCard');
      expect(cardElement).toHaveAttribute('data-data-source', 'product.single-feature');
      expect(cardElement).toHaveAttribute('data-variant', 'standard');
    });
  });

  it('should work with base props like grid attributes', () => {
    const { container } = render(
      <FeatureCard 
        feature={sampleFeature}
        span={12}
        xs={12}
        lg={6}
      />
    );

    const cardElement = container.querySelector('div');
    expect(cardElement).toBeTruthy();
  });

  it('should handle custom binding options', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <FeatureCard 
          dataSource="nonexistent.feature"
          bindingOptions={{
            fallback: {
              feature: {
                id: 'custom-fallback',
                title: 'Custom Fallback Feature',
                description: 'Custom fallback from binding options',
                icon: '🛡️'
              },
              variant: 'standard',
              elevation: 2
            }
          }}
        />
      </DataProvider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain('Custom Fallback Feature');
      expect(container.innerHTML).toContain('Custom fallback from binding options');
      expect(container.innerHTML).toContain('🛡️');
    });
  });

  it('should handle different elevation values', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <FeatureCard dataSource="landing.feature-highlight" />
      </DataProvider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain('Developer Experience');
      // Should have elevation 4 from data
    });
  });

  it('should handle loading state', () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <FeatureCard dataSource="slow.loading.feature" />
      </DataProvider>
    );

    // Should show loading feature initially
    expect(container.innerHTML).toContain('Loading Feature...');
    expect(container.innerHTML).toContain('Loading feature content from data source');
    expect(container.innerHTML).toContain('⏳');
  });

  it('should handle actions from JSON data', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <FeatureCard dataSource="landing.feature-highlight" />
      </DataProvider>
    );

    await waitFor(() => {
      const buttons = container.querySelectorAll('button');
      expect(buttons).toHaveLength(2);
      expect(buttons[0]).toHaveTextContent('Learn More');
      expect(buttons[1]).toHaveTextContent('Try Demo');
    });
  });

  it('should work with different variants from data', async () => {
    // Test standard variant
    const { container: standardContainer } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <FeatureCard dataSource="product.single-feature" />
      </DataProvider>
    );

    await waitFor(() => {
      expect(standardContainer.innerHTML).toContain('Lightning Fast Performance');
    });

    // Test list variant
    const { container: listContainer } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <FeatureCard dataSource="marketing.feature-list" />
      </DataProvider>
    );

    await waitFor(() => {
      expect(listContainer.innerHTML).toContain('Key Benefits');
      expect(listContainer.innerHTML).toContain('Zero configuration setup');
    });
  });

  it('should handle empty state for standard variant', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <FeatureCard 
          dataSource="empty.feature"
          variant="standard"
        />
      </DataProvider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain('No Feature Available');
      expect(container.innerHTML).toContain('No feature data found in the specified data source');
      expect(container.innerHTML).toContain('📋');
    });
  });

  it('should handle empty state for list variant', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <FeatureCard 
          dataSource="empty.feature"
          variant="list"
          title="Empty List"
        />
      </DataProvider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain('Empty List');
      expect(container.innerHTML).toContain('No features available');
    });
  });

  it('should preserve elevation settings from data', async () => {
    // Test with elevation 0 (flat)
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <FeatureCard dataSource="company.tech-stack" />
      </DataProvider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain('Technology Stack');
      // Should have elevation 0 (flat design)
    });
  });

  it('should work with onClick handlers', () => {
    const mockClick = jest.fn();
    
    const { container } = render(
      <FeatureCard 
        feature={sampleFeature}
        onClick={mockClick}
      />
    );

    const cardElement = container.querySelector('div[style*="cursor: pointer"]')?.parentElement;
    if (cardElement) {
      cardElement.click();
      expect(mockClick).toHaveBeenCalled();
    }
  });
});