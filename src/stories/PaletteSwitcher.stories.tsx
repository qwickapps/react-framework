/**
 * PaletteSwitcher Component Stories
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import type { Meta, StoryObj } from '@storybook/react';
import PaletteSwitcher from '../components/buttons/PaletteSwitcher';
import ThemeSwitcher from '../components/buttons/ThemeSwitcher';
import AccessibilityChecker from '../components/AccessibilityChecker';
import { QwickApp } from '../index';
import { Box } from '@mui/material';

const meta = {
 title: 'Components/PaletteSwitcher',
 component: PaletteSwitcher,
 parameters: {
 layout: 'centered',
 docs: {
 description: {
 component: `PaletteSwitcher enables users to switch between different color palettes, providing instant visual customization.

**Key Features:**
- **Dynamic Palette Switching**: Instant color theme changes with smooth transitions
- **Context Integration**: Seamlessly works with PaletteContext for state management 
- **CSS Variables**: Automatically updates CSS custom properties for consistent theming
- **Accessibility Support**: Proper ARIA labels and keyboard navigation
- **Visual Feedback**: Shows current palette selection with clear visual indicators
- **Persistent Selection**: Remembers user's choice across sessions via localStorage
- **Theme Compatibility**: Works harmoniously with ThemeSwitcher for complete customization

**Perfect for:**
- User preference settings and customization panels
- Brand customization in multi-tenant applications
- Accessibility enhancement tools
- Design system demonstrations and showcases 
- Personal dashboards and profile pages
- Application headers with user controls`,
 },
 },
 },
 tags: ['autodocs'],
 decorators: [
 (Story) => (
 <QwickApp appId="com.qwickapps.storybook" appName="QwickApps Storybook">
 <Box p={3}>
 <Story />
 </Box>
 </QwickApp>
 ),
 ],
} satisfies Meta<typeof PaletteSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story - Color Variables Demo with Theme Switching
export const Default: Story = {
 render: () => (
 <Box sx={{ 
 p: 3, 
 backgroundColor: 'var(--palette-background-main)',
 borderRadius: '8px',
 border: '1px solid var(--palette-border-light)'
 }}>
 <div style={{ marginBottom: '20px', textAlign: 'center' }}>
 <h3 style={{ color: 'var(--palette-text-primary)', marginBottom: '8px' }}>
 Palette & Theme Switcher Demo
 </h3>
 <p style={{ color: 'var(--palette-text-secondary)', marginBottom: '16px' }}>
 Try switching palettes and themes to see how colors adapt across light/dark modes.
 </p>
 <div style={{ 
 display: 'flex', 
 gap: '12px', 
 justifyContent: 'center', 
 alignItems: 'center',
 marginBottom: '20px'
 }}>
 <PaletteSwitcher />
 <ThemeSwitcher />
 </div>
 
 {/* AccessibilityChecker Showcase */}
 <div style={{
 padding: '16px',
 backgroundColor: 'var(--palette-surface-main)',
 borderRadius: '8px',
 border: '1px solid var(--palette-border-light)',
 marginBottom: '20px'
 }}>
 <h4 style={{ color: 'var(--palette-text-primary)', marginBottom: '8px', fontSize: '1rem' }}>
 Accessibility Checker
 </h4>
 <p style={{ color: 'var(--palette-text-secondary)', fontSize: '0.875rem', marginBottom: '12px' }}>
 The AccessibilityChecker automatically monitors color contrast and provides accessibility feedback. 
 Try different palette and theme combinations to see how it adapts.
 </p>
 <AccessibilityChecker />
 </div>
 </div>
 <div style={{ 
 display: 'flex', 
 flexWrap: 'wrap', 
 gap: '16px',
 justifyContent: 'center'
 }}>
 {[
 { name: 'Primary', var: '--palette-primary-main' },
 { name: 'Secondary', var: '--palette-secondary-main' },
 { name: 'Success', var: '--palette-success-main' },
 { name: 'Warning', var: '--palette-warning-main' },
 { name: 'Error', var: '--palette-error-main' },
 { name: 'Info', var: '--palette-info-main' },
 ].map(({ name, var: varName }) => (
 <div key={name} style={{
 padding: '16px',
 borderRadius: '8px',
 backgroundColor: 'var(--palette-surface-main)',
 border: '1px solid var(--palette-border-main)',
 textAlign: 'center',
 minWidth: '120px',
 boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
 }}>
 <div style={{
 width: '80px',
 height: '40px',
 backgroundColor: `var(${varName})`,
 borderRadius: '4px',
 marginBottom: '8px',
 margin: '0 auto 8px auto'
 }} />
 <div style={{ color: 'var(--palette-text-primary)', fontWeight: 'bold', fontSize: '0.875rem' }}>
 {name}
 </div>
 <div style={{ 
 color: 'var(--palette-text-secondary)', 
 fontSize: '0.75rem',
 fontFamily: 'monospace',
 marginTop: '4px'
 }}>
 {varName}
 </div>
 </div>
 ))}
 </div>
 </Box>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Interactive demo showcasing palette/theme switching with color variables and the AccessibilityChecker component. Switch between different palettes and light/dark modes to see how colors adapt and how the accessibility checker provides real-time contrast feedback.',
 },
 },
 },
};
