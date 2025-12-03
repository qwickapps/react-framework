# TextField

**Location:** `src/components/input/TextField.tsx`

## Overview
The `TextField` component is an enhanced version of Material-UI's TextField, supporting standardized dimension and spacing props, grid behavior, and consistent theming for QwickApps.

## Features
- Standardized dimension and spacing props
- Grid behavior support for ColumnLayout
- Consistent theming and styling
- Forwards ref and supports all MUI TextField props

## Props
- All Material-UI TextField props (except `sx`, `className`, `style`)
- Grid and style props from `WithBaseProps`

## Usage
```tsx
import { TextField } from './input/TextField';

<TextField label="Name" variant="outlined" />
```

## Best Practices
- Use for all text input needs in QwickApps apps
- Leverage grid props for layout integration

## Copyright
(c) 2025 QwickApps.com. All rights reserved.
