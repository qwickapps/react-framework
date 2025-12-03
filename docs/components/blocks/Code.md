# Code

**Location:** `src/components/blocks/Code.tsx`

## Overview
The `Code` component displays syntax-highlighted code blocks with support for multiple languages, copy-to-clipboard functionality, and responsive design. It adapts to light/dark themes and can show line numbers and custom titles.

## Features
- Syntax highlighting for code
- Copy to clipboard button
- Light/dark theme support
- Responsive layout
- Optional line numbers
- Customizable background and title

## Props
- `children`: string – Code content to display
- `language`: string – Programming language for syntax highlighting
- `showCopy`: boolean – Show copy button (default: true)
- `showLineNumbers`: boolean – Show line numbers (default: false)
- `title`: string – Code title or filename
- `maxHeight`: number | string – Maximum height before scrolling (default: 400)
- `className`: string – Custom class name
- `wrapLines`: boolean – Wrap long lines (default: false)
- `background`: string – Custom background color

## Usage
```tsx
import { Code } from './blocks/Code';

<Code language="tsx" showCopy title="Example.tsx">
  {`const x = 42;`}
</Code>
```

## Best Practices
- Use for displaying code snippets in documentation or UI
- Enable copy button for user convenience
- Adjust maxHeight for long code blocks

## Copyright
(c) 2025 QwickApps.com. All rights reserved.
