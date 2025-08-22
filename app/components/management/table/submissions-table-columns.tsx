import { type ColumnDef } from '@tanstack/react-table';
import { Badge } from '~/components/ui/badge';
import { Checkbox } from '~/components/ui/checkbox';
import type { SubmissionStatus } from '~/lib/management/utils/utils';
import { createSortableHeader } from '~/lib/management/utils/table';
import { DataTableRowActionsHandler } from './data-table-row-actions';

// Helper types and functions
type StatusBadgeConfigRecord = Record<
  SubmissionStatus,
  {
    variant: 'outline';
    className: string;
    label: string;
  }
>;

const getSubmissionStatusBadge = (status: SubmissionStatus) => {
  const statusConfig: StatusBadgeConfigRecord = {
    DRAFT: {
      variant: 'outline',
      className: 'text-gray-600 border-gray-200 bg-gray-50',
      label: 'Borrador',
    },
    SUBMITTED: {
      variant: 'outline',
      className: 'text-blue-600 border-blue-200 bg-blue-50',
      label: 'Enviado',
    },
    IN_REVIEW: {
      variant: 'outline',
      className: 'text-orange-600 border-orange-200 bg-orange-50',
      label: 'En revisión',
    },
    APPROVED: {
      variant: 'outline',
      className: 'text-green-600 border-green-200 bg-green-50',
      label: 'Aprobado',
    },
    REJECTED: {
      variant: 'outline',
      className: 'text-red-600 border-red-200 bg-red-50',
      label: 'Rechazado',
    },
    WITHDRAWN: {
      variant: 'outline',
      className: 'text-yellow-600 border-yellow-200 bg-yellow-50',
      label: 'Retirado',
    },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className={config.className}>
      {config.label}
    </Badge>
  );
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-MX', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const SUBMISSIONS_TABLE_HEADERS: Record<string, string> = {
  select: '',
  identifier: 'Identificador de envío',
  status: 'Estatus',
  submittedAt: 'Fecha de envío',
  completedAt: 'Fecha de decisión final',
  currentStageName: 'Etapa',
  actions: 'Acciones',
};

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

  // Submission identifier
  {
    accessorKey: 'submissionIdentifier',
    id: 'identifier',
    header: SUBMISSIONS_TABLE_HEADERS['identifier'],
    cell: ({ row }) => (
      <div className="mt-1 max-w-[300px] pl-2">
        <span className="truncate font-mono text-gray-800">
          {row.original.submissionIdentifier}
        </span>
      </div>
    ),
  },

  // Current stage info
  {
    accessorKey: 'currentStageName',
    id: 'currentStageInfo',
    header: SUBMISSIONS_TABLE_HEADERS['currentStageName'],
    cell: ({ row }) => {
      const currentStageAvailability = row.original.currentStageAvailability;

      return currentStageAvailability ? (
        <div className="max-w-[300px]">
          <div className="truncate font-mono text-sm leading-5 font-medium">
            {row.original.currentStageName}
          </div>
          <div className="text-muted-foreground mt-1 flex items-center space-x-2 text-xs">
            <span className="truncate">{row.original.currentStageType}</span>
          </div>
        </div>
      ) : (
        <div className="text-sm">{'-'}</div>
      );
    },
  },

  // Submitted at column
  {
    accessorKey: 'submittedAt',
    header: createSortableHeader(SUBMISSIONS_TABLE_HEADERS['submittedAt']),
    cell: ({ row }) => {
      const rawDate = row.getValue('submittedAt') as string | null;
      const submittedAt = rawDate ? formatDate(rawDate) : '-';
      return <div className="pl-6 text-sm">{submittedAt}</div>;
    },
    sortingFn: (rowA, rowB) => {
      const dateA = new Date(rowA.getValue('submittedAt')).getTime();
      const dateB = new Date(rowB.getValue('submittedAt')).getTime();
      return dateA - dateB;
    },
  },

  // Status column
  {
    accessorKey: 'status',
    header: SUBMISSIONS_TABLE_HEADERS['status'],
    cell: ({ row }) => getSubmissionStatusBadge(row.getValue('status')),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  // Completed at column
  {
    accessorKey: 'completedAt',
    header: createSortableHeader(SUBMISSIONS_TABLE_HEADERS['completedAt']),
    cell: ({ row }) => {
      const rawDate = row.getValue('completedAt') as string | null;
      const completedAt = rawDate ? formatDate(rawDate) : '-';
      return <div className="pl-6 text-sm">{completedAt}</div>;
    },
    sortingFn: (rowA, rowB) => {
      const dateA = new Date(rowA.getValue('completedAt')).getTime();
      const dateB = new Date(rowB.getValue('completedAt')).getTime();
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
      const submissionStatus = row.original.status;

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
