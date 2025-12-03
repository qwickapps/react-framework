# MenuItem

**Location:** `src/components/menu/MenuItem.tsx`

## Overview
The `MenuItem` type defines a standardized menu item for navigation components in QwickApps. It is used by Scaffold, navigation rails, drawers, and other menu systems.

## Features
- Unique identifier and display label
- Optional icon and click handler
- Supports external links and route navigation
- Active/selected and disabled states
- Badge support for notifications or counts
- Priority for ordering

## Props
- `id`: string – Unique identifier
- `label`: string – Display label
- `icon`: ReactNode – Icon to display
- `onClick`: function – Click handler
- `href`: string – External link URL
- `route`: string – Route path for navigation
- `active`: boolean – Active/selected state
- `disabled`: boolean – Disabled state
- `badge`: string | number – Badge text or number
- `priority`: number – Ordering priority

## Usage
```tsx
const menuItem: MenuItem = {
  id: 'home',
  label: 'Home',
  icon: <HomeIcon />,
  route: '/',
  active: true,
  badge: 3,
};
```

## Best Practices
- Use for all navigation menu items in QwickApps apps
- Set priority for custom ordering

## Copyright
(c) 2025 QwickApps.com. All rights reserved.
