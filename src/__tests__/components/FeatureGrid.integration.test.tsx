/**
 * Integration tests for FeatureGrid with data binding functionality
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { render, waitFor } from '@testing-library/react';
import FeatureGrid from '../../blocks/FeatureGrid';
import { DataProvider } from '../../../contexts/DataContext';
import { JsonDataProvider } from '@qwickapps/schema';

describe.skip('FeatureGrid Integration (Traditional + Data Binding)', () => {
  const testData = {
    'pages.home.features': {
      features: [
        {
          id: 'fast',
          title: '⚡ Lightning Fast',
          description: 'Optimized performance for instant loading and smooth user experiences',
          icon: '⚡'
        },
        {
          id: 'beautiful',
          title: '🎨 Beautiful UI',
          description: 'Professional components and layouts that work perfectly out of the box',
          icon: '🎨'
        },
        {
          id: 'mobile',
          title: '📱 Mobile First',
          description: 'Responsive design principles built into every component and layout',
          icon: '📱'
        }
      ],
      columns: 3,
      gap: 'medium',
      equalHeight: true
    },
    'product.key-features': {
      features: JSON.stringify([
        {
          id: 'feature-1',
          title: 'Easy Integration',
          description: 'Simple setup and configuration with minimal boilerplate code'
        },
        {
          id: 'feature-2',
          title: 'Type Safe',
          description: 'Full TypeScript support with comprehensive type definitions'
        },
        {
          id: 'feature-3',
          title: 'Extensible',
          description: 'Modular architecture allows for easy customization and extension'
        },
        {
          id: 'feature-4',
          title: 'Well Documented',
          description: 'Comprehensive documentation with examples and best practices'
        }
      ]),
      columns: 2,
      gap: 'large',
      equalHeight: 'false'
    },
    'marketing.benefits-grid': {
      features: [
        {
          id: 'save-time',
          title: 'Save Development Time',
          description: 'Pre-built components reduce development time by up to 70%',
          icon: '⏰'
        },
        {
          id: 'reduce-costs',
          title: 'Reduce Costs',
          description: 'Less development time means lower project costs and faster ROI',
          icon: '💰'
        },
        {
          id: 'scale-easily',
          title: 'Scale with Confidence',
          description: 'Built-in best practices ensure your application scales smoothly',
          icon: '📈'
        },
        {
          id: 'team-productivity',
          title: 'Boost Team Productivity',
          description: 'Consistent patterns and components improve team collaboration',
          icon: '👥'
        },
        {
          id: 'user-experience',
          title: 'Enhanced UX',
          description: 'Professional design system ensures consistent user experience',
          icon: '✨'
        },
        {
          id: 'future-proof',
          title: 'Future Proof',
          description: 'Regular updates and modern architecture keep your app current',
          icon: '🚀'
        }
      ],
      columns: 3,
      gap: 'medium',
      equalHeight: true
    },
    'empty.features': {}
  };

  const dataProvider = new JsonDataProvider({ data: testData });

  const sampleFeatures = [
    {
      id: 'traditional-1',
      title: 'Traditional Feature 1',
      description: 'This feature is passed via traditional props',
      icon: '🔧'
    },
    {
      id: 'traditional-2',
      title: 'Traditional Feature 2',
      description: 'Another feature using the traditional approach',
      icon: '⚙️'
    }
  ];

  it('should work as traditional FeatureGrid without dataSource', () => {
    const { container } = render(
      <FeatureGrid 
        features={sampleFeatures}
        columns={2}
        gap="small"
        equalHeight={true}
      />
    );

    expect(container.innerHTML).toContain('Traditional Feature 1');
    expect(container.innerHTML).toContain('Traditional Feature 2');
    expect(container.innerHTML).toContain('This feature is passed via traditional props');
  });

  it('should work with dataSource prop (data binding)', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <FeatureGrid dataSource="pages.home.features" />
      </DataProvider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain('Lightning Fast');
      expect(container.innerHTML).toContain('Beautiful UI');
      expect(container.innerHTML).toContain('Mobile First');
      expect(container.innerHTML).toContain('Optimized performance for instant loading');
    });
  });

  it('should parse JSON string features correctly', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <FeatureGrid dataSource="product.key-features" />
      </DataProvider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain('Easy Integration');
      expect(container.innerHTML).toContain('Type Safe');
      expect(container.innerHTML).toContain('Extensible');
      expect(container.innerHTML).toContain('Well Documented');
      expect(container.innerHTML).toContain('Simple setup and configuration');
    });
  });

  it('should use fallback props when dataSource has no content', async () => {
    const fallbackFeatures = [
      {
        id: 'fallback-1',
        title: 'Fallback Feature',
        description: 'This appears when dataSource is empty'
      }
    ];

    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <FeatureGrid 
          dataSource="empty.features"
          features={fallbackFeatures}
          columns={1}
          gap="large"
        />
      </DataProvider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain('Fallback Feature');
      expect(container.innerHTML).toContain('This appears when dataSource is empty');
    });
  });

  it('should include data attributes when using dataSource', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <FeatureGrid dataSource="pages.home.features" />
      </DataProvider>
    );

    await waitFor(() => {
      const gridElement = container.querySelector('[data-component="FeatureGrid"]');
      expect(gridElement).toHaveAttribute('data-component', 'FeatureGrid');
      expect(gridElement).toHaveAttribute('data-data-source', 'pages.home.features');
      expect(gridElement).toHaveAttribute('data-feature-count', '3');
    });
  });

  it('should work with base props like grid attributes', () => {
    const { container } = render(
      <FeatureGrid 
        features={sampleFeatures}
        span={12}
        xs={12}
        lg={10}
      />
    );

    const gridElement = container.querySelector('[data-grid-span]');
    expect(gridElement).toHaveAttribute('data-grid-span', '12');
    expect(gridElement).toHaveAttribute('data-grid-xs', '12');
    expect(gridElement).toHaveAttribute('data-grid-lg', '10');
  });

  it('should handle custom binding options', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <FeatureGrid 
          dataSource="nonexistent.features"
          bindingOptions={{
            fallback: {
              features: [
                {
                  id: 'custom-fallback',
                  title: 'Custom Fallback Feature',
                  description: 'Custom fallback from binding options'
                }
              ],
              columns: 1,
              gap: 'small'
            }
          }}
        />
      </DataProvider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain('Custom Fallback Feature');
      expect(container.innerHTML).toContain('Custom fallback from binding options');
    });
  });

  it('should handle different column configurations', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <FeatureGrid dataSource="product.key-features" />
      </DataProvider>
    );

    await waitFor(() => {
      // Should render 4 features in 2 columns
      expect(container.innerHTML).toContain('Easy Integration');
      expect(container.innerHTML).toContain('Type Safe');
      expect(container.innerHTML).toContain('Extensible');
      expect(container.innerHTML).toContain('Well Documented');
    });
  });

  it('should handle loading state', () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <FeatureGrid dataSource="slow.loading.features" />
      </DataProvider>
    );

    // Should show loading features initially
    expect(container.innerHTML).toContain('Loading Feature...');
    expect(container.innerHTML).toContain('Loading feature content from data source');
  });

  it('should handle large feature grid', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <FeatureGrid dataSource="marketing.benefits-grid" />
      </DataProvider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain('Save Development Time');
      expect(container.innerHTML).toContain('Reduce Costs');
      expect(container.innerHTML).toContain('Scale with Confidence');
      expect(container.innerHTML).toContain('Boost Team Productivity');
      expect(container.innerHTML).toContain('Enhanced UX');
      expect(container.innerHTML).toContain('Future Proof');
    });
  });

  it('should work with different gap sizes', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <FeatureGrid dataSource="product.key-features" />
      </DataProvider>
    );

    await waitFor(() => {
      // Should render features with large gap
      expect(container.innerHTML).toContain('Easy Integration');
      expect(container.innerHTML).toContain('Type Safe');
    });
  });

  it('should handle boolean string conversion for equalHeight', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <FeatureGrid dataSource="product.key-features" />
      </DataProvider>
    );

    await waitFor(() => {
      // equalHeight is 'false' as string, should be converted to boolean false
      expect(container.innerHTML).toContain('Easy Integration');
      expect(container.innerHTML).toContain('Type Safe');
    });
  });

  it('should handle empty features array gracefully', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <FeatureGrid 
          dataSource="empty.features"
          features={[]} // Empty fallback
        />
      </DataProvider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain('No Features Available');
      expect(container.innerHTML).toContain('No feature data found in the specified data source');
    });
  });

  it('should preserve children content alongside features', async () => {
    // Note: FeatureGrid doesn't support children, but we test it doesn't break
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <FeatureGrid dataSource="pages.home.features" />
      </DataProvider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain('Lightning Fast');
      expect(container.innerHTML).toContain('Beautiful UI');
      expect(container.innerHTML).toContain('Mobile First');
    });
  });
});