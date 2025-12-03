/**
 * Simple unit tests for SafeSpan component
 * Focuses on core functionality without complex data binding scenarios
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SafeSpan from '../../SafeSpan';

describe('SafeSpan Simple Tests', () => {
  
  describe('Basic Functionality', () => {
    
    it('renders simple HTML content', () => {
      render(<SafeSpan html="<p>Hello World</p>" />);
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('renders placeholder when html is empty', () => {
      render(<SafeSpan html="" placeholder="Loading..." />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('returns null when both html and placeholder are empty', () => {
      const { container } = render(<SafeSpan html="" />);
      expect(container.firstChild).toBeNull();
    });

    it('sanitizes script tags', () => {
      render(<SafeSpan html="<p>Safe</p><script>alert('xss')</script>" />);
      expect(screen.getByText('Safe')).toBeInTheDocument();
      expect(document.querySelector('script')).toBeNull();
    });

    it('preserves safe formatting', () => {
      render(<SafeSpan html="<p><strong>Bold</strong> and <em>italic</em> text</p>" />);
      expect(screen.getByText('Bold')).toBeInTheDocument();
      expect(screen.getByText('italic')).toBeInTheDocument();
      
      const boldElement = screen.getByText('Bold');
      const italicElement = screen.getByText('italic');
      
      expect(boldElement.tagName).toBe('STRONG');
      expect(italicElement.tagName).toBe('EM');
    });

    it('removes dangerous event handlers', () => {
      const { container } = render(
        <SafeSpan html='<p onclick="alert(1)">Click me</p>' />
      );
      
      const paragraph = container.querySelector('p');
      expect(paragraph).toBeInTheDocument();
      expect(paragraph).not.toHaveAttribute('onclick');
    });

    it('works without data binding when no dataSource provided', () => {
      render(<SafeSpan html="<p>Traditional usage</p>" />);
      expect(screen.getByText('Traditional usage')).toBeInTheDocument();
    });

  });

});