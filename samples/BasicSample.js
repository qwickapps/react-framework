/**
 * Basic Theme System Sample
 * Demonstrates core theme and palette switching functionality
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
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  AppBar,
  Toolbar
} from '@mui/material';

function ThemeDemo() {
  const { themeMode, actualThemeMode } = useTheme();
  const { currentPalette } = usePalette();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header */}
      <AppBar position="static" sx={{ mb: 4, borderRadius: 2 }}>
        <Toolbar>
          <Logo name="QwickApps" variant="on-primary" size="small" />
          <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
            QwickApps Theme Demo
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <ThemeSwitcher />
            <PaletteSwitcher />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Theme Info */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Current Theme Status
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Theme Mode:</strong> {themeMode}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Actual Theme:</strong> {actualThemeMode}
        </Typography>
        <Typography variant="body1">
          <strong>Color Palette:</strong> {currentPalette}
        </Typography>
      </Paper>

      {/* Color Demonstration */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Color Palette Preview
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
          <Card sx={{ backgroundColor: 'var(--palette-primary)', color: 'var(--palette-on-primary)' }}>
            <CardContent>
              <Typography variant="h6">Primary</Typography>
              <Typography variant="body2">Main brand color</Typography>
            </CardContent>
          </Card>
          
          <Card sx={{ backgroundColor: 'var(--palette-secondary)', color: 'var(--palette-on-secondary)' }}>
            <CardContent>
              <Typography variant="h6">Secondary</Typography>
              <Typography variant="body2">Supporting color</Typography>
            </CardContent>
          </Card>
          
          <Card sx={{ backgroundColor: 'var(--palette-accent)', color: 'var(--theme-text)' }}>
            <CardContent>
              <Typography variant="h6">Accent</Typography>
              <Typography variant="body2">Highlight color</Typography>
            </CardContent>
          </Card>
        </Box>
      </Paper>

      {/* Logo Variations */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Logo Variations
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'center' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle2" gutterBottom>Default</Typography>
            <Logo name="QwickApps" />
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle2" gutterBottom>Brain Quis</Typography>
            <Logo name="Brain Quis" />
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle2" gutterBottom>Single Word</Typography>
            <Logo name="Brand" showPulse={false} />
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle2" gutterBottom>Multi Word</Typography>
            <Logo name="Amaizing Raising Stars" pulseShape="star" />
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle2" gutterBottom>Heart Pulse</Typography>
            <Logo name="Love Code" pulseShape="heart" size="small" height={32} />
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle2" gutterBottom>Square Pulse</Typography>
            <Logo name="Block Chain" pulseShape="square" size="small" height={32} />
          </Box>
        </Box>
      </Paper>

      {/* Interactive Elements */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Interactive Elements
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button variant="contained" color="primary">
            Primary Button
          </Button>
          <Button variant="outlined" color="secondary">
            Secondary Button
          </Button>
          <Button variant="text">
            Text Button
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default function BasicSample() {
  return (
    <ThemeProvider storageKey="com.qwickapps.samples.basic.theme">
      <PaletteProvider storageKey="com.qwickapps.samples.basic.palette">
        <ThemeDemo />
      </PaletteProvider>
    </ThemeProvider>
  );
}
