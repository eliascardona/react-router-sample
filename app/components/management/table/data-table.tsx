import { useMemo } from 'react';
import { useLoaderData } from 'react-router';
import { GenericDataTable } from '~/components/common/table/generic-data-table';
import { useSubmissionManagementModal } from '~/lib/management/utils/management-data-context';
import { transformPaginatedSubmissionsToTableData } from '~/lib/management/utils/table';
import type { loader } from '~/routes/management-table._index';
import { TableRowDialog } from '../common/table-row-dialog';
import { DialogContentHandler } from '../dialogs/dialog-content-handler';
import {
  submissionsTableColumns,
  TABLE_HEADERS,
} from './submissions-table-columns';
import { SubmissionsTableToolbar } from './submissions-table-toolbar';

export function DataTable() {
  const { dataPage } = useLoaderData<typeof loader>();
  const { submissionManagementModalState, closeAssignationModal } =
    useSubmissionManagementModal();

  const tableData = useMemo(() => {
    if (!dataPage?.content) {
      return {
        content: [],
        totalPages: 0,
        totalElements: 0,
        page: 0,
        size: 10,
      };
    }

    const baseTableData =
      transformPaginatedSubmissionsToTableData<any>(dataPage);

    return {
      ...baseTableData,
      content: baseTableData.content,
    };
  }, [dataPage]);

  // Dynamic data model for single assignations or bulk ones
  const assignationViewData = useMemo(() => {
    if (submissionManagementModalState.singleTask) {
      return [submissionManagementModalState.singleTask];
    }

    if (submissionManagementModalState.multipleTasks.length > 0) {
      return submissionManagementModalState.multipleTasks;
    }

    return [];
  }, [submissionManagementModalState]);

  return (
    <>
      <GenericDataTable<any>
        data={tableData}
        columns={submissionsTableColumns}
        filterComponent={SubmissionsTableToolbar}
        title="Administración básica de entidades"
        emptyMessage="No se encontraron registros para esta entidad"
        columnLabels={TABLE_HEADERS}
        initialColumnVisibility={{
          completedAt: false,
        }}
      />

      <TableRowDialog
        dialogTitle="Administración de registros"
        isOpen={submissionManagementModalState.isOpen}
        onClose={closeAssignationModal}>
        <DialogContentHandler
          programId={''}
          submissionManagementView={assignationViewData}
          managementAction={submissionManagementModalState.action}
          onClose={closeAssignationModal}
        />
      </TableRowDialog>
    </>
  );
}
