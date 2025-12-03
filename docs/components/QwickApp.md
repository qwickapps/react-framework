# QwickApp

**Location:** `src/components/QwickApp.tsx`

## Overview
QwickApp is the main application wrapper for QwickApps-based apps. It provides theme management, app context, optional scaffolding, and routing support. It eliminates the need to manually set up provider hierarchies.

## Features
- Theme system and app context
- Optional scaffolding (navigation, layout)
- Routing support (router passed as prop)
- Footer and custom content support
- Separation of auth logic (handled by AuthProvider)

## Props
- `children`: ReactNode – Child components to render
- `className`: string – CSS class for root element
- `style`: React.CSSProperties – Inline styles
- `footerContent`: ReactNode – Additional footer content
- `defaultTheme`: ThemeMode – Theme preference (light/dark/auto)
- `defaultPalette`: Palette – Default color palette
- `appName`: string – Application name
- `logo`: ReactNode – Logo component
- `appId`: string – Application ID
- `enableScaffolding`: boolean – Enable layout scaffolding
- `navigationItems`: array – Navigation items

## Usage
```tsx
import { BrowserRouter } from 'react-router-dom';
import { QwickApp, AuthProvider } from '@qwickapps/react-framework';

function App() {
  return (
    <QwickApp appName="My App" appId="my.app">
      <AuthProvider router={<BrowserRouter />} user={user}>
        <Route path="/" component={HomePage} />
        <Route path="/admin" component={AdminPage} requiresRole="admin" />
      </AuthProvider>
    </QwickApp>
  );
}
```

## Best Practices
- Pass router as a prop for routing flexibility
- Use AuthProvider for authentication logic
- Use QwickApp for top-level app context and theming

## Copyright
(c) 2025 QwickApps.com. All rights reserved.
