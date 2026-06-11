/**
 * Generic UI Components
 *
 * Reusable UI primitives for building admin interfaces.
 * Server-specific plugin patterns are in @qwickapps/server/ui
 *
 * @packageDocumentation
 */

export { StatCard as PluginStatCard } from './StatCard.js';
export type { StatCardProps as PluginStatCardProps } from './StatCard.js';

/** @deprecated Use StatCard from blocks instead */
export { StatCard } from './StatCard.js';
/** @deprecated Use StatCardProps from blocks instead */
export type { StatCardProps } from './StatCard.js';

export { DataTable } from './DataTable.js';
export type { DataTableProps, Column } from './DataTable.js';
