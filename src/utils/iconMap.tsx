/**
 * Icon Mapping Utility
 *
 * Provides centralized icon mapping for both Material-UI components and emoji representations.
 * Used across the framework for consistent icon rendering in buttons, navigation, admin UI, etc.
 *
 * Features:
 * - Static map for commonly used icons with emoji support
 * - Fallback to HelpOutline icon for unmapped icons (with console warning)
 * - Runtime icon registration via registerIcon() for app-specific icons
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';

// Material UI Icons - sorted alphabetically
import {
  AccountCircle,
  Add,
  Architecture,
  ArrowBack,
  ArrowForward,
  Article,
  AttachMoney,
  Autorenew,
  Block,
  Book,
  Business,
  Check,
  CheckCircle,
  Close,
  Cloud,
  CloudDownload,
  CloudUpload,
  Code,
  Computer,
  Construction,
  Dashboard,
  Delete,
  Download,
  Edit,
  Email,
  Explore,
  Favorite,
  Group,
  Help,
  HelpOutline,
  Home,
  Info,
  InsertPhoto,
  IntegrationInstructions,
  Inventory,
  Inventory2,
  Key,
  Layers,
  LibraryBooks,
  LocalOffer,
  Lock,
  LockOpen,
  Login,
  Logout,
  ManageAccounts,
  Memory,
  Menu,
  Notifications,
  People,
  Person,
  PersonSearch,
  Phone,
  PhotoLibrary,
  PlayArrow,
  Psychology,
  Refresh,
  Rocket,
  RotateRight,
  Route,
  Save,
  Search,
  Security,
  Send,
  Settings,
  Share,
  Shield,
  ShoppingCart,
  Speed,
  Star,
  Storage,
  SupportAgent,
  Sync,
  TrendingUp,
  Tune,
  VerifiedUser,
  Visibility,
  VisibilityOff,
  VpnKey,
  Work,
  WorkspacePremium,
} from '@mui/icons-material';

/**
 * Icon mapping entry with both Material-UI component and emoji representation
 */
export interface IconMapping {
  emoji: string;
  component: React.ComponentType;
}

/**
 * Centralized icon registry mapping icon names to their representations.
 * Sorted alphabetically by category, then by key within each category.
 *
 * For icons not in this map, getIconComponent() will return a HelpOutline fallback
 * and log a warning. Use registerIcon() to add app-specific icons at runtime.
 */
