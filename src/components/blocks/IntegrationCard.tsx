'use client';

/**
 * IntegrationCard - Palette-aware integration/connection card component.
 *
 * Displays an integration with logo, name, description, connection status,
 * optional config detail, and connect/disconnect action. Uses CSS theme/palette
 * variables exclusively for all colors.
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { StatusBadge } from '../base/StatusBadge';

export interface IntegrationCardProps {
  logo: React.ReactNode;
  logoColor?: string;
  name: string;
  description: string;
  connected: boolean;
  configDetail?: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
  /** Custom action slot. When provided, replaces the default Connect/Disconnect button. */
  action?: React.ReactNode;
  className?: string;
}

function PencilIcon(): React.ReactElement {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M9.5 2.5L11.5 4.5L4.5 11.5H2.5V9.5L9.5 2.5Z"
        stroke="currentColor"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IntegrationCard({
  logo,
  logoColor,
  name,
  description,
  connected,
  configDetail,
  onConnect,
  onDisconnect,
  action,
  className,
}: IntegrationCardProps): React.ReactElement {
  const cardStyle: React.CSSProperties = {
    background: 'var(--theme-surface)',
    borderRadius: 'var(--theme-border-radius-card, 14px)',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  };

  const logoContainerStyle: React.CSSProperties = {
    width: 32,
    height: 32,
    borderRadius: 8,
    background: logoColor ?? 'var(--theme-surface-variant)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  };

  const nameStyle: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 600,
    color: 'var(--theme-text-primary)',
    flex: 1,
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 400,
    color: 'var(--theme-text-secondary)',
    lineHeight: 1.5,
    margin: 0,
  };

  const configRowStyle: React.CSSProperties = {
    fontSize: 12,
    color: 'var(--theme-text-secondary)',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  };

  const defaultButtonStyle: React.CSSProperties = connected
    ? {
        width: '100%',
        height: 36,
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 600,
        background: 'transparent',
        border: '1px solid var(--palette-error-border)',
        color: 'var(--palette-error-main)',
        cursor: 'pointer',
      }
    : {
        width: '100%',
        height: 36,
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 600,
        background: 'var(--theme-primary)',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
      };

  function handleDefaultAction(): void {
    if (connected) {
      onDisconnect?.();
    } else {
      onConnect?.();
    }
  }

  const statusBadge = connected ? (
    <StatusBadge
      color="var(--palette-success-main)"
      label="Connected"
      variant="tinted"
      size="sm"
    />
  ) : (
    <StatusBadge
      color="var(--theme-text-secondary)"
      label="Not connected"
      variant="overlay"
      size="sm"
    />
  );

  return (
    <div style={cardStyle} className={className}>
      <div style={headerStyle}>
        <div style={logoContainerStyle}>{logo}</div>
        <span style={nameStyle}>{name}</span>
        <div style={{ marginLeft: 'auto' }}>{statusBadge}</div>
      </div>

      <p style={descriptionStyle}>{description}</p>

      {connected && configDetail && (
        <div style={configRowStyle}>
          <PencilIcon />
          <span>{configDetail}</span>
        </div>
      )}

      {action !== undefined ? (
        action
      ) : (
        <button style={defaultButtonStyle} onClick={handleDefaultAction}>
          {connected ? 'Disconnect' : 'Connect'}
        </button>
      )}
    </div>
  );
}

export default IntegrationCard;
