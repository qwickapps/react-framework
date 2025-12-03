/**
 * Unit tests for HeroBlock component
 * 
 * Tests both traditional props usage and data binding functionality
 * with the new schema system.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroBlock from '../../blocks/HeroBlock';
import type { ButtonProps } from '../../buttons/Button';
import { DataProvider } from '../../../contexts/DataContext';
import { JsonDataProvider } from '@qwickapps/schema';
import { ThemeProvider, PaletteProvider } from '../../../contexts';
import { ComponentTransformer } from '../../../schemas/transformers/ComponentTransformer';
import '../../schemas/transformers/registry'; // Import to ensure component registration

// Test data for data binding
const sampleCmsData = {
  'hero.main': [{
    title: 'Welcome to QwickApps',
    subtitle: 'Build amazing applications faster with our comprehensive framework',
    backgroundImage: '/images/hero-bg.jpg',
    backgroundColor: 'primary',
    actions: [
      { label: 'Get Started', variant: 'primary', buttonSize: 'large', href: '/getting-started' },
      { label: 'View Documentation', variant: 'outlined', buttonSize: 'large', href: '/docs' }
    ],
    textAlign: 'center',
    blockHeight: 'large',
    overlayOpacity: 0.6
  }],
  'hero.startup': [{
    title: 'Launch Your Startup',
    subtitle: 'From idea to production in days, not months',
    backgroundColor: 'secondary',
    actions: [
      { label: 'Start Building', variant: 'contained', buttonSize: 'large' }
    ],
    textAlign: 'left',
    blockHeight: 'medium'
  }],
  'hero.minimal': [{
    title: 'Simple & Powerful',
    backgroundColor: 'default',
    textAlign: 'center',
    blockHeight: 'small'
  }],
  'hero.empty': [{}]
};

// Sample actions for testing
const sampleActions: ButtonProps[] = [
  { label: 'Primary Action', variant: 'primary', buttonSize: 'large' },
  { label: 'Secondary Action', variant: 'outlined', buttonSize: 'medium', href: '/docs' },
  { label: 'Text Action', variant: 'text', onClick: jest.fn() }
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

describe('HeroBlock', () => {
  describe('Traditional Props Usage', () => {
    it('renders basic hero with title only', () => {
      render(
        <TestWrapper>
          <HeroBlock title="Welcome" />
        </TestWrapper>
      );

      expect(screen.getByText('Welcome')).toBeInTheDocument();
      const heroSection = document.querySelector('section');
      expect(heroSection).toBeInTheDocument();
    });

    it('renders hero with title and subtitle', () => {
      render(
        <TestWrapper>
          <HeroBlock 
            title="Welcome to QwickApps"
            subtitle="Build amazing applications faster"
          />
        </TestWrapper>
      );

      expect(screen.getByText('Welcome to QwickApps')).toBeInTheDocument();
      expect(screen.getByText('Build amazing applications faster')).toBeInTheDocument();
    });

    it('renders hero with actions', () => {
      render(
        <TestWrapper>
          <HeroBlock 
            title="Hero with Actions"
            actions={sampleActions}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Hero with Actions')).toBeInTheDocument();
      expect(screen.getByText('Primary Action')).toBeInTheDocument();
      expect(screen.getByText('Secondary Action')).toBeInTheDocument();
      expect(screen.getByText('Text Action')).toBeInTheDocument();
    });

    it('handles different background colors', () => {
      const backgroundColors = ['default', 'primary', 'secondary', 'surface'] as const;
      
      backgroundColors.forEach(color => {
        const { unmount } = render(
          <TestWrapper>
            <HeroBlock 
              title={`Hero with ${color} background`}
              backgroundColor={color}
            />
          </TestWrapper>
        );

        expect(screen.getByText(`Hero with ${color} background`)).toBeInTheDocument();
        
        unmount();
      });
    });

    it('handles different text alignments', () => {
      const alignments = ['left', 'center', 'right'] as const;
      
      alignments.forEach(alignment => {
        const { unmount } = render(
          <TestWrapper>
            <HeroBlock 
              title={`${alignment} aligned hero`}
              textAlign={alignment}
            />
          </TestWrapper>
        );

        expect(screen.getByText(`${alignment} aligned hero`)).toBeInTheDocument();
        
        unmount();
      });
    });

    it('handles different block heights', () => {
      const heights = ['small', 'medium', 'large', 'viewport'] as const;
      
      heights.forEach(height => {
        const { unmount } = render(
          <TestWrapper>
            <HeroBlock 
              title={`${height} height hero`}
              blockHeight={height}
            />
          </TestWrapper>
        );

        expect(screen.getByText(`${height} height hero`)).toBeInTheDocument();
        
        unmount();
      });
    });

    it('renders hero with background image', () => {
      render(
        <TestWrapper>
          <HeroBlock 
            title="Hero with Background"
            backgroundImage="/images/hero.jpg"
            overlayOpacity={0.8}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Hero with Background')).toBeInTheDocument();
    });

    it('renders hero with background gradient', () => {
      render(
        <TestWrapper>
          <HeroBlock 
            title="Hero with Gradient"
            backgroundGradient="linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
          />
        </TestWrapper>
      );

      expect(screen.getByText('Hero with Gradient')).toBeInTheDocument();
    });

    it('handles action click events', () => {
      const handleClick = jest.fn();
      const actionsWithClick: ButtonProps[] = [
        { label: 'Click Me', onClick: handleClick }
      ];

      render(
        <TestWrapper>
          <HeroBlock 
            title="Hero with Click"
            actions={actionsWithClick}
          />
        </TestWrapper>
      );

      const button = screen.getByText('Click Me');
      fireEvent.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('supports grid props', () => {
      const { container } = render(
        <TestWrapper>
          <HeroBlock 
            title="Hero with Grid"
            span={12}
            xs={12}
            md={8}
          />
        </TestWrapper>
      );

      const element = container.querySelector('[data-grid-span]');
      expect(element).toHaveAttribute('data-grid-span', '12');
      expect(element).toBeInTheDocument();
    });

    it('renders with custom CSS classes and styles', () => {
      render(
        <TestWrapper>
          <HeroBlock
            title="Custom Hero"
            className="custom-hero"
            sx={{ backgroundColor: 'red' }}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Custom Hero')).toBeInTheDocument();
    });

    it('renders with additional children content', () => {
      render(
        <TestWrapper>
          <HeroBlock title="Hero with Children">
            <div>Additional content</div>
            <p>More details here</p>
          </HeroBlock>
        </TestWrapper>
      );

      expect(screen.getByText('Hero with Children')).toBeInTheDocument();
      expect(screen.getByText('Additional content')).toBeInTheDocument();
      expect(screen.getByText('More details here')).toBeInTheDocument();
    });
  });

  describe('Data Binding Usage', () => {
    let dataProvider: JsonDataProvider;

    beforeEach(() => {
      dataProvider = new JsonDataProvider({ data: sampleCmsData });
    });

    it('renders with dataSource prop (main hero)', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <HeroBlock dataSource="hero.main" />
        </TestWrapper>
      );

      await screen.findByText('Welcome to QwickApps');
      expect(screen.getByText('Build amazing applications faster with our comprehensive framework')).toBeInTheDocument();
      expect(screen.getByText('Get Started')).toBeInTheDocument();
      expect(screen.getByText('View Documentation')).toBeInTheDocument();
    });

    it('renders with dataSource prop (startup hero)', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <HeroBlock dataSource="hero.startup" />
        </TestWrapper>
      );

      await screen.findByText('Launch Your Startup');
      expect(screen.getByText('From idea to production in days, not months')).toBeInTheDocument();
      expect(screen.getByText('Start Building')).toBeInTheDocument();
    });

    it('shows loading state while data is loading', () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <HeroBlock dataSource="hero.nonexistent" />
        </TestWrapper>
      );

      expect(screen.getByText('Loading Hero...')).toBeInTheDocument();
    });

    it('uses fallback props when dataSource has no content', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <HeroBlock 
            dataSource="nonexistent.hero"
            title="Fallback Title"
            subtitle="Fallback Subtitle"
          />
        </TestWrapper>
      );

      await screen.findByText('Fallback Title');
      expect(screen.getByText('Fallback Subtitle')).toBeInTheDocument();
    });

    it('handles minimal hero from data', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <HeroBlock dataSource="hero.minimal" />
        </TestWrapper>
      );

      await screen.findByText('Simple & Powerful');
    });

    it('works with custom binding options', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <HeroBlock 
            dataSource="hero.main"
            bindingOptions={{ cache: false, strict: true }}
          />
        </TestWrapper>
      );

      await screen.findByText('Welcome to QwickApps');
    });

    it('handles empty data from CMS', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <HeroBlock 
            dataSource="hero.empty"
            title="Fallback for Empty Data"
          />
        </TestWrapper>
      );

      await screen.findByText('Fallback for Empty Data');
    });
  });

  describe('Edge Cases', () => {
    it('handles hero without title gracefully', () => {
      render(
        <TestWrapper>
          <HeroBlock 
            subtitle="Subtitle only hero"
            backgroundColor="default"
          />
        </TestWrapper>
      );

      expect(screen.getByText('Subtitle only hero')).toBeInTheDocument();
    });

    it('handles empty actions array', () => {
      render(
        <TestWrapper>
          <HeroBlock 
            title="Hero without actions"
            actions={[]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Hero without actions')).toBeInTheDocument();
    });

    it('handles very long title and subtitle', () => {
      const longTitle = 'Very '.repeat(20) + 'Long Hero Title';
      const longSubtitle = 'Very '.repeat(30) + 'Long Hero Subtitle';

      render(
        <TestWrapper>
          <HeroBlock 
            title={longTitle}
            subtitle={longSubtitle}
          />
        </TestWrapper>
      );

      expect(screen.getByText(longTitle)).toBeInTheDocument();
      expect(screen.getByText(longSubtitle)).toBeInTheDocument();
    });

    it('handles special characters in content', () => {
      render(
        <TestWrapper>
          <HeroBlock 
            title={'Special: &<>"\' Characters'}
            subtitle={'Subtitle with & < > " \' chars'}
          />
        </TestWrapper>
      );

      expect(screen.getByText(/Special:.*Characters/)).toBeInTheDocument();
      expect(screen.getByText(/Subtitle with.*chars/)).toBeInTheDocument();
    });

    it('handles extreme overlay opacity values', () => {
      render(
        <TestWrapper>
          <HeroBlock 
            title="Extreme Overlay"
            backgroundImage="/test.jpg"
            overlayOpacity={0}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Extreme Overlay')).toBeInTheDocument();
    });

    it('handles invalid blockHeight values by using default', () => {
      render(
        <TestWrapper>
          <HeroBlock 
            title="Default Height Hero"
            // @ts-expect-error Testing invalid value
            blockHeight="invalid"
          />
        </TestWrapper>
      );

      expect(screen.getByText('Default Height Hero')).toBeInTheDocument();
    });

    it('handles hero without any props', () => {
      render(
        <TestWrapper>
          <HeroBlock />
        </TestWrapper>
      );

      const heroSection = document.querySelector('section');
      expect(heroSection).toBeInTheDocument();
    });
  });

  // ModelView Serialization Tests
  describe('ModelView Serialization', () => {
    it('extends ModelView and has required static properties', () => {
      expect(HeroBlock.tagName).toBe('HeroBlock');
      expect(HeroBlock.version).toBe('1.0.0');
      expect(typeof HeroBlock.fromJson).toBe('function');
    });

    it('can serialize and deserialize using toJson method', () => {
      const heroInstance = new HeroBlock({
        title: 'Test Hero',
        subtitle: 'Test subtitle',
        backgroundColor: 'primary',
        textAlign: 'center',
        blockHeight: 'medium',
        actions: [
          { label: 'Test Action', variant: 'primary', buttonSize: 'large' }
        ]
      });

      const serializedData = heroInstance.toJson();
      
      expect(serializedData).toHaveProperty('title', 'Test Hero');
      expect(serializedData).toHaveProperty('subtitle', 'Test subtitle');
      expect(serializedData).toHaveProperty('backgroundColor', 'primary');
      expect(serializedData).toHaveProperty('textAlign', 'center');
      expect(serializedData).toHaveProperty('blockHeight', 'medium');
      expect(serializedData).toHaveProperty('actions');
      expect(serializedData.actions).toHaveLength(1);
      expect(serializedData.actions[0]).toHaveProperty('label', 'Test Action');
    });

    it('can be registered with ComponentTransformer', () => {
      const registeredComponents = ComponentTransformer.getRegisteredComponents();
      expect(registeredComponents).toContain('HeroBlock');
    });

    it('supports round-trip serialization with ComponentTransformer', () => {
      const originalHeroComponent = (
        <HeroBlock 
          title="Serializable Hero"
          subtitle="Full serialization support"
          backgroundGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          textAlign="center"
          blockHeight="large"
          overlayOpacity={0.6}
          actions={[
            { label: 'Primary Action', variant: 'primary', buttonSize: 'large' },
            { label: 'Secondary Action', variant: 'outlined', buttonSize: 'large' }
          ]}
        />
      );
      
      // Serialize using ComponentTransformer
      const serializedData = ComponentTransformer.serialize(originalHeroComponent);
      expect(serializedData).toBeDefined();
      
      // Should be valid JSON
      const parsedData = JSON.parse(serializedData);
      expect(parsedData).toHaveProperty('tag', 'HeroBlock');
      expect(parsedData).toHaveProperty('version', '1.0.0');
      expect(parsedData).toHaveProperty('data');
      expect(parsedData.data).toHaveProperty('title', 'Serializable Hero');
      expect(parsedData.data).toHaveProperty('actions');
      expect(parsedData.data.actions).toHaveLength(2);
      
      // Deserialize back to component
      const deserializedComponent = ComponentTransformer.deserialize(serializedData);
      expect(deserializedComponent).toBeDefined();
      expect(React.isValidElement(deserializedComponent)).toBe(true);
    });

    it('preserves all hero-specific properties during serialization', () => {
      const heroComponent = (
        <HeroBlock 
          title="Complete Hero Test"
          subtitle="Testing all properties"
          backgroundImage="https://example.com/image.jpg"
          backgroundGradient="linear-gradient(45deg, #FF6B6B, #4ECDC4)"
          backgroundColor="secondary"
          textAlign="right"
          blockHeight="viewport"
          overlayOpacity={0.8}
          actions={[
            { 
              label: 'Complex Action', 
              variant: 'primary', 
              buttonSize: 'medium',
              href: '/test',
              target: '_blank'
            }
          ]}
        />
      );
      
      const serializedData = ComponentTransformer.serialize(heroComponent);
      const parsedData = JSON.parse(serializedData);
      
      expect(parsedData.data).toHaveProperty('title', 'Complete Hero Test');
      expect(parsedData.data).toHaveProperty('subtitle', 'Testing all properties');
      expect(parsedData.data).toHaveProperty('backgroundImage', 'https://example.com/image.jpg');
      expect(parsedData.data).toHaveProperty('backgroundGradient', 'linear-gradient(45deg, #FF6B6B, #4ECDC4)');
      expect(parsedData.data).toHaveProperty('backgroundColor', 'secondary');
      expect(parsedData.data).toHaveProperty('textAlign', 'right');
      expect(parsedData.data).toHaveProperty('blockHeight', 'viewport');
      expect(parsedData.data).toHaveProperty('overlayOpacity', 0.8);
      expect(parsedData.data.actions[0]).toHaveProperty('href', '/test');
      expect(parsedData.data.actions[0]).toHaveProperty('target', '_blank');
    });

    it('preserves data binding configuration during serialization', () => {
      const dataBindingHero = (
        <HeroBlock 
          dataSource="hero.main"
          bindingOptions={{ cache: true, cacheTTL: 300000, strict: false }}
        />
      );
      
      const serializedData = ComponentTransformer.serialize(dataBindingHero);
      const parsedData = JSON.parse(serializedData);
      
      expect(parsedData.data).toHaveProperty('dataSource', 'hero.main');
      expect(parsedData.data).toHaveProperty('bindingOptions');
      expect(parsedData.data.bindingOptions).toHaveProperty('cache', true);
      expect(parsedData.data.bindingOptions).toHaveProperty('cacheTTL', 300000);
      expect(parsedData.data.bindingOptions).toHaveProperty('strict', false);
      
      // Verify deserialization maintains data binding
      const deserializedComponent = ComponentTransformer.deserialize(serializedData);
      expect(React.isValidElement(deserializedComponent)).toBe(true);
    });

    it('handles complex nested actions serialization', () => {
      const complexActionsHero = (
        <HeroBlock 
          title="Complex Actions Hero"
          actions={[
            { 
              label: 'Navigate Action', 
              variant: 'primary', 
              buttonSize: 'large',
              action: { type: 'navigate', url: '/dashboard', target: '_self' }
            },
            { 
              label: 'External Action', 
              variant: 'secondary', 
              buttonSize: 'medium',
              action: { type: 'external', url: 'https://external.com', target: '_blank' }
            },
            { 
              label: 'Custom Action', 
              variant: 'outlined', 
              buttonSize: 'small',
              action: { type: 'custom', customHandler: 'handleCustomClick' }
            }
          ]}
        />
      );
      
      const serializedData = ComponentTransformer.serialize(complexActionsHero);
      const parsedData = JSON.parse(serializedData);
      
      expect(parsedData.data.actions).toHaveLength(3);
      
      // Check first action
      expect(parsedData.data.actions[0].action).toHaveProperty('type', 'navigate');
      expect(parsedData.data.actions[0].action).toHaveProperty('url', '/dashboard');
      expect(parsedData.data.actions[0].action).toHaveProperty('target', '_self');
      
      // Check second action
      expect(parsedData.data.actions[1].action).toHaveProperty('type', 'external');
      expect(parsedData.data.actions[1].action).toHaveProperty('url', 'https://external.com');
      
      // Check third action
      expect(parsedData.data.actions[2].action).toHaveProperty('type', 'custom');
      expect(parsedData.data.actions[2].action).toHaveProperty('customHandler', 'handleCustomClick');
      
      // Verify successful deserialization
      const deserializedComponent = ComponentTransformer.deserialize(serializedData);
      expect(React.isValidElement(deserializedComponent)).toBe(true);
    });

    it('handles empty actions array serialization', () => {
      const emptyActionsHero = (
        <HeroBlock 
          title="No Actions Hero"
          subtitle="Hero without actions"
          actions={[]}
        />
      );
      
      const serializedData = ComponentTransformer.serialize(emptyActionsHero);
      const parsedData = JSON.parse(serializedData);
      
      expect(parsedData.data).toHaveProperty('actions');
      expect(parsedData.data.actions).toEqual([]);
      
      const deserializedComponent = ComponentTransformer.deserialize(serializedData);
      expect(React.isValidElement(deserializedComponent)).toBe(true);
    });

    it('handles undefined/null properties during serialization', () => {
      const minimalHero = (
        <HeroBlock 
          title="Minimal Hero"
          // Explicitly setting some props as undefined
          subtitle={undefined}
          backgroundImage={undefined}
          actions={undefined}
        />
      );
      
      const serializedData = ComponentTransformer.serialize(minimalHero);
      const parsedData = JSON.parse(serializedData);
      
      expect(parsedData.data).toHaveProperty('title', 'Minimal Hero');
      // undefined properties should be either excluded or set to undefined
      expect(parsedData.data.subtitle === undefined || !Object.prototype.hasOwnProperty.call(parsedData.data, 'subtitle')).toBe(true);
      
      const deserializedComponent = ComponentTransformer.deserialize(serializedData);
      expect(React.isValidElement(deserializedComponent)).toBe(true);
    });
  });
});