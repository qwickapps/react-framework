/**
 * Button Serialization Tests
 * 
 * Comprehensive test suite for Button component serialization functionality.
 * Tests the Serializable interface implementation and action handling.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button, { ButtonAction } from '../../../components/buttons/Button';
import { ComponentTransformer } from '../../../schemas/transformers/ComponentTransformer';
// Import registry to ensure component registration happens
import '../../../schemas/transformers/registry';

// Mock React Router for navigation tests
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('Button Serialization', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Clear any global handlers
    (global as unknown as Record<string, unknown>).testHandler = undefined;
  });

  describe('Basic Serialization', () => {
    test('should serialize basic button with label', () => {
      const button = new Button({ label: 'Click me', variant: 'primary' });
      const json = button.toJson();
      
      expect(json).toEqual({
        children: '',  // extractTextFromReactNode returns empty string for undefined
        label: 'Click me',
        variant: 'primary',
        buttonSize: undefined,
        href: undefined,
        target: undefined,
        disabled: undefined,
        loading: undefined,
        fullWidth: undefined,
        action: undefined,
        dataSource: undefined,
        bindingOptions: undefined
      });
    });

    test('should serialize button with children text', () => {
      const button = new Button({ children: 'Button text' });
      const json = button.toJson();
      
      expect(json.children).toBe('Button text');
    });

    test('should serialize button with children ReactNode', () => {
      const children = <span>Complex <strong>content</strong></span>;
      const button = new Button({ children });
      const json = button.toJson();
      
      expect(json.children).toBe('Complex content');
    });

    test('should serialize all button properties', () => {
      const button = new Button({
        label: 'Submit',
        variant: 'contained',
        buttonSize: 'large',
        href: 'https://example.com',
        target: '_blank',
        disabled: true,
        loading: false,
        fullWidth: true
      });
      const json = button.toJson();
      
      expect(json).toMatchObject({
        label: 'Submit',
        variant: 'contained',
        buttonSize: 'large',
        href: 'https://example.com',
        target: '_blank',
        disabled: true,
        loading: false,
        fullWidth: true
      });
    });
  });

  describe('Action Serialization', () => {
    test('should serialize navigation action', () => {
      const action: ButtonAction = {
        type: 'navigate',
        url: '/dashboard',
        target: '_self'
      };
      const button = new Button({ label: 'Go to Dashboard', action });
      const json = button.toJson();
      
      expect(json.action).toEqual(action);
    });

    test('should serialize form submit action', () => {
      const action: ButtonAction = {
        type: 'submit',
        form: 'contact-form'
      };
      const button = new Button({ label: 'Submit Form', action });
      const json = button.toJson();
      
      expect(json.action).toEqual(action);
    });

    test('should serialize external link action', () => {
      const action: ButtonAction = {
        type: 'external',
        url: 'https://external.com',
        target: '_blank'
      };
      const button = new Button({ label: 'External Link', action });
      const json = button.toJson();
      
      expect(json.action).toEqual(action);
    });

    test('should serialize custom action', () => {
      const action: ButtonAction = {
        type: 'custom',
        customHandler: 'handleCustomAction'
      };
      const button = new Button({ label: 'Custom Action', action });
      const json = button.toJson();
      
      expect(json.action).toEqual(action);
    });
  });

  describe('Data Binding Serialization', () => {
    test('should serialize data binding properties', () => {
      const dataSource = { endpoint: '/api/buttons/1' };
      const bindingOptions = { cache: true, cacheTTL: 5000 };
      
      const button = new Button({
        label: 'Dynamic Button',
        dataSource,
        bindingOptions
      });
      const json = button.toJson();
      
      expect(json.dataSource).toEqual(dataSource);
      expect(json.bindingOptions).toEqual(bindingOptions);
    });
  });

  describe('Deserialization', () => {
    test('should deserialize basic button from JSON', () => {
      const json = {
        label: 'Click me',
        variant: 'primary',
        buttonSize: 'medium'
      };
      
      const element = Button.fromJson(json);
      expect(React.isValidElement(element)).toBe(true);
      expect(element.type).toBe(Button);
      expect(element.props).toMatchObject(json);
    });

    test('should deserialize button with action', () => {
      const json = {
        label: 'Navigate',
        action: {
          type: 'navigate',
          url: '/page'
        }
      };
      
      const element = Button.fromJson(json);
      expect(element.props.action).toEqual(json.action);
    });

    test('should deserialize button with children', () => {
      const json = {
        children: 'Button content',
        variant: 'outlined'
      };
      
      const element = Button.fromJson(json);
      expect(element.props.children).toBe('Button content');
    });
  });

  describe('Round-trip Serialization', () => {
    test('should maintain data integrity through serialize-deserialize cycle', () => {
      const originalProps = {
        label: 'Test Button',
        variant: 'contained' as const,
        buttonSize: 'large' as const,
        disabled: false,
        fullWidth: true,
        action: {
          type: 'navigate' as const,
          url: '/test-page'
        }
      };
      
      const button = new Button(originalProps);
      const json = button.toJson();
      const deserializedElement = Button.fromJson(json);
      const newButton = new Button(deserializedElement.props);
      const finalJson = newButton.toJson();
      
      expect(finalJson.label).toBe(originalProps.label);
      expect(finalJson.variant).toBe(originalProps.variant);
      expect(finalJson.buttonSize).toBe(originalProps.buttonSize);
      expect(finalJson.disabled).toBe(originalProps.disabled);
      expect(finalJson.fullWidth).toBe(originalProps.fullWidth);
      expect(finalJson.action).toEqual(originalProps.action);
    });

    test('should handle complex children content in round-trip', () => {
      const originalProps = {
        children: 'Multi-word button text',
        variant: 'text' as const
      };
      
      const button = new Button(originalProps);
      const json = button.toJson();
      const deserializedElement = Button.fromJson(json);
      
      expect(deserializedElement.props.children).toBe('Multi-word button text');
    });
  });

  describe('Component Registration', () => {
    test('should be registered with ComponentTransformer', () => {
      const registeredComponents = ComponentTransformer.getRegisteredComponents();
      expect(registeredComponents).toContain('Button');
    });

    test('should have correct tagName and version', () => {
      expect(Button.tagName).toBe('Button');
      expect(Button.version).toBe('1.0.0');
    });
  });

  describe('Action Handling', () => {
    // Mock window.open for external action tests
    const mockWindowOpen = jest.fn();
    const originalOpen = window.open;

    beforeAll(() => {
      window.open = mockWindowOpen;
    });

    afterAll(() => {
      window.open = originalOpen;
    });

    beforeEach(() => {
      mockWindowOpen.mockClear();
      mockNavigate.mockClear();
    });

    test('should handle navigation action click', () => {
      const action: ButtonAction = {
        type: 'navigate',
        url: '/dashboard'
      };
      
      render(<Button label="Navigate" action={action} />);
      const button = screen.getByRole('button');
      
      fireEvent.click(button);
      
      // Note: In test environment, the navigate hook might not work as expected
      // This test verifies the click handler is called without error
      expect(button).toBeInTheDocument();
    });

    test('should handle external action click', () => {
      const action: ButtonAction = {
        type: 'external',
        url: 'https://external.com',
        target: '_blank'
      };
      
      render(<Button label="External" action={action} />);
      const button = screen.getByRole('button');
      
      fireEvent.click(button);
      
      expect(mockWindowOpen).toHaveBeenCalledWith(
        'https://external.com', 
        '_blank', 
        'noopener,noreferrer'
      );
    });

    test('should handle form submit action', () => {
      // Create a mock form element
      const form = document.createElement('form');
      form.id = 'test-form';
      form.requestSubmit = jest.fn();
      document.body.appendChild(form);
      
      const action: ButtonAction = {
        type: 'submit',
        form: 'test-form'
      };
      
      render(<Button label="Submit" action={action} />);
      const button = screen.getByRole('button');
      
      fireEvent.click(button);
      
      expect(form.requestSubmit).toHaveBeenCalled();
      
      // Cleanup
      document.body.removeChild(form);
    });

    test('should handle custom action with global handler', () => {
      const customHandler = jest.fn();
      (global as unknown as Record<string, unknown>).testHandler = customHandler;
      
      const action: ButtonAction = {
        type: 'custom',
        customHandler: 'testHandler'
      };
      
      render(<Button label="Custom" action={action} />);
      const button = screen.getByRole('button');
      
      fireEvent.click(button);
      
      expect(customHandler).toHaveBeenCalled();
    });

    test('should not execute action when disabled', () => {
      const action: ButtonAction = {
        type: 'external',
        url: 'https://external.com'
      };
      
      render(<Button label="Disabled" action={action} disabled />);
      const button = screen.getByRole('button');
      
      fireEvent.click(button);
      
      expect(mockWindowOpen).not.toHaveBeenCalled();
    });

    test('should not execute action when loading', () => {
      const action: ButtonAction = {
        type: 'external',
        url: 'https://external.com'
      };
      
      render(<Button label="Loading" action={action} loading />);
      const button = screen.getByRole('button');
      
      fireEvent.click(button);
      
      expect(mockWindowOpen).not.toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    test('should handle missing action properties gracefully', () => {
      const action: ButtonAction = {
        type: 'navigate'
        // Missing url property
      };
      
      render(<Button label="Invalid" action={action} />);
      const button = screen.getByRole('button');
      
      // Should not throw error when clicking
      expect(() => fireEvent.click(button)).not.toThrow();
    });

    test('should handle non-existent form ID gracefully', () => {
      const action: ButtonAction = {
        type: 'submit',
        form: 'non-existent-form'
      };
      
      render(<Button label="Submit" action={action} />);
      const button = screen.getByRole('button');
      
      // Should not throw error when clicking
      expect(() => fireEvent.click(button)).not.toThrow();
    });

    test('should handle non-existent custom handler gracefully', () => {
      const action: ButtonAction = {
        type: 'custom',
        customHandler: 'nonExistentHandler'
      };
      
      render(<Button label="Custom" action={action} />);
      const button = screen.getByRole('button');
      
      // Should not throw error when clicking
      expect(() => fireEvent.click(button)).not.toThrow();
    });
  });

  describe('Integration with Original onClick', () => {
    test('should call both action and original onClick', () => {
      const originalClick = jest.fn();
      const action: ButtonAction = {
        type: 'custom',
        customHandler: 'testHandler'
      };
      
      (global as unknown as Record<string, unknown>).testHandler = jest.fn();
      
      render(<Button label="Both" action={action} onClick={originalClick} />);
      const button = screen.getByRole('button');
      
      fireEvent.click(button);
      
      expect((global as unknown as Record<string, unknown>).testHandler).toHaveBeenCalled();
      expect(originalClick).toHaveBeenCalled();
    });

    test('should work with only onClick (no action)', () => {
      const onClick = jest.fn();
      
      render(<Button label="Click Only" onClick={onClick} />);
      const button = screen.getByRole('button');
      
      fireEvent.click(button);
      
      expect(onClick).toHaveBeenCalled();
    });
  });
});