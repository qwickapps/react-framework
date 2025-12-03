# GridCell

**Location:** `src/components/layout/GridCell.tsx`

## Overview
The `GridCell` component is a simple cell wrapper for GridLayout. It applies grid props to any content and uses the base props pattern for consistency across QwickApps layouts.

## Features
- Lightweight wrapper for grid cells
- Applies grid props as data attributes
- Consistent with QwickApps base props pattern

## Props
- `children`: ReactNode – Content to render inside the cell
- Grid and style props from `WithBaseProps`

## Usage
```tsx
import GridCell from './layout/GridCell';

<GridCell span={2} xs={12}>
  <Content />
</GridCell>
```

## Best Practices
- Use for individual grid cells in custom layouts
- Leverage grid props for responsive design

## Copyright
(c) 2025 QwickApps.com. All rights reserved.
