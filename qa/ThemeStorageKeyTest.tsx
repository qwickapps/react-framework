/**
 * Theme Storage Key Strategy Test Component
 * Demonstrates the three different storage strategies for ThemeProvider
 */

import React from 'react';
import { ThemeProvider, ThemeSwitcher, useTheme } from '@qwickapps/react-framework';
import { Box, Typography, Paper } from '@mui/material';

function ThemeInfo({ 
  title, 
  appId, 
  description 
}: { 
  title: string; 
  appId: string | true | false;
  description: string;
}) {
  const { currentTheme, actualThemeMode } = useTheme();
  
  // Helper to show what the actual storage key would be
  const getActualKey = () => {
    if (appId === false) return null;
    if (appId === true) {
      return 'qwickapps-react-framework-theme';
    }
    return `${appId}.theme`;
  };
  
  const actualKey = getActualKey();
  
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
        {description}
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        Config: <code>{String(appId)}</code>
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        Actual Key: <code>{actualKey || 'none (no persistence)'}</code>
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        Theme Mode: <strong>{currentTheme}</strong>
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Actual Theme: <strong>{actualThemeMode}</strong>
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        localStorage: <code>{actualKey ? (localStorage.getItem(actualKey) || 'null') : 'disabled'}</code>
      </Typography>
      <ThemeSwitcher />
    </Paper>
  );
}

export default function ThemeStorageKeyTest() {
  return (
    <Box sx={{ p: 3, maxWidth: 900, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Theme Storage Key Strategy Test
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 3 }}>
        This test demonstrates the three storage strategies for ThemeProvider. Change themes in each section 
        and notice the different behaviors. Reload the page to see persistence differences.
      </Typography>

      <ThemeProvider appId="com.test.explicit-theme">
        <ThemeInfo 
          title="1. Explicit App ID Strategy" 
          appId="com.test.explicit-theme"
          description="Uses appId to generate storage key 'com.test.explicit-theme.theme'. Recommended for production apps." 
        />
      </ThemeProvider>

      <ThemeProvider>
        <ThemeInfo 
          title="2. Default Key Strategy" 
          appId={true}
          description="Uses default key 'qwickapps-react-framework-theme'. Good for development/demos. Shows console warning." 
        />
      </ThemeProvider>

      <ThemeProvider appId={false}>
        <ThemeInfo 
          title="3. No Persistence Strategy" 
          appId={false}
          description="Disables localStorage persistence. Theme resets to 'system' on page reload." 
        />
      </ThemeProvider>

      <Paper sx={{ p: 2, mt: 3, backgroundColor: 'var(--palette-surface-variant)' }}>
        <Typography variant="h6" gutterBottom>
          Test Instructions:
        </Typography>
        <Typography variant="body2" component="div">
          <ol style={{ paddingLeft: '20px' }}>
            <li>Select different themes in each section above</li>
            <li>Notice that sections 1 & 2 save to localStorage with different keys, section 3 doesn't persist</li>
            <li>Section 1 uses custom appId, Section 2 uses default key with warning, Section 3 has no persistence</li>
            <li>Reload the page - sections 1 & 2 remember their selections, section 3 resets to system</li>
            <li>Open browser DevTools → Application → Local Storage to see the different keys</li>
            <li>Check the console to see the warning for the default key usage</li>
            <li>Try switching your OS theme preference to see "system" mode behavior</li>
          </ol>
        </Typography>
      </Paper>
    </Box>
  );
}
