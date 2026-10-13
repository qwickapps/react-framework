import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductLogo from '../../components/ProductLogo';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { PaletteProvider } from '../../contexts/PaletteContext';

const renderProductLogo = (component: React.ReactElement) => render(
  component,
  {
    wrapper: ({ children }) => (
      <ThemeProvider>
        <PaletteProvider>{children}</PaletteProvider>
      </ThemeProvider>
    )
  }
);

describe('ProductLogo', () => {
  it('preserves visible whitespace in product names and uses an unshifted icon/text lockup', () => {
    renderProductLogo(<ProductLogo name="wick FM" />);

    const logo = screen.getByRole('img', { name: 'wick FM Logo' });
    const firstPart = logo.querySelector('.logo-first-part');
    const secondPart = logo.querySelector('.logo-second-part');
    const container = logo.closest('.logo-container');
    const icon = container?.querySelector('.qwick-icon');

    expect(logo).toHaveTextContent('wick FM');
    expect(firstPart).toHaveTextContent('wick');
    expect(secondPart).toHaveAttribute('xml:space', 'preserve');
    expect(secondPart?.textContent).toBe(' FM');
    const iconContainer = container?.firstElementChild;
    expect(container).toHaveClass('logo-container', 'logo-image-start');
    expect(iconContainer).toHaveClass('logo-image-container');
    expect(iconContainer?.firstElementChild).toBe(icon);
    expect(icon).toBeInTheDocument();
    expect(icon).not.toHaveStyle({ left: '25px' });
  });

  it('does not expose whitespace preservation as a consumer override', () => {
    // @ts-expect-error ProductLogo always preserves its product-name separator.
    renderProductLogo(<ProductLogo name="wick FM" preserveWhitespace={false} />);

    const logo = screen.getByRole('img', { name: 'wick FM Logo' });
    const secondPart = logo.querySelector('.logo-second-part');

    expect(secondPart).toHaveAttribute('xml:space', 'preserve');
    expect(secondPart?.textContent).toBe(' FM');
  });

  it('does not render an animated badge by default', () => {
    renderProductLogo(<ProductLogo name="wick FM" />);

    const logo = screen.getByRole('img', { name: 'wick FM Logo' });
    expect(logo.querySelector('.logo-badge')).not.toBeInTheDocument();
    expect(logo.querySelector('animate')).not.toBeInTheDocument();
  });

  it('keeps badges available as an explicit opt-in', () => {
    renderProductLogo(<ProductLogo name="wick FM" badge="top-right" />);

    const logo = screen.getByRole('img', { name: 'wick FM Logo' });
    expect(logo.querySelector('.logo-badge-circle')).toBeInTheDocument();
    expect(logo.querySelector('animate')).toBeInTheDocument();
  });
});
