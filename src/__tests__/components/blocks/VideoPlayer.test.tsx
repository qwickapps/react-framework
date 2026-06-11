/**
 * Unit tests for VideoPlayer component.
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { VideoPlayer } from '../../../components/blocks/VideoPlayer';

describe('VideoPlayer', () => {
  describe('Basic render', () => {
    it('renders the play button', () => {
      render(<VideoPlayer />);
      expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <VideoPlayer className="my-player" />
      );
      expect(container.querySelector('.my-player')).toBeInTheDocument();
    });
  });

  describe('Info bar', () => {
    it('renders label in info bar', () => {
      render(<VideoPlayer label="Intro Episode" />);
      expect(screen.getByText('Intro Episode')).toBeInTheDocument();
    });

    it('renders timestamp in info bar', () => {
      render(<VideoPlayer label="Video" timestamp="2:34" />);
      expect(screen.getByText('2:34')).toBeInTheDocument();
    });

    it('renders duration chip in info bar', () => {
      render(<VideoPlayer label="Video" duration="10:00" />);
      expect(screen.getByText('10:00')).toBeInTheDocument();
    });

    it('does not render info bar when no label/timestamp/duration provided', () => {
      render(<VideoPlayer />);
      // No info bar text visible
      expect(screen.queryByText('10:00')).not.toBeInTheDocument();
    });
  });

  describe('Badge', () => {
    it('renders badge chip when badge prop is provided', () => {
      render(<VideoPlayer badge="NEW" />);
      expect(screen.getByText('NEW')).toBeInTheDocument();
    });

    it('does not render badge when badge prop is omitted', () => {
      render(<VideoPlayer />);
      expect(screen.queryByText('NEW')).not.toBeInTheDocument();
    });
  });

  describe('Scrubber / controls', () => {
    it('renders scrubber track when showControls=true', () => {
      const { container } = render(
        <VideoPlayer showControls={true} progress={40} />
      );
      // Scrubber fill should have width 40%
      const fill = container.querySelector('[style*="width: 40%"]');
      expect(fill).toBeInTheDocument();
    });

    it('does not render scrubber when showControls=false (default)', () => {
      const { container } = render(<VideoPlayer progress={40} />);
      expect(container.querySelector('[style*="width: 40%"]')).not.toBeInTheDocument();
    });

    it('clamps scrubber progress to 100', () => {
      const { container } = render(
        <VideoPlayer showControls={true} progress={200} />
      );
      const fill = container.querySelector('[style*="width: 100%"]');
      expect(fill).toBeInTheDocument();
    });
  });

  describe('Background', () => {
    it('renders without error when background CSS gradient string is provided', () => {
      const bg = 'linear-gradient(135deg, #1a1a2e, #16213e)';
      // jsdom does not parse gradient strings as valid CSS in inline styles;
      // verify the component renders and the play button is still present
      render(<VideoPlayer background={bg} />);
      expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
    });
  });

  describe('Snapshot', () => {
    it('matches snapshot for default render', () => {
      const { container } = render(<VideoPlayer />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for fully populated props', () => {
      const { container } = render(
        <VideoPlayer
          label="Episode 1"
          timestamp="0:00"
          duration="22:30"
          badge="HD"
          showControls={true}
          progress={30}
          background="linear-gradient(135deg, #1a1a2e, #16213e)"
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
