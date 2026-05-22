/**
 * Unit tests for ToggleRow component.
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ToggleRow } from '../../components/forms/ToggleRow';

describe('ToggleRow', () => {
  describe('Basic render', () => {
    it('renders the label', () => {
      render(
        <ToggleRow label="Enable notifications" checked={false} onChange={jest.fn()} />
      );
      expect(screen.getByText('Enable notifications')).toBeInTheDocument();
    });

    it('renders the sub-label when provided', () => {
      render(
        <ToggleRow
          label="Enable notifications"
          subLabel="Receive email alerts"
          checked={false}
          onChange={jest.fn()}
        />
      );
      expect(screen.getByText('Receive email alerts')).toBeInTheDocument();
    });

    it('does not render sub-label element when omitted', () => {
      render(
        <ToggleRow label="Option" checked={false} onChange={jest.fn()} />
      );
      expect(screen.queryByText('subLabel')).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <ToggleRow label="Option" checked={false} onChange={jest.fn()} className="my-row" />
      );
      expect(container.querySelector('.my-row')).toBeInTheDocument();
    });
  });

  describe('Toggle switch', () => {
    it('renders a switch role element', () => {
      render(
        <ToggleRow label="Option" checked={false} onChange={jest.fn()} />
      );
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('sets aria-checked=false when checked=false', () => {
      render(
        <ToggleRow label="Option" checked={false} onChange={jest.fn()} />
      );
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
    });

    it('sets aria-checked=true when checked=true', () => {
      render(
        <ToggleRow label="Option" checked={true} onChange={jest.fn()} />
      );
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
    });
  });

  describe('Interaction', () => {
    it('calls onChange with true when clicking an unchecked toggle', () => {
      const onChange = jest.fn();
      render(
        <ToggleRow label="Option" checked={false} onChange={onChange} />
      );
      fireEvent.click(screen.getByRole('switch'));
      expect(onChange).toHaveBeenCalledWith(true);
    });

    it('calls onChange with false when clicking a checked toggle', () => {
      const onChange = jest.fn();
      render(
        <ToggleRow label="Option" checked={true} onChange={onChange} />
      );
      fireEvent.click(screen.getByRole('switch'));
      expect(onChange).toHaveBeenCalledWith(false);
    });

    it('does not call onChange when disabled', () => {
      const onChange = jest.fn();
      render(
        <ToggleRow label="Option" checked={false} onChange={onChange} disabled={true} />
      );
      fireEvent.click(screen.getByRole('switch'));
      expect(onChange).not.toHaveBeenCalled();
    });

    it('calls onChange via Space key press', () => {
      const onChange = jest.fn();
      render(
        <ToggleRow label="Option" checked={false} onChange={onChange} />
      );
      fireEvent.keyDown(screen.getByRole('switch'), { key: ' ' });
      expect(onChange).toHaveBeenCalledWith(true);
    });

    it('calls onChange via Enter key press', () => {
      const onChange = jest.fn();
      render(
        <ToggleRow label="Option" checked={false} onChange={onChange} />
      );
      fireEvent.keyDown(screen.getByRole('switch'), { key: 'Enter' });
      expect(onChange).toHaveBeenCalledWith(true);
    });
  });

  describe('Disabled state', () => {
    it('sets aria-disabled=true when disabled', () => {
      render(
        <ToggleRow label="Option" checked={false} onChange={jest.fn()} disabled={true} />
      );
      expect(screen.getByRole('switch')).toHaveAttribute('aria-disabled', 'true');
    });

    it('applies reduced opacity when disabled', () => {
      const { container } = render(
        <ToggleRow label="Option" checked={false} onChange={jest.fn()} disabled={true} />
      );
      const row = container.firstChild as HTMLElement;
      expect(row.style.opacity).toBe('0.5');
    });
  });

  describe('Snapshot', () => {
    it('matches snapshot for unchecked default state', () => {
      const { container } = render(
        <ToggleRow label="Enable feature" checked={false} onChange={jest.fn()} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for checked state with subLabel', () => {
      const { container } = render(
        <ToggleRow
          label="Enable feature"
          subLabel="This enables the feature"
          checked={true}
          onChange={jest.fn()}
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
