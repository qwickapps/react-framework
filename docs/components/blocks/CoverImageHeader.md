# CoverImageHeader

**Location:** `src/components/blocks/CoverImageHeader.tsx`

## Overview
The `CoverImageHeader` component provides a flexible header layout with an optional image/avatar, info section, and context menu. It is ideal for modern app interfaces and supports multiple actions and tags.

## Features
- Optional image/avatar on the left
- Info section with overline, title, subtitle, and tags
- Context menu with up to 3 visible actions plus overflow
- Customizable image size and shape
- Responsive and theme-aware

## Props
- `image`: string | ReactNode – Optional image URL or component
- `imageAlt`: string – Image alt text
- `imageSize`: 'small' | 'medium' | 'large' – Image size
- `imageShape`: 'square' | 'circle' | 'rounded' – Image shape
- `overline`: string – Overline text above title
- `title`: string – Main title text
- `subtitle`: string – Subtitle text
- `tags`: (string | ReactNode)[] – Array of tags
- `actions`: HeaderAction[] – Array of context menu actions

## Usage
```tsx
import CoverImageHeader from './blocks/CoverImageHeader';

<CoverImageHeader
  image="/avatar.png"
  title="Profile"
  subtitle="User details"
  actions={[{ id: 'edit', label: 'Edit', onClick: () => {} }]}
/>
```

## Best Practices
- Use for headers with images and actions
- Limit visible actions for cleaner UI

## Copyright
(c) 2025 QwickApps.com. All rights reserved.
