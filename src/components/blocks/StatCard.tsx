'use client';

/**
 * StatCard - Palette-aware statistic card component.
 *
 * Displays a labeled metric with optional trend indicator, status color,
 * and progress bar. All colors sourced from CSS palette/theme variables.
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';

export type StatCardStatus = 'success' | 'warning' | 'error' | 'info';
export type TrendDirection = 'up' | 'down' | 'neutral';

export interface StatCardTrend {
  direction: TrendDirection;
  label: string;
}

export interface StatCardProps {
  label: string;
  value: string | number;
  trend?: StatCardTrend;
  status?: StatCardStatus;
  /** Progress value 0-100 */
  progress?: number;
  className?: string;
}

const STATUS_COLOR: Record<StatCardStatus, string> = {
  success: 'var(--palette-success-main)',
  warning: 'var(--palette-warning-main)',
  error: 'var(--palette-error-main)',
  info: 'var(--palette-info-main)',
};

const TREND_COLOR: Record<TrendDirection, string> = {
  up: 'var(--palette-success-main)',
  down: 'var(--palette-error-main)',
  neutral: 'var(--theme-text-secondary)',
};

const TREND_ICON: Record<TrendDirection, string> = {
  up: '▲',
  down: '▼',
  neutral: '—',
};

export function StatCard({
  label,
  value,
  trend,
  status,
  progress,
  className,
}: StatCardProps): React.ReactElement {
  const valueColor = status ? STATUS_COLOR[status] : 'var(--theme-text-primary)';
  const progressColor = status ? STATUS_COLOR[status] : 'var(--theme-primary)';

  const cardStyle: React.CSSProperties = {
    background: 'var(--theme-surface)',
    borderRadius: 'var(--theme-border-radius-card, 14px)',
    padding: 16,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 600,
    color: 'var(--theme-text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: 0.1,
    marginBottom: 6,
  };

  const valueStyle: React.CSSProperties = {
    fontSize: 22,
    fontWeight: 700,
    color: valueColor,
    lineHeight: 1.2,
  };

  return (
    <div style={cardStyle} className={className}>
      <div style={labelStyle}>{label}</div>
      <div style={valueStyle}>{value}</div>

      {trend && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            marginTop: 6,
            fontSize: 11,
            color: TREND_COLOR[trend.direction],
          }}
        >
          <span>{TREND_ICON[trend.direction]}</span>
          <span>{trend.label}</span>
        </div>
      )}

      {progress !== undefined && (
        <div
          style={{
            marginTop: 10,
            height: 4,
            background: 'var(--theme-border-main)',
            borderRadius: 99,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${Math.min(100, Math.max(0, progress))}%`,
              background: progressColor,
              borderRadius: 99,
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      )}
    </div>
  );
}

export default StatCard;
