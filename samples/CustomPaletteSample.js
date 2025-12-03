/**
 * Custom Palette Creation Sample
 * Demonstrates how to create and integrate custom color palettes
 */

import React, { useState } from 'react';
import {
  ThemeProvider,
  PaletteProvider,
  Logo,
  ThemeSwitcher,
  useTheme,
  usePalette,
  setCSSVariable
} from '@qwickapps/react-framework';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  Alert
} from '@mui/material';

// Custom Palette Creator Component
function PaletteCreator() {
  const [customColors, setCustomColors] = useState({
    primary: '#6366f1',
    secondary: '#8b5cf6',
    accent: '#10b981',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#1f2937'
  });

  const applyCustomPalette = () => {
    // Apply custom colors as CSS variables
    Object.entries(customColors).forEach(([key, value]) => {
      setCSSVariable(`--custom-${key}`, value);
    });
    
    // Set document attribute to use custom palette
    document.documentElement.setAttribute('data-palette', 'custom');
    
    alert('Custom palette applied! This would typically trigger a palette change event.');
  };

  const handleColorChange = (colorKey, value) => {
    setCustomColors(prev => ({
      ...prev,
      [colorKey]: value
    }));
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        Custom Palette Creator
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        This demonstrates how to create custom palettes. In production, custom palettes 
        would be defined in CSS files and integrated with the palette system.
      </Alert>

      <Grid container spacing={2}>
        {Object.entries(customColors).map(([key, value]) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={key}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                type="color"
                value={value}
                onChange={(e) => handleColorChange(key, e.target.value)}
                size="small"
                sx={{ flexGrow: 1 }}
              />
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: value,
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 1
                }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>

      <Button
        variant="contained"
        onClick={applyCustomPalette}
        sx={{ mt: 2 }}
      >
        Apply Custom Palette
      </Button>
    </Paper>
  );
}

// Palette Guide Component
function PaletteGuide() {
  const paletteSteps = [
    {
      step: 1,
      title: 'Create CSS File',
      description: 'Create a new CSS file (e.g., palette-custom.css) in the palettes directory'
    },
    {
      step: 2,
      title: 'Define Variables',
      description: 'Define CSS custom properties for both light and dark modes'
    },
    {
      step: 3,
      title: 'Add to Index',
      description: 'Import your palette in the palettes/index.css file'
    },
    {
      step: 4,
      title: 'Update Utils',
      description: 'Add your palette to the AVAILABLE_PALETTES array in paletteUtils.js'
    }
  ];

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        How to Add Custom Palettes
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        {paletteSteps.map((step) => (
          <Card key={step.step} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" color="primary">
                Step {step.step}: {step.title}
              </Typography>
              <Typography variant="body2">
                {step.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Alert severity="success">
        <Typography variant="body2">
          <strong>Pro Tip:</strong> Use the Color Palette Creator above to experiment with colors, 
          then copy the hex values to your CSS file.
        </Typography>
      </Alert>
    </Paper>
  );
}

// CSS Template Display
function CSSTemplate() {
  const cssTemplate = `/* Custom Palette - palette-custom.css */
:root[data-palette="custom"] {
  /* Light mode colors */
  --palette-primary: #6366f1;
  --palette-on-primary: #ffffff;
  --palette-secondary: #8b5cf6;
  --palette-on-secondary: #ffffff;
  --palette-accent: #10b981;
  --palette-surface-variant: #e2e8f0;
  
  /* Header colors */
  --palette-header-bg: #6366f1;
  --palette-header-text: #ffffff;
}

:root[data-palette="custom"][data-theme="dark"] {
  /* Dark mode colors */
  --palette-primary: #818cf8;
  --palette-on-primary: #1e1b4b;
  --palette-secondary: #a78bfa;
  --palette-on-secondary: #2d1b69;
  --palette-accent: #34d399;
  --palette-surface-variant: #374151;
  
  /* Header colors */
  --palette-header-bg: #4f46e5;
  --palette-header-text: #f8fafc;
}`;

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        CSS Template
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Copy this template to create your custom palette CSS file:
      </Typography>
      <Box
        component="pre"
        sx={{
          backgroundColor: 'var(--theme-surface)',
          p: 2,
          borderRadius: 1,
          overflow: 'auto',
          fontSize: '0.875rem',
          border: 1,
          borderColor: 'divider'
        }}
      >
        <code>{cssTemplate}</code>
      </Box>
    </Paper>
  );
}

function CustomPaletteDemo() {
  const { currentPalette } = usePalette();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <AppBar position="static" sx={{ mb: 4, borderRadius: 2 }}>
        <Toolbar>
          <Logo name="Palette Demo" variant="on-primary" size="small" />
          <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
            Custom Palette Guide
          </Typography>
          <ThemeSwitcher />
        </Toolbar>
      </AppBar>

      <Typography variant="h4" gutterBottom>
        Creating Custom Color Palettes
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 4 }}>
        Current Palette: <strong>{currentPalette}</strong>
      </Typography>

      <PaletteCreator />
      <PaletteGuide />
      <CSSTemplate />
    </Container>
  );
}

export default function CustomPaletteSample() {
  return (
    <ThemeProvider storageKey={false}>
      <PaletteProvider storageKey={false}>
        <CustomPaletteDemo />
      </PaletteProvider>
    </ThemeProvider>
  );
}
