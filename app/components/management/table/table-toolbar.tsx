import type { Table } from '@tanstack/react-table';
import { FilePen, Send } from 'lucide-react';
import { StatusFilter } from '~/components/common/table/multi-select-filters';
import { TableToolbar } from '~/components/common/table/table-toolbar';
import type { EntityManagementAction } from '~/lib/management/types';
import {
  generalDateRanges,
  type DateRange,
} from '~/lib/management/utils/table';
import { useTableDialog } from '~/lib/management/utils/table-dialog-context';
import { BulkActionsButtons } from '../bulk-actions/buttons';
import { ColumnsVisibilityOptions } from './columns-visibility-options';
import { TABLE_HEADERS } from './table-columns';

// Status filter options with icons
const STATUS_OPTIONS = [
  {
    value: 'PAID',
    label: 'Borrador',
    icon: FilePen,
  },
  {
    value: 'PENDING',
    label: 'Enviado',
    icon: Send,
  },
];

export type BulkActionItem = {
  action: EntityManagementAction;
  alias: string;
  onClick: () => void;
};

interface EntityToolbarProps {
  table: Table<any>;
}

export function EntityTableToolbar({ table }: EntityToolbarProps) {
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

function SubmissionManagementTableActions({ table }: { table: Table<any> }) {
  const { openBulkModal } = useTableDialog();
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
      <ColumnsVisibilityOptions table={table} columnLabels={TABLE_HEADERS} />
    </>
  );
}
