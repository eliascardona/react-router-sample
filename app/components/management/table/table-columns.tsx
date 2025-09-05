import { type ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '~/components/ui/checkbox';
import { formatISODateToLocate } from '~/lib/datetime/utils';
import { createSortableHeader } from '~/lib/management/utils/table';
import { DataTableRowActionsHandler } from './data-table-row-actions';

export const TABLE_HEADERS = {
  select: '',
  description: 'Descripción',
  createdAt: 'Fecha de inserción en BD',
  actions: 'Acciones',
} as const;

// Column definitions
export const submissionsTableColumns: ColumnDef<any>[] = [
  // Selection column
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Seleccionar todo"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);
        }}
        aria-label="Seleccionar fila"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  // Item description column
  {
    accessorKey: 'description',
    header: TABLE_HEADERS['description'],
    id: 'description',
    cell: ({ row }) => (
      <div className="text-lg">{row.getValue('description')}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  // Completed at column
  {
    accessorKey: 'createdAt',
    header: createSortableHeader(TABLE_HEADERS['createdAt']),
    cell: ({ row }) => {
      const rawDate = row.getValue('createdAt') as string | null;
      const createdAt = rawDate ? formatISODateToLocate(rawDate) : '-';
      return <div className="pl-6 text-sm">{createdAt}</div>;
    },
    sortingFn: (rowA, rowB) => {
      const dateA = new Date(rowA.getValue('createdAt')).getTime();
      const dateB = new Date(rowB.getValue('createdAt')).getTime();
      return dateA - dateB;
    },
  },

  // Actions column
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row, table }) => {
      const selectedTasks = table.getSelectedRowModel().rows;
      const hideActions = selectedTasks.length > 0;
      const submissionStatus = row.original.description;

      const canWithdrawSubmission =
        submissionStatus === 'SUBMITTED' || submissionStatus === 'IN_REVIEW';

      return (
        <DataTableRowActionsHandler<any>
          row={row}
          hideActions={hideActions}
          canWithdrawSubmission={canWithdrawSubmission}
        />
      );
    },
  },
];
