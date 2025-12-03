/**
 * MenuItem - Standardized menu item type for navigation components
 *
 * Used by Scaffold, navigation rails, drawers, and other menu systems.
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';

export interface MenuItem {
  /** Unique identifier for the menu item */
  id: string;
  /** Display label for the menu item */
  label: string;
  /** Icon name (string) or icon component (React.ReactNode) to display */
  icon?: string | React.ReactNode;
  /** Click handler for the menu item */
  onClick?: () => void;
  /** External link URL (if this is a link) */
  href?: string;
  /** Route path for automatic navigation (React Router) */
  route?: string;
  /** Whether this item is currently active/selected */
  active?: boolean;
  /** Whether this item is disabled */
  disabled?: boolean;
  /** Badge text or number to display */
  badge?: string | number;
  /** Priority for ordering (lower numbers = higher priority) */
  priority?: number;
}
