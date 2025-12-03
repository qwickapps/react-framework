/**
 * QwickApp Component Stories - Complete theme system setup
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Box, Button, Typography } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import { usePalette } from '../contexts/PaletteContext';
import { useTheme } from '../contexts/ThemeContext';
import AccessibilityChecker from '../components/AccessibilityChecker';
import { Content, FeatureGrid, HeroBlock, Section } from '../components/blocks';
import Logo from '../components/Logo';
import PaletteSwitcher from '../components/buttons/PaletteSwitcher';
import QwickApp from '../components/QwickApp';
import Scaffold from '../components/Scaffold';
import ThemeSwitcher from '../components/buttons/ThemeSwitcher';

const meta = {
 title: 'Framework/QwickApp',
 component: QwickApp,
 parameters: {
 layout: 'fullscreen',
 docs: {
 description: {
 component: `QwickApp is the easiest way to set up the QwickApps React Framework with complete theme system and component library integration.

**Key Features:**
- **CSS Loading**: Imports all necessary theme system styles
- **Provider Setup**: Configures ThemeProvider, PaletteProvider, and DimensionsProvider
- **Component Library**: Access to 50+ production-ready components
- **Header & Footer System**: Flexible page layout components
- **Storage Keys**: Uses unique storage keys with your appId
- **Type Safety**: Full TypeScript support with comprehensive interfaces
- **Theme Integration**: Automatic theme and palette switching
- **Scaffolding Support**: Built-in responsive navigation system

**Perfect For:**
- Starting new React applications with comprehensive theming
- Rapid prototyping with production-ready components
- Applications requiring consistent design systems
- Multi-tenant applications with dynamic branding
- Teams needing standardized UI components
- Projects requiring dark/light mode switching`,
 },
 },
 },
 tags: ['autodocs'],
 argTypes: {
 appId: {
 description: 'Unique app identifier for localStorage keys',
 control: false, // Disable control since it cannot be changed dynamically
 },
 appName: {
 description: 'Application name for display purposes',
 control: { type: 'text' },
 },
 logo: {
 description: 'Logo component to display',
 control: false,
 },
 children: {
 description: 'Child components to render',
 control: false,
 },
 className: {
 description: 'Additional CSS class name',
 control: false,
 },
 style: {
 description: 'Additional inline styles',
 control: { type: 'object' },
 },
 defaultTheme: {
 description: 'Default theme to use when no user preference exists',
 control: false,
 },
 defaultPalette: {
 description: 'Default palette to use when no user preference exists',
 control: false,
 },
 enableScaffolding: {
 description: 'Enable scaffolding features',
 control: false,
 },
 showAppBar: {
 description: 'Whether to show the app bar',
 control: { type: 'boolean' },
 defaultValue: false,
 },
 appBar: {
 description: 'App bar configuration for scaffolding',
 control: false, // Disable control since it's an object
 },
 navigationItems: {
 description: 'Navigation items for scaffolding',
 control: false, // Disable control since it's an array of objects
 },
 appBarHeight: {
 description: 'Height of the app bar',
 control: { type: 'text' },
 defaultValue: '64px',
 },
 },
} satisfies Meta<typeof QwickApp>;

export default meta;
type Story = StoryObj<typeof meta>;

// Demo component that shows theme system integration
function ThemeSystemDemo() {
 const { currentTheme, actualThemeMode, setPreferredTheme } = useTheme();
 const { currentPalette, setPreferredPalette, availablePalettes } = usePalette();

 return (
 <Scaffold
 navigationItems={[]}
 showAppBar={true}
 appBar={{
 title: "QwickApp Demo",
 logo: <Logo name="My App" variant={'on-primary'} size="small" badge="none" />,
 actions: (
 <div style={{ display: 'flex', gap: '8px' }}>
 <ThemeSwitcher />
 <PaletteSwitcher />
 </div>
 ),
 }}
 >
 <Section spacing="spacious">
 <Content 
 title=" Welcome to QwickApp!" 
 centered 
 maxWidth="lg"
 >
 <Typography variant="body1" color="text.secondary">
 This entire demo is wrapped in a single <code>&lt;QwickApp&gt;</code> component.
 No manual provider setup required - everything just works!
 </Typography>
 </Content>
 </Section>

 <Section background="alternate" spacing="comfortable">
 <Content title=" Current Theme System State" centered maxWidth="lg">
 <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 2 }}>
 <Box>
 <Typography variant="subtitle2" color="text.secondary">
 Theme Mode
 </Typography>
 <Typography variant="body1" color="text.primary">
 {currentTheme} → {actualThemeMode}
 </Typography>
 </Box>
 <Box>
 <Typography variant="subtitle2" color="text.secondary">
 Current Palette
 </Typography>
 <Typography variant="body1" color="text.primary">
 {currentPalette}
 </Typography>
 </Box>
 <Box>
 <Typography variant="subtitle2" color="text.secondary">
 Available Palettes
 </Typography>
 <Typography variant="body1" color="text.primary">
 {availablePalettes.length} palettes
 </Typography>
 </Box>
 </Box>
 </Content>
 </Section>

 <Section spacing="comfortable">
 <Content 
 title="🎮 Interactive Demo" 
 centered 
 maxWidth="lg"
 actions={[
 { label: "☀ Light Mode", onClick: () => setPreferredTheme('light'), disabled: actualThemeMode === 'light' },
 { label: "🌙 Dark Mode", onClick: () => setPreferredTheme('dark'), disabled: actualThemeMode === 'dark' },
 { label: "🖥 System Mode", onClick: () => setPreferredTheme('system'), disabled: currentTheme === 'system' },
 ]}
 >
 <Typography variant="body2" color="text.secondary">
 Try these buttons to see the theme system in action:
 </Typography>
 
 <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
 Available palettes:
 </Typography>
 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mt: 1 }}>
 {availablePalettes.map((palette) => (
 <Button
 key={palette.id}
 variant={currentPalette === palette.id ? 'contained' : 'outlined'}
 size="small"
 onClick={() => setPreferredPalette(palette.id)}
 >
 {palette.name}
 </Button>
 ))}
 </Box>
 </Content>
 </Section>

 <Section background="alternate" spacing="comfortable">
 <Content title=" Current Color Palette" centered maxWidth="lg">
 <Box sx={{
 display: 'grid',
 gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
 gap: 2
 }}>
 {[
 { name: 'Primary', color: 'primary.main' },
 { name: 'Secondary', color: 'secondary.main' },
 { name: 'Background', color: 'background.default' },
 { name: 'Surface', color: 'background.paper' },
 { name: 'Success', color: 'success.main' },
 { name: 'Warning', color: 'warning.main' },
 { name: 'Error', color: 'error.main' },
 { name: 'Info', color: 'info.main' },
 ].map(({ name, color }) => (
 <Box key={name} sx={{ textAlign: 'center' }}>
 <Box sx={{
 width: '100%',
 height: 60,
 backgroundColor: color,
 border: color.includes('background') ? '1px solid' : 'none',
 borderColor: 'divider',
 borderRadius: 1,
 mb: 1,
 boxShadow: 1
 }} />
 <Typography variant="caption" color="text.secondary">
 {name}
 </Typography>
 </Box>
 ))}
 </Box>
 </Content>
 </Section>

 <Section spacing="comfortable">
 <Content title="♿ Accessibility Monitoring" centered maxWidth="lg">
 <Typography variant="body2" sx={{ mb: 2 }} color="text.secondary">
 QwickApp includes automatic accessibility monitoring via the AccessibilityChecker component:
 </Typography>
 <AccessibilityChecker />
 </Content>
 </Section>
 </Scaffold>
 );
}

// Complete App Example Story 
export const CompleteExample: Story = {
 args: {
 appId: 'com.example.qwickapp-demo',
 children: undefined, // Will be overridden by render function
 },
 render: (args) => (
 <Scaffold navigationItems={[]} {...args}>
 <ThemeSystemDemo />
 </Scaffold>
 ),
 parameters: {
 docs: {
 description: {
 story: `This story demonstrates a complete application setup using QwickApp. 
 
**Key Features Demonstrated:**
- Single component setup with automatic provider configuration
- Theme and palette switching with real-time updates 
- MUI integration with automatic theme synchronization
- Accessibility monitoring and compliance checking
- Storage isolation with unique appId

**Usage in your app:**
\`\`\`jsx
import { QwickApp } from '@qwickapps/react-framework';

function App() {
 return (
 <QwickApp appId="com.mycompany.myapp">
 {/* Your entire app goes here */}
 </QwickApp>
 );
}
\`\`\``,
 },
 },
 },
};

