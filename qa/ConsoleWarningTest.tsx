/**
 * Quick test to verify console warning functionality
 */

import React from 'react';
import { PaletteProvider, PaletteSwitcher } from '../src/index';
import { Typography, Box } from '@mui/material';

export default function ConsoleWarningTest() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Console Warning Test
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Open your browser's developer console to see the warning message for auto-generated storage keys.
      </Typography>
      
      {/* This should trigger the console warning */}
      <PaletteProvider>
        <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>
            Auto Key (Default - triggers warning)
          </Typography>
          <PaletteSwitcher />
        </Box>
      </PaletteProvider>
    </Box>
  );
}
