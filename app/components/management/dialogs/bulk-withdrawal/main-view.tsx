import type { BulkTransactionUIProps } from '~/lib/management/types';
import { BulkTransactionActionTrigger } from './action-trigger';

export function BulkTransactionDialogContent({
  programId,
  submissionManagementView,
}: BulkTransactionUIProps) {
  const submissionIds = submissionManagementView.map(
    (submission) => submission.id
  );

  return (
    <div className="space-y-7">
      <div>
        <p className="text-3xl font-medium">Retiro de solicitudes en lote</p>
      </div>
      <BulkTransactionActionTrigger
        programId={programId}
        submissionIds={submissionIds}
      />
    </div>
  );
}
