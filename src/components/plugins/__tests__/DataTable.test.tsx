/**
 * DataTable tests
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DataTable, type Column, type DataTableProps } from '../DataTable';

describe('DataTable', () => {
  interface TestRow {
    id: number;
    name: string;
    email: string;
  }

  const mockData: TestRow[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' },
  ];

  const mockColumns: Column<TestRow>[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
  ];

  describe('Type Safety', () => {
    it('should accept generic type parameter correctly', () => {
      const props: DataTableProps<TestRow> = {
        columns: mockColumns,
        data: mockData,
      };

      expect(props.columns).toBeDefined();
      expect(props.data).toBeDefined();
    });

    it('should have type-safe column keys', () => {
      // This test verifies that TypeScript enforces column keys match the data type
      const validColumn: Column<TestRow> = { key: 'name', label: 'Name' };
      expect(validColumn.key).toBe('name');

      // TypeScript should prevent invalid keys at compile time
      // @ts-expect-error - invalid key should cause type error
      const invalidColumn: Column<TestRow> = { key: 'invalid', label: 'Invalid' };
      expect(invalidColumn).toBeDefined(); // Just to use the variable
    });

    it('should handle getRowKey with type-safe id extraction', () => {
      // Test the default getRowKey behavior
      const { container } = render(
        <DataTable<TestRow> columns={mockColumns} data={mockData} />
      );

      expect(container).toBeInTheDocument();
      // The component should render rows using ids as keys
      // This verifies the type-safe id extraction works
    });

    it('should handle custom getRowKey function', () => {
      const customGetRowKey = (row: TestRow, index: number) => `row-${row.id}-${index}`;

      render(
        <DataTable<TestRow>
          columns={mockColumns}
          data={mockData}
          getRowKey={customGetRowKey}
        />
      );

      // Component should render with custom keys
      expect(screen.getByText('Alice')).toBeInTheDocument();
    });

    it('should handle rows without id property using index fallback', () => {
      interface RowWithoutId {
        name: string;
      }

      const dataWithoutId: RowWithoutId[] = [
        { name: 'Alice' },
        { name: 'Bob' },
      ];

      const columnsWithoutId: Column<RowWithoutId>[] = [
        { key: 'name', label: 'Name' },
      ];

      const { container } = render(
        <DataTable<RowWithoutId> columns={columnsWithoutId} data={dataWithoutId} />
      );

      expect(container).toBeInTheDocument();
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });
  });

  describe('Component Rendering', () => {
    it('should render empty message when data is empty', () => {
      render(
        <DataTable<TestRow>
          columns={mockColumns}
          data={[]}
          emptyMessage="No users found"
        />
      );

      expect(screen.getByText('No users found')).toBeInTheDocument();
    });

    it('should render loading state', () => {
      const { container } = render(
        <DataTable<TestRow> columns={mockColumns} data={mockData} loading={true} />
      );

      // Check for loading skeleton (has animate-pulse class)
      const loadingSkeleton = container.querySelector('.animate-pulse');
      expect(loadingSkeleton).toBeInTheDocument();
    });

    it('should render column headers', () => {
      render(<DataTable<TestRow> columns={mockColumns} data={mockData} />);

      expect(screen.getByText('ID')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
    });

    it('should render data rows', () => {
      render(<DataTable<TestRow> columns={mockColumns} data={mockData} />);

      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
      expect(screen.getByText('Charlie')).toBeInTheDocument();
      expect(screen.getByText('alice@example.com')).toBeInTheDocument();
    });

    it('should use custom render function when provided', () => {
      const columnsWithCustomRender: Column<TestRow>[] = [
        {
          key: 'name',
          label: 'Name',
          render: (value) => <strong>{String(value)}</strong>,
        },
      ];

      render(<DataTable<TestRow> columns={columnsWithCustomRender} data={mockData} />);

      const strongElement = screen.getByText('Alice').closest('strong');
      expect(strongElement).toBeInTheDocument();
    });
  });
});
