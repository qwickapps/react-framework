/**
 * Unit tests for IntegrationCard component.
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntegrationCard } from '../../../components/blocks/IntegrationCard';

const logoEl = <span data-testid="logo-icon">Logo</span>;

describe('IntegrationCard', () => {
  describe('Basic render', () => {
    it('renders name and description', () => {
      render(
        <IntegrationCard
          logo={logoEl}
          name="Stripe"
          description="Payment processing integration"
          connected={false}
        />
      );
      expect(screen.getByText('Stripe')).toBeInTheDocument();
      expect(screen.getByText('Payment processing integration')).toBeInTheDocument();
    });

    it('renders the logo element', () => {
      render(
        <IntegrationCard
          logo={logoEl}
          name="Stripe"
          description="Payments"
          connected={false}
        />
      );
      expect(screen.getByTestId('logo-icon')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <IntegrationCard
          logo={logoEl}
          name="Stripe"
          description="Payments"
          connected={false}
          className="custom-card"
        />
      );
      expect(container.querySelector('.custom-card')).toBeInTheDocument();
    });
  });

  describe('Connected state', () => {
    it('shows Connected status badge when connected=true', () => {
      render(
        <IntegrationCard
          logo={logoEl}
          name="Stripe"
          description="Payments"
          connected={true}
        />
      );
      expect(screen.getByText('Connected')).toBeInTheDocument();
    });

    it('shows Not connected status badge when connected=false', () => {
      render(
        <IntegrationCard
          logo={logoEl}
          name="Stripe"
          description="Payments"
          connected={false}
        />
      );
      expect(screen.getByText('Not connected')).toBeInTheDocument();
    });

    it('renders Disconnect button when connected=true', () => {
      render(
        <IntegrationCard
          logo={logoEl}
          name="Stripe"
          description="Payments"
          connected={true}
        />
      );
      expect(screen.getByRole('button', { name: 'Disconnect' })).toBeInTheDocument();
    });

    it('renders Connect button when connected=false', () => {
      render(
        <IntegrationCard
          logo={logoEl}
          name="Stripe"
          description="Payments"
          connected={false}
        />
      );
      expect(screen.getByRole('button', { name: 'Connect' })).toBeInTheDocument();
    });
  });

  describe('Config detail', () => {
    it('renders configDetail when connected and configDetail provided', () => {
      render(
        <IntegrationCard
          logo={logoEl}
          name="Stripe"
          description="Payments"
          connected={true}
          configDetail="pk_live_••••1234"
        />
      );
      expect(screen.getByText('pk_live_••••1234')).toBeInTheDocument();
    });

    it('does not render configDetail when not connected', () => {
      render(
        <IntegrationCard
          logo={logoEl}
          name="Stripe"
          description="Payments"
          connected={false}
          configDetail="pk_live_••••1234"
        />
      );
      expect(screen.queryByText('pk_live_••••1234')).not.toBeInTheDocument();
    });
  });

  describe('Action callbacks', () => {
    it('calls onConnect when Connect button clicked', () => {
      const onConnect = jest.fn();
      render(
        <IntegrationCard
          logo={logoEl}
          name="Stripe"
          description="Payments"
          connected={false}
          onConnect={onConnect}
        />
      );
      fireEvent.click(screen.getByRole('button', { name: 'Connect' }));
      expect(onConnect).toHaveBeenCalledTimes(1);
    });

    it('calls onDisconnect when Disconnect button clicked', () => {
      const onDisconnect = jest.fn();
      render(
        <IntegrationCard
          logo={logoEl}
          name="Stripe"
          description="Payments"
          connected={true}
          onDisconnect={onDisconnect}
        />
      );
      fireEvent.click(screen.getByRole('button', { name: 'Disconnect' }));
      expect(onDisconnect).toHaveBeenCalledTimes(1);
    });

    it('renders custom action slot when provided', () => {
      render(
        <IntegrationCard
          logo={logoEl}
          name="Stripe"
          description="Payments"
          connected={false}
          action={<button>Custom Action</button>}
        />
      );
      expect(screen.getByRole('button', { name: 'Custom Action' })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Connect' })).not.toBeInTheDocument();
    });
  });

  describe('Snapshot', () => {
    it('matches snapshot for disconnected state', () => {
      const { container } = render(
        <IntegrationCard
          logo={logoEl}
          name="Stripe"
          description="Payment processing"
          connected={false}
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for connected state with config detail', () => {
      const { container } = render(
        <IntegrationCard
          logo={logoEl}
          name="Stripe"
          description="Payment processing"
          connected={true}
          configDetail="pk_live_••••1234"
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
