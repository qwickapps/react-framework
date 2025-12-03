# Button

**Location:** `src/components/buttons/Button.tsx`

## Overview
The `Button` component is an enhanced version of Material-UI's Button, supporting standardized dimension and spacing props, grid behavior, and consistent theming for QwickApps.

## Features
- Standardized dimension and spacing props
- Grid behavior support for ColumnLayout
- Consistent theming and styling
- Forwards ref and supports all MUI Button props

## Props
- All Material-UI Button props (except `sx`, `className`, `style`)
- Grid and style props from `WithBaseProps`

## Usage
```tsx
import { Button } from './buttons/Button';

<Button variant="contained" color="primary">Click Me</Button>
```

## Best Practices
- Use for all button needs in QwickApps apps
- Leverage grid props for layout integration

## Copyright
(c) 2025 QwickApps.com. All rights reserved.
