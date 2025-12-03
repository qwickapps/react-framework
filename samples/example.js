/**
 * QwickApps Theme System - Example Usage
 * Complete example showing all components and features
 */

import React from 'react';
import { 
  ThemeProvider, 
  PaletteProvider, 
  Logo,
  ThemeSwitcher,
  PaletteSwitcher,
  useTheme,
  usePalette
} from '@qwickapps/react-framework';
import { AppBar, Toolbar, Box, Typography, Container } from '@mui/material';

// Example component using the theme system
function ExampleApp() {
  const { theme } = useTheme();
  const { palette } = usePalette();

  return (
    <Container>
      <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar>
          <Logo variant="on-primary" size="small" />
          <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
            QwickApps Demo
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <ThemeSwitcher />
            <PaletteSwitcher />
          </Box>
        </Toolbar>
      </AppBar>
      
      <Typography variant="h4" gutterBottom>
        Welcome to QwickApps Theme System
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 2 }}>
        Current theme: <strong>{theme}</strong>
      </Typography>
      
      <Typography variant="body1">
        Current palette: <strong>{palette}</strong>
      </Typography>
    </Container>
  );
}

// Main app with providers
function App() {
  return (
    <ThemeProvider>
      <PaletteProvider>
        <ExampleApp />
      </PaletteProvider>
    </ThemeProvider>
  );
}

export default App;
