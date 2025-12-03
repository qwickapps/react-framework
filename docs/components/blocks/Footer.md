# Footer

**Location:** `src/components/blocks/Footer.tsx`

## Overview
The `Footer` component provides a reusable footer layout with flexible orientation, branding, and multiple sections for links or custom content. It is responsive and supports copyright/legal info.

## Features
- Configurable orientation (vertical/horizontal)
- Optional logo/branding
- Multiple sections for links, text, or custom content
- Responsive design
- Copyright and legal information support

## Props
- `sections`: FooterSection[] – Footer sections
- `logo`: ReactNode – Logo or branding element
- `copyright`: string – Copyright text
- `legalText`: string – Additional legal/info text
- `orientation`: 'vertical' | 'horizontal' – Layout orientation
- `variant`: 'default' | 'contained' | 'outlined' – Background variant
- (plus base props from `WithBaseProps`)

## Usage
```tsx
import Footer from './blocks/Footer';

<Footer
  sections={[{ id: 'main', title: 'Links', items: [{ id: 'home', label: 'Home', href: '/' }] }]}
  logo={<Logo />}
  copyright="© 2025 QwickApps.com"
/>
```

## Best Practices
- Use for app or page footers
- Organize links and info into sections

## Copyright
(c) 2025 QwickApps.com. All rights reserved.
