# GridCellWrapper

**Location:** `src/components/layout/GridCellWrapper.tsx`

## Overview
The `GridCellWrapper` component provides a responsive grid cell wrapper for layout consistency. It is designed for use in forms and layouts needing consistent grid behavior, supporting responsive sizing and a full-width option.

## Features
- Responsive grid sizing via breakpoint props (xs, sm, md, lg, xl)
- Optional fullWidth prop to span all columns
- Passes additional GridProps for customization
- Easy integration with form fields or layout elements

## Props
- `children`: ReactNode – Content to render inside the grid cell
- `xs`, `sm`, `md`, `lg`, `xl`: number | 'auto' – Grid breakpoint sizes
- `fullWidth`: boolean – If true, cell spans all columns (xs=12)
- (plus other GridProps except 'item' and 'children')

## Usage
```tsx
import GridCellWrapper from './layout/GridCellWrapper';

<GridCellWrapper md={6} fullWidth>
  <TextInputField label="Name" />
</GridCellWrapper>
```

## Best Practices
- Use for wrapping form fields or layout elements in a grid
- Set fullWidth for single-column layouts

## Copyright
(c) 2025 QwickApps.com. All rights reserved.
