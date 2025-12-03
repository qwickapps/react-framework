# TextInputField

**Location:** `src/components/input/TextInputField.tsx`

## Overview
The `TextInputField` component provides a standardized text input field with consistent Material-UI styling, responsive grid sizing, validation, and support for multiline/textarea mode.

## Features
- Consistent Material-UI styling
- Responsive grid sizing
- Focus handling
- Validation and error states
- Support for multiline/textarea mode

## Props
- `label`: string – Field label
- `value`: string | number | undefined – Current field value
- `onChange`: function – Change handler
- `onFocus`: function – Focus handler
- `required`: boolean – Required field
- `disabled`: boolean – Disabled field
- `error`: string – Error message
- `helperText`: string – Helper text
- `placeholder`: string – Placeholder text
- `type`: string – Input type (text, email, number, etc.)
- `multiline`: boolean – Multiline field
- `rows`: number – Number of rows for multiline
- `maxRows`: number – Max rows for multiline
- `textFieldProps`: object – Additional TextField props
- (plus grid wrapper props)

## Usage
```tsx
import TextInputField from './input/TextInputField';

<TextInputField
  label="Email"
  value={email}
  onChange={setEmail}
  required
  error={emailError}
  helperText="Enter a valid email address."
/>
```

## Best Practices
- Use for text input fields with validation
- Support multiline for longer text

## Copyright
(c) 2025 QwickApps.com. All rights reserved.
