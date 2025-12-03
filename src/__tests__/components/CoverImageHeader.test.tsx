/**
 * Unit tests for CoverImageHeader component
 * 
 * Tests both traditional props usage and data binding functionality
 * with the new schema system following the established Article pattern.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CoverImageHeader from '../../components/blocks/CoverImageHeader';
import { JsonDataProvider } from '@qwickapps/schema';
import { QwickApp } from '../../components/QwickApp';

// Test data for data binding (following nested structure pattern)
const sampleCmsData = {
  'coverImageHeaders': {
    'teamLead': {
      image: '/images/john-avatar.jpg',
      imageAlt: 'John Doe avatar',
      imageSize: 'large',
      imageShape: 'circle',
      overline: 'TEAM LEAD',
      title: 'John Doe',
      subtitle: 'Senior Product Manager',
      tags: ['Product', 'Leadership', 'Strategy'],
      maxVisibleActions: 2,
      variant: 'default'
    },
    'companyProfile': {
      overline: 'COMPANY',
      title: 'TechCorp Solutions',
      subtitle: 'Building the future of enterprise software',
      variant: 'prominent',
      background: '#1976d2'
    },
    'projectShowcase': {
      image: '/images/project-icon.png',
      imageAlt: 'Project icon',
      imageSize: 'medium',
      imageShape: 'rounded',
      title: 'Analytics Dashboard',
      subtitle: 'Real-time data visualization platform',
      tags: ['React', 'TypeScript', 'D3.js'],
      variant: 'compact'
    },
    'empty': {}
  }
};

// Mock HeaderAction type
const mockActions = [
  { 
    id: 'edit', 
    label: 'Edit', 
    priority: 1,
    onClick: jest.fn(),
    disabled: false,
    destructive: false
  },
  { 
    id: 'share', 
    label: 'Share', 
    priority: 2,
    onClick: jest.fn(),
    disabled: false,
    destructive: false
  },
  { 
    id: 'delete', 
    label: 'Delete', 
    priority: 3,
    onClick: jest.fn(),
    disabled: false,
    destructive: true
  }
];

// Wrapper component for tests that need providers
const TestWrapper: React.FC<{ children: React.ReactNode; dataProvider?: unknown }> = ({ 
  children, 
  dataProvider 
}) => {
  if (dataProvider) {
    return (
      <QwickApp appId="test-app" appName="Test App" dataSource={{ dataProvider }}>
        {children}
      </QwickApp>
    );
  }
  return (
    <QwickApp appId="test-app" appName="Test App">
      {children}
    </QwickApp>
  );
};

describe('CoverImageHeader', () => {
  describe('Traditional Props Usage', () => {
    it('renders basic header with title only', () => {
      render(
        <TestWrapper>
          <CoverImageHeader title="Basic Header" />
        </TestWrapper>
      );

      expect(screen.getByText('Basic Header')).toBeInTheDocument();
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('renders full header with all props', () => {
      render(
        <TestWrapper>
          <CoverImageHeader 
            image="/test-image.jpg"
            imageAlt="Test image"
            imageSize="large"
            imageShape="circle"
            overline="TEST OVERLINE"
            title="Full Header"
            subtitle="Complete header with all features"
            tags={['React', 'TypeScript']}
            actions={mockActions}
            maxVisibleActions={2}
            variant="prominent"
            background="#1976d2"
          />
        </TestWrapper>
      );

      expect(screen.getByText('TEST OVERLINE')).toBeInTheDocument();
      expect(screen.getByText('Full Header')).toBeInTheDocument();
      expect(screen.getByText('Complete header with all features')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Edit')).toBeInTheDocument();
      expect(screen.getByText('Share')).toBeInTheDocument();
    });

    it('handles action button clicks', () => {
      const handleClick = jest.fn();
      const actionWithClick = [{ 
        id: 'test', 
        label: 'Click Me', 
        priority: 1,
        onClick: handleClick,
        disabled: false,
        destructive: false
      }];

      render(
        <TestWrapper>
          <CoverImageHeader 
            title="Action Test"
            actions={actionWithClick}
          />
        </TestWrapper>
      );

      const button = screen.getByText('Click Me');
      fireEvent.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles overflow actions with menu', () => {
      const manyActions = Array.from({ length: 5 }, (_, i) => ({
        id: `action-${i}`,
        label: `Action ${i + 1}`,
        priority: i + 1,
        onClick: jest.fn(),
        disabled: false,
        destructive: false
      }));

      render(
        <TestWrapper>
          <CoverImageHeader 
            title="Overflow Test"
            actions={manyActions}
            maxVisibleActions={2}
          />
        </TestWrapper>
      );

      // First 2 actions should be visible
      expect(screen.getByText('Action 1')).toBeInTheDocument();
      expect(screen.getByText('Action 2')).toBeInTheDocument();
      
      // Overflow menu button should be present
      const menuButton = screen.getByLabelText('More actions');
      expect(menuButton).toBeInTheDocument();
      
      // Click to open menu
      fireEvent.click(menuButton);
      
      // Remaining actions should be in the menu
      expect(screen.getByText('Action 3')).toBeInTheDocument();
      expect(screen.getByText('Action 4')).toBeInTheDocument();
      expect(screen.getByText('Action 5')).toBeInTheDocument();
    });
  });

  describe('Data Binding Usage', () => {
    let dataProvider: JsonDataProvider;

    beforeEach(() => {
      dataProvider = new JsonDataProvider({ data: sampleCmsData });
    });

    it('renders with dataSource prop (team lead)', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <CoverImageHeader dataSource="coverImageHeaders.teamLead" />
        </TestWrapper>
      );

      await screen.findByText('John Doe');
      expect(screen.getByText('TEAM LEAD')).toBeInTheDocument();
      expect(screen.getByText('Senior Product Manager')).toBeInTheDocument();
      expect(screen.getByText('Product')).toBeInTheDocument();
    });

    it('renders with dataSource prop (company)', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <CoverImageHeader dataSource="coverImageHeaders.companyProfile" />
        </TestWrapper>
      );

      await screen.findByText('TechCorp Solutions');
      expect(screen.getByText('COMPANY')).toBeInTheDocument();
      expect(screen.getByText('Building the future of enterprise software')).toBeInTheDocument();
    });

    it('shows loading state while data is loading', () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <CoverImageHeader dataSource="coverImageHeaders.nonexistent" />
        </TestWrapper>
      );

      expect(screen.getByText('Loading Cover Image Header...')).toBeInTheDocument();
      expect(screen.getByText('Loading header content from data source...')).toBeInTheDocument();
    });

    it('uses fallback props when dataSource has no content', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <CoverImageHeader 
            dataSource="coverImageHeaders.empty"
            title="Fallback Title"
            subtitle="Fallback subtitle"
          />
        </TestWrapper>
      );

      await screen.findByText('Fallback Title');
      expect(screen.getByText('Fallback subtitle')).toBeInTheDocument();
    });

    it('handles project header from data', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <CoverImageHeader dataSource="coverImageHeaders.projectShowcase" />
        </TestWrapper>
      );

      await screen.findByText('Analytics Dashboard');
      expect(screen.getByText('Real-time data visualization platform')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
    });

    it('works with custom binding options', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <CoverImageHeader 
            dataSource="coverImageHeaders.teamLead"
            bindingOptions={{ cache: false, strict: true }}
          />
        </TestWrapper>
      );

      await screen.findByText('John Doe');
    });

    it('handles empty data from CMS', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <CoverImageHeader 
            dataSource="coverImageHeaders.empty"
            title="Fallback for Empty Data"
          />
        </TestWrapper>
      );

      await screen.findByText('Fallback for Empty Data');
    });
  });

  describe('Image Loading and Accessibility', () => {
    it('sets proper alt text for images', () => {
      render(
        <TestWrapper>
          <CoverImageHeader 
            title="Alt Text Test"
            image="/test-image.jpg"
            imageAlt="Test image description"
          />
        </TestWrapper>
      );

      const image = screen.getByAltText('Test image description');
      expect(image).toBeInTheDocument();
    });

    it('handles missing alt text gracefully', () => {
      render(
        <TestWrapper>
          <CoverImageHeader 
            title="Missing Alt Test"
            image="/test-image.jpg"
          />
        </TestWrapper>
      );

      // Should still render image with empty alt text
      const image = screen.getByAltText('');
      expect(image).toBeInTheDocument();
    });

    it('maintains proper semantic structure', () => {
      render(
        <TestWrapper>
          <CoverImageHeader 
            title="Semantic Test"
            subtitle="Testing semantic HTML structure"
          />
        </TestWrapper>
      );

      // Should render as header element
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
      
      // Title should be in h1 element
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('Semantic Test');
    });

    it('maintains accessibility with keyboard navigation', () => {
      const handleClick = jest.fn();
      const actionWithClick = [{ 
        id: 'keyboard-test', 
        label: 'Keyboard Action', 
        priority: 1,
        onClick: handleClick,
        disabled: false,
        destructive: false
      }];

      render(
        <TestWrapper>
          <CoverImageHeader 
            title="Keyboard Navigation Test"
            actions={actionWithClick}
          />
        </TestWrapper>
      );

      const button = screen.getByText('Keyboard Action');
      expect(button).toBeInTheDocument();
      
      // Button should be focusable
      button.focus();
      expect(button).toHaveFocus();
    });

    it('provides proper ARIA labels for interactive elements', () => {
      const manyActions = Array.from({ length: 3 }, (_, i) => ({
        id: `action-${i}`,
        label: `Action ${i + 1}`,
        priority: i + 1,
        onClick: jest.fn(),
        disabled: false,
        destructive: false
      }));

      render(
        <TestWrapper>
          <CoverImageHeader 
            title="ARIA Test"
            actions={manyActions}
            maxVisibleActions={1}
          />
        </TestWrapper>
      );

      // Overflow menu button should have proper aria-label
      const menuButton = screen.getByLabelText('More actions');
      expect(menuButton).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty tags array', () => {
      render(
        <TestWrapper>
          <CoverImageHeader 
            title="Empty Tags"
            tags={[]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Empty Tags')).toBeInTheDocument();
    });

    it('handles empty actions array', () => {
      render(
        <TestWrapper>
          <CoverImageHeader 
            title="Empty Actions"
            actions={[]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Empty Actions')).toBeInTheDocument();
    });

    it('handles custom CSS classes and styles', () => {
      render(
        <TestWrapper>
          <CoverImageHeader
            title="Custom Styled"
            className="custom-header"
            sx={{ border: '1px solid red' }}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Custom Styled')).toBeInTheDocument();
    });

    it('renders without optional props', () => {
      render(
        <TestWrapper>
          <CoverImageHeader title="Minimal Props" />
        </TestWrapper>
      );

      expect(screen.getByText('Minimal Props')).toBeInTheDocument();
    });
  });
});