import type { Table } from '@tanstack/react-table';
import { TableToolbar } from './table-toolbar';
import { TableViewOptions } from './table-view-options';

export function AdvancedTableToolbar({
  children,
  searchPlaceholder = 'Buscar...',
  mainFilters,
  advancedFilters,
  table,
  columnLabels,
}: {
  children?: React.ReactNode;
  searchPlaceholder?: string;
  mainFilters?: React.ReactNode;
  advancedFilters?: React.ReactNode;
  table?: Table<any>;
  columnLabels?: Record<string, string>;
}) {
  return (
    <TableToolbar
      searchPlaceholder={searchPlaceholder}
      mainFilters={mainFilters}
      actions={
        table && <TableViewOptions table={table} columnLabels={columnLabels} />
      }>
      {children}
    </TableToolbar>
  );
}
