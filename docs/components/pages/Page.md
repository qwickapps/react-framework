# Page

**Location:** `src/components/pages/Page.tsx`

## Overview
The `Page` component is the main content wrapper for application pages in QwickApps. It provides automatic page title management, route-based configuration, contextual menu items, proper content spacing, and SEO/accessibility features.

## Features
- Automatic page title management
- Route-based configuration
- Contextual menu items for navigation
- Proper content spacing and layout
- SEO and accessibility features
- Page-level context via `usePageContext`
- Integration with AppScaffold for contextual actions

## Props
- `route`: string – Current page route/path
- (plus other props for message and loading state)

## Usage
```tsx
import Page from './pages/Page';

<Page route="/dashboard">
  <DashboardContent />
</Page>
```

## Best Practices
- Use as the base for all application pages
- Leverage contextual menu items for navigation
- Use `usePageContext` for page-level state

## Copyright
(c) 2025 QwickApps.com. All rights reserved.
