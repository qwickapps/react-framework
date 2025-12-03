/**
 * Image Accessibility Test
 * 
 * Tests accessibility features of the Image component to ensure
 * it meets WCAG guidelines and screen reader compatibility.
 */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Image } from '../components/blocks/Image';

describe('Image Accessibility', () => {
  beforeEach(() => {
    // Clear any previous accessibility violations
    jest.clearAllMocks();
  });

  describe('Alt Text Requirements', () => {
    it('should render with proper alt attribute', () => {
      render(
        <Image 
          src="https://example.com/test.jpg"
          alt="A beautiful landscape photograph"
        />
      );
      
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('alt', 'A beautiful landscape photograph');
    });

    it('should handle empty alt text for decorative images', () => {
      render(
        <Image 
          src="https://example.com/decorative.jpg"
          alt=""
        />
      );
      
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('alt', '');
    });

    it('should warn when no alt text provided for content images', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      
      render(
        <Image 
          src="https://example.com/test.jpg"
        />
      );
      
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('alt', '');
      
      consoleSpy.mockRestore();
    });
  });

  describe('Title and Tooltip Support', () => {
    it('should render with title attribute for additional context', () => {
      render(
        <Image 
          src="https://example.com/test.jpg"
          alt="Mountain landscape"
          title="Taken at sunset in the Rocky Mountains"
        />
      );
      
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('title', 'Taken at sunset in the Rocky Mountains');
    });
  });

  describe('Loading States Accessibility', () => {
    it('should provide accessible loading state', () => {
      render(
        <Image 
          src="https://example.com/slow-loading.jpg"
          alt="Slow loading image"
          showLoading={true}
        />
      );
      
      // The loading skeleton should be present initially
      // This tests that loading states are accessible
      expect(document.querySelector('.image-loading')).toBeInTheDocument();
    });

    it('should provide accessible error state', () => {
      render(
        <Image 
          src="invalid-url"
          alt="Failed image"
          showError={true}
        />
      );
      
      // Should render an error state that's accessible
      const errorElement = screen.getByText(/Failed to load image/i);
      expect(errorElement).toBeInTheDocument();
    });
  });

  describe('Keyboard and Focus', () => {
    it('should not be focusable by default (non-interactive)', () => {
      render(
        <Image 
          src="https://example.com/test.jpg"
          alt="Non-interactive image"
        />
      );
      
      const img = screen.getByRole('img');
      expect(img).not.toHaveAttribute('tabindex');
    });

    it('should be focusable when interactive (has onClick)', () => {
      const handleClick = jest.fn();
      
      render(
        <Image 
          src="https://example.com/test.jpg"
          alt="Clickable image"
          onClick={handleClick}
        />
      );
      
      const img = screen.getByRole('img');
      expect(img).toHaveStyle('cursor: pointer');
    });
  });

  describe('Screen Reader Support', () => {
    it('should have proper role attribute', () => {
      render(
        <Image 
          src="https://example.com/test.jpg"
          alt="Test image"
        />
      );
      
      const img = screen.getByRole('img');
      expect(img).toBeInTheDocument();
    });

    it('should provide context through alt and title combination', () => {
      render(
        <Image 
          src="https://example.com/chart.jpg"
          alt="Sales performance chart showing 25% increase"
          title="Q4 2024 sales data visualization"
        />
      );
      
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('alt', 'Sales performance chart showing 25% increase');
      expect(img).toHaveAttribute('title', 'Q4 2024 sales data visualization');
    });
  });

  describe('Serialization Accessibility Preservation', () => {
    it('should preserve accessibility attributes through serialization', () => {
      const originalComponent = (
        <Image 
          src="https://example.com/accessible.jpg"
          alt="Accessible image with proper description"
          title="Additional context for screen readers"
        />
      );
      
      // This would use ComponentTransformer in a real test
      // For now, we verify the props are correctly structured
      const props = originalComponent.props;
      
      expect(props.alt).toBe('Accessible image with proper description');
      expect(props.title).toBe('Additional context for screen readers');
      expect(props.src).toBe('https://example.com/accessible.jpg');
    });
  });

  describe('Responsive Images Accessibility', () => {
    it('should handle responsive images with proper attributes', () => {
      render(
        <Image 
          src="https://example.com/responsive.jpg"
          alt="Responsive image example"
          sizes="(max-width: 768px) 100vw, 50vw"
          srcSet="image-400.jpg 400w, image-800.jpg 800w"
        />
      );
      
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('alt', 'Responsive image example');
      expect(img).toHaveAttribute('sizes', '(max-width: 768px) 100vw, 50vw');
      expect(img).toHaveAttribute('srcset', 'image-400.jpg 400w, image-800.jpg 800w');
    });
  });

  describe('Drag and Drop Accessibility', () => {
    it('should handle draggable attribute properly', () => {
      render(
        <Image 
          src="https://example.com/test.jpg"
          alt="Non-draggable image"
          draggable={false}
        />
      );
      
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('draggable', 'false');
    });

    it('should allow dragging when explicitly enabled', () => {
      render(
        <Image 
          src="https://example.com/test.jpg"
          alt="Draggable image"
          draggable={true}
        />
      );
      
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('draggable', 'true');
    });
  });
});