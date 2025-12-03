/**
 * usePrintMode hook - Simple wrapper around PrintModeContext
 * 
 * @deprecated Use usePrintMode from PrintModeContext directly
 * This file maintained for backward compatibility during migration
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { usePrintMode as usePrintModeContext } from '../contexts/PrintModeContext';
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

export interface PrintModeState {
  /** Whether the app is currently in print mode */
  isPrintMode: boolean;
  /** Print configuration to apply */
  printConfig: PrintConfigSchema;
  /** Current state of the print mode state machine */
  printModeState: PrintModeStateType;
  /** Manually enter print mode */
  enterPrintMode: (config?: Partial<PrintConfigSchema>) => void;
  /** Exit print mode */
  exitPrintMode: () => void;
  /** Toggle print mode */
  togglePrintMode: (config?: Partial<PrintConfigSchema>) => void;
  /** Enter print mode and trigger print dialog */
  triggerPrint: (config?: Partial<PrintConfigSchema>) => void;
  /** Callback to signal current view is loading */
  onViewLoading: () => void;
  /** Callback to signal current view is ready */
  onViewReady: () => void;
}

/**
 * Hook to access print mode state from app-level context
 *
 * @param _initialConfig - Initial print configuration (ignored, use context provider config)
 * @returns Print mode state and controls
 */
export function usePrintMode(): PrintModeState {
  const context = usePrintModeContext();
  
  // Map context interface to legacy interface
  return {
    isPrintMode: context.isPrintMode,
    printConfig: context.printConfig,
    printModeState: context.printModeState,
    enterPrintMode: context.triggerPrint,
    exitPrintMode: context.exitPrintMode,
    togglePrintMode: (config?: Partial<PrintConfigSchema>) => {
      if (context.isPrintMode) {
        context.exitPrintMode();
      } else {
        context.triggerPrint(config);
      }
    },
    triggerPrint: context.triggerPrint,
    onViewLoading: context.onViewLoading,
    onViewReady: context.onViewReady,
  };
}

export default usePrintMode;