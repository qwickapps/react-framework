/**
 * Dimensions Context - Responsive design tokens for typography, spacing, and sizing
 * 
 * Provides consistent design tokens that adapt to screen size and user preferences.
 * Works alongside MUI theme system for comprehensive responsive design.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface DimensionTokens {
  // Border radius
  borderRadius: {
    small: number;
    medium: number;
    large: number;
  };
  
  // Typography scale (multipliers for MUI typography)
  typography: {
    scaleMultiplier: number;
    lineHeightMultiplier: number;
  };
  
  // Spacing scale (multipliers for MUI spacing)
  spacing: {
    scaleMultiplier: number;
  };
  
  // Component sizing
  component: {
    buttonHeight: number;
    inputHeight: number;
    iconSize: number;
  };
}

export interface DimensionsContextValue {
  tokens: DimensionTokens;
  screenSize: 'mobile' | 'tablet' | 'desktop';
  isCompact: boolean;
  setCompactMode: (compact: boolean) => void;
}

const DimensionsContext = createContext<DimensionsContextValue | undefined>(undefined);

// Default dimension tokens
const getDefaultTokens = (screenSize: 'mobile' | 'tablet' | 'desktop', isCompact: boolean): DimensionTokens => {
  const compactMultiplier = isCompact ? 0.9 : 1.0;
  
  let baseTokens: DimensionTokens;
  
  switch (screenSize) {
    case 'mobile':
      baseTokens = {
        borderRadius: { small: 6, medium: 10, large: 14 },
        typography: { scaleMultiplier: 0.9, lineHeightMultiplier: 1.0 },
        spacing: { scaleMultiplier: 0.8 },
        component: { buttonHeight: 44, inputHeight: 44, iconSize: 20 },
      };
      break;
    case 'tablet':
      baseTokens = {
        borderRadius: { small: 8, medium: 12, large: 16 },
        typography: { scaleMultiplier: 0.95, lineHeightMultiplier: 1.0 },
        spacing: { scaleMultiplier: 0.9 },
        component: { buttonHeight: 40, inputHeight: 40, iconSize: 22 },
      };
      break;
    case 'desktop':
    default:
      baseTokens = {
        borderRadius: { small: 8, medium: 12, large: 16 },
        typography: { scaleMultiplier: 1.0, lineHeightMultiplier: 1.0 },
        spacing: { scaleMultiplier: 1.0 },
        component: { buttonHeight: 36, inputHeight: 36, iconSize: 24 },
      };
      break;
  }
  
  // Apply compact mode multiplier
  return {
    ...baseTokens,
    typography: {
      scaleMultiplier: baseTokens.typography.scaleMultiplier * compactMultiplier,
      lineHeightMultiplier: baseTokens.typography.lineHeightMultiplier * compactMultiplier,
    },
    spacing: {
      scaleMultiplier: baseTokens.spacing.scaleMultiplier * compactMultiplier,
    },
    component: {
      buttonHeight: Math.round(baseTokens.component.buttonHeight * compactMultiplier),
      inputHeight: Math.round(baseTokens.component.inputHeight * compactMultiplier),
      iconSize: Math.round(baseTokens.component.iconSize * compactMultiplier),
    },
  };
};

export interface DimensionsProviderProps {
  children: React.ReactNode;
  defaultCompactMode?: boolean;
}

export const DimensionsProvider: React.FC<DimensionsProviderProps> = ({
  children,
  defaultCompactMode = false,
}) => {
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isCompact, setIsCompact] = useState(defaultCompactMode);

  // Detect screen size
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize('mobile');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  const tokens = getDefaultTokens(screenSize, isCompact);

  const contextValue: DimensionsContextValue = {
    tokens,
    screenSize,
    isCompact,
    setCompactMode: setIsCompact,
  };

  return (
    <DimensionsContext.Provider value={contextValue}>
      {children}
    </DimensionsContext.Provider>
  );
};

export const useDimensions = (): DimensionsContextValue => {
  const context = useContext(DimensionsContext);
  if (context === undefined) {
    throw new Error('useDimensions must be used within a DimensionsProvider');
  }
  return context;
};

export default DimensionsProvider;