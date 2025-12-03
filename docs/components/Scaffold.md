# Scaffold

**Location:** `src/components/Scaffold.tsx`

## Overview
Scaffold provides a complete application scaffolding system for QwickApps. It delivers Material UI-compliant layout, navigation, and responsive breakpoints, making it easy to build well-structured apps.

## Features
- Responsive AppBar with logo and actions
- Navigation rail/drawer with item limits
- Bottom navigation for mobile
- Content area with proper spacing
- Material Design breakpoints
- Theme and palette switchers

## Props
- `children`: ReactNode – Page content
- `navigationItems`: MenuItem[] – Primary navigation items
- `appBar`: AppBarProps – AppBar configuration
- `className`: string – Additional CSS class
- `showAppBar`: boolean – Show/hide AppBar (default: true)
- `appBarHeight`: number – Custom AppBar height
- `appName`: string – Application name
- `showThemeSwitcher`: boolean – Show theme switcher
- `showPaletteSwitcher`: boolean – Show palette switcher

## Usage
```tsx
import Scaffold from './components/Scaffold';

<Scaffold navigationItems={items} appBar={{ title: 'My App' }}>
  <MainContent />
</Scaffold>
```

## Internal Logic
- Adapts layout for mobile, tablet, desktop
- Follows Material UI navigation guidelines
- Integrates with QwickApp context for theming and branding

## Best Practices
- Use for main app layout in QwickApps apps
- Configure navigation and AppBar for your needs

## Copyright
(c) 2025 QwickApps.com. All rights reserved.