// Simple Example Story
export const SimpleExample: Story = {
 args: {
 appId: 'com.example.simple-demo',
 children: undefined, // Will be overridden by render function
 },
 render: (args) => (
 <Scaffold navigationItems={[]} {...args}>
 <Box sx={{ p: 3, textAlign: 'center' }}>
 <Logo name="Simple App" size="large" />
 <Typography variant="h4" sx={{ mt: 2, mb: 3 }}>
 Hello QwickApp! 👋
 </Typography>
 <Typography variant="body1" sx={{ mb: 2 }} color="text.secondary">
 This simple example shows how easy it is to get started.
 Just wrap your content with QwickApp and you're ready to go!
 </Typography>
 <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
 <ThemeSwitcher />
 <PaletteSwitcher />
 </Box>
 </Box>
 </Scaffold>
 ),
 parameters: {
 docs: {
 description: {
 story: `The simplest possible QwickApp setup. Perfect for getting started quickly!
 
**This example shows:**
- Minimal QwickApp setup
- Automatic theme system initialization 
- Theme and palette switchers working out of the box
- Clean, semantic HTML structure`,
 },
 },
 },
};

// Storage Isolation Example
export const StorageIsolation: Story = {
 args: {
 appId: 'com.example.isolated-storage',
 children: undefined, // Will be overridden by render function
 },
 render: (args) => (
 <Scaffold navigationItems={[]} {...args}>
 <Box sx={{ p: 3 }}>
 <Typography variant="h5" gutterBottom>
 🔒 Storage Isolation Demo
 </Typography>
 <Typography variant="body1" sx={{ mb: 2 }} color="text.secondary">
 This instance uses appId: <code>"{args.appId}"</code>
 </Typography>
 <Typography variant="body2" sx={{ mb: 2 }} color="text.secondary">
 Theme preferences are stored in localStorage with unique keys:
 </Typography>
 <Box sx={{
 p: 2,
 backgroundColor: 'background.paper',
 borderRadius: 1,
 fontFamily: 'monospace',
 fontSize: '0.875rem',
 border: '1px solid',
 borderColor: 'divider'
 }}>
 <div>Theme: {args.appId}.theme</div>
 <div>Palette: {args.appId}.palette</div>
 </Box>
 <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
 <ThemeSwitcher />
 <PaletteSwitcher />
 </Box>
 </Box>
 </Scaffold>
 ),
 parameters: {
 docs: {
 description: {
 story: `Demonstrates how QwickApp uses the appId to create isolated storage keys.
 
**Benefits:**
- No conflicts between different applications
- Clean separation of theme preferences 
- Easy to identify which app stored which preferences
- Supports multiple QwickApps on the same domain`,
 },
 },
 },
};

