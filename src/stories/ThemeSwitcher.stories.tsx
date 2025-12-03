/**
 * ThemeSwitcher Component Stories
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import type { Meta, StoryObj } from '@storybook/react';
import ThemeSwitcher from '../components/buttons/ThemeSwitcher';
import PaletteSwitcher from '../components/buttons/PaletteSwitcher';
import AccessibilityChecker from '../components/AccessibilityChecker';
import { QwickApp } from '../index';
import { useTheme } from '../contexts/ThemeContext';
import { usePalette } from '../contexts/PaletteContext';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';

const meta = {
 title: 'Components/ThemeSwitcher',
 component: ThemeSwitcher,
 parameters: {
 layout: 'centered',
 docs: {
 description: {
 component: `ThemeSwitcher provides users with light, dark, and system theme mode options for optimal viewing experience.

**Key Features:**
- **Three Theme Modes**: Light, dark, and automatic system preference detection
- **System Integration**: Automatically follows OS theme changes when in system mode
- **Material-UI Integration**: Seamlessly integrates with Material-UI theme system
- **Context Management**: Works with ThemeContext for consistent state management
- **Instant Switching**: Smooth transitions between theme modes without page reload
- **Persistent Preference**: Remembers user selection across browser sessions
- **Accessibility Compliant**: Full ARIA support and keyboard navigation

**Perfect for:**
- User settings and preference panels
- Application headers and navigation bars
- Accessibility features and user comfort options
- Multi-theme applications requiring user choice
- Dashboard and admin panel customization
- Design system demonstrations and showcases`,
 },
 },
 },
 tags: ['autodocs'],
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

// Component that uses the theme context
function ThemeDemo() {
 const { currentTheme, actualThemeMode } = useTheme();
 const { currentPalette } = usePalette();
 
 return (
 <Box sx={{ p: 3, maxWidth: 600, margin: '0 auto' }}>
 <div style={{ marginBottom: '20px', textAlign: 'center' }}>
 <Typography variant="h5" gutterBottom>
 Try switching themes and palettes!
 </Typography>
 <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
 Use the theme and palette switchers to see how different combinations affect the appearance.
 </Typography>
 <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', alignItems: 'center' }}>
 <ThemeSwitcher />
 <PaletteSwitcher />
 </Box>
 </div>

 <Card sx={{ mt: 3 }}>
 <CardContent>
 <Typography variant="h6" gutterBottom>
 Theme & Palette Demo Content
 </Typography>
 <Typography variant="body2" color="text.secondary" paragraph>
 Current Theme: <strong>{currentTheme}</strong> → Actual: <strong>{actualThemeMode}</strong>
 </Typography>
 <Typography variant="body2" color="text.secondary" paragraph>
 Current Palette: <strong>{currentPalette}</strong>
 </Typography>
 <Typography variant="body2" color="text.secondary" paragraph>
 This content changes appearance based on both the selected theme mode and color palette, 
 demonstrating the full theming system integration with Material-UI.
 </Typography>
 
 {/* AccessibilityChecker Integration */}
 <Box sx={{ 
 p: 2, 
 backgroundColor: 'background.paper', 
 border: '1px solid', 
 borderColor: 'divider',
 borderRadius: 1, 
 mb: 2 
 }}>
 <Typography variant="subtitle2" gutterBottom>
 Accessibility Monitoring
 </Typography>
 <Typography variant="caption" color="text.secondary" paragraph>
 The AccessibilityChecker automatically monitors color contrast and accessibility compliance as you switch themes and palettes.
 </Typography>
 <AccessibilityChecker />
 </Box>
 
 <Box sx={{ 
 display: 'flex', 
 gap: 2,
 flexWrap: 'wrap',
 justifyContent: 'center',
 mb: 3
 }}>
 <Button variant="contained" color="primary">
 Primary Button
 </Button>
 <Button variant="outlined" color="secondary">
 Secondary Button
 </Button>
 <Button variant="text">
 Text Button
 </Button>
 </Box>

 <Box sx={{ 
 display: 'grid', 
 gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
 gap: 2,
 mt: 2 
 }}>
 {[
 { name: 'Primary', color: 'primary.main' },
 { name: 'Secondary', color: 'secondary.main' },
 { name: 'Background', color: 'background.default' },
 { name: 'Surface', color: 'background.paper' },
 ].map(({ name, color }) => (
 <Box key={name} sx={{ textAlign: 'center' }}>
 <Box sx={{ 
 width: '100%', 
 height: 40, 
 backgroundColor: color,
 border: color.includes('background') ? '1px solid' : 'none',
 borderColor: 'divider',
 borderRadius: 1,
 mb: 1
 }} />
 <Typography variant="caption" color="text.secondary">
 {name}
 </Typography>
 </Box>
 ))}
 </Box>
 </CardContent>
 </Card>
 </Box>
 );
}

// Default story - Interactive Theme Demo
export const Default: Story = {
 render: () => (
 <QwickApp appId="com.qwickapps.storybook" appName="QwickApps Storybook">
 <ThemeDemo />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Interactive theme and palette switcher demo showing how different theme modes and color palettes work together. Switch between light/dark/system modes and try different color palettes to see the full theming system in action.',
 },
 },
 },
};
