# HtmlInputField

**Location:** `src/components/input/HtmlInputField.tsx`

## Overview
The `HtmlInputField` component is a custom HTML text field with formatting controls and preview support. It sanitizes HTML input and provides a safe way to edit and display rich text.

## Features
- HTML text input with formatting controls (bold, italic, underline, code)
- Preview mode for sanitized HTML
- Help/info toggle
- Sanitization of HTML content
- Multiline and single-line support

## Props
- `label`: string – Field label
- `value`: string – Field value
- `onChange`: function – Change handler
- `onFocus`: function – Focus handler
- `required`: boolean – Required field
- `placeholder`: string – Placeholder text
- `multiline`: boolean – Multiline input (default: true)
- `rows`: number – Number of rows (default: 4)
- (plus other props)

## Usage
```tsx
import HtmlInputField from './input/HtmlInputField';

<HtmlInputField
  label="Description"
  value={htmlValue}
  onChange={setHtmlValue}
  multiline
  rows={6}
/>
```

## Best Practices
- Use for rich text or HTML input fields
- Always sanitize user-generated HTML

## Copyright
(c) 2025 QwickApps.com. All rights reserved.
