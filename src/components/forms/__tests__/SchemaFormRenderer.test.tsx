/**
 * SchemaFormRenderer Tests
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { SchemaFormRenderer } from '../SchemaFormRenderer';
import { Model, Field, Editor, FieldType, Schema } from '@qwickapps/schema';

// Test Model with various field types
@Schema()
class TestModel extends Model {
  @Field()
  @Editor({ field_type: FieldType.TEXT, label: 'Text Field', description: 'Enter text' })
  textField?: string;

  @Field()
  @Editor({ field_type: FieldType.EMAIL, label: 'Email Field' })
  emailField?: string;

  @Field()
  @Editor({ field_type: FieldType.TEXTAREA, label: 'Textarea Field' })
  textareaField?: string;

  @Field()
  @Editor({ field_type: FieldType.NUMBER, label: 'Number Field' })
  numberField?: number;

  @Field()
  @Editor({ field_type: FieldType.BOOLEAN, label: 'Boolean Field', description: 'Toggle me' })
  booleanField?: boolean;

  @Field()
  @Editor({ field_type: FieldType.DATE_TIME, label: 'DateTime Field' })
  dateTimeField?: string;

  @Field()
  @Editor({ field_type: FieldType.COLOR, label: 'Color Field' })
  colorField?: string;
}

describe('SchemaFormRenderer', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders all field types from schema', () => {
    render(
      <SchemaFormRenderer
        modelClass={TestModel}
        value={{}}
        onChange={mockOnChange}
      />
    );

    expect(screen.getByLabelText(/Text Field/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Field/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Textarea Field/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number Field/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Boolean Field/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/DateTime Field/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Color Field/i)).toBeInTheDocument();
  });

  it('displays field values correctly', () => {
    const value = {
      textField: 'test value',
      emailField: 'test@example.com',
      numberField: 42,
      booleanField: true,
    };

    render(
      <SchemaFormRenderer
        modelClass={TestModel}
        value={value}
        onChange={mockOnChange}
      />
    );

    expect(screen.getByDisplayValue('test value')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('42')).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /Boolean Field/i })).toBeChecked();
  });

  it('calls onChange when text field changes', () => {
    render(
      <SchemaFormRenderer
        modelClass={TestModel}
        value={{}}
        onChange={mockOnChange}
      />
    );

    const textField = screen.getByLabelText(/Text Field/i);
    fireEvent.change(textField, { target: { value: 'new value' } });

    expect(mockOnChange).toHaveBeenCalledWith({ textField: 'new value' });
  });

  it('calls onChange when number field changes', () => {
    render(
      <SchemaFormRenderer
        modelClass={TestModel}
        value={{}}
        onChange={mockOnChange}
      />
    );

    const numberField = screen.getByLabelText(/Number Field/i);
    fireEvent.change(numberField, { target: { value: '123' } });

    expect(mockOnChange).toHaveBeenCalledWith({ numberField: 123 });
  });

  it('handles empty number field correctly (returns undefined, not NaN)', () => {
    render(
      <SchemaFormRenderer
        modelClass={TestModel}
        value={{ numberField: 42 }}
        onChange={mockOnChange}
      />
    );

    const numberField = screen.getByLabelText(/Number Field/i);
    fireEvent.change(numberField, { target: { value: '' } });

    expect(mockOnChange).toHaveBeenCalledWith({ numberField: undefined });
  });

  it('calls onChange when boolean field changes', () => {
    render(
      <SchemaFormRenderer
        modelClass={TestModel}
        value={{}}
        onChange={mockOnChange}
      />
    );

    const booleanField = screen.getByRole('checkbox', { name: /Boolean Field/i });
    fireEvent.click(booleanField);

    expect(mockOnChange).toHaveBeenCalledWith({ booleanField: true });
  });

  it('displays validation errors when showValidation is true', () => {
    const errors = ['Field A is required', 'Field B must be positive'];

    render(
      <SchemaFormRenderer
        modelClass={TestModel}
        value={{}}
        onChange={mockOnChange}
        showValidation={true}
        validationErrors={errors}
      />
    );

    expect(screen.getByText(/Please fix the following errors/i)).toBeInTheDocument();
    expect(screen.getByText('Field A is required')).toBeInTheDocument();
    expect(screen.getByText('Field B must be positive')).toBeInTheDocument();
  });

  it('does not display validation errors when showValidation is false', () => {
    const errors = ['Field A is required'];

    render(
      <SchemaFormRenderer
        modelClass={TestModel}
        value={{}}
        onChange={mockOnChange}
        showValidation={false}
        validationErrors={errors}
      />
    );

    expect(screen.queryByText(/Please fix the following errors/i)).not.toBeInTheDocument();
  });

  it('disables all fields when readOnly is true', () => {
    render(
      <SchemaFormRenderer
        modelClass={TestModel}
        value={{}}
        onChange={mockOnChange}
        readOnly={true}
      />
    );

    expect(screen.getByLabelText(/Text Field/i)).toBeDisabled();
    expect(screen.getByLabelText(/Email Field/i)).toBeDisabled();
    expect(screen.getByLabelText(/Number Field/i)).toBeDisabled();
    expect(screen.getByRole('checkbox', { name: /Boolean Field/i })).toBeDisabled();
  });

  it('displays field descriptions as helper text', () => {
    render(
      <SchemaFormRenderer
        modelClass={TestModel}
        value={{}}
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText('Enter text')).toBeInTheDocument();
    expect(screen.getByText('Toggle me')).toBeInTheDocument();
  });
});
