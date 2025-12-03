# FormPage

**Location:** `src/components/pages/FormPage.tsx`

## Overview
The `FormPage` component provides a reusable, standardized full-page layout for forms. It includes a header, status message handling, form container, and footer, with support for background variants and responsive design.

## Features
- CoverImageHeader as default header with branding
- Status message handling (info, success, warning, error)
- Consistent form container and footer
- Background variants (default, gradient, image)
- Responsive design for all screen sizes

## Props
- `title`: string – Page title (required)
- `description`: string – Page subtitle/description
- `coverImage`: string | ReactNode – Cover image for header
- `form`: ReactNode – Form content (required)
- `footer`: ReactNode – Footer content
- `status`: 'info' | 'success' | 'warning' | 'error' – Status message type
- `message`: string – Status message content
- `maxWidth`: 'xs' | 'sm' | 'md' – Maximum width of form container
- `background`: string – Background style variant

## Usage
```tsx
import FormPage from './pages/FormPage';

<FormPage
  title="Sign Up"
  description="Create your account."
  form={<RegisterForm />}
  footer={<FooterLinks />}
  status="success"
  message="Account created successfully!"
/>
```

## Best Practices
- Use for all full-page forms to ensure consistent layout and messaging
- Customize header, footer, and background as needed

## Copyright
(c) 2025 QwickApps.com. All rights reserved.