// Complete Framework Integration Example 
export const CompleteFrameworkExample: Story = {
 args: {
 appId: 'com.example.complete-framework',
 appName: 'QwickApp Demo',
 enableScaffolding: true,
 showThemeSwitcher: true,
 showPaletteSwitcher: true,
 },
 render: (args) => (
 <QwickApp {...args}>
 <HeroBlock
 title="Complete QwickApp Framework"
 subtitle="Theme system, components, and layout working together seamlessly"
 backgroundGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
 blockHeight="medium"
 textAlign="center"
 />

 <Section>
 <Content title="Framework Benefits" centered>
 <FeatureGrid
 columns={2}
 gap="large"
 features={[
 {
 id: 'theme-system',
 title: ' Complete Theme System',
 description: 'Automatic theme and palette management with localStorage persistence and MUI integration.',
 },
 {
 id: 'component-library', 
 title: '🧩 Rich Component Library',
 description: '50+ production-ready components with consistent styling and data binding support.',
 },
 {
 id: 'developer-experience',
 title: '🛠 Great Developer Experience', 
 description: 'Simple setup with TypeScript support, comprehensive documentation, and live examples.',
 },
 {
 id: 'responsive-design',
 title: ' Mobile-First Design',
 description: 'All components are responsive and work perfectly across all device sizes.',
 },
 ]}
 />
 </Content>
 </Section>

 <Section background="alternate">
 <Content title="Theme System Demo" centered>
 <Typography variant="body1">
 Try switching themes and palettes using the controls above. All components automatically adapt to your selected theme and color scheme.
 </Typography>
 </Content>
 </Section>
 </QwickApp>
 ),
 decorators: [],
 parameters: {
 docs: {
 description: {
 story: `Demonstrates QwickApp and Scaffold integration - the two core components working together.
 
**Integration Highlights:**
- QwickApp manages theme system and storage isolation
- Scaffold provides responsive navigation and app layout 
- Theme switchers in app bar demonstrate real-time updates
- All layout components automatically inherit theme colors
- Clean component separation with clear responsibilities`,
 },
 },
 },
};