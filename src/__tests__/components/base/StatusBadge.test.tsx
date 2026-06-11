/**
 * Unit tests for StatusBadge component.
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StatusBadge } from '../../../components/base/StatusBadge';

describe('StatusBadge', () => {
  describe('Basic render', () => {
    it('renders the label text', () => {
      render(<StatusBadge color="#22c55e" label="Live" />);
      expect(screen.getByText('Live')).toBeInTheDocument();
    });

    it('renders a dot span alongside the label', () => {
      const { container } = render(<StatusBadge color="#22c55e" label="Live" />);
      const spans = container.querySelectorAll('span');
      // outer container + dot + label = 3 spans
      expect(spans.length).toBeGreaterThanOrEqual(3);
    });

    it('applies custom className to the wrapper', () => {
      const { container } = render(
        <StatusBadge color="#22c55e" label="Live" className="my-badge" />
      );
      expect(container.querySelector('.my-badge')).toBeInTheDocument();
    });
  });

  describe('Size variants', () => {
    it('uses sm size by default (height 22px)', () => {
      const { container } = render(<StatusBadge color="#22c55e" label="Live" />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.style.height).toBe('22px');
    });

    it('uses md size when specified (height 26px)', () => {
      const { container } = render(
        <StatusBadge color="#22c55e" label="Live" size="md" />
      );
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.style.height).toBe('26px');
    });
  });

  describe('Pulse prop', () => {
    it('adds midnight-live-dot class to dot span when pulse=true', () => {
      const { container } = render(
        <StatusBadge color="#22c55e" label="Live" pulse={true} />
      );
      expect(container.querySelector('.midnight-live-dot')).toBeInTheDocument();
    });

    it('does not add midnight-live-dot class when pulse is not set', () => {
      const { container } = render(
        <StatusBadge color="#22c55e" label="Offline" />
      );
      expect(container.querySelector('.midnight-live-dot')).not.toBeInTheDocument();
    });
  });

  describe('Variant: overlay', () => {
    it('applies blur backdrop filter for overlay variant', () => {
      const { container } = render(
        <StatusBadge color="#22c55e" label="Live" variant="overlay" />
      );
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.style.backdropFilter).toContain('blur');
    });
  });

  describe('Variant: tinted', () => {
    it('renders with a background style for tinted variant', () => {
      const { container } = render(
        <StatusBadge color="#22c55e" label="Connected" variant="tinted" />
      );
      const wrapper = container.firstChild as HTMLElement;
      // jsdom normalizes hex+alpha to rgba; verify a background is set
      expect(wrapper.style.background).toBeTruthy();
    });
  });

  describe('Color prop', () => {
    it('applies the color prop to label text color', () => {
      render(<StatusBadge color="#ff0000" label="Error" />);
      const label = screen.getByText('Error');
      expect(label.style.color).toBe('rgb(255, 0, 0)');
    });
  });

  describe('Snapshot', () => {
    it('matches snapshot for default props', () => {
      const { container } = render(
        <StatusBadge color="#22c55e" label="Live" />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for pulse md tinted variant', () => {
      const { container } = render(
        <StatusBadge
          color="#22c55e"
          label="Active"
          pulse={true}
          size="md"
          variant="tinted"
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
