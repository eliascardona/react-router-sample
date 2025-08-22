import type { Table } from '@tanstack/react-table';
import { CheckCircle2, Eye, FilePen, Send, Undo2, XCircle } from 'lucide-react';
import { StatusFilter } from '~/components/common/table/multi-select-filters';
import { TableToolbar } from '~/components/common/table/table-toolbar';
import type { SubmissionManagementAction } from '~/lib/management/types';
import { useSubmissionManagementModal } from '~/lib/management/utils/management-data-context';
import { generalDateRanges, type DateRange } from '~/lib/management/utils/table';
import { BulkActionsButtons } from '../bulk-actions/buttons';
import { ColumnsVisibilityOptions } from './columns-visibility-options';
import { SUBMISSIONS_TABLE_HEADERS } from './submissions-table-columns';

// Status filter options with icons
const STATUS_OPTIONS = [
  {
    value: 'DRAFT',
    label: 'Borrador',
    icon: FilePen,
  },
  {
    value: 'SUBMITTED',
    label: 'Enviado',
    icon: Send,
  },
  {
    value: 'IN_REVIEW',
    label: 'En Revisión',
    icon: Eye,
  },
  {
    value: 'APPROVED',
    label: 'Aprobado',
    icon: CheckCircle2,
  },
  {
    value: 'REJECTED',
    label: 'Rechazado',
    icon: XCircle,
  },
  {
    value: 'WITHDRAWN',
    label: 'Retirado',
    icon: Undo2,
  },
];

export type BulkActionItem = {
  action: SubmissionManagementAction;
  alias: string;
  onClick: () => void;
};

interface TaskAssignationToolbarProps {
  table: Table<any>;
}

export function SubmissionsTableToolbar({
  table,
}: TaskAssignationToolbarProps) {
  return (
    <TableToolbar
      searchPlaceholder="Buscar envíos..."
      searchName="query"
      clearFiltersLabel="Limpiar"
      mainFilters={<StatusFilter options={STATUS_OPTIONS} />}
      actions={<SubmissionManagementTableActions table={table} />}
      dateRanges={generalDateRanges as DateRange[]}
      dateRangeLabel="Período de Creación"
      showProgramSwitcher={false}
    />
  );
}

function SubmissionManagementTableActions({
  table,
}: {
  table: Table<any>;
}) {
  const { openBulkModal } = useSubmissionManagementModal();
  const selectedRows = table.getSelectedRowModel().rows;
  const selectedTasks = selectedRows.map((row) => row.original);

  const bulkActions: BulkActionItem[] = [
    {
      action: 'BULK_WITHDRAWAL',
      alias: 'Retirar solicitudes',
      onClick: () => openBulkModal('BULK_WITHDRAWAL', selectedTasks),
    },
    {
      action: 'BULK_DELETION',
      alias: 'Eliminar selección',
      onClick: () => openBulkModal('BULK_DELETION', selectedTasks),
    },
  ];

  return (
    <>
      <div className="flex shrink-0 items-center gap-2 pr-10">
        {selectedTasks.length > 0 && (
          <>
            <p>Decida que hacer</p>
            <BulkActionsButtons bulkActions={bulkActions} />
          </>
        )}
      </div>
      <ColumnsVisibilityOptions
        table={table}
        columnLabels={SUBMISSIONS_TABLE_HEADERS}
      />
    </>
  );
}
