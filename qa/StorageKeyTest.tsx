/**
 * Storage Key Strategy Test Component
 * Demonstrates the three different storage strategies
 */

import React from 'react';
import { PaletteProvider, PaletteSwitcher, usePalette } from '@qwickapps/react-framework';
import { Box, Typography, Paper } from '@mui/material';

function PaletteInfo({ 
  title, 
  appId, 
  description 
}: { 
  title: string; 
  appId: string | true | false;
  description: string;
}) {
  const { currentPalette } = usePalette();
  
  // Helper to show what the actual storage key would be
  const getActualKey = () => {
    if (appId === false) return null;
    if (appId === true || appId === undefined) {
      return 'qwickapps-react-framework-palette';
    }
    return `${appId}.palette`;
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
      <Typography variant="body2" sx={{ mb: 2 }}>
        Current Palette: <strong>{currentPalette}</strong>
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        localStorage: <code>{actualKey ? (localStorage.getItem(actualKey) || 'null') : 'disabled'}</code>
      </Typography>
      <PaletteSwitcher />
    </Paper>
  );
}

export default function StorageKeyTest() {
  return (
    <Box sx={{ p: 3, maxWidth: 900, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Storage Key Strategy Test
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 3 }}>
        This test demonstrates the three storage strategies. Change palettes in each section 
        and notice the different behaviors. Reload the page to see persistence differences.
      </Typography>

      <PaletteProvider appId="com.test.explicit-key">
        <PaletteInfo 
          title="1. Explicit App ID Strategy" 
          appId="com.test.explicit-key"
          description="Uses appId to generate storage key 'com.test.explicit-key.palette'. Recommended for production apps." 
        />
      </PaletteProvider>

      <PaletteProvider appId={true}>
        <PaletteInfo 
          title="2. Default Key Strategy" 
          appId={true}
          description="Uses default key 'qwickapps-react-framework-palette'. Good for development/demos. Shows console warning." 
        />
      </PaletteProvider>

      <PaletteProvider appId={false}>
        <PaletteInfo 
          title="3. No Persistence Strategy" 
          appId={false}
          description="Session-only storage, no localStorage persistence. Settings reset on page reload." 
        />
      </PaletteProvider>

      <Paper sx={{ p: 2, mt: 3, backgroundColor: 'var(--palette-surface-variant)' }}>
        <Typography variant="h6" gutterBottom>
          Test Instructions:
        </Typography>
        <Typography variant="body2" component="div">
          <ol style={{ paddingLeft: '20px' }}>
            <li>Select different palettes in each section above</li>
            <li>Notice the three different behaviors: explicit app ID, default key with warning, and no persistence</li>
            <li>Section 1 uses custom appId, Section 2 uses default key with warning, Section 3 has no persistence</li>
            <li>Reload the page - Sections 1 & 2 remember their selections, Section 3 resets</li>
            <li>Open browser DevTools → Application → Local Storage to see the different keys</li>
            <li>Check the console to see the warning for the default key usage</li>
          </ol>
        </Typography>
      </Paper>
    </Box>
  );
}
