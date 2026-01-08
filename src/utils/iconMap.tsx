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

// Material UI Icons - Direct imports to avoid loading the entire barrel index
// This prevents EMFILE errors when Node.js tries to parse thousands of icon exports
import AccountCircle from '@mui/icons-material/AccountCircle';
import Add from '@mui/icons-material/Add';
import Architecture from '@mui/icons-material/Architecture';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Article from '@mui/icons-material/Article';
import AttachMoney from '@mui/icons-material/AttachMoney';
import Autorenew from '@mui/icons-material/Autorenew';
import Block from '@mui/icons-material/Block';
import Book from '@mui/icons-material/Book';
import Business from '@mui/icons-material/Business';
import Check from '@mui/icons-material/Check';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Close from '@mui/icons-material/Close';
import Cloud from '@mui/icons-material/Cloud';
import CloudDownload from '@mui/icons-material/CloudDownload';
import CloudUpload from '@mui/icons-material/CloudUpload';
import Code from '@mui/icons-material/Code';
import Computer from '@mui/icons-material/Computer';
import Construction from '@mui/icons-material/Construction';
import Dashboard from '@mui/icons-material/Dashboard';
import Delete from '@mui/icons-material/Delete';
import Download from '@mui/icons-material/Download';
import Edit from '@mui/icons-material/Edit';
import Email from '@mui/icons-material/Email';
import Explore from '@mui/icons-material/Explore';
import Favorite from '@mui/icons-material/Favorite';
import Group from '@mui/icons-material/Group';
import Help from '@mui/icons-material/Help';
import HelpOutline from '@mui/icons-material/HelpOutline';
import Home from '@mui/icons-material/Home';
import Info from '@mui/icons-material/Info';
import InsertPhoto from '@mui/icons-material/InsertPhoto';
import IntegrationInstructions from '@mui/icons-material/IntegrationInstructions';
import Inventory from '@mui/icons-material/Inventory';
import Inventory2 from '@mui/icons-material/Inventory2';
import Key from '@mui/icons-material/Key';
import Layers from '@mui/icons-material/Layers';
import LibraryBooks from '@mui/icons-material/LibraryBooks';
import LocalOffer from '@mui/icons-material/LocalOffer';
import Lock from '@mui/icons-material/Lock';
import LockOpen from '@mui/icons-material/LockOpen';
import Login from '@mui/icons-material/Login';
import Logout from '@mui/icons-material/Logout';
import ManageAccounts from '@mui/icons-material/ManageAccounts';
import Memory from '@mui/icons-material/Memory';
import Menu from '@mui/icons-material/Menu';
import Notifications from '@mui/icons-material/Notifications';
import People from '@mui/icons-material/People';
import Person from '@mui/icons-material/Person';
import PersonSearch from '@mui/icons-material/PersonSearch';
import Phone from '@mui/icons-material/Phone';
import PhotoLibrary from '@mui/icons-material/PhotoLibrary';
import PlayArrow from '@mui/icons-material/PlayArrow';
import Psychology from '@mui/icons-material/Psychology';
import Refresh from '@mui/icons-material/Refresh';
import Rocket from '@mui/icons-material/Rocket';
import RotateRight from '@mui/icons-material/RotateRight';
import Route from '@mui/icons-material/Route';
import Save from '@mui/icons-material/Save';
import Search from '@mui/icons-material/Search';
import Security from '@mui/icons-material/Security';
import Send from '@mui/icons-material/Send';
import Settings from '@mui/icons-material/Settings';
import Share from '@mui/icons-material/Share';
import Shield from '@mui/icons-material/Shield';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Speed from '@mui/icons-material/Speed';
import Star from '@mui/icons-material/Star';
import Storage from '@mui/icons-material/Storage';
import SupportAgent from '@mui/icons-material/SupportAgent';
import Sync from '@mui/icons-material/Sync';
import TrendingUp from '@mui/icons-material/TrendingUp';
import Tune from '@mui/icons-material/Tune';
import VerifiedUser from '@mui/icons-material/VerifiedUser';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import VpnKey from '@mui/icons-material/VpnKey';
import Work from '@mui/icons-material/Work';
import WorkspacePremium from '@mui/icons-material/WorkspacePremium';
// Additional icons for components
import Accessibility from '@mui/icons-material/Accessibility';
import BrokenImage from '@mui/icons-material/BrokenImage';
import Circle from '@mui/icons-material/Circle';
import ContentCopy from '@mui/icons-material/ContentCopy';
import DarkMode from '@mui/icons-material/DarkMode';
import Error from '@mui/icons-material/Error';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import FormatUnderlined from '@mui/icons-material/FormatUnderlined';
import Launch from '@mui/icons-material/Launch';
import LightMode from '@mui/icons-material/LightMode';
import MoreVert from '@mui/icons-material/MoreVert';
import Palette from '@mui/icons-material/Palette';
import RadioButtonUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import Schedule from '@mui/icons-material/Schedule';
import SettingsSystemDaydream from '@mui/icons-material/SettingsSystemDaydream';
import Warning from '@mui/icons-material/Warning';

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

  // === UI & Interaction ===
  accessibility: { emoji: '♿', component: Accessibility },
  broken_image: { emoji: '🖼️', component: BrokenImage },
  brokenimage: { emoji: '🖼️', component: BrokenImage }, // alias
  circle: { emoji: '⭕', component: Circle },
  content_copy: { emoji: '📋', component: ContentCopy },
  contentcopy: { emoji: '📋', component: ContentCopy }, // alias
  copy: { emoji: '📋', component: ContentCopy }, // alias
  dark_mode: { emoji: '🌙', component: DarkMode },
  darkmode: { emoji: '🌙', component: DarkMode }, // alias
  error: { emoji: '❌', component: Error },
  expand_less: { emoji: '▲', component: ExpandLess },
  expandless: { emoji: '▲', component: ExpandLess }, // alias
  expand_more: { emoji: '▼', component: ExpandMore },
  expandmore: { emoji: '▼', component: ExpandMore }, // alias
  format_bold: { emoji: '𝐁', component: FormatBold },
  formatbold: { emoji: '𝐁', component: FormatBold }, // alias
  bold: { emoji: '𝐁', component: FormatBold }, // alias
  format_italic: { emoji: '𝐼', component: FormatItalic },
  formatitalic: { emoji: '𝐼', component: FormatItalic }, // alias
  italic: { emoji: '𝐼', component: FormatItalic }, // alias
  format_underlined: { emoji: 'U̲', component: FormatUnderlined },
  formatunderlined: { emoji: 'U̲', component: FormatUnderlined }, // alias
  underline: { emoji: 'U̲', component: FormatUnderlined }, // alias
  launch: { emoji: '🚀', component: Launch },
  open: { emoji: '🚀', component: Launch }, // alias
  light_mode: { emoji: '☀️', component: LightMode },
  lightmode: { emoji: '☀️', component: LightMode }, // alias
  more_vert: { emoji: '⋮', component: MoreVert },
  morevert: { emoji: '⋮', component: MoreVert }, // alias
  more: { emoji: '⋮', component: MoreVert }, // alias
  palette: { emoji: '🎨', component: Palette },
  radio_button_unchecked: { emoji: '○', component: RadioButtonUnchecked },
  radiobuttonunchecked: { emoji: '○', component: RadioButtonUnchecked }, // alias
  schedule: { emoji: '📅', component: Schedule },
  calendar: { emoji: '📅', component: Schedule }, // alias
  settings_system_daydream: { emoji: '💻', component: SettingsSystemDaydream },
  settingssystemdaydream: { emoji: '💻', component: SettingsSystemDaydream }, // alias
  system: { emoji: '💻', component: SettingsSystemDaydream }, // alias
  warning: { emoji: '⚠️', component: Warning },
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
