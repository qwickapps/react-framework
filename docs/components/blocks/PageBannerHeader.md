# PageBannerHeader

**Location:** `src/components/blocks/PageBannerHeader.tsx`

## Overview
The `PageBannerHeader` component provides a Facebook-style banner header with a cover image, profile info, and action buttons. It is ideal for social-style pages and supports metadata, tags, and responsive layout.

## Features
- Large cover/banner image background
- Profile image overlay (bottom-left or other positions)
- Info section with title, subtitle, and metadata
- Action buttons with overflow support
- Responsive and theme-aware

## Props
- `coverImage`: string – Cover/banner image URL
- `coverImageAlt`: string – Cover image alt text
- `profileImage`: string | ReactNode – Profile/avatar image
- `profileImageAlt`: string – Profile image alt text
- `profileImageSize`: 'small' | 'medium' | 'large' – Profile image size
- `overline`: string – Overline text
- `title`: string – Main title
- `subtitle`: string – Subtitle text
- `metadata`: Array<{ label: string; value: string | number }> – Metadata items
- `tags`: (string | ReactNode)[] – Array of tags
- `actions`: HeaderAction[] – Action buttons
- `maxVisibleActions`: number – Max visible actions before overflow
- `height`: number | string – Banner height
- `className`: string – Additional CSS class
- `profilePosition`: 'bottom-left' | 'bottom-center' | 'overlay-center' – Profile position

## Usage
```tsx
import PageBannerHeader from './blocks/PageBannerHeader';

<PageBannerHeader
  coverImage="/cover.jpg"
  profileImage="/avatar.png"
  title="User Name"
  subtitle="Profile details"
  actions={[{ id: 'edit', label: 'Edit', onClick: () => {} }]}
/>
```

## Best Practices
- Use for profile or social-style page headers
- Organize metadata and actions for clarity

## Copyright
(c) 2025 QwickApps.com. All rights reserved.
