# GridLayout

**Location:** `src/components/layout/GridLayout.tsx`

## Overview
The `GridLayout` component provides a flexible grid layout for QwickApps. It works with any component that has grid props and automatically wraps components in a Material-UI Grid when grid props are detected.

## Features
- Flexible grid layout for any children with grid props
- Auto-wrapping of components in Grid
- Configurable columns and spacing
- Support for equal-height columns and custom dimensions
- Custom CSS class and styles

## Props
- `children`: ReactNode – Layout children (any components with grid props)
- `columns`: 1 | 2 | 3 | 4 | 5 | 6 – Number of equal-width columns
- `spacing`: SpacingValue – Spacing between columns (default: small)
- `equalHeight`: boolean – Equal height columns
- `height`, `width`, `minHeight`, `minWidth`, `maxHeight`, `maxWidth`: DimensionValue – Layout dimensions
- `className`: string – Additional CSS class
- `sx`: SxProps<Theme> – Custom styles

## Usage
```tsx
import GridLayout from './layout/GridLayout';

<GridLayout columns={3} spacing="medium">
  <GridCell span={1}><Content /></GridCell>
  <GridCell span={2}><FeatureGrid /></GridCell>
</GridLayout>
```

## Best Practices
- Use for page or section layouts needing grid structure
- Configure columns and spacing for desired layout

## Copyright
(c) 2025 QwickApps.com. All rights reserved.
