# ResponsiveMenu

**Location:** `src/components/ResponsiveMenu.tsx`

## Overview
ResponsiveMenu is an adaptive navigation component that automatically renders different navigation styles based on screen size. It supports mobile, tablet, and desktop layouts, and is theme-aware.

## Features
- Mobile: Bottom navigation bar
- Tablet: Expandable navigation rail (sidebar)
- Desktop: Top navigation with drawer
- Theme-aware styling
- Customizable menu items with icons
- Automatic logo display using QwickApp context
- Keyboard navigation and ARIA accessibility

## Props
- `items`: MenuItem[] – Array of menu items
- `className`: string – Additional CSS class name
- `logo`: ReactNode – Custom logo override
- `showLogo`: boolean – Whether to show logo (default: true)
- `logoPosition`: 'left' | 'center' | 'right' – Logo position in desktop mode
- `brandText`: string – Custom brand text
- `onMenuToggle`: (isOpen: boolean) => void – Callback for menu state changes

## Usage
```tsx
import ResponsiveMenu from './components/ResponsiveMenu';

<ResponsiveMenu items={menuItems} />
```

## Internal Logic
- Uses QwickApp context for appName and logo
- Adapts layout based on screen size
- Integrates with React Router via safe navigation hooks

## Best Practices
- Use for main navigation in QwickApps apps
- Customize menu items and logo as needed

## Copyright
(c) 2025 QwickApps.com. All rights reserved.
