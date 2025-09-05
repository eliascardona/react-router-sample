import { CheckCircle2 } from 'lucide-react';
import type { EntityManagementAction } from '~/lib/management/types';
import { TableRowDialogFooter } from '../common/table-row-dialog-footer';
import { BulkTransactionDialogContent } from './bulk-withdrawal/main-view';
import { WithdrawDialogContent } from './withdraw/main-view';

interface DialogContentProps {
  managementAction: EntityManagementAction | null;
  programId: string;
  onClose: () => void;
}

interface DialogContentHandlerProps extends DialogContentProps {
  submissionManagementView: any[] | null;
}

interface DialogContentHandlerUIProps extends DialogContentProps {
  submissionManagementView: any[];
}

export function DialogContentHandler({
  submissionManagementView,
  managementAction,
  programId,
  onClose,
}: DialogContentHandlerProps) {
  if (!submissionManagementView || submissionManagementView.length === 0)
    return null;

  return (
    <DialogContentHandlerUI
      submissionManagementView={submissionManagementView}
      managementAction={managementAction}
      programId={programId}
      onClose={onClose}
    />
  );
}

function DialogContentHandlerUI({
  submissionManagementView,
  managementAction,
  programId,
  onClose,
}: DialogContentHandlerUIProps) {
  if (!managementAction)
    return <div className="text-lg">Operación no válida</div>;

  const isBulkAction = managementAction.startsWith('BULK_');
  const submissionCount = submissionManagementView.length;

  const renderAssignationActionContent = () => {
    if (isBulkAction) {
      switch (managementAction) {
        case 'BULK_WITHDRAWAL':
          return (
            <BulkTransactionDialogContent
              programId={programId}
              submissionManagementView={submissionManagementView}
            />
          );
        default:
          return <div className="pt-8">Acción no válida</div>;
      }
    } else {
      const currentRowSubmission = submissionManagementView[0];

      switch (managementAction) {
        case 'WITHDRAW_SUBMISSION':
          return (
            <WithdrawDialogContent
              programId={programId}
              submissionManagementView={currentRowSubmission}
            />
          );
        default:
          return <div className="pt-8">Acción no válida</div>;
      }
    }
  };

  return (
    <>
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="py-4">
          <div className="space-y-3 px-2 py-3">
            {submissionManagementView.length > 0 && (
              <>{renderAssignationActionContent()}</>
            )}
            {submissionManagementView.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-muted mb-3 flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-300 hover:scale-110">
                  <CheckCircle2 className="text-muted-foreground h-6 w-6" />
                </div>
                <h3 className="text-foreground mb-1 font-medium">
                  No hay solicitudes seleccionadas
                </h3>
                <p className="text-muted-foreground text-sm">
                  Selecciona una o más solicitudes para continuar
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-border bg-card flex-shrink-0 border-t py-4">
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground text-sm">
            {isBulkAction && submissionCount > 1 && (
              <span>{submissionCount} solicitudes seleccionadas</span>
            )}
          </div>
          <TableRowDialogFooter onClose={onClose} />
        </div>
      </div>
    </>
  );
}
