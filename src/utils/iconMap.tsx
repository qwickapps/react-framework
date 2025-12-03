/**
 * Icon Mapping Utility
 * 
 * Provides centralized icon mapping for both Material-UI components and emoji representations.
 * Used across the framework for consistent icon rendering in buttons, navigation, admin UI, etc.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import {
  Article,
  Home,
  Book,
  Download,
  CloudDownload,
  CloudUpload,
  Computer,
  Settings,
  Dashboard,
  Info,
  Inventory,
  Inventory2,
  Help,
  Add,
  Edit,
  Delete,
  Check,
  Close,
  ArrowForward,
  ArrowBack,
  Menu,
  Search,
  Favorite,
  Star,
  Share,
  Save,
  Send,
  Email,
  Phone,
  Person,
  Group,
  Business,
  ShoppingCart,
  Speed,
  SupportAgent,
  Tune,
  AttachMoney,
  Lock,
  LockOpen,
  Visibility,
  VisibilityOff,
  // New icons for seed content
  Psychology,
  Autorenew,
  Code,
  IntegrationInstructions,
  Construction,
  Work,
  Layers,
  TrendingUp,
  Route,
  Sync,
  Architecture,
  Security,
  VerifiedUser,
} from '@mui/icons-material';

/**
 * Icon mapping entry with both Material-UI component and emoji representation
 */
export interface IconMapping {
  emoji: string;
  component: React.ComponentType;
}

/**
 * Centralized icon registry mapping icon names to their representations
 * Supports both Material-UI components and emoji for different contexts
 */
export const iconMap: Record<string, IconMapping> = {
  // Navigation & Layout
  home: { emoji: '🏠', component: Home },
  menu: { emoji: '☰', component: Menu },
  dashboard: { emoji: '📊', component: Dashboard },
  
  // Information & Help
  info: { emoji: 'ℹ️', component: Info },
  about: { emoji: 'ℹ️', component: Info },
  help: { emoji: '❓', component: Help },
  book: { emoji: '📖', component: Book },
  
  // Communication
  email: { emoji: '📧', component: Email },
  contact: { emoji: '📧', component: Email },
  phone: { emoji: '📱', component: Phone },
  send: { emoji: '📤', component: Send },
  
  // Actions
  add: { emoji: '➕', component: Add },
  edit: { emoji: '✏️', component: Edit },
  delete: { emoji: '🗑️', component: Delete },
  save: { emoji: '💾', component: Save },
  check: { emoji: '✓', component: Check },
  close: { emoji: '✕', component: Close },
  
  // Navigation
  arrowforward: { emoji: '→', component: ArrowForward },
  arrowback: { emoji: '←', component: ArrowBack },
  
  // Content
  search: { emoji: '🔍', component: Search },
  share: { emoji: '🔗', component: Share },
  download: { emoji: '⬇️', component: Download },
  clouddownload: { emoji: '☁️⬇️', component: CloudDownload },
  cloudupload: { emoji: '☁️⬆️', component: CloudUpload },
  
  // User & Social
  person: { emoji: '👤', component: Person },
  user: { emoji: '👤', component: Person },
  group: { emoji: '👥', component: Group },
  favorite: { emoji: '❤️', component: Favorite },
  star: { emoji: '⭐', component: Star },
  verified_user: { emoji: '✅', component: VerifiedUser },
  
  // Business
  business: { emoji: '🏢', component: Business },
  shoppingcart: { emoji: '🛒', component: ShoppingCart },
  cart: { emoji: '🛒', component: ShoppingCart },
  attachmoney: { emoji: '💰', component: AttachMoney },
  
  // Security
  lock: { emoji: '🔒', component: Lock },
  lockopen: { emoji: '🔓', component: LockOpen },
  visibility: { emoji: '👁️', component: Visibility },
  visibilityoff: { emoji: '🙈', component: VisibilityOff },
  
  // System
  settings: { emoji: '⚙️', component: Settings },
  computer: { emoji: '💻', component: Computer },
  
  // Content Types
  article: { emoji: '📰', component: Article },
  blog: { emoji: '📝', component: Book },
  news: { emoji: '📰', component: Book },
  products: { emoji: '🛍️', component: ShoppingCart },
  services: { emoji: '⚙️', component: Settings },
  portfolio: { emoji: '💼', component: Business },
  gallery: { emoji: '🖼️', component: Business },
  inventory: { emoji: '📦', component: Inventory },
  inventory_2: { emoji: '📦', component: Inventory2 },
  speed: { emoji: '⚡', component: Speed },
  support_agent: { emoji: '🛎️', component: SupportAgent },
  tune: { emoji: '🎛️', component: Tune },

  // Development & Technology
  code: { emoji: '💻', component: Code },
  psychology: { emoji: '🧠', component: Psychology },
  autorenew: { emoji: '🔄', component: Autorenew },
  integration_instructions: { emoji: '🔌', component: IntegrationInstructions },
  construction: { emoji: '🚧', component: Construction },
  work: { emoji: '💼', component: Work },
  layers: { emoji: '📚', component: Layers },
  trending_up: { emoji: '📈', component: TrendingUp },
  route: { emoji: '🗺️', component: Route },
  sync: { emoji: '🔄', component: Sync },
  architecture: { emoji: '🏛️', component: Architecture },
  security: { emoji: '🔐', component: Security },
};

/**
 * Get emoji representation of an icon
 * @param iconName - Icon name (case-insensitive)
 * @param fallback - Fallback emoji if icon not found (default: 🔗)
 * @returns Emoji string
 */
export function getIconEmoji(iconName: string | undefined, fallback: string = '🔗'): string {
  if (!iconName) return fallback;
  const mapping = iconMap[iconName.toLowerCase()];
  return mapping?.emoji || iconName;
}

/**
 * Get Material-UI component representation of an icon
 * @param iconName - Icon name (case-insensitive)
 * @returns React element or null if not found
 */
export function getIconComponent(iconName: string | undefined): React.ReactElement | null {
  if (!iconName) return null;
  
  const mapping = iconMap[iconName.toLowerCase()];
  if (!mapping?.component) {
    console.warn(`[IconMap] Icon "${iconName}" not found in registry`);
    return null;
  }
  
  const IconComponent = mapping.component;
  return <IconComponent />;
}

/**
 * Register a new icon or override an existing one
 * Useful for application-specific icon extensions
 */
export function registerIcon(name: string, mapping: IconMapping): void {
  iconMap[name.toLowerCase()] = mapping;
}

/**
 * Check if an icon is registered
 */
export function hasIcon(iconName: string): boolean {
  return iconName.toLowerCase() in iconMap;
}

/**
 * Get all registered icon names
 */
export function getRegisteredIcons(): string[] {
  return Object.keys(iconMap);
}
