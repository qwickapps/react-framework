/**
 * Hooks available in QwickApps React Framework
 * 
 * Common hooks used across QwickApps components
 */
export { useBaseProps } from './useBaseProps';
export type { BaseComponentProps, WithBaseProps } from './useBaseProps';

// Data Binding hooks for AI-driven component system
export { useDataBinding } from './useDataBinding';
export { QWICKAPP_COMPONENT } from './useBaseProps';

// Print mode detection and management (legacy hook - use PrintModeProvider instead)
export { usePrintMode as usePrintModeHook } from './usePrintMode';
export type { PrintModeState } from './usePrintMode';