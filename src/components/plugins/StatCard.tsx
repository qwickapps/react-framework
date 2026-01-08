/**
 * StatCard - Display a single metric with optional trend indicator
 *
 * Used in plugin status widgets to show key metrics at a glance.
 *
 * @example
 * ```tsx
 * <StatCard
 *   label="Active Connections"
 *   value={42}
 *   unit="connections"
 *   trend={{ value: 12, direction: 'up' }}
 *   status="healthy"
 * />
 * ```
 */

import React from 'react';

export interface StatCardProps {
  /** Label describing the metric */
  label: string;

  /** Current value */
  value: number | string;

  /** Optional unit (e.g., "MB", "requests/sec") */
  unit?: string;

  /** Optional suffix (alias for unit, for backward compatibility) */
  suffix?: string;

  /** Optional trend indicator */
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'stable';
  };

  /** Status indicator */
  status?: 'healthy' | 'warning' | 'error' | 'info';

  /** Optional click handler */
  onClick?: () => void;

  /** Optional icon */
  icon?: React.ReactNode;

  /** Optional sub-value displayed below the label */
  subValue?: string;

  /** Optional custom color for the icon/accent */
  color?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  unit,
  suffix,
  trend,
  status = 'info',
  onClick,
  icon,
  subValue,
  color,
}) => {
  // Use suffix as fallback for unit (backward compatibility)
  const displayUnit = unit || suffix;
  const statusColors = {
    healthy: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20',
    warning: 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20',
    error: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20',
    info: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20',
  };

  const trendIcons = {
    up: '↑',
    down: '↓',
    stable: '→',
  };

  return (
    <div
      className={`
        rounded-lg border p-4
        ${statusColors[status]}
        ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}
      `}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium opacity-80">{label}</p>
          <div className="mt-1 flex items-baseline gap-2">
            <p className="text-2xl font-semibold">
              {value}
            </p>
            {displayUnit && (
              <span className="text-sm opacity-70">{displayUnit}</span>
            )}
          </div>
          {subValue && (
            <p className="text-xs opacity-70 mt-1">{subValue}</p>
          )}
          {trend && (
            <div className="mt-2 flex items-center gap-1 text-sm">
              <span>{trendIcons[trend.direction]}</span>
              <span>{trend.value}%</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="ml-4 text-2xl opacity-70" style={color ? { color } : undefined}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};
