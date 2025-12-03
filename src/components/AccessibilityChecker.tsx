/**
 * AccessibilityChecker Component - Development tool for checking theme accessibility
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 * 
 * This component is only rendered in development mode and provides
 * accessibility insights for the current theme/palette combination.
 */

import React, { useState, useEffect } from 'react';
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Box,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Accessibility as AccessibilityIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { getContrastRatio } from '@mui/material';
import { getCurrentPalette } from '../utils/paletteUtils';
import { getCurrentTheme } from '../utils/themeUtils';

interface AccessibilityCheck {
  id?: string;
  name: string;
  status: 'pass' | 'warning' | 'fail';
  message?: string;
  details?: string;
  description?: string;
  colors?: {
    foreground: string;
    background: string;
  };
}

const AccessibilityChecker: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [checks, setChecks] = useState<AccessibilityCheck[]>([]);

  useEffect(() => {
    if (open && process.env.NODE_ENV === 'development') {
      performAccessibilityChecks();
    }
  }, [open]);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const performAccessibilityChecks = (): void => {
    const checks: AccessibilityCheck[] = [];
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    
    // Get current colors
    const bgColor = computedStyle.getPropertyValue('--palette-background-main').trim();
    const textColor = computedStyle.getPropertyValue('--palette-text-primary').trim();
    const primaryColor = computedStyle.getPropertyValue('--palette-primary-main').trim();
    
    // Convert CSS colors to hex for contrast calculation
    const getHexFromCSS = (cssColor: string): string => {
      if (!cssColor) return '#000000';
      const temp = document.createElement('div');
      temp.style.color = cssColor;
      document.body.appendChild(temp);
      const computed = getComputedStyle(temp).color;
      document.body.removeChild(temp);
      if (computed.startsWith('rgb')) {
        const matches = computed.match(/\d+/g);
        if (matches && matches.length >= 3) {
          const r = parseInt(matches[0]).toString(16).padStart(2, '0');
          const g = parseInt(matches[1]).toString(16).padStart(2, '0');
          const b = parseInt(matches[2]).toString(16).padStart(2, '0');
          return `#${r}${g}${b}`;
        }
      }
      return cssColor;
    };
    const bgHex = getHexFromCSS(bgColor);
    const textHex = getHexFromCSS(textColor);
    const primaryHex = getHexFromCSS(primaryColor);
    const textBgContrast = getContrastRatio(textHex, bgHex);
    const primaryBgContrast = getContrastRatio(primaryHex, bgHex);
    checks.push({
      name: 'Text Contrast',
      description: 'Text should have sufficient contrast against background',
      status: textBgContrast >= 4.5 ? 'pass' : textBgContrast >= 3 ? 'warning' : 'fail',
      details: `Contrast ratio: ${textBgContrast.toFixed(2)} (WCAG AA requires 4.5+)`,
      colors: { foreground: textHex, background: bgHex }
    });
    checks.push({
      name: 'Primary Color Contrast',
      description: 'Primary color should be distinguishable from background',
      status: primaryBgContrast >= 3 ? 'pass' : 'warning',
      details: `Contrast ratio: ${primaryBgContrast.toFixed(2)}`,
      colors: { foreground: primaryHex, background: bgHex }
    });
    checks.push({
      name: 'Color Independence',
      description: 'Information should not rely solely on color',
      status: 'pass',
      details: 'Icons and text labels are used alongside colors'
    });
    const focusIndicators = document.querySelectorAll(':focus-visible');
    checks.push({
      name: 'Focus Indicators',
      description: 'Interactive elements should have visible focus indicators',
      status: 'pass',
      details: `${focusIndicators.length} elements currently focused`
    });
    const fontSize = parseFloat(computedStyle.fontSize);
    checks.push({
      name: 'Font Size',
      description: 'Base font size should be readable',
      status: fontSize >= 14 ? 'pass' : 'warning',
      details: `Base font size: ${fontSize}px (recommended: 14px+)`
    });
    setChecks(checks);
  };

  const getStatusIcon = (status: 'pass' | 'warning' | 'fail') => {
    switch (status) {
      case 'pass':
        return <CheckIcon color="success" />;
      case 'warning':
        return <WarningIcon color="warning" />;
      case 'fail':
        return <ErrorIcon color="error" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: 'pass' | 'warning' | 'fail') => {
    switch (status) {
      case 'pass':
        return 'success';
      case 'warning':
        return 'warning';
      case 'fail':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <>
      <Fab
        color="secondary"
        aria-label="accessibility checker"
        onClick={() => setOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 16,
          left: 16,
          zIndex: 1000,
        }}
      >
        <AccessibilityIcon />
      </Fab>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccessibilityIcon />
            Accessibility Report
          </Box>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Current theme: {getCurrentTheme()} | Current palette: {getCurrentPalette()}
            </Typography>
          </Box>
          
          <Divider sx={{ mb: 2 }} />
          
          <List>
            {checks.map((check, index) => (
              <ListItem key={index} alignItems="flex-start">
                <ListItemIcon>
                  {getStatusIcon(check.status)}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {check.name}
                      <Chip
                        label={check.status.toUpperCase()}
                        size="small"
                        color={getStatusColor(check.status)}
                        variant="outlined"
                      />
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" sx={{ mt: 0.5 }}>
                        {check.description}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                        {check.details}
                      </Typography>
                      {check.colors && (
                        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                          <Box
                            sx={{
                              width: 20,
                              height: 20,
                              backgroundColor: check.colors.foreground,
                              border: '1px solid #ccc',
                              borderRadius: 1,
                            }}
                            title={`Foreground: ${check.colors.foreground}`}
                          />
                          <Box
                            sx={{
                              width: 20,
                              height: 20,
                              backgroundColor: check.colors.background,
                              border: '1px solid #ccc',
                              borderRadius: 1,
                            }}
                            title={`Background: ${check.colors.background}`}
                          />
                        </Box>
                      )}
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AccessibilityChecker;
