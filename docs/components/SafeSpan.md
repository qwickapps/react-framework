# SafeSpan

**Location:** `src/components/SafeSpan.tsx`

## Overview
SafeSpan safely renders HTML content with automatic sanitization, protecting against XSS and unsafe markup. It is useful for displaying user-generated or dynamic HTML in a secure way.

## Features
- Sanitizes HTML using `sanitize-html`
- Renders sanitized HTML or a plain text placeholder
- Supports grid and style props via `useBaseProps`
- Returns `null` if no content or placeholder

## Props
- `html`: string – HTML content to render
- `placeholder`: string – Plain text to show if no HTML
- (plus base props from `WithBaseProps`)

## Usage
```tsx
import SafeSpan from './components/SafeSpan';

<SafeSpan html={userHtml} placeholder="No content available" />
```

## Internal Logic
- Sanitizes HTML before rendering
- Renders placeholder if no HTML
- Supports grid and style props for layout

## Best Practices
- Use for any dynamic HTML rendering
- Always sanitize user-generated content

## Copyright
(c) 2025 QwickApps.com. All rights reserved.
