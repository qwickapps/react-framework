/**
 * Clean Environment Validation Test
 *
 * This file tests that @qwickapps/react-framework can be imported and used
 * correctly in a fresh React + TypeScript project.
 *
 * It validates:
 * - All major component exports are available
 * - TypeScript types work correctly
 * - CSS imports work
 * - Component props match expected interfaces
 */
import { useState } from 'react';
import {
  // Core app wrapper
  QwickApp,

  // Navigation & Layout
  Scaffold,
  Section,

  // Buttons
  Button,

  // Content blocks
  HeroBlock,
  FeatureGrid,
  Footer,
  Code,
  Text,

  // Form components
  TextInputField,
  SelectInputField,

  // New v1.5.0 components
  ProductLogo,
  Dialog,
  DialogTitle,
  DialogContent,

  // Utility functions
  getIconComponent,
  getIconEmoji,
} from '@qwickapps/react-framework';

// CSS import validation
import '@qwickapps/react-framework/dist/index.css';

/**
 * Test application demonstrating proper usage of major components
 */
function App() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <QwickApp>
      <Scaffold
        appName="Validation Test App"
        navigationItems={[
          { id: 'home', label: 'Home', href: '/' },
          { id: 'docs', label: 'Documentation', href: '/docs' },
          { id: 'about', label: 'About', href: '/about' }
        ]}
        showThemeSwitcher={true}
        showPaletteSwitcher={true}
      >
        {/* Hero Section */}
        <HeroBlock
          title="QwickApps React Framework"
          subtitle="Clean environment validation successful"
          background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          height="400px"
          actions={[
            { label: 'Get Started', variant: 'contained' },
            { label: 'Learn More', variant: 'outlined' }
          ]}
        />

        {/* Feature Grid Section */}
        <Section>
          <FeatureGrid
            features={[
              { id: 'ts', title: 'TypeScript', description: 'Full type safety' },
              { id: 'theme', title: 'Theming', description: 'Dark/light modes' },
              { id: 'a11y', title: 'Accessibility', description: 'WCAG compliant' }
            ]}
          />
        </Section>

        {/* Code Block Section */}
        <Section>
          <Code language="tsx">
            {`import { QwickApp, Scaffold } from '@qwickapps/react-framework';

function App() {
  return (
    <QwickApp>
      <Scaffold appName="My App" navigationItems={[]}>
        {/* Your content here */}
      </Scaffold>
    </QwickApp>
  );
}`}
          </Code>
        </Section>

        {/* Text Content Section */}
        <Section>
          <Text>
            This is a validation test to ensure the package works correctly
            in a clean environment without any pre-existing dependencies.
          </Text>
        </Section>

        {/* Form Components Section */}
        <Section>
          <TextInputField
            label="Test Input"
            placeholder="Enter text..."
          />
          <SelectInputField
            label="Test Select"
            options={[
              { value: 'opt1', label: 'Option 1' },
              { value: 'opt2', label: 'Option 2' }
            ]}
          />
        </Section>

        {/* Button Section */}
        <Section>
          <Button variant="contained" color="primary">
            Primary Button
          </Button>
          <Button variant="outlined" color="secondary">
            Secondary Button
          </Button>
        </Section>

        {/* New v1.5.0 Components */}
        <Section>
          <ProductLogo name="wick Apps" />
          <Text>
            Icon utilities: Home emoji is {getIconEmoji('home')} and component renders: {getIconComponent('home')}
          </Text>
          <Button variant="outlined" onClick={() => setDialogOpen(true)}>
            Open Dialog
          </Button>
          <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle>Test Dialog</DialogTitle>
            <DialogContent>
              <Text>This dialog uses QwickApps CSS theme variables for consistent styling.</Text>
            </DialogContent>
          </Dialog>
        </Section>

        {/* Footer */}
        <Footer
          copyright="© 2025 QwickApps - Validation Test"
          sections={[
            {
              id: 'resources',
              title: 'Resources',
              items: [
                { id: 'docs', label: 'Documentation', href: '/docs' },
                { id: 'api', label: 'API Reference', href: '/api' }
              ]
            },
            {
              id: 'legal',
              title: 'Legal',
              items: [
                { id: 'privacy', label: 'Privacy Policy', href: '/privacy' },
                { id: 'terms', label: 'Terms of Service', href: '/terms' }
              ]
            }
          ]}
        />
      </Scaffold>
    </QwickApp>
  );
}

export default App;
