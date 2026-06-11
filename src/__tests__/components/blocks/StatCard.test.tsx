/**
 * Unit tests for StatCard component.
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StatCard } from '../../../components/blocks/StatCard';

describe('StatCard', () => {
  describe('Basic render', () => {
    it('renders label and value', () => {
      render(<StatCard label="Revenue" value="$12,000" />);
      expect(screen.getByText('Revenue')).toBeInTheDocument();
      expect(screen.getByText('$12,000')).toBeInTheDocument();
    });

    it('renders a numeric value', () => {
      render(<StatCard label="Users" value={42} />);
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <StatCard label="Score" value={100} className="my-card" />
      );
      expect(container.querySelector('.my-card')).toBeInTheDocument();
    });
  });

  describe('Trend indicator', () => {
    it('renders trend label and up arrow', () => {
      render(
        <StatCard
          label="Sales"
          value={500}
          trend={{ direction: 'up', label: '+12%' }}
        />
      );
      expect(screen.getByText('+12%')).toBeInTheDocument();
      expect(screen.getByText('▲')).toBeInTheDocument();
    });

    it('renders down arrow for down trend', () => {
      render(
        <StatCard
          label="Churn"
          value={5}
          trend={{ direction: 'down', label: '-3%' }}
        />
      );
      expect(screen.getByText('▼')).toBeInTheDocument();
    });

    it('renders em dash for neutral trend', () => {
      render(
        <StatCard
          label="Stable"
          value={50}
          trend={{ direction: 'neutral', label: '0%' }}
        />
      );
      expect(screen.getByText('—')).toBeInTheDocument();
    });

    it('renders without trend when prop is omitted', () => {
      const { container } = render(<StatCard label="Score" value={100} />);
      expect(container.querySelector('[data-trend]')).not.toBeInTheDocument();
      expect(screen.queryByText('▲')).not.toBeInTheDocument();
    });
  });

  describe('Progress bar', () => {
    it('renders progress bar when progress prop is provided', () => {
      const { container } = render(
        <StatCard label="Progress" value="75%" progress={75} />
      );
      // The filled bar should have width 75%
      const filledBar = container.querySelector('[style*="width: 75%"]');
      expect(filledBar).toBeInTheDocument();
    });

    it('clamps progress to 100', () => {
      const { container } = render(
        <StatCard label="Progress" value="120%" progress={120} />
      );
      const filledBar = container.querySelector('[style*="width: 100%"]');
      expect(filledBar).toBeInTheDocument();
    });

    it('clamps progress to 0', () => {
      const { container } = render(
        <StatCard label="Progress" value="-10%" progress={-10} />
      );
      const filledBar = container.querySelector('[style*="width: 0%"]');
      expect(filledBar).toBeInTheDocument();
    });

    it('does not render progress bar when progress is omitted', () => {
      const { container } = render(<StatCard label="Score" value={100} />);
      // No bar element with width style should appear
      expect(container.querySelector('[style*="width: "]')).not.toBeInTheDocument();
    });
  });

  describe('Status variants', () => {
    const statuses = ['success', 'warning', 'error', 'info'] as const;

    statuses.forEach((status) => {
      it(`renders with ${status} status without crashing`, () => {
        render(
          <StatCard label="Metric" value={1} status={status} progress={50} />
        );
        expect(screen.getByText('Metric')).toBeInTheDocument();
      });
    });
  });

  describe('Snapshot', () => {
    it('matches snapshot for default render', () => {
      const { container } = render(<StatCard label="Revenue" value="$12,000" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for full props', () => {
      const { container } = render(
        <StatCard
          label="Revenue"
          value="$12,000"
          status="success"
          trend={{ direction: 'up', label: '+12%' }}
          progress={80}
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