export const iconMap: Record<string, IconMapping> = {
  // === Actions ===
  add: { emoji: '➕', component: Add },
  check: { emoji: '✓', component: Check },
  check_circle: { emoji: '✅', component: CheckCircle },
  close: { emoji: '✕', component: Close },
  delete: { emoji: '🗑️', component: Delete },
  edit: { emoji: '✏️', component: Edit },
  refresh: { emoji: '🔄', component: Refresh },
  rotate_right: { emoji: '🔄', component: RotateRight },
  save: { emoji: '💾', component: Save },
  search: { emoji: '🔍', component: Search },
  send: { emoji: '📤', component: Send },
  share: { emoji: '🔗', component: Share },
  sync: { emoji: '🔄', component: Sync },

  // === Authentication & Security ===
  block: { emoji: '🚫', component: Block },
  key: { emoji: '🔑', component: Key },
  lock: { emoji: '🔒', component: Lock },
  lock_open: { emoji: '🔓', component: LockOpen },
  lockopen: { emoji: '🔓', component: LockOpen }, // alias
  login: { emoji: '🔑', component: Login },
  logout: { emoji: '🚪', component: Logout },
  security: { emoji: '🔐', component: Security },
  shield: { emoji: '🛡️', component: Shield },
  verified_user: { emoji: '✅', component: VerifiedUser },
  visibility: { emoji: '👁️', component: Visibility },
  visibility_off: { emoji: '🙈', component: VisibilityOff },
  visibilityoff: { emoji: '🙈', component: VisibilityOff }, // alias
  vpn_key: { emoji: '🔐', component: VpnKey },

  // === Business & Commerce ===
  attach_money: { emoji: '💰', component: AttachMoney },
  attachmoney: { emoji: '💰', component: AttachMoney }, // alias
  business: { emoji: '🏢', component: Business },
  cart: { emoji: '🛒', component: ShoppingCart }, // alias
  shopping_cart: { emoji: '🛒', component: ShoppingCart },
  shoppingcart: { emoji: '🛒', component: ShoppingCart }, // alias
  work: { emoji: '💼', component: Work },
  workspace_premium: { emoji: '⭐', component: WorkspacePremium },

  // === Communication ===
  contact: { emoji: '📧', component: Email }, // alias
  email: { emoji: '📧', component: Email },
  mail: { emoji: '📧', component: Email }, // alias
  notifications: { emoji: '🔔', component: Notifications },
  phone: { emoji: '📱', component: Phone },
  support_agent: { emoji: '🛎️', component: SupportAgent },

  // === Content & Media ===
  article: { emoji: '📰', component: Article },
  blog: { emoji: '📝', component: Book }, // alias
  book: { emoji: '📖', component: Book },
  gallery: { emoji: '🖼️', component: InsertPhoto }, // alias
  image: { emoji: '🖼️', component: InsertPhoto },
  insert_photo: { emoji: '🖼️', component: InsertPhoto },
  library_books: { emoji: '📚', component: LibraryBooks },
  news: { emoji: '📰', component: Article }, // alias
  photo_library: { emoji: '📸', component: PhotoLibrary },
  play: { emoji: '▶️', component: PlayArrow }, // alias
  play_arrow: { emoji: '▶️', component: PlayArrow },
  portfolio: { emoji: '💼', component: Business }, // alias

  // === Development & Technology ===
  architecture: { emoji: '🏛️', component: Architecture },
  autorenew: { emoji: '🔄', component: Autorenew },
  cloud: { emoji: '☁️', component: Cloud },
  cloud_download: { emoji: '☁️⬇️', component: CloudDownload },
  cloud_upload: { emoji: '☁️⬆️', component: CloudUpload },
  clouddownload: { emoji: '☁️⬇️', component: CloudDownload }, // alias
  cloudupload: { emoji: '☁️⬆️', component: CloudUpload }, // alias
  code: { emoji: '💻', component: Code },
  computer: { emoji: '💻', component: Computer },
  construction: { emoji: '🚧', component: Construction },
  integration_instructions: { emoji: '🔌', component: IntegrationInstructions },
  memory: { emoji: '🧠', component: Memory },
  psychology: { emoji: '🧠', component: Psychology },
  rocket: { emoji: '🚀', component: Rocket },
  storage: { emoji: '💾', component: Storage },

  // === Navigation & Layout ===
  arrow_back: { emoji: '←', component: ArrowBack },
  arrow_forward: { emoji: '→', component: ArrowForward },
  arrowback: { emoji: '←', component: ArrowBack }, // alias
  arrowforward: { emoji: '→', component: ArrowForward }, // alias
  dashboard: { emoji: '📊', component: Dashboard },
  download: { emoji: '⬇️', component: Download },
  explore: { emoji: '🧭', component: Explore },
  home: { emoji: '🏠', component: Home },
  layers: { emoji: '📚', component: Layers },
  menu: { emoji: '☰', component: Menu },
  route: { emoji: '🗺️', component: Route },
  settings: { emoji: '⚙️', component: Settings },
  trending_up: { emoji: '📈', component: TrendingUp },
  tune: { emoji: '🎛️', component: Tune },

  // === Products & Inventory ===
  inventory: { emoji: '📦', component: Inventory },
  inventory_2: { emoji: '📦', component: Inventory2 },
  local_offer: { emoji: '🏷️', component: LocalOffer },
  products: { emoji: '🛍️', component: ShoppingCart }, // alias
  services: { emoji: '⚙️', component: Settings }, // alias
  speed: { emoji: '⚡', component: Speed },

  // === Status & Feedback ===
  about: { emoji: 'ℹ️', component: Info }, // alias
  favorite: { emoji: '❤️', component: Favorite },
  heart: { emoji: '❤️', component: Favorite }, // alias
  help: { emoji: '❓', component: Help },
  info: { emoji: 'ℹ️', component: Info },
  star: { emoji: '⭐', component: Star },

  // === Users & People ===
  account_circle: { emoji: '👤', component: AccountCircle },
  group: { emoji: '👥', component: Group },
  manage_accounts: { emoji: '👤', component: ManageAccounts },
  people: { emoji: '👥', component: People },
  person: { emoji: '👤', component: Person },
  person_search: { emoji: '🔍', component: PersonSearch },
  user: { emoji: '👤', component: Person }, // alias
  users: { emoji: '👥', component: People }, // alias
};

/**
 * Get emoji representation of an icon
 * @param iconName - Icon name (case-insensitive, supports snake_case)
 * @param fallback - Fallback emoji if icon not found (default: 🔗)
 * @returns Emoji string
 */
export function getIconEmoji(iconName: string | undefined, fallback: string = '🔗'): string {
  if (!iconName) return fallback;
  const normalized = iconName.toLowerCase();
  const mapping = iconMap[normalized];
  return mapping?.emoji || fallback;
}

/**
 * Get Material-UI component representation of an icon.
 *
 * Uses the static iconMap for known icons. For unmapped icons,
 * returns a HelpOutline fallback and logs a warning.
 *
 * @param iconName - Icon name (case-insensitive, supports snake_case)
 * @returns React element (mapped icon or HelpOutline fallback), or null if no name provided
 */
export function getIconComponent(iconName: string | undefined): React.ReactElement | null {
  if (!iconName) return null;

  const normalized = iconName.toLowerCase();
  const mapping = iconMap[normalized];

  if (mapping?.component) {
    const IconComponent = mapping.component;
    return <IconComponent />;
  }

  // Fallback: Return HelpOutline icon and warn about unmapped icon
  // Use registerIcon() to add app-specific icons at runtime
  if (process.env.NODE_ENV !== 'production') {
    console.warn(`[IconMap] Icon "${iconName}" not found. Add it to iconMap or use registerIcon().`);
  }
  return <HelpOutline />;
}

/**
 * Register a new icon or override an existing one
 * Useful for application-specific icon extensions
 */
export function registerIcon(name: string, mapping: IconMapping): void {
  iconMap[name.toLowerCase()] = mapping;
}

/**
 * Check if an icon is registered in the static map
 * If false, getIconComponent will return HelpOutline fallback
 */
export function hasIcon(iconName: string): boolean {
  return iconName.toLowerCase() in iconMap;
}

/**
 * Get all registered icon names from the static map
 */
export function getRegisteredIcons(): string[] {
  return Object.keys(iconMap);
}
