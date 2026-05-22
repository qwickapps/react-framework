'use client';

/**
 * VideoPlayer - Palette-aware video player card component.
 *
 * Renders a 16:9 placeholder/player with play button, info bar, optional badge,
 * and scrubber. All colors sourced from CSS theme/palette variables.
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';

export interface VideoPlayerProps {
  src?: string;
  /** CSS gradient string or color for the placeholder background */
  background?: string;
  label?: string;
  timestamp?: string;
  duration?: string;
  /** Top-right chip text */
  badge?: string;
  showControls?: boolean;
  /** Scrubber fill 0-100 */
  progress?: number;
  className?: string;
}

function PlayIcon(): React.ReactElement {
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M6 4.5L18 11L6 17.5V4.5Z" fill="white" />
    </svg>
  );
}

export function VideoPlayer({
  background,
  label,
  timestamp,
  duration,
  badge,
  showControls = false,
  progress,
  className,
}: VideoPlayerProps): React.ReactElement {
  const wrapperStyle: React.CSSProperties = {
    position: 'relative',
    aspectRatio: '16/9',
    borderRadius: 'var(--theme-border-radius-card, 14px)',
    overflow: 'hidden',
    background: background ?? 'var(--theme-surface)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const playButtonStyle: React.CSSProperties = {
    width: 56,
    height: 56,
    borderRadius: '50%',
    background: 'var(--theme-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
    cursor: 'pointer',
    zIndex: 1,
  };

  const infoBarStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: showControls ? 3 : 0,
    left: 0,
    right: 0,
    padding: '10px 14px',
    background: 'rgba(0,0,0,0.75)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  };

  const badgeStyle: React.CSSProperties = {
    position: 'absolute',
    top: 8,
    right: 8,
    background: 'rgba(0,0,0,0.65)',
    border: '1px solid var(--theme-primary)',
    borderRadius: 99,
    padding: '3px 10px',
    fontSize: 11,
    color: 'var(--theme-primary)',
    zIndex: 2,
  };

  const scrubberTrackStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    background: 'rgba(255,255,255,0.2)',
  };

  const scrubberFillStyle: React.CSSProperties = {
    height: '100%',
    width: `${Math.min(100, Math.max(0, progress ?? 0))}%`,
    background: 'var(--theme-primary)',
  };

  const hasInfoBar = label || timestamp || duration;

  return (
    <div style={wrapperStyle} className={className}>
      {badge && <div style={badgeStyle}>{badge}</div>}

      <div style={playButtonStyle} role="button" aria-label="Play">
        <PlayIcon />
      </div>

      {hasInfoBar && (
        <div style={infoBarStyle}>
          {label && (
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: 'white',
                flex: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {label}
            </span>
          )}
          {timestamp && (
            <span
              style={{
                fontSize: 12,
                color: 'var(--theme-text-secondary)',
                marginLeft: 'auto',
              }}
            >
              {timestamp}
            </span>
          )}
          {duration && (
            <span
              style={{
                fontSize: 12,
                color: 'var(--theme-text-secondary)',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: 4,
                padding: '1px 6px',
              }}
            >
              {duration}
            </span>
          )}
        </div>
      )}

      {showControls && (
        <div style={scrubberTrackStyle}>
          <div style={scrubberFillStyle} />
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;
