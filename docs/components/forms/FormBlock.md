# FormBlock

**Location:** `src/components/forms/FormBlock.tsx`

## Overview
The `FormBlock` component provides a reusable, consistent layout for forms. It supports optional header and footer sections, a form content area, and a status message area for info, success, warning, or error messages.

## Features
- Optional header section (logo, title, subtitle, cover image)
- Form content area
- Status message area (info, success, warning, error)
- Optional footer section
- Theme-aware and responsive

## Props
- `header`: ReactNode – Custom header content (overrides default header)
- `title`: string – Title for default header
- `description`: string – Subtitle/description for default header
- `coverImage`: string | ReactNode – Cover image for default header
- `form`: ReactNode – Form content
- `footer`: ReactNode – Footer content (links, text, etc.)
- `statusType`: string – Status type for message display (info, success, warning, error)
- `statusMessage`: string – Status message text

## Usage
```tsx
import FormBlock from './forms/FormBlock';

<FormBlock
  title="Sign In"
  description="Enter your credentials to continue."
  form={<LoginForm />}
  footer={<FooterLinks />}
  statusType="error"
  statusMessage="Invalid credentials."
/>
```

## Best Practices
- Use for all forms to ensure consistent layout and messaging
- Customize header and footer as needed

## Copyright
(c) 2025 QwickApps.com. All rights reserved.
