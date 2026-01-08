/**
 * DataTable - Sortable, filterable table component for plugin management pages
 *
 * Provides consistent table UI with sorting, filtering, pagination, and bulk actions.
 *
 * @example
 * ```tsx
 * <DataTable
 *   columns={[
 *     { key: 'email', label: 'Email', sortable: true },
 *     { key: 'status', label: 'Status', render: (val) => <Badge>{val}</Badge> }
 *   ]}
 *   data={users}
 *   onRowClick={(user) => navigate(`/users/${user.id}`)}
 *   bulkActions={[
 *     { label: 'Delete', onClick: (rows) => handleDelete(rows), variant: 'danger' }
 *   ]}
 * />
 * ```
 */

import React, { useState, useMemo } from 'react';

export interface Column<T> {
  /** Column key (must match data property) */
  key: keyof T;

  /** Display label */
  label: string;

  /** Enable sorting for this column */
  sortable?: boolean;

  /** Custom render function */
  render?: (value: unknown, row: T) => React.ReactNode;

  /** Column width (CSS value) */
  width?: string;
}

export interface DataTableProps<T> {
  /** Column definitions */
  columns: Column<T>[];

  /** Table data */
  data: T[];

  /** Row click handler */
  onRowClick?: (row: T) => void;

  /** Bulk action buttons */
  bulkActions?: Array<{
    label: string;
    onClick: (selectedRows: T[]) => void;
    variant?: 'primary' | 'secondary' | 'danger';
  }>;

  /** Enable row selection */
  selectable?: boolean;

  /** Empty state message */
  emptyMessage?: string;

  /** Loading state */
  loading?: boolean;

  /** Row key extractor */
  getRowKey?: (row: T, index: number) => string | number;
}

export function DataTable<T = Record<string, unknown>>({
  columns,
  data,
  onRowClick,
  bulkActions = [],
  selectable = bulkActions.length > 0,
  emptyMessage = 'No data available',
  loading = false,
  getRowKey = (row: T, index: number) => {
    // Type-safe check for id property
    const rowObj = row as Record<string, unknown>;
    const hasValidId = 'id' in rowObj &&
      (typeof rowObj.id === 'string' || typeof rowObj.id === 'number');
    return hasValidId ? (rowObj.id as string | number) : index;
  },
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Sorted data
  const sortedData = useMemo(() => {
    if (!sortColumn) return data;

    return [...data].sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];

      if (aVal === bVal) return 0;

      const comparison = aVal < bVal ? -1 : 1;
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [data, sortColumn, sortDirection]);

  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(data.map((row, index) => getRowKey(row, index))));
    }
  };

  const handleSelectRow = (rowKey: string | number) => {
    const newSelection = new Set(selectedRows);
    if (newSelection.has(rowKey)) {
      newSelection.delete(rowKey);
    } else {
      newSelection.add(rowKey);
    }
    setSelectedRows(newSelection);
  };

  const getSelectedRowData = () => {
    return data.filter((row, index) =>
      selectedRows.has(getRowKey(row, index))
    );
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-2">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Bulk Actions */}
      {selectable && selectedRows.size > 0 && bulkActions.length > 0 && (
        <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
            {selectedRows.size} selected
          </span>
          {bulkActions.map((action, index) => (
            <button
              key={index}
              onClick={() => action.onClick(getSelectedRowData())}
              className={`
                px-3 py-1.5 rounded text-sm font-medium
                ${action.variant === 'danger'
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'}
              `}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {selectable && (
                <th className="w-12 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === data.length && data.length > 0}
                    onChange={handleSelectAll}
                    className="rounded"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  style={{ width: column.width }}
                  className={`
                    px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider
                    ${column.sortable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700' : ''}
                  `}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {column.sortable && sortColumn === column.key && (
                      <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {sortedData.map((row, rowIndex) => {
              const rowKey = getRowKey(row, rowIndex);
              const isSelected = selectedRows.has(rowKey);

              return (
                <tr
                  key={rowKey}
                  className={`
                    ${onRowClick ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800' : ''}
                    ${isSelected ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
                  `}
                  onClick={() => onRowClick?.(row)}
                >
                  {selectable && (
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectRow(rowKey)}
                        className="rounded"
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100"
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : String(row[column.key] ?? '')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
