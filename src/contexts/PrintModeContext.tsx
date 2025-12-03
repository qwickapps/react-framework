/**
 * PrintModeContext - App-level print state management
 * 
 * Handles print mode state transitions at the application level,
 * allowing pages to simply consume and react to print state changes.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React, { createContext, useContext, useCallback, useReducer, useEffect } from 'react';
import { useQwickApp } from './QwickAppContext';
import { useTheme } from './ThemeContext';
import { usePalette } from './PaletteContext';
import { PrintConfigSchema } from '../schemas/PrintConfigSchema';

export type PrintModeStateType = 
  | 'normal'
  | 'applying_print_config'
  | 'entering_print_mode'
  | 'view_loading'
  | 'config_applied'
  | 'print_mode'
  | 'exiting_print_mode'
  | 'restoring_config';

interface PrintModeState {
  printModeState: PrintModeStateType;
  printConfig: PrintConfigSchema;
  originalTheme: string | null;
  originalPalette: string | null;
}

type PrintModeAction = 
  | { type: 'TRIGGER_PRINT'; config?: Partial<PrintConfigSchema> }
  | { type: 'APPLY_CONFIG' }
  | { type: 'ENTER_PRINT_MODE' }
  | { type: 'VIEW_LOADING' }
  | { type: 'VIEW_READY' }
  | { type: 'CONFIG_APPLIED' }
  | { type: 'EXIT_PRINT_MODE' }
  | { type: 'RESTORE_CONFIG' }
  | { type: 'RETURN_TO_NORMAL' }
  | { type: 'SET_ORIGINAL_THEME'; theme: string }
  | { type: 'SET_ORIGINAL_PALETTE'; palette: string };

const DEFAULT_PRINT_CONFIG: PrintConfigSchema = {
  theme: 'light',
  palette: undefined,
  hideScaffolding: true,
  hideInteractiveElements: false,
  optimizeForMonochrome: false,
  showPrintDate: true,
  pageMargins: '12mm',
};

function printModeReducer(state: PrintModeState, action: PrintModeAction): PrintModeState {
  
  switch (action.type) {
    case 'TRIGGER_PRINT':
      if (state.printModeState === 'normal') {
        return {
          ...state,
          printModeState: 'applying_print_config',
          printConfig: action.config ? { ...DEFAULT_PRINT_CONFIG, ...action.config } : DEFAULT_PRINT_CONFIG,
        };
      }
      return state;

    case 'APPLY_CONFIG':
      if (state.printModeState === 'applying_print_config') {
        return { ...state, printModeState: 'entering_print_mode' };
      }
      return state;

    case 'VIEW_LOADING':
      // Can transition to view_loading from entering_print_mode
      // Ignore if already in view_loading or other states
      if (state.printModeState === 'entering_print_mode') {
        return { ...state, printModeState: 'view_loading' };
      }
      return state;

    case 'VIEW_READY':
      // Can transition to config_applied from view_loading, then wait for theme/palette changes
      if (state.printModeState === 'view_loading') {
        return { ...state, printModeState: 'config_applied' };
      } else if (state.printModeState === 'exiting_print_mode') {
        return { ...state, printModeState: 'restoring_config' };
      }
      return state;

    case 'CONFIG_APPLIED':
      if (state.printModeState === 'config_applied') {
        return { ...state, printModeState: 'print_mode' };
      }
      return state;

    case 'EXIT_PRINT_MODE':
      // Exit from any print-related state
      if (state.printModeState !== 'normal' && state.printModeState !== 'exiting_print_mode' && state.printModeState !== 'restoring_config') {
        return { ...state, printModeState: 'exiting_print_mode' };
      }
      return state;

    case 'RESTORE_CONFIG':
      if (state.printModeState === 'restoring_config') {
        return { ...state, printModeState: 'normal' };
      }
      return state;

    case 'SET_ORIGINAL_THEME':
      return { ...state, originalTheme: action.theme };

    case 'SET_ORIGINAL_PALETTE':
      return { ...state, originalPalette: action.palette };

    default:
      return state;
  }
}

interface PrintModeContextValue {
  // State
  printModeState: PrintModeStateType;
  isPrintMode: boolean;
  printConfig: PrintConfigSchema;
  
  // Actions
  triggerPrint: (config?: Partial<PrintConfigSchema>) => void;
  exitPrintMode: () => void;
  onViewLoading: () => void;
  onViewReady: () => void;
}

const PrintModeContext = createContext<PrintModeContextValue | null>(null);

export const usePrintMode = (): PrintModeContextValue => {
  const context = useContext(PrintModeContext);
  if (!context) {
    throw new Error('usePrintMode must be used within a PrintModeProvider');
  }
  return context;
};

interface PrintModeProviderProps {
  children: React.ReactNode;
}

export const PrintModeProvider: React.FC<PrintModeProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(printModeReducer, {
    printModeState: 'normal',
    printConfig: DEFAULT_PRINT_CONFIG,
    originalTheme: null,
    originalPalette: null,
  });

  const { updateConfig: updateQwickAppConfig } = useQwickApp();
  const { setCurrentTheme, getCurrentTheme } = useTheme();
  const { setCurrentPalette, getCurrentPalette } = usePalette();

  // Computed derived state - only true when actually in print view
  const isPrintMode = state.printModeState === 'entering_print_mode' || 
                     state.printModeState === 'view_loading' ||
                     state.printModeState === 'config_applied' ||
                     state.printModeState === 'print_mode';

  // Actions
  const triggerPrint = useCallback((config?: Partial<PrintConfigSchema>) => {
    dispatch({ type: 'TRIGGER_PRINT', config });
  }, []);

  const exitPrintMode = useCallback(() => {
    dispatch({ type: 'EXIT_PRINT_MODE' });
  }, []);

  const onViewLoading = useCallback(() => {
    dispatch({ type: 'VIEW_LOADING' });
  }, []);

  const onViewReady = useCallback(() => {
    dispatch({ type: 'VIEW_READY' });
  }, []);

  // Effect to handle configuration application
  useEffect(() => {
    if (state.printModeState === 'applying_print_config') {
      // Apply print configuration
      if (state.printConfig.hideScaffolding) {
        updateQwickAppConfig({ enableScaffolding: false });
      }
      
      if (state.printConfig.theme) {
        dispatch({ type: 'SET_ORIGINAL_THEME', theme: getCurrentTheme() });
        setCurrentTheme(state.printConfig.theme as 'light' | 'dark');
      }
      
      if (state.printConfig.palette) {
        dispatch({ type: 'SET_ORIGINAL_PALETTE', palette: getCurrentPalette() });
        setCurrentPalette(state.printConfig.palette);
      }

      if (typeof document !== 'undefined') {
        document.body.classList.add('print-mode');
        
        if (state.printConfig.optimizeForMonochrome) {
          document.body.classList.add('print-monochrome');
        }
        
        if (state.printConfig.hideInteractiveElements) {
          document.body.classList.add('print-hide-interactive');
        }

        // Apply custom page margins if specified
        if (state.printConfig.pageMargins && state.printConfig.pageMargins !== '12mm') {
          let printStyleElement = document.querySelector('#qwick-print-margins');
          if (!printStyleElement) {
            printStyleElement = document.createElement('style');
            printStyleElement.id = 'qwick-print-margins';
            document.head.appendChild(printStyleElement);
          }
          printStyleElement.textContent = `
            @media print {
              @page {
                margin: ${state.printConfig.pageMargins};
              }
            }
          `;
        }
      }

      // Transition to entering print mode
      dispatch({ type: 'APPLY_CONFIG' });
    }
  }, [state.printModeState, state.printConfig, updateQwickAppConfig, getCurrentTheme, getCurrentPalette, setCurrentTheme, setCurrentPalette]);

  // Effect to detect when theme/palette changes are complete
  useEffect(() => {
    if (state.printModeState === 'config_applied') {
      // Wait one render cycle to ensure theme/palette changes are applied
      const rafId = requestAnimationFrame(() => {
        dispatch({ type: 'CONFIG_APPLIED' });
      });
      
      return () => cancelAnimationFrame(rafId);
    }
  }, [state.printModeState]);

  // Effect to transition from exiting_print_mode to restoring_config
  useEffect(() => {
    if (state.printModeState === 'exiting_print_mode') {
      // Use VIEW_READY action to transition to restoring_config
      dispatch({ type: 'VIEW_READY' });
    }
  }, [state.printModeState]);

  // Effect to handle configuration restoration  
  useEffect(() => {
    if (state.printModeState === 'restoring_config') {
      // Restore QwickApp configuration
      updateQwickAppConfig({ enableScaffolding: true });
      
      // Restore original theme and palette
      if (state.originalTheme) {
        setCurrentTheme(state.originalTheme as 'light' | 'dark');
      }
      
      if (state.originalPalette) {
        setCurrentPalette(state.originalPalette);
      }

      // Remove print mode classes and custom styles
      if (typeof document !== 'undefined') {
        document.body.classList.remove('print-mode', 'print-monochrome', 'print-hide-interactive');
        
        // Remove custom margins style
        const printStyleElement = document.querySelector('#qwick-print-margins');
        if (printStyleElement) {
          printStyleElement.remove();
        }
      }

      // Return to normal
      dispatch({ type: 'RESTORE_CONFIG' });
    }
  }, [state.printModeState, state.originalTheme, state.originalPalette, updateQwickAppConfig, setCurrentTheme, setCurrentPalette]);

  // Effect to handle print dialog
  useEffect(() => {
    if (state.printModeState === 'print_mode') {
      if (typeof window !== 'undefined') {
        window.print();
      }
    }
  }, [state.printModeState]);

  // Effect to handle browser print events
  useEffect(() => {
    const handleBeforePrint = () => {
      triggerPrint();
    };

    const handleAfterPrint = () => {
      exitPrintMode();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('beforeprint', handleBeforePrint);
      window.addEventListener('afterprint', handleAfterPrint);

      return () => {
        window.removeEventListener('beforeprint', handleBeforePrint);
        window.removeEventListener('afterprint', handleAfterPrint);
      };
    }
  }, [exitPrintMode, triggerPrint]);

  const contextValue: PrintModeContextValue = {
    printModeState: state.printModeState,
    isPrintMode,
    printConfig: state.printConfig,
    triggerPrint,
    exitPrintMode,
    onViewLoading,
    onViewReady,
  };

  return (
    <PrintModeContext.Provider value={contextValue}>
      {children}
    </PrintModeContext.Provider>
  );
};