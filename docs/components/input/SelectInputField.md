# SelectInputField

**Location:** `src/components/input/SelectInputField.tsx`

## Overview
The `SelectInputField` component provides a standardized select dropdown with consistent Material-UI styling, responsive grid sizing, and option rendering.

## Features
- Consistent Material-UI styling
- Responsive grid sizing
- Focus handling
- Option rendering
- Error and helper text support

## Props
- `label`: string – Field label
- `value`: string | number | undefined – Current selected value
- `onChange`: function – Change handler
- `onFocus`: function – Focus handler
- `options`: SelectOption[] – Array of select options
- `required`: boolean – Required field
- `disabled`: boolean – Disabled field
- `error`: string – Error message
- `helperText`: string – Helper text
- `placeholder`: string – Placeholder text
- (plus grid wrapper props)

## Usage
```tsx
import SelectInputField from './input/SelectInputField';

<SelectInputField
  label="Country"
  value={selectedCountry}
  onChange={setCountry}
  options={countryOptions}
/>
```

## Best Practices
- Use for dropdown/select fields
- Provide clear labels and helper text

## Copyright
(c) 2025 QwickApps.com. All rights reserved.
