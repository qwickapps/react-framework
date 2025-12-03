/**
 * Unit tests for FeatureGrid component
 * 
 * Tests both traditional props usage and data binding functionality
 * with the new schema system.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FeatureGrid from '../../components/blocks/FeatureGrid';
import type { FeatureItem } from '../../components/blocks/FeatureGrid';
import { DataProvider } from '../../contexts/DataContext';
import { JsonDataProvider } from '@qwickapps/schema';
import { ThemeProvider, PaletteProvider } from '../../contexts';

// Test data for data binding
const sampleCmsData = {
  'features.main': [{
    features: [
      {
        id: 'feature-1',
        icon: '⚡',
        title: 'Lightning Fast',
        description: 'Built for speed with optimized performance out of the box'
      },
      {
        id: 'feature-2',
        icon: '🎨',
        title: 'Beautiful UI',
        description: 'Pre-built components with modern design principles'
      },
      {
        id: 'feature-3',
        icon: '📱',
        title: 'Mobile Ready',
        description: 'Responsive design that works perfectly on all devices'
      },
      {
        id: 'feature-4',
        icon: '🔧',
        title: 'Developer Friendly',
        description: 'Intuitive APIs and excellent developer experience'
      }
    ],
    columns: 2,
    gap: 'large',
    equalHeight: true
  }],
  'features.product': [{
    features: [
      {
        id: 'product-1',
        title: 'Advanced Analytics',
        description: 'Deep insights into your application performance'
      },
      {
        id: 'product-2',
        title: 'Real-time Updates',
        description: 'Live data synchronization across all platforms'
      }
    ],
    columns: 1,
    gap: 'medium',
    equalHeight: false
  }],
  'features.minimal': [{
    features: [
      {
        id: 'minimal-1',
        title: 'Simple Feature',
        description: 'Minimal feature for testing'
      }
    ]
  }],
  'features.empty': [{}]
};

// Sample features for testing
const sampleFeatures: FeatureItem[] = [
  {
    id: 'test-1',
    icon: '🚀',
    title: 'Test Feature 1',
    description: 'Description for test feature 1'
  },
  {
    id: 'test-2',
    title: 'Test Feature 2',
    description: 'Description for test feature 2'
  },
  {
    id: 'test-3',
    icon: '⭐',
    title: 'Test Feature 3',
    description: 'Description for test feature 3',
    action: 'Learn More'
  }
];

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

describe.skip('FeatureGrid', () => {
  describe('Traditional Props Usage', () => {
    it('renders basic feature grid', () => {
      render(
        <TestWrapper>
          <FeatureGrid features={sampleFeatures} />
        </TestWrapper>
      );

      expect(screen.getByText('Test Feature 1')).toBeInTheDocument();
      expect(screen.getByText('Test Feature 2')).toBeInTheDocument();
      expect(screen.getByText('Test Feature 3')).toBeInTheDocument();
    });

    it('renders feature descriptions', () => {
      render(
        <TestWrapper>
          <FeatureGrid features={sampleFeatures} />
        </TestWrapper>
      );

      expect(screen.getByText('Description for test feature 1')).toBeInTheDocument();
      expect(screen.getByText('Description for test feature 2')).toBeInTheDocument();
      expect(screen.getByText('Description for test feature 3')).toBeInTheDocument();
    });

    it('handles different column configurations', () => {
      const columns = [1, 2, 3, 4, 5, 6] as const;
      
      columns.forEach(columnCount => {
        const { unmount } = render(
          <TestWrapper>
            <FeatureGrid 
              features={sampleFeatures}
              columns={columnCount}
            />
          </TestWrapper>
        );

        expect(screen.getByText('Test Feature 1')).toBeInTheDocument();
        
        unmount();
      });
    });

    it('handles different gap sizes', () => {
      const gaps = ['small', 'medium', 'large'] as const;
      
      gaps.forEach(gapSize => {
        const { unmount } = render(
          <TestWrapper>
            <FeatureGrid 
              features={sampleFeatures}
              gap={gapSize}
            />
          </TestWrapper>
        );

        expect(screen.getByText('Test Feature 1')).toBeInTheDocument();
        
        unmount();
      });
    });

    it('handles equalHeight prop', () => {
      render(
        <TestWrapper>
          <FeatureGrid 
            features={sampleFeatures}
            equalHeight={false}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Test Feature 1')).toBeInTheDocument();
    });

    it('renders empty grid gracefully', () => {
      render(
        <TestWrapper>
          <FeatureGrid features={[]} />
        </TestWrapper>
      );

      // Should render without crashing
      const container = document.querySelector('[class*="MuiGrid"]');
      expect(container).toBeInTheDocument();
    });

    it('supports grid props', () => {
      render(
        <TestWrapper>
          <FeatureGrid
            features={sampleFeatures}
            span={12}
            xs={12}
            md={6}
          />
        </TestWrapper>
      );

      // Check if grid props are passed through
      expect(screen.getByText('Test Feature 1')).toBeInTheDocument();
    });

    it('renders with custom CSS classes and styles', () => {
      render(
        <TestWrapper>
          <FeatureGrid 
            features={sampleFeatures}
            className="custom-feature-grid"
            sx={{ backgroundColor: 'red' }}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Test Feature 1')).toBeInTheDocument();
    });

    it('handles features with icons', () => {
      const featuresWithIcons: FeatureItem[] = [
        {
          id: 'icon-test',
          icon: '🎉',
          title: 'Feature with Icon',
          description: 'This feature has an icon'
        }
      ];

      render(
        <TestWrapper>
          <FeatureGrid features={featuresWithIcons} />
        </TestWrapper>
      );

      expect(screen.getByText('Feature with Icon')).toBeInTheDocument();
      expect(screen.getByText('This feature has an icon')).toBeInTheDocument();
    });

    it('handles features with actions', () => {
      const featuresWithActions: FeatureItem[] = [
        {
          id: 'action-test',
          title: 'Feature with Action',
          description: 'This feature has an action',
          action: 'Click Me'
        }
      ];

      render(
        <TestWrapper>
          <FeatureGrid features={featuresWithActions} />
        </TestWrapper>
      );

      expect(screen.getByText('Feature with Action')).toBeInTheDocument();
      expect(screen.getByText('This feature has an action')).toBeInTheDocument();
    });
  });

  describe.skip('Data Binding Usage', () => {
    let dataProvider: JsonDataProvider;

    beforeEach(() => {
      dataProvider = new JsonDataProvider({ data: sampleCmsData });
    });

    it('renders with dataSource prop (main features)', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <FeatureGrid dataSource="features.main" />
        </TestWrapper>
      );

      await screen.findByText('Lightning Fast');
      expect(screen.getByText('Beautiful UI')).toBeInTheDocument();
      expect(screen.getByText('Mobile Ready')).toBeInTheDocument();
      expect(screen.getByText('Developer Friendly')).toBeInTheDocument();
    });

    it('renders with dataSource prop (product features)', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <FeatureGrid dataSource="features.product" />
        </TestWrapper>
      );

      await screen.findByText('Advanced Analytics');
      expect(screen.getByText('Real-time Updates')).toBeInTheDocument();
    });

    it('shows loading state while data is loading', () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <FeatureGrid dataSource="features.nonexistent" />
        </TestWrapper>
      );

      expect(screen.getByText('Loading Feature...')).toBeInTheDocument();
    });

    it('uses fallback props when dataSource has no content', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <FeatureGrid 
            dataSource="nonexistent.features"
            features={sampleFeatures}
          />
        </TestWrapper>
      );

      await screen.findByText('Test Feature 1');
      expect(screen.getByText('Test Feature 2')).toBeInTheDocument();
    });

    it('handles minimal features from data', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <FeatureGrid dataSource="features.minimal" />
        </TestWrapper>
      );

      await screen.findByText('Simple Feature');
    });

    it('works with custom binding options', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <FeatureGrid 
            dataSource="features.main"
            bindingOptions={{ cache: false, strict: true }}
          />
        </TestWrapper>
      );

      await screen.findByText('Lightning Fast');
    });

    it('handles empty data from CMS', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <FeatureGrid 
            dataSource="features.empty"
            features={sampleFeatures}
          />
        </TestWrapper>
      );

      await screen.findByText('Test Feature 1');
    });
  });

  describe('Edge Cases', () => {
    it('handles very long feature titles and descriptions', () => {
      const longFeatures: FeatureItem[] = [
        {
          id: 'long-feature',
          title: 'Very '.repeat(20) + 'Long Feature Title',
          description: 'Very '.repeat(30) + 'Long Feature Description'
        }
      ];

      render(
        <TestWrapper>
          <FeatureGrid features={longFeatures} />
        </TestWrapper>
      );

      expect(screen.getByText(/Very.*Long Feature Title/)).toBeInTheDocument();
      expect(screen.getByText(/Very.*Long Feature Description/)).toBeInTheDocument();
    });

    it('handles special characters in content', () => {
      const specialFeatures: FeatureItem[] = [
        {
          id: 'special-feature',
          title: 'Special: &<>"\' Characters',
          description: 'Description with & < > " \' chars'
        }
      ];

      render(
        <TestWrapper>
          <FeatureGrid features={specialFeatures} />
        </TestWrapper>
      );

      expect(screen.getByText(/Special:.*Characters/)).toBeInTheDocument();
      expect(screen.getByText(/Description with.*chars/)).toBeInTheDocument();
    });

    it('handles large number of features', () => {
      const manyFeatures = Array.from({ length: 50 }, (_, i) => ({
        id: `feature-${i}`,
        title: `Feature ${i + 1}`,
        description: `Description for feature ${i + 1}`
      }));

      render(
        <TestWrapper>
          <FeatureGrid features={manyFeatures} />
        </TestWrapper>
      );

      expect(screen.getByText('Feature 1')).toBeInTheDocument();
      expect(screen.getByText('Feature 50')).toBeInTheDocument();
    });

    it('handles features without required fields gracefully', () => {
      const incompleteFeatures: FeatureItem[] = [
        {
          id: 'incomplete',
          title: '',
          description: ''
        }
      ];

      render(
        <TestWrapper>
          <FeatureGrid features={incompleteFeatures} />
        </TestWrapper>
      );

      // Should render without crashing
      const container = document.querySelector('[class*="MuiGrid"]');
      expect(container).toBeInTheDocument();
    });

    it('handles mixed feature types', () => {
      const mixedFeatures: FeatureItem[] = [
        {
          id: 'with-icon',
          icon: '🎯',
          title: 'With Icon',
          description: 'Feature with icon'
        },
        {
          id: 'without-icon',
          title: 'Without Icon',
          description: 'Feature without icon'
        },
        {
          id: 'with-action',
          title: 'With Action',
          description: 'Feature with action',
          action: 'Action Button'
        }
      ];

      render(
        <TestWrapper>
          <FeatureGrid features={mixedFeatures} />
        </TestWrapper>
      );

      expect(screen.getByText('With Icon')).toBeInTheDocument();
      expect(screen.getByText('Without Icon')).toBeInTheDocument();
      expect(screen.getByText('With Action')).toBeInTheDocument();
    });

    it('handles extreme column configurations', () => {
      render(
        <TestWrapper>
          <FeatureGrid 
            features={sampleFeatures}
            columns={6}
            gap="large"
            equalHeight={true}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Test Feature 1')).toBeInTheDocument();
    });
  });
});