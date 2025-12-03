# AccessibilityChecker

**Location:** `src/components/AccessibilityChecker.tsx`

## Overview
AccessibilityChecker is a development-only tool for checking theme and palette accessibility in QwickApps. It provides insights into color contrast and other accessibility metrics for the current theme/palette combination.

## Features
- Only rendered in development mode (`NODE_ENV=development`)
- Checks color contrast and accessibility for theme/palette
- Displays results in a dialog with pass/warning/fail status
- Uses Material UI components for UI

## Props
This component does not accept any props.

## Usage
```tsx
import AccessibilityChecker from './components/AccessibilityChecker';

// Only use in development
{process.env.NODE_ENV === 'development' && <AccessibilityChecker />}
```

## AccessibilityCheck Interface
```ts
interface AccessibilityCheck {
  id?: string;
  name: string;
  status: 'pass' | 'warning' | 'fail';
  message?: string;
  details?: string;
  description?: string;
  colors?: {
    foreground: string;
    background: string;
  };
}
```

## Internal Logic
- Uses `getCurrentPalette` and `getCurrentTheme` utilities
- Performs checks when opened
- Results shown in a Material UI Dialog

## Best Practices
- Use only in development
- Do not include in production builds

## Copyright
(c) 2025 QwickApps.com. All rights reserved.
